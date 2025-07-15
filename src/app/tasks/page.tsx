'use client';

import Link from 'next/link';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export default function TasksPage() {
  const utils = trpc.useUtils();
  const router = useRouter();
  const taskList = trpc.task.list.useQuery();
  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      toast.success('Task successfully removed')
      utils.task.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Error removing task: ${error.message}`)
    }
  });

  if (taskList.isLoading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Task list</h1>

      <Link href="/tasks/create">
        <button>Create new task</button>
      </Link>

      <ul>
        {taskList.data?.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.description}
            <Link href={`/tasks/${task.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button
              onClick={() => {
                if (confirm(`Remover "${task.title}"?`)) {
                  deleteTask.mutate({ id: task.id });
                }
              }}
              disabled={deleteTask.isPending}
            >
              {deleteTask.isPending ? 'Removing...' : 'Remove'}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
