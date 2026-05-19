/* eslint-disable react/no-unescaped-entities */
import { css, domStyled, FC, jsx } from 'alumina';
import { appConfig, appEnv } from '~/base';
import { appStore } from '~/store';
import { uiFontFamilySpecAppTitle } from '../base';
import { IconButton } from '../components';

const PlainLink: FC<{ url: string }> = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  );
};

const ResourcesTable: FC = () => {
  return domStyled(
    <div class="table">
      <div>Piano</div>
      <div>
        <PlainLink url="https://freesound.org/people/beskhu/packs/17088/" />
      </div>
      <div>Electric Piano</div>
      <div>
        <PlainLink url="https://freesound.org/people/RealRhodesSounds/packs/243/" />
      </div>
      <div>Celesta</div>
      <div>
        <PlainLink url="https://freesound.org/people/pjcohen/packs/23108/" />
      </div>
      <div>Guitar</div>
      <div>
        <PlainLink url="https://freesound.org/people/Kyster/packs/7398/" />
      </div>
      <div>Synthesizers</div>
      <div>
        <PlainLink url="http://soundsphere.jp/arctrax.shtml" />
      </div>
    </div>,
    css`
      display: grid;
      grid-template-columns: auto 1fr;
      > div {
        margin-right: 15px;
      }
    `
  );
};

const DocumentContent: FC = () => {
  const { languageKey } = appStore.uiPresenter.state;
  const hiddenLang = languageKey === 'en' ? 'ja' : 'en';

  return domStyled(
    <div>
      <h1>Wavicle</h1>
      <h3 lang="ja">概要</h3>
      <p lang="ja">ブラウザで楽器の音を鳴らせるキーボードアプリです。</p>

      <h3 lang="en">Overview</h3>
      <p lang="en">
        This is a browser-based keyboard application that lets you play
        instrument sounds.
      </p>

      <h3 lang="ja">動作環境</h3>
      <div lang="ja">
        <p>PCやスマートフォンのブラウザ上で動作します。</p>
        <p>
          音を鳴らすのにWebAudioを使用していますが、最近のブラウザはどれもWebAudioに対応しているようです。
        </p>
        <p>
          ブラウザがWebMIDIに対応していれば、MIDIキーボードで弾いた音を鳴らすことができます。PC版のChrome/Opera/EdgeなどがWebMIDIに対応しています。
        </p>
      </div>

      <h3 lang="en">Operation Environment</h3>
      <div lang="en">
        <p>It runs in a browser on any PC or smartphones.</p>
        <p>
          It uses WebAudio to play sounds, the latest browsers all seem to
          support WebAudio.
        </p>
        <p>
          If your browser supports WebMIDI, you can play sounds by a MIDI
          keyboard. PC versions of Chrome/Opera/Edge support WebMIDI.
        </p>
      </div>

      <h3 lang="ja">使い方</h3>
      <h3 lang="en">How to use</h3>
      <img src="https://i.gyazo.com/8feafe0f4775d77b5926239fb6fd57bd.png" />
      <div lang="ja" class="usage-block">
        <h4>1.音色選択パート</h4>
        <p>演奏する音色を選択します。</p>

        <h4>2.パラメータコントロールパート</h4>
        <p>
          音を鳴らすときに適用されるパラメータを調整します。
          <br />
          'volume'は全体の音量を設定し、これは各音色によらず共通で使われます。
          <br />
          'release'はキーを離したときの音の余韻の長さを設定するパラメタで、値が大きいほど余韻が長くなります。音色をロードすると音色ごとに規定の値に設定されます。
        </p>
        <h4>3.オクターブスライダ</h4>
        <p>
          メイン鍵盤で表示する範囲を設定します。ボタンを押すとオクターブオクターブ単位で表示範囲をシフトします。鍵盤のオレンジ色の部分を横方向にドラッグすると、表示範囲を無段階にスクロールできます。
        </p>
        <h4>4.メイン鍵盤</h4>
        <p>
          鍵盤です。クリックすると音が鳴ります。PCのキーボードでも演奏することができます。PCキーボードのキーがマッピングされる範囲はオクターブスライダを操作したときに自動で変更されます。
        </p>
        <h4>5.MIDI IN デバイス選択UI</h4>
        <p>
          MIDIデバイスを選択します。WebMIDIに対応している環境でのみこのUIが表示されます。
        </p>
        <h4>6.言語選択UI</h4>
        <p>
          表示言語を切り替えます。ブラウザの言語に日本語が設定されている場合のみ表示されます。
        </p>
      </div>

      <div lang="en" class="usage-block">
        <h4>1.Instrument Selection Part</h4>
        <p>Select the instrument you want to play.</p>

        <h4>2.Parameters control part</h4>
        <p>
          Adjust the parameters that are applied when a tone is played.
          <br />
          "volume" parameter sets the overall volume, which is common to all
          instruments.
          <br />
          "release" parameter sets the length of the sound's aftertone when the
          key is released. The higher the value, the longer the duration. When a
          instrument is loaded, it is set to the predefined value for each
          instrument.
        </p>
        <h4>3.Octave slider</h4>
        <p>
          Set the display range of the main keyboard. Pressing the button shifts
          the display range in octave unit. Drag the orange area horizontally to
          scroll the display range linearly.
        </p>
        <h4>4.Main Keyboard</h4>
        <p>
          This is the main keyboard. Clicking on a key to play a tone. You can
          also play using PC keyboard. Keys on the PC keyboard are automatically
          mapped according to the octave slider.
        </p>
        <h4>5.MIDI IN Device Selection UI</h4>
        <p>
          Selects MIDI device. This UI is only available in environments that
          support WebMIDI.
        </p>
        <h4>6.Language Selection UI</h4>
        <p>
          Switches the display language. It is available only when the browser
          language is set to Japanese.
        </p>
      </div>

      <h3 lang="ja">音の持続について</h3>
      <p lang="ja">
        鍵盤を押し続けたときに、音色によって音が持続するものとそうでないものがあります。撥音楽器のような音は鍵盤を弾いたときにワンショットで音を鳴らしています。また、鳴りはじめの音量の立ち上がりが遅い音色などでもループが難しいため音が持続しない設定になっています。
      </p>

      <h3 lang="en">About sound sustention</h3>
      <p lang="en">
        When a keyboard key is pressed and held down, some tones are sustained
        while others are not. A sound like a plucked instrument is played in one
        shot when the keyboard key is pressed. Also, tones that have a slow
        attack are difficult to loop, so they are configured not to sustain.
      </p>

      <h3 lang="ja">クレジット</h3>
      <h3 lang="en">Credits</h3>
      <div class="resources-block">
        <p lang="ja">下記のリソースを音源として使用しています。</p>
        <p lang="en">The following resources are used as sound sources.</p>
        <ResourcesTable />
        <div>
          <p lang="ja">
            freesound.orgの音源の一部はCC BY
            3.0ライセンスが適用されているものです。
          </p>
          <p lang="en">
            Some of the sounds on freesound.org are licensed under CC BY 3.0.
          </p>
          <div lang="en">
            <PlainLink url="https://creativecommons.org/licenses/by/3.0/deed.en" />
          </div>
          <div lang="ja">
            <PlainLink url="https://creativecommons.org/licenses/by/3.0/deed.ja" />
          </div>
        </div>

        <p lang="ja">
          シンセサイザーの音色は私が以前作ったArcTraxというソフトシンセの音を録音したものです。
        </p>
        <p lang="en">
          The synthesizer sounds are recorded from ArcTrax, a software
          synthesizer I made in the past.
        </p>
      </div>

      <h3 lang="ja">連絡先</h3>
      <p lang="ja">不具合等がありましたら下記の連絡先にお知らせください。</p>

      <h3 lang="en">Contact Information</h3>
      <p lang="en">
        If you have any problems, please contact to the following address.
      </p>

      <p>
        Twitter
        <a
          href="https://twitter.com/yahiro120"
          target="_blank"
          rel="noreferrer"
        >
          @yahiro120
        </a>
      </p>
      <p class="mail">
        mail: yahiro1200
        <img src="https://i.gyazo.com/e54845878425c702a37b27c14c3587e2.png" />
      </p>

      <div class="version">version {appConfig.versionCode}</div>
    </div>,
    css`
      padding: 30px 30px;
      font-size: 16px;
      width: 100%;
      max-width: 800px;

      background: #fff;
      position: relative;

      text-size-adjust: none;
      -webkit-text-size-adjust: none;

      touch-action: pan-y;

      *[lang='${hiddenLang}'] {
        display: none;
      }

      p {
        line-height: 1.5em;
      }

      > h1 {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 20px;
        font-family: ${uiFontFamilySpecAppTitle};
      }

      > h3 {
        color: #fff;
        background: #47b;
        padding: 6px;
        font-size: 22px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }

      > img {
        width: 100%;
      }

      > .mail {
        display: flex;
        align-items: center;
        gap: 1px;
      }

      > div + div {
        margin-top: 10px;
      }

      > .usage-block {
        margin-top: 10px;
        h4 {
          margin-bottom: 5px;
          color: #008;
          font-size: 18px;
        }
        > * + h4 {
          margin-top: 10px;
        }
      }

      > .resources-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      > .version {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 15px;
        margin: 35px;
      }
    `
  );
};

export const UsagePanel: FC = () => {
  const frameColor = '#4ae';
  const { hideUsagePanel } = appStore.uiPresenter.actions;

  return domStyled(
    <div>
      <div class="panel">
        <div class="top-bar">
          <IconButton iconSpec="ph-x-bold" size={30} onClick={hideUsagePanel} />
        </div>
        <div class="content-body">
          <DocumentContent />
        </div>
      </div>
    </div>,
    css`
      > .panel {
        background: #fff;
        color: #333;
        border: solid 3px ${frameColor};
        border-radius: 4px;

        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        > .top-bar {
          background: ${frameColor};
          height: 40px;
          padding: 0 3px;
          color: white;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
        }

        > .content-body {
          flex-grow: 1;
          display: flex;
          overflow-x: hidden;
          overflow-y: auto;
          flex-direction: column;
          align-items: center;
          background: #ddd;
        }
      }

      position: absolute;
      width: 100%;
      height: 100%;
      padding: ${appEnv.isPc ? '10px' : 0};
    `
  );
};
