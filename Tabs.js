import React from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Ionicons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';

//Pages
import dashboard from './src/pages/dashboard';
import productView from './src/pages/productView';
import cart from './src/pages/cart';
//import Search from './src/pages/Search';
//import Settings from './src/pages/Settings';

const Tab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();
const SearchStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const DashboardStackScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <DashboardStack.Navigator>
        <DashboardStack.Screen
          name="Home"
          component={dashboard}
          options={({navigation}) => ({headerShown:false})}
        />
        <DashboardStack.Screen
          name="ProductView"
          component={productView}
          options={({navigation}) => ({headerShown:false})}
        />
      </DashboardStack.Navigator>
    </SafeAreaView>
  );
};
const SearchStackScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchStack.Navigator>
        <SearchStack.Screen
          name="Search"
          options={({navigation}) => ({headerShown:false})}
          component={dashboard}
        />
      </SearchStack.Navigator>
    </SafeAreaView>
  );
};
const CartStackScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CartStack.Navigator>
        <CartStack.Screen
          name="Cart"
          component={cart}
          options={({navigation}) => ({headerShown:false})}
        />
      </CartStack.Navigator>
    </SafeAreaView>
  );
};
const ProfileStackScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Account"
          component={dashboard}
          options={({navigation}) => ({headerShown:false})}
        />
      </ProfileStack.Navigator>
    </SafeAreaView>
  );
};

const Tabs = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
          style: {
            position: 'absolute',
            elevation: 5,
            height: 63,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            elevation: 12
          },
        }}>
          <Tab.Screen
            name="Home"
            component={DashboardStackScreen}
            options={({navigation}) => ({
              tabBarIcon: ({focused}) =>
                focused ? (
                  <View style={{alignItems:"center", backgroundColor: "#69B142", height:55, width:55, borderRadius: 100, justifyContent:"center"}}>
                    <Ionicons name="home" 
                      color={"#fff"}
                      size={26.5}
                    />
                  </View>
                ) : (
                  <View style={{alignItems:"center"}}>
                    <Ionicons name="home" 
                      color={"#69B142"}
                      size={24}
                    />
                    <Text style={{color:"#69B142", fontSize: 12, fontWeight:"bold", marginTop: 2}}>Home</Text>
                  </View>
                ),
            })}
          />
          <Tab.Screen
            name="Search"
            component={SearchStackScreen}
            options={({navigation}) => ({
              tabBarIcon: ({focused}) =>
                focused ? (
                  <View style={{alignItems:"center", backgroundColor: "#69B142", height:55, width:55, borderRadius: 100, justifyContent:"center"}}>
                    <FontAwesome name="search"
                      color={"#fff"}
                      size={26.5}
                    />
                  </View>
                ) : (
                  <View style={{alignItems:"center"}}>
                    <FontAwesome name="search"
                      color={"#69B142"}
                      size={24}
                    />
                    <Text style={{color:"#69B142", fontSize: 12, fontWeight:"bold", marginTop: 2}}>Search</Text>
                  </View>
                ),
            })}
          />
          <Tab.Screen
            name="Cart"
            component={CartStackScreen}
            options={({navigation}) => ({
              tabBarIcon: ({focused}) =>
                focused ? (
                  <View style={{alignItems:"center", backgroundColor: "#69B142", height:55, width:55, borderRadius: 100, justifyContent:"center"}}>
                    <AntDesign name="shoppingcart" size={27} color="#fff" />
                  </View>
                ) : (
                  <View style={{alignItems:"center", }}>
                    <Badge size={20} style={{top: -8, left: 15, position:"absolute", zIndex: 99999}}>3</Badge>
                    <AntDesign name="shoppingcart" size={25} color="#69B142" />
                    <Text style={{color:"#69B142", fontSize: 12, fontWeight:"bold", marginTop: 2}}>Cart</Text>
                  </View>
                ),
            })}
          />
          <Tab.Screen
            name="Account"
            component={ProfileStackScreen}
            options={({navigation}) => ({
              tabBarIcon: ({focused}) =>
                focused ? (
                  <View style={{alignItems:"center", backgroundColor: "#69B142", height:55, width:55, borderRadius: 100, justifyContent:"center"}}>
                    <FontAwesome name="user-o"
                      color={"#fff"}
                      size={27}
                    />
                  </View>
                ) : (
                  <View style={{alignItems:"center"}}>
                    <FontAwesome name="user-o"
                      color={"#69B142"}
                      size={25}
                    />
                    <Text style={{color:"#69B142", fontSize: 12, fontWeight:"bold", marginTop: 2}}>Account</Text>
                  </View>
                ),
            })}
          />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Tabs;