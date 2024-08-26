import showInformations from '@/lib/showInformations';

interface ProductDetailProps {
  productId: number
}

function ProductDetail(props: ProductDetailProps) {
  const { products, loadProducts } = showInformations();
  
  loadProducts();

  return (
    
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      {products
        .filter((product) => product.id === props.productId)
        .map((product) => (
          <div key={product.id}>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.name}</div>
              <p className="text-gray-700 text-base">{product.description}</p>
              <p className="text-gray-700">Preço: ${product.price}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductDetail;
