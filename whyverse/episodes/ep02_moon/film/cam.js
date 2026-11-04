// 3D staging helpers: camera paths and the default Earth–Moon scene (scene units: Earth radius = 1; not to scale).
(function () {
  const U = globalThis.U; const { clamp, lerp, ease } = U;
  const K = {};
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const nrm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  K.add = add; K.mul = mul; K.nrm = nrm;
  K.lerp3 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
  K.SUN = nrm([1, 0.12, 0.35]);
  // spherical position around a target: az (deg, around Y), el (deg above the XZ plane)
  K.sph = (r, az, el, tg = [0, 0, 0]) => { const a = (az * Math.PI) / 180, e = (el * Math.PI) / 180; return add(tg, [r * Math.cos(e) * Math.sin(a), r * Math.sin(e), r * Math.cos(e) * Math.cos(a)]); };
  // moon on its orbit (radius d, angle in deg, in the XZ plane slightly inclined)
  K.moonAt = (d, ang, inc = 5) => { const a = (ang * Math.PI) / 180, i = (inc * Math.PI) / 180; return [d * Math.cos(a), d * Math.sin(a) * Math.sin(i), -d * Math.sin(a) * Math.cos(i)]; };
  K.cam = (pos, target = [0, 0, 0], fov = 40, up = [0, 1, 0]) => ({ pos, target, fov, up });
  // interpolate two cams with easing
  K.mix = (a, b, u) => ({ pos: K.lerp3(a.pos, b.pos, u), target: K.lerp3(a.target, b.target, u), fov: lerp(a.fov, b.fov, u), up: K.lerp3(a.up || [0, 1, 0], b.up || [0, 1, 0], u) });
  K.path = (t, keys) => { // keys: [[t, cam], ...] eased between
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 0; i < keys.length - 1; i++) { const [ta, a] = keys[i], [tb, b] = keys[i + 1]; if (t <= tb) return K.mix(a, b, ease.inOutCubic((t - ta) / Math.max(1e-6, tb - ta))); }
    return keys[keys.length - 1][1];
  };
  // the default scene; o overrides top-level keys (shallow) and earth/moon (one level deep)
  K.scene = (t, o = {}) => {
    const base = { sun: K.SUN, stars: 1, milky: 1, exposure: 1,
      earth: { pos: [0, 0, 0], r: 1, spin: t * 0.06 + 1.2, cloud: t * 0.0015, tiltDeg: 23.4, tiltAxis: [0, 0, 1], lights: 1.6 },
      moon: { pos: K.moonAt(5.5, 35), r: 0.27, opacity: 1, light: 1 } };
    const out = Object.assign({}, base, o);
    out.earth = Object.assign({}, base.earth, o.earth || {}); out.moon = Object.assign({}, base.moon, o.moon || {});
    return out;
  };
  // world → screen for overlays: render first, then project
  K.draw = (ctx, p) => { M3.draw(ctx, p); };
  K.proj = (v) => M3.project(v);
  globalThis.K = K;
})();
