import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp"; 

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {showLogin ? <SignIn /> : <SignUp />}
        <div className="mt-4 text-center">
          {showLogin ? (
            <p>
              Não tem conta?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Cadastre-se
              </button>
            </p>
          ) : (
            <p>
              Já tem uma conta?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Faça login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
