import React from 'react';
import { Card, Col, Row } from 'antd';
import imagem from '../../assets/imgs/prestador.png';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const App: React.FC = ({foto, nome, nota, chatroomUUID}) => (
  <>
    <Link to={`/chat/${chatroomUUID}`}>
        <Card bordered={true}>
          <center>
          <div className="dados-prestador">
            <img src={foto} className='iconPesquisa' />
            <h3>{nome}</h3>
            <div className='rating'><StarFilled />{nota}</div>
            <br />
            <sub>Clique para acessar o chat do serviço.</sub>
          </div>
          </center>
        </Card>
    </Link>
  </>

);

export default App;