const headers = { 'Content-Type': 'application/json' };
const makeUrl = (path: string) => `http://${location.host}:3000${path}`;

export async function fetchGet<R>(path: string) {
  const response = await fetch(makeUrl(path));

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data as R;
}

export async function fetchPost<B, R>(path: string, body: B) {
  const request = new Request(makeUrl(path), {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
  const response = await fetch(request);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data as R;
}

export async function fetchPut<B, R>(path: string, body: B) {
  const request = new Request(makeUrl(path), {
    method: 'PUT',
    body: JSON.stringify(body),
    headers,
  });
  const response = await fetch(request);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data as R;
}
