import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const App: React.FC = () => (
  <>
      <Search
        placeholder="Digite sua mensagem..."
        allowClear
        enterButton="Enviar"
        size="large"
      />
  </>
);

export default App;