import React from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { TextInput } from 'react-native-paper';
import { Button } from "react-native-material-ui";
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default class productView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: windowWidth*(90/100),
      pincode: null,
      reviews: true,
      itemCount: 1,
      price: this.props.route.params.item.discount,
      totalPrice: this.props.route.params.item.discount
    }
  }
  increaseCount = () => {
    this.setState({
        itemCount: this.state.itemCount+1,
        totalPrice: this.state.totalPrice+this.state.price
    })
  }
  decreaseCount = () => {
    this.setState({
        itemCount: this.state.itemCount-1,
        totalPrice: this.state.totalPrice-this.state.price
    })
  }
  render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', width: windowWidth, }}>
          <StatusBar
            animated={true}
            backgroundColor="#fff"
            hidden={false}
            translucent={false}
            barStyle = "dark-content"
          />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1}}>
            <View style={{flexDirection:"row", justifyContent:"space-between", marginLeft:"5%", marginRight:"5%", marginTop:"4%"}}>
                <AntDesign name="arrowleft" size={24} color="#A4A4A4" style={{borderWidth: 1, borderColor:"#A4A4A4", padding:7, borderRadius:30}} />
                <View style={{flexDirection:"row"}}>
                    <AntDesign name="shoppingcart" size={24} color="#A4A4A4" style={{borderWidth: 1, borderColor:"#A4A4A4", padding:7, borderRadius:30, marginRight: 10}} />
                    <Feather name="share-2" size={24} color="#A4A4A4" style={{borderWidth: 1, borderColor:"#A4A4A4", padding:7, borderRadius:30}} />
                </View>
            </View>
            <View style={styles.image_slider_view}>
                <Image source={{uri: this.props.route.params.item.images}} style={{height:"100%", width:"100%", borderRadius: 5, }} resizeMode="contain"/>
            </View>
            <View style={styles.categories_boxes}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View>
                        <Text style={{ fontWeight:"bold", fontSize: 29}}>{this.props.route.params.item.product_title}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", padding:7, paddingLeft: 10, paddingRight: 10, borderWidth:1, borderColor:"#E5E5E5", borderRadius: 10}}>
                        <AntDesign name="star" size={20} color="#ffdf00" />
                        <Text style={{marginLeft: 5}}>4.7</Text>
                    </View>
                </View>
                <View style={{marginTop:"2%", flexDirection: "row"}}>
                    <View style={{alignItems:"center", flexDirection: "row"}}>
                        <Text style={{fontWeight:"bold", fontSize: 17, color:"black"}}>₹{this.props.route.params.item.discount}</Text>
                        <Text style={{fontWeight:"bold", fontSize: 15, textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginLeft: 7, marginTop: 2}}>{this.props.route.params.item.price}</Text>
                    </View>
                    <View style={{ backgroundColor:"#69B142", paddingLeft: 10, paddingRight: 10, paddingTop: 3.5, paddingBottom: 3.5, borderRadius: 7, marginLeft:"5%"}}>
                        <Text style={{color:"#fff", fontWeight:"bold"}}>You Save  ₹{this.props.route.params.item.price-this.props.route.params.item.discount}</Text>
                    </View>
                </View>
                <Text style={{fontWeight:"bold", fontSize: 11}}>Inclusive all taxes</Text>
                <View style={{marginTop:"8.5%", flexDirection:"row"}}>
                    <View style={{width: "63%", marginRight:"2%"}}>
                        <TextInput
                            mode={"outlined"}
                            theme={{colors: { 
                                placeholder: '#69B142', 
                                text: '#222', primary: '#222',
                                underlineColor:'transparent',    
                                background : '#fff'
                            }}}
                            label="Pincode"
                            value={this.state.pincode}
                            onChangeText={text => this.setState({pincode: text})}
                        />
                    </View>
                    <View style={{width: "35%", marginTop: 5}}>
                        <Button
                            style={{
                            container: { borderRadius: 5, height: 58, backgroundColor: "#69B142", width: "100%" },
                            text: { fontWeight: "bold", color: "#fff" },
                            }}
                            onPress={this.onSubmit}
                            text="Check Availability"
                        />
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#DEDEDE',
                        borderBottomWidth: 0.9,
                        alignSelf:"center",
                        width:"100%",
                        marginTop:"7%",
                        marginBottom:"5%"
                    }}
                />
                <View style={{marginTop:"2%"}}>
                    <View>
                        <Text style={{color:"black", fontSize: 16, fontWeight:"bold"}}>Description</Text>
                        <Text style={{color:"#9A9A9A"}}>Fresh & organic red apples hand-plucked from the farms of Bangkok, Thailand. Worth the price for the juicy mouth-watering flavour, these apples are our one of the best sellers.</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-evenly", marginTop:"5%"}}>
                        <View style={{flexDirection:"row", alignItems:"center", padding:7, paddingLeft: 10, paddingRight: 10, borderWidth:1, borderColor:"#E5E5E5", borderRadius: 10}}>
                            <SimpleLineIcons name="badge" size={24} color="#9fd980" />
                            <Text style={{marginLeft: 5}}>100% Organic</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center", padding:7, paddingLeft: 10, paddingRight: 10, borderWidth:1, borderColor:"#E5E5E5", borderRadius: 10}}>
                            <AntDesign name="Safety"size={24} color="#9fd980" />
                            <Text style={{marginLeft: 5}}>Safe & Sanitized</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:"7%",}}>
                    <Text style={{color:"black", fontSize: 16, fontWeight:"bold"}}>Reviews</Text>
                    <View style={{flexDirection:"row", marginTop: 15}}>
                        <Image
                            source={require("../../assets/user.png")}
                            style={{
                            height: 50,
                            width: 50,
                            borderRadius: 80 / 2,
                            resizeMode:"cover",
                            }}
                        />
                        <View style={{flexDirection:"column", marginLeft: 15}}>
                            <Text style={{color:"black", fontSize: 13, fontWeight:"bold"}}>Raman</Text>
                            <Text style={{fontSize: 13,}}>Great apples, loved them! Will definitely{"\n"}buy again.</Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:"space-between", flexDirection:"row", margin:"2%", marginTop: "10%", alignItems:"center"}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <TouchableOpacity onPress={() => this.decreaseCount()}>
                                <AntDesign name="minuscircle" size={40} color="#D3D3D3" style={{marginRight: 13}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 25, fontWeight:"bold", color:"black"}}>{this.state.itemCount}</Text>
                            <TouchableOpacity onPress={() => this.increaseCount()}>
                                <AntDesign name="pluscircle" size={40} color="#9fd980" style={{marginLeft: 13}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: "50%", backgroundColor:"green", height: 45, alignSelf:"center", borderRadius: 10, justifyContent:"center"}}>
                            <Text style={{fontWeight:"bold", fontSize: 17, color:"#fff", textAlign:"center"}}>Add To Cart</Text>
                        </View>
                    </View>
            </View>
            
          </ScrollView>
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    image_slider_view: {
        height: 400, backgroundColor:"transparent", width:"100%", borderRadius: 10,

    },
    categories_boxes: {
        marginTop: "7%",
        marginBottom: 100, backgroundColor:"#fff",
        paddingLeft:"6.5%",
        paddingRight: "7%",
    },
    shadowBox:{
        borderRadius: 5, height: 45, width: 45, backgroundColor: "#fff", borderColor: "#DEDEDE", borderWidth: 0.7,
        justifyContent:"center", 
        alignItems:"center",
        alignSelf:"center",
        elevation: 1,
    }
  })