import { useContext, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Button, List } from 'react-native-paper';
import styled from 'styled-components/native'

import { BusArrivalDetailComponent } from './busarrivaldetail.component'
import { BusStopsContext } from '../../contexts/busstops/busstops.context'
import { LocationContext } from '../../contexts/location/location.context';

const Container = styled.View`
    position: absolute;
    height: 45%;
    width: 100%;
    bottom: 0;
    z-index: 10;
    background-color: white;
`

const StyledScrollView = styled(ScrollView)`
    width: 100%;
    height: 100%;
`

const ActionView = styled(View)`
    height: 15%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between
    padding: 0;
    margin: 0;
`

const RefreshContainer = styled(View)`
    display: flex;
    flex-direction: row;
`

export const BusArrivalListComponent = ({ navigation }) => {

    const { nearbyBusStops, setNearbyBusStops } = useContext(BusStopsContext)
    const { setCurrentLocation } = useContext(LocationContext)

    const [isLoading, setIsLoading] = useState(false)


    const refreshHandler = () => {

        const getLocation = async () => {
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

        const run = async() => {
            setIsLoading(true)
            setNearbyBusStops([])
            await getLocation()
            setIsLoading(false)
        }
        run()
    }

    return (
        <Container>
            <ActionView>
                <RefreshContainer>
                    <Button disabled={isLoading} onPress={refreshHandler} icon="refresh">Refresh</Button>
                    {isLoading ? <ActivityIndicator /> : null}
                </RefreshContainer>
            </ActionView>
            <StyledScrollView
                bounces={false}
            >
                <List.Section title="Nearby Bus Stops (Within 500m)">
                    {
                        nearbyBusStops.map((busstop, index) => {
                            return (
                                <BusArrivalDetailComponent navigation={navigation} key={`busstop-detail-i${index}-${busstop.BusStopCode}`} busstop={busstop} />
                            )
                        })
                    }
                </List.Section>
            </StyledScrollView>
        </Container>
    )
}