import { Button, Form, Input, InputNumber, notification, Upload } from "antd";
import type { FormProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import baseUrl from "../../../components/assets/schemas/baseUrl";
import type { CheckboxOptionType } from "antd/es/checkbox";
import { Checkbox } from "antd";

type FieldType = {
  proj_name?: string;
  proj_duration?: string;
  proj_desc?: string;
  files?: any;
  ods?: number[];
};

const { TextArea } = Input;

const odsOptions: CheckboxOptionType[] = [
  { label: "ODS 1", value: 1, style: { background: "#E5243B", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 2", value: 2, style: { background: "#DDA63A", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 3", value: 3, style: { background: "#4C9F38", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 4", value: 4, style: { background: "#C5192D", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 5", value: 5, style: { background: "#FF3A21", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 6", value: 6, style: { background: "#26BDE2", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 7", value: 7, style: { background: "#FCC30B", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 8", value: 8, style: { background: "#A21942", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 9", value: 9, style: { background: "#FD6925", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 10", value: 10, style: { background: "#DD1367", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 11", value: 11, style: { background: "#FD9D24", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 12", value: 12, style: { background: "#BF8B2E", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 13", value: 13, style: { background: "#3F7E44", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 14", value: 14, style: { background: "#0A97D9", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 15", value: 15, style: { background: "#56C02B", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 16", value: 16, style: { background: "#00689D", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 17", value: 17, style: { background: "#19486A", color: "#fff", padding: "3px", borderRadius: "4px" } },
  { label: "ODS 18", value: 18, style: { background: "#7F3718", color: "#fff", padding: "3px", borderRadius: "4px" } },
];

const CriarProjeto = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigation = useNavigate();
  const token = localStorage.getItem("digitalPartnerToken");

  const openNotificationWithSuccess = () => {
    notification.success({
      message: "Projeto Criado!",
      description: "Seu projeto foi criado com sucesso.",
      duration: 3,
    });
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${baseUrl}/digital_partners/create`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setUsers(response.users);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    const form = new FormData();

    // Adiciona os dados do formulário
    form.append("image", values.files?.fileList[0]?.originFileObj); // Primeiro arquivo selecionado
    form.append("title", values.proj_name);
    form.append("description", values.proj_desc);
    form.append("duration", values.proj_duration);
    form.append("ods", JSON.stringify(values.ods || []));
    
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    };

    setLoading(true); // Ativa o estado de carregamento

    // Realiza o fetch para criar o projeto
    fetch(
      baseUrl + "/digital_partners/projects",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);

        // Exibe a notificação de sucesso e redireciona
        openNotificationWithSuccess();
        navigation("/parceiro-digital/");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: 380,
        background: "#fff",
        borderRadius: 8,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {users && (
        <div
          style={{
            width: "70%",
            margin: "8vh 0 20vh 0",
          }}
        >
          <h1>Criar Novo Projeto</h1>

          <Form onFinish={onFinish} form={form} layout="vertical">
            <Form.Item<FieldType>
              label="Nome"
              name="proj_name"
              rules={[{ required: true, message: "Insira o nome do projeto" }]}
            >
              <Input placeholder="Nome do Projeto" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Duração (em meses)"
              name="proj_duration"
              rules={[
                { required: true, message: "Insira a duração do projeto" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Ex.: 2, 3, etc." />
            </Form.Item>

            <Form.Item<FieldType>
              label="Descrição"
              name="proj_desc"
              rules={[
                { required: true, message: "Insira uma descrição do projeto" },
              ]}
            >
              <TextArea rows={4} placeholder="Descrição do Projeto" />
            </Form.Item>

            <Form.Item<FieldType> label="Imagem de Capa do Projeto" name="files">
              <Upload maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Anexar arquivo</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="ods"
              label="ODS relacionadas ao projeto"
              rules={[{ required: true, message: "Selecione pelo menos uma ODS" }]}
            >
              <Checkbox.Group options={odsOptions} />
            </Form.Item>

            <br />
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Criar Projeto
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CriarProjeto;
