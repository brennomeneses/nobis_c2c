import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Avatar, message, DatePicker, Select, Row, Col, Card, Upload } from 'antd';
import Footer from '../../../components/cliente/footer';
import { useMediaQuery } from 'react-responsive';
import Header from '../../../components/cliente/index/header'
import HeaderMobile from '../../../components/cliente/index/headerCel'
import moment from 'moment';
import { PlusOutlined, StarFilled } from '@ant-design/icons';
import baseUrl from '../../../components/assets/schemas/baseUrl';

const { Option } = Select;

export default function Inicio() {
  const url = window.location.href;
  const uuid = url.split('/meu-perfil/')[1];
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/profile/${uuid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        console.log(data);
        setDados(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleSave = async (values) => {


    try {
      const response = await fetch(`${baseUrl}/users/${uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          ...values,
          birthdate: values.birthdate.format('YYYY-MM-DD')
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile data');
      }
      const updatedData = await response.json();
      setDados(updatedData);
      setEditMode(false);
      message.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile data:', error);
      message.error('Erro ao tentar atualizar perfil. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!dados) {
    return <p>No data available</p>;
  }

  const {
    avatar, fullName, clientRatings, email, phone, genre, birthdate, address, number, complement,
    city, state, cep
  } = dados;

  // Calculating average rating
  const averageRating = clientRatings?.length
    ? (
      clientRatings.reduce((acc, curr) => acc + curr.helpfulness + curr.respect + curr.payment, 0) / (clientRatings.length * 3)
    ).toFixed(1)
    : 0;

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <br /><br /><br />
      <div className="container" style={{ padding: '20px' }}>
        <h1 className='title'>Meus Dados</h1>
        <Card>
          {editMode ? (
            <Form
              initialValues={{
                fullName,
                email,
                phone,
                genre,
                birthdate: moment(birthdate, 'YYYY-MM-DD'),
                address,
                number,
                complement,
                city,
                state,
                cep
              }}
              onFinish={handleSave}
              layout="vertical"
            >
              <div style={{
                display: "flex"
              }}>
                <Avatar src={`${baseUrl}/uploads/${avatar}`} size={100} />
                <Upload
                  name="profilePicture"
                  listType="picture-circle"
                  className="avatar-uploader"
                  maxCount={1}
                  action={baseUrl + '/users/update/avatar'}
                  headers={{
                    'Authorization': `Bearer ${authToken}`
                  }}
                  method="PUT"
                >
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                  </button>
                </Upload>
              </div>
              <Form.Item
                label="Nome Completo"
                name="fullName"
                rules={[{ required: true, message: 'Por favor insira seu nome completo' }]}
              >
                <Input placeholder={fullName} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Por favor insira seu email' }]}
              >
                <Input placeholder={email} />
              </Form.Item>
              <Form.Item
                label="Telefone"
                name="phone"
                rules={[{ required: true, message: 'Por favor insira seu telefone' }]}
              >
                <Input placeholder={phone} />
              </Form.Item>
              <Form.Item
                label="Gênero"
                name="genre"
                rules={[{ required: true, message: 'Por favor selecione seu gênero' }]}
              >
                <Select placeholder={genre}>
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Outro">Outro</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Data de Nascimento"
                name="birthdate"
                rules={[{ required: true, message: 'Por favor selecione sua data de nascimento' }]}
              >
                <DatePicker format="DD-MM-YYYY" placeholder={moment(birthdate).format('DD-MM-YYYY')} />
              </Form.Item>
              <Form.Item
                label="Endereço"
                name="address"
                rules={[{ required: true, message: 'Por favor insira seu endereço' }]}
              >
                <Input placeholder={address} />
              </Form.Item>
              <Form.Item
                label="Número"
                name="number"
                rules={[{ required: true, message: 'Por favor insira o número do seu endereço' }]}
              >
                <Input placeholder={number} />
              </Form.Item>
              <Form.Item
                label="Complemento"
                name="complement"
              >
                <Input placeholder={complement} />
              </Form.Item>
              <Form.Item
                label="Cidade"
                name="city"
                rules={[{ required: true, message: 'Por favor insira sua cidade' }]}
              >
                <Input placeholder={city} />
              </Form.Item>
              <Form.Item
                label="Estado"
                name="state"
                rules={[{ required: true, message: 'Por favor insira seu estado' }]}
              >
                <Input placeholder={state} />
              </Form.Item>
              <Form.Item
                label="CEP"
                name="cep"
                rules={[{ required: true, message: 'Por favor insira seu CEP' }]}
              >
                <Input placeholder={cep} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>Cancelar</Button>
              </Form.Item>
            </Form>
          ) : (
            <Row gutter={16}>
              <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
                <Avatar
                  src={`${baseUrl}/uploads/${avatar}`}
                  size={100}
                />
              </Col>
              <Col xs={24} sm={18}>
                <p><strong>Nome:</strong> {fullName}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Telefone:</strong> {phone}</p>
                <p><strong>Gênero:</strong> {genre}</p>
                <p><strong>Data de Nascimento:</strong> {moment(birthdate).format('DD/MM/YYYY')}</p>
                <p><strong>Endereço:</strong> {address}, {number} {complement}</p>
                <p><strong>Cidade:</strong> {city}</p>
                <p><strong>Estado:</strong> {state}</p>
                <p><strong>CEP:</strong> {cep}</p>
                <p><strong>Nota:</strong> {averageRating} <StarFilled style={{ color: "orange" }} /></p>
                <Button type="primary" onClick={handleEdit}>Editar Informações</Button>
              </Col>
            </Row>

          )}
        </Card>
      </div>
      <br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
}