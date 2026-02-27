---
title: Setting Up a Study
description: A practical guide to deploying Asteroid Impact for your own research study.
---

This guide walks through deploying Asteroid Impact for a research study, from participant recruitment to data collection.

## Overview

```
Participant (via SONA/Prolific)
  → Game URL with participant ID + study ID parameters
  → Asteroid Impact (WebGL, browser)
  → Data logged to Supabase at end of each round
  → Redirect to post-study survey (Qualtrics or similar)
```

## Step 1: Fork or clone the repository

```bash
git clone https://github.com/asteroidimpact/ai_crystal_diss.git
cd ai_crystal_diss
```

Open the project in Unity (version 2022.3 LTS or later recommended).

## Step 2: Define your round conditions

Create `RoundPrefsSO` assets for each condition in `Assets/RoundPrefs/IndividualRounds/`. See the [Configuration Reference](/docs/configuration) for all available fields.

Group them into a `RoundPrefsListSO` in `Assets/RoundPrefs/PrefGroups/`. Assign the group to the `roundPrefGroup` field on `GameController` in the scene.

## Step 3: Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create the four tables (`rt_log`, `full_log`, `cs_log`, `sv_log`) — see [Data Logging](/docs/data-logging) for schemas
3. Enable Row Level Security and add INSERT-only policies for the `anon` role
4. Replace the API URL and anon key in `Assets/Scripts/DataFunctions/SupabaseManager.cs`

## Step 4: Configure the post-study survey redirect

The game redirects to an external survey URL at the end of the final round. Set the redirect URL in the relevant script or scene inspector field (`ExperimentController.sonaRedirectURL` or similar).

Include `?sub_id={subid}` in the redirect URL to carry the participant ID into your survey platform.

## Step 5: Build and deploy

1. In Unity: **File → Build Settings → WebGL → Build** to `WebGLBuild/`
2. Push `WebGLBuild/` to your repository — GitHub Actions deploys automatically to GitHub Pages
3. Verify the live URL loads and logs data to Supabase

## Step 6: Set up SONA / Prolific

Point participants to:

```
https://your-game-url/?study-id=YOUR_STUDY&ai-id=%SURVEY_CODE%
```

- `study-id` identifies the study in your data (shows up in the `study_id` column)
- `ai-id` carries the participant ID (shows up in the `sub_id` column)
- For Prolific, use `PROLIFIC_PID={{%PROLIFIC_PID%}}` instead

## Counterbalancing

Asteroid Impact does not randomize condition order internally — the round order is fixed by the `RoundPrefsListSO`. Counterbalance at the recruitment platform level by creating multiple SONA/Prolific links pointing to builds (or URL parameters) with different orderings.

## Testing your setup

Before launching:

1. Play through all rounds in the browser with F12 open
2. Check the Console for "Form upload complete!" messages confirming Supabase writes
3. Check the Supabase dashboard to verify rows appear in all four tables
4. Confirm the post-study redirect fires correctly
