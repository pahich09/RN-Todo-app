import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {TodoItem} from '../components/TodoItem';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';

export const MainScreen = ({todos, addTodo, removeTodo, openTodo}) => {
  let content = (<FlatList
    keyExtractor={item => item.id}
    data={todos}
    renderItem={({item}) => <TodoItem
      todo={item}
      onRemove={removeTodo}
      onOpen={openTodo}
    />}
  />);

  if (!todos.length) {
    content = (
      <View style={styles.imageWrap}>
        <AppText style={styles.text}>Заметок нет</AppText>
        <Image source={require('../../assets/empty.png')}
               style={styles.image}
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onAdd={addTodo}/>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    paddingTop: 20
  },
  image: {
    width: '100%',
    resizeMode: 'contain'
    },
  text: {
    fontSize: 26,
    color: THEME.GREY_COLOR
  }

});
