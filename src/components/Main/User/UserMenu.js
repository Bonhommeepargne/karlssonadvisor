import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as fb from "./../../../firebase";
import Store from '../../../context';
import { Icon } from 'react-native-elements';
import context from "./../../../context";
import Loader from './../../Loader/Loader';

import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

export default function UserMenu() {

  const navigation = useNavigation();

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  const [data, setData] = useState([
    { id: 1, title: "Edit Profile", image: require('../../../../assets/icons/icons8-pencil-100.png'), link: 'ManageProfile' },
    { id: 2, title: "Subscription", image: require('../../../../assets/icons/icons8-membership-card-100.png'), link: 'Subscription' },
    // { id: 3, title: "Avatar", image: require('../../../../assets/icons/icons8-customer-100.png'), link: 'Avatar' },
    { id: 4, title: "Parameters", image: require('../../../../assets/icons/icons8-gear-100.png'), link: 'Parameters' },
    { id: 5, title: "WatchList", image: require('../../../../assets/icons/icons8-list-view-100.png'), link: 'WatchList' },
    { id: 6, title: "Chg. Password", image: require('../../../../assets/icons/icons8-key-100.png'), link: 'password' },
    { id: 7, title: "Logout", image: require('../../../../assets/icons/icons8-exit-100.png'), link: 'logout' },
  ]);

  const [firebaseError, setFirebaseError] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const user = useContext(context);

  async function navigatePage(link) {
    setFirebaseError('');
    switch (link) {
      case 'logout':
        fb.logout()
        break;
      case 'password':
        setFirebaseError(null);
        try {
          await fb.resetPassword(user.userInfo.email);
          setModalVisible((prev) => !prev);
        } catch (err) {
          console.error("Reset password Error", err);
          setFirebaseError('Retry later');
        }
        break;
      default:
        navigation.navigate(link)
    }
  }

  return (
    <Store.Consumer>
      {(store) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.cartouche}>
              <Text style={styles.nameUser}>{store.userInfo.fullname}</Text>
              <Text style={styles.info}>{store.userInfo.company ? store.userInfo.company.n : 'No company'}</Text>
              <Text style={styles.description}>{store.userInfo.position ? store.userInfo.position : 'No position'}</Text>
              <Text style={styles.subscription}>{store.userInfo.subscription ? store.userInfo.subscription : 'No subscription'}</Text>
            </View>
            <View style={styles.centeredView} >
              <Modal animationType='slide' transparent={true} visible={modalVisible} >
                <View style={[styles.centeredView, { marginTop: -100 }]} >
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Reset Password </Text>
                      <TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={() => setModalVisible((prev) => !prev)}>
                        <Icon name='close' />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={{ marginTop: 40, height: 120, fontSize: 17 }} >
                        Your Password has been reset.
                        Check your Email for instructions.
                  </Text>
                    </View >
                  </View>
                </View>
              </Modal>
            </View>

          </View>

          <View style={styles.FlatList}>
            <FlatList style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={data}
              horizontal={false}
              numColumns={2}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={() => { navigatePage(item.link) }}>
                    <View style={styles.cardFooter}></View>
                    <Image style={styles.cardImage} source={item.image} />
                    <View style={styles.cardHeader}>
                      <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }} />
          </View>

        </View>
      )}
    </Store.Consumer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A8712', //#86B206'
  },
  header: {
    height: 120,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  plan: {
    paddingTop: 10,
    paddingRight: 5
  },
  cartouche: {
    marginLeft: 7,
    paddingLeft: 16,
    marginTop: 5,
    marginBottom: 12
  },
  nameUser: {
    fontSize: 22,
    fontFamily: 'NSBold',
    color: "#FFF",
  },
  info: {
    fontSize: 16,
    color: "#6A8712",
    fontFamily: 'NSLight',
    color: "white",
    marginTop: 0
  },
  description: {
    fontSize: 16,
    fontFamily: 'NSLight',
    color: "white",
    marginTop: 0,
  },
  subscription: {
    fontSize: 16,
    fontFamily: 'NSBold',
    color: "black",
    marginTop: 0,
  },
  FlatList: {
    flex: 1,
    // borderTopColor: '#6A8712',
    // borderTopWidth: 10,
  },
  avatar: {
    width: 100,
    height: 90,
    // borderRadius: 63,
    // borderWidth: 4,
    // borderColor: "#6A8712",
    // margin: 10,
    // position: 'absolute',
    // backgroundColor: '#FFF'
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#F5F5F5'
  },
  listContainer: {
    alignItems: 'center'
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    borderRadius: 15,

    elevation: 6,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#696969",
    fontFamily: 'NSRegular'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
