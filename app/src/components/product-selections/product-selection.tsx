import { Link } from "react-router-dom";

interface ProductProps {
  productType: string;
  image: string;
}

const ProductSelection = ({ productType, image }: ProductProps) => {
  return (
    <Link to="/create-design">
      <div className="flex flex-col items-center cursor-pointer">
        <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 relative">
          <img
            src={image}
            alt={productType}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="bg-white w-32 md:w-48 lg:w-64 xl:w-80 h-10 flex items-center justify-center border border-gray-200">
          <span>{productType}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductSelection;
