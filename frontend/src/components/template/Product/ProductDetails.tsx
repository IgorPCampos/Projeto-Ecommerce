import showInformations from '@/lib/showInformations';

interface ProductDetailProps {
  productId: number
}

function ProductDetail(props: ProductDetailProps) {
  const { produtos, carregarProdutos } = showInformations();
  
  carregarProdutos();

  return (
    
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      {produtos
        .filter((produto) => produto.id === props.productId)
        .map((produto) => (
          <div key={produto.id}>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{produto.name}</div>
              <p className="text-gray-700 text-base">{produto.description}</p>
              <p className="text-gray-700">Preço: ${produto.price}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductDetail;
