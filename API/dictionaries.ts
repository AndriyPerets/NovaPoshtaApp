import {novaPoshtaCityRefRequest, novaPoshtaRequest, NovaPoshtaResponse} from "./API";

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

export const listServiceTypes = async (): Promise<NovaPoshtaResponse<ServiceType>> => {
  return novaPoshtaRequest({
    modelName: "Common",
    calledMethod: "getServiceTypes",
    methodProperties: {}
  })
}

export interface CityName {
  MainDescription: string,
  Ref: string
}


export const getCityRefByName = async (cityName: CityName): Promise<NovaPoshtaResponse<CityName>> => {
  return novaPoshtaCityRefRequest({
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: cityName,
      Limit: "1"
    }
  })
}


export interface RouteProps {
  citySenderRef: string,
  cityRecipientRef: string,
  weight: string,
  serviceType: string,
  cost: string,
  cargoType: string,
  placesAmount: string
  volume: string,
}

export const routeRequest = async (routeProps: RouteProps): Promise<NovaPoshtaResponse<RouteProps>> => {

  return novaPoshtaRequest({
    modelName: 'InternetDocument',
    calledMethod: 'getDocumentPrice',
    methodProperties: {
      CitySender: routeProps.citySenderRef,
      CityRecipient: routeProps.cityRecipientRef,
      Weight: routeProps.weight,
      ServiceType: routeProps.serviceType,
      Cost: routeProps.cost,
      CargoType: routeProps.cargoType,
      SeatsAmount: routeProps.placesAmount,
      VolumeGeneral: routeProps.volume,
    },
  });
};
