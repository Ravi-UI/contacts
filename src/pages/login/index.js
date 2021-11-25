import React from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal, SafeAreaView, FlatList, Alert } from 'react-native'
import Button from '../../components/button';
import { Colors, Size } from '../../app-config';
import Loader from '../../components/loader';
import GroupIcon from '../../assets/icons/groups_icon.svg';
import InfoIcon from '../../assets/icons/info_icon.svg';
import BackIcon from '../../assets/icons/arrow-left-line.svg';
import Contact from './contactItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';
const { width, height } = Dimensions.get('window');

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
			page: 0,
			isLoading: false,
			deviceContacts: [],
			isModalVisible: false,
		}
	}
	componentDidMount() {
		AsyncStorage.setItem("contacts", JSON.stringify(initialContacts));
		this.handleLoadContacts();
		Contacts.getAll().then(results => {
			this.setState({
				deviceContacts: results.map(el => ({ name: `${el.familyName} ${el.givenName}`, recordID: el.recordID, phone: el.phoneNumbers[0].number }))
			}, () => {
				console.log(this.state.deviceContacts)
			})
			console.log(results)
			// contacts returned
		})
	}
	toggleModal = () => {
		this.setState((prevState) => {
			return { isModalVisible: !prevState.isModalVisible }
		})
	}
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
	onEndReached = () => {
		if (!this.onEndReachedCalledDuringMomentum) {
			this.handleLoadContacts();
			this.onEndReachedCalledDuringMomentum = true;
		}
	}
	renderItem = ({ item }) => {
		return <Contact item={item} height={height} />
	}
	renderItemContact = ({ item }) => {
		return <Contact item={item} height={height - 200} handleItemPress={this.handleItemPress} />
	}
	handleItemPress = (item) =>{
		const { allContacts, contacts } = this.state;
		const itemInList = allContacts.filter(el => el.name === item.name);
		if(itemInList.length > 0){
			Alert.alert("Team", "Contact Already availble in Team.")
		}else{
			const temp = [...allContacts, ...[item]];
			AsyncStorage.setItem('contacts', JSON.stringify(temp));
			this.setState((prevState) => {
				return {contacts: [...prevState.contacts, ...[item]], allContacts: [...prevState.allContacts, ...[item]]}
			})
			this.toggleModal();
		}
	}
 	render() {
		const { isLoading, contacts, isModalVisible, deviceContacts } = this.state;
		return (
			<SafeAreaView>
			<View contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.baseTheme }} keyboardShouldPersistTaps={"always"}>
				{isLoading ? <Loader /> : null}
				<View style={styles.container} >
					<View>
						<View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
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
							removeClippedSubviews={true}
							enableEmptySections={true}
							onEndReached={this.onEndReached}
							onEndReachedThreshold={0.001}
							onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
							style={{ height: height - 210 }}
						/>
						<Button
							label={"Add Members"}
							type={"secondary"}
							style={{ width: 200, marginTop: 20 }}
							onPress={this.toggleModal} />
					</View>
				</View>
				<Modal
					animationType="slide"
					visible={isModalVisible}
					onRequestClose={() => {
						this.toggleModal()
					}}
				>
					<View style={{ flexDirection: "row", padding: 15, marginTop: 30}}>
						<TouchableOpacity onPress={this.toggleModal} >
						<BackIcon />
						</TouchableOpacity>
						<Text style={styles.headingText}>Add Contacts</Text>
					</View>
					<FlatList
							data={deviceContacts}
							getItemLayout={(data, index) => ({
								length: height / 8,
								offset: height / 8 * index,
								index
							})}
							renderItem={this.renderItemContact}
							keyExtractor={item => `${item.phone}_${item.name}`}
							initialNumToRender={5}
							maxToRenderPerBatch={5}
							removeClippedSubviews={true}
							enableEmptySections={true}
							// onEndReached={this.onEndReached}
							onEndReachedThreshold={0.001}
							// onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
							style={{ height: height - 210 }}
						/>
				</Modal>
			</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.baseTheme,
		justifyContent: 'space-between',
		height: '100%',
		paddingTop: 20
	},
	headingText: {
		color: Colors.primaryColor,
		fontSize: 24,
		marginBottom: 12,
		marginHorizontal: 12,
		flex: 1
	},
	paragraphText: {
		fontSize: 12,
		color: Colors.whiteColor,
		letterSpacing: 0.6
	},
	flexRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	marginBottom40: {
		marginBottom: 41
	},
	linkStyle: {
		fontSize: Size.size14,
		color: Colors.primaryColor,
		textTransform: 'uppercase',
		letterSpacing: 0.7
	},
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
export default TeamScreen;