import {useQuery} from "react-query";
import {
  CargoType,
  CityName,
  getCityRefByName,
  listCargoTypes,
  listServiceTypes, RouteProps, routeRequest,
  ServiceType
} from "../API/dictionaries";

export const useCargoTypes = () => useQuery<CargoType[], any, CargoType[]>('cargoTypes', async () => {
  const cargoTypesResponse = await listCargoTypes();
  if (cargoTypesResponse.success) {
    return cargoTypesResponse.data
  } else {
    if (cargoTypesResponse.errors.length > 0) {
      throw new Error(cargoTypesResponse.errors[0])
    }
    if (cargoTypesResponse.warnings.length > 0) {
      throw new Error(cargoTypesResponse.errors[0])
    }
    if (cargoTypesResponse.info.length > 0) {
      throw new Error(cargoTypesResponse.errors[0])
    }
    throw new Error('Unexpected error')
  }
});

export const useServiceTypes = () => useQuery<ServiceType[], any, ServiceType[]>('serviceTypes', async () => {
  const serviceTypesResponse = await listServiceTypes();
  if (serviceTypesResponse.success) {
    return serviceTypesResponse.data
  } else {
    if (serviceTypesResponse.errors.length > 0) {
      throw new Error(serviceTypesResponse.errors[0])
    }
    if (serviceTypesResponse.warnings.length > 0) {
      throw new Error(serviceTypesResponse.errors[0])
    }
    if (serviceTypesResponse.info.length > 0) {
      throw new Error(serviceTypesResponse.errors[0])
    }
    throw new Error('Unexpected error')
  }
});

export const useCityRef = (cityName:CityName) => useQuery<CityName>('cityName', async () => {
  const cityRefResponse = await getCityRefByName(cityName);
  if (cityRefResponse.success && cityRefResponse.data.length > 0) {
    return cityRefResponse.data[0]
  } else {
    if (cityRefResponse.errors.length > 0) {
      throw new Error(cityRefResponse.errors[0])
    }
    if (cityRefResponse.warnings.length > 0) {
      throw new Error(cityRefResponse.errors[0])
    }
    if (cityRefResponse.info.length > 0) {
      throw new Error(cityRefResponse.errors[0])
    }
    throw new Error('Unexpected error')
  }
});


export const useRouteRequest = (routeProps: RouteProps) => useQuery<string>('routeRequest', async () => {
  const routeResponse = await routeRequest(routeProps);
  if (routeResponse.success) {
    const cost = routeResponse.data?.[0]?.cost;
    if (cost !== undefined) {
      return cost;
    } else {
      throw new Error('Стоимость доставки не найдена');
    }
  } else {
    if (routeResponse.errors.length > 0) {
      throw new Error(routeResponse.errors[0]);
    }
    if (routeResponse.warnings.length > 0) {
      throw new Error(routeResponse.warnings[0]);
    }
    if (routeResponse.info.length > 0) {
      throw new Error(routeResponse.info[0]);
    }
    throw new Error('Unexpected error');
  }
});
