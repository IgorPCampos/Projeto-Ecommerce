import { useEffect } from "react";
import showInformations from "../lib/showInformations";
import Logo from "../components/template/Logo";
import Search from "../components/template/Search";
import Avatar from "../components/template/Avatar";
import Link from "next/link";

export default function Home() {
  const { products, categories, loadProducts } = showInformations();

  useEffect(() => {
    loadProducts(); // Carregar os produtos ao iniciar
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-blue-700 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Logo />
          <div className="flex items-center justify-center flex-grow">
            <Search />
          </div>
          <div className="flex justify-end items-center">
            <Avatar />
          </div>
        </div>
      </header>

      {/* Navegação Principal */}
      <nav className="bg-blue-700 text-white py-2">
        <div className="container mx-auto flex space-x-4">
          <a href="#" className="hover:underline">
            Todos os departamentos
          </a>
          <a href="#" className="hover:underline">
            Celulares
          </a>
          <a href="#" className="hover:underline">
            Eletrodomésticos
          </a>
          <a href="#" className="hover:underline">
            TVs e Vídeo
          </a>
          <a href="#" className="hover:underline">
            Informática
          </a>
        </div>
      </nav>

      {/* Produtos Recentes */}
      <section className="bg-slate py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Últimos Produtos Cadastrados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <Link
                href={`/specificProduct/${product.id}`}
                key={product.id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-gray-900 font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Estoque: {product.quantity} unidades
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Minha Loja - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
