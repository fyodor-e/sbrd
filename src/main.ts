import "./style.css";
import { Pixi } from "./pixi/index.ts";
import { Skia } from "./skia/index.ts";
import { switchSceneButton } from "./switchSceneButton.ts";

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const skia = new Skia()
const pixi = new Pixi()

skia.initSkia().then(() => {
  switchSceneButton({ skia, pixi })
});
