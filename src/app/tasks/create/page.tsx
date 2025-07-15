'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { toast } from 'react-toastify';


export default function CreateTask() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createTask = trpc.task.create.useMutation({
    onSuccess: () => {
      toast.success('Task created succesfully!');
      utils.task.list.invalidate()
      router.push('/tasks');
    },
    onError: (error) =>{
      toast.error(`Error creating task: ${error.message}`)
    }
  });
  console.log('createTask status:', createTask.status);  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    createTask.mutate({ title, description });
  };

  return (
    <main>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Tittle *</label>
          <input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={createTask.status === 'pending'}>
          {createTask.status === 'pending' ? 'Saving...' : 'Save'}
        </button>
      </form>
    </main>
  );
}
