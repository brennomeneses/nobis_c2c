import React, { useState } from "react";
import { Rate, Divider } from 'antd';

const App: React.FC = () => {
   const authToken = localStorage.getItem('authToken');
   const serviceUUID = localStorage.getItem('serviceUUID');
   const url = window.location.href;
   const uuid = url.split('/avaliar-cliente/')[1];

   const [paymentRating, setPaymentRating] = useState<number>(0);
   const [helpfulnessRating, setHelpfulnessRating] = useState<number>(0);
   const [respectRating, setRespectRating] = useState<number>(0);

   const enviarAvaliacao = () => {
      const options = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
         },
         body: JSON.stringify({
            payment: paymentRating,
            respect: respectRating,
            helpfulness: helpfulnessRating,
            serviceUuid: serviceUUID
         })
      };

      fetch(`https://brenno-envoriment-node.1pc5en.easypanel.host/services/${uuid}/rate`, options)
         .then(response => response.text())
         .then(response => {
            localStorage.removeItem("serviceUUID")
            window.location.href = "/historico"})
         .catch(err => console.error(err));
   };

   return (
      <>
         <h2 style={{ marginTop: -10, fontWeight: 500 }}>Avaliar Serviço</h2>
         <Divider />

         {/* payment */}
         <h3 style={{ marginTop: 40, fontWeight: 400 }}>Pagamento do serviço</h3>
         <Rate onChange={value => setPaymentRating(value)} />

         <br /><br /><br />

         {/* helpfulness */}
         <h3 style={{ fontWeight: 400 }}>Cliente foi prestativo</h3>
         <Rate onChange={value => setHelpfulnessRating(value)} />

         <br /><br /><br />

         {/* respect */}
         <h3 style={{ fontWeight: 400 }}>Cliente foi respeitoso</h3>
         <Rate onChange={value => setRespectRating(value)} />

         <br /><br /><br />

         <center><button className="btnConfirmar" onClick={enviarAvaliacao}>SUBMETER AVALIAÇÃO</button></center>
      </>
   );
};

export default App;