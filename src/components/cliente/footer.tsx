import React, { useEffect, useState } from 'react';
import home from '../../components/assets/icons/home.png';
import busca from '../../components/assets/icons/busca.png';
import chat from '../../components/assets/icons/chat.png';
import historico from '../../components/assets/icons/historico.png';
import config from '../../components/assets/icons/configuracoes.png';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';

const Footer = () => (
  <div className='footer'>
    <div className='icons'>
      <Popover content={"Início"}><Link to='/inicio'><img src={home} /></Link></Popover>
      <Popover content={"Busca de serviços"}><Link to='/busca'><img src={busca} /></Link></Popover>
      <Popover content={"Chats de serviços"}><Link to='/chats'><img src={chat} /></Link></Popover>
      <Popover content={"Histórico de serviços"}><Link to='/historico'><img src={historico} /></Link></Popover>
      <Popover content={"Configurações"}><Link to='/configuracoes'><img src={config} /></Link></Popover>
    </div>
  </div>
)

const Sidebar = () => (
  <div className='sidebar'>
    <div className='icons'>
      <Link to='/inicio'><img src={home} />Inicio</Link>
      <Link to='/busca'><img src={busca} />Buscar</Link>
      <Link to='/chats'><img src={chat} />Chats</Link>
      <Link to='/historico'><img src={historico} />Histórico</Link>
      <Link to='/configuracoes'><img src={config} />Configurações</Link>
    </div>
  </div>
)

const App: React.FC = () => {
  /*
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.matchMedia("(max-width: 1224px)").matches);
  };

  useEffect(() => {
    // Check on mount
    handleResize();

    // Add event listener to update on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
*/
  return (
    <>
      <>
        {true ? <Footer /> : <Sidebar />}
      </>
    </>
  )
};

export default App;