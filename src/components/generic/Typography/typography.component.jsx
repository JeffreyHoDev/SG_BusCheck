import styled from "styled-components/native";
import { Text } from 'react-native'

export const VeryLargeTitle = styled(Text)`
    font-size: ${props => props.theme.sizes.veryLarge};
`

export const LargeTitle = styled(Text)`
    font-size: ${props => props.theme.sizes.large};
`

export const SubInfo = styled(Text)`
    font-size: ${props => props.theme.sizes.semiMedium};
`

export const Subtitle = styled(Text)`
    font-size: ${props => props.theme.sizes.medium};
`

export const Caption = styled(Text)`
    font-size: ${props => props.theme.sizes.small};
`
