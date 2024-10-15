import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from '../../../components/cliente/chat/header'
import Aviso from '../../../components/cliente/chat/aviso'
import Finalizado from '../../../components/cliente/chat/avaliacao-servico'
import Enviar from '../../../components/cliente/chat/enviarMsg'
import Footer from '../../../components/cliente/footer'
import { Divider } from 'antd';

export default function Inicio() {
  return (
    <>
      <div className='container'>
        <br /><br />
        <Finalizado />
        <br/>
        <br />
      </div>
      <Footer />
    </>
  )
}