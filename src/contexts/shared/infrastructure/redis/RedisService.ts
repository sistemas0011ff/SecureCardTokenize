import Redis from 'ioredis';
import { IRedisService } from './IRedisService';

export class RedisService implements IRedisService {
    private client: Redis;

    constructor() {
        const redisPort = parseInt(process.env.REDIS_PORT!, 10);
        const redisHost = process.env.REDIS_HOST!;
        const redisDb = process.env.REDIS_DB ? parseInt(process.env.REDIS_DB, 10) : 0;

        this.client = new Redis({
            port: redisPort,
            host: redisHost,
            db: redisDb,
        });

        console.log(`Connecting to Redis at ${redisHost}:${redisPort}, DB: ${redisDb}`);
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        console.log(`Setting key: ${key} with TTL: ${ttl}`);
        try {
            if (ttl) {
                await this.client.set(key, value, 'EX', ttl);
            } else {
                await this.client.set(key, value);
            }
            console.log(`Key set successfully: ${key}`);
        } catch (error) {
            console.error(`Error setting key ${key}:`, error);
        }
    }

    async get(key: string): Promise<string | null> {
        console.log(`Getting key: ${key}`);
        try {
            const value = await this.client.get(key);
            console.log(`Value retrieved for ${key}: ${value}`);
            return value;
        } catch (error) {
            console.error(`Error retrieving key ${key}:`, error);
            return null;
        }
    }
}
