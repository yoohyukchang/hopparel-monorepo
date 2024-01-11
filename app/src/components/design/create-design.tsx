import { Stage, Layer, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useStore } from "@/lib/store";
import hoodieImg from "@/assets/hoodie.png";
import sweatshirtImg from "@/assets/sweatshirt.png";
import tshirtImg from "@/assets/tshirt.png";
import beanieImg from "@/assets/beanie.png";
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Konva from 'konva'

interface TransformableTextProps {
    textProps: Konva.TextConfig;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (newAttrs: any) => void;
  }
  
  const TransformableText: React.FC<TransformableTextProps> = ({ textProps, isSelected, onSelect, onChange }) => {
    const textRef = useRef<Konva.Text>(null);
    const trRef = useRef<Konva.Transformer>(null);
  
    useEffect(() => {
      if (isSelected && textRef.current && trRef.current) {
        trRef.current.nodes([textRef.current]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected]);
  
    return (
      <>
        <Text
          onClick={onSelect}
          onTap={onSelect}
          ref={textRef}
          {...textProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...textProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={() => {
            if (textRef.current) {
              onChange({
                ...textProps,
                x: textRef.current.x(),
                y: textRef.current.y(),
                width: textRef.current.width(),
                height: textRef.current.height(),
              });
            }
          }}
        />
        {isSelected && trRef.current && (
          <Transformer
            ref={trRef}
            flipEnabled={false}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
};

const CreateDesign: React.FC = () => {
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


    // transformable texts
    const [textProps, setTextProps] = useState({
        x: 50,
        y: 50,
        text: 'Hopkins',
        fontSize: 20,
        fill: 'black',
        draggable: true,
      });
      const [selectedId, selectShape] = useState<string | null>(null);
    
      const checkDeselect = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
      };




    return (
        <>
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
                    <TransformableText
                    textProps={textProps}
                    isSelected={selectedId === 'text1'}
                    onSelect={() => {
                        selectShape('text1');
                    }}
                    onChange={(newAttrs) => {
                        setTextProps(newAttrs);
                    }}
                    />
                </Layer>
            </Stage>
            </div>
        </>
    );
};

export default CreateDesign;
