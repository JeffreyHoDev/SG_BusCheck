import React, { useState, useContext } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { TextInput, Button, List } from 'react-native-paper';
import styled from 'styled-components/native'

import { filteredAndList } from '../contexts/routes/routes.util'
import { RoutesContext } from '../contexts/routes/routes.context';
import { BusStopsContext } from '../contexts/busstops/busstops.context';
import { Caption } from '../components/generic/Typography/typography.component';
import { colors } from '../theme/colors';

const ViewContainer = styled(View)`
    height: 100%;
`

const QueryView = styled(View)`
    width: 100%;
`

const CustomizedTextInput = styled(TextInput)`
    width: 90%;
    margin: ${props => props.theme.space.verySmall} auto;
`

const ButtonContainer = styled(View)`
    display: flex;
    width: 100%;
    padding: ${props => props.theme.space.small} 0;
    align-items: center;
`

const RouteView = styled(ScrollView)`
    background-color: white;
`
const InfoView = styled(View)`
    display: flex;
    align-items: center;
`

export const SearchScreen = () => {

    const [ serviceNumber, setServiceNumber ] = useState("")
    const [ routes, setRoutes ] = useState(null)
    const [ routeDirection, setRouteDirection ] = useState(1)

    const { allRoutes } = useContext(RoutesContext)
    const { busStopsList } = useContext(BusStopsContext)

    const searchHandler = () => {
        if(allRoutes.length < 500){
            return
        }

        let data = filteredAndList(allRoutes, busStopsList, serviceNumber)
        if(data["oneDirection"].length > 0){
            setRoutes(data)

        }else {

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
                <CustomizedTextInput
                    label="Bus Service Number(Case sensitive)"
                    value={serviceNumber}
                    onChangeText={text => setServiceNumber(text)}
                    onSubmitEditing={searchHandler}
                />
            </QueryView>
            <InfoView>
                {!routes && <Caption>No service number!</Caption>}
            </InfoView>
            { routes && <ButtonContainer><Button icon="arrow-u-down-right" mode="contained" onPress={toggleReverse} style={{backgroundColor: colors.subInfo, width: '50%'}} >Reverse Route</Button></ButtonContainer>}
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