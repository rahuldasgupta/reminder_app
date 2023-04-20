import React from "react";
import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import { Audio } from 'expo-av';
import * as Notifications from "expo-notifications";

let _sound = null

export default class createReminder extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          id: Math.floor(Math.random() * 1000) + 1,
          reminderName: null,
          reminderType:"Reminder",

          reminderDate: "Select Date",
          reminderTrueDate: null,
          dateModal: false,

          reminderTime: "10:10 AM",
          reminderTrueTime: null,
          timeModal: false,
          reminderTypeModal: false,

          repeatMode: "Does not repeat",
          ringtone:"Default (Fresh Start)",
          ringtoneFile:"default",
          channelId: "default",
          vibration: true,
          priority:"Low",

          date_1: null,
          day_1: null,
          date_2: null,
          day_2: null,
          date_3: null,
          day_3: null,
          date_4: null,
          day_4: null,
          date_5: null,
          day_5: null,
          date_6: null,
          day_6: null,

          currentDate: moment().format('YYYY-MM-DD'),
        };
    }
    checkDates = async () => {
        var d = new Date()
        this.setState({
            date_1: d.toLocaleDateString().slice(0, 2)
        })
        d.setDate(d.getDate() + 1)
        this.setState({
            date_2: d.toLocaleDateString().slice(0, 2)
        })
        d.setDate(d.getDate() + 1)
        this.setState({
            date_3: d.toLocaleDateString().slice(0, 2)
        })
        d.setDate(d.getDate() + 1)
        this.setState({
            date_4: d.toLocaleDateString().slice(0, 2)
        })
        d.setDate(d.getDate() + 1)
        this.setState({
            date_5: d.toLocaleDateString().slice(0, 2)
        })
        d.setDate(d.getDate() + 1)
        this.setState({
            date_6: d.toLocaleDateString().slice(0, 2)
        })
        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var days = new Date();

        let day_1 = days.getDay();
        this.setState({
            day_1: weekday[day_1]
        })

        if(day_1 == 6){
            var day_2 = 0;
            this.setState({
                day_2: weekday[day_2]
            })
        }
        else{
            var day_2 = day_1+1;
            this.setState({
                day_2: weekday[day_2]
            })
        }

        if(day_2 == 6){
            var day_3 = 0;
            this.setState({
                day_3: weekday[day_3]
            })
        }
        else{
            var day_3 = day_2+1;
            this.setState({
                day_3: weekday[day_3]
            })
        }

        if(day_3 == 6){
            var day_4 = 0;
            this.setState({
                day_4: weekday[day_4]
            })
        }
        else{
            var day_4 = day_3+1;
            this.setState({
                day_4: weekday[day_4]
            })
        }

        if(day_4 == 6){
            var day_5 = 0;
            this.setState({
                day_5: weekday[day_5]
            })
        }
        else{
            var day_5 = day_4+1;
            this.setState({
                day_5: weekday[day_5]
            })
        }

        if(day_5 == 6){
            var day_6 = 0;
            this.setState({
                day_6: weekday[day_6]
            })
        }
        else{
            var day_6 = day_5+1;
            this.setState({
                day_6: weekday[day_6]
            })
        }
    }
    async componentDidMount(){
      this.checkDates();
      let reminders = await AsyncStorage.getItem('remindersData');  
        let parsed = JSON.parse(reminders);
        if(parsed){
            console.log(parsed)
        }
    }
    changeDate = (value) => {
        let year = value.slice(0, 4)
        let month = value.slice(5, 7)
        let day = value.slice(8, 10)
        let dateUnformat = day + "/" + month + "/" + year
        let dateTrueFormat = year + "-" + month + "-" + day
        let dateFormated = moment(dateUnformat, 'DD/MM/YYYY', true).format('Do MMMM, YYYY')
        console.log(dateFormated)
        this.setState({
            reminderDate: dateFormated, 
            reminderTrueDate: dateTrueFormat,
            dateModal: false
        })
    }
    changeTime = (value) => {
        console.log(value)
        let timeFormatted = moment(value, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')
        this.setState({
            reminderTime: timeFormatted,
            reminderTrueTime: value
        })
    }
    addReminder = async () => {
        let reminders = await AsyncStorage.getItem('remindersData');

        let reminderName = this.state.reminderName;
        let timeValue = this.state.reminderTrueTime;
        let trueTime = JSON.stringify(timeValue);
        let timeFormated = trueTime.slice(11, 25);
        let dateValue = this.state.reminderTrueDate;
        let date_time = dateValue+timeFormated;

        let parsed = JSON.parse(reminders);
        if(parsed){
            parsed.push(
                {
                    id: this.state.id,
                    reminderName: this.state.reminderName,
                    reminderDate: this.state.reminderDate,
                    reminderTrueDate: this.state.reminderTrueDate,
                    reminderTime: this.state.reminderTime,
                    reminderTrueTime: this.state.reminderTrueTime,
                    repeatMode: this.state.repeatMode,
                    ringtone: this.state.ringtone,
                    vibration: this.state.vibration,
                    priority: this.state.priority,
                    dateTime: date_time
                }
            )
            AsyncStorage.setItem('remindersData', JSON.stringify(parsed))
        }
        else{
            let remindersData = [];
            remindersData.push(
                {
                    id: "1",
                    reminderName: this.state.reminderName,
                    reminderDate: this.state.reminderDate,
                    reminderTrueDate: this.state.reminderTrueDate,
                    reminderTime: this.state.reminderTime,
                    reminderTrueTime: this.state.reminderTrueTime,
                    repeatMode: this.state.repeatMode,
                    ringtone: this.state.ringtone,
                    vibration: this.state.vibration,
                    priority: this.state.priority,
                    dateTime: date_time
                }
            )
            AsyncStorage.setItem('remindersData', JSON.stringify(remindersData))
        }
        console.log("Data Saved")
        this.createNotification(reminderName, date_time);
        this.props.navigation.navigate("Dashboard")
    }
    createNotification = async (name, time) => {
        let channel = this.state.channelId;
        let sounds = this.state.ringtoneFile;

        console.log("Sounds and Channel", sounds, channel)
        var date = new Date(time);
        var seconds = Math.floor(date.getTime()/1000);

        var dateNow = new Date();
        var secondsNow = Math.floor(dateNow.getTime()/1000);

        var secondsDifference = seconds-secondsNow
        console.log(secondsDifference)
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: 'Argon.wav'
        });
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            }),
        });
        Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("RESPONSE ====>", response);
          });
        Notifications.addNotificationReceivedListener((notification) => {
            console.log(notification);
        });
        await Notifications.scheduleNotificationAsync({
            content: {
              title: "You've a reminder ⏰",
              sound: 'Argon.wav',
              body: name,
              data: { data: 'goes here' },
              autoDismiss: false,
            },
            trigger: {
                seconds: secondsDifference,
                channelId: "default",
            },
        });
    }
    playSound = async (tune, fileName, channel) =>{
        this.setState({
            ringtone: tune,
            ringtoneFile: fileName,
            channelId: channel
        })
        _sound = new Audio.Sound();
        if(tune === "Bright Morning"){
            await _sound.loadAsync(require('../../assets/sounds/BrightMorning.mp3'), {shouldPlay: true});
            await _sound.setPositionAsync(0);
            await _sound.playAsync();
        }
        if(tune === "Argon"){
            await _sound.loadAsync(require('../../assets/sounds/Argon.mp3'), {shouldPlay: true});
            await _sound.setPositionAsync(0);
           await _sound.playAsync();
        }
        if(tune === "Carbon"){
            await _sound.loadAsync(require('../../assets/sounds/Carbon.mp3'), {shouldPlay: true});
            await _sound.setPositionAsync(0);
            await _sound.playAsync();
        }
        
    }
    handleSoneDone = async() => {
        if(_sound){
            await _sound.stopAsync();
        }
        this.RBSheet.close()
    }
    changeSong = async(tune, fileName, channel) => {
        if(_sound){
            await _sound.stopAsync();
        }
        this.playSound(tune, fileName, channel)
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor:"#fff"}}>
              <StatusBar backgroundColor={"#fff"} style="dark" />
                <Modal isVisible={this.state.dateModal} backdropOpacity={0.8} useNativeDriver={true}>
                    <View style={{ backgroundColor: '#fff', width: "90%", height: 380, justifyContent:"center", alignItems:"center", alignSelf:"center", borderRadius: 15}}>
                        <DatePicker
                            mode="calendar"
                            options={{
                                backgroundColor: '#fff',
                                textHeaderColor: '#587424',
                                textDefaultColor: '#000',
                                selectedTextColor: '#fff',
                                mainColor: '#587424',
                                textSecondaryColor: '#000',
                                borderColor: 'rgba(122, 146, 165, 0)',
                            }}
                            current={this.state.currentDate}
                            minimumDate={this.state.currentDate}
                            onDateChange={(selectedDate) => this.changeDate(selectedDate)}
                        />
                    </View>
                </Modal>
                <Modal isVisible={this.state.reminderTypeModal} backdropOpacity={0.8} useNativeDriver={true}>
                    <View style={{ backgroundColor: '#fff', width: "90%", height: 370, marginLeft:"5%", borderRadius: 24}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", margin:"6%", marginBottom:"4%", alignItems:"center"}}>
                            <TouchableOpacity onPress={() => this.setState({reminderTypeModal: false})}>
                                <Text style={{color:"#9F9F9F", fontWeight:"bold", fontSize: 12.5}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18, color:"#1E1E1E", fontWeight:"bold"}}>Reminder Event</Text>
                            <TouchableOpacity onPress={() => this.setState({reminderTypeModal: false})}>
                                <Text style={{color:"#3B4130", fontWeight:"bold", fontSize: 12.5}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopColor:"#EBEBEB", borderTopWidth: 1}}></View>
                        <Image
                            source={require("../../assets/reminderType.png")}
                            style={{resizeMode:"contain", justifyContent:"center", alignItems:"center", alignSelf:"center", marginTop:"6%", width:"90%"}}
                        />
                        <View style={{margin:"7%", marginBottom: 0}}>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Reminder"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/silent.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Reminder</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Reminder" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Tasks"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Tasks</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Tasks" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Goals"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Goals</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Goals" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Events"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Events</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Events" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Birthday"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Birthday</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Birthday" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Assignment"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Assignment</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Assignment" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{width:"100%", height: 125, backgroundColor:"#fff", elevation: 4, paddingTop: "5%", paddingLeft:"7%", paddingRight:"7%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <View>
                        <TouchableOpacity>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.setState({reminderTypeModal: true})}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <Text style={{color:"#000", fontWeight:"bold", fontSize: 24}}>{this.state.reminderType}</Text>
                                <MaterialIcons name="edit" size={16} color="black" style={{padding:5, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View></View>
                </View>
                <View style={{ paddingTop: "1%", paddingLeft:"3%", paddingRight:"3%",}}>
                    <View style={{margin:"3%", flexDirection:"row", alignItems:"center", borderBottomColor:"#BABABA", borderBottomWidth: 1.5}}>
                        <Image
                            source={require("../../assets/label.png")}
                            style={{
                                resizeMode:"contain",
                                width: 22,
                            }}
                        />
                        <TextInput
                            style={{
                                color: "#000",
                                fontSize: 22,
                                fontWeight:"bold",
                                marginLeft:"5%"
                            }}
                            value={this.state.reminderName}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Add Label"
                            placeholderTextColor={"#979797"}
                            onChangeText={(text) =>  this.setState({reminderName: text})}
                            returnKeyType="done"
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({dateModal: true})}>
                        <View style={{flexDirection:"row", alignItems:"center", marginLeft:"3%", marginTop:"3%"}}>
                            <View>
                                <Text style={{marginRight:1, fontWeight:"bold"}}>{this.state.reminderDate}</Text>
                            </View>
                            <Entypo name="chevron-small-down" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:"5%"}}>
                        <View>
                            <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor:"#3B4130", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:"#fff", fontWeight:"bold", fontSize: 21}}>{this.state.date_1}</Text>
                            </View>
                            <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_1}</Text>
                        </View>
                        <View>
                            <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor:"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:"#000", fontWeight:"bold", fontSize: 21}}>{this.state.date_2}</Text>
                            </View>
                            <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_2}</Text>
                        </View>
                        <View>
                            <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor:"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:"#000", fontWeight:"bold", fontSize: 21}}>{this.state.date_3}</Text>
                            </View>
                            <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_3}</Text>
                        </View>
                        <View>
                            <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor:"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:"#000", fontWeight:"bold", fontSize: 21}}>{this.state.date_4}</Text>
                            </View>
                            <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_4}</Text>
                        </View>
                        <View>
                            <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor:"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:"#000", fontWeight:"bold", fontSize: 21}}>{this.state.date_5}</Text>
                            </View>
                            <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_5}</Text>
                        </View>
                        <View>
                            <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor:"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color:"#000", fontWeight:"bold", fontSize: 21}}>{this.state.date_6}</Text>
                            </View>
                            <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_6}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", marginLeft:"1.4%", marginRight:"1.4%", alignItems:"center", marginTop:"5%", justifyContent:"space-between"}}>
                        <DateTimePickerModal
                            isVisible={this.state.timeModal}
                            mode="time"
                            onConfirm={(time) => this.changeTime(time)}
                            onCancel={()=> this.setState({timeModal: false})}
                        />
                        <Text style={{color:"#575757", fontWeight:"bold", fontSize: 45}}>{this.state.reminderTime}</Text>
                        <TouchableOpacity onPress={() => this.setState({timeModal: true})}>
                            <View style={{backgroundColor:"#E3EDD2", height: 47, width: 130, borderRadius: 100, justifyContent:"center", alignSelf:"center"}}>
                                <Text style={{color:"#3B4130", fontSize: 17, fontWeight:"bold", textAlign:"center"}}>Select Time</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft:"3%", marginRight:"3%", marginTop:"7%" }}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image
                                        source={require("../../assets/repeat.png")}
                                        style={{height: 16, width: 16}}
                                    />
                                    <Text style={{color:"#444444", fontWeight:"500", marginLeft: 12}}>{this.state.repeatMode}</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={20} color="black" style={{padding: 0.5, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.RBSheet.open()}>
                            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"4.5%"}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image
                                        source={require("../../assets/ringtone.png")}
                                        style={{height: 16, width: 16}}
                                    />
                                    <Text style={{color:"#444444", fontWeight:"500", marginLeft: 12}}>{this.state.ringtone}</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={20} color="black" style={{padding: 0.5, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({vibration: !this.state.vibration})}>
                            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"4.5%"}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image
                                        source={require("../../assets/vibration.png")}
                                        style={{height: 16, width: 16}}
                                    />
                                    <Text style={{color:"#444444", fontWeight:"500", marginLeft: 12}}>Vibrate</Text>
                                </View>
                                {
                                    this.state.vibration ?
                                        <Entypo name="check" size={13} color="black" style={{padding: 2.5, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                    :
                                        <></>
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({reminderTypeModal: true})}>
                            <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"4.5%"}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image
                                        source={require("../../assets/checkmark.png")}
                                        style={{height: 16, width: 16}}
                                    />
                                    <Text style={{color:"#444444", fontWeight:"500", marginLeft: 12}}>Reminder Event</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={20} color="black" style={{padding: 0.5, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft:"3%", marginTop:"7%" }}>
                        <Text style={{fontSize: 15, fontWeight:"bold", color:"#1D1D1D"}}>PRIORITY</Text>
                        <View style={{marginTop:"3.5%", flexDirection:"row"}}>
                            <TouchableOpacity onPress={() => this.setState({priority: "Low"})}>
                                <View style={{ height: 40, width: 84, marginRight: 10, borderRadius: 100, backgroundColor: this.state.priority==="Low"?"#51C364":"#CEFFD6", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                                    <Text style={{fontWeight:"500", fontSize: 15, color: this.state.priority==="Low"?"#fff":"#14FF00"}}>LOW</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({priority: "Medium"})}>
                                <View style={{ height: 40, width: 105, borderRadius: 100, marginRight: 10, backgroundColor: this.state.priority==="Medium"?"#F3DB00":"#FCF3C6", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                                    <Text style={{fontWeight:"500", fontSize: 15, color: this.state.priority==="Medium"?"#fff":"#F3DB00"}}>MEDIUM</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({priority: "High"})}>
                                <View style={{ height: 40, width: 91, borderRadius: 100, backgroundColor: this.state.priority==="High"?"#FF5C5C":"#FFE0E0", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                                    <Text style={{fontWeight:"500", fontSize: 15, color: this.state.priority==="High"?"#fff":"#FF8888"}}>HIGH</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.addReminder}>
                        <View style={{marginTop:"10%", width:"90%", borderRadius: 100, height: 56, justifyContent:"center", alignItems:"center", alignSelf:"center", backgroundColor:"#3B4130"}}>
                            <Text style={{color:"#fff", fontWeight:"500", fontSize: 17}}>CREATE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={500}
                    openDuration={250}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15
                        }
                    }}
                >
                    <View>
                        <View style={{flexDirection:"row", justifyContent:"space-between", margin:"5%", marginBottom:"4%", alignItems:"center"}}>
                            <TouchableOpacity onPress={this.handleSoneDone}>
                                <Text style={{color:"#9F9F9F", fontWeight:"bold", fontSize: 13}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18, color:"#1E1E1E", fontWeight:"bold"}}>Sound</Text>
                            <TouchableOpacity onPress={this.handleSoneDone}>
                                <Text style={{color:"#3B4130", fontWeight:"bold", fontSize: 13}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopColor:"#EBEBEB", borderTopWidth: 1}}></View>
                        <Image
                            source={require("../../assets/select_tone.png")}
                            style={{resizeMode:"contain", justifyContent:"center", alignItems:"center", alignSelf:"center", marginTop:"6%"}}
                        />
                        <View style={{margin:"5%", marginTop:"7%"}}>
                            <TouchableOpacity onPress={() => this.setState({ringtone: "silent"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/silent.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Silent</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "silent" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ringtone: "Default (Fresh Start)", ringtoneFile:"default", channelId:"default"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Default (Fresh Start)</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Default (Fresh Start)" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeSong("Argon", "Argon.wav", "reminder-Argon")}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Argon</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Argon" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeSong("Bright Morning", "BrightMorning.wav", "reminder-BrightMorning")}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Bright Morning</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Bright Morning" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeSong("Carbon", "Carbon.wav", "reminder-Carbon")}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 16, width: 16}}
                                        />
                                        <Text style={{color:"#444444", fontWeight:"bold", marginLeft: 12}}>Carbon</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Carbon" ?
                                            <Entypo name="check" size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
            </View>
        );
    }
}