import React from 'react'
import ReactDOM from 'react-dom/client'
import { FilterOutlined } from '@ant-design/icons';
import Busca from '../../../components/cliente/busca/barra-busca'
import Prestadores from '../../../components/cliente/busca/prestadores'
import Footer from '../../../components/cliente/footer'

export default function Inicio() {
  return (
    <>
      <Busca />
      <br />
      <div className='servicoBuscado'>
        <h2>Serviço Pesquisado</h2>
        <FilterOutlined />
      </div>
      <Prestadores />
      <Footer />
    </>
  )
}