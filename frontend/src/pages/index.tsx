import Layout from "../components/template/Layout";
import Card from "../components/template/Card";

export default function Home() {
  return (
    <div>
      <Layout titulo="Bem-vindo" subtitulo="Cadastre seus produtos e as suas categorias">
        <Card />
      </Layout>
    </div>
  )
}
