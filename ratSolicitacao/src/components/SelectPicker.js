import React, { Component } from 'react'
import Picker from '@react-native-community/picker'
import Bootstrap from '../lib/Bootstrap'
import { showError, showSuccess, url } from '../api/api'


export default class SelectPicker extends Component {



    render() {
        var options = {
            "1": "Home",
            "2": "Food",
            "3": "Car",
            "4": "Bank",
        };

        <Picker
            style={Bootstrap.styles.formControl}
            mode="dropdown"
            selectedValue="Selecione algo"
            onValueChange={() => { }}>
            {Object.keys(options).map((key) => {
                return (<Picker.Item label={options[key]} value={key} key={key} />) //if you have a bunch of keys value pair
            })}
        </Picker>
    }

}