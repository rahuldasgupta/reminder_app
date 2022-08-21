import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Entypo, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

const slides = [
  {
    key: 1,
    text: 'Organic\nFruits & Vegetables',
    image: require('../../assets/slider_1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 2,
    text: 'Get delivered\nright at your doorstep',
    image: require('../../assets/slider_2.png'),
    backgroundColor: '#fff',
  },
  {
    key: 3,
    text: 'Hand-picked\nfrom the best farms in Nagaland',
    image: require('../../assets/slider_3.png'),
    backgroundColor: '#fff',
  }
];

export default class appIntro extends React.Component{
  constructor(props) {
    super(props);    
      this.state = {
        userData: {},
      };
    }
  _renderItem = ({ item }) => {
    return (
      <View style={{backgroundColor:"#fff", width:"100%", height:"100%",}}>
        <StatusBar backgroundColor={"#fff"} style="dark" />
        <Image source={item.image} style={{ marginTop:"25%",alignSelf:"center", height:380, width: 380,}} />
        <Text style={{color:"#455a64", textAlign:"center", fontSize: 29, fontWeight: "bold", lineHeight: 47, marginTop:"10%"}}>{item.text}</Text>
        <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row", justifyContent:"space-evenly", marginTop:"10%"}}>
          <View style={{flexDirection:"row", alignItems:"center", padding:7, paddingLeft: 10, paddingRight: 10, borderWidth:1, borderColor:"#F0F0F0", borderRadius: 10}}>
            <Entypo name="thumbs-up" size={24} color="#9fd980" />
            <Text style={{marginLeft: 5}}>Best Quality</Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center", padding:7, paddingLeft: 10, paddingRight: 10, borderWidth:1, borderColor:"#F0F0F0", borderRadius: 10}}>
            <SimpleLineIcons name="badge" size={24} color="#9fd980" />
            <Text style={{marginLeft: 5}}>100% Organic</Text>
          </View>
        </View>
      </View>
    );
  }
  _onDone = () => {
    this.props.navigation.navigate("Dashboard");
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign name="arrowright" size={24} color="#9fd980" />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign name="check" size={24} color="#9fd980" />
      </View>
    );
  };
  render(){
    return (
      <View style={{flex: 1}}>
          <AppIntroSlider
            renderItem={this._renderItem}
            data={slides}
            onDone={this._onDone}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            activeDotStyle={{
              backgroundColor: 'rgba(159, 217, 128, .9)'
            }}
          />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 45,
    height: 45,
    borderWidth:1.2,
    borderColor:"#C8C8C8",
    borderRadius: 45/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
