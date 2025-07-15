'use client';

export default function Home() {
  return (
    <main className="p-8 bg-red-500 min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to my todo app</h1>
      <nav className="flex flex-col gap-4 mt-4">
        <a href="/tasks" className="text-blue-600 underline hover:text-blue-800">
          See task list
        </a>
        <a href="/tasks/create" className="text-blue-600 underline hover:text-blue-800">
          Create new task
        </a>
      </nav>
    </main>
  );
}
