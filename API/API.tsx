import axios from "axios/index";
import {API_KEY, API_URL} from "../constants";
import {CityName} from "./dictionaries";

export interface NovaPoshtaResponse<T> {
  success: boolean,
  data: T[],
  errors: string[],
  warnings: string[],
  info: string[],
  messageCodes: string[],
  errorCodes: string[],
  warningCodes: string[],
  infoCodes: string[]
}

export interface NovaPoshtaRequest {
  modelName: string,
  calledMethod: string,
  methodProperties: { [key: string]: string; }
}

export const novaPoshtaRequest = async (request: NovaPoshtaRequest): Promise<NovaPoshtaResponse<any>> => {
  const {data} = await axios.post(API_URL, {
    apiKey: API_KEY,
    ...request,
    // modelName: request.modelName,
    // calledMethod: request.calledMethod,
    // methodProperties: request.methodProperties,
  })
  return data
}

export interface NovaPoshtaCityRefRequest {
  modelName: string,
  calledMethod: string,
  methodProperties: { CityName: CityName; Limit: string  }
}


export const novaPoshtaCityRefRequest = async (request: NovaPoshtaCityRefRequest): Promise<NovaPoshtaResponse<any>> => {
  const {data} = await axios.post(API_URL, {
    apiKey: API_KEY,
    ...request,
    // modelName: request.modelName,
    // calledMethod: request.calledMethod,
    // methodProperties: request.methodProperties,
  })
  return data
}
