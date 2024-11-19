import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerComponentProps {
  initialDate?: Date; // Initial selected date
  onDateChange: (date: Date) => void; // Callback when date changes
  label?: string; // Optional label for the picker
}

const DQ_DatePicker: React.FC<DatePickerComponentProps> = ({
  initialDate = new Date(),
  onDateChange,
  label = 'Select Date', // Default label if not passed
}) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text> {/* This will now correctly show the label */}
      <Pressable
        style={styles.dateButton}
        onPress={() => setOpen(true)} // Open the picker modal
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </Pressable>
      <Modal transparent visible={open} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker
              date={date}
              mode="date" // Set date picker mode to 'date'
              onDateChange={(newDate) => setDate(newDate)} // Update date
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setOpen(false)} // Close the modal without selecting
              >
                <Text style={styles.actionText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.confirmButton]}
                onPress={() => {
                  setOpen(false); // Close the picker modal
                  onDateChange(date); // Pass the selected date to the parent
                }}
              >
                <Text style={styles.actionText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay background
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%', // Set to 90% for better responsiveness
    maxWidth: 400, // Max width ensures it doesn't stretch too wide on large screens
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10, // For Android shadow
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#5392c4',
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default DQ_DatePicker;
