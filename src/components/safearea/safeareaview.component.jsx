import React from 'react'
import styled from 'styled-components/native'
import { Platform, StatusBar, SafeAreaView } from 'react-native';

export const SafeAreaAppView = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${Platform.OS === 'android' ? `${StatusBar.currentHeight}px` : 0}
`