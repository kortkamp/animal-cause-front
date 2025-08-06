import { api } from "./api";


export interface Cause 
{
    id: string,
    ownedId: string,
    ownerName: string,
    name: string,
    slug: string,
    description: string,
    deadlineDate: Date | null,
    goalAmount: string,
    currentAmount: string,
    images: [
        {
            url: string,
            height: number,
            width: number
        }
    ]
}

export interface PixDonationResponse {
    id: string;
    causeId: string;
    causeName: string;
    amount: {amount: number};
    payer: {
			id: string,
			name: string,
			email: string,
			cpf: string,
			phone: null
		},
    payerId : string;
    payerName  : string; 
    creationDate: Date;
    currentStatus: string;
    pixBase64: string;
    pixQrCode: string;
}

export const getCauseBySlug = async (slug: string) => {
    const response = await api.get(`/v1/public/causes/slug/${slug}`);
    return response.data as Cause;
}

export const getCauses = async () => { 
    const response = await api.get("/v1/public/causes");
    console.log(response.data);
    return response.data as Cause[];
};

export const makePixDonationAuthenticated = async (causeId: string, causeName: string, amount: number) => {
    const response = await api.post("/v1/payments/pix", {
        causeId,
        causeName,
        amount
    });

    return response.data as PixDonationResponse;
}

export const makePixDonationUnauthenticated = async (
    causeId: string, 
    causeName: string, 
    amount: number,
    payerName: string,
    payerEmail: string,
    payerCpf: string,
    payerPhone: string
) => {
    const response = await api.post("/v1/public/payments/pix", {
        causeId,
        causeName,
        amount,
        payerName,
        payerEmail,
        payerCpf,
        payerPhone
    });

    return response.data as PixDonationResponse;
}

export const getDonationById = async (donationId: string) => {
    const response = await api.get(`/v1/public/payments/${donationId}`);
    return response.data as PixDonationResponse;
}