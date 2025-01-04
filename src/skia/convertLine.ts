import { Canvas } from "canvaskit-wasm";
import { Converter } from "./convert";
import * as PIXI from "pixi.js";
import { Skia } from ".";

export class ConvertLine extends Converter {
  public override async draw({
    canvas,
  }: { canvas: Canvas } & Pick<
    Skia,
    "addPointerUpPath" | "addPointerDownPath"
  >) {
    if (!(this._displayObject instanceof PIXI.Graphics))
      throw new Error("this._displayObject не является PIXI.Graphics");

    const { currentPath, line, geometry, angle, scale, position } =
      this._displayObject;

    const { width, color, alpha } = line;

    const paint = this.getPaint({
      width,
      color,
      alpha,
      style: this._canvasKit.PaintStyle.Stroke,
    });

    const path = new this._canvasKit.Path();

    if (currentPath?.points) {
      const [x, y, toX, toY] = currentPath.points;
      path.moveTo(x, y).lineTo(toX, toY);
    } else if (geometry.graphicsData?.length > 0) {
      const { shape } = geometry.graphicsData[0];
      if (shape instanceof PIXI.Polygon) {
        const [x, y, toX, toY] = shape.points;
        path.moveTo(x, y).lineTo(toX, toY);
      }
    } else {
      throw new Error("currentPath?.points и geometry.graphicsData пустые");
    }

    if (angle)
      path.transform(this._canvasKit.Matrix.rotated((angle * 3.14) / 180));

    if (scale.x !== 1 || scale.y !== 1) {
      path.transform(this._canvasKit.Matrix.scaled(scale.x, scale.y));
    }

    if (position.x || position.y) {
      path.transform(this._canvasKit.Matrix.translated(position.x, position.y));
    }

    canvas.drawPath(path, paint);
  }
}
