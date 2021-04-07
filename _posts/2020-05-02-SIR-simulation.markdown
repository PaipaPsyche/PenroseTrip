---
layout: post
title:  "SIR Simulation"
date:   2020-08-08 02:08:00 -0300
description: "Epidemiology is not a joke."
categories: "sketch"
type: ""
author: Paipa Psyche
image: "/assets/img/posts/sketch-sir.png"
icon: ""
link: "/assets/sketches/sir-simulation/SIR-simulation.html"
tags:
  sketch
  javascript
  p5
  simulation

---
The peak of the COVID-19 crisis seemed like the perfect opportunity to create an SIR environment to simulate the propagation of an infection within a population.

## The Sketch
The simulation is based on **individual agents** that walk randomly through the simulation space (Brownian motion), these agents can be in one of 3 possible states: **Susceptible**, **Infected** and **Recovered**.
The **(S)usceptible** agents are those who have not contracted the disease and have the potential to acquire it, within the simulation they are represented with the color white. The **(I)nfected** are represented with the color red, and they are those who carry the disease and are capable of transmitting it to susceptible agents, this state changes after a few days. Finally, the **(R)ecovered** agents are those that were infected and, after a certain amount of time, lose their potential to infect and become infected. The latter are reflected in two cases within the simulation: those that die and disappear from the simulation, and those that survive the virus and acquire immunity, turning blue.

The simulation has a set of parameters that can be played with and the important thing is to see **how these changes can affect the spread of a disease** within a toy population. You can play with attributes of the disease, such as days of incubation or percentage of mortality, as well as possible containment strategies. all within the framework of a fixed population that may (or may not) obey the standards of containment that are established.

## The Purpose
Given the current **global emergency situation**, where a virus threatens to attack the most susceptible, it is important to be aware of how the virus attacks us to know how to respond accordingly. Many governments have opted for **radical health measures** that have managed to **contain the spread** of the virus in a remarkable way, but it is also true that some governments also have more ignorant leaders who ignore the situation and in some cases promote misinformation in this regard.

It seems important to me that people can **experiment** with these types of simulations so that they realize the importance of complying with sanitary measures, such as hand washing and social distancing, and see for themselves **the effects of small daily decisions**. The problem in these countries with stubborn leaders is that they blindly trust a false promise of security, when a simple simulation like the one I did can show that sanitary measures are, in fact, our **best weapon against a catastrophe** of such magnitude.

## The Result

The simulation responds well to the parameters and the changes made to them. In other words, expected results are obtained by, for example, increasing the contagion rate or introducing restrictive measures, seeing these changes reflected in the **contagion curve** and the mortality rate.
An added value is the line defined by the **health coverage** present in the simulation: it is a value defined in favor of *"how many infected people can the public health system treat?"*. When this number is exceeded, fatal cases increase considerably, this factor being relevant to determine the lethality of the virus. A simulation where sanitation can only handle a small number of infected usually has many more deaths than one with a higher percentage of coverage. In real life, the number of patients that can be cared for in *intensive care units* is a relevant parameter to determine the impact of the virus on the population.


## The Controls
The buttons of the application allow you to interact with the simulation parameters.

**PARAMETERS:**

**ABOUT THE CONTEXT:**

* **Dispersion Index** is the mean speed of the agents moving through the simulation space.
* **Collaboration Rate** sets the rate of agents that will obey the sanitary measures. The percentage is constant in the simulation, but the agents that disobey change once in a while.
* **Population** sets the number of agents in the simulation.
* **Medical Coverage** is the percentage of population that can be in UCIs at the same time.
* **RESET button** resets the simulation with the parameters that are set at the moment of pressing the button.

**ABOUT THE DISEASE:**

* **Incubation period** is the average of days that the infected carry the sickness before recovering or dying.
* **Immunity duration** is the average time in days to lose immunity after an "infection and recovery" cycle.
* **mortality** is the probability of dying once infected. This may increase with the exceeding of medical coverage.
* **Contagion rate** determines the probability of getting the disease if a Susceptible spends one whole day with an Infected.



**ABOUT THE SANITARY RESTRICTIONS:**

* **Movement restriction** sets the obeying agents to be static. Similar to a confinement measure.
* **Washing hands** reduces the contagion rate in a half.
* **Social distancing** makes the movement slow and reduces the radius of contagion.
* **Impunity Loss** determines if the immunity is temporal or definitive.
* **Closed experiment** sets the simulation in a closed box, or one with open borders. When borders are open, all agents that exit one side of the box, enters by the opposite side.

**INDICATORS:**

* **P(I)** observed probability of being infected.
* **Growth** percentage of the healthy population of last day that got infected today.
* **P(D)** observed probability of dying once infected.
* **AVG-MIR-MI** AVG is the average contagion rate given the ones already infected until the last day and the total number of agents. The MI is the most number of agents an infected agent has infected directly. The MIR is the MI divided by the number of days this agent was considered infectious.



## Latest Release
<a href="{{site.baseurl}}/assets/sketches/sir-simulation/SIR-simulation.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 07  / apr / 2021
