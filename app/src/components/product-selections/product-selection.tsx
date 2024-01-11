import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";

interface ProductProps {
  productType: string;
  image: string;
}

const ProductSelection = ({ productType, image }: ProductProps) => {
  const setSelectedProductType = useStore((state) => state.setSelectedProductType);

  const handleSelectedProductType = () => {
    setSelectedProductType(productType);
  };

  return (
    <Link to="/create-design">
      <div className="flex flex-col items-center cursor-pointer border border-gray-400" onClick={handleSelectedProductType}>
        <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-70 xl:h-70 relative">
          <img
            src={image}
            alt={productType}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="bg-white w-32 md:w-48 lg:w-64 xl:w-80 h-10 flex items-center justify-center">
          <span className="font-bold">{productType}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductSelection;
