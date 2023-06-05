import { createContext, useState, useEffect } from "react";

export const BusStopsContext = createContext()

export const BusStopsContextProvider = ({ children }) => {

    const [ busStopsList, setBusStopList ] = useState([])
    const [ nearbyBusStops, setNearbyBusStops ] = useState([])
    const [ isLoadingAllBusStops, setIsLoadingAllBusStops ] = useState(false)

    useEffect(() => {
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
            setNearbyBusStops([])
            setIsLoadingAllBusStops(true)
            for (const x of iterable) {
              await action(x)
            }
            setIsLoadingAllBusStops(false)
          }
          
        forEachSeries(Array.from(Array(12).keys()), getLTABusStops)

    }, [])

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