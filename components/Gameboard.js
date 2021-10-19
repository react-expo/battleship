import React from 'react';
import { Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';


let board = [];
let randomShip = [];
const NBR_OF_ROWS = 5;
const NBR_OF_COLS = 5;
const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';

export default class gameboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameOn: false,
            gameEnd: false,
            status: 'Game has not started.',
            buttonText: 'Start game',
            hits: 0,
            bombs: 15,
            ships: 3,
            time: 30
        }
        this.initializeBoard();
    }
    
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
   
    initializeBoard() {
        for (let i = 0; i < NBR_OF_ROWS * NBR_OF_COLS; i++) {
            board[i] = START;
        }
        for (let i = 0; i <= 2;) {
            let random = this.getRandomInt(24);
             if (randomShip.indexOf(random) === -1) {
                randomShip.push(random);
                i++;
            }
        }
    }

    startTime = () => {
        this.interval = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        this.checkWinner();
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1,
            });
        }
    }

    stopTime = () => {
        clearInterval(this.interval);
    }

    startGame() {
        if (this.state.gameOn === false) {
            this.setState({
                gameOn: true,
                buttonText: 'New game'
                
            });
            this.startTime();
        } else {
            this.resetGame();
            this.stopTime();
        }

    }

    checkWinner() {
         if (this.state.hits === 3) {
            this.stopTime();
            this.setState({
                status: 'You sinked all the ships!',
                gameEnd: true,
            });
        }
       else if (this.state.bombs === 0 && this.state.ships > 0) {
            this.stopTime();
            this.setState({
                status: 'Game over. Ships remaining.',
                gameEnd: true,
            });
        }
    
      else  if (this.state.time === 0) {
            this.stopTime();
            this.setState({
                status: 'Timeout! Ships remaining.',
                gameEnd: true,
            });
        } else {
            this.setState({status: 'Game is on...'});
        }


    }

    drawItem(number) {
        
        if (this.state.gameOn === false || this.state.gameEnd === true) {
            this.setState({ status: 'Click the start button first.' })
        } else if (board[number] === START) {
            if (randomShip.indexOf(number) === -1) {
                board[number] = CROSS;
                this.state.bombs--;
            } else {
                this.state.ships--;
                this.state.hits++;
                this.state.bombs--;
                board[number] = CIRCLE;
            }

            this.checkWinner();
            this.setState({
            });
        }
    }

    chooseItemColor(number) {
        if (board[number] === CROSS) {
            return "#FF3031";
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30";
        }
        else {
            return "#9C6902";
        }
    }

    resetGame() {
        this.setState({
            gameOn: false,
            gameEnd: false,
            status: 'Game has not started.',
            buttonText: 'Start game',
            hits: 0,
            bombs: 15,
            ships: 3,
            time: 30
        });
        this.initializeBoard();
    }
  

    render() {

        const items = [];
        for (let x = 0; x < NBR_OF_ROWS; x++){
            const cols = [];
          for  (let y = 0; y < NBR_OF_COLS; y++){
              cols.push(
  <Pressable key={x * NBR_OF_COLS + y} style= { styles.item} onPress={() => this.drawItem(x*NBR_OF_COLS + y)}>
  <Entypo key= {x * NBR_OF_COLS + y} name = {board[x * NBR_OF_COLS + y]} size={28/*30*/ } color={this.chooseItemColor(x * NBR_OF_COLS + y)}>
  </Entypo>
  </Pressable>
              )}
              let row = <View key={"row" + x}>
              {cols.map((item) => item)}
              </View>
              items.push(row);
          }
        
        return (
            <View style={styles.gameboard}>
                <View>
                <Text> In the game of battleship, you win or you ... SINK!</Text>
                </View>
                <View style={styles.flex}>{items}</View>
                <Text style={styles.gameinfo}>Hits: {this.state.hits}  Bombs: {this.state.bombs}  Ships: {this.state.ships}</Text>
                <Text style={styles.gameinfo}>Time: {this.state.time} sec</Text>
                <Text style={styles.gameinfo}>Status: {this.state.status}</Text>
                <Pressable style={styles.button} onPress={() => this.startGame()}>
                    <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                </Pressable>
            </View>
        )
    
    }
}
