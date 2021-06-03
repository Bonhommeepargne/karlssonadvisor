import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Button,
  TouchableOpacity
} from 'react-native';

// https://fonts.google.com/specimen/Nunito+Sans
import { useFonts } from 'expo-font';
import NSLight from '../../../../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
import NSRegular from '../../../../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
import NSBold from '../../../../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
import NSExtraBold from '../../../../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';

import { useNavigation } from '@react-navigation/core';
import sizeLabel from '../../../../util/sizeLabel';

export default function Info(props) {

  const company = props.data;
  const valLabel = sizeLabel(company.s);

  const ExternalLinkBtn = (props) => {
    return <TouchableOpacity
      onPress={() => {
        Linking.openURL(props.url)
          .catch(err => {
            console.error("Failed opening page because: ", err)
            alert('Failed to open page')
          })
      }}>
      <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'blue' }}>{props.title}</Text>
    </TouchableOpacity>
  }

  return (
    <View style={styles.container}>
      <View style={styles.barRank}>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.titleScore}>Corporate information</Text>

          <View style={{ paddingVertical: 15 }}>
            <View style={{ width: '90%', marginBottom: 15 }}>
              {/* <View><Text style={{ fontSize: 16, fontFamily: 'NSRegular', }}>Address: </Text></View> */}
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.SASBSubSector}</Text>
              <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>&#x21B3;{company.SASBIndustryGroup}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              paddingTop: 0,
            }}>
              <View style={{ flex: 5, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.Region}</Text>
                <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.Country}</Text>
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ borderColor: 'grey', borderWidth: 1, alignItems: 'center', 
                    borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>Mkt. Cap.</Text>
                </View>
                <View style={{ borderColor: 'grey', borderLeftWidth: 1, borderRightWidth: 1,
                    borderBottomWidth: 1, alignItems: 'center',
                    borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{company.s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} M€</Text>
                  <Text style={{ fontSize: 16, fontFamily: 'NSBold', color: 'grey' }}>{valLabel.label}</Text>
                </View>
              </View>
            </View>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between',
              paddingTop: 10, alignItems: 'flex-start'
            }}>
              <View style={{ flex: 5 }}>
                <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'grey' }}>{company.Phone}</Text>
                <ExternalLinkBtn title={company.Web.length > 25 ? company.Web.substring(7, 25) + '...' : company.Web} url={company.Web} />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'grey' }}>#Nb of employee</Text>
                <Text style={{ fontSize: 14, fontFamily: 'NSBold', color: 'grey' }}>
                  {isNaN(company.employee) || company.employee == '' ? '-' : company.employee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  barRank: {
    marginBottom: 10,
    justifyContent: 'flex-start',
    width: "95%",
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
    borderRadius: 15,
    backgroundColor: "white",
  },
  titleScore: {
    fontSize: 22,
    fontFamily: 'NSExtraBold',
    color: "black"
  },
});