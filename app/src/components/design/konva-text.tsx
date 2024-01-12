import { Box, Flex } from "@chakra-ui/react";
import Konva from "konva";
import React, { useRef } from "react";
import { Stage, Layer, Text, Group, Transformer } from "react-konva";

const KonvaText: React.FC = () => {
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <Flex bgColor="gray.100">
      <Box>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageRef}
          onClick={(event) => {
            const stage = stageRef.current;
            if (event.target === stage) {
              const tr = transformerRef.current;
              if (tr) {
                tr.nodes([]);
              }
            }
          }}
          style={{
            backgroundColor: "#FFF"
          }}
        >
          <Layer ref={layerRef}>
            <Group
              draggable
              onMouseLeave={(event) => {
                const parent = event.target.getParent();
                if (parent) {
                  parent.setAttr("isSelected", false);
                }
              }}
              onDragEnd={(event) => {
                const tr = transformerRef.current;
                if (tr) {
                  tr.nodes([event.target]);
                }
              }}
              onClick={(event) => {
                const element = event.target;
                const tr = transformerRef.current;
                const parent = element.getParent();

                if (tr && parent) {
                  if (parent.attrs.isSelected) {
                    element.draggable(true);
                    tr.nodes([element]);
                    parent.setAttr("isSelected", false);
                  } else {
                    parent.getChildren().forEach((node) => {
                      node.draggable(false);
                    });
                    parent.setAttr("isSelected", true);
                    tr.nodes([parent]);
                  }
                  tr.getLayer()?.batchDraw();
                }
              }}
              onTransformEnd={(event) => {
                // ... rest of your onTransformEnd logic
              }}
              onTransform={(event) => {
                // ... rest of your onTransform logic
              }}
            >
              <Text text="hello" fontSize={100} x={0} y={100} />
              <Text text="hello" fontSize={100} />
            </Group>
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </Box>
    </Flex>
  );
};

export default KonvaText;
