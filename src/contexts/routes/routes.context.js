import React, { useState, useEffect, createContext } from 'react'

export const RoutesContext = createContext()

export const RoutesContextProvider = ({ children }) => {

    const [ allRoutes, setAllRoutes ] = useState([])

    useEffect(() => {
        const getLTABusRoutes = async (index) => {
            try {
                let response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${index*500}`, {
                    headers: {
                        AccountKey: "PuYu6hszTM6I9STnqu2hiA==",
                        accept: "application/json"
                    }
                })
                let data = await response.json()
                setAllRoutes((prev) => {
                    let newArray = [...prev, ...data['value']]
                    return newArray
                })
            }catch(err){
                return err
            }
        }

        const forEachSeries = async (iterable, action) => {
            for (const x of iterable) {
              await action(x)
            }
          }
          
        forEachSeries(Array.from(Array(51).keys()), getLTABusRoutes)

    }, [])

    return (
        <RoutesContext.Provider
            value={{
                allRoutes
            }}
        >
            {children}
        </RoutesContext.Provider>
    )
}