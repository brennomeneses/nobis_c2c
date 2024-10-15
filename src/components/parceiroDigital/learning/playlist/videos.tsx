import React from 'react';
import { Card, Checkbox } from 'antd';

const App: React.FC = () => (
  <>
      <div className='cardPlaylist' style={{ width: '100%' }}>
        <Checkbox />
        <div className='videoPlaylist'></div>
        <div className='videoPInfo'>
          <div>
            <h4>Título do vídeo</h4>
            <p>teste</p>
            <h5>Duração</h5>
            <p>2min44s</p>
          </div>
        </div>
        <div className='videoTags'>
          <p>Tag 1</p>
          <p>Tag 2</p>
          <p>Tag 3</p>
          <p>Tag 4</p>
        </div>
      </div>
  </>
);

export default App;