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

export interface AreaName {
  Description: string,
  Ref: string
}

export const ListAreaNames = async (): Promise<NovaPoshtaResponse<AreaName>> => {
  return novaPoshtaRequest({
    modelName: "Address",
    calledMethod: "getAreas",
    methodProperties: {
    }
  })
}

export interface CityName {
  Description: string,
  Ref: string
}

export const ListCityNames = async (areaRef: string): Promise<NovaPoshtaResponse<CityName>> => {
  return novaPoshtaRequest({
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: {
      AreaRef: areaRef,
      Page: "1",
      Limit: "20",
      Warehouse: "1",
    },
  });
};

export interface CityRef {
  Description: string,
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
  senderRef: string;
  recipientRef: string;
  weight: string;
  serviceType: string;
  cost: string;
  cargoType: string;
  placesAmount: string;
  volume: string;
}


export const routeRequest = async (routeProps: RouteProps): Promise<NovaPoshtaResponse<RouteProps>> => {

  return novaPoshtaRequest({
    modelName: 'InternetDocument',
    calledMethod: 'getDocumentPrice',
    methodProperties: {
      CitySender: routeProps.senderRef,
      CityRecipient: routeProps.recipientRef,
      Weight: routeProps.weight,
      ServiceType: routeProps.serviceType,
      Cost: routeProps.cost,
      CargoType: routeProps.cargoType,
      SeatsAmount: routeProps.placesAmount,
      VolumeGeneral: routeProps.volume,
    },
  });
};
