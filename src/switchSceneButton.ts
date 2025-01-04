import { Pixi } from "./pixi";
import { Skia } from "./skia";

export const switchSceneButton = ({
  pixi,
  skia,
}: {
  pixi: Pixi;
  skia: Skia;
}) => {
  const button = document.querySelector<HTMLButtonElement>(
    "#switchSceneButton",
  );
  if (!button) throw new Error("Кнопка #switchSceneButton не найдена");

  const container = pixi.switchScene();
  skia.drawSkia({ container });

  button.addEventListener("click", () => {
    const container = pixi.switchScene();
    skia.drawSkia({ container });
  });
};
