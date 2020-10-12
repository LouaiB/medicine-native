import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MedicineScreen() {
    return (
        <View style={styles.container}>
            <Text>Medicine Screen</Text>
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