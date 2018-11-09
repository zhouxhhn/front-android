import sunmiScreen from '../../libs/sunmi-screen';
import sunmiPrinter from '../../libs/sunmi-printer';
import sunmiScreenT2 from '../../libs/summi-screen-t2';
const SIYUE_APP_SEND_TO_SUNMI_SCREEN = 'SIYUE_APP_SEND_TO_SUNMI_SCREEN';
const SIYUE_APP_SEND_TO_SUNMI_PRINTER = 'SIYUE_APP_SEND_TO_SUNMI_PRINTER';
const SIYUE_APP_SEND_TO_SUNMI_T2_SCREEN = 'SIYUE_APP_SEND_TO_SUNMI_T2_SCREEN';

// 初始化副屏
sunmiScreen.init();

interface ISendToSunmiScreen {
  title: string;
  content: string;
}

interface ISendToSunmiPrinter {
  title: string;
  shopName: string;
  description: string;
  content: string[][];
  footer: string[][];
}

export function injectedScript() {
  const win: any = window;

  const SIYUE_APP_SEND_TO_SUNMI_SCREEN = 'SIYUE_APP_SEND_TO_SUNMI_SCREEN';
  const SIYUE_APP_SEND_TO_SUNMI_PRINTER = 'SIYUE_APP_SEND_TO_SUNMI_PRINTER';
  const SIYUE_APP_SEND_TO_SUNMI_T2_SCREEN = 'SIYUE_APP_SEND_TO_SUNMI_T2_SCREEN';

  function postMsg(typeName = 'SIYUE_APP_MESSAGE', data = {}) {
    let message: any = data;
    message.typeName = typeName;
    win.webView.postMessage(JSON.stringify(message));
  }

  win.sipinSalesSunmiApp = {
    version: '1.0.0',
    sendToSunmiScreen(data: ISendToSunmiScreen) {
      postMsg(SIYUE_APP_SEND_TO_SUNMI_SCREEN, data);
    },
    sendToSunmiPrinter(data: ISendToSunmiPrinter) {
      postMsg(SIYUE_APP_SEND_TO_SUNMI_PRINTER, data);
    },
    sendToSunmiT2Screen(data: string) {
      postMsg(SIYUE_APP_SEND_TO_SUNMI_T2_SCREEN, data);
    }
  };

}

export function onMessage(event: any) {
  try {
    const { typeName, ...data } = JSON.parse(event.message);

    if (!typeName) {
      return;
    }

    switch (typeName) {
      case SIYUE_APP_SEND_TO_SUNMI_SCREEN:
        sunmiScreen.sendTxtData(data);
        break;
      case SIYUE_APP_SEND_TO_SUNMI_PRINTER:
        sunmiPrinter.print(data);
        break;
      case SIYUE_APP_SEND_TO_SUNMI_T2_SCREEN:
        sunmiScreenT2.show(data.content);
        break;
      default:
        console.log(typeName, data);
    }
  } catch (e) {
    console.log(e);
  }
}
