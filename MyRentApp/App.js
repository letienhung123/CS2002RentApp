import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home/Home'
import Search from './components/Search/Search'
import Upload from './components/Upload/Upload'
import User from './components/User/User'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Entrance/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator () {
  return (
    
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({color,size}) => (
          <AntDesign name = "home" color={color} size={size}/>
        ) }}/>
        <Tab.Screen name="Upload" component={Upload} options={{ tabBarIcon: ({color,size}) => (
          <Feather name = "upload" color={color} size={size}/>
        ) }}/>
        <Tab.Screen name="Search" component={Search} options={{ tabBarIcon: ({color,size}) => (
          <AntDesign name = "search1" color={color} size={size}/>
        ) }}/>
        <Tab.Screen name="Profile" component={User} options={{ tabBarIcon: ({color,size}) => (
          <Ionicons name = "person" color={color} size={size}/>
        ) }}/>
      </Tab.Navigator>

  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
