import { createStackNavigator } from 'react-navigation';
// import mainStack from './routes/main';
import Main from './containers/main';

export default createStackNavigator(
  {
    // tslint:disable:object-literal-sort-keys
    Main: { screen: Main }
  },
  {
    navigationOptions: {
      header: null
    },
    headerMode: 'none'
  }
);
