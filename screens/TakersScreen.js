import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TakersScreen() {
    return (
        <View style={styles.container}>
            <Text>Takers Screen</Text>
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