import React, {useState, useEffect} from 'react';
import { Button, View, Text, FlatList,StyleSheet, TouchableOpacity,ScrollView ,NavigatorIOS,navigation} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons } from '@expo/vector-icons';

const FavouriteCountryStats = ({ route,navigation }) => {
  const[getFavouriteCountryList, setFavouriteCountryList] = useState([]);
  useEffect(() => {
    loadData();
  },[]);

  const loadData = async() => {
    try{
      AsyncStorage.getItem('favorite_Country').then(
        (value) => {
          var array = value.split(",");
          var uniqueArray = [];
          for (var i=0; i < array.length; i++) {
            if(uniqueArray.indexOf(array[i]) === -1)
              uniqueArray.push(array[i]);
          }
          setFavouriteCountryList(uniqueArray);
        }  
      );
    } 
    catch{
      console.log('error');
    }
  }
  
  const stats_screen=(item)=>{
    navigation.navigate('Country Wise Statss',{
      country: item
    })
  }
    
  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={getFavouriteCountryList}
          renderItem={({item})=>(
            <View>
              <TouchableOpacity  style={styles.diplaycountry} >
                <Text onPress={()=>{stats_screen(item)}} style={styles.text7}>{item}{item.check}></Text>
                <Ionicons name="star" size={30} color="#2b8265" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </ScrollView>
  );
}

export default FavouriteCountryStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  
  diplaycountry: {
    flexDirection:'row',
     fontSize: 20,
     paddingHorizontal:10,
     paddingVertical:10,
    fontFamily: 'serif',
 
  },
  text7:{
    fontSize: 25,
    color: 'black',
    fontFamily: 'serif',
  
  },
  
});
