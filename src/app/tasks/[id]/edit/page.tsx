'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { trpc } from '../../../../utils/trpc';
import { toast } from 'react-toastify';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const taskId = params?.id;

  const { data: task, isLoading } = trpc.task.list.useQuery({limit: 100});
  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => {
        toast.success('Task sucesfully updated!')
        router.push('/tasks');
    },
    onError: (error) =>{
        toast.error(`Error updating task: ${error.message}`);
    }
  });

  const currentTask = task?.items.find(t => t.id === taskId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  if (isLoading) return <p>Loading...</p>;
  if (!currentTask) return <p>Task not found</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) {
        alert('task ID not found');
        return;
    }
    updateTask.mutate({ id: taskId, title, description });
  };

  return (
    <main>
      <h1>Editar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título *</label>
          <input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={updateTask.isPending}>
          {updateTask.isPending ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </main>
  );
}
