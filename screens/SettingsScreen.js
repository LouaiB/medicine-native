import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, Image, Switch } from 'react-native';
import { ThemeContext } from '../contexts/theme.context';

export default function SettingsScreen() {

    const { state, setDark, setLight } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [isDarkTheme, setIsDarkTheme] = useState(state.theme.id == 1);

    useEffect(() => {
        if(isDarkTheme) setDark();
        else setLight();
    }, [isDarkTheme]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Theme</Text>
                <View style={styles.setting}>
                    <Text style={styles.settingTitle}>Toggle dark mode</Text>
                    <Switch 
                        style={styles.settingControl} 
                        value={isDarkTheme}
                        thumbColor={isDarkTheme ? state.theme.colors.primaryColor : state.theme.colors.faded}
                        onValueChange={value => { setIsDarkTheme(value) }}
                    />
                </View>
            </View>
        </View>
    )
}

const getStyles = state => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: state.theme.colors.backgroundColor,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        color: state.theme.colors.foregroundColor,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 20,
    },
    section: {
        backgroundColor: state.theme.colors.sectionBg,
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        color: state.theme.colors.foregroundColor,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 16,
    },
    setting: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    settingTitle: {
        color: state.theme.colors.foregroundColor,
        flex: 1,
    },
    settingControl: {
        color: state.theme.colors.primaryColor,
    }
});
