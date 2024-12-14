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
  // fillColor: string;
  // strokeColor: string;
  // strokeWidth: number;
  // selectedObjects: fabric.Object[];
  // strokeDashArray: number[];
  // fontFamily: string;
  // setStrokeDashArray: (value: number[]) => void;
  // setFillColor: (value: string) => void;
  // setStrokeColor: (value: string) => void;
  // setStrokeWidth: (value: number) => void;
  // setFontFamily: (value: string) => void;
};

export interface Editor {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addStar: () => void;
  addHeart: () => void;
  addParallelogram: () => void;
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
