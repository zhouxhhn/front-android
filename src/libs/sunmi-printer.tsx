import { DeviceEventEmitter, ToastAndroid, NativeModules } from 'react-native';
const SunmiInnerPrinter = NativeModules.SunmiInnerPrinter;
const base64 = require('base64-js');

class SunmiPrinter {
  printerStatusListener: any;
  constructor() {
    this.printerStatusListener = DeviceEventEmitter.addListener(
      'PrinterStatus',
      action => {
        switch (action) {
          case SunmiInnerPrinter.Constants.NORMAL_ACTION: // 可以打印
            ToastAndroid.show('打印机可以打印了', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.OUT_OF_PAPER_ACTION: // 缺纸异常
            ToastAndroid.show('打印机缺纸异常', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.COVER_OPEN_ACTION: // 开盖子
            ToastAndroid.show('打印机打开了盖子', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.COVER_ERROR_ACTION: // 关盖子异常
            ToastAndroid.show('打印机关盖子异常', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.ERROR_ACTION: // 打印错误
            ToastAndroid.show('打印机打印错误', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.OVER_HEATING_ACITON: // 打印头过热异常
            ToastAndroid.show('打印机打印头过热异常', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.KNIFE_ERROR_1_ACTION: // 切刀异常1－卡切刀
            ToastAndroid.show('打印机切刀异常1－卡切刀', ToastAndroid.SHORT);
            break;
          case SunmiInnerPrinter.Constants.KNIFE_ERROR_2_ACTION: // 切刀异常2－切刀修复
            ToastAndroid.show('打印机切刀异常2－切刀修复', ToastAndroid.SHORT);
            break;
          default:
            ToastAndroid.show('打印机未知错误', ToastAndroid.SHORT);
        }
      }
    );
  }

  parseAlign(align: string = 'left') {
    switch (align) {
      case 'left':
        return 0;
      case 'center':
        return 1;
      case 'right':
        return 2;
      default:
        return 0;
    }
  }

  async print({ data }: any) {
    try {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        switch (item.type) {
          case 'text':
            if (item.align) {
              //set aligment: 0-left,1-center,2-right
              const align = this.parseAlign(item.align);
              await this.setFontAlign(align);
            }
            if (item.fontSize) {
              await this.setFontSize(item.fontSize);
            }
            if (item.data) {
              await this.printLineText(String(item.data));
            }
            break;
          case 'empty':
            await this.printEmptyLine(Number(item.data));
            break;
          case 'table':
            if (item.fontSize) {
              await this.setFontSize(item.fontSize);
            }
            await this.printColumnsData(item.align, item.width, item.data);
            break;
          case 'line':
            if (item.fontSize) {
              await this.setFontSize(item.fontSize);
            }
            await this.printLine(Number(item.data));
            break;
          default:
            break;
        }
      }

      await this.cutPaper();
    } catch (e) {
      console.log(e);
      alert('print error.' + e.message);
    }
  }

  async printColumnsData(align: any = [], width: any[] = [], data: any = []) {
    const columnAliment = align.map((item: string) => this.parseAlign(item));
    const columnWidth = width;

    for (let i in data) {
      await this.printColumnsText(data[i], columnWidth, columnAliment);
    }
    return true;
  }

  async printColumnsText(
    data: string[] = [],
    columnWidth: number[],
    columnAliment: number[]
  ) {
    return await SunmiInnerPrinter.printColumnsText(
      data,
      columnWidth,
      columnAliment
    );
  }

  // set aligment: 0-left,1-center,2-right
  async setFontAlign(align: number) {
    return await SunmiInnerPrinter.setAlignment(align);
  }

  async setFontAlignLeft() {
    return await SunmiInnerPrinter.setAlignment(0);
  }

  async setFontAlignCenter() {
    return await SunmiInnerPrinter.setAlignment(1);
  }

  async setFontAlignRight() {
    return await SunmiInnerPrinter.setAlignment(2);
  }

  async setFontSize(size: number) {
    return await SunmiInnerPrinter.setFontSize(size);
  }

  async printLine(size = 1) {
    let str = '';
    for (let i = 0; i < size; i++) {
      str += '-';
    }

    await SunmiInnerPrinter.printOriginalText(str + '\n');
  }

  async printLineText(str = '') {
    return await SunmiInnerPrinter.printOriginalText(str + '\n');
  }

  async printEmptyLine(size = 1) {
    for (let i = 0; i < size; i++) {
      await this.printLineText();
    }
  }

  async cutPaper() {
    const cutPaperCommand = [0x1d, 0x56, 0x01];
    const cutPaperCommandStr = base64.fromByteArray(cutPaperCommand);
    try {
      await SunmiInnerPrinter.sendRAWData(cutPaperCommandStr);
      // should no need, just for test to ensure the first command was flushed.
      await SunmiInnerPrinter.printOriginalText('\n');
    } catch (e) {
      console.log(e);
    }
  }

  removeListener() {
    this.printerStatusListener.remove();
  }
}

export default new SunmiPrinter();
