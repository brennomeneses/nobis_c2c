import React from 'react';
import imagem from '../../assets/imgs/prestador.png';
import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

const DadosPrestador: React.FC<{ foto: string; nome: string; nota: number }> = ({ foto, nome, nota }) => (
  <>
    <center>
      <div className="dados-prestador">
        <img src={foto} />
        <h3>{nome}</h3>
        <div className='rating'><StarFilled />{nota}</div>
      </div>
    </center>
  </>
);

export default DadosPrestador;