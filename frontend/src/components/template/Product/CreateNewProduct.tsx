import { FormEvent } from "react";
import { api } from "@/lib/api";
import useFlashMessage from "../../../lib/useFlashMessage";
import showInformation from "../../../lib/showInformations";
import BotaoCriar from "../BotaoCriar";
import SelectCategorias from "../Select";
import Input from "../Input";

export function CreateNewProduct() {
  const { setFlashMessage } = useFlashMessage();
  const { produtos, categorias, carregarProdutos } = showInformation();

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let msgType = "success";

    const data = await api
      .post("/product", {
        name: formData.get("name"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        quantity: Number(formData.get("quantity")),
        categories: Array.from(formData.getAll("categoryId")).map(Number),
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";

        return err.response.data;
      });
    if (msgType == "success") {
      setFlashMessage(data.message, msgType);
    } else {
      const parsedData = JSON.parse(data.message);

      setFlashMessage(parsedData[0]?.message, msgType);
    }
    carregarProdutos();
  }

  return (
    <>
      <form
        onSubmit={handleCreateProduct}
        className="flex flex-1 flex-col gap-2 border-2 bg-slate-200 rounded-lg px-4 pt-6 pb-4 mb-4"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Nome:
            <Input type="text" name="name" id="name" />
          </label>
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Preço:
            <Input type="number" name="price" id="price" />
          </label>
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Descrição:
            <Input type="text" name="description" id="description" />
          </label>
          <label htmlFor="" className="items-center gap-1.5 text-gray-900">
            Quantidade:
            <Input
              type="number"
              name="quantity"
              id="quantity"
              required={true}
            />
          </label>
          <SelectCategorias/>
        </div>

        <BotaoCriar type="submit" texto="Criar" />
      </form>

      <table className=" min-w-full table-auto border border-gray-400">
        <thead>
          <tr className="bg-blue-700 dark:bg-blue-600">
            <th className="py-2 px-2 text-left">Nome do Produto</th>
            <th className="py-2 px-2 text-left">Preço do Produto</th>
            <th className="py-2 px-2 text-left">Descrição do Produto</th>
            <th className="py-2 px-2 text-left">Quantidade</th>
            <th className="py-2 px-2 text-center">Categorias</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => {
            const categoria = categorias.find(
              (cat) => cat.id === produto.categoryId
            );

            return (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-gre dark:bg-gray-300 opacity-70"
                    : "text-black"
                }
              >
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {produto.name}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {produto.price}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {produto.description}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {produto.quantity}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {produto.categories
                    .map((categoria: any) => categoria.name)
                    .join(", ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
