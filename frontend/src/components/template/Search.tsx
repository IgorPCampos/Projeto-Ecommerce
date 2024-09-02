import React, { useState } from 'react';
import showInformations from '@/lib/showInformations';
import { useRouter } from 'next/router';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [showOptions, setShowOptions] = useState(true);
    const { products } = showInformations();
    const router = useRouter();

    const handleSearch = (e: any) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);
    
        const matchingProducts = products.filter((produto: Product) =>
            produto.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setResults(matchingProducts);
        setShowOptions(true); 
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowOptions(false);
        }, 100);
    };

    const handleItemClick = (name: string) => {
        router.push(`/AllProductByName/${name}`);
    };

    return (
        <div className="p-4 relative">
            <input
                type="text"
                className="bg-gray-100 px-3 py-2 rounded-md w-full"
                placeholder="Pesquisar..."
                value={query}
                onChange={handleSearch}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
            {showOptions && results.length > 0 && (
                <div className="w-full relative">
                    <ul className="w-full absolute left-0 bg-white border border-gray-300 z-10 shadow-md rounded-lg">
                        {results.map((result, index) => (
                            <li key={index}
                                className="py-1 border-b border-gray-300 transition-colors hover:bg-gray-100 block pl-1 text-black"
                                onClick={() => handleItemClick(result.name)}
                            >
                                {result.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Search;
