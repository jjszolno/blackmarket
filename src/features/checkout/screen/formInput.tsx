import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput } from 'react-native';

interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
}
const FormInput: React.FunctionComponent<FormInputProps> = ({
  control,
  name,
  label,
  ...otherProps
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={label}
              {...otherProps}
            />
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </>
        )}
      />
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
});

export default FormInput;
