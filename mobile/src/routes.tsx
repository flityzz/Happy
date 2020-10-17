import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OrphanageMap from "./pages/OrphanageMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import Header from "./components/Header";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="OrphanagesMap"
          component={OrphanageMap}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: "#f2f3f5",
            },
          }}
        />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Preencha os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
