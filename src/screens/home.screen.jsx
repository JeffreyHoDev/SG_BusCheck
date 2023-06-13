import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';
// import { Dimensions } from 'react-native';
import { useContext } from 'react';
import * as Location from 'expo-location';

import { BusArrivalListComponent } from '../components/busarrival/busarrival.component'
import { BusStopsContext } from '../contexts/busstops/busstops.context'
import { LocationContext } from '../contexts/location/location.context';
import { Subtitle } from '../components/generic/Typography/typography.component'

const CustomizedMapView = styled(MapView)`
    height: 100%;
    width: 100%;
`

const LoadingView = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 999;
`

const Container = styled.View`
    position: absolute;
    height: 45%;
    width: 100%;
    bottom: 0;
    z-index: 10;
    background-color: white;
`


export const HomeScreen = ({ navigation }) => {
    const [regionConfigurations, setRegionConfigurations] = useState({
        latitude: 1.290270,
        longitude: 103.851959,
        latitudeDelta: 0.1,
        longitudeDelta: 0.02
    })
    const { nearbyBusStops, isLoadingAllBusStops } = useContext(BusStopsContext)
    const { currentLocation, setCurrentLocation } = useContext(LocationContext)
    const [errorMsg, setErrorMsg] = useState(null);



    useEffect(() => {
        const run = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } else {
                let location = await Location.getCurrentPositionAsync();
                const lat = location.coords.latitude;
                const lng = location.coords.longitude;

                let newLocation = {
                    latitude: lat,
                    longitude: lng
                }
                await setCurrentLocation(() => Object.assign(newLocation, {}))

            }
        }
        run()
    }, [])

    useEffect(() => {
        if (currentLocation) {
            setRegionConfigurations({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.005
            })
        }
    }, [currentLocation])



    return (
        <View>
            <View>
                <CustomizedMapView
                    region={regionConfigurations}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                // onRegionChange={onRegionChange}
                >
                    {
                        nearbyBusStops.map((busstop, index) => {
                            return (
                                <Marker
                                    key={`busstop-i${index}-${busstop.BusStopCode}`}
                                    coordinate={{ latitude: busstop.Latitude, longitude: busstop.Longitude }}
                                    title={`${busstop.BusStopCode}`}
                                    description={`${busstop.Description}`}
                                />
                            )
                        })
                    }
                </CustomizedMapView>
                <Container>
                    {isLoadingAllBusStops ? <LoadingView><ActivityIndicator /><Subtitle>Getting Nearby Bus Stops with Your Location</Subtitle><Subtitle>Make sure Internet Access is enabled!</Subtitle></LoadingView> : <BusArrivalListComponent navigation={navigation} />}
                </Container>
            </View>
        </View>
    )
}
