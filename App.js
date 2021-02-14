import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { StyleSheet, Text, View,SectionList ,TouchableOpacity,SafeAreaView,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
 import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';

const postURL= 'https://jsonplaceholder.typicode.com/posts';
// /////////////////// async storage ///////////////////////////////////////////////
// AsyncStorage.setItem('person',"human")
// // .then( async ()=>{await AsyncStorage.getItem('person')})
// .then(  ()=>{ AsyncStorage.getItem('person').then(console.log)})
// .catch((e)=>{console.log("err here "+e)})



 //function to get data  




// //////////////////////////////////// navigation button tab //////////////////////
const {Navigator:ButtonNav,Screen:ButtonScreen} = createBottomTabNavigator();
////////// tabs ///////
const Home= ()=>{
  const {navigate}=useNavigation();

  return( <View style={styles.homeTab}>
<TouchableOpacity
 style={styles.button}
  onPress={()=> navigate('posts')}
>
  Show All Posts
</TouchableOpacity>
</View>)}

const Profile= ()=>{return(<View style={styles.profileTab}>
<Text>Profile</Text>
</View>)}


//// ///////////////////////////////////////////////////// stack navigation ///////////////////////////////////////////////////////////////////////////////////

const {Navigator:StackNav,Screen:StackScreen} = createStackNavigator();


////////// tabs ///////
const HomeStack= ()=>{return(
  <StackNav>
    <StackScreen 
    name="home stack" 
    component={Home}
options={{
  headerStyle:{backgroundColor:'purple'},
  headerTitle:"BLOGNAV",
  headerLeft:()=>{
    const {goBack}=useNavigation();

    return(<FontAwesome name="long-arrow-left" size={24} color="black" onPress={()=>goBack()} />)}
}}
    ></StackScreen>


    <StackScreen
     name="posts"
     component={postsList}
     options={{
       headerStyle:{ backgroundColor:'gold'},
       headerTitle:"BLOGPOST"
     }}
    >
      
    </StackScreen>
  </StackNav>
)}


const postsList = ()=>{
  const[data,setPosts]=useState([])
  const [isLoadindg,setLoading]=useState(true);
  
  useEffect(()=>{
  

    let res=  fetch(`${postURL}`)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setPosts(data)
    })
    .catch((e)=>{console.log(e)})
    .finally(()=> setLoading(false));
  
},[])

  return isLoadindg? (<Text>Loading...</Text>) :
    (
    <View>
      <FlatList 
       data={data}
      //  keyExtractor={}
       renderItem ={({item})=>{return(
         <View>
          <Text>{item.title}</Text>
          <Image source={{uri:'https://source.unsplash.com/random'}} style={{width:100,height:100}} />
          <Text>{item.body}</Text>  
            
         </View>
       )}}      
      
      
      />

      
    </View>
  )
}

 





export default function App() {
// ////////////////////////////////// UI //////////////////////////////////////////////////////
  return (
  
    <NavigationContainer >
        
     <ButtonNav 
     initialRouteName="Home" 
     style={styles.downNav}
    //  screenOptions={{}}
     tabBarOptions={{activeTintColor:'gold',inactiveTintColor:'red',labelStyle:{fontSize:17},tabStyle:{backgroundColor:'black'},iconStyle:{size:35 ,color:'red' } }}
     
     >
       {/* <HomeStack /> */}
      <ButtonScreen 
      name="HomeStack" 
      component={HomeStack}
      options={{
        title:'Home',
        // tab bar icon takes a function 
        tabBarIcon:({color,focused})=>{return(<FontAwesome name="home" size={focused? 35:20} color={color} ></FontAwesome>)}

      }}
      >

      </ButtonScreen>
      <ButtonScreen 
      name="Profile" 
      component={Profile}
      options={{
        title:'Profile',
        // tab bar icon takes a function 
        tabBarIcon:({color,focused})=>{return(<FontAwesome name="person-circle-sharp" size={focused? 35:20} color={color}   >
          
        </FontAwesome>)}

      }}
      >

      </ButtonScreen>
      </ButtonNav>
      
    </NavigationContainer>


  );
}


////////////////////////////////({ styles///////////////////////////
const  styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downNav:{
    flex:1,
    backgroundColor:'black'
  },
  homeTab:{
    flex:1,
    backgroundColor:'lightblue'
  },

  profileTab:{
    flex:1,
    backgroundColor:'gold'
  },
  button: {
    width:150,
    marginTop:5,
    color:'purple',
   alignItems: "center",
    backgroundColor: "#DDDDDD",
   padding: 10,
      borderBottomLeftRadius: 20,
   borderBottomRightRadius: 20,
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
    //  backgroundColor:'black',
      borderColor: 'purple',
     
       borderWidth: 1,
 },
});




















// const Posts=()=>{
//   return(
//      <View style={styles.container}>
//     // {isLoadindg? <Text>Loading ...</Text>.(
//     //   <FlatList
//     //    data={postsList}
//     //    keyExtractor={({id}=>id)}
//     //    renderItem={({item})=>{return(
//     //      <View style={styles.card}>
//     //        <Text>{item.title}</Text>
//     //        <Image source={{uri:'https://source.unsplash.com/random'}} style={styles.photoCard} />
//     //        <Text>{item.body}</Text>    
//     //      </View>
//     //    )}}
//     //   >

//     //   </FlatList>
//     // )}
//      </View>
//   )
// }