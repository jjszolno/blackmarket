import React, { useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AuthStackScreens } from 'navigation/stacks/auth';

import styles from './styles';
import { SignUpNavigationProps } from './types';

const SignUpScreen: React.FunctionComponent<SignUpNavigationProps> = props => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSignUpPress = () => {
    if (!email || !fullName || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (email.includes('@') === false) {
      setError('Please enter a valid email');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
  };

  return (
    <ImageBackground source={require('assets/auth/background.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('assets/auth/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Email</Text>
        <TextInput
          autoComplete="email"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Full Name</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.info}>
          By signing up, you accept the <Text style={styles.link}>Data Policy.</Text>
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate(AuthStackScreens.SignIn)}>
          <Text style={styles.info}>
            Already have an account? <Text style={styles.link}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
