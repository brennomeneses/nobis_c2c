import React from 'react';
import { List } from 'antd';

interface ServicoProps {
  orcamento: string;
  pagamento: Array<{ type: string }>;
  distancia: number;
  deficiencia: string;
  opRad: number | null;
}

const Servico: React.FC<ServicoProps> = ({ orcamento, pagamento, distancia, deficiencia, opRad }) => {
  const data = [
    {
      label: 'Distância de Atendimento',
      value: opRad === null ? "Não informado" : `${opRad} km`,
    },
    {
      label: 'Métodos de Pagamento',
      value: pagamento.map(p => p.type).join(', '),
    },
    {
      label: 'Distância',
      value: `${distancia} km`,
    },
    {
      label: 'Deficiências',
      value: deficiencia ? deficiencia : 'Nenhuma',
    },
    {
      label: 'Orçamento',
      value: orcamento !== 'Não cobro para realizar orçamento' 
        ? `R$ ${parseFloat(orcamento).toFixed(2).replace('.', ',')}` 
        : orcamento || 'Não cobro para realizar orçamento',
    },
  ];

  return (
    <List
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <strong>{item.label}:</strong> {item.value}
        </List.Item>
      )}
    />
  );
};

export default Servico;