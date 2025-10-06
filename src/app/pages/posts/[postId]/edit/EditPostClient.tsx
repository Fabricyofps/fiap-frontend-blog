/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/libs/stores/AuthStore";
import Loader from "@/app/components/Loader/Loader";
import Button from "@/app/components/Button/Button";
import { FiArrowLeft } from "react-icons/fi";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/Input/Input";
import TextArea from "@/app/components/TextArea/TextArea";
import PageHeading from "@/app/components/PageHeading/PageHeading";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const EditPostPage: React.FC = () => {
  const { postId } = useParams();
  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erro ao buscar post");

        setPost(data);

        setValue("title", data.title);
        setValue("author", data.author);
        setValue("content", data.content || "");
      } catch (err: any) {
        toast.error(err.message || "Erro ao buscar post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, token, router, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!post) {
      toast.error("Post não encontrado.");
      return;
    }

    if (!formData.content || !formData.content.trim()) {
      toast.error("Conteúdo não pode estar vazio.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao atualizar post");

      toast.success("Post atualizado com sucesso!");
      router.push(`/pages/home`);
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar post");
    } finally {
      setIsSaving(false);
    }
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
          title="Editar Post"
          description="Aqui você pode atualizar os detalhes de um post."
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

      <div className="w-full max-w-2xl md:max-w-3xl mx-auto px-4 pt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 flex flex-col gap-4"
        >
          <Input
            id="title"
            label="Título"
            type="text"
            disabled={isSaving}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="author"
            label="Autor"
            type="text"
            disabled={isSaving}
            register={register}
            errors={errors}
            required
          />

          <TextArea
            id="content"
            label="Conteúdo"
            rows={10}
            disabled={isSaving}
            register={register}
            errors={errors}
            required
            defaultValue={post.content}
          />

          <Button
            onClick={() => handleSubmit}
            label={isSaving ? "Salvando..." : "Salvar alterações"}
            disabled={isSaving || !token}
          />
        </form>
      </div>
    </>
  );
};

export default EditPostPage;
