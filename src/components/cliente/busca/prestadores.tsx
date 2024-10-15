import React from 'react';
import { Card, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons';

interface AppProps {
  nome: string;
  foto: string;
  servico: string;
  nota: number;
  distancia: string;
  trabalhoRemoto: boolean;
}

const App: React.FC<AppProps> = ({ nome, foto, servico, nota, distancia, trabalhoRemoto }) => (
  <>
    <Card>
      <div className="cardPrestador">
        <div className="prestadorBusca">
          <div className="prestadorBuscaImg">
            <img src={foto} className='iconPesquisa' />
          </div>
          <div className="prestadorBuscaInfo">
            <h2>{nome}</h2>
            <h3>{servico}</h3>
          </div>
        </div>
        <div className="avaliacao">
          {isNaN(nota) ? (
            <>Não possui avaliações</>
          ) : (
            <><StarFilled /> {nota.toFixed(2)}</>
          )}
        </div>
        <div className="distancia">
          <h3>Distância</h3>
          <h1>{distancia}</h1>
          <Tag color={trabalhoRemoto ? "geekblue" : "green"}>
            {trabalhoRemoto ? "Serviço Remoto" : "Serviço Presencial"}
          </Tag>
        </div>
      </div>
    </Card>
    <br />
  </>
);

export default App;