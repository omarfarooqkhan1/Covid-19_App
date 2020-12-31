import 'react-native-gesture-handler';
import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import OverallStats from './screens/OverallStats';
import CountryStats from './screens/CountryStats';
import FavouriteCountryStats from './screens/FavCountryStats';
import CountryWiseStats from './screens/CountryWiseStats';
import CustomSidebar from './assets/CustomSidebar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const screen1Stack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="COVID-19 App">
      <Stack.Screen
        name="COVID-19 App"
        component={OverallStats}
        options={{
          title: 'COVID-19 App',
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#24A0ED',
            flexDirection: 'row'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
        }}
      />
    </Stack.Navigator>
  );
}

const screen2Stack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Country Stats"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#24A0ED'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }}>
      <Stack.Screen
        name="Country Stats"
        component={CountryStats}
        options={{
          title: 'Country Stats', 
        }}
      />
      <Stack.Screen
        name="Favourite Countries"
        component={FavouriteCountryStats}
        options={{
          title: 'Favourite Countries',
        }}
      />
      <Stack.Screen name="Country Wise Stats" component={CountryWiseStats} 
        options={{
        headerShown: false,
      }}
      />
    </Stack.Navigator>
  );
}

const screen3Stack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Country Wise Stats"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#24A0ED'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }}
    >
      <Stack.Screen
        name="Favourite Countries"
        component={FavouriteCountryStats}
        options={{
          title: 'Favourite Countries'
        }}
      />
      <Stack.Screen 
        name="Country Wise Stats"
        component={CountryWiseStats}
        options={{
          headerShown: false,
        }} 
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#2b8265', backgroundColor: "white",
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebar {...props} />}>
        <Drawer.Screen
          name="Overall Covid Stats"
          options={{ drawerLabel: 'Overall Covid Stats' }}
          component={screen1Stack}
        />
        <Drawer.Screen
          name="Country Wise Stats"
          options={{ drawerLabel: 'Country Wise Stats' }}
          component={screen2Stack}
        />
        <Drawer.Screen
          name="Favourite Countries "
          options={{ drawerLabel: 'Favourite Countries' }}
          component={screen3Stack}
        />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}

export default App;
