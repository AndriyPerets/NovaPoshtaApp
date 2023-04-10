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

export const listServiceTypes = async (): Promise<NovaPoshtaResponse<ServiceType>> => {
  return novaPoshtaRequest({
    modelName: "Common",
    calledMethod: "getServiceTypes",
    methodProperties: {}
  })
}

export interface CityName {
  DescriptionRu: string;
  Ref: string;
  Latitude: string;
  Longitude: string;
}

export const ListCityNames = async (): Promise<NovaPoshtaResponse<CityName>> => {
  return novaPoshtaRequest({
    modelName: "Address",
    calledMethod: "getSettlements",
    methodProperties: {
      Warehouse: "1",
      Latitude: "Latitude",
      Longitude: "Longitude",
    },
  });
};

export interface RouteProps {
  citySenderRef: string;
  cityRecipientRef: string;
  weight: string;
  serviceType: string;
  cost: string;
  cargoType: string;
  seatsAmount: string;
  volume: string;
}


export const routeRequest = async (routeProps: RouteProps): Promise<NovaPoshtaResponse<RouteProps>> => {
  // console.log(routeProps);
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
      SeatsAmount: routeProps.seatsAmount,
      VolumeGeneral: routeProps.volume,
    },
  });
};

export interface RouteResponseData {
  AssessedCost: number;
  Cost: number;
}
