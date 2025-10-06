import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
    const res = await fetch(
      `${API_URL}/posts/search?q=${encodeURIComponent(
        q
      )}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json(
          { message: data.message || "Erro ao buscar posts" },
          { status: res.status }
        );
      }
      return NextResponse.json(data);
    } else {
      const text = await res.text();
      return NextResponse.json(
        { message: `Resposta inesperada: ${text}` },
        { status: res.status }
      );
    }
  } catch (err) {
    console.error("Erro interno:", err);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
