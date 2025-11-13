import React from 'react';
import { Form, AutoComplete, Button, Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { profissoes } from '../../assets/schemas/signUpSchemas';

const { Option } = AutoComplete;

const serviceOptions = profissoes;

const App = ({ onSearchSubmit }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedService, setSelectedService] = React.useState(null);

  const onChange = (value) => {
    setSearchValue(value);
  };

  const handleSelect = (value) => {
    setSelectedService(value);
  };

  const handleFormSubmit = (values) => {
    onSearchSubmit(values.text)
  };

  const filteredOptions = serviceOptions.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (value: string) => {
    // console.log(value)
  };

  return (
    <Form onFinish={handleFormSubmit}>
      <Row gutter={8} align="middle">
        <Col flex="auto">
          <Form.Item
            name="text"
          >
            <AutoComplete
              value={searchValue}
              onChange={onChange}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder="Buscar serviço..."
              style={{ width: '100%' }}
              options={filteredOptions.map((option) => ({ label: option, value: option }))}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Pesquisar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default App;