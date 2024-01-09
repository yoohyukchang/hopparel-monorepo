import hoodieImg from '../assets/hoodie.png';
import sweatshirtImg from '../assets/sweatshirt.png';
import tshirtImg from '../assets/tshirt.png';
import beanieImg from '../assets/beanie.png';

const ProductSelections = () => {
    const products = [
        { name: 'Hoodie', image: hoodieImg },
        { name: 'Sweatshirt', image: sweatshirtImg },
        { name: 'T-Shirt', image: tshirtImg },
        { name: 'Beanie', image: beanieImg }
    ];

    // Replace this with React Router Link to navigate to a different page.
    const handleClick = () => {
        console.log("FIX IT LATER! Navigating each selection.");
    };

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 w-full md:w-1/2 lg:w-1/2">
                {products.map(product => (
                    <div className="flex flex-col items-center cursor-pointer" key={product.name} onClick={() => handleClick()}>
                        <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain"/>
                        </div>
                        <div className="bg-white w-32 md:w-48 lg:w-64 xl:w-80 h-10 flex items-center justify-center border border-gray-200">
                            <span>{product.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductSelections;