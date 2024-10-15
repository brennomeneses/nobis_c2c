import React from 'react';
import { Card } from 'antd';
import img from '../../assets/imgs/chatImg.png';

const App: React.FC = () => (
  <>
    <center>
      <Card style={{ width: 260, textAlign: 'justify', height: 85, alignContent: 'center' }}>
        <p>No momento você não possui nenhum serviço ativo! Que tal assistir a uma vídeo-aula de uma empresa parceira?</p>
      </Card>
      <br/>
      <img src={img} />
    </center>
  </>
);

export default App;