import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, List } from 'react-native-paper';
import styled from 'styled-components/native'
import * as Location from 'expo-location';

import { BusArrivalDetailComponent } from './busarrivaldetail.component'
import { BusStopsContext } from '../../contexts/busstops/busstops.context'
import { LocationContext } from '../../contexts/location/location.context';

const StyledScrollView = styled(ScrollView)`
    width: 100%;
    height: 100%;
`

const RefreshContainer = styled(View)`
    display: flex;
    flex-direction: row;
`

export const BusArrivalListComponent = ({ navigation }) => {

    const { nearbyBusStops } = useContext(BusStopsContext)
    const { setCurrentLocation } = useContext(LocationContext)

    // const [isLoading, setIsLoading] = useState(false)


    const refreshHandler = () => {

        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }else {

                let location = await Location.getCurrentPositionAsync();
                const lat = location.coords.latitude;
                const lng = location.coords.longitude;
            
                let newLocation = {
                    latitude: lat,  
                    longitude: lng
                }
                setCurrentLocation(newLocation);

            }

        }

        const run = async() => {
            getLocation()
        }
        run()
    }

    return (
        <>
            <RefreshContainer>
                <Button onPress={refreshHandler} icon="refresh">Refresh</Button>
            </RefreshContainer>
            <StyledScrollView>
                <List.Section title="Nearby Bus Stops">
                    {
                        nearbyBusStops.map((busstop, index) => {
                            return (
                                <BusArrivalDetailComponent navigation={navigation} key={`busstop-detail-i${index}-${busstop.BusStopCode}`} busstop={busstop} />
                            )
                        })
                    }
                </List.Section>
            </StyledScrollView>
        </>
    )
}