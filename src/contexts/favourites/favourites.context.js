import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext()

export const FavouritesContextProvider = ({ children }) => {
    
    const [ favouritesList, setFavouritesList ] = useState([])

    const getStoreData = async () => {
        try {
            let data = await AsyncStorage.getItem(`@sgbus_check_favourites_services`)
            return data != null ? JSON.parse(data) : [];
        }catch(err){
            console.log(err)
        }
    }

    const setStoreData = async(item) => {
        try {
            let previousData = await getStoreData()
            let result = previousData.find(prevItem => {
                return prevItem["busService"]["BusStopCode"] === item["busService"]["BusStopCode"] && prevItem["busData"]["ServiceNo"] === item["busData"]["ServiceNo"]
            })
            if(!result){
                await AsyncStorage.setItem(`@sgbus_check_favourites_services`, JSON.stringify([...previousData, item]))
                setFavouritesList([...previousData, item])
            }
        }catch(err){
            console.log(err)
        }
    }

    const removeItemFromStore = async (item) => {
        try {
            let previousData = await getStoreData()
            let result = previousData.filter(prevItem => {
                return prevItem["busService"]["BusStopCode"] !== item["busService"]["BusStopCode"] || prevItem["busData"]["ServiceNo"] !== item["busData"]["ServiceNo"]
            })
            await AsyncStorage.setItem(`@sgbus_check_favourites_services`, JSON.stringify(result))
            setFavouritesList(result)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() => {
        const run = async () => {
            let data = await getStoreData()
            setFavouritesList(data)
        }
        run()
    }, [])

    
    return (
        <FavouritesContext.Provider
            value={{
                favouritesList,
                setStoreData,
                getStoreData,
                removeItemFromStore
            }}
        >
            { children }
        </FavouritesContext.Provider>
    )
} 