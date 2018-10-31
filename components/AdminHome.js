import React, { Component } from 'react'
import { Dimensions, View, TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
const { height } = Dimensions.get('screen')
class AdminHome extends Component {

    render() {
        return (
            <View style={{ paddingTop: height / 3 }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#3B5323',
                        height: 40,
                        margin: 10,
                        borderRadius: 5,
                        padding: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} onPress={() => Actions.remedyform()}>
                        <Text style={
                            {
                                color: '#ffffff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }
                        }>Add Remedy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#3B5323',
                        height: 40,
                        margin: 10,
                        borderRadius: 5,
                        padding: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={
                            {
                                color: '#ffffff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }
                        }>Add Illness</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default AdminHome