import React from 'react'
import ReactDOM from 'react-dom/client'
import Prestador from '../../../components/cliente/configuracoes/dados-cliente'
import Botoes from '../../../components/cliente/configuracoes/botoes-config'
import { useMediaQuery } from 'react-responsive';
import Header from '../../../components/cliente/index/header'
import HeaderMobile from '../../../components/cliente/index/headerCel'
import Footer from '../../../components/cliente/footer'

export default function Inicio() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div className='container'>
        <Prestador />
        <Botoes />
        <br /><br /><br /><br />
      </div>
      <Footer />
    </>
  )
}