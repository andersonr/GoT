import React from 'react';
import Swiper from "react-native-deck-swiper";
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { Constants } from 'expo';
import { personagens } from '../utils/personagens';
import { apostaRealizada, apostasUsuario } from '../actions';
import {FontAwesome} from './../assets/icons';
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

class Deck_Screen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        swipedAllCards: false,
        swipeDirection: "",
        isSwipingBack: false,
        cardIndex: 0
      };
    }

    static navigationOptions = {
      headerTitle: 'Items',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <RkText
          rkType='awesome'
          style={{
            color: tintColor,
            fontSize: 24,
            marginBottom: 0,
          }}>
            {FontAwesome.comment}
        </RkText>
      ),
    };
  
    toLeft = index => {
      const personagemSelecionado = personagens[index];
      console. log('<<<<<  para esquerda ' + JSON.stringify(personagemSelecionado.nome));

      this.RealizarAposta(personagemSelecionado.id, false);
    };

    toRight = index => {      
      const personagemSelecionado = personagens[index];
      console. log('>>>>>  para direita ' + JSON.stringify(personagemSelecionado.nome));

      this.RealizarAposta(personagemSelecionado.id, true);
    };

    toTop = index => {
      const personagemSelecionado = personagens[index];
      console. log('^^^^^^ para cima: ' + JSON.stringify(personagemSelecionado.nome));
      
      //Fazer aposta como rei de westeros
      this.RealizarAposta(personagemSelecionado.id, true, true);
    };

    RealizarAposta(personagemId, isVivo, isKing){
       //Fazer rotina salvar no firebase
        this.props.apostaRealizada({isVivo, isKing, personagemId})
    }
  
  
    renderCard = card => {
      return (
        <View style={styles.card}>
          <Image style={{ width: 320, height: 420 }} source={{ uri: card.image }} />
          <Text style={styles.text}>{card.nome}</Text>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}} >
              <RkText
                rkType='awesome'
                style={{
                  color: 'red',
                  fontSize: 24,
                  marginBottom: 0,
                }}>
                {FontAwesome.chevronLeft}
            </RkText>
            <RkText
                rkType='awesome'
                style={{
                  color: 'green',
                  fontSize: 24,
                  marginBottom: 0,
                }}>
                {FontAwesome.chevronRight}
            </RkText>
          </View>
        </View>
      );
    };
  
    onSwipedAllCards = () => {
      this.setState({
        swipedAllCards: true
      });
    };
  
    swipeBack = () => {
      if (!this.state.isSwipingBack) {
        this.setIsSwipingBack(true, () => {
          this.swiper.swipeBack(() => {
            this.setIsSwipingBack(false);
          });
        });
      }
    };
  
    setIsSwipingBack = (isSwipingBack, cb) => {
      this.setState(
        {
          isSwipingBack: isSwipingBack
        },
        cb
      );
    };
  
    jumpTo = () => {
      this.swiper.jumpToCardIndex(2);
    };
  
    componentWillMount(){
        console.log('apostasUsuario');
        this.props.apostasUsuario();
        console.log(this.props.apostas);
    }

    render() {
      if(this.state.swipedAllCards)
      {
        return (
          <View>
             <RkCard rkType='shadowed'>
                <View rkCardHeader>
                  <RkText rkType='header'>Todas as apostas realizadas!</RkText>
                </View>
                <View rkCardContent>
                  <RkText style={{textAlign:'center'}}>
                    Você tem 30 minutos para alterar as apostas através do painel de apostas.
                    Após esse tempo, não será mais possível alterar as suas apostas.
                  </RkText>
                </View>
             </RkCard>
          </View>
        );
      }

      return (
        <View style={{ backgroundColor: 'black' }}>
          <Swiper
            useViewOverflow={false}
            style={styles.swiper}
            ref={swiper => {
              this.swiper = swiper;
            }}
            onSwipedTop={this.toTop}
            onSwipedLeft = {this.toLeft}
            onSwipedRight = {this.toRight}
            cards={personagens}
            cardIndex={this.state.cardIndex}
            cardVerticalMargin={5}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            showSecondCard={false}
            verticalSwipe={true}
            showSecondCard
            disableBottomSwipe={true}
            stackSize={2}
            backgroundColor={'red'}
            overlayLabels={{
              left: {
                title: 'Morre',
                  style: {
                    label: {
                      backgroundColor: 'red',
                      borderColor: 'red',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30
                    }
                  }
                },
                right: {
                title: 'Vive',
                  style: {
                    label: {
                      backgroundColor: 'green',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30
                    }
                  }
                },
                top: {
                  title: 'Rei de Westeros',                  
                  style: {
                    label: {
                      backgroundColor: '#cbc04d',
                      borderColor: '#cbc04d',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }
                }
            }}
          >
          </Swiper>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    swiper: {
      paddingTop: Constants.statusBarHeight      
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "flex-start",
      backgroundColor: "black",
      alignItems: 'center',
      flexDirection: 'column'
    },
    text: {
      textAlign: "center",
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
      marginTop: 20,
      backgroundColor: "transparent"      
    },
  });


  const mapStateToProps = ({ userdata }) => {
    const { apostas } = userdata;
    return { apostas };
  };
  
  export default connect(mapStateToProps, {
    apostaRealizada, apostasUsuario
  })(Deck_Screen);