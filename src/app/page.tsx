'use client';

import { trpc } from '../utils/trpc';

export default function Home() {
  const { data, isLoading, error } = trpc.task.list.useQuery();

  console.log({ data, isLoading, error });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <main>
      <h1>Lista de Tarefas</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
