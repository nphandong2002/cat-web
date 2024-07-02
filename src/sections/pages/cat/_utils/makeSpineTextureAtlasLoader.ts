import { Loader } from "@pixi/assets";
import { BaseTexture, utils } from "@pixi/core";

export const makeSpineTextureAtlasLoaderFunctionFromPixiLoaderObject = (loader: Loader, atlasBasePath: string, imageMetadata: any) => {
  return async (pageName: string, textureLoadedCallback: (tex: BaseTexture) => any): Promise<void> => {
    const url = utils.path.normalize([...atlasBasePath.split(utils.path.sep), pageName].join(utils.path.sep));
    const texture = await loader.load({ src: url, data: imageMetadata });
    textureLoadedCallback(texture.baseTexture);
  };
};
