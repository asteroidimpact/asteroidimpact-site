---
title: Data Logging
description: How Asteroid Impact logs data — table schemas, Supabase setup, and security configuration.
---

Asteroid Impact logs data to [Supabase](https://supabase.com) (PostgreSQL) at the end of each round. Data is only sent when `collectData: true` in the active round's `RoundPrefsSO`.

## Tables

### `rt_log` — Reaction-time events

One row per round. The `rt_events` column is a JSONB array with one entry per RT probe.

| Column | Type | Description |
|--------|------|-------------|
| `uuid` | uuid | Unique session identifier |
| `sub_id` | text | Participant ID (from URL `ai-id=` parameter) |
| `study_id` | text | Study identifier (from URL `study-id=` parameter) |
| `round` | int | Round number (0-indexed) |
| `condition` | text | Stringified condition values (reward, proximity, cognitive load, perceptual load) |
| `rt_events` | jsonb | Array of per-probe objects: position, shape, key pressed, RT in ms, score, difficulty |

### `cs_log` — Crystal collection events

One row per round. The `cs_events` column is a JSONB array with one entry per crystal.

| Column | Type | Description |
|--------|------|-------------|
| `uuid` | uuid | Session identifier |
| `sub_id` | text | Participant ID |
| `study_id` | text | Study identifier |
| `round` | int | Round number |
| `condition` | text | Condition values |
| `cs_events` | jsonb | Array of per-crystal objects: position, value, collected/missed, spawn time, collection time, magnet state, power-up states |

### `full_log` — Full gameplay log

Chunked log of all game events. May produce multiple rows per round for long sessions.

| Column | Type | Description |
|--------|------|-------------|
| `uuid` | uuid | Session identifier |
| `sub_id` | text | Participant ID |
| `study_id` | text | Study identifier |
| `round` | int | Round number |
| `condition` | text | Condition values |
| `logChunk` | int | Chunk index (0, 1, 2, …) |
| `logChunkSize` | int | Number of events in this chunk |
| `log_events` | jsonb | Array of timestamped game events |

### `sv_log` — Survey responses

One row per round survey submission.

| Column | Type | Description |
|--------|------|-------------|
| `uuid` | uuid | Session identifier |
| `sub_id` | text | Participant ID |
| `study_id` | text | Study identifier |
| `round` | int | Round number (round index when survey was submitted) |
| `condition` | text | Condition values |
| `sv_events` | jsonb | Array of question-response pairs keyed by `questionLabel` |

## Supabase setup

### 1. Create tables

Use the Supabase SQL editor to create the four tables with the schemas above. All `rt_events`, `cs_events`, `log_events`, and `sv_events` columns should be typed as `jsonb`.

### 2. Configure the API key

The anonymous API key is embedded in `Assets/Scripts/DataFunctions/SupabaseManager.cs`. Replace the placeholder values with your project URL and anon key from the Supabase dashboard.

### 3. Enable Row Level Security

**Critical before going public.** With the anon key exposed in the WebGL build, you must enable RLS and restrict anonymous users to INSERT only:

```sql
-- Enable RLS on all tables
ALTER TABLE public.rt_log   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.full_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cs_log   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sv_log   ENABLE ROW LEVEL SECURITY;

-- INSERT-only policy for anonymous users
CREATE POLICY "anon_insert_only" ON public.rt_log
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_only" ON public.full_log
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_only" ON public.cs_log
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_only" ON public.sv_log
  FOR INSERT TO anon WITH CHECK (true);
```

With RLS enabled, anonymous users (the game) can write data but cannot read, update, or delete anything. You access your data through the Supabase dashboard using the service role key, which bypasses RLS.

## Survey configuration

Survey questions are loaded at runtime from `Assets/StreamingAssets/surveyprefs.json`. Edit this file to change questions without rebuilding the game.

```json
{
  "shuffle": false,
  "questionList": [
    {
      "id": "question 1",
      "questionLabel": "motivation_resp",
      "questionType": "slider",
      "questionText": "How motivated were you to play the game in the previous round?",
      "sliderLabelLow": "Not at all",
      "sliderLabelHigh": "Extremely"
    }
  ]
}
```

`questionLabel` values become keys in the `sv_events` JSONB array.
