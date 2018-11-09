import React from 'react';
import { WebViewProps } from 'react-native';
const WebViewAndroid = require('react-native-webview-android');

const injectedScript = function() {};

interface IState {}

interface IProps extends WebViewProps {}

export default class NewWebView extends React.PureComponent<IProps, IState> {
  webview: any;

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  onShouldStartLoadWithRequest() {
    return true;
  }

  render() {
    const {
      onShouldStartLoadWithRequest,
      style,
      injectedJavaScript,
      onMessage
    } = this.props;

    return (
      <WebViewAndroid
        {...this.props}
        ref={(webview: any) => {
          this.webview = webview;
        }}
        style={[style, { flex: 1 }]}
        onMessage={onMessage}
        injectedJavaScript={
          '(' +
          String(injectedScript) +
          ')();' +
          "window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');" +
          injectedJavaScript
        }
        onShouldStartLoadWithRequest={
          onShouldStartLoadWithRequest || this.onShouldStartLoadWithRequest
        }
        javaScriptEnabled
      />
    );
  }
}
