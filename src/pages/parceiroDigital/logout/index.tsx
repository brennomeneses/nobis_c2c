const LogOut = () => {
  localStorage.removeItem('digitalPartnerToken')
  localStorage.removeItem('digitalPartnerUuid')

  location.href = '/parceiro-digital/login'

  return (<></>)
}

export default LogOut