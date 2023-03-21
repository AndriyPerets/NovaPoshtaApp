import {novaPoshtaRequest, NovaPoshtaResponse} from "./API";

export interface CargoType {
  Description: string,
  Ref: string
}

export const listCargoTypes = async (): Promise<NovaPoshtaResponse<CargoType>> => {
  return novaPoshtaRequest({
    modelName: "Common",
    calledMethod: "getCargoTypes",
    methodProperties: {}
  })
}

export interface ServiceType {
  Description: string,
  Ref: string
}

export const listServiceTypes = async (): Promise<NovaPoshtaResponse<CargoType>> => {
  return novaPoshtaRequest({
    modelName: "Common",
    calledMethod: "getServiceTypes",
    methodProperties: {}
  })
}