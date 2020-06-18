import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {THEME} from '../theme';
import {AppCard} from '../ui/AppCard';
import {EditModal} from '../components/EditModal';

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
  const [modal, setModal] = useState(false);

  const saveHandler = title => {
    onSave(todo.id, title)
    setModal(false)
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
        <Text>
          {todo.title}
        </Text>
        <Button title='Редактировать'
                onPress={() => setModal(true)}/>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title='Назад'
                  onPress={goBack}
                  style={styles.button}
                  color={THEME.GREY_COLOR}
          />
        </View>
        <View style={styles.button}>
          <Button title='Удалить'
                  color={THEME.DANGER_COLOR}
                  onPress={() => onRemove(todo.id)}
          />
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
