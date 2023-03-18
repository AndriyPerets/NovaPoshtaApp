import {useQuery} from "react-query";
import {CargoType, listCargoTypes} from "../API/dictionaries";

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
})
