import React, { useState,useEffect} from 'react';
import { StyleSheet,Text, View,Image,Modal, Alert} from 'react-native';
import {Card, Button} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
const Profile=(props)=>{

    const {_id,Name,Position,Email,Picture,Phone,instaid}=props.route.params.item;
    const [instaRecord,setinsta]=useState([])


    const Delete=()=>{
       
        fetch("https://7c43c9e3.ngrok.io/delete",{
            method:"post",
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id:_id
        })
        })
        .then(res=>res.json())
        .then(()=>{
        Alert.alert(`Data Deleted Successfully`)
        props.navigation.navigate("Home")
     }).catch(err=>{
                console.log(err)
        })
    }
const insta=(id)=>{
    fetch(`https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=${id}&lang=en`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "instagram9.p.rapidapi.com",
                "x-rapidapi-key": "8892bf6b43msha2379e38acc34c3p1cfab5jsnd1d1358e9a21"
            }
    }).then(res=>res.json())
    .then(response => {
           setinsta(response)
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(()=>{
        insta(instaid)
},[])



    return (
        <View style={styles.mainView}>
            <LinearGradient 
                colors={['#005e27','#3df288']}
                style={{height:"20%"}}
            />
            <View style={{alignItems:"center",marginTop:-40}}>
                <Image 
                    style={{width:150,height:150,borderRadius:75}}
                    source={{uri:Picture}} 
                /> 
            </View>

            <View style={{alignItems:"center",paddingTop:5}}>
                <Text style={{fontSize:26}}>{Name}</Text>
                <Text style={{fontSize:18}}>{Position}</Text>
            </View>


            <View style={{margin:20,}}
                    onClick={()=>insta()}
            >
            <Card style={{padding:20}}>
                    <Text style={{justifyContent:"center",padding:10,paddingTop:0,fontSize:20,marginLeft:95}}>
                    {instaRecord.fullName}</Text>
                 <View style={{flexDirection:"row"}}>
                    <View style={{paddingLeft:35}}>
                        <Text style={{fontSize:25}}>
                        {instaRecord.postCount}
                        </Text>
                        <Text>
                        postCount
                        </Text>
                    </View>
                    <View style={{paddingLeft:28}}>
                        <Text style={{fontSize:25,}}>
                        {instaRecord.followCount}
                        </Text>
                        <Text>
                        followCount
                        </Text>
                    </View>
                    <View style={{paddingLeft:28}}>
                        <Text style={{fontSize:25}}>
                        {instaRecord.followerCount}
                        </Text>
                        <Text>
                        followerCount
                        </Text>
                    </View>
                    </View>
                </Card>

            </View>

            <Card style={{marginTop:20,paddingLeft:10}}>
                <View style={{padding:10}}>
                    <Text style={{fontSize:16}}>{Phone}</Text>
                </View>
            </Card>

            <Card style={{marginTop:20,paddingLeft:10}}>
                <View style={{padding:10}}>
                    <Text style={{fontSize:16}}>{Email}</Text>
                </View>
            </Card>
        
            <View style={{flexDirection:"row",justifyContent:"space-around",margin:50}}>
                <Button icon="account-edit" mode="contained" onPress={()=>{
                    props.navigation.navigate("CreateMember",{_id,Name,Position,Email,Picture,Phone,instaid})
                }}>
                    Edit
                </Button>
                <Button icon="account-edit" mode="contained" onPress={()=>{
                   Delete()
                }}>
                    Delete
                </Button>

            </View>


        </View>
    );
}

const styles=StyleSheet.create({

        mainView:{
                flex:1,
                margin:5
        }

})


export default Profile