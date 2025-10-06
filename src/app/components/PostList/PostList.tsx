/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/app/libs/contexts/SearchContext";
import { useAuthStore } from "@/app/libs/stores/AuthStore";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import EmptyState from "../EmptyState/EmptyState";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const fetchPostsApi = async (
  query: string,
  page: number,
  limit: number,
  token: string
) => {
  const res = await fetch(
    `/api/posts/search?q=${encodeURIComponent(
      query
    )}&page=${page}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();

    if (data.message === "No posts found") {
      return [];
    }

    if (!res.ok) {
      throw new Error(data.message || "Erro ao buscar posts");
    }

    return data as Post[];
  } else {
    const text = await res.text();
    throw new Error(`Resposta inesperada do servidor: ${text}`);
  }
};

const PostList: React.FC = () => {
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  const { query } = useSearch();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const limit = 5;

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPostsApi(query, page, limit, token);
        setPosts(data);
        setHasNextPage(data.length === limit);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
        setPosts([]);
        setHasNextPage(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [query, page, token, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="Nenhum post encontrado"
        subtitle="Tente buscar por outro tema."
        showReset={!!query}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post._id}
            onClick={() => router.push(`/pages/posts/${post._id}`)}
            className="cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 line-clamp-3 mb-4">
              {post.content.length > 200
                ? `${post.content.slice(0, 200)}...`
                : post.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Por {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-6 mb-6">
        <Button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          label="Anterior"
          icon={IoArrowBackCircleOutline}
          iconPosition="left"
          outline
        />

        <span className="px-4 py-2 text-gray-700 font-medium">
          Página <span className="font-bold">{page}</span>
        </span>

        <Button
          disabled={!hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
          label="Próxima"
          icon={IoArrowForwardCircleOutline}
          iconPosition="right"
          outline
        />
      </div>
    </div>
  );
};

export default PostList;
