type StoreValue = {
    message: string;
    messageId: number;
    data?: any;
};
    
const memoryStore = new Map<string, StoreValue>();
const timeouts = new Map<string, NodeJS.Timeout>();

function setWithTTL(key: string, value: StoreValue, ttl = 1000 * 60 * 60 * 2) {
    memoryStore.set(key, value);

    if (timeouts.has(key)) {
        clearTimeout(timeouts.get(key));
    }

    const timeout = setTimeout(() => {
        memoryStore.delete(key);
        timeouts.delete(key);
        console.log(`🧹 Đã xoá key quá hạn: ${key}`);
    }, ttl);

    timeouts.set(key, timeout);
}

function get(key: string): StoreValue | undefined {
    return memoryStore.get(key);
}

export const memoryStoreTTL = {
    set: setWithTTL,
    get,
};
