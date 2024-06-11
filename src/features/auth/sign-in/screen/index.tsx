import React, { useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { translate } from 'localization/hooks';

import { AuthStackScreens } from 'navigation/stacks/auth';

import { SignInRequest } from 'network/models/user-models';
import { useSignIn } from 'network/queries/user-queries';

import styles from './styles';
import { SignInNavigationProps } from './types';

const SignInScreen: React.FunctionComponent<SignInNavigationProps> = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backgroundImage = require('assets/auth/background.jpeg');
  const logoImage = require('assets/auth/logo.png');

  const { mutate } = useSignIn({
    onError: () => {
      setError(translate('screen.signIn.errorAPI'));
    },
    onSuccess: () => {},
  });

  const onSignInPress = () => {
    if (!email || !password) {
      setError(translate('screen.signIn.errorEmpty'));
      return;
    }
    if (email.includes('@') === false) {
      setError(translate('screen.signIn.errorEmail'));
      return;
    }
    setError('');

    const userInfo: SignInRequest = {
      user: {
        email,
        password,
      },
    };

    mutate(userInfo);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.text}>{translate('screen.signIn.email')}</Text>
        <TextInput
          autoComplete="email"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder={translate('screen.signIn.hintMail')}
        />
        <Text style={styles.text}>{translate('screen.signIn.password')}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder={translate('screen.signIn.hintPassword')}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>{translate('screen.signIn.signIn')}</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.link}>{translate('screen.signIn.forgotPassword')}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.info}>{translate('screen.signIn.noAccount')}</Text>
        <TouchableOpacity
          style={styles.buttonInverted}
          onPress={() => props.navigation.navigate(AuthStackScreens.SignUp)}>
          <Text style={styles.buttonTextInverted}>{translate('screen.signIn.signUp')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;
