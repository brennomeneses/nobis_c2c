import { Button, Form, Input, Select, theme, Upload, notification } from "antd";
import type { FormProps, SelectProps } from 'antd';
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../components/assets/schemas/baseUrl";

type FieldType = {
  projects?: string[];
  users?: string[];
  subject?: string;
  message?: string;
  files?: any;
};

const { TextArea } = Input;

const Mensageria = () => {
  const [projects, setProjects] = useState<SelectProps['options']>([]);
  const [users, setUsers] = useState<SelectProps['options']>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [projectIdMsg, setProjectIdMsg] = useState<string[]>([]);
  const navigation = useNavigate();

  const token = localStorage.getItem("digitalPartnerToken") || "";

  // Fetch all projects
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

  // Fetch users for all selected projects
  const fetchUsersByProjects = async (projectIds: string[]) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    try {
      const response = await fetch(
        `${baseUrl}/digital_partners/projects/users/${projectIds.join('/')}`,
        options
      )

      const usersFromProjects = await response.json() as Record<string, string>[];

      const allUsers = usersFromProjects.flat();
      const uniqueUsers = Array.from(
        new Map(
          users.map((user: Record<string, string>) => [user.uuid, user])
        ).values()
      );
    
      setUsers(
        uniqueUsers.map((user) => ({
          label: user.fullName,
          value: user.uuid,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };
    

  //   try {
  //     const usersFromProjects = await Promise.all(
  //       projectIds.map(async (projectId) => {
  //         const response = await fetch(
  //           `${baseUrl}/digital_partners/projects/${projectId}`,
  //           options
  //         );
  //         const projectData = await response.json();
  //         return projectData.users || [];
  //       })
  //     );

  //     const allUsers = usersFromProjects.flat();
  //     const uniqueUsers = Array.from(
  //       new Map(
  //         allUsers.map((user: Record<string, string>) => [user.uuid, user])
  //       ).values()
  //     );

  //     setUsers(
  //       uniqueUsers.map((user) => ({
  //         label: user.fullName,
  //         value: user.uuid
  //       }))
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);

    setLoading(true);

    const formData = new FormData();
    formData.append("targetsString", JSON.stringify(values.users));
    formData.append("projectsUuid", JSON.stringify(values.projects));
    formData.append("subject", values.subject ?? "");
    formData.append("content", values.message ?? "");

    if (values.files) {
      values.files.fileList.forEach((file: { originFileObj: string | Blob; }) => {
        formData.append("files", file.originFileObj);
      });
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    };

    try {
      const response = await fetch(
        `${baseUrl}/digital_partners/messages/broadcast/v2`,
        options
      );
      const data = await response.json();
      setLoading(false);
      notification.success({
        message: "Mensagem Enviada",
        description: "Sua mensagem foi enviada com sucesso!",
      });
      console.log(data);
      navigation("/parceiro-digital/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      notification.error({
        message: "Erro ao Enviar Mensagem",
        description: "Ocorreu um erro ao tentar enviar a mensagem.",
      });
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      <div
        style={{
          width: '70%',
          margin: '8vh 0 20vh 0'
        }}
      >
        <h1>Mensageria</h1>

        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Projetos"
            name="projects"
            rules={[{ required: true, message: 'Selecione ao menos um projeto' }]}
          >
            <Select
              allowClear
              mode="multiple"
              notFoundContent="Nenhum projeto encontrado"
              style={{ width: '100%' }}
              placeholder="Selecione os projetos"
              options={projects}
              onChange={(value) => {
                if (value.length > 0) {
                  fetchUsersByProjects(value);
                  setProjectIdMsg(value);
                  console.log(value);
                } else {
                  setUsers([]);
                }
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Prestadores"
            name="users"
            rules={[{ required: true, message: 'Selecione ao menos um prestador' }]}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Select
                allowClear
                mode="multiple"
                notFoundContent="Nenhum prestador associado aos projetos selecionados"
                style={{ width: '100%' }}
                placeholder="Selecione os prestadores"
                value={selectedUsers}
                options={users}
                onChange={(value) => {
                  setSelectedUsers(value);
                  form.setFieldsValue({ users: value });
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  const allUserIds = users.map((user) => user.value); // Obtém os valores de todas as opções
                  setSelectedUsers(allUserIds);
                  form.setFieldsValue({ users: allUserIds });
                }}
              >
                Selecionar Todos
              </Button>
            </div>
          </Form.Item>

          <Form.Item<FieldType>
            label="Assunto"
            name="subject"
            rules={[{ required: true, message: 'Insira o assunto da mensagem' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mensagem"
            name="message"
            rules={[{ required: true, message: 'Insira o conteúdo da mensagem' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Anexar arquivos"
            name="files"
          >
            <Upload maxCount={10} multiple beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Anexar arquivos</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Enviar mensagem
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Mensageria;
