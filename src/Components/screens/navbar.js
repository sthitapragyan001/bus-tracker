import React from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from 'react-native';

export default function Navbar() {

    return (
        <div className='container-fluid' style={{ marginTop: '1%', marginRight: '2%',marginBottom:'1%' }} >
            <a style={{ marginLeft: '2%', display: 'inline' }}><a href="https://roboticsclub.iitd.ac.in" target="_blank" rel="noreferrer" style={{ float: 'left' }}><img src='./Logo.png' height='40' width='80' /></a><b style={{ fontSize: '170%' }}>Bus Tracker IITD</b></a>
            <div class="dropdown" style={{ display: 'inline', float: 'right' }}><button class="btn btn-sm" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><b style={{ fontSize: '170%',verticalAlign:'top'}}>&#9776;</b></button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2" style={{minWidth:175}}>
                    <View style={styles.header} >
                        <View style={styles.headerText}>
                            <Text style={styles.title}><img src= {require('./radar.gif')} height='30' width='30' /> Live Location</Text>
                        </View>
                    </View>
                    <li style={{ marginLeft: '5%' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./bus-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Bus Stops</Text>
                        </Pressable>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./clock-time-four-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Bus Timings</Text>
                        </Pressable>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./web-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Website</Text>
                        </Pressable>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./share-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Share</Text>
                        </Pressable>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./account-group-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>About Us</Text>
                        </Pressable>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./map-search-outline-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Journey so far</Text>
                        </Pressable>
                    </li>
                </div>
            </div>
        </div>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'left',
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        width: 50,
        height: 50,
    },
    headerText: {
        textAlign: 'left'
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
