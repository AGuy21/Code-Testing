import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/components/hooks/useThemeStore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

type Option = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

type SelectionModalProps = {
  visible: boolean;
  title: string;
  message?: string;
  options: Option[];
  onClose: () => void;
};

const SelectionModal = ({ visible, title, message, options, onClose }: SelectionModalProps) => {
  const { colors } = useThemeStore();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable 
            style={[
                styles.container, 
                { 
                    backgroundColor: colors.background, 
                    borderColor: colors.primaryDark, 
                    borderWidth: 1,
                    shadowColor: colors.text,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                }
            ]} 
            onPress={(e) => e.stopPropagation()}
        >
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {message && <Text style={[styles.message, { color: colors.text2 }]}>{message}</Text>}
          
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: option.style === "cancel" ? "transparent" : colors.primary,
                    borderColor: colors.primary,
                    borderWidth: option.style === "cancel" ? 1 : 0
                  }
                ]}
                onPress={() => {
                  if (option.onPress) option.onPress();
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { 
                      color: option.style === "destructive" ? colors.error : 
                             option.style === "cancel" ? colors.text : colors.background 
                    }
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: wp(80),
    padding: wp(5),
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: hp(1),
    textAlign: "center",
  },
  message: {
    fontSize: hp(1.8),
    marginBottom: hp(3),
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    gap: hp(1.5),
  },
  optionButton: {
    paddingVertical: hp(1.5),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: hp(2),
    fontWeight: "600",
  },
});

export default SelectionModal;
