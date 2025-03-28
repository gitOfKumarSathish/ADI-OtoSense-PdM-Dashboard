import { InMemoryStorageStrategy } from "ts-cacheable";

/**
 * Global configuration object for the application.
 *
 * @property {number} cacheRefreshInterval - The interval in milliseconds at which the cache is refreshed. Default is 300000 ms (5 minute).
 * @property {typeof InMemoryStorageStrategy} storageStrategy - The strategy used for caching. Default is InMemoryStorageStrategy.
 * @property {boolean} slidingExpiration - Indicates whether the cache expiration is sliding. Default is true.
 */
export const globalConfig = {
  cacheRefreshInterval: 300000,
  storageStrategy: InMemoryStorageStrategy,
  slidingExpiration: true,
};