---
layout: post
title:  "2D Cellular Automata Lab"
date:   2020-05-06 02:02:00 -0300
description: "Public interactive laboratory open for 2D cellular automata experimentation and scientific outreach."
categories: "sketch"
author: Paipa Psyche
image: "/assets/img/posts/sketch-cellular.png"
icon: ""
link: "/assets/sketches/cellular-automata/2d-cellular-automata.html"
tags:
  sketch
  automata
  p5
  javascript
---
A **cellular automaton** is a system in which a grid of cells determines its state (ON or OFF) according to rules established on the states of a determined **neighborhood** of cells in the grid. The system behaves according to a **set of game rules** that commands each cell in the grid to adopt in the net step a state based on the previous states of the neighbors.

## The Sketch

These Game rules are codified in a structure similar to DNA. Each cell has 8 neighbors, so there are 9 states each cell hast to handle (including own state). As each one of these states are values 0 (OFF) or 1 (ON), the number of different possible neighborhood configurations, or cases, are 2 to the power of 9, or 512. Each configuration has a response ,for example, if the immediate  left neighbor is ON, then this cell turns ON as well. If we assign each one of this states to a position in a 512-length string, and in this string we store the response, the result is a 512-length string of 0's and 1's describing the behavior of the system. This might be codified to be expressed as genes in the form of alphanumeric values and colors. This 512-string is called the "rule code".

This means that **a single rule code** describes the **unique behavior** of a system and, moreover, there exist as much as 2 to the power of 512 possible rule code configurations. In other words, there are more than 10 million million million million . . . (25 times million) . . . million million million possible systems.



## The Purpose
In almost all the processes we see in the modern world, the behavior of **organized growth and modularity** seem to be somehow present. But this is not where this concept originates, because even when humanity lived in caves we noticed the patterns that nature followed around us. In the flowers, in the roots, in the clouds, in the butterfly wings, in the thunders, in the swarms: the world is full of patterns that in one way or another can be reduced to simple modules following the same rules over and over time; the phenomenon can be **reduced** to the implementation of cellular automata.

Humans are designed to notice patterns even if they are not there, but when they are, we marvel at imagining the reason for their existence. One way in which we were able to explain the reason for many patterns present in nature was to **formulate the problem as a cellular automaton**, a system of individual modules programmed to follow the same rules that may or may not allow interaction between the agents of the system. This way of modeling complex problems serves to compartmentalize complex behaviors and define them as simple rules that are repeated over and over again **out of synchronicity**. A swarm of simple machines that can express complexity from the interaction between themselves, conditioned to **react to their environment** in a pre-defined way.

The intention when creating this laboratory was to offer tools to program the behavior of a cellular automaton to **anyone** who is interested in the subject and is **not trained in programming** (Not of all us can be nerds, right?). This laboratory is a simple and **interactive** reduction of what it means to program a cellular automaton and creates an environment of **free experimentation**, allowing to propose new inventions that can be modeled at will or found by chance.

In the day to day the idea of ​​cellular automaton grazes our heads and many times **we do not stop to observe enough** to formulate an idea. Cellular automata are interesting concepts that challenge the imagination and logic without the need to go exclusively into the mathematical field. This universality of applications makes this study area to be full of surprises for those who decide to venture into the dynamic world of modularity and the emergence of complex behaviors.




## The Result


When I built this specific gene codification was, in a beginning, a way to **store compressed data** information of the state, but as experimentation went on I realized common behaviors tend to be stored in the same Gene. experimentation with cellular automaton is easy and fun as long as you find **the beauty of the patterns** made by simple binary rules. These systems are controversial in the study of life emergence and complex systems, for example, you may know the famous **Conway's Game of Life** which is an specific rule code for 2D cellular automata that resembles organic movement from simple configurations.

## The Controls
* **ENTER** : Runs/Stops the simulation .
* **R** : Create random rule code (Random DNA button).
* **E** : Evolves a single step (Step button).
* **X** : Toogles bombing (switch random cell every generation).
* **M** : Mutates a random gene.
* **P** : Switches the state of a random cell.
* **B** : Sets all cells to OFF (Blank button).
* **I** : Inverts the value of every cell.
* **C** : Sets the center Cell to ON.
* **H / V / D / A** : Sets an alternating pattern along the central (Horizontal / Vertical / Diagonal / Antidiagonal) respectively.
* **0 / 1** : create a rule code with only 0 / 1 respectively (Empty DNA button).
* **2/3/4** : Sets a figure of ON cells in the center.

## Latest Release
<a href="/assets/sketches/cellular-automata/2d-cellular-automata.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 09  / may / 2020
