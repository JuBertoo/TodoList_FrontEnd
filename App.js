import React from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import TodoList from './components/toDoList/TodoList'
import axios from 'axios'



export default class App extends React.Component {
 
  state = {
    newTodoItem: '',
    todos: [] , 
    
  };

  componentDidMount() {
    this.getList()

  }
  
  handleChange = (e) => {
    this.setState({newTodoItem: e});
  };

 
  getList =()=>{
    axios.get('https://todolist-api-julien.herokuapp.com/lists')
    .then((res) => {
      this.setState({todos: res.data})
    })
    .catch((err) => console.log(err))
  }

  handleSubmit = () => {
    if(this.state.newTodoItem !== ''){
      axios.post('https://todolist-api-julien.herokuapp.com/lists', {
        note: this.state.newTodoItem })
      .then((res) => {
        console.log("Création efffectuées")
        this.getList()
        this.setState({newTodoItem: ''})
      })
      .catch((err) => console.log(err))
    }else{
      alert('Enter a task')
    }
  
  }

  handleDelete = (id) => {
   
      axios.delete(`https://todolist-api-julien.herokuapp.com/lists/${id}`)
      .then((res) => {
        this.getList()
      })
      .catch((err) => console.log(err))
    
  }



  render() {
    
    return (
      <LinearGradient style={styles.container} colors={['#9ec1cd', '#bed6cc']}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.appTitle}>Todo List App</Text>
        <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={'Ajouter une tâche'}
          value={this.state.newTodoItem}
          onChangeText={(this.handleChange)}
          placeholderTextColor={'#999'}
          returnKeyType={'done'}
          autoCorrect={false}
          onSubmitEditing={this.handleSubmit}
        />
       </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
      {
      this.state.todos.map((todo, key) => {
        return(
          <View key={key}>
          <TodoList
        newTodoItem = {todo}  
        handleDelete = {() => this.handleDelete(todo.id)}
        />
        </View>
        )
      }
      )}
      </ScrollView>
    
       
      </LinearGradient>
    );
  }
}

const { heigh, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center'
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
  },
  card: {
    backgroundColor: '#fff',
    flex: 0,
    width: width - 25,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    fontSize: 24,
    
  },
  listContainer: {
    marginTop:20,
    alignItems: 'center',
    
  }
 

});