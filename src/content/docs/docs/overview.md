---
title: What is Asteroid Impact?
description: Overview of Asteroid Impact — its purpose, design, and theoretical foundations.
---

Asteroid Impact is an interactive, arcade-style, point-and-click video game designed to study attention allocation and cognitive control in mediated environments. It runs in any modern web browser as a Unity WebGL application — no download required.

## The game

The player pilots a spaceship using a mouse or trackball, collecting crystals while avoiding bouncing asteroids. An optional secondary task — the **reaction-time (RT) probe** — asks players to press a keyboard key as quickly as possible whenever a shape appears on screen.

The combination of a primary task (crystal collection) and a secondary task (RT probe) creates a dual-task paradigm suitable for measuring cognitive resource allocation via secondary-task reaction time (STRT).

## Experimental flexibility

Asteroid Impact is configurable via Unity ScriptableObjects, meaning researchers can adjust study conditions entirely through data files without modifying source code. Manipulable variables include:

- **Spatial proximity** — how close to the player crystals spawn
- **Reward magnitude** — how likely high-value crystals are to appear
- **Cognitive load** — a penalty for collecting the same crystal type consecutively
- **Perceptual load** — a fog overlay that increases visual processing demands
- **Adaptive difficulty** — asteroid speed and count increase as the player levels up

## Theoretical foundations

The game was designed within the framework of:

- **Limited Capacity Model of Motivated Mediated Message Processing (LC4MP)** — Lang's model of how cognitive resources are allocated during media processing, and how motivational relevance affects encoding and storage
- **Cognitive control theory** — Shenhav's decomposition of cognitive control into expected value, cost, and demand components
- **Attention as motivated decision-making** — Anderson's work on attention habits and reward-driven attentional capture

## Publications

See the [Publications](/docs/publications) page for citations and links to studies using Asteroid Impact.
