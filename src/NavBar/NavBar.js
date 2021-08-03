import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import DashBoard from '../DashBoard';
import Decline from '../Decline';
import New from '../New'


const Nav = createStackNavigator({
  HomeScreen: {
    screen: DashBoard,
    navigationOptions: {
      title: 'DashBoard',
      headerStyle: { backgroundColor: '#f05555' },
      headerTintColor: '#ffffff',
    },
  },
  DeclineScreen: {
    screen: Decline,
    navigationOptions: {
      title: 'DECLINE ORDER',
      headerStyle: {  backgroundColor: '#f6f6f6' },
      headerTintColor: '#262626',headerTitleStyle:{fontSize:12,marginLeft:36, marginLeft:170,fontWeight:"bold"}
    },
  }
});
export default createAppContainer(Nav);