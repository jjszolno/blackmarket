import React, { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { Picker } from '@react-native-picker/picker';
import { NavigationProp } from '@react-navigation/native';

import { translate } from 'localization/hooks';

import { useAddOrder } from 'network/queries/order-queries';

import styles from './styles';

type CheckoutScreenProps = {
  navigation: NavigationProp<any>;
};

const CheckoutScreen: React.FC<CheckoutScreenProps> = props => {
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [cvcCode, setCvcCode] = useState('');
  const [sameBillingAsShipping, setSameBillingAsShipping] = useState(true);

  const [billingCity, setBillingCity] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingAddressLine2, setBillingAddressLine2] = useState('');
  const [billingAddressLine1, setBillingAddressLine1] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');

  const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => ({
    label: `${currentYear + i}`,
    value: currentYear + i,
  }));

  const { mutate } = useAddOrder({
    onError: errorData => {
      showMessage({ message: errorData.cause?.message || errorData.message, type: 'danger' });
    },
    onSuccess: () => {
      props.navigation.goBack();
    },
  });

  const handleSubmit = () => {
    if (!city || !country || !addressLine1 || !postalCode || !cardNumber || !cvcCode) {
      setError('All required fields must be filled out');
      return;
    }

    if (
      !sameBillingAsShipping &&
      (!billingCity || !billingCountry || !billingAddressLine1 || !billingPostalCode)
    ) {
      setError('All required billing fields must be filled out');
      return;
    }

    const currentMonth = new Date().getMonth() + 1;
    const selectedExpirationYear = selectedYear;
    const selectedExpirationMonth = selectedMonth;

    if (
      selectedExpirationYear < currentYear ||
      (selectedExpirationYear === currentYear && selectedExpirationMonth < currentMonth)
    ) {
      setError('The expiration date must be later than the current date');
      return;
    }
    setError('');

    const orderParams = {
      order: {
        shipping_address: {
          city,
          country,
          line_1: addressLine1,
          line_2: addressLine2,
          postal_code: postalCode,
          state: state,
        },
        credit_card: {
          card_number: cardNumber,
          cvc: cvcCode,
          exp_month: selectedMonth,
          exp_year: selectedYear,
        },
      },
    };

    mutate(orderParams);
  };

  const handleCancel = () => {
    props.navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{translate('screen.checkout.title')}</Text>
      <Text style={styles.label}>{translate('screen.checkout.city')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.city')}
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <Text style={styles.label}>{translate('screen.checkout.state')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.state')}
        value={state}
        onChangeText={setState}
        style={styles.input}
      />
      <Text style={styles.label}>{translate('screen.checkout.country')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.country')}
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <Text style={styles.label}>{translate('screen.checkout.address1')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.address1')}
        value={addressLine1}
        onChangeText={setAddressLine1}
        style={styles.input}
      />
      <Text style={styles.label}>{translate('screen.checkout.address2')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.address2')}
        value={addressLine2}
        onChangeText={setAddressLine2}
        style={styles.input}
      />
      <Text style={styles.label}>{translate('screen.checkout.postal')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.postal')}
        value={postalCode}
        onChangeText={setPostalCode}
        style={styles.input}
      />
      <Text style={styles.title}>{translate('screen.checkout.paymentDetails')}</Text>
      <Text style={styles.label}>{translate('screen.checkout.cardNumber')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.cardNumber')}
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
      />
      <Text style={styles.label}>{translate('screen.checkout.expirationDate')}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={itemValue => setSelectedMonth(itemValue)}>
          {months.map(month => (
            <Picker.Item key={month.value} label={month.label} value={month.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={itemValue => setSelectedYear(itemValue)}>
          {years.map(year => (
            <Picker.Item key={year.value} label={year.label} value={year.value} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>{translate('screen.checkout.cvcCode')}</Text>
      <TextInput
        placeholder={translate('screen.checkout.cvc')}
        value={cvcCode}
        onChangeText={setCvcCode}
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Switch value={sameBillingAsShipping} onValueChange={setSameBillingAsShipping} />
        <Text style={styles.text}>{translate('screen.checkout.sameAddress')}</Text>
      </View>
      {!sameBillingAsShipping && (
        <View>
          <Text style={styles.label}>{translate('screen.checkout.city')}</Text>
          <TextInput
            placeholder={translate('screen.checkout.city')}
            value={billingCity}
            onChangeText={setBillingCity}
            style={styles.input}
          />
          <Text style={styles.label}>{translate('screen.checkout.country')}</Text>
          <TextInput
            placeholder={translate('screen.checkout.country')}
            value={billingCountry}
            onChangeText={setBillingCountry}
            style={styles.input}
          />
          <Text style={styles.label}>{translate('screen.checkout.address1')}</Text>
          <TextInput
            placeholder={translate('screen.checkout.address1')}
            value={billingAddressLine1}
            onChangeText={setBillingAddressLine1}
            style={styles.input}
          />
          <Text style={styles.label}>{translate('screen.checkout.address2')}</Text>
          <TextInput
            placeholder={translate('screen.checkout.address2')}
            value={billingAddressLine2}
            onChangeText={setBillingAddressLine2}
            style={styles.input}
          />
          <Text style={styles.label}>{translate('screen.checkout.postal')}</Text>
          <TextInput
            placeholder={translate('screen.checkout.postal')}
            value={billingPostalCode}
            onChangeText={setBillingPostalCode}
            style={styles.input}
          />
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{translate('screen.checkout.placeOrder')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
        <Text style={styles.buttonCancelText}>{translate('screen.checkout.cancel')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;
