import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { DbService } from '../services/db.service';
import Toast from 'react-native-simple-toast';
import { ThemeContext } from '../contexts/theme.context';

export default function EditTakerScreen({ route }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [taker, setTaker] = useState(route.params.taker);
    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        if(taker) {
            setName(taker.name);
            setAge(taker.age);
        }
    }, [taker]);

    const validate = () => {
        setError('');
        const errors = [];

        if(!name) errors.push('name required');
        else if(name.length < 2) errors.push('name must be 2 characters at least');
        else if(name.length > 16) errors.push('name must be 16 characters at most');

        if(!age) errors.push('age required');
        else {
            try{
                parseInt(age);
                if(age <= 0) errors.push('age must be greater than 0');
            } catch {
                errors.push('age must be a number');
            }
        }

        if(errors.length > 0) {
            setError(errors.join('. '));
            return false;
        } else {
            return true;
        }
    }

    const resetForm = () => {
        setName('');
        setAge('');
    }

    const updateTaker = () => {
        // Validation
        if(!validate()) return;

        DbService.updateTaker(taker.takerId, name, age,
            () => {
                Toast.show(`${name} updated`);
                console.log('updated taker');
            },
            error => {
                Toast.show(`error updating ${name}`);
                console.log('error updating taker');
            });
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                value={name}
                placeholder="Taker Name"
                placeholderTextColor={state.theme.colors.faded}
                onChangeText={value => setName(value)} 
            />
            <TextInput 
                style={styles.input}
                value={age}
                placeholder="Taker Age"
                placeholderTextColor={state.theme.colors.faded}
                onChangeText={value => setAge(value)} 
            />
            <Button 
                style={styles.btn}
                title="Save"
                onPress={updateTaker}
            />
            {!!error && <Text style={styles.errorMsg}>{error}</Text>}
        </View>
    )
}

const getStyles = state => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: state.theme.colors.backgroundColor,
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: state.theme.colors.faded,
        borderRadius: 4,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 14,
        paddingRight: 14,
        color: state.theme.colors.foregroundColor,
    },
    btn: {
        marginTop: 10,
    },
    errorMsg: {
        padding: 5,
        backgroundColor: state.theme.colors.dangerColor,
        color: "#fff",
        borderRadius: 4,
        marginTop: 10,
    }
});