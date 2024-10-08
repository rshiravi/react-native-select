import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { inputStyles } from '../../styles/input';

const DropdownSelectedItemsView = ({
  placeholder,
  error,
  getSelectedItemsLabel,
  openModal,
  isMultiple,
  selectedItem,
  selectedItems,
  dropdownIcon,
  dropdownStyle,
  dropdownIconStyle,
  selectedItemStyle,
  placeholderStyle,
  multipleSelectedItemStyle,
  dropdownErrorStyle,
  primaryColor,
  disabled,
  setIndexOfSelectedItem,
}: any) => {
  return (
    <Pressable
      onPress={() => openModal()}
      style={({ pressed }) => [
        pressed && {
          ...inputStyles.inputFocusState,
          borderColor: primaryColor,
        },
        { ...inputStyles.input, ...dropdownStyle },
        error && //this must be last
          error !== '' &&
          !pressed && {
            ...inputStyles.inputFocusErrorState,
            ...dropdownErrorStyle,
          },
      ]}
      disabled={disabled}
    >
      <ScrollView
       
        alwaysBounceHorizontal
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={styles.selectedItemsContainer}
          onStartShouldSetResponder={() => true}
        >
          {isMultiple ? (
            getSelectedItemsLabel()?.map((label: string, i: Number) => (
              <DropdownContent
                onPress={() => {
                  openModal();
                  setIndexOfSelectedItem(label); // immediately scrolls to list item with the specified label when modal
                }}
                key={`react-native-input-select-${Math.random()}-${i}`}
                style={[
                  styles.selectedItems,
                  { backgroundColor: primaryColor },
                  multipleSelectedItemStyle,
                ]}
                label={label}
                disabled={disabled}
              />
            ))
          ) : (
            <DropdownContent
              onPress={() => {
                openModal();
                setIndexOfSelectedItem(getSelectedItemsLabel()); // immediately scrolls to list item with the specified label when modal
              }}
              style={[styles.blackText, selectedItemStyle]}
              label={getSelectedItemsLabel()}
              disabled={disabled}
            />
          )}
          {!selectedItem && selectedItems?.length === 0 && (
            <DropdownContent
              onPress={() => openModal()}
              style={[styles.blackText, placeholderStyle]}
              label={placeholder ?? 'Select an option'}
              disabled={disabled}
            />
          )}
        </View>
      </ScrollView>
      <View style={[styles.iconStyle, dropdownIconStyle]}>
        {dropdownIcon || (
          <Image source={require('../../asset/arrow-down.png')} />
        )}
      </View>
    </Pressable>
  );
};

const DropdownContent = ({ onPress, style, label, ...rest }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress()} {...rest}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: { position: 'absolute', left: 25, top: 25 },
  selectedItemsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  selectedItems: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
    overflow: 'hidden',
  },
  blackText: { color: colors.black },
});

export default DropdownSelectedItemsView;
