import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';

interface FormInputPickerProps {
  control: Control<any>;
  name: string;
  label: string;
  options: { label: string; value: number | string }[];
}

const FormInputPicker: React.FunctionComponent<FormInputPickerProps> = ({
  control,
  name,
  label,
  options,
  ...otherProps
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
                {...otherProps}>
                {options.map(option => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
              {error && <Text style={styles.errorMessage}>{error.message}</Text>}
            </>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  pickerContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
  },
});

export default FormInputPicker;
