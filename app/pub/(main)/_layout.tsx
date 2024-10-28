import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import TabBar from '~/components/layout/tabBar';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo size={28} name='calendar' color={color} />,
        }}
      />
      <Tabs.Screen
        name='home'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />,
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
