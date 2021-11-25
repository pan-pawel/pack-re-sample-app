import * as React from "react";
import { Navigation } from "./src/Navigation";
import codePush from 'react-native-code-push';

const App = () => {
  return(
      <Navigation />
  )
};


export default codePush(App);
