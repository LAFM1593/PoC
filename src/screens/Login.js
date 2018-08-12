import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';

import Environment from '../../Environment';

export default class Login extends Component {

    state = {
        usuario: '',
        contrasenia: '',
        isLoggingIn: false,
        message: ''
    }

    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            usuario: this.state.usuario,
            contrasenia: this.state.contrasenia,
            grant_type: 'password'
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("");

        var proceed = false;
        fetch(Environment.CLIENT_API_LOGIN, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.status) proceed = true;
                else this.setState({ message: response.message });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.onLoginPress();
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
			});
    }

    clearUsername = () => {
        this._usuario.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._contrasenia.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
				<Text 
					style={{fontSize: 27}}>
					Login
				</Text>
				<TextInput
					ref={component => this._usuario = component}
					placeholder='Usuario' 
					onChangeText={(usuario) => this.setState({usuario})}
					autoFocus={true}
					onFocus={this.clearUsername}
				/>
				<TextInput 
					ref={component => this._contrasenia = component}
					placeholder='Contraseña' 
					onChangeText={(contrasenia) => this.setState({contrasenia})}
					secureTextEntry={true}
					onFocus={this.clearPassword}
					onSubmitEditing={this._userLogin}
				/>
				{!!this.state.message && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.message}
					</Text>
				)}
				{this.state.isLoggingIn && <ActivityIndicator />}
				<View style={{margin:7}} />
				<Button 
					disabled={this.state.isLoggingIn||!this.state.usuario||!this.state.contrasenia}
		      		onPress={this._userLogin}
		      		title="Submit"
		      	/>
	      </ScrollView>
        )
    }
}

