const CHANNEL_RE = /^[A-Z]{1}:[A-Z_]+$/

export class GeishaEvent<Paylaod = any> {
  constructor(private readonly event: MessageEvent) { }

  private get type() {
    return this.event.data?.type ?? ''
  }

  get valid() {
    if (!this.type)
      return false

    return CHANNEL_RE.test(this.type)
  }

  get ns() {
    if (!this.valid)
      throw new Error(`Invalid event type ${this.type}`)

    return this.type?.split(':')[0] as string
  }

  get channel() {
    if (!this.valid)
      throw new Error(`Invalid event type ${this.type}`)

    return this.type?.split(':')[1] as string
  }

  get payload(): Paylaod | null {
    if (!('data' in this.event.data) || !this.event.data.data || !this.valid)
      return null

    return this.event.data.data
  }
}
