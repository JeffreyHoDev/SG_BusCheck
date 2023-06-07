import React, { useContext } from 'react';
import { List, IconButton } from 'react-native-paper';
import { ScrollView, View } from 'react-native'
import { FavouritesContext } from '../contexts/favourites/favourites.context';
import { BusArrivalContext } from '../contexts/busarrival/busarrival.context';
import styled from 'styled-components/native'


const CustomizedListItem = styled(List.Item)`
    margin-bottom: ${props => props.theme.space.medium};
    width: 85%;
    background-color: ${props => props.theme.colors.main};
`

const InfoView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

export const FavouritesScreen = ({ navigation }) => {


    const { favouritesList, removeItemFromStore } = useContext(FavouritesContext)
    const { setBusService } = useContext(BusArrivalContext)

    const getService = async(busStopCode, busServiceNum, description ) => {
        const getBusArrival = async () => {
            let response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}&ServiceNo=${busServiceNum}`, {
                headers: {
                    AccountKey: "PuYu6hszTM6I9STnqu2hiA==",
                    accept: "application/json"
                }
            })

            let data = await response.json()
            data["description"] = description
            setBusService(data)
        }
        getBusArrival()
    }

    const getDetailOnPressHandler =  (data) => {
        getService(data.busService.BusStopCode, data.busData.ServiceNo, data.busService.description)
        navigation.navigate("BusArrival")
    }

    const removeHandler = (data) => {
        removeItemFromStore(data)
    }

    return (
        <List.Section title="My Favourites">
            <ScrollView>
                {
                    favouritesList.map((favourite, index) => {
                        return (
                            <InfoView key={`favourite-item-${index}`}>
                                <CustomizedListItem 
                                onPress={() => getDetailOnPressHandler(favourite)} 
                                title={`(${favourite["busService"]["BusStopCode"]}) ${favourite["busService"]["description"]}`}  
                                description={`Service: ${favourite["busData"]["ServiceNo"]}`}
                                />
                                <IconButton
                                    icon="close-thick"
                                    size={15}
                                    onPress={() => removeHandler(favourite)}
                                />
                            </InfoView>
                        )
                    })
                }
            </ScrollView>
        </List.Section>
    )
}