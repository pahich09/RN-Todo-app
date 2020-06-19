import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import {AppCard} from '../ui/AppCard';
import {EditModal} from '../components/EditModal';
import {AppTextBold} from '../ui/AppTextBold';
import {AppButton} from '../ui/AppButton';
import {TodoContext} from '../context/todo/todocontext';
import {ScreenContext} from '../context/screen/screenContext';

export const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const {updateTodo, removeTodo, todos} = useContext(TodoContext);
  const {todoId, changeScreens} = useContext(ScreenContext);

  const todo = todos.find(el => el.id === todoId);

  const saveHandler = title => {
    updateTodo(todoId, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onClose={() => setModal(false)}
        value={todo.title}
        onSave={saveHandler}
      />
      <AppCard style={{padding: 10}}>
        <AppTextBold>
          {todo.title}
        </AppTextBold>
        <AppButton
          onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} color="#ffffff"/>
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreens(null)}
                     color={THEME.GREY_COLOR}
          >
            <AntDesign name="back" size={20} color="#ffffff"/>
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <AntDesign name="delete" size={20} color="#ffffff"/>
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%'
  }
});
