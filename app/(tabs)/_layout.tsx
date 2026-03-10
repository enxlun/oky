import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import AnimatedClouds from '@/components/AnimatedClouds';
import MongolianPattern from '@/components/MongolianPattern';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <AnimatedClouds />
      <MongolianPattern />

      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: isDarkMode
              ? 'rgba(31, 41, 55, 0.4)'
              : 'rgba(255, 255, 255, 0.3)',
          },
        ]}>
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: isDarkMode
                ? 'rgba(88, 28, 135, 0.95)'
                : 'rgba(251, 207, 232, 0.95)',
              borderTopWidth: 4,
              borderTopColor: isDarkMode ? '#7e22ce' : '#ffffff',
              height: 80,
              paddingBottom: 10,
              paddingTop: 10,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              position: 'absolute',
            },
            tabBarActiveTintColor: '#32B8DE',
            tabBarInactiveTintColor: isDarkMode ? '#9CA3AF' : '#6B7280',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'calendar-outline';

              if (route.name === 'index') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'explore') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === 'profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Calendar',
              tabBarLabel: 'Хуанли',
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Information',
              tabBarLabel: 'Мэдээлэл',
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarLabel: 'Профайл',
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE4F3',
  },
  mainContainer: {
    flex: 1,
    maxWidth: 428,
    width: '100%',
    alignSelf: 'center',
  },
});
