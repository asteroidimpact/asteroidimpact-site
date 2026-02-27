---
title: Gameplay Elements
description: Reference for all in-game elements — crystals, asteroids, RT probes, power-ups, and surveys.
---

## Crystals

Crystals are the primary collectible. Only one crystal exists on screen at a time. When collected, the player earns points and advances the level progress meter.

**Key properties:**
- **Value** — crystals come in multiple types with different point values. The `crystalReward` setting (Low/Medium/High) controls how likely high-value crystals are to spawn.
- **Proximity** — the `crystalProximity` setting (Low/Medium/High) controls how close to the player crystals spawn. Low = distal (far), High = proximal (near).
- **Lifetime** — crystals despawn after `crystalLifetime` seconds if not collected.

**Data logged per crystal:** position, value, whether collected or missed, round time at spawn and collection, current score, difficulty, and condition values.

## Asteroids

One or more asteroids move in straight lines and bounce off the screen edges. Colliding with an asteroid reduces the player's difficulty level slightly, creating an adaptive challenge.

**Key properties:**
- **Speed** — set by `asteroidSpeed` in round preferences.
- **Adaptive difficulty** — when `adapts: true`, asteroid speed and count increase each time the player levels up. Collision with an asteroid reduces difficulty slightly.

## RT Probes

RT probes are the secondary task. A shape (triangle or square) appears briefly on screen; the player must press the corresponding key as quickly as possible.

| Shape | Key | Color |
|-------|-----|-------|
| Triangle | Z | Blue |
| Square | X | Purple |

**Key properties:**
- **Spawn timing** — controlled by `probeSpawnWindow` (average seconds between probes) and `probeSpawnOffset` (random ± deviation).
- **Value decay** — probe point value decreases linearly over its lifetime, incentivizing fast responses.
- **Configurable per round** — which probe types appear and their probabilities are set in `probePrefs`.

**Data logged per probe:** spawn position, shape type, key pressed, reaction time in milliseconds, whether collected or missed, round time remaining, current score, and difficulty.

## Power-Ups

Power-ups appear periodically and offer temporary advantages. Which power-ups can appear in a given round is controlled by `powerUpPrefs` — enabling per-round configuration without code changes.

| Power-Up | Effect |
|----------|--------|
| Shield | Protects against one asteroid collision |
| Slow | Reduces asteroid speed temporarily |

The magnet power-up (which pulled crystals toward the player) has been removed from experimental rounds to avoid confounding spatial proximity manipulations.

## Post-Round Surveys

After each experimental round, a short survey is displayed. Survey questions are loaded from `StreamingAssets/surveyprefs.json` and are fully configurable without rebuilding the game.

Default questions ask about:
- Motivation to play
- Perceived round duration
- Perceived difficulty
- Immersion
- Motivation to collect crystals
