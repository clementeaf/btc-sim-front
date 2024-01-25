import axios from "axios";

const BASE_URL = "http://0.0.0.0:8000/";

const endpoint = `${BASE_URL}markets`;
const endpointV2 = `${BASE_URL}markets_v2`;

export const getBTCCLPprice = `${BASE_URL}get_price`;

const defaultHeaders = {
    'Content-Type': 'application/json',
  };

const axiosInstance = axios.create({
    headers: defaultHeaders,
  });

export async function fetchMarketSpread() {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        
    }
}

export async function fetchMarketSpreadHistorical() {
  try {
      const response = await axiosInstance.get(endpointV2);
      return response.data;
  } catch (error) {
      
  }
}