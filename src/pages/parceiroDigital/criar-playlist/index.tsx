import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from '../../../components/parceiroDigital/header'
import Titulo from '../../../components/parceiroDigital/learning/playlist/tituloPlaylist'
import Video from '../../../components/parceiroDigital/learning/playlist/videos'
import Botao from '../../../components/parceiroDigital/learning/playlist/botao'

export default function Inicio() {
  return (
    <>
      <Header />
      <Titulo />
      <br/>
      <br/>
      <br/>
      <h1>Adicionar vídeos</h1>
      <Video />
      <br/>
      <Video />
      <br/>
      <Video />
      <br/>
      <Video />
      <br/><br/>
      <center>
        <Botao />
      </center>
    </>
  )
}