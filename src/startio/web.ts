import { WebPlugin } from '@capacitor/core';

import type * as Definitions from './definitions';

export class StartioWeb 
    extends WebPlugin 
    implements Definitions.StartioPlugin 
{
    async timeFrequency(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async intersticial(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async initialize(): Promise<void> {}
    async loadInterstitial(): Promise<Definitions.GetResultString> {
        throw this.unimplemented('Not implemented on web.');
    }
    async showInterstitial(): Promise<Definitions.GetResultString> {
        throw this.unimplemented('Not implemented on web.');
    }
}
