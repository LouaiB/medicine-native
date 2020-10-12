import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { DbService } from '../services/db.service';

export default function AddTakerScreen() {

    const [name, setName] = useState('');

    const addTaker = () => {
        DbService.addTaker(name, 10,
            () => {},
            error => {});
    }

    return (
        <View style={styles.container}>
            <Text>Add Taker Screen</Text>
            <TextInput placeholder="name.." onChangeText={value => setName(value)} />
            <Button title="Add" onPress={addTaker} />
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