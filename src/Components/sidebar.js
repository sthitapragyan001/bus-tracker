import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '../assets/logo.png';

import backgroundImage from '../assets/background.png';

export default function Sidebar({ closeSidebar }) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.headerBackground}>
          <View style={styles.header}>
            <Image source={logo} style={styles.icon} />
            <View style={styles.headerText}>
              <Text style={styles.title}>BUS Tracker</Text>
              <Text style={styles.subtitle}>Navigation in IIT Delhi</Text>
            </View>
          </View>
        </ImageBackground>
          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              {/* <MaterialCommunityIcons name="map-marker" size={30} color="black" /> */}
              <Text style={styles.menuText}>Bus Stops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              {/* <MaterialCommunityIcons name="clock" size={30} color="black" /> */}
              <Text style={styles.menuText}>Bus Timings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              {/* <MaterialCommunityIcons name="web" size={30} color="black" /> */}
              <Text style={styles.menuText}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              {/* <MaterialCommunityIcons name="share" size={30} color="black" /> */}
              <Text style={styles.menuText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              {/* <MaterialCommunityIcons name="account-group" size={30} color="black" /> */}
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              {/* <MaterialCommunityIcons name="bus-side" size={30} color="black" /> */}
              <Text style={styles.menuText}>Journey so far</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    width: '85%',  // Reduce the width to fit the content better
    height: '65%', // Reduce the height to fit the content better
    alignSelf: 'center', // Center the container horizontally
    marginTop: 20, // Adjust margin from the top
    overflow: 'hidden', // Ensures content doesn't overflow the container
    backgroundColor: 'white',
  },
  headerBackground: {
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
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
    color:'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
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