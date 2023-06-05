import { Image, View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';
// import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import * as Location from 'expo-location';
import { BusArrivalListComponent } from '../components/busarrival/busarrival.component'
import { BusStopsContext } from '../contexts/busstops/busstops.context'
import { LocationContext } from '../contexts/location/location.context';
import { filterDataByDistance } from '../contexts/busstops/busstops.util'


const CustomizedMapView = styled(MapView)`
    height: 100%;
    width: 100%;
`

const MarkerText = styled(Text)`
    background-color: white;
    text-align: center;
    padding: 5px 10px
`


const LoadingView = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 999;
`

export const HomeScreen = ({ navigation }) => {
    const [ regionConfigurations, setRegionConfigurations ] = useState({
        latitude: 1.290270,
        longitude: 103.851959,
        latitudeDelta: 0.1,
        longitudeDelta: 0.02
    })
    const { setNearbyBusStops, nearbyBusStops, busStopsList, isLoadingAllBusStops } = useContext(BusStopsContext)
    const { currentLocation, setCurrentLocation } = useContext(LocationContext)
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ isSettingNearbyBusStops, setIsSettingNearbyBusStops] = useState(false)


    useEffect(() => {
        const run = async() => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }else {
                    let location = await Location.getCurrentPositionAsync({});
                    const lat = location.coords.latitude;
                    const lng = location.coords.longitude;
                
                    let newLocation = {
                        latitude: lat,  
                        longitude: lng
                    }
                    setCurrentLocation(newLocation)
            }
        }
        run()
    }, [])

    useEffect(() => {
        if(currentLocation){
            if(busStopsList.length !== 0){
                
                setIsSettingNearbyBusStops(true)
                let filteredData = filterDataByDistance(busStopsList, currentLocation)
                setNearbyBusStops(filteredData)
                setRegionConfigurations({
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.005
                })
                setIsSettingNearbyBusStops(false)
            }
        }
    }, [currentLocation, busStopsList])

    return (
        <View>
            {
                isLoadingAllBusStops ? <LoadingView><ActivityIndicator /><Text>Getting Bus Stops and Locating</Text><Text>Make sure Internet Access is enabled!</Text></LoadingView> : 
                (
                    <View>
                        {
                            <CustomizedMapView
                                region={regionConfigurations}
                                // onRegionChange={onRegionChange}
                            >
                                {
                                    nearbyBusStops.map((busstop, index) => {
                                        return( 
                                            <Marker 
                                                key={`busstop-i${index}-${busstop.BusStopCode}`}
                                                coordinate={{latitude: busstop.Latitude, longitude: busstop.Longitude}}
                                                title={`${busstop.BusStopCode}`}
                                                description={`${busstop.Description}`}
                                            />
                                        )
                                    })
                                }
                                {currentLocation ? (
                                    <Marker
                                        coordinate={{latitude: currentLocation.latitude, longitude: currentLocation.longitude}}
                                    >
                                        <MarkerText>You are here!</MarkerText>
                                        <Image source={require("../assets/man-marker.png")} style={{width: 20, height: 20}}/>
                                    </Marker>
                                ) : null}
                            </CustomizedMapView>
                        }
                        {isSettingNearbyBusStops ? <LoadingView><ActivityIndicator /></LoadingView> : <BusArrivalListComponent navigation={navigation}/>}
                    </View>
                )
            }
        </View>
    )
}
