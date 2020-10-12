import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../contexts/theme.context';

export default function TakerScreen({ route }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [taker, setTaker] = useState(null);

    useEffect(() => {
        setTaker(route.params.taker);
    }, [])

    return (
        <View style={styles.container}>
            {taker && (
                <>
                    <View style={styles.taker}>
                        <Image source={require('../assets/avatar.png')} style={styles.takerAvatar} />
                        <Text style={styles.takerName}>{taker.name}</Text>
                    </View>
                    <View style={styles.intakeSection}>
                        <Text style={styles.sectionTitle}>Intakes</Text>

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
        padding: 20,
        backgroundColor: state.theme.colors.sectionBg,
    },
    sectionTitle: {
        color: state.theme.colors.foregroundColor,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 20
    }
});