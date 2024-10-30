import React from 'react';
import { Input } from 'antd';

interface EnviarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const Enviar: React.FC<EnviarProps> = ({ inputValue, setInputValue }) => {
  return (
    <Input.Search
      placeholder="Digite sua mensagem..."
      allowClear
      enterButton="Enviar"
      size="large"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default Enviar;
