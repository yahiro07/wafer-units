import type { FunctionPlotDatumScope } from "function-plot";
import functionPlotImport from "function-plot";
import { getOscWaveformPdSaw } from "@/web/proto0-ptm-osc/pd-saw";

const functionPlotModule = functionPlotImport as typeof functionPlotImport & {
  default?: typeof functionPlotImport;
};
const functionPlot = functionPlotModule.default ?? functionPlotModule;

function plotCurve(fn: (x: number) => number) {
  const size = 300;
  const div = document.createElement("div");
  div.style.display = "inline-block";
  div.style.margin = "8px";
  document.body.appendChild(div);

  functionPlot({
    target: div,
    width: size,
    height: size,
    grid: true,
    xAxis: { domain: [0, 1] },
    yAxis: { domain: [-1, 1] },
    data: [
      {
        fn: (scope: FunctionPlotDatumScope) => fn(scope.x as number),
        graphType: "polyline",
      },
    ],
  });
}

function getPdSaw(pp: number) {
  const pdLevel = 0;
  pp = pp + 0.25;
  pp -= Math.floor(pp);
  return getOscWaveformPdSaw(pp, pdLevel);
}

plotCurve((x) => x);
plotCurve((x) => getPdSaw(x));
