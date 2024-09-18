export const EVENT_NAME = {
  DEVICE_SELECTED: 'device_selected',
  DEVICE_DESELECTED: 'device_deselected',
  DEVICE_DELETEED: 'device_deleted',
  DEVICE_CLONE: 'device_clone',
  DEVICE_LEFT_ROTATE: 'device_left_rotate',
  DEVICE_RIGHT_ROTATE: 'device_right_rotate',
  SELECTION_CHANGE: 'SELECTION_CHANGE',
  UNDO_REDO_EVENT:"UNDO_REDO_EVENT",
  HANDLE_CLICK_ACTIVITY:"handle_click_activity"
};

export class EventListner {
  static list: Array<{ key: string; fn: Function }> = [];
  static addEvent(key: string, cb: Function) {
    this.list.push({ key, fn: cb });
  }
  static emit(key: string, data: any) {
    this.list.forEach((d) => {
      if (d.key == key && d.fn) {
        d.fn(data);
      }
    });
  }
}
