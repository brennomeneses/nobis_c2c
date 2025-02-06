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
      <Col key={partner.uuid} xs={24} sm={12} md={12}>
        <Card title={`Projeto ${partner.title}`}>
          {partner.image ? (
            <img
              src={`https://brenno-envoriment-node.1pc5en.easypanel.host/uploads/${partner.image}`}
              alt={partner.orgName}
              style={{ width: '100%', height: '200px', backgroundSize: 'cover',  objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <p></p>
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