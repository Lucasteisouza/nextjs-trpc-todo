'use client';

import Link from 'next/link';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-toastify';
import { useRef, useCallback } from 'react';

type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

type InitialData = {
  items: Task[];
  nextCursor: string | null;
};

interface TasksListClientProps {
  initialData: InitialData;
}

export default function TasksListClient({ initialData }: TasksListClientProps) {
  const utils = trpc.useUtils();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = trpc.task.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialData: { pages: [initialData], pageParams: [undefined] },
    }
  );

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      toast.success('Task successfully removed');
      utils.task.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Error removing task: ${error.message}`);
    },
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const lastTaskRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <main>
      <h1>Task list</h1>

      <Link href="/tasks/create" className="btn-link">
        Create new task
      </Link>

      <ul>
        {data?.pages.map((page, pageIndex) =>
          page.items.map((task, taskIndex) => {
            const isLastTask =
              pageIndex === data.pages.length - 1 &&
              taskIndex === page.items.length - 1;

            return (
              <li
                key={task.id}
                ref={isLastTask ? lastTaskRef : null}
                style={{ marginBottom: '1rem' }}
              >
                <strong>{task.title}</strong> — {task.description}{' '}
                <Link href={`/tasks/${task.id}/edit`} className="btn-link">
                  Edit
                </Link>{' '}
                <button
                  className="btn-action"
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
            );
          })
        )}
      </ul>

      {isFetchingNextPage && <p>Loading more tasks...</p>}

      {!hasNextPage && <p>No more tasks.</p>}
    </main>
  );
}
