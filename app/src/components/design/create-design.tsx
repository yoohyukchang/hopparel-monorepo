import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

    // Function to handle selection change
    const handleSelectChange = (value: string) => {
        setSelectedProductType(value);
    };

    let img;
    if (selectedProductType === 'Hoodie') img = hoodieImg;
    else if (selectedProductType === 'Sweatshirt') img = sweatshirtImg;
    else if (selectedProductType === 'T-Shirt') img = tshirtImg;
    else if (selectedProductType === 'Beanie') img = beanieImg;
    else {
        // white background for now for default.
        img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/White_square_50%25_transparency.svg/1000px-White_square_50%25_transparency.svg.png';
    }

    const [image] = useImage(img);

    // Define initial values and types for x and y
    let scaleX: number, scaleY: number, scale;
    let x: number = 0; // Initial value and type for x
    let y: number = 0; // Initial value and type for y
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
            <div className="flex justify-center items-center py-5">
                <Select value={selectedProductType} onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Hoodie">Hoodie</SelectItem>
                        <SelectItem value="Sweatshirt">Sweatshirt</SelectItem>
                        <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                        <SelectItem value="Beanie">Beanie</SelectItem>
                    </SelectContent>
                </Select>  
            </div>
            <div className='container'>
                <Stage 
                    width={stageWidth} 
                    height={stageHeight} 
                    ref={stageRef}
                    onMouseDown={checkDeselect}
                    style={{ marginTop: '-150px', border: '1px solid black' }}
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
                            <Text text="Hopkins" fontSize={100} x={x} y={y} />
                        </Group>
                        <Transformer ref={transformerRef} />
                    </Layer>
                </Stage>
            </div>
        </>
    );
};

export default CreateDesign;
