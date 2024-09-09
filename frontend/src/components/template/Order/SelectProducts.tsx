import { useState, useEffect } from "react";
import { Mais, Lixo } from "../../../../public/icons";
import showInformation from "../../../lib/showInformations";

export default function SelectProducts() {
  const { products } = showInformation();
  const [productSelections, setProductSelections] = useState([{ productId: 0, quantity: 1, maxQuantity: 1 }]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = productSelections.reduce((sum, selection) => {
        const selectedProduct = products.find((product) => product.id === selection.productId);
        if (selectedProduct) {
          return sum + selectedProduct.price * selection.quantity;
        }
        return sum;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [productSelections, products]);

  return (
    <div className="flex flex-col gap-2">
      {productSelections.map((selection, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <h2 className="text-gray-900">Produto {index + 1}:</h2>
          <select
            name={`productId`}
            id={`productId`}
            className="rounded border-gray-400 bg-white text-black"
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
                name={`quantity`}
                id={`quantity`}
                value={selection.quantity}
                min="1"
                max={selection.maxQuantity}
                className="rounded border-gray-400 bg-white text-black ml-2"
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
      <div >
        <h2 className="ml-0 text-gray-800">Preço Total: R$ {totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}
