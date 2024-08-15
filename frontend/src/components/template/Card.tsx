import Link from "next/link";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import showInformation from '../../lib/showInformations'

export default function Card() {
    const { produtos, categorias } = showInformation();
    const dataAtual = new Date();
    const dataInicioDaSemana = startOfWeek(dataAtual);
    const dataFimDaSemana = endOfWeek(dataAtual);
    
    function calcularProdutosCriadosEstaSemana() {

        const produtosCriadosNaSemana = produtos.filter((produto) => {
            const dataCriacao = new Date(produto.createdAt)

            const dentroDoIntervalo = isWithinInterval(dataCriacao, { start: dataInicioDaSemana, end: dataFimDaSemana });

            return dentroDoIntervalo;
        });

        return produtosCriadosNaSemana.length;
    }

    function calcularCategoriasCriadosEstaSemana() {

        const categoriasCriadosNaSemana = categorias.filter((categoria) => {
            const dataCriacao = new Date(categoria.createdAt)

            const dentroDoIntervalo = isWithinInterval(dataCriacao, { start: dataInicioDaSemana, end: dataFimDaSemana });

            return dentroDoIntervalo;
        });

        return categoriasCriadosNaSemana.length;
    }

    return (
        <div className="flex flex-row">
            <Link href={"/produto"}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-400 cursor-pointer mr-6">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Produtos</div>
                        <p className="text-gray-700 text-base">
                            Quantidade de produtos: {produtos.length}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <p className="inline-block text-sm font-semibold text-gray-700 mr-2 select-text cursor-text">
                            Produtos cadastrados essa semana: {calcularProdutosCriadosEstaSemana()}
                        </p>
                    </div>
                </div>
            </Link>
            <Link href={"/categoria"}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-400 cursor-pointer">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Categorias</div>
                        <p className="text-gray-700 text-base">
                            Quantidade de categorias: {categorias.length}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <p className="inline-block text-sm font-semibold text-gray-700 mr-2 select-text cursor-text">
                            Categorias cadastradas essa semana: {calcularCategoriasCriadosEstaSemana()}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
