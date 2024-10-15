import styled from 'styled-components';
import { Badge, Button, Form, Input, Select, theme, Upload } from "antd";
import type { FormProps, UploadFile } from 'antd';
import { useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
import { useParams } from 'react-router-dom';

const HalfContainer = styled.div`
  width: 50%;
  padding-right: 20px;
  display: grid;
  align-content: space-around;
`

const FlexContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: contents;
  }
`

type FieldType = {
  title?: string;
  videoUrl?: string;
  tags?: string[];
  thumbnail?: UploadFile;
};

const EditarVideo = () => {

  const [imageUrl, setImageUrl] = useState<string | null>('https://picsum.photos/seed/picsum/400/300');

  const { uuid } = useParams();

  console.log(uuid)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const handleImageChange = (info: UploadChangeParam) => {
    const file = info.fileList[0].originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: "81vh",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}
    >
      <h1>Editar vídeo</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
      >
        <FlexContainer>
          <HalfContainer>
            <Form.Item<FieldType>
              label="Titulo do vídeo"
              name="title"
              rules={[{ required: true, message: 'Por favor insira o titulo do vídeo!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Link do vídeo"
              name="videoUrl"
              rules={[{ required: true, message: 'Por favor insira o link do vídeo!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Tags"
              name="tags"
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
              />
            </Form.Item>
          </HalfContainer>
          <HalfContainer>
            <img style={{
              maxWidth: "100%",
              maxHeight: "250px",
              borderRadius: "20px",
              margin: "0 0 10px 0"
            }} src={imageUrl || ''} alt="Thumbnail Preview" />
            <Form.Item<FieldType>
              name="thumbnail"
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleImageChange}
                maxCount={1}
                accept="image/*"
              >
                <Button>Selecione a imagem de capa</Button>
              </Upload>
            </Form.Item>
          </HalfContainer>
        </FlexContainer>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button size='large' type="primary" htmlType="submit" style={{
            margin: "0 20px 0 20px"
          }}>
            Salvar edições
          </Button>
          <Button size='large' type="primary" danger htmlType="submit">
            Deletar Vídeo
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditarVideo