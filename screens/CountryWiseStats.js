import React, {useState, useEffect} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS,TextInput,FlatList,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Ionicons } from '@expo/vector-icons';

export default function Stats_Screen({route,navigation}){
  const[getConfirmedCases,setConfirmedCases] = useState();
  const[getRecoveredCases,setRecoveredCases] = useState();
  const[getCriticalCases,setCriticalCases] = useState();
  const[getTotalDeaths,setTotalDeaths] = useState();
  const[getLastUpdated,setLastUpdated] = useState();
  const[country,setCountry] = useState();
  useEffect(() => {
    setCountry(route.params.country)
    console.log(route.params.country)
    getCountryData(route.params.country);
  },[route.params.country]);

  const getCountryData = (countryName) => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/country',
      params: {name: countryName},
      headers: {
        'x-rapidapi-key': 'd919bf8f29mshd61aef8392543bcp1b1891jsnc558fa1fa0bc',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data[0]);
      setConfirmedCases(response.data[0].confirmed);
      setRecoveredCases(response.data[0].recovered);
      setCriticalCases(response.data[0].critical);
      setTotalDeaths(response.data[0].deaths);
      setLastUpdated(response.data[0].lastUpdate);
    }).catch(function (error){
      console.error(error);
    });  
  }

  return(
    <View style={styles.container} >  
      <View style={styles.header}>   
      <Text style={styles.headerinnertText}>  Stats By Country</Text>
    </View>
    <View style={styles.box1}>
      <Text style={styles.innertText7}>  Country:  {country}   </Text>  
      <Text style={styles.innertText2}>  Confirmed cases: {getConfirmedCases}  </Text>
    </View>
    <View style={styles.box1}>  
     <Text style={styles.innertText3}>  Recovered cases: {getRecoveredCases} </Text>
    </View>
    <View style={styles.box1}>  
      <Text style={styles.innertText4}>  Critical cases: {getCriticalCases}  </Text> 
    </View>
    <View style={styles.box1}>  
      <Text style={styles.innertText5}>  Total Deaths: {getTotalDeaths}  </Text>
    </View>
    <View style={styles.box1}>  
      <Text style={styles.innertText6}> Last Updated on: {getLastUpdated} </Text>
    </View>
    <TouchableOpacity style={styles.appButtonContainer}
     onPress={() => navigation.navigate('Country Stats')}
    > 
      <Text style={styles.appButtonText}> Go Back To Search  </Text>
      </TouchableOpacity>
      <View style={styles.box1}>
        <TouchableOpacity style={styles.appButtonContainer}
          onPress={() => navigation.navigate('Favourite Countries')}
        > 
        <Text style={styles.appButtonText}> Favourite Countries  </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  box1:{
    paddingTop:15,
  },
  innertText2: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innertText3: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  
  },
  innertText4: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  
  },
  innertText5: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'brown',
    color: 'black',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innertText6: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  innertText7: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'sans-serif',  
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#2b8265',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    innertTextTransform: 'uppercase',
    fontFamily: 'sans-serif',
  },
  header: {
    backgroundColor:"#2b8265",
    borderRadius:10,
    height: 50,
    width: 400,
  },
  headerinnertText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight:'bold',
    color:'white',
  }
});