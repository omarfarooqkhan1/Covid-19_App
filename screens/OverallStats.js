import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,Navigation,NavigatorIOS, } from 'react-native';
import axios from "axios";
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

const OverallStats = ({navigation}) => {
  const[getWorldPopulation,setWorldPopulation] = useState();
  const[getConfirmedCases,setConfirmedCases] = useState();
  const[getRecoveredCases,setRecoveredCases] = useState();
  const[getCriticalCases,setCriticalCases] = useState();
  const[getTotalDeaths,setTotalDeaths] = useState();
  const[getLastUpdated,setLastUpdated] = useState();

  useEffect(() => {    
    getData();
    getWorldData();
  },[]);

  const getData = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      params: {code: 'it'},
      headers: {
        'x-rapidapi-key': 'd919bf8f29mshd61aef8392543bcp1b1891jsnc558fa1fa0bc',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      setConfirmedCases(response.data[0].confirmed);
      setRecoveredCases(response.data[0].recovered);
      setCriticalCases(response.data[0].critical);
      setTotalDeaths(response.data[0].deaths);
      setLastUpdated(response.data[0].lastUpdate);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const getWorldData = () => {
    const options = {
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      headers: {
        'x-rapidapi-key': 'd919bf8f29mshd61aef8392543bcp1b1891jsnc558fa1fa0bc',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response){
      setWorldPopulation(response.data.body.world_population);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const calculate = (value) => {
    const val = (100 * value) / getWorldPopulation;
    return val.toFixed(4);
  }

  return (
    <View style={styles.container}> 
      <View  style={styles.box}>  
      <Text style={styles.innerText1}>Total World Population: {getWorldPopulation}</Text>
    </View>
    <View style={styles.box1}>  
      <Text style={styles.innerText2}>  Confirmed cases: {getConfirmedCases} are {calculate(getConfirmedCases)}% of world's population</Text>
    
    </View>
    
    <View style={styles.box1}>  
      <Text style={styles.innerText3}>  Recovered cases: {getRecoveredCases} are {calculate(getRecoveredCases)}% of world's population</Text>
    
    </View>
    
    <View style={styles.box1}>  
    <Text style={styles.innerText4}>  Critical cases: {getCriticalCases} are {calculate(getCriticalCases)}% of world's population</Text>
    
    </View>
    
    <View style={styles.box1}>  
    <Text style={styles.innerText5}>  Total Deaths: {getTotalDeaths} are {calculate(getTotalDeaths)}% of world's population</Text>
    </View>
    
    <View style={styles.box1}>  
    <Text style={styles.innerText6}> Last Updated on: {getLastUpdated}</Text>
    </View>
    </View>
  );
}

export default OverallStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    borderRadius: 5,
    paddingTop: 20,
  },
  box1: {
    borderRadius: 5,
    paddingTop: 15,
  },
  innerText1:{
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'green',
    color: 'white',
    borderRadius:10,
    height: 50,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innerText2:{
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    color: 'white',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innerText3:{
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innerText4:{
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    color: 'white',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innerText5:{
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'black',
    color: 'white',
    borderRadius:10,
    height: 70,
    width: 320,
    fontFamily: 'sans-serif',
  },
  innerText6:{
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 15,
    color: 'orange',
    fontFamily: 'sans-serif',
  }
});



