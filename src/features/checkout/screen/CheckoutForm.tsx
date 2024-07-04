import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { translate } from 'localization/hooks';

import { OrderParams } from 'network/models/order-models';

import FormInput from './formInput';
import FormInputPicker from './formInputPicker';

const formSchema = z.object({
  city: z.string().min(1, translate('checkout.errors.city')),
  country: z.string().min(1, translate('checkout.errors.country')),
  addressLine1: z.string().min(1, translate('checkout.errors.address1')),
  addressLine2: z.string().min(1, translate('checkout.errors.address2')),
  postalCode: z.string().min(1, translate('checkout.errors.postal')),
  state: z.string().min(1, translate('checkout.errors.state')),
  cardNumber: z.string().min(1, translate('checkout.errors.cardNumber')),
  expirationMonth: z
    .number()
    .min(1, translate('checkout.errors.expirationDate'))
    .max(12, translate('checkout.errors.expirationDate')),
  expirationYear: z.number().min(24, translate('checkout.errors.expirationDate')),
  cvcCode: z.string().min(1, translate('checkout.errors.cvcCode')),
  sameAddress: z.boolean(),
  billingCity: z.string(),
  billingCountry: z.string(),
  billingAddressLine1: z.string(),
  billingAddressLine2: z.string(),
  billingPostalCode: z.string(),
});

type CheckoutFormProps = {
  onSubmitAction: (data: OrderParams) => void;
  onCancel: () => void;
};

export default function CheckoutForm({ onSubmitAction, onCancel }: CheckoutFormProps) {
  const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => ({
    label: `${currentYear + i}`,
    value: currentYear + i,
  }));

  const { control, handleSubmit, register, unregister, watch, setValue } = useForm({
    defaultValues: {
      city: '',
      country: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      state: '',
      cardNumber: '',
      expirationMonth: 1,
      expirationYear: 24,
      cvcCode: '',
      sameAddress: true,
      billingCity: '',
      billingCountry: '',
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingPostalCode: '',
    },
    resolver: zodResolver(formSchema),
  });
  const watchSameAddress = watch('sameAddress');

  React.useEffect(() => {
    if (watchSameAddress) {
      unregister('billingCity');
      unregister('billingCountry');
      unregister('billingAddressLine1');
      unregister('billingAddressLine2');
      unregister('billingPostalCode');
    } else {
      register('billingCity');
      register('billingCountry');
      register('billingAddressLine1');
      register('billingAddressLine2');
      register('billingPostalCode');
    }
  }, [register, unregister, watchSameAddress]);

  const onSubmit = (data: any) => {
    const orderParams = {
      order: {
        shipping_address: {
          city: data.city,
          country: data.country,
          line_1: data.addressLine1,
          line_2: data.addressLine2,
          postal_code: data.postalCode,
          state: data.state,
        },
        credit_card: {
          card_number: data.cardNumber,
          cvc: data.cvcCode,
          exp_month: data.expirationMonth,
          exp_year: data.expirationYear,
        },
      },
    };
    onSubmitAction(orderParams);
  };

  return (
    <View>
      <FormInput control={control} name="city" label={translate('screen.checkout.city')} />
      <FormInput control={control} name="state" label={translate('screen.checkout.state')} />
      <FormInput control={control} name="country" label={translate('screen.checkout.country')} />
      <FormInput
        control={control}
        name="addressLine1"
        label={translate('screen.checkout.address1')}
      />
      <FormInput
        control={control}
        name="addressLine2"
        label={translate('screen.checkout.address2')}
      />
      <FormInput control={control} name="postalCode" label={translate('screen.checkout.postal')} />
      <Text style={styles.title}>{translate('screen.checkout.paymentDetails')}</Text>
      <FormInput
        control={control}
        name="cardNumber"
        label={translate('screen.checkout.cardNumber')}
      />
      <FormInputPicker
        control={control}
        name="expirationMonth"
        label={translate('screen.checkout.month')}
        options={months}
      />
      <FormInputPicker
        control={control}
        name="expirationYear"
        label={translate('screen.checkout.year')}
        options={years}
      />
      <FormInput control={control} name="cvcCode" label={translate('screen.checkout.cvcCode')} />
      <View style={styles.switchContainer}>
        <Switch
          value={watchSameAddress}
          onValueChange={_ => {
            setValue('sameAddress', !watchSameAddress);
          }}
        />
        <Text style={styles.text}>{translate('screen.checkout.sameAddress')}</Text>
      </View>

      {!watchSameAddress && (
        <View>
          <Text style={styles.title}>{translate('screen.checkout.billingAddress')}</Text>
          <FormInput
            control={control}
            name="billingCity"
            label={translate('screen.checkout.city')}
          />
          <FormInput
            control={control}
            name="billingCountry"
            label={translate('screen.checkout.country')}
          />
          <FormInput
            control={control}
            name="billingAddressLine1"
            label={translate('screen.checkout.address1')}
          />
          <FormInput
            control={control}
            name="billingAddressLine2"
            label={translate('screen.checkout.address2')}
          />
          <FormInput
            control={control}
            name="billingPostalCode"
            label={translate('screen.checkout.postal')}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{translate('screen.checkout.placeOrder')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
        <Text style={styles.buttonCancelText}>{translate('screen.checkout.cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000000',
    color: '#000000',
    padding: 10,
    borderRadius: 10,
  },
  buttonCancel: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonCancelText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
