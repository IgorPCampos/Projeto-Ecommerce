import { useState } from "react";

export default function Authentication() {
  const [accountType, setAccountType] = useState("Pessoa Física");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form>
          {/* Nome - Somente Pessoa Física */}
          {accountType === "Pessoa Física" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="name"
                type="text"
                placeholder="Digite seu nome"
              />
            </div>
          )}

          {/* Razão Social - Somente Pessoa Jurídica */}
          {accountType === "Pessoa Jurídica" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="razaoSocial"
              >
                Razão Social
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="razaoSocial"
                type="text"
                placeholder="Digite a Razão Social"
              />
            </div>
          )}

          {/* Email - Ambos os tipos de conta */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
              id="email"
              type="email"
              placeholder="Digite seu email"
            />
          </div>

          {/* CNPJ - Somente Pessoa Jurídica */}
          {accountType === "Pessoa Jurídica" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cnpj"
              >
                CNPJ
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                id="cnpj"
                type="text"
                placeholder="Digite o CNPJ"
              />
            </div>
          )}

          {/* Senha - Ambos os tipos de conta */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring"
              id="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>

          {/* Seção de Tipo de Conta */}
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Entrar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
