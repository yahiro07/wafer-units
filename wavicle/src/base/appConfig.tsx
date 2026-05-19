export const appConfig = {
  versionCode: 'v220907',
  bottomNoteNumber: 24,
  numKeys: 85,
  activeKeyRangeUnitOffsetDefault: 14,
  activeKeyRangeUnitSize: 15,
  mainKeyUnitWidth: 50,
  octaveSelectionKeyUnitOffsets: [0, 7, 14, 21, 28, 35],
};

export const appEnv = {
  isJapaneseEnvironment: !!navigator.language.match(/ja|ja-JP/),
  isWebMidiSupported: !!navigator.requestMIDIAccess,
  isMobile: navigator.userAgent.match(/iPhone|Android.+Mobile/),
  get isPc() {
    return !appEnv.isMobile;
  },
};

if (appEnv.isMobile) {
  appConfig.activeKeyRangeUnitSize = 10;
  appConfig.mainKeyUnitWidth = 75;
}
