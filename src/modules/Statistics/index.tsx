import React from "react";
import { Text, View } from "react-native";

const Statistics = React.lazy(
    () =>
      import(/* webpackChunkName: "Statistics" */ "./Statistics")
  );

export default () => {
  return (
    <View>
        <React.Suspense fallback={<Text>Loading...</Text>}>
            <Statistics/>
        </React.Suspense>
    </View>
  );
};

