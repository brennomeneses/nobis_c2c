import { UploadOutlined } from "@ant-design/icons";
import { Button, theme, Upload, Form, Input, UploadFile, Select, notification } from "antd";
import { useState } from "react";
import type { GetProp, UploadProps } from 'antd';
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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const token = localStorage.getItem('digitalPartnerToken');

  const onFinish = (values) => {
    console.log(values)
    const formData = new FormData();
    formData.append('file', values.upload.file);
    formData.append('name', values.name)

    console.log(formData.get("file"))

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };

    fetch(`${baseUrl}/digital_partners/file`, options)
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
              label="Projetos"
              name="projects"
              rules={[{ required: true, message: 'Selecione ao menos um projeto' }]}
            >
              <Select
                allowClear
                mode="multiple"
                notFoundContent="Você não possui nenhum projeto cadastrado"
                style={{ width: '85%' }}
                placeholder="Selecione os projetos"
              />
              <Button style={{ width: '15%' }} onClick={() => handleSelectAll()}>Selecionar todos</Button>
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
          rules={[{ required: true, message: 'Please upload a file!' }]}
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div >
  );
}

export default Documents;