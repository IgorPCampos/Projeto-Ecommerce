import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import useFlashMessage from "../../../lib/useFlashMessage";
import showInformation from "../../../lib/showInformations";
import CreateButton from "../CreateButton";
import SelectCategorias from "./SelectCategorias";
import Input from "../Input";

interface File {
  id: number;
  path: string;
  productId: number;
}

export function CreateNewProduct() {
  const { setFlashMessage } = useFlashMessage();
  const { products, categories, loadProducts } = showInformation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/files`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Erro ao carregar arquivos", error);
      }
    }

    fetchFiles();
  }, []);

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let msgType = "success";

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          name: formData.get("name"),
          price: Number(formData.get("price")),
          description: formData.get("description"),
          quantity: Number(formData.get("quantity")),
          categories: Array.from(formData.getAll("categoryId")).map(Number),
        },
        { withCredentials: true }
      );

      const productId = response.data.id;
      const image = formData.get("image");

      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/upload`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setFlashMessage("Produto criado com sucesso!", msgType);
      loadProducts();
    } catch (error: any) {
      msgType = "error";
      const parsedData = error.response?.data?.message || "Ocorreu um erro";
      setFlashMessage(parsedData, msgType);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
    }
  }

  function getProductImage(productImageId: number | null) {
    const file = files.find((file) => file.id === productImageId);
    return file ? `${process.env.NEXT_PUBLIC_API_URL}${file.path}` : null;
  }

  return (
    <>
      <form
        onSubmit={handleCreateProduct}
        className="flex flex-1 flex-col gap-2 border-2 bg-slate-200 rounded-lg px-4 pt-6 pb-4 mb-4"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Nome:
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Digite o nome do Produto"
              required
            />
          </label>
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Preço:
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Digite o preço do Produto"
              required
            />
          </label>
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Descrição:
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Digite a descrição do Produto"
              required
            />
          </label>
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Quantidade:
            <Input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Digite a quantidade do Produto"
              required
            />
          </label>
          <label htmlFor="image" className="items-center gap-1.5 text-gray-900">
            Imagem do Produto:
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>

          {imagePreview && (
            <div>
              <p>Preview da imagem:</p>
              <img
                src={imagePreview}
                alt="Preview da imagem selecionada"
                className="h-40 w-40 object-cover"
              />
            </div>
          )}

          <SelectCategorias />
        </div>

        <CreateButton type="submit" text="Criar" />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => {
          const productCategories = product.categories
            .map((category: any) => {
              const foundCategory = categories.find(
                (cat) => cat.id === category.categoryId
              );
              return foundCategory
                ? foundCategory.name
                : "Categoria desconhecida";
            })
            .join(", ");

          const productImage = getProductImage(product.fileId);
            
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>Sem imagem</span>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">Preço: R$ {product.price}</p>
                <p className="text-gray-600">
                  Descrição: {product.description}
                </p>
                <p className="text-gray-600">Quantidade: {product.quantity}</p>
                <p className="text-gray-600">Categorias: {productCategories}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
