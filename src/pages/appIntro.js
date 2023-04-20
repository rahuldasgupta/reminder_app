import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    image_id: 1,
    text: 'Create Plans',
    image: require('../../assets/slider_1.png'),
    subText: 'Lorem epsum Lorem epsumLorem epsum Lorem epsum Lorem epsum Lorem epsumLorem epsum Lorem epsum',
  },
  {
    key: 2,
    image_id: 2,
    text: 'Reminder',
    image: require('../../assets/slider_2.png'),
    subText: 'Lorem epsum Lorem epsumLorem epsum Lorem epsum Lorem epsum Lorem epsumLorem epsum Lorem epsum',
  },
  {
    key: 3,
    image_id: 3,
    text: 'Don’t miss the\nspecial days',
    image: require('../../assets/slider_3.png'),
    subText: 'Lorem epsum Lorem epsumLorem epsum Lorem epsum Lorem epsum Lorem epsumLorem epsum Lorem epsum',
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
        <Image source={item.image} style={{ marginTop:"25%",alignSelf:"center", height:350, width: 350,}} />
        {
          item.image_id === 1 ?
            <View style={{flexDirection:"row", marginTop:"5%"}}>
              <View style={{height:8, width: 100, backgroundColor:"#3B4130", marginLeft:"8%", borderRadius: 100}}></View>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
            </View>
          :
            <></>
        }
        {
          item.image_id === 2 ?
            <View style={{flexDirection:"row", marginTop:"5%"}}>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: "8%", borderRadius: 100}}></View>
              <View style={{height:8, width: 100, backgroundColor:"#3B4130", marginLeft: 10, borderRadius: 100}}></View>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
            </View>
          :
            <></>
        }
        {
          item.image_id === 3 ?
            <View style={{flexDirection:"row", marginTop:"5%"}}>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: "8%", borderRadius: 100}}></View>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
              <View style={{height:8, width: 100, backgroundColor:"#3B4130", marginLeft: 10, borderRadius: 100}}></View>
            </View>
          :
            <></>
        }
        <Text style={{color:"#000000", textAlign:"center", fontSize: 30, fontWeight: "bold", lineHeight: 45, marginTop:"10%"}}>{item.text}</Text>
        <Text style={{color:"#7E7E7E", textAlign:"center", fontSize: 15, lineHeight: 22.5, marginTop:10, marginLeft:"10%", marginRight:"10%"}}>{item.subText}</Text>
      </View>
    );
  }
  _onDone = () => {
    this.props.navigation.navigate("Dashboard");
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonStyle}>
        <Text style={{color:"#fff", fontSize: 18, fontWeight:"500"}}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonStyle}>
        <Text style={{color:"#fff", fontSize: 18, fontWeight:"500"}}>Get Started</Text>
      </View>
    );
  };
  render(){
    return (
      <View style={{flex: 1}}>
          <AppIntroSlider
            renderItem={this._renderItem}
            data={slides}
            bottomButton={true}
            onDone={this._onDone}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            dotStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
          />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 250,
    height: 55,
    backgroundColor:"#3B4130",
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    marginBottom: "10%"
  }
});
