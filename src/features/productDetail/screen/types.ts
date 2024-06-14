import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList, MainStackScreens } from 'navigation/stacks/main';

export type DetailNavigationProps = NativeStackScreenProps<
  MainStackParamList,
  MainStackScreens.Detail
>;
