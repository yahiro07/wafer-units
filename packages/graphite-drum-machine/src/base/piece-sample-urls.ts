import { mapObjectEntries } from "mofur/ax";
import { PieceId } from "@/base/type";

function getUrlBase() {
  if (import.meta.url.includes("index.js")) {
    return import.meta.url.replace(/\/index\.js.*$/, "");
  }
  return "";
}

export const pieceSampleUrlSources: Record<PieceId, string[]> = {
  kick: [
    "samples/fso/kick/274775__ianstargem__simple-kick-drum.wav",
    "samples/fso/kick/520987__akustika__fbd-10.wav?vol=90",
    "samples/fso/kick/128625__asbs__asbs-pure-psytrance-kick-000.wav?vol=90",
    "samples/pxa/kick/juniorsoundays-10-kick-g-125-bpm-381215.mp3?vol=180",
    "samples/pxa/kick/viko288-edm-kick-301391.mp3?vol=90",
    "samples/fso/kick/494414__akustika__pd-kick-10.wav?vol=80",
  ],
  snare: [
    "samples/pxa/snare/xenomorphillia-dubstep-snare-237920.mp3?vol=150",
    "samples/pxa/snare/11325622-tr909-snare-drum-241413.mp3?vol=90",
    "samples/fso/snare/326585__hardwareshaba__snr_07.wav?vol=110",
    "samples/fso/snare/420923__akustika__j-snare-sd-01.wav?vol=90",
    "samples/fso/snare/422292__akustika__sdr-03.wav?vol=80",
    "samples/fso/snare/422300__akustika__sdr-09.wav?vol=80",
  ],
  opHat: [
    "samples/pxa/ho/soundreality-hi-hat-open-acoustic-sample-455284_trimmed.mp3?vol=60",
    "samples/fso/ho/421044__akustika__ho-01.wav?vol=80",
    "samples/fso/ho/421043__akustika__ho-02.wav?vol=110",
    "samples/fso/ho/418728__lynx_5969__synth-open-hi-hat.wav?vol=110",
    "samples/fso/ho/513380__pomeroyjoshua__hh-pd-06.wav?vol=70",
    "samples/fso/ho/422302__akustika__hor-01.wav?vol=80",
  ],
  clHat: [
    "samples/pxa/hc/soundreality-hi-hat-closed-acoustic-sample-455286_trimmed.mp3?vol=50",
    "samples/fso/hc/421045__akustika__hc-03.wav?vol=70",
    "samples/fso/hc/634823__collinb1000__closed6.wav?vol=80",
    "samples/fso/hc/91688__zinzan_101__jdrockhihat.wav?vol=110",
    "samples/fso/hc/674294__theendofacycle__hi-hat-closed-hit-01.wav?vol=60",
    "samples/fso/hc/634819__collinb1000__closed2.wav?vol=110",
  ],
  clap: [
    "samples/pxa/clap/mrstokes302-clap-drum-mrstokes302-426361.mp3?vol=90",
    "samples/fso/clap/24787__young_daddy__clap-mix2.wav?vol=70",
    "samples/fso/clap/561089__sorinious_genious__clap-1.wav?vol=80",
    "samples/fso/clap/24786__young_daddy__clap-mix.wav",
    "samples/fso/clap/418730__lynx_5969__synth-clap.wav?vol=160",
    "samples/pxa/clap/freesound_community-mega-clap-1-101223.mp3?vol=80",
  ],
};

const urlBase = getUrlBase();

export const pieceSampleUrls = mapObjectEntries(
  pieceSampleUrlSources,
  (_, urls) => urls.map((url) => `${urlBase}/${url}`),
);
