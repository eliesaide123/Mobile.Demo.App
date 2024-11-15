import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';

interface DQ_DropdownProps {
  fetchOptions: () => Promise<{ id: string; label: string }[]>; // Function to fetch options from the server
  placeholder?: string; // Placeholder text for dropdown
  onValueChange: (value: string) => void; // Callback when value changes
}

export default function DQ_Dropdown({
  fetchOptions,
  placeholder = 'Select an option...',
  onValueChange,
}: DQ_DropdownProps) {
  const [options, setOptions] = useState<{ id: string; label: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const fetchedOptions = await fetchOptions();
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };
    fetchDropdownOptions();
  }, [fetchOptions]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dropdown:</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.selectedText}>
          {selectedValue
            ? options.find((option) => option.id === selectedValue)?.label
            : placeholder}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isDropdownOpen}
          onRequestClose={() => setIsDropdownOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setIsDropdownOpen(false)}
          >
            <View style={styles.dropdownList}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item.id)}
                  >
                    <Text style={styles.dropdownText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 14,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    width: '80%',
    maxHeight: 300,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
});
