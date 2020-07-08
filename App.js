import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants';
import Home from './Screen/Home';
import CreateMember from './Screen/Createmember';
import Profile from './Screen/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';






 function App() {  
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
        <Stack.Navigator>
        <Stack.Screen name="Home" 
          component={Home}
          options={{
            title:"Welcome Mk",
           headerTintColor:"white",
            headerStyle:{
              backgroundColor:"#4fa883",
            }
          }}  
        />
        <Stack.Screen name="CreateMember" 
          component={CreateMember} 
          options={{
            title:"Create Member",
          }}  
        />
        <Stack.Screen name="Profile" 
          component={Profile}
          options={{
            title:"Profile",
          }} 
        />
      </Stack.Navigator>
      
    </View>
  );
}

export default ()=>{

  return(
    <NavigationContainer>
        <App/>
    </NavigationContainer> 
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
   // flexDirection:"row",
    //justifyContent: 'center',
    //alignItems:"center",
    //backgroundColor:'#4fa883',
    //marginTop:Contants.statusBarHeight,
  },
});

