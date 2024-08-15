import Layout from "../components/template/Layout";
import CreateNewCategory from "@/components/template/Category/CreateNewCategory";


export default function Categoria() {
  return (
    <Layout titulo="Categorias" subtitulo="Veja suas categorias">
      <CreateNewCategory/>
    </Layout>);
}