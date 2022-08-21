import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import data from './cart.json';

const windowWidth = Dimensions.get('window').width;

export default class cart extends React.Component{
  constructor(props) {
    super(props);    
      this.state = {
        userData: {},
        cart: data,
        width: windowWidth*(92/100),
      };
    }
    renderItem = (data) => {
        console.log(data)
    }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: '#fff', width: windowWidth}}>
        <StatusBar
            animated={true}
            backgroundColor="#fff"
            hidden={false}
            translucent={false}
          />
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:"7%", flex: 1}}>
            <View style={{margin:"3%", padding:"3%", flexDirection:"row", justifyContent:"space-between", marginLeft: "6%", marginRight:"7%"}}>
                <View>
                    <Text style={{fontSize: 17, color:"#C6C6C6", fontWeight:"bold"}}>Hey</Text>
                    <Text style={{fontSize: 17.5, color:"black", fontWeight:"bold"}}>Rahul Dasgupta</Text>
                </View>
                <Image
                    source={require("../../assets/user.png")}
                    style={{
                    height: 60,
                    width: 60,
                    borderRadius: 80 / 2,
                    resizeMode:"cover",
                    }}
                />
            </View>
            <SwipeListView
                data={this.state.cart}
                disableLeftSwipe={true}
                renderItem={(data, rowMap) => (
                    <View style={{height: 75, backgroundColor:"#fff", borderColor:"#69B142", borderWidth: 1, margin:"7%", marginTop: 15, marginBottom: 0, borderRadius: 15,}}>
                        <View style={{padding:5, flexDirection:"row", alignItems:"center",}}>
                            <Image
                                source={{uri: data.item.images}}
                                style={{
                                    height: 65,
                                    width: 65,
                                    resizeMode:"contain",
                                }}
                            />
                            <View style={{marginLeft: 15, width:"43%"}}>
                                <Text style={{fontSize: 15, color:"#222", fontWeight:"bold"}}>{data.item.product_title}</Text>
                                <Text style={{fontSize: 15.5, color:"#69B142", fontWeight:"bold", marginTop: 5}}>₹{data.item.amount}</Text>
                            </View>
                            <View style={{marginLeft: 15}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <TouchableOpacity onPress={() => this.decreaseCount()}>
                                        <AntDesign name="minuscircle" size={20} color="#D3D3D3" style={{marginRight: 13}}/>
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 17, fontWeight:"bold", color:"black"}}>{data.item.quantity}</Text>
                                    <TouchableOpacity onPress={() => this.increaseCount()}>
                                        <AntDesign name="pluscircle" size={20} color="#9fd980" style={{marginLeft: 13}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                renderHiddenItem={ (data) => (
                    <View style={{height: 75, backgroundColor:"#fff", margin:"7%", marginTop: 15, marginBottom: 0, borderRadius: 15, justifyContent:"center", }}>
                        <Image
                            source={require("../../assets/dustbin.png")}
                            style={{
                                height: 40,
                                width: 40,
                            }}
                            />
                    </View>
                )}
                leftOpenValue={70}
                rightOpenValue={-70}
            />
            <Text style={{margin: "7%", color:"black", fontSize: 16, fontWeight:"bold"}}>People also bought</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft:"2.5%", marginRight:"2.5%",}}>
                <View style={{flex:1, flexDirection:"row"}}>
                    <View style={styles.categories_boxes}>
                        <TouchableOpacity>
                            <Image
                                source={{uri: "https://i.ibb.co/h86Q0dw/tomato.png"}}
                                style={{
                                    height: 90,
                                    width: 90,
                                    resizeMode:"contain"
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categories_boxes}>
                        <TouchableOpacity>
                            <Image
                                source={{uri: "https://i.ibb.co/VBqrZH9/strawberries.png"}}
                                style={{
                                    height: 90,
                                    width: 90,
                                    resizeMode:"contain"
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categories_boxes}>
                        <TouchableOpacity>
                            <Image
                                source={{uri: "https://i.ibb.co/ZVngtR0/banana.png"}}
                                style={{
                                    height: 90,
                                    width: 90,
                                    resizeMode:"contain"
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categories_boxes}>
                        <TouchableOpacity>
                            <Image
                                source={{uri: "https://i.ibb.co/Fw460wc/capsicum.png"}}
                                style={{
                                    height: 90,
                                    width: 90,
                                    resizeMode:"contain"
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categories_boxes}>
                        <TouchableOpacity>
                            <Image
                                source={{uri: "https://i.ibb.co/hKy8GRw/brinjal.png"}}
                                style={{
                                    height: 90,
                                    width: 90,
                                    resizeMode:"contain"
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
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
  categories_boxes: {
    borderRadius: 10, height: 100, width: 100, backgroundColor: "#fff", shadowColor: "#000",
    margin: 10,
    marginTop: 5,
    justifyContent:"center", 
    alignItems:"center",
    alignSelf:"center",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
