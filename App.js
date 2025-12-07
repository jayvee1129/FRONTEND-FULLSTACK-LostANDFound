import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

// Import Screens
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 1. Create the Tab Navigator (The main bottom bar)
function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator 
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: '#f8f9fa' },
        headerTintColor: '#007AFF',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: (props) => {
          // Use the native back arrow style for consistency with the Detail screen.
          // - On the Home tab: go back to the Welcome screen
          // - On the Post Item tab: go to the Home tab (so back returns only to Home)
          if (route.name === 'Post Item') {
            return <HeaderBackButton {...props} tintColor="#007AFF" onPress={() => navigation.navigate('Home')} />;
          }
          return <HeaderBackButton {...props} tintColor="#007AFF" onPress={() => navigation.navigate('Welcome')} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post Item" component={AddItemScreen} />
    </Tab.Navigator>
  );
}

// 2. Create the Stack Navigator (Welcome + Main App)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Welcome">
        {/* Welcome screen is the initial route */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
        
        {/* The main app with tabs */}
        <Stack.Screen 
          name="Main" 
          component={HomeTabs} 
          options={{ title: 'Lost & Found System', headerShown: false }} 
        />
        
        {/* The Detail screen sits "on top" of the tabs when clicked */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Item Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}