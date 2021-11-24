/**
 * @format
 */

import { AppRegistry, Platform, Alert } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { ChunkManager } from '@callstack/repack/client'
import AsyncStorage from '@react-native-async-storage/async-storage';


ChunkManager.configure({
    storage: AsyncStorage, // optional
    resolveRemoteChunk: async (chunkId) => {
      // Feel free to use any kind of remote config solution to obtain
      // a base URL for the chunks, if you don't know where they will
      // be hosted.
      Alert.alert('asd', `${chunkId}, ${global.__CHUNKS__} , url: ${url}`);
      return {
        url: `https://raw.githubusercontent.com/pan-pawel/pack-re-sample-app/master/chunks/${Platform.OS}/${chunkId}`,
      };
    },
  });
  
AppRegistry.registerComponent(appName, () => App);
