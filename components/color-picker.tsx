// components/ColorPicker.tsx
import React from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <>
      <HexColorPicker color={color} onChange={onChange} style={{width: '100%', height: '260px'}}/>
      <HexColorInput color={color} onChange={onChange} prefixed alpha style={{width: '100%', height: '40px', fontSize: '18px'}}/>
    </>
  );
};

export default ColorPicker;
