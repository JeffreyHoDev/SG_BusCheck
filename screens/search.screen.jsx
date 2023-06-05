import { useState, useContext } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { TextInput, IconButton, Button, List } from 'react-native-paper';
import styled from 'styled-components/native'

import { filteredAndList } from '../contexts/routes/routes.util'
import { RoutesContext } from '../contexts/routes/routes.context';
import { BusStopsContext } from '../contexts/busstops/busstops.context';

const ViewContainer = styled(View)`
    height: 100%;
`

const QueryView = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    padding: ${props => props.theme.space.medium};
`

const RouteView = styled(ScrollView)`
    background-color: ${props => props.theme.colors.main};
`
const InfoView = styled(View)`
    display: flex;
    align-items: center;
`

const CustomizedTextInputContainer = styled(View)`
    font-size: ${props => props.theme.space.medium};
    width: 90%;
`

const CustomizedIconButton = styled(IconButton)`
    background-color: ${props => props.theme.colors.subInfo}
`

export const SearchScreen = () => {

    const [ serviceNumber, setServiceNumber ] = useState("")
    const [ routes, setRoutes ] = useState(null)
    const [ routeDirection, setRouteDirection ] = useState(1)
    const [ isSearching , setIsSearching ] = useState(false)

    const { allRoutes } = useContext(RoutesContext)
    const { busStopsList } = useContext(BusStopsContext)

    const searchHandler = () => {
        if(allRoutes.length < 500){
            return
        }
        setIsSearching(true)
        let data = filteredAndList(allRoutes, busStopsList, serviceNumber)
        if(data["oneDirection"].length > 0){
            setRoutes(data)
            setIsSearching(false)
        }else {
            setIsSearching(false)
            return Alert.alert("Service Number Not found", "Apologize, I can't found this service number. Please kindly try again~", [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                }
            ])
        }
    }

    const toggleReverse = () => {
        if(routeDirection === 1){
            setRouteDirection(2)
        }else {
            setRouteDirection(1)
        }
    }

    return (
        <ViewContainer>
            <QueryView>
                <CustomizedTextInputContainer>
                    <TextInput
                        label="Service Number (Case sensitive)"
                        value={serviceNumber}
                        onChangeText={text => setServiceNumber(text)}
                    />
                </CustomizedTextInputContainer>
                <CustomizedIconButton disabled={isSearching} onPress={searchHandler} icon="magnify" />
            </QueryView>
            <InfoView>
                {!routes ? (
                    <Text>No service number!</Text>
                )
                : (
                    <Button onPress={toggleReverse} >Reverse Route</Button>
                )}
            </InfoView>
            <RouteView>
                <List.Section title={routes ? `Service: ${routes["oneDirection"][0]["ServiceNo"]} - Direction: ${routeDirection}` : null} >
                    {
                        // The routes got two direction, got two datasets to represent each
                        routes ?  
                            routeDirection === 1 ? routes["oneDirection"].map((route) => {
                                return   (
                                <List.Item
                                    key={`oneDirection-busstop-${route["BusStopCode"]}`}
                                    title={route["BusStopCode"]}
                                    description={`${route["description"]}\n${route["Distance"]}km from start`}
                                    left={props => <List.Icon {...props} icon="arrow-down" />}
                                />
                                )
                            })
                            : routes["oppDirection"].map((route) => {
                                return   (
                                    <List.Item
                                        key={`oppDirection-busstop-${route["BusStopCode"]}`}
                                        title={route["BusStopCode"]}
                                        description={`${route["description"]}\n${route["Distance"]}km from start`}
                                        left={props => <List.Icon {...props} icon="arrow-down" />}
                                    />
                                    )
                                })
                        : null
                    }
                </List.Section>
            </RouteView>
        </ViewContainer>
    )
}