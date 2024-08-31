import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

export default function Navbar() {

    return (
        <div className='container-fluid' style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }} >
            <a style={{ marginLeft: '5%', display: 'inline' }}><a href="https://roboticsclub.iitd.ac.in" target="_blank" rel="noreferrer" style={{ float: 'left' }}><img src='./Logo.png' height={40} width={80} /></a><b style={{ fontSize: 30 }}>Bus Tracker IITD</b></a>
            <div class="dropdown" style={{ display: 'inline', float: 'right' }}><button class="btn btn-md" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><b style={{ fontSize: 23 }}>&#9776;</b></button>
                <div class="dropdown-menu dropdown-menu-right " aria-labelledby="dropdownMenu2" >
                    <View style={styles.header} >
                        <View style={styles.headerText}>
                            <Text style={styles.title}>Live Tracking</Text>
                        </View>
                    </View>
                    <li style={{ marginLeft: '5%' }}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("./bus-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Bus Stops</Text>
                        </TouchableOpacity>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("./clock-time-four-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Bus Timings</Text>
                        </TouchableOpacity>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("./web-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Website</Text>
                        </TouchableOpacity>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("./share-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Share</Text>
                        </TouchableOpacity>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("./account-group-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>About Us</Text>
                        </TouchableOpacity>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("./map-search-outline-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Journey so far</Text>
                        </TouchableOpacity>
                    </li>
                </div>
            </div>
        </div>
    )
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
        textAlign: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        paddingTop: 5,
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
        marginLeft: 10,
        fontSize: 16,
    },
});
