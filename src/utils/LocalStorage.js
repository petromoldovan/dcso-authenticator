import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage'; //A wrapper for local storage on react web and native

const localStorage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync : {}
});

class LocalStorageWrapper {
  save(key, data) {
    return localStorage.save({
      key: key,
      data: JSON.stringify(data)
    });
  }
  load(key) {
    return localStorage.load({
      key: key
    });
  }
  remove(key) {
    return localStorage.remove( { key: key } );
  }
}


export default LocalStorageWrapper;
