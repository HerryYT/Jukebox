export enum Protocol {
  MC_VERSION = '1.16.220',
  MC_PROTOCOL = 431,

  UNKNOWN = 0x00,
  LOGIN = 0x01,
  PLAY_STATUS = 0x02,
  SERVER_TO_CLIENT_HANDSHAKE = 0x03,
  CLIENT_TO_SERVER_HANDSHAKE = 0x04,

  // TODO: implement all other identifiers...
  CLIENT_CACHE_STATUS = 0x81,
}
