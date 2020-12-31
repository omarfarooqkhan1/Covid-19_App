import React, {useState, useEffect} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS,TextInput,FlatList,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CountryStats = ({navigation,route}) => {
  const [countries,setCountries] = useState([]);
  const [getFavCountries,setFavCountries] = useState('');
  const [getArrayHolder,setArrayHolder] = useState([]);
  const [text,setText] = useState('');
  useEffect(() => {
    loadData();
    getData();
  },[]);
 
  const loadData = async() => {
    try{
      AsyncStorage.getItem('favorite_Country').then(
        (value) => {
          console.log("val",value);
        }  
      );
    }
    catch{
      console.log('error');
    }
  }

  const getData = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/allcountriesname',
      headers: {
        'x-rapidapi-key': 'd919bf8f29mshd61aef8392543bcp1b1891jsnc558fa1fa0bc',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      setCountries(response.data.body.countries)
      setArrayHolder(response.data.body.countries)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const searchData = (text) => {
    const newData = getArrayHolder.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    setCountries(newData);
    setText(text);
  }
  const stats_screen = (item) => {
    navigation.navigate('Country Wise Stats',{
      country: item
    });
  }
  
  const addFavCountry = async(country) => {
    try {
      const value = await AsyncStorage.getItem('favorite_Country');
      await AsyncStorage.setItem('favorite_Country', value+","+country);
    } 
    catch (error){
      console.log(error);
    }
  }
 
  return ( 
    <ScrollView>
      <View style={styles.container}> 
        <View style={styles.textInputView}>  
          <TextInput style={styles.textinput1}
            placeholder="Search here" onChangeText={(text) => searchData(text)}
            value={text}
          ></TextInput>
          <FlatList
            data={countries}
            renderItem = {({item}) => (
            <View>
              <TouchableOpacity  style={styles.diplaycountry} >
              <Text onPress={()=>{stats_screen(item)}} style={styles.text7}>{item}{item.check}></Text>
                <Ionicons name="star" size={20} color="#2b8265" onPress={()=>{addFavCountry(item)}} />
              </TouchableOpacity>
            </View>)
            }
            keyExtractor={(item, index) => item.id} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default CountryStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  textInputView: {
    paddingTop:20
  },
  textinput1: {
    textAlign: 'center',
    fontSize: 20,
    borderRadius:15,
    height: 50,
    width: 320,
    fontFamily: 'sans-serif',
    borderColor:'#2b8265',
    borderWidth:3
  },
  text7: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'sans-serif'
  }
});