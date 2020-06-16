---
layout: post
title:  "IMFERYE: A quest for legacy"
date:   2020-03-23 06:03:00 -0300
description: "I created a game to study how good administration can lead to bad stuff as well"
categories: sketch
author: Paipa Psyche
image: ""
icon: ""
tags:
  sketch
  javascript
  p5
  game
  random
---
a group of settlers is left in an unexplored world with the aim of creating a global empire over the years. Explore unexplored terrain, evolve your cities and above all have fun creating an empire as big as you want.
## The Sketch
A **random map** is generated using Perlin's Noise including random resource sources in the field. The resource field is also generated using perlin noise but using a detail index more suitable for smaller sports (more detail in noise shape). The game maintains randomness to generate many elements of the game such as events and map conditions among other things, however, other elements such as names depend on a component associated with the immediately previous city.

Each town **consumes** according to its size and is also capable of producing **resources** if it's on a resource spot The idea of the game is to **expand the empire** as much as possible without being consumed by its own size, taking into account **unexpected events** and quick growth.

Everything, except the creation of new towns, is generated with **random numbers** or has to do with some random value. This is an interesting feature because it allows you to have a **variety of situations** within the framework of the game.
## The Purpose
Initially when I created the project I wanted to practice a new concept that I just learned: [Perlin's noise](https://en.wikipedia.org/wiki/Perlin_noise). An interesting concept for **someone who loves randomness as much as I do**, since it is noise that is **locally consistent** but **globally random**. Putting it to the test I realized that in two dimensions it is easy to create cut points in the magnitude of the noise, thus creating borders on the 2D surface that enclose spots and their size depends on the cut point.
These spots turned them into islands and eventually continents. From there it was easy to start due to the structure of objects subjected to the random map map generated. The project was refined on several occasions until it became the Imferye that it is now.

I directed the project in this direction because it gave me a bit of morbidity to think about our **history as an intelligent species** on planet earth, and how much of that history we have lost at the hands of violent humanity, unexpected events or even bad luck. **Modeling the legacy** as a way to quantify lost culture seems to me one of the most interesting details of the game: being able to observe the reasons why a civilization can put aside its most historic cities for important reasons and thus losing legacy.

I like to think that the format of the game helps to **pose the growth of a civilization as an expansion** originated in a center, a cancer of roads and houses that expands through unexplored terrain. Based on these ideas, I imagine how the names of cities are established in the legacy of those who founded them, in how tradition and language are **dragged and mutated** by an accelerated expansion to the rhythm of consumption.

For more literary sense that the game has, I also wanted to pose a **management challenge** to anyone who dares to play it. The game puts the player in a situation where  **not always** taking  the most intuitive choices  prevent the empire from falling apart. The game itself is not the great strategy puzzle, but considering that it was done by one person on p5 I can say that I am proud of this work.

## The Result
The game ended up being everything I had hoped for: an alive puzzle and a temporary pet. The estimated playing time is **half an hour** and although it is not a lot, it is a game that can give surprises despite its simplicity. That estimated half hour is taking into account that the player manages to keep his civilization alive for **at least 20,000 years**, and in fact it is difficult to do it when there is no defined strategy.

The name generator was not as outstanding as other processes in the game, since the construction of syllables repeatedly produces huge blocks of vowels or consonants that cannot be added to a word without making sense of it. Sure, the **alien context** of the game offers the right environment to ignore linguistic details to a certain extent, but it would be **much more comfortable for the player** to be able to recognize their cities by a name that they can at least pronounce. I promise I will fix it, don't lose faith in me, anonymous reader.

## The Controls

* **CLICK :** create a new settlement on the map.
*
At the beginning you can put a seed corresponding to the point from which your initial tribe will originate, **the initial point HAS to be on a beach**. Each new settlement that is put on the map must be connected to a nearby station, each station will increase its rank as it connects more and more stations to itself. After managing to create 5 metropolis, the game will give more seeds to originate new clans without the need to be connected to other nearby points (this new clans must be used on a beach, far from all other settlements).

### Indicators

* **PROFIT _(Colored vertical bar)_** : Index of wealth in your empire. High Profit means good economical times, negative profit means austerity and may lead to famine. 
* **Seeds :** How many seeds to start new clans.
* **Map :** Which map configuration are you watching.
* **Difficulty :** Map difficulty, a good start is around 60%;
* **Growth :** Grow rate of your civilization.
* **Population :** Total number of citizens in your empire.
* **Fuel Production :** Total fuel points production per year.
* **Food Production :** Total food points production per year.
* **Consume :** Total consume per year.
* **Active/Total :** Active cities versus total cities placed.
* **Lost Legacy :** Lost cultural content. Time between your first settlement and your oldest active city.
* **Oldest city :** Oldest active city.
* **Origin :**Age of the fist placed city. Years since the beginning of the game.
<hr class="line-content" style="width:30%"/>
* **Type :** Type of settlement according to size and advancement.
* **Age :** Age of the settlement in years.
* **Pop. :** Population of the settlement.
* **Rank :** Importance of the city. Relevant to evolve cities.
* **Clan :** Name of the clan that owns the city.
* **Rate :** Score assigned according city relevance in the empire. negative number imply waste of resources, positive numbers imply generation of goods.
* **Savings :** Amount of good saved.
* **Era :** Period of time in which the empire faces an specific affair.

### Tips
* The connectivity range of the stations changes according to their range: larger cities, larger ranges
* During golden times you are able to build on water
* The savings will increase faster if your profit is high
* While building on water, deeper oceanic floor implies higher consume
* Towns built in mountains may have a higher consume
* Era changes each 4000 years approximately.
* Final score depends on empire expansion, legacy and profit history.
