import React from "react";
import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";
import { Ionicons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import { Audio } from 'expo-av';
import * as Notifications from "expo-notifications";
import { ScrollView } from "react-native-gesture-handler";
import Toast, { InfoToast } from 'react-native-toast-message';

let _sound = null;
const toastConfig = {
    info: (props) => (
        <InfoToast
          {...props}
          style={{ borderLeftColor: '#ffdf00' }}
          contentContainerStyle={{ paddingHorizontal: 15, }}
          text1Style={{
            fontSize: 14,
              fontFamily:"Poppins-Medium"
          }}
        />
    )
  };

export default class createReminder extends React.Component {
    constructor(props) {
        super(props);    
        this.state = {
          id: Math.floor(Math.random() * 1000) + 1,
          reminderName: null,
          reminderDescription: "",
          reminderType:"Reminder",
          
          is_2_Tasks_Active: false,
          is_3_Tasks_Active: false,
          is_4_Tasks_Active: false,
          is_5_Tasks_Active: false,

          Tasks_1_Data: null,
          Tasks_2_Data: null,
          Tasks_3_Data: null,
          Tasks_4_Data: null,
          Tasks_5_Data: null,

          reminderDate: "Select Date",
          reminderTrueDate: null,
          dateModal: false,
          repeatModal: false,

          reminderTime: "10:10 AM",
          reminderTrueTime: "2023-06-23T04:40:46.789Z",
          timeModal: false,
          reminderTypeModal: false,

          repeatMode: "Does not repeat",
          ringtone:"Default (Fresh Start)",
          ringtoneFile:"default",
          vibration: true,
          priority:"Low",

          date_1: null,
          day_1: null,
          date_1_true: null,
          date_1_unformated: null,

          date_2: null,
          day_2: null,
          date_2_true: null,
          date_2_unformated: null,

          date_3: null,
          day_3: null,
          date_3_true: null,
          date_3_unformated: null,

          date_4: null,
          day_4: null,
          date_4_true: null,
          date_4_unformated: null,

          date_5: null,
          day_5: null,
          date_5_true: null,
          date_5_unformated: null,

          date_6: null,
          day_6: null,
          date_6_true: null,
          date_6_unformated: null,

          currentDate: moment().format('YYYY-MM-DD'),
        };
    }
    checkDates = async () => {
        var d = new Date();
        console.log(d.toLocaleDateString())

        var inputDate = d.toLocaleDateString();
        var parsedDate = moment(inputDate, 'D/M/YYYY');
        var outputDate = parsedDate.format('Do MMMM, YYYY');
        var trueDate = parsedDate.format('YYYY-MM-DD')
        this.setState({
            date_1: d.toLocaleDateString().slice(0, 2).replace(/\//g, ''),
            date_1_unformated: outputDate,
            date_1_true: trueDate
        })

        d.setDate(d.getDate() + 1)
        var inputDate = d.toLocaleDateString();
        var parsedDate = moment(inputDate, 'D/M/YYYY');
        var outputDate = parsedDate.format('Do MMMM, YYYY');
        var trueDate = parsedDate.format('YYYY-MM-DD')
        this.setState({
            date_2: d.toLocaleDateString().slice(0, 2).replace(/\//g, ''),
            date_2_unformated: outputDate,
            date_2_true: trueDate
        })


        d.setDate(d.getDate() + 1)
        var inputDate = d.toLocaleDateString();
        var parsedDate = moment(inputDate, 'D/M/YYYY');
        var outputDate = parsedDate.format('Do MMMM, YYYY');
        var trueDate = parsedDate.format('YYYY-MM-DD')
        this.setState({
            date_3: d.toLocaleDateString().slice(0, 2).replace(/\//g, ''),
            date_3_unformated: outputDate,
            date_3_true: trueDate
        })

        d.setDate(d.getDate() + 1)
        var inputDate = d.toLocaleDateString();
        var parsedDate = moment(inputDate, 'D/M/YYYY');
        var outputDate = parsedDate.format('Do MMMM, YYYY');
        var trueDate = parsedDate.format('YYYY-MM-DD')
        this.setState({
            date_4: d.toLocaleDateString().slice(0, 2).replace(/\//g, ''),
            date_4_unformated: outputDate,
            date_4_true: trueDate
        })

        d.setDate(d.getDate() + 1)
        var inputDate = d.toLocaleDateString();
        var parsedDate = moment(inputDate, 'D/M/YYYY');
        var outputDate = parsedDate.format('Do MMMM, YYYY');
        var trueDate = parsedDate.format('YYYY-MM-DD')
        this.setState({
            date_5: d.toLocaleDateString().slice(0, 2).replace(/\//g, ''),
            date_5_unformated: outputDate,
            date_5_true: trueDate
        })


        d.setDate(d.getDate() + 1);
        var inputDate = d.toLocaleDateString();
        var parsedDate = moment(inputDate, 'D/M/YYYY');
        var outputDate = parsedDate.format('Do MMMM, YYYY');
        var trueDate = parsedDate.format('YYYY-MM-DD')
        this.setState({
            date_6: d.toLocaleDateString().slice(0, 2).replace(/\//g, ''),
            date_6_unformated: outputDate,
            date_6_true: trueDate
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
        const currentDate = moment().format('Do MMMM, YYYY');
        let dateTrueFormat = moment().format('YYYY-MM-DD');
        this.setState({
            reminderDate: currentDate, 
            reminderTrueDate: dateTrueFormat
        })
    }
    changeDate = (value) => {
        let year = value.slice(0, 4)
        let month = value.slice(5, 7)
        let day = value.slice(8, 10)
        let dateUnformat = day + "/" + month + "/" + year
        let dateTrueFormat = year + "-" + month + "-" + day
        let dateFormated = moment(dateUnformat, 'DD/MM/YYYY', true).format('Do MMMM, YYYY')
        console.log("DATE FORMATED", dateFormated, dateTrueFormat)
        this.setState({
            reminderDate: dateFormated, 
            reminderTrueDate: dateTrueFormat,
            dateModal: false
        })
    }
    changeTime = (value) => {
        console.log(value)
        let timeFormatted = moment(value, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A');
        console.log(timeFormatted)
        this.setState({
            reminderTime: timeFormatted,
            reminderTrueTime: value,
            timeModal: false
        })
    }
    addReminder = async () => {
        let reminders = await AsyncStorage.getItem('remindersData');

        if(this.state.reminderName == "" || this.state.reminderName == null){
            Toast.show({
                type: 'info',
                text1: 'Label cannot be empty'
            });
        }
        else{
            let reminderName = this.state.reminderName;
            let timeValue = this.state.reminderTrueTime;
            let trueTime = JSON.stringify(timeValue);
            let timeFormated = trueTime.slice(11, 25);
            let dateValue = this.state.reminderTrueDate;
            let date_time = dateValue+timeFormated;
            let tasksArr = [
                this.state.Tasks_1_Data,
                this.state.Tasks_2_Data,
                this.state.Tasks_3_Data,
                this.state.Tasks_4_Data,
                this.state.Tasks_5_Data
            ]

            let parsed = JSON.parse(reminders);
            if(parsed){
                parsed.push(
                    {
                        id: this.state.id,
                        reminderName: this.state.reminderName,
                        reminderDescription: this.state.reminderDescription,
                        tasksArray: tasksArr,
                        reminderDate: this.state.reminderDate,
                        reminderTrueDate: this.state.reminderTrueDate,
                        reminderTime: this.state.reminderTime,
                        reminderTrueTime: this.state.reminderTrueTime,
                        repeatMode: this.state.repeatMode,
                        ringtone: this.state.ringtone,
                        vibration: this.state.vibration,
                        priority: this.state.priority,
                        dateTime: date_time,
                        isActive: true
                    }
                )
                AsyncStorage.setItem('remindersData', JSON.stringify(parsed))
            }
            else{
                let remindersData = [];
                remindersData.push(
                    {
                        id: 1,
                        reminderName: this.state.reminderName,
                        reminderDescription: this.state.reminderDescription,
                        tasksArray: tasksArr,
                        reminderDate: this.state.reminderDate,
                        reminderTrueDate: this.state.reminderTrueDate,
                        reminderTime: this.state.reminderTime,
                        reminderTrueTime: this.state.reminderTrueTime,
                        repeatMode: this.state.repeatMode,
                        ringtone: this.state.ringtone,
                        vibration: this.state.vibration,
                        priority: this.state.priority,
                        dateTime: date_time,
                        isActive: true
                    }
                )
                AsyncStorage.setItem('remindersData', JSON.stringify(remindersData))
            }
            console.log("Data Saved")
            this.createNotification(reminderName, date_time);
            this.props.navigation.navigate("Dashboard")
        }
        
    }
    createNotification = async (name, time) => {
        let sounds = this.state.ringtoneFile;
        console.log("Sounds and Channel", sounds)

        var date = new Date(time);
        var seconds = Math.floor(date.getTime()/1000);

        var dateNow = new Date();
        var secondsNow = Math.floor(dateNow.getTime()/1000);

        var secondsDifference = seconds-secondsNow
        console.log(secondsDifference)
        await Notifications.setNotificationChannelAsync("new-emails", {
            name: "E-mail notifications",
            importance: Notifications.AndroidImportance.HIGH,
            sound: sounds == "default" ? sounds : "default"
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
              sound: sounds == "default" ? sounds : "default",
              body: name,
              autoDismiss: false,
              vibrate: false,
            },
            trigger: {
                seconds: secondsDifference,
                channelId: "new-emails",
            },
        });
    }
    playSound = async (tune, fileName) =>{
        this.setState({
            ringtone: tune,
            ringtoneFile: fileName,
        })
        _sound = new Audio.Sound();
        if(tune === "Bright Morning"){
            await _sound.loadAsync(require('../../assets/sounds/brightmorning.mp3'), {shouldPlay: true});
            await _sound.setPositionAsync(0);
            await _sound.playAsync();
        }
        if(tune === "Argon"){
            await _sound.loadAsync(require('../../assets/sounds/argon.mp3'), {shouldPlay: true});
            await _sound.setPositionAsync(0);
           await _sound.playAsync();
        }
        if(tune === "Carbon"){
            await _sound.loadAsync(require('../../assets/sounds/carbon.mp3'), {shouldPlay: true});
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
    stopSong = async() => {
        if(_sound){
            await _sound.stopAsync();
        }
    }
    changeSong = async(tune, fileName) => {
        if(_sound){
            await _sound.stopAsync();
        }
        this.playSound(tune, fileName)
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor:"#fff"}}>
              <StatusBar backgroundColor={"#fff"} style="dark" />
                <Modal isVisible={this.state.dateModal} onBackdropPress={() => this.setState({dateModal: false})} backdropOpacity={0.8} useNativeDriver={true}>
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
                <Modal isVisible={this.state.reminderTypeModal} onBackdropPress={() => this.setState({reminderTypeModal: false})} backdropOpacity={0.8} useNativeDriver={true}>
                    <View style={{ backgroundColor: '#fff', width: "90%", height: 383, marginLeft:"5%", borderRadius: 24}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", margin:"6%", marginBottom:"4%", alignItems:"center"}}>
                            <TouchableOpacity onPress={() => this.setState({reminderTypeModal: false})}>
                                <Text style={{color:"#9F9F9F", fontFamily:"Poppins-Medium", fontSize: 13}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18, color:"#1E1E1E", fontFamily:"Poppins-Medium"}}>Reminder Event</Text>
                            <TouchableOpacity onPress={() => this.setState({reminderTypeModal: false})}>
                                <Text style={{color:"#3B4130", fontFamily:"Poppins-Medium", fontSize: 13}}>Done</Text>
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
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Reminder</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Reminder" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Tasks"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Tasks</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Tasks" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Goals"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Goals</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Goals" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Events"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Events</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Events" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Birthday"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Birthday</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Birthday" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderType: "Assignment"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Assignment</Text>
                                    </View>
                                    {
                                        this.state.reminderType === "Assignment" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal isVisible={this.state.repeatModal} onBackdropPress={() => this.setState({repeatModal: false})} backdropOpacity={0.8} useNativeDriver={true}>
                    <View style={{ backgroundColor: '#fff', width: "90%", height: 315, marginLeft:"5%", borderRadius: 24}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", margin:"6%", marginBottom:"4%", alignItems:"center"}}>
                            <TouchableOpacity onPress={() => this.setState({repeatModal: false})}>
                                <Text style={{color:"#9F9F9F", fontFamily:"Poppins-Medium", fontSize: 13}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18, color:"#1E1E1E", fontFamily:"Poppins-Medium"}}>Repeatation</Text>
                            <TouchableOpacity onPress={() => this.setState({repeatModal: false})}>
                                <Text style={{color:"#3B4130", fontFamily:"Poppins-Medium", fontSize: 13}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopColor:"#EBEBEB", borderTopWidth: 1}}></View>
                        <Image
                            source={require("../../assets/reminderType.png")}
                            style={{resizeMode:"contain", justifyContent:"center", alignItems:"center", alignSelf:"center", marginTop:"6%", width:"90%"}}
                        />
                        <View style={{margin:"7%", marginBottom: 0}}>
                            <TouchableOpacity onPress={() => this.setState({repeatMode: "Does not repeat"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Does not repeat</Text>
                                    </View>
                                    {
                                        this.state.repeatMode === "Does not repeat" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({repeatMode: "Daily"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Daily</Text>
                                    </View>
                                    {
                                        this.state.repeatMode === "Daily" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({repeatMode: "Weekly"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between",  marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Weekly</Text>
                                    </View>
                                    {
                                        this.state.repeatMode === "Weekly" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({repeatMode: "Yearly"})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between",  marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Yearly</Text>
                                    </View>
                                    {
                                        this.state.repeatMode === "Yearly" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{width:"100%", height: 120, backgroundColor:"#fff", elevation: 4, paddingTop: "7%", paddingLeft:"5%", paddingRight:"5%", flexDirection:"row", alignSelf:"center", alignItems:"center", justifyContent:"space-between"}}>
                    <View>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{alignItems:"center", alignSelf:"center"}} onPress={() => this.setState({reminderTypeModal: true})}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Text style={{color:"#000", fontFamily:"Poppins-Medium", fontSize: 23}}>{this.state.reminderType}</Text>
                            <MaterialIcons name="edit" size={16} color="black" style={{padding:5, backgroundColor:"#E3EDD2", marginLeft: 10, borderRadius: 100}}/>
                        </View>
                        <Text style={{color:"#707070", fontFamily:"Poppins-Medium", fontSize: 13, textAlign:"center"}}>{this.state.reminderDate}{this.state.reminderTime == "" ? "" : " | " + this.state.reminderTime}</Text>
                    </TouchableOpacity>
                    <View></View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingTop: "1%", paddingLeft:"3%", paddingRight:"3%",}}>
                        <View style={{margin:"3%", marginTop:"8%", paddingBottom: "2%", flexDirection:"row", alignItems:"center", borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                            <Image
                                source={require("../../assets/label.png")}
                                style={{
                                    height: 44,
                                    width: 28,
                                    marginTop: -10
                                }}
                            />
                            <TextInput
                                style={{
                                    color: "#000",
                                    fontSize: 22,
                                    marginLeft:"5%",
                                    width: "100%",
                                    fontFamily:"Poppins-Medium"
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
                        <View style={{flexDirection:"row", marginLeft:"3%", marginRight:"3%", marginTop:"4%",  justifyContent:"space-between"}}>
                            <View>
                                <Text style={{color: "#000", fontFamily:"Poppins-Medium", fontSize: 15}}>DATE & TIME</Text>
                                <TouchableOpacity onPress={() => this.setState({dateModal: true})}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <View>
                                            <Text style={{marginRight:1, fontSize: 13, fontFamily:"Poppins-Medium"}}>{this.state.reminderDate}</Text>
                                        </View>
                                        <Entypo name="chevron-small-down" size={24} color="black" style={{marginTop: -2}} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({timeModal: true})}>
                                <View style={{backgroundColor:"#E3EDD2", height: 47, width: 100, borderRadius: 10, justifyContent:"center", alignSelf:"center"}}>
                                    <Text style={{color:"#3B4130", fontSize: 15.5, fontFamily:"Poppins-Medium", textAlign:"center"}}>{this.state.reminderTime == "" ? "Select Time" : this.state.reminderTime}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <DateTimePickerModal
                            isVisible={this.state.timeModal}
                            mode="time"
                            onConfirm={(time) => this.changeTime(time)}
                            onCancel={()=> this.setState({timeModal: false})}
                        />
                        <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:"5%"}}>
                            <TouchableOpacity onPress={() => this.setState({reminderDate: this.state.date_1_unformated, reminderTrueDate: this.state.date_1_true})}>
                                <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor: this.state.reminderDate == this.state.date_1_unformated?"#3B4130":"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{color:this.state.reminderDate == this.state.date_1_unformated?"#fff" : "#000", marginBottom: -3.5, fontFamily:"Poppins-Medium", fontSize: 19}}>{this.state.date_1}</Text>
                                </View>
                                <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderDate: this.state.date_2_unformated, reminderTrueDate: this.state.date_2_true})}>
                                <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor: this.state.reminderDate == this.state.date_2_unformated?"#3B4130":"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{color:this.state.reminderDate == this.state.date_2_unformated?"#fff" : "#000", marginBottom: -3.5, fontFamily:"Poppins-Medium", fontSize: 19}}>{this.state.date_2}</Text>
                                </View>
                                <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderDate: this.state.date_3_unformated, reminderTrueDate: this.state.date_3_true})}>
                                <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor: this.state.reminderDate == this.state.date_3_unformated?"#3B4130":"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{color:this.state.reminderDate == this.state.date_3_unformated?"#fff" : "#000", marginBottom: -3.5, fontFamily:"Poppins-Medium", fontSize: 19}}>{this.state.date_3}</Text>
                                </View>
                                <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_3}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderDate: this.state.date_4_unformated, reminderTrueDate: this.state.date_4_true})}>
                                <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor: this.state.reminderDate == this.state.date_4_unformated?"#3B4130":"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{color:this.state.reminderDate == this.state.date_4_unformated?"#fff" : "#000", marginBottom: -3.5, fontFamily:"Poppins-Medium", fontSize: 19}}>{this.state.date_4}</Text>
                                </View>
                                <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_4}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderDate: this.state.date_5_unformated, reminderTrueDate: this.state.date_5_true})}>
                                <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor: this.state.reminderDate == this.state.date_5_unformated?"#3B4130":"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{color:this.state.reminderDate == this.state.date_5_unformated?"#fff" : "#000", marginBottom: -3.5, fontFamily:"Poppins-Medium", fontSize: 19}}>{this.state.date_5}</Text>
                                </View>
                                <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_5}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({reminderDate: this.state.date_6_unformated, reminderTrueDate: this.state.date_6_true})}>
                                <View style={{height: 52, width: 52, borderRadius: 13, backgroundColor: this.state.reminderDate == this.state.date_6_unformated?"#3B4130":"#E3EDD2", justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{color:this.state.reminderDate == this.state.date_6_unformated?"#fff" : "#000", marginBottom: -3.5, fontFamily:"Poppins-Medium", fontSize: 19}}>{this.state.date_6}</Text>
                                </View>
                                <Text style={{textAlign:"center", marginTop:3}}>{this.state.day_6}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:"3%", marginRight:"3%", marginTop:"7%" }}>
                            <TouchableOpacity onPress={() => this.setState({repeatModal: true})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/repeat.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 12}}>{this.state.repeatMode}</Text>
                                    </View>
                                    <Entypo name="chevron-small-right" size={20} color="black" style={{backgroundColor:"#E3EDD2", padding: 0.5, justifyContent:"center", alignItems:"center", alignSelf:"center", borderRadius: 100}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.RBSheet.open()}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"4.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        {
                                            this.state.ringtone === "Silent" ?
                                                <Image
                                                    source={require("../../assets/silent.png")}
                                                    style={{height: 17, width: 17}}
                                                />
                                                :
                                                <Image
                                                    source={require("../../assets/ringtone.png")}
                                                    style={{height: 17, width: 17}}
                                                />
                                        }
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 12}}>{this.state.ringtone}</Text>
                                    </View>
                                    <Entypo name="chevron-small-right" size={20} color="black" style={{backgroundColor:"#E3EDD2", padding: 0.5, justifyContent:"center", alignItems:"center", alignSelf:"center", borderRadius: 100}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({vibration: !this.state.vibration})}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"4.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/vibration.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 12}}>Vibrate</Text>
                                    </View>
                                    {
                                        this.state.vibration ?
                                            <Feather name="check" size={13} color="black" style={{padding: 4, height: 20, width: 20, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
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
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 12}}>Reminder Event</Text>
                                    </View>
                                    <Entypo name="chevron-small-right" size={20} color="black" style={{backgroundColor:"#E3EDD2", padding: 0.5, justifyContent:"center", alignItems:"center", alignSelf:"center", borderRadius: 100}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:"3%", marginTop:"7%" }}>
                            <Text style={{fontSize: 15, fontFamily:"Poppins-Medium", color:"#1D1D1D"}}>PRIORITY</Text>
                            <View style={{marginTop:"1.5%", flexDirection:"row"}}>
                                <TouchableOpacity onPress={() => this.setState({priority: "Low"})}>
                                    <View style={{ height: 40, width: 84, marginRight: 10, borderRadius: 100, backgroundColor: this.state.priority==="Low"?"#51C364":"#CEFFD6", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                                        <Text style={{fontWeight:"500", fontSize: 15, fontFamily:"Poppins-Medium", color: this.state.priority==="Low"?"#fff":"#14FF00"}}>LOW</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({priority: "Medium"})}>
                                    <View style={{ height: 40, width: 105, borderRadius: 100, marginRight: 10, backgroundColor: this.state.priority==="Medium"?"#F3DB00":"#FCF3C6", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                                        <Text style={{fontWeight:"500", fontSize: 15, fontFamily:"Poppins-Medium", color: this.state.priority==="Medium"?"#fff":"#F3DB00"}}>MEDIUM</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({priority: "High"})}>
                                    <View style={{ height: 40, width: 91, borderRadius: 100, backgroundColor: this.state.priority==="High"?"#FF5C5C":"#FFE0E0", justifyContent:"center", alignSelf:"center", alignItems:"center" }}>
                                        <Text style={{fontWeight:"500", fontSize: 15, fontFamily:"Poppins-Medium", color: this.state.priority==="High"?"#fff":"#FF8888"}}>HIGH</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginLeft:"3%", marginRight: "3%", paddingBottom: "0.7%", marginTop:"7%",  borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                            <Text style={{fontSize: 15, fontFamily:"Poppins-Medium", color:"#1D1D1D"}}>DESCRIPTION</Text>
                            <TextInput
                                style={{
                                    color: "#000",
                                    fontSize: 14,
                                    fontFamily:"Poppins-Medium"
                                }}
                                value={this.state.reminderDescription}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Describe the reminder event"
                                onChangeText={(text) =>  this.setState({reminderDescription: text})}
                                returnKeyType="done"
                                multiline={true}
                                numberOfLines={2}
                            />
                        </View>
                        {
                            this.state.reminderType === "Tasks" ? 
                            <>
                                <View style={{marginLeft:"3%", marginRight: "3%", marginTop:"7%",  borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                                    <Text style={{fontSize: 15, fontFamily:"Poppins-Medium", color:"#1D1D1D"}}>TASKS</Text>
                                    <TextInput
                                        style={{
                                            color: "#000",
                                            fontSize: 14,
                                            height: 50,
                                            fontFamily:"Poppins-Medium"
                                        }}
                                        value={this.state.Tasks_1_Data}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) =>  this.setState({Tasks_1_Data: text})}
                                        returnKeyType="done"
                                    />
                                </View>
                                {
                                    this.state.is_2_Tasks_Active ?
                                    <></>
                                    :
                                    <TouchableOpacity style={{marginRight: "3%", marginTop: 5,}} onPress={() => this.setState({is_2_Tasks_Active: true})}>
                                        <Text style={{textAlign: "right", color: "#587424", fontFamily:"Poppins-Medium"}}>Add new task</Text>
                                    </TouchableOpacity>
                                }
                                
                                {
                                    this.state.is_2_Tasks_Active ?
                                    <>
                                        <View style={{marginLeft:"3%", marginRight: "3%", marginTop:"2%",  borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                                            <TextInput
                                                style={{
                                                    color: "#000",
                                                    fontSize: 14,
                                                    height: 50,
                                                    fontFamily:"Poppins-Medium"
                                                }}
                                                value={this.state.Tasks_2_Data}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                onChangeText={(text) =>  this.setState({Tasks_2_Data: text})}
                                                returnKeyType="done"
                                            />
                                        </View>
                                        {
                                            this.state.is_3_Tasks_Active ?
                                            <></>
                                            :
                                            <TouchableOpacity style={{marginRight: "3%", marginTop: 5,}} onPress={() => this.setState({is_3_Tasks_Active: true})}>
                                                <Text style={{textAlign: "right", color: "#587424", fontFamily:"Poppins-Medium"}}>Add new task</Text>
                                            </TouchableOpacity>
                                        }
                                    </>
                                    :
                                    <></>
                                }

                                {
                                    this.state.is_3_Tasks_Active ?
                                    <>
                                        <View style={{marginLeft:"3%", marginRight: "3%", marginTop:"2%",  borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                                            <TextInput
                                                style={{
                                                    color: "#000",
                                                    fontSize: 14,
                                                    height: 50,
                                                    fontFamily:"Poppins-Medium"
                                                }}
                                                value={this.state.Tasks_3_Data}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                onChangeText={(text) =>  this.setState({Tasks_3_Data: text})}
                                                returnKeyType="done"
                                            />
                                        </View>
                                        {
                                            this.state.is_4_Tasks_Active ?
                                            <></>
                                            :
                                            <TouchableOpacity style={{marginRight: "3%", marginTop: 5,}} onPress={() => this.setState({is_4_Tasks_Active: true})}>
                                                <Text style={{textAlign: "right", color: "#587424", fontFamily:"Poppins-Medium"}}>Add new task</Text>
                                            </TouchableOpacity>
                                        }
                                    </>
                                    :
                                    <></>
                                }
                                {
                                    this.state.is_4_Tasks_Active ?
                                    <>
                                        <View style={{marginLeft:"3%", marginRight: "3%", marginTop:"2%",  borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                                            <TextInput
                                                style={{
                                                    color: "#000",
                                                    fontSize: 14,
                                                    height: 50,
                                                    fontFamily:"Poppins-Medium"
                                                }}
                                                value={this.state.Tasks_4_Data}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                onChangeText={(text) =>  this.setState({Tasks_4_Data: text})}
                                                returnKeyType="done"
                                            />
                                        </View>
                                        {
                                            this.state.is_5_Tasks_Active ?
                                            <></>
                                            :
                                            <TouchableOpacity style={{marginRight: "3%", marginTop: 5,}} onPress={() => this.setState({is_5_Tasks_Active: true})}>
                                                <Text style={{textAlign: "right", color: "#587424", fontFamily:"Poppins-Medium"}}>Add new task</Text>
                                            </TouchableOpacity>
                                        }
                                    </>
                                    :
                                    <></>
                                }
                                {
                                    this.state.is_5_Tasks_Active ?
                                    <>
                                        <View style={{marginLeft:"3%", marginRight: "3%", marginTop:"2%",  borderBottomColor:"#BABABA", borderBottomWidth: 1}}>
                                            <TextInput
                                                style={{
                                                    color: "#000",
                                                    fontSize: 14,
                                                    height: 50,
                                                    fontFamily:"Poppins-Medium"
                                                }}
                                                value={this.state.Tasks_5_Data}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                onChangeText={(text) =>  this.setState({Tasks_5_Data: text})}
                                                returnKeyType="done"
                                            />
                                        </View>
                                    </>
                                    :
                                    <></>
                                }
                            </>
                            :
                            <></>
                        }
                        <TouchableOpacity onPress={this.addReminder}>
                            <View style={{marginTop:"10%", marginBottom:"10%", width:"90%", borderRadius: 100, height: 56, justifyContent:"center", alignItems:"center", alignSelf:"center", backgroundColor:"#3B4130"}}>
                                <Text style={{color:"#fff", fontFamily:"Poppins-Medium", fontSize: 17}}>CREATE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Toast position="bottom" visibilityTime={2000} config={toastConfig}/>
                </ScrollView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={410}
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
                                <Text style={{color:"#9F9F9F", fontFamily:"Poppins-Medium", fontSize: 13}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18, color:"#1E1E1E", fontFamily:"Poppins-Medium"}}>Sound</Text>
                            <TouchableOpacity onPress={this.handleSoneDone}>
                                <Text style={{color:"#3B4130", fontFamily:"Poppins-Medium", fontSize: 13}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopColor:"#EBEBEB", borderTopWidth: 1}}></View>
                        <Image
                            source={require("../../assets/select_tone.png")}
                            style={{resizeMode:"contain", justifyContent:"center", alignItems:"center", alignSelf:"center", marginTop:"6%"}}
                        />
                        <View style={{margin:"5%", marginTop:"7%"}}>
                            <TouchableOpacity onPress={() => {this.setState({ringtone: "Silent", ringtoneFile:"silent"}); this.stopSong()}}>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/silent.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Silent</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Silent" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({ringtone: "Default (Fresh Start)", ringtoneFile:"default"}); this.stopSong()}}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Default (Fresh Start)</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Default (Fresh Start)" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeSong("Argon", "argon.wav")}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Argon</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Argon" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeSong("Bright Morning", "brightmorning.wav")}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Bright Morning</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Bright Morning" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
                                        :
                                            <></>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.changeSong("Carbon", "carbon.wav")}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:"3.5%"}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image
                                            source={require("../../assets/ringtone.png")}
                                            style={{height: 17, width: 17}}
                                        />
                                        <Text style={{color:"#444444", fontFamily:"Poppins-Medium", marginLeft: 13.5}}>Carbon</Text>
                                    </View>
                                    {
                                        this.state.ringtone === "Carbon" ?
                                            <Feather name="check"  size={14} color="black" style={{padding: 2, height: 18, width: 18, backgroundColor:"#E3EDD2", borderRadius: 100}}/>
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