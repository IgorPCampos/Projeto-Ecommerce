import axios from "axios";
import { FormEvent, useState } from "react";
import Input from "../Input";
import CreateButton from "../CreateButton";

export default function SignUp() {
  const [accountType, setAccountType] = useState("Pessoa Física");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setFeedbackMessage("");
    setFeedbackType("");

    const payload: any = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (accountType === "Pessoa Jurídica") {
      payload.role = 2;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        payload
      );

      setFeedbackMessage("Conta criada com sucesso!");
      setFeedbackType("success");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Ocorreu um erro";
      setFeedbackMessage(errorMessage);
      setFeedbackType("error");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastro
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

      <form onSubmit={handleCreateUser}>
        {accountType === "Pessoa Física" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nome
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Digite o seu nome"
              required
            />
          </div>
        )}

        {accountType === "Pessoa Jurídica" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="razaoSocial"
            >
              Razão Social
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Digite a razão social"
              required
            />
          </div>
        )}

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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tipo de conta
          </label>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-orange-500"
                name="accountType"
                value="Pessoa Física"
                checked={accountType === "Pessoa Física"}
                onChange={(e) => setAccountType(e.target.value)}
              />
              <span className="ml-2 text-gray-700">Pessoa Física</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-orange-500"
                name="accountType"
                value="Pessoa Jurídica"
                checked={accountType === "Pessoa Jurídica"}
                onChange={(e) => setAccountType(e.target.value)}
              />
              <span className="ml-2 text-gray-700">Pessoa Jurídica</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <CreateButton text="Criar Conta" type="submit"/>
        </div>
      </form>
    </div>
  );
}
