// Simple in-memory rate limiter
// Tracks requests by IP with a sliding window

const requests = new Map<string, number[]>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // max 5 requests per window

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    // Get existing timestamps for this IP
    const timestamps = requests.get(ip) || [];

    // Filter to only timestamps within the window
    const recent = timestamps.filter((t) => t > windowStart);

    if (recent.length >= MAX_REQUESTS) {
        requests.set(ip, recent);
        return { allowed: false, remaining: 0 };
    }

    recent.push(now);
    requests.set(ip, recent);

    // Cleanup old IPs every ~100 requests to prevent memory leak
    if (requests.size > 100) {
        for (const [key, times] of requests) {
            const valid = times.filter((t) => t > windowStart);
            if (valid.length === 0) {
                requests.delete(key);
            } else {
                requests.set(key, valid);
            }
        }
    }

    return { allowed: true, remaining: MAX_REQUESTS - recent.length };
}
