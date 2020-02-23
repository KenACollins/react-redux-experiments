/**
 * Only the App, Button, and Field components need access to the color context object.
 * UserCreate is not updated. However, if you look in App you see we wrap UserCreate with this context object.
 */
import React from "react";

// Create context object but since we will use Provider we don't need to set a default value.
export default React.createContext();
