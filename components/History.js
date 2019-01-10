import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import firebaseService from '../firebase'



class History extends Component {


    state = {
        illnesses: [],
        remedies: []
    }
    async componentWillMount() {
        await firebaseService.database().ref(`users/${this.props.id}/history`).on('value', snap => {
            let snapval = snap.val()
            let illnesses = Object.keys(snapval).filter(key => snapval[key].type === 'illness').map(ik => snapval[ik])
            let remedies = Object.keys(snapval).filter(key => snapval[key].type === 'remedy').map(rk => snapval[rk])

            this.setState({ remedies: remedies })
            this.setState({ illnesses: illnesses })
        }
        )
    }

    render() {
        return (
            <View>
                <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 30 }}>
                        History
        </Text>
                </View>
                {this.state.illnesses && <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                        Illnesses:
        </Text>
                    <FlatList
                        data={this.state.illnesses}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => Actions.dataviewer({ illness: true, item: item })}>
                                        <Text style={{ fontSize: 20 }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                </View>)
                        }}
                    />
                </View>
                }
                {this.state.remedies && <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                        Remedies:
        </Text>
                    <FlatList
                        data={this.state.remedies}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (
                                <View>
                                    <TouchableOpacity onPress={() => Actions.dataviewer({ item: item })}>
                                        <Text style={{ fontSize: 20 }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    /></View>
                }
            </View>
        )

    }
}
export default History

console.disableYellowBox = true