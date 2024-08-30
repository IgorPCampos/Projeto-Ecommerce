import { useState, useEffect } from "react";
import { api } from "./api";

export default function showInformations() {
  const [categories, setCategories] = useState<any[]>([]);

  async function loadCategories() {
    try {
      const categoria = await api.get("/categories");
      setCategories(categoria.data);
    } catch (error) {
      console.error("Erro ao buscar categories:", error);
    }
  }
  const [products, setProducts] = useState<any[]>([]);

  async function loadProducts() {
    try {
      const respProd = await api.get("/products");
      setProducts(respProd.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [orders, setOrders] = useState<any[]>([]);

  async function loadOrders() {
    try {
      const respProd = await api.get("/orders");
      setOrders(respProd.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [users, setUsers] = useState<any[]>([]);

  async function loadUsers() {
    try {
      const respProd = await api.get("/users");
      setUsers(respProd.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCategories();
    loadProducts();
    loadOrders();
    loadUsers();
  }, []);

  return {
    categories,
    loadCategories,
    products,
    loadProducts,
    orders,
    loadOrders,
    users,
    loadUsers,
  };
}
