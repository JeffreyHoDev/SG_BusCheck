import React, { createContext, useState, useEffect, useContext } from "react";
import { LocationContext } from "../location/location.context";
import { filterDataByDistance } from "./busstops.util";

export const BusStopsContext = createContext()

export const BusStopsContextProvider = ({ children }) => {

    const [ busStopsList, setBusStopList ] = useState([])
    const [ nearbyBusStops, setNearbyBusStops ] = useState([])
    const [ isLoadingAllBusStops, setIsLoadingAllBusStops ] = useState(false)

    const { currentLocation } = useContext(LocationContext)
    // Data and Logic Flow Start 
    // Ideal flow => Get Location first, if no current location, no need to call LTA API
    // After call API from LTA, then only do filter
    const getLTABusStops = async (index) => {
        try {

            let response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${index === 11 ? 5080 : index*500}`, {
                headers: {
                    AccountKey: "PuYu6hszTM6I9STnqu2hiA==",
                    accept: "application/json"
                }
            })
            let data = await response.json()
            setBusStopList((prev) => {
                let newArray = [...prev, ...data['value']]
                return newArray
            })
        }catch(err){
            return err
        }
    }

    const forEachSeries = async (iterable, action) => {
        setIsLoadingAllBusStops(true)
        for (const x of iterable) {
          await action(x)
        }
        setIsLoadingAllBusStops(false)
    }

    const mainRunner = async () => {
        if(currentLocation){
            forEachSeries(Array.from(Array(12).keys()), getLTABusStops)
        }
    }

    useEffect(() => {
        mainRunner()
    }, [])
    
    useEffect(() => {
        mainRunner()
    }, [currentLocation])

    useEffect(() => {
        let filteredData = filterDataByDistance(busStopsList, currentLocation)
        setNearbyBusStops([].concat(filteredData))
    }, [busStopsList.length])

    // Data and Logic Flow End 

    return (
        <BusStopsContext.Provider
            value={{
                busStopsList,
                setNearbyBusStops,
                nearbyBusStops,
                isLoadingAllBusStops
            }}
        >
            {children}
        </BusStopsContext.Provider>
    )
}