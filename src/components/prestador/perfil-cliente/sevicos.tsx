import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import prestativo from '../../assets/imgs/clientePrestativo.png';
import respeitoso from '../../assets/imgs/clienteRespeitoso.png';

const App: React.FC = ({total, categoria}) => (
  <>
    <h1 className='titulo' style={{ textAlign: 'center', fontWeight: 600 }}>Serviços solicitados</h1>
    <Row gutter={24}>
      <Col span={12}>
        <Card bordered={true} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="cardAvaliacao">
            <Statistic title="Total de serviços solicitados" value={57} style={{ textAlign: 'center' }} />
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={true} style={{ display: 'flex', justifyContent: 'center' }}>
          <Statistic title="Serviços em sua categoria" value={18} style={{ textAlign: 'center' }} />
        </Card>
      </Col>
    </Row>
  </>
);

export default App;