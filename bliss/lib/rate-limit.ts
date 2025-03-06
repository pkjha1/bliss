export class RateLimit {
  private static readonly cache = new Map<string, { count: number; timestamp: number }>()

  static async check(
    key: string,
    maxRequests: number,
    windowMs: number,
  ): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now()
    const record = this.cache.get(key) || { count: 0, timestamp: now }

    // Reset if outside window
    if (now - record.timestamp > windowMs) {
      record.count = 0
      record.timestamp = now
    }

    record.count += 1
    this.cache.set(key, record)

    const remaining = Math.max(0, maxRequests - record.count)
    const reset = record.timestamp + windowMs

    return {
      success: record.count <= maxRequests,
      limit: maxRequests,
      remaining,
      reset,
    }
  }

  static async limit(
    key: string,
    maxRequests = 10,
    windowMs = 60000,
  ): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    return this.check(key, maxRequests, windowMs)
  }
}

