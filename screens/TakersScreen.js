import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { DbService } from '../services/db.service';

export default function TakersScreen() {

    const [takers, setTakers] = useState([]);

    useEffect(() => {
        getTakers();
    }, []);

    const getTakers = () => {
        DbService.getTakers(
            result => {
                setTakers(result);
            },
            err => {
                // TODO: Add error handling
                console.log('error getting takers');
            }
        )
    }

    //////////////////////////////////////
    const [name, setName] = useState('');

    const addTaker = () => {
        console.log('IN ADD TAKER HANDLER')
        DbService.addTaker(name, 10,
            () => {
                setName('');
                console.log('added new taker')
                getTakers();
            },
            error => {
                console.log('error adding taker');
            });
    }
    ////////////////////////////////////////

    return (
        <View style={styles.container}>
            <View>
                <Text>Add Taker</Text>
                <TextInput value={name} placeholder="name.." onChangeText={value => setName(value)} />
                <Button title="Add" onPress={addTaker} />
            </View>
            <Text>Takers Screen</Text>
            {takers == [] && <Text>No fetching</Text>}
            {takers && takers.length == 0 && <Text>No takers in db</Text>}
            {takers && takers.length > 0 && takers.map(taker => <Text key={taker.takerId}>{taker.name}</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: '#fff',
        display: "flex",
        flexDirection: "column",
    },
    error: {
        color: '#ee2233',
    }
});