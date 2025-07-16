'use client';

export default function Home() {
  return (
    <main>
      <h1>Welcome to my todo app</h1>
      <nav>
        <a href="/tasks">
          See task list
        </a>
        <a href="/tasks/create">
          Create new task
        </a>
      </nav>
    </main>
  );
}
