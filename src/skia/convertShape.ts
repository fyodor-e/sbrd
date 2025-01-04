import { Canvas } from "canvaskit-wasm";
import { Converter } from "./convert";
import * as PIXI from "pixi.js";
import { Skia } from ".";

export class ConvertShape extends Converter {
  public override async draw({
    canvas,
    addPointerDownPath,
    addPointerUpPath,
  }: { canvas: Canvas } & Pick<
    Skia,
    "addPointerUpPath" | "addPointerDownPath"
  >) {
    if (!(this._displayObject instanceof PIXI.Graphics))
      throw new Error("this._displayObject не является PIXI.Graphics");

    const { geometry, position, angle, scale, onpointerdown, onpointerup } =
      this._displayObject;

    if (!geometry.graphicsData || geometry.graphicsData.length === 0)
      throw new Error("graphicsData пустая в классе ConvertShape");

    // This is a shape
    const {
      fillStyle: { color, alpha },
      shape,
    } = geometry.graphicsData[0];

    const paint = this.getPaint({
      width: 1,
      color,
      alpha,
      style: this._canvasKit.PaintStyle.Fill,
    });

    const path = new this._canvasKit.Path();

    if (shape instanceof PIXI.Rectangle) {
      const { x, y, height, width } = shape;

      path.addRect([x, y, x + width, y + height]);
    } else if (shape instanceof PIXI.Ellipse) {
      const { x, y, height, width } = shape;

      path.addOval([x - width, y - height, x + width, y + height]);
    } else {
      throw new Error(`Неизвестная фигура ${shape?.constructor.name}`);
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

    if (onpointerup) addPointerUpPath({ path, handler: onpointerup as any });
    if (onpointerdown)
      addPointerDownPath({ path, handler: onpointerdown as any });
  }
}
