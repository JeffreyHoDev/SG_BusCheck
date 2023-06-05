import { View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-paper';
import { Linking } from 'react-native'
import styled from 'styled-components/native';

const AboutAppView = styled(View)`
    display: flex;
    align-items: center;
    height: 98%;
    padding: ${props => props.theme.space.large};
`

export const AboutScreen = () => {
    return (
        <AboutAppView>
            <Text variant="headlineMedium">About SGBus_Check</Text>
            <ScrollView>
                <Text variant="bodyMedium">
                <Text variant="labelLarge">     SGBus_Check</Text> is a passion project developed by <Text variant="labelLarge">Jeffrey Ho Kah Wai</Text>. This app is a result of my personal interest in providing conveniency to Users. It is important to note that SGBus_Check is purely a hobby project and is not associated with any professional organization or company.
                    <Text>{`\n`}</Text>
                    <Text>{`\n`}</Text>
                    <Text variant="titleMedium">Data Sources: <Text variant="labelLarge" onPress={() => Linking.openURL('https://datamall.lta.gov.sg/content/datamall/en.html')} style={{textDecorationLine: 'underline'}}>LTA DATAMALL</Text></Text>
                    <Text>{`\n`}</Text>
                    <Text>{`\t\t`}</Text>The data used in SGBus_Check is provided by third-party sources. We strive to ensure the accuracy and reliability of the data, but please note that we do not have direct control over its content or updates. Therefore, we cannot guarantee its complete accuracy or real-time availability. We encourage users to verify the information provided through additional reliable sources whenever necessary.
                    <Text>{`\n`}</Text>
                    <Text>{`\n`}</Text>
                    <Text variant="titleMedium">Usage and Liability:</Text>
                    <Text>{`\n`}</Text>
                    <Text>{`\t\t`}</Text>SGBus_Check is intended for informational purposes only. While we make every effort to provide accurate and up-to-date information, we cannot be held responsible for any errors, omissions, or damages resulting from the use or misuse of the information presented in the app. Users are advised to exercise their own judgment and discretion when relying on the app's content.
                    <Text>{`\n`}</Text>
                    <Text>{`\n`}</Text>
                    <Text variant="titleMedium">Feedback and Support:</Text>
                    <Text>{`\n`}</Text>
                    <Text>{`\t\t`}</Text>As a hobby project, SGBus_Check is not officially supported or maintained. However, I am open to feedback, suggestions, and bug reports from users. You can reach out to me via <Text variant="labelLarge" onPress={() => Linking.openURL('mailto:jeffreyhodev@gmail.com')} style={{textDecorationLine: 'underline'}}>jeffreyhodev@gmail.com</Text> if you have any inquiries or feedback regarding the app.
                    <Text>{`\n`}</Text>
                    <Text>{`\n`}</Text>
                    <Text>{`\t\t`}</Text>Thank you for using <Text variant="labelLarge">SGBus_Check</Text> and being part of this hobby project!
                </Text>
            </ScrollView>
        </AboutAppView>
    )
}