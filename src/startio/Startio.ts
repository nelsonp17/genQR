// archivo index.ts

import { registerPlugin } from "@capacitor/core";
import type { StartioPlugin } from './definitions';


const Startio = registerPlugin<StartioPlugin>('Announcements', {
    web: () => import('./web').then(m => new m.StartioWeb()),
  });
  
export * from './definitions';
export * from './events/index';
export { Startio };
  