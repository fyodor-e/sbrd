import * as PIXI from "pixi.js";

export class Pixi {
  private _app: PIXI.Application<PIXI.ICanvas> = new PIXI.Application({
    width: 200,
    height: 200,
    // forceCanvas: true,
  });
  private _container = new PIXI.Container();
  private _currScene: 1 | 2 = 1;

  constructor() {
    document.querySelector("#pixi")?.appendChild(this._app.view as any);
  }

  public switchScene() {
    switch (this._currScene) {
      case 1: {
        this._currScene = 2;
        return this.drawScene2();
      }
      case 2: {
        this._currScene = 1;
        return this.drawScene1();
      }
    }
  }

  private drawScene1(): PIXI.Container {
    this._container.children.forEach((c) => c.destroy());
    this._container.removeChildren();

    const g1 = new PIXI.Graphics();
    const g2 = new PIXI.Graphics();
    const g3 = new PIXI.Graphics();
    const g4 = new PIXI.Graphics();
    g1.beginFill("#ff0000").drawEllipse(10, 23, 54, 37).endFill();
    g1.position.set(120, 170);
    g1.angle = 30;
    g1.onpointerdown = () => {
      console.log("g1 pointerdown!");
    };
    g1.eventMode = "static";

    g2.beginFill("#0000ff").drawRect(0, 0, 50, 60).endFill();
    g2.position.set(30, 30);
    g2.angle = 45;
    g2.scale.set(2, 2);
    g2.onpointerup = () => {
      console.log("g2 pointerup!");
    };
    g2.eventMode = "static";

    g2.onpointerdown;

    g3.lineStyle(5, "#ffffff", 1).moveTo(0, 50).lineTo(150, 100);
    g3.position.set(20, 20);
    g3.angle = -20;
    g4.lineStyle(10, "#ffff00", 1).moveTo(20, 7).lineTo(80, 100);
    g4.angle = 20;

    PIXI.Assets.load("/sbrd/png1.png").then((t) => console.log(t));

    const png1 = PIXI.Sprite.from("/sbrd/png1.png");

    // center the sprite's anchor point
    png1.scale.set(0.3, 0.3);
    png1.position.set(50, 50);

    this._container.addChild(g1, g2, g3, g4, png1);
    this._app.stage.removeChildren();
    this._app.stage.addChild(this._container);

    return this._container;
  }

  private drawScene2(): PIXI.Container {
    this._container.children.forEach((c) => c.destroy());
    this._container.removeChildren();

    const g1 = new PIXI.Graphics();
    const g2 = new PIXI.Graphics();
    const g3 = new PIXI.Graphics();
    const g4 = new PIXI.Graphics();
    g1.beginFill("#ff2f00").drawEllipse(10, 23, 54, 37).endFill();
    g1.position.set(120, 170);
    g1.angle = 30;
    g1.onpointerdown = () => {
      console.log("g1 pointerdown!");
    };
    g1.eventMode = "static";

    g2.beginFill("#1230ff").drawEllipse(14, 12, 24, 26).endFill();
    g2.position.set(30, 30);
    g2.angle = -45;
    g2.scale.set(2.2, 2);
    g2.onpointerup = () => {
      console.log("g2 pointerup!");
    };
    g2.eventMode = "static";

    g3.lineStyle(5, "#f7f56f", 1).moveTo(10, 50).lineTo(150, 100);
    g3.position.set(20, 20);
    g3.angle = -10;
    g4.lineStyle(10, "#ffff00", 1).moveTo(20, 7).lineTo(80, 100);
    g4.angle = 26;

    const png2 = PIXI.Sprite.from("/sbrd/png2.png");

    // center the sprite's anchor point
    png2.scale.set(0.2, 0.2);
    png2.position.set(110, 10);
    // png2.angle = 30;

    this._container.addChild(g1, g2, g3, g4, png2);
    this._app.stage.removeChildren();
    this._app.stage.addChild(this._container);

    return this._container;
  }
}
