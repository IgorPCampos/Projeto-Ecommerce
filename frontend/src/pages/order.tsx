import Layout from "../components/template/Layout";
import { CreateNewOrder } from "@/components/template/Order/CreateNewOrder";
import { protectedRoutes } from "../lib/protectedRoutes";

export const getServerSideProps = protectedRoutes();
export default function Order() {
  return (
    <Layout title="Pedidos" subtitle="Veja seus pedidos">
      <CreateNewOrder />
    </Layout>
  );
}
