import type { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];
export interface EditorHookProps {
  // defaultState?: string;
  // defaultWidth?: number;
  // defaultHeight?: number;
  clearSelectionCallback?: () => void;
  // saveCallback?: (values: {
  //   json: string;
  //   height: number;
  //   width: number;
  // }) => void;
}

export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "阿里妈妈数黑体",
  "钉钉进步体",
  "阿里妈妈东方大楷",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];
export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type BuildEditorProps = {
  // undo: () => void;
  // redo: () => void;
  // save: (skip?: boolean) => void;
  // canUndo: () => boolean;
  // canRedo: () => boolean;
  // autoZoom: () => void;
  // copy: () => void;
  // paste: () => void;
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;
  setStrokeDashArray: (value: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setFontFamily: (value: string) => void;
};

export interface Editor {
  delete: () => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addStar: () => void;
  addHeart: () => void;
  addParallelogram: () => void;
  changeOpacity: (value: number) => void;
  changeStrokeWidth: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeFontFamily: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeFontStyle: (value: string) => void;
  getActiveOpacity: () => number;
  canvas: fabric.Canvas;
  addText: (value: string, options?: ITextboxOptions) => void;
  bringForward: () => void;
  sendBackward: () => void;
  // fillColor: string;
  // strokeColor: string;
  // strokeWidth: number;
  changeFontSize: (value: number) => void;
  getActiveFontSize: () => number;
  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;
  selectedObjects: fabric.Object[];
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  changeFontWeight: (value: number) => void;
  getActiveFontStyle: () => string;
  changeFontLinethrough: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;
}

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 150,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
};

export const STAR_OPTIONS = {
  left: 100, // 左侧起始位置
  top: 100, // 顶部起始位置
  fill: FILL_COLOR, // 填充颜色
  stroke: STROKE_COLOR, // 边框颜色
  strokeWidth: STROKE_WIDTH, // 边框宽度
  outerRadius: 200, // 外半径（五角星顶点到中心的距离）
  innerRadius: 80, // 内半径（五角星凹陷点到中心的距离）
  angle: 0, // 旋转角度
};

export const HEART_OPTIONS = {
  left: 100, // 左侧起始位置
  top: 100, // 顶部起始位置
  fill: FILL_COLOR, // 填充颜色
  stroke: STROKE_COLOR, // 边框颜色
  strokeWidth: STROKE_WIDTH, // 边框宽度
  width: 200, // 心形的宽度
  height: 200, // 心形的高度
  angle: 0, // 旋转角度
};

export const PARALLELOGRAM_OPTIONS = {
  left: 100, // 左侧起始位置
  top: 100, // 顶部起始位置
  fill: FILL_COLOR, // 填充颜色
  stroke: STROKE_COLOR, // 边框颜色
  strokeWidth: STROKE_WIDTH, // 边框宽度
  width: 300, // 平行四边形的宽度
  height: 200, // 平行四边形的高度
  skewX: 30, // 倾斜角度
  angle: 0, // 旋转角度
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};
