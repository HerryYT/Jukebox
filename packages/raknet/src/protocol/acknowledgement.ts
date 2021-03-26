import { RangedRecord, Record, SingleRecord } from '../record'

import { BinaryStream } from '@jukebox/binarystream'
import { Packet } from '../packet'

export class Acknowledgement extends Packet {
  public records: Set<Record> = new Set()

  public constructor() {
    super(0xc0)
  }

  public encode(stream: BinaryStream): void {
    stream.writeShort(this.records.size)
    for (const record of this.records) {
      // May be tricky but i like this implementation
      stream.writeBoolean(record.isSingle())
      if (record.isSingle()) {
        stream.writeTriadLE((record as SingleRecord).getSeqNumber())
      } else {
        stream.writeTriadLE((record as RangedRecord).getStartSeqNumber())
        stream.writeTriadLE((record as RangedRecord).getEndSeqNumber())
      }
    }
  }

  public decode(stream: BinaryStream): void {
    const records = stream.readShort()
    for (let i = 0; i < records; i++) {
      const single = stream.readBoolean()
      if (single) {
        const seqNum = stream.readTriadLE()
        this.records.add(new SingleRecord(seqNum))
      } else {
        const startSeqNum = stream.readTriadLE()
        const endSeqNum = stream.readTriadLE()
        this.records.add(new RangedRecord(startSeqNum, endSeqNum))
      }
    }
  }
}