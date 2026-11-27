import json
S = """
c0|c0_1|This is a banana. And roughly once every seventy-five minutes, it does something amazing. It shoots out a tiny speck of antimatter.
c0|c0_2|A positron. It flies out, meets an ordinary electron, and both of them vanish. Gone. Turned into a flash of light.
c0|c0_3|Here's the problem. Our best theory says the Big Bang made matter and antimatter in equal amounts. Every particle got a twin.
c0|c0_4|And twins that meet, vanish. So the universe should have ended up empty. No stars. No planets. No bananas. No you.
c0|c0_5|And yet, here you are. By the end of this video, you'll know what antimatter really is, how scientists hold something that destroys every box it touches, and the tiny clue that might explain why anything exists at all.
c0|c0_6|So, why didn't the universe destroy itself?
c1|c1_1|Chapter one. The mirror twin.
c1|c1_1h|Antimatter wasn't found in a lab first. It was found in an equation.
c1|c1_2|In nineteen twenty-eight, a British physicist, Paul Dirac, wrote down an equation for the electron. It worked beautifully. But it also allowed something strange: a particle just like the electron, with the opposite charge.
c1|c1_3|Four years later, in nineteen thirty-two, Carl Anderson was photographing cosmic rays in a cloud chamber. One track curved the wrong way. Same mass as an electron, but positive. The positron.
c1|c1_4|Dirac won the Nobel Prize in nineteen thirty-three. Anderson won his in nineteen thirty-six.
c1|c1_5|And it's not just electrons. Every particle has a mirror twin. Same mass, opposite charge. Protons have antiprotons. Hydrogen even has antihydrogen.
c1|c1_6|Now, a myth: antimatter is science fiction. It isn't. Bananas make it, because of potassium-forty. And since your body needs potassium too, even you make a positron every once in a while.
c1|c1_7|But if every particle was born with a twin, where did all the twins go?
c2|c2_1|Chapter two. The flash.
c2|c2_1h|What happens when you shake hands with your mirror twin? You both disappear.
c2|c2_2|When a particle meets its antiparticle, they annihilate. Their mass turns into pure energy, mostly light. That's Einstein's E equals m c squared, with nothing left over.
c2|c2_3|And that energy is enormous. One gram of antimatter meeting one gram of matter would release about as much energy as a big power station makes in two whole days.
c2|c2_4|So, myth number two: antimatter as a super fuel, or a super bomb. Here's the reality check.
c2|c2_5|CERN, near Geneva, runs an antimatter factory. If it ran non-stop for a whole year, all its antiprotons together would light a one hundred watt bulb for about five seconds.
c2|c2_6|Making antimatter is slow. Keeping it is even harder. The moment it touches the wall of its container, it's gone.
c3|c3_1|Chapter three. How to hold nothing.
c3|c3_1h|How do you store something that destroys any box you put it in?
c3|c3_2|You don't let it touch anything. Scientists build traps out of magnetic and electric fields, inside an almost perfect vacuum. The particles float in the middle, touching nothing.
c3|c3_3|CERN's factory makes about four hundred million antiprotons an hour. The experiments manage to catch about ten percent.
c3|c3_4|One experiment, called ALPHA, builds whole anti-atoms. Up to three thousand antihydrogen atoms an hour, kept for up to one hundred hours.
c3|c3_5|In twenty twenty-three, ALPHA asked a simple question. Does antimatter fall down, or up? They let the atoms go. They fell down, just like normal matter.
c3|c3_6|This year, antimatter even went on a road trip. On the twenty-fourth of March, ninety-two antiprotons rode around CERN on a truck, inside a portable trap called BASE-STEP. The plan is to drive them to quieter labs, away from the factory's magnetic noise.
c3|c3_7|Then, in October, a team at Northwestern University in the United States reported something even more delicate. A single positron, held for months, at about a third of a degree above absolute zero.
c3|c3_8|Why all this effort, for one tiny particle? Because they're hunting for a difference.
c4|c4_1|Chapter four. One in a billion.
c4|c4_1h|Everything you have ever seen is a leftover.
c4|c4_2|Physicists can compare how much matter survived with how much light was left behind. And the answer is tiny.
c4|c4_3|For every billion pairs of matter and antimatter that wiped each other out, about one extra particle of matter survived. Just one.
c4|c4_4|Every star, every planet, every person, is made from those survivors. One in a billion.
c4|c4_5|And light from that early universe is still here. About four hundred and eleven particles of ancient light, in every cubic centimetre of space around you.
c4|c4_6|Now, myth number three. Maybe the missing antimatter is just hiding somewhere, in anti-stars, or anti-galaxies.
c4|c4_7|If it were, we'd see bright flashes where anti-regions touch normal ones. No such zones have been found. Physicists now think no part of the observable universe is made of antimatter.
c4|c4_8|So the universe didn't hide its antimatter. It lost it. Which means the laws of physics must slightly favour matter. But how?
c5|c5_1|Chapter five. The rule breakers.
c5|c5_1h|In nineteen sixty-seven, a Soviet physicist wrote down the recipe for a universe like ours.
c5|c5_2|His name was Andrei Sakharov. He said three things must be true.
c5|c5_3|One: nature needs a way to make more particles than antiparticles. Two: matter and antimatter must follow slightly different rules. Three: it all had to happen out of balance, in the hot, fast early universe.
c5|c5_4|That second rule has a name: C P violation. And we have actually seen it. In nineteen sixty-four, James Cronin and Val Fitch found the first tiny difference, in particles called mesons.
c5|c5_5|Then, in twenty twenty-five, the LHCb experiment at CERN saw it for the first time in baryons, the family of protons and neutrons. A particle called the beauty lambda decayed differently from its antiparticle, by about two and a half percent.
c5|c5_6|It took more than eighty thousand decays to be sure. The result was published in Nature in July.
c5|c5_7|But here's the twist. The amount of difference our best theory predicts is many orders of magnitude too small to explain why we are here.
c5|c5_8|The rule breaking is real. There just isn't nearly enough of it. Something is missing.
c6|c6_1|Chapter six. The hunt for the missing piece.
c6|c6_1h|If the answer exists, it's hiding in a difference smaller than anything we've ever measured.
c6|c6_2|One suspect is the neutrino, a ghostly particle that barely touches anything. A matter-antimatter difference in neutrinos may exist, but it hasn't been measured yet.
c6|c6_3|Another way is to compare the twins directly, as precisely as humanly possible. That's what the single positron at Northwestern is for.
c6|c6_4|The team wants to measure how magnetic the positron is, and compare it with the electron. The electron has already been measured to one part in ten trillion.
c6|c6_5|If the twins are perfect mirrors, the numbers will match exactly. If they don't, Gerald Gabrielse, who leads the lab, says it would be the biggest discovery in physics in the last century.
c6|c6_6|So far, every test says the same thing. The twins match. Same mass. Same fall. Which makes our existence even stranger.
c7|c7_1|So, why didn't the universe destroy itself?
c7|c7_2|The honest answer is: we don't know yet. But we know how close it came. For every billion particles that vanished, one survived.
c7|c7_3|You are made of those survivors. Every atom in you came through the biggest disappearance in history.
c7|c7_4|So the next time you peel a banana, remember. Somewhere inside it, a tiny flash is replaying the oldest fight in the universe. And matter is still winning.
c7|c7_5|If you enjoyed this, like the video and subscribe to Whyverse. And for shorter stories, find us on Instagram and TikTok.
"""
L = [l.split('|', 2) for l in S.strip().split('\n')]
json.dump(L, open('lines.json', 'w'), indent=1)
print(len(L), 'lines', sum(len(x[2].split()) for x in L), 'words')
