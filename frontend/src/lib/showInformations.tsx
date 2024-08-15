import { useState, useEffect } from 'react';
import { api } from './api';

export default function showInformations() {
    const [categorias, setCategorias] = useState<any[]>([]);

    async function carregarCategorias() {
        try {
            const categoria = await api.get('/category');
            setCategorias(categoria.data);

        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    const [produtos, setProdutos] = useState<any[]>([]);

    async function carregarProdutos() {
        try {
            const respProd = await api.get('/product');
            setProdutos(respProd.data);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        carregarCategorias();
        carregarProdutos();
    }, []);

    return { produtos, categorias, carregarProdutos, carregarCategorias };
}