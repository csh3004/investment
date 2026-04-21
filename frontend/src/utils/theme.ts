// utils/theme.ts
export const getTheme = (): 'light' | 'dark' => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};