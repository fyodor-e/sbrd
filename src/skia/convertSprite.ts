import { Canvas, InputRect } from "canvaskit-wasm";
import { Converter } from "./convert";
import * as PIXI from "pixi.js";
import { Skia } from ".";

export class ConvertSprite extends Converter {
  public override async draw({
    canvas,
  }: { canvas: Canvas } & Pick<
    Skia,
    "addPointerUpPath" | "addPointerDownPath"
  >) {
    if (!(this._displayObject instanceof PIXI.Sprite))
      throw new Error("this._displayObject не является PIXI.Sprite");

    const { texture, position, scale } = this._displayObject;

    if (!texture?.textureCacheIds.length)
      throw new Error("texture является null");

    const picName = texture?.textureCacheIds[0];

    const response = await fetch(picName);
    const bytes = await response.arrayBuffer();
    const image = this._canvasKit.MakeImageFromEncoded(bytes);

    if (image) {
      const src: InputRect = [0, 0, image.width(), image.height()];
      const dest: InputRect = [
        position.x,
        position.y,
        image.width() * scale.x + position.x,
        image.height() * scale.y + position.y,
      ];

      canvas.drawImageRectOptions(
        image,
        src,
        dest,
        this._canvasKit.FilterMode.Linear,
        this._canvasKit.MipmapMode.None,
      );
    }
  }
}
