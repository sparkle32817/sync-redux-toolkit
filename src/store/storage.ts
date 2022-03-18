import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createNoopStorage = () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
