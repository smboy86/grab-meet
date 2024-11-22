import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SplashScreen, Tabs } from 'expo-router';
import TabBar from '~/components/layout/tabBar';
import { useAuth } from '~/providers/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { useCallback, useEffect } from 'react';

export default function TabLayout() {
  const { isLoading } = useAuth();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        hideSplash();
      }, 100);
    }
  }, [hideSplash, isLoading]);

  if (isLoading) {
    return <ActivityIndicator size='large' color='blue' />;
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          href: null,
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Entypo size={28} name='calendar' color={color} />,
        }}
      />
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo size={28} name='calendar' color={color} />,
        }}
      />
      <Tabs.Screen
        name='my'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name='person-outline' color={color} />,
        }}
      />
    </Tabs>
  );
}
