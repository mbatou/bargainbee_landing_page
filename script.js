import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHEo85qbjQWAc7IcVlczsLrHUCyxY1zj4",
  authDomain: "bargainbee-65eec.firebaseapp.com",
  projectId: "bargainbee-65eec",
  storageBucket: "bargainbee-65eec.appspot.com",
  messagingSenderId: "936394469003",
  appId: "1:936394469003:web:3b43f356561cbe0bdd6e8e",
  measurementId: "G-2W4S0PM1WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Flag to prevent multiple submissions
let isSubmitting = false;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  
  if (userForm) {
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Prevent multiple submissions
      if (isSubmitting) {
        console.log('Form is already being submitted');
        return;
      }
      
      isSubmitting = true;
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        // Add other form fields as needed
      };

      try {
        await addDoc(collection(db, "users"), formData);
        window.location.href = 'download.html'; // Redirect to download page
      } catch (error) {
        console.error("Error adding document: ", error);
        isSubmitting = false; // Reset flag on error
      }
    });
  } else {
    console.error("Form with id 'userForm' not found");
  }
});

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message text-red-500 text-sm mt-2';
  errorDiv.textContent = message;
  document.getElementById('userForm').appendChild(errorDiv);
}

// Function to remove error messages
function removeErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());
}

// Form validation
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  removeErrors();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name) {
    showError('Please enter your name.');
    return;
  }

  if (!email) {
    showError('Please enter your email address.');
    return;
  }

  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  // If validation passes, proceed with form submission
  const formData = { name, email };

  try {
    await addDoc(collection(db, "users"), formData);
    window.location.href = 'download.html';
  } catch (error) {
    console.error("Error adding document: ", error);
    showError('An error occurred. Please try again later.');
  }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
