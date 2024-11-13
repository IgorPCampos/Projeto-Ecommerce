import Layout from "../components/template/Layout";
import Card from "../components/template/Card";
import { protectedRoutes } from "../lib/protectedRoutes";

export const getServerSideProps = protectedRoutes();
export default function Home() {
  return (
    <div>
      <Layout title="Bem-vindo" subtitle="Cadastre seus produtos e as suas categorias">
        <Card />
      </Layout>
    </div>
  )
}
