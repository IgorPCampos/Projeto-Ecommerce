import Layout from "../components/template/Layout";
import { CreateNewProduct } from "@/components/template/Product/CreateNewProduct";


export default function Produto() {
  return (
    <Layout titulo="Produtos" subtitulo="Veja seus produtos">
      <CreateNewProduct />
    </Layout>
  );
}