import { List } from 'react-native-paper';
import { useState, useContext, useEffect } from 'react';
import { BusArrivalContext } from '../../contexts/busarrival/busarrival.context';
import { getDuration } from '../../utils/time.utils';
import styled from 'styled-components/native'

const CustomizedListItem = styled(List.Item)`
    margin-bottom: ${props => props.theme.space.verySmall};
    padding-left: ${props => props.theme.space.veryLarge};
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
            left={props => <List.Icon {...props} icon="bus-stop" />}
            expanded={expanded}
            onPress={handlePress}
            titleNumberOfLines={2}
        >
            {
                serviceList.map((service, index) => {
                    let duration = getDuration(service["NextBus"]["EstimatedArrival"])
                    return (
                        <CustomizedListItem 
                            key={`service-${index}-${busstop.BusStopCode}`} 
                            onPress={() => getDetailOnPressHandler(service.ServiceNo)} 
                            right={props => <List.Icon {...props} icon="bus" />}
                            title={`${service.ServiceNo} - Next Bus: ${duration > 0 ? `${duration} minutes`: 'Arrive'}`} 
                        />
                    )
                })
            }
        </List.Accordion>
    )
}