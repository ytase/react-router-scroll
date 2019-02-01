const STATE_KEY_PREFIX = '@@scroll|';

export default class SessionStorage {
  read(location, key) {
    const stateKey = this.getStateKey(location, key);

    try {
      const value = sessionStorage.getItem(stateKey);
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }

  save(location, key, value) {
    const stateKey = this.getStateKey(location, key);
    const storedValue = JSON.stringify(value);

    try {
      sessionStorage.setItem(stateKey, storedValue);
    } catch (e) { }
  }

  getStateKey(location, key) {
    const locationKey = location.key || location.pathname;
    const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`;
    return key == null ? stateKeyBase : `${stateKeyBase}|${key}`;
  }
}
