import React from 'react'
import { TextInput, View } from 'react-native'
import Bootstrap from './lib/Bootstrap'

export default props => {
    return (
        <TextInput
            placeholder={props.placeholder}
            style={[Bootstrap.styles.formControl, Bootstrap.styles.h3]}
        />
    )
}