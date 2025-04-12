

import axios from 'axios';

// Базовий URL для API
const API_URL = 'https://gallery.net/api/user/auth/';

// Функція для авторизації користувача (логін)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      name: username,
      password: password
    });

    if (response.data && response.data.username) {
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('token', response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Невірний логін або пароль");
  }
};

// Функція для логауту користувача
export const logout = async () => {
  try {
    await axios.post(`${API_URL}logout/`);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Функція для перевірки, чи авторизований користувач
export const checkAuth = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

// Функція для отримання імені користувача
export const getUsername = () => {
  return localStorage.getItem('username');
};

// Функція для реєстрації нового користувача
export const register = async (form) => {
  try {
    const response = await axios.post('https://gallery.net/api/user/registration/', {
      name: form.username,
      email: form.email,
      password: form.password,
      Phone: form.number,
      birthday: form.birthday
    });

    if (response.data && response.data.username) {
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('token', response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Помилка реєстрації");
  }
};

export const sendContactMessage = async (form) => {
  try {
    const response = await axios.post('http://localhost:5000/api/contact', form);
    return response.status === 200;
  } catch (error) {
    console.error("Помилка при надсиланні повідомлення:", error);
    throw new Error("Помилка з'єднання з сервером");
  }
};

