import React, { useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { translate } from 'localization/hooks';

import { AuthStackScreens } from 'navigation/stacks/auth';

import { SignUpRequest } from 'network/models/user-models';
import { useSignUp } from 'network/queries/user-queries';

import styles from './styles';
import { SignUpNavigationProps } from './types';

const SignUpScreen: React.FunctionComponent<SignUpNavigationProps> = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const backgroundImage = require('assets/auth/background.jpeg');
  const logoImage = require('assets/auth/logo.png');

  const { mutate } = useSignUp({
    onError: () => {
      setError(translate('screen.signUp.errorAPI'));
    },
    onSuccess: () => {},
  });

  const onSignUpPress = () => {
    if (!email || !name || !password || !passwordConfirmation) {
      setError(translate('screen.signUp.errorEmpty'));
      return;
    }
    if (email.includes('@') === false) {
      setError(translate('screen.signUp.errorEmail'));
      return;
    }
    if (password !== passwordConfirmation) {
      setError(translate('screen.signUp.errorPassword'));
      return;
    }
    setError('');

    const userInfo: SignUpRequest = {
      user: {
        email,
        name,
        password,
        passwordConfirmation,
      },
    };

    mutate(userInfo);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>{translate('screen.signUp.email')}</Text>
        <TextInput
          autoComplete="email"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder={translate('screen.signUp.hintMail')}
        />
        <Text style={styles.text}>{translate('screen.signUp.name')}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={translate('screen.signUp.hintName')}
        />
        <Text style={styles.text}>{translate('screen.signUp.password')}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder={translate('screen.signUp.hintPassword')}
        />
        <Text style={styles.text}>{translate('screen.signUp.passwordConfirmation')}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder={translate('screen.signUp.hintPasswordConfirmation')}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>{translate('screen.signUp.signUp')}</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.info}>
          {translate('screen.signUp.accept')}
          <Text style={styles.link}>{translate('screen.signUp.dataPolicy')}</Text>
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate(AuthStackScreens.SignIn)}>
          <Text style={styles.info}>
            {translate('screen.signUp.already')}
            <Text style={styles.link}>{translate('screen.signUp.signIn')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
