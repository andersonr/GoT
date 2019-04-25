import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { personagens } from '../utils/personagens';
import { SwitchSelector } from "react-native-switch-selector";

import {
  FlatList,
  View,
  StyleSheet, 
  Image,
  Text,
  Platform,
  StatusBar
} from 'react-native';

import {RkChoice, RkText, RkTheme} from 'react-native-ui-kitten';
import {Avatar} from './../components';
import notifications from './../data/raw/notifications';
import {FontAwesome} from './../assets/icons';
import SegmentedControlTab from "react-native-segmented-control-tab";

class BetsScreen extends Component {
    
    static navigationOptions = {
        headerTitle: 'Apostas',
        tabBarIcon: ({ tintColor }) => (
          <RkText
            rkType='awesome'
            style={{
              color: tintColor,
              marginBottom: 0,
            }}>
              {FontAwesome.list}
          </RkText>
        ),
    
        
        header: (headerOptions) => <Header {...headerOptions} />,
        headerStyle: {
           backgroundColor: '#FFFFFF',
           elevation: 2,
           paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10
         },
        headerTitleStyle: {
          fontSize: 22,
          alignSelf:'center',
          marginBottom: Platform.OS === 'ios' ? 0 : 10
        }        
      };

      alterou(i, personagen) {
        
      }

      alterouAposta = index => {

      }

      renderItem = ({item}) => 
             (                
                <View style={{ flex: 1, padding: 16, flexDirection: "row",  borderBottomColor: 'white', borderBottomWidth: 1 }}>
                    <Image style={{ width: 60, height: 80 }} source={{ uri: item.image }} ></Image>
                    <View style={{alignItems: "center", flex: 1}}>
                        <Text style={{paddingLeft: 10, color: 'white', fontWeight: "bold", fontSize: 24 }} >{item.nome}</Text>
                        <View style={{ alignSelf: "stretch"  }}>
                          <SegmentedControlTab
                            values={["Morre", "Rei", "Vive" ]}
                            selectedIndex={!item.isVivo ? 0 : !item.isKing ? 2 : 1} 
                            onTabPress={index => { this.alterou(index, item);}}    
                            tabsContainerStyle={{paddingTop: 10, paddingBottom: 2, paddingLeft: 20, paddingRight: 10, height: 50}}                                                  
                          />
                        </View>
                        
                    </View>
                </View>                
            );

      render() {

        return (
        <View style={styles.container}>
            <FlatList 
                data={personagens}
                keyExtractor={(item, index) => item.id }
                renderItem={ this.renderItem } 
            />

        </View>
        );}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#efefef',    
      backgroundColor: 'black',    
    },  
    
  });

export default BetsScreen;