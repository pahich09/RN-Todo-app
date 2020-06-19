import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, TextInput, View} from 'react-native';
import {THEME} from '../theme';
import {AppButton} from '../ui/AppButton';

export const EditModal = ({visible, onClose, value, onSave}) => {
  const [title, setTitle] = useState(value);
  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Ошибка',
        `Минимальная длина 3 символа. Сейчас ${title.trim().length} символов`);
    } else {
      onSave(title);
      onClose();
    }
  };
  const closeHandler = () => {
    setTitle(value);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          maxLength={50}
          placeholder='Редактировать заметку'
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={closeHandler}
          >Отмена
          </AppButton>
          <AppButton
            color={THEME.SUCCESS_COLOR}
            onPress={saveHandler}
          >
            Сохранить
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  input: {
    width: '80%',
    padding: 7,
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});


