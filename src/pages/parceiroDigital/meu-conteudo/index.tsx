import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from '../../../components/parceiroDigital/learning/header'
import Video from '../../../components/parceiroDigital/learning/videos'

export default function Inicio() {
  return (
    <>
      <Header />
      <br/>
      <br/>
      <div className='videos'>
        <Video />
        <Video />
        <Video />
      </div>
      <br /><br />
      <div className='videos'>
        <Video />
        <Video />
        <Video />
      </div>
      <br />
      <br />
    </>
  )
}