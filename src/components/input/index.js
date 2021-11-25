import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { Colors, Size } from '../../app-config';

export default (props) => {
	return <View style={styles.inputWrapper}>
    <Text style={styles.placeholderStyle}>{props.label}</Text>
    <TextInput 
        value={props.value} 
        style={styles.inputStyle} 
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.borderColor}
        onChangeText={(text) => props.handleChangeText(text, props.name)}
        editable={!props.disabled}
        />
</View>
}

const styles = StyleSheet.create({
	inputWrapper: {
		width: '100%',
        marginBottom: 20
	},
	inputStyle: {
        borderWidth: 1,
		color: Colors.whiteColor,
		height: 40,
        borderColor: Colors.borderColor,
        paddingHorizontal: 15,
        paddingVertical: 4
	},
    placeholderStyle: {
        color: Colors.grayDarkColor,
        fontSize: Size.size12,
        marginBottom: 12
    }
})