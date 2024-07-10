import { Skin } from '@pixi-spine/runtime-4.1';
import { ISkeletonData } from 'pixi-spine';

export const listPetPro = [
  {
    id: 197,
    name: 'Meow',
    preview_loc: 'meow.png',
    tag: 'meow',
    free: 1,
    owned: 1,
    coins: 0,
    diamonds: 0,
  },
  {
    id: 4,
    name: 'Howie Dog',
    preview_loc: 'howie.png',
    tag: 'howie',
    free: 1,
    owned: 1,
    coins: 0,
    diamonds: 0,
  },

  {
    id: 109,
    name: 'Shorty',
    preview_loc: 'shorty.png',
    tag: 'shorty',
    free: 0,
    owned: 0,
    coins: 1000,
    diamonds: 0,
  },

  {
    id: 201,
    name: 'Shiba',
    preview_loc: 'shiba.png',
    tag: 'shiba',
    free: 0,
    owned: 0,
    coins: 4000,
    diamonds: 0,
  },
  {
    id: 19,
    name: 'Husky Dog',
    preview_loc: 'husky.png',
    tag: 'husky',
    free: 0,
    owned: 0,
    coins: 6000,
    diamonds: 0,
  },
  {
    id: 20,
    name: 'Siamese Cat',
    preview_loc: 'choco.png',
    tag: 'choco',
    free: 0,
    owned: 0,
    coins: 5000,
    diamonds: 0,
  },
  {
    id: 21,
    name: 'Cheetah Cat',
    preview_loc: 'cheetah.png',
    tag: 'cheetah',
    free: 0,
    owned: 0,
    coins: 6000,
    diamonds: 0,
  },
  {
    id: 241,
    name: 'Dalmatian',
    preview_loc: 'dalmatian.png',
    tag: 'dalmatian',
    free: 0,
    owned: 0,
    coins: 5000,
    diamonds: 0,
  },
  {
    id: 78,
    name: 'Calico Cat',
    preview_loc: 'calico.png',
    tag: 'calico',
    free: 0,
    owned: 0,
    coins: 7000,
    diamonds: 0,
  },
  {
    id: 79,
    name: 'Pug Dog',
    preview_loc: 'pug.png',
    tag: 'pug',
    free: 0,
    owned: 0,
    coins: 7000,
    diamonds: 0,
  },

  {
    id: 103,
    name: 'Piggy',
    preview_loc: 'piggy.png',
    tag: 'piggy',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 5,
  },
  {
    id: 105,
    name: 'Wildy',
    preview_loc: 'wildy.png',
    tag: 'wildy',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 7,
  },
  {
    id: 106,
    name: 'Cow',
    preview_loc: 'cow.png',
    tag: 'cow',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 10,
  },
  {
    id: 604,
    name: 'Bunny',
    preview_loc: 'bunny.png',
    tag: 'bunny',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 10,
  },
  {
    id: 104,
    name: 'Panda',
    preview_loc: 'panda.png',
    tag: 'panda',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 12,
  },
  {
    id: 107,
    name: 'Koala',
    preview_loc: 'koala.png',
    tag: 'koala',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 15,
  },
  {
    id: 112,
    name: 'Penguin',
    preview_loc: 'penguin.png',
    tag: 'penguin',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 18,
  },
  {
    id: 108,
    name: 'Corgi',
    preview_loc: 'corgi.png',
    tag: 'corgi',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 20,
  },
  {
    id: 198,
    name: 'Fox',
    preview_loc: 'fox.png',
    tag: 'fox',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 30,
  },
  {
    id: 199,
    name: 'Red Panda',
    preview_loc: 'red-panda.png',
    tag: 'red-panda',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 30,
  },
  {
    id: 200,
    name: 'Lion',
    preview_loc: 'lion.png',
    tag: 'lion',
    free: 0,
    owned: 0,
    coins: 0,
    diamonds: 30,
  },
];

export const idleType = [
  'idle',
  'jump',
  'walk',
  'run',
  'dance',
  'dance-rock',
  'dance-tap',
  'dance-chill',
  'throw',
  'bite',
  'chew',
  'blink',
  'wave',
  'hurt',
  'laugh',
  'karate',
  'tired',
  'pet other',
  'shoot-bow',
];
export const feeling = ['sad', 'thanks', 'please', 'slide'];
export const action = [
  'dead',
  'sleep',
  'lick',
  'dig',
  'mad',
  'sit',
  'sit-sad',
  'fish-hook',
  'fish-catch',
  'fish',
  'fish-catch',
];

export const defaultSkeletonData: ISkeletonData = {
  name: '',
  bones: [],
  slots: [],
  skins: [],
  defaultSkin: new Skin('a'),
  events: [],
  animations: [],
  version: '',
  hash: '',
  width: 0,
  height: 0,
  ikConstraints: [],
  transformConstraints: [],
  pathConstraints: [],
  findBone: (boneName: string) => null,
  findBoneIndex: (boneName: string) => 0,
  findSlot: (slotName: string) => null,
  findSlotIndex: (slotName: string) => 0,
  findSkin: (skinName: string) => null,
  findEvent: (eventDataName: string) => null,
  findAnimation: (animationName: string) => null,
  findIkConstraint: (constraintName: string) => null,
  findTransformConstraint: (constraintName: string) => null,
  findPathConstraint: (constraintName: string) => null,
};
