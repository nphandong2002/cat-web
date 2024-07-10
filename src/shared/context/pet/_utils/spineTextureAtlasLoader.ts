import { TextureAtlas } from '@pixi-spine/base';
import { ExtensionType, settings, utils } from '@pixi/core';
import type { ISpineMetadata } from '@pixi-spine/loader-base';
import { type AssetExtension, LoaderParserPriority, Loader, checkExtension } from '@pixi/assets';

import { makeSpineTextureAtlasLoaderFunctionFromPixiLoaderObject } from './makeSpineTextureAtlasLoader';

type RawAtlas = string;

export const spineTextureAtlasLoader: AssetExtension<RawAtlas | TextureAtlas, ISpineMetadata> = {
  extension: ExtensionType.Asset,
  loader: {
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal,
    },
    test(url: string): boolean {
      return checkExtension(url, '.atlas');
    },
    async load(url: string): Promise<RawAtlas> {
      const response = await settings.ADAPTER.fetch(url);
      const txt = await response.text();
      return txt as RawAtlas;
    },

    testParse(asset: unknown, options: any): Promise<boolean> {
      const isExtensionRight = checkExtension(options.src, '.atlas');
      const isString = typeof asset === 'string';
      return Promise.resolve(isExtensionRight && isString);
    },

    async parse(asset: RawAtlas, options: any, loader: Loader): Promise<TextureAtlas> {
      const metadata: ISpineMetadata = options.data;
      let basePath = utils.path.dirname(options.src);
      if (basePath && basePath.lastIndexOf('/') !== basePath.length - 1) basePath += '/';
      let resolve = (value: TextureAtlas | PromiseLike<TextureAtlas>) => {};
      let reject = (reason?: any) => {};
      const retPromise = new Promise<TextureAtlas>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      let retval = new TextureAtlas();
      const resolveCallback = (newAtlas: TextureAtlas): void => {
        if (!newAtlas)
          reject('Something went terribly wrong loading a spine .atlas file\nMost likely your texture failed to load.');
        resolve(retval);
      };
      if (metadata.image || metadata.images) {
        const pages = Object.assign(metadata.image ? { default: metadata.image } : {}, metadata.images);
        retval = new TextureAtlas(
          asset as RawAtlas,
          (line: any, callback: any) => {
            const page = (pages[line] as any) || (pages.default as any);
            if (page && page.baseTexture) callback(page.baseTexture);
            else callback(page);
          },
          resolveCallback,
        );
      } else {
        retval = new TextureAtlas(
          asset as RawAtlas,
          makeSpineTextureAtlasLoaderFunctionFromPixiLoaderObject(loader, basePath, metadata.imageMetadata),
          resolveCallback,
        );
      }
      return (await retPromise) as TextureAtlas;
    },
    unload(atlas: TextureAtlas) {
      atlas.dispose();
    },
  },
} as AssetExtension<RawAtlas | TextureAtlas, ISpineMetadata>;
