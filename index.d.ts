type EventTypes = 'tempo' | 'numPeers' | 'playState';
type updateCallback = (beat: number, phase: number, bpm: number, playState: boolean) => any;

declare class AbletonLinkBase {
  setBeatForce(beat: number): void
  play(): void
  stop(): void
  getNumPeers(): number
  enable(): void
  disable(): void
  enablePlayStateSync(): void
  disablePlayStateSync(): void
  update(): void
  onTempoChanged(cb: Function): void
  onNumPeersChanged(cb: Function): void
  onPlayStateChanged(cb: Function): void
  on(key: 'tempo', cb: (tempo: number) => any): void
  on(key: 'numPeers', cb: (num_peers: number) => any): void
  on(key: 'playState', cb: (play_state: boolean) => any): void
  on(key: EventTypes, cb: Function): void
  off(key: EventTypes, cb?: Function): void
  // JavaScript
  startUpdate(quantum: number, cb: updateCallback): void
  startUpdate(interval_ms: number, cb?: updateCallback): void
  stopUpdate(): void

  // New timeline methods (Link 3.1.3 features)
  getTimeAtBeat(beat: number, quantum: number): number
  requestBeatAtStartPlayingTime(beat: number, quantum: number): void
  setIsPlayingAndRequestBeatAtTime(isPlaying: boolean, timeMs: number, beat: number, quantum: number): void
  getTimeForIsPlaying(): number

  // New session methods (Link 3.1.3 features)
  getSessionId(): string
  getSessionInfo(): {
    numPeers: number
    isEnabled: boolean
    isStartStopSyncEnabled: boolean
    currentTempo: number
    currentBeat: number
    currentPhase: number
    quantum: number
    isPlaying: boolean
  }
  getPlatformInfo(): {
    platform: 'macos' | 'linux' | 'windows' | 'unknown'
    linkVersion: string
    hasCustomClock: boolean
    supportsAdvancedTimeline: boolean
    supportsSessionManagement: boolean
  }
  getNetworkStats(): {
    numPeers: number
    isEnabled: boolean
    sessionActive: boolean
    networkLatency: number
    connectionQuality: string
  }
}

declare class AbletonLink extends AbletonLinkBase {
  constructor(bpm?: number, quantum?: number, enable?: boolean)
}

declare class AbletonLinkAudio extends AbletonLinkBase {
  constructor(bpm?: number, quantum?: number, enable?: boolean)
}

declare namespace AbletonLink {
  export const Audio: typeof AbletonLinkAudio
}

export default AbletonLink

