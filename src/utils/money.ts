
const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const toMoney = (value: number) => {
    return moneyFormatter.format(value);
}


export {toMoney}