import React from 'react'
import ReactDOM from 'react-dom/client'
import Prestador from '../../../components/prestador/configuracoes/dados-prestador'
import Botoes from '../../../components/prestador/configuracoes/botoes-config'
import Header from '../../../components/prestador/index/header';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../../../components/prestador/index/headerMobile'
import Footer from '../../../components/prestador/footer'

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