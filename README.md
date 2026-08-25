# LIFECRAFT: Next Move

Build a polished responsive web application called LIFECRAFT.

Product tagline:

"Turn intentions into your next move."

LIFECRAFT is an AI-powered goal planning and next-action recommendation platform. It helps users turn vague goals into structured journeys, milestones and actionable next steps.

IMPORTANT:

For this first version, build ONLY the frontend UI with realistic mock/sample data.

Do NOT add authentication, Supabase, database connections, external APIs, AI APIs, payments, or backend functionality yet.

All buttons and interactions should work using local mock data where practical.

DESIGN DIRECTION:

Create a premium, modern, dark productivity application with a subtle futuristic/game-inspired feeling.

The design should feel original and professional, not like a generic AI-generated dashboard.

Use:

- Near-black background

- Dark charcoal surfaces

- White and soft-gray typography

- One restrained blue/violet accent

- Clean modern typography

- Generous spacing

- Medium rounded corners

- Subtle borders

- Very subtle gradients only where useful

- Smooth micro-interactions

- Minimal icons

- Excellent responsive behavior on mobile, tablet and desktop

Avoid:

- Excessive glassmorphism

- Excessive neon

- Huge gradients

- Cartoon/game-like visuals

- Generic purple AI dashboards

- Excessive rounded pill components

- Unnecessary charts

CORE NAVIGATION:

Desktop:

- LIFECRAFT logo

- Dashboard

- My Journeys

- Next Move

- Settings

- User profile

Mobile:

Use a compact responsive navigation/bottom navigation.

PAGES:

1. LANDING PAGE `/`

Create a strong product landing page.

Hero:

"LIFECRAFT"

"Turn intentions into your next move."

Supporting text:

"Turn vague goals into clear journeys, meaningful progress and one actionable next step."

Primary button:

"Start Your Journey"

Include a visually impressive demonstration of the "Next Move" concept.

Example:

"Complete player movement"

"25 minutes · High impact"

Include a short 3-step explanation:

1. Define your goal

2. Build your journey

3. Take your next move

2. DASHBOARD `/dashboard`

Create a realistic dashboard using mock data.

Header:

"Good evening, Sameer."

"What are you building?"

Show journey cards such as:

Journey 1:

"Learn Japanese"

Description: "Build conversational Japanese skills."

Progress: 68%

12 / 18 milestones

Journey 2:

"Build a Game"

Description: "Create and publish a complete game."

Progress: 34%

6 / 17 milestones

Include a prominent "NEXT MOVE" section:

"Complete player movement"

"25 minutes · High impact"

Button: "Start"

Include a "Create New Goal" button.

3. CREATE GOAL `/create`

Create a clean goal creation interface.

Heading:

"What do you want to accomplish?"

Large text input with example:

"I want to learn Japanese..."

Optional fields:

- Why is this important?

- Available daily time: 15 min / 30 min / 1 hour / Flexible

- Target date

Primary button:

"Create My Journey"

For now, submitting can use mock behavior and navigate to the roadmap page.

4. ROADMAP `/roadmap`

Create an AI-generated roadmap preview using mock data.

Example:

"Learn Japanese"

Show three phases:

01 — FOUNDATIONS

✓ Learn Hiragana

✓ Learn Katakana

✓ Basic greetings

02 — BEGINNER

✓ Basic grammar

→ Learn 100 essential words

○ Simple sentences

03 — PRACTICE

○ Listening

○ Reading

○ Conversation

Include:

"Edit Journey"

"Start Journey"

5. GOAL DETAILS `/goal`

Create the detailed journey page.

Show:

- Goal title

- Description

- Overall progress

- Progress bar

- Milestones

- Tasks

- Completion states

Include the Next Move section prominently.

6. NEXT MOVE `/next`

This is the signature feature of LIFECRAFT.

Create a focused, visually impressive page.

Large subtle lightning/arrow icon.

Heading:

"YOUR NEXT MOVE"

Recommended task:

"Learn 20 vocabulary words"

Show:

"Japanese Journey"

"20 minutes"

"Easy"

"High impact"

Section:

"Why this?"

"Completing this task moves you closer to your current milestone."

Primary button:

"Start Task"

Do not make this page look like a chatbot.

COMPONENTS:

Create reusable components for:

- Sidebar/navigation

- Mobile navigation

- Journey cards

- Progress bars

- Milestone sections

- Task rows

- Next Move card

- Buttons

- Input fields

- Empty states

- Toast/feedback messages

Use mock data in a clean structure so it can later be replaced with Supabase data.

ACCESSIBILITY:

Use semantic HTML, readable contrast, keyboard-friendly controls, clear focus states and accessible labels.

RESPONSIVENESS:

The entire application must work beautifully on a phone screen as well as desktop.

MOST IMPORTANT:

The application should feel like a real product that could eventually be launched publicly, not a college CRUD project.

Do not add unnecessary features beyond the pages and functionality specified above.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/668dd970-b800-45f3-90b9-3a90b132b60c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
