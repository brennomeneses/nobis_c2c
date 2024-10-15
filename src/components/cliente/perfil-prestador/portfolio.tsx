import React from 'react';
import { Card, Col, Row } from 'antd';

const App: React.FC = () => (
  <>
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          Card content
        </Card>
      </Col>
    </Row>
    <br/><br/>
  </>
);

export default App;