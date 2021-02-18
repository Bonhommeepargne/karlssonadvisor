import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight ,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import NSLight from '../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

// Manage Logout function
import { logout } from '../../../firebase';

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
    { id: 4, title: "Notifications", image: require('../../../../assets/icons/icons8-notification-100.png'), link: 'Notifications' },
    { id: 5, title: "Logout", image: require('../../../../assets/icons/icons8-exit-100.png'), link: 'logout' },
    { id: 6, title: "WatchList", image: require('../../../../assets/icons/icons8-list-view-100.png'), link: 'WatchList' },
  ]);

  function navigatePage(link) {
    link != 'logout' ? navigation.navigate(link) : logout()
  }

  if (!loaded) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.cartouche}>
          <Text style={styles.nameUser}>Charles Granger de la Rosiere</Text>
          <Text style={styles.info}>TOTAL SA</Text>
          <Text style={styles.description}>Investor relation</Text>
          <Text style={styles.subscription}>Subscription: Free 3 months trial</Text>
        </View>
        {/* <TouchableOpacity style={styles.plan} onPress={() => (navigation.navigate('Subscription'))}>
          <Image style={styles.avatar} source={require('../../../../assets/icons/free.png')} />
        </TouchableOpacity> */}
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
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86B206'
  },
  header: {
    height: 120,
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
  },
  plan: {
    paddingTop: 10,
    paddingRight: 5
  },
  cartouche: {
    marginLeft:7,
    paddingLeft: 16,
    marginTop: 5,
    // borderLeftColor: '#FFF',
    // borderLeftWidth: 4,
    marginBottom: 12
  },
  nameUser: {
    fontSize: 22,
    fontFamily: 'NSBold',
    color: "#FFF",
    fontSize: 20,
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
    borderTopColor: '#6A8712',
    borderTopWidth: 10,
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
    backgroundColor: '#FFF'
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
});
