import { redirect } from "react-router-dom"

const useAuthDigitalPartner = () => {
  const isLoggedIn = localStorage.getItem('digitalPartnerToken') !== null

  if (!isLoggedIn) {
    return (redirect('/parceiro-digital/login'))
  } else
    return null
}

export default useAuthDigitalPartner