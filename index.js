import Bugsnag from "@bugsnag/react-native";
Bugsnag.start();

/**
 * @format
 */

import { AppRegistry, Platform, Alert } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { ChunkManager } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';


ChunkManager.configure({
  storage: AsyncStorage,
  resolveRemoteChunk: async (chunkId) => {
    console.log(`https://raw.githubusercontent.com/pan-pawel/pack-re-sample-app/master/chunks/${Platform.OS}/${chunkId}`)
      return {
        url: `https://raw.githubusercontent.com/pan-pawel/pack-re-sample-app/master/chunks/${Platform.OS}/${chunkId}`,
      };
    },
  });
  
AppRegistry.registerComponent(appName, () => App);
