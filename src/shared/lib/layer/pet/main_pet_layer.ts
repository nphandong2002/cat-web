import { KeysType, PetOptionLayer } from 'src/shared/type/pet-type';
import { PetLayer } from './pet_layer';
import { moveConfig } from 'src/config/pet-config';
import { Keys } from 'src/shared/constain';
import { PositionType } from 'src/shared/type/common-type';
import { ActionServerType } from 'src/shared/type/baselayer-type';

export class MainPetLayer extends PetLayer {
  key: KeysType[];
  mouseXY: PositionType;
  updateCurrentPet: ActionServerType['updateCurrentPet'];
  constructor(option: PetOptionLayer) {
    super(option);
    this.mouseXY = {
      x: 0,
      y: 0,
    };
    this.key = [];
    this.updateCurrentPet = option.updateCurrentPet;
    this.listenKeyDown();
  }
  canAction(): boolean {
    return !this.status.some((s) => {
      if ('stunned' in s && 'die' in s) {
        return s.stunned || s.die;
      }
      return false;
    });
  }
  setMousePosition(x: number, y: number) {
    this.mouseXY = { x, y };
  }
  move() {
    this.changeAnimation(0, this.key.length ? 'walk' : this.visualsPet.idle, true);
    [Keys.RIGHT, Keys.LEFT].some((a) => a === this.key[0]) &&
      (this.visualsPet.direction = this.key[0] == Keys.LEFT ? Keys.LEFT : Keys.RIGHT);

    let key = this.key[0];
    if (key && moveConfig[key]) {
      let { x, y } = moveConfig[key];
      this.position.x += x * this.stats.speed;
      this.position.y += y * this.stats.speed;
    }
  }
  listenKeyDown() {
    const keydownHandle = (e: KeyboardEvent) => {
      if (Object.values(Keys).includes(e.key as Keys) && !this.key.some((a) => a == e.key))
        this.key.unshift(e.key as Keys);
    };
    const keyupHandle = (e: KeyboardEvent) => {
      if (Object.values(Keys).includes(e.key as Keys) && this.key.some((a) => a == e.key)) {
        setTimeout(() => {
          this.key.splice(
            this.key.findIndex((a) => a == e.key),
            1,
          );

          this.key.length == 0 &&
            this.updateCurrentPet({
              position: this.position,
            });
        }, 50);
      }
    };
    window.addEventListener('visibilitychange', () => {
      document.hidden && (this.key = []);
    });
    window.addEventListener('keydown', keydownHandle);
    window.addEventListener('keyup', keyupHandle);
  }
}
