import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default function SideModal(props) {
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      position: "absolute", 
      backgroundColor: "#000000AA",
      width: "100%",
      height: 1200,
      zIndex: 999,
  
  }
});