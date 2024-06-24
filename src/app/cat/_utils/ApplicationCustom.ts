import { Stage } from "@pixi/layers";
import { Application, TickerPlugin } from "pixi.js";

!Application._plugins.includes(TickerPlugin) && Application._plugins.push(TickerPlugin);

export class ApplicationCustom extends Application {
  constructor() {
    super({
      backgroundColor: "#fff",
      backgroundAlpha: 0,
      clearBeforeRender: true,
      context: null,
      antialias: false,
      powerPreference: "default",
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      hello: false,
    });
    this.stage = new Stage();
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.renderer.view.style && (this.renderer.view.style.touchAction = "auto");
    this.ticker.maxFPS = 60;
  }
}
