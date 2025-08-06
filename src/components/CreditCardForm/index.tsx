'use client'
import { initMercadoPago, createCardToken, getPaymentMethods, CardNumber, SecurityCode, ExpirationDate, } from "@mercadopago/sdk-react";
import { CardToken } from "@mercadopago/sdk-react/esm/coreMethods/util/types";
import clsx from "clsx";
import { error } from "console";

import { ReactNode, useEffect } from "react";

const Field = ({ children, title, error }: { children: ReactNode, title: string, error?: string }) => {
  return (
    <div className="w-full h-20">
      <label className="font-bold bor">{title}</label >
      <div className={clsx("ring-1 h-9 p-2 rounded-md", {
        "ring-red-500": error,
        "ring-gray-300": !error
      })}>
        {children}
      </div>
      <p className="text-red-500">{error}</p>
    </div>
  )
}

interface CreditCardFormProps {
  getToken: () => string;
}


const CreditCardForm = () => {

  const createToken = async () => {

    const cardToken: CardToken = await createCardToken({
      cardholderName: 'APRO',
      identificationType: 'CPF',
      identificationNumber: '12345678909',
    })


    const tokenId = cardToken.id;

    const paymentMethodsResult = await getPaymentMethods({ bin: cardToken.first_six_digits });

    const payment_method_id = paymentMethodsResult?.results[0].id;

    console.log("Token ID:", tokenId);
    console.log("Payment Method ID:", payment_method_id);

  }

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || "", {
      locale: "pt-BR"
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <Field
        title="Número do cartão"
        error="mensagem de teste error">
        <CardNumber
          placeholder="Insira o número do cartão"
          style={{ width: '100%', height: '20', }} />
      </Field>
      <Field title="Nome do titular">
        <input placeholder="Insira o nome do titular"
          className="outline-none"
          style={{ width: '100%', height: '1', }}
        ></input>
      </Field>
      <Field title="Validade">
        <ExpirationDate placeholder="Insira a validade"
          style={{ width: '100%', height: '20', }}
        />
      </Field>
      <Field title="CVV">
        <SecurityCode
          placeholder="Insira código CVV"
          style={{ width: '100%', height: '20', }}
        />
      </Field>
      <button onClick={createToken} >123</button>
    </div>
  );
}

export { CreditCardForm }
