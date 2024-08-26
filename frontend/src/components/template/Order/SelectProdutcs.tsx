import { useState } from "react";
import { Mais, Lixo } from "@/components/icons";
import showInformation from "../../../lib/showInformations";

export default function SelectProducts() {
  const { products } = showInformation();
  const [productSelections, setProductSelections] = useState([{ productId: 0, quantity: 1, maxQuantity: 1 }]);

  const addProductSelection = () => {
    setProductSelections([...productSelections, { productId: 0, quantity: 1, maxQuantity: 1 }]);
  };

  const removeProductSelection = (index: number) => {
    if (productSelections.length > 1) {
      setProductSelections(productSelections.filter((_, i) => i !== index));
    }
  };

  const updateProductSelection = (index: number, productId: number, quantity: number) => {
    const selectedProduct = products.find((product) => product.id === productId);
    const maxQuantity = selectedProduct ? selectedProduct.quantity : 1;

    const updatedSelections = [...productSelections];
    updatedSelections[index] = { productId, quantity: Math.min(quantity, maxQuantity), maxQuantity };
    setProductSelections(updatedSelections);
  };

  return (
    <div className="flex flex-col gap-2">
      {productSelections.map((selection, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <h2 className="text-gray-900">Produto {index + 1}:</h2>
          <select
            name={`productId-${index}`}
            id={`productId-${index}`}
            className="rounded border-gray-400 bg-gray-600 text-white"
            value={selection.productId}
            onChange={(e) => updateProductSelection(index, Number(e.target.value), selection.quantity)}
          >
            <option value={0} disabled>Adicionar Produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          {selection.productId !== 0 && (
            <>
              <input
                type="number"
                name={`quantity-${index}`}
                id={`quantity-${index}`}
                value={selection.quantity}
                min="1"
                max={selection.maxQuantity}
                className="rounded border-gray-400 bg-gray-600 text-white ml-2"
                onChange={(e) => updateProductSelection(index, selection.productId, Number(e.target.value))}
              />
              <span className="ml-2 text-gray-600">Disponível: {selection.maxQuantity}</span>
            </>
          )}

          {index === productSelections.length - 1 && (
            <button type="button" onClick={addProductSelection}>
              {Mais}
            </button>
          )}
          {index > 0 && (
            <button type="button" onClick={() => removeProductSelection(index)}>
              {Lixo}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
