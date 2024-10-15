import React from 'react';
import { Card } from 'antd';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface HistoricoProps {
  nome: string;
  servico: string;
  valor: string;
  pagamento: string;
  data: string;
  uuid: string;
}

const Historico: React.FC<HistoricoProps> = ({ nome, servico, valor, pagamento, data, uuid }) => {
  const date = parseISO(data);
  const formattedDate = format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <>
      <p>{formattedDate}</p>
      <Link to={`/chat/${uuid}`}>
      <Card>
        <div className="destaque">
          <div className="destaquePrestador">
            <h2>{nome}</h2>
            <h3>Cliente</h3>
          </div>
        </div>
        <div className="infoServico">
          <p>Serviço: {servico}<br/>
          Valor pago: R$ {valor}<br/>
          Método de pagamento: {pagamento}</p>
        </div>
      </Card>
    </Link>
    </>
  );
};

export default Historico;