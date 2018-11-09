import * as React from 'react';
import { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SafeAreaView, StatusBar } from 'react-native';
import WebView from '../../components/web-view';
import { injectedScript, onMessage } from './injected-script';

export default class MainScreen extends Component<NavigationScreenProps, any> {
  public static navigationOptions = {
    title: '首页'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      websiteUrl: 'https://sales-cloud.sipin.com'
    };
  }

  public render() {
    const { websiteUrl } = this.state;
    const style = {
      backgroundColor: '#fff',
      flex: 1
    };
    return (
      <SafeAreaView style={style}>
        <StatusBar barStyle="light-content" />
        <WebView
          source={{ uri: websiteUrl }}
          injectedJavaScript={'(' + String(injectedScript) + ')();'}
          onMessage={onMessage}
        />
      </SafeAreaView>
    );
  }
}
