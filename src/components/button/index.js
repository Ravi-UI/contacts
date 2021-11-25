import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../app-config';

export default (props) => {
	return <TouchableOpacity style={[styles.buttonStyle, props.type==="secondary" && styles.secondaryButton, props.type==="teritary" && styles.teritaryButton, props.style && props.style]} onPress={props.onPress} activeOpacity={props.activeOpacity}>
	<Text style={[styles.buttonTextStyle]}>{props.label}</Text>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	buttonStyle: {
		width: '100%',
		height: 40,
		backgroundColor: Colors.primaryColor,
		borderRadius: 40,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
		borderColor: Colors.primaryColor,
		alignSelf: "center"
	},
	secondaryButton: {
		backgroundColor: Colors.secondaryColor,
	},
	buttonTextStyle: {
		color: Colors.whiteColor,
	},
	secondaryButtonTextStyle: {
		color: Colors.greenColor2,
	},
	teritaryButton: {
		backgroundColor: Colors.greenColor,
		borderColor: Colors.greenColor
	},
})

