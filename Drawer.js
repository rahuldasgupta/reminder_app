import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Dimensions, Share, TouchableOpacity, Image } from "react-native";
import { Avatar, Title, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AntDesign from 'react-native-vector-icons/AntDesign';

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const DrawerContent = (props) => {
  const [hideImage, setHideImage] = useState(true);
  const toggleSidebar = async () => {
    //setHideImage(!hideImage);
    props.navigation.closeDrawer();
  }
  return (
      <View style={{flex: 1, }}>
        <DrawerContentScrollView {...props} style={{backgroundColor: '#fff', width:"70%"}}>
          <View style={styles.userInfoSection}>
            <View style={{ marginLeft: 15, flexDirection: "row", marginTop: "18%", alignItems:"center"}}>
                  <View style={{height: 40, width: 40, borderRadius: 20, backgroundColor:"#E3EDD2", justifyContent:"center", alignItems:"center", marginLeft: -5, marginRight: 10}}>
                    <Text style={{textAlign:"center", color:"#ADD95D", fontSize: 17, fontWeight:"bold"}}>RD</Text>
                  </View>
                  <Title style={styles.title}>Guest Account</Title>
              </View> 
          </View>
          <Drawer.Section style={{ marginTop: 19, paddingLeft:10}}>
              <DrawerItem
                  label="Dashboard"
                  labelStyle={{fontSize:18}}
                  style={{marginBottom:-5}}
                  onPress={() => {
                  props.navigation.navigate("Dashboard");
                  }}
              />
              <DrawerItem
                  label="Create Reminder"
                  labelStyle={{fontSize:18}}
                  style={{marginBottom:-5}}
                  /*onPress={() => {
                  props.navigation.navigate("CreateChallenge");
                  }}*/
              />
              <DrawerItem
                  label="Share"
                  labelStyle={{fontSize:18}}
                  /*onPress={() => {
                  props.navigation.navigate("CreateChallenge");
                  }}*/
              />
          </Drawer.Section>
        </DrawerContentScrollView>

            
      </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 2 * vh,
  },
  title: {
    fontSize: 2.5 * vh,
    fontWeight: "bold",
  },
  header:{
    flexDirection: "row",
    marginTop: 20,
    marginRight:"5%", height:90,
    paddingTop:12,
    paddingLeft:15,
    borderRadius:20 
  },
  texts: {
    fontSize: 10,
    lineHeight: 10,
    marginTop: 2,
    marginLeft:5,
    color:"#fff"
  },
  row: {
    marginTop: 2 * vh,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 1 * vh,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 1.5 * vh,
    marginTop: 15,
  },
  drawerSection: {
    marginTop: 1.5 * vh,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});