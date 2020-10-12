import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { DbService } from '../services/db.service';
import { ThemeContext } from '../contexts/theme.context';

export default function TakersScreen({ navigation }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [takers, setTakers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getTakers();
        console.log(state);
    }, []);

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
            {takers && takers.length == 0 && <Text>No takers found</Text>}
            {takers && takers.length > 0 && (
                <FlatList
                    data={takers}
                    keyExtractor={(item, index) => item.takerId.toString()}
                    refreshing={isLoading}
                    onRefresh={getTakers}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => navigation.navigate("Taker", { taker: item.item })}>
                            <View style={styles.taker}>
                                <Text style={styles.takerName}>{item.item.name}</Text>
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
        fontSize: 20,
        color: "#fff",
    },
    taker: {
        padding: 20
    },
    takerName: {
        fontSize: 26,
        color: state.theme.colors.foregroundColor,
    }
});