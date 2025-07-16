import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to My Todo App</h1>
      <nav>
        <Link href="/tasks" className="btn-link">
          See task list
        </Link>
        <Link href="/tasks/create" className="btn-link">
          Create new task
        </Link>
      </nav>
    </main>
  );
}
