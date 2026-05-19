import { render, jsx, asyncRerender, applyGlobalStyle } from 'alumina';
import { appConfig } from './base';
import { debounce, preventDefaultHandler } from './funcs';
import { appStatePersistence, appStore } from './store';
import { cssGlobalStyle, PageRoot } from './ui';

async function start() {
  console.log(`wavicle ${appConfig.versionCode}`);

  await appStore.initialize();
  appStatePersistence.load();
  applyGlobalStyle(cssGlobalStyle);
  render(() => <PageRoot />, document.getElementById('app'));

  const { activateWebAudioOnUserAction } = appStore.synthEngine;
  window.addEventListener('pointerdown', activateWebAudioOnUserAction);
  window.addEventListener('keydown', activateWebAudioOnUserAction);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      appStatePersistence.save();
    }
  });
  window.addEventListener('resize', debounce(asyncRerender, 100));
  window.addEventListener('contextmenu', preventDefaultHandler);
}

window.addEventListener('load', start);
