"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import { useAuth, useAuthStore } from "./libs/stores/AuthStore";
import { useAuthTimeout } from "./hooks/useAuthTimeout";
import SelectInput from "./components/SelectInput/SelectInput";

const AuthPage: React.FC = () => {
  useAuthTimeout();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/pages/home");
    }
  }, [isAuthenticated, router]);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<FieldValues>({
    defaultValues: {
      usuario: "",
      senha: "",
    },
  });

  const onSubmitLogin: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou credenciais inválidas!");
      }

      const result = await response.json();
      const { access_token } = result;

      if (!access_token) {
        throw new Error("Token não recebido");
      }

      useAuthStore.getState().login(access_token);

      toast.success("Login realizado com sucesso!");

      router.push("/pages/home");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro no login");
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    watch: watchRegister,
    formState: { errors: errorsRegister },
  } = useForm<FieldValues>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmaSenha: "",
    },
  });

  const senha = watchRegister("senha");

  const onSubmitRegister: SubmitHandler<FieldValues> = async (data) => {
    if (data.senha !== data.confirmaSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.senha,
          role: data.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar conta");
      }

      toast.success("Cadastro realizado com sucesso!");
      setIsRegister(false);
      router.push("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro no cadastro");
    } finally {
      setIsLoading(false);
    }
  };

  const title = isRegister ? "Cadastro" : "Login";
  const subtitle = isRegister
    ? "Crie sua conta para acessar o sistema!"
    : "Bem-vindo, entre com seus dados para acessar o sistema!";
  const buttonLabel = isRegister ? "Cadastrar" : "Login";
  const buttonIcon = isRegister ? AiOutlineUser : AiOutlineLogin;

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {" "}
      <div className="relative w-full md:w-1/2 h-64 md:h-screen flex flex-col">
        <div className="absolute inset-0 flex flex-col justify-center md:justify-start md:pt-[20%] px-4 md:px-8 md:pl-10">
          <div className="flex flex-col items-start md:items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold my-2 md:my-4">
              FRONT BLOG
            </h1>
            <p className="text-xl sm:text-2xl text-white">
              Blog dinâmico estudantil
            </p>
          </div>

          <footer className="absolute bottom-4 left-0 right-0 md:left-auto md:w-1/2 p-2 md:p-4 flex justify-center md:justify-start">
            <p className="text-center md:text-left text-sm md:text-base text-white">
              &copy; FRONT BLOG {new Date().getFullYear()}
            </p>
          </footer>
        </div>

        <Image
          src="/static/images/bg_login.jpg"
          alt="Login_Background"
          loading="eager"
          priority={true}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          style={{ height: "100%" }}
        />
      </div>
      <div className="w-full md:w-1/2 h-auto md:h-screen flex flex-col p-4 sm:p-6 md:p-20 justify-center bg-white gap-6 md:gap-8">
        <div className="w-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
          <Image
            src="/static/images/logo.png"
            alt="Logo"
            width={200}
            height={200}
            loading="eager"
            priority={true}
            className="w-3/5 sm:w-1/2 md:w-2/5 h-auto object-contain"
          />
        </div>

        <div className="w-full flex flex-col mb-4 md:mb-2">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-black">
            {title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl mb-2 text-black">
            {subtitle}
          </p>
        </div>

        {isRegister ? (
          <form
            onSubmit={handleSubmitRegister(onSubmitRegister)}
            className="w-full flex flex-col gap-4"
          >
            <Input
              id="email"
              label="Email"
              type="email"
              disabled={isLoading}
              register={registerRegister}
              errors={errorsRegister}
              required
            />
            <Input
              id="senha"
              label="Senha"
              type="password"
              disabled={isLoading}
              register={registerRegister}
              errors={errorsRegister}
              required
            />
            <Input
              id="confirmaSenha"
              label="Confirme a Senha"
              type="password"
              disabled={isLoading}
              register={registerRegister}
              errors={errorsRegister}
              required
              {...registerRegister("confirmaSenha", {
                validate: (value) =>
                  value === senha || "As senhas não coincidem",
              })}
            />

            <SelectInput
              id="role"
              label="Tipo de Usuário"
              disabled={isLoading}
              register={registerRegister}
              errors={errorsRegister}
              required
              options={[
                { value: "aluno", label: "Aluno" },
                { value: "professor", label: "Professor" },
              ]}
            />

            <div className="w-full flex flex-col my-8 md:my-10">
              <Button
                label={buttonLabel}
                icon={buttonIcon}
                onClick={() => ""}
                disabled={isLoading}
              />
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitLogin(onSubmitLogin)}
            className="w-full flex flex-col gap-4"
          >
            <Input
              id="email"
              label="E-mail"
              type="text"
              disabled={isLoading}
              register={registerLogin}
              errors={errorsLogin}
              required
            />
            <Input
              id="senha"
              label="Senha"
              type="password"
              disabled={isLoading}
              register={registerLogin}
              errors={errorsLogin}
              required
            />

            <div className="w-full flex flex-col my-8 md:my-10">
              <Button
                label={buttonLabel}
                icon={buttonIcon}
                onClick={() => ""}
                disabled={isLoading}
              />
            </div>
          </form>
        )}

        <div className="w-full flex items-center justify-center pt-4">
          {isRegister ? (
            <p className="text-xs sm:text-sm font-normal text-neutral-800 text-center">
              Já possui conta?{" "}
              <span
                className="font-semibold underline underline-offset-2 cursor-pointer text-rose-500"
                onClick={() => setIsRegister(false)}
              >
                Faça login.
              </span>
            </p>
          ) : (
            <p className="text-xs sm:text-sm font-normal text-neutral-800 text-center">
              Não possui conta?{" "}
              <span
                className="font-semibold underline underline-offset-2 cursor-pointer text-rose-500"
                onClick={() => setIsRegister(true)}
              >
                Criar uma.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
