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
import SettingsScreen from '../screens/SettingsScreen';

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

  const { state } = useContext(ThemeContext);
  const stackHeaderStyle = {
    backgroundColor: state.theme.colors.stackHeaderBg,
  }
  const stackHeaderTitleStyle = {
    color: state.theme.colors.foregroundColor,
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Medicines" component={MedicinesScreen} options={{title: "Medicines", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
      <Stack.Screen name="Medicine" component={MedicineScreen} options={{title: "Medicine", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
      <Stack.Screen name="Add Medicine" component={AddMedicineScreen} options={{title: "Add Medicine", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
      <Stack.Screen name="Add Intake" component={AddIntakeScreen} options={{title: "Add Intake", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
    </Stack.Navigator>
  )
}

const TakersStack = () => {

  const { state } = useContext(ThemeContext);
  const stackHeaderStyle = {
    backgroundColor: state.theme.colors.stackHeaderBg,
  }
  const stackHeaderTitleStyle = {
    color: state.theme.colors.foregroundColor,
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Takers" component={TakersScreen} options={{title: "Takers", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
      <Stack.Screen name="Taker" component={TakerScreen} options={{title: "Taker", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
      <Stack.Screen name="Add Taker" component={AddTakerScreen} options={{title: "Add Taker", headerStyle: stackHeaderStyle, headerTitleStyle: stackHeaderTitleStyle}} />
    </Stack.Navigator>
  )
}

/**
 * Layer 0: Main Tabs
 *      --> Medicines Tab   [contains Medicines Stack]
 *      --> Takers Tab      [contains Takers Stack]
 *      --> Settings Tab
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
            tabBarIcon: props => <FontAwesome5 name="user" style={iconStyle} />
          }
        } 
      />
      <Tab.Screen 
        name="Settings"
        component={SettingsScreen}
        options={
          {
            title: "Settings",
            tabBarIcon: props => <AntDesign name="setting" style={iconStyle} />
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
