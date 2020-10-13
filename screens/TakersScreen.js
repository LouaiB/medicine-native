import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { DbService } from '../services/db.service';
import { ThemeContext } from '../contexts/theme.context';

export default function TakersScreen({ navigation }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [takers, setTakers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getTakers();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTakers();
        });
    
        return unsubscribe;
    }, [navigation]);

    const getTakers = () => {
        setIsLoading(true);
        DbService.getTakers(
            result => {
                setTakers(result);
                setIsLoading(false);
            },
            err => {
                // TODO: Add error handling
                console.log('error getting takers');
                setIsLoading(false);
            }
        )
    }

    return (
        <View style={styles.container}>
            {takers && takers.length == 0 && !isLoading && <Text style={styles.noneFound}>No takers found</Text>}
            {takers && takers.length > 0 && (
                <FlatList
                    data={takers}
                    keyExtractor={(item, index) => item.takerId.toString()}
                    refreshing={isLoading}
                    onRefresh={getTakers}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => navigation.navigate("Taker", { takerId: item.item.takerId })}>
                            <View style={styles.taker}>
                                <View style={styles.takerLeft}>
                                    <Image source={item.item.avatar ? { uri: item.item.avatar } : require('../assets/avatar.png')} style={styles.takerAvatar} />
                                </View>
                                <View style={styles.takerRight}>
                                    <Text style={styles.takerName}>{item.item.name}</Text>
                                    
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
            <TouchableOpacity 
                style={styles.floatingBtn}
                onPress={() => {navigation.push('Add Taker')}} 
            >
                <Text style={styles.floatingBtnText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const getStyles = (state) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: state.theme.colors.backgroundColor,
        position: 'relative',
    },
    noneFound: {
        color: state.theme.colors.faded,
        fontSize: 28,
        letterSpacing: 2,
        textAlign: "center",
        marginTop: "20%",
    },
    error: {
        color: '#ee2233',
    },
    floatingBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: state.theme.colors.primaryColor,
        width: 50,
        height: 50,
        borderRadius: 30,                                       
        position: 'absolute',                                       
        bottom: 20,                                       
        right: 20,
    },
    floatingBtnText: {
        fontSize: 30,
        color: "#fff",
        margin: 0,
        padding: 0,
        lineHeight: 35,
    },
    taker: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: state.theme.colors.sectionBg,
    },
    takerLeft: {
        padding: 15
    },
    takerRight: {
        padding: 15
    },
    takerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        
    },
    takerName: {
        fontSize: 22,
        color: state.theme.colors.foregroundColor,
    }
});