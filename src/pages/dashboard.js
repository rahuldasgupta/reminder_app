import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Feather, Entypo, AntDesign, Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from "moment";

const windowWidth = Dimensions.get('window').width;

export default class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      isSwitchOn: true
    }
  }
  onToggleSwitch = async(id, value) => {
    let array = this.state.reminders
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array[i].isActive = value;
        break;
      }
    }
    this.setState({
      reminders: array
    })
    await AsyncStorage.setItem('remindersData', JSON.stringify(array))
  }
  async componentDidMount(){
    this.loadData()
    this.focusListener = this.props.navigation.addListener('focus', async() => {
        let reminders = await AsyncStorage.getItem('remindersData');  
        let parsed = JSON.parse(reminders);
        if(parsed){
          this.setState({
            reminders: parsed
          })
        }
    });
  }
  loadData = async () => {
    let reminders = await AsyncStorage.getItem('remindersData');  
    let parsed = JSON.parse(reminders);
    if(parsed){
      this.setState({
        reminders: parsed
      })
    }
    setTimeout(() => {
      this.loadData();
    }, 10000)
  }
  deleteReminder = async (data) => {
    let id = data;
    let reminders = await AsyncStorage.getItem('remindersData');  
    let parsed = JSON.parse(reminders);
    parsed = parsed.filter(reminders => reminders.id != id)
    console.log("Updated Reminders ===> ", parsed)
    AsyncStorage.setItem('remindersData', JSON.stringify(parsed))
    this.componentDidMount();
  }
  showTimeLeft = (data, repeatMode) => {
    var dateNow = new Date();
    const now = moment(dateNow);
    const deadline = moment(data.dateTime);
    const difference = deadline.diff(now);
    const differenceDuration = moment.duration(difference);
    let daysLeft = differenceDuration.days()
    let hoursLeft = differenceDuration.hours()
    let minsLeft = differenceDuration.minutes()
    return(
      <>
      {
        daysLeft > 0 ?
          <Text style={{fontFamily:"Poppins-Medium", color: data.isActive ? "#587424" : "#929292", marginLeft: 5, fontSize: 14}}>in {daysLeft}d {hoursLeft}h {repeatMode == "Does not repeat" ? "" : " | " + repeatMode}</Text>
        :
          <Text style={{fontFamily:"Poppins-Medium", color: data.isActive ? "#587424" : "#929292", marginLeft: 5, fontSize: 14}}>in {hoursLeft}h {minsLeft}m {repeatMode == "Does not repeat" ? "" : " | " + repeatMode}</Text>
      }
      </>
    )
  }
  renderConsole = (data) => {
    let tasksArr = data.tasksArray
    const filteredArray = tasksArr.filter(item => item !== null);
    console.log(filteredArray)
    return(
      <View style={{marginTop: 10}}>
        {
          filteredArray.map((item, key) =>(
            <View style={{flexDirection:"row", alignItems:"center", marginBottom: 5}}>
              <Entypo name="check" size={13} color="black" style={{padding: 2.5, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
              <Text style={{marginLeft: 5, color: "#7E7E7E"}}>{item}</Text>
            </View>
          ))
        }
      </View>
    )
  }
  render() {
      return (
        <View style={{ flex: 1, backgroundColor:"#F9F9F9", width: windowWidth}}>
          <StatusBar style="dark" backgroundColor={"#fff"} />
          <View style={styles.navbar}>
            <View style={{ padding: 10, height: 40, width: 40, backgroundColor:"#E3EDD23B", borderRadius: 10}}>
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Image
                    source={require("../../assets/nav.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row"}}>
              <Feather name="calendar" size={18} color="black" />
              <Text style={{fontSize: 14.5, marginLeft: 5, fontFamily:"Poppins-Medium", marginRight: 5}}>Thu, 20 June</Text>
              <Entypo name="chevron-down" size={20} color="black" />
            </View>
            <View style={{ padding: 10, height: 40, width: 40, backgroundColor:"#E3EDD23B", borderRadius: 10}}>
              <Image
                  source={require("../../assets/search.png")}
              />
            </View>
          </View>
          <View style={{height:54, width: 54, borderRadius: 13, backgroundColor:"#3B4130", position:"absolute", zIndex: 999999, top: "90%", left: "80%", justifyContent:"center", alignSelf:"center", alignItems:"center"}}>
            <TouchableOpacity onPress={() =>  this.props.navigation.navigate("Create Reminder")}>
              <AntDesign name="plus" size={30} color="#E3EDD2" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20, marginLeft:"5%", marginRight:"5%"}}>
            <Text style={{fontSize: 22, lineHeight:33, fontFamily:"Poppins-Medium"}}>Upcoming Reminders</Text>
            <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", color:"#7E7E7E", marginTop: 3, marginBottom:"7%"}}>Wanna miss these?</Text>
          </View>
          <SwipeListView
            data={this.state.reminders}
            disableLeftSwipe={true}
            renderItem={(data, rowMap) => (
              <>
                {
                  data.item.priority === "High" && data.item.isActive ?
                    <View style={styles.cardRed}>
                      <View style={{flexDirection:"row", alignItems:"center"}}>
                        <View style={{width:"88%"}}>
                          <Text style={styles.cardText}>{data.item.reminderName}</Text>
                        </View>
                        <Switch value={data.item.isActive} onValueChange={() => this.onToggleSwitch(data.item.id, false)} color="#72A01C"/>
                      </View>
                      <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", marginTop: -15, color:"#7E7E7E"}}>Wanna miss these?</Text>
                      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1%", alignItems:"center"}}>
                        <View style={{flexDirection:"row"}}>
                          <Ionicons name="time-outline" size={19} color="#587424" />
                          {this.showTimeLeft(data.item, data.item.repeatMode)}
                        </View>
                        <Text style={{fontFamily:"Poppins-Medium", color:"#000000", fontSize: 24}}>{data.item.reminderTime}</Text>
                      </View>
                    </View>
                  :
                  <></>
                }
                {
                  data.item.priority === "High" && data.item.isActive == false ?
                  <View style={styles.cardGrey}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      <View style={{width:"88%"}}>
                        <Text style={{fontSize: 13, color:"#6D6D6D", fontFamily:"Poppins-SemiBold"}}>{data.item.reminderName}</Text>
                      </View>
                      <Switch value={data.item.isActive} onValueChange={() => this.onToggleSwitch(data.item.id, true)} color="#72A01C"/>
                    </View>
                    <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", marginTop: -15, color:"#929292"}}>Wanna miss these?</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1%", alignItems:"center"}}>
                      <View style={{flexDirection:"row"}}>
                        <Ionicons name="time-outline" size={19} color="#929292" />
                        {this.showTimeLeft(data.item, data.item.repeatMode)}
                      </View>
                      <Text style={{fontFamily:"Poppins-Medium", color:"#6D6D6D", fontSize: 24}}>{data.item.reminderTime}</Text>
                    </View>
                  </View>
                  :
                  <></>
                }
                {
                  data.item.priority === "Medium" && data.item.isActive ?
                    <View style={styles.cardYellow}>
                      <View style={{flexDirection:"row", alignItems:"center"}}>
                        <View style={{width:"88%"}}>
                          <Text style={styles.cardText}>{data.item.reminderName}</Text>
                        </View>
                        <Switch value={data.item.isActive} onValueChange={() => this.onToggleSwitch(data.item.id, false)} color="#72A01C"/>
                      </View>
                      <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", marginTop: -15, color:"#7E7E7E"}}>Wanna miss these?</Text>
                      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1%", alignItems:"center"}}>
                        <View style={{flexDirection:"row"}}>
                          <Ionicons name="time-outline" size={19} color="#587424" />
                          {this.showTimeLeft(data.item, data.item.repeatMode)}
                        </View>
                        <Text style={{fontFamily:"Poppins-Medium", color:"#000000", fontSize: 24}}>{data.item.reminderTime}</Text>
                      </View>
                    </View>
                  :
                  <></>
                }
                {
                  data.item.priority === "Medium" && data.item.isActive == false ?
                  <View style={styles.cardGrey}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      <View style={{width:"88%"}}>
                        <Text style={{fontSize: 13, color:"#6D6D6D", fontFamily:"Poppins-SemiBold"}}>{data.item.reminderName}</Text>
                      </View>
                      <Switch value={data.item.isActive} onValueChange={() => this.onToggleSwitch(data.item.id, true)} color="#72A01C"/>
                    </View>
                    <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", marginTop: -15, color:"#929292"}}>Wanna miss these?</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1%", alignItems:"center"}}>
                      <View style={{flexDirection:"row"}}>
                        <Ionicons name="time-outline" size={19} color="#929292" />
                        {this.showTimeLeft(data.item, data.item.repeatMode)}
                      </View>
                      <Text style={{fontFamily:"Poppins-Medium", color:"#6D6D6D", fontSize: 24}}>{data.item.reminderTime}</Text>
                    </View>
                  </View>
                  :
                  <></>
                }

                {
                  data.item.priority === "Low" && data.item.isActive ?
                    <View style={styles.cardGreen}>
                      <View style={{flexDirection:"row", alignItems:"center"}}>
                        <View style={{width:"88%"}}>
                          <Text style={styles.cardText}>{data.item.reminderName}</Text>
                        </View>
                        <Switch value={data.item.isActive} onValueChange={() => this.onToggleSwitch(data.item.id, false)} color="#72A01C"/>
                      </View>
                      <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", marginTop: -15, color:"#7E7E7E"}}>Wanna miss these?</Text>
                      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1%", alignItems:"center"}}>
                        <View style={{flexDirection:"row"}}>
                          <Ionicons name="time-outline" size={19} color="#587424" />
                          {this.showTimeLeft(data.item, data.item.repeatMode)}
                        </View>
                        <Text style={{fontFamily:"Poppins-Medium", color:"#000000", fontSize: 24}}>{data.item.reminderTime}</Text>
                      </View>
                    </View>
                  :
                  <></>
                }
                {
                  data.item.priority === "Low" && data.item.isActive == false ?
                  <View style={styles.cardGrey}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      <View style={{width:"88%"}}>
                        <Text style={{fontSize: 13, color:"#6D6D6D", fontFamily:"Poppins-SemiBold"}}>{data.item.reminderName}</Text>
                      </View>
                      <Switch value={data.item.isActive} onValueChange={() => this.onToggleSwitch(data.item.id, true)} color="#72A01C"/>
                    </View>
                    <Text style={{fontSize: 12, fontFamily:"Poppins-Medium", marginTop: -15, color:"#929292"}}>Wanna miss these?</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"1%", alignItems:"center"}}>
                      <View style={{flexDirection:"row"}}>
                        <Ionicons name="time-outline" size={19} color="#929292" />
                        {this.showTimeLeft(data.item, data.item.repeatMode)}
                      </View>
                      <Text style={{fontFamily:"Poppins-Medium", color:"#6D6D6D", fontSize: 24}}>{data.item.reminderTime}</Text>
                    </View>
                  </View>
                  :
                  <></>
                }
              </>
            )}
            renderHiddenItem={(data, rowMap) => (
              <TouchableOpacity onPress={() => this.deleteReminder(data.item.id)}>
                <View style={{height: "75%", backgroundColor:"#FE8B8B", margin:"7%", width:"50%", marginTop: "1%", borderRadius: 15, justifyContent:"center", }}>
                  <Text style={{color:"#fff", fontFamily:"Poppins-Medium", fontSize: 14, marginLeft:"13%"}}>Delete</Text>  
                </View>
              </TouchableOpacity>
            )}
            leftOpenValue={100}
            rightOpenValue={-70}
          /> 
            
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    navbar: {
      backgroundColor: "#fff",
      height: 70,
      width: "100%",
      justifyContent:"space-between",
      flexDirection:"row",
      marginTop: 30,
      paddingLeft: "5%",
      paddingRight: "5%",
      alignItems:"center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 2,
    },
    cardRed:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      width:"90%",
      marginBottom: "5.5%",
      marginLeft:"5%", backgroundColor:"#fff",
      borderRadius: 20,
      borderLeftWidth: 4,
      borderLeftColor: "#FE8B8B",
      paddingLeft: "5%",
      paddingRight:"5%",
      paddingTop: 0,
      paddingBottom: "1.5%"
    },
    cardYellow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      width:"90%",
      marginBottom: "5.5%",
      marginLeft:"5%", backgroundColor:"#fff",
      borderRadius: 20,
      borderLeftWidth: 4,
      borderLeftColor: "#F6E661",
      paddingLeft: "5%",
      paddingRight:"5%",
      paddingTop: 0,
      paddingBottom: "1.5%"
    },
    cardGreen:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      width:"90%",
      marginBottom: "5.5%",
      marginLeft:"5%", backgroundColor:"#fff",
      borderRadius: 20,
      borderLeftWidth: 4,
      borderLeftColor: "#14FF00",
      paddingLeft: "5%",
      paddingRight:"5%",
      paddingTop: 0,
      paddingBottom: "1.5%"
    },
    cardGrey:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      width:"90%",
      marginBottom: "5.5%",
      marginLeft:"5%", backgroundColor:"#E2E2E2",
      borderRadius: 20,
      borderLeftWidth: 4,
      borderLeftColor: "#B4B4B4",
      paddingLeft: "5%",
      paddingRight:"5%",
      paddingTop: 0,
      paddingBottom: "1.5%"
    },
    cardText:{
      fontSize: 13,
      fontFamily:"Poppins-SemiBold",
      marginBottom: 2
    }
  })