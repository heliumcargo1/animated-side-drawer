import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 5,
    onPanResponderMove: Animated.event([null, { dy: panY }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        setModalVisible(false); // Swipe down karne par modal band karein
        Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
      } else if (gestureState.dy < -50 && !modalVisible) {
        setModalVisible(true); // Swipe up karne par modal kholen
        Animated.spring(panY, {
          toValue: -500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.openButton}>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView} {...panResponder.panHandlers}>
          <Animated.View
            style={[
              styles.modalView,
              {
                transform: [{ translateY: panY }],
              },
            ]}
          >
            <Text style={styles.modalText}>Hello, this is a Modal!</Text>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close Modal</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    marginTop: 500, // Initial position off-screen
  },
  openButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default App;
