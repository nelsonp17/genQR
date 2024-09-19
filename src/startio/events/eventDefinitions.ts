import type { PluginListenerHandle } from '@capacitor/core';
import type * as EventName from "./eventName"
import type { AdError, AdLoadInfo } from "./share"

export interface InterstitialEventDefinitions {
    addListener(
        eventName: EventName.InterstitialEventName.FailedToReceiveAd,
        listenerFunc: (error: AdError) => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.InterstitialEventName.Loaded,
        listenerFunc: (info: AdLoadInfo) => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.InterstitialEventName.Clicked,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.InterstitialEventName.Hidden,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.InterstitialEventName.Displayed,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.InterstitialEventName.NotDisplayed,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;
    
    addListener(
        eventName: EventName.InterstitialEventName.RewardedVideoCompleted,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;
}
/**
export interface BannerEventDefinitions {
    addListener(
        eventName: EventName.BannerEventName.Loaded,
        listenerFunc: (info: AdLoadInfo) => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.BannerEventName.FailedToReceiveAd,
        listenerFunc: (error:AdError) => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.BannerEventName.Impression,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.BannerEventName.Click,
        listenerFunc: () => void,
    ): Promise<PluginListenerHandle>;

    addListener(
        eventName: EventName.BannerEventName.Show,
        listenerFunc: (render:any) => void,
    ): Promise<PluginListenerHandle>;
} */