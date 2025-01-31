import { UploadOutlined } from "@ant-design/icons";
import { Button, theme, Upload, Form, Input, UploadFile, Select, notification } from "antd";
import { useState, useEffect } from "react";
import type { SelectProps } from 'antd';
import baseUrl from "../../../../components/assets/schemas/baseUrl";
import { useNavigate } from 'react-router-dom';

type FormType = {
  name: string;
  category: string;
  projects: string[];
  upload: any;
}

type FieldType = {
  projects?: string[];
};


const Documents = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [projects, setProjects] = useState<SelectProps['options']>([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [projectUuid, setProjectUuid] = useState<string>("");

  const token = localStorage.getItem('digitalPartnerToken');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    fetch(baseUrl + '/digital_partners/projects', options)
      .then(response => response.json())
      .then(response => {
        const projectOptions = response.map((project: Record<string, string>) => ({
          label: project.title,
          value: project.uuid
        }));
        setProjects(projectOptions);
      })
      .catch(err => console.error(err));
  }, [token]);

  const onFinish = (values: FormType) => {
    console.log(values)
    console.log(typeof values.projects)
    const formData = new FormData();
    formData.append('description', values.name)
    formData.append('category', values.category);
    formData.append('projectsUuids', JSON.stringify(values.projects));
    formData.append('files', values.upload.file);

    console.log(formData.get("files"))

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };

    fetch(`${baseUrl}/digital_partners/transparency`, options)
      .then(response => response.json())
      .then(response => {
        navigate("/parceiro-digital/transparencia");
      })
      .catch(err => failNotification());
  };

  const failNotification = () => {
    api.error({
      message: 'Ops...',
      description: `Não foi possivel enviar o arquivo, por favor, verifique-o e tente novamente`,
    });
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Ensure only one file is kept in the list
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: "83vh",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
      }}
    >
      {contextHolder}
      <h1>Enviar documentos</h1>
      <Form form={form} name="file-upload-form" onFinish={onFinish}>
      <Form.Item<FieldType>
            label="Projeto"
            name="projects"
            rules={[{ required: true, message: 'Selecione ao menos um projeto' }]}
          >
            <Select
              allowClear
              mode="multiple"
              notFoundContent="Nenhum projeto encontrado"
              style={{ width: '100%' }}
              placeholder="Selecione o projeto para enviar o vídeo"
              options={projects}
              onChange={(value) => {
                console.log(value);
                if (value.length > 0) {
                  setProjectUuid(value);
                }
              }}
            />
            {/* <Button style={{ width: '15%' }} onClick={() => handleSelectAll()}>Selecionar todos</Button> */}
          </Form.Item>
            
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Dê uma descrição ao arquivo' }]}
          label="Descrição do arquivo"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[{ required: true, message: 'Selecione uma categoria' }]}
          label="Categoria do arquivo"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          rules={[{ required: true, message: 'Por favor envie um arquivo!' }]}
          label="Anexe aqui o seu arquivo"
        >
          <Upload
            name="file"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              setFileList([file]);

              return false;
            }}
            onChange={handleChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Anexar arquivo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div >
  );
}

export default Documents;