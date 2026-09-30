import { AudioFetcher } from "@/definitions/interfaces";
import { resultOf } from "@lib/mu2609/utils/helpers";

type FetchResultMeta = {
  statusCode: number;
  remark?: "browserCache" | "requestFlighted";
};

async function analyzeFetchResult(
  response: Response,
): Promise<FetchResultMeta> {
  const entry = await new Promise<PerformanceResourceTiming | undefined>(
    (resolve) => {
      const observer = new PerformanceObserver((list) => {
        const hit = list.getEntries().find((e) => e.name === response.url);
        if (hit) {
          observer.disconnect();
          resolve(hit as PerformanceResourceTiming);
        }
      });
      observer.observe({ type: "resource", buffered: true });
    },
  );
  let remark: FetchResultMeta["remark"] = undefined;
  if (entry && entry.transferSize === 0 && entry.decodedBodySize > 0) {
    remark = "browserCache";
  } else if (entry && entry.transferSize > 0) {
    remark = "requestFlighted";
  }
  return {
    statusCode: response.status,
    remark,
  };
}

async function wrapFetch(uri: string): Promise<Response> {
  const startTime = performance.now();
  const response = await fetch(uri);
  const endTime = performance.now();
  const elapsedMs = endTime - startTime;
  const meta = await analyzeFetchResult(response);
  console.log(
    `fetched ${uri} elapsed:${elapsedMs.toFixed(1)}ms status:${meta.statusCode} remark:${meta.remark} `,
  );
  return response;
}

export function createAudioFetcher(audioContext: AudioContext): AudioFetcher {
  const audioBufferPromises: Record<string, Promise<AudioBuffer>> = {};

  return {
    async fetchAudioBufferCached(uri) {
      if (uri === undefined || uri.includes("undefined")) {
        throw new Error(`invalid uri: ${uri}`);
      }
      let promise = audioBufferPromises[uri];
      if (!promise) {
        promise = resultOf(async () => {
          const response = await wrapFetch(uri);
          const arrayBuffer = await response.arrayBuffer();
          return await audioContext.decodeAudioData(arrayBuffer);
        });
        audioBufferPromises[uri] = promise;
      }
      return await promise;
    },
  };
}
