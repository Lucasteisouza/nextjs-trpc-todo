import TasksListClient from './taskListClient';

export default async function TasksPage() {
  const res = await fetch(
    `http://localhost:3000/api/trpc/task.list?input=${encodeURIComponent(
      JSON.stringify({ limit: 5 })
    )}`
  );

  const json = await res.json();
  const initialData = json.result?.data ?? { items: [], nextCursor: null };

  return <TasksListClient initialData={initialData} />;
}
