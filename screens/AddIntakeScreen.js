import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function AddIntakeScreen() {
    return (
        <View style={styles.container}>
            <Text>Add Intake Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: '#fff',
        display: "flex",
        flexDirection: "column",
    }
});