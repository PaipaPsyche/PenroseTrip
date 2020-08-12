---
layout: post
title:  "Genetic Learning: Smart Rockets"
date:   2020-08-08 02:08:00 -0300
description: "Rockets learning to reach a goal on time"
categories: "sketch"
type: ""
author: Paipa Psyche
image: "/assets/img/posts/sketch-rockets.png"
icon: ""
link: "/assets/sketches/genetic-rockets/rockets.html"
tags:
  sketch
  javascript
  p5
  genetic learning

---
> For me, the level at which natural selection causes the phenomenon of adaptation is the level of the replicator - the gene.

Richard Dawkins
## The Sketch
In the simulation there are rockets that every certain interval of time are pushed in an arbitrary direction, the objective of these rockets is to reach a target in a specific instant of time. The rockets give a defined number of jumps and must reach the goal just in time, however, they have no information about the position of the target so they must learn how to get there.

The simulation runs for generations, and it is expected that with each generation the rockets will become more and more precise in their task of hitting the target on time. The rockets have *genes* that encode each of the jumps that the rocket does, then at the end of each generation a score is assigned to each rocket and based on this score the rocket has more or less probability of reproducing its genes in the next generation. The genes are in the form of a 2D vector, since in each jump what happens is that a vector is added to the speed that the rocket already had. At the end of each genetic mix, a certain percentage of mutations is generated in the genes in order to diversify the solutions and prevent the system from remaining in dead ends.

## The Purpose
The idea of rockets as an example of genetic learning is not new, but that does not make it any less interesting. Machine learning can occur in different ways, but reinforcement learning is based more on experimentation and trial-error dynamics. Other learning methods use more direct ways of adapting the model to learn new tasks (sometimes based on other solutions to the problem in order to learn new ones), but the genetic algorithm is responsible for exploring the solution space based on the experience of the system, without external examples of how to fix the problem.

In proposing the problem, I wanted to find a way to optimize genetic learning, even when this is already a form of optimization. I wanted to explore ways in which the algorithm can be modified to converge faster and avoid classic genetic learning problems in the case of rockets in particular. This is how I got to the implementation of the adaptive response system (AR) and its use to adjust the learning parameters of the simulation automatically.

## The Result

The result is surprising. The rockets manage to learn in **most cases** a route that allows them to complete the task. Some problems stood out when doing a few experiments, but in general the result obtained was satisfactory.
Some of the model highlights are:

### Reproduction method

The evaluation criterion was defined based on the final distance from the rocket to the target, assigning a score from **1 to 1000**, 1000 being the case where the rocket finished its journey in the center of the target. With this metric, a reproduction criterion was established in order to **prioritize the reproduction of the highest scores**: a pool of candidates is generated, from which the parents of the future generation will be selected. The pool is initialized empty, and each rocket of the actual generation adds as many copies of itself as its score indicates, that is, a rocket with a score of 800 contributes 800 copies of itself to the pool. Then, for all the *N* rockets needed for the next generation a pair of candidates form the pool are chosen. Their *genes* are reproduced using the method mentioned below, and once all *N* genetic sets are generated, the simulation starts over.

Genetic mixing occurs between pairs of rockets and happens by randomly using the following mixing methods:

* **Mean:** The vectors of both rockets for each jump are averaged, resulting in a set of vectors of the same length
* **Switch:** The resulting rocket takes in each jump vector XY the X form one parent rocket and Y form the other
* **Split:** The resulting rocket takes the first *j* genes from one parent and the rest from the other parent. *j* is chosen at random each time.
* **Random:** Each gene is chosen randomly from each parent (50/50).

### Adaptive Response System (AR)
Among the problems that can arise when trying to train genetic algorithms, those that I wanted to deal with with the AR system were two in specific: setting a mutation rate and an effective tolerance range for the target.

#### Mutation rate

The mutation rate allows to preserve the diversity in the solutions by **introducing random "failures"** to the genes already generated for the next generation. If this rate is very high, it is impossible for the system to converge to a solution, and if it is very low it is possible that the system normalizes to a false solution without reaching the objective.

The AR system **gradually reduces the mutation rate** as the average performance of the population increases. This allows that in the first generations there is much variability while when finding a solution, the system reduces the mutation rate in order to converge more quickly in future generations. The magic of this part of the AR is in reducing the probability of mutation as the system approaches an **apparently viable solution**.

#### Likelihood Normalizer

The score is assigned with a function dependent on the distance between the final position of the rocket and the target. This function can be normalized by a number that, when increasing, allows rockets at a greater distance to achieve higher scores. Similarly, reducing this number makes the target's tolerance area smaller, assigning high scores only to rockets that are really close. This number is called the **Likelihood Normalizer**. A very large LN allows rockets to gradually find the target when they are far from it, since the score function is visible at a greater distance. When the rockets are close to the target having a large LN is **useless** as it is more difficult to find noticeable changes in the scoring function with small displacements. On the other hand, when using small LNs it is possible to have better precision to detect the target in the vicinity of the rocket, but consequently it is difficult for rockets that are far away to feel relevant changes in the scoring function to **approach the target**.

### Issues
The system showed that it can learn to find solutions for certain parameters, however there are problems that arise from the same nature of the algorithm and that can be evidenced when trying fairly complex experiments.

* The algorithm is good at finding the way to problems with a **single solution**, however when there are many possible ways the reproduction algorithm generates new candidates that when trying to mix these possible solutions, they obtain a terrible solution. This **slows down the learning algorithm** for long periods of time as the system converges to just one of the multiple solutions it found.

* When the number of jumps is very large, the algorithm has many parameters to train and it also usually takes longer. this was expected as each additional jump must be trained as a consequence of the others. But another effect of having many thrusts is that the algorithm may have to find a **less optimal route** to reach the goal, as it has many displacement opportunities. In this attempt to **compress** the jumps or **nullify** the effects of the extra ones, the algorithm comes up with many possible ways that result in a good solution, which brings us to the previous problem.

* If the target is near an edge, rockets that **narrowly miss** the target when trying to reach it and that could have been good solutions often collide with the edge, **nullifying what could have been a good solution** only by a very small margin. This is why by default the right border is disabled.


## The Controls
The buttons and sliders of the application allow you to interact with the simulation parameters.

**SLIDERS:**

* **Gravity** defines a vertical acceleration constant. If Gravity is positive then it pulls downwards.
* **max. time** sets the target timer. This defines the time in which rockets have to reach the target.  
* **# jumps** sets the number of hops each rocket does. Effective after RESET.
* **Delay** is the time delay between jumps of the rockets.

**BUTTONS:**

* **Generation 1** sets then generation counter to 1. This might be useful in controlled rigorous experiments.
* **Delete obstacles** removes all obstacles set in the simulation, without affecting anything else.
* **RESET** reboots all rockets, reboots the simulation but keeps the parameters set by user.


**NOTE:** There are parameters that do not change unless the simulation is restarted (RESET button).

* **0 / 1 / 2 / 3 / 4  :** Set scenario.
* **S :** Creates an squared obstacle centered in the cursor position.
* **C :** Creates a circular obstacle centered in the cursor position.
* **T :** Sets the target location in the cursor position.
* **O :** Sets the rocket origin location in the cursor position.





## Latest Release
<a href="{{site.baseurl}}/assets/sketches/genetic-rockets/rockets.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 08  / aug / 2020
