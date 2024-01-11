import ProductSelection from './product-selection';
import hoodieImg from "@/assets/hoodie.png";
import sweatshirtImg from "@/assets/sweatshirt.png";
import tshirtImg from "@/assets/tshirt.png";
import beanieImg from "@/assets/beanie.png";

const ProductSelections = () => {
  const products = [
    { productType: "Hoodie", image: hoodieImg },
    { productType: "Sweatshirt", image: sweatshirtImg },
    { productType: "T-Shirt", image: tshirtImg },
    { productType: "Beanie", image: beanieImg },
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2 lg:w-1/2">
        {products.map((product) => (
          <ProductSelection
            key = {product.productType}
            productType = {product.productType}
            image = {product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSelections;
