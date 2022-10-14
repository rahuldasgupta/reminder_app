import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox } from 'react-native';

//Pages
import splash from './src/pages/splash';
import appIntro from './src/pages/appIntro';
import dashboard from './src/pages/dashboard';
import createReminder from './src/pages/createReminder';
import DrawerContent from "./Drawer";

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const AppLoad = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackScreen = ({navigation}) => {
  return(
    <AuthStack.Navigator initialRouteName='Splash'>
      <AuthStack.Screen name="Splash" component={splash} options={{headerShown: false}}/>
      <AuthStack.Screen name="appIntro" component={appIntro} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  );
}

const DashboardStackScreen = ({navigation}) => {
  return(
    <DashboardStack.Navigator initialRouteName='Dashboard'>
      <DashboardStack.Screen name="Dashboard" component={dashboard} options={{headerShown: false}}/>
      <DashboardStack.Screen name="Create Reminder" component={createReminder} options={{headerShown: false}}/>
    </DashboardStack.Navigator>
  );
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      userData: {},
    };
  }
  async componentDidMount()
  {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'  drawerStyle={{backgroundColor:'transparent', width:"90%"}} drawerContent={(props) => (<DrawerContent {...props} />)}>
          <AppLoad.Screen name="Home" component={AuthStackScreen} options={{headerShown: false}}/>
          <Drawer.Screen name="Dashboard" component={DashboardStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}