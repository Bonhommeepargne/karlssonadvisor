import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import Search from './../Main/Search/Search';
import WatchListSelect from './../Main/Company/WatchListSelect';
import UserMenu from './../Main/User/UserMenu';
import ManageProfile from './../Main/User/ManageProfile';
import Subscription from './../Main/User/Subscription';
import Parameters from './../Main/User/Parameters';
import Contact from './../Main/User/Contact';
import WatchList from './../Main/WatchList/WatchList';
import Notifications from './../Main/Notifications/Notifications';
import SideModal from './../Menu/SideModal/SideModal';
import DefineCompany from '../Main/Search/DefineCompany';
import CompanyHistory from '../Main/Company/CompanyHistory';
import SelectFilter from '../Main/Screening/Header/SelectFilter';
import MenuTree from './MenuTree';
import TutoESG from '../tuto/TutoESG';
import TutoESGTab from '../tuto/TutoESGTab';
import TutoESGComparative from '../tuto/TutoESGComparative';
import TutoCarbon from '../tuto/TutoCarbon';
import TutoControversy from '../tuto/TutoControversy';
import TutoESGMenu from '../tuto/TutoESGMenu';
import TutoCarbonMenu from '../tuto/TutoCarbonMenu';
import TutoControversyMenu from '../tuto/TutoControversyMenu';
import TutoPerf from '../tuto/TutoPerf';
import TutoUNGC from '../tuto/TutoUNGC';
import Store from '../../context';
import EmailActivation from '../Connection/Login/EmailActivation'

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();

const modalOptions = {
  cardOverlayEnabled: true,
  headerShown: false,
  cardStyle: {
    backgroundColor: "transparent",
  },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      translateX: progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-screenWidth, -1 * screenWidth, 0],
        extrapolate: "clamp",
      })

    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
        extrapolate: "clamp"
      }),
      // translateX: progress.interpolate({
      //   inputRange: [0, 0.5,  1],
      //   outputRange: [0, 0, 0],
      //   extrapolate: "clamp",
      // })
    }
  })
};

export default function Menu() {

  return (
    <Store.Consumer>
      {(store) => (
        <Stack.Navigator>
          { store.user.emailVerified == true ?
            (moment().isBefore(moment(store.userInfo.subscription.expire)) ?
              (!store.userInfo.company ?
                <Stack.Screen name="DefineCompany" component={DefineCompany} options={{ headerShown: false }} />
                :
                <Stack.Screen name="MenuTree" component={MenuTree} options={{ headerShown: false }} />)
              :
              <Stack.Screen name="SubscriptionExpired" component={Subscription} options={{
                title: 'Subscription',
                headerBackTitle: 'Back',
                headerTintColor: '#fff', headerStyle: {
                  backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
                  borderBottomWidth: 0,
                }
              }} />)
            :
            <Stack.Screen name="EmailActivation" component={EmailActivation} options={{ headerShown: false }} />
          }
          <Stack.Screen name="WatchListSelect" component={WatchListSelect} options={({ route, navigation }) => ({
            title: 'Watchlist',
            headerBackTitle: 'Back',
            headerTintColor: 'black', headerStyle: {
              backgroundColor: '#FFF', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 1
            },
            headerRight: () => (
              <TouchableWithoutFeedback onPress={() =>
                (navigation.navigate('WatchList'))
              }>
                <Icon
                  style={{ paddingRight: 25 }}
                  name='edit'
                  type='font-awesome-5'
                  color='black'
                  size={20}
                />
              </TouchableWithoutFeedback>
            )
          })}
          />
          <Stack.Screen name="Search" component={Search} options={{
            title: 'Search company',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0
            }
          }} />
          <Stack.Screen name="UserMenu" component={UserMenu} options={{ headerShown: false }} />
          <Stack.Screen name="ManageProfile" component={ManageProfile} options={{
            title: 'Edit profile',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0
            }
          }} />
          <Stack.Screen name="CompanyHistory" component={CompanyHistory} options={{
            title: 'Rating History',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0
            }
          }} />
          <Stack.Screen name="Subscription" component={Subscription} options={{
            title: 'Subscription',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0,
            }
          }} />
          <Stack.Screen name="Parameters" component={Parameters} options={{
            title: 'Parameters',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0,
            }
          }} />
          {/* <Stack.Screen name="Avatar" component={Avatar} options={{  title: 'Avatar' }} /> */}
          <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
          <Stack.Screen name="SideModal" component={SideModal} options={modalOptions} />
          <Stack.Screen name="WatchList" component={WatchList} options={({ route, navigation }) => ({
            title: 'Watchlist',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0
            },
            headerRight: () => (
              <TouchableWithoutFeedback onPress={() =>
                (navigation.navigate('Search', { query: 'add' }))
              }>
                <Icon
                  style={{ paddingRight: 25 }}
                  name='plus'
                  type='font-awesome-5'
                  color='#FFF'
                  size={20}
                />
              </TouchableWithoutFeedback>
            )
          })}
          />
          <Stack.Screen name="Contact" component={Contact} options={{
            title: 'Contact Karlsson',
            headerBackTitle: 'Back',
            headerTintColor: '#fff', headerStyle: {
              backgroundColor: '#6A8712', elevation: 0, shadowOpacity: 0,
              borderBottomWidth: 0
            }
          }} />
          <Stack.Screen name="TutoESG" component={TutoESG} options={modalOptions} />
          <Stack.Screen name="TutoESGTab" component={TutoESGTab} options={modalOptions} />
          <Stack.Screen name="TutoESGComparative" component={TutoESGComparative} options={modalOptions} />
          <Stack.Screen name="TutoCarbon" component={TutoCarbon} options={modalOptions} />
          <Stack.Screen name="TutoControversy" component={TutoControversy} options={modalOptions} />
          <Stack.Screen name="TutoPerf" component={TutoPerf} options={modalOptions} />
          <Stack.Screen name="TutoUNGC" component={TutoUNGC} options={modalOptions} />
          <Stack.Screen name="TutoESGMenu" component={TutoESGMenu} options={modalOptions} />
          <Stack.Screen name="TutoCarbonMenu" component={TutoCarbonMenu} options={modalOptions} />
          <Stack.Screen name="TutoControversyMenu" component={TutoControversyMenu} options={modalOptions} />
          <Stack.Screen name="SelectFilter" component={SelectFilter} options={modalOptions} />
        </Stack.Navigator>
      )}
    </Store.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});