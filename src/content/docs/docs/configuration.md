---
title: Round Configuration Reference
description: Complete reference for RoundPrefsSO — every field, its type, and what it controls.
---

Asteroid Impact's experimental conditions are defined entirely through Unity ScriptableObjects (`RoundPrefsSO`). No code changes are needed to create new study conditions — create a new `.asset` file, set the fields, and add it to a `RoundPrefsListSO` group.

## Creating a new condition

1. In the Unity Editor, right-click in the `Assets/RoundPrefs/IndividualRounds/` folder
2. **Create → PreferenceObjects → RoundPrefs**
3. Set the fields described below
4. Add the new asset to a `RoundPrefsListSO` group (`Assets/RoundPrefs/PrefGroups/`)
5. Assign the group to `GameController.roundPrefGroup` in the scene

## Field reference

### General Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | string | `""` | Internal identifier. Used in data logs and for demo-mode detection (`"demo"`). |
| `collectData` | bool | `false` | When `true`, sends data to Supabase at round end. Set `false` for practice and demo rounds. |
| `roundDuration` | float | `60` | Round length in seconds. |
| `cognitiveLoad` | bool | `false` | When `true`, collecting the same crystal type consecutively deducts 100 points. |
| `perceptualLoad` | bool | `false` | When `true`, overlays a fog layer on the game screen. |
| `adapts` | bool | `true` | When `true`, difficulty increases as the player levels up. |
| `instructions` | string[] | — | Slide-by-slide instructions shown before the round. |

### Asteroid Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `asteroidSpeed` | float | `2.0` | Base asteroid speed (Unity world units per second). |

### Crystal Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `crystalProximity` | SettingLevel | `Medium` | Spawn distance from player. `Low` = distal (≥4 units away); `High` = proximal (≤2.5 units); `Medium` = random. |
| `crystalReward` | SettingLevel | `Medium` | Probability of high-value crystals. `Low` = mostly low-value; `High` = mostly high-value. |
| `baseCrystalValue` | int | `10` | Point value of a medium-reward crystal. High and low crystal values scale from this. |
| `crystalLifetime` | float | `10` | Seconds before an uncollected crystal despawns. |

### Power-Up Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enableMagnet` | bool | `true` | When `false`, the magnet power-up never spawns. **Set `false` for all rounds where `crystalProximity` is an independent variable.** |
| `powerUpInterval` | float | `20` | Seconds between power-up spawns. |
| `powerUpLifetime` | float | `10` | Seconds before an uncollected power-up despawns. |
| `powerUpDuration` | float | `10` | Seconds a collected power-up remains active. |
| `powerUpPrefs` | PowerUpPrefPair[] | — | Which power-up prefabs can spawn and their relative weights. Empty list = no power-ups. |

### Probe Settings

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `probeSpawnWindow` | float | `10` | Average seconds between probe spawns. |
| `probeSpawnOffset` | float | `2` | Maximum random deviation from `probeSpawnWindow`. |
| `probePrefs` | ProbePrefPair[] | — | Which probe types can spawn and their probabilities (independent per spawn). |

## SettingLevel enum

```
Low    = 0
Medium = 1
High   = 2
```

## Proximity parameters (implementation detail)

The `crystalProximity` field uses the following thresholds (Unity world units; screen is approximately ±7 on X, −3.5 to 3 on Y):

- **High (Proximal):** crystal spawns within **2.5 units** of the player, clamped to screen bounds
- **Low (Distal):** crystal spawns at least **4.0 units** from the player (up to 30 retry attempts)
- **Medium:** fully random spawn position (original behaviour)

These constants are defined in `CrystalManager.cs` as `ProximalMaxDistance` and `DistalMinDistance`.

## Demo mode

When the URL contains `?mode=demo`, `GameController` automatically uses `DemoPrefsGroup` instead of the study group. `DemoRoundPrefs` has `collectData: false` and uses `Medium` proximity and reward — no data is written and no study conditions are imposed.
