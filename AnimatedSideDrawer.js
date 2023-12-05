import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const YourScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Animated values using useRef
  const translateX = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    const toValue = drawerOpen ? 0 : 1;
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setDrawerOpen(!drawerOpen);
    });
  };

  const homeScreenTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const sideDrawerTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <View style={styles.container}>
      {/* Home Screen */}
      <Animated.View
        style={[
          styles.screen,
          styles.homeScreen,
          { transform: [{ translateX: homeScreenTranslateX }] },
        ]}
      >
        <Text>Your Home Screen Content Goes Here</Text>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text>{drawerOpen ? "Close Drawer" : "Show Drawer"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Side Drawer */}
      <Animated.View
        style={[
          styles.screen,
          styles.sideDrawer,
          { transform: [{ translateX: sideDrawerTranslateX }] },
        ]}
      >
        <Text style={styles.drawerText}>
          Your Side Drawer Content Goes Here
        </Text>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  homeScreen: {
    backgroundColor: "lightblue", // Set your desired home screen background color
    zIndex: 1,
  },
  sideDrawer: {
    width: 200, // Adjust the width of the drawer as needed
    backgroundColor: "lightgreen", // Set your desired side drawer background color
    zIndex: 0,
  },
  drawerText: {
    color: "black", // Set your desired text color for the drawer
  },
});

export default YourScreen;
