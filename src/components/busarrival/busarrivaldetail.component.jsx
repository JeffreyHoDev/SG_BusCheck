import { List, Avatar } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import { BusArrivalContext } from '../../contexts/busarrival/busarrival.context';
import { getDuration } from '../../utils/time.utils';
import styled from 'styled-components/native'

import { colors } from '../../theme/colors';
import { Subtitle, Caption } from '../generic/Typography/typography.component'

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
// To at least balance appeal effect on the row for every item with ItemInfoContainer
const CustomizedSubtitle = styled(Subtitle)`
    width: 15%;
    text-align: left;
`

export const BusArrivalDetailComponent = ({ busstop, navigation }) => {

    const [expanded, setExpanded] = useState(false);
    const [ serviceList, setServiceList ] = useState([])
    const handlePress = () => setExpanded(!expanded);
    const { setBusService } = useContext(BusArrivalContext)

    useEffect(() => {
        const getBusArrival = async () => {
            try {
                let response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busstop.BusStopCode}`, {
                    headers: {
                        AccountKey: "PuYu6hszTM6I9STnqu2hiA==",
                        accept: "application/json"
                    }
                })
    
                let data = await response.json()
                let { Services } = data

                setServiceList(Services)
            }catch(err){
                console.log(err)
            }
        }
        getBusArrival()
    },[])

    const getService = async(busStopCode, busServiceNum) => {
        const getBusArrival = async () => {
            let response = await fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${busStopCode}&ServiceNo=${busServiceNum}`, {
                headers: {
                    AccountKey: "PuYu6hszTM6I9STnqu2hiA==",
                    accept: "application/json"
                }
            })

            let data = await response.json()
            data["description"] = busstop["Description"]
            setBusService(data)
        }
        getBusArrival()
    }

    const getDetailOnPressHandler =  (busService) => {
        getService(busstop.BusStopCode, busService)
        navigation.navigate("BusArrival")
    }
    


    return (
        <List.Accordion
            title={`${busstop.Description} - ${busstop.RoadName}(${busstop.BusStopCode})`}
            left={props => {
                // To overwrite props.color, so color attr need put after props
                return <List.Icon {...props} color="rgba(0,0,0,1)" icon="bus-stop" />
            }}
            expanded={expanded}
            onPress={handlePress}
            titleNumberOfLines={2}
            style={{backgroundColor: colors.main}}
            titleStyle={{color: "black"}}
        >
            {
                serviceList.map((service, index) => {
                    let duration = getDuration(service["NextBus"]["EstimatedArrival"])
                    let duration2 = getDuration(service["NextBus2"]["EstimatedArrival"])
                    let duration3 = getDuration(service["NextBus3"]["EstimatedArrival"])
                    return (
                        // <CustomizedListItem 
                        //     key={`service-${index}-${busstop.BusStopCode}`} 
                        //     onPress={() => getDetailOnPressHandler(service.ServiceNo)} 
                        //     right={props => <List.Icon {...props} icon="bus" />}
                        //     title={`${service.ServiceNo} - Next Bus: ${duration > 0 ? `${duration} minutes`: 'Arrive'}`} 
                        // />
                        <TouchableOpacity onPress={() => getDetailOnPressHandler(service.ServiceNo)} key={`service-${index}-${busstop.BusStopCode}`}>
                            <CustomizedListItemView>
                                <CustomizedSubtitle>{service.ServiceNo}</CustomizedSubtitle>
                                <ItemInfoContainer>
                                    <Avatar.Icon color="white" style={{backgroundColor: `${duration < 5 ? "green": "grey"}` }} size={24} icon="bus" />
                                    <Caption>{`${duration > 0 ? `${duration} min`: 'Arrive'}`}</Caption>
                                </ItemInfoContainer>
                                <ItemInfoContainer>
                                    <Avatar.Icon color="white" style={{backgroundColor: `${duration2 < 5 ? "green": "grey"}` }} size={24} icon="bus" />
                                    <Caption>{`${duration2 > 0 ? `${duration2} min`: 'Arrive'}`}</Caption>
                                </ItemInfoContainer>
                                <ItemInfoContainer>
                                    <Avatar.Icon color="white" style={{backgroundColor: `${duration3 < 5 ? "green": "grey"}`}} size={24} icon="bus" />
                                    <Caption>{`${duration3 > 0 ? `${duration3} min`: 'Arrive'}`}</Caption>
                                </ItemInfoContainer>
                            </CustomizedListItemView>
                        </TouchableOpacity>
                    )
                })
            }
        </List.Accordion>
    )
}