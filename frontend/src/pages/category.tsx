import Layout from "../components/template/Layout";
import CreateNewCategory from "@/components/template/Category/CreateNewCategory";


export default function Category() {
  return (
    <Layout title="Categorias" subtitle="Veja suas categorias">
      <CreateNewCategory/>
    </Layout>);
}