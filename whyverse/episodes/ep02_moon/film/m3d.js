// Whyverse ep02 — the realistic 3D layer (three.js r160, WebGL in headless Chrome / SwiftShader).
// One offscreen WebGL canvas; M3.draw(ctx, p) renders the scene described by plain params p and blits it
// onto the 2D film canvas. Pure function of p (no state carried between frames), so workers stay identical.
// Earth shader adapted from the Oct 31 Moon night test (prototypes/anim_moon). Textures: NASA-based three.js examples.
(function () {
  const M3 = {};
  globalThis.M3 = M3;
  const RS = Number(new URLSearchParams(location.search).get('rs3') || 0.75); // internal 3D render scale
  let THREE, renderer, scene, camera, O = {};
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

  function glowTex(stops, n = 256) {
    const c = document.createElement('canvas'); c.width = c.height = n; const g = c.getContext('2d');
    const gr = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2); stops.forEach(([o, s]) => gr.addColorStop(o, s));
    g.fillStyle = gr; g.fillRect(0, 0, n, n); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }

  M3.init = async () => {
    THREE = globalThis.THREE; M3.THREE = THREE;
    const W = G.W, H = G.H;
    const cv = document.createElement('canvas');
    renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true, alpha: false });
    renderer.setPixelRatio(1); renderer.setSize(Math.round(W * RS), Math.round(H * RS), false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
    M3.canvas = cv;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, W / H, 0.01, 6000);
    const loader = new THREE.TextureLoader();
    const tex = (u, srgb = true) => new Promise((ok, bad) => loader.load(u, (t) => {
      if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.wrapS = THREE.RepeatWrapping; ok(t); }, undefined, bad));
    const [tDay, tNorm, tSpec, tLights, tMoon, tClouds] = await Promise.all([
      tex('tex/earth_atmos_2048.jpg'), tex('tex/earth_normal_2048.jpg', false), tex('tex/earth_specular_2048.jpg', false),
      tex('tex/earth_lights_2048.png'), tex('tex/moon_1024.jpg'), tex('tex/clouds_a.jpg', false)]);

    // ---------- stars + milky way ----------
    let seed = 9137; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    {
      const N = 7000, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), siz = new Float32Array(N);
      const band = V3(0.3, 0.85, 0.42).normalize();
      for (let i = 0; i < N; i++) {
        let v; for (;;) { v = V3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1); const l = v.length(); if (l > 0.05 && l <= 1) break; }
        v.normalize(); if (i < N * 0.45) { const d = v.dot(band); v.addScaledVector(band, -d * 0.85).normalize(); }
        pos.set([v.x * 1500, v.y * 1500, v.z * 1500], i * 3);
        const m = Math.pow(rnd(), 7.0); siz[i] = 1.3 + m * 6;
        const tint = rnd(); const c = tint < 0.15 ? [1.0, 0.82, 0.62] : tint < 0.35 ? [0.72, 0.82, 1.0] : [1, 1, 1];
        const b = 0.25 + m * 2.4; col.set([c[0] * b, c[1] * b, c[2] * b], i * 3);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.setAttribute('size', new THREE.BufferAttribute(siz, 1));
      const m = new THREE.ShaderMaterial({
        uniforms: { pr: { value: RS }, fade: { value: 1 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: `attribute float size; attribute vec3 color; varying vec3 vC; uniform float pr;
          void main(){ vC=color; vec4 mv=modelViewMatrix*vec4(position,1.); gl_Position=projectionMatrix*mv; gl_PointSize=max(size*pr*1.3,1.5); }`,
        fragmentShader: `varying vec3 vC; uniform float fade; void main(){ vec2 p=gl_PointCoord-.5; float r=dot(p,p)*4.;
          float a=exp(-r*4.5); gl_FragColor=vec4(vC*a*fade,1.); }` });
      O.stars = new THREE.Points(g, m); O.stars.frustumCulled = false; O.stars.renderOrder = -1; scene.add(O.stars);
      const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d');
      const img = x.createImageData(512, 256);
      const hsh = (i, j) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
      const vn = (u, v) => { const i = Math.floor(u), j = Math.floor(v), fu = u - i, fv = v - j, a = hsh(i, j), b = hsh(i + 1, j), cc = hsh(i, j + 1), d = hsh(i + 1, j + 1);
        const su = fu * fu * (3 - 2 * fu), sv = fv * fv * (3 - 2 * fv); return a + (b - a) * su + (cc - a) * sv + (a - b - cc + d) * su * sv; };
      const fbm = (u, v) => { let s = 0, a = 0.5; for (let o = 0; o < 5; o++) { s += a * vn(u, v); u *= 2.03; v *= 2.03; a *= 0.5; } return s; };
      for (let j = 0; j < 256; j++) for (let i = 0; i < 512; i++) {
        const th = (i / 512) * Math.PI * 2, ph = (j / 256) * Math.PI;
        const d = V3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th));
        const gb = d.dot(band); const n = fbm(i / 30 + 3, j / 30 + 7);
        const v = Math.max(0, Math.exp(-gb * gb * 28) * (0.35 + 0.9 * n));
        const k = (j * 512 + i) * 4; img.data[k] = 255 * Math.min(1, v * 0.15); img.data[k + 1] = 255 * Math.min(1, v * 0.15); img.data[k + 2] = 255 * Math.min(1, v * 0.2); img.data[k + 3] = 255;
      }
      x.putImageData(img, 0, 0);
      const mt = new THREE.CanvasTexture(c); mt.colorSpace = THREE.SRGBColorSpace;
      O.milky = new THREE.Mesh(new THREE.SphereGeometry(1600, 48, 24), new THREE.MeshBasicMaterial({ map: mt, side: THREE.BackSide, depthWrite: false, transparent: true }));
      O.milky.renderOrder = -2; O.milky.material.blending = THREE.AdditiveBlending; scene.add(O.milky);
    }
    // ---------- sun ----------
    O.sunCore = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex([[0, '#ffffff'], [0.18, '#fff6e0'], [0.35, 'rgba(255,220,160,.35)'], [1, 'rgba(255,190,120,0)']]),
      blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(6, 5.6, 5) }));
    scene.add(O.sunCore);
    O.sunHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex([[0, 'rgba(255,230,190,.55)'], [0.25, 'rgba(255,200,140,.18)'], [1, 'rgba(255,170,100,0)']]),
      blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(O.sunHalo);
    O.sunL = new THREE.DirectionalLight(0xfff4e6, 4.2); scene.add(O.sunL); scene.add(O.sunL.target);
    O.amb = new THREE.AmbientLight(0x3a5a99, 0.05); scene.add(O.amb);

    // ---------- earth ----------
    O.earthU = { tDay: { value: tDay }, tNorm: { value: tNorm }, tSpec: { value: tSpec }, tLights: { value: tLights }, tClouds: { value: tClouds },
      sunDir: { value: V3(1, 0, 0) }, cloudOff: { value: 0 }, lightsK: { value: 1.6 }, moonLight: { value: 0 }, moonDir: { value: V3(1, 0, 0) } };
    const earthMat = new THREE.ShaderMaterial({ uniforms: O.earthU, extensions: { derivatives: true },
      vertexShader: `varying vec3 vN; varying vec3 vWP; varying vec2 vUv;
        void main(){ vUv=uv; vec4 wp=modelMatrix*vec4(position,1.); vWP=wp.xyz; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader: `
        uniform sampler2D tDay,tNorm,tSpec,tLights,tClouds; uniform vec3 sunDir,moonDir; uniform float cloudOff,lightsK,moonLight;
        varying vec3 vN; varying vec3 vWP; varying vec2 vUv;
        vec3 perturb(vec3 N, vec3 p, vec2 uv, vec3 mapN){
          vec3 q0=dFdx(p), q1=dFdy(p); vec2 st0=dFdx(uv), st1=dFdy(uv);
          vec3 q1p=cross(q1,N), q0p=cross(N,q0); vec3 T=q1p*st0.x+q0p*st1.x; vec3 B=q1p*st0.y+q0p*st1.y;
          float det=max(dot(T,T),dot(B,B)); float s=det==0.?0.:inversesqrt(det); return normalize(T*(mapN.x*s)+B*(mapN.y*s)+N*mapN.z); }
        void main(){
          vec3 Ns=normalize(vN); vec3 V=normalize(cameraPosition-vWP); vec3 L=normalize(sunDir);
          vec3 mn=texture2D(tNorm,vUv).xyz*2.-1.; mn.xy*=0.9; vec3 N=perturb(Ns,vWP,vUv,mn);
          float spec=texture2D(tSpec,vUv).r; vec3 day=texture2D(tDay,vUv).rgb;
          day=mix(day, day*vec3(0.85,0.95,1.15), spec*0.6);
          vec2 cuv=vUv+vec2(cloudOff,0.); float cl=texture2D(tClouds,cuv).r; cl=smoothstep(0.08,0.9,cl);
          float ndl=dot(Ns,L); float lit=smoothstep(-0.10,0.28,ndl); float dl=max(dot(N,L),0.);
          vec3 twi=mix(vec3(1.0,0.48,0.24),vec3(1.0),smoothstep(-0.02,0.32,ndl));
          vec3 surf=day*(dl*0.92+0.06*lit);
          vec3 cloudC=vec3(1.0)*(max(ndl,0.)*0.95+0.05*lit);
          vec3 col=mix(surf,cloudC,cl*0.92)*twi*1.75;
          vec3 Hh=normalize(L+V); float nh=max(dot(Ns,Hh),0.);
          col+= vec3(1.0,0.86,0.66)*(pow(nh,700.)*1.4+pow(nh,70.)*0.07)*spec*(1.-cl)*lit;
          float night=1.-smoothstep(-0.16,0.06,ndl);
          vec3 cl3=texture2D(tLights,vUv).rgb; cl3=pow(cl3,vec3(1.35));
          col+= cl3*vec3(1.0,0.66,0.34)*night*(1.-cl*0.85)*lightsK;
          float ml=max(dot(Ns,normalize(moonDir)),0.)*night*moonLight;     // moonlight on the night side
          col+= mix(day,vec3(0.8),cl)*vec3(0.55,0.65,1.0)*ml*0.22;
          float f=pow(1.-max(dot(Ns,V),0.),2.6);
          vec3 atm=mix(vec3(0.95,0.45,0.2),vec3(0.28,0.55,1.25),smoothstep(-0.05,0.35,ndl));
          col=mix(col, atm*1.25*smoothstep(-0.25,0.25,ndl), f*0.75);
          col+= vec3(0.06,0.12,0.3)*lit*0.25;
          gl_FragColor=vec4(col,1.);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }` });
    O.tilt = new THREE.Group(); scene.add(O.tilt);
    O.earth = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 64), earthMat); O.tilt.add(O.earth);
    O.atmU = { sunDir: { value: V3(1, 0, 0) }, ctr: { value: V3(0, 0, 0) }, rad: { value: 1 } };
    O.atm = new THREE.Mesh(new THREE.SphereGeometry(1.075, 96, 48), new THREE.ShaderMaterial({ uniforms: O.atmU, side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `varying vec3 vWP; void main(){ vec4 wp=modelMatrix*vec4(position,1.); vWP=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader: `uniform vec3 sunDir,ctr; uniform float rad; varying vec3 vWP;
        void main(){ vec3 ro=(cameraPosition-ctr)/rad; vec3 rd=normalize(vWP-cameraPosition); float b=dot(ro,rd); vec3 cp=ro-b*rd; float h=length(cp);
          float hh=(h-1.0)/0.075; if(hh<0.) discard;
          float dens=exp(-hh*3.6)*(1.-smoothstep(0.85,1.,hh));
          vec3 sd=normalize(sunDir); float mu=dot(normalize(cp),sd); float lit=smoothstep(-0.32,0.25,mu);
          vec3 c=mix(vec3(1.0,0.42,0.16),vec3(0.30,0.58,1.0),smoothstep(-0.12,0.3,mu));
          float fw=pow(max(dot(rd,sd),0.),8.)*1.6;
          gl_FragColor=vec4(c*dens*lit*(1.6+fw*2.2),1.);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }` }));
    scene.add(O.atm);
    // ocean tidal bulge (an ellipsoid shell, rim-lit; exaggerated)
    O.bulgeU = { op: { value: 0 }, col: { value: new THREE.Color(0.25, 0.62, 1.5) } };
    O.bulge = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), new THREE.ShaderMaterial({ uniforms: O.bulgeU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `varying vec3 vN; varying vec3 vWP; void main(){ vec4 wp=modelMatrix*vec4(position,1.); vWP=wp.xyz; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*wp; }`,
      fragmentShader: `uniform float op; uniform vec3 col; varying vec3 vN; varying vec3 vWP; void main(){ vec3 V=normalize(cameraPosition-vWP);
        float f=pow(1.-abs(dot(normalize(vN),V)),2.6); gl_FragColor=vec4(col*(f*1.2+0.08)*op,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }` }));
    scene.add(O.bulge);
    // ---------- moon ----------
    O.moonMat = new THREE.MeshStandardMaterial({ map: tMoon, bumpMap: tMoon, bumpScale: 0.9, roughness: 1, metalness: 0, color: 0xf2eee8, transparent: true });
    O.moon = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 64), O.moonMat); scene.add(O.moon);
    // a hot rocky "young moon" glow sphere and a Theia body for the impact chapter
    O.theia = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), new THREE.MeshStandardMaterial({ color: 0x8a6a55, roughness: 1, map: tMoon }));
    scene.add(O.theia);
    O.flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex([[0, '#ffffff'], [0.2, 'rgba(255,200,120,.9)'], [0.5, 'rgba(255,120,40,.35)'], [1, 'rgba(255,90,20,0)']]),
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false }));
    scene.add(O.flash);
    // ---------- lines: orbit ring, axis, laser ----------
    O.ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.8, 0.35), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    O.ring = new THREE.Mesh(new THREE.RingGeometry(0.997, 1.003, 360, 1), O.ringMat); scene.add(O.ring);
    const unitCyl = new THREE.CylinderGeometry(1, 1, 1, 12, 1, true); unitCyl.translate(0, 0.5, 0); unitCyl.rotateX(Math.PI / 2);
    const beam = (color) => { const m = new THREE.Mesh(unitCyl, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(m); return m; };
    O.axis = beam(new THREE.Color(1.6, 1.2, 0.4));
    O.laser = beam(new THREE.Color(0.3, 1.8, 0.5));
    O.pulse = beam(new THREE.Color(0.9, 3.4, 1.1));
    O.beam = beam;
  };

  function place(m, a, b, r) { m.position.copy(a); m.lookAt(b); m.scale.set(r, r, Math.max(1e-4, a.distanceTo(b))); }
  const vec = (a) => (a instanceof THREE.Vector3 ? a.clone() : V3(a[0], a[1], a[2]));
  M3.vec = (a) => vec(a);

  // p: { cam:{pos,target,up,fov}, sun:[x,y,z] (direction), earth:{pos,r,spin,tiltDeg,tiltAxis,show,lights,cloud},
  //      moon:{pos,r,opacity,show}, stars:1, milky:1, bulge:{amt, dir, op}, ring:{center,r,normal,op},
  //      axis:{op,len}, laser:{a,b,op,pulse}, theia:{pos,r}, flash:{pos,size,op}, exposure }
  M3.render = (p) => {
    const sun = vec(p.sun || [1, 0.15, 0.3]).normalize();
    const cam = p.cam;
    camera.fov = cam.fov || 40; camera.position.copy(vec(cam.pos)); camera.up.copy(vec(cam.up || [0, 1, 0]));
    camera.lookAt(vec(cam.target || [0, 0, 0])); camera.near = cam.near || 0.01; camera.updateProjectionMatrix();
    renderer.toneMappingExposure = p.exposure ?? 1;
    O.stars.material.uniforms.fade.value = p.stars ?? 1; O.stars.visible = (p.stars ?? 1) > 0.001;
    O.milky.material.opacity = p.milky ?? 1; O.milky.visible = (p.milky ?? 1) > 0.001;
    O.stars.position.copy(camera.position); O.milky.position.copy(camera.position);
    const sp = camera.position.clone().addScaledVector(sun, 1400);
    O.sunCore.position.copy(sp); O.sunHalo.position.copy(sp).addScaledVector(sun, -10);
    O.sunCore.scale.setScalar(p.sunSize ?? 70); O.sunHalo.scale.setScalar((p.sunSize ?? 70) * 8.5);
    O.sunCore.visible = O.sunHalo.visible = p.sunShow !== false;
    O.sunL.position.copy(sun).multiplyScalar(50); O.sunL.target.position.set(0, 0, 0);
    // earth
    const e = p.earth || {}; const showE = e.show !== false;
    const ep = vec(e.pos || [0, 0, 0]), er = e.r ?? 1;
    O.tilt.visible = O.atm.visible = showE;
    O.tilt.position.copy(ep); O.tilt.scale.setScalar(er);
    const tiltDeg = e.tiltDeg ?? 23.4;
    O.tilt.quaternion.setFromAxisAngle(vec(e.tiltAxis || [0, 0, 1]).normalize(), (tiltDeg * Math.PI) / 180);
    O.earth.rotation.set(0, e.spin || 0, 0);
    O.earthU.sunDir.value.copy(sun); O.earthU.cloudOff.value = e.cloud || 0; O.earthU.lightsK.value = e.lights ?? 1.6;
    O.atmU.sunDir.value.copy(sun); O.atmU.ctr.value.copy(ep); O.atmU.rad.value = er;
    O.atm.position.copy(ep); O.atm.scale.setScalar(er);
    // moon
    const m = p.moon || {}; const showM = m.show !== false && (m.opacity ?? 1) > 0.002;
    O.moon.visible = showM; O.moon.position.copy(vec(m.pos || [0, 0, -4])); O.moon.scale.setScalar(m.r ?? 0.27);
    O.moon.rotation.set(0, m.spin ?? -Math.PI / 2, 0);
    O.moonMat.opacity = m.opacity ?? 1; O.moonMat.color.setRGB(...(m.tint || [0.95, 0.93, 0.9]));
    O.moonMat.emissive.setRGB(...(m.glow || [0, 0, 0]));
    O.earthU.moonLight.value = showM ? (m.light ?? 0) * (m.opacity ?? 1) : 0;
    O.earthU.moonDir.value.copy(O.moon.position.clone().sub(ep).normalize());
    // bulge
    const b = p.bulge; O.bulge.visible = !!(b && b.op > 0.001);
    if (O.bulge.visible) {
      const d = vec(b.dir).normalize(); O.bulge.position.copy(ep);
      O.bulge.quaternion.setFromUnitVectors(V3(1, 0, 0), d);
      O.bulge.scale.set(er * (1.02 + b.amt), er * (1.02 - b.amt * 0.35), er * (1.02 - b.amt * 0.35));
      O.bulgeU.op.value = b.op;
    }
    // ring
    const rg = p.ring; O.ring.visible = !!(rg && rg.op > 0.001);
    if (O.ring.visible) { O.ring.position.copy(vec(rg.center || [0, 0, 0])); O.ring.scale.setScalar(rg.r); O.ring.quaternion.setFromUnitVectors(V3(0, 0, 1), vec(rg.normal || [0, 1, 0]).normalize()); O.ringMat.opacity = rg.op; }
    // axis through the earth (along the tilted pole)
    const ax = p.axis; O.axis.visible = !!(ax && ax.op > 0.001);
    if (O.axis.visible) { const pole = V3(0, 1, 0).applyQuaternion(O.tilt.quaternion); const L = (ax.len || 1.7) * er;
      place(O.axis, ep.clone().addScaledVector(pole, -L), ep.clone().addScaledVector(pole, L), 0.012 * er); O.axis.material.opacity = ax.op; }
    // laser
    const lz = p.laser; O.laser.visible = O.pulse.visible = !!(lz && lz.op > 0.001);
    if (O.laser.visible) { const a = vec(lz.a), bb = vec(lz.b); place(O.laser, a, bb, lz.w || 0.006); O.laser.material.opacity = lz.op * 0.6;
      const k = lz.pulse ?? -1; if (k >= 0 && k <= 1) { const c = a.clone().lerp(bb, k), d = a.clone().lerp(bb, Math.min(1, k + 0.06)); place(O.pulse, c, d, (lz.w || 0.006) * 2.2); O.pulse.material.opacity = lz.op; } else O.pulse.visible = false; }
    // theia + flash
    const th = p.theia; O.theia.visible = !!th;
    if (th) { O.theia.position.copy(vec(th.pos)); O.theia.scale.setScalar(th.r); }
    const fl = p.flash; O.flash.visible = !!(fl && fl.op > 0.001);
    if (O.flash.visible) { O.flash.position.copy(vec(fl.pos)); O.flash.scale.setScalar(fl.size); O.flash.material.opacity = fl.op; }
    renderer.render(scene, camera);
    return M3.canvas;
  };
  // draw the 3D frame onto the 2D film canvas (cover the whole frame)
  M3.draw = (ctx, p) => { const c = M3.render(p); ctx.save(); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(c, 0, 0, G.W, G.H); ctx.restore(); };
  // project a world point to film pixels (for 2D labels that track 3D objects); call after render with the same p
  M3.project = (v) => { const q = vec(v).project(camera); return [((q.x + 1) / 2) * G.W, ((1 - q.y) / 2) * G.H, q.z]; };
})();
