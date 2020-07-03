---
layout: post
title:  "2D Waves as an effect of phase in oscillators"
date:   2019-10-07 16:23:00 -0300
description: "Temporary desynchronization is sometimes disguised as ripples resonating in space"
categories: sketch
author: Paipa Psyche
image: "/assets/img/posts/sketch-wave.gif"
icon: ""
link: "/assets/sketches/wave/wave.html"
tags:
  sketch
  visual
  p5
  javascript
  concentric
  physics
---

A 2D wave that turns out to be much more than it seems.

## The Sketch
When studying oscillatory phenomena, it is important to consider their three most important attributes: their **amplitude**, **frequency**, and **phase**. The amplitude corresponds to the intensity of the wave in terms of **energy**. If the case was a sound wave, the amplitude corresponds to the volume. The frequency measures the **periodicity** of the oscillations, that is, the interval of time it takes for the system to return to its **initial state**. at higher frequency, the oscillator is expected to move faster. And lastly the phase, this is just a small adjustment in the oscillator time response. Since each oscillator changes as a **function of time**, the phase can be seen as slightly delaying or advancing the clock of an oscillator with respect to the proper time of simulation.

The sketch is a set of **circular oscillators** of fixed size, implying **fixed amplitude**, arranged in a grid and whose phase depends on its distance from the **center of the screen**. This induces a change in the position of each oscillator; the further the oscillator is from the center of the screen the more noticeable the desychronization. Despite the fact that all the oscillators move at the **same frequency**, that is, they rotate at the **same speed**, the phase effects generate another **macro wave effect** that is reflected as a circular 2D wave. This effect is due to the modeling of the phase with respect to the distance from the center of the screen and how said distance grows with **radial symmetry** around said center.
## The Purpose
Studying the waves one eventually finds that they can be described as **circular static oscillators** with a phase shift associated with their position within the system. This is accomplished with simple mathematical proofs that aim to expose a simple but powerful truth about waves, and that is that they generally do **not** transport matter, but **energy**. This is a concept introduced early in the career of a physicist-in-training: the fact that each wave present in a **composite system** is a generalized effect of out-of-phase oscillations of its elements. In water, for example, the creation of waves can be mathematically expressed as a set of particles that oscillate together and whose offset gives rise to a new oscillation expressed in terms of the **group speed** of said particles.

From my perspective as a novice physicist and artist, all the oscillating movements that are present in nature represent the constant pulse of a universe that allowed itself the whim of having **at least** a temporal dimension. The seasons, the Earth's orbit, the water cycle, seismic waves, sea waves, gravitational waves, all **linked dependently to time** and without it would have no reason to exist. Life itself responds to a cyclical process that is maintained until the moment of death, and even there, the **natural cycle** continues, returning us to the earth and creating new life from this.

We don't need to have the latest tools to measure ripples and notice that we are part of an **endless cycle**, that we are secondary gears of a greater mechanism. The *bhagavad gita* as an ancient text already introduces the idea of the **natural cycle** and the **eternal cycle** of return to which souls are subject and whose effect on earth is **reincarnation**.

Although wave effects are studied from physics and mathematics, waves and cycles represent a deeper link with nature from human experience. They remind us that time is a carriage that does not stop and that, despite that, it is possible to start again.
## The Result
An arrangement of what appear to be colored LEDs that vibrate synchronously, drawing a 2D circular wave as an effect of the phase between them. The result is a **tool to play** with the phase effects in an oscillator system, teaching a little about how this phenomenon arises in
correlated oscillator systems.

To be honest, with this sketch people will most likely learn more about the limits of their own mind in psychedelics than about waves and cycles.


## The Controls
MOVE the cursor through the window to change relative phase between oscillators (change the amount of phase added relative to position)

#### Mobile
TOUCH and DRAG through the screen to change relative phase between oscillators


## Latest Release
<a href="{{site.baseurl}}/assets/sketches/wave/wave.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 07  / oct / 2019
