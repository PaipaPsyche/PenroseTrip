---
layout: post
title:  "2D Cellular Automata Lab"
date:   2020-05-06 02:02:00 -0300
description: "Public interactive laboratory open for 2D cellular automata experimentation and scientific outreach."
categories: sketch
author: Paipa Psyche
image: ""
icon: ""
tags:
  sketch
  automata
  p5
  javascript
---
A **cellular automaton** is a system in which a grid of cells determines its state (ON or OFF) according to rules established on the states of a determined **neighborhood** of cells in the grid. The system behaves according to a **set of game rules** that commands each cell in the grid to adopt in the net step a state based on the previous states of the neighbors.

## The sketch

These Game rules are codified in a structure similar to DNA. Each cell has 8 neighbors, so there are 9 states each cell hast to handle (including own state). As each one of these states are values 0 (OFF) or 1 (ON), the number of different possible neighborhood configurations, or cases, are 2 to the power of 9, or 512. Each configuration has a response ,for example, if the immediate  left neighbor is ON, then this cell turns ON as well. If we assign each one of this states to a position in a 512-length string, and in this string we store the response, the result is a 512-length string of 0's and 1's describing the behavior of the system. This might be codified to be expressed as genes in the form of alphanumeric values and colors. This 512-string is called the "rule code".

This means that **a single rule code** describes the **unique behavior** of a system and, moreover, there exist as much as 2 to the power of 512 possible rule code configurations. In other words, there are more than 10 million million million million . . . (25 times million) . . . million million million possible systems.

This gene structure was, in a beginning, a way to **store compressed data** information of the state, but as experimentation went on I realized common behaviors tend to be stored in the same Gene. experimentation with cellular automaton is easy and fun as long as you find **the beauty of the patterns** made by simple binary rules. These systems are controversial in the study of life emergence and complex systems, for example, you may know the famous **Conway's Game of Life** which is an specific rule code for 2D cellular automata that resembles organic movement from simple configurations.

## The purpose





## The result




## The controls
