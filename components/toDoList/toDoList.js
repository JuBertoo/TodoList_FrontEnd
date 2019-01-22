import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';


const { height, width } = Dimensions.get('window');

class TodoList extends Component {
  state = {
    isCompleted: false,
    
  };


toggleItem = () => {
    this.setState(prevState => {
      return{
        isCompleted: !prevState.isCompleted
      }
    })
  }

  handleDelete = (todo) => {

    this.props.toggleItem[id].slice()

  }


  render() {
    const { isCompleted,} = this.state;

    return (
        <View style={styles.container}>
        <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.toggleItem}>
        <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}>
       
 
        </View>
      </TouchableOpacity>
        <Text style={[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]}>
         {this.props.newTodoItem.note}
            </Text>
        </View>
          <View style={styles.buttons}>
          <TouchableOpacity onPress={this.props.handleDelete} >
            <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>❌</Text>
            </View>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 25,
    // borderBottomColor: '#bbb',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius:10,
    marginBottom:10,
  },
  text: {
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginLeft: 10,
    marginRight: 20
  },
  completeCircle: {
    borderColor: '#9d9fa0'
  },
  incompleteCircle: {
    borderColor: '#76acbf'
  },
  strikeText: {
    color: '#9d9fa0',
    textDecorationLine: 'line-through'
  },
  unstrikeText: {
    color: "white"
  },
  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  }
});

export default TodoList;