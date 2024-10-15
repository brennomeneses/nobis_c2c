import React from 'react'
import ReactDOM from 'react-dom/client'
import Avaliar from '../../../components/prestador/chat/avaliar-cliente'
import Footer from '../../../components/prestador/footer'
import { Divider } from 'antd';

export default function Inicio() {
  return (
    <>
      <div className="container">
        <br/>
        <br/>
        <Avaliar />
        <br />
      </div>
      <Footer />
    </>
  )
}