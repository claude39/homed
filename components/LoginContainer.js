import React, { Component } from 'react';
import { ScrollView, Dimensions, View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native'
import logo from '../imgs/icon.png'
import { Actions, ActionConst } from 'react-native-router-flux'
const { height, width } = Dimensions.get('screen')
import firebaseService from '../firebase'

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            show: false,
            exist: null,
            buttonClicked: false
        }

        this.handlePass = (password) => {
            this.setState({ password: password })
        }

        this.handleUsername = (username) => {
            this.setState({ username: username })
        }

        this.checkAccount = async () => {
            await firebaseService.database().ref().child('users').orderByChild('username').equalTo(this.state.username).on('value', snap => {
                if (snap.exists()) {
                    let user = Object.keys(snap.val()).map(key => {
                        let user = snap.val()[key]
                        user.id = key
                        return user
                    })[0]
                    if (user.password === this.state.password) {
                        this.setState({ exist: true })
                        Actions.home({ user: user })
                    } else {
                        this.setState({ exist: false })
                    }
                } else {
                    this.setState({ exist: false })
                }
            })
        }
    }

    render() {
        return (
            <ScrollView style={{ paddingTop: '20%' }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', paddingTop: 30 }}>

                        <Image
                            source={logo}
                            style={{
                                flex: 1,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                    {
                        this.state.exist === false && this.state.buttonClicked && <View style={{ alignContent: 'center', alignItems: 'center', backgroundColor: '#cc0000' }}>
                            <Text style={{ color: 'white' }}>Username/Password doesn't exist</Text>
                        </View>
                    }
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Username'}
                        returnKeyType='next'
                        autoCapitalize='none'
                        onChangeText={this.handleUsername}
                        value={this.state.username}
                        underlineColorAndroid={'transparent'} />

                    <TextInput
                        style={styles.textInput}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        returnKeyType='done'
                        onChangeText={this.handlePass}
                        value={this.state.password}
                        underlineColorAndroid={'transparent'} />

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.checkAccount()
                        this.setState({ buttonClicked: true })
                    }}>
                        <Text style={styles.buttonTitle}> Sign in </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => Actions.register()}>
                        <Text style={styles.buttonTitle}> Register </Text>
                    </TouchableOpacity>
                </View >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    textInput: {
        backgroundColor: '#ffffff',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3,
    },
    button: {
        backgroundColor: '#3B5323',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
    }
    ,
    title: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: 25,
        margin: 10,
    }
})

export default FormComponent
