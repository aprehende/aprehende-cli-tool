import loading from 'loading-cli';

export const generateLoader = (text: string) => loading(text).start();
