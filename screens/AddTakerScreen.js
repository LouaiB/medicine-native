import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { DbService } from '../services/db.service';
import Toast from 'react-native-simple-toast';

export default function AddTakerScreen() {

    const [name, setName] = useState('');

    const addTaker = () => {
        console.log('IN ADD TAKER HANDLER')
        DbService.addTaker(name, 10,
            () => {
                Toast.show(`${name} added`);
                setName('');
                console.log('added new taker');
            },
            error => {
                console.log('error adding taker');
            });
    }

    return (
        <View style={styles.container}>
            <Text>Add Taker</Text>
            <TextInput value={name} placeholder="name.." onChangeText={value => setName(value)} />
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