'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from 'next-themes';

// Custom theme tokens
const lightTheme = {
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1677ff',
  borderRadius: 6,
};

const darkTheme = {
  colorPrimary: '#1668dc',
  colorSuccess: '#49aa19',
  colorWarning: '#d89614',
  colorError: '#d32029',
  colorInfo: '#1668dc',
  borderRadius: 6,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          token: isDarkMode ? darkTheme : lightTheme,
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}