import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanageMap from "./pages/OrphanageMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import CreateOrphanage from './pages/CreateOrphanage';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="OrphanagesMap" component={OrphanageMap} options={{
            headerShown: false
        }} />
        <Screen name="OrphanageDetails" component={OrphanageDetails} />
        <Screen name="CreateOrphanage" component={CreateOrphanage} />
      </Navigator>
    </NavigationContainer>
  );
}
