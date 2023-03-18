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
