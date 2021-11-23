type module = {
  name: string;
  route: string;
  paymentRequired: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon: (focused: boolean) => string;
  paymentKey?: string;
};

export const modules: {
  [key: string]: module;
} = {
  Home: {
    name: "Home",
    route: "Home",
    paymentRequired: false,
    icon: (focused: boolean) => `apps${focused ? "" : "-outline"}`,
  },
  ActivityTracker: {
    name: "Activity Tracker",
    route: "ActivityTracker",
    paymentRequired: false,
    icon: (focused: boolean) => `book${focused ? "" : "-outline"}`,
  },
  Statistics: {
    name: "Statistics",
    route: "Statistics",
    paymentRequired: true,
    icon: (focused: boolean) => `bar-chart${focused ? "" : "-outline"}`,
    paymentKey: "paym-statistics",
  },
  Exercises: {
    name: "Exercises",
    route: "Exercises",
    paymentRequired: true,
    icon: (focused: boolean) => `walk${focused ? "" : "-outline"}`,
    paymentKey: "paym-exercises",
  },
};
// const appArrayList = Object.keys(appObjectList).map((key) => ({
//   ...appObjectList[key],
//   name: key,
// }));

// const defaultApp = {
//   icon: "https://cdn3.iconfinder.com/data/icons/animal-emoji/50/Sloth-256.png",
//   bundle: async () =>
//     await import(/* webpackChunkName: defaultapp */ "../defaultapp"),
// };

// export { appObjectList, appArrayList, defaultApp };
