import React from 'react';
import { Card, Col, Row } from 'antd';
import servico1 from '../../assets/imgs/servico1.png'
import servico2 from '../../assets/imgs/servico2.png'
import servico3 from '../../assets/imgs/servico3.png'
import servico4 from '../../assets/imgs/servico4.png'
import servico5 from '../../assets/imgs/servico5.png'
import servico6 from '../../assets/imgs/servico6.png'

const App: React.FC = () => (
  <>
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <div className='categoriaCard'>
            <img src={servico1} />
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <div className='categoriaCard'>
            <img src={servico2} />
          </div>
        </Card>
      </Col>
    </Row>
    <br/>
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <div className='categoriaCard'>
            <img src={servico3} />
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <div className='categoriaCard'>
            <img src={servico4} />
          </div>
        </Card>
      </Col>
    </Row>
    <br/>
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <div className='categoriaCard'>
            <img src={servico5} />
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <div className='categoriaCard'>
            <img src={servico6} />
          </div>
        </Card>
      </Col>
    </Row>
  </>
);

export default App;