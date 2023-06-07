import React, { useState, createContext } from "react";

export const LocationContext = createContext()

export const LocationContextProvider = ({ children }) => {
    const [ currentLocation, setCurrentLocation ] = useState(null)

    return (
        <LocationContext.Provider
            value={{
                currentLocation,
                setCurrentLocation
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}