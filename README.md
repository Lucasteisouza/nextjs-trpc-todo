# Next.js tRPC Todo App

## About This Project

This repository contains the solution developed for the technical challenge of the **Software Engineer** hiring process at **Artefact**.


A small full-stack Todo application built with:

- **Next.js using App Router**
- **tRPC**
- **React Query**
- **Custom Global CSS**

## ✅ Features Implemented

- Create, Read, Update, Delete (CRUD) tasks
- Form validation and error handling
- Feedback messages using React Toastify
- Backend powered by tRPC with in-memory data (no database)
- Server-Side Rendering (SSR) for task list

## 🚀 Getting Started

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/your-username/nextjs-trpc-todo.git
cd nextjs-trpc-todo
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Run the server:

```bash
# Development mode (recommended for testing)
npm run dev

# Production build
npm run build
npm start
```

### 4️⃣ Open your browser:

Go to:

```
http://localhost:3000
```

## 🗂️ Project Structure Overview

```
src/
├── app/                 # Pages and layouts (App Router)
│   ├── globals.css      # Global styles
├── server/              # tRPC backend routers and procedures
├── utils/               # tRPC client configuration and SSR helpers
└── pages/
    └──api/
        └──trpc/
            └──[trpc].ts # Endpoint API do tRPC
```

## ⚠️ Notes

- Tasks are stored in memory only. Refreshing the page resets the data.
- CSS is managed manually via a single global stylesheet (no Tailwind or external CSS frameworks).
