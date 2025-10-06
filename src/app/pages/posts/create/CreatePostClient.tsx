/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/libs/stores/AuthStore";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import TextArea from "@/app/components/TextArea/TextArea";
import Loader from "@/app/components/Loader/Loader";
import { FiArrowLeft } from "react-icons/fi";
import PageHeading from "@/app/components/PageHeading/PageHeading";

const CreatePostPage: React.FC = () => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  if (!token) {
    router.push("/");
    return null;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsSaving(true);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          content: formData.content,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao criar post");

      toast.success("Post criado com sucesso!");
      reset();
      router.push(`/pages/home/`);
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar post");
    } finally {
      setIsSaving(false);
      setIsLoading(false);
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

  return (
    <>
      <div className="pt-8 pl-24">
        <PageHeading
          title="Criar Post"
          description="Aqui você pode criar um novo post para seus alunos."
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

      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
            label="Conteúdo do Post"
            rows={10}
            disabled={isSaving}
            register={register}
            errors={errors}
            required
          />

          <Button
            onClick={handleSubmit(onSubmit)}
            label={isSaving ? "Salvando..." : "Criar Post"}
            disabled={isSaving}
          />
        </form>
      </div>
    </>
  );
};

export default CreatePostPage;
