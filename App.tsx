import * as React from "react";
import { Navigation } from "./src/Navigation";
import codePush from 'react-native-code-push';
import Bugsnag from "@bugsnag/react-native";
import { Text } from "react-native";
// const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const ErrorView = () => <Text>Error</Text>
  


const App = () => {
  return(
    // <ErrorBoundary FallbackComponent={ErrorView}>
      <Navigation />
    // </ErrorBoundary>
  )
};


export default codePush(App);
