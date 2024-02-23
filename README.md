# Project Title

Star Planner

## Overview

StarPlanner aaplication allows kids to manage daily and weekly tasks with ease and fun.

### Problem

Traditional task management can be boring or challenging for kids, potentially demotivating them from completing their daily chores and assignments. This app addresses these challenges by making task management visually appealing and interactive, encouraging regular use through their favorite Star Wars themes.

### User Profile

- Kids: Primary users who need a simple and engaging way to manage tasks.
  Looking to manage daily tasks in a fun way.
  Seeking motivation through interactive features and rewards.
  -Parents: Secondary users who assist in monitoring and guiding their kids' task management.

### Features

- Dynamic Star Wars Backgrounds: Unique Star Wars-themed backgrounds for each user session and daily tasks.
  -Task Management: Create, update, delete, and complete tasks. Tasks are draggable for prioritization.
  -Daily Themes: Different backgrounds for each day of the week.
  -Task Counter and Current Day: Displays total tasks and the current day.
  -Reminders: Sound reminders from Star Wars for upcoming tasks.
  -Sound Notifications for Tasks: Engaging auditory elements with Star Wars sound effects for reminders and when tasks are marked complete.
  -Custom Star Wars Avatars for Profiles: Allows users to choose a Star Wars character as their profile avatar from a dropdown of pre-defined characters.
  -Daily Star Wars Quotes: A daily Star Wars quote displayed on the homepage or at the top of the to-do list, selected randomly each day.
  -Task Prioritization: Enable users to set priority levels for tasks (e.g., High, Medium, Low) and sort tasks based on priority.
  -Dark Mode: Implement a Dark Mode for the application, inspired by the Dark Side of the Force, to reduce eye strain and offer a visually appealing alternative.
  -Simple Authentication: Implement simple login/logout functionality for user authentication, using local storage to remember the user's session.

## Implementation

### Tech Stack

- React
- MySQL
- Express
- Local storage
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - express
  - UUID

### APIs

### Sitemap

- Home page
- List of days of week
- Register
- Login

### Auth

- JWT auth

## Roadmap

- Create client

  - Set up a React project with routes for home/login, daily task views, and settings using React Router.

- Create server

  - Initialize an Express.js project for the backend with basic routing.

- Develop CRUD operations for tasks on both client and server sides.

- Implement task prioritization and categorization features.

- CAdd functionality for dynamic background changes using the Star Wars API.

- Deploy client and server projects so all commits will be reflected in production

- Feature: Home page
- Feature: Page for each day of week
- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form

  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

- Implement draggable tasks

- Add sound notifications for tasks

- Create a Dark Mode toggle based on user preference

Implement a daily Star Wars quote feature, fetching quotes from an external API or a predefined list.

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Gamification: Introduce rewards for task completion.
- Parental Controls: Features for parents to monitor and assist with task management.
- Unit and Integration Tests
- Theme Customization Feature
