import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import type { CollapseProps } from 'antd';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import baseUrl from '../../../components/assets/schemas/baseUrl';
import Footer from '../../../components/prestador/footer';
import Header from '../../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../../components/prestador/index/headerMobile'
import { Typography } from 'antd';

const { Title } = Typography;

const BodyContainer = styled.div`
  padding: 24px;
`

export default function Comunicados() {
  const userToken = localStorage.getItem('authToken');
  const [data, setData] = React.useState(null);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  React.useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };

    fetch(`${baseUrl}/digital_partners/messages/broadcast`, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 404)
          setData(404)
        throw new Error('Something went wrong');
      })
      .then(response => setData(response))
      .catch(err => console.log(err.status));
  }, []);



  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => data.map((msg, i) => {
    const linkify = (text: string) => {
      // This pattern matches URLs with common TLDs
      const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|\b[-A-Z0-9+&@#\/%?=~_|!:,.;]+[.][a-z]{2,}\b)/gi;
      return text.split(urlPattern).map((part, index) =>
        urlPattern.test(part)
          ? <a key={index} href={part.startsWith('http') ? part : 'http://' + part} target="_blank" rel="noopener noreferrer">{part}</a>
          : part
      );
    };

    return {
      key: i,
      label: <>
        <b>{msg.subject}</b> - {new Date(msg.createdAt).toDateString()}
      </>,
      children:
        <p>
          {linkify(msg.content)}
          <p><b> Parceiro Digital: {msg.digitalPartner.orgName}</b></p>
          <p>
            {(msg.files.length > 0) && (<b>Anexos:<br /></b>)}
            {msg.files.map((file) => <>
              <a
                href={`${baseUrl}/download/${file.filename}/${file.originalFilename}`}
              >{file.originalFilename}</a><br />
            </>)}
          </p>
        </p>,
      style: panelStyle,
    };
  });



  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <BodyContainer>
        <div className='container'>
          <h1 className='title'>Mensagens do parceiro digital</h1>
          {data && (data === 404 ? (<>Você não é afiliado a nenhum parceiro digital</>) :
            Array.isArray(data) && data.length === 0 ? (<>Você não possui nenhuma mensagem</>) : (
              <Collapse
                bordered={false}
                defaultActiveKey={[0]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ background: token.colorBgContainer }}
                items={getItems(panelStyle)}
              />
            )

          )
          }
        </div>
      </BodyContainer>
      <Footer />
    </>
  );
}
