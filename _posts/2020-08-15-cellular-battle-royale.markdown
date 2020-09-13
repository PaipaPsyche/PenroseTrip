---
layout: post
title:  "Cellular Battle Royale"
date:   2020-08-28 22:28:20 -0300
description: "Evolution has interesting ways of showing disinterest."
categories: "sketch"
type: ""
author: Paipa Psyche
image: "/assets/img/posts/sketch-cell-royale.png"
icon: ""
link: "/assets/sketches/CellRoyale/cell-royale.html"
tags:
  sketch
  javascript
  p5
  genetic learning

---

## The Sketch
With more experience with genetic algorithms, I decided to experiment with one that involved continuous and more complex behaviors. In my other genetic learning sketches, the genetic algorithm always boils down to a set of discrete values as a possible gene expression, but in this case a much broader spectrum of values and possible alterations is being taken. They are independent cells that react to three external agents: waste, food and other cells. The cells roam in a free space and their genetic expression regulates everything within, from nutrition to movement.

## The Purpose
Lately I have been interested in establishing points of comparison between the **perfect chaos** of nature and the **determinism** of computing. Addressing complex concepts such as *'evolution'* and *'learning'* with this type of exercise leaves an appetizer for all the mysteries that lie beyond logic and biology.

> Playing to be God is not that bad ... I mean, what could go wrong?

## The Result
The genetic monitor allows to graph the genetic expression of the cell in such a way that it is easy to determine the origin of its affinity to certain behaviors. The cell monitor allows you to track all the vital signs and content of the cell it represents. Both are ways to visualize confusing data in a more attractive and intuitive way.

Each Genetic code has a unique number to identify itself. Each  code has two parents, each with an **ID number** as well.


<div class="centered-square">
  <div class="imgsq">
    <img src="/assets/img/posts/sketch-royale-img1.png" class ="post-midimage-across">
  </div>
  <div class ="txtsq">
    <p class="imglbl">

      Genetic Code and Vital Signs of an arbitrary cell.

    </p>
  </div>
</div>

### Genetic Slot Monitor
It is the representation of the genetic code of each cell. This might be useful when comparing different genomes and verifying inheritance properties. You can detail some graphic properties that provide information about genetic expression (left box of the image):
#### Numbers
* In the lower left corner there is the generation of the given genome.
* in the bottom,centered, the name of the genetic id code in format "DAD-ME-MOM".
* When selected in the genetic Slot Monitor, the boxes have the slot number in the top left corner.

#### Central Core
In the middle of the diagram there is a circle that represents the **sensitivity**  gene of the cell. The larger the circle, the cell has a greater detection range for food, debris and other cells.

The **metabolic rate** gene of the cell is represented as the speed of the internal clock of this circle. A cell with a slow metabolic rate looks like a slow clock, implying that this cell takes much longer to complete internal processes and make decisions. This metabolic rate can best be compared using a white circular arc that is within the main circle, the length of this arc represents the time between cycles of the cell.

#### Top  axis
This is the **affinity** axis, where a line extending to the left means a negative value and a line to the right means positive affinity.

* The Green gene is the **cell affinity**, meaning the *attraction* to other cells. the extra line segment represent a bias in the mass subtraction in order to react to the other cell's size.
* The Blue gene is the **food affinity**, meaning attraction to food particles.
* The Red gene is the **waste affinity**, meaning attraction to waste particles.

#### Bottom  axis
This is the **deterministic** axis, where a line extending to the left means a deterministic cell behavior and a line to the right means random movement approach.

* The top olive gene is the **speed persistence**, which each cycle determines whether being conservative and keeping the same direction (Right) or changing the movement direction according to other internal and external responses (Left)
* The bottom purple gene is the **arbitrary movement**, which each cycle determines whether taking  a step in a random direction (Right) or to obey to other internal and external responses (Left)

#### Left  axis
This is the **exploration** axis. The longer the line corresponding to a process, it means that the cell uses more energy in that process each cycle.

* The cyan gene is for **shield regeneration**. High values means high energy investment in cellular wall regeneration.
* The pink gene is for **movement**. Higher values represent strong thrusts in cell movement.

#### Right axis
This is the **nutrition** axis. The longer the line corresponding to a process, it means that the cell uses more energy in that process each cycle.

* The yellow gene regulates the **energy converter**. High values means ingested food is rapidly converted into energy, but high conversion rates consume more energy and generate more wastes as well.
* The orange gene regulates the  **waste output**. Higher values in cells means they invest more energy in waste disposal.

### Cellular Vital Monitor
This diagram allows to keep an account of the internal processes of the cell as well as the resources it has and its characteristics.

* On top, a white loading bar representing the **metabolic rate** of the cell. Each time the bar is completed, a new cycle begins.
* The exterior cyan circle represents the **shield** integrity. Once it reaches 0, damage will be taken by the cell's health.
*  the inner yellow circle is the **energy** level. Once 0, energy for completing the cycles will be taken from the cell's health.
* The inner green pie plot is the cell's **health**.
* The purple number is the cell's **energy reservoir**.
* The red number is the **waste** level inside the cell. Once 100 is reached, each cycle the cell has 100 or more waste it loses health.
* The orange number is the number of **unprocessed food** particles inside the cell.
* The bottom left number is the cell's **mass**.


### Goals and Indicators

#### MAIN GOAL

The *main goal* is the scoring method for each cell, giving the cells the chance to reproduce in next generation depending on this score. the different scoring methods evaluate different goals, such as:

* **eat :** eat cells and food.
* **food :** eat as much food as possible.
* **size :** gain mass.
* **cycles :** complete full cycles.
* **time :** survive as long as possible.
* **hunting :** eat other cells.
* **berserk :** eat EVERYTHING.
* **die :** existence is pain. I just want to die fast.
* **pick :** eat as much food and cells (relative to waste) as possible.
* **poop :** eat as much waste as possible.

#### CELL INDICATORS

Each cell has 4 information slots (2 in the upper edge and 2 in the lower edge) where you can display the information you choose:

* **health :** health level.
* **score :** score (according to main goal selection).
* **shield :** shield integrity level.
* **energy :** energy level.
* **mass :** mass index.
* **food :** food particles taken.
* **dirt :** waste particles taken.
* **preys :** cells eaten.
* **cycles :** cycles completed.
* **id :** genetic id.
* **dad :** dad's genetic id.
* **mom :** mom's genetic id.
* **none :** display nothing.


## The Controls
The buttons and sliders of the application allow you to interact with the simulation parameters.

**SLIDERS:**

* **Viscosity** defines the resistance the medium has to the movement of cells.
* **Initial Food** sets the number of food particles present in the beginning of each generation.  
* **Minimum food** is the minimum number of food particles that the simulation has. If there are less food particles, the simulation will append new ones to the medium.

**BUTTONS:**

* **Nex Generation** polls the population score and resets the map, generating a new genetic pool with the previous generation data.
* **Remove Items** removes all food and waste particles.
* **Clear monitors** blanks all the genetic slots.
* **Toggle vectors** switches ON/OFF to display all the cell vectors.

* **Enable/Disable auto-experiments** switches ON/OFF the automatic experimentation procedure. Always press **RESET** when beginning a new experiment sequence.

* **RESET** clear all genetic displays, deletes genetic pool and restarts generation counter. It can only be activated if *auto-experiments* are enabled.

**SELECTORS:**
* **Main Goal** defines the scoring method for the cells.
* **CELL INDICATORS** set the 4 values that each cell has displayed in the upper and lower margins.

**KEYBOARD & MOUSE:**

* **CLICK :** operates buttons,selectors and sliders. click on a cell to display its genetic code and its vital signs.
* **1 / 2 / 3 / 4 (While hovering a cell):** displays the cell´s genetic code in genetic slot (1,2,3, or 4) .
* **N :** Next generation.
* **C :** Creates a new cell in the cursor XY position
* **F :** Creates a food particle in the cursor XY position.
* **W :** Creates a Waste particle in the cursor XY position.
* **X (While hovering a cell):** Explodes the cell.





## Latest Release
<a href="{{site.baseurl}}/assets/sketches/CellRoyale/cell-royale.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 13  / sept / 2020
