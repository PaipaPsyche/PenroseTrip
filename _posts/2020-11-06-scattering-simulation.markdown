---
layout: post
title:  "Scatering Simulation"
date:   2020-11-06 01:00:01 -0300
description: "Studying electrostatic interactions when bombarding matter"
categories: sketch
author: Paipa Psyche
image: "/assets/img/posts/sketch-scattering.png"
icon: ""
link: "/assets/sketches/scattering/scattering.html"
tags:
  sketch
  physics
  p5
  javascript
  microscopic
---


> Scattering, in physics, is a change in the *direction of motion* of a particle because of a **collision** with another particle.[...] In probing the interior of the atom, the physicist [**Ernest Rutherford**](https://en.wikipedia.org/wiki/Ernest_Rutherford) passed a stream of alpha particles through a thin sheet of gold foil. The alpha particles were emitted by a radioactive material and had enough energy to penetrate an atom; although most passed right through the gold foil, some were *deflected* in a way that indicated that the scattering was produced by a **Coulomb force**.

- Taken from [Britannica Encyclopedia](https://www.britannica.com/science/scattering)

## The Sketch

Particles with mass and charge are created that are subject to a simulation of N bodies where the only given interaction is the coulomb force (Electrostatic). This implies that the force between particles is proportional to the inverse of the square of the distance, and it is also proportional to the charges of the two interacting bodies. Likewise, two charges of opposite sign have attractive force while two charges of similar sign are subject to a repulsive force.


## The Purpose
Once the behavior of particles that obey Coulomb's laws in 2D had been simulated, the next step was to formulate an **experiment** that would allow us to see the benefits of said simulation. Particle scattering is a great example to study as it allows us to visualize how *small changes* in the charges or positions of the particles on the bombarded surface affect the direction of the *incident particle beam*.

## The Result
A simulation consistent with expectations is obtained, at least in terms of the defection of charged particles. This is seen when the **dust** particles (those that make up the incident beam) are repelled or attracted towards the **ions** (particles with a greater charge that take on red or blue colors depending on the sign of said charge) consistently with their distance to said charges. In ion structures, such as those present in the simulation, we can observe how discrete changes in ions distant from the **point of collision** of the beam, manage to deflect it.

An interesting result is to *liberate* an ion from the fixed position where it is inside the structure, leaving it as another free particle within the simulation. Most of the times, this ion is *trapped* within the structure in a periodic motion that creates binary oscillations in the deflected beam. These vibrations of the trapped ion manage to create the equivalent of a spectrum in the detector (if any) and only measuring the deflected beam could give indications of these vibrating ions within the structure.

Another result associated with the previous one is associated with the dust particles outside the beam and the *inflection points*. When the beam passes very close to an ion, it curves the beam considerably, this is expected given the correlation between force and distance in **coulomb's laws**. I call these events **inflection points**. The interesting thing is that when a particle outside the incident beam disturbs the beam near these points, it manages to create **large disturbances** compared to a particle that disturbs the beam at any other point in its trajectory.

## The Controls
The particle beam enters the screen from the left side. Then it comes across 3 barriers of *"ions"*, each with a different charge than the previous layer, and then an *object* with ions of arbitrary charge.

CLICK on an atom to *flip* its charge. CLICK on an empty space to create a dust particle (same kind of particle present in the incident beam) with velocity to the left.

* **P (while hovering an ion):** liberates the ion from its fixed position.
* **F :** flips the charge of a random ion.
* **W :** Moves the origin of the beam UP.
* **S :** Moves the origin of the beam DOWN.



## Latest Release
<a href="{{site.baseurl}}/assets/sketches/scattering/scattering.html" class="link-sketch">
<span >
TEST SIMULATION
</span>
</a>

Latest commit : 06  / Nov / 2020
