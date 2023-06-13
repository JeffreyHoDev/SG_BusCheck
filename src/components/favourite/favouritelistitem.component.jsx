import { useEffect, useState, useContext } from "react"
import styled from "styled-components/native"
import { List, IconButton, Avatar } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native'
import { FavouritesContext } from '../../contexts/favourites/favourites.context';
import { BusArrivalContext } from '../../contexts/busarrival/busarrival.context';

import { Caption } from "../generic/Typography/typography.component";
import { getDuration } from "../../utils/time.utils";

const getBusArrival = async (busStopCode, busServiceNum) => {
    let response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}&ServiceNo=${busServiceNum}`, {
        headers: {
            AccountKey: "PuYu6hszTM6I9STnqu2hiA==",
            accept: "application/json"
        }
    })

    let data = await response.json()
    return data
}

const CustomizedListItem = styled(List.Item)`
    margin-bottom: ${props => props.theme.space.medium};
    width: 85%;
    
`

const FavouriteListContainer = styled(View)`
    background-color: ${props => props.theme.colors.secondary};
    display: flex;
    justify-content: flex-start;
    margin-bottom: ${props => props.theme.space.medium};
    margin-left: ${props => props.theme.space.small};
    margin-right: ${props => props.theme.space.small};
`

const InfoView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 ${props => props.theme.space.small};
`

const CustomizedListItemView = styled(View)`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding: ${props => props.theme.space.medium} 0;
`

const ItemInfoContainer = styled(View)`
    display: flex;
    align-items: center;
    width: 30%;

`

export const FavouriteListItem = ({ favourite, navigation }) => {

    const { removeItemFromStore } = useContext(FavouritesContext)
    const { setBusService } = useContext(BusArrivalContext)

    const [ arrivalDetails, setArrivalDetails ] = useState([])

    const getService = async(busStopCode, busServiceNum, description ) => {
        let data = await getBusArrival(busStopCode, busServiceNum)
        data["description"] = description
        setBusService(data)
    }

    const getDetailOnPressHandler = (data) => {
        getService(data.busService.BusStopCode, data.busData.ServiceNo, data.busService.description)
        navigation.navigate("BusArrival")
    }

    const removeHandler = (data) => {
        removeItemFromStore(data)
    }

    const loadData = async() => {
        let data = await getBusArrival(favourite.busService.BusStopCode, favourite.busData.ServiceNo)
        const services = data["Services"][0]
        let servicesObj = []
        if(services["NextBus"]){
            servicesObj.push(services["NextBus"])
        }
        if(services["NextBus2"]){
            servicesObj.push(services["NextBus2"])
        }
        if(services["NextBus3"]){
            servicesObj.push(services["NextBus3"])
        }
        setArrivalDetails(servicesObj)
    }
    useEffect(() => {
        loadData()
    }, [])

    const refreshHandler = () => {
        loadData()
    }

    return (
        <TouchableOpacity onPress={() => getDetailOnPressHandler(favourite)}>
            <FavouriteListContainer>
                <InfoView >
                    <CustomizedListItem 
                        title={`(${favourite["busService"]["BusStopCode"]}) ${favourite["busService"]["description"]}`}  
                        description={`Service: ${favourite["busData"]["ServiceNo"]}`}
                    />
                    <IconButton
                        icon="close-thick"
                        size={24}
                        onPress={() => removeHandler(favourite)}
                        animated={true}
                    />
                    <IconButton
                        icon="refresh"
                        size={24}
                        onPress={refreshHandler}
                        animated={true}
                    />
                </InfoView>
                <CustomizedListItemView>
                    {
                        arrivalDetails.map((detail, index) => {
                            let duration = getDuration(detail["EstimatedArrival"])
                            return (
                                <ItemInfoContainer key={`item-info-container-${index}`}>
                                    <Avatar.Icon color="white" style={{backgroundColor: `${duration < 5 ? "green": "grey"}` }} size={24} icon="bus" />
                                    <Caption>{`${duration > 0 ? `${duration} min`: 'Arrive'}`}</Caption>
                                </ItemInfoContainer>
                            )
                        })
                    }
                </CustomizedListItemView>
            </FavouriteListContainer>
        </TouchableOpacity>
    )
}