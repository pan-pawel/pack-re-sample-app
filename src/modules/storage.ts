import AsyncStorage from "@react-native-async-storage/async-storage";

export const storePaymentKey = async (key: string, value: string) => {
  try {
    const keys = await AsyncStorage.getItem("payment-keys");
    const updatedKeys = {
      ...JSON.parse(keys || "{}"),
      [key]: value,
    };
    await AsyncStorage.setItem("payment-keys", JSON.stringify(updatedKeys));
  } catch (e) {
    // saving error
  }
};

export const getPaymentKeys = async () => {
  try {
    const keys = await AsyncStorage.getItem("payment-keys");
    if (keys !== null) {
      return JSON.parse(keys);
    }
    return {};
  } catch (e) {
    // error reading value
  }
};
