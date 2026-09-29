---
layout: post
title:  "Quantum Alchemy"
date:   2021-07-27 02:38:20 -0300
description: "Gee ! My first fictional particle physics Lab..."
categories: "sketch"
type: ""
author: Paipa Psyche
image: "/assets/img/posts/sketch-quantumalchemy.png"
icon: ""
link: "/assets/sketches/QuantumAlchemy/QuantumAlchemy.html"
tags:
  sketch
  javascript
  p5
  physics
  simulation

---

## The Sketch
**Quantum Alchemy** is a fictional particle-physics sandbox: an entire invented subatomic zoo, complete with mass, charge, a "color" quantum number, half-life and a matter/antimatter counterpart for every species, all coexisting inside a single simulated plane. None of these particles exist in the real Standard Model — the names (*pluson*, *minon*, *glion*, *vuon*, *anurion*, *jaudion*, *rhoton*, *nuon*, *fixon*, and their antiparticles) are entirely made up — but the rules governing how they collide, decay and bind together follow the same logic real particle physics runs on: conserved quantities, probabilistic branching, and finite lifetimes.

## The Purpose
I wanted to know what it feels like to be on the other side of the particle-physics textbook: not learning that the Standard Model has quarks and leptons with such-and-such properties, but actually building a small universe with its own zoo of particles and watching what falls out of the rules you wrote. Discovery here is literal — the sketch keeps a private tally of which particles (and antiparticles) you've personally witnessed appear through a reaction or a decay, and you can only deliberately summon a species yourself once you've discovered it the hard way, exactly like a real experimentalist can't design an experiment around a particle nobody has ever detected yet.

## The Result
Every colored circle on the plane is one particle, sized and colored by its own properties (antimatter gets its own inverted palette). Left alone, unstable particles decay into lighter ones once their half-life runs out; brought close together, pairs can react into something new, or — for the right combinations — bind into a labeled composite state, tagged with names borrowed from the real particle zoo (π, Δ, Ω, Σ, γ, μ, α, Φ, η) even though the underlying particles are entirely fictional. Every reaction and decay is logged live as a scrolling feed of equations (for example `P + M ➝ R`), time-stamped in zeptoseconds, alongside a running discovery counter in the corner.

## The Controls
Left-click anywhere on the plane to spontaneously spawn a matter/antimatter pair, if the particles currently in play allow for one. Hover the plane and press a particle's letter key (shown in its info panel) to shoot that particle at your cursor — but only for species you've already discovered; everything else stays locked until the simulation shows it to you first. **Shift** toggles between summoning matter and antimatter, **Q** flips which side of that toggle is active, and **Enter** pauses the whole simulation so you can read the reaction log at your own pace. The panel on the right lets you switch between *shoot* (fire once) and *source* (keep emitting) modes, control shot count and direction, and dial in an optional directional field that pushes charged particles around; you can also choose the plane's boundary behavior (walls, open, or periodic) and toggle what's drawn (tags, connecting lines, composite groups) or whether the plane absorbs matter/radiation at its edges. The red buttons let you wipe every particle, clear active sources, or reset the reaction log.

## Latest Release
<a href="{{site.baseurl}}/assets/sketches/QuantumAlchemy/QuantumAlchemy.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 17  / Aug / 2022
