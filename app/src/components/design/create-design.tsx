import { Stage, Layer, Image, Text, Transformer, Group } from 'react-konva';
import useImage from 'use-image';
import { useStore } from "@/lib/store";
import hoodieImg from "@/assets/hoodie.png";
import sweatshirtImg from "@/assets/sweatshirt.png";
import tshirtImg from "@/assets/tshirt.png";
import beanieImg from "@/assets/beanie.png";
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Konva from 'konva'

const CreateDesign: React.FC = () => {
    const selectedProductType = useStore((state) => state.selectedProductType);
    const setSelectedProductType = useStore((state) => state.setSelectedProductType);
    const transformerRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);

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

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const clickedOnEmpty = e.target === stageRef.current;
        if (clickedOnEmpty) {
            setSelectedId(null);
            const tr = transformerRef.current;
            if (tr) {
                tr.nodes([]);
            }
        }
    };

    return (
        <>
            <div className='container'>
                <Stage 
                    width={stageWidth} 
                    height={stageHeight} 
                    ref={stageRef}
                    onMouseDown={checkDeselect}
                    style={{ marginTop: '-150px' }}
                >
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
                        <Group
                            draggable
                            onClick={(event) => {
                                const tr = transformerRef.current;
                                if (tr) {
                                    tr.nodes([event.target]);
                                    setSelectedId('text1');
                                }
                            }}
                        >
                            <Text text="Hopkins" fontSize={100} x={0} y={100} />
                        </Group>
                        <Transformer ref={transformerRef} />
                    </Layer>
                </Stage>
            </div>
        </>
    );
};

export default CreateDesign;
