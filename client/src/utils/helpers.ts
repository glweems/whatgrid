/* eslint-disable import/prefer-default-export */
export const isValidEmail: (email: string) => boolean = (email) =>
  !!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
