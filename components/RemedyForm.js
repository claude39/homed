import React, { Component } from 'react'
import { Dimensions, View, TouchableOpacity, Text, TextInput, Image } from 'react-native'
const { height } = Dimensions.get('screen')
import { ImagePicker, Permissions } from 'expo'
import firebaseService from '../firebase'
import { Actions, ActionConst } from 'react-native-router-flux'

class RemedyForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            pleaseWait: false
        }

        this.handleName = (name) => {
            this.setState({ name: name })
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
                    await firebaseService.database().ref('remedies').push({ name: this.state.name, imageurl: url }, snap => {
                        this.setState({ pleaseWait: false })
                        Actions.adminhome()
                    })
                })
            })
        }
    }


    render() {
        return (
            <View style={{ paddingTop: 50 }}>
                {
                    this.state.pleaseWait && <View style={{ paddingTop: height / 2, alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                            PLEASE WAIT
                    </Text>
                    </View>
                }
                {
                    !this.state.pleaseWait && <View>
                        <View style={{ alignContent: 'center', alignItems: 'center', backgroundColor: '#3B5323' }}>
                            <Text style={{ fontSize: 30, color: 'white' }}>ADD REMEDY</Text>
                        </View>
                        <View>
                            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={this.pickImage}>
                                    <Image
                                        source={this.state.image ? { uri: this.state.image } : require('../imgs/empty.png')}
                                        style={{ height: 300, width: 300 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={{
                                    backgroundColor: '#ffffff',
                                    height: 40,
                                    margin: 30,
                                    borderRadius: 5,
                                    padding: 3,
                                }}
                                placeholder={'Name'}
                                returnKeyType='next'
                                onChangeText={this.handleName}
                                value={this.state.name}
                                underlineColorAndroid={'transparent'} />
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
                    </View>
                }
            </View>
        )
    }
}

export default RemedyForm