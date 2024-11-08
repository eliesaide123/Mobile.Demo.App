import { useCallback, useState } from "react";

export function useAlert() {
    const [isVisible, setVisible] = useState(false);
  
    // Function to show the alert
    const showAlert = useCallback(() => {
      setVisible(true);
    }, []);
  
    // Function to hide the alert
    const hideAlert = useCallback(() => {
      setVisible(false);
    }, []);
  
    return { isVisible, showAlert, hideAlert };
  }