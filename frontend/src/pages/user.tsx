import Layout from "../components/template/Layout";
import { protectedRoutes } from "../lib/protectedRoutes";

export const getServerSideProps = protectedRoutes();
export default function User() {
  return (
    <Layout title="Usuários" subtitle="Veja os usuarios">
      <div>
        <h1>User</h1>
      </div>
    </Layout>);
}