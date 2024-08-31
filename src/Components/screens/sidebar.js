import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Image } from 'react-native';




export default function Sidebar() {
  
  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        
        <View style={styles.headerText}>
          <Text style={styles.title}>BUS Tracker</Text>
          <Text style={styles.subtitle}>Navigation in IIT Delhi!</Text>
        </View>
      </View>
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem}>
         
         <Image source={require("./bus-removebg-preview.png")} style={{width: 20, height: 20,marginBottom:0}}/>
          <Text style={styles.menuText}>Bus Stops</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image source={require("./clock-time-four-removebg-preview.png")} style={{width: 20, height: 20,marginBottom:0}}/>
          <Text style={styles.menuText}>Bus Timings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image source={require("./web-removebg-preview.png")} style={{width: 20, height: 20,marginBottom:0}}/>
          <Text style={styles.menuText}>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image source={require("./share-removebg-preview.png")} style={{width: 20, height: 20,marginBottom:0}}/>
          <Text style={styles.menuText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image source={require("./account-group-removebg-preview.png")} style={{width: 20, height: 20,marginBottom:0}}/>
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
        <Image source={require("./map-search-outline-removebg-preview.png")} style={{width: 20, height: 20,marginBottom:0}}/>
          <Text style={styles.menuText}>Journey so far</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width * 0.75,
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1000,
    paddingTop: 20,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 50,
    height: 50,
  },
  headerText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingTop:5,
    fontSize: 14,
    color: 'black',
  },
  menuItems: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
  },
});