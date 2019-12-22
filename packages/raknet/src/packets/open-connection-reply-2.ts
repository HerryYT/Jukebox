import { Packet, IPacket } from '../packet'
import { BinaryStream } from '@jukebox/binarystream'
import { Identifiers } from '../identifiers'
import { RemoteInfo } from 'dgram'
import { Jukebox } from '@jukebox/core'

export default class OpenConnectionReply2 extends Packet implements IPacket {
  public static pid = Identifiers.ID_OPEN_CONNECTION_REPLY_2

  public serverID: number = -1
  public clientPort: number = -1
  public mtuSize: number = -1
  public serverSecurity: number = -1

  constructor(rinfo: RemoteInfo, stream?: BinaryStream) {
    super(rinfo, stream)

    this.clientPort = rinfo.port
    this.mtuSize = this.stream.getShort()
    this.serverID = Jukebox.serverID
  }

  encode() {
    this.stream.putByte(Identifiers.ID_OPEN_CONNECTION_REPLY_2)
    this.stream.putMagic()
    this.stream.putLong(this.serverID)
    this.stream.putShort(this.clientPort)
    this.stream.putShort(this.mtuSize)
    this.stream.putByte(this.serverSecurity)
  }
}
