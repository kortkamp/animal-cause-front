import { api } from "./api";


export interface FullCauseResponse
{
	id: string,
	owner: {
		id: string,
		name: string,
		email: string | null,
		cpf: string | null,
		avatar: string | null,
		registerDate: Date
	},
	location: {
		state: string,
		city: string,
		address: string | null,
		neighborhood: string | null,
		number: string | null,
		complement: string | null,
		latitude: number,
		longitude: number
	},
	name: string,
	slug: string,
	description: string,
	deadlineDate: Date | null,
	goalAmount: number,
	currentAmount: number,
    donationsCount: number,
    startDate: Date,
	images: 
		{
			url: string,
			height: number,
			width: number
		}[]
	
}

export interface CauseDto {
    title : string;
    slug : string;
    id : string;
    city : string;
    uf : string;
    image: {
        url: string;
        height: number;
        width: number;
    } | null;
    ownerName : string;
    ownerAvatar: string;
    registerDate: string;
    goalAmount: number;
    currentAmount: number;
}

export interface CreateCauseRequest {
    details: {
        title: string;
        description: string;
        deadlineDate: string | null;
    },
    location: {
		state: string,
		city: string
        neighborhood:string | null
        address:string | null
        number:string | null
        complement:string | null
        zipCode:string | null
        latitude: string,
        longitude: string,
	},
	goalAmount: string
}

export interface CreateCauseResponse {
    id: string;
    name: string;
    slug: string;
}

export interface CauseDonation {
    id: string;
    donorName: string;
    amount: number;
    date: Date;
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

export const createCause = async (cause: CreateCauseRequest) => {
    const response = await api.post('/v1/causes', cause);
    return response.data as CreateCauseResponse;
}

export const getCauseBySlug = async (slug: string) => {
    const response = await api.get(`/v1/public/causes/slug/${slug}`);
    return response.data as FullCauseResponse;
}

export const getCauses = async () => { 
    const response = await api.get("/v1/public/causes");
    console.log(response.data);
    return response.data as CauseDto[];
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

export const getCauseDonations = async (causeId: string) => { 
    const response = await api.get(`/v1/public/causes/${causeId}/donations`);
    return response.data as CauseDonation[];
};