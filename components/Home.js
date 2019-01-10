import React, { Component } from 'react';
import { ScrollView, DrawerLayoutAndroid, Dimensions, View, Alert, TextInput, TouchableOpacity, Text, Image, StyleSheet, FlatList, ListView } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import logo from '../imgs/icon.png'
import firebaseService from '../firebase'
const { height, width } = Dimensions.get('screen')


class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: [],
            searchtext: '',
            illnesses: [],
            remedies: []
        }

        this.handleSearch = searchtext => {
            this.setState({ searchtext: searchtext })
            let all = []
            const newData = all.concat(this.state.remedies, this.state.illnesses).filter((item, index) => {
                return item.name.toLowerCase().indexOf(searchtext.toLowerCase()) > -1
            })
            this.setState({ result: newData })
        }

        this.pushToHistory = async (item) => {
            await firebaseService.database().ref(`users/${this.props.user.id}/history`).push(item)
        }
    }


    componentWillMount() {
        firebaseService.database().ref('illnesses').on('value', snap => {
            let illnesses = Object.keys(snap.val()).map(key => snap.val()[key])
            this.setState({ illnesses: illnesses })
        })
        firebaseService.database().ref('remedies').on('value', snap => {
            let remedies = Object.keys(snap.val()).map(key => snap.val()[key])
            this.setState({ remedies: remedies })
        })
    }

    render() {
        var navigationView = (
            <View style={{ paddingTop: 30, flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ margin: 10, fontSize: 20, textAlign: 'left' }}>Welcome {this.props.user.username}!</Text>
                <View style={{ paddingTop: 20, alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.history({ id: this.props.user.id })}><Text style={{ fontSize: 20, color: '#3B5323' }}>History</Text></TouchableOpacity>
                </View>
                <View style={{ paddingTop: 20, alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.login({ type: ActionConst.RESET })}><Text style={{ fontSize: 20, color: '#3B5323' }}>Logout</Text></TouchableOpacity>
                </View>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={
                    {
                        paddingTop: 30,
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }
                }>
                    <View style={{ flexDirection: 'row', height: 90 }}>
                        <View style={{ flexDirection: 'column', width: 100 }}>
                            <Image
                                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                                source={logo}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center' }}>
                                <Text >HoMed: Home Remedies for Upper </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center' }}>
                                <Text>Respiratory Illness Symptoms </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{
                                        height: 40,
                                        backgroundColor: '#ffffff',
                                        borderRadius: 5,
                                        fontSize: 15,
                                        width: 200
                                    }}
                                    placeholder={'Search'}
                                    autoCapitalize='none'
                                    onChangeText={text => this.handleSearch(text)}
                                    value={this.state.searchtext}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 200, alignContent: 'center', alignSelf: 'center' }}>
                        {(this.state.searchtext === '') && <View>
                            <View>
                                <View style={{ flexDirection: 'row', height: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>SYMPTOMS</Text>
                                </View>
                                <FlatList
                                    data={this.state.illnesses}
                                    horizontal={true}
                                    renderItem={({ item, index }) => (
                                        <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                                            <TouchableOpacity key={index} style={{ margin: 5 }} onPress={() => {
                                                item.type = 'illness'
                                                this.pushToHistory(item)
                                                Actions.dataviewer({ item: item, illness: true })
                                            }}>
                                                <Image
                                                    source={{ uri: item.imageurl }}
                                                    style={{
                                                        resizeMode: 'contain',
                                                        height: 100,
                                                        width: 100,
                                                    }}
                                                />
                                                <Text style={{ fontSize: 21 }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', height: 30 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>REMEDIES</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: 200 }}>
                                <FlatList
                                    data={this.state.remedies}
                                    horizontal={true}
                                    renderItem={({ item, index }) => (
                                        <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                                            <TouchableOpacity key={index} style={{ margin: 5 }} onPress={() => {
                                                item.type = 'remedy'
                                                this.pushToHistory(item)
                                                Actions.dataviewer({ item: item })
                                            }}>
                                                <Image
                                                    source={{ uri: item.imageurl }}
                                                    style={{
                                                        resizeMode: 'contain',
                                                        height: 100,
                                                        width: 100,
                                                    }}
                                                />
                                                <Text style={{ fontSize: 21 }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View></View>}

                        {
                            (this.state.searchtext !== '') && <View style={{ height: '100%' }}>
                                <View style={{ flexDirection: 'row', height: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Search Result/s for "{this.state.searchtext}":</Text>
                                </View>
                                <View style={{ flexDirection: 'row', height: height, width: width, alignContent: 'center', alignSelf: 'center' }}>
                                    <ScrollView style={{ paddingTop: 50 }}>
                                        <FlatList
                                            data={this.state.result}
                                            horizontal={true}
                                            renderItem={
                                                ({ item, index }) => (
                                                    <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                                                        <TouchableOpacity key={index} style={{ margin: 5 }} onPress={() => {
                                                            if (item.remedies) {
                                                                item.type = 'illness'
                                                                this.pushToHistory(item)
                                                                Actions.dataviewer({ item: item, illness: true })

                                                            } else {
                                                                item.type = 'remedy'
                                                                this.pushToHistory(item)
                                                                Actions.dataviewer({ item: item })
                                                            }
                                                        }} >
                                                            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                                                <Image
                                                                    source={{ uri: item.imageurl }}
                                                                    style={{
                                                                        resizeMode: 'contain',
                                                                        height: 200,
                                                                        width: 200,
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                                                <Text style={{ fontSize: 21 }}>{item.name}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </DrawerLayoutAndroid>
        );
        // return (

        // );
    }
}

export default FormComponent

console.disableYellowBox = true