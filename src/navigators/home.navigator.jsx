// import { Dimensions } from 'react-native';
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import { BusArrivalScreen } from '../screens/busarrival.screen'
import { HomeScreen } from '../screens/home.screen';

const HomeStack = createStackNavigator()

export const HomeNavigator = () => {

    return (

        <HomeStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: false
            }}
        >
            <HomeStack.Screen 
                name="Main Home"
                component={HomeScreen}
            />
            <HomeStack.Screen 
                name="BusArrival"
                component={BusArrivalScreen}
            />
        </HomeStack.Navigator>


    )
}