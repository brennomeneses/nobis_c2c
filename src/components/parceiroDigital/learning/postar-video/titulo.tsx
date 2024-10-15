import React from 'react';
import { Input, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC = () => (
  <>
    <div className='actionBtns'>
     <h2>Título do vídeo</h2>
      <Input />
    </div>
    <br/><br/>
    <div className='actionBtns'>
     <h2>Link do vídeo</h2>
      <Input />
    </div>
    <br/><br/>
    <div className='actionBtns'>
     <h2>Tags do vídeo</h2>
      <Input />
    </div>
    <br/><br/>
    <div className='actionBtns'>
       <h2>Upload da capa</h2>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Clique ou arraste a imagem para fazer upload</p>
        <p className="ant-upload-hint">
          Extensões permitidas: PNG, JPEG, JPG
        </p>
      </Dragger>
      </div>
      <br/><br/>
    <div className="btnsEditarVideo">
      <Button style={{ backgroundColor: "#4C3779", color: 'white' }}>Salvar</Button>
      <Button style={{ backgroundColor: "#A50000", color: 'white' }}>Deletar</Button>
    </div>
  </>
);

export default App;