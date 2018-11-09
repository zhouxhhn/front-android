# sipin-sales-cloud-frontend-android

## 开发

- `yarn` 安装依赖
- `yarn start` 启动编译
- `react-native run-android` 开启模拟器或真机调试

## 连接真机调试

- 连接数据线或者 wifi 连接： `adb connect 10.0.20.161`
- `adb devices`
- `adb reverse tcp:8081 tcp:8081`
- `react-native run-android`

## 打开真机的调试选项

- `adb shell input keyevent 82`

## API

客户端会向 webview 注入 `siyueApp` 的对象，通于调用此对  象方法，调用对应的 Native 能力。

### version

对应的 API 的版本

### sendToSunmiScreen

控制商米副屏文字显示

```javascript
window.siyueApp.sendToSunmiScreen({
  title: '商品总价：',
  content: '￥3000'
});
```

### sendToSunmiPrinter

控制商米打印机打印，待完善打印格式

```javascript
window.siyueApp.sendToSunmiPrinter({});
```
