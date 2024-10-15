import React, { useState } from "react";
import { Rate, Divider, Button, Input } from 'antd';
const { TextArea } = Input;

const App: React.FC = () => {
   const url = window.location.href;
   const uuid = url.split('/avaliar-servico/')[1];
   const [quality, setQuality] = useState<number>(0); // State para qualidade do serviço
   const [punctuality, setPunctuality] = useState<number>(0); // State para pontualidade
   const [costBenefit, setCostBenefit] = useState<number>(0); // State para custo-benefício

   const authToken = localStorage.getItem('authToken');

   const handleSubmit = () => {
      const options = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
         },
         body: JSON.stringify({
            ratingQuality: quality,
            ratingPunctuality: punctuality,
            ratingCostBenefit: costBenefit,
            serviceUuid: uuid
         })
      };

      fetch(`https://brenno-envoriment-node.1pc5en.easypanel.host/services/${uuid}`, options)
         .then(response => response.json())
         .then(response => {
            window.location.href = "/historico"
         })
         .catch(err => console.error('Erro ao enviar avaliação:', err));
   };

   return (
      <>
         <h2 style={{ marginTop: -10, fontWeight: 500 }}>Avaliar Serviço</h2>
         <Divider />

         <h3 style={{ marginTop: 40, fontWeight: 400 }}>Qualidade do serviço</h3>
         <Rate onChange={value => setQuality(value)} />

         <br /><br /><br />

         <h3 style={{ fontWeight: 400 }}>Pontualidade</h3>
         <Rate onChange={value => setPunctuality(value)} />

         <br /><br /><br />

         <h3 style={{ fontWeight: 400 }}>Custo-Benefício</h3>
         <Rate onChange={value => setCostBenefit(value)} />

         <br /><br /><br />

         <center>
            <Button className="btnConfirmar" onClick={handleSubmit}>SUBMETER AVALIAÇÃO</Button>
         </center>
      </>
   );
};

export default App;