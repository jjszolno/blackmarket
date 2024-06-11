import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CartScreen from 'features/cart/screen';
import FavoritesScreen from 'features/favorites/screen';
import HomeScreen from 'features/home/screen';
import PurchasesScreen from 'features/purchases/screen';
import SettingScreen from 'features/settings/screen';

import { translate } from 'localization/hooks';

import styles from './styles';

const Tab = createMaterialBottomTabNavigator();

const HomeIcon = ({ color }: { color: string }) => <Icon name="home" color={color} size={26} />;
const PurchasesIcon = ({ color }: { color: string }) => (
  <Icon name="bookmarks" color={color} size={26} />
);
const CartIcon = ({ color }: { color: string }) => (
  <Icon name="shopping-cart" color={color} size={26} />
);
const FavoritesIcon = ({ color }: { color: string }) => (
  <Icon name="heart" color={color} size={26} />
);
const SettingsIcon = ({ color }: { color: string }) => <Icon name="cog" color={color} size={26} />;

const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={styles.bar}
      labeled={false}
      activeColor="#000"
      activeIndicatorStyle={styles.itemActive}
      inactiveColor="#fff">
      <Tab.Screen
        name={translate('screen.home.title')}
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name={translate('screen.purchases.title')}
        component={PurchasesScreen}
        options={{ tabBarIcon: PurchasesIcon }}
      />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarIcon: CartIcon }} />
      <Tab.Screen
        name={translate('screen.favorites.title')}
        component={FavoritesScreen}
        options={{ tabBarIcon: FavoritesIcon }}
      />
      <Tab.Screen
        name={translate('screen.settings.title')}
        component={SettingScreen}
        options={{ tabBarIcon: SettingsIcon }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
