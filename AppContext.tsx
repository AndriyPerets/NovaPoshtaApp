import {AreaName, CargoType, CityName, CityRef, RouteProps, ServiceType} from "./API/dictionaries";
import {createContext} from "react";
import {
    QueryObserverIdleResult,
    QueryObserverLoadingErrorResult,
    QueryObserverLoadingResult,
    QueryObserverRefetchErrorResult, QueryObserverSuccessResult
} from "react-query";



//тип данных TypeScript для объекта контекста (DimensionsContext)
export interface DimensionsContextProps {
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
    areaSenderName?: AreaName
    setAreaSenderName: (areaSenderName?: AreaName) => void;
    areaRecipientName?: AreaName;
    setAreaRecipientName: (areaRecipientName?: AreaName) => void;
    citySenderName?: CityName;
    setCitySenderName: (citySenderName?: CityName) => void;
    cityRecipientName?: CityName;
    setCityRecipientName: (cityRecipientName?: CityName) => void;
    citySenderRef?: CityRef;
    setCitySenderRef: (citySenderRef?: CityRef) => void;
    cityRecipientRef?: CityRef;
    setCityRecipientRef: (cityRecipientRef?: CityRef) => void;
    result?: string;
    setResult: (result?: string) => void;
}

// экспортируемый объект контекста (DimensionsContext)
export const DimensionsContext = createContext<DimensionsContextProps>({
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
    setAreaSenderName: () => {},
    areaSenderName: undefined,
    setAreaRecipientName: () => {},
    areaRecipientName: undefined,
    setCitySenderName: () => {},
    citySenderName: undefined,
    setCityRecipientName: () => {},
    cityRecipientName: undefined,
    setCitySenderRef: () => {},
    citySenderRef: undefined,
    setCityRecipientRef: () => {},
    cityRecipientRef: undefined,
    setResult: () => {},
    result: undefined,
});
