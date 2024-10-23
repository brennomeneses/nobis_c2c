import React from 'react';
import { Card } from 'antd';

const App: React.FC = ({title, notifBody}) => (
  <Card style={{ width: "100%" }}>
    <p>{title}</p>
    <p>{notifBody}</p>
  </Card>
);

export default App;