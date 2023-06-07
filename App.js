import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons"

import { SafeAreaAppView } from './src/components/safearea/safeareaview.component';
import { HomeNavigator } from './src/navigators/home.navigator';
import { FavouritesScreen } from './src/screens/favourites.screen';
import { SearchScreen } from './src/screens/search.screen'
import { AboutScreen } from './src/screens/about.screen';
import { theme } from './src/theme';

import { BusStopsContextProvider } from './src/contexts/busstops/busstops.context'
import { BusArrivalContextProvider } from './src/contexts/busarrival/busarrival.context'
import { LocationContextProvider } from './src/contexts/location/location.context'
import { FavouritesContextProvider } from './src/contexts/favourites/favourites.context';
import { RoutesContextProvider } from './src/contexts/routes/routes.context'

const iconDict = {
  "Home": "bus-outline",
  "Favourites": "heart-outline",
  "Search": "navigate-outline",
  "About": "information-circle-outline"
}

const customizeTabScreenOptions = (props) => {
  const { name } = props.route
  return {
    tabBarIcon: ({ color }) => <Ionicons name={iconDict[name]} size={24} color={color} />,
    tabBarActiveTintColor: theme.colors.focus,
    tabBarInactiveTintColor: theme.colors.idle,
    headerShown: false,
    tabBarStyle: {backgroundColor: theme.colors.main, marginTop: 2, paddingTop: 5, paddingBottom: 5},
    tabBarHideOnKeyboard: true
  }
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <LocationContextProvider>
          <BusStopsContextProvider>
              <FavouritesContextProvider>
                <BusArrivalContextProvider>
                  <RoutesContextProvider>
                    <SafeAreaAppView>
                      <NavigationContainer>
                        <Tab.Navigator screenOptions={customizeTabScreenOptions}>
                          <Tab.Screen name="Home" component={HomeNavigator} />
                          <Tab.Screen name="Favourites" component={FavouritesScreen} />
                          <Tab.Screen name="Search" options={{tabBarLabel: 'Service Route'}} component={SearchScreen} />
                          <Tab.Screen name="About" component={AboutScreen} />
                        </Tab.Navigator>
                      </NavigationContainer>
                      <ExpoStatusBar style="auto"/>
                    </SafeAreaAppView>
                  </RoutesContextProvider>
                </BusArrivalContextProvider>
              </FavouritesContextProvider>
          </BusStopsContextProvider>
        </LocationContextProvider>
    </ThemeProvider>
  );
}

