import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../contexts/theme.context';
import { DbService } from '../services/db.service';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';

export default function TakerScreen({ route, navigation }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [taker, setTaker] = useState();
    const [intakes, setIntakes] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTaker();
        });
    
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if(taker){
            console.log(taker);
            getIntakes(taker.takerId);
        }
    }, [taker]);

    const getTaker = () => {
        DbService.getTaker(route.params.takerId,
            results => {
                setTaker(results);
                console.log('fetched taker intakes');
            },
            err => {
                console.error(err);
            }
        )
    }

    const getIntakes = (takerId) => {
        DbService.getTakerIntakes(takerId,
            results => {
                setIntakes(results);
                console.log('fetched taker intakes');
            },
            err => {
                console.error(err);
            }
        )
    }

    const deleteTaker = () => {
        DbService.deleteTaker(taker.takerId,
            results => {
                console.log('taker deleted');
                Toast.show(`${taker.name} deleted`);
                navigation.goBack('Takers');
            },
            err => {
                console.error(err);
                Toast.show(`couldn't delete ${taker.name}`);
            }
        )
    }

    const confirmDeleteTaker = () => {
        Alert.alert(
            `Delete ${taker.name}`,
            `are you sure you want to delete ${taker.name}? You cannot undo this action.`,
            [
                {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
                },
                { 
                text: "Yes",
                onPress: deleteTaker,
                style: "destructive",
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.container}>
            {taker && (
                <>
                    <View style={styles.taker}>
                        <Image source={require('../assets/avatar.png')} style={styles.takerAvatar} />
                        <Text style={styles.takerName}>{taker.name}</Text>
                        <View style={styles.controls}>
                            <TouchableOpacity 
                                style={{...styles.btn, ...styles.editBtn}}
                                onPress={() => navigation.push('Edit Taker', { taker })}
                            >
                                <Entypo name="edit" style={styles.btnIcon} />
                                <Text style={styles.btnLabel}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{...styles.btn, ...styles.deleteBtn}}
                                onPress={confirmDeleteTaker}
                            >
                                <MaterialIcons name="delete-forever" style={styles.btnIcon} />
                                <Text style={styles.btnLabel}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.intakeSection}>
                        <Text style={styles.sectionTitle}>Intakes</Text>
                        {intakes && intakes.length == 0 && <Text style={styles.noIntakes}>No intakes found</Text>}
                    </View>
                </>
            )}
        </View>
    )
}

const getStyles = state => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: state.theme.colors.backgroundColor,
    },
    taker: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
    },
    takerAvatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    takerName: {
        color: state.theme.colors.foregroundColor,
        fontSize: 24,
        lineHeight: 50,
    },

    intakeSection: {
        flex: 1,
        padding: 20,
        backgroundColor: state.theme.colors.sectionBg,
    },
    sectionTitle: {
        color: state.theme.colors.foregroundColor,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 20
    },
    noIntakes: {
        color: state.theme.colors.faded,
        letterSpacing: 2,
    },
    controls: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    btn: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    editBtn: {
        backgroundColor: state.theme.colors.editColor,
    },
    deleteBtn: {
        backgroundColor: state.theme.colors.dangerColor,
    },
    btnIcon: {
        fontSize: 16,
        color: "#fff",
    },
    btnLabel: {
        fontSize: 16,
        color: "#fff",
        marginLeft: 8,
    },
});