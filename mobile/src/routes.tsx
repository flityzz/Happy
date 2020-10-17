import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanageMap from "./pages/OrphanageMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="OrphanagesMap" component={OrphanageMap} options={{
            headerShown: false
        }} />
        <Screen name="OrphanageDetails" component={OrphanageDetails} />
        <Screen name="SelectMapPosition" component={SelectMapPosition} />
        <Screen name="OrphanageData" component={OrphanageData} />
      </Navigator>
    </NavigationContainer>
  );
}
