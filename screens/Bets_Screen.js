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

      alterouAposta = index => {

      }

      renderItem = ({item}) => 
             (                
                <View style={{ padding: 16, flexDirection: "row",  borderBottomColor: 'white', borderBottomWidth: 1 }}>
                    <Image style={{ width: 60, height: 80 }} source={{ uri: item.image }} ></Image>
                    <View style={{alignItems: "center"}}>
                        <Text style={{paddingLeft: 10, color: 'white', fontWeight: "bold", fontSize: 24 }} >{item.nome}</Text>
                        <SegmentedControlTab
                          values={["Morre", "Vive", "Rei"]}
                          selectedIndex={!item.isVivo ? 0 : !item.isKing ? 1 : 2} 
                          onTabPress={this.alterouAposta}    
                          style={{ padding: 10 }}                      
                        />
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