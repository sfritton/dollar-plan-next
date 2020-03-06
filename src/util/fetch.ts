export async function fetchGet<T>(url: string) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  return data as T;
}
