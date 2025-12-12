export const isEmail = (s) => /\S+@\S+\.\S+/.test(s);
export const minLength = (s, n) => String(s || '').length >= n;
