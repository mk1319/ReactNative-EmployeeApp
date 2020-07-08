import React,{useState} from 'react';
import { StyleSheet,Text, View,Image,Modal, Alert, KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';




const CreateMember=({route,navigation})=>{


      //{_id,Name,Position,Email,Picture,Phone}
    const get=(type)=>{
         if(route.params){
               switch(type){
                  case "Name":
                     return route.params.Name
                  case "Email":
                     return route.params.Email
                  case "Position":
                     return route.params.Position
                  case "instaid":
                     return route.params.instaid
                  case "Picture":
                     return route.params.Picture
                  case "Phone":
                     return route.params.Phone
                     
               }
         }
         return ""

    }


// if(route.params){
//    console.log(route.params)
// }
const [email,setemail]=useState(get("Email"))
const [Name,setName]=useState(get("Name"))
const [Position,setPosition]=useState(get("Position"))
const [phonenumber,setphone]=useState(get("Phone"))
const [instaid,setinstaid]=useState(get("instaid"))
const [picture,setpicture]=useState(get("Picture"))
const [modal,setmodal]=useState(false)

   
const imagefromGallary= async()=>{

   const {granted}= await Permissions.askAsync(Permissions.CAMERA_ROLL)
   if(granted){
         
         let data= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
         })
         if(!data.cancelled)
          {
             let file={
                uri:data.uri,
                type:`picture/${data.uri.split(".")[1]}`,
                name:`picture/${data.uri.split(".")[1]}`
             }
            uploadimage(file)
            setmodal(false)
          }



   }
   else{
            Alert.alert("Grant permission")
   }

}


const imagefromcamera= async()=>{

   const {granted}= await Permissions.askAsync(Permissions.CAMERA)
   if(granted){
         
         let data= await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
         })
          if(!data.cancelled)
          {
             let file={
                uri:data.uri,
                type:`picture/${data.uri.split(".")[1]}`,
                name:`picture/${data.uri.split(".")[1]}`
             }
            uploadimage(file)
            setmodal(false)
          }
   }
   else{
            Alert.alert("Grant permission")
   }

}


const uploadimage=(image)=>{

   const data=new FormData()
   data.append('file',image)
   data.append('upload_preset','FirstReactApp')
   data.append("cloud_name","dwnxodft3")

   fetch("https://api.cloudinary.com/v1_1/dwnxodft3/image/upload",{
      method:"post",
      body:data
   }).then(res=>res.json()).
   then(data=>{
     // console.log(data)
      setpicture(data.url)
   })


}

const submit=()=>{
       fetch("https://7c43c9e3.ngrok.io/send",{
          method:"post",
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify({
        Name,
        Email:email,
        Phone:phonenumber,
        Position:Position,
        Picture:picture,
        instaid:instaid

          })
       }).then(res=>res.json())
       .then(data=>{
         // console.log(data)
           Alert.alert("Data Submited Successful")
           navigation.navigate("Home")
        })
}

const update=()=>{

      fetch("https://7c43c9e3.ngrok.io/update",{
         method:"post",
         headers: {
            'Content-Type': 'application/json'
         },
         body:JSON.stringify({
            id:route.params._id,
            Name,
            Email:email,
            Phone:phonenumber,
            Position:Position,
            Picture:picture,
            instaid:instaid
         })

      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
          Alert.alert("Data updated Successful")
          navigation.navigate("Home")
       })

}
    


return(
    <View style={styles.view}>
     
      <KeyboardAvoidingView>
             <Text style={{fontSize:22,textAlign:"center",margin:5}}>create Member</Text>
      <TextInput
        label='Name'
        style={styles.textview}
        value={Name}
        theme={theme}
         mode="outlined"
        onChangeText={text => setName(text)}
      />
       <TextInput
        label='Email'
        style={styles.textview}
        value={email}
        theme={theme}
         mode="outlined"
        onChangeText={text => setemail(text)}
      />
       <TextInput
        label='position'
        style={styles.textview}
        value={Position}
        theme={theme}
        mode="outlined"
        onChangeText={text => setPosition(text)}
      />
       <TextInput
        label='Phone'
        style={styles.textview}
        value={phonenumber}
        theme={theme}
         mode="outlined"
        onChangeText={text => setphone(text)}
      />
      <TextInput
        label='Insta Id'
        style={styles.textview}
        value={instaid}
        theme={theme}
         mode="outlined"
        onChangeText={text => setinstaid(text)}
      />
      <View style={{flexDirection:"row",justifyContent:"space-around",padding:5}}>
         <Button icon={picture==""?"upload":"check"} 
               style={styles.button} 
               mode="contained" 
               onPress={() => setmodal(true)}>
               {picture==""?"Upload":"Uploded"}
         </Button>
         

        {!route.param?<Button icon="content-save" 
                  mode="contained" 
                  style={styles.button} 
                  onPress={()=>update()}>
            update
         </Button>:
         <Button icon="content-save" 
         mode="contained" 
         style={styles.button} 
         onPress={()=>submit()}>
                     Save
            </Button>
         }
      </View>
      
     
         <Modal 
               visible={modal}
               animationType="slide"
               transparent={true}
               onRequestClose={() => 
                  setmodal(false)
               }
             
         >
               
               <View style={styles.modalview}> 
                     <View style={styles.buttonview}>
                        <Button icon="camera" mode="contained" style={styles.button} onPress={()=> imagefromcamera()} >
                           camere
                        </Button>
                        <Button icon="image" mode="contained" style={styles.button}  onPress={()=> imagefromGallary()}>
                              Gallery
                        </Button>
                     </View>
                 
               
                 

                  <Button  mode="contained" style={{backgroundColor:"#13945d "}} onPress={() => setmodal(false)}>
                     Cancel
                  </Button>


               </View>
         </Modal>

         </KeyboardAvoidingView>


    </View>
   );
}

const theme={

   colors:{
      primary:"#188c47"
   }
}



const styles=StyleSheet.create({
   textview:{
      margin:5,
   },
   view:{
      flex:1,
      margin:5,
   },
   button:{ 
     //justifyContent:"center",
     backgroundColor:"#5fd486"
   },
   modalview:{
         position:"absolute",
         bottom:1,
         width:"100%",
         backgroundColor:"#13945d",
         padding:10
   },
   buttonview:{
      flexDirection:"row",
      justifyContent:"space-around",
      padding:5,
      margin:5,
   }

})

export default CreateMember