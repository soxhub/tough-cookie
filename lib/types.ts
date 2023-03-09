export type Callback<T> = (error?: Error | null, result?: T) => void
export type ErrorCallback = (error: Error, result?: never) => void