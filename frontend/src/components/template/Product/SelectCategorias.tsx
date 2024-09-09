import { useState } from "react";
import { Mais, Lixo } from "../../../../public/icons";
import showInformation from "../../../lib/showInformations";

export default function Selectcategories() {
  const { categories } = showInformation();
  const [categorySelections, setCategorySelections] = useState(1);

  const addCategorySelection = () => {
    setCategorySelections(categorySelections + 1);
  };

  const removeCategorySelection = (index: number) => {
    if (categorySelections > 1) {
      const selections = [...Array(categorySelections).keys()].filter(
        (i) => i !== index
      );
      setCategorySelections(selections.length);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {Array.from({ length: categorySelections }).map((_, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <h2 className="text-gray-900">Categorias:</h2>
          <select
            name={`categoryId`}
            id={`categoryId`}
            className="rounded border-gray-400 bg-white text-black"
          >
            {categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
          {index === categorySelections - 1 && (
            <button type="button" onClick={addCategorySelection}>
              {Mais}
            </button>
          )}
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeCategorySelection(index)}
            >
              {Lixo}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
