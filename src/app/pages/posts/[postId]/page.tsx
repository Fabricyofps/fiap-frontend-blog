/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/libs/stores/AuthStore";
import Loader from "@/app/components/Loader/Loader";
import Button from "@/app/components/Button/Button";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import useDeletarPost from "@/app/hooks/modals/useDeletarPost";
import PageHeading from "@/app/components/PageHeading/PageHeading";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const router = useRouter();
  const { token, role, isAuthenticated } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deletarPost = useDeletarPost();

  const handleOpenModalDelete = useCallback(
    (id: string, title: string) => {
      deletarPost.onOpen(id, title);
    },
    [deletarPost]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar post");
        }

        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, token, isAuthenticated, router]);

  const handleEdit = () => {
    router.push(`${postId}/edit/`);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex justify-center items-center h-screen text-red-500">
          <p>{error}</p>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <div className="flex justify-center items-center h-screen text-gray-500">
          <p>Post não encontrado.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pt-8 pl-24">
        <PageHeading
          title="Detalhar Post"
          description="Aqui você pode visualizar os detalhes de um post."
        />
      </div>

      <div className="max-w-48 px-4 pl-24">
        <Button
          onClick={() => router.back()}
          label={"Voltar"}
          outline
          icon={FiArrowLeft}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {post.title}
          </h1>

          <div className="flex justify-between text-sm text-gray-400 mb-6">
            <span>Por {post.author}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="text-gray-700 whitespace-pre-line mb-8">
            {post.content}
          </div>

          {role === "professor" && (
            <div className="flex gap-3">
              <Button label="Editar" icon={FiEdit2} onClick={handleEdit} />
              <Button
                outline
                label="Excluir"
                icon={FiTrash2}
                onClick={() => handleOpenModalDelete(post._id, post.title)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
