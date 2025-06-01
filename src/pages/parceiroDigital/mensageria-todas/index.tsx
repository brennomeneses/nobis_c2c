import { Modal, Table, theme } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import baseUrl from '../../../components/assets/schemas/baseUrl';

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;

    h1 {
      margin: 0;
    }

    a {
      margin-left: auto;
      @media (max-width: 768px) {
        display: none;
      }
    }
    `;

const MensageriaTodas = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [modal, contextHolder] = Modal.useModal();

  const [dataSource, setDataSource] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('digitalPartnerToken')}`
      }
    };

    fetch(`${baseUrl}/users/project/messages`, options)
      .then(response => response.json())
      .then(data => {
        if (data.errors || data.error || data.lenght === 0) {
          console.error(data.errors);
          setLoading(false)
          return;
        }
        setDataSource(data)
        setLoading(false)
      })
      .catch(err => console.error(err));
  }, [])

  React.useEffect(() => {
    console.log(dataSource)
  }, [dataSource])

  const handleOpenModal = (record: any) => {
    modal.info({
      title: record.title,
      content: (
        <div>
          <p>{record.message}</p>
          <p>
            <b>Enviado para:</b> {record.user.map((user: { fullName: any; }) => (<>{user.fullName}, </>))}
          </p>
          <p>
            <b>Anexos:</b> {record.files ? 
              record.files.map((file: { filename: any; originalFilename: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => <a href={`${baseUrl}/uploads/${file.filename}`}>{file.originalFilename}</a>) 
              : 
              <> Nenhum </>}
          </p>
          <p><b>Enviado em:</b> {new Date(record.createdAt).toLocaleString()}</p>
        </div>
      ),
      onOk() {},
    });
  }

  const columns: ColumnsType<any> = [
    {
      title: "Assunto",
      dataIndex: "title",
      key: "subject",
      render: (subject, record) => (
        <div style={{ cursor: "pointer", color: "#1890ff" }} onClick={() => handleOpenModal(record)}>
          {subject}
        </div>
      ),
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString()
    },
    {
      title: "Destinatarios",
      dataIndex: "user",
      key: "user",
      render: (users) => users.map((user: any) => <>{user.fullName}, </>)
    }
  ]

  return (
    <>
    {contextHolder}
      <div
          style={{
            padding: 24,
            minHeight: "83vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
            <Header>
              <h1>Mensagens enviadas</h1>
            </Header>
            {loading ? <p>Carregando...</p> : (
              <>
                {dataSource ? <Table dataSource={dataSource} columns={columns} /> : <>Nenhuma mensagem encontrada</>}
              </>
            )}
            
            
        </div>
    </>
  )
}

export default MensageriaTodas