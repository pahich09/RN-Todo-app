import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {AppCard} from '../ui/AppCard';
import {EditModal} from '../components/EditModal';
import {AppTextBold} from '../ui/AppTextBold';
import {AppButton} from '../ui/AppButton';

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
  const [modal, setModal] = useState(false);

  const saveHandler = title => {
    onSave(todo.id, title);
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
          <AppButton onPress={goBack}
                     color={THEME.GREY_COLOR}
          >
            <AntDesign name="back" size={20} color="#ffffff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          >
            <AntDesign name="delete" size={20} color="#ffffff" />
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
