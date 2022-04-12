import Hammer from "hammerjs";
import dicomParser from "dicom-parser";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneTools from "cornerstone-tools";
import ToolConfig from "./interface";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneTools.init({
  mouseEnabled: true,
  touchEnabled: true,
  globalToolSyncEnabled: true,
  showSVGCursors: true,
});

// Set the tool font and font size
const fontFamily =
  "Work Sans, Roboto, OpenSans, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif";

cornerstoneTools.textStyle.setFont(`16px ${fontFamily}`);

// Set the tool width
cornerstoneTools.toolStyle.setToolWidth(2);

// Set color for inactive tools
cornerstoneTools.toolColors.setToolColor("rgb(255, 0, 0)");

// Set color for active tools
cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)");

export function setToolActive(tool: string) {
  cornerstoneTools.setToolActive(tool, { mouseButtonMask: 1 });
}

const toolConfig: Array<ToolConfig> = [
  {
    displayName: "Zoom",
    toolName: "ZoomMouseWheel",
    configuration: {
      invert: false,
      preventZoomOutsideImage: false,
      minScale: 0.1,
      maxScale: 20.0,
    },
  },
  {
    displayName: "Scroll",
    toolName: "StackScrollMouseWheel",
  },
  {
    displayName: "WWWC Region",
    toolName: "WwwcRegion",
  },
  {
    displayName: "WWWC",
    toolName: "Wwwc",
  },
  {
    displayName: "Eraser",
    toolName: "Eraser",
  },
  {
    displayName: "Length",
    toolName: "Length",
  },
  {
    displayName: "Darg",
    toolName: "DragProbe",
  },
  {
    displayName: "Magnify",
    toolName: "Magnify",
  },
  {
    displayName: "Pan",
    toolName: "Pan",
  },
  {
    displayName: "Rotate",
    toolName: "Rotate",
  },
  {
    displayName: "Angle",
    toolName: "Angle",
  },
  {
    displayName: "Arrow Annotate",
    toolName: "ArrowAnnotate",
  },
  {
    displayName: "Bidirectional",
    toolName: "Bidirectional",
  },
  {
    displayName: "Cobb Angle",
    toolName: "CobbAngle",
  },
  {
    displayName: "Ellipse",
    toolName: "EllipticalRoi",
  },
  {
    displayName: "Freehand",
    toolName: "FreehandRoi",
  },
  {
    displayName: "Probe",
    toolName: "Probe",
  },
  {
    displayName: "Rectangle",
    toolName: "RectangleRoi",
  },
  {
    displayName: "TextMarker",
    toolName: "TextMarker",
    configuration: {
      markers: ["F5", "F4", "F3", "F2", "F1"],
      current: "F5",
      ascending: true,
      loop: true,
    },
  },
  {
    displayName: "Circle Scissors",
    toolName: "CircleScissors",
  },
  {
    displayName: "Brush",
    toolName: "Brush",
  },
];

export default toolConfig;
