import React from "react";
import { Text, View } from "react-native";

const Exercises = React.lazy(
    () =>
      import(/* webpackChunkName: "exercises" */ "./Exercises")
  );

export default () => {
  return (
    <View>
        <React.Suspense fallback={<Text>Loading...</Text>}>
            <Exercises/>
        </React.Suspense>
    </View>
  );
};

