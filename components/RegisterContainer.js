import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import firebaseService from '../firebase'

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handlePass = (password) => {
            this.setState({ password: password })
        }

        this.handleUsername = (username) => {
            this.setState({ username: username })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignContent: 'center', alignSelf: 'center' }}>
                    <Text style={styles.pageText}>
                        Registration
                                </Text>
                </View>
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
                    let user = {
                        username: this.state.username,
                        password: this.state.password
                    }

                    firebaseService.database().ref('users').push(user, snap => {
                        console.log(snap)
                    })
                }
                }>
                    <Text style={styles.buttonTitle}> Submit </Text>
                </TouchableOpacity>
            </View >
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        margin: 10,
    },
    title: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: 25,
        margin: 10,
    },
    pageText: {
        color: '#3B5323',
        fontSize: 50
    }
})

export default FormComponent