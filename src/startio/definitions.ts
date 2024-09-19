import type { InterstitialEventDefinitions } from "./events/eventDefinitions"

//type ListenerEvents = InterstitialEventDefinitions & BannerEventDefinitions;
type ListenerEvents = InterstitialEventDefinitions;

export interface initParamOption {
    returnAdsEnabled?: boolean;
    isDev?: boolean;
    appId: String;
}

export interface GetResultString {
    result: String;
}

export interface GetResultValueString {
    value: String;
}
export interface InterstitialOption {
    adMode: AdModeType,
    autoShow: boolean
}
export enum AdModeType{
    AUTOMATIC = 'AUTOMATIC', 
    FULLPAGE = 'FULLPAGE', 
    VIDEO = 'VIDEO', 
    REWARDED_VIDEO = 'REWARDED_VIDEO', 
    OFFERWALL = 'OFFERWALL', 
    OVERLAY = 'OVERLAY'
}
export interface TimeFrequencyOption{
    second: number
}

export interface StartioPlugin extends ListenerEvents {
    intersticial(): Promise<void>;

    // startio
    initialize(options: initParamOption): Promise<void>;
    loadInterstitial(options: InterstitialOption): Promise<GetResultString>;
    showInterstitial(): Promise<GetResultString>;

    timeFrequency(options: TimeFrequencyOption): Promise<void>;
}
