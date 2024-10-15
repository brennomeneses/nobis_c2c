import React from 'react';
import { Card } from 'antd';

const App: React.FC = () => (
  <>
    <center>
      <Card style={{ width: 260, textAlign: 'justify', alignContent: 'center' }}>
        <p>Tem alguma dúvida técnica que algum outro prestador possa te responder? <a className="forumLink" href="/forum"> Pergunte em nosso Fórum</a></p>
      </Card>
    </center>
  </>
);

export default App;