---
layout: post
title:  "Solar System Generator"
date:   2019-05-18 02:19:00 -0300
description: "How many colonized solar systems can fit into a simple javascript sketch?"
categories: sketch
author: Paipa Psyche
image: ""
icon: ""
tags:
  sketch
  space
  p5
  javascript
  random
---

In the universe there are **thousands of trillions of stars**, each with the possibility of having a planetary system that orbits it and, by extension, the tiny possibility of containing an intelligent civilization.

## The Sketch
In this case, there is no scientific rigor regarding the value of the simulation since it is a **random solar system generator**. Graphic distances such as the radii of the stars are far from adequate, but only for this time let us indulge in science fiction.

This is a generator of solar systems based on random numbers; All the solar systems shown are unique and unrepeatable for this very reason. There is the possibility of finding advanced civilizations and their colonies, ruins of those that did not survive, black holes and ringed planets, among other wonders. The system also displays **geological and orbital information** of the planets as well as relevant information from the star, this in order to provide more context in a universe without any context.



## The Purpose
The goal with this bunch of messy code is to **propose a mental exercise** where you can, in some way, have a catalog of the stars of the universe. No matter how far they may be, even if they are outside of our visible universe, they are registered in the catalog as well as the civilizations that are present, if any.

Beyond providing fictitious data and representing some scientific value, this sketch generates a poetic exercise where anyone can let their imagination run wild. It can be useful for thinkers looking for inspiration for a new creation, or simply a fairly scientific doodle to entertain all audiences.


## The Result

While the orbit model, distance ratios, and much of the celestial body data are inaccurate, the name generator is an innovation. It generates mostly readable names with hierarchy rules to inherit the name of the system to some of its planets. This is a major achievement considering that it is a purely random and static generator, that is, that they are names that arise from the randomness of letters.

The creation of fictional civilizations gives an **extra pinch of sci-fi** theatricality to the sketch, and generating geological data only provides more and more tools for anyone who wants to give a story to each solar system. As for aesthetics, there is not much to say: p5 is a fabulous tool for 2D, and although I know that there are ways to generate 3D visualizations, I wanted this exercise to have a more **minimalist aesthetic** and similar to a **navigation service**, like a GPS or a tourist map. Orbits are as elliptical as possible, and without being pretentious I am proud of the aesthetics of Dyson's black holes and sphere stars.

**Note.** I solemnly believe that in the future Dyson's spheres will not be rigid cage-like structures, but rather **many energy collection and transmission satellites** forming a synchronized network around the star and sending its energy to the planet with the orbit closest to the star. That is why I designed the Dyson sphere as a set of dots swarming around the circle that I blatantly called *"star."*


## The Controls
The position of the cursor in the X-axis determines the direction and advance of time. The position of the cursor in the Y-axis dictates the speed with which time advances. To explore a new solar system, just CLICK the button in the bottom right. To retrieve the last solar system you saw use the button in the bottom left.

* **ENTER :** Moves to next system
* **BACKSPACE :** Aligns the planets
* **SHIFT :** Turns the star into a black hole.
* **CTRL :** Moves randomly planets on their orbits
