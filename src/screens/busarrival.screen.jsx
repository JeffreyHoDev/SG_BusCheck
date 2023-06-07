import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BusArrivalContext } from '../contexts/busarrival/busarrival.context'
import { getDuration } from '../utils/time.utils';
import { FavouritesContext } from '../contexts/favourites/favourites.context';

import { Subtitle, SubInfo } from '../components/generic/Typography/typography.component';
import { colors } from '../theme/colors';

const ModalView = styled(ScrollView)`
    background-color: white;
`

const TitleContainer = styled(View)`
    width: 100%;
    word-wrap: break-word;
    padding: ${props => props.theme.space.small};
`

const InfoContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const BusArrivalDetailsContainer = styled(View)`
    display: flex;
`

const CardContainer = styled(View)`
    width: 95%;
    margin: ${props => props.theme.space.medium} auto;
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.focus};
    padding-top: ${props => props.theme.space.medium};
`

const CardDetailContainer = styled(View)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.theme.space.small};
    padding-left: ${props => props.theme.space.large};
    position: relative;
`

const IconBadge = styled(Icon)`
    position: absolute;
    left: -${props => props.theme.space.small};
    top: -${props => props.theme.space.small};
`

const FavouriteButtonContainer = styled(View)`
    display: flex;
    width: 100%;
    align-items: center;

`

const FavouriteButton = styled(Button)`
    width: 50%;
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
                                <Subtitle>Bus Stop: {busService["description"]} ({busService.BusStopCode})</Subtitle>
                                <Subtitle>Service No: {busData["ServiceNo"]}</Subtitle>
                            </TitleContainer>
                        </InfoContainer>
                        <BusArrivalDetailsContainer>
                            {
                                busData["NextBus"] ? (
                                    <CardContainer>
                                        <IconBadge color="green" size={30} name="numeric-1-circle" />
                                        <CardDetailContainer>
                                            <Icon size={30} name="bus-clock"/>
                                            <SubInfo style={{ color: getDuration(busData["NextBus"]["EstimatedArrival"]) < 5 && "green"}}>Estimated Arrival: {getDuration(busData["NextBus"]["EstimatedArrival"]) > 0 ? `${getDuration(busData["NextBus"]["EstimatedArrival"])} minutes` : 'Arrive'}</SubInfo>
                                        </CardDetailContainer>
                                        <CardDetailContainer>
                                            <Icon size={30} name={busData["NextBus"]["Type"] === 'SD' ? "bus-school" : "bus-double-decker"}/>
                                            <SubInfo>Type: {busData["NextBus"]["Type"] === 'SD' ? "Single Deck" : "Double Deck"}</SubInfo>
                                        </CardDetailContainer>
                                        <CardDetailContainer>
                                            <Icon size={30} name="account-group"/>
                                            <SubInfo style={{ color: (busData["NextBus"]["Load"] === "SEA" ||busData["NextBus"]["Load"] === "SDA") && "green"}}>Capacity: {seatGenerator(busData["NextBus"]["Load"])}</SubInfo>
                                        </CardDetailContainer>
                                    </CardContainer>
                                ) : null
                            }
                            {
                                busData["NextBus2"] ? (
                                    <CardContainer>
                                        <IconBadge color="green" size={30} name="numeric-2-circle" />
                                        <CardDetailContainer>
                                            <Icon size={30} name="bus-clock"/>
                                            <SubInfo style={{ color: getDuration(busData["NextBus2"]["EstimatedArrival"]) < 5 && "green"}}>Estimated Arrival: {getDuration(busData["NextBus2"]["EstimatedArrival"]) > 0 ? `${getDuration(busData["NextBus2"]["EstimatedArrival"])} minutes` : 'Arrive'}</SubInfo>
                                        </CardDetailContainer>
                                        <CardDetailContainer>
                                            <Icon size={30} name={busData["NextBus2"]["Type"] === 'SD' ? "bus-school" : "bus-double-decker"}/>
                                            <SubInfo>Type: {busData["NextBus2"]["Type"] === 'SD' ? "Single Deck" : "Double Deck"}</SubInfo>
                                        </CardDetailContainer>
                                        <CardDetailContainer>
                                            <Icon size={30} name="account-group"/>
                                            <SubInfo style={{ color: (busData["NextBus2"]["Load"] === "SEA" ||busData["NextBus2"]["Load"] === "SDA") && "green"}}>Capacity: {seatGenerator(busData["NextBus"]["Load"])}</SubInfo>
                                        </CardDetailContainer>
                                    </CardContainer>
                                ) : null
                            }
                            {
                                busData["NextBus3"] ? (
                                    <CardContainer>
                                        <IconBadge color="green" size={30} name="numeric-3-circle" />
                                        <CardDetailContainer>
                                            <Icon size={30} name="bus-clock"/>
                                            <SubInfo style={{ color: getDuration(busData["NextBus3"]["EstimatedArrival"]) < 5 && "green"}}>Estimated Arrival: {getDuration(busData["NextBus3"]["EstimatedArrival"]) > 0 ? `${getDuration(busData["NextBus3"]["EstimatedArrival"])} minutes` : 'Arrive'}</SubInfo>
                                        </CardDetailContainer>
                                        <CardDetailContainer>
                                            <Icon size={30} name={busData["NextBus3"]["Type"] === 'SD' ? "bus-school" : "bus-double-decker"}/>
                                            <SubInfo>Type: {busData["NextBus3"]["Type"] === 'SD' ? "Single Deck" : "Double Deck"}</SubInfo>
                                        </CardDetailContainer>
                                        <CardDetailContainer>
                                            <Icon size={30} name="account-group"/>
                                            <SubInfo style={{ color: (busData["NextBus3"]["Load"] === "SEA" ||busData["NextBus3"]["Load"] === "SDA") && "green"}}>Capacity: {seatGenerator(busData["NextBus"]["Load"])}</SubInfo>
                                        </CardDetailContainer>
                                    </CardContainer>
                                ) : null
                            }
                        </BusArrivalDetailsContainer>
                        <FavouriteButtonContainer>
                            <FavouriteButton mode="contained" disabled={isInFavourite} onPress={addToFavouritesHandler} 
                                icon={isInFavourite? "heart" : "heart-outline" }
                                buttonColor={colors.love}
                            >
                                Favourite
                            </FavouriteButton>
                        </FavouriteButtonContainer>
                    </ModalView>
                ): null
            }
        </>
    )
}