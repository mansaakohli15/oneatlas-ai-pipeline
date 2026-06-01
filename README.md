# OneAtlas Trial

AI-native application specification generation platform.

This project converts a natural language application description into a structured AppSpec through a multi-stage AI generation pipeline.

---

## Features

### Pipeline Stages

1. Intent Extraction
2. Schema Generation
3. AppSpec Generation

---

### Validation Layer

Validates:

* Intent structure
* Schema structure
* AppSpec structure
* Entity references
* Workflow references
* Page ↔ API consistency

---

### Repair Engine

Implemented repair strategies:

* Structural Repair
* Field Repair
* Consistency Repair

Each repair attempt is logged.

---

### AI Gateway

Supported Providers


* Gemini
* Groq
* OpenRouter (config ready)


Routing is configuration driven.

---

### Integration Registry

Implemented:

* Slack
* WhatsApp
* Gmail
* Jira
* Webhook

Registry includes:

* Triggers
* Actions
* Auth Type
* Metadata

---

### Streaming

SSE endpoint streams:

* stage_start
* stage_complete
* stage_failed
* generation_complete

---

## API Endpoints

### Generate

POST

/api/generate

Body

```json
{
  "prompt": "Build a CRM..."
}
```

### Job Status

GET

/api/generate/:jobId

### Stream

GET

/api/generate/:jobId/stream

### Manual Repair

POST

/api/generate/:jobId/repair

### Integrations

GET

/api/integrations

---

## Environment Variables

```env

GEMINI_API_KEY=
GROQ_API_KEY=
OPENROUTER_API_KEY=

```

---

## Local Setup

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Run evaluation

```bash
npm run evaluate
```

Build

```bash
npm run build
```

---

## Architecture

User Prompt

↓

Intent Extraction

↓

Validation

↓

Repair

↓

Schema Generation

↓

Validation

↓

Repair

↓

AppSpec Generation

↓

Validation

↓

Repair

↓

Final AppSpec

---

## Evaluation

Evaluation results are stored in:

```text
evaluation/results.json
```

---

## Deployment

Live URL:

https://oneatlas-trial-zeta.vercel.app/

---

## Current Status

Implemented:

* Multi-stage pipeline
* Validation engine
* Repair engine
* SSE streaming
* AI routing
* Integration registry
* Evaluation suite
* Frontend viewer

Future improvements:

* Persistent database
* Redis job queue
* Real token accounting
* Additional providers
* Rich schema inference
