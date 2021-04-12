import * as assert from 'assert'

import { BinaryStream } from '@jukebox/binarystream'
import { Jukebox } from '../../../jukebox'
import { Packet } from '@jukebox/raknet'

export abstract class DataPacket extends Packet {
  public constructor(id: number) {
    super(id)
  }

  protected encodeHeader(stream: BinaryStream): void {
    stream.writeUnsignedVarInt(this.getId())
  }

  public internalDecode(stream: BinaryStream): void {
    this.decodeHeader(stream)
    this.decode(stream)
    if (!stream.feof()) {
      const remaining = stream.getRemaining()
      Jukebox.getLogger().debug(
        `Still ${remaining.byteLength} unread bytes in ${this.constructor.name}: ${remaining}`
      )
    }
  }

  protected decodeHeader(stream: BinaryStream): void {
    const packetId = stream.readUnsignedVarInt()
    assert(
      packetId == this.getId(),
      `Datapacket ID mismatch during decoding got=${packetId}, expected=${this.getId()}`
    )
  }
}
