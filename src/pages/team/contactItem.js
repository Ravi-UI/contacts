import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TrashIcon from '../../assets/icons/delete_icon.svg';
import PhoneIcon from '../../assets/icons/phone_icon.svg';

const Contact = (props) => {
	const { item, height, handleItemPress, hasDelete } = props;
	//  <--- split contact name with whitespace
	const username = item.name.split(" ");
	//  <--- gettig first and last letter 
	const firstLetter = username[0] ? username[0].charAt(0) : "";
	const lastLetter = username[1] ? username[1].trim().charAt(0) : username[0].trim().charAt(username[0].length - 1);

	return <TouchableOpacity activeOpacity={handleItemPress ? 0.5 : 1} onPress={() => handleItemPress ? handleItemPress(item) : null}>
		<View style={[styles.itemRow, { height: (height / 5) - 60 }]}>
			<View style={styles.userAvatar}>
				<Text>{firstLetter}{lastLetter}</Text>
			</View>
			<View style={styles.flex1}>
				<Text>{item.name}</Text>
				<Text><PhoneIcon width={18} height={18} />{item.phone}</Text>
			</View>
			{hasDelete && <TouchableOpacity>
				<TrashIcon width={32} height={22} />
			</TouchableOpacity>}
		</View>
	</TouchableOpacity>
}

export default Contact;

Contact.propTypes = {
	item: PropTypes.object,
	height: PropTypes.number,
	hasDelete: PropTypes.bool,
	handleItemPress: PropTypes.func
}
// Default Value
Contact.defaultProps = {
	item: {},
	height: 70,
	hasDelete: false,
	handleItemPress: () => { },
};
const styles = StyleSheet.create({
	itemRow: {
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		elevation: 10,
		flexDirection: "row",
		marginBottom: 20,
		marginHorizontal: 15,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
	},
	userAvatar: {
		alignItems: "center",
		backgroundColor: "#DEBCC6",
		borderRadius: 50,
		height: 50,
		justifyContent: "center",
		marginRight: 8,
		width: 50,
	},
	flex1: {
		flex: 1
	}
})