import axios from "axios";
import { FormEvent, useState } from "react";
import CreateButton from "../CreateButton";
import Input from "../Input";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setFeedbackMessage("");
    setFeedbackType("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: formData.get("email"),
          password: formData.get("password"),
        },
        { withCredentials: true }
      );
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Ocorreu um erro";
      setFeedbackMessage(errorMessage);
      setFeedbackType("error");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>

      {feedbackMessage && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            feedbackType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Digite o seu email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Digite a sua senha"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <CreateButton text="Entrar" type="submit" />
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
}
