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
        step={10.1}
      />
      <DatColor path="boxColor" label="Box Color" />
    </DatGui>
  );
};

export default DatGuiPanel;
