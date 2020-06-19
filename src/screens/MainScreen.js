import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {TodoItem} from '../components/TodoItem';
import {THEME} from '../theme';
import {AppText} from '../ui/AppText';
import {TodoContext} from '../context/todo/todocontext';
import {ScreenContext} from '../context/screen/screenContext';
import {AppLoader} from '../ui/AppLoader';
import {AppButton} from '../ui/AppButton';


export const MainScreen = () => {
  const {todos, addTodo, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
  const {changeScreens} = useContext(ScreenContext);
  const [
    deviceWidth, setDeviceWidth
  ] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZ * 2);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZ * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener('change', update);
    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading) {
    return <AppLoader/>;
  }

  let content = (
    <View
      style={{deviceWidth}}>
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={({item}) => <TodoItem
          todo={item}
          onRemove={removeTodo}
          onOpen={changeScreens}
        />}
      />
    </View>
  );

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

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
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
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 24,
    marginBottom: 10
  }


});
