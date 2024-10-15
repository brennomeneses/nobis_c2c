import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const App: React.FC = () => (
  <>
    <center>
      <Card style={{ width: 270, textAlign: 'center', alignContent: 'center' }}>
        <p>Tem dúvida sobre qual tipo<br/>de profissional contratar para<br/>resolver seu problema? <br />
        <Link to={'/forum'} className="forumLink">Pergunte em nosso Fórum</Link></p>
      </Card>
      <br/>
      <p>Conectamos clientes a prestadores de serviços de A a Z</p>
      <br/>
      <p>Conheça categorias de serviços cadastrados:</p>
      <br/>
    </center>
  </>
);

export default App;