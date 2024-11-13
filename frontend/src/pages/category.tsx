import Layout from "../components/template/Layout";
import CreateNewCategory from "@/components/template/Category/CreateNewCategory";
import { protectedRoutes } from "../lib/protectedRoutes";

export const getServerSideProps = protectedRoutes();

export default function Category() {
  return (
    <Layout title="Categorias" subtitle="Veja suas categorias">
      <CreateNewCategory/>
    </Layout>);
}