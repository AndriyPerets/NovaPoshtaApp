import {useQuery} from "react-query";
import {CargoType, listCargoTypes, listServiceTypes, ServiceType} from "../API/dictionaries";

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
