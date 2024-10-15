import React from 'react';
import { Card, Col, Row } from 'antd';

interface Partner {
  uuid: string;
  orgName: string;
  site: string;
  profilePicture: string | null;
}

interface AfiliacoesProps {
  partners: Partner[];
}

const Afiliacoes: React.FC<AfiliacoesProps> = ({ partners }) => (
  <Row gutter={[16, 16]}>
    {partners.map((partner) => (
      <Col key={partner.uuid} xs={24} sm={12} md={8}>
        <Card title={partner.orgName}>
          {partner.profilePicture ? (
            <img 
              src={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${partner.profilePicture}`} 
              alt={partner.orgName} 
              style={{ width: '100%' }} 
            />
          ) : (
            <p>Sem imagem disponível!</p>
          )}
          <p>
            <a href={partner.site} target="_blank" rel="noopener noreferrer">
              {partner.site}
            </a>
          </p>
        </Card>
      </Col>
    ))}
  </Row>
);

export default Afiliacoes;