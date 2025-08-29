import { useState } from "react"; // React

// API
import { Delete_User } from "../../../../API/API_USER";

export const HandleDeleteUser = async (id) => {
  // Warning
  if (!window.confirm("Are you sure you want to delete this user?"))
    return false;

  // Delete User
  try {
    await Delete_User(id);
    return true; // Success
  } catch (err) {
    alert("Failed to delete user: " + (err.message || "Unknown error"));
    return false; // Failed
  }
};
