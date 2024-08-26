import Layout from "../components/template/Layout";
import Card from "../components/template/Card";

export default function Home() {
  return (
    <div>
      <Layout title="Bem-vindo" subtitle="Cadastre seus produtos e as suas categorias">
        <Card />
      </Layout>
    </div>
  )
}
