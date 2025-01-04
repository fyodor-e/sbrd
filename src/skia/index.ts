import CanvasKitInit, { CanvasKit, Path, Surface } from "canvaskit-wasm";
import * as PIXI from "pixi.js";
import { Converter } from "./convert";
import { ConvertLine } from "./convertLine";
import { ConvertShape } from "./convertShape";
import { ConvertSprite } from "./convertSprite";

export class Skia {
  private _canvasKit: CanvasKit | undefined = undefined;
  private _surface: Surface | null = null;

  private _pointerUpPaths: {
    path: Path;
    handler: () => void;
  }[] = [];

  public addPointerUpPath(arg: (typeof this._pointerUpPaths)[number]) {
    this._pointerUpPaths.push(arg);
  }

  private _pointerDownPaths: {
    path: Path;
    handler: () => void;
  }[] = [];

  public addPointerDownPath(arg: (typeof this._pointerDownPaths)[number]) {
    this._pointerDownPaths.push(arg);
  }

  async initSkia() {
    const ckLoaded = CanvasKitInit({
      locateFile: (file) => "/sbrd/" + file,
    });

    this._canvasKit = await ckLoaded;
    this._surface = this._canvasKit.MakeCanvasSurface("skia-canvas");

    const canvas = document.querySelector<HTMLCanvasElement>("#skia-canvas");
    if (!canvas) throw new Error("Канвас #skia-canvas не найдена");

    canvas.addEventListener("pointerdown", (ev) => this.handlePointerDown(ev));
    canvas.addEventListener("pointerup", (ev) => this.handlePointerUp(ev));
  }

  private handlePointerDown({ offsetX, offsetY }: MouseEvent) {
    for (const { path, handler } of this._pointerDownPaths) {
      if (path.contains(offsetX, offsetY)) handler();
    }
  }

  private handlePointerUp({ offsetX, offsetY }: MouseEvent) {
    for (const { path, handler } of this._pointerUpPaths) {
      if (path.contains(offsetX, offsetY)) handler();
    }
  }

  public get canvasKit(): CanvasKit {
    if (!this._canvasKit) throw new Error("Skia не инициализирован");
    return this._canvasKit;
  }

  async drawSkia({
    container: { children },
  }: {
    container: PIXI.Container<PIXI.DisplayObject>;
  }) {
    const converters = children
      .map<Converter | undefined>((displayObject) => {
        if (displayObject instanceof PIXI.Graphics) {
          if (displayObject.currentPath?.points) {
            return new ConvertLine({
              displayObject,
              canvasKit: this.canvasKit,
            });
          }

          if (displayObject.geometry.graphicsData?.length) {
            return new ConvertShape({
              displayObject,
              canvasKit: this.canvasKit,
            });
          }
        }

        if (displayObject instanceof PIXI.Sprite) {
          return new ConvertSprite({
            displayObject,
            canvasKit: this.canvasKit,
          });
        }
      })
      .filter((c): c is Converter => !!c);

    const canvas = this._surface?.getCanvas();
    if (canvas) {
      canvas.clear(this.canvasKit.BLACK);
      for (const converter of converters) {
        await converter.draw({
          canvas,
          addPointerDownPath: (a) => this.addPointerDownPath(a),
          addPointerUpPath: (a) => this.addPointerUpPath(a),
        });
      }
    }
    this._surface?.flush();
  }
}
