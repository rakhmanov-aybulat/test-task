export const getAuthToken = (): string | null => {
  return localStorage.getItem('jwtToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('jwtToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('jwtToken');
};

