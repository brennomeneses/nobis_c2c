import React from 'react';
import imagem from '../../assets/imgs/servico-finalizado.png';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <center>
      <img style={{ marginBottom: -235, marginLeft: 50 }} src={imagem} />
      <Divider />
      <h3>O prestador sinalizou que este serviço foi finalizado.</h3>
      <button className="btnConfirmar">Confirmar</button>
    </center>
  </>
);

export default App;