import React from 'react'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, FlatList, Alert, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectContactPhone } from 'react-native-select-contact';
// Components
import Button from '../../components/button';
// Utils
import { Colors } from '../../app-config';
import Contact from './contactItem';
// Icons
import GroupIcon from '../../assets/icons/groups_icon.svg';
import InfoIcon from '../../assets/icons/info_icon.svg';;
// Global 
const { height } = Dimensions.get('window');

const initialContacts = [
	{ name: "Test1", phone: "9999999999" },
	{ name: "Test2", phone: "9999999998" },
	{ name: "ATest3", phone: "9999999997" },
	{ name: "BTest4", phone: "9999999996" },
	{ name: "CTest5", phone: "9999999995" },
	{ name: "DTest6", phone: "9999999994" },
	{ name: "ETest7", phone: "9999999993" },
	{ name: "FTest8", phone: "9999999992" },
	{ name: "GTest9", phone: "9999999991" },
	{ name: "HTest10", phone: "9999999990" },
	{ name: "ITest11", phone: "9999999981" },
	{ name: "JTest12", phone: "9999999982" },
	{ name: "KTest13", phone: "9999999983" },
	{ name: "LTest14", phone: "9999999984" },
	{ name: "MTest15", phone: "9999999985" },
	{ name: "NTest16", phone: "9999999986" },
	{ name: "OTest17", phone: "9999999987" },
	{ name: "PTest18", phone: "9999999988" },
	{ name: "QTest19", phone: "9999999989" },
	{ name: "RTest20", phone: "9999999970" }
];

class TeamScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			allContacts: [],
			size: 5,
			page: 0
		}
	}

	componentDidMount() {
		AsyncStorage.setItem("contacts", JSON.stringify(initialContacts));
		// <--- load initial team member list
		this.handleLoadContacts();
		if (Platform.OS === 'android') {
			// <--- Asking permission for android to access contact
			PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
				{
					'title': 'Contacts',
					'message': 'This app would like to view your contacts.',
					'buttonPositive': 'Please accept bare mortal'
				}
			)
		}
	}

	// <--- show / hide device contact list modal
	toggleModal = () => {
		this.setState((prevState) => {
			return { isModalVisible: !prevState.isModalVisible }
		})
	}

	// <--- loading team member list for both iitial and pagination
	handleLoadContacts = () => {
		const { size, page, contacts } = this.state;
		AsyncStorage.getItem('contacts').then(res => {
			if (res && JSON.parse(res).length > contacts.length) {
				this.setState((prevState) => {
					return {
						contacts: [...prevState.contacts, ...JSON.parse(res).slice(page * size, (page + 1) * size)],
						allContacts: JSON.parse(res),
						page: prevState.page + 1
					}
				})
			}
		})
	}

	// <--- on end reached below method will trigger
	onEndReached = () => {
		if (!this.onEndReachedCalledDuringMomentum) {
			this.handleLoadContacts();
			this.onEndReachedCalledDuringMomentum = true;
		}
	}

	// <--- render item for the teammember list
	renderItem = ({ item, index }) => {
		return <Contact index={index} item={item} height={height} hasDelete />
	}

	// <--- add contact to the team list
	handleItemPress = (item) => {
		const { allContacts } = this.state;
		const itemInList = allContacts.filter(el => el.name === item.name);
		if (itemInList.length > 0) {
			Alert.alert("Team", "Contact Already availble in Team.")
		} else {
			const temp = [...allContacts, ...[item]];
			AsyncStorage.setItem('contacts', JSON.stringify(temp));
			this.setState((prevState) => {
				return { contacts: [...prevState.contacts, ...[item]], allContacts: [...prevState.allContacts, ...[item]] }
			})
			this.toggleModal();
		}
	}

	// <--- Show add contact screen
	handleLoadDeviceContacts = () => {
		return selectContactPhone()
			.then(selection => {
				if (!selection) {
					return null;
				}
				const { contact, selectedPhone } = selection;
				this.handleItemPress({ name: contact.name, phone: selectedPhone.number, id: contact.recordId })
				return selectedPhone.number;
			});
	}
	render() {
		const { contacts } = this.state;
		return (
			<SafeAreaView>
				<>
					<View style={styles.container} >
						<View style={styles.headingWrap}>
							<GroupIcon />
							<Text style={styles.headingText}>Team Members</Text>
							<InfoIcon />
						</View>
						<FlatList
							data={contacts}
							extraData={contacts}
							getItemLayout={(data, index) => ({
								length: height / 8,
								offset: height / 8 * index,
								index
							})}
							renderItem={this.renderItem}
							keyExtractor={item => `${item.phone}_${item.name}`}
							initialNumToRender={5}
							maxToRenderPerBatch={5}
							removeClippedSubviews
							enableEmptySections
							onEndReached={this.onEndReached}
							onEndReachedThreshold={0.001}
							onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
							style={{ height: height - 210 }}
						/>
						<Button
							label="Add Members"
							type="secondary"
							style={{ width: 200, marginTop: 20 }}
							onPress={this.handleLoadDeviceContacts} />
					</View>
				</>
			</SafeAreaView>
		)
	}
}

// StyleSheet
const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.baseTheme,
		justifyContent: 'space-between',
		height: '100%',
		paddingTop: 20
	},
	headingWrap: {
		flexDirection: "row",
		paddingHorizontal: 20
	},
	headingWrapSecodary: {
		flexDirection: "row",
		// padding: 15,
		marginTop: 30
	},
	headingText: {
		color: Colors.primaryColor,
		fontSize: 24,
		marginBottom: 12,
		marginHorizontal: 12,
		flex: 1
	}
})

export default TeamScreen;