import React from 'react'
import { View, Image, Text, ScrollView, FlatList } from 'react-native'

const DataViewer = props => (
    <ScrollView>
        <Image
            style={{ height: 300, width: '100%' }}
            source={{ uri: props.item.imageurl }}
        />
        {
            props.illness && <View>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        {props.item.name}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Description:
            </Text>
                    <Text>
                        {props.item.description}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Causes:
            </Text>
                    <Text>
                        {props.item.causes}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Remedies:
            </Text>
                    <FlatList
                        data={props.item.remedies}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {item.name}
                                    </Text>
                                    <Text>Procedure: {item.procedure}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        }
        {
            !props.illness && <View>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                        {props.item.name}
                    </Text>
                </View>
            </View>
        }

    </ScrollView>
)

export default DataViewer

console.disableYellowBox = true