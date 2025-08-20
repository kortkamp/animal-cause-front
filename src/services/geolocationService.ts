import axios from "axios";

const OPEN_STREET_MAP_API_URL = "https://nominatim.openstreetmap.org";

export interface LocationResponse  {
    "place_id": number,
    "osm_id": number,
    lat: string,
    lon: string,
    "type": string,
    addresstype: "municipality" | "town",
    "name": "Aperibé",
  }

const openStreetMapApi = axios.create({
  baseURL: OPEN_STREET_MAP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow all origins
    "Access-Control-Allow-Methods": "GET",
  },
});


const getOpenStreetMapsLocation = async (
  state: string,
  city: string,
  address?: string
): Promise<LocationResponse[]> => {
  return (await openStreetMapApi.get(`/search?q=${address ? address + "+" : "" }+${city}+${state}+Brazil&format=json`)).data as LocationResponse[];
};

// https://maps.googleapis.com/maps/api/geocode/json/?address=Fagundes+Aperib%C3%A9+RJ+Brazil&key=AIzaSyCrMAwqtgn3nvFzmzbE7a6WKPKtnLWrQwo
// https://maps.googleapis.com/maps/api/geocode/json?address=APerib%C3%A9+RJ+Brazil&key=AIzaSyCrMAwqtgn3nvFzmzbE7a6WKPKtnLWrQwo

// const getGoogleMapsLocation = async (
//   state: string,
//   city: string,
//   address?: string
// ): Promise<any> => {
//   return (await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address ? address + "+" : "" }${city}+${state}+Brazil&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`)).data ;
// };



interface GetCityResponse
  {
    id: number,
    nome: string,
    microrregiao: {
      id: number,
      nome: string,
      mesorregiao: {
        id: number,
        nome: string,
        UF: {
          id: number,
          sigla: string,
          nome: string,
          regiao: {
            id: number,
            sigla: string,
            nome: string,
          }
        }
      }
    },
    "regiao-imediata": {
      id: number,
      nome: string,
      "regiao-intermediaria": {
        id: number,
        nome: string,
        UF: {
          id: number,
          sigla: string,
          nome: string,
          regiao: {
            id: number,
            sigla: string,
            nome: string,
          }
        }
      }
    }
  }

const getStateCities = async (UF: string ) => {
  const response = (await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`)).data as GetCityResponse[];  

  return response.map(city => city.nome)
}



export { getOpenStreetMapsLocation, getStateCities}
