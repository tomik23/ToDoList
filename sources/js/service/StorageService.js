class StorageService {
  constructor(options) {
    this.sessionType = options.sesionType;
  }

  setToStorage(type, value) {
    this.sessionType.setItem(type, JSON.stringify(value));
  }

  getItemFromStorage(value) {
    return JSON.parse(this.sessionType.getItem(value))
  }

  removeItemFromStorage(value) {
    this.sessionType.removeItem(value);
  }
}

export default StorageService;
