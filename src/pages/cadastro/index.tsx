import React from 'react'
import ReactDOM from 'react-dom/client'
import Cadastro from '../../components/cadastro/cadastro'
import Header from '../../components/cadastro/header'

export default function Inicio() {
  return (
    <>
      <Header />
      <br />
      <div className="container">
        <Cadastro />
      </div>
    </>
  )
}