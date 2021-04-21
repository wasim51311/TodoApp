
import React, {useState} from 'react';
import {View,Text,FlatList,Alert,TouchableWithoutFeedback,Keyboard, StatusBar } from 'react-native';
import styles from './StyleSheet/Styles';
import Header from './components/Header'
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import SandBox from "./components/SandBox";
import * as Animatable from 'react-native-animatable';



const App=() => {
  const [todos, setTodos]= useState([
    {text:'by coffee' , key:'1'},
    {text:'create an app' , key:'2'},
    {text:'play on the switch' , key:'3'},
  ]);

  const pressHandler = (key) =>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler =(text)=>{

    if (text.length < 4){
      Alert.alert('OOPS!!','Todo long must be over 3 Chars....!!!', [
        {text:'Understood', onPress:()=> console.log('alert colosed')}
      ]);
    }else {
      setTodos ((prevTodos) => {
        return [
          {text:text, key:Math.random().toString()},
          ...prevTodos
        ];
      });
    }

  };
  return (
    
    <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('Dismissing Keyboard');
        }}>
         
           
        <View style={styles.container}>
        <StatusBar backgroundColor='#dC381F' barStyle="light-content"/>
        {/**Header  */}
        <Header/>
        <Animatable.View 
            animation="fadeInUpBig"
            duration={500}
            style={[styles.footer, {
                backgroundColor: "#ffddcc"
            }]}
        >
          
        </Animatable.View>
        <View style={styles.content}>
          {/**to do form */}
          <AddTodo submitHandler={submitHandler}/>
         
          <View style={styles.list} >
            <FlatList
              data={todos}
              renderItem={({item})=> (
                <TodoItem item={item} pressHandler={pressHandler}/>
              )}

            />
        

          </View>
         
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
};
export default App;
