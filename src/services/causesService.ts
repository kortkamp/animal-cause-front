import { api } from "./api";


export interface Cause 
{
    "id": string,
    "ownedId": string,
    "ownerName": string,
    "description": string,
        "deadlineDate": Date | null,
    "goalAmount": "10.00",
    "currentAmount": "0.00",
    "images": [
        {
            "url": string,
            "height": number,
            "width": number
        }
    ]
}


export const getCauses = async () => { 
    const response = await api.get("public/causes");
    return response.data as Cause[];
};