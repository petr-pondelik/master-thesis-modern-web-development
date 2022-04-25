export type ValidationFunction = (data: any) => boolean;

export const validateEmail = (value: string): boolean => {
  return !!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

export const validatePassword = (value: string): boolean => {
  return !!value.match(/^\w{8,}/);
};