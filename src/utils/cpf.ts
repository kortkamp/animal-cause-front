const isRepeatingNumber = (str:string) => /^(\d)(\1){10}$/.test(str);


const isCpfValid = (cpf: string ): boolean => {

  // const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
  
  if (cpf.trim() === '') {
      return false;
  } 

  // if (!cpfRegex.test(cpf)) {
  //     return false;
  // }

  const plainCpf = cpf.replace(/\D/g, '');

  if (
    plainCpf === '' ||
    plainCpf.length !== 11 ||
    !/^\d{11}$/.test(plainCpf) ||
    isRepeatingNumber(plainCpf)
  ) {
    return false;
  }

  const digits = plainCpf.split('').map((x) => Number.parseInt(x));
  for (let j = 0; j < 2; j++) {
    let sum = 0;
    for (let i = 0; i < 9 + j; i++) {
      sum += digits[i] * (10 + j - i);
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit === 10 || checkDigit === 11) {
      checkDigit = 0;
    }
    if (checkDigit !== digits[9 + j]) {
      return false;
    }
  }

  return true;
}

export { isCpfValid }