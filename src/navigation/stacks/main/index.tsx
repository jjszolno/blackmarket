import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartScreen from 'features/cart/screen';
import FavoritesScreen from 'features/favorites/screen';
import HomeScreen from 'features/home/screen';
import DetailScreen from 'features/productDetail/screen';
import ProductsScreen from 'features/products/screen';
import SettingScreen from 'features/settings/screen';

import { translate } from 'localization/hooks';

import styles from './styles';

export enum MainStackScreens {
  'Home' = 'Home',
  'Products' = 'Products',
  'Cart' = 'Cart',
  'Favorites' = 'Favorites',
  'Settings' = 'Settings',
  'Detail' = 'Detail',
}

export type MainStackParamList = {
  [MainStackScreens.Home]: undefined;
  [MainStackScreens.Settings]: undefined;
  [MainStackScreens.Products]: undefined;
  [MainStackScreens.Cart]: undefined;
  [MainStackScreens.Favorites]: undefined;
  [MainStackScreens.Detail]: {
    productId: number;
  };
};

const Tab = createMaterialBottomTabNavigator();
const StackNav = createNativeStackNavigator<MainStackParamList>();

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

function TabsNavigation() {
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
        component={HomeStack}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name={translate('screen.purchases.title')}
        component={ProductStack}
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
}

const ProductStack = () => {
  return (
    <StackNav.Navigator screenOptions={{ headerShown: false }}>
      <StackNav.Screen name={MainStackScreens.Products} component={ProductsScreen} />
      <StackNav.Screen name={MainStackScreens.Detail} component={DetailScreen} />
    </StackNav.Navigator>
  );
};

const HomeStack = () => {
  return (
    <StackNav.Navigator screenOptions={{ headerShown: false }}>
      <StackNav.Screen name={MainStackScreens.Home} component={HomeScreen} />
      <StackNav.Screen name={MainStackScreens.Detail} component={DetailScreen} />
    </StackNav.Navigator>
  );
};

const MainStack = () => {
  return (
    <StackNav.Navigator screenOptions={{ headerShown: false }}>
      <StackNav.Screen name={MainStackScreens.Home} component={TabsNavigation} />
    </StackNav.Navigator>
  );
};

export default MainStack;
