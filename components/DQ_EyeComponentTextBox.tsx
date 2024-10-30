import Icon from '@react-native-vector-icons/fontawesome6';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DQ_TextBox from "./DQ_TextBox";
import { useState } from "react";

export default function DQ_EyeComponentTextBox() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <DQ_TextBox 
        placeholder="Enter password" 
        borderColor="grey" 
        secureTextEntry={!isPasswordVisible} // Toggle password visibility
        style={styles.textBox}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
        <Icon 
          name={isPasswordVisible ? "eye" : "eye-slash"} 
          size={18} 
          color="#005faf" 
          style={styles.icon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  textBox: {
    paddingRight: 40,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    zIndex: 1,
  },
  icon: {
    padding: 5,
  },
});
