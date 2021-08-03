import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import New from './New';
import Ongoing from './Ongoing';
import Completed from './Completed'


const initialLayout = { width: Dimensions.get('window').width };

const  TabsView=({data})=> {
  const NewRoute = () => (
    <New style={[styles.scene]} data={data._newTechServiceList} />
   );
   
   const OngoingRoute = () => (
     <Ongoing style={[styles.scene]} data={data._onGoingTechServiceList} />
   );
   const CompletedRoute = () => (
   <Completed style={[styles.scene]}  data={data._completedTechServiceList} />
   )
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'new', title: 'New' },
    { key: 'ongoing', title: 'Ongoing' },
    { key: 'completed', title: 'Completed' },
  ]);

  const renderScene = SceneMap({
    new: NewRoute,
    ongoing: OngoingRoute,
    completed:CompletedRoute
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
     );
}

export default TabsView;
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  
});