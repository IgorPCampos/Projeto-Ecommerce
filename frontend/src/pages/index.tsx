import { useState, useEffect } from "react";
import Logo from "../components/template/Logo";
import Search from "../components/template/Search";
import Avatar from "../components/template/Avatar";
import Link from "next/link";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imageId?: number;
};

type File = {
  id: number;
  path: string;
  productId: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [files, setFiles] = useState<File[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const fetchProducts = async (categoryName: string) => {
    try {
      let response;
      if (categoryName === "Todos") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/latest`
        );
      } else {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/name/${categoryName}`
        );
      }
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/files`);
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
    fetchFiles(); 
  }, [selectedCategory]);

  const getProductImagePath = (imageId: number | undefined) => {
    const file = files.find((file) => file.id === imageId);
    return file ? `${process.env.NEXT_PUBLIC_API_URL}${file.path}` : "/images/no-image.png"; 
  };

  return (
    <div className="bg-gray-100">
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

      <nav className="bg-blue-700 text-white py-2 cursor-pointer">
        <div className="container mx-auto flex space-x-4">
          <a
            className="hover:text-gray-200"
            onClick={() => setSelectedCategory("Todos")}
          >
            Todos os departamentos
          </a>
          <a
            className="hover:text-gray-200"
            onClick={() => setSelectedCategory("Celulares")}
          >
            Celulares
          </a>
          <a
            className="hover:text-gray-200"
            onClick={() => setSelectedCategory("Eletrodomésticos")}
          >
            Eletrodomésticos
          </a>
          <a
            className="hover:text-gray-200"
            onClick={() => setSelectedCategory("Móveis")}
          >
            Móveis
          </a>
          <a
            className="hover:text-gray-200"
            onClick={() => setSelectedCategory("Informática")}
          >
            Informática
          </a>
        </div>
      </nav>

      <section className="bg-slate py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            {selectedCategory === "Todos"
              ? "Últimos Produtos Cadastrados"
              : `Produtos de ${selectedCategory}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
            {products.map((product) => (
              <Link
                href={`/specificProduct/${product.id}`}
                key={product.id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={getProductImagePath(product.imageId)} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Estoque: {product.quantity} unidades
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
