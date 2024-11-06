import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stage, Layer, Image, Text, Transformer, Group } from 'react-konva';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
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
    const [userText, setUserText] = useState<string>("Your Text Here");
    const [fontFamily, setFontFamily] = useState<string>("Arial");
    const [fontColor, setFontColor] = useState<string>("#000000");
    const [logos, setLogos] = useState<{ image: HTMLImageElement, x: number, y: number }[]>([]);


    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserText(e.target.value);
    };
    
    const handleFontChange = (value: string) => {
        setFontFamily(value);
    };

    const handleExport = () => {
        if (stageRef.current) {
            const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
            // Trigger a download
            const link = document.createElement('a');
            link.download = 'design.png';
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    

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
    let centerX;
    let centerY;
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

        const centerX = x + imageWidth / 2;
        const centerY = y + imageHeight / 2;
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
            <div className="flex justify-center items-center py-5 space-x-4">
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
                <input 
                    type="text"
                    value={userText}
                    onChange={handleTextChange}
                    className="border p-2"
                    placeholder="Enter your text"
                />
                
                <Select value={fontFamily} onValueChange={handleFontChange}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Font Family" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Trebuchet MS">Trebuchet MS</SelectItem>
                        <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                        <SelectItem value="Impact">Impact</SelectItem>
                        <SelectItem value="Lucida Sans Unicode">Lucida Sans Unicode</SelectItem>
                        <SelectItem value="Palatino">Palatino</SelectItem>
                        <SelectItem value="Garamond">Garamond</SelectItem>
                        <SelectItem value="Bookman">Bookman</SelectItem>
                        <SelectItem value="Candara">Candara</SelectItem>
                        <SelectItem value="Tahoma">Tahoma</SelectItem>
                        <SelectItem value="Geneva">Geneva</SelectItem>
                        <SelectItem value="Optima">Optima</SelectItem>
                        <SelectItem value="Didot">Didot</SelectItem>
                        <SelectItem value="Rockwell">Rockwell</SelectItem>
                        <SelectItem value="Baskerville">Baskerville</SelectItem>
                        <SelectItem value="Consolas">Consolas</SelectItem>
                        <SelectItem value="Futura">Futura</SelectItem>
                        <SelectItem value="Gill Sans">Gill Sans</SelectItem>
                        <SelectItem value="Perpetua">Perpetua</SelectItem>
                        <SelectItem value="Monaco">Monaco</SelectItem>
                        <SelectItem value="Century Gothic">Century Gothic</SelectItem>
                        <SelectItem value="Franklin Gothic Medium">Franklin Gothic Medium</SelectItem>
                        <SelectItem value="Segoe UI">Segoe UI</SelectItem>
                        <SelectItem value="Merriweather">Merriweather</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Nunito">Nunito</SelectItem>
                        <SelectItem value="Raleway">Raleway</SelectItem>
                        <SelectItem value="Ubuntu">Ubuntu</SelectItem>
                        <SelectItem value="PT Sans">PT Sans</SelectItem>
                        <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                    <label htmlFor="fontColor" className="text-sm">Text Color:</label>
                    <input
                        type="color"
                        id="fontColor"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        className="w-8 h-8 p-0 border-0"
                    />
                </div>

                <div className="flex justify-center items-center">
                    <button 
                        onClick={handleExport}
                        className="mt-4 px-4 py-2 bg-black text-white rounded flex items-center justify-center"
                    >
                        <ArrowDownTrayIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
            
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
                            x={centerX}
                            y={centerY}
                            onClick={(event) => {
                                const tr = transformerRef.current;
                                if (tr) {
                                    tr.nodes([event.target]);
                                    setSelectedId('text1');
                                }
                            }}
                        >
                            <Text 
                                text={userText} 
                                fontSize={40}
                                fill={fontColor}
                                x={x} 
                                y={y} 
                                fontFamily={fontFamily} 
                            />
                        </Group>
                        <Transformer ref={transformerRef} />
                    </Layer>
                </Stage>
            </div>
        </>
    );
};

export default CreateDesign;
