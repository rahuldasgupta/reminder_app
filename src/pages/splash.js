import React from "react";
import { Image, View, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default class splash extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          userData: {},
        };
    }
    checkLogin = async () => {
      let user = await AsyncStorage.getItem('userData');  
      let parsed = JSON.parse(user);
      if(parsed)
        {
          this.props.navigation.navigate("Dashboard");
        }
      else {
        this.props.navigation.navigate("appIntro");
      }
    }
    componentDidMount(){
      this.checkLogin();
    }
    render(){
        return(
            <View style={{flex: 1, alignItems: "center", alignSelf:"center", justifyContent:"center", backgroundColor: "#fff"}}>
              <StatusBar backgroundColor={"#fff"} style="dark" />
                <Image
                    source={require("../../assets/splash.png")}
                    style={{
                    height: "100%",
                    width: "100%",
                    resizeMode:"contain"
                    }}
                />
            </View>
        );
    }
}