import { cubicInOut, cubicOut } from './Ease';

export default class ShapeOverlays {
  controller: DrawerController;

  numPoints: number;

  duration: number;

  delayPointsArray: Array<number>;

  delayPointsMax: number;

  delayPerPath: number;

  timeStart: number;

  isAnimating: boolean;

  isOpened: boolean;

  constructor(controller: DrawerController) {
    this.controller = controller;
    this.numPoints = 2;
    this.duration = 600;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 200;
    this.timeStart = Date.now();
    this.isAnimating = false;
    this.isOpened = false;
  }

  toggle() {
    this.isAnimating = true;
    for (let i = 0; i < this.numPoints; i++) {
      this.delayPointsArray[i] = 0;
    }
    this.timeStart = Date.now();
    if (!this.isOpened) {
      this.isOpened = true;
      this.controller.onOpen();
    } else {
      this.isOpened = false;
    }
    this.renderLoop();
  }

  updatePath(time: number) {
    const points = [];
    for (let i = 0; i < this.numPoints; i++) {
      const thisEase = (() => {
        if (this.isOpened) {
          return i === 1 ? cubicOut : cubicInOut;
        }
        return i === 1 ? cubicInOut : cubicOut;
      })();
      points[i] =
        thisEase(
          Math.min(
            Math.max(time - this.delayPointsArray[i], 0) / this.duration,
            1,
          ),
        ) * 100;
    }
    let str = '';
    str += this.isOpened ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (let i = 0; i < this.numPoints - 1; i++) {
      const p = ((i + 1) / (this.numPoints - 1)) * 100;
      const cp = p - ((1 / (this.numPoints - 1)) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${
        points[i + 1]
      } `;
    }
    str += this.isOpened ? 'V 0 H 0' : 'V 100 H 0';
    return str;
  }

  render() {
    if (this.isOpened) {
      for (let i = 0; i < this.controller.setD.length; i++) {
        this.controller.setD[i](
          this.updatePath(
            Date.now() - (this.timeStart + this.delayPerPath * i),
          ),
        );
      }
    } else {
      for (let i = 0; i < this.controller.setD.length; i++) {
        this.controller.setD[i](
          this.updatePath(
            Date.now() -
              (this.timeStart +
                this.delayPerPath * (this.controller.setD.length - i - 1)),
          ),
        );
      }
    }
  }

  renderLoop() {
    this.render();
    if (
      Date.now() - this.timeStart <
      this.duration +
        this.delayPerPath * (this.controller.setD.length - 1) +
        this.delayPointsMax
    ) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    } else {
      this.isAnimating = false;
      if (!this.isOpened) {
        this.controller.onClose();
      }
    }
  }
}

interface DrawerController {
  setD: React.Dispatch<React.SetStateAction<string>>[];
  onOpen: () => void;
  onClose: () => void;
}
