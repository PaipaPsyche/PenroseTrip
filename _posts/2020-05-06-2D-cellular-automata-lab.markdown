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
A **cellular automaton** is a system in which a grid of cells determines its state (**ON** or **OFF**, for example) according to rules established on the states of a determined **neighborhood** of cells in the grid. The system behaves according to a **set of game rules** that commands each cell in the grid to adopt (in the next generation) a state based on the previous states of the neighbors.

## The Sketch

These Game rules are codified in a structure similar to DNA. Each cell has 8 neighbors, so there are 9 states each cell hast to handle (including own state). As each one of these states are values 0 (OFF) or 1 (ON), the number of different possible neighborhood configurations, or cases, are 2 to the power of 9, or 512. Each configuration has a response ,for example:

>if the immediate  left neighbor is **ON**, then this cell turns **ON** as well.

If we assign each one of this states to a position in a 512-length string, and in this string we store the response, the result is a 512-length string of 0's and 1's describing the behavior of the system. This might be codified to be expressed as genes in the form of alphanumeric values and colors. This 512-string is called the "rule code".

This means that **a single rule code** describes the **unique behavior** of a system and, moreover, there exist as much as 2<sup>512</sup> possible rule code configurations. In other words, there are more than <abbr title ="An octillion is 10 to the power of 27">10 octillion octillion octillion octillion octillion</abbr> possible systems.



## The Purpose
In almost all the processes we see in the modern world, the behavior of **organized growth and modularity** seem to be somehow present. But this is not where this concept originates, because even when humanity lived in caves we noticed the patterns that nature followed around us. In the flowers, in the roots, in the clouds, in the butterfly wings, in the thunders, in the swarms: the world is full of patterns that in one way or another can be reduced to simple modules following the same rules as the system's clock ticks; the phenomenon can be **reduced** to the implementation of cellular automata.

Humans are designed to notice patterns even if they are not there, but when they are, we marvel at imagining the reason for their existence. One way in which we were able to explain the reason for many patterns present in nature was to **formulate the problem as a cellular automaton**, a system of individual modules programmed to follow the same rules that may or may not allow interaction between the agents of the system. This way of modeling complex problems is used to split complex behaviors and define them as simple rules that are repeated over and over again **out of synchronicity**. An aggregate of simple machines that can express complexity from the interaction between themselves, conditioned to **react to their environment** in a pre-defined way.

The intention when creating this laboratory was to offer tools to program the behavior of a cellular automaton to **anyone** who is interested in the subject and is **not trained in programming** (Not of all us can be nerds, right?). This laboratory is a simple and **interactive** reduction of what it means to program a cellular automaton and creates an environment of **free experimentation**, allowing to propose new inventions that can be modeled at will or found by chance.

In the day to day the idea of ​​cellular automaton grazes our heads and many times **we do not stop to observe enough** to formulate an idea. Cellular automata are interesting concepts that challenge the imagination and logic without the need to go exclusively into the mathematical field. This universality of applications makes this study area to be full of surprises for those who decide to venture into the dynamic world of modularity and the emergence of complex behaviors.




## The Result


When I built this specific gene codification was, in a beginning, a way to **store compressed data** information of the state, but as experimentation went on I realized common behaviors tend to be stored in the same Gene. experimentation with cellular automaton is easy and fun as long as you find **the beauty of the patterns** made by simple binary rules. These systems are controversial in the study of life emergence and complex systems, for example, you may know the famous **Conway's Game of Life** which is an specific rule code for 2D cellular automata that resembles organic movement from simple configurations.

### PenroseTrip Automata Tissue Classification
After playing around with the Automata Lab for a while, I noticed that some rule codes generated systems that grew similarly to an organic or a fabric, as it is impossible to ignore their geometric properties, others only started from compact figures and eventually dissipated. The truth is that I found some common characteristics among the **evolution processes** of different systems and took the opportunity to make an amateur classification of what I could see.

I should mention that this classification is based automata that tend to expand, or that have a very <abbr title="the number of active cells across the board slowly decreases over time">low rate</abbr> of disappearance of active cells.

The approach that I am interested in exploring is seeing **automata as ways of generating fabrics and lattices**.

### complexity and stability analysis
According to the complexity of the behavior, the stability of the patterns formed and the recursion in them, I separated the different types of system into 4 possible classifications:

* **STABLE**

The systems that I classify as stable are all those that tend to **expand** and remain **static** in a given final position. It is important to clarify that there are systems such as the **Conway game of life** that includes static figures or patterns, but  cannot be classified as stable systems since these configurations arise from very specific initial conditions. A stable system must **grow and maintain static conditions** from a more general set of initial conditions, taking into account what is necessary to ensure the growth of the system (neighborhood conditions necessary not to <abbr title="all cells set to 0">extinguish</abbr> the system).

<div class="centered-square">
  <div class="imgsq">
    <img src="https://drive.google.com/uc?export=view&id=1H4EHbXa-WZX8G5sX24VWdOQ0JjW9xrrN" class ="post-midimage-across">
  </div>
  <div class ="txtsq">
    <p class="imglbl">

      From the initial condition, the system begins to propagate and remains fixed when it can no longer expand.
      <br>
      <b>Genome : </b>square


    </p>
  </div>
</div>

Note that the complexity of the behavior is basic. It is more like a coloring algorithm than an organic behavior. Systems classified as stable tend to have **low complexity** since, to maintain the stability condition, some geometric properties must be met that **do not allow** very dense or complex fabrics. This patterns remain static because the cells that are active continue to meet the conditions to remain active and the cells that are inactive do not meet the necessary conditions to activate. Thus, no cell is deactivated or activated in the already generated tissue.


* **SEMI-STABLE**

Semi-stable tissues are similar to stable ones, with the difference that their genome allows **blinking** in certain parts of the tissue. This blink can be a **cycle of two alternating states** or a more complex cycle with 3 or more intermediate steps, but eventually returning to the same initial state. This flicker or glitch can only be local, that is, it cannot move through the tissue or spread indefinitely.

<div class="centered-square">
  <div class="imgsq">
    <img src="https://drive.google.com/uc?export=view&id=1J4HrzD-704yn9gbxUGuJdibF14ic2VKy" class ="post-midimage-across">
  </div>
  <div class ="txtsq">
    <p class="imglbl">

      Once the fabric fills the entire space, there is a sector that keeps blinking near the 4 corners of the square.
      <br>
      <b>Genome : </b>maze-gen


    </p>
  </div>
</div>


In the expansion process I would like to mention two parts of the fabric: the **central tissue** that remains static once it was created and the **outer frontier** that is constantly expanding, generating the static part of the interior according to vicinity present in inner tissue.
* **ORGANIC**

how to define an organic behavior? I could say that it is any system that despite being erratic, asymmetric and with irregular density can generate regions with stable, semi-stable and abstract patterns. An example of these systems is the conway game of life, which as its name implies, can be seen as an analogy to the behavior of life itself in terms of the possible configurations achieved by the system. This system can present events of self-replicating, mobile, static or alternating organisms, among others.

<div class="centered-square">
  <div class="imgsq">
    <img src="https://drive.google.com/uc?export=view&id=1L7Fv-pLOcPHFcVbfmq1g5QQZj_9G4J8R" class ="post-midimage-across">
  </div>
  <div class ="txtsq">
    <p class="imglbl">

      With the advance of time you can see a centered spiral pattern. Static and alternating cells are observed, as well as erratic regions.
      <br>
      <b>Genome : </b>tissue

    </p>
  </div>
</div>

Another aspect to consider is that these systems can decay (gradually reducing their activity until equilibrium is reached) or become unstable (filling the space without reaching equilibrium). I named the example above **tissue** because with a dense initial condition it amplifies what appears to be an abstract system with a tendency to *rotate* and which gradually *dies* (as living tissue) leaving behind a stable or semi-stable system.

* **ABSTRACT**


I'm talking about systems whose **complexity** and **specificity** increases so much, that they no longer generate geometric patterns or lattices, and have an **apparently random behavior** (although we already know that it is not). Here I classified all the systems whose **patterns are not recognizable** and you cannot see an ordered growth pattern. There are cases, such as the one shown below, where growth is almost unidirectional but still **erratic**.

  <div class="centered-square">
    <div class="imgsq">
      <img src="https://drive.google.com/uc?export=view&id=1i0kMgLLM2aGmFxhQ7yLoeOaXYWG6wZpr" class ="post-midimage-across">
    </div>
    <div class ="txtsq">
      <p class="imglbl">

        You can see the apparently random progress of the system. In this particular case, growth is upwards, since usually the expansion occurs in all directions. A random <abbr title="rule code">genome</abbr> was used.
        <br>
        <b>Genome : </b> (random genome)


      </p>
    </div>
  </div>
When a genome is randomly generated with 0 or 1 in any of the 512 positions, the behavior obtained is usually erratic, and therefore it is a system of this classification. Although these **highly complex behaviors** could have some very specific utility, the truth is that it is almost certain that any random genome will end up in **noise**. I see this as an insight into the relevance of automata in the approach to life itself: as in life, generating chaos is easy, but generating **structured chaos** is hardly a possibility among billions.






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
<a href="{{site.baseurl}}/assets/sketches/cellular-automata/2d-cellular-automata.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 09  / may / 2020
