export const filteredAndList = (routesData, busStopList, serviceNumber) => {
    if(serviceNumber.length < 1){
        return
    }


    let routesWithService = routesData.filter((route) => {
        return route["ServiceNo"] === serviceNumber
    })

    let routesWithOneDirection = routesWithService.filter((route) => {
        if(route["Direction"] === 1){
            let busStopObj = busStopList.find(item => item.BusStopCode === route["BusStopCode"])
            route["description"] = busStopObj["Description"]
            return route
        }
    })
    let routesWithOppositeDirection = routesWithService.filter((route) => {
        if(route["Direction"] === 2){
            let busStopObj = busStopList.find(item => item.BusStopCode === route["BusStopCode"])
            route["description"] = busStopObj["Description"]
            return route
        }
    })

    return {
        oneDirection: routesWithOneDirection,
        oppDirection: routesWithOppositeDirection
    }

}