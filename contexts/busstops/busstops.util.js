import { getDistance } from 'geolib'

export const measureDistance = (start, end) => {
    // start and end should be in object with latitude and longitude keys
    return getDistance(start,end)
}

export const filterDataByDistance = (data, currentLocation, distanceRange=500) => {
    let filteredData = data.filter((item) => {
        let busStopLocation = {
            latitude: item.Latitude,
            longitude: item.Longitude
        }

        let distance = measureDistance(currentLocation, busStopLocation) // in meters
        if(distance <= distanceRange){
            return item
        }

    })
    return filteredData
}