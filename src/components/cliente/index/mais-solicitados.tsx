import React from 'react';
import { Card } from 'antd';

const App: React.FC = ({ servico }) => (
  <>
    <Card bordered={true} className='servicosMaisSolicitados'>
      {servico}
    </Card>
    <br/>
  </>

);

export default App;