export async function fetchGet<R>(url: string) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data as R;
}

export async function fetchPost<B, R>(url: string, body: B) {
  const request = new Request(url, { method: 'POST', body: JSON.stringify(body) });
  const response = await fetch(request);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data as R;
}
