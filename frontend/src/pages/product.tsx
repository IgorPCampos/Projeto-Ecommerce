import Layout from "../components/template/Layout";
import { CreateNewProduct } from "@/components/template/Product/CreateNewProduct";
import { protectedRoutes } from "../lib/protectedRoutes";

export const getServerSideProps = protectedRoutes();

export default function Product() {
  return (
    <Layout title="Produtos" subtitle="Veja seus produtos">
      <CreateNewProduct />
    </Layout>
  );
}
