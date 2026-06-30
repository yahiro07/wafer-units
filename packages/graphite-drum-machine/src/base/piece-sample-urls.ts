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
    "samples/fso/kick/520987__akustika__fbd-10.wav",
    "samples/fso/kick/128625__asbs__asbs-pure-psytrance-kick-000.wav",
    "samples/pxa/kick/juniorsoundays-10-kick-g-125-bpm-381215.mp3",
    "samples/pxa/kick/viko288-edm-kick-301391.mp3",
    "samples/fso/kick/494414__akustika__pd-kick-10.wav",
  ],
  snare: [
    "samples/pxa/snare/xenomorphillia-dubstep-snare-237920.mp3",
    "samples/pxa/snare/11325622-tr909-snare-drum-241413.mp3",
    "samples/fso/snare/326585__hardwareshaba__snr_07.wav",
    "samples/fso/snare/420923__akustika__j-snare-sd-01.wav",
    "samples/fso/snare/422292__akustika__sdr-03.wav",
    "samples/fso/snare/422300__akustika__sdr-09.wav",
  ],
  opHat: [
    "samples/pxa/ho/soundreality-hi-hat-open-acoustic-sample-455284_trimmed.mp3",
    "samples/fso/ho/421044__akustika__ho-01.wav",
    "samples/fso/ho/421043__akustika__ho-02.wav",
    "samples/fso/ho/418728__lynx_5969__synth-open-hi-hat.wav",
    "samples/fso/ho/513380__pomeroyjoshua__hh-pd-06.wav",
    "samples/fso/ho/422302__akustika__hor-01.wav",
  ],
  clHat: [
    "samples/pxa/hc/soundreality-hi-hat-closed-acoustic-sample-455286_trimmed.mp3",
    "samples/fso/hc/421045__akustika__hc-03.wav",
    "samples/fso/hc/634823__collinb1000__closed6.wav",
    "samples/fso/hc/91688__zinzan_101__jdrockhihat.wav",
    "samples/fso/hc/674294__theendofacycle__hi-hat-closed-hit-01.wav",
    "samples/fso/hc/634819__collinb1000__closed2.wav",
  ],
  clap: [
    "samples/pxa/clap/mrstokes302-clap-drum-mrstokes302-426361.mp3",
    "samples/fso/clap/24787__young_daddy__clap-mix2.wav",
    "samples/fso/clap/561089__sorinious_genious__clap-1.wav",
    "samples/fso/clap/24786__young_daddy__clap-mix.wav",
    "samples/fso/clap/418730__lynx_5969__synth-clap.wav",
    "samples/pxa/clap/freesound_community-mega-clap-1-101223.mp3",
  ],
};

const urlBase = getUrlBase();

export const pieceSampleUrls = mapObjectEntries(
  pieceSampleUrlSources,
  (_, urls) => urls.map((url) => `${urlBase}/${url}`),
);
