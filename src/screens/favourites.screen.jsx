import React, { useContext } from 'react';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native'
import { FavouritesContext } from '../contexts/favourites/favourites.context';

import { FavouriteListItem } from '../components/favourite/favouritelistitem.component'

export const FavouritesScreen = ({ navigation }) => {

    const { favouritesList } = useContext(FavouritesContext)

    return (
        <List.Section title="My Favourites">
            <ScrollView>
                {
                    favouritesList.map((favourite, index) => {
                        return <FavouriteListItem key={`favourite-item-${index}`} navigation={navigation} favourite={favourite}/>
                    })
                }
            </ScrollView>
        </List.Section>
    )
}