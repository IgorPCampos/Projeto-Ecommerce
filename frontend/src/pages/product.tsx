import Layout from "../components/template/Layout";
import { CreateNewProduct } from "@/components/template/Product/CreateNewProduct";


export default function Product() {
  return (
    <Layout title="Produtos" subtitle="Veja seus produtos">
      <CreateNewProduct />
    </Layout>
  );
}