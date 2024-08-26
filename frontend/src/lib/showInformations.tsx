import { useState, useEffect } from 'react';
import { api } from './api';

export default function showInformations() {
    const [categories, setcategories] = useState<any[]>([]);

    async function loadCategories() {
        try {
            const categoria = await api.get('/categories');
            setcategories(categoria.data);

        } catch (error) {
            console.error('Erro ao buscar categories:', error);
        }
    }
    const [products, setproducts] = useState<any[]>([]);

    async function loadProducts() {
        try {
            const respProd = await api.get('/products');
            setproducts(respProd.data);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    return { products, categories, loadProducts, loadCategories };
}