import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image,FlatList, Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper';

const Home=(props)=>{

            const [data,setData]=useState([])
            const [loading,setloading]=useState(true)

            const fatchdata=()=>{
                fetch("https://0c5e6e90.ngrok.io/")
                .then(res=>res.json())
                .then(result=>{
                    //console.log(result)
                    setData(result)
                    setloading(false)
                }).catch(err=>{
                    Alert.alert("Error In Refressing",err)
                })

            }

            useEffect(()=>{
                fatchdata()
        },[])


        







        const randerlist=((item)=>{
            const textstyle={
                fontSize:20
            }
            return(
                <Card 
                    style={styles.maincard} 
                    key={item._id}
                    onPress={() => props.navigation.navigate("Profile",{item})}
                >
                  <View style={styles.myview}>
                        <Image 
                        style={{
                         width:80,height:80,borderRadius:80/2,
                         }}
                        source={{uri:item.Picture}}
                         /> 
                    <View style={{marginLeft:10}}>
                        <Text style={styles.CardText}>{item.Name}</Text>
                        <Text>{item.Position}</Text>
                    </View>
            
                   
                </View>
            </Card>
            )

        })

    return(
            <View style={{flex:1}}>
             
                    
                    <FlatList
                        data={data}
                        renderItem={({item})=>{
                        return (randerlist(item))
                        }}
                        keyExtractor={item => item._id}
                        onRefresh={()=>fatchdata()}
                        refreshing={loading}    
                    />

               
            
                <FAB
                    style={styles.fab}
                     icon="plus"
                     color='white'
                     onPress={() => props.navigation.navigate("CreateMember")}
        
                />
            </View>
    );
}

const styles =StyleSheet.create({
            maincard:{
                margin:5,
                marginTop:2,
                marginBottom:2,
                padding:5,
                backgroundColor:'#65f0b5'
            },
            myview:{
                flexDirection:"row",
            },
            CardText:{
                fontSize:22,
            },
            fab: {
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
                backgroundColor:"#13945d"
              },
})
export default Home