import Link from "next/link";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import showInformation from '../../lib/showInformations'

export default function Card() {
    const { products, categories, orders, users } = showInformation();
    const currentDate = new Date();
    const startOfWeekDate = startOfWeek(currentDate);
    const endOfWeekDate = endOfWeek(currentDate);
    
    function calculateProductsCreatedThisWeek() {
    
        const productsCreatedThisWeek = products.filter((product) => {
            const creationDate = new Date(product.createdAt);
    
            const isWithinRange = isWithinInterval(creationDate, { start: startOfWeekDate, end: endOfWeekDate });
    
            return isWithinRange;
        });
    
        return productsCreatedThisWeek.length;
    }
    
    function calculateCategoriesCreatedThisWeek() {
    
        const categoriesCreatedThisWeek = categories.filter((category) => {
            const creationDate = new Date(category.createdAt);
    
            const isWithinRange = isWithinInterval(creationDate, { start: startOfWeekDate, end: endOfWeekDate });
    
            return isWithinRange;
        });
    
        return categoriesCreatedThisWeek.length;
    }
    
    function calculateOrdersCreatedThisWeek() {
    
        const ordersCreatedThisWeek = orders.filter((order) => {
            const creationDate = new Date(order.createdAt);
    
            const isWithinRange = isWithinInterval(creationDate, { start: startOfWeekDate, end: endOfWeekDate });
    
            return isWithinRange;
        });
    
        return ordersCreatedThisWeek.length;
    }
    
    function calculateUsersCreatedThisWeek() {
    
        const usersCreatedThisWeek = users.filter((user) => {
            const creationDate = new Date(user.createdAt);
    
            const isWithinRange = isWithinInterval(creationDate, { start: startOfWeekDate, end: endOfWeekDate });
    
            return isWithinRange;
        });
    
        return usersCreatedThisWeek.length;
    }

    return (
        <div className="flex flex-row">
            <Link href={"/produto"}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-400 cursor-pointer mr-6">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Produtos</div>
                        <p className="text-gray-700 text-base">
                            Quantidade de produtos: {products.length}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <p className="inline-block text-sm font-semibold text-gray-700 mr-2 select-text cursor-text">
                            Produtos cadastrados essa semana: {calculateProductsCreatedThisWeek()}
                        </p>
                    </div>
                </div>
            </Link>
            <Link href={"/categoria"}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-400 cursor-pointer mr-6">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Categorias</div>
                        <p className="text-gray-700 text-base">
                            Quantidade de categorias: {categories.length}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <p className="inline-block text-sm font-semibold text-gray-700 mr-2 select-text cursor-text">
                            Categorias cadastradas essa semana: {calculateCategoriesCreatedThisWeek()}
                        </p>
                    </div>
                </div>
            </Link>
            <Link href={"/pedido"}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-400 cursor-pointer mr-6">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Pedidos</div>
                        <p className="text-gray-700 text-base">
                            Quantidade de pedidos: {orders.length}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <p className="inline-block text-sm font-semibold text-gray-700 mr-2 select-text cursor-text">
                            Pedidos feitos essa semana: {calculateOrdersCreatedThisWeek()}
                        </p>
                    </div>
                </div>
            </Link>
            <Link href={"/usuario"}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-400 cursor-pointer">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Usuários</div>
                        <p className="text-gray-700 text-base">
                            Quantidade de usuários: {users.length}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <p className="inline-block text-sm font-semibold text-gray-700 mr-2 select-text cursor-text">
                            Usuários cadastrados essa semana: {calculateUsersCreatedThisWeek()}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
