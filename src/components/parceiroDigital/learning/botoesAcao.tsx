import React from 'react';
import { Card, Col, Row } from 'antd';
import playlist from '../../assets/icons/playlist.png';
import quiz from '../../assets/icons/quiz.png';
import upload from '../../assets/icons/upload.png';

const App: React.FC = () => (
  <>
    <div className='actionBtns'>
      <Row gutter={24}>
        <Col span={3}>
          <Card style={{ textAlign: 'center' }}>
            <img src={upload} /> <br /><br/>
            Postar <br/> vídeo-aula
          </Card>
        </Col>
        <Col span={3}>
          <Card style={{ textAlign: 'center' }}>
            <img src={playlist} /> <br /><br/>
            Criar <br/> Playlist
          </Card>
        </Col>
        <Col span={3}>
          <Card style={{ textAlign: 'center' }}>
            <img src={quiz} /> <br /><br/>
            Criar <br/> Quiz
          </Card>
        </Col>
        <Col span={3}>
          <Card style={{ textAlign: 'center' }}>
            <img src={upload} /> <br /><br/>
            Upload <br/> de documentos
          </Card>
        </Col>
      </Row>
    </div>
  </>
);

export default App;