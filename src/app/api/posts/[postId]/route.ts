import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { postId: string } }
) {
  const { params } = await context;
  const { postId } = await params;
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
    const res = await fetch(`${API_URL}/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();

      if (!res.ok) {
        return NextResponse.json(
          { message: data.message || "Erro ao buscar post" },
          { status: res.status }
        );
      }

      return NextResponse.json(data);
    } else {
      const text = await res.text();
      return NextResponse.json(
        { message: `Resposta inesperada do servidor: ${text}` },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("Erro interno no servidor:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { postId: string } }
) {
  const { postId } = await context.params;
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: "PUT",
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

    const data = isJSON ? await res.json() : { message: "Post atualizado" };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { postId: string } }
) {
  const { params } = context;
  const { postId } = await params;
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    const contentType = res.headers.get("content-type");
    const isJSON = contentType && contentType.includes("application/json");

    if (!res.ok) {
      const errorMsg = isJSON ? (await res.json()).message : await res.text();
      return NextResponse.json({ message: errorMsg }, { status: res.status });
    }

    const data = isJSON ? await res.json() : { message: "Post deletado" };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
