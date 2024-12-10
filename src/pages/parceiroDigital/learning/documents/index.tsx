import { UploadOutlined } from "@ant-design/icons";
import { Button, theme, Upload, Form, Input, UploadFile, Select, notification } from "antd";
import { useState, useEffect } from "react";
import type { GetProp, UploadProps, SelectProps } from 'antd';
import baseUrl from "../../../../components/assets/schemas/baseUrl";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  projects?: string[];
};

const handleSelectAll = () => {
  if (options) {
    const allValues = options.map(option => option.value); // Get all values from options
    form.setFieldsValue({ users: allValues }); // Programmatically set the selected values
    setSelectedUsers(allValues as string[]); // Update local state
  }
};


const Documents = () => {
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
        'User-Agent': 'insomnia/10.1.1',
        Authorization: `Bearer ${token}`,
      }
    };

    fetch('https://brenno-envoriment-platform-server-testing.1pc5en.easypanel.host/digital_partners/projects', options)
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

  const onFinish = (values) => {
    console.log(values)
    const formData = new FormData();
    formData.append('file', values.upload.file);
    formData.append('description', values.name)

    console.log(formData.get("file"))

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };

    fetch(`${baseUrl}/digital_partners/projects/${projectUuid}/documents`, options)
      .then(response => response.json())
      .then(response => sucessNotification(response.originalFilename))
      .catch(err => failNotification());
  };

  const sucessNotification = (filename: string) => {
    api.info({
      message: 'Arquivo enviado com sucesso!',
      description: `Arquivo ${filename} foi enviado com sucesso`,
    });
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
          rules={[{ required: true, message: 'Dê um titulo ao arquivo' }]}
          label="Descrição do arquivo"
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