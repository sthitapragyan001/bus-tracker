import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function Navbar(props) {
    async function copyToClip() {
        const url = window.location.href;
        const desc = 'Check out the Bus Tracker IITD at ';
        try {
            await navigator.clipboard.writeText(url);
            if (window.confirm('Link copied to clipboard. Do you want to share it on Whatsapp?')) {
                window.open(`https://wa.me/?text=${desc}${url}`, '_blank');
            }
        } catch (error) {
            if (window.confirm('Failed to copy link to clipboard. Do you want to share it on Whatsapp?')) {
                window.open(`https://wa.me/?text=${desc}${url}`, '_blank');
            }
        }

    }
    return (
        <div className='container-fluid' style={{paddingTop:'1%', marginRight: '2%'}} >
            <div style={{ display: 'inline' }}>
                <a href="https://roboticsclub.iitd.ac.in" target="_blank" rel="noreferrer" style={{ float: 'left' }}><img src={require('./Logo.png')} height='50vh' width='70vw' /></a>
                <b style={{ fontSize: '240%', textAlign: 'center' }}>{props.heading}</b>
                <div class="dropdown" style={{ display: 'inline', float: 'right' }}><button class="btn btn-sm" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><b style={{ fontSize: '170%', verticalAlign: 'top' }}>&#9776;</b></button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2" style={{ minWidth: 175 }}>
                        <View style={styles.header} >
                            <View style={styles.headerText}>
                                <a href='./#/Live_Location' style={{ textDecoration: 'none' }}>
                                    <Text style={styles.title}><img src={require('./radar.gif')} height='30' width='30' /> Live Location</Text>
                                </a>
                            </View>
                        </View>
                        <li style={{ marginLeft: '5%' }}>
                            <a href='./#/Bus_stops' style={{ textDecoration: 'none' }}>
                            <Pressable style={styles.menuItem}>
                                <Image source={require("./bus-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                                <Text style={styles.menuText}>Bus Stops</Text>
                            </Pressable>
                            </a>
                        </li>
                        <li style={{ marginLeft: '5%' }}>
                            <a href='./#/Bus_Schedule' style={{ textDecoration: 'none' }}>
                            {/* <a href={require('./Bus_Schedule.pdf')} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}> */}
                            <Pressable style={styles.menuItem}>
                                <Image source={require("./clock-time-four-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                                <Text style={styles.menuText}>Bus Schedule</Text>
                            </Pressable>
                        </a>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <a href='https://roboticsclub.iitd.ac.in' target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <Pressable style={styles.menuItem}>
                                <Image source={require("./web-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                                <Text style={styles.menuText}>Club Website</Text>
                            </Pressable>
                        </a>
                    </li>
                    <li style={{ marginLeft: '5%' }} >
                        <Pressable style={styles.menuItem} >
                            <Image source={require("./share-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} onClick={copyToClip} />
                            <Text style={styles.menuText} onClick={copyToClip}>Share</Text>
                        </Pressable>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                        <a href='./#/About_Us' style={{ textDecoration: 'none' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./account-group-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>The Team</Text>
                        </Pressable>
                    </a>
                    </li>
                    <li style={{ marginLeft: '5%' }}>
                    <a href='./#/Journey_so_far' style={{ textDecoration: 'none' }}>
                        <Pressable style={styles.menuItem}>
                            <Image source={require("./map-search-outline-removebg-preview.png")} style={{ width: 20, height: 20, marginBottom: 0 }} />
                            <Text style={styles.menuText}>Our Story</Text>
                        </Pressable>
                    </a>
                    </li>
                </div>
            </div>
        </div>
        </div >
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
