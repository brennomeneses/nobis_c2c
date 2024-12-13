import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Select, Checkbox, Upload, InputNumber, Alert, Popover } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom';
import baseUrl from '../../../components/assets/schemas/baseUrl';

const { TextArea } = Input;
const { Option } = Select;

const OnboardingForm = () => {
  const [form] = Form.useForm();
  const [serviceType, setServiceType] = useState('request');
  const [hasDisability, setHasDisability] = useState(false);
  const [pfp, setPfp] = useState(null);
  const [uploadPortfolioList, setUploadPortfolioList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [budgetDisabled, setBudgetDisabled] = useState(false);
  const [birthdate, setBirthdate] = useState('');

  const history = useHistory();
  const location = useLocation();
  const { userData } = location.state || {}; // Dados passados da página de cadastro

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        ...userData,
        birthdate: userData.birthdate ? moment(userData.birthdate).format('DD/MM/YYYY') : '',
      });
      setBirthdate(userData.birthdate ? moment(userData.birthdate).format('YYYY-MM-DD') : '');
      setPfp(userData.avatar);
      setUploadPortfolioList(userData.documents || []);
      setChecked(userData.budget === 'Não cobro para realizar orçamento');
      setBudgetDisabled(userData.budget === 'Não cobro para realizar orçamento');
      setServiceType(userData.isClient === 'true' ? 'request' : 'provide');
    }
  }, [userData]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    const formattedDate = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
    setBirthdate(formattedDate);
  };

  const onServiceTypeChange = e => {
    setServiceType(e.target.value);
  };

  const onDisabilityChange = e => {
    setHasDisability(e.target.value === 'yes');
  };

  const handleCheckboxChange = e => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setBudgetDisabled(isChecked);
  };

  const handleSubmit = values => {
    const formData = new FormData();
    formData.append('fullName', values.name);
    formData.append('email', values.email);
    formData.append('about', values.bio);
    formData.append('budget', checked ? 'Não cobro para realizar orçamento' : values.budgetValue);
    formData.append('docNumber', values.cpf);
    formData.append('password', values.password);
    formData.append('deficiency', values.disabilityType || 'Não se aplica');
    formData.append('phone', values.mobile);
    formData.append('avatar', pfp);
    formData.append('genre', values.gender);
    formData.append('birthCity', "null");
    formData.append('birthContry', serviceType === 'request' ? '' : values.birthCountry || ''); // Define um valor padrão vazio
    formData.append('birthState', 'null');
    formData.append('operationRadius', serviceType === 'request' ? '' : values.serviceRadius || ''); // Define um valor padrão vazio
    formData.append('documents', serviceType === 'request' ? [] : uploadPortfolioList);
    formData.append('isClient', serviceType === 'request' ? 'true' : 'false');
    formData.append('country', values.country);
    formData.append('state', values.estado);
    formData.append('city', values.cidade);
    formData.append('cep', values.cep);
    formData.append('address', values.rua);
    formData.append('number', values.numero);
    formData.append('complement', values.complemento);
    formData.append('isLookingForJob', values.isLookingForJob ? 'false' : 'true');
    formData.append('clubUuid', 'null');
    formData.append('role', serviceType === 'request' ? '' : values.services || '');
    formData.append('badges', values.badge ? 'false' : 'true');
    formData.append('payments', serviceType === 'request' ? '' : (values.paymentTypes ? values.paymentTypes.join(', ') : ''));
    formData.append('birthdate', values.birthdate ? moment(values.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD') : 'null');

    const options = {
      method: 'POST',
      body: formData,
    };

    fetch(baseUrl + '/users', options)
      .then(response => response.text())
      .then(response => { window.location.href = '/login' })
      .catch(err => console.error(err));
  };

  const handleAvatarUpload = ({ file }) => {
    setPfp(file);
  };

  const handlePortfolioUpload = ({ fileList }) => {
    setUploadPortfolioList(fileList);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        serviceType: true,
        profilePicture: { fileList: [] },
        uploadPortfolio: { fileList: [] },
        paymentTypes: [],
        budgetValue: '',
      }}
    >
      {/* isClient */}
      <Form.Item name="serviceType" label="Tipo de Serviço">
        <Radio.Group onChange={onServiceTypeChange}>
          <Radio value={true}>Quero solicitar serviços</Radio>
          <Radio value={false}>Quero prestar serviços</Radio>
        </Radio.Group>
      </Form.Item>

      {/* fullName */}
      <Form.Item
        name="name"
        label="Nome"
        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
      >
        <Input placeholder={userData?.fullName} />
      </Form.Item>

      {/* avatar */}
      <Form.Item name="profilePicture" label="Foto de perfil">
        <Upload
          name="image"
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => false} // Retorna false para prevenir o upload automático
          onChange={handleAvatarUpload} // Atualiza o estado do avatar com o arquivo selecionado
        >
          <Button icon={<UploadOutlined />}>Selecione a foto</Button>
        </Upload>
      </Form.Item>

      {/* Outros campos do formulário */}

      <Form.Item>
        <Button type="primary" htmlType="submit">Enviar</Button>
      </Form.Item>
    </Form>
  );
};

export default OnboardingForm;
