import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import Header from "@/components/header";
import { useStore } from "@/lib/store";
import hoodieImg from "@/assets/hoodie.png";
import sweatshirtImg from "@/assets/sweatshirt.png";
import tshirtImg from "@/assets/tshirt.png";
import beanieImg from "@/assets/beanie.png";
import { useEffect } from 'react';

const DesignCreateView: React.FC = () => {
    const selectedProductType = useStore((state) => state.selectedProductType);
    const setSelectedProductType = useStore((state) => state.setSelectedProductType);

    // Save to localStorage when selectedProductType changes
    useEffect(() => {
        if (selectedProductType) {
            localStorage.setItem('selectedProductType', selectedProductType);
        }
    }, [selectedProductType]);
    

    // Read from localStorage on component mount
    useEffect(() => {
        const savedProductType = localStorage.getItem('selectedProductType');
        if (savedProductType) {
            setSelectedProductType(savedProductType);
        }
    }, []);    

    let img;
    if (selectedProductType === 'Hoodie') img = hoodieImg;
    else if (selectedProductType === 'Sweatshirt') img = sweatshirtImg;
    else if (selectedProductType === 'T-Shirt') img = tshirtImg;
    else if (selectedProductType === 'Beanie') img = beanieImg;
    else {
        img = tshirtImg;
    }

    const [image] = useImage(img);

    let scaleX, scaleY, scale, x, y;
    const stageWidth = 600;
    const stageHeight = 600;
    const padding = 50;

    if (image) {
        // Calculate scale for best fit with padding
        scaleX = (stageWidth - padding * 2) / image.width;
        scaleY = (stageHeight - padding * 2) / image.height;
        scale = Math.min(scaleX, scaleY);

        // Calculate new width and height
        const imageWidth = image.width * scale;
        const imageHeight = image.height * scale;

        // Center the image
        x = (stageWidth - imageWidth) / 2;
        y = (stageHeight - imageHeight) / 2;
    }

    return (
        <>
            <Header />
            <div className='container'>
            <Stage 
                width={stageWidth} 
                height={stageHeight} 
                style={{ 
                    marginTop: '-150px'
                }}>
                <Layer>
                    {image && (
                        <Image
                            image={image}
                            x={x}
                            y={y}
                            scaleX={scale}
                            scaleY={scale}
                            width={image.width}
                            height={image.height}
                        />
                    )}
                </Layer>
            </Stage>
            </div>
        </>
    );
};

export default DesignCreateView;
