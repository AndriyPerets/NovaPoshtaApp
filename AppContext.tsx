import {CargoType, ServiceType} from "./API/dictionaries";
import {createContext} from "react";



//тип данных TypeScript для объекта контекста (DimensionsContext)
interface DimensionsContextProps {
    volume?: number;
    setVolume: (volume?: number) => void;
    cargoType?: CargoType;
    setCargoType: (cargoType?: CargoType) => void;
    serviceType?: ServiceType;
    setServiceType: (serviceType?: ServiceType) => void;
    weight?: string;
    setWeight: (weight?: string) => void;
    cost?: string;
    setCost: (cost?: string) => void;
    placesAmount?: string;
    setPlacesAmount: (placesAmount?: string) => void;
}

// экспортируемый объект контекста (DimensionsContext)
export const DimensionsContext = createContext<DimensionsContextProps>({ //экспортируемый объект контекста (DimensionsContext)
    setVolume: () => {},
    volume: undefined,
    setCargoType: () => {},
    cargoType: undefined,
    setServiceType: () => {},
    serviceType: undefined,
    setWeight: () => {},
    weight: undefined,
    setCost: () => {},
    cost: undefined,
    setPlacesAmount: () => {},
    placesAmount: undefined,
});