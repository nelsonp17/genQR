export interface AdError {
    /**
     * Gets the error's code.
     */
    code: number;
  
    /**
     * Gets the message describing the error.
     */
    message: string;
}
export interface AdLoadInfo {
    adId: string,
    state: AdState,
}

export interface AdState {
    READY: "READY",
    PROCESSING: "PROCESSING",
    UN_INITIALIZED: "UN_INITIALIZED"
}