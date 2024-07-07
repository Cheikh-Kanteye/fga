export const generateReference = (prefix: string): string => {
  const date = new Date();
  const timestamp = date.getTime();
  const randomPart = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
};
