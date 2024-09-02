import Layout from "../components/template/Layout";
import CreateNewCategory from "@/components/template/Category/CreateNewCategory";


export default function User() {
  return (
    <Layout title="Usuários" subtitle="Veja suas categorias">
      <CreateNewCategory/>
    </Layout>);
}