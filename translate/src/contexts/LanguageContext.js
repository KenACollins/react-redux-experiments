/**
 * Only the App, Button, and Field components need access to the language context object.
 * UserCreate is not updated. However, if you look in App you see we wrap UserCreate with this context object.
 */
import React from "react";

// Create context object with default value 'english'.
export default React.createContext("english");
