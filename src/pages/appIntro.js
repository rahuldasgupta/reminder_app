import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Lottie from 'lottie-react-native';
import { Switch } from 'react-native-paper';
import { Feather, Entypo, AntDesign, Ionicons} from '@expo/vector-icons';

const slides = [
  {
    key: 1,
    image_id: 1,
    text: 'Create Plans Create\nPlans',
    image: require('../../assets/appIntro_1.png'),
    subText: 'Lorem epsum Lorem epsumLorem epsum Lorem epsum Lorem epsum Lorem epsumLorem epsum Lorem epsum',
  },
  {
    key: 2,
    image_id: 2,
    text: 'Set Reminder with Priority levels',
    image: require('../../assets/slider_2.png'),
    subText: 'Lorem epsum Lorem epsumLorem epsum Lorem epsum Lorem epsum Lorem epsumLorem epsum Lorem epsum',
  },
  {
    key: 3,
    image_id: 3,
    text: 'Don’t miss the special days',
    image: require('../../assets/slider_3.png'),
    subText: 'Lorem epsum Lorem epsumLorem epsum Lorem epsum Lorem epsum Lorem epsumLorem epsum Lorem epsum',
  }
];

export default class appIntro extends React.Component{
  constructor(props) {
    super(props);    
      this.state = {
        userData: {},
        isSwitchOn: true
      };
    }
  _renderItem = ({ item }) => {
    return (
      <View style={{backgroundColor:"#fff", width:"100%", height:"100%",}}>
        <StatusBar backgroundColor={"#fff"} style="dark" />
        {
          item.image_id === 1 ?
            <>
              <View style={styles.cardGrey}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                  <View style={{width:"88%"}}>
                    <Text style={{fontSize: 13, fontFamily:"Poppins-SemiBold", opacity: 0.5}}>Google Meet with UI Designer on the appwiz - Redcrix</Text>
                  </View>
                  <Switch value={false} color="#6D6D6D"/>
                </View>
                <Text style={{fontSize: 12, color:"#7E7E7E", fontFamily:"Poppins-Medium",opacity: 0.5}}>Wanna miss these?</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1.5%", alignItems:"center"}}>
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Ionicons name="time-outline" size={19} color="#7E7E7E" />
                    <Text style={{fontFamily:"Poppins-Medium", color:"#7E7E7E", opacity: 0.5, marginLeft: 5, fontSize: 14}}>in 2h 55m</Text>
                  </View>
                  <Text style={{fontFamily:"Poppins-Medium", color:"#000000", opacity: 0.5, fontSize: 25}}>09:05<Text style={{color:"#BDBDBD", fontFamily:"Poppins-Medium", fontSize: 14}}>AM</Text></Text>
                </View>
              </View>
              <View style={styles.cardGreen3}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                  <View style={{width:"88%"}}>
                    <Text style={styles.cardText}>Google Meet with UI Designer on the appwiz - Redcrix</Text>
                  </View>
                  <Switch value={true} color="#72A01C"/>
                </View>
                <Text style={{fontSize: 12, lineHeight:12, color:"#7E7E7E", fontFamily:"Poppins-Medium"}}>Wanna miss these?</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1.5%", alignItems:"center"}}>
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Ionicons name="time-outline" size={19} color="#587424" />
                    <Text style={{fontFamily:"Poppins-Medium", color:"#587424", marginLeft: 5, fontSize: 14}}>in 2h 55m</Text>
                  </View>
                  <Text style={{fontFamily:"Poppins-Medium", color:"#000000", fontSize: 25}}>09:05<Text style={{color:"#BDBDBD", fontFamily:"Poppins-Medium", fontSize: 14}}>AM</Text></Text>
                </View>
              </View>
              <View style={{flexDirection:"row", marginTop:"5%"}}>
                <View style={{height:8, width: 80, backgroundColor:"#587424", marginLeft:"8%", borderRadius: 100}}></View>
                <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
                <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
              </View>
            </>
            
          :
            <></>
        }
        {
          item.image_id === 2 ?
          <>
            <View style={{marginTop:"27%", flexDirection:"row", justifyContent:"center" }}>
              <View style={{ height: 40, width: 84, marginRight: 10, borderRadius: 100, backgroundColor: "#14ff00", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                  <Text style={{fontFamily:"Poppins-Medium", fontSize: 15, color: "#1b9610"}}>LOW</Text>
              </View>
              <View style={{ height: 40, width: 105, borderRadius: 100, marginRight: 10, backgroundColor: "#f6e661", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                  <Text style={{fontFamily:"Poppins-Medium", fontSize: 15, color: "#857800"}}>MEDIUM</Text>
              </View>
              <View style={{ height: 40, width: 91, borderRadius: 100, backgroundColor: "#ff8888", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                  <Text style={{fontFamily:"Poppins-Medium", fontSize: 15, color: "#c80505"}}>HIGH</Text>
              </View>
            </View>
            <View style={styles.cardGreen}>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <View style={{width:"88%"}}>
                  <Text style={styles.cardText}>Google Meet with UI Designer on the appwiz - Redcrix</Text>
                </View>
                <Switch value={true} color="#72A01C"/>
              </View>
              <Text style={{fontSize: 12, lineHeight:12, color:"#7E7E7E", fontFamily:"Poppins-Medium"}}>Wanna miss these?</Text>
              <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1.5%", alignItems:"center"}}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                  <Ionicons name="time-outline" size={19} color="#587424" />
                  <Text style={{fontFamily:"Poppins-Medium", color:"#587424", marginLeft: 5, fontSize: 14}}>in 2h 55m</Text>
                </View>
                <Text style={{fontFamily:"Poppins-Medium", color:"#000000", fontSize: 25}}>09:05<Text style={{color:"#BDBDBD", fontFamily:"Poppins-Medium", fontSize: 14}}>AM</Text></Text>
              </View>
            </View>
            <View style={{flexDirection:"row", marginTop:"5%"}}>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: "8%", borderRadius: 100}}></View>
              <View style={{height:8, width: 75, backgroundColor:"#587424", marginLeft: 10, borderRadius: 100}}></View>
              <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
            </View>
          </>
            
          :
            <></>
        }
        {
          item.image_id === 3 ?
            <>
              <Lottie source={require('../../assets/happy-birthday.json')} style={{alignSelf:"center", marginTop: "-55%"}} autoPlay loop />
              <View style={styles.cardGreen2}>
                <Text style={{textAlign:"center", fontFamily:"Poppins-Medium"}}>Today is Rahul's birthday. Make his day special by sending him wishes.</Text>
              </View>
              <View style={{flexDirection:"row", marginTop:"5%"}}>
                <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: "8%", borderRadius: 100}}></View>
                <View style={{height:8, width: 8, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}></View>
                <View style={{height:8, width: 59, backgroundColor:"#587424", marginLeft: 10, borderRadius: 100}}></View>
              </View>
            </>
            
          :
            <></>
        }
        <Text style={{color:"#000000", textAlign:"center", fontSize: 30, fontFamily:"Poppins-Medium", lineHeight: 45, marginTop:"10%", marginLeft:"5%", marginRight:"5%"}}>{item.text}</Text>
        <Text style={{color:"#7E7E7E", textAlign:"center", fontSize: 15, fontFamily:"Poppins-Regular", marginTop:10, marginLeft:"10%", marginRight:"10%"}}>{item.subText}</Text>
      </View>
    );
  }
  _onDone = () => {
    this.props.navigation.navigate("Dashboard");
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonStyle}>
        <Text style={{color:"#fff", fontSize: 17, fontFamily:"Poppins-Medium"}}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonStyle}>
        <Text style={{color:"#fff", fontSize: 17, fontFamily:"Poppins-Medium"}}>Get Started</Text>
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
    width: "80%",
    height: 55,
    backgroundColor:"#3B4130",
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    marginBottom: "10%"
  },
  cardGrey:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width:"88%",
    minHeight: 100,
    marginBottom: "5.5%",
    marginLeft:"6%", backgroundColor:"#E2E2E2",
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#B4B4B4",
    paddingLeft: "5%",
    paddingRight:"5%",
    paddingTop: 10,
    paddingBottom: 5,
    marginTop:"27%"
  },
  cardGreen:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width:"88%",
    minHeight: 100,
    marginBottom: "5.5%",
    marginLeft:"6%", backgroundColor:"#fff",
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#82f678",
    paddingLeft: "5%",
    paddingRight:"5%",
    paddingTop: 10,
    paddingBottom: 5,
    marginTop:"27%"
  },
  cardGreen2:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width:"88%", justifyContent:"center", alignItems:"center", alignSelf:"center",
    minHeight: 100,
    marginBottom: "5.5%",
    marginLeft:"6%",
    marginRight:"6%", backgroundColor:"#fff",
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#82f678",
    paddingLeft: "5%",
    paddingRight:"5%",
    paddingTop: 10,
    paddingBottom: 5,
    marginTop:"65%"
  },
  cardGreen3:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    transform: [{ rotate: '-5deg' }],
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width:"88%",
    minHeight: 100,
    marginBottom: "5.5%",
    marginLeft:"6%", backgroundColor:"#fff",
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#14FF00",
    paddingLeft: "5%",
    paddingRight:"5%",
    paddingTop: 10,
    paddingBottom: 5,
    marginTop:"2%"
  },
  cardText:{
    fontSize: 13,
    fontFamily:"Poppins-SemiBold"
  }
});
