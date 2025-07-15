export async function ssrQuery(query: string, input?: any) {
  const params = input
    ? `?input=${encodeURIComponent(JSON.stringify(input))}`
    : '';

  const url = `http://localhost:3000/api/trpc/${query}${params}`;

  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error(`Erro na requisição SSR: ${res.status} ${res.statusText}`);
    return null;
  }

  const json = await res.json();

  if (!json.result || !('data' in json.result)) {
    console.warn('Resposta inesperada do tRPC:', json);
    return null;
  }

  return json.result.data;
}
