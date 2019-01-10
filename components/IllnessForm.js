import React, { Component } from 'react'
import { Text, Dimensions, TextInput, View, TouchableOpacity, Image, ScrollView, FlatList, Alert, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
const { height } = Dimensions.get('screen')
import firebaseService from '../firebase'
import { Actions } from 'react-native-router-flux'
import { Permissions, ImagePicker } from 'expo'
class IllnessForm extends Component {

    constructor() {
        super()
        this.state = {
            remedies: [],
            name: '',
            description: '',
            selected: [],
            somethingClicked: false,
            image: '',
            pleaseWait: false,
            causes: ''
        }

        this.handleName = (name) => {
            this.setState({ name: name })
        }

        this.handleDescription = (description) => {
            this.setState({ description: description })
        }

        this.handleCauses = (causes) => {
            this.setState({ causes: causes })
        }

        this.pickImage = async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
                if (!result.cancelled) {
                    this.setState({ image: result.uri })
                }
            }
        }

        this.sendToFirebase = async () => {
            this.setState({ pleaseWait: true })
            const response = await fetch(this.state.image)
            const blob = await response.blob()

            await firebaseService.storage().ref().child(`${this.state.name}`).put(blob).then(snap => {
                snap.ref.getDownloadURL().then(async url => {
                    await firebaseService.database().ref('illnesses').push({
                        name: this.state.name,
                        causes: this.state.causes,
                        description: this.state.description,
                        remedies: this.getRemedies(),
                        imageurl: url
                    }, snap => {
                        this.setState({ pleaseWait: false })
                        Actions.adminhome()
                    })
                })
            })
        }

        this.getRemedies = () => {
            return this.state.remedies.filter(remedy => remedy.procedure !== '')
        }

        this.getRemediesFromFirebase = async () => {
            await firebaseService.database().ref('remedies').once('value', snap => {
                if (snap) {
                    let remedies = Object.keys(snap.val()).map(key => {
                        return { name: snap.val()[key].name, procedure: '' }
                    })
                    this.setState({ remedies: remedies })
                }
            })
        }
    }

    componentDidMount() {
        this.getRemediesFromFirebase()
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled >
                {
                    this.state.pleaseWait && <View style={{ paddingTop: height / 2, alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                            PLEASE WAIT
                    </Text>
                    </View>
                }
                {!this.state.pleaseWait && <ScrollView>
                    <View style={{ paddingTop: 50 }}>
                        <View style={{ alignContent: 'center', alignItems: 'center', backgroundColor: '#3B5323' }}>
                            <Text style={{ fontSize: 30, color: 'white' }}>ADD ILLNESS</Text>
                        </View>
                        <View style={{ alignContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.pickImage}>
                                <Image
                                    source={this.state.image ? { uri: this.state.image } : require('../imgs/empty.png')}
                                    style={{ height: 200, width: 200 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{
                                backgroundColor: '#ffffff',
                                height: 40,
                                margin: 10,
                                borderRadius: 5,
                                padding: 3,
                            }}
                            placeholder={'Name'}
                            returnKeyType='next'
                            onChangeText={this.handleName}
                            value={this.state.name}
                            underlineColorAndroid={'transparent'} />
                        <TextInput
                            style={{
                                backgroundColor: '#ffffff',
                                height: 40,
                                margin: 10,
                                borderRadius: 5,
                                padding: 3,
                            }}
                            placeholder={'Description'}
                            returnKeyType='next'
                            onChangeText={this.handleDescription}
                            value={this.state.description}
                            underlineColorAndroid={'transparent'} />
                        <TextInput
                            style={{
                                backgroundColor: '#ffffff',
                                height: 40,
                                margin: 10,
                                borderRadius: 5,
                                padding: 3,
                            }}
                            placeholder={'Causes'}
                            returnKeyType='next'
                            onChangeText={this.handleCauses}
                            value={this.state.causes}
                            underlineColorAndroid={'transparent'} />
                        <ScrollView>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Choose Remedy/ies:</Text>
                                <View>
                                    <FlatList
                                        data={this.state.remedies}
                                        renderItem={({ item, index }) => {
                                            return (<View >
                                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                                <TextInput
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#ffffff',
                                                        height: 40,
                                                        margin: 10,
                                                        borderRadius: 5,
                                                        padding: 3,
                                                    }}
                                                    value={this.state.remedies[index].procedure}
                                                    onChangeText={async (text) => {
                                                        let remediesCopy = await JSON.parse(await JSON.stringify(this.state.remedies))
                                                        remediesCopy[index].procedure = await text
                                                        await this.setState({ remedies: remediesCopy })
                                                    }}
                                                    placeholder={'Procedure'}
                                                />
                                            </View>)
                                        }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={{
                            backgroundColor: '#3B5323',
                            height: 40,
                            margin: 10,
                            borderRadius: 5,
                            padding: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={this.sendToFirebase}>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>}
            </KeyboardAvoidingView  >
        )
    }
}

export default IllnessForm
