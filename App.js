import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { LogBox } from 'react-native';

//Pages
import splash from './src/pages/splash';
import appIntro from './src/pages/appIntro';
import dashboard from './src/pages/dashboard';

const AuthStack = createStackNavigator();
const AppLoad = createStackNavigator();

const AuthStackScreen = ({navigation}) => {
  return(
    <AuthStack.Navigator initialRouteName='Splash'>
      <AuthStack.Screen name="Splash" component={splash} options={{headerShown: false}}/>
      <AuthStack.Screen name="appIntro" component={appIntro} options={{headerShown: false}}/>
      <AuthStack.Screen name="dashboard" component={dashboard} options={{headerShown: false}}/>
    </AuthStack.Navigator>
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
        <AppLoad.Navigator initialRouteName='Home'>
          <AppLoad.Screen name="Home" component={AuthStackScreen} options={{headerShown: false}}/>
          {/*<AppLoad.Screen name="Dashboard" component={Tabs} options={{headerShown: false}}/> */}
        </AppLoad.Navigator>
      </NavigationContainer>
    );
  }
}