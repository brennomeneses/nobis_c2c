import React from 'react';
import { Card, Col, Row } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import prestativoImg from '../../assets/imgs/clientePrestativo.png';
import respeitosoImg from '../../assets/imgs/clienteRespeitoso.png';

const Avaliacoes: React.FC<{ prestativo: number, respeitoso: number }> = ({ prestativo, respeitoso }) => {
  return (
    <>
      <h1 className='titulo' style={{ textAlign: 'center', fontWeight: 600 }}>Avaliações de prestadores</h1>
      <Row gutter={24}>
        <Col span={12}>
          <Card bordered={true} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="cardAvaliacao">
              <img src={prestativoImg} alt="Prestativo" />
              <p>Prestativo</p>
              <p style={{ textAlign: 'center' }}>{prestativo}</p>
              {[...Array(prestativo)].map((_, index) => <StarFilled key={index} />)}
              {[...Array(5 - prestativo)].map((_, index) => <StarOutlined key={`empty-prestativo-${index}`} />)}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="cardAvaliacao">
              <img src={respeitosoImg} alt="Respeitoso" />
              <p>Respeitoso</p>
              <p style={{ textAlign: 'center' }}>{respeitoso}</p>
              {[...Array(respeitoso)].map((_, index) => <StarFilled key={index} />)}
              {[...Array(5 - respeitoso)].map((_, index) => <StarOutlined key={`empty-respeitoso-${index}`} />)}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Avaliacoes;
