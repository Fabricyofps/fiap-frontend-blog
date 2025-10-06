import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");

    const API_URL = (process.env.NEXT_PUBLIC_URL_BACKEND || "").replace(
      /\/$/,
      ""
    );
    const authHeader = request.headers.get("authorization") || "";

    const response = await fetch(
      `${API_URL}/posts?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Erro ao buscar posts" },
        { status: response.status }
      );
    }

    const hasNextPage = Array.isArray(data) && data.length === limit;

    return NextResponse.json({
      posts: data,
      hasNextPage,
    });
  } catch (error) {
    console.error("Erro interno ao buscar posts:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type");
    const isJSON = contentType?.includes("application/json");

    if (!res.ok) {
      const errorMsg = isJSON ? (await res.json()).message : await res.text();
      return NextResponse.json({ message: errorMsg }, { status: res.status });
    }

    const data = isJSON ? await res.json() : { message: "Post criado" };
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
