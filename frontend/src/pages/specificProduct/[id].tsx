import { useRouter } from "next/router";
import ProductDetails from "../../components/template/Product/ProductDetails";

function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);

  return (
    <div>
      <ProductDetails productId={idNumber} />
      <h1>s</h1>
    </div>
  );
}

export default ProductPage;
