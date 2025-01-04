import { Canvas, CanvasKit, Paint, PaintStyle } from "canvaskit-wasm";
import * as PIXI from "pixi.js";
import { Skia } from ".";

export abstract class Converter {
  protected _displayObject: PIXI.DisplayObject;
  protected _canvasKit: CanvasKit;

  constructor({
    displayObject,
    canvasKit,
  }: {
    displayObject: PIXI.DisplayObject;
    canvasKit: CanvasKit;
  }) {
    this._displayObject = displayObject;
    this._canvasKit = canvasKit;
  }

  public async draw(
    _: { canvas: Canvas } & Pick<
      Skia,
      "addPointerUpPath" | "addPointerDownPath"
    >,
  ) {
    throw new Error("convert не имплементирована");
  }

  protected getPaint({
    width,
    color,
    alpha,
    style,
  }: {
    width: number;
    color: number;
    alpha: number;
    style: PaintStyle;
  }): Paint {
    const paint = new this._canvasKit.Paint();

    paint.setColor(
      this._canvasKit.Color(
        color >> 16,
        (color >> 8) & 0xff,
        color & 0xff,
        alpha,
      ),
    );
    paint.setStyle(style);
    paint.setAntiAlias(true);
    paint.setStrokeWidth(width);

    return paint;
  }
}
