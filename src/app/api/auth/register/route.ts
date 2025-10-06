import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const text = await res.text();

    let data;
    try {
      data = text ? JSON.parse(text) : { message: "Resposta sem conteúdo" };
    } catch {
      data = { message: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Erro ao criar conta" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor: " },
      { status: 500 }
    );
  }
}
