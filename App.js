import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./context";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "./AppNavigator";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

async function downloadAssets() {
  const imageAssets = cacheImages([require("./assets/logo.jpg")]);

  await Promise.all([...imageAssets]);
}

const queryClient = new QueryClient();

export default class App extends Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  prepareResources = async () => {
    try {
      await downloadAssets();
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({ isReady: true }, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.downloadAssets}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }
    return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigator></AppNavigator>
        </QueryClientProvider>
      </AuthProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
