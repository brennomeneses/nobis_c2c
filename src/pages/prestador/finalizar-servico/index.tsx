import React from 'react'
import ReactDOM from 'react-dom/client'
import Prestador from '../../../components/prestador/finalizar-servico/formFinalizar'
import Footer from '../../../components/prestador/footer'

export default function Inicio() {
  return (
    <>
      <br /><br />
      <div className="container">
        <Prestador />
      </div>
      <Footer />
    </>
  )
}