import React, { useState, useCallback } from "react";
import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatString
} from "./lib/react-dat-gui/index.cjs";
import "./lib/react-dat-gui/index.css";
import { IData } from "./types/interface";

interface IProps {
  data: IData;
  setData: React.Dispatch<React.SetStateAction<IData>>;
}

const DatGuiPanel: React.FC<IProps> = ({ data, setData }) => {
  const handleUpdate = useCallback((newData: Partial<IData>) => {
    setData(prevState => {
      return {
        ...prevState,
        ...newData
      };
    });
  }, []);

  return (
    <DatGui data={data} onUpdate={handleUpdate} style={{ zIndex: 10 }}>
      <DatNumber
        path="ambientLightIntensity"
        label="Ambient Light Intensity"
        min={0}
        max={3}
        step={0.1}
      />
      <DatColor path="boxColor" label="Box Color" />
      <DatNumber path="seed" label="seed" min={0} max={100} step={0.01} />
      <DatNumber path="amount" label="amount" min={0} max={100} step={0.01} />
      <DatNumber path="angle" label="angle" min={0} max={360} step={0.01} />
      <DatNumber
        path="distortion_x"
        label="distortion_x"
        min={0}
        max={1}
        step={0.01}
      />
      <DatNumber
        path="distortion_y"
        label="distortion_y"
        min={0}
        max={1}
        step={0.01}
      />
      <DatNumber path="seed_x" label="seed_x" min={-1} max={1} step={0.01} />
      <DatNumber path="seed_y" label="seed_y" min={-1} max={1} step={0.01} />
    </DatGui>
  );
};

export default DatGuiPanel;
