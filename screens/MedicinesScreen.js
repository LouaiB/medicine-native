import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MedicinesScreen() {
    return (
        <View style={styles.container}>
            <Text>Medicines Screen</Text>
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