import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { ThemeContext } from '../contexts/theme.context';
import { DbService } from '../services/db.service';

export default function TakerScreen({ route, navigation }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [taker, setTaker] = useState();
    const [intakes, setIntakes] = useState([]);

    useEffect(() => {
        setTaker(route.params.taker);
    }, []);

    useEffect(() => {
        if(taker){
            console.log(taker);
            getIntakes(taker.takerId);
        }
    }, [taker]);

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

    return (
        <View style={styles.container}>
            {taker && (
                <>
                    <View style={styles.taker}>
                        <Image source={require('../assets/avatar.png')} style={styles.takerAvatar} />
                        <Text style={styles.takerName}>{taker.name}</Text>
                        <Button
                            title="Edit"
                            onPress={() => navigation.push('Edit Taker', { taker })}
                        />
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
    }
});