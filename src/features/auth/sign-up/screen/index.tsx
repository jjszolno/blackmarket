import React, { useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AuthStackScreens } from 'navigation/stacks/auth';

import { SignUpRequest } from 'network/models/user-models';
import { useSignUp } from 'network/queries/user-queries';

import common from '../../../../localization/resources/en.json';
import styles from './styles';
import { SignUpNavigationProps } from './types';

const SignUpScreen: React.FunctionComponent<SignUpNavigationProps> = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const { mutate } = useSignUp({
    onError: () => {
      setError(common.screen.signUp.errorAPI);
    },
    onSuccess: () => {
      props.navigation.navigate(AuthStackScreens.Welcome);
    },
  });

  const onSignUpPress = () => {
    if (!email || !name || !password || !passwordConfirmation) {
      setError(common.screen.signUp.errorEmpty);
      return;
    }
    if (email.includes('@') === false) {
      setError(common.screen.signUp.errorEmail);
      return;
    }
    if (password !== passwordConfirmation) {
      setError(common.screen.signUp.errorPassword);
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
    <ImageBackground source={require('assets/auth/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('assets/auth/logo.png')} style={styles.logo} />
        <Text style={styles.text}>{common.screen.signUp.email}</Text>
        <TextInput
          autoComplete="email"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder={common.screen.signUp.hintMail}
        />
        <Text style={styles.text}>{common.screen.signUp.name}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={common.screen.signUp.hintName}
        />
        <Text style={styles.text}>{common.screen.signUp.password}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder={common.screen.signUp.hintPassword}
        />
        <Text style={styles.text}>{common.screen.signUp.passwordConfirmation}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder={common.screen.signUp.hintPasswordConfirmation}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.info}>
          {common.screen.signUp.accept}<Text style={styles.link}>{common.screen.signUp.dataPolicy}</Text>
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate(AuthStackScreens.SignIn)}>
          <Text style={styles.info}>
            {common.screen.signUp.already}<Text style={styles.link}>{common.screen.signUp.signIn}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
