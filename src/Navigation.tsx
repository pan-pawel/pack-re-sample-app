import * as React from "react";
import { Alert, Pressable, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ActivityTracker from "./modules/ActivityTracker/ActivityTracker";
import { modules } from "./modules";
import Home from "./modules/Home/Home";
import { getItem, getPaymentKeys, storePaymentKey } from "./modules/storage";

const Statistics = React.lazy(
  () =>
    import(
      /* webpackChunkName: "statistics" */ "./modules/Statistics/Statistics"
    )
);

export const AppContext = React.createContext({});

const Exercises = React.lazy(
  () =>
    import(/* webpackChunkName: "exercises" */ "./modules/Exercises/Exercises")
);
Ionicons.loadFont();
const StatisticsScreen = () => {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Statistics />
    </React.Suspense>
  );
};

const ExercisesScreen = () => {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Exercises />
    </React.Suspense>
  );
};

const disabledTabBarButton =
  (enabled: boolean, moduleName: string, buyApp: () => void) => 
  ({ style, onPress, ...props }: BottomTabBarButtonProps) => {
    const newProps = {...props, onPress: enabled ? onPress : () => Alert.alert(moduleName,'Do you want to buy for 12.99$?',  [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Proceed",
        style: "default",
        onPress: buyApp
      },
    ])}
    
    return(  <Pressable
        style={[enabled ? null : { opacity: 0.2 }, style]}
        {...newProps}
      />
    );
    }

const Tab = createBottomTabNavigator();

export function Navigation() {
  const [boughtModules, setBoughtModules] = React.useState<{
    [key: string]: boolean;
  }>({});

  React.useEffect(() => {
    (async function () {
      const paymentKeys = await getPaymentKeys();
      const boughtModules: { [key: string]: boolean } = Object.entries(
        modules
      ).reduce((acc, [_, moduleEntry]) => {
        if (moduleEntry.paymentRequired && moduleEntry.paymentKey) {
          //check payment
          const paymentHash = paymentKeys[moduleEntry.paymentKey];
          //payment hash verification
          return {
            ...acc,
            [moduleEntry.name]: !!paymentHash,
          };
        } else {
          return {
            ...acc,
            [moduleEntry.name]: true,
          };
        }
      }, {} as { [key: string]: boolean });
      setBoughtModules(boughtModules);
    })();
  }, []);

  const buyModule = React.useCallback(
    async (moduleName: string) => {
      // buying requests taht return payment key
      const paymentHash = "sgdfg34gfdfgse455g34gzdsfg";
      Object.entries(modules).find(([key, { name , paymentKey}]) => {
        if (name === moduleName && paymentKey) {
          storePaymentKey(paymentKey, paymentHash);
          setBoughtModules({ ...boughtModules, [moduleName]: true });
        }
      });
    },
    [boughtModules]
  );
  return (
    <AppContext.Provider
      value={{
        buyModule,
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              // You can return any component that you like here!
              return (
                <Ionicons
                  name={modules[route.name].icon(focused)}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="ActivityTracker" component={ActivityTracker} />
          <Tab.Screen name="Statistics" component={StatisticsScreen} options={{
              // Applying the disabled button
              tabBarButton: disabledTabBarButton(boughtModules['Statistics'], "Statistics", () => buyModule("Statistics")),
            }}/>
          <Tab.Screen
            name="Exercises"
            component={ExercisesScreen}
            options={{
              // Applying the disabled button
              tabBarButton: disabledTabBarButton(boughtModules["Exercises"],"Exercises", () => buyModule("Exercises")),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
