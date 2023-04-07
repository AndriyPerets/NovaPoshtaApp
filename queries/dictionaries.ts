import {useQuery} from "react-query";
import {
  AreaName,
  CargoType,
  CityName,
  ListAreaNames,
  listCargoTypes, ListCityNames,
  listServiceTypes,
  RouteProps,
  routeRequest,
  RouteResponseData,
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

export const useAreaNames = () => useQuery<AreaName[], any, AreaName[]>('areaName', async () => {
  const areaNameResponse = await ListAreaNames();
  if (areaNameResponse.success && areaNameResponse.data.length > 0) {
    return areaNameResponse.data
  } else {
    if (areaNameResponse.errors.length > 0) {
      throw new Error(areaNameResponse.errors[0])
    }
    if (areaNameResponse.warnings.length > 0) {
      throw new Error(areaNameResponse.errors[0])
    }
    if (areaNameResponse.info.length > 0) {
      throw new Error(areaNameResponse.errors[0])
    }
    throw new Error('Unexpected error')
  }
});

export const useCityNames = (areaRef: string) => {
  return useQuery<CityName[], Error>(
    ["cityNames", areaRef],
    async () => {
      const cityNameResponse = await ListCityNames(areaRef);
      if (cityNameResponse.success && cityNameResponse.data.length > 0) {
        return cityNameResponse.data;
      } else {
        if (cityNameResponse.errors.length > 0) {
          throw new Error(cityNameResponse.errors[0]);
        }
        if (cityNameResponse.warnings.length > 0) {
          throw new Error(cityNameResponse.errors[0]);
        }
        if (cityNameResponse.info.length > 0) {
          throw new Error(cityNameResponse.errors[0]);
        }
        throw new Error("Unexpected error");
      }
    },
    { enabled: !!areaRef }
  );
};

export const fetchRouteRequest = async (routeProps: RouteProps) => {
  const routeResponse = await routeRequest(routeProps);
  // console.log("routeResponse:", routeResponse);
  if (routeResponse.success) {
    const cost = ((routeResponse.data as unknown) as RouteResponseData[])[0]?.Cost;
    // console.log("cost:", cost);
    // console.log(routeResponse.data?.[0]?.cost);
    if (cost !== undefined) {
      return cost;
    } else {
      throw new Error('Стоимость доставки не найдена');
      // console.log('Стоимость доставки не найдена');
    }
  } else {
    if (routeResponse.errors.length > 0) {
      throw new Error(routeResponse.errors[0]);
      // console.log(routeResponse.errors[0]);
    }
    if (routeResponse.warnings.length > 0) {
      throw new Error(routeResponse.warnings[0]);
      // console.log(routeResponse.warnings[0]);
    }
    if (routeResponse.info.length > 0) {
      throw new Error(routeResponse.info[0]);
      // console.log(routeResponse.info[0]);
    }
    throw new Error('Unexpected error');
    // console.log('Unexpected error');
  }
};
