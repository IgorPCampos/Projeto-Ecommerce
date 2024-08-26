import showInformations from '@/lib/showInformations';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ShowProductsProps {
    productName: string;
}

export default function ShowProducts(props: ShowProductsProps) {
    const { products, categories, loadProducts, loadCategories } = showInformations();

    const [categoryFilters, setCategoryFilters] = useState<number[]>([]); 
    const [priceFilter, setPriceFilter] = useState<number | null>(null);

    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    const handleCategoryCheckboxChange = (categoryId: number) => {
        if (categoryFilters.includes(categoryId)) {
            setCategoryFilters(categoryFilters.filter((id) => id !== categoryId));
        } else {
            setCategoryFilters([...categoryFilters, categoryId]);
        }
    };

    const filteredProducts = products
        .filter((produto) =>
            produto.name.toLowerCase().includes(props.productName.toLowerCase()) &&
            (categoryFilters.length === 0 || produto.categories.some((category: { id: number }) => categoryFilters.includes(category.id))) &&
            (!priceFilter || produto.price <= priceFilter)
        );

    const filteredCategories = categories.filter((categoria) =>
        filteredProducts.some((produto) => produto.categories.some((category: { id: number }) => category.id === categoria.id))
    );

    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-200">
                <h2 className="text-lg font-semibold">Filtrar por Categoria</h2>
                <label>
                    <input
                        type="checkbox"
                        value=""
                        checked={categoryFilters.length === 0}
                        onChange={() => setCategoryFilters([])}
                        className='mr-1'
                    />
                    Todas as Categorias
                </label>
                {filteredCategories.map((categoria) => (
                    <label key={categoria.id} className="block">
                        <input
                            type="checkbox"
                            value={categoria.id}
                            checked={categoryFilters.includes(categoria.id)}
                            onChange={(e) => handleCategoryCheckboxChange(parseInt(e.target.value, 10))}
                            className='mr-1'
                        />
                        {categoria.name}
                    </label>
                ))}

                <h2 className="text-lg font-semibold mt-4">Filtrar por Preço Máximo</h2>
                <input
                    type="number"
                    placeholder="Preço Máximo"
                    className="w-full p-2 mt-2 border rounded"
                    onChange={(e) => setPriceFilter(parseInt(e.target.value, 10) || null)}
                />
            </div>

            <div className="w-3/4 flex flex-wrap">
                {filteredProducts.map((produto) => (
                    <Link href={`/specificProduct/${produto.id}`} key={produto.id}>
                        <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-2" key={produto.id}>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{produto.name}</div>
                                <p className="text-gray-700 text-base">{produto.description}</p>
                                <p className="text-gray-700">Preço: ${produto.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
