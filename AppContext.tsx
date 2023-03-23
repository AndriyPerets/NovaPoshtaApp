import {CargoType, CityName, RouteProps, ServiceType} from "./API/dictionaries";
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
    citySenderName?: CityName;
    setCitySenderName: (citySenderName?: CityName) => void;
    cityRecipientName?: CityName;
    setCityRecipientName: (cityRecipientName?: CityName) => void;
    citySenderRef?: RouteProps;
    setCitySenderRef: (citySenderRef?: QueryObserverIdleResult<TQueryFnData, unknown> | QueryObserverLoadingErrorResult<TQueryFnData, unknown> | QueryObserverLoadingResult<TQueryFnData, unknown> | QueryObserverRefetchErrorResult<TQueryFnData, unknown> | QueryObserverSuccessResult<TQueryFnData, unknown>) => void;
    cityRecipientRef?: RouteProps;
    setCityRecipientRef: (cityRecipientRef?: QueryObserverIdleResult<TQueryFnData, unknown> | QueryObserverLoadingErrorResult<TQueryFnData, unknown> | QueryObserverLoadingResult<TQueryFnData, unknown> | QueryObserverRefetchErrorResult<TQueryFnData, unknown> | QueryObserverSuccessResult<TQueryFnData, unknown>) => void;
    result?: string;
    setResult: (result: QueryObserverIdleResult<TQueryFnData, unknown> | QueryObserverLoadingErrorResult<TQueryFnData, unknown> | QueryObserverLoadingResult<TQueryFnData, unknown> | QueryObserverRefetchErrorResult<TQueryFnData, unknown> | QueryObserverSuccessResult<TQueryFnData, unknown>) => void;
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