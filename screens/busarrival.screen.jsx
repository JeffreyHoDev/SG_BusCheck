import { ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Button, List } from 'react-native-paper';

import { useContext, useEffect, useState } from 'react'
import { BusArrivalContext } from '../contexts/busarrival/busarrival.context'

import { getDuration } from '../utils/time.utils';
import { FavouritesContext } from '../contexts/favourites/favourites.context';

const ModalView = styled(ScrollView)`
    background-color: white;
`

const Title = styled(Text)`
    font-size: ${props => props.theme.space.large};
    padding: ${props => props.theme.space.small};
    text-decoration: underline;
`

const TitleContainer = styled(View)`
    width: 80%;
    word-wrap: break-word;
`

const InfoContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const seatGenerator = (load) => {
    switch(load){
        case 'SEA':
            return 'Seats Available'
        case 'SDA':
            return 'Standing Available'
        case 'LSD':
            return 'Limited Standing'
        default:
            break;
    }
}

export const BusArrivalScreen = () => {

    const { busService } = useContext(BusArrivalContext)
    const { setStoreData, favouritesList } = useContext(FavouritesContext)

    const [ isInFavourite, setIsInFavourite] = useState(false)
    let busData = busService ? busService.Services[0] : null

    useEffect(() => {
        if(busService){
            let found = favouritesList.find(favourite => {
                return (favourite["busService"]["BusStopCode"] === busService["BusStopCode"]) && (favourite["busData"]["ServiceNo"] === busData["ServiceNo"])
            })
    
            if(found){
                setIsInFavourite(true)
            }
            else {
                setIsInFavourite(false)
            }
        }
    }, [busService, favouritesList])

    const addToFavouritesHandler = () => {

        let itemToBeAdded = {
            busService: {
                "description": busService["description"],
                "BusStopCode": busService["BusStopCode"]
            },
            busData: {
                "ServiceNo": busData["ServiceNo"],
            }
        }
        setStoreData(itemToBeAdded)
    }

    
    return (
        <>
            {
                busService ? (
                    <ModalView>
                        <InfoContainer>
                            <TitleContainer>
                                <Title>Bus Stop: {busService["description"]} ({busService.BusStopCode})</Title>
                                <Title>Service No: {busData["ServiceNo"]}</Title>
                            </TitleContainer>
                            <Button disabled={isInFavourite} onPress={addToFavouritesHandler} 
                                icon={isInFavourite? "heart" : "heart-outline" }
                            >
                            </Button>
                        </InfoContainer>
                        {
                            busData["NextBus"] ? (
                                <List.Section>
                                    <List.Item title={`Estimated Arrival: ${getDuration(busData["NextBus"]["EstimatedArrival"]) > 0 ? `${getDuration(busData["NextBus"]["EstimatedArrival"])} minutes` : 'Arrive'}`} left={props => <List.Icon {...props} icon="clock-fast" />} />
                                    <List.Item title={`Type: ${busData["NextBus"]["Type"] === 'SD' ? "Single Deck" : "Double Deck"}`} left={props => <List.Icon {...props} icon={`${busData["NextBus"]["Type"] === 'SD' ? "bus-school" : "bus-double-decker"}`} />} />
                                    <List.Item title={`Capacity: ${seatGenerator(busData["NextBus"]["Load"])}`} left={props => <List.Icon {...props} icon={'bus'} />} />
                                </List.Section>
                            ) : null
                        }
                        {
                            busData["NextBus2"] ? (
                                <List.Section>
                                    <List.Item title={`Estimated Arrival: ${getDuration(busData["NextBus2"]["EstimatedArrival"]) > 0 ? `${getDuration(busData["NextBus2"]["EstimatedArrival"])} minutes` : 'Arrive'}`} left={props => <List.Icon {...props} icon="clock-fast" />} />
                                    <List.Item title={`Type: ${busData["NextBus2"]["Type"] === 'SD' ? "Single Deck" : "Double Deck"}`} left={props => <List.Icon {...props} icon={`${busData["NextBus2"]["Type"] === 'SD' ? "bus-school" : "bus-double-decker"}`} />} />
                                    <List.Item title={`Capacity: ${seatGenerator(busData["NextBus2"]["Load"])}`} left={props => <List.Icon {...props} icon={'bus'} />} />
                                </List.Section>
                            ) : null
                        }
                        {
                            busData["NextBus3"] ? (
                                <List.Section>
                                    <List.Item title={`Estimated Arrival: ${getDuration(busData["NextBus3"]["EstimatedArrival"]) > 0 ? `${getDuration(busData["NextBus3"]["EstimatedArrival"])} minutes` : 'Arrive'}`} left={props => <List.Icon {...props} icon="clock-fast" />} />
                                    <List.Item title={`Type: ${busData["NextBus3"]["Type"] === 'SD' ? "Single Deck" : "Double Deck"}`} left={props => <List.Icon {...props} icon={`${busData["NextBus3"]["Type"] === 'SD' ? "bus-school" : "bus-double-decker"}`} />} />
                                    <List.Item title={`Capacity: ${seatGenerator(busData["NextBus3"]["Load"])}`} left={props => <List.Icon {...props} icon={'bus'} />} />
                                </List.Section>
                            ) : null
                        }
                    </ModalView>
                ): null
            }
        </>
    )
}