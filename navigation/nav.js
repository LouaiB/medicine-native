import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons';
import { ThemeContext, ThemeProvider } from '../contexts/theme.context';
import MedicinesScreen from '../screens/MedicinesScreen';
import MedicineScreen from '../screens/MedicineScreen';
import AddMedicineScreen from '../screens/AddMedicineScreen';
import AddIntakeScreen from '../screens/AddIntakeScreen';
import TakersScreen from '../screens/TakersScreen';
import TakerScreen from '../screens/TakerScreen';
import AddTakerScreen from '../screens/AddTakerScreen';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Layer 1: Stacks
 *    --> Medicines Stack
 *        --> MedicinesScreen
 *        --> MedicineScreen
 *        --> AddMedicineScreen
 *        --> AddIntakeScreen
 *    --> Takers Stack
 *        --> TakersScreen
 *        --> TakerScreen
 *        --> AddTakerScreen
 *  */ 
const MedicinesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Medicines" component={MedicinesScreen} options={{title: "Medicines"}} />
      <Stack.Screen name="Medicine" component={MedicineScreen} options={{title: "Medicine"}} />
      <Stack.Screen name="Add Medicine" component={AddMedicineScreen} options={{title: "Add Medicine"}} />
      <Stack.Screen name="Add Intake" component={AddIntakeScreen} options={{title: "Add Intake"}} />
    </Stack.Navigator>
  )
}

const TakersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Takers" component={TakersScreen} options={{title: "Takers"}} />
      <Stack.Screen name="Taker" component={TakerScreen} options={{title: "Taker"}} />
      <Stack.Screen name="Add Taker" component={AddTakerScreen} options={{title: "Add Taker"}} />
    </Stack.Navigator>
  )
}

/**
 * Layer 0: Main Tabs
 *      --> Medicines Tab   [contains Medicines Stack]
 *      --> Takers Tab      [contains Takers Stack]
 */
const Tabs = () => {

  const { state } = useContext(ThemeContext);
  const iconStyle = {
    color: state.theme.colors.foregroundColor,
    fontSize: 20,
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: state.theme.colors.foregroundColor,
        inactiveTintColor: state.theme.colors.foregroundColor,
        activeBackgroundColor: state.theme.colors.activeTabBg,
        inactiveBackgroundColor: state.theme.colors.inactiveTabBg,
      }}
    >
      <Tab.Screen
        name="Medicines"
        component={MedicinesStack}
        options={
          {
            title: "Medicines",
            tabBarIcon: props => <AntDesign name="medicinebox" style={iconStyle} />,
          }
        }
      />
      <Tab.Screen 
        name="Takers"
        component={TakersStack}
        options={
          {
            title: "Takers",
            tabBarIcon: props => <FontAwesome5 name="user-alt" style={iconStyle} />
          }
        } 
      />
    </Tab.Navigator>
  )
}

export default function Nav() {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    )
}
