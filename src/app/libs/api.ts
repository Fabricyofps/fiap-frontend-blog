export async function apiFetch<T>(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

  const url = `${API_URL?.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Erro na requisição");
  }

  return res.json() as Promise<T>;
}
