
export interface Validation {  
  email?: { message: string }
  phone?: { message: string }
  cpf?: { message: string }
  min?: { message: string , minValue: number}
  length?: {min?: number , max?: number, message: string}
}

const isRepeatingNumber = (str:string) => /^(\d)(\1){10}$/.test(str);

const validate = (value: string | number, validation: Validation):string | undefined => {

  if(!!validation.email){
      if(typeof value != "string"){
        return validation.email.message
      }
     const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    if (value.trim() === '') {
        return validation.email.message;
    } else if (!emailRegex.test(value)) {
        return validation.email.message;
    }
  }

  if(!!validation.phone){
    if(typeof value !== "string"){
      return validation.phone.message
    }
    if(value.length !== 11){
      return validation.phone.message;
    }
  }

  if(!!validation.cpf){
    if(typeof value !== "string"){
      return validation.cpf.message
    }
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    if (value.trim() === '') {
        return validation.cpf.message;
    } 
    if (!cpfRegex.test(value)) {
        return validation.cpf.message;
    }

    const cpf = value.replace(/\D/g, '');

    if (
      cpf === '' ||
      cpf.length !== 11 ||
      !/^\d{11}$/.test(cpf) ||
      isRepeatingNumber(cpf)
    ) {
      return validation.cpf.message;
    }

    const digits = cpf.split('').map((x) => Number.parseInt(x));
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
        return validation.cpf.message;
      }
    }
  }

  if(!!validation.min){
    if(Number.isNaN(Number(value))){
      return validation.min.message
    }

    if(Number(value) < validation.min.minValue){
      return validation.min.message
    }
  }
  
  return undefined;
}


export { validate }