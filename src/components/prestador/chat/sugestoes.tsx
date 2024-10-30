import React, { useRef } from 'react';
import { Button, Space } from 'antd';

interface SugestoesProps {
    onSuggestionClick: (suggestion: string) => void;
  }

const Sugestoes: React.FC<SugestoesProps> = ({ onSuggestionClick }) => {
  const sugestoes = [
    "Olá, como posso ajudar?",
    "De qual serviço você precisa?",
    "Quantos itens você gostaria?",
    "Precisa de mais alguma coisa?",
    "Olá! O que você está buscando?",
    "Oi! Em que posso ajudar hoje?",
    "Quer saber mais sobre o serviço?",
    "Precisa de algo específico?",
    "Posso te ajudar com mais detalhes?",
    "Quer um orçamento inicial?"
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    startX = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Aumenta ou diminui a velocidade de arraste
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{ overflowX: 'auto', overflowY: "hidden", whiteSpace: 'nowrap', padding: '10px', backgroundColor: '#f0f2f5', borderRadius: '8px', cursor: 'grab' }}
    >
      <Space>
        {sugestoes.map((sugestao, index) => (
          <Button
            key={index}
            type="default"
            onClick={() => onSuggestionClick(sugestao)}
            className='botaoSugestao'
            style={{ 
              borderRadius: '16px', 
              backgroundColor: '#fff', 
              border: '1px solid #d9d9d9', 
              color: '#595959', 
              fontSize: '14px', 
              padding: '0 12px',
              marginRight: '8px',
              marginBottom: '45px'
            }}
          >
            {sugestao}
          </Button>
        ))}
      </Space>
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Sugestoes;
