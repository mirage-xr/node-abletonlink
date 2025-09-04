# @mirage-xr/node-abletonlink 

> A modernized Node.js/TypeScript interface to [Ableton Link](https://github.com/ableton/link), refactored from the original [2bbb/node-abletonlink](https://github.com/2bbb/node-abletonlink).  
> This fork updates the API surface, adds Link 3.1.3 features, and includes expanded docs and TypeScript definitions—while keeping attribution, license, and spirit of the original work.

**Package**: `@mirage-xr/node-abletonlink`
**Version**: 0.1.4  
**Link Library**: 3.1.3  
**Supported OS**: macOS, Linux, Windows  
**Node.js**: 18.13.0+

---

## Table of Contents

- [Overview](#overview)
- [What’s New in This Fork](#whats-new-in-this-fork)
- [Installation](#installation)
- [Requirements & Build Tools](#requirements--build-tools)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Compatibility](#compatibility)
- [Troubleshooting](#troubleshooting)
- [Credits & Attribution](#credits--attribution)
- [License](#license)
- [Donations](#donations)

---

## Overview

The Node.js Ableton Link module provides a complete JavaScript/TypeScript interface to the Ableton Link library, enabling real-time musical synchronization across multiple applications. This module supports both the original Link functionality and the enhanced features from Link 3.1.3.

---

## What’s New in This Fork

- ✅ Updated to **Link 3.1.3** and surfaced advanced timeline/session methods  
- ✅ **TypeScript definitions** (`index.d.ts`) for full IntelliSense  
- ✅ **Expanded README/API docs** with practical examples  
- ✅ **Session/network/platform helpers** for monitoring and diagnostics  
- ✅ **Safer defaults & clearer errors**  
- ✅ **Non-breaking spirit**: original semantics retained wherever feasible

> This is not an official continuation of the original—just a community fork with modernization and extra docs. Full credit to the original authors (see [Credits & Attribution](#credits--attribution)).

---

## Installation

```bash
npm install @mirage-xr/node-abletonlink
```

---

## Requirements & Build Tools

This module uses a native addon (node-addon-api). You’ll need platform build tools:

**Common**
- Python (v2.7 or Python 3 as supported by node-gyp)
- `node-gyp` prerequisites (see node-gyp docs)

**macOS**
- Xcode (with Command Line Tools)

**Linux / UNIX**
- `make` and a C++ compiler toolchain

**Windows**
- Microsoft windows-build-tools  
  ```bash
  npm install --global --production windows-build-tools
  ```

**Tested historically (original project):**
- macOS 10.14.6 + Xcode with Node.js 10.16.0  
- Windows 10 + windows-build-tools with Node.js 10.16.0

**This fork targets Node.js 18.13.0+** (older versions may work with additional config but are not supported).

---

## Quick Start

```javascript
const abletonlink = require('@mirage-xr/node-abletonlink');

// bpm=120, quantum=4 (e.g., 4/4), enabled=true
const link = new abletonlink(120, 4, true);

// Receive periodic updates (ms interval)
link.startUpdate(60, (beat, phase, bpm, playState) => {
  console.log(`Beat: ${beat}, Phase: ${phase}, BPM: ${bpm}, Playing: ${playState}`);
});

// Later
// link.stopUpdate();
```

---

## API Documentation

# Node.js Ableton Link API Documentation

## Overview

The Node.js Ableton Link module provides a complete JavaScript/TypeScript interface to the Ableton Link library, enabling real-time musical synchronization across multiple applications. This module supports both the original Link functionality and the enhanced features from Link 3.1.3.

**Version**: 0.1.4  
**Link Library**: 3.1.3  
**Platform Support**: macOS, Linux, Windows  
**Node.js**: 18.13.0+  

---

## Table of Contents

- [Installation](#installation-1)
- [Basic Usage](#basic-usage)
- [Constructor](#constructor)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Advanced Features](#advanced-features)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)

---

## Installation

```bash
npm install @mirage-xr/node-abletonlink
```

**Requirements**:
- Node.js 18.13.0 or higher
- C++ compiler (for native module compilation)
- Platform-specific build tools

---

## Basic Usage

```javascript
const abletonlink = require('@mirage-xr/node-abletonlink');

// Create a new Link instance
const link = new abletonlink(120, 4, true);

// Start receiving updates
link.startUpdate(60, (beat, phase, bpm, playState) => {
    console.log(`Beat: ${beat}, Phase: ${phase}, BPM: ${bpm}`);
});
```

---

## Constructor

### `new abletonlink(bpm, quantum, enable)`

Creates a new Ableton Link instance.

**Parameters**:
- `bpm` (number): Initial tempo in beats per minute (default: 120.0)
- `quantum` (number): Musical quantum for phase calculation (default: 4.0)
- `enable` (boolean): Whether to enable Link synchronization (default: true)

**Returns**: `AbletonLink` instance

**Example**:
```javascript
// Basic initialization
const link = new abletonlink(120, 4, true);

// With custom tempo and quantum
const link = new abletonlink(140, 8, true);

// Disabled initially
const link = new abletonlink(120, 4, false);
```

---

## Properties

### Core Properties

#### `bpm` (number)
**Get/Set**: Readable and writable  
**Description**: Current tempo in beats per minute  
**Range**: Positive numbers (typically 20-999 BPM)  

**Implementation Examples**:
```javascript
// Get current tempo
console.log(`Current tempo: ${link.bpm}`);

// Set to specific music genres
link.bpm = 128; // House music
link.bpm = 140; // Drum & Bass
link.bpm = 90;  // Hip-hop
link.bpm = 120; // Pop/Rock

// Dynamic tempo changes
setInterval(() => {
    const currentBpm = link.bpm;
    if (currentBpm < 140) {
        link.bpm = currentBpm + 1; // Gradual tempo increase
    }
}, 1000);

// Tempo validation
function setTempo(newTempo) {
    if (newTempo >= 20 && newTempo <= 999) {
        link.bpm = newTempo;
        console.log(`Tempo set to ${newTempo} BPM`);
    } else {
        console.error('Invalid tempo range (20-999 BPM)');
    }
}
```

#### `quantum` (number)
**Get/Set**: Readable and writable  
**Description**: Musical quantum for phase calculation  
**Range**: Positive numbers (typically 1-32)  

**Implementation Examples**:
```javascript
// Get current quantum
console.log(`Current quantum: ${link.quantum}`);

// Set to common time signatures
link.quantum = 4;  // 4/4 time (common time)
link.quantum = 3;  // 3/4 time (waltz)
link.quantum = 6;  // 6/8 time (compound duple)
link.quantum = 8;  // 8/8 time (complex meter)

// Dynamic quantum changes based on music structure
function setTimeSignature(numerator, denominator) {
    link.quantum = numerator;
    console.log(`Time signature set to ${numerator}/${denominator}`);
}

// Quantum validation
function setQuantum(newQuantum) {
    if (newQuantum >= 1 && newQuantum <= 32) {
        link.quantum = newQuantum;
        console.log(`Quantum set to ${newQuantum}`);
    } else {
        console.error('Invalid quantum range (1-32)');
    }
}

// Phase calculation with quantum
function getPhaseInBeats() {
    return link.phase / link.quantum;
}
```

#### `enabled` (boolean)
**Get/Set**: Readable and writable  
**Description**: Whether Link synchronization is enabled  

**Implementation Examples**:
```javascript
// Get current enabled state
console.log(`Link enabled: ${link.enabled}`);

// Basic enable/disable
link.enabled = false; // Disable synchronization
link.enabled = true;  // Enable synchronization

// Conditional enabling
function enableIfNetworkAvailable() {
    const networkStats = link.getNetworkStats();
    if (networkStats.connectionQuality !== 'poor') {
        link.enabled = true;
        console.log('Link enabled - network quality good');
    } else {
        link.enabled = false;
        console.log('Link disabled - poor network quality');
    }
}

// Toggle functionality
function toggleLink() {
    link.enabled = !link.enabled;
    console.log(`Link ${link.enabled ? 'enabled' : 'disabled'}`);
}

// Auto-disable on errors
function handleLinkError() {
    link.enabled = false;
    console.log('Link disabled due to error');
    // Retry after delay
    setTimeout(() => {
        link.enabled = true;
        console.log('Link re-enabled');
    }, 5000);
}
```

#### `beat` (number)
**Get**: Read-only  
**Description**: Current beat position in the musical timeline  
**Range**: 0.0 and above  

**Implementation Examples**:
```javascript
// Get current beat
console.log(`Current beat: ${link.beat}`);

// Beat-based animations
function updateBeatVisualization() {
    const currentBeat = link.beat;
    const beatFraction = currentBeat % 1;
    
    if (beatFraction < 0.1) {
        triggerBeatAnimation(); // On beat
    } else if (beatFraction < 0.5) {
        updateBeatProgress(beatFraction); // Beat progress
    }
}

// Beat counting
function countBeats() {
    const currentBeat = link.beat;
    const wholeBeats = Math.floor(currentBeat);
    const beatFraction = currentBeat - wholeBeats;
    
    console.log(`Beat ${wholeBeats}, ${(beatFraction * 100).toFixed(0)}% complete`);
}

// Beat-based timing
function scheduleOnBeat(targetBeat) {
    const currentBeat = link.beat;
    const beatsUntilTarget = targetBeat - currentBeat;
    
    if (beatsUntilTarget > 0) {
        const msUntilTarget = (beatsUntilTarget * 60 / link.bpm) * 1000;
        setTimeout(() => {
            console.log(`Target beat ${targetBeat} reached!`);
        }, msUntilTarget);
    }
}

// Beat validation
function isValidBeat(beat) {
    return beat >= 0 && Number.isFinite(beat);
}
```

#### `phase` (number)
**Get**: Read-only  
**Description**: Current phase within the current quantum  
**Range**: 0.0 to quantum value  

**Implementation Examples**:
```javascript
// Get current phase
console.log(`Current phase: ${link.phase}`);

// Phase-based visualizations
function updatePhaseMeter() {
    const currentPhase = link.phase;
    const quantum = link.quantum;
    const phasePercentage = (currentPhase / quantum) * 100;
    
    updateProgressBar(phasePercentage);
    if (phasePercentage < 10) {
        highlightBeatMarker(); // Start of measure
    }
}

// Phase synchronization
function syncToPhase(targetPhase) {
    const currentPhase = link.phase;
    const phaseDiff = targetPhase - currentPhase;
    
    if (Math.abs(phaseDiff) > 0.1) {
        console.log(`Phase offset: ${phaseDiff.toFixed(3)} beats`);
        adjustTiming(phaseDiff);
    }
}

// Phase-based effects
function applyPhaseEffects() {
    const currentPhase = link.phase;
    const quantum = link.quantum;
    
    if (currentPhase < quantum * 0.25) {
        applyIntroEffect(); // First quarter
    } else if (currentPhase < quantum * 0.5) {
        applyBuildEffect(); // Second quarter
    } else if (currentPhase < quantum * 0.75) {
        applyDropEffect();  // Third quarter
    } else {
        applyOutroEffect(); // Last quarter
    }
}

// Phase calculation utilities
function getPhaseInMeasures() {
    return link.phase / link.quantum;
}

function isPhaseInRange(minPhase, maxPhase) {
    const currentPhase = link.phase;
    return currentPhase >= minPhase && currentPhase <= maxPhase;
}
```

#### `isPlaying` (boolean)
**Get**: Read-only  
**Description**: Whether the transport is currently playing  

**Implementation Examples**:
```javascript
// Get current play state
console.log(`Transport playing: ${link.isPlaying}`);

// Play state monitoring
function monitorPlayState() {
    const isCurrentlyPlaying = link.isPlaying;
    
    if (isCurrentlyPlaying) {
        startAudioEngine();
        startVisualization();
        console.log('Transport started - audio and visuals active');
    } else {
        stopAudioEngine();
        pauseVisualization();
        console.log('Transport stopped - audio and visuals paused');
    }
}

// Auto-play functionality
function autoPlayOnBeat(beatNumber) {
    const currentBeat = link.beat;
    
    if (Math.floor(currentBeat) === beatNumber && !link.isPlaying) {
        console.log(`Auto-play triggered at beat ${beatNumber}`);
        // Trigger play state change
    }
}

// Play state validation
function validatePlayState() {
    const isPlaying = link.isPlaying;
    const currentBeat = link.beat;
    
    if (isPlaying && currentBeat < 0) {
        console.warn('Playing with negative beat - may indicate timing issue');
    }
    
    return isPlaying;
}

// Conditional actions based on play state
function handleTransportChange() {
    if (link.isPlaying) {
        enableRealTimeUpdates();
        startBeatTracking();
    } else {
        disableRealTimeUpdates();
        stopBeatTracking();
    }
}
```

#### `isStartStopSyncEnabled` (boolean)
**Get/Set**: Readable and writable  
**Description**: Whether start/stop synchronization is enabled  

**Implementation Examples**:
```javascript
// Get current sync state
console.log(`Start/Stop sync: ${link.isStartStopSyncEnabled}`);

// Basic enable/disable
link.isStartStopSyncEnabled = true;  // Enable sync
link.isStartStopSyncEnabled = false; // Disable sync

// Conditional sync enabling
function enableSyncIfMultiplePeers() {
    const sessionInfo = link.getSessionInfo();
    
    if (sessionInfo.numPeers > 1) {
        link.isStartStopSyncEnabled = true;
        console.log('Start/Stop sync enabled - multiple peers detected');
    } else {
        link.isStartStopSyncEnabled = false;
        console.log('Start/Stop sync disabled - single peer only');
    }
}

// Sync state management
function manageSyncState() {
    const shouldSync = link.isStartStopSyncEnabled;
    const numPeers = link.getSessionInfo().numPeers;
    
    if (shouldSync && numPeers === 0) {
        console.log('Sync enabled but no peers - waiting for connections');
    } else if (shouldSync && numPeers > 0) {
        console.log(`Sync active with ${numPeers} peers`);
    } else {
        console.log('Sync disabled - independent transport control');
    }
}

// Toggle sync functionality
function toggleStartStopSync() {
    const currentState = link.isStartStopSyncEnabled;
    link.isStartStopSyncEnabled = !currentState;
    
    console.log(`Start/Stop sync ${link.isStartStopSyncEnabled ? 'enabled' : 'disabled'}`);
    return link.isStartStopSyncEnabled;
}

// Sync validation
function validateSyncSettings() {
    const syncEnabled = link.isStartStopSyncEnabled;
    const linkEnabled = link.enabled;
    
    if (syncEnabled && !linkEnabled) {
        console.warn('Sync enabled but Link disabled - sync will not work');
        return false;
    }
    
    return true;
}
```

---

## Methods

### Core Methods

#### `startUpdate(interval, callback?)`

Starts the update loop for receiving Link synchronization data.

**Parameters**:
- `interval` (number): Update interval in milliseconds
- `callback` (function, optional): Callback function for updates

**Callback Parameters**:
- `beat` (number): Current beat position
- `phase` (number): Current phase
- `bpm` (number): Current tempo
- `playState` (boolean): Current play state

**Implementation Examples**:
```javascript
// Basic update with callback
link.startUpdate(60, (beat, phase, bpm, playState) => {
    console.log(`Beat: ${beat}, Phase: ${phase}, BPM: ${bpm}`);
});

// High-frequency updates for real-time applications
link.startUpdate(16, (beat, phase, bpm, playState) => {
    updateVisualization(beat, phase);
    updateTempoDisplay(bpm);
    updateTransportState(playState);
});

// Low-frequency updates for monitoring
link.startUpdate(1000, (beat, phase, bpm, playState) => {
    logSessionState(beat, phase, bpm, playState);
    updateStatusDisplay();
});

// Update without callback for manual polling
link.startUpdate(60);

// Dynamic update frequency based on application state
function setUpdateFrequency(isActive) {
    if (isActive) {
        link.startUpdate(16); // High frequency when active
    } else {
        link.startUpdate(500); // Low frequency when idle
    }
}

// Update with error handling
function startUpdateWithErrorHandling(interval, callback) {
    try {
        link.startUpdate(interval, (beat, phase, bpm, playState) => {
            try {
                callback(beat, phase, bpm, playState);
            } catch (error) {
                console.error('Update callback error:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start updates:', error);
    }
}

// Conditional updates based on play state
function startConditionalUpdates() {
    link.startUpdate(60, (beat, phase, bpm, playState) => {
        if (playState) {
            // High-frequency updates when playing
            updateRealTimeElements(beat, phase, bpm);
        } else {
            // Low-frequency updates when stopped
            updateIdleElements(beat, phase, bpm);
        }
    });
}
```

#### `stopUpdate()`

Stops the update loop.

**Implementation Examples**:
```javascript
// Basic stop
link.stopUpdate();

// Stop with confirmation
function stopUpdatesSafely() {
    try {
        link.stopUpdate();
        console.log('Updates stopped successfully');
        return true;
    } catch (error) {
        console.error('Failed to stop updates:', error);
        return false;
    }
}

// Conditional stop
function stopUpdatesIfIdle() {
    const sessionInfo = link.getSessionInfo();
    if (sessionInfo.numPeers === 0 && !sessionInfo.isPlaying) {
        link.stopUpdate();
        console.log('Updates stopped - no active session');
    }
}

// Stop with cleanup
function stopUpdatesWithCleanup() {
    link.stopUpdate();
    
    // Clean up resources
    clearInterval(updateTimer);
    resetVisualization();
    console.log('Updates stopped and resources cleaned up');
}

// Stop and restart with new frequency
function restartUpdates(newInterval) {
    link.stopUpdate();
    setTimeout(() => {
        link.startUpdate(newInterval, updateCallback);
        console.log(`Updates restarted with ${newInterval}ms interval`);
    }, 100);
}

// Stop updates on application shutdown
function shutdownGracefully() {
    link.stopUpdate();
    link.enabled = false;
    console.log('Link shutdown complete');
}
```

---

### Advanced Timeline Methods (Link 3.1.3)

#### `getTimeAtBeat(beat, quantum)`

Calculates the precise time at which a specific beat occurs.

**Parameters**:
- `beat` (number): Target beat position
- `quantum` (number): Musical quantum for calculation

**Returns**: `number` - Time in milliseconds

**Implementation Examples**:
```javascript
// Basic beat timing
const timeAtBeat = link.getTimeAtBeat(4.0, 4.0);
console.log(`Beat 4 occurs at ${timeAtBeat}ms`);

// Calculate multiple beat timings
function calculateBeatTimings() {
    const beat1 = link.getTimeAtBeat(1, 4);
    const beat2 = link.getTimeAtBeat(2, 4);
    const beat4 = link.getTimeAtBeat(4, 4);
    
    console.log(`Beat intervals: ${beat2 - beat1}ms, ${beat4 - beat2}ms`);
    return { beat1, beat2, beat4 };
}

// Schedule events at specific beats
function scheduleEventAtBeat(beat, eventFunction) {
    const eventTime = link.getTimeAtBeat(beat, link.quantum);
    const currentTime = Date.now();
    const delay = eventTime - currentTime;
    
    if (delay > 0) {
        setTimeout(eventFunction, delay);
        console.log(`Event scheduled for beat ${beat} in ${delay}ms`);
    } else {
        console.log(`Beat ${beat} already passed`);
    }
}

// Beat-to-time conversion for different time signatures
function getTimeInTimeSignature(beat, timeSignature) {
    const [numerator, denominator] = timeSignature.split('/');
    const quantum = parseInt(numerator);
    
    return link.getTimeAtBeat(beat, quantum);
}

// Validate beat timing calculations
function validateBeatTiming(beat, quantum) {
    try {
        const time = link.getTimeAtBeat(beat, quantum);
        
        if (time > 0 && Number.isFinite(time)) {
            return { valid: true, time };
        } else {
            return { valid: false, error: 'Invalid time result' };
        }
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

// Calculate tempo from beat intervals
function calculateTempoFromBeats(beat1, beat2) {
    const time1 = link.getTimeAtBeat(beat1, link.quantum);
    const time2 = link.getTimeAtBeat(beat2, link.quantum);
    
    const timeDiff = time2 - time1;
    const beatDiff = beat2 - beat1;
    
    if (timeDiff > 0 && beatDiff > 0) {
        const msPerBeat = timeDiff / beatDiff;
        const bpm = (60 * 1000) / msPerBeat;
        return bpm;
    }
    
    return null;
}
```

#### `requestBeatAtStartPlayingTime(beat, quantum)`

Requests that a specific beat be mapped to the transport start time.

**Parameters**:
- `beat` (number): Target beat position
- `quantum` (number): Musical quantum for mapping

**Implementation Examples**:
```javascript
// Basic beat mapping
link.requestBeatAtStartPlayingTime(0, 4); // Map beat 0 to transport start

// Map different beats for different sections
function setupSongStructure() {
    link.requestBeatAtStartPlayingTime(0, 4);   // Intro starts at beat 0
    link.requestBeatAtStartPlayingTime(16, 4);  // Verse starts at beat 16
    link.requestBeatAtStartPlayingTime(32, 4);  // Chorus starts at beat 32
    link.requestBeatAtStartPlayingTime(48, 4);  // Bridge starts at beat 48
}

// Dynamic beat mapping based on user input
function mapBeatToUserPreference(userBeat) {
    const currentQuantum = link.quantum;
    link.requestBeatAtStartPlayingTime(userBeat, currentQuantum);
    console.log(`Beat ${userBeat} mapped to transport start`);
}

// Beat mapping with validation
function requestBeatMapping(beat, quantum) {
    if (beat >= 0 && quantum > 0) {
        link.requestBeatAtStartPlayingTime(beat, quantum);
        console.log(`Beat ${beat} mapped with quantum ${quantum}`);
        return true;
    } else {
        console.error('Invalid beat or quantum values');
        return false;
    }
}

// Conditional beat mapping
function mapBeatIfPlaying(beat, quantum) {
    if (link.isPlaying) {
        link.requestBeatAtStartPlayingTime(beat, quantum);
        console.log(`Beat ${beat} mapped while playing`);
    } else {
        console.log('Transport not playing - beat mapping deferred');
    }
}

// Beat mapping for different time signatures
function mapBeatInTimeSignature(beat, timeSignature) {
    const [numerator] = timeSignature.split('/');
    const quantum = parseInt(numerator);
    
    link.requestBeatAtStartPlayingTime(beat, quantum);
    console.log(`Beat ${beat} mapped in ${timeSignature} time`);
}
```

#### `setIsPlayingAndRequestBeatAtTime(isPlaying, timeMs, beat, quantum)`

Combines setting the play state and requesting a beat mapping at a specific time.

**Parameters**:
- `isPlaying` (boolean): Whether transport should be playing
- `timeMs` (number): Target time in milliseconds
- `beat` (number): Target beat position
- `quantum` (number): Musical quantum for mapping

**Implementation Examples**:
```javascript
// Basic combined play state and beat mapping
const futureTime = Date.now() + 2000;
link.setIsPlayingAndRequestBeatAtTime(true, futureTime, 8, 4);

// Scheduled transport start with beat mapping
function scheduleTransportStart(delayMs, startBeat) {
    const startTime = Date.now() + delayMs;
    link.setIsPlayingAndRequestBeatAtTime(true, startTime, startBeat, link.quantum);
    console.log(`Transport scheduled to start at beat ${startBeat} in ${delayMs}ms`);
}

// Transport stop with beat mapping
function scheduleTransportStop(delayMs, stopBeat) {
    const stopTime = Date.now() + delayMs;
    link.setIsPlayingAndRequestBeatAtTime(false, stopTime, stopBeat, link.quantum);
    console.log(`Transport scheduled to stop at beat ${stopBeat} in ${delayMs}ms`);
}

// Conditional transport control
function controlTransportConditionally(shouldPlay, targetBeat) {
    const currentTime = Date.now();
    const quantum = link.quantum;
    
    if (shouldPlay && !link.isPlaying) {
        link.setIsPlayingAndRequestBeatAtTime(true, currentTime, targetBeat, quantum);
        console.log(`Transport started at beat ${targetBeat}`);
    } else if (!shouldPlay && link.isPlaying) {
        link.setIsPlayingAndRequestBeatAtTime(false, currentTime, targetBeat, quantum);
        console.log(`Transport stopped at beat ${targetBeat}`);
    }
}

// Beat-synchronized transport control
function syncTransportToBeat(beat, shouldPlay) {
    const targetTime = link.getTimeAtBeat(beat, link.quantum);
    link.setIsPlayingAndRequestBeatAtTime(shouldPlay, targetTime, beat, link.quantum);
    
    const action = shouldPlay ? 'start' : 'stop';
    console.log(`Transport will ${action} at beat ${beat}`);
}

// Transport control with validation
function setTransportStateSafely(isPlaying, timeMs, beat, quantum) {
    if (timeMs > Date.now() && beat >= 0 && quantum > 0) {
        link.setIsPlayingAndRequestBeatAtTime(isPlaying, timeMs, beat, quantum);
        console.log(`Transport state set: playing=${isPlaying}, beat=${beat}`);
        return true;
    } else {
        console.error('Invalid parameters for transport control');
        return false;
    }
}
```

#### `getTimeForIsPlaying()`

Gets the current time information for transport start/stop operations.

**Returns**: `number` - Time in milliseconds

**Implementation Examples**:
```javascript
// Basic transport timing
const transportTime = link.getTimeForIsPlaying();
console.log(`Transport timing: ${transportTime}ms`);

// Monitor transport timing changes
function monitorTransportTiming() {
    const currentTime = link.getTimeForIsPlaying();
    const timeDiff = currentTime - Date.now();
    
    if (timeDiff > 0) {
        console.log(`Transport will change in ${timeDiff}ms`);
    } else {
        console.log('Transport timing is current');
    }
}

// Validate transport timing
function validateTransportTiming() {
    const transportTime = link.getTimeForIsPlaying();
    const currentTime = Date.now();
    
    if (transportTime >= currentTime) {
        console.log('Transport timing is valid');
        return true;
    } else {
        console.warn('Transport timing appears to be in the past');
        return false;
    }
}

// Calculate time until transport change
function getTimeUntilTransportChange() {
    const transportTime = link.getTimeForIsPlaying();
    const currentTime = Date.now();
    const timeUntilChange = transportTime - currentTime;
    
    return Math.max(0, timeUntilChange);
}

// Transport timing synchronization
function syncToTransportTiming() {
    const transportTime = link.getTimeForIsPlaying();
    const currentTime = Date.now();
    const syncDelay = transportTime - currentTime;
    
    if (syncDelay > 0) {
        setTimeout(() => {
            console.log('Synchronized with transport timing');
        }, syncDelay);
    }
}

// Transport timing for scheduling
function scheduleWithTransportTiming(callback) {
    const transportTime = link.getTimeForIsPlaying();
    const currentTime = Date.now();
    const delay = transportTime - currentTime;
    
    if (delay > 0) {
        setTimeout(callback, delay);
        console.log(`Callback scheduled for transport timing in ${delay}ms`);
    } else {
        callback(); // Execute immediately if timing has passed
    }
}
```

---

### Session Information Methods (Link 3.1.3)

#### `getSessionId()`

Gets a unique identifier for the current Link session.

**Returns**: `string` - Session identifier

**Implementation Examples**:
```javascript
// Basic session ID retrieval
const sessionId = link.getSessionId();
console.log(`Session ID: ${sessionId}`);

// Session ID validation
function validateSessionId() {
    const sessionId = link.getSessionId();
    
    if (sessionId && sessionId.length > 0) {
        console.log('Session ID is valid:', sessionId);
        return true;
    } else {
        console.error('Invalid session ID');
        return false;
    }
}

// Session ID monitoring
function monitorSessionChanges() {
    let lastSessionId = link.getSessionId();
    
    setInterval(() => {
        const currentSessionId = link.getSessionId();
        if (currentSessionId !== lastSessionId) {
            console.log('Session changed:', { from: lastSessionId, to: currentSessionId });
            lastSessionId = currentSessionId;
        }
    }, 1000);
}

// Session ID for logging
function logSessionActivity(activity) {
    const sessionId = link.getSessionId();
    const timestamp = new Date().toISOString();
    
    console.log(`[${timestamp}] Session ${sessionId}: ${activity}`);
}

// Session ID comparison
function isSameSession(sessionId1, sessionId2) {
    return sessionId1 === sessionId2;
}

// Session ID storage
function storeSessionInfo() {
    const sessionId = link.getSessionId();
    const sessionData = {
        id: sessionId,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
    };
    
    localStorage.setItem('linkSession', JSON.stringify(sessionData));
    console.log('Session info stored:', sessionData);
}
```

#### `getSessionInfo()`

Gets comprehensive information about the current Link session.

**Returns**: `object` with the following properties:
- `numPeers` (number): Number of connected peers
- `isEnabled` (boolean): Whether Link is enabled
- `isStartStopSyncEnabled` (boolean): Whether start/stop sync is enabled
- `currentTempo` (number): Current session tempo
- `currentBeat` (number): Current beat position
- `currentPhase` (number): Current phase
- `quantum` (number): Current quantum
- `isPlaying` (boolean): Current play state

**Implementation Examples**:
```javascript
// Basic session info retrieval
const sessionInfo = link.getSessionInfo();
console.log(`Active session with ${sessionInfo.numPeers} peers`);
console.log(`Tempo: ${sessionInfo.currentTempo} BPM`);

// Comprehensive session monitoring
function monitorSessionState() {
    const sessionInfo = link.getSessionInfo();
    
    console.log('=== Session Status ===');
    console.log(`Peers: ${sessionInfo.numPeers}`);
    console.log(`Enabled: ${sessionInfo.isEnabled}`);
    console.log(`Sync: ${sessionInfo.isStartStopSyncEnabled}`);
    console.log(`Tempo: ${sessionInfo.currentTempo} BPM`);
    console.log(`Beat: ${sessionInfo.currentBeat.toFixed(2)}`);
    console.log(`Phase: ${sessionInfo.currentPhase.toFixed(2)}`);
    console.log(`Quantum: ${sessionInfo.quantum}`);
    console.log(`Playing: ${sessionInfo.isPlaying}`);
}

// Session health check
function checkSessionHealth() {
    const sessionInfo = link.getSessionInfo();
    const health = {
        hasPeers: sessionInfo.numPeers > 0,
        isEnabled: sessionInfo.isEnabled,
        isSynced: sessionInfo.isStartStopSyncEnabled,
        hasValidTempo: sessionInfo.currentTempo > 0,
        isActive: sessionInfo.isPlaying
    };
    
    const healthScore = Object.values(health).filter(Boolean).length;
    console.log(`Session health: ${healthScore}/5`);
    
    return health;
}

// Peer connection monitoring
function monitorPeerConnections() {
    let lastPeerCount = 0;
    
    setInterval(() => {
        const sessionInfo = link.getSessionInfo();
        const currentPeerCount = sessionInfo.numPeers;
        
        if (currentPeerCount > lastPeerCount) {
            console.log(`New peer connected! Total: ${currentPeerCount}`);
        } else if (currentPeerCount < lastPeerCount) {
            console.log(`Peer disconnected. Total: ${currentPeerCount}`);
        }
        
        lastPeerCount = currentPeerCount;
    }, 1000);
}

// Session state validation
function validateSessionState() {
    const sessionInfo = link.getSessionInfo();
    const errors = [];
    
    if (!sessionInfo.isEnabled) errors.push('Link is disabled');
    if (sessionInfo.currentTempo <= 0) errors.push('Invalid tempo');
    if (sessionInfo.quantum <= 0) errors.push('Invalid quantum');
    
    if (errors.length > 0) {
        console.error('Session validation errors:', errors);
        return false;
    }
    
    return true;
}

// Session data export
function exportSessionData() {
    const sessionInfo = link.getSessionInfo();
    const exportData = {
        timestamp: Date.now(),
        sessionId: link.getSessionId(),
        ...sessionInfo
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `link-session-${Date.now()}.json`;
    link.click();
    
    console.log('Session data exported');
}
```

---

### Platform and System Methods (Link 3.1.3)

#### `getPlatformInfo()`

Gets information about the current platform and Link capabilities.

**Returns**: `object` with the following properties:
- `platform` (string): Platform identifier ('macos', 'linux', 'windows')
- `linkVersion` (string): Link library version
- `hasCustomClock` (boolean): Whether custom clock is available
- `supportsAdvancedTimeline` (boolean): Whether advanced timeline features are supported
- `supportsSessionManagement` (boolean): Whether session management features are supported

**Implementation Examples**:
```javascript
// Basic platform info retrieval
const platformInfo = link.getPlatformInfo();
console.log(`Running on ${platformInfo.platform} with Link ${platformInfo.linkVersion}`);

// Platform-specific optimizations
function applyPlatformOptimizations() {
    const platformInfo = link.getPlatformInfo();
    
    switch (platformInfo.platform) {
        case 'macos':
            console.log('Applying macOS-specific optimizations');
            enableMetalAcceleration();
            break;
        case 'linux':
            console.log('Applying Linux-specific optimizations');
            enableALSAOptimizations();
            break;
        case 'windows':
            console.log('Applying Windows-specific optimizations');
            enableWASAPIOptimizations();
            break;
        default:
            console.log('Unknown platform, using generic optimizations');
    }
}

// Feature capability checking
function checkFeatureSupport() {
    const platformInfo = link.getPlatformInfo();
    const capabilities = {
        advancedTimeline: platformInfo.supportsAdvancedTimeline,
        sessionManagement: platformInfo.supportsSessionManagement,
        customClock: platformInfo.hasCustomClock
    };
    
    console.log('Feature capabilities:', capabilities);
    
    if (capabilities.advancedTimeline) {
        console.log('Advanced timeline features available');
    }
    
    return capabilities;
}

// Version compatibility check
function checkVersionCompatibility() {
    const platformInfo = link.getPlatformInfo();
    const linkVersion = platformInfo.linkVersion;
    
    if (linkVersion.startsWith('3.1.')) {
        console.log('Link 3.1.x features fully supported');
        return 'full';
    } else if (linkVersion.startsWith('3.0.')) {
        console.log('Link 3.0.x features supported');
        return 'partial';
    } else {
        console.log('Legacy Link version - limited features');
        return 'limited';
    }
}

// Platform detection for UI
function updatePlatformUI() {
    const platformInfo = link.getPlatformInfo();
    
    // Update UI elements based on platform
    document.body.className = `platform-${platformInfo.platform}`;
    
    // Show/hide platform-specific features
    if (platformInfo.supportsAdvancedTimeline) {
        showAdvancedTimelineControls();
    }
    
    if (platformInfo.supportsSessionManagement) {
        showSessionManagementPanel();
    }
}

// Platform info logging
function logPlatformInfo() {
    const platformInfo = link.getPlatformInfo();
    
    console.log('=== Platform Information ===');
    console.log(`Platform: ${platformInfo.platform}`);
    console.log(`Link Version: ${platformInfo.linkVersion}`);
    console.log(`Custom Clock: ${platformInfo.hasCustomClock}`);
    console.log(`Advanced Timeline: ${platformInfo.supportsAdvancedTimeline}`);
    console.log(`Session Management: ${platformInfo.supportsSessionManagement}`);
}
```

#### `getNetworkStats()`

Gets network performance and connection statistics.

**Returns**: `object` with the following properties:
- `numPeers` (number): Number of connected peers
- `isEnabled` (boolean): Whether Link is enabled
- `sessionActive` (boolean): Whether session is active
- `networkLatency` (number): Network latency in milliseconds
- `connectionQuality` (string): Connection quality rating ('excellent', 'good', 'fair', 'poor', 'unknown')

**Implementation Examples**:
```javascript
// Basic network stats retrieval
const networkStats = link.getNetworkStats();
if (networkStats.sessionActive) {
    console.log(`Connected with ${networkStats.numPeers} peers`);
    console.log(`Connection quality: ${networkStats.connectionQuality}`);
}

// Network health monitoring
function monitorNetworkHealth() {
    const networkStats = link.getNetworkStats();
    
    const health = {
        hasPeers: networkStats.numPeers > 0,
        isActive: networkStats.sessionActive,
        lowLatency: networkStats.networkLatency < 50,
        goodQuality: ['excellent', 'good'].includes(networkStats.connectionQuality)
    };
    
    const healthScore = Object.values(health).filter(Boolean).length;
    console.log(`Network health: ${healthScore}/4`);
    
    return health;
}

// Connection quality monitoring
function monitorConnectionQuality() {
    let lastQuality = '';
    
    setInterval(() => {
        const networkStats = link.getNetworkStats();
        const currentQuality = networkStats.connectionQuality;
        
        if (currentQuality !== lastQuality) {
            console.log(`Connection quality changed: ${lastQuality} → ${currentQuality}`);
            
            if (currentQuality === 'poor') {
                console.warn('Poor connection quality detected');
                suggestNetworkOptimization();
            }
            
            lastQuality = currentQuality;
        }
    }, 5000);
}

// Latency monitoring
function monitorNetworkLatency() {
    const networkStats = link.getNetworkStats();
    const latency = networkStats.networkLatency;
    
    if (latency > 100) {
        console.warn(`High network latency: ${latency}ms`);
        return 'high';
    } else if (latency > 50) {
        console.log(`Moderate network latency: ${latency}ms`);
        return 'moderate';
    } else {
        console.log(`Low network latency: ${latency}ms`);
        return 'low';
    }
}

// Network optimization suggestions
function suggestNetworkOptimization() {
    const networkStats = link.getNetworkStats();
    
    if (networkStats.connectionQuality === 'poor') {
        console.log('Network optimization suggestions:');
        console.log('- Check firewall settings');
        console.log('- Verify multicast is enabled');
        console.log('- Reduce network congestion');
        console.log('- Check for interference');
    }
}

// Network performance logging
function logNetworkPerformance() {
    const networkStats = link.getNetworkStats();
    
    console.log('=== Network Performance ===');
    console.log(`Peers: ${networkStats.numPeers}`);
    console.log(`Enabled: ${networkStats.isEnabled}`);
    console.log(`Session Active: ${networkStats.sessionActive}`);
    console.log(`Latency: ${networkStats.networkLatency}ms`);
    console.log(`Quality: ${networkStats.connectionQuality}`);
}

// Auto-adjust based on network conditions
function autoAdjustForNetwork() {
    const networkStats = link.getNetworkStats();
    
    if (networkStats.connectionQuality === 'poor') {
        // Reduce update frequency for poor connections
        link.startUpdate(1000); // 1 second updates
        console.log('Reduced update frequency due to poor network');
    } else if (networkStats.connectionQuality === 'excellent') {
        // Increase update frequency for excellent connections
        link.startUpdate(16); // 60fps updates
        console.log('Increased update frequency due to excellent network');
    }
}
```

---

## Events

The module supports event-based updates through the `startUpdate` callback mechanism.

### Update Event

**Event**: Update callback  
**Frequency**: Based on `startUpdate` interval  
**Data**: Beat, phase, BPM, and play state

**Example**:
```javascript
link.startUpdate(60, (beat, phase, bpm, playState) => {
    // Handle real-time updates
    updateVisualization(beat, phase);
    updateTempoDisplay(bpm);
    updateTransportState(playState);
});
```

---

## Advanced Features

### Timeline Management

The advanced timeline features provide precise control over musical timing and synchronization:

- **Beat-to-Time Mapping**: Convert musical beats to precise timestamps
- **Quantized Beat Requests**: Map specific beats to transport events
- **Transport Synchronization**: Coordinate play state with beat positioning
- **Tempo-Aware Calculations**: All timing calculations respect current tempo

### Session Management

Comprehensive session monitoring and control:

- **Peer Discovery**: Monitor connected applications
- **Session State**: Track tempo, beat, and phase across the network
- **Transport Control**: Synchronize start/stop across applications
- **Session Identification**: Unique session tracking

### Platform Optimization

Automatic platform detection and optimization:

- **Native Performance**: Platform-specific optimizations
- **Feature Detection**: Automatic capability discovery
- **Version Compatibility**: Link 3.1.3 feature support
- **Cross-Platform**: Consistent API across operating systems

---

## Error Handling

The module includes robust error handling for various scenarios:

### Constructor Errors

```javascript
try {
    const link = new abletonlink(120, 4, true);
} catch (error) {
    console.error('Failed to create Link instance:', error.message);
}
```

### Method Errors

```javascript
try {
    const timeAtBeat = link.getTimeAtBeat(4, 4);
} catch (error) {
    console.error('Timeline calculation failed:', error.message);
}
```

### Edge Cases

The module gracefully handles edge cases:
- **Negative values**: Handled with appropriate defaults
- **Zero quantum**: Gracefully processed
- **Extreme values**: Supported within reasonable limits
- **Invalid parameters**: Clear error messages

---

## Performance Considerations

### Update Frequency

- **High frequency** (16-60ms): Real-time applications, audio processing
- **Medium frequency** (100-500ms): UI updates, visualization
- **Low frequency** (1000ms+): Background monitoring, logging

### Memory Management

- **Native module**: Efficient C++ implementation
- **Minimal overhead**: Lightweight JavaScript wrapper
- **Garbage collection**: Automatic cleanup of temporary objects

### Network Performance

- **Peer discovery**: Efficient multicast-based discovery
- **Data synchronization**: Optimized for real-time updates
- **Connection quality**: Automatic quality monitoring

---

## Examples

### Basic Synchronization

```javascript
const abletonlink = require('@mirage-xr/node-abletonlink');

const link = new abletonlink(120, 4, true);

link.startUpdate(60, (beat, phase, bpm) => {
    console.log(`Beat: ${beat.toFixed(2)}, Phase: ${phase.toFixed(2)}, BPM: ${bpm.toFixed(1)}`);
});
```

### Advanced Timeline Control

```javascript
const link = new abletonlink(128, 4, true);

// Calculate precise timing for musical events
const beat1 = link.getTimeAtBeat(1, 4);
const beat2 = link.getTimeAtBeat(2, 4);
const beat4 = link.getTimeAtBeat(4, 4);

console.log(`Beat intervals: ${beat2 - beat1}ms, ${beat4 - beat2}ms`);

// Request specific beat mapping
link.requestBeatAtStartPlayingTime(0, 4);
```

### Session Monitoring

```javascript
const link = new abletonlink(120, 4, true);

// Monitor session state
setInterval(() => {
    const sessionInfo = link.getSessionInfo();
    const networkStats = link.getNetworkStats();
    
    console.log(`Peers: ${sessionInfo.numPeers}, Tempo: ${sessionInfo.currentTempo}`);
    console.log(`Connection: ${networkStats.connectionQuality}`);
}, 1000);
```

### Real-time Visualization

```javascript
const link = new abletonlink(120, 4, true);

link.startUpdate(16, (beat, phase, bpm) => {
    // Update visual elements
    updateBeatIndicator(beat);
    updatePhaseMeter(phase);
    updateTempoDisplay(bpm);
    
    // Trigger visual effects
    if (Math.floor(beat) !== Math.floor(link.beat)) {
        triggerBeatAnimation();
    }
});
```

---

## TypeScript Support

The module includes complete TypeScript definitions in `index.d.ts`:

```typescript
import abletonlink from '@mirage-xr/node-abletonlink';

const link: abletonlink = new abletonlink(120, 4, true);

// Full type safety and IntelliSense support
const sessionInfo = link.getSessionInfo();
console.log(sessionInfo.numPeers); // TypeScript knows this is a number
```

### Type Definitions

All methods and properties include proper TypeScript types:
- **Constructor**: `new abletonlink(bpm: number, quantum: number, enable: boolean)`
- **Properties**: Properly typed getters and setters
- **Methods**: Full parameter and return type definitions
- **Objects**: Structured types for complex return values

---

## Compatibility

**Node.js**: 18.13.0+ (recommended)  
**Platforms**: macOS 10.14+, Linux (glibc distros), Windows 10+

---

## Troubleshooting

- **Build fails** → verify `node-gyp` prerequisites and compiler toolchain  
- **No peers found** → check firewall/multicast; Ableton Link uses mDNS/Bonjour  
- **High latency** → inspect `getNetworkStats()`; reduce network congestion  
- **Stale peers** → ensure your app prunes peers that have not been seen within a timeout

---

## Credits & Attribution

This project stands on the shoulders of the original work:

- **Original Project**: [2bbb/node-abletonlink](https://github.com/2bbb/node-abletonlink)  
  - **Author**: ISHII 2bit (bufferRenaiss co., ltd.) — ishii[at]buffer-renaiss.com

**Special Thanks (from the original project):**
- [Hlöðver Sigurðsson (hlolli)](https://github.com/hlolli) — #3  
- [Yuichi Yogo (yuichkun)](https://github.com/yuichkun) — #10  
- [Jakob Miland](https://github.com/saebekassebil) — #11  
- [Alessandro Oniarti](https://github.com/Onni97) — #11  
- [Théis Bazin](https://github.com/tbazin) — #12, #15  
- [Jeffrey Kog](https://github.com/jeffreykog) — #16

**Dependencies (original lineage):**
- [ableton/link](https://github.com/ableton/link)  
  - [chriskohlhoff/asio](https://github.com/chriskohlhoff/asio)  
  - [philsquared/Catch](https://github.com/philsquared/Catch)

**This fork**: Modernization, TypeScript, docs, and Link 3.1.3 features by **Veacks**.  
Please report issues and PRs here: https://github.com/veacks/node-abletonlink.

> Naming note: To avoid confusion with the original `abletonlink` package, this fork is published as **`node-abletonlink`**.

---

## License

MIT License.  
Per MIT requirements, this fork **retains the original copyright
and license notice** and adds its own.

```
Copyright (c) 2016–2019 ISHII 2bit [bufferRenaiss co., ltd.]
Copyright (c) 2025 Veacks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Donations

If this software helps you and you’re feeling generous, consider supporting the **original author**:

- **Bitcoin**: `17AbtW73aydfYH3epP8T3UDmmDCcXSGcaf`

(You can also support this fork by opening issues, pull requests, or starring the repo — thank you!)
