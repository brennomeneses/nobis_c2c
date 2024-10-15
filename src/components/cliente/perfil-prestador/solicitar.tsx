import React from 'react';
import { Card, Col, Row } from 'antd';

const App: React.FC = ({ onClick }) => (
  <>
    <center><button className="btnConfirmar" onClick={onClick}>SOLICITAR SERVIÇO</button></center>
    <br/><br/><br/>
  </>
);

export default App;