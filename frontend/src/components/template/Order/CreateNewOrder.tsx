import { FormEvent } from "react";
import { api } from "@/lib/api";
import useFlashMessage from "../../../lib/useFlashMessage";
import showInformation from "../../../lib/showInformations";
import CreateButton from "../CreateButton";
import Input from "../Input";
import SelectProducts from "./SelectProducts";

export function CreateNewOrder() {
  const { setFlashMessage } = useFlashMessage();
  const { orders, products, loadOrders } = showInformation();

  async function handleCreateOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let msgType = "success";

    // Log para depuração de formData
    console.log("Form Data Entries:", Array.from(formData.entries()));

    // Construir o array orderItems com productId e quantity
    const orderItems = Array.from(formData.getAll("productId"))
      .map((productId, index) => ({
        productId: Number(productId),
        quantity: Number(formData.getAll("quantity")[index]),
      }))
      .filter((item) => item.productId && item.quantity);

    // Log para depuração de orderItems
    console.log("Order Items:", orderItems);

    try {
      const response = await api.post(`/orders/3`, {
        address: formData.get("address"),
        paymentMethod: formData.get("paymentMethod"),
        orderItems,
      });

      setFlashMessage("Pedido criado com sucesso!", msgType);
      loadOrders();
    } catch (err: any) {
      msgType = "error";

      const errorMessage =
        err.response.data?.message || "Ocorreu um erro ao criar o pedido.";
      setFlashMessage(
        Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        msgType
      );
    }
  }

  return (
    <>
      <form
        onSubmit={handleCreateOrder}
        className="flex flex-1 flex-col gap-2 border-2 bg-slate-200 rounded-lg px-4 pt-6 pb-4 mb-4"
      >
        <div className="flex flex-col gap-3">
          <label
            htmlFor="address"
            className="items-center gap-1.5 text-gray-900"
          >
            Endereço:
            <Input type="text" name="address" id="address" required />
          </label>
          <label
            htmlFor="paymentMethod"
            className="items-center gap-1.5 text-gray-900"
          >
            Método de Pagamento:
            <Input
              type="text"
              name="paymentMethod"
              id="paymentMethod"
              required
            />
          </label>

          <SelectProducts />
        </div>

        <CreateButton type="submit" texto="Criar" />
      </form>

      <table className="min-w-full table-auto border border-gray-400">
        <thead>
          <tr className="bg-blue-700 dark:bg-blue-600">
            <th className="py-2 px-2 text-left">Endereço do Pedido</th>
            <th className="py-2 px-2 text-left">Método de Pagamento</th>
            <th className="py-2 px-2 text-left">Preço do Pedido</th>
            <th className="py-2 px-2 text-left">Produtos</th>
            <th className="py-2 px-2 text-center">Usuário</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            products.find((prod) => prod.id === order.productId);

            return (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-gray-300 dark:bg-gray-300 opacity-70"
                    : "text-black"
                }
              >
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {order.address}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {order.paymentMethod}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {order.total}
                </td>   
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {order.orderItems
                    .map((product: any) => {
                      const foundProduct = products.find(
                        (prod) => prod.id === product.productId
                      );
                      return foundProduct
                        ? foundProduct.name
                        : "Produto desconhecido";
                    })
                    .join(", ")}
                </td>
                <td className="py-3 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {order.userId}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
