---
layout: post
title:  "Drawing With Fourier Series"
date:   2021-02-15 22:23:00 -0300
description: "There is an alternate reality living in the space of frequencies"
categories: sketch
author: Paipa Psyche
image: "/assets/img/posts/sketch-fourier.png"
icon: ""
link: "/assets/sketches/fourier2D/fourierDrawing.html"
tags:
  sketch
  visual
  p5
  javascript
  math
  physics
---

> Profound study of nature is the most fertile source of mathematical discoveries.

Jean Baptiste Joseph Fourier

## The Sketch
The sketch is a didactic representation of what **Fourier series** and a **Discrete Fourier Transform (DFT)** represent when decomposing data into frequencies.The [definition](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Definition){:target="_blank"} of the DFT is given by a function that takes in **N** data points $$X_n$$ and create **N** new *complex numbers* $$\tilde{X}_k$$. This resulting coefficients encode data of frequency, phase and amplitude for the decomposed signal. But what does this mean? Well, let me explain briefly the **GENIALITY** of Fourier's proposition.

This model works under the hypothesis that **any signal can be decomposed in a summation of sine and cosine waves**, with different frequencies and amplitudes. A useful analogy is to think of the ripples in the sea as the result of big slow waves caused by the tide, median waves (quicker this time) caused by nearby boats, and small ripples caused by breeze and the fishes under the surface. If we know the magnitude (Amplitude) of each one of these sources, their speed (Frequency) and where they are originated (Phase), we can deduce the state of the sea *in any given point*. With a signal is the same: we assume that it is a sum of many cosine and sine waves of different frequencies and magnitudes, and that these coefficients (Frequency, magnitude and phase) can be inferred from the original signal. **This is crazy!** In the analogy of the sea, this is the equivalent of observing the waves for a finite period of time and, based on the observation, being able to tell the characteristics of **every source** of movement affecting the sea, from the tide caused by the moon to the tiny perturbations caused by the wind. This is the magic of the **Fourier Series!**

There's also [defined](https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Inverse_transform){:target="_blank"} an  **Inverse Discrete Fourier Transform (IDFT)** which takes the $$\tilde{X}_k$$ values and return the $$X_n$$ points of the original signal. An important remark is that while the original signal data is in the **time space** (data points with different intensities distributed in time) the DFT-generated points are in the **frequency space** and they represent a **fundamental frequency** of the system for **all** the duration of the signal. This means that each Fourier Coefficient $$\tilde{X}_k$$ depends on every data point $$X_n$$ and viceversa.

Now, with a known set of frequencies and amplitudes, you can certainly tell more about the signal you have. With this information you can tell which are the **main frequencies** of the signal and how relevant each of these frequencies are. This is useful, for example, when you want to extract **periodic behaviors in financial data** or extracting which frequencies are relevant and which are associated with **noise**. In this last case identifying noise, if you take the frequencies with the smallest intensities (frequencies that are not that relevant: noise) and **set their amplitudes to Zero** (in the frequency space), when doing the IDFT to the modified $$\tilde{X}_k$$ you obtain a the original signal with **suppressed noise**. You can suppress or amplify frequencies as you wish in the frequency space by tunning amplitudes, so that when the Transformation is reversed the signal is modified as requested. This is a basic principle of DFT that is commonly used when cleaning noise from signals and modifying sound data with tools such as **autotune** or **bass amplifers** (which amplify low frequencies).

## The Purpose
The aim is to develop a better intuition on what all these summations and complex coefficients mean when reconstructing a discrete succession of points distributed in time (a signal) from frequency information. When learning about the Fourier transform (and Series) sometimes is difficult to picture how a complex exponential can be used as a *magic wand* to extract the frequencies of a signal and what this tells us about the signal itself. Off course there are many good teachers and classic examples one can learn form, but I think a good way to learn is to play around with the concept and learn by yourself the consequences of changing every little thing in the model. I created this sketch to learn better the implications of DFT and to show the amazing concept it hides in a simple complex equation.
## The Result
Doing the transformation of a signal is not that *magical* in a computer: inserting a set of numbers and extracting other set of numbers is not a remarkable concept for a learner. But a concept that escapes to the mind when having a set of sines and cosines are that they can be related to the rotation of a circle. Furthermore, when using the DFT we are dealing with frequencies, amplitudes and phases, and these can be translated (using trigonometry) to the state of a point going around a circle of specific size (Amplitude) at an specific speed (frequency) and starting in an specific angle (phase). Using this two powerful ideas, DFT and complex exponentials as spinning vectors, is that this sketch is made.

The program allows you to make a drawing  (a continuous line in 2D) and this can be translated as a set of points with coordinates (x,y). This set of points can also be seen as two different 1D signals, one for X and one for Y, which is convenient since each 1D signal can be analyzed through DFT. When concluding the Transformations we are left with two DFT points in the frequency space ,one for X and one for Y. Now, since **the signal is a summation of the effects of each fundamental frequency** (each one associated with a $$\tilde{X}_k$$) and each one of these can be expressed as a spinning vector, **we can express X as a sum of vectors spinning with different amplitudes and frequencies**, each one starting where the previous vector finished (the same goes for Y). The **initial** angle at which each vector starts spinning **is given by the phase**.

The total signal is a consequence of all frequencies summed, so **it doesn't matter the order** in which they are added (the order in which the vectors are stacked) **as long as they are all taken into account**. A useful way to order these vector is in **decreasing order of amplitude**, drawing first the most relevant frequencies (associated with circles of big radius) and the least ones at last (tiny circles). This is useful because if you choose to draw only the first **M** circles (vectors), the signal is going to be pretty similar to the original one but with **less details**. These details are given by the coefficients of smaller magnitude you chose not to draw. So basically when choosing to draw only the first **M** main frequencies you are creating a **filter** over the signal, filtering out all the non-relevant details.

In the sketch you can choose this number **M** and on each axis you can see a plot representation of the main frequencies (the **M** that are drawn) in magnitude (length of the colored bar), phase (blue-red coloring of the bar) and frequency (White dot paired with each bar flashes every time a cycle of that frequency is completed.The faster it flashes, higher the frequency). Each bar is associated with a circle, so that a long bar might be related to a big circle on that axis.

## The Controls
First, draw a figure in the Big left blackboard by **pressing and dragging the left mouse click**. In order to obtain a good example of Fourier decomposition it is **important** that the drawing is a <abbr title="the drawing is a continuous line that finishes where it started">**closed figure**</abbr>, with no interruptions and ideally drawn slowly so the drawing has enough data points. Drawing fast may give few data points and generate sudden changes in direction, which is an interesting study case too.

Once your drawing is done, press **Save Board** in order to store your drawing in memory (Upper smaller board) and then **Transform** to generate the Fourier decomposition. If you don't like what is in the blackboard you can press **Blank Board** to delete the points in the left blackboard.

Once the Fourier decomposition is done, you can **control the number of principal frequencies**  used in the drawing with the **slider** under the left blackboard. If you want the machine to start drawing again from the beginning you can press **Reset Drawing** to reset the machine (with your drawing still in memory).

#### Mobile
This version may not work in mobile devices. But if it does, the controls are the same.

## Latest Release
<a href="{{site.baseurl}}/assets/sketches/fourier2D/fourierDrawing.html" class="link-sketch">
<span >
TEST SKETCH
</span>
</a>

Latest commit : 15  / mar / 2021
