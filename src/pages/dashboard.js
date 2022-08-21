import React from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

import data from './products.json';

const windowWidth = Dimensions.get('window').width;

export default class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../assets/carousel_1.png'),
        require('../../assets/carousel_2.jpg'),
        require('../../assets/carousel_3.jpg')
      ],
      searchQuery: null,
      width: windowWidth*(92/100),
      products: data,
      likeModal: false
    }
  }
  toggleLike = () => {
    this.setState({
      likeModal: true
    })
    setTimeout(() => this.setState({likeModal: false}), 550)
  }
  render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', width: windowWidth}}>
          <StatusBar
            animated={true}
            backgroundColor="#fff"
            hidden={false}
            translucent={false}
          />
          <View style={{margin:"3%", padding:"3%", flexDirection:"row", justifyContent:"space-between"}}>
            <View>
                <Text style={{fontSize: 17, color:"#C6C6C6", fontWeight:"bold"}}>Welcome</Text>
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
          <View style={{marginLeft:"4%", marginRight:"4%", width:"92%", flexDirection:"row", marginTop: 5, marginBottom: 20,}}>
            <Searchbar
                placeholder="Search Grocery"
                onChangeText={(text) => this.setState({searchQuery: text})}
                value={this.state.searchQuery}
                style={{
                width:"83%",
                marginRight:"3%",
                borderRadius: 10,
                textTransform: 'capitalize'
                }}
            />
            <View style={{width:"14%", backgroundColor:"#9fd980", height: 50, borderRadius: 7, alignItems:"center", justifyContent:"center"}}>
                <MaterialIcons name="tune" size={30} color="white" />
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1}}>
            <View style={styles.image_slider_view}>
              <SliderBox
                images={this.state.images}
                sliderBoxHeight={160}
                parentWidth={this.state.width}
                dotColor="#9fd980"
                autoplay
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                ImageComponentStyle={{borderRadius: 15, borderWidth: 1, borderColor:"#EAEAEA"}}
                imageLoadingColor="#9fd980"
              />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginLeft:"2.5%", marginRight:"2.5%",}}>
              <View style={{flex:1, flexDirection:"row"}}>
                <View style={styles.categories_boxes}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/discount.png")}
                      style={{
                        height: 40,
                        width: 40,
                      }}
                    />
                    <Text style={{marginTop: 4, fontWeight:"bold", fontSize: 12.5, color:"#222", textAlign:"center"}}>Offers</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.categories_boxes}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/top_selling.png")}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent:"center",
                        alignSelf:"center"
                      }}
                    />
                    <Text style={{marginTop: 4, fontWeight:"bold", fontSize: 12.5, color:"#222", textAlign:"center"}}>Top Selling</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.categories_boxes}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/apple.png")}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent:"center",
                        alignSelf:"center"
                      }}
                    />
                    <Text style={{marginTop: 4, fontWeight:"bold", fontSize: 11.5, color:"#222", textAlign:"center"}}>Fruits</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.categories_boxes}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/cabbage.png")}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent:"center",
                        alignSelf:"center"
                      }}
                    />
                    <Text style={{marginTop: 4, fontWeight:"bold", fontSize: 11.5, color:"#222", textAlign:"center"}}>Vegetables</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.categories_boxes}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/jar.png")}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent:"center",
                        alignSelf:"center"
                      }}
                    />
                    <Text style={{marginTop: 4, fontWeight:"bold", fontSize: 11.5, color:"#222", textAlign:"center"}}>Pickles</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.categories_boxes}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/dairy.png")}
                      style={{
                        height: 40,
                        width: 40,
                        justifyContent:"center",
                        alignSelf:"center"
                      }}
                    />
                    <Text style={{marginTop: 4, fontWeight:"bold", fontSize: 11.5, color:"#222", textAlign:"center"}}>Dairy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: "space-evenly", marginBottom: 90, marginTop:"5%"}}>
              {
                this.state.products.map((item, key) =>(
                  <View style={styles.productBox} key={key}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ProductView", {
                          item
                        });
                      }}>
                      <>
                        <View style={{height:"75%", width:"100%"}}>
                          <Image source={{uri: item.images}} style={{height:"100%", width:"100%", borderRadius: 5, }} resizeMode="contain"/>
                        </View>
                        <Text style={{textAlign:"left", fontWeight:"bold", marginTop:"5%",}}>{item.product_title}</Text>
                        <View style={{flexDirection:"row", marginTop: 3, width: "100%"}}>
                          <View style={{flexDirection:"row", width:"85%"}}>
                            <Image source={require("../../assets/discount.png")}
                              style={{
                                height: 20,
                                width: 20
                              }}
                            />
                            <Text style={{fontWeight:"bold", marginLeft: 5, fontSize: 13.5}}>Rs.{item.discount}</Text>
                            <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginLeft: 5, fontSize: 12.5, marginTop: 2}}>{item.price}</Text>
                          </View>
                          <View style={{flexDirection:"row"}}>
                            <TouchableOpacity>
                              <Entypo name="heart-outlined" size={20} color="#95D573" style={{marginRight:20}}/>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>
          </ScrollView>
          
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    image_slider_view: {
        marginBottom: "5%", width: "92%", height: 160, marginLeft:"4%", marginRight:"4%", shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      
    },
    categories_boxes: {
      borderRadius: 10, height: 80, width: 80, backgroundColor: "#fff", shadowColor: "#000",
      margin: 10,
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
    productBox: {
      borderRadius: 10, height: 260, width: "43%", backgroundColor: "#fff", shadowColor: "#000", marginBottom: "5%",
      paddingTop: "3%",
      paddingLeft: "2.5%",
      paddingRight: "2.5%",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      margin: 1,
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    }
  })