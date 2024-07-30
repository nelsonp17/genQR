/* https://github.com/ionic-team/ionic-storage?tab=readme-ov-file#api */
import { Drivers, Storage } from "@ionic/storage";
export default class StorageService {
	private _storage: any;
	private store: any;

	async create() {
		// If using, define drivers here: await this.storage.defineDriver(/*...*/);
		this.store = new Storage({
            name: '__genqr',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
		this._storage = await this.store.create();
	}

	async set(key: string, value: any) {
		await this._storage?.set(key, value);
	}
	async get(key: string) {
		return await this._storage?.get(key);
	}
	async remove(key: string) {
		await this._storage?.remove(key);
	}
	async clear() {
		await this._storage?.clear();
	}
	async keys() {
		return await this._storage?.keys();
	}
	async length() {
		return await this._storage?.length();
	}
	/* 
    storage.forEach((key, value, index) => {
    });

    Para habilitar el cifrado al utilizar el controlador de almacenamiento seguro Ionic :
    storage.setEncryptionKey('mykey');
    */
}
