/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import useDeletarPost from "@/app/hooks/modals/useDeletarPost";
import { useAuthStore } from "@/app/libs/stores/AuthStore";
import Modal from "./Modal";
import toast from "react-hot-toast";
import HeadingModal from "../Heading/HeadingModal";

const DeletarPostModal: React.FC = () => {
  const deletarPost = useDeletarPost();
  const router = useRouter();
  const { token } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      id: "",
      title: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (!deletarPost.id) {
      toast.error("ID do post não encontrado.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`/api/posts/${deletarPost.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao excluir post.");

      toast.success(`Post "${deletarPost.title}" excluído com sucesso!`);
      deletarPost.onClose();
      router.push("/pages/home");
    } catch (error: any) {
      toast.error(error.message || "Não foi possível excluir o post.");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <HeadingModal
        title={`Excluir o post: "${deletarPost.title}"?`}
        subtitle="Essa ação é irreversível e removerá o post permanentemente."
        center
      />
    </div>
  );

  const footerContent = <div className="flex felx-col gap-4 mt-3"></div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={deletarPost.isOpen}
      title="Excluir Post"
      actionLabel="Confirmar Exclusão"
      secondaryAction={deletarPost.onClose}
      secondaryActionLabel="Cancelar"
      onClose={deletarPost.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default DeletarPostModal;
