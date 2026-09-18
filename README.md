````md
# LIFECRAFT: A Goal and Personal Progress Management System

**LIFECRAFT** is an AI-powered goal and personal progress management web application that helps users turn broad intentions into structured journeys, phases, tasks, lessons, rewards, and an actionable **Next Move**.

> **Tagline:** Turn intentions into your next move.

## Live Application

**Production:**  
https://lifecraft-next-move.vercel.app

## Project Overview

LIFECRAFT is designed to help users move from vague goals to clear, manageable actions.

Instead of manually creating every milestone and task, users can describe what they want to accomplish and LIFECRAFT generates a personalized learning journey using the Gemini API.

Examples include:

- Learn drawing
- Learn quantum physics
- Learn C++ programming
- Learn biology
- Learn photography
- Learn pottery
- Learn blacksmithing
- Learn Japanese
- Learn game development

Each generated journey contains structured phases, practical tasks, lesson content, success criteria, learning resources, progress tracking, and an adaptive next action.

## Main Features

### AI-Generated Journeys

Users can enter a goal in plain language and LIFECRAFT generates a structured beginner-friendly roadmap.

Each generated journey contains:

- Journey title and description
- 4–6 learning phases
- Subject-specific tasks
- Estimated task duration
- Difficulty level
- Impact level
- Lesson overview
- Learning points
- Practical exercises
- Step-by-step instructions
- Success criteria
- Reflection prompts
- Learning resource search links

AI generation is powered by **Google Gemini 3.6 Flash** through a server-side API integration.

### Adaptive Next Move

LIFECRAFT recommends one actionable task based on:

- Current active phase
- Incomplete tasks
- Available daily time
- Task impact
- Task difficulty

The system prioritizes useful, achievable tasks instead of simply showing the next item in a static list.

### Journey Management

Users can:

- Create AI-generated journeys
- View all journeys
- Track progress
- Open individual phases and tasks
- Change daily time budget
- Set a target date
- Delete journeys
- Switch between active journeys

### Task Lessons

Generated tasks can include:

- Overview
- What to learn
- Practical exercise
- Steps
- Success criteria
- Reflection
- External learning-resource searches

### Progress Tracking

LIFECRAFT automatically calculates:

- Completed tasks
- Phase progress
- Overall journey progress
- Current phase
- Next task

### XP and Gems

Completing tasks rewards users with:

- XP
- Gems

XP contributes toward level progression.

The rewards system includes:

- Current XP
- Level progression
- XP required for the next level
- Gem balance
- Reward history

### Daily Reminder

Users can enable a configurable daily Next Move reminder.

The current implementation provides an in-app reminder when LIFECRAFT is open.

### Persistent Data

Journey progress, settings, rewards, lessons, and active-journey state are stored using browser `localStorage`.

This means progress remains available after refreshing or reopening the application in the same browser.

### Responsive Interface

LIFECRAFT is designed for:

- Desktop
- Tablet
- Mobile

Desktop uses a sidebar navigation layout, while smaller screens use compact mobile navigation.

## Pages

### Landing Page

`/`

Introduces LIFECRAFT and demonstrates the Next Move concept.

### Dashboard

`/dashboard`

Displays:

- Current XP and level
- Gem balance
- Current Next Move
- Active journeys
- Journey progress

### My Journeys

`/journeys`

Displays all user-created journeys with:

- Progress
- Current phase
- Next task
- Daily time
- Target date
- Delete journey option

### Create Goal

`/create`

Allows users to enter:

- Goal
- Reason or motivation
- Available daily time
- Target date

LIFECRAFT then generates a personalized roadmap using Gemini.

### Roadmap

`/roadmap`

Displays the generated roadmap with phases and tasks.

### Journey Details

`/goal`

Shows:

- Journey title
- Description
- Overall progress
- Next Move
- Journey settings
- Phases
- Tasks

### Task Lesson

`/task`

Displays detailed learning material generated for an individual task.

### Next Move

`/next`

Provides one focused recommended task based on the user's current journey and daily time budget.

### Settings

`/settings`

Allows users to manage:

- Profile name
- Reminder status
- Reminder time

It also displays XP, level, Gems, and reward history.

## Technology Stack

### Frontend

- React 19
- TypeScript
- TanStack React Router
- TanStack Start
- Tailwind CSS
- Lucide React
- Sonner

### Server / Application Layer

- TanStack Start Server Functions
- Gemini Interactions API
- Zod validation

### AI

- Google Gemini API
- Model: `gemini-3.6-flash`

The Gemini API key is used only on the server and is not exposed to client-side code.

### Persistence

- Browser localStorage

### Deployment

- Vercel

### Version Control

- Git
- GitHub

## AI Journey Generation Architecture

The journey-generation flow is:

```text
User enters a goal
        ↓
Create Goal page
        ↓
TanStack Server Function
        ↓
Gemini Interactions API
        ↓
Structured JSON response
        ↓
Zod validation
        ↓
Journey conversion
        ↓
localStorage persistence
        ↓
Roadmap / Task / Next Move UI
````

The API key is stored using an environment variable:

```env
GEMINI_API_KEY=your_api_key
```

The key must never be committed to GitHub.

## Local Setup

### Requirements

Install:

* Node.js
* npm
* Git

Clone the repository:

```bash
git clone https://github.com/LANCELOT-880/lifecraft-next-move.git
```

Move into the project directory:

```bash
cd lifecraft-next-move
```

Install dependencies:

```bash
npm install
```

Create a file named:

```text
.env.local
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Production Environment

For production deployment, add the following environment variable in Vercel:

```text
GEMINI_API_KEY
```

The application uses this environment variable on the server when generating journeys.

## Validation

The project can be checked using:

```bash
npx tsc --noEmit
```

```bash
npm run build
```

```bash
git diff --check
```

## Data Storage

The current version uses browser localStorage.

Important storage keys include:

```text
lifecraft.journeys.v1
lifecraft.activeJourney.v1
lifecraft.settings.v1
lifecraft.rewards.v1
lifecraft.reminder.v1
```

Because the current version uses localStorage:

* Data remains on the same browser and device
* No login is required
* Data is not synchronized across devices

Cloud synchronization can be added in a future version.

## Error Handling

The AI generation flow handles:

* Invalid requests
* Gemini API service errors
* Rate limits
* Temporary model unavailability
* Invalid generated JSON
* Incomplete generated curricula

User-facing error messages are displayed without exposing API credentials.

## Security

The Gemini API key is stored server-side.

`.env.local` is excluded from Git version control and should never be committed.

The client application does not contain the API key.

## Current Limitations

The current academic version:

* Uses localStorage instead of a cloud database
* Does not include authentication
* Does not synchronize between devices
* Uses an in-app reminder rather than background push notifications
* Depends on Gemini API availability and rate limits
* Uses search links for AI-recommended resources rather than automatically trusting generated URLs

## Future Scope

Possible future improvements include:

* User authentication
* Cloud database
* Cross-device synchronization
* Push notifications
* Journey sharing
* Collaborative goals
* Custom rewards
* Advanced analytics
* Improved mathematical equation rendering
* Cached AI-generated curricula
* Rate limiting for public users
* AI-generated journey editing
* Progress history and streaks
* Mobile application version

## Project Title

**LIFECRAFT: A Goal and Personal Progress Management System**

## Repository

[https://github.com/LANCELOT-880/lifecraft-next-move](https://github.com/LANCELOT-880/lifecraft-next-move)

## Author

**Sameer Suresh Kahar**
