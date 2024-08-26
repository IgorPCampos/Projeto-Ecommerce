import Layout from "../components/template/Layout";
import CreateNewCategory from "@/components/template/Category/CreateNewCategory";


export default function Categoria() {
  return (
    <Layout title="Categorias" subtitle="Veja suas categorias">
      <CreateNewCategory/>
    </Layout>);
}