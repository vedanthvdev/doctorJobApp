import "expo-dev-menu";
import React, { useState } from "react";
import Login from "./components/login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "./components/signup/SignUp";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import Jobs from "./components/Jobs/jobs";
import MainContainer from "./components/mainContainer";
import RegisterJob from "./components/RegisterJob/RegisterJob";
import UserJobs from "./components/userJobs/UserJobs";
import Setting from "./components/S/Setting";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RegisterJob" component={RegisterJob} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="main" component={MainContainer} />
        <Stack.Screen name="UserJobs" component={UserJobs} />
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
