import axios from "axios";

const API_URL = "https://nominatim.openstreetmap.org";


export interface LocationResponse  {
    "place_id": number,
    "osm_id": number,
    lat: string,
    lon: string,
    "type": string,
    addresstype: "municipality" | "town",
    "name": "Aperibé",
  }

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow all origins
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
});


const getLocation = async (
  state: string,
  city: string
): Promise<LocationResponse[]> => {
  return (await api.get(`/search?q=${city}+${state}+Brazil&format=json`)).data as LocationResponse[];
};


export { getLocation}
