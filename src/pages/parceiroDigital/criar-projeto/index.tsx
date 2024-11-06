import { Button, Form, Input, Select, theme, Upload, UploadFile } from "antd";
import type { FormProps, SelectProps } from 'antd';
import { useEffect, useState } from "react";
import baseUrl from "../../../components/assets/schemas/baseUrl";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

type FieldType = {
  proj_name?: string;
  proj_duration?: string;
  proj_desc?: string;
  files?: any;
};

const { TextArea } = Input;

const CriarProjeto = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [form] = Form.useForm();

  const navigation = useNavigate();

  const token = localStorage.getItem('digitalPartnerToken')


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/digital_partners/create', options)
      .then(response => response.json())
      .then(response => {
        setUsers(response.users)
      })
      .catch(err => console.error(err));
  }, [])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

    const form = new FormData();

    form.append("targetsString", JSON.stringify(values.users))
    form.append("subject", values.subject)
    form.append("content", values.message)

    if (values.files) {
      values.files.fileList.forEach((file) => {
        form.append("files", file.originFileObj)
      })
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    };

    fetch(`${baseUrl}/digital_partners/messages/broadcast`, options)
      .then(response => response.json())
      .then(response => {
        setLoading(false)
        console.log(response)
        navigation("/parceiro-digital/")
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      });
  };

  const options: SelectProps['options'] = users && users.map((user: Record<string, string>) => ({
    label: user.name,
    value: user.uuid
  }));

  const handleSelectAll = () => {
    if (options) {
      const allValues = options.map(option => option.value); // Get all values from options
      form.setFieldsValue({ users: allValues }); // Programmatically set the selected values
      setSelectedUsers(allValues as string[]); // Update local state
    }
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
      }}
    >
      {users && (
        <div
          style={{
            width: '70%',
            margin: '8vh 0 20vh 0'
          }}
        >
          <h1>Criar Novo Projeto</h1>

          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Nome"
              name="proj_name"
              rules={[{ required: true, message: 'Insira o nome do projeto' }]}
            >
              <Input placeholder="Nome do Projeto" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Duração"
              name="proj_duration"
              rules={[{ required: true, message: 'Insira a duração do projeto' }]}
            >
              <Input placeholder="Ex.: 2 meses, 3 meses, etc." />
            </Form.Item>

            <Form.Item<FieldType>
              label="Descrição"
              name="proj_desc"
              rules={[{ required: true, message: 'Insira uma descrição do projeto' }]}
            >
              <TextArea rows={4} placeholder="Descrição do Projeto" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Imagem de Capa do Projeto"
              name="files"
            >
              <Upload maxCount={10} multiple beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Anexar arquivos</Button>
              </Upload>
            </Form.Item>

            <br/>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Criar Projeto
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}

export default CriarProjeto;