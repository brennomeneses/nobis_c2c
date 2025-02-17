import React, { useState } from "react";
import { Form, Input, Select, Divider, Checkbox, Button } from 'antd';
import baseUrl from "../../assets/schemas/baseUrl";
const { Option } = Select;
const { TextArea } = Input;

const App: React.FC = () => {
  const authToken = localStorage.getItem('authToken');
  const [form] = Form.useForm();
  const [transporteSelecionado, setTransporteSelecionado] = useState<string | undefined>(undefined);
  const [valorCobrado, setValorCobrado] = useState<string>('');
  const [isRemoteWork, setIsRemoteWork] = useState<boolean>(false);

  const transportationOptions = [
    'Carro',
    'Moto',
    'Bicicleta',
    'Caminhão',
    'Transporte Público',
    'A pé',
    'Outro'
  ];

  const fuelOptions = [
    'Gasolina',
    'Etanol',
    'Diesel',
    'Gás Natural',
    'Elétrico',
    'Outro'
  ];

  const handleTransportChange = (value: string) => {
    setTransporteSelecionado(value);

    form.setFieldsValue({
      tipoCombustivel: undefined,
      consumoCombustivel: undefined,
    });
  };

  const formatCurrency = (value: string) => {
    let numericValue = value.replace(/[^\d]/g, '');
    let numberValue = parseFloat(numericValue) / 100;

    if (isNaN(numberValue)) {
      return 'R$ 0,00';
    }

    return `${numberValue.toFixed(2).replace('.', ',')}`;
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedValue = formatCurrency(value);
    setValorCobrado(formattedValue);
    form.setFieldsValue({ valorCobrado: formattedValue });
  };

  const handleRemoteWorkChange = (e: any) => {
    setIsRemoteWork(e.target.checked);

    if (e.target.checked) {
      form.setFieldsValue({
        meioTransporte: undefined,
        tipoCombustivel: undefined,
        consumoCombustivel: undefined,
      });
      setTransporteSelecionado(undefined);
    }
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    finalizarServico(values);
  };

  function finalizarServico(values: any) {
    const url = window.location.href;
    const uuid = url.split('/servico-finalizado/')[1];

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        name: values.valorCobrado,
        notification: "Email",
        serviceUuid: uuid,
        paymentMethod: values.metodoPagamento,
        price: parseFloat(values.valorCobrado.replace(",", ".")),
        transportMethod: values.meioTransporte,
        fuelType: values.tipoCombustivel || '',
        consumption: values.consumoCombustivel || '',
        description: values.descricaoServico,
        remoteWork: values.remoteWork,
      })
    };

    fetch(baseUrl + '/services', options)
      .then(response => response.json())
      .then(response => {
        const endService = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({ status: "completed" })
        };

        fetch(`${baseUrl}/services/${response.uuid}/status`, endService)
          .then(response => response.json())
          .then(response => { localStorage.setItem('serviceUUID', response.uuid); window.location.href = `/avaliar-cliente/${response.user}` })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <h2 style={{ marginTop: -10, fontWeight: 500 }}>Finalizar Serviço</h2>
      <Divider />

      <Form
        form={form}
        name="finalizarServico"
        onFinish={onFinish}
      >
        {/* price */}
        <Form.Item
          name="valorCobrado"
          label="Valor Cobrado"
          rules={[{ required: true, message: 'Por favor, informe o valor cobrado.' }]}
        >
          <Input
            type="text"
            placeholder="0,00"
            prefix="R$"
            value={valorCobrado}
            onChange={handleValueChange}
          />
        </Form.Item>

        {/* paymentMethod */}
        <Form.Item
          name="metodoPagamento"
          label="Método de Pagamento"
          rules={[{ required: true, message: 'Por favor, selecione o método de pagamento.' }]}
        >
          <Select placeholder="Selecione o método de pagamento">
            <Option value="PIX">PIX</Option>
            <Option value="Cartão de Crédito">Cartão de Crédito</Option>
            <Option value="Cartão de Débito">Cartão de Débito</Option>
            <Option value="Boleto Bancário">Boleto Bancário</Option>
            <Option value="Dinheiro">Dinheiro</Option>
            <Option value="Permuta">Permuta</Option>
          </Select>
        </Form.Item>

        {/* description */}
        <Form.Item
          name="descricaoServico"
          label="Descrição Breve do Serviço Prestado"
          rules={[{ required: true, message: 'Por favor, descreva brevemente o serviço prestado.' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="remoteWork"
          valuePropName="checked"
        >
          <Checkbox onChange={handleRemoteWorkChange}>Trabalho feito remotamente?</Checkbox>
        </Form.Item>

        {!isRemoteWork && (
          <>
            {/* transportMethod */}
            <Form.Item
              name="meioTransporte"
              label="Meio de Transporte"
              rules={[{ required: true, message: 'Por favor, selecione o meio de transporte.' }]}
            >
              <Select placeholder="Selecione o meio de transporte" onChange={handleTransportChange}>
                {transportationOptions.map(option => (
                  <Option key={option} value={option.toLowerCase().replace(' ', '_')}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {['carro', 'moto'].includes(transporteSelecionado ?? '') && (
              <>
                {/* fuelType */}
                <Form.Item
                  name="tipoCombustivel"
                  label="Tipo de Combustível"
                  rules={[{ required: true, message: 'Por favor, selecione o tipo de combustível.' }]}
                >
                  <Select placeholder="Selecione o tipo de combustível">
                    {fuelOptions.map(option => (
                      <Option key={option} value={option.toLowerCase()}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* consumption */}
                <Form.Item
                  name="consumoCombustivel"
                  label="Consumo de Combustível (km/L)"
                  rules={[{ required: true, message: 'Por favor, informe o consumo de combustível.' }]}
                >
                  <Input type="number" />
                </Form.Item>
              </>
            )}
          </>
        )}
        <Form.Item>
          <center>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#4C3779' }}>
              FINALIZAR SERVIÇO
            </Button>
          </center>
        </Form.Item>
      </Form>
    </>
  );
}

export default App;