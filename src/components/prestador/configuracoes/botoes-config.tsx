import React, { useRef, useState } from 'react';
import { UserOutlined, CommentOutlined, DollarOutlined, LogoutOutlined, HistoryOutlined, QuestionCircleOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Divider, Modal, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Cartao from '../configuracoes/cartao';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import baseUrl from '../../assets/schemas/baseUrl';

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showEmail, setShowEmail] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const cartaoRef = useRef<HTMLDivElement>(null);

  const uuid = localStorage.getItem("userUuid");

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isClient');
    localStorage.removeItem('userUuid');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const downloadImage = async (format: 'jpg' | 'pdf') => {
    if (cartaoRef.current) {
      const canvas = await html2canvas(cartaoRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        width: cartaoRef.current.offsetWidth,
        height: cartaoRef.current.offsetHeight,
        proxy: baseUrl,
        logging: true,
      });

      if (format === 'jpg') {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'cartao-digital.jpg';
        link.click();
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);

        // Definir a largura e altura do PDF para coincidir com o conteúdo
        pdf.internal.pageSize.width = canvas.width;
        pdf.internal.pageSize.height = canvas.height;

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

        // Adicionar link clicável para o perfil
        pdf.link(0, 0, canvas.width, canvas.height, { url: `${window.location.hostname}/prestador/${uuid}` });

        pdf.save('cartao-digital.pdf');
      }
    }
  };

  return (
    <>
      <div className="botoes">
        <Divider />
        <br />
        <Link to={`/perfil-prestador/${uuid}`} style={{ color: "black" }}>
          <UserOutlined /> Meus dados
        </Link>
        <br /><br />
        <Divider />
        <br />
        <Link type="link" onClick={showModal} style={{ color: "black" }}>
          <CommentOutlined /> Meu cartão digital
        </Link>
        <br /><br />
        <Divider />
        <br />
        <Link to={"/compra-creditos"} style={{ color: "black" }}>
          <DollarOutlined /> Comprar créditos de serviço
        </Link>
        <br /><br />
        <Divider />
        <br />
        <Link to={"/historico"} style={{ color: "black" }}>
          <HistoryOutlined /> Histórico de serviços prestados
        </Link>
        <br /><br />
        <Divider />
        <br />
        <Link to={"/forum"} style={{ color: "black" }}>
          <SnippetsOutlined /> Acessar o Fórum Nobis
        </Link>
        <br /><br />
        <Divider />
        <br />
        <Link to={"/faq"} style={{ color: "black" }}>
          <QuestionCircleOutlined /> Perguntas Frequentes
        </Link>
        <br /><br />
        <Divider />
        <br />
        <Link to={"/"} style={{ color: "black" }} onClick={logout}>
          <LogoutOutlined /> Sair
        </Link>
        <br /><br />
        <Divider />
      </div>

      <Modal
        title="Meu Cartão Digital"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          (<Button key="download-pdf" type="default" onClick={() => downloadImage('pdf')}>
            Baixar Cartão
          </Button>),
        ]}
        width={800}
      >
        <div>
          <br/>
          <Checkbox checked={showEmail} onChange={(e) => setShowEmail(e.target.checked)}>
            Mostrar E-mail
          </Checkbox>
          <Checkbox checked={showAddress} onChange={(e) => setShowAddress(e.target.checked)}>
            Mostrar Endereço
          </Checkbox>
        </div>
        <br/>
        <div ref={cartaoRef} style={{ width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }}>
          <Cartao showEmail={showEmail} showAddress={showAddress} />
        </div>
      </Modal>
    </>
  );
};

export default App;