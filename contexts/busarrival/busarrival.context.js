import { createContext, useEffect, useState } from "react";

export const BusArrivalContext = createContext()

export const BusArrivalContextProvider = ({ children }) => {

    const [busService, setBusService] = useState(null)

    return (
        <BusArrivalContext.Provider
            value={{
                busService,
                setBusService,
            }}
        >
            { children }
        </BusArrivalContext.Provider>
    )
}