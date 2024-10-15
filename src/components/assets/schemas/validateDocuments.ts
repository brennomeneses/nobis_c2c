const validateCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(0))) return false;

  length += 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) return false;

  let sum = 0;
  let remainder;

  if (/^(.)\1+$/.test(cpf)) return false;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

const validateBirthDate = (date: string) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!regex.test(date)) return false;

  const [day, month, year] = date.split('/').map(Number);

  const isValidDate = (d: number, m: number, y: number) => {
    const dateObj = new Date(y, m - 1, d);
    return dateObj.getFullYear() === y && dateObj.getMonth() === m - 1 && dateObj.getDate() === d;
  };

  return isValidDate(day, month, year);
};

const validateMobileNumber = (mobile: string) => {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(mobile);
};

const validateBudget = (budget: string) => {
  const regex = /^\d{1,3},\d{2}$/;
  return regex.test(budget);
};

export { validateCNPJ, validateCPF, validateBirthDate, validateMobileNumber, validateBudget }