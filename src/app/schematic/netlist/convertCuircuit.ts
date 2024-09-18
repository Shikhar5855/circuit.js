export class DeviceUtil {
  static data: any = {};
  static count: any = 1;
  static add(point: any, device: any) {
    if (!this.data[point.getPort()]) {
      this.data[point.getPort()] = {};
    }

    // console.log(x+"_"+y+"==>",this.data)
    if (!this.data[point.getPort()]) {
      this.data[point.getPort()] = {
        name: null,
        device: [],
      };
    }
    // this.data[x+"_"+y].device.push(device)
  }
  static update(x: any, y: any, value: any = null) {
    try {
      this.data[x + '_' + y]['name'] = (value || this.count) + '';
    } catch (err) {
      console.log('x,y==>', x, y);
      console.log(err);
    }
  }
  static updateCount() {
    this.count++;
  }
  static getData(x: any, y: any) {
    return this.data[x + '_' + y];
  }
  static isPointAlreadyVisit(x: any, y: any) {
    if (!this.data[x + '_' + y]['name']) {
      return false;
    }
    return true;
  }
  // static getDeviceOutputPoint(x,y,d){

  // }
  static getPointsIfNotVisit(x: any, y: any) {
    const pointList: any = [];
    const deviceList = this.getData(x, y)?.device || [];
    deviceList.forEach((d: any) => {
      if (d.type == 'w') {
        const [p1, p2] = d.points;
        if (this.isPointAlreadyVisit(p1.x, p1.y)) {
          const name = this.data[p1.x + '_' + p1.y]['name'];
          this.update(p2.x, p2.y, name);
        } else if (this.isPointAlreadyVisit(p2.x, p2.y)) {
          const name = this.data[p2.x + '_' + p2.y]['name'];
          this.update(p1.x, p1.y, name);
        }
      } else {
        d.points.forEach((p: any) => {
          if (!this.isPointAlreadyVisit(p.x, p.y)) {
            pointList.push(p);
          }
        });
      }
    });
    return pointList;
  }
  static connect(source: any) {
    let pointList: any = [];
    if (source.type == 'v') {
      const [p1, p2] = source.points;
      if (!this.isPointAlreadyVisit(p2.x, p2.y)) {
        this.update(p2.x, p2.y, '0');
      }
      if (!this.isPointAlreadyVisit(p1.x, p1.y)) {
        this.update(p1.x, p1.y);
        this.updateCount();
        let tponnts = this.getPointsIfNotVisit(p1.x, p1.y) || [];
        pointList = [...tponnts];
      }
    }

    while (pointList.length > 0) {
      const np = pointList.pop();
      if (!this.isPointAlreadyVisit(np.x, np.y)) {
        this.update(np.x, np.y);
        this.updateCount();
      }
      const tponnts = this.getPointsIfNotVisit(np.x, np.y) || [];
      if (tponnts.length > 0) {
        pointList = [...pointList, ...tponnts];
      }
    }
  }
}

export class Point {
  x: any;
  y: any;
  type: any;
  constructor(x: any, y: any, type: any) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  getPort() {
    return this.x + '_' + this.y;
  }
  isEqual(n: any) {
    return this.x == n.x && this.y == n.y;
  }
}

export class Cuircuit {
  type;
  points: any = [];
  deviceData;
  id: any;
  constructor(type: any, value: any) {
    this.type = type;
    this.deviceData = value;
  }
  addPoint(x: any, y: any, type: any) {
    let p = new Point(x, y, type);
    this.points.push();
    DeviceUtil.add(p, this);
    return this;
  }
  addNode(point: any) {
    this.points.push(point);
    return this;
  }
  addId(id = '') {
    //  console.log("this==>",this)
    const [n, id1] = id.split('@');
    this.id = n;
    return this;
  }
}
