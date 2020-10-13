import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { DbService } from '../services/db.service';
import Toast from 'react-native-simple-toast';
import { ThemeContext } from '../contexts/theme.context';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';

export default function AddTakerScreen({ navigation }) {

    const { state } = useContext(ThemeContext);
    const styles = getStyles(state);

    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    ////////////////// IMAGE PICKER //////////////////////
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to add an avatar!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    /////////////////////////////////////////////////////

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

    const filterAge = (value) => {
        setAge(value.replace(/[^0-9]/g, ''));
    }

    const addTaker = () => {
        // Validation
        if(!validate()) return;

        DbService.addTaker(name, age, image,
            () => {
                Toast.show(`${name} added`);
                resetForm();
                console.log('added new taker');
                navigation.goBack();
            },
            error => {
                Toast.show(`error adding new taker`);
                console.log(error);
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
                keyboardType="numeric"
                value={age}
                placeholder="Taker Age"
                placeholderTextColor={state.theme.colors.faded}
                onChangeText={filterAge} 
                />
            <TouchableOpacity style={styles.avatarBtn} onPress={pickImage}>
                <Entypo name="image" style={styles.avatarIcon} />
                <Text style={styles.avatarLabel}>Pick an avatar</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.avatarPreview} />}
            <TouchableOpacity style={styles.addBtn} onPress={addTaker}>
                <Entypo name="add-user" style={styles.addIcon} />
                <Text style={styles.addLabel}>Add</Text>
            </TouchableOpacity>
            {!!error && <Text style={styles.errorMsg}>{error}</Text>}
        </View>
    )
}

const getStyles = state => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: state.theme.colors.backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
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
    avatarBtn: {
        width: 200,
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: state.theme.colors.secondaryColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
    },
    avatarIcon: {
        color: "#fff",
        fontSize: 20,
    },
    avatarLabel: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 10,
    },
    avatarPreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        margin: 10,
    },
    addBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: state.theme.colors.primaryColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
    },
    addIcon: {
        color: "#fff",
        fontSize: 20,
    },
    addLabel: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 10,
    },
    errorMsg: {
        padding: 5,
        backgroundColor: state.theme.colors.dangerColor,
        color: "#fff",
        borderRadius: 4,
        marginTop: 10,
    }
});