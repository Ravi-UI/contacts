import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import TrashIcon from '../../assets/icons/delete_icon.svg';
import PhoneIcon from '../../assets/icons/phone_icon.svg';

const Contact = (props) => {
    const { item, height, handleItemPress } = props;

    const username = item.name.split(" ");
    const firstLetter = username[0] ? username[0].charAt(0) : "";
    const lastLetter = username[1] ? username[1].trim().charAt(0) : username[0].trim().charAt(username[0].length - 1);
    return <TouchableOpacity activeOpacity={handleItemPress ? 0.5 : 1} onPress={() => handleItemPress ? handleItemPress(item) : null}>
        <View style={[styles.itemRow, { height: (height / 5) - 60, flexDirection: "row", alignItems: "center" }]}>
            <View style={{ width: 50, height: 50, backgroundColor: "#DEBCC6", borderRadius: 50, alignItems: "center", justifyContent: "center", marginRight: 8 }}>
                <Text>{firstLetter}{lastLetter}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text>{item.name}</Text>
                <Text><PhoneIcon width={18} height={18} /> {item.phone}</Text>
            </View>
            <TouchableOpacity>
                <TrashIcon width={32} height={22} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
}

export default Contact;


const styles = StyleSheet.create({
	itemRow: {
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
		marginBottom: 20,
		marginHorizontal: 15,
		borderRadius: 8,
		padding: 15
	}
})