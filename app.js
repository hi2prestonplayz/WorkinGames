const STORAGE_KEY = "browser-arcade-high-scores-v1";
const SETTINGS_KEY = "browser-arcade-settings-v1";
const SPACE_UPGRADE_BREAK_COOLDOWN_MS = 25000;
const BUILD_VERSION = "20260410k";
const NEW_GAME_IDS = ["dash", "glow", "ring", "laser", "steps", "storm", "panic", "swap"];
const DIFFICULTY_PRESETS = {
  chill: {
    label: "Chill",
    blurb: "The most relaxed setting with extra recovery room and slower pacing.",
    snakeBaseTick: 148,
    snakeMinTick: 84,
    snakeRamp: 4,
    breakoutPaddleWidth: 138,
    breakoutBallSpeed: 3.4,
    breakoutLives: 5,
    flappyGap: 186,
    flappySpawnFrames: 118,
    flappyPipeSpeed: 2.9,
    flappyGravity: 0.31,
    flappyLift: 6,
    runnerRows: 8,
    runnerBaseTick: 540,
    runnerMinTick: 320,
    runnerRamp: 4,
    runnerObstacleChance: 0.34,
    runnerCoinChance: 0.72,
    reactionMinDelay: 1900,
    reactionDelayRange: 2400,
    typingPool: "easy",
  },
  easy: {
    label: "Easy",
    blurb: "Slower speeds, larger safe windows, and gentler obstacle pressure.",
    snakeBaseTick: 132,
    snakeMinTick: 72,
    snakeRamp: 5,
    breakoutPaddleWidth: 124,
    breakoutBallSpeed: 3.8,
    breakoutLives: 4,
    flappyGap: 170,
    flappySpawnFrames: 108,
    flappyPipeSpeed: 3.2,
    flappyGravity: 0.34,
    flappyLift: 6.2,
    runnerRows: 8,
    runnerBaseTick: 500,
    runnerMinTick: 290,
    runnerRamp: 5,
    runnerObstacleChance: 0.4,
    runnerCoinChance: 0.65,
    reactionMinDelay: 1700,
    reactionDelayRange: 2100,
    typingPool: "easy",
  },
  normal: {
    label: "Normal",
    blurb: "Balanced arcade pacing with fair but active pressure.",
    snakeBaseTick: 112,
    snakeMinTick: 58,
    snakeRamp: 6,
    breakoutPaddleWidth: 100,
    breakoutBallSpeed: 4.2,
    breakoutLives: 3,
    flappyGap: 146,
    flappySpawnFrames: 95,
    flappyPipeSpeed: 3.8,
    flappyGravity: 0.38,
    flappyLift: 6.6,
    runnerRows: 8,
    runnerBaseTick: 430,
    runnerMinTick: 230,
    runnerRamp: 7,
    runnerObstacleChance: 0.52,
    runnerCoinChance: 0.5,
    reactionMinDelay: 1500,
    reactionDelayRange: 2500,
    typingPool: "normal",
  },
  hard: {
    label: "Hard",
    blurb: "Faster starts, tighter gaps, and less room to recover.",
    snakeBaseTick: 92,
    snakeMinTick: 48,
    snakeRamp: 7,
    breakoutPaddleWidth: 88,
    breakoutBallSpeed: 4.8,
    breakoutLives: 2,
    flappyGap: 128,
    flappySpawnFrames: 84,
    flappyPipeSpeed: 4.4,
    flappyGravity: 0.42,
    flappyLift: 7,
    runnerRows: 9,
    runnerBaseTick: 370,
    runnerMinTick: 190,
    runnerRamp: 9,
    runnerObstacleChance: 0.63,
    runnerCoinChance: 0.38,
    reactionMinDelay: 1200,
    reactionDelayRange: 1800,
    typingPool: "hard",
  },
  chaos: {
    label: "Chaos",
    blurb: "An extra-spicy mode with faster starts, tighter timing, and harsher pressure.",
    snakeBaseTick: 78,
    snakeMinTick: 40,
    snakeRamp: 8,
    breakoutPaddleWidth: 78,
    breakoutBallSpeed: 5.3,
    breakoutLives: 2,
    flappyGap: 116,
    flappySpawnFrames: 74,
    flappyPipeSpeed: 4.9,
    flappyGravity: 0.46,
    flappyLift: 7.2,
    runnerRows: 9,
    runnerBaseTick: 340,
    runnerMinTick: 170,
    runnerRamp: 10,
    runnerObstacleChance: 0.7,
    runnerCoinChance: 0.32,
    reactionMinDelay: 1000,
    reactionDelayRange: 1400,
    typingPool: "hard",
  },
};

const GAME_CATEGORIES = [
  { label: "Action", ids: ["space", "tower", "cannon", "knife", "lander", "orb", "tunnel", "hopper", "dodge", "snout", "maze", "pong", "flappy", "dash", "catch", "sweep", "rhythm", "jetpack", "storm"] },
  { label: "Arcade", ids: ["snake", "breakout", "blockdrop", "hoop", "plinko", "stacker", "whack", "reaction", "typing", "clicker", "rps", "bubble", "slots", "target", "balance", "spin", "gates", "glow", "ring", "panic"] },
  { label: "Puzzle", ids: ["memory", "merge", "vault", "cups", "marble", "flood", "lights", "crates", "mines", "hangman", "scramble", "code", "math", "dig", "recall", "trail", "slide", "pipes", "laser", "steps", "swap"] },
];

const els = {
  gameList: document.querySelector("#gameList"),
  gameDescription: document.querySelector("#gameDescription"),
  gameControls: document.querySelector("#gameControls"),
  scoreValue: document.querySelector("#scoreValue"),
  bestValue: document.querySelector("#bestValue"),
  levelValue: document.querySelector("#levelValue"),
  heroTitle: document.querySelector("#heroTitle"),
  heroSubtitle: document.querySelector("#heroSubtitle"),
  startButton: document.querySelector("#startButton"),
  resetButton: document.querySelector("#resetButton"),
  soundToggleButton: document.querySelector("#soundToggleButton"),
  stageTitle: document.querySelector("#stageTitle"),
  statusPill: document.querySelector("#statusPill"),
  gameStage: document.querySelector("#gameStage"),
  difficultySelect: document.querySelector("#difficultySelect"),
  startDelaySelect: document.querySelector("#startDelaySelect"),
  quickDifficultySelect: document.querySelector("#quickDifficultySelect"),
  difficultyHint: document.querySelector("#difficultyHint"),
  shareLink: document.querySelector("#shareLink"),
  copyLinkButton: document.querySelector("#copyLinkButton"),
  shareNote: document.querySelector("#shareNote"),
  buildVersion: document.querySelector("#buildVersion"),
  buildUpdatedAt: document.querySelector("#buildUpdatedAt"),
};

const highScores = loadHighScores();
const persistedSettings = loadSettings();

const appState = {
  selectedGameId: "snake",
  activeGame: null,
  score: 0,
  best: 0,
  levelText: "1",
  difficulty: persistedSettings.difficulty,
  startCountdownSeconds: persistedSettings.startCountdownSeconds,
  collapsedCategories: persistedSettings.collapsedCategories,
  audioMuted: persistedSettings.audioMuted,
  countdownTimerId: null,
  countdownTargetGameId: null,
  countdownRemaining: 0,
  autoResetTimerId: null,
};

const audioState = {
  supported: Boolean(window.AudioContext || window.webkitAudioContext),
  unlocked: false,
  context: null,
  masterGain: null,
  musicGain: null,
  sfxGain: null,
  themeTimerId: null,
  currentTheme: null,
  currentGameId: null,
  stepIndex: 0,
  lastScoreSoundAt: 0,
  lastStatusSoundAt: 0,
  lastStatusSignature: "",
  customTracks: {},
};

const games = {
  snake: createSnakeGame(),
  flappy: createFlappyGame(),
  dash: createDashCubeGame(),
  breakout: createBreakoutGame(),
  target: createTargetTapGame(),
  catch: createCatchCrazeGame(),
  balance: createBalanceBeamGame(),
  spin: createSpinSafeGame(),
  sweep: createStarSweepGame(),
  math: createMathBlitzGame(),
  dig: createTreasureDigGame(),
  recall: createRouteRecallGame(),
  rhythm: createRhythmRowsGame(),
  trail: createTileTrailGame(),
  jetpack: createJetpackGapGame(),
  gates: createColorGatesGame(),
  slide: createSlideQuestGame(),
  pipes: createPipeTwistGame(),
  blockdrop: createBlockDropGame(),
  cannon: createCannonLaunchGame(),
  knife: createKnifeFlipGame(),
  lander: createRocketLanderGame(),
  orb: createOrbDodgeGame(),
  tunnel: createTunnelGlideGame(),
  hoop: createHoopShotGame(),
  plinko: createPlinkoDropGame(),
  pong: createPongGame(),
  hopper: createLaneHopperGame(),
  dodge: createDodgeDriftGame(),
  space: createSpaceBlasterGame(),
  tower: createTowerTacticsGame(),
  stacker: createStackerGame(),
  vault: createNumberVaultGame(),
  cups: createTreasureCupsGame(),
  marble: createMarbleTiltGame(),
  flood: createColorFloodGame(),
  lights: createLightsOutGame(),
  crates: createCrateQuestGame(),
  snout: createSnoutScoutGame(),
  maze: createMazeEscapeGame(),
  memory: createMemoryGame(),
  merge: createMergeGame(),
  whack: createWhackGame(),
  clicker: createCosmicClickerGame(),
  rps: createRpsRushGame(),
  simon: createSimonGame(),
  hangman: createHangmanGame(),
  mines: createMinesGame(),
  reaction: createReactionGame(),
  typing: createTypingRushGame(),
  bubble: createBubblePopGame(),
  slots: createLuckySlotsGame(),
  scramble: createWordScrambleGame(),
  code: createCodeBreakerGame(),
  glow: createGlowGridGame(),
  ring: createRingStopGame(),
  laser: createLaserLockGame(),
  steps: createSafeStepsGame(),
  storm: createStormRiderGame(),
  panic: createPatternPanicGame(),
  swap: createSwapSortGame(),
};

boot();

function boot() {
  updateSettingsUi();
  updateBuildInfo();
  updateShareUi();
  renderGameList();
  bindEvents();
  selectGame(appState.selectedGameId);
}

function bindEvents() {
  els.startButton.addEventListener("click", () => {
    unlockAudio();
    playUiSound("start");
    beginStartCountdown();
  });

  els.resetButton.addEventListener("click", () => {
    unlockAudio();
    playUiSound("reset");
    clearAutoReset();
    cancelStartCountdown();
    appState.activeGame?.reset();
  });

  els.soundToggleButton?.addEventListener("click", () => {
    toggleAudio();
  });

  els.difficultySelect?.addEventListener("change", () => {
    unlockAudio();
    changeDifficulty(els.difficultySelect.value);
  });

  els.startDelaySelect?.addEventListener("change", () => {
    unlockAudio();
    changeStartDelay(els.startDelaySelect.value);
  });

  els.quickDifficultySelect?.addEventListener("change", () => {
    unlockAudio();
    changeDifficulty(els.quickDifficultySelect.value);
  });

  els.copyLinkButton?.addEventListener("click", async () => {
    const link = els.shareLink?.value || window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      els.copyLinkButton.textContent = "Copied";
      setStatus("Share link copied");
      window.setTimeout(() => {
        if (els.copyLinkButton) els.copyLinkButton.textContent = "Copy link";
      }, 1600);
    } catch (error) {
      setStatus("Could not copy link");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
      event.preventDefault();
    }
    appState.activeGame?.onKeyDown?.(event);
  });

  window.addEventListener("keyup", (event) => {
    appState.activeGame?.onKeyUp?.(event);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopGameTheme();
      return;
    }
    if (!appState.audioMuted) {
      syncGameTheme(true);
    }
  });
}

function renderGameList() {
  const renderGameButton = (game) => `
    <button class="game-select ${game.id === appState.selectedGameId ? "active" : ""}" data-game-id="${game.id}">
      <span class="game-select-topline">
        <strong>${escapeHtml(game.title)}</strong>
        ${NEW_GAME_IDS.includes(game.id) ? '<span class="game-badge">NEW</span>' : ""}
      </span>
      <span class="muted">${escapeHtml(game.tagline)}</span>
    </button>
  `;

  const newGamesMarkup = NEW_GAME_IDS.map((id) => games[id])
    .filter(Boolean)
    .map((game) => renderGameButton(game))
    .join("");

  const categorizedMarkup = GAME_CATEGORIES.map((group) => {
    const isCollapsed = Boolean(appState.collapsedCategories[group.label]);
    const buttons = group.ids
      .map((id) => games[id])
      .filter(Boolean)
      .map((game) => renderGameButton(game))
      .join("");

    return `
      <section class="game-category ${isCollapsed ? "collapsed" : ""}">
        <button class="game-category-toggle" type="button" data-category-toggle="${escapeHtml(group.label)}" aria-expanded="${String(!isCollapsed)}">
          <span class="game-category-label">${escapeHtml(group.label)}</span>
          <span class="game-category-icon">${isCollapsed ? "+" : "-"}</span>
        </button>
        <div class="game-category-body">
          ${buttons}
        </div>
      </section>
    `;
  }).join("");

  const uncategorizedMarkup = Object.values(games)
    .filter((game) => !GAME_CATEGORIES.some((group) => group.ids.includes(game.id)))
    .map((game) => renderGameButton(game))
    .join("");

  els.gameList.innerHTML =
    (newGamesMarkup
      ? `
        <section class="game-category">
          <div class="game-category-static">
            <span class="game-category-label">New</span>
          </div>
          <div class="game-category-body">
            ${newGamesMarkup}
          </div>
        </section>
      `
      : "") +
    categorizedMarkup +
    (uncategorizedMarkup
      ? `<section class="game-category"><p class="game-category-label">More</p>${uncategorizedMarkup}</section>`
      : "");

  els.gameList.querySelectorAll("[data-game-id]").forEach((button) => {
    button.addEventListener("click", () => {
      unlockAudio();
      playUiSound("select");
      selectGame(button.dataset.gameId);
    });
  });
  els.gameList.querySelectorAll("[data-category-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleCategory(button.dataset.categoryToggle));
  });
}

function selectGame(gameId) {
  const nextGame = games[gameId];
  if (!nextGame) return;

  clearAutoReset();
  cancelStartCountdown();
  appState.activeGame?.destroy?.();
  appState.selectedGameId = gameId;
  appState.activeGame = nextGame;
  appState.score = 0;
  appState.best = Number(highScores[gameId] || 0);

  renderGameList();
  els.gameDescription.textContent = nextGame.description;
  els.gameControls.textContent = nextGame.controls;
  els.heroTitle.textContent = nextGame.title;
  els.heroSubtitle.textContent = nextGame.subtitle;
  els.stageTitle.textContent = nextGame.title;
  setScore(0);
  setBest(appState.best);
  refreshLevel();
  setStatus("Ready");
  nextGame.mount(els.gameStage);
  nextGame.applySettings?.();
  refreshLevel();
  syncGameTheme(true);
}

function setScore(value) {
  const previous = appState.score;
  appState.score = value;
  els.scoreValue.textContent = String(value);
  if (value > previous) {
    const now = performance.now();
    if (now - audioState.lastScoreSoundAt > 90) {
      audioState.lastScoreSoundAt = now;
      playUiSound("score", { delta: value - previous });
    }
  }
  if (value > appState.best) {
    appState.best = value;
    highScores[appState.selectedGameId] = value;
    persistHighScores();
    setBest(value);
  }
  refreshLevel();
}

function setBest(value) {
  els.bestValue.textContent = String(value);
}

function setStatus(text) {
  els.statusPill.textContent = text;
  playStatusSound(text);
}

function clearAutoReset() {
  if (appState.autoResetTimerId) {
    clearTimeout(appState.autoResetTimerId);
  }
  appState.autoResetTimerId = null;
}

function scheduleAutoReset(delay = 1400) {
  clearAutoReset();
  appState.autoResetTimerId = window.setTimeout(() => {
    appState.autoResetTimerId = null;
    appState.activeGame?.reset?.();
  }, delay);
}

function setLevel(value) {
  appState.levelText = String(value);
  if (els.levelValue) {
    els.levelValue.textContent = appState.levelText;
  }
}

function refreshLevel() {
  const game = appState.activeGame;
  if (!game) {
    setLevel("1");
    return;
  }
  if (game.noLevels) {
    setLevel("Arcade");
    return;
  }
  if (typeof game.getLevelText === "function") {
    setLevel(game.getLevelText());
    return;
  }
  if (game.levelStep) {
    setLevel(1 + Math.floor(appState.score / game.levelStep));
    return;
  }
  setLevel("1");
}

function updateStartButtonLabel() {
  if (!els.startButton) return;
  if (appState.countdownTimerId) {
    els.startButton.textContent = `Starting in ${appState.countdownRemaining}`;
    return;
  }
  els.startButton.textContent = "Start game";
}

function cancelStartCountdown() {
  if (appState.countdownTimerId) {
    clearInterval(appState.countdownTimerId);
  }
  appState.countdownTimerId = null;
  appState.countdownTargetGameId = null;
  appState.countdownRemaining = 0;
  updateStartButtonLabel();
}

function beginStartCountdown() {
  if (!appState.activeGame || appState.countdownTimerId) return;
  if (appState.startCountdownSeconds <= 0) {
    syncGameTheme(true);
    appState.activeGame.start();
    return;
  }
  appState.countdownTargetGameId = appState.selectedGameId;
  appState.countdownRemaining = appState.startCountdownSeconds;
  setStatus(`Starting in ${appState.countdownRemaining}`);
  playUiSound("countdown", { value: appState.countdownRemaining });
  updateStartButtonLabel();

  appState.countdownTimerId = window.setInterval(() => {
    appState.countdownRemaining -= 1;

    if (appState.countdownRemaining <= 0) {
      const targetGameId = appState.countdownTargetGameId;
      cancelStartCountdown();
      if (targetGameId === appState.selectedGameId) {
        syncGameTheme(true);
        appState.activeGame?.start();
      }
      return;
    }

    setStatus(`Starting in ${appState.countdownRemaining}`);
    playUiSound("countdown", { value: appState.countdownRemaining });
    updateStartButtonLabel();
  }, 1000);
}

function loadHighScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function persistHighScores() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highScores));
}

function normalizeDifficulty(value) {
  return DIFFICULTY_PRESETS[value] ? value : "normal";
}

function normalizeStartDelay(value) {
  const parsed = Number(value);
  return [0, 1, 3, 5, 10].includes(parsed) ? parsed : 3;
}

function changeDifficulty(value) {
  clearAutoReset();
  cancelStartCountdown();
  appState.difficulty = normalizeDifficulty(value);
  persistSettings();
  updateSettingsUi();
  appState.activeGame?.reset?.();
  setStatus(`${getDifficultyPreset().label} mode ready`);
}

function changeStartDelay(value) {
  cancelStartCountdown();
  appState.startCountdownSeconds = normalizeStartDelay(value);
  persistSettings();
  updateSettingsUi();
  setStatus(
    appState.startCountdownSeconds > 0
      ? `Start timer set to ${appState.startCountdownSeconds} second${appState.startCountdownSeconds === 1 ? "" : "s"}`
      : "Start timer turned off",
  );
}

function toggleCategory(label) {
  appState.collapsedCategories = {
    ...appState.collapsedCategories,
    [label]: !appState.collapsedCategories[label],
  };
  persistSettings();
  renderGameList();
}

function getDifficultyPreset() {
  return DIFFICULTY_PRESETS[appState.difficulty] || DIFFICULTY_PRESETS.normal;
}

function getDifficultyMode() {
  if (appState.difficulty === "chill") return "easy";
  if (appState.difficulty === "chaos") return "hard";
  return appState.difficulty;
}

function hashString(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let next = Math.imul(state ^ (state >>> 15), 1 | state);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function ensureAudioContext() {
  if (!audioState.supported) return null;
  if (!audioState.context) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioState.context = new AudioCtor();
    audioState.masterGain = audioState.context.createGain();
    audioState.musicGain = audioState.context.createGain();
    audioState.sfxGain = audioState.context.createGain();
    audioState.masterGain.gain.value = appState.audioMuted ? 0 : 1;
    audioState.musicGain.gain.value = 0.18;
    audioState.sfxGain.gain.value = 0.24;
    audioState.musicGain.connect(audioState.masterGain);
    audioState.sfxGain.connect(audioState.masterGain);
    audioState.masterGain.connect(audioState.context.destination);
  }
  return audioState.context;
}

function playTone(frequency, duration, options = {}) {
  if (!audioState.unlocked || appState.audioMuted) return;
  const context = ensureAudioContext();
  if (!context) return;
  const time = (options.time ?? context.currentTime) + 0.01;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = options.type || "triangle";
  oscillator.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(options.gain || 0.05, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(gain);
  gain.connect(options.destination || audioState.sfxGain);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.02);
}

function playChord(notes, duration, options = {}) {
  notes.forEach((note, index) => {
    playTone(midiToFrequency(note), duration, {
      ...options,
      time: (options.time ?? ensureAudioContext()?.currentTime ?? 0) + index * (options.stagger || 0),
      gain: (options.gain || 0.04) / Math.max(1, notes.length * 0.8),
    });
  });
}

function getGameCategoryIndex(gameId) {
  const index = GAME_CATEGORIES.findIndex((group) => group.ids.includes(gameId));
  return index < 0 ? 1 : index;
}

function createThemeForGame(gameId) {
  const seed = hashString(gameId);
  const random = createSeededRandom(seed);
  const categoryIndex = getGameCategoryIndex(gameId);
  const scales = [
    [0, 2, 4, 5, 7, 9, 11],
    [0, 2, 3, 5, 7, 8, 10],
    [0, 3, 5, 7, 10],
    [0, 2, 5, 7, 9],
  ];
  const scale = scales[(seed + categoryIndex) % scales.length];
  const root = 42 + (seed % 10);
  const leadWave = ["triangle", "square", "sawtooth", "triangle"][(seed >> 3) % 4];
  const bassWave = ["sine", "triangle", "square"][seed % 3];
  const stepMs = Math.max(120, 182 - categoryIndex * 12 - (seed % 18));
  const lead = Array.from({ length: 16 }, (_, index) => {
    if (random() < (index % 4 === 0 ? 0.08 : 0.22)) return null;
    return root + 12 + scale[Math.floor(random() * scale.length)];
  });
  const bass = Array.from({ length: 8 }, (_, index) => root - 12 + scale[(index + Math.floor(random() * 2)) % scale.length]);
  const accent = Array.from({ length: 16 }, (_, index) =>
    index % 4 === 0 || (categoryIndex === 0 && index % 8 === 6) ? root + 24 + scale[(index + 2) % scale.length] : null,
  );
  return { stepMs, leadWave, bassWave, lead, bass, accent };
}

function stopGameTheme() {
  if (audioState.themeTimerId) {
    clearInterval(audioState.themeTimerId);
  }
  if (audioState.currentGameId && audioState.customTracks[audioState.currentGameId]) {
    audioState.customTracks[audioState.currentGameId].element.pause();
  }
  audioState.themeTimerId = null;
  audioState.currentTheme = null;
  audioState.currentGameId = null;
}

function getCustomTrack(gameId) {
  return audioState.customTracks[gameId] || null;
}

function revokeCustomTrack(gameId) {
  const track = getCustomTrack(gameId);
  if (!track) return;
  track.element.pause();
  track.element.removeAttribute("src");
  track.element.load();
  try {
    track.source.disconnect();
  } catch (error) {
    // Ignore disconnect failures from already-detached media sources.
  }
  if (track.url?.startsWith("blob:")) {
    URL.revokeObjectURL(track.url);
  }
  delete audioState.customTracks[gameId];
  if (audioState.currentGameId === gameId) {
    audioState.currentGameId = null;
  }
}

function setCustomTrack(gameId, file) {
  if (!file || !audioState.supported) return null;
  const context = ensureAudioContext();
  if (!context) return null;
  revokeCustomTrack(gameId);
  const url = URL.createObjectURL(file);
  const element = new Audio(url);
  element.loop = true;
  element.preload = "auto";
  const source = context.createMediaElementSource(element);
  source.connect(audioState.musicGain);
  const track = {
    name: file.name,
    url,
    element,
    source,
  };
  audioState.customTracks[gameId] = track;
  return track;
}

function clearCustomTrack(gameId) {
  revokeCustomTrack(gameId);
  if (!appState.audioMuted && appState.selectedGameId === gameId) {
    syncGameTheme(true);
  }
}

function playCustomTrack(gameId, force = false) {
  const track = getCustomTrack(gameId);
  if (!track) return false;
  if (!force && audioState.currentGameId === gameId && !track.element.paused) return true;
  stopGameTheme();
  audioState.currentGameId = gameId;
  if (force) {
    try {
      track.element.currentTime = 0;
    } catch (error) {
      // Ignore seek failures on not-yet-loaded media.
    }
  }
  track.element.play().catch(() => {});
  return true;
}

function playThemeStep() {
  if (!audioState.unlocked || appState.audioMuted || !audioState.currentTheme) return;
  const context = ensureAudioContext();
  if (!context) return;
  const theme = audioState.currentTheme;
  const step = audioState.stepIndex;
  const time = context.currentTime + 0.03;
  const leadNote = theme.lead[step % theme.lead.length];
  const accentNote = theme.accent[step % theme.accent.length];
  const bassNote = step % 2 === 0 ? theme.bass[Math.floor(step / 2) % theme.bass.length] : null;
  if (bassNote != null) {
    playTone(midiToFrequency(bassNote), 0.28, {
      destination: audioState.musicGain,
      type: theme.bassWave,
      gain: 0.045,
      time,
    });
  }
  if (leadNote != null) {
    playTone(midiToFrequency(leadNote), 0.18, {
      destination: audioState.musicGain,
      type: theme.leadWave,
      gain: 0.035,
      time,
    });
  }
  if (accentNote != null) {
    playTone(midiToFrequency(accentNote), 0.08, {
      destination: audioState.musicGain,
      type: "square",
      gain: 0.018,
      time,
    });
  }
  audioState.stepIndex += 1;
}

function syncGameTheme(force = false) {
  if (!audioState.unlocked || appState.audioMuted || !audioState.supported) return;
  const context = ensureAudioContext();
  if (!context || !appState.selectedGameId) return;
  if (playCustomTrack(appState.selectedGameId, force)) return;
  if (!force && audioState.currentGameId === appState.selectedGameId && audioState.themeTimerId) return;
  stopGameTheme();
  audioState.currentGameId = appState.selectedGameId;
  audioState.currentTheme = createThemeForGame(appState.selectedGameId);
  audioState.stepIndex = 0;
  playThemeStep();
  audioState.themeTimerId = window.setInterval(playThemeStep, audioState.currentTheme.stepMs);
}

function unlockAudio() {
  if (!audioState.supported) {
    updateAudioUi();
    return;
  }
  const context = ensureAudioContext();
  if (!context) return;
  audioState.unlocked = true;
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }
  if (!appState.audioMuted) {
    syncGameTheme(true);
  }
  updateAudioUi();
}

function setAudioMuted(value) {
  appState.audioMuted = Boolean(value);
  persistSettings();
  updateAudioUi();
  if (!audioState.context) return;
  audioState.masterGain.gain.cancelScheduledValues(audioState.context.currentTime);
  audioState.masterGain.gain.setTargetAtTime(appState.audioMuted ? 0.0001 : 1, audioState.context.currentTime, 0.02);
  if (appState.audioMuted) {
    stopGameTheme();
  } else {
    syncGameTheme(true);
  }
}

function toggleAudio() {
  if (!audioState.supported) return;
  if (appState.audioMuted) {
    unlockAudio();
    setAudioMuted(false);
    playChord([64, 67, 71], 0.14, { gain: 0.07, stagger: 0.03 });
    return;
  }
  playTone(midiToFrequency(57), 0.12, { gain: 0.05, type: "triangle" });
  setAudioMuted(true);
}

function playUiSound(kind, payload = {}) {
  if (!audioState.unlocked || appState.audioMuted) return;
  if (kind === "select") {
    playTone(midiToFrequency(72), 0.08, { gain: 0.04, type: "triangle" });
    playTone(midiToFrequency(79), 0.08, { gain: 0.028, type: "triangle", time: ensureAudioContext().currentTime + 0.05 });
    return;
  }
  if (kind === "start") {
    playChord([60, 64, 67], 0.16, { gain: 0.08, stagger: 0.035 });
    return;
  }
  if (kind === "reset") {
    playChord([67, 64, 60], 0.14, { gain: 0.06, stagger: 0.03, type: "triangle" });
    return;
  }
  if (kind === "countdown") {
    playTone(midiToFrequency(72 + (payload.value || 0)), 0.06, { gain: 0.038, type: "square" });
    return;
  }
  if (kind === "score") {
    playTone(midiToFrequency(76 + Math.min(8, payload.delta || 1)), 0.07, { gain: 0.032, type: "square" });
  }
}

function playStatusSound(text) {
  if (!audioState.unlocked || appState.audioMuted) return;
  const signature = String(text || "").toLowerCase().trim();
  if (!signature) return;
  const now = performance.now();
  if (audioState.lastStatusSignature === signature && now - audioState.lastStatusSoundAt < 300) return;
  audioState.lastStatusSignature = signature;
  audioState.lastStatusSoundAt = now;
  if (/(cleared|you win|correct|jackpot|finished|copied|all stages)/.test(signature)) {
    playChord([67, 71, 74], 0.16, { gain: 0.07, stagger: 0.03 });
    return;
  }
  if (/(boom|crash|crashed|game over|failed|too slow|too early|out of|lost|locked out|could not|tagged|scraped|clipped)/.test(signature)) {
    playChord([55, 52, 48], 0.18, { gain: 0.06, stagger: 0.035, type: "triangle" });
  }
}

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return {
      difficulty: normalizeDifficulty(parsed.difficulty),
      startCountdownSeconds: normalizeStartDelay(parsed.startCountdownSeconds),
      audioMuted: Boolean(parsed.audioMuted),
      collapsedCategories:
        parsed.collapsedCategories && typeof parsed.collapsedCategories === "object"
          ? parsed.collapsedCategories
          : {},
    };
  } catch (error) {
    return { difficulty: "normal", startCountdownSeconds: 3, audioMuted: false, collapsedCategories: {} };
  }
}

function persistSettings() {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      difficulty: appState.difficulty,
      startCountdownSeconds: appState.startCountdownSeconds,
      audioMuted: appState.audioMuted,
      collapsedCategories: appState.collapsedCategories,
    }),
  );
}

function updateSettingsUi() {
  const preset = getDifficultyPreset();
  if (els.difficultySelect) {
    els.difficultySelect.value = appState.difficulty;
  }
  if (els.startDelaySelect) {
    els.startDelaySelect.value = String(appState.startCountdownSeconds);
  }
  if (els.quickDifficultySelect) {
    els.quickDifficultySelect.value = appState.difficulty;
  }
  if (els.difficultyHint) {
    els.difficultyHint.textContent = `${preset.label}: ${preset.blurb}`;
  }
  updateAudioUi();
}

function updateAudioUi() {
  if (!els.soundToggleButton) return;
  if (!audioState.supported) {
    els.soundToggleButton.textContent = "Sound N/A";
    els.soundToggleButton.disabled = true;
    return;
  }
  els.soundToggleButton.disabled = false;
  els.soundToggleButton.textContent = appState.audioMuted ? "Sound Off" : "Sound On";
  els.soundToggleButton.setAttribute("aria-pressed", String(!appState.audioMuted));
}

function updateBuildInfo() {
  if (els.buildVersion) {
    els.buildVersion.textContent = BUILD_VERSION;
  }
  if (els.buildUpdatedAt) {
    const lastModified = document.lastModified ? new Date(document.lastModified) : null;
    els.buildUpdatedAt.textContent =
      lastModified && !Number.isNaN(lastModified.getTime())
        ? lastModified.toLocaleString()
        : "Unknown";
  }
}

function updateShareUi() {
  if (els.shareLink) {
    els.shareLink.value = window.location.href;
  }
  if (!els.shareNote) return;
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    els.shareNote.textContent =
      "This link works on this computer. For friends on the same Wi-Fi, run the server on your computer's network address and share that URL.";
    return;
  }
  els.shareNote.textContent = "If your friends can reach this address, this link is ready to share.";
}

function createCanvasShell({ square = false, hudItems = [] }) {
  const wrap = document.createElement("div");
  wrap.className = "canvas-wrap";
  wrap.innerHTML = `
    <div class="canvas-hud">
      <div class="info-chip-row">
        ${hudItems.map((item) => `<span class="info-chip" data-hud="${item.id}">${item.label}</span>`).join("")}
      </div>
    </div>
    <div class="canvas-card ${square ? "square" : ""}">
      <canvas></canvas>
    </div>
  `;
  return {
    wrap,
    canvas: wrap.querySelector("canvas"),
    hud: Object.fromEntries(
      hudItems.map((item) => [item.id, wrap.querySelector(`[data-hud="${item.id}"]`)]),
    ),
  };
}

function createDomShell(contentHtml) {
  const wrap = document.createElement("div");
  wrap.className = "dom-game-wrap";
  wrap.innerHTML = contentHtml;
  return wrap;
}

function createSnakeGame() {
  let shell;
  let ctx;
  let intervalId = null;
  let direction = { x: 1, y: 0 };
  let pendingDirection = { x: 1, y: 0 };
  let snake = [];
  let food = { x: 10, y: 10 };
  let running = false;
  const gridSize = 20;

  function resetState() {
    snake = [
      { x: 7, y: 10 },
      { x: 6, y: 10 },
      { x: 5, y: 10 },
    ];
    direction = { x: 1, y: 0 };
    pendingDirection = { x: 1, y: 0 };
    food = randomFoodPosition();
    running = false;
    setScore(0);
    updateHud();
    draw();
  }

  function randomFoodPosition() {
    let position;
    do {
      position = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
    } while (snake.some((segment) => segment.x === position.x && segment.y === position.y));
    return position;
  }

  function updateHud() {
    shell.hud.length.textContent = `Length ${snake.length}`;
    shell.hud.speed.textContent = `Speed ${Math.max(1, Math.floor((110 - getTickRate()) / 8) + 1)}`;
  }

  function getTickRate() {
    const preset = getDifficultyPreset();
    return Math.max(
      preset.snakeMinTick,
      preset.snakeBaseTick - Math.floor(appState.score / 50) * preset.snakeRamp,
    );
  }

  function restartLoop() {
    if (intervalId) clearInterval(intervalId);
    intervalId = window.setInterval(step, getTickRate());
  }

  function step() {
    direction = pendingDirection;
    const nextHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (
      nextHead.x < 0 ||
      nextHead.x >= gridSize ||
      nextHead.y < 0 ||
      nextHead.y >= gridSize ||
      snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)
    ) {
      running = false;
      clearInterval(intervalId);
      intervalId = null;
      setStatus(`Game over - score ${appState.score}`);
      scheduleAutoReset();
      return;
    }

    snake.unshift(nextHead);

    if (nextHead.x === food.x && nextHead.y === food.y) {
      setScore(appState.score + 10);
      food = randomFoodPosition();
      updateHud();
      restartLoop();
    } else {
      snake.pop();
    }

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, 600, 600);
    ctx.fillStyle = "#09111d";
    ctx.fillRect(0, 0, 600, 600);

    for (let index = 0; index < gridSize; index += 1) {
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.beginPath();
      ctx.moveTo(index * 30, 0);
      ctx.lineTo(index * 30, 600);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, index * 30);
      ctx.lineTo(600, index * 30);
      ctx.stroke();
    }

    ctx.fillStyle = "#ff8a3d";
    ctx.beginPath();
    ctx.arc(food.x * 30 + 15, food.y * 30 + 15, 11, 0, Math.PI * 2);
    ctx.fill();

    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#46b1ff" : "#89d6ff";
      ctx.fillRect(segment.x * 30 + 2, segment.y * 30 + 2, 26, 26);
    });

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, 600, 600);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Snake Sprint", 300, 280);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Press Start to play", 300, 320);
    }
  }

  return {
    id: "snake",
    levelStep: 40,
    title: "Snake Sprint",
    tagline: "Fast classic snake action",
    subtitle: "Eat, grow, and survive longer as the speed climbs.",
    description:
      "A polished take on classic Snake. Eat the glowing fruit, avoid walls and your own tail, and chase a bigger best score.",
    controls: "Arrow keys or WASD to turn.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        square: true,
        hudItems: [
          { id: "length", label: "Length 3" },
          { id: "speed", label: "Speed 1" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 600;
      shell.canvas.height = 600;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      running = true;
      setStatus("Playing");
      restartLoop();
      draw();
    },
    reset() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const next = map[event.key];
      if (!next) return;
      if (next.x === -direction.x && next.y === -direction.y) return;
      pendingDirection = next;
    },
    destroy() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    },
  };
}

function createBreakoutGame() {
  let shell;
  let ctx;
  let animationId = null;
  let nextWaveTimeout = null;
  let running = false;
  let paused = false;
  let pendingNextWave = false;
  let leftPressed = false;
  let rightPressed = false;
  let paddle;
  let balls = [];
  let bricks = [];
  let lives = 0;
  let wave = 1;
  let credits = 0;
  let upgrades;
  let visibilityHandler = null;
  let blurHandler = null;

  function updatePauseButton() {
    const button = shell?.wrap?.querySelector("[data-breakout-pause]");
    if (!button) return;
    button.textContent = paused ? "Resume" : "Pause";
  }

  function makeUpgradeState() {
    return {
      paddle: 0,
      power: 0,
      fireball: 0,
      multiball: 0,
    };
  }

  function clearTimers() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = null;
    if (nextWaveTimeout) clearTimeout(nextWaveTimeout);
    nextWaveTimeout = null;
  }

  function getBallSpeed() {
    const preset = getDifficultyPreset();
    return preset.breakoutBallSpeed + Math.min(2.2, wave * 0.08);
  }

  function getPaddleWidth() {
    const preset = getDifficultyPreset();
    return Math.min(220, preset.breakoutPaddleWidth + upgrades.paddle * 18);
  }

  function spawnBall(angleOffset = 0) {
    const speed = getBallSpeed();
    const angle = (-Math.PI / 2) + angleOffset;
    return {
      x: paddle.x + paddle.width / 2,
      y: paddle.y - 18,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 9,
      fireHits: upgrades.fireball,
    };
  }

  function replenishBalls(count = 1) {
    balls = Array.from({ length: count }, (_, index) => spawnBall((index - (count - 1) / 2) * 0.22));
  }

  function buildWaveLayout(nextWave) {
    const rows = Math.min(9, 4 + Math.floor(nextWave / 2));
    const cols = 9;
    const width = 66;
    const height = 18;
    const gapX = 12;
    const gapY = 12;
    const startX = 40;
    const startY = 40;
    const wall = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const baseHp = 1 + Math.floor((nextWave - 1) / 2);
        const extraHp = Math.random() < Math.min(0.55, nextWave * 0.08) ? 1 : 0;
        wall.push({
          x: startX + col * (width + gapX),
          y: startY + row * (height + gapY),
          width,
          height,
          hp: baseHp + extraHp,
          maxHp: baseHp + extraHp,
          alive: true,
        });
      }
    }
    return wall;
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.wave.textContent = `Wave ${wave}`;
    shell.hud.credits.textContent = `Credits ${credits}`;
    refreshLevel();
  }

  function renderUpgradeBar() {
    const container = shell.wrap.querySelector("[data-breakout-upgrades]");
    if (!container) return;
    const costs = {
      paddle: 8 + upgrades.paddle * 6,
      power: 12 + upgrades.power * 8,
      fireball: 16 + upgrades.fireball * 10,
      multiball: 18 + upgrades.multiball * 12,
      life: 14 + Math.max(0, lives - getDifficultyPreset().breakoutLives) * 8,
    };
    container.innerHTML = `
      <button class="mini-button" data-upgrade="paddle">Wide Paddle ${costs.paddle}</button>
      <button class="mini-button" data-upgrade="power">Power Ball ${costs.power}</button>
      <button class="mini-button" data-upgrade="fireball">Fireball ${costs.fireball}</button>
      <button class="mini-button" data-upgrade="multiball">Multiball ${costs.multiball}</button>
      <button class="mini-button" data-upgrade="life">Extra Life ${costs.life}</button>
    `;
    container.querySelectorAll("[data-upgrade]").forEach((button) => {
      button.addEventListener("click", () => buyUpgrade(button.dataset.upgrade, costs[button.dataset.upgrade]));
    });
    updatePauseButton();
  }

  function resetPaddle() {
    paddle = {
      x: 380 - getPaddleWidth() / 2,
      y: 400,
      width: getPaddleWidth(),
      height: 14,
    };
  }

  function prepareWave(nextWave, preserveRun = false) {
    wave = nextWave;
    resetPaddle();
    bricks = buildWaveLayout(wave);
    replenishBalls(1 + Math.min(2, upgrades.multiball));
    if (!preserveRun) {
      setScore(0);
      credits = 0;
      upgrades = makeUpgradeState();
      lives = getDifficultyPreset().breakoutLives;
      resetPaddle();
      bricks = buildWaveLayout(1);
      wave = 1;
      replenishBalls(1);
    }
    updateHud();
    renderUpgradeBar();
    draw();
  }

  function resetState() {
    upgrades = makeUpgradeState();
    wave = 1;
    credits = 0;
    lives = getDifficultyPreset().breakoutLives;
    paused = false;
    pendingNextWave = false;
    prepareWave(1, true);
    setScore(0);
  }

  function buyUpgrade(type, cost) {
    if (credits < cost) {
      setStatus("Not enough credits");
      return;
    }
    credits -= cost;
    if (type === "paddle") {
      upgrades.paddle += 1;
      const center = paddle.x + paddle.width / 2;
      paddle.width = getPaddleWidth();
      paddle.x = clamp(center - paddle.width / 2, 0, 760 - paddle.width);
      setStatus("Paddle widened");
    } else if (type === "power") {
      upgrades.power += 1;
      setStatus("Power Ball upgraded");
    } else if (type === "fireball") {
      upgrades.fireball += 1;
      balls.forEach((ball) => {
        ball.fireHits = Math.max(ball.fireHits, upgrades.fireball);
      });
      setStatus("Fireball upgraded");
    } else if (type === "multiball") {
      upgrades.multiball += 1;
      if (balls.length < 4) {
        balls.push(spawnBall((Math.random() - 0.5) * 0.6));
      }
      setStatus("Multiball online");
    } else if (type === "life") {
      lives += 1;
      setStatus("Extra life gained");
    }
    updateHud();
    renderUpgradeBar();
    draw();
  }

  function queueNextWave() {
    running = false;
    pendingNextWave = true;
    clearTimers();
    setStatus(`Wave ${wave} cleared`);
    nextWaveTimeout = window.setTimeout(() => {
      nextWaveTimeout = null;
      pendingNextWave = false;
      prepareWave(wave + 1, true);
      running = true;
      paused = false;
      setStatus(`Wave ${wave}`);
      loop();
    }, 900);
  }

  function loseBall() {
    if (balls.length) return;
    lives -= 1;
    updateHud();
    renderUpgradeBar();
    if (lives <= 0) {
      running = false;
      paused = false;
      setStatus(`Out of lives - ${appState.score}`);
      scheduleAutoReset();
      return;
    }
    replenishBalls(1 + Math.min(2, upgrades.multiball));
    setStatus("Ball returned");
  }

  function loop() {
    if (!running) return;
    animationId = requestAnimationFrame(loop);
    update();
    draw();
  }

  function hitBrick(ball, brick) {
    brick.hp -= 1 + upgrades.power;
    credits += brick.hp <= 0 ? brick.maxHp + Math.max(1, Math.floor(wave / 2)) : 1;
    if (brick.hp <= 0) {
      brick.alive = false;
      setScore(appState.score + brick.maxHp * 12);
    } else {
      setScore(appState.score + 4);
    }
    if (ball.fireHits > 0) {
      ball.fireHits -= 1;
    } else {
      ball.vy *= -1;
    }
    updateHud();
    renderUpgradeBar();
  }

  function update() {
    const paddleSpeed = 7.2 + upgrades.paddle * 0.25;
    if (leftPressed) paddle.x -= paddleSpeed;
    if (rightPressed) paddle.x += paddleSpeed;
    paddle.x = clamp(paddle.x, 0, 760 - paddle.width);

    balls = balls.filter((ball) => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x - ball.r <= 0 || ball.x + ball.r >= 760) ball.vx *= -1;
      if (ball.y - ball.r <= 0) ball.vy *= -1;

      if (
        ball.y + ball.r >= paddle.y &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width &&
        ball.vy > 0
      ) {
        const hit = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        ball.vx = hit * (6.2 + upgrades.power * 0.18);
        ball.vy = -Math.abs(ball.vy);
        ball.fireHits = upgrades.fireball;
      }

      for (const brick of bricks) {
        if (!brick.alive) continue;
        if (
          ball.x + ball.r >= brick.x &&
          ball.x - ball.r <= brick.x + brick.width &&
          ball.y + ball.r >= brick.y &&
          ball.y - ball.r <= brick.y + brick.height
        ) {
          hitBrick(ball, brick);
          break;
        }
      }

      return ball.y - ball.r <= 440;
    });

    if (!bricks.some((brick) => brick.alive)) {
      queueNextWave();
      return;
    }

    loseBall();
  }

  function drawBrick(brick, index) {
    const palette = ["#46b1ff", "#6ed8ff", "#8f66ff", "#ff8a3d", "#ffd166", "#ff5f7a"];
    const color = palette[Math.min(palette.length - 1, brick.maxHp - 1)] || palette[index % palette.length];
    ctx.fillStyle = color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    if (brick.maxHp > 1) {
      ctx.fillStyle = "rgba(8,17,31,0.9)";
      ctx.font = "700 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(String(Math.max(1, brick.hp)), brick.x + brick.width / 2, brick.y + 13);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    ctx.fillStyle = "#08111f";
    ctx.fillRect(0, 0, 760, 440);

    bricks.forEach((brick, index) => {
      if (!brick.alive) return;
      drawBrick(brick, index);
    });

    ctx.fillStyle = "#f4f6fa";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    balls.forEach((ball) => {
      ctx.fillStyle = ball.fireHits > 0 ? "#ffd166" : "#ff8a3d";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.36)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText(paused ? "Paused" : "Brick Burst Infinite", 380, 205);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText(`Wave ${wave} | Credits ${credits}`, 380, 240);
      ctx.fillText(paused ? "Press Resume or Start to continue" : "Press Start to launch the next run", 380, 274);
    }
  }

  function pauseGame(reason = "Paused") {
    if ((!running && !pendingNextWave) || paused) return;
    paused = true;
    running = false;
    if (pendingNextWave && nextWaveTimeout) {
      clearTimeout(nextWaveTimeout);
      nextWaveTimeout = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    leftPressed = false;
    rightPressed = false;
    updatePauseButton();
    setStatus(reason);
    draw();
  }

  function resumeGame() {
    if (!paused) return;
    paused = false;
    updatePauseButton();
    if (pendingNextWave) {
      pendingNextWave = false;
      prepareWave(wave + 1, true);
    }
    running = true;
    clearAutoReset();
    setStatus(`Wave ${wave}`);
    loop();
  }

  function attachPauseListeners() {
    if (visibilityHandler || blurHandler) return;
    visibilityHandler = () => {
      if (document.hidden) {
        pauseGame("Auto-paused");
      }
    };
    blurHandler = () => {
      pauseGame("Auto-paused");
    };
    document.addEventListener("visibilitychange", visibilityHandler);
    window.addEventListener("blur", blurHandler);
  }

  function detachPauseListeners() {
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }
    if (blurHandler) {
      window.removeEventListener("blur", blurHandler);
      blurHandler = null;
    }
  }

  return {
    id: "breakout",
    getLevelText: () => String(wave),
    title: "Brick Burst",
    tagline: "Infinite brick breaker with upgrades",
    subtitle: "Keep clearing tougher waves, buy upgrades, and see how long the run can last.",
    description:
      "An endless-style brick breaker run with wave scaling, credits, and upgrade buttons for paddle size, power, fireball hits, multiball, and extra lives.",
    controls: "Left and right arrows or A and D. Buy upgrades with the buttons under the arena.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "wave", label: "Wave 1" },
          { id: "credits", label: "Credits 0" },
        ],
      });
      shell.wrap.insertAdjacentHTML(
        "beforeend",
        '<div class="action-button-grid"><button class="mini-button" data-breakout-pause>Pause</button></div><div class="action-button-grid" data-breakout-upgrades></div>',
      );
      stage.appendChild(shell.wrap);
      shell.canvas.width = 760;
      shell.canvas.height = 440;
      ctx = shell.canvas.getContext("2d");
      shell.wrap.querySelector("[data-breakout-pause]")?.addEventListener("click", () => {
        if (paused) {
          resumeGame();
        } else {
          pauseGame("Paused");
        }
      });
      attachPauseListeners();
      resetState();
    },
    start() {
      if (paused) {
        resumeGame();
        return;
      }
      if (running) return;
      clearAutoReset();
      pendingNextWave = false;
      paused = false;
      updatePauseButton();
      running = true;
      setStatus(`Wave ${wave}`);
      loop();
    },
    reset() {
      running = false;
      paused = false;
      pendingNextWave = false;
      clearTimers();
      resetState();
      updatePauseButton();
      setStatus("Ready");
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) leftPressed = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) rightPressed = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) leftPressed = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) rightPressed = false;
    },
    destroy() {
      running = false;
      paused = false;
      pendingNextWave = false;
      clearTimers();
      detachPauseListeners();
      leftPressed = false;
      rightPressed = false;
    },
  };
}

function createBlockDropGame() {
  let shell;
  let ctx;
  let board = [];
  let active = null;
  let running = false;
  let animationId = null;
  let dropTick = 0;
  let lines = 0;
  let level = 1;
  let nextQueue = [];
  const cols = 10;
  const rows = 20;
  const cell = 32;
  const offsetX = 18;
  const offsetY = 18;
  const palette = {
    I: "#46b1ff",
    O: "#ffd166",
    T: "#8f66ff",
    S: "#1eb980",
    Z: "#ff6b6b",
    J: "#7ab6ff",
    L: "#ff9b54",
  };
  const shapes = {
    I: [[1, 1, 1, 1]],
    O: [
      [1, 1],
      [1, 1],
    ],
    T: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    J: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    L: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  };

  function emptyBoard() {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
  }

  function getDropFrames() {
    const mode = appState.difficulty;
    const base =
      mode === "chill" ? 46 : mode === "easy" ? 40 : mode === "hard" ? 22 : mode === "chaos" ? 18 : 30;
    return Math.max(8, base - (level - 1) * 2);
  }

  function rotateMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());
  }

  function makePiece(type) {
    return {
      type,
      matrix: shapes[type].map((row) => [...row]),
      row: 0,
      col: Math.floor(cols / 2) - 2,
    };
  }

  function randomType() {
    const types = Object.keys(shapes);
    return types[Math.floor(Math.random() * types.length)];
  }

  function ensureQueue() {
    while (nextQueue.length < 3) {
      nextQueue.push(randomType());
    }
  }

  function collides(piece, nextRow = piece.row, nextCol = piece.col, nextMatrix = piece.matrix) {
    for (let row = 0; row < nextMatrix.length; row += 1) {
      for (let col = 0; col < nextMatrix[row].length; col += 1) {
        if (!nextMatrix[row][col]) continue;
        const boardRow = nextRow + row;
        const boardCol = nextCol + col;
        if (boardCol < 0 || boardCol >= cols || boardRow >= rows) return true;
        if (boardRow >= 0 && board[boardRow][boardCol]) return true;
      }
    }
    return false;
  }

  function updateHud() {
    shell.hud.lines.textContent = `Lines ${lines}`;
    shell.hud.level.textContent = `Level ${level}`;
    shell.hud.next.textContent = `Next ${nextQueue[0] || "-"}`;
    refreshLevel();
  }

  function spawnPiece() {
    ensureQueue();
    active = makePiece(nextQueue.shift());
    ensureQueue();
    if (collides(active)) {
      running = false;
      setStatus("Stack topped out - auto reset");
      scheduleAutoReset();
    }
    updateHud();
  }

  function clearLines() {
    let cleared = 0;
    for (let row = rows - 1; row >= 0; row -= 1) {
      if (board[row].every(Boolean)) {
        board.splice(row, 1);
        board.unshift(Array.from({ length: cols }, () => ""));
        cleared += 1;
        row += 1;
      }
    }
    if (!cleared) return;
    lines += cleared;
    level = 1 + Math.floor(lines / 5);
    setScore(appState.score + [0, 100, 250, 450, 700][cleared] + level * 10);
    setStatus(`${cleared} line${cleared > 1 ? "s" : ""} cleared`);
  }

  function lockPiece() {
    if (!active) return;
    active.matrix.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (!value) return;
        const boardRow = active.row + rowIndex;
        const boardCol = active.col + colIndex;
        if (boardRow >= 0) {
          board[boardRow][boardCol] = active.type;
        }
      });
    });
    clearLines();
    spawnPiece();
  }

  function movePiece(deltaCol) {
    if (!running || !active) return;
    const nextCol = active.col + deltaCol;
    if (!collides(active, active.row, nextCol)) {
      active.col = nextCol;
    }
  }

  function softDrop() {
    if (!running || !active) return;
    const nextRow = active.row + 1;
    if (collides(active, nextRow, active.col)) {
      lockPiece();
      return;
    }
    active.row = nextRow;
    setScore(appState.score + 1);
  }

  function hardDrop() {
    if (!running || !active) return;
    let distance = 0;
    while (!collides(active, active.row + 1, active.col)) {
      active.row += 1;
      distance += 1;
    }
    setScore(appState.score + distance * 2);
    lockPiece();
  }

  function rotatePiece() {
    if (!running || !active) return;
    const rotated = rotateMatrix(active.matrix);
    const kicks = [0, -1, 1, -2, 2];
    const validKick = kicks.find((kick) => !collides(active, active.row, active.col + kick, rotated));
    if (validKick == null) return;
    active.matrix = rotated;
    active.col += validKick;
  }

  function tick() {
    if (!running) return;
    dropTick += 1;
    if (dropTick >= getDropFrames()) {
      dropTick = 0;
      softDrop();
    }
  }

  function drawCell(x, y, fill, label = "") {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, cell - 2, cell - 2);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.strokeRect(x, y, cell - 2, cell - 2);
    if (label) {
      ctx.fillStyle = "rgba(8,17,31,0.85)";
      ctx.font = "700 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(label, x + (cell - 2) / 2, y + cell / 2 + 4);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 520, 720);
    const bg = ctx.createLinearGradient(0, 0, 0, 720);
    bg.addColorStop(0, "#08111f");
    bg.addColorStop(1, "#122a43");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 520, 720);

    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(offsetX - 4, offsetY - 4, cols * cell + 8, rows * cell + 8);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = offsetX + col * cell;
        const y = offsetY + row * cell;
        const value = board[row][col];
        drawCell(x, y, value ? palette[value] : "rgba(255,255,255,0.035)");
      }
    }

    if (active) {
      active.matrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (!value) return;
          const x = offsetX + (active.col + colIndex) * cell;
          const y = offsetY + (active.row + rowIndex) * cell;
          drawCell(x, y, palette[active.type]);
        });
      });
    }

    ctx.fillStyle = "rgba(255,255,255,0.84)";
    ctx.textAlign = "left";
    ctx.font = "700 18px Trebuchet MS";
    ctx.fillText("Next", 380, 42);
    nextQueue.slice(0, 3).forEach((type, index) => {
      ctx.fillStyle = palette[type];
      ctx.fillRect(380, 56 + index * 64, 92, 44);
      ctx.fillStyle = "#08111f";
      ctx.textAlign = "center";
      ctx.fillText(type, 426, 84 + index * 64);
    });

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, 520, 720);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Block Drop", 260, 320);
      ctx.font = "20px Trebuchet MS";
      ctx.fillText("Stack clean, clear lines, don't top out", 260, 354);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    tick();
    draw();
  }

  function resetState() {
    board = emptyBoard();
    nextQueue = [];
    lines = 0;
    level = 1;
    dropTick = 0;
    running = false;
    setScore(0);
    ensureQueue();
    spawnPiece();
    draw();
    updateHud();
  }

  return {
    id: "blockdrop",
    title: "Block Drop",
    tagline: "Falling-block stacker",
    subtitle: "Rotate pieces, clear lines, and survive the stack as the drop speed rises.",
    description:
      "A falling-blocks arcade game with rotation, hard drop, line clears, leveling, and faster pressure as you survive longer.",
    controls: "Arrow keys to move, Up to rotate, Down to soft drop, and Space to hard drop.",
    getLevelText: () => String(level),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lines", label: "Lines 0" },
          { id: "level", label: "Level 1" },
          { id: "next", label: "Next -" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 520;
      shell.canvas.height = 720;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Stacking");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (!running) return;
      if (["ArrowLeft", "a", "A"].includes(event.key)) movePiece(-1);
      if (["ArrowRight", "d", "D"].includes(event.key)) movePiece(1);
      if (["ArrowDown", "s", "S"].includes(event.key)) softDrop();
      if (["ArrowUp", "w", "W"].includes(event.key)) rotatePiece();
      if (event.key === " ") hardDrop();
      draw();
    },
  };
}

function createCannonLaunchGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let angle = -0.9;
  let power = 10;
  let shotsLeft = 6;
  let stageLevel = 1;
  let targets = [];
  let projectile = null;
  const gravity = 0.22;

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { targets: 3, shots: 8, speed: 0.88 };
    if (mode === "easy") return { targets: 3, shots: 7, speed: 0.95 };
    if (mode === "hard") return { targets: 5, shots: 5, speed: 1.18 };
    if (mode === "chaos") return { targets: 6, shots: 4, speed: 1.28 };
    return { targets: 4, shots: 6, speed: 1.05 };
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.shots.textContent = `Shots ${shotsLeft}`;
    shell.hud.targets.textContent = `Targets ${targets.length}`;
    refreshLevel();
  }

  function buildStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    angle = -0.9;
    power = 10 + Math.min(8, level);
    shotsLeft = config.shots;
    projectile = null;
    targets = Array.from({ length: config.targets + Math.floor((level - 1) / 2) }, (_, index) => ({
      x: 330 + index * 115 + (index % 2) * 22,
      y: 430 - (index % 3) * 96,
      radius: 16 + (index % 2) * 4,
      drift: ((index % 2 === 0 ? 1 : -1) * (0.45 + level * 0.03) * config.speed),
    }));
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
    setStatus(`Stage ${stageLevel}`);
  }

  function resetState() {
    running = false;
    buildStage(1);
  }

  function fire() {
    if (!running || projectile || shotsLeft <= 0) return;
    shotsLeft -= 1;
    projectile = {
      x: 74,
      y: 500,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power,
      radius: 8,
    };
    updateHud();
    setStatus("Boom");
  }

  function updateTargets() {
    targets.forEach((target) => {
      target.y += target.drift;
      if (target.y < 70 || target.y > 460) {
        target.drift *= -1;
      }
    });
  }

  function updateProjectile() {
    if (!projectile) return;
    projectile.x += projectile.vx;
    projectile.y += projectile.vy;
    projectile.vy += gravity;
    const hitIndex = targets.findIndex(
      (target) => Math.hypot(target.x - projectile.x, target.y - projectile.y) <= target.radius + projectile.radius,
    );
    if (hitIndex >= 0) {
      targets.splice(hitIndex, 1);
      projectile = null;
      setScore(appState.score + 35 + stageLevel * 8);
      updateHud();
      if (!targets.length) {
        setStatus("Target sweep");
        window.setTimeout(() => {
          buildStage(stageLevel + 1, true);
          if (running) setStatus(`Stage ${stageLevel}`);
        }, 350);
      }
      return;
    }
    if (projectile.x > 860 || projectile.y > 560 || projectile.y < -30) {
      projectile = null;
      if (shotsLeft <= 0 && targets.length) {
        running = false;
        setStatus("Out of shots - auto reset");
        scheduleAutoReset();
      } else {
        setStatus("Retune the aim");
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 900, 560);
    const bg = ctx.createLinearGradient(0, 0, 0, 560);
    bg.addColorStop(0, "#08111f");
    bg.addColorStop(1, "#153557");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 900, 560);

    ctx.fillStyle = "#1a5f7a";
    ctx.fillRect(0, 508, 900, 52);
    ctx.fillStyle = "#d9e7f1";
    ctx.fillRect(38, 500, 64, 8);
    ctx.save();
    ctx.translate(74, 500);
    ctx.rotate(angle);
    ctx.fillStyle = "#c7d6e7";
    ctx.fillRect(-10, -8, 54, 16);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(74, 500, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#8f66ff";
    ctx.fill();

    targets.forEach((target) => {
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ff8a3d";
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "700 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("X", target.x, target.y + 4);
    });

    if (projectile) {
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd166";
      ctx.fill();
    }

    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.textAlign = "left";
    ctx.font = "700 18px Trebuchet MS";
    ctx.fillText(`Angle ${Math.round((-angle * 180) / Math.PI)}°`, 640, 48);
    ctx.fillText(`Power ${power.toFixed(1)}`, 640, 78);

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, 900, 560);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Cannon Launch", 450, 250);
      ctx.font = "20px Trebuchet MS";
      ctx.fillText("Adjust the aim and blast every target", 450, 286);
    }
  }

  function update() {
    if (!running) return;
    updateTargets();
    updateProjectile();
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "cannon",
    title: "Cannon Launch",
    tagline: "Arc shot target blast",
    subtitle: "Tune your angle, adjust your power, and knock out every floating target.",
    description:
      "A cannon physics game where you line up arcing shots, manage limited ammo, and clear moving targets to push into later stages.",
    controls: "Left and right adjust angle, Up and Down change power, and Space fires.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "shots", label: "Shots 6" },
          { id: "targets", label: "Targets 0" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 900;
      shell.canvas.height = 560;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus(`Stage ${stageLevel}`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (!running) return;
      if (["ArrowLeft", "a", "A"].includes(event.key)) angle = Math.max(-1.45, angle - 0.06);
      if (["ArrowRight", "d", "D"].includes(event.key)) angle = Math.min(-0.18, angle + 0.06);
      if (["ArrowUp", "w", "W"].includes(event.key)) power = Math.min(18, power + 0.5);
      if (["ArrowDown", "s", "S"].includes(event.key)) power = Math.max(6, power - 0.5);
      if (event.key === " ") fire();
      draw();
    },
  };
}

function createKnifeFlipGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let stageLevel = 1;
  let targetAngle = 0;
  let targetSpeed = 0.035;
  let knivesLeft = 0;
  let stuckKnives = [];
  let activeKnife = null;
  let apples = [];

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { knives: 9, speed: 0.028, apples: 2 };
    if (mode === "easy") return { knives: 8, speed: 0.031, apples: 2 };
    if (mode === "hard") return { knives: 6, speed: 0.043, apples: 3 };
    if (mode === "chaos") return { knives: 5, speed: 0.049, apples: 4 };
    return { knives: 7, speed: 0.037, apples: 2 };
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.knives.textContent = `Knives ${knivesLeft}`;
    shell.hud.apples.textContent = `Apples ${apples.length}`;
    refreshLevel();
  }

  function buildStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    targetAngle = Math.random() * Math.PI * 2;
    targetSpeed = (config.speed + Math.min(0.02, level * 0.0016)) * (level % 2 === 0 ? -1 : 1);
    knivesLeft = Math.max(3, config.knives - Math.floor((level - 1) / 4));
    stuckKnives = [];
    activeKnife = null;
    apples = Array.from({ length: config.apples + (level % 3 === 0 ? 1 : 0) }, (_, index) => ({
      angle: ((Math.PI * 2) / Math.max(1, config.apples + (level % 3 === 0 ? 1 : 0))) * index + 0.4,
      taken: false,
    }));
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
    setStatus(`Stage ${stageLevel}`);
  }

  function resetState() {
    running = false;
    buildStage(1);
  }

  function throwKnife() {
    if (!running || activeKnife || knivesLeft <= 0) return;
    knivesLeft -= 1;
    activeKnife = { y: 470, speed: 11.5 };
    updateHud();
    setStatus("Flip");
  }

  function failThrow() {
    running = false;
    activeKnife = null;
    setStatus("Clang - auto reset");
    scheduleAutoReset();
    draw();
  }

  function clearStage() {
    setScore(appState.score + 80 + stageLevel * 12 + apples.filter((apple) => apple.taken).length * 10);
    setStatus("Log split");
    running = false;
    window.setTimeout(() => {
      buildStage(stageLevel + 1, true);
      running = true;
      frame();
    }, 420);
  }

  function update() {
    if (!running) return;
    targetAngle += targetSpeed;

    if (activeKnife) {
      activeKnife.y -= activeKnife.speed;
      if (activeKnife.y <= 205) {
        const impactAngle = ((Math.PI / 2 - targetAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const blocked = stuckKnives.some((knife) => {
          let diff = Math.abs(knife.angle - impactAngle);
          diff = Math.min(diff, Math.PI * 2 - diff);
          return diff < 0.24;
        });
        if (blocked) {
          failThrow();
          return;
        }
        stuckKnives.push({ angle: impactAngle });
        apples.forEach((apple) => {
          if (apple.taken) return;
          let diff = Math.abs(apple.angle - impactAngle);
          diff = Math.min(diff, Math.PI * 2 - diff);
          if (diff < 0.22) {
            apple.taken = true;
            setScore(appState.score + 15);
          }
        });
        activeKnife = null;
        if (knivesLeft <= 0) {
          clearStage();
          return;
        }
        updateHud();
      }
    }
  }

  function drawKnifeAt(x, y, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = "#d7e3ef";
    ctx.fillRect(-4, -32, 8, 42);
    ctx.fillStyle = "#8f66ff";
    ctx.fillRect(-10, 8, 20, 10);
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, 640, 560);
    const bg = ctx.createLinearGradient(0, 0, 0, 560);
    bg.addColorStop(0, "#08111f");
    bg.addColorStop(1, "#14314f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 640, 560);

    const centerX = 320;
    const centerY = 190;
    const radius = 78;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#8b5e3c";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 20, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 4;
    ctx.stroke();

    apples.forEach((apple) => {
      if (apple.taken) return;
      const x = centerX + Math.cos(targetAngle + apple.angle) * (radius + 18);
      const y = centerY + Math.sin(targetAngle + apple.angle) * (radius + 18);
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6b6b";
      ctx.fill();
    });

    stuckKnives.forEach((knife) => {
      const x = centerX + Math.cos(targetAngle + knife.angle) * (radius - 6);
      const y = centerY + Math.sin(targetAngle + knife.angle) * (radius - 6);
      drawKnifeAt(x, y, targetAngle + knife.angle + Math.PI / 2);
    });

    if (activeKnife) {
      drawKnifeAt(centerX, activeKnife.y, 0);
    } else {
      drawKnifeAt(centerX, 470, 0);
    }

    for (let index = 0; index < knivesLeft; index += 1) {
      drawKnifeAt(72, 498 - index * 24, 0);
    }

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.fillRect(0, 0, 640, 560);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Knife Flip", 320, 306);
      ctx.font = "19px Trebuchet MS";
      ctx.fillText("Throw every knife without hitting the others", 320, 338);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "knife",
    title: "Knife Flip",
    tagline: "Timing-based log thrower",
    subtitle: "Time each throw, avoid your own knives, and split the log cleanly.",
    description:
      "A timing game inspired by classic knife-throw arcade hits. Toss knives into a spinning log, snag apples, and survive tighter stages.",
    controls: "Press Space to throw a knife into the spinning target.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "knives", label: "Knives 0" },
          { id: "apples", label: "Apples 0" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 640;
      shell.canvas.height = 560;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus(`Stage ${stageLevel}`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (event.key === " ") {
        throwKnife();
      }
    },
  };
}

function createRocketLanderGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let stageLevel = 1;
  let ship;
  let terrain = [];
  let landingPad = { x: 0, y: 0, width: 100 };
  let keys = { left: false, right: false, thrust: false };
  const stageProfiles = [
    { padIndex: 3, roughness: 36, minY: 350, maxY: 438, startX: 138, startY: 86 },
    { padIndex: 5, roughness: 42, minY: 336, maxY: 438, startX: 126, startY: 82 },
    { padIndex: 4, roughness: 48, minY: 330, maxY: 432, startX: 154, startY: 88 },
    { padIndex: 6, roughness: 54, minY: 324, maxY: 430, startX: 112, startY: 76 },
    { padIndex: 3, roughness: 58, minY: 318, maxY: 428, startX: 164, startY: 94 },
    { padIndex: 5, roughness: 62, minY: 312, maxY: 426, startX: 128, startY: 72 },
    { padIndex: 4, roughness: 68, minY: 306, maxY: 424, startX: 146, startY: 82 },
    { padIndex: 6, roughness: 72, minY: 302, maxY: 422, startX: 118, startY: 70 },
    { padIndex: 3, roughness: 76, minY: 298, maxY: 420, startX: 170, startY: 84 },
    { padIndex: 5, roughness: 82, minY: 294, maxY: 418, startX: 124, startY: 68 },
    { padIndex: 4, roughness: 86, minY: 290, maxY: 416, startX: 156, startY: 78 },
    { padIndex: 6, roughness: 92, minY: 286, maxY: 414, startX: 116, startY: 64 },
    { padIndex: 2, roughness: 96, minY: 282, maxY: 412, startX: 180, startY: 74 },
    { padIndex: 7, roughness: 102, minY: 278, maxY: 410, startX: 98, startY: 60 },
    { padIndex: 4, roughness: 108, minY: 274, maxY: 408, startX: 168, startY: 70 },
  ];

  function getConfig() {
    if (appState.difficulty === "chill") {
      return {
        fuel: Infinity,
        infiniteFuel: true,
        gravity: 0.047,
        padWidth: 138,
        minPadWidth: 110,
        gentleVy: 2.3,
        gentleVx: 1.35,
        upright: 0.28,
        thrustPower: 0.132,
        rotateStep: 0.024,
      };
    }
    if (appState.difficulty === "easy") {
      return {
        fuel: 180,
        infiniteFuel: false,
        gravity: 0.052,
        padWidth: 124,
        minPadWidth: 98,
        gentleVy: 2.15,
        gentleVx: 1.24,
        upright: 0.24,
        thrustPower: 0.126,
        rotateStep: 0.026,
      };
    }
    if (appState.difficulty === "hard") {
      return {
        fuel: 104,
        infiniteFuel: false,
        gravity: 0.07,
        padWidth: 92,
        minPadWidth: 72,
        gentleVy: 1.72,
        gentleVx: 1.02,
        upright: 0.17,
        thrustPower: 0.116,
        rotateStep: 0.031,
      };
    }
    if (appState.difficulty === "chaos") {
      return {
        fuel: 108,
        infiniteFuel: false,
        gravity: 0.072,
        padWidth: 90,
        minPadWidth: 72,
        gentleVy: 1.72,
        gentleVx: 1.02,
        upright: 0.16,
        thrustPower: 0.118,
        rotateStep: 0.03,
      };
    }
    return {
      fuel: 136,
      infiniteFuel: false,
      gravity: 0.06,
      padWidth: 106,
      minPadWidth: 82,
      gentleVy: 1.9,
      gentleVx: 1.12,
      upright: 0.2,
      thrustPower: 0.12,
      rotateStep: 0.028,
    };
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.fuel.textContent = getConfig().infiniteFuel
      ? "Fuel Inf"
      : `Fuel ${Math.max(0, Math.floor(ship.fuel))}`;
    shell.hud.speed.textContent = `Speed ${ship ? Math.abs(ship.vy).toFixed(2) : "0.00"}`;
    refreshLevel();
  }

  function generateTerrain(level) {
    const profile = stageProfiles[(level - 1) % stageProfiles.length];
    const points = [];
    let x = 0;
    let y = 408;
    while (x <= 900) {
      points.push({ x, y });
      x += 90;
      const stageRoughness = profile.roughness + Math.min(24, Math.floor((level - 1) / stageProfiles.length) * 8);
      y = clamp(y + (Math.random() * stageRoughness * 2 - stageRoughness), profile.minY, profile.maxY);
    }
    const config = getConfig();
    const padIndex = Math.min(points.length - 2, profile.padIndex);
    landingPad = {
      x: points[padIndex].x + 8,
      y: clamp(points[padIndex].y - 10, 300, 470),
      width: Math.max(config.minPadWidth, config.padWidth - Math.floor((level - 1) / 2) * 3),
    };
    points[padIndex].y = landingPad.y + 10;
    points[padIndex + 1].y = landingPad.y + 10;
    terrain = points;
  }

  function buildStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    generateTerrain(level);
    ship = {
      x: stageProfiles[(level - 1) % stageProfiles.length].startX,
      y: stageProfiles[(level - 1) % stageProfiles.length].startY,
      vx: 0,
      vy: 0,
      angle: 0,
      fuel: config.fuel,
    };
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
    setStatus(`Stage ${stageLevel}`);
  }

  function resetState() {
    running = false;
    buildStage(1);
  }

  function getGroundY(x) {
    for (let index = 0; index < terrain.length - 1; index += 1) {
      const left = terrain[index];
      const right = terrain[index + 1];
      if (x >= left.x && x <= right.x) {
        const progress = (x - left.x) / Math.max(1, right.x - left.x);
        return left.y + (right.y - left.y) * progress;
      }
    }
    return 520;
  }

  function crash(reason) {
    running = false;
    setStatus(`${reason} - auto reset`);
    scheduleAutoReset();
  }

  function landSuccess() {
    running = false;
    setScore(appState.score + 120 + Math.floor(ship.fuel) + stageLevel * 20);
    setStatus("Smooth landing");
    window.setTimeout(() => {
      buildStage(stageLevel + 1, true);
      running = true;
      frame();
    }, 420);
  }

  function update() {
    if (!running) return;
    const config = getConfig();
    if (keys.left) ship.angle = Math.max(-0.8, ship.angle - config.rotateStep);
    if (keys.right) ship.angle = Math.min(0.8, ship.angle + config.rotateStep);
    if (keys.thrust && (config.infiniteFuel || ship.fuel > 0)) {
      ship.vx += Math.sin(ship.angle) * 0.07;
      ship.vy -= Math.cos(ship.angle) * config.thrustPower;
      if (!config.infiniteFuel) ship.fuel -= 0.52;
    }
    ship.vy += config.gravity;
    ship.x += ship.vx;
    ship.y += ship.vy;
    ship.x = clamp(ship.x, 20, 880);

    const groundY = getGroundY(ship.x);
    if (ship.y + 18 >= groundY) {
      const onPad = ship.x >= landingPad.x && ship.x <= landingPad.x + landingPad.width;
      const gentle = Math.abs(ship.vy) < config.gentleVy && Math.abs(ship.vx) < config.gentleVx;
      const upright = Math.abs(ship.angle) < config.upright;
      if (onPad && gentle && upright) {
        landSuccess();
      } else {
        crash("Crash landing");
      }
      return;
    }
    if (ship.y < -40) {
      crash("Lost in space");
      return;
    }
    ship.fuel = Math.max(0, ship.fuel);
    updateHud();
  }

  function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.fillStyle = "#d8e3ef";
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(12, 16);
    ctx.lineTo(-12, 16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#8f66ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-10, 16);
    ctx.lineTo(-16, 24);
    ctx.moveTo(10, 16);
    ctx.lineTo(16, 24);
    ctx.stroke();
    if (keys.thrust && (getConfig().infiniteFuel || ship.fuel > 0) && running) {
      ctx.fillStyle = "#ff8a3d";
      ctx.beginPath();
      ctx.moveTo(-6, 18);
      ctx.lineTo(0, 34 + Math.random() * 10);
      ctx.lineTo(6, 18);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, 900, 560);
    const bg = ctx.createLinearGradient(0, 0, 0, 560);
    bg.addColorStop(0, "#050d18");
    bg.addColorStop(1, "#17314d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 900, 560);

    for (let star = 0; star < 70; star += 1) {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillRect((star * 53) % 900, (star * 97) % 320, 2, 2);
    }

    ctx.beginPath();
    ctx.moveTo(0, 560);
    terrain.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(900, 560);
    ctx.closePath();
    ctx.fillStyle = "#2f455d";
    ctx.fill();

    ctx.fillStyle = "#7ef0bb";
    ctx.fillRect(landingPad.x, landingPad.y - 4, landingPad.width, 8);

    drawShip();

    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.font = "700 18px Trebuchet MS";
    ctx.textAlign = "left";
    ctx.fillText(`Angle ${Math.round((ship.angle * 180) / Math.PI)}°`, 680, 44);
    ctx.fillText(`Vx ${ship.vx.toFixed(2)}  Vy ${ship.vy.toFixed(2)}`, 680, 72);

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.fillRect(0, 0, 900, 560);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Rocket Lander", 450, 260);
      ctx.font = "19px Trebuchet MS";
      ctx.fillText(getConfig().infiniteFuel ? "Chill mode gives you infinite fuel" : "Use thrust and tiny corrections to land upright", 450, 294);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "lander",
    title: "Rocket Lander",
    tagline: "Moon-landing balance test",
    subtitle: "Feather the thrust, keep the rocket upright, and land softly on a tiny pad.",
    description:
      "A lunar lander-style skill game with a gentler learning curve, longer stage progression, and an infinite-fuel Chill mode if you just want to practice landings.",
    controls: "Left and right rotate, Up or Space thrusts, and Chill difficulty gives infinite fuel.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "fuel", label: "Fuel 0" },
          { id: "speed", label: "Speed 0.00" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 900;
      shell.canvas.height = 560;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus(`Stage ${stageLevel}`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      keys = { left: false, right: false, thrust: false };
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
      if (["ArrowUp", "w", "W", " "].includes(event.key)) keys.thrust = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
      if (["ArrowUp", "w", "W", " "].includes(event.key)) keys.thrust = false;
    },
  };
}

function createHoopShotGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let stageLevel = 1;
  let shotsLeft = 0;
  let streak = 0;
  let madeThisStage = 0;
  let ball = null;
  let shooterX = 132;
  let aimAngle = -0.92;
  let hoop = { x: 650, y: 220, vx: 1.4, width: 86 };
  const keys = { left: false, right: false, up: false, down: false };

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { shots: 9, hoopSpeed: 1.05, hoopWidth: 108 };
    if (mode === "easy") return { shots: 8, hoopSpeed: 1.2, hoopWidth: 98 };
    if (mode === "hard") return { shots: 6, hoopSpeed: 1.9, hoopWidth: 76 };
    if (mode === "chaos") return { shots: 5, hoopSpeed: 2.15, hoopWidth: 70 };
    return { shots: 7, hoopSpeed: 1.5, hoopWidth: 88 };
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.shots.textContent = `Shots ${shotsLeft}`;
    shell.hud.streak.textContent = `Made ${madeThisStage}`;
    refreshLevel();
  }

  function buildStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    shotsLeft = config.shots;
    streak = 0;
    madeThisStage = 0;
    ball = null;
    shooterX = 132;
    aimAngle = -0.92;
    hoop = {
      x: 620,
      y: 240 - Math.min(80, (level - 1) * 10),
      vx: (config.hoopSpeed + level * 0.08) * (level % 2 === 0 ? -1 : 1),
      width: Math.max(62, config.hoopWidth - Math.floor((level - 1) / 3) * 4),
    };
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
    setStatus(`Stage ${stageLevel}`);
  }

  function resetState() {
    running = false;
    buildStage(1);
  }

  function shoot() {
    if (!running || ball || shotsLeft <= 0) return;
    shotsLeft -= 1;
    const shotPower = 15.2;
    ball = {
      x: shooterX,
      y: 430,
      vx: Math.cos(aimAngle) * shotPower,
      vy: Math.sin(aimAngle) * shotPower,
      radius: 14,
      scored: false,
    };
    updateHud();
    setStatus("Shot up");
  }

  function scoreBasket() {
    if (!ball || ball.scored) return;
    ball.scored = true;
    streak += 1;
    madeThisStage += 1;
    setScore(appState.score + 40 + streak * 10 + stageLevel * 6);
    updateHud();
    setStatus(streak > 1 ? `Nothing but net x${streak}` : "Bucket");
    const finishedStage = madeThisStage >= 3;
    ball = null;
    if (finishedStage) {
      running = false;
      window.setTimeout(() => {
        buildStage(stageLevel + 1, true);
        running = true;
        frame();
      }, 420);
      return;
    }
    if (shotsLeft <= 0) {
      running = false;
      setStatus("Out of shots - auto reset");
      scheduleAutoReset();
    }
  }

  function missShot() {
    ball = null;
    streak = 0;
    updateHud();
    if (shotsLeft <= 0) {
      running = false;
      setStatus("Out of shots - auto reset");
      scheduleAutoReset();
    } else {
      setStatus("Missed - line up again");
    }
  }

  function update() {
    if (!running) return;
    hoop.x += hoop.vx;
    if (hoop.x < 470 || hoop.x + hoop.width > 820) {
      hoop.vx *= -1;
    }

    if (!ball) {
      if (keys.left) shooterX -= 4.2;
      if (keys.right) shooterX += 4.2;
      if (keys.up) aimAngle = Math.max(-1.35, aimAngle - 0.03);
      if (keys.down) aimAngle = Math.min(-0.55, aimAngle + 0.03);
      shooterX = clamp(shooterX, 86, 240);
      return;
    }

    const previousY = ball.y;
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += 0.36;

    const rimY = hoop.y + 20;
    const leftRim = hoop.x;
    const rightRim = hoop.x + hoop.width;
    const crossesHoopPlane = previousY <= rimY && ball.y >= rimY;
    const insideHoop = ball.x > leftRim + 8 && ball.x < rightRim - 8;
    if (crossesHoopPlane && insideHoop) {
      scoreBasket();
      return;
    }

    const hitLeftRim = Math.hypot(ball.x - leftRim, ball.y - rimY) < ball.radius + 6;
    const hitRightRim = Math.hypot(ball.x - rightRim, ball.y - rimY) < ball.radius + 6;
    if (hitLeftRim || hitRightRim) {
      ball.vx *= -0.78;
      ball.vy *= -0.42;
    }

    if (ball.y > 560 || ball.x > 940) {
      missShot();
    }
  }

  function drawCourt() {
    ctx.fillStyle = "#d88945";
    ctx.fillRect(0, 0, 900, 560);
    ctx.strokeStyle = "rgba(255,255,255,0.26)";
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 852, 512);
    ctx.beginPath();
    ctx.arc(180, 430, 90, -0.8, 0.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(180, 430, 42, 0, Math.PI * 2);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, 900, 560);
    drawCourt();

    ctx.fillStyle = "#d7ecff";
    ctx.fillRect(hoop.x + hoop.width - 8, hoop.y - 68, 12, 74);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(hoop.x + hoop.width - 28, hoop.y - 70, 46, 34);
    ctx.strokeStyle = "#ff6b6b";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(hoop.x, hoop.y);
    ctx.lineTo(hoop.x + hoop.width, hoop.y);
    ctx.stroke();
    ctx.strokeStyle = "#f7f7f7";
    ctx.lineWidth = 2;
    for (let index = 1; index < 5; index += 1) {
      ctx.beginPath();
      ctx.moveTo(hoop.x + index * (hoop.width / 5), hoop.y);
      ctx.lineTo(hoop.x + index * (hoop.width / 5) - 8, hoop.y + 24);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(shooterX, 430);
    ctx.rotate(aimAngle + Math.PI / 2);
    ctx.strokeStyle = "rgba(255,255,255,0.44)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, -52);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "#8f66ff";
    ctx.beginPath();
    ctx.arc(shooterX, 430, 22, 0, Math.PI * 2);
    ctx.fill();

    if (ball) {
      ctx.fillStyle = "#ff8a3d";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(120,52,18,0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius - 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.textAlign = "center";
    ctx.font = "700 18px Trebuchet MS";
    ctx.fillText(`Move with Left/Right. Aim with Up/Down. Angle ${Math.round((-aimAngle * 180) / Math.PI)}°`, 450, 34);

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, 900, 560);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Hoop Shot", 450, 250);
      ctx.font = "19px Trebuchet MS";
      ctx.fillText("Move, aim, and sink the moving hoop", 450, 284);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "hoop",
    title: "Hoop Shot",
    tagline: "Moving basket score run",
    subtitle: "Move, aim, and fire clean arcs into the moving hoop.",
    description:
      "A basketball-style arcade shooter where you position the shooter, adjust the launch arc, and try to chain makes before shots run out.",
    controls: "Left and right move the shooter, Up and Down change the arc, and Space shoots.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "shots", label: "Shots 0" },
          { id: "streak", label: "Made 0" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 900;
      shell.canvas.height = 560;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus(`Stage ${stageLevel}`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      keys.left = false;
      keys.right = false;
      keys.up = false;
      keys.down = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = true;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = true;
      if (event.key === " ") shoot();
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = false;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = false;
    },
  };
}

function createTreasureCupsGame() {
  let wrapper;
  let stageLevel = 1;
  let order = [];
  let targetCupId = 0;
  let canPick = false;
  let revealMode = true;
  let shuffleTimer = null;

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { cups: 3, shuffles: 3, delay: 520 };
    if (mode === "easy") return { cups: 3, shuffles: 4, delay: 440 };
    if (mode === "hard") return { cups: 4, shuffles: 7, delay: 300 };
    if (mode === "chaos") return { cups: 5, shuffles: 9, delay: 250 };
    return { cups: 3, shuffles: 5, delay: 360 };
  }

  function clearShuffleTimer() {
    if (shuffleTimer) {
      clearTimeout(shuffleTimer);
      shuffleTimer = null;
    }
  }

  function updateHud() {
    wrapper.querySelector('[data-hud="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-hud="cups"]').textContent = `Cups ${order.length}`;
    wrapper.querySelector('[data-hud="mode"]').textContent = revealMode ? "Mode Reveal" : canPick ? "Mode Pick" : "Mode Shuffle";
    refreshLevel();
  }

  function renderBoard(selectedIndex = -1) {
    const board = wrapper.querySelector(".cups-row");
    board.innerHTML = order
      .map((cupId, index) => {
        const showGem = revealMode && cupId === targetCupId;
        const chosen = selectedIndex === index;
        return `
          <button class="cup-button ${showGem ? "cup-reveal" : ""} ${chosen ? "cup-choice" : ""}" data-index="${index}">
            <span class="cup-shell">U</span>
            <span class="cup-gem">${showGem ? "♦" : "?"}</span>
          </button>
        `;
      })
      .join("");
    board.querySelectorAll("[data-index]").forEach((button) => {
      button.addEventListener("click", () => pickCup(Number(button.dataset.index)));
    });
    updateHud();
  }

  function startShuffle() {
    const config = getConfig();
    let remaining = config.shuffles + stageLevel;
    revealMode = false;
    canPick = false;
    renderBoard();
    setStatus("Watch the shuffle");

    const doShuffle = () => {
      if (remaining <= 0) {
        shuffleTimer = null;
        canPick = true;
        renderBoard();
        setStatus("Pick the treasure cup");
        return;
      }
      const left = Math.floor(Math.random() * order.length);
      let right = Math.floor(Math.random() * order.length);
      while (right === left) right = Math.floor(Math.random() * order.length);
      [order[left], order[right]] = [order[right], order[left]];
      renderBoard();
      remaining -= 1;
      shuffleTimer = window.setTimeout(doShuffle, Math.max(120, config.delay - stageLevel * 10));
    };

    shuffleTimer = window.setTimeout(doShuffle, 650);
  }

  function buildStage(level, preserveScore = false) {
    clearShuffleTimer();
    const config = getConfig();
    stageLevel = level;
    order = Array.from({ length: config.cups }, (_, index) => index);
    targetCupId = order[Math.floor(Math.random() * order.length)];
    revealMode = true;
    canPick = false;
    if (!preserveScore) setScore(0);
    renderBoard();
    setStatus("Memorize the treasure cup");
    shuffleTimer = window.setTimeout(() => {
      startShuffle();
    }, 1000);
  }

  function resetState() {
    buildStage(1);
  }

  function pickCup(index) {
    if (!canPick) return;
    canPick = false;
    revealMode = true;
    renderBoard(index);
    const chosenCupId = order[index];
    if (chosenCupId === targetCupId) {
      setScore(appState.score + 45 + stageLevel * 10);
      setStatus("Correct pick");
      shuffleTimer = window.setTimeout(() => {
        buildStage(stageLevel + 1, true);
      }, 520);
      return;
    }
    setStatus("Wrong cup - auto reset");
    scheduleAutoReset();
  }

  return {
    id: "cups",
    title: "Treasure Cups",
    tagline: "Shuffle-and-guess memory game",
    subtitle: "Track the hidden treasure through faster shuffles and pick the right cup.",
    description:
      "A shell-game style memory challenge where you watch the treasure cup, survive the shuffle, and guess correctly to keep climbing stages.",
    controls: "Watch the reveal, follow the shuffle, then click the cup hiding the treasure.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="cups-card">
          <div class="info-chip-row">
            <span class="info-chip" data-hud="stage">Stage 1</span>
            <span class="info-chip" data-hud="cups">Cups 3</span>
            <span class="info-chip" data-hud="mode">Mode Reveal</span>
          </div>
          <div class="cups-row"></div>
          <p class="compact-copy">The treasure starts under one cup, then the cups shuffle faster each stage. Click the correct one after the shuffle stops.</p>
        </div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus("Track the treasure");
    },
    reset() {
      clearShuffleTimer();
      resetState();
      setStatus("Ready");
    },
    destroy() {
      clearShuffleTimer();
    },
  };
}

function createPlinkoDropGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let stageLevel = 1;
  let dropsLeft = 0;
  let chip = null;
  let pegs = [];
  let slots = [];
  let bumpers = [];
  let dropX = 410;
  let nudgesLeft = 0;
  let hotSlotIndex = 3;
  let nudgeCooldown = 0;

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { drops: 8, drift: 1.15, bumperBoost: 7.2, nudges: 4, nudgeForce: 1.35, hotMultiplier: 1.7 };
    if (mode === "easy") return { drops: 7, drift: 1.4, bumperBoost: 7.8, nudges: 4, nudgeForce: 1.5, hotMultiplier: 1.8 };
    if (mode === "hard") return { drops: 5, drift: 2.1, bumperBoost: 9.2, nudges: 3, nudgeForce: 1.8, hotMultiplier: 2.0 };
    if (mode === "chaos") return { drops: 4, drift: 2.4, bumperBoost: 9.8, nudges: 2, nudgeForce: 2.05, hotMultiplier: 2.2 };
    return { drops: 6, drift: 1.75, bumperBoost: 8.5, nudges: 3, nudgeForce: 1.65, hotMultiplier: 1.9 };
  }

  function buildBoard() {
    pegs = [];
    for (let row = 0; row < 7; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        pegs.push({
          x: 170 + col * 86 + (row % 2) * 42,
          y: 110 + row * 54,
          bonus: Math.random() < 0.12,
        });
      }
    }
    hotSlotIndex = (stageLevel + (appState.difficulty === "chaos" ? 2 : 0)) % 7;
    const baseScores = [30, 60, 110, 180, 110, 60, 30];
    slots = baseScores.map((score, index) => ({
      x: 120 + index * 88,
      width: 88,
      score,
      multiplier: index === hotSlotIndex ? getConfig().hotMultiplier : 1,
    }));
    bumpers = [
      { id: "up", x: 268, y: 452, width: 118, height: 16, tilt: -0.48, activeFrames: 0, label: "UP" },
      { id: "down", x: 438, y: 452, width: 118, height: 16, tilt: 0.48, activeFrames: 0, label: "DOWN" },
    ];
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.drops.textContent = `Drops ${dropsLeft}`;
    shell.hud.bestslot.textContent = chip ? `Nudges ${nudgesLeft}` : `Hot x${slots[hotSlotIndex]?.multiplier?.toFixed(1) || "1.0"}`;
    refreshLevel();
  }

  function buildStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    dropsLeft = config.drops;
    chip = null;
    nudgesLeft = config.nudges;
    nudgeCooldown = 0;
    dropX = 410;
    buildBoard();
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
    setStatus(`Stage ${stageLevel}`);
  }

  function resetState() {
    running = false;
    buildStage(1);
  }

  function dropChip() {
    if (!running || chip || dropsLeft <= 0) return;
    dropsLeft -= 1;
    chip = {
      x: dropX,
      y: 34,
      vx: (Math.random() * 2 - 1) * 0.8,
      vy: 1.4,
      radius: 12,
      bonusScore: 0,
      hitBonusPegIds: new Set(),
    };
    nudgesLeft = getConfig().nudges;
    updateHud();
    setStatus("Chip dropped");
  }

  function resolveSlot() {
    if (!chip) return;
    const slot = slots.find((entry) => chip.x >= entry.x && chip.x < entry.x + entry.width) || slots[0];
    const slotScore = Math.round(slot.score * slot.multiplier);
    const totalScore = slotScore + stageLevel * 8 + chip.bonusScore;
    setScore(appState.score + totalScore);
    chip = null;
    if (dropsLeft <= 0) {
      running = false;
      setStatus("Round scored");
      window.setTimeout(() => {
        buildStage(stageLevel + 1, true);
        running = true;
        frame();
      }, 420);
    } else {
      setStatus(`Scored ${totalScore}`);
    }
    updateHud();
  }

  function update() {
    if (!running || !chip) return;
    const config = getConfig();
    nudgeCooldown = Math.max(0, nudgeCooldown - 1);
    chip.vy += 0.18;
    chip.x += chip.vx;
    chip.y += chip.vy;
    chip.x = clamp(chip.x, 56, 764);

    pegs.forEach((peg, pegIndex) => {
      const dx = chip.x - peg.x;
      const dy = chip.y - peg.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0 && distance < chip.radius + 7) {
        chip.vx = clamp(chip.vx + (dx / distance) * config.drift, -4.8, 4.8);
        chip.vy *= 0.84;
        chip.y = peg.y + (dy >= 0 ? 18 : -18);
        if (peg.bonus && !chip.hitBonusPegIds.has(pegIndex)) {
          chip.hitBonusPegIds.add(pegIndex);
          chip.bonusScore += 12 + stageLevel * 2;
          setStatus("Bonus peg");
        }
      }
    });

    bumpers.forEach((bumper) => {
      bumper.activeFrames = Math.max(0, bumper.activeFrames - 1);
      const halfWidth = bumper.width / 2;
      const dx = chip.x - bumper.x;
      const dy = chip.y - bumper.y;
      const withinX = Math.abs(dx) <= halfWidth + chip.radius;
      const withinY = Math.abs(dy) <= bumper.height + chip.radius;
      if (bumper.activeFrames > 0 && withinX && withinY && chip.vy > -2.5) {
        chip.vy = -config.bumperBoost;
        chip.vx = clamp(chip.vx + bumper.tilt * 5.4, -6.4, 6.4);
        chip.y = bumper.y - chip.radius - 10;
      }
    });

    chip.vx *= 0.994;
    if (chip.y >= 500) {
      resolveSlot();
    }
  }

  function nudgeChip(direction) {
    if (!running) return;
    if (!chip) {
      dropX = clamp(dropX + direction * 38, 120, 700);
      draw();
      return;
    }
    if (nudgesLeft <= 0 || nudgeCooldown > 0) return;
    chip.vx = clamp(chip.vx + direction * getConfig().nudgeForce, -7.2, 7.2);
    chip.vy = Math.max(chip.vy - 0.2, -3.8);
    nudgesLeft -= 1;
    nudgeCooldown = 8;
    updateHud();
    setStatus(direction < 0 ? "Nudged left" : "Nudged right");
  }

  function draw() {
    ctx.clearRect(0, 0, 820, 560);
    const bg = ctx.createLinearGradient(0, 0, 0, 560);
    bg.addColorStop(0, "#08111f");
    bg.addColorStop(1, "#13314d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 820, 560);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(70, 60, 680, 450);

    pegs.forEach((peg) => {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = peg.bonus ? "#facc15" : "#dbe5f2";
      ctx.fill();
    });

    slots.forEach((slot) => {
      const isHot = slot.multiplier > 1;
      ctx.fillStyle = isHot ? "#7ef0bb" : slot.score >= 180 ? "#8f66ff" : slot.score >= 110 ? "#46b1ff" : "#ff8a3d";
      ctx.fillRect(slot.x, 500, slot.width - 4, 42);
      ctx.fillStyle = "#08111f";
      ctx.font = "700 15px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(isHot ? `x${slot.multiplier.toFixed(1)}` : String(slot.score), slot.x + slot.width / 2 - 2, 520);
      ctx.font = "700 12px Trebuchet MS";
      ctx.fillText(String(slot.score), slot.x + slot.width / 2 - 2, 536);
    });

    bumpers.forEach((bumper) => {
      ctx.save();
      ctx.translate(bumper.x, bumper.y);
      ctx.rotate(bumper.activeFrames > 0 ? bumper.tilt * 0.7 : bumper.tilt * 0.18);
      ctx.fillStyle = bumper.activeFrames > 0 ? "#7ef0bb" : "#46b1ff";
      ctx.fillRect(-bumper.width / 2, -bumper.height / 2, bumper.width, bumper.height);
      ctx.restore();
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = "700 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(bumper.label, bumper.x, bumper.y - 18);
    });

    if (chip) {
      ctx.beginPath();
      ctx.arc(chip.x, chip.y, chip.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd166";
      ctx.fill();
      if (chip.bonusScore > 0) {
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = "700 14px Trebuchet MS";
        ctx.textAlign = "left";
        ctx.fillText(`+${chip.bonusScore}`, 22, 62);
      }
    } else {
      ctx.strokeStyle = "rgba(255,255,255,0.65)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(dropX, 34);
      ctx.lineTo(dropX - 10, 20);
      ctx.moveTo(dropX, 34);
      ctx.lineTo(dropX + 10, 20);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.textAlign = "center";
    ctx.font = "700 18px Trebuchet MS";
    ctx.fillText("Left and Right aim or nudge. Space drops. Up and Down fire the bumpers.", 410, 34);

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, 820, 560);
      ctx.fillStyle = "white";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Plinko Drop", 410, 250);
      ctx.font = "19px Trebuchet MS";
      ctx.fillText("Drop chips through the peg field and chase the best slot", 410, 284);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "plinko",
    title: "Plinko Drop",
    tagline: "Peg-board score chaser",
    subtitle: "Drop chips through the peg field and land in the highest scoring slot.",
    description:
      "A Plinko-style arcade game with aimable drops, bonus pegs, hot slots, limited mid-air nudges, and controllable bumpers so each chip has more strategy.",
    controls: "Left and Right aim the drop or nudge a falling chip. Space drops. Up and Down fire the bumpers.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "drops", label: "Drops 0" },
          { id: "bestslot", label: "Best 180" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 820;
      shell.canvas.height = 560;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus(`Stage ${stageLevel}`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (event.key === " ") {
        dropChip();
        return;
      }
      if (["ArrowLeft", "a", "A"].includes(event.key)) {
        nudgeChip(-1);
        return;
      }
      if (["ArrowRight", "d", "D"].includes(event.key)) {
        nudgeChip(1);
        return;
      }
      if (["ArrowUp", "w", "W"].includes(event.key)) {
        const bumper = bumpers.find((entry) => entry.id === "up");
        if (bumper) bumper.activeFrames = 10;
        return;
      }
      if (["ArrowDown", "s", "S"].includes(event.key)) {
        const bumper = bumpers.find((entry) => entry.id === "down");
        if (bumper) bumper.activeFrames = 10;
      }
    },
  };
}

function createOrbDodgeGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let player;
  let hazards = [];
  let spawnTick = 0;
  let survivedFrames = 0;
  let stageLevel = 1;
  const keys = { left: false, right: false, up: false, down: false };

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { speed: 2.9, spawnRate: 54, hazardSpeed: 2.0 };
    if (mode === "easy") return { speed: 3.1, spawnRate: 46, hazardSpeed: 2.2 };
    if (mode === "hard") return { speed: 3.8, spawnRate: 28, hazardSpeed: 3.1 };
    if (mode === "chaos") return { speed: 4.1, spawnRate: 24, hazardSpeed: 3.45 };
    return { speed: 3.4, spawnRate: 36, hazardSpeed: 2.6 };
  }

  function updateHud() {
    shell.hud.time.textContent = `Time ${Math.floor(survivedFrames / 60)}s`;
    shell.hud.orbs.textContent = `Orbs ${hazards.length}`;
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    refreshLevel();
  }

  function resetState() {
    player = { x: 390, y: 250, radius: 14 };
    hazards = [];
    spawnTick = 0;
    survivedFrames = 0;
    stageLevel = 1;
    running = false;
    setScore(0);
    updateHud();
    draw();
  }

  function spawnHazard() {
    const config = getConfig();
    const side = Math.floor(Math.random() * 4);
    const spawn = {
      x: side === 0 ? -24 : side === 1 ? 804 : Math.random() * 780,
      y: side === 2 ? -24 : side === 3 ? 524 : Math.random() * 500,
      radius: 12 + Math.random() * 8,
      vx: 0,
      vy: 0,
      hue: 190 + Math.random() * 140,
    };
    const dx = player.x - spawn.x;
    const dy = player.y - spawn.y;
    const distance = Math.hypot(dx, dy) || 1;
    const speed = config.hazardSpeed + Math.min(1.8, stageLevel * 0.08);
    spawn.vx = (dx / distance) * speed;
    spawn.vy = (dy / distance) * speed;
    hazards.push(spawn);
  }

  function update() {
    if (!running) return;
    const config = getConfig();
    survivedFrames += 1;
    stageLevel = 1 + Math.floor(survivedFrames / 420);

    if (keys.left) player.x -= config.speed;
    if (keys.right) player.x += config.speed;
    if (keys.up) player.y -= config.speed;
    if (keys.down) player.y += config.speed;
    player.x = clamp(player.x, 24, 776);
    player.y = clamp(player.y, 24, 496);

    spawnTick += 1;
    const spawnRate = Math.max(10, config.spawnRate - Math.floor(stageLevel / 2));
    if (spawnTick >= spawnRate) {
      spawnTick = 0;
      spawnHazard();
    }

    hazards.forEach((hazard) => {
      hazard.x += hazard.vx;
      hazard.y += hazard.vy;
    });
    hazards = hazards.filter((hazard) => hazard.x > -60 && hazard.x < 840 && hazard.y > -60 && hazard.y < 580);

    const hit = hazards.some((hazard) => Math.hypot(hazard.x - player.x, hazard.y - player.y) < hazard.radius + player.radius);
    if (hit) {
      running = false;
      setStatus("Tagged by an orb - auto reset");
      scheduleAutoReset();
      return;
    }

    setScore(Math.floor(survivedFrames / 6));
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 800, 520);
    const bg = ctx.createRadialGradient(player.x, player.y, 30, 400, 260, 420);
    bg.addColorStop(0, "rgba(70, 177, 255, 0.16)");
    bg.addColorStop(1, "#08111f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 800, 520);

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, 764, 484);

    hazards.forEach((hazard) => {
      ctx.beginPath();
      ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hazard.hue} 82% 60%)`;
      ctx.fill();
    });

    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd166";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 10, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 209, 102, 0.24)";
    ctx.stroke();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.fillRect(0, 0, 800, 520);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Orb Dodge", 400, 242);
      ctx.font = "19px Trebuchet MS";
      ctx.fillText("Stay alive, weave the arena, and outlast the swarm", 400, 276);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "orb",
    title: "Orb Dodge",
    tagline: "Arena survival swarm",
    subtitle: "Weave through the arena, avoid the incoming swarm, and survive long enough to level up.",
    description:
      "A clean survival game where glowing hazards stream in from the edges and you stay alive by movement alone as the arena gets busier.",
    controls: "Use arrow keys or WASD to move and dodge every orb.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "time", label: "Time 0s" },
          { id: "orbs", label: "Orbs 0" },
          { id: "stage", label: "Stage 1" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 800;
      shell.canvas.height = 520;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Stay moving");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      keys.left = false;
      keys.right = false;
      keys.up = false;
      keys.down = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = true;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = false;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = false;
    },
  };
}

function createTunnelGlideGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let shipX = 260;
  let walls = [];
  let distance = 0;
  let stageLevel = 1;
  const keys = { left: false, right: false };

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { speed: 4.0, moveSpeed: 4.3, gap: 176, shift: 18 };
    if (mode === "easy") return { speed: 4.4, moveSpeed: 4.8, gap: 156, shift: 22 };
    if (mode === "hard") return { speed: 6.0, moveSpeed: 5.8, gap: 122, shift: 34 };
    if (mode === "chaos") return { speed: 6.5, moveSpeed: 6.2, gap: 110, shift: 40 };
    return { speed: 5.1, moveSpeed: 5.2, gap: 138, shift: 28 };
  }

  function updateHud() {
    shell.hud.distance.textContent = `Distance ${Math.floor(distance)}`;
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.speed.textContent = `Speed ${getCurrentSpeed().toFixed(1)}`;
    refreshLevel();
  }

  function getCurrentSpeed() {
    return getConfig().speed + stageLevel * 0.12;
  }

  function resetState() {
    shipX = 260;
    walls = [];
    distance = 0;
    stageLevel = 1;
    running = false;
    setScore(0);
    let seedGapX = clamp(shipX - getConfig().gap / 2, 90, 430);
    for (let y = -120; y < 620; y += 70) {
      if (y < 380) {
        seedGapX = clamp(seedGapX + (Math.random() * getConfig().shift * 2 - getConfig().shift), 90, 430);
      }
      walls.push({ y, gapX: seedGapX, gapWidth: getConfig().gap });
    }
    updateHud();
    draw();
  }

  function spawnWall() {
    const config = getConfig();
    const previous = walls[walls.length - 1];
    const nextX = clamp((previous?.gapX ?? 250) + (Math.random() * config.shift * 2 - config.shift), 90, 430);
    walls.push({
      y: -70,
      gapX: nextX,
      gapWidth: Math.max(92, config.gap - Math.floor(stageLevel / 2) * 3),
    });
  }

  function update() {
    if (!running) return;
    const moveSpeed = getConfig().moveSpeed;
    if (keys.left) shipX -= moveSpeed;
    if (keys.right) shipX += moveSpeed;
    shipX = clamp(shipX, 50, 550);

    const speed = getCurrentSpeed();
    distance += speed * 0.1;
    setScore(Math.floor(distance));
    stageLevel = 1 + Math.floor(distance / 140);

    walls.forEach((wall) => {
      wall.y += speed;
    });
    if (walls.length && walls[0].y > 620) {
      walls.shift();
      spawnWall();
    }

    const shipY = 460;
    const hit = walls.some((wall) => {
      if (shipY < wall.y || shipY > wall.y + 26) return false;
      return shipX < wall.gapX || shipX > wall.gapX + wall.gapWidth;
    });

    if (hit) {
      running = false;
      setStatus("Scraped the tunnel - auto reset");
      scheduleAutoReset();
      return;
    }

    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 600, 560);
    const bg = ctx.createLinearGradient(0, 0, 0, 560);
    bg.addColorStop(0, "#08111f");
    bg.addColorStop(1, "#102945");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 600, 560);

    walls.forEach((wall) => {
      ctx.fillStyle = "#2d4a68";
      ctx.fillRect(0, wall.y, wall.gapX, 26);
      ctx.fillRect(wall.gapX + wall.gapWidth, wall.y, 600 - (wall.gapX + wall.gapWidth), 26);
    });

    ctx.fillStyle = "#7ef0bb";
    ctx.beginPath();
    ctx.moveTo(shipX, 430);
    ctx.lineTo(shipX + 16, 490);
    ctx.lineTo(shipX - 16, 490);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#46b1ff";
    ctx.fillRect(shipX - 6, 490, 12, 18);

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, 600, 560);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Tunnel Glide", 300, 252);
      ctx.font = "19px Trebuchet MS";
      ctx.fillText("Steer through the moving tunnel and survive the speed ramp", 300, 286);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "tunnel",
    title: "Tunnel Glide",
    tagline: "Narrow corridor reflex run",
    subtitle: "Steer through the shifting tunnel and survive as the corridor speeds up.",
    description:
      "A fast tunnel-runner where horizontal movement is everything. Stay inside the gaps, react to corridor shifts, and last longer as speed rises.",
    controls: "Use left and right arrows or A and D to stay inside the moving tunnel gap.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "distance", label: "Distance 0" },
          { id: "stage", label: "Stage 1" },
          { id: "speed", label: "Speed 0.0" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 600;
      shell.canvas.height = 560;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Keep centered");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      keys.left = false;
      keys.right = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
    },
  };
}

function createMarbleTiltGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let stageLevel = 1;
  let board = [];
  let marble = { x: 0, y: 0, vx: 0, vy: 0 };
  const keys = { left: false, right: false, up: false, down: false };
  const tile = 56;
  const levelSets = {
    easy: [
      [
        "########",
        "#S.....#",
        "#..#...#",
        "#..#..G#",
        "#......#",
        "########",
      ],
      [
        "########",
        "#S..#..#",
        "#...#..#",
        "#...#G.#",
        "#......#",
        "########",
      ],
      [
        "#########",
        "#S.....G#",
        "#.###...#",
        "#.......#",
        "#...#...#",
        "#########",
      ],
      [
        "#########",
        "#S....#G#",
        "#.##..#.#",
        "#.......#",
        "#.#..##.#",
        "#.......#",
        "#########",
      ],
      [
        "##########",
        "#S.......#",
        "#.#..#.#.#",
        "#.#....#G#",
        "#....#...#",
        "#........#",
        "##########",
      ],
      [
        "##########",
        "#S.....#G#",
        "#.###..#.#",
        "#.....##.#",
        "#........#",
        "#..#.....#",
        "##########",
      ],
      [
        "###########",
        "#S........#",
        "#.###.###.#",
        "#.....#...#",
        "#.###.#.#G#",
        "#.........#",
        "###########",
      ],
      [
        "###########",
        "#S.......G#",
        "#.#####.#.#",
        "#.......#.#",
        "#.#.#####.#",
        "#.........#",
        "###########",
      ],
    ],
    normal: [
      [
        "########",
        "#S..#..#",
        "#.#.#O.#",
        "#.#...G#",
        "#...#..#",
        "########",
      ],
      [
        "#########",
        "#S.....G#",
        "#.###.#.#",
        "#...O.#.#",
        "#.#...#.#",
        "#.......#",
        "#########",
      ],
      [
        "#########",
        "#S....#G#",
        "#.##..#.#",
        "#..O..#.#",
        "#.#..##.#",
        "#.......#",
        "#########",
      ],
      [
        "##########",
        "#S...#...#",
        "#.#O.#.#G#",
        "#.#..#.#.#",
        "#....O...#",
        "#.######.#",
        "#........#",
        "##########",
      ],
      [
        "##########",
        "#S..O....#",
        "#.##.#.#.#",
        "#....#.#G#",
        "#.O..#...#",
        "#....###.#",
        "##########",
      ],
      [
        "###########",
        "#S...#....#",
        "#.#O.#.##.#",
        "#.#..#..#.#",
        "#...O...#G#",
        "#.#####...#",
        "#.........#",
        "###########",
      ],
      [
        "###########",
        "#S....#..G#",
        "#.##O.#.#.#",
        "#....##.#.#",
        "#.O......##",
        "#...###...#",
        "###########",
      ],
      [
        "############",
        "#S.....#...#",
        "#.###O.#.#.#",
        "#...#..#.#G#",
        "#.#...O..#.#",
        "#...####...#",
        "#..........#",
        "############",
      ],
    ],
    hard: [
      [
        "#########",
        "#S.....G#",
        "#.###.#.#",
        "#...O.#.#",
        "#.#...#.#",
        "#.......#",
        "#########",
      ],
      [
        "##########",
        "#S...#...#",
        "#.#..#.#G#",
        "#.#..#.#.#",
        "#....O...#",
        "#.######.#",
        "#........#",
        "##########",
      ],
      [
        "##########",
        "#S.......#",
        "#.##.#.#.#",
        "#....#.#G#",
        "#.O..#...#",
        "#....###.#",
        "##########",
      ],
      [
        "###########",
        "#S...#....#",
        "#.#..#.##.#",
        "#.#..#..#.#",
        "#...O...#G#",
        "#.#####...#",
        "#.........#",
        "###########",
      ],
      [
        "###########",
        "#S....#..G#",
        "#.##..#.#.#",
        "#....##.#.#",
        "#.O......##",
        "#...###...#",
        "###########",
      ],
      [
        "############",
        "#S.....#...#",
        "#.###..#.#.#",
        "#...#..#.#G#",
        "#.#...O..#.#",
        "#...####...#",
        "#..........#",
        "############",
      ],
      [
        "############",
        "#S.....#..G#",
        "#.##.#.#.#.#",
        "#....#...#.#",
        "#.O.###..#.#",
        "#....#.....#",
        "#.######...#",
        "############",
      ],
      [
        "#############",
        "#S....#....G#",
        "#.##..#.###.#",
        "#....##...#.#",
        "#.#O...O#.#.#",
        "#...###.#...#",
        "#.#####.###.#",
        "#...........#",
        "#############",
      ],
    ],
    chaos: [
      [
        "###########",
        "#S..O...#.G#",
        "#.##.#.#.#.#",
        "#....#...#.#",
        "#.O.###O.#.#",
        "#....#.....#",
        "#.######...#",
        "###########",
      ],
      [
        "#############",
        "#S....#....G#",
        "#.##O.#.###.#",
        "#....##...#.#",
        "#.#O...O#.#.#",
        "#...###.#...#",
        "#.#####.###.#",
        "#...........#",
        "#############",
      ],
      [
        "#############",
        "#S..O...#..G#",
        "#.####.#.#.##",
        "#....#.#.#..#",
        "#.O..#...#O.#",
        "#..###.###..#",
        "#......O....#",
        "#############",
      ],
      [
        "##############",
        "#S....#.....G#",
        "#.##O.#.###..#",
        "#....##...#O.#",
        "#.#O...O#.#..#",
        "#...###.#...##",
        "#.#####.###..#",
        "#........O...#",
        "##############",
      ],
    ],
  };

  function getCurrentLayout() {
    const set = getLevelSet();
    return set[(stageLevel - 1) % set.length];
  }

  function getLevelSet() {
    if (appState.difficulty === "chill" || appState.difficulty === "easy") return levelSets.easy;
    if (appState.difficulty === "hard") return levelSets.hard;
    if (appState.difficulty === "chaos") return levelSets.chaos;
    return levelSets.normal;
  }

  function getConfig() {
    if (appState.difficulty === "chill") return { accel: 0.15, friction: 0.89, maxSpeed: 3.25, bounce: -0.1 };
    if (appState.difficulty === "easy") return { accel: 0.19, friction: 0.91, maxSpeed: 3.85, bounce: -0.12 };
    if (appState.difficulty === "hard") return { accel: 0.27, friction: 0.935, maxSpeed: 4.8, bounce: -0.16 };
    if (appState.difficulty === "chaos") return { accel: 0.31, friction: 0.945, maxSpeed: 5.25, bounce: -0.19 };
    return { accel: 0.23, friction: 0.922, maxSpeed: 4.3, bounce: -0.14 };
  }

  function loadStage(level, preserveScore = false) {
    stageLevel = level;
    board = getCurrentLayout().map((row) => row.split(""));
    if (shell?.canvas) {
      shell.canvas.width = board[0].length * tile;
      shell.canvas.height = board.length * tile;
    }
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === "S") {
          marble = {
            x: colIndex * tile + tile / 2,
            y: rowIndex * tile + tile / 2,
            vx: 0,
            vy: 0,
          };
          board[rowIndex][colIndex] = ".";
        }
      });
    });
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
    setStatus(`Stage ${stageLevel}`);
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.speed.textContent = `Speed ${Math.hypot(marble.vx, marble.vy).toFixed(2)}`;
    shell.hud.goal.textContent = "Reach goal";
    refreshLevel();
  }

  function getCell(col, row) {
    return board[row]?.[col] ?? "#";
  }

  function resetState() {
    running = false;
    loadStage(1);
  }

  function collideAxis(nextX, nextY, axis) {
    const radius = 12;
    const checks = [
      [nextX - radius, nextY - radius],
      [nextX + radius, nextY - radius],
      [nextX - radius, nextY + radius],
      [nextX + radius, nextY + radius],
    ];
    const hitWall = checks.some(([x, y]) => getCell(Math.floor(x / tile), Math.floor(y / tile)) === "#");
    if (!hitWall) return { x: nextX, y: nextY, blocked: false };
    if (axis === "x") return { x: marble.x, y: nextY, blocked: true };
    return { x: nextX, y: marble.y, blocked: true };
  }

  function update() {
    if (!running) return;
    const config = getConfig();
    const ax = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    const ay = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    marble.vx = clamp((marble.vx + ax * config.accel) * config.friction, -config.maxSpeed, config.maxSpeed);
    marble.vy = clamp((marble.vy + ay * config.accel) * config.friction, -config.maxSpeed, config.maxSpeed);

    let moved = collideAxis(marble.x + marble.vx, marble.y, "x");
    marble.x = moved.x;
    if (moved.blocked) marble.vx *= config.bounce;

    moved = collideAxis(marble.x, marble.y + marble.vy, "y");
    marble.y = moved.y;
    if (moved.blocked) marble.vy *= config.bounce;

    const col = Math.floor(marble.x / tile);
    const row = Math.floor(marble.y / tile);
    const cell = getCell(col, row);

    if (cell === "O") {
      running = false;
      setStatus("Dropped into a hole - auto reset");
      scheduleAutoReset();
      return;
    }

    if (cell === "G") {
      running = false;
      setScore(appState.score + 100 + stageLevel * 20);
      setStatus("Goal reached");
      window.setTimeout(() => {
        loadStage(stageLevel + 1, true);
        running = true;
        frame();
      }, 400);
      return;
    }

    setScore(appState.score + 1);
    updateHud();
  }

  function draw() {
    const rows = board.length;
    const cols = board[0].length;
    const width = cols * tile;
    const height = rows * tile;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0b1829";
    ctx.fillRect(0, 0, width, height);

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const x = colIndex * tile;
        const y = rowIndex * tile;
        ctx.fillStyle = cell === "#" ? "#2b425f" : "rgba(255,255,255,0.05)";
        if (cell === "G") ctx.fillStyle = "#1eb980";
        if (cell === "O") ctx.fillStyle = "#0a0f16";
        ctx.fillRect(x + 2, y + 2, tile - 4, tile - 4);
        if (cell === "O") {
          ctx.beginPath();
          ctx.arc(x + tile / 2, y + tile / 2, 14, 0, Math.PI * 2);
          ctx.fillStyle = "#000000";
          ctx.fill();
        }
      });
    });

    ctx.beginPath();
    ctx.arc(marble.x, marble.y, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd166";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(marble.x - 3, marble.y - 3, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 28px Trebuchet MS";
      ctx.fillText("Marble Tilt", width / 2, height / 2 - 8);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Tilt carefully into the goal", width / 2, height / 2 + 22);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "marble",
    title: "Marble Tilt",
    tagline: "Tilt-maze precision run",
    subtitle: "Guide the marble through walls and holes, then settle into the goal.",
    description:
      "A tilt-maze style precision game where momentum matters. Guide the marble around walls, avoid holes, and reach the goal to unlock the next stage.",
    controls: "Use arrow keys or WASD to tilt the marble through the maze.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "speed", label: "Speed 0.00" },
          { id: "goal", label: "Reach goal" },
        ],
      });
      stage.appendChild(shell.wrap);
      const layout = getCurrentLayout();
      shell.canvas.width = layout[0].length * tile;
      shell.canvas.height = layout.length * tile;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Tilt carefully");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      keys.left = false;
      keys.right = false;
      keys.up = false;
      keys.down = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = true;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = false;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = false;
    },
  };
}

function createPongGame() {
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let upPressed = false;
  let downPressed = false;
  let player;
  let ai;
  let ball;
  let playerScore = 0;
  let aiScore = 0;
  let aiTargetY = 220;

  function getAiConfig() {
    const mode = appState.difficulty;
    const base =
      mode === "chill"
        ? { trackChance: 0.012, idleChance: 0.01, farSpeed: 1.25, nearSpeed: 0.95, error: 95 }
        : mode === "easy"
          ? { trackChance: 0.018, idleChance: 0.012, farSpeed: 1.7, nearSpeed: 1.1, error: 72 }
          : mode === "hard"
            ? { trackChance: 0.05, idleChance: 0.018, farSpeed: 3.75, nearSpeed: 2.5, error: 24 }
            : mode === "chaos"
              ? { trackChance: 0.075, idleChance: 0.02, farSpeed: 4.6, nearSpeed: 3.2, error: 10 }
              : { trackChance: 0.032, idleChance: 0.015, farSpeed: 2.65, nearSpeed: 1.7, error: 44 };
    const rallyLevel = playerScore + aiScore;
    return {
      trackChance: Math.min(0.12, base.trackChance + rallyLevel * 0.004),
      idleChance: Math.max(0.002, base.idleChance - rallyLevel * 0.001),
      farSpeed: base.farSpeed + rallyLevel * 0.14,
      nearSpeed: base.nearSpeed + rallyLevel * 0.09,
      error: Math.max(6, base.error - rallyLevel * 4),
    };
  }

  function resetState() {
    player = { x: 26, y: 170, width: 14, height: 100 };
    ai = { x: 720, y: 170, width: 14, height: 100 };
    ball = { x: 380, y: 220, vx: 5, vy: 3.2, r: 9 };
    playerScore = 0;
    aiScore = 0;
    aiTargetY = 220;
    setScore(0);
    updateHud();
    draw();
  }

  function updateHud() {
    shell.hud.match.textContent = `You ${playerScore} - ${aiScore} CPU`;
    shell.hud.goal.textContent = "First to 7";
  }

  function resetBall(direction = 1) {
    const rallyLevel = playerScore + aiScore;
    ball = {
      x: 380,
      y: 220,
      vx: (5 + rallyLevel * 0.2) * direction,
      vy: (Math.random() * (4 + rallyLevel * 0.25)) - (2 + rallyLevel * 0.125),
      r: 9,
    };
    aiTargetY = 220 + (Math.random() * 90 - 45);
  }

  function update() {
    const aiConfig = getAiConfig();
    player.y += upPressed ? -6 : 0;
    player.y += downPressed ? 6 : 0;
    player.y = clamp(player.y, 0, 440 - player.height);

    if (ball.vx > 0) {
      if (Math.random() < aiConfig.trackChance) {
        aiTargetY = ball.y + (Math.random() * aiConfig.error * 2 - aiConfig.error);
      }
    } else if (Math.random() < aiConfig.idleChance) {
      aiTargetY = 220 + (Math.random() * (aiConfig.error + 35) - (aiConfig.error + 35) / 2);
    }
    const aiSpeed = ball.x > 520 ? aiConfig.farSpeed : aiConfig.nearSpeed;
    ai.y += aiTargetY > ai.y + ai.height / 2 ? aiSpeed : -aiSpeed;
    ai.y = clamp(ai.y, 0, 440 - ai.height);

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y - ball.r <= 0 || ball.y + ball.r >= 440) ball.vy *= -1;

    if (checkPaddleCollision(player) || checkPaddleCollision(ai)) {
      ball.vx *= -1.04;
      ball.vy += (Math.random() - 0.5) * 0.8;
    }

    if (ball.x < 0) {
      aiScore += 1;
      updateHud();
      resetBall(1);
    } else if (ball.x > 760) {
      playerScore += 1;
      setScore(playerScore);
      updateHud();
      resetBall(-1);
    }

    if (playerScore >= 7 || aiScore >= 7) {
      running = false;
      setStatus(playerScore > aiScore ? "You win" : "CPU wins");
    }
  }

  function checkPaddleCollision(paddle) {
    return (
      ball.x - ball.r <= paddle.x + paddle.width &&
      ball.x + ball.r >= paddle.x &&
      ball.y + ball.r >= paddle.y &&
      ball.y - ball.r <= paddle.y + paddle.height
    );
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    ctx.fillStyle = "#07121f";
    ctx.fillRect(0, 0, 760, 440);

    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.setLineDash([14, 12]);
    ctx.beginPath();
    ctx.moveTo(380, 0);
    ctx.lineTo(380, 440);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#46b1ff";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#ff8a3d";
    ctx.fillRect(ai.x, ai.y, ai.width, ai.height);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.36)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Pixel Pong", 380, 210);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Press Start to serve", 380, 250);
    }
  }

  function loop() {
    if (!running) return;
    animationId = requestAnimationFrame(loop);
    update();
    draw();
  }

  return {
    id: "pong",
    getLevelText: () => String(1 + playerScore),
    title: "Pixel Pong",
    tagline: "Arcade paddle duel",
    subtitle: "Face off against a CPU paddle and try to reach seven first.",
    description:
      "A classic Pong-style match with smooth paddle movement, an AI opponent, and a quick race to seven points.",
    controls: "W and S, or Up and Down arrows.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "match", label: "You 0 - 0 CPU" },
          { id: "goal", label: "First to 7" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 760;
      shell.canvas.height = 440;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      running = true;
      setStatus("Playing");
      loop();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      if (["ArrowUp", "w", "W"].includes(event.key)) upPressed = true;
      if (["ArrowDown", "s", "S"].includes(event.key)) downPressed = true;
    },
    onKeyUp(event) {
      if (["ArrowUp", "w", "W"].includes(event.key)) upPressed = false;
      if (["ArrowDown", "s", "S"].includes(event.key)) downPressed = false;
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      upPressed = false;
      downPressed = false;
    },
  };
}

function createMemoryGame() {
  let wrapper;
  let stageLevel = 1;
  let cards = [];
  let firstPick = null;
  let secondPick = null;
  let moves = 0;
  let matchedPairs = 0;
  let lock = false;
  let startedAt = 0;
  let timerId = null;

  const symbols = ["🍒", "🎮", "⭐", "🚀", "🔥", "🧠", "⚡", "👾", "🪐", "🎯", "🕹️", "💎"];

  function getPairCount() {
    const mode = appState.difficulty;
    const base = mode === "chill" ? 4 : mode === "easy" ? 5 : mode === "hard" ? 7 : mode === "chaos" ? 8 : 6;
    return clamp(base + Math.floor((stageLevel - 1) / 2), 4, 8);
  }

  function buildCards() {
    const pool = symbols.slice(0, getPairCount());
    const shuffled = [...pool, ...pool]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        revealed: false,
        matched: false,
      }));
    cards = shuffled;
  }

  function renderBoard() {
    const grid = wrapper.querySelector(".memory-grid");
    grid.innerHTML = cards
      .map(
        (card) => `
          <button class="memory-card ${card.revealed || card.matched ? "revealed" : ""} ${
            card.matched ? "matched" : ""
          }" data-card-id="${card.id}">
            ${card.revealed || card.matched ? card.symbol : "?"}
          </button>
        `,
      )
      .join("");

    grid.querySelectorAll("[data-card-id]").forEach((button) => {
      button.addEventListener("click", () => handleCardClick(Number(button.dataset.cardId)));
    });

    wrapper.querySelector('[data-meta="moves"]').textContent = `Moves ${moves}`;
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    const seconds = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;
    wrapper.querySelector('[data-meta="time"]').textContent = `Time ${seconds}s`;
    refreshLevel();
  }

  function handleCardClick(cardId) {
    if (lock) return;
    const card = cards.find((item) => item.id === cardId);
    if (!card || card.revealed || card.matched) return;

    if (!startedAt) {
      startedAt = Date.now();
      timerId = window.setInterval(renderBoard, 1000);
      setStatus("Playing");
    }

    card.revealed = true;
    if (!firstPick) {
      firstPick = card;
      renderBoard();
      return;
    }

    secondPick = card;
    moves += 1;
    setScore(Math.max(0, 500 - moves * 10));

    if (firstPick.symbol === secondPick.symbol) {
      firstPick.matched = true;
      secondPick.matched = true;
      firstPick = null;
      secondPick = null;
      matchedPairs += 1;
      if (matchedPairs === getPairCount()) {
        const bonus = Math.max(0, 200 - Math.floor((Date.now() - startedAt) / 1000) * 3);
        setScore(appState.score + bonus);
        setStatus(`Stage ${stageLevel} cleared`);
        clearInterval(timerId);
        timerId = null;
        window.setTimeout(() => {
          stageLevel += 1;
          resetState(true);
          setStatus(`Stage ${stageLevel}`);
        }, 550);
      }
      renderBoard();
      return;
    }

    lock = true;
    renderBoard();
    window.setTimeout(() => {
      firstPick.revealed = false;
      secondPick.revealed = false;
      firstPick = null;
      secondPick = null;
      lock = false;
      renderBoard();
    }, Math.max(280, 700 - stageLevel * 35));
  }

  function resetState(keepScore = false) {
    firstPick = null;
    secondPick = null;
    moves = 0;
    matchedPairs = 0;
    lock = false;
    startedAt = 0;
    if (timerId) clearInterval(timerId);
    timerId = null;
    buildCards();
    if (!keepScore) setScore(0);
    renderBoard();
  }

  return {
    id: "memory",
    getLevelText: () => String(stageLevel),
    title: "Match Flip",
    tagline: "Memory board challenge",
    subtitle: "Flip matching pairs quickly and cleanly for a better score.",
    description:
      "A cozy memory match game with a timer, move counter, and score bonus for staying efficient.",
    controls: "Use your mouse or trackpad to flip cards.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="game-meta">
          <div class="info-chip-row">
            <span class="info-chip" data-meta="stage">Stage 1</span>
            <span class="info-chip" data-meta="moves">Moves 0</span>
            <span class="info-chip" data-meta="time">Time 0s</span>
          </div>
        </div>
        <div class="memory-grid"></div>
      `);
      stage.appendChild(wrapper);
      stageLevel = 1;
      resetState();
    },
    start() {
      setStatus(`Stage ${stageLevel}`);
    },
    reset() {
      stageLevel = 1;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      if (timerId) clearInterval(timerId);
    },
  };
}

function createMergeGame() {
  let wrapper;
  let board = [];
  let running = true;
  let animationTimer = null;
  let isAnimating = false;

  function emptyBoard() {
    return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
  }

  function addRandomTile() {
    const empty = [];
    board.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === 0) empty.push({ row: rowIndex, col: colIndex });
      });
    });
    if (!empty.length) return;
    const pick = empty[Math.floor(Math.random() * empty.length)];
    board[pick.row][pick.col] = Math.random() < 0.9 ? 2 : 4;
  }

  function resetState() {
    board = emptyBoard();
    addRandomTile();
    addRandomTile();
    running = true;
    isAnimating = false;
    setScore(0);
    renderBoard();
  }

  function renderBoard(boardToRender = board) {
    const grid = wrapper.querySelector(".merge-grid");
    const slots = Array.from({ length: 16 }, () => `<div class="merge-slot"></div>`).join("");
    const tiles = boardToRender
      .flatMap((row, rowIndex) =>
        row.flatMap((value, colIndex) =>
          value
            ? `<div class="merge-tile merge-${value}" style="--row:${rowIndex};--col:${colIndex}">${value}</div>`
            : [],
        ),
      )
      .join("");
    grid.innerHTML = `${slots}<div class="merge-layer">${tiles}</div>`;
    refreshLevel();
  }

  function animateMove(tiles, onDone) {
    const grid = wrapper?.querySelector(".merge-grid");
    if (!grid) return;
    const slots = Array.from({ length: 16 }, () => `<div class="merge-slot"></div>`).join("");
    const movingTiles = tiles
      .map(
        (tile) =>
          `<div class="merge-tile merge-${tile.value} merge-moving" style="--row:${tile.fromRow};--col:${tile.fromCol};--to-row:${tile.toRow};--to-col:${tile.toCol}">${tile.value}</div>`,
      )
      .join("");
    grid.innerHTML = `${slots}<div class="merge-layer">${movingTiles}</div>`;
    const elements = [...grid.querySelectorAll(".merge-moving")];
    requestAnimationFrame(() => {
      elements.forEach((element) => {
        element.style.setProperty("--row", element.style.getPropertyValue("--to-row"));
        element.style.setProperty("--col", element.style.getPropertyValue("--to-col"));
      });
    });
    if (animationTimer) clearTimeout(animationTimer);
    animationTimer = window.setTimeout(() => {
      animationTimer = null;
      onDone();
    }, 230);
  }

  function slideRowLeft(row) {
    const compact = row
      .map((value, index) => ({ value, index }))
      .filter((entry) => entry.value !== 0);
    const next = [];
    const motions = [];
    let gained = 0;
    for (let index = 0; index < compact.length; index += 1) {
      const current = compact[index];
      const targetIndex = next.length;
      motions.push({ value: current.value, from: current.index, to: targetIndex });
      if (compact[index + 1] && current.value === compact[index + 1].value) {
        motions.push({ value: compact[index + 1].value, from: compact[index + 1].index, to: targetIndex });
        next.push(current.value * 2);
        gained += current.value * 2;
        index += 1;
      } else {
        next.push(current.value);
      }
    }
    while (next.length < 4) next.push(0);
    return { row: next, gained, motions };
  }

  function reverseRows(matrix) {
    return matrix.map((row) => [...row].reverse());
  }

  function transpose(matrix) {
    return matrix[0].map((_, columnIndex) => matrix.map((row) => row[columnIndex]));
  }

  function mapMotion(direction, motion, lineIndex) {
    const mapped =
      direction === "left"
        ? { fromRow: lineIndex, fromCol: motion.from, toRow: lineIndex, toCol: motion.to }
        : direction === "right"
          ? { fromRow: lineIndex, fromCol: 3 - motion.from, toRow: lineIndex, toCol: 3 - motion.to }
          : direction === "up"
            ? { fromRow: motion.from, fromCol: lineIndex, toRow: motion.to, toCol: lineIndex }
            : { fromRow: 3 - motion.from, fromCol: lineIndex, toRow: 3 - motion.to, toCol: lineIndex };
    return { ...mapped, value: motion.value };
  }

  function performMove(direction) {
    if (!running || isAnimating) return;
    let working = board.map((row) => [...row]);

    if (direction === "right") {
      working = reverseRows(working);
    } else if (direction === "up") {
      working = transpose(working);
    } else if (direction === "down") {
      working = reverseRows(transpose(working));
    }

    let moved = false;
    let gained = 0;
    let motions = [];
    working = working.map((row, lineIndex) => {
      const result = slideRowLeft(row);
      const next = result.row;
      if (next.some((value, index) => value !== row[index])) moved = true;
      gained += result.gained;
      motions = motions.concat(result.motions.map((motion) => mapMotion(direction, motion, lineIndex)));
      return next;
    });

    if (direction === "right") {
      working = reverseRows(working);
    } else if (direction === "up") {
      working = transpose(working);
    } else if (direction === "down") {
      working = transpose(reverseRows(working));
    }

    if (!moved) return;
    isAnimating = true;
    animateMove(motions, () => {
      board = working;
      addRandomTile();
      setScore(appState.score + gained);
      renderBoard();
      isAnimating = false;
      if (isGameOver()) {
        running = false;
        setStatus(`Game over - ${appState.score}`);
        scheduleAutoReset();
      } else {
        setStatus("Sliding");
      }
    });
  }

  function isGameOver() {
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const value = board[row][col];
        if (value === 0) return false;
        if (row < 3 && board[row + 1][col] === value) return false;
        if (col < 3 && board[row][col + 1] === value) return false;
      }
    }
    return true;
  }

  return {
    id: "merge",
    getLevelText: () => {
      const highest = board.flat().reduce((max, value) => Math.max(max, value), 2);
      return String(Math.max(1, Math.floor(Math.log2(highest) - 1)));
    },
    title: "Tile Merge",
    tagline: "2048-style number stacking",
    subtitle: "Slide, merge, and chase a bigger tile without locking the board.",
    description:
      "A clean number-merging puzzle inspired by classic swipe games. Combine matching tiles and build toward huge values.",
    controls: "Arrow keys to slide tiles in any direction.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="merge-grid"></div>
          <div class="action-button-grid">
            <button class="mini-button" data-slide="up">Up</button>
            <button class="mini-button" data-slide="left">Left</button>
            <button class="mini-button" data-slide="down">Down</button>
            <button class="mini-button" data-slide="right">Right</button>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelectorAll("[data-slide]").forEach((button) => {
        button.addEventListener("click", () => performMove(button.dataset.slide));
      });
      resetState();
    },
    start() {
      setStatus("Sliding");
    },
    reset() {
      if (animationTimer) clearTimeout(animationTimer);
      animationTimer = null;
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      const directionMap = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };
      const direction = directionMap[event.key];
      if (direction) performMove(direction);
    },
    destroy() {
      if (animationTimer) clearTimeout(animationTimer);
      animationTimer = null;
      isAnimating = false;
    },
  };
}

function createFlappyGame() {
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let bird;
  let pipes = [];
  let pipeCooldown = 0;
  let stageLevel = 1;

  function getRunConfig() {
    const preset = getDifficultyPreset();
    return {
      gap: Math.max(88, preset.flappyGap - (stageLevel - 1) * 6),
      spawnFrames: Math.max(52, preset.flappySpawnFrames - (stageLevel - 1) * 3),
      pipeSpeed: preset.flappyPipeSpeed + (stageLevel - 1) * 0.16,
      gravity: preset.flappyGravity + (stageLevel - 1) * 0.008,
      lift: preset.flappyLift + Math.min(0.7, (stageLevel - 1) * 0.05),
    };
  }

  function resetState() {
    bird = { x: 160, y: 220, vy: 0, r: 16 };
    pipes = [];
    pipeCooldown = 0;
    stageLevel = 1;
    running = false;
    setScore(0);
    updateHud();
    draw();
  }

  function updateHud() {
    shell.hud.pipes.textContent = `Cleared ${appState.score}`;
    shell.hud.tip.textContent = `Level ${stageLevel} • ${getDifficultyPreset().label}`;
    refreshLevel();
  }

  function spawnPipe() {
    const config = getRunConfig();
    const gapHalf = config.gap / 2;
    const gapY = gapHalf + 28 + Math.random() * (440 - gapHalf * 2 - 56);
    pipes.push({
      x: 760,
      width: 78,
      gapTop: gapY - gapHalf,
      gapBottom: gapY + gapHalf,
      passed: false,
    });
  }

  function update() {
    stageLevel = 1 + Math.floor(appState.score / 3);
    const config = getRunConfig();
    pipeCooldown -= 1;
    if (pipeCooldown <= 0) {
      spawnPipe();
      pipeCooldown = config.spawnFrames;
    }

    bird.vy += config.gravity;
    bird.y += bird.vy;

    pipes.forEach((pipe) => {
      pipe.x -= config.pipeSpeed;
      if (!pipe.passed && pipe.x + pipe.width < bird.x) {
        pipe.passed = true;
        setScore(appState.score + 1);
        updateHud();
      }
    });
    pipes = pipes.filter((pipe) => pipe.x + pipe.width > -40);

    const hitPipe = pipes.some(
      (pipe) =>
        bird.x + bird.r > pipe.x &&
        bird.x - bird.r < pipe.x + pipe.width &&
        (bird.y - bird.r < pipe.gapTop || bird.y + bird.r > pipe.gapBottom),
    );

    if (bird.y - bird.r <= 0 || bird.y + bird.r >= 440 || hitPipe) {
      running = false;
      setStatus(`Crash - score ${appState.score}`);
      scheduleAutoReset();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    const sky = ctx.createLinearGradient(0, 0, 0, 440);
    sky.addColorStop(0, "#13365b");
    sky.addColorStop(1, "#09141f");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 760, 440);

    pipes.forEach((pipe) => {
      ctx.fillStyle = "#1eb980";
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapTop);
      ctx.fillRect(pipe.x, pipe.gapBottom, pipe.width, 440 - pipe.gapBottom);
    });

    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f1720";
    ctx.beginPath();
    ctx.arc(bird.x + 5, bird.y - 4, 3, 0, Math.PI * 2);
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Flappy Drift", 380, 210);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Press Start or Space", 380, 250);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "flappy",
    getLevelText: () => String(stageLevel),
    title: "Flappy Drift",
    tagline: "Bird dodging through gaps",
    subtitle: "One-button flying chaos inspired by classic tap-to-fly browser hits.",
    description:
      "Tap to stay in the air, thread each pipe gap, and stack up a higher clear count without crashing.",
    controls: "Space, W, or Up arrow to flap.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "pipes", label: "Cleared 0" },
          { id: "tip", label: "Tap space to flap" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 760;
      shell.canvas.height = 440;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      running = true;
      setStatus("Flying");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      if (![" ", "ArrowUp", "w", "W"].includes(event.key)) return;
      if (!running) {
        this.start();
      }
      bird.vy = -getRunConfig().lift;
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
    },
  };
}

function createRunnerGame() {
  let wrapper;
  let intervalId = null;
  let running = false;
  let lane = 1;
  let rows = [];
  let distance = 0;
  let tick = 0;
  let jumpFrames = 0;
  let slideFrames = 0;
  let crashed = false;

  function resetState() {
    const preset = getDifficultyPreset();
    lane = 1;
    rows = Array.from({ length: preset.runnerRows }, () => ({
      obstacleLane: -1,
      obstacleType: "none",
      coinLane: -1,
    }));
    distance = 0;
    tick = 0;
    jumpFrames = 0;
    slideFrames = 0;
    crashed = false;
    running = false;
    setScore(0);
    updateHud();
    renderBoard();
    setStatus("Ready");
  }

  function spawnRow() {
    const preset = getDifficultyPreset();
    const row = {
      obstacleLane: -1,
      obstacleType: "none",
      coinLane: -1,
    };

    if (Math.random() < preset.runnerObstacleChance) {
      row.obstacleLane = Math.floor(Math.random() * 3);
      const roll = Math.random();
      if (roll < 0.4) row.obstacleType = "train";
      else if (roll < 0.72) row.obstacleType = "jump";
      else row.obstacleType = "slide";
    }

    if (Math.random() < preset.runnerCoinChance) {
      const options = [0, 1, 2].filter((value) => value !== row.obstacleLane);
      row.coinLane = options[Math.floor(Math.random() * options.length)];
    }
    return row;
  }

  function getSpeedMs() {
    const preset = getDifficultyPreset();
    return Math.max(
      preset.runnerMinTick,
      preset.runnerBaseTick - Math.floor(distance / 12) * preset.runnerRamp,
    );
  }

  function getStanceLabel() {
    if (jumpFrames > 0) return "Jump";
    if (slideFrames > 0) return "Slide";
    return "Run";
  }

  function updateHud() {
    if (!wrapper) return;
    wrapper.querySelector('[data-meta="distance"]').textContent = `Distance ${distance}`;
    wrapper.querySelector('[data-meta="lane"]').textContent = `Lane ${lane + 1}`;
    wrapper.querySelector('[data-meta="stance"]').textContent = `Stance ${getStanceLabel()}`;
    wrapper.querySelector('[data-meta="speed"]').textContent = `Speed ${Math.max(
      1,
      Math.round((500 - getSpeedMs()) / 42) + 1,
    )}`;
    refreshLevel();
  }

  function restartLoop() {
    if (intervalId) clearInterval(intervalId);
    if (!running) return;
    intervalId = window.setInterval(step, getSpeedMs());
  }

  function renderBoard() {
    updateHud();
    wrapper.querySelector(".lane-grid").innerHTML = rows
      .map((row, rowIndex) =>
        Array.from({ length: 3 }, (_, colIndex) => {
          const classes = ["lane-cell"];
          let icon = "";
          const isPlayer = rowIndex === rows.length - 1 && colIndex === lane;
          const hasObstacle = row.obstacleLane === colIndex;
          const hasCoin = row.coinLane === colIndex;

          if (hasCoin) {
            classes.push("lane-coin");
            icon = "🪙";
          }
          if (hasObstacle) {
            classes.push("lane-obstacle", `lane-${row.obstacleType}`);
            icon = { train: "🚇", jump: "🧱", slide: "🚧" }[row.obstacleType] || "🚧";
          }
          if (isPlayer) {
            classes.push("lane-player");
            if (crashed) classes.push("lane-crash");
            else if (jumpFrames > 0) classes.push("lane-jumping");
            else if (slideFrames > 0) classes.push("lane-sliding");
            icon = crashed ? "💥" : jumpFrames > 0 ? "🤸" : slideFrames > 0 ? "🛹" : "🏃";
          }
          return `<div class="${classes.join(" ")}"><span>${icon}</span></div>`;
        }).join(""),
      )
      .join("");
  }

  function step() {
    tick += 1;
    rows.pop();
    rows.unshift(spawnRow());

    const playerRow = rows[rows.length - 1];
    const collision =
      playerRow.obstacleLane === lane &&
      ((playerRow.obstacleType === "train" && true) ||
        (playerRow.obstacleType === "jump" && jumpFrames === 0) ||
        (playerRow.obstacleType === "slide" && slideFrames === 0));

    if (collision) {
      running = false;
      crashed = true;
      clearInterval(intervalId);
      intervalId = null;
      renderBoard();
      setStatus(`Crashed - distance ${distance}`);
      scheduleAutoReset();
      return;
    }

    if (playerRow.coinLane === lane) {
      setScore(appState.score + 20);
      playerRow.coinLane = -1;
    }

    if (jumpFrames > 0) jumpFrames -= 1;
    if (slideFrames > 0) slideFrames -= 1;

    distance += 1;
    if (tick % 3 === 0) {
      setScore(appState.score + 5);
    }
    renderBoard();
    if (tick % 4 === 0) {
      restartLoop();
    }
  }

  function move(delta) {
    lane = clamp(lane + delta, 0, 2);
    renderBoard();
  }

  function jump() {
    if (!running) return;
    jumpFrames = 2;
    slideFrames = 0;
    renderBoard();
  }

  function slide() {
    if (!running) return;
    slideFrames = 2;
    jumpFrames = 0;
    renderBoard();
  }

  return {
    id: "runner",
    getLevelText: () => String(1 + Math.floor(distance / 18)),
    title: "Subway Sprint",
    tagline: "Subway Surfers-style lane runner",
    subtitle: "Swap lanes, jump hurdles, slide under barriers, and survive the rush.",
    description:
      "A fuller solo endless runner inspired by Subway Surfers-style lane dodging. Change lanes, jump over blockades, slide under barriers, dodge trains, and chain coin pickups.",
    controls: "Left and right arrows or A and D to move, Up or Space to jump, Down or S to slide.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="game-meta">
          <div class="info-chip-row">
            <span class="info-chip" data-meta="distance">Distance 0</span>
            <span class="info-chip" data-meta="lane">Lane 2</span>
            <span class="info-chip" data-meta="stance">Stance Run</span>
            <span class="info-chip" data-meta="speed">Speed 1</span>
          </div>
        </div>
        <div class="lane-grid"></div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      if (running) return;
      crashed = false;
      running = true;
      setStatus("Running");
      restartLoop();
    },
    reset() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      resetState();
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) move(-1);
      if (["ArrowRight", "d", "D"].includes(event.key)) move(1);
      if (["ArrowUp", "w", "W", " "].includes(event.key)) jump();
      if (["ArrowDown", "s", "S"].includes(event.key)) slide();
    },
    destroy() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    },
  };
}

function createTicTacToeGame() {
  let wrapper;
  let board = [];
  let current = "X";
  let finished = false;

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function resetState() {
    board = Array.from({ length: 9 }, () => "");
    current = "X";
    finished = false;
    setScore(0);
    renderBoard();
    setStatus("Your turn");
  }

  function renderBoard() {
    wrapper.querySelector(".ttt-grid").innerHTML = board
      .map((cell, index) => `<button class="ttt-cell" data-cell="${index}">${cell}</button>`)
      .join("");
    wrapper.querySelectorAll("[data-cell]").forEach((button) => {
      button.addEventListener("click", () => handleMove(Number(button.dataset.cell)));
    });
  }

  function getWinner(nextBoard = board) {
    for (const line of wins) {
      const [a, b, c] = line;
      if (nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[b] === nextBoard[c]) {
        return nextBoard[a];
      }
    }
    return nextBoard.includes("") ? "" : "draw";
  }

  function chooseCpuMove() {
    const empties = board
      .map((value, index) => ({ value, index }))
      .filter((entry) => !entry.value)
      .map((entry) => entry.index);
    for (const index of empties) {
      const test = [...board];
      test[index] = "O";
      if (getWinner(test) === "O") return index;
    }
    for (const index of empties) {
      const test = [...board];
      test[index] = "X";
      if (getWinner(test) === "X") return index;
    }
    if (empties.includes(4)) return 4;
    const corners = empties.filter((index) => [0, 2, 6, 8].includes(index));
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    return empties[Math.floor(Math.random() * empties.length)];
  }

  function settleBoard() {
    const winner = getWinner();
    if (!winner) return false;
    finished = true;
    if (winner === "X") {
      setScore(1);
      setStatus("You win");
    } else if (winner === "O") {
      setStatus("CPU wins");
    } else {
      setStatus("Draw");
    }
    return true;
  }

  function handleMove(index) {
    if (finished || board[index]) return;
    board[index] = "X";
    renderBoard();
    if (settleBoard()) return;

    const cpuMove = chooseCpuMove();
    if (cpuMove !== undefined) {
      board[cpuMove] = "O";
      renderBoard();
      settleBoard();
    }
  }

  return {
    id: "tictactoe",
    title: "Noughts Clash",
    tagline: "Tic-tac-toe against CPU",
    subtitle: "Quick board duels with just enough CPU smarts to keep it fun.",
    description:
      "A crisp tic-tac-toe match against a simple CPU that blocks obvious wins and fights for the center.",
    controls: "Use your mouse or trackpad to place X.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`<div class="ttt-grid"></div>`);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus(finished ? "Reset to play again" : "Your turn");
    },
    reset() {
      resetState();
    },
    destroy() {},
  };
}

function createConnectFourGame() {
  let wrapper;
  let board = [];
  let finished = false;
  const rows = 6;
  const cols = 7;

  function resetState() {
    board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
    finished = false;
    setScore(0);
    renderBoard();
    setStatus("Drop a checker");
  }

  function renderBoard() {
    wrapper.querySelector(".action-button-grid").innerHTML = Array.from({ length: cols }, (_, col) =>
      `<button class="mini-button" data-col="${col}">Column ${col + 1}</button>`,
    ).join("");
    wrapper.querySelectorAll("[data-col]").forEach((button) => {
      button.addEventListener("click", () => playerMove(Number(button.dataset.col)));
    });
    wrapper.querySelector(".connect-grid").innerHTML = board
      .flat()
      .map((value) => {
        const cls = value === 1 ? "connect-player" : value === 2 ? "connect-cpu" : "connect-empty";
        return `<div class="connect-cell ${cls}">${value === 1 ? "●" : value === 2 ? "●" : ""}</div>`;
      })
      .join("");
  }

  function drop(col, player) {
    for (let row = rows - 1; row >= 0; row -= 1) {
      if (board[row][col] === 0) {
        board[row][col] = player;
        return { row, col };
      }
    }
    return null;
  }

  function checkWin(player) {
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (board[row][col] !== player) continue;
        for (const [dx, dy] of directions) {
          let count = 1;
          while (
            board[row + count * dy]?.[col + count * dx] === player
          ) {
            count += 1;
          }
          if (count >= 4) return true;
        }
      }
    }
    return false;
  }

  function chooseCpuColumn() {
    const valid = Array.from({ length: cols }, (_, col) => col).filter((col) => board[0][col] === 0);
    for (const col of valid) {
      const clone = board.map((row) => [...row]);
      for (let row = rows - 1; row >= 0; row -= 1) {
        if (clone[row][col] === 0) {
          clone[row][col] = 2;
          break;
        }
      }
      if (simulateConnectWin(clone, 2)) return col;
    }
    for (const col of valid) {
      const clone = board.map((row) => [...row]);
      for (let row = rows - 1; row >= 0; row -= 1) {
        if (clone[row][col] === 0) {
          clone[row][col] = 1;
          break;
        }
      }
      if (simulateConnectWin(clone, 1)) return col;
    }
    const centerBias = [3, 2, 4, 1, 5, 0, 6];
    return centerBias.find((col) => valid.includes(col)) ?? valid[0];
  }

  function playerMove(col) {
    if (finished) return;
    const placed = drop(col, 1);
    if (!placed) return;
    renderBoard();
    if (checkWin(1)) {
      finished = true;
      setScore(1);
      setStatus("You win");
      return;
    }
    if (board[0].every((cell) => cell !== 0)) {
      finished = true;
      setStatus("Draw");
      return;
    }

    const cpuCol = chooseCpuColumn();
    drop(cpuCol, 2);
    renderBoard();
    if (checkWin(2)) {
      finished = true;
      setStatus("CPU wins");
      return;
    }
    if (board[0].every((cell) => cell !== 0)) {
      finished = true;
      setStatus("Draw");
    }
  }

  return {
    id: "connect",
    title: "Connect Clash",
    tagline: "Four-in-a-row strategy",
    subtitle: "Drop checkers, take the center, and race the CPU to connect four.",
    description:
      "A connect-four style board game with a lightweight CPU that blocks threats and looks for instant wins.",
    controls: "Click a column button to drop your checker.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="action-button-grid"></div>
        <div class="connect-grid"></div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus(finished ? "Reset to play again" : "Drop a checker");
    },
    reset() {
      resetState();
    },
    destroy() {},
  };
}

function createWhackGame() {
  let wrapper;
  let activeHole = -1;
  let timeLeft = 20;
  let running = false;
  let holeTimer = null;
  let countdown = null;
  let level = 1;

  function renderBoard() {
    wrapper.querySelector(".whack-grid").innerHTML = Array.from({ length: 9 }, (_, index) => {
      const active = index === activeHole ? "active" : "";
      return `<button class="whack-hole ${active}" data-hole="${index}">${index === activeHole ? "🐹" : "🕳️"}</button>`;
    }).join("");
    wrapper.querySelectorAll("[data-hole]").forEach((button) => {
      button.addEventListener("click", () => hitHole(Number(button.dataset.hole)));
    });
    wrapper.querySelector('[data-meta="level"]').textContent = `Level ${level}`;
    wrapper.querySelector('[data-meta="timer"]').textContent = `Time ${timeLeft}s`;
    refreshLevel();
  }

  function scheduleNextHole() {
    if (!running) return;
    if (holeTimer) clearTimeout(holeTimer);
    holeTimer = window.setTimeout(() => {
      nextHole();
      scheduleNextHole();
    }, Math.max(220, 760 - level * 55));
  }

  function nextHole() {
    activeHole = Math.floor(Math.random() * 9);
    renderBoard();
  }

  function hitHole(index) {
    if (!running) return;
    if (index === activeHole) {
      setScore(appState.score + 10);
      activeHole = -1;
      level = 1 + Math.floor(appState.score / 40);
      renderBoard();
    }
  }

  function stopGame(status) {
    running = false;
    if (holeTimer) clearTimeout(holeTimer);
    if (countdown) clearInterval(countdown);
    holeTimer = null;
    countdown = null;
    activeHole = -1;
    renderBoard();
    setStatus(status);
  }

  function resetState() {
    timeLeft = 20;
    level = 1;
    setScore(0);
    stopGame("Ready");
  }

  return {
    id: "whack",
    getLevelText: () => String(1 + Math.floor((20 - timeLeft) / 5)),
    title: "Whack Blitz",
    tagline: "Portal-style clicker chaos",
    subtitle: "Twenty frantic seconds to whack as many popping targets as possible.",
    description:
      "A fast whack-a-mole style reaction game that rewards quick clicks and clean focus under a timer.",
    controls: "Use your mouse or trackpad to hit the active target.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="game-meta">
          <div class="info-chip-row">
            <span class="info-chip" data-meta="level">Level 1</span>
            <span class="info-chip" data-meta="timer">Time 20s</span>
          </div>
        </div>
        <div class="whack-grid"></div>
      `);
      stage.appendChild(wrapper);
      renderBoard();
    },
    start() {
      if (running) return;
      running = true;
      timeLeft = 20;
      level = 1;
      setScore(0);
      nextHole();
      scheduleNextHole();
      countdown = window.setInterval(() => {
        timeLeft -= 1;
        level = 1 + Math.floor((20 - timeLeft) / 4) + Math.floor(appState.score / 60);
        renderBoard();
        if (timeLeft <= 0) {
          stopGame(`Finished - ${appState.score}`);
        }
      }, 1000);
      setStatus("Whacking");
    },
    reset() {
      resetState();
    },
    destroy() {
      stopGame("Ready");
    },
  };
}

function createSimonGame() {
  let wrapper;
  const pads = ["green", "red", "yellow", "blue"];
  let sequence = [];
  let playerIndex = 0;
  let acceptingInput = false;
  let flashTimer = null;

  function renderBoard(activePad = "") {
    wrapper.querySelector(".simon-grid").innerHTML = pads
      .map(
        (pad) =>
          `<button class="simon-pad simon-${pad} ${activePad === pad ? "active" : ""}" data-pad="${pad}"></button>`,
      )
      .join("");
    wrapper.querySelectorAll("[data-pad]").forEach((button) => {
      button.addEventListener("click", () => pressPad(button.dataset.pad));
    });
    wrapper.querySelector('[data-meta="round"]').textContent = `Round ${sequence.length}`;
    refreshLevel();
  }

  function flashSequence() {
    acceptingInput = false;
    let index = 0;
    clearInterval(flashTimer);
    renderBoard();
    flashTimer = window.setInterval(() => {
      if (index >= sequence.length * 2) {
        clearInterval(flashTimer);
        flashTimer = null;
        renderBoard();
        acceptingInput = true;
        setStatus("Repeat the pattern");
        return;
      }
      const pad = index % 2 === 0 ? sequence[Math.floor(index / 2)] : "";
      renderBoard(pad);
      index += 1;
    }, 420);
  }

  function addRound() {
    sequence.push(pads[Math.floor(Math.random() * pads.length)]);
    playerIndex = 0;
    renderBoard();
    setStatus("Watch closely");
    window.setTimeout(flashSequence, 260);
  }

  function pressPad(pad) {
    if (!acceptingInput) return;
    renderBoard(pad);
    window.setTimeout(() => renderBoard(), 140);
    if (sequence[playerIndex] !== pad) {
      acceptingInput = false;
      setStatus(`Wrong pad at round ${sequence.length}`);
      return;
    }
    playerIndex += 1;
    if (playerIndex === sequence.length) {
      setScore(sequence.length);
      acceptingInput = false;
      setStatus("Nice! Next round");
      window.setTimeout(addRound, 550);
    }
  }

  function resetState() {
    sequence = [];
    playerIndex = 0;
    acceptingInput = false;
    setScore(0);
    renderBoard();
    setStatus("Ready");
  }

  return {
    id: "simon",
    getLevelText: () => String(Math.max(1, sequence.length)),
    title: "Color Echo",
    tagline: "Simon-style pattern memory",
    subtitle: "Watch the pattern, repeat it perfectly, and survive longer each round.",
    description:
      "A color-pattern memory challenge inspired by classic Simon toys and web puzzle games.",
    controls: "Click the colored pads in the order shown.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="game-meta">
          <div class="info-chip-row">
            <span class="info-chip" data-meta="round">Round 0</span>
          </div>
        </div>
        <div class="simon-grid"></div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      if (sequence.length) return;
      addRound();
    },
    reset() {
      if (flashTimer) clearInterval(flashTimer);
      flashTimer = null;
      resetState();
    },
    destroy() {
      if (flashTimer) clearInterval(flashTimer);
    },
  };
}

function createHangmanGame() {
  let wrapper;
  let stageLevel = 1;
  let word = "";
  let guessed = new Set();
  let lives = 6;
  const words = [
    "browser",
    "rocket",
    "puzzle",
    "sandbox",
    "galaxy",
    "arcade",
    "coding",
    "planet",
    "wizard",
    "rhythm",
  ];

  function getStageWord() {
    const ordered = [...words].sort((left, right) => left.length - right.length);
    return ordered[Math.min(ordered.length - 1, stageLevel - 1)];
  }

  function getStageLives() {
    const mode = appState.difficulty;
    const base = mode === "chill" ? 7 : mode === "easy" ? 6 : mode === "hard" ? 5 : mode === "chaos" ? 4 : 6;
    return Math.max(3, base - Math.floor((stageLevel - 1) / 2));
  }

  function resetState(keepScore = false) {
    word = getStageWord();
    guessed = new Set();
    lives = getStageLives();
    if (!keepScore) setScore(0);
    renderBoard();
    setStatus(`Stage ${stageLevel}`);
  }

  function renderBoard() {
    wrapper.querySelector(".word-display").innerHTML = [...word]
      .map(
        (letter) =>
          `<div class="letter-box">${guessed.has(letter) ? letter.toUpperCase() : "_"}</div>`,
      )
      .join("");
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="lives"]').textContent = `Lives ${lives}`;
    wrapper.querySelector(".keyboard-grid").innerHTML = "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map((letter) => {
        const used = guessed.has(letter) ? "used" : "";
        return `<button class="letter-button ${used}" data-letter="${letter}">${letter.toUpperCase()}</button>`;
      })
      .join("");
    wrapper.querySelectorAll("[data-letter]").forEach((button) => {
      button.addEventListener("click", () => guessLetter(button.dataset.letter));
    });
    refreshLevel();
  }

  function guessLetter(letter) {
    if (guessed.has(letter) || lives <= 0) return;
    guessed.add(letter);
    if (!word.includes(letter)) lives -= 1;

    const complete = [...word].every((char) => guessed.has(char));
    if (complete) {
      setScore(appState.score + lives * 10 + stageLevel * 6);
      renderBoard();
      setStatus(`Solved: ${word.toUpperCase()}`);
      window.setTimeout(() => {
        stageLevel += 1;
        resetState(true);
      }, 650);
      return;
    }

    if (lives <= 0) {
      renderBoard();
      setStatus(`Out of lives - word was ${word.toUpperCase()}`);
      scheduleAutoReset();
      return;
    }

    renderBoard();
  }

  return {
    id: "hangman",
    getLevelText: () => String(stageLevel),
    title: "Word Rescue",
    tagline: "Classic hangman guessing",
    subtitle: "Guess the secret word before your misses run out.",
    description:
      "A clean browser take on Hangman with a simple word bank and quick restart loop.",
    controls: "Click letters to guess them.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="game-meta">
          <div class="info-chip-row">
            <span class="info-chip" data-meta="stage">Stage 1</span>
            <span class="info-chip" data-meta="lives">Lives 6</span>
          </div>
        </div>
        <div class="stack-layout">
          <div class="word-display"></div>
          <div class="keyboard-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      stageLevel = 1;
      resetState();
    },
    start() {
      setStatus(`Stage ${stageLevel}`);
    },
    reset() {
      stageLevel = 1;
      resetState();
    },
    destroy() {},
  };
}

function createBlackjackGame() {
  let wrapper;
  let deck = [];
  let player = [];
  let dealer = [];
  let roundOver = true;

  function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    return suits.flatMap((suit) =>
      ranks.map((rank) => ({ rank, suit, label: `${rank}${suit}` })),
    ).sort(() => Math.random() - 0.5);
  }

  function cardValue(card, aceHigh = 11) {
    if (["J", "Q", "K"].includes(card.rank)) return 10;
    if (card.rank === "A") return aceHigh;
    return Number(card.rank);
  }

  function handValue(hand) {
    let total = hand.reduce((sum, card) => sum + cardValue(card), 0);
    let aces = hand.filter((card) => card.rank === "A").length;
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  }

  function drawCard(hand) {
    hand.push(deck.pop());
  }

  function renderBoard(hideDealer = false) {
    wrapper.querySelector('[data-meta="dealer"]').textContent = hideDealer
      ? `Dealer ${cardValue(dealer[0])}+?`
      : `Dealer ${handValue(dealer)}`;
    wrapper.querySelector('[data-meta="player"]').textContent = `You ${handValue(player)}`;
    wrapper.querySelector('[data-row="dealer"]').innerHTML = dealer
      .map((card, index) =>
        `<div class="playing-card">${hideDealer && index === 1 ? "?" : card.label}</div>`,
      )
      .join("");
    wrapper.querySelector('[data-row="player"]').innerHTML = player
      .map((card) => `<div class="playing-card">${card.label}</div>`)
      .join("");
  }

  function newRound() {
    deck = createDeck();
    player = [];
    dealer = [];
    roundOver = false;
    drawCard(player);
    drawCard(dealer);
    drawCard(player);
    drawCard(dealer);
    setScore(0);
    renderBoard(true);
    setStatus("Hit or stand");
  }

  function finishRound() {
    while (handValue(dealer) < 17) {
      drawCard(dealer);
    }
    renderBoard(false);
    const playerTotal = handValue(player);
    const dealerTotal = handValue(dealer);
    roundOver = true;

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setScore(1);
      setStatus("You win");
    } else if (playerTotal === dealerTotal) {
      setStatus("Push");
    } else {
      setStatus("Dealer wins");
    }
  }

  return {
    id: "blackjack",
    title: "Blackjack Table",
    tagline: "Quick card table duel",
    subtitle: "Draw, stand, and chase 21 against a simple dealer.",
    description:
      "A fast browser blackjack table with hit, stand, and instant redeals for short card rounds.",
    controls: "Use the buttons inside the game area.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="blackjack-table">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="dealer">Dealer 0</span>
              <span class="info-chip" data-meta="player">You 0</span>
            </div>
          </div>
          <div>
            <strong>Dealer</strong>
            <div class="card-row" data-row="dealer"></div>
          </div>
          <div>
            <strong>You</strong>
            <div class="card-row" data-row="player"></div>
          </div>
          <div class="action-button-grid">
            <button class="mini-button" data-action="deal">Deal</button>
            <button class="mini-button" data-action="hit">Hit</button>
            <button class="mini-button" data-action="stand">Stand</button>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector('[data-action="deal"]').addEventListener("click", newRound);
      wrapper.querySelector('[data-action="hit"]').addEventListener("click", () => {
        if (roundOver) return;
        drawCard(player);
        renderBoard(true);
        if (handValue(player) > 21) {
          roundOver = true;
          renderBoard(false);
          setStatus("Bust");
        }
      });
      wrapper.querySelector('[data-action="stand"]').addEventListener("click", () => {
        if (!roundOver) finishRound();
      });
      newRound();
    },
    start() {
      if (roundOver) newRound();
      else setStatus("Hit or stand");
    },
    reset() {
      newRound();
    },
    destroy() {},
  };
}

function createMinesGame() {
  let wrapper;
  let stageLevel = 1;
  let board = [];
  let gameOver = false;
  let size = 8;
  let mineCount = 10;

  function getFlagCount() {
    return board.flat().filter((cell) => cell.flagged).length;
  }

  function getBoardConfig() {
    const base =
      appState.difficulty === "chill"
        ? { size: 7, mines: 7 }
        : appState.difficulty === "easy"
          ? { size: 8, mines: 9 }
          : appState.difficulty === "hard"
            ? { size: 9, mines: 14 }
            : appState.difficulty === "chaos"
              ? { size: 10, mines: 18 }
              : { size: 8, mines: 11 };
    return {
      size: Math.min(10, base.size + Math.floor((stageLevel - 1) / 3)),
      mines: base.mines + stageLevel * 2,
    };
  }

  function resetState(keepScore = false) {
    const config = getBoardConfig();
    size = config.size;
    mineCount = Math.min(size * size - 1, config.mines);
    gameOver = false;
    board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        mine: false,
        revealed: false,
        flagged: false,
        count: 0,
      })),
    );

    let placed = 0;
    while (placed < mineCount) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!board[row][col].mine) {
        board[row][col].mine = true;
        placed += 1;
      }
    }

    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (board[row][col].mine) continue;
        let count = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (!dx && !dy) continue;
            if (board[row + dy]?.[col + dx]?.mine) count += 1;
          }
        }
        board[row][col].count = count;
      }
    }

    if (!keepScore) setScore(0);
    renderBoard();
    setStatus(`Stage ${stageLevel}`);
  }

  function reveal(row, col) {
    const cell = board[row]?.[col];
    if (!cell || cell.revealed || cell.flagged || gameOver) return;
    cell.revealed = true;
    if (cell.mine) {
      gameOver = true;
      board.flat().forEach((item) => {
        if (item.mine) item.revealed = true;
      });
      renderBoard();
      setStatus("Boom");
      scheduleAutoReset();
      return;
    }

    setScore(appState.score + 1);

    if (cell.count === 0) {
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (!dx && !dy) continue;
          reveal(row + dy, col + dx);
        }
      }
    }

    renderBoard();
    const safeCells = board.flat().filter((item) => !item.mine).length;
    if (appState.score === safeCells) {
      gameOver = true;
      setStatus(`Stage ${stageLevel} cleared`);
      window.setTimeout(() => {
        stageLevel += 1;
        resetState(true);
      }, 650);
    }
  }

  function toggleFlag(row, col) {
    const cell = board[row]?.[col];
    if (!cell || cell.revealed || gameOver) return;
    cell.flagged = !cell.flagged;
    renderBoard();
    setStatus(cell.flagged ? "Flag placed" : "Flag removed");
  }

  function renderBoard() {
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="board"]').textContent = `${size}x${size} • ${mineCount} mines`;
    wrapper.querySelector('[data-meta="flags"]').textContent = `Flags ${getFlagCount()}/${mineCount}`;
    const grid = wrapper.querySelector(".mine-grid");
    grid.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    grid.innerHTML = board
      .flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const classes = ["mine-cell"];
          if (cell.revealed) classes.push("revealed");
          if (cell.revealed && cell.mine) classes.push("bomb");
          if (cell.flagged) classes.push("flagged");
          const content = cell.revealed
            ? cell.mine
              ? "💣"
              : cell.count || ""
            : cell.flagged
              ? "🚩"
              : "";
          return `<button class="${classes.join(" ")}" data-row="${rowIndex}" data-col="${colIndex}">${content}</button>`;
        }),
      )
      .join("");
    wrapper.querySelectorAll("[data-row]").forEach((button) => {
      button.addEventListener("click", (event) => {
        const row = Number(button.dataset.row);
        const col = Number(button.dataset.col);
        if (event.shiftKey) {
          toggleFlag(row, col);
          return;
        }
        reveal(row, col);
      });
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        toggleFlag(Number(button.dataset.row), Number(button.dataset.col));
      });
    });
  }

  return {
    id: "mines",
    getLevelText: () => String(stageLevel),
    title: "Mine Grid",
    tagline: "Minesweeper-style puzzle board",
    subtitle: "Reveal safe tiles, read the numbers, and avoid every bomb.",
    description:
      "A compact minesweeper-inspired puzzle with auto-flood reveal for empty patches and a local best score.",
    controls: "Click to reveal. Right-click or Shift-click to place a flag.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="board">8x8 • 10 mines</span>
              <span class="info-chip" data-meta="flags">Flags 0/10</span>
            </div>
          </div>
          <div class="mine-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      stageLevel = 1;
      resetState();
    },
    start() {
      setStatus(gameOver ? "Reset for a new board" : "Clear the safe tiles");
    },
    reset() {
      stageLevel = 1;
      resetState();
    },
    destroy() {},
  };
}

function createReactionGame() {
  let wrapper;
  let timeoutId = null;
  let waiting = false;
  let ready = false;
  let readyAt = 0;
  let stageLevel = 1;
  let bestMs = null;
  let cleared = false;
  const maxStages = 6;

  function getStageTarget() {
    const base =
      appState.difficulty === "chill"
        ? 470
        : appState.difficulty === "easy"
          ? 430
          : appState.difficulty === "hard"
            ? 320
            : appState.difficulty === "chaos"
              ? 285
              : 370;
    return Math.max(150, base - (stageLevel - 1) * 28);
  }

  function updateHud() {
    if (!wrapper) return;
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}/${maxStages}`;
    wrapper.querySelector('[data-meta="target"]').textContent = `Target ${getStageTarget()} ms`;
    wrapper.querySelector('[data-meta="best"]').textContent = `Best ${bestMs == null ? "--" : `${bestMs} ms`}`;
    refreshLevel();
  }

  function setPadState(mode, text) {
    const pad = wrapper.querySelector(".reaction-pad");
    pad.className = `reaction-pad ${mode}`;
    pad.innerHTML = `<div><strong>${text}</strong></div>`;
  }

  function resetState() {
    waiting = false;
    ready = false;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
    stageLevel = 1;
    bestMs = null;
    cleared = false;
    setScore(0);
    setPadState("", "Press Start to begin stage 1.");
    updateHud();
    setStatus("Ready");
  }

  function launchRound() {
    if (cleared) {
      setStatus("Reset for a new run");
      return;
    }
    const preset = getDifficultyPreset();
    waiting = true;
    ready = false;
    setPadState("reaction-wait", `Wait for green... Stage ${stageLevel}`);
    updateHud();
    setStatus(`Stage ${stageLevel} waiting`);
    timeoutId = window.setTimeout(() => {
      waiting = false;
      ready = true;
      readyAt = performance.now();
      setPadState("reaction-ready", "Click now!");
      setStatus("React!");
    }, preset.reactionMinDelay + Math.random() * preset.reactionDelayRange);
  }

  function handlePadClick() {
    if (waiting) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = null;
      setPadState("reaction-wait", "Too early. Press Start to retry the stage.");
      waiting = false;
      setStatus("Too early");
      return;
    }
    if (!ready) return;
    const reaction = Math.round(performance.now() - readyAt);
    bestMs = bestMs == null ? reaction : Math.min(bestMs, reaction);
    const target = getStageTarget();
    setScore(appState.score + Math.max(0, target + 300 - reaction));
    setPadState("reaction-ready", `${reaction} ms`);
    ready = false;
    updateHud();

    if (reaction <= target) {
      if (stageLevel >= maxStages) {
        cleared = true;
        setStatus("All stages cleared");
        setPadState("reaction-ready", `${reaction} ms - cleared`);
        return;
      }
      stageLevel += 1;
      updateHud();
      setStatus(`Stage ${stageLevel - 1} cleared`);
      setPadState("reaction-ready", `${reaction} ms - press Start for stage ${stageLevel}`);
      return;
    }

    setStatus("Too slow");
    setPadState("reaction-wait", `${reaction} ms - target ${target} ms. Press Start to retry.`);
  }

  return {
    id: "reaction",
    getLevelText: () => String(stageLevel),
    title: "Reaction Pad",
    tagline: "Click-speed stage challenge",
    subtitle: "Clear faster reaction targets and climb through multiple reflex levels.",
    description:
      "A staged reaction-timer challenge inspired by browser reflex tests. Beat the target time for each stage to move on to the next level.",
    controls: "Click the large pad when it turns green.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1/6</span>
              <span class="info-chip" data-meta="target">Target 0 ms</span>
              <span class="info-chip" data-meta="best">Best --</span>
            </div>
          </div>
          <button class="reaction-pad"></button>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector(".reaction-pad").addEventListener("click", handlePadClick);
      resetState();
    },
    start() {
      launchRound();
    },
    reset() {
      resetState();
    },
    destroy() {
      if (timeoutId) clearTimeout(timeoutId);
    },
  };
}

function createTypingRushGame() {
  let wrapper;
  let stageLevel = 1;
  let prompt = "";
  let typed = "";
  let startedAt = 0;
  let finished = false;
  let timerId = null;
  let timeLeft = 0;
  const prompts = {
    easy: [
      "Fast fingers win races.",
      "Dodge and chase coins.",
      "Smooth controls feel better.",
      "Quick games still shine.",
      "Tiny taps can beat giants.",
      "A calm run still feels good.",
      "Keep typing and stay loose.",
      "Small wins build big streaks.",
    ],
    normal: [
      "Fast fingers win browser races.",
      "Dodge, jump, and chase the high score.",
      "Portal games feel better with smooth controls.",
      "Classic arcade energy never really gets old.",
      "Tiny games can still make a huge playground.",
      "Every clean input makes a fast arcade game feel twice as good.",
      "Good browser games stay simple but keep giving you reasons to replay.",
      "Typing under pressure feels easier when the rhythm starts to click.",
      "A small arcade can still feel huge when every game has its own flavor.",
    ],
    hard: [
      "Subway runners get chaotic when every lane demands a different move.",
      "The best arcade sessions balance quick reflexes with smart decision making.",
      "Clean movement and sharp timing turn simple browser games into score marathons.",
      "High speed obstacle patterns get mean fast when your mistakes start to stack up.",
      "A great arcade update adds variety without losing the fast pick up and play feeling that made the games fun.",
      "When a typing challenge mixes pacing, precision, and longer phrases, every error suddenly matters much more.",
      "Sharp controls, readable feedback, and fair difficulty tuning keep even silly browser games satisfying for longer sessions.",
      "Simple mechanics become far more replayable once animations, stronger pacing, and a better upgrade curve all start working together.",
    ],
  };

  function getStagePool() {
    if (stageLevel <= 2) return prompts.easy;
    if (stageLevel <= 5) return prompts.normal;
    return prompts.hard;
  }

  function getTimeLimit(nextPrompt) {
    const mode = appState.difficulty;
    const base = mode === "chill" ? 16 : mode === "easy" ? 14 : mode === "hard" ? 11 : mode === "chaos" ? 9 : 12;
    return Math.max(4, base + nextPrompt.length * 0.06 - stageLevel * 0.4);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function resetState(keepScore = false) {
    const pool = getStagePool();
    prompt = pool[(stageLevel - 1) % pool.length];
    typed = "";
    startedAt = 0;
    finished = false;
    timeLeft = getTimeLimit(prompt);
    stopTimer();
    if (!keepScore) setScore(0);
    renderPrompt();
    setStatus(`Stage ${stageLevel}`);
  }

  function renderPrompt() {
    wrapper.querySelector(".typing-prompt").innerHTML = [...prompt]
      .map((char, index) => {
        let className = "";
        if (typed[index] != null) {
          className = typed[index] === char ? "typing-char-correct" : "typing-char-wrong";
        }
        return `<span class="${className}">${escapeHtml(char)}</span>`;
      })
      .join("");
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="time"]').textContent = `${timeLeft.toFixed(1)}s`;
    wrapper.querySelector('[data-meta="progress"]').textContent = `${typed.length}/${prompt.length}`;
  }

  function handleType(event) {
    if (finished) return;
    if (!startedAt && event.key.length === 1) {
      startedAt = Date.now();
      stopTimer();
      timerId = window.setInterval(() => {
        timeLeft = Math.max(0, timeLeft - 0.1);
        renderPrompt();
        if (timeLeft <= 0) {
          finished = true;
          stopTimer();
          setStatus("Out of time");
          scheduleAutoReset();
        }
      }, 100);
      setStatus("Typing");
    }
    if (event.key === "Backspace") {
      typed = typed.slice(0, -1);
      renderPrompt();
      return;
    }
    if (event.key.length !== 1) return;
    typed += event.key;
    renderPrompt();

    if (typed.length >= prompt.length) {
      finished = true;
      stopTimer();
      const seconds = Math.max(1, (Date.now() - startedAt) / 1000);
      const words = prompt.trim().split(/\s+/).length;
      const wpm = Math.round((words / seconds) * 60);
      const accuracy =
        [...prompt].filter((char, index) => typed[index] === char).length / prompt.length;
      const score = Math.max(0, Math.round(wpm * accuracy * (10 + stageLevel)));
      setScore(appState.score + score);
      setStatus(`Finished - ${wpm} WPM`);
      window.setTimeout(() => {
        stageLevel += 1;
        resetState(true);
      }, 650);
    }
  }

  return {
    id: "typing",
    getLevelText: () => String(stageLevel),
    title: "Typing Rush",
    tagline: "Type racer practice",
    subtitle: "Finish short phrases fast and keep your mistakes low.",
    description:
      "A typing challenge inspired by classroom and portal typing games. Finish the sentence quickly for a better score.",
    controls: "Use your keyboard to type the highlighted sentence.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="typing-card">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="time">0.0s</span>
              <span class="info-chip" data-meta="progress">0/0</span>
            </div>
          </div>
          <div class="typing-prompt"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      stageLevel = 1;
      resetState();
    },
    start() {
      setStatus(finished ? "Reset for a new phrase" : `Stage ${stageLevel}`);
    },
    reset() {
      stageLevel = 1;
      resetState();
    },
    onKeyDown(event) {
      handleType(event);
    },
    destroy() {
      stopTimer();
    },
  };
}

function createSpaceBlasterGame() {
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let leftPressed = false;
  let rightPressed = false;
  let shootPressed = false;
  let ship;
  let bullets = [];
  let meteors = [];
  let spawnTimer = 0;
  let shootTimer = 0;
  let shields = 3;
  let maxShields = 3;
  let credits = 0;
  let ammo = 0;
  let ammoRechargeTimer = 0;
  let fireRateLevel = 0;
  let spreadLevel = 0;
  let shipBoostLevel = 0;
  let pierceLevel = 0;
  let platingLevel = 0;
  let salvageLevel = 0;
  let ammoLevel = 0;
  let reloadLevel = 0;
  let damageLevel = 0;
  let stabilizerLevel = 0;
  let hitFlash = 0;
  let wave = 1;
  let waveSpawned = 0;
  let waveCleared = 0;
  let waveTarget = 0;
  let waveCooldown = 0;
  let midWaveBreakTaken = false;
  let intermissionUntil = 0;
  let intermissionNextWave = 0;
  let intermissionSecondsLeft = 0;
  let intermissionResumeCurrent = false;
  let intermissionTitle = "Upgrade Break";
  let lastUpgradePauseAt = -SPACE_UPGRADE_BREAK_COOLDOWN_MS;

  const upgradeCaps = {
    fire: 5,
    spread: 4,
    boost: 5,
    repair: Infinity,
    pierce: 4,
    plating: 4,
    salvage: 4,
    ammo: 5,
    reload: 5,
    damage: 4,
    stabilizer: 4,
  };

  function getConfig() {
    if (appState.difficulty === "chill") {
      return {
        shields: 4,
        shipSpeed: 6.6,
        meteorSpeed: 2.0,
        spawnRate: 72,
        minSpawnRate: 44,
        spawnRateRamp: 2,
        maxMeteors: 6,
        maxMeteorsCap: 9,
        baseWaveSize: 7,
        waveGrowth: 2,
        speedRamp: 0.12,
        waveCreditReward: 3,
      };
    }
    if (appState.difficulty === "easy") {
      return {
        shields: 4,
        shipSpeed: 6.3,
        meteorSpeed: 2.2,
        spawnRate: 66,
        minSpawnRate: 38,
        spawnRateRamp: 2,
        maxMeteors: 6,
        maxMeteorsCap: 9,
        baseWaveSize: 8,
        waveGrowth: 2,
        speedRamp: 0.14,
        waveCreditReward: 3,
      };
    }
    if (appState.difficulty === "hard") {
      return {
        shields: 3,
        shipSpeed: 5.45,
        meteorSpeed: 2.95,
        spawnRate: 52,
        minSpawnRate: 28,
        spawnRateRamp: 3,
        maxMeteors: 7,
        maxMeteorsCap: 11,
        baseWaveSize: 10,
        waveGrowth: 3,
        speedRamp: 0.2,
        waveCreditReward: 4,
      };
    }
    if (appState.difficulty === "chaos") {
      return {
        shields: 2,
        shipSpeed: 5.15,
        meteorSpeed: 3.25,
        spawnRate: 46,
        minSpawnRate: 24,
        spawnRateRamp: 4,
        maxMeteors: 8,
        maxMeteorsCap: 12,
        baseWaveSize: 11,
        waveGrowth: 3,
        speedRamp: 0.24,
        waveCreditReward: 4,
      };
    }
    return {
      shields: 3,
      shipSpeed: 5.85,
      meteorSpeed: 2.65,
      spawnRate: 58,
      minSpawnRate: 32,
      spawnRateRamp: 2,
      maxMeteors: 7,
      maxMeteorsCap: 10,
      baseWaveSize: 9,
      waveGrowth: 2,
      speedRamp: 0.17,
      waveCreditReward: 3,
    };
  }

  function getWaveState() {
    const config = getConfig();
    return {
      target: config.baseWaveSize + (wave - 1) * config.waveGrowth,
      spawnRate: Math.max(config.minSpawnRate, config.spawnRate - (wave - 1) * config.spawnRateRamp),
      meteorSpeed: config.meteorSpeed + (wave - 1) * config.speedRamp,
      maxMeteors: Math.min(config.maxMeteorsCap, config.maxMeteors + Math.floor((wave - 1) / 2)),
      reward: config.waveCreditReward + Math.floor((wave - 1) / 2),
    };
  }

  function getUpgradeState() {
    return {
      fireCooldown: Math.max(4, 11 - fireRateLevel),
      bulletSpeed: 8 + spreadLevel * 0.2 + stabilizerLevel * 0.9,
      moveSpeed: getConfig().shipSpeed + shipBoostLevel * 0.22,
      spreadShots: 1 + spreadLevel,
      bulletPierce: pierceLevel,
      bulletDamage: 1 + damageLevel,
      maxAmmo: 8 + ammoLevel * 3,
      reloadTicks: Math.max(8, 36 - reloadLevel * 5),
      creditGain: 1 + salvageLevel,
      fireCost: 7 + fireRateLevel * 5,
      spreadCost: 8 + spreadLevel * 6,
      boostCost: 7 + shipBoostLevel * 5,
      repairCost: 9,
      pierceCost: 10 + pierceLevel * 7,
      platingCost: 11 + platingLevel * 8,
      salvageCost: 9 + salvageLevel * 6,
      ammoCost: 10 + ammoLevel * 7,
      reloadCost: 9 + reloadLevel * 7,
      damageCost: 12 + damageLevel * 8,
      stabilizerCost: 11 + stabilizerLevel * 7,
    };
  }

  function startWave(nextWave, announce = true) {
    wave = nextWave;
    waveSpawned = 0;
    waveCleared = 0;
    waveTarget = getWaveState().target;
    waveCooldown = 70;
    midWaveBreakTaken = false;
    intermissionUntil = 0;
    intermissionNextWave = 0;
    intermissionSecondsLeft = 0;
    intermissionResumeCurrent = false;
    intermissionTitle = "Upgrade Break";
    spawnTimer = 0;
    updateHud();
    if (announce) {
      setStatus(`Wave ${wave} incoming`);
    }
  }

  function beginUpgradePause(nextWave, options = {}) {
    const { resumeCurrent = false, seconds = 6, title = "Upgrade Break" } = options;
    lastUpgradePauseAt = performance.now();
    intermissionNextWave = nextWave;
    intermissionResumeCurrent = resumeCurrent;
    intermissionTitle = title;
    intermissionUntil = performance.now() + seconds * 1000;
    intermissionSecondsLeft = seconds;
    leftPressed = false;
    rightPressed = false;
    shootPressed = false;
    setStatus(`Upgrade time ${intermissionSecondsLeft}`);
    updateHud();
    renderUpgrades();
  }

  function resetState() {
    const config = getConfig();
    ship = { x: 380, y: 390, width: 56, height: 26 };
    bullets = [];
    meteors = [];
    spawnTimer = 0;
    shootTimer = 0;
    maxShields = config.shields;
    shields = config.shields;
    credits = 0;
    ammo = 8;
    ammoRechargeTimer = 0;
    fireRateLevel = 0;
    spreadLevel = 0;
    shipBoostLevel = 0;
    pierceLevel = 0;
    platingLevel = 0;
    salvageLevel = 0;
    ammoLevel = 0;
    reloadLevel = 0;
    damageLevel = 0;
    stabilizerLevel = 0;
    hitFlash = 0;
    running = false;
    intermissionUntil = 0;
    intermissionNextWave = 0;
    intermissionSecondsLeft = 0;
    intermissionResumeCurrent = false;
    intermissionTitle = "Upgrade Break";
    lastUpgradePauseAt = -SPACE_UPGRADE_BREAK_COOLDOWN_MS;
    startWave(1, false);
    ammo = getUpgradeState().maxAmmo;
    setScore(0);
    updateHud();
    renderUpgrades();
    draw();
  }

  function updateHud() {
    const upgradeState = getUpgradeState();
    shell.hud.shields.textContent = `Shields ${shields}`;
    shell.hud.zone.textContent = `${getDifficultyPreset().label} sector`;
    shell.hud.wave.textContent = `Wave ${wave} ${waveCleared}/${waveTarget}`;
    shell.hud.credits.textContent = `Credits ${credits}`;
    shell.hud.weapon.textContent = `Blaster S${upgradeState.spreadShots} D${upgradeState.bulletDamage} P${pierceLevel}`;
    shell.hud.ammo.textContent = `Ammo ${ammo}/${upgradeState.maxAmmo}`;
    refreshLevel();
  }

  function isUpgradeMaxed(type) {
    if (type === "repair") return shields >= maxShields;
    if (type === "fire") return fireRateLevel >= upgradeCaps.fire;
    if (type === "spread") return spreadLevel >= upgradeCaps.spread;
    if (type === "boost") return shipBoostLevel >= upgradeCaps.boost;
    if (type === "pierce") return pierceLevel >= upgradeCaps.pierce;
    if (type === "plating") return platingLevel >= upgradeCaps.plating;
    if (type === "salvage") return salvageLevel >= upgradeCaps.salvage;
    if (type === "ammo") return ammoLevel >= upgradeCaps.ammo;
    if (type === "reload") return reloadLevel >= upgradeCaps.reload;
    if (type === "damage") return damageLevel >= upgradeCaps.damage;
    if (type === "stabilizer") return stabilizerLevel >= upgradeCaps.stabilizer;
    return false;
  }

  function renderUpgrades() {
    if (!shell?.wrap) return;
    const upgradeState = getUpgradeState();
    const upgradeBox = shell.wrap.querySelector(".action-button-grid");
    if (!upgradeBox) return;
    upgradeBox.innerHTML = `
      <button class="mini-button" data-upgrade="fire">Rapid Fire ${upgradeState.fireCost}</button>
      <button class="mini-button" data-upgrade="spread">Spread Shot ${upgradeState.spreadCost}</button>
      <button class="mini-button" data-upgrade="boost">Engine Boost ${upgradeState.boostCost}</button>
      <button class="mini-button" data-upgrade="repair">Shield Repair ${upgradeState.repairCost}</button>
      <button class="mini-button" data-upgrade="pierce">Pierce Shot ${upgradeState.pierceCost}</button>
      <button class="mini-button" data-upgrade="plating">Hull Plating ${upgradeState.platingCost}</button>
      <button class="mini-button" data-upgrade="salvage">Salvage Boost ${upgradeState.salvageCost}</button>
      <button class="mini-button" data-upgrade="ammo">Ammo Rack ${upgradeState.ammoCost}</button>
      <button class="mini-button" data-upgrade="reload">Reload Core ${upgradeState.reloadCost}</button>
      <button class="mini-button" data-upgrade="damage">Damage Amp ${upgradeState.damageCost}</button>
      <button class="mini-button" data-upgrade="stabilizer">Shot Stabilizer ${upgradeState.stabilizerCost}</button>
    `;
    upgradeBox.querySelectorAll("[data-upgrade]").forEach((button) => {
      const type = button.dataset.upgrade;
      const costMap = {
        fire: upgradeState.fireCost,
        spread: upgradeState.spreadCost,
        boost: upgradeState.boostCost,
        repair: upgradeState.repairCost,
        pierce: upgradeState.pierceCost,
        plating: upgradeState.platingCost,
        salvage: upgradeState.salvageCost,
        ammo: upgradeState.ammoCost,
        reload: upgradeState.reloadCost,
        damage: upgradeState.damageCost,
        stabilizer: upgradeState.stabilizerCost,
      };
      button.disabled = isUpgradeMaxed(type) || credits < costMap[type];
      button.addEventListener("click", () => applyUpgrade(button.dataset.upgrade));
    });
  }

  function spendCredits(cost) {
    if (credits < cost) {
      setStatus(`Need ${cost} credits`);
      return false;
    }
    credits -= cost;
    updateHud();
    renderUpgrades();
    return true;
  }

  function applyUpgrade(type) {
    const upgradeState = getUpgradeState();
    if (type === "fire") {
      if (isUpgradeMaxed(type)) {
        setStatus("Rapid Fire maxed");
        return;
      }
      if (!spendCredits(upgradeState.fireCost)) return;
      fireRateLevel += 1;
      setStatus("Rapid Fire upgraded");
    }
    if (type === "spread") {
      if (isUpgradeMaxed(type)) {
        setStatus("Spread Shot maxed");
        return;
      }
      if (!spendCredits(upgradeState.spreadCost)) return;
      spreadLevel += 1;
      setStatus("Spread Shot upgraded");
    }
    if (type === "boost") {
      if (isUpgradeMaxed(type)) {
        setStatus("Engine Boost maxed");
        return;
      }
      if (!spendCredits(upgradeState.boostCost)) return;
      shipBoostLevel += 1;
      setStatus("Engine boosted");
    }
    if (type === "repair") {
      if (shields >= maxShields) {
        setStatus("Shields already full");
        return;
      }
      if (!spendCredits(upgradeState.repairCost)) return;
      shields += 1;
      setStatus("Shield restored");
    }
    if (type === "pierce") {
      if (isUpgradeMaxed(type)) {
        setStatus("Pierce Shot maxed");
        return;
      }
      if (!spendCredits(upgradeState.pierceCost)) return;
      pierceLevel += 1;
      setStatus("Pierce Shot upgraded");
    }
    if (type === "plating") {
      if (isUpgradeMaxed(type)) {
        setStatus("Hull Plating maxed");
        return;
      }
      if (!spendCredits(upgradeState.platingCost)) return;
      platingLevel += 1;
      maxShields += 1;
      shields = Math.min(maxShields, shields + 1);
      setStatus("Hull reinforced");
    }
    if (type === "salvage") {
      if (isUpgradeMaxed(type)) {
        setStatus("Salvage Boost maxed");
        return;
      }
      if (!spendCredits(upgradeState.salvageCost)) return;
      salvageLevel += 1;
      setStatus("Salvage boosted");
    }
    if (type === "ammo") {
      if (isUpgradeMaxed(type)) {
        setStatus("Ammo Rack maxed");
        return;
      }
      if (!spendCredits(upgradeState.ammoCost)) return;
      ammoLevel += 1;
      ammo = Math.min(getUpgradeState().maxAmmo, ammo + 2);
      setStatus("Ammo expanded");
    }
    if (type === "reload") {
      if (isUpgradeMaxed(type)) {
        setStatus("Reload Core maxed");
        return;
      }
      if (!spendCredits(upgradeState.reloadCost)) return;
      reloadLevel += 1;
      setStatus("Reload speed up");
    }
    if (type === "damage") {
      if (isUpgradeMaxed(type)) {
        setStatus("Damage Amp maxed");
        return;
      }
      if (!spendCredits(upgradeState.damageCost)) return;
      damageLevel += 1;
      setStatus("Damage amplified");
    }
    if (type === "stabilizer") {
      if (isUpgradeMaxed(type)) {
        setStatus("Shot Stabilizer maxed");
        return;
      }
      if (!spendCredits(upgradeState.stabilizerCost)) return;
      stabilizerLevel += 1;
      setStatus("Shots stabilized");
    }
    updateHud();
    renderUpgrades();
  }

  function spawnMeteor() {
    const waveState = getWaveState();
    const health = 1 + Math.floor((wave - 1) / 4);
    meteors.push({
      x: 40 + Math.random() * 680,
      y: -20,
      r: 12 + Math.random() * 16,
      vy: waveState.meteorSpeed + Math.random() * 0.9,
      hp: health,
      maxHp: health,
    });
  }

  function update() {
    const now = performance.now();
    if (intermissionUntil > now) {
      const nextSeconds = Math.max(1, Math.ceil((intermissionUntil - now) / 1000));
      if (nextSeconds !== intermissionSecondsLeft) {
        intermissionSecondsLeft = nextSeconds;
        setStatus(`Upgrade time ${intermissionSecondsLeft}`);
      }
      return;
    }
    if (intermissionUntil > 0 && intermissionNextWave > 0) {
      const nextWave = intermissionNextWave;
      const resumeCurrent = intermissionResumeCurrent;
      intermissionUntil = 0;
      intermissionNextWave = 0;
      intermissionSecondsLeft = 0;
      intermissionResumeCurrent = false;
      intermissionTitle = "Upgrade Break";
      if (resumeCurrent) {
        waveCooldown = Math.max(waveCooldown, 28);
        setStatus(`Wave ${wave} resumed`);
        updateHud();
        renderUpgrades();
      } else {
        startWave(nextWave);
      }
      return;
    }

    const waveState = getWaveState();
    const upgradeState = getUpgradeState();
    if (ammo < upgradeState.maxAmmo) {
      ammoRechargeTimer += 1;
      if (ammoRechargeTimer >= upgradeState.reloadTicks) {
        ammo = Math.min(upgradeState.maxAmmo, ammo + 1);
        ammoRechargeTimer = 0;
        updateHud();
      }
    } else {
      ammoRechargeTimer = 0;
    }
    if (leftPressed) ship.x -= upgradeState.moveSpeed;
    if (rightPressed) ship.x += upgradeState.moveSpeed;
    ship.x = clamp(ship.x, 38, 722);
    hitFlash = Math.max(0, hitFlash - 1);

    shootTimer = Math.max(0, shootTimer - 1);
    if (waveCooldown > 0) {
      waveCooldown -= 1;
    } else if (waveSpawned < waveTarget) {
      spawnTimer += 1;
      if (spawnTimer >= waveState.spawnRate && meteors.length < waveState.maxMeteors) {
        spawnTimer = 0;
        spawnMeteor();
        waveSpawned += 1;
        updateHud();
      }
    }

    if (shootPressed && shootTimer === 0 && ammo > 0) {
      const spreadShots = upgradeState.spreadShots;
      const offsets = Array.from({ length: spreadShots }, (_, index) => index - (spreadShots - 1) / 2);
      offsets.forEach((offset) => {
        bullets.push({
          x: ship.x + offset * 14,
          y: ship.y - 18,
          vy: -upgradeState.bulletSpeed,
          vx: offset * 0.55,
          remainingHits: 1 + upgradeState.bulletPierce,
        });
      });
      ammo -= 1;
      ammoRechargeTimer = 0;
      shootTimer = upgradeState.fireCooldown;
      updateHud();
    } else if (shootPressed && shootTimer === 0 && ammo <= 0) {
      setStatus("Reloading");
    }

    bullets.forEach((bullet) => {
      bullet.x += bullet.vx || 0;
      bullet.y += bullet.vy;
    });
    meteors.forEach((meteor) => {
      meteor.y += meteor.vy;
    });

    bullets = bullets.filter((bullet) => bullet.y > -30 && bullet.x > -30 && bullet.x < 790);
    meteors = meteors.filter((meteor) => {
      if (meteor.y - meteor.r > 460) {
        shields -= 1;
        hitFlash = 10;
        updateHud();
        if (shields <= 0) {
          running = false;
          setStatus(`Sector lost - score ${appState.score}`);
          scheduleAutoReset();
        }
        return false;
      }
      return true;
    });

    const nextBullets = [];
    bullets.forEach((bullet) => {
      const hitIndex = meteors.findIndex(
        (meteor) => Math.hypot(bullet.x - meteor.x, bullet.y - meteor.y) < meteor.r + 4,
      );
      if (hitIndex >= 0) {
        const meteor = meteors[hitIndex];
        meteor.hp -= upgradeState.bulletDamage;
        if (meteor.hp <= 0) {
          meteors.splice(hitIndex, 1);
          waveCleared += 1;
          setScore(appState.score + 10 + damageLevel * 2);
          credits += upgradeState.creditGain;
          updateHud();
          renderUpgrades();
          if (
            !midWaveBreakTaken &&
            now - lastUpgradePauseAt >= SPACE_UPGRADE_BREAK_COOLDOWN_MS &&
            waveCleared >= Math.ceil(waveTarget / 2) &&
            waveCleared < waveTarget
          ) {
            midWaveBreakTaken = true;
            credits += 2 + Math.floor((wave - 1) / 3);
            updateHud();
            renderUpgrades();
            beginUpgradePause(wave, {
              resumeCurrent: true,
              seconds: 5,
              title: "Tune-Up Break",
            });
          }
        }
        bullet.remainingHits = Math.max(0, (bullet.remainingHits || 1) - 1);
        if (bullet.remainingHits > 0) {
          nextBullets.push(bullet);
        }
      } else {
        nextBullets.push(bullet);
      }
    });
    bullets = nextBullets;

    const survivingMeteors = [];
    let tookHit = false;
    meteors.forEach((meteor) => {
      const hitShip =
        meteor.y + meteor.r >= ship.y - ship.height / 2 &&
        Math.abs(meteor.x - ship.x) <= meteor.r + ship.width / 2;
      if (hitShip) {
        tookHit = true;
      } else {
        survivingMeteors.push(meteor);
      }
    });
    meteors = survivingMeteors;

    if (tookHit) {
      shields -= 1;
      hitFlash = 14;
      updateHud();
      if (shields <= 0) {
        running = false;
        setStatus(`Ship down - score ${appState.score}`);
        scheduleAutoReset();
      } else {
        setStatus("Shield hit");
      }
    }

    const upgradePauseReady = now - lastUpgradePauseAt >= SPACE_UPGRADE_BREAK_COOLDOWN_MS;

    if (running && waveSpawned >= waveTarget && meteors.length === 0 && waveCooldown === 0) {
      credits += waveState.reward;
      updateHud();
      renderUpgrades();
      if (upgradePauseReady) {
        beginUpgradePause(wave + 1, { seconds: 8, title: "Upgrade Break" });
      } else {
        startWave(wave + 1);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    const sky = ctx.createLinearGradient(0, 0, 0, 440);
    sky.addColorStop(0, "#071120");
    sky.addColorStop(1, "#120b24");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 760, 440);

    for (let i = 0; i < 40; i += 1) {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillRect((i * 97) % 760, (i * 53) % 440, 2, 2);
    }

    bullets.forEach((bullet) => {
      ctx.fillStyle = "#7ef0bb";
      ctx.fillRect(bullet.x - 2, bullet.y - 10, 4, 12);
    });

    meteors.forEach((meteor) => {
      const heat = meteor.maxHp > 1 ? (meteor.hp / meteor.maxHp) : 1;
      ctx.fillStyle = heat > 0.66 ? "#ff8a3d" : heat > 0.33 ? "#f97316" : "#facc15";
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, meteor.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "#46b1ff";
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y - 22);
    ctx.lineTo(ship.x - 24, ship.y + 20);
    ctx.lineTo(ship.x + 24, ship.y + 20);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#c7f2ff";
    ctx.fillRect(ship.x - 6, ship.y - 6, 12, 12);
    if (hitFlash > 0) {
      ctx.strokeStyle = "rgba(255, 138, 61, 0.9)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(ship.x, ship.y, 34, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (intermissionUntil > performance.now()) {
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 30px Trebuchet MS";
      ctx.fillText(intermissionTitle, 380, 196);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText(
        `${intermissionResumeCurrent ? "Resume" : "Next wave"} in ${intermissionSecondsLeft}`,
        380,
        232,
      );
      ctx.fillText("Use the upgrade buttons below while the game is paused", 380, 268);
    }

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Space Blaster", 380, 210);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Press Start and hold Space to fire", 380, 250);
      ctx.fillText(`Waves get tougher every round`, 380, 284);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "space",
    getLevelText: () => `Wave ${wave}`,
    title: "Space Blaster",
    tagline: "Arcade asteroid defense",
    subtitle: "Slide, fire, and clear meteor waves before your shields run out.",
    description:
      "A fast single-player space shooter inspired by classic browser arcade defense games. Move side to side, clear escalating waves, buy a wider set of upgrades, and protect your ship.",
    controls: "Left and right arrows or A and D to move. Hold Space to fire. Buy upgrades under the arena between tough waves.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "shields", label: "Shields 3" },
          { id: "zone", label: "Normal sector" },
          { id: "wave", label: "Wave 1/0" },
          { id: "credits", label: "Credits 0" },
          { id: "weapon", label: "Blaster 1:1" },
          { id: "ammo", label: "Ammo 0/0" },
        ],
      });
      shell.wrap.insertAdjacentHTML(
        "beforeend",
        `
          <div class="action-button-grid">
            <button class="mini-button" data-upgrade="fire">Rapid Fire 4</button>
            <button class="mini-button" data-upgrade="spread">Spread Shot 5</button>
            <button class="mini-button" data-upgrade="boost">Engine Boost 4</button>
            <button class="mini-button" data-upgrade="repair">Shield Repair 6</button>
            <button class="mini-button" data-upgrade="pierce">Pierce Shot 10</button>
            <button class="mini-button" data-upgrade="plating">Hull Plating 11</button>
            <button class="mini-button" data-upgrade="salvage">Salvage Boost 9</button>
            <button class="mini-button" data-upgrade="ammo">Ammo Rack 10</button>
            <button class="mini-button" data-upgrade="reload">Reload Core 9</button>
            <button class="mini-button" data-upgrade="damage">Damage Amp 12</button>
            <button class="mini-button" data-upgrade="stabilizer">Shot Stabilizer 11</button>
          </div>
        `,
      );
      stage.appendChild(shell.wrap);
      shell.canvas.width = 760;
      shell.canvas.height = 440;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      running = true;
      setStatus(`Wave ${wave} incoming`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) leftPressed = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) rightPressed = true;
      if (event.key === " ") shootPressed = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) leftPressed = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) rightPressed = false;
      if (event.key === " ") shootPressed = false;
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
  };
}

function createStackerGame() {
  let wrapper;
  let board;
  let animationId = null;
  let running = false;
  let placed = [];
  let movingBlock;
  let direction = 1;
  const boardWidth = 620;
  const blockHeight = 26;

  function getConfig() {
    if (appState.difficulty === "chill") return { startWidth: 260, speed: 3.2 };
    if (appState.difficulty === "easy") return { startWidth: 240, speed: 3.6 };
    if (appState.difficulty === "hard") return { startWidth: 180, speed: 5.4 };
    if (appState.difficulty === "chaos") return { startWidth: 160, speed: 6.0 };
    return { startWidth: 210, speed: 4.4 };
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="height"]').textContent = `Height ${placed.length}`;
    wrapper.querySelector('[data-meta="mode"]').textContent = `${getDifficultyPreset().label} mode`;
    refreshLevel();
  }

  function spawnMovingBlock() {
    const top = 380 - placed.length * blockHeight;
    const last = placed[placed.length - 1];
    movingBlock = {
      x: direction > 0 ? 16 : boardWidth - last.width - 16,
      y: Math.max(20, top),
      width: last.width,
    };
  }

  function resetState() {
    const config = getConfig();
    placed = [{ x: (boardWidth - config.startWidth) / 2, y: 380, width: config.startWidth }];
    direction = 1;
    movingBlock = null;
    running = false;
    setScore(0);
    spawnMovingBlock();
    renderBoard();
    setStatus("Ready");
  }

  function renderBoard() {
    updateHud();
    board.innerHTML = `
      <div class="stacker-floor"></div>
      ${placed
        .map(
          (block) =>
            `<div class="stacker-block" style="left:${block.x}px;bottom:${420 - block.y - blockHeight}px;width:${block.width}px;"></div>`,
        )
        .join("")}
      ${
        movingBlock
          ? `<div class="stacker-block" style="left:${movingBlock.x}px;bottom:${420 - movingBlock.y - blockHeight}px;width:${movingBlock.width}px;"></div>`
          : ""
      }
    `;
  }

  function loop() {
    if (!running || !movingBlock) return;
    animationId = requestAnimationFrame(loop);
    const config = getConfig();
    movingBlock.x += config.speed * direction;
    if (movingBlock.x <= 16) {
      movingBlock.x = 16;
      direction = 1;
    }
    if (movingBlock.x + movingBlock.width >= boardWidth - 16) {
      movingBlock.x = boardWidth - 16 - movingBlock.width;
      direction = -1;
    }
    renderBoard();
  }

  function dropBlock() {
    if (!movingBlock) return;
    if (!running) {
      running = true;
      setStatus("Stacking");
      loop();
      return;
    }

    const last = placed[placed.length - 1];
    const overlapLeft = Math.max(last.x, movingBlock.x);
    const overlapRight = Math.min(last.x + last.width, movingBlock.x + movingBlock.width);
    const overlap = overlapRight - overlapLeft;

    if (overlap <= 0) {
      running = false;
      movingBlock = null;
      renderBoard();
      setStatus(`Tower fell at ${placed.length - 1}`);
      scheduleAutoReset();
      return;
    }

    placed.push({
      x: overlapLeft,
      y: Math.max(20, last.y - blockHeight),
      width: overlap,
    });
    setScore(appState.score + 10);

    if (placed.length >= 14) {
      running = false;
      movingBlock = null;
      renderBoard();
      setStatus("Tower complete");
      return;
    }

    direction *= -1;
    spawnMovingBlock();
    renderBoard();
  }

  return {
    id: "stacker",
    getLevelText: () => String(Math.max(1, placed.length)),
    title: "Stack Tower",
    tagline: "Stacker-style timing game",
    subtitle: "Drop each moving block perfectly and build a taller tower.",
    description:
      "A timing-based tower builder inspired by classic stacker arcade games. Place each moving block cleanly or watch the tower shrink.",
    controls: "Press Space or click the board to place the current block.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stacker-card">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="height">Height 1</span>
              <span class="info-chip" data-meta="mode">Normal mode</span>
            </div>
          </div>
          <div class="stacker-board"></div>
          <p class="stacker-guide">Press Start to begin moving, then press Space or click to drop each block.</p>
        </div>
      `);
      stage.appendChild(wrapper);
      board = wrapper.querySelector(".stacker-board");
      board.addEventListener("click", dropBlock);
      resetState();
    },
    start() {
      if (!movingBlock) {
        setStatus("Reset for a new tower");
        return;
      }
      if (running) return;
      running = true;
      setStatus("Stacking");
      loop();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
    },
    onKeyDown(event) {
      if (event.key === " " || event.key === "Enter") dropBlock();
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
  };
}

function createNumberVaultGame() {
  let wrapper;
  let stageLevel = 1;
  let target = 0;
  let maxNumber = 100;
  let attemptsLeft = 8;
  let lowBound = 1;
  let highBound = 100;
  let solved = false;
  let guessesUsed = 0;

  function getConfig() {
    const base =
      appState.difficulty === "chill"
        ? { maxNumber: 30, attempts: 13 }
        : appState.difficulty === "easy"
          ? { maxNumber: 40, attempts: 12 }
          : appState.difficulty === "hard"
            ? { maxNumber: 120, attempts: 8 }
            : appState.difficulty === "chaos"
              ? { maxNumber: 150, attempts: 7 }
              : { maxNumber: 80, attempts: 10 };
    return {
      maxNumber: base.maxNumber + stageLevel * (appState.difficulty === "chill" ? 6 : appState.difficulty === "easy" ? 8 : 12),
      attempts: Math.max(4, base.attempts - Math.floor((stageLevel - 1) / 2)),
    };
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="range"]').textContent = `Window ${lowBound}-${highBound}`;
    wrapper.querySelector('[data-meta="attempts"]').textContent = `Attempts ${attemptsLeft}`;
    wrapper.querySelector('[data-meta="best"]').textContent = `Target 1-${maxNumber}`;
    refreshLevel();
  }

  function resetState(keepScore = false) {
    const config = getConfig();
    maxNumber = config.maxNumber;
    attemptsLeft = config.attempts;
    lowBound = 1;
    highBound = maxNumber;
    target = 1 + Math.floor(Math.random() * maxNumber);
    solved = false;
    guessesUsed = 0;
    if (!keepScore) setScore(0);
    wrapper.querySelector(".guess-log").textContent = `Guess a number from 1 to ${maxNumber}. Each wrong guess now shrinks the live range for you.`;
    wrapper.querySelector("input").value = "";
    updateHud();
    setStatus("Crack the vault");
  }

  function submitGuess() {
    if (solved || attemptsLeft <= 0) return;
    const input = wrapper.querySelector("input");
    const guess = Number(input.value);
    if (!Number.isFinite(guess) || guess < 1 || guess > maxNumber) {
      wrapper.querySelector(".guess-log").textContent = `Enter a number between 1 and ${maxNumber}.`;
      return;
    }
    if (guess < lowBound || guess > highBound) {
      wrapper.querySelector(".guess-log").textContent = `Stay inside the narrowed window: ${lowBound}-${highBound}.`;
      return;
    }

    attemptsLeft -= 1;
    guessesUsed += 1;
    updateHud();
    if (guess === target) {
      solved = true;
      setScore(appState.score + attemptsLeft * 15 + 25 + stageLevel * 8);
      wrapper.querySelector(".guess-log").textContent = `Vault opened. ${guess} was correct.`;
      setStatus("Solved");
      window.setTimeout(() => {
        stageLevel += 1;
        resetState(true);
      }, 650);
      return;
    }

    if (attemptsLeft <= 0) {
      wrapper.querySelector(".guess-log").textContent = `Out of tries. The code was ${target}.`;
      setStatus("Locked out");
      scheduleAutoReset();
      return;
    }

    const hint = guess < target ? "Too low" : "Too high";
    if (guess < target) {
      lowBound = Math.max(lowBound, guess + 1);
    } else {
      highBound = Math.min(highBound, guess - 1);
    }
    const distance = Math.abs(target - guess);
    const closeness = distance <= 3 ? " Very close." : distance <= 8 ? " Close." : "";
    wrapper.querySelector(".guess-log").textContent = `${hint}. New window: ${lowBound}-${highBound}.${closeness}`;
  }

  return {
    id: "vault",
    getLevelText: () => String(stageLevel),
    title: "Number Vault",
    tagline: "Guess-the-code puzzle",
    subtitle: "Crack the hidden code before your guesses run out.",
    description:
      "A clean number guessing game inspired by classic browser puzzles. Narrow the range, read the hints, and unlock the vault in as few tries as possible.",
    controls: "Type a number and press Enter or click Guess.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="guess-card">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="range">Window 1-100</span>
              <span class="info-chip" data-meta="attempts">Attempts 8</span>
              <span class="info-chip" data-meta="best">Target 1-100</span>
            </div>
          </div>
          <div class="guess-controls">
            <input type="number" min="1" step="1" placeholder="Enter your guess" />
            <button class="mini-button" type="button">Guess</button>
          </div>
          <div class="guess-log"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      stageLevel = 1;
      wrapper.querySelector("button").addEventListener("click", submitGuess);
      wrapper.querySelector("input").addEventListener("keydown", (event) => {
        if (event.key === "Enter") submitGuess();
      });
      resetState();
    },
    start() {
      wrapper.querySelector("input").focus();
      setStatus("Crack the vault");
    },
    reset() {
      stageLevel = 1;
      resetState();
    },
    destroy() {},
  };
}

function createColorFloodGame() {
  let wrapper;
  let board = [];
  let flooded = [];
  let movesLeft = 0;
  let solved = false;
  let stageLevel = 1;
  let nextStageTimeout = null;
  const palette = ["#46b1ff", "#ff8a3d", "#8f66ff", "#1eb980", "#ffd166"];

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 7, moves: 20 };
    if (appState.difficulty === "easy") return { size: 8, moves: 18 };
    if (appState.difficulty === "hard") return { size: 10, moves: 13 };
    if (appState.difficulty === "chaos") return { size: 11, moves: 11 };
    return { size: 9, moves: 15 };
  }

  function buildFloodMap(colorIndex) {
    const size = board.length;
    const visited = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
    const stack = [[0, 0]];
    while (stack.length) {
      const [row, col] = stack.pop();
      if (!board[row] || board[row][col] == null || visited[row][col]) continue;
      if (board[row][col] !== colorIndex) continue;
      visited[row][col] = true;
      stack.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]);
    }
    return visited;
  }

  function getFloodColor() {
    return board[0]?.[0] ?? 0;
  }

  function getFloodCount() {
    return flooded.flat().filter(Boolean).length;
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="stage"]').textContent = `Level ${stageLevel}`;
    wrapper.querySelector('[data-meta="moves"]').textContent = `Moves ${movesLeft}`;
    wrapper.querySelector('[data-meta="coverage"]').textContent = `Flooded ${getFloodCount()}/${board.length * board.length}`;
    refreshLevel();
  }

  function renderBoard() {
    updateHud();
    wrapper.querySelector(".flood-grid").style.gridTemplateColumns = `repeat(${board.length}, minmax(0, 1fr))`;
    wrapper.querySelector(".flood-grid").innerHTML = board
      .map((row, rowIndex) =>
        row
          .map((cell, colIndex) => {
            const floodedClass = flooded[rowIndex][colIndex] ? " flood-cell-active" : "";
            return `<div class="flood-cell${floodedClass}" style="background:${palette[cell]}"></div>`;
          })
          .join(""),
      )
      .join("");
  }

  function renderButtons() {
    wrapper.querySelector(".flood-controls").innerHTML = palette
      .map(
        (color, index) =>
          `<button class="mini-button flood-button" data-color="${index}" style="background:${color};color:#08111f">${index + 1}</button>`,
      )
      .join("");
    wrapper.querySelectorAll("[data-color]").forEach((button) => {
      button.addEventListener("click", () => playColor(Number(button.dataset.color)));
    });
  }

  function getStageConfig(level) {
    const baseConfig = getConfig();
    const sizeBoost = Math.min(3, Math.floor((level - 1) / 2));
    return {
      size: baseConfig.size + sizeBoost,
      moves: Math.max(baseConfig.moves - 3, baseConfig.moves + sizeBoost - Math.floor((level - 1) / 2)),
    };
  }

  function buildStage(level, keepScore = false) {
    const config = getStageConfig(level);
    stageLevel = level;
    board = Array.from({ length: config.size }, () =>
      Array.from({ length: config.size }, () => Math.floor(Math.random() * palette.length)),
    );
    flooded = buildFloodMap(getFloodColor());
    movesLeft = config.moves;
    solved = false;
    if (!keepScore) {
      setScore(0);
    } else {
      refreshLevel();
    }
    renderButtons();
    renderBoard();
    setStatus(`Flood the whole board - level ${stageLevel}`);
  }

  function resetState() {
    if (nextStageTimeout) {
      clearTimeout(nextStageTimeout);
      nextStageTimeout = null;
    }
    buildStage(1);
  }

  function playColor(nextColor) {
    if (solved || movesLeft <= 0) return;
    const currentColor = getFloodColor();
    if (nextColor === currentColor) return;

    for (let row = 0; row < board.length; row += 1) {
      for (let col = 0; col < board.length; col += 1) {
        if (flooded[row][col]) board[row][col] = nextColor;
      }
    }

    flooded = buildFloodMap(nextColor);
    movesLeft -= 1;
    renderBoard();

    const floodCount = getFloodCount();
    if (floodCount === board.length * board.length) {
      solved = true;
      setScore(appState.score + 100 + movesLeft * 12 + (stageLevel - 1) * 15);
      setStatus(`Level ${stageLevel} cleared`);
      nextStageTimeout = window.setTimeout(() => {
        nextStageTimeout = null;
        buildStage(stageLevel + 1, true);
      }, 900);
      return;
    }

    if (movesLeft <= 0) {
      setStatus("Out of moves");
      scheduleAutoReset();
      return;
    }

    setStatus("Keep flooding");
  }

  return {
    id: "flood",
    getLevelText: () => String(stageLevel),
    title: "Color Flood",
    tagline: "Flood-fill puzzle board",
    subtitle: "Choose colors carefully and overtake the full board before your moves run out.",
    description:
      "A clean flood-fill puzzle inspired by classic browser color-takeover games. Expand from the top-left and plan your route across the whole grid.",
    controls: "Click a color button to spread that color through your current flood area.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Level 1</span>
              <span class="info-chip" data-meta="moves">Moves 0</span>
              <span class="info-chip" data-meta="coverage">Flooded 0/0</span>
            </div>
          </div>
          <div class="flood-grid"></div>
          <div class="flood-controls action-button-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus("Flood the whole board");
    },
    reset() {
      resetState();
    },
    destroy() {
      if (nextStageTimeout) {
        clearTimeout(nextStageTimeout);
        nextStageTimeout = null;
      }
    },
  };
}

function createLightsOutGame() {
  let wrapper;
  let board = [];
  let stageLevel = 1;
  let presses = 0;
  let nextStageTimeout = null;

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 4, scrambleBase: 5 };
    if (appState.difficulty === "easy") return { size: 4, scrambleBase: 7 };
    if (appState.difficulty === "hard") return { size: 6, scrambleBase: 15 };
    if (appState.difficulty === "chaos") return { size: 7, scrambleBase: 18 };
    return { size: 5, scrambleBase: 10 };
  }

  function makeBoard(size) {
    return Array.from({ length: size }, () => Array.from({ length: size }, () => false));
  }

  function toggle(row, col) {
    if (board[row]?.[col] == null) return;
    board[row][col] = !board[row][col];
  }

  function toggleCross(row, col) {
    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="presses"]').textContent = `Presses ${presses}`;
    refreshLevel();
  }

  function renderBoard() {
    wrapper.querySelector(".lights-grid").style.gridTemplateColumns = `repeat(${board.length}, minmax(0, 1fr))`;
    wrapper.querySelector(".lights-grid").innerHTML = board
      .map((row, rowIndex) =>
        row
          .map(
            (cell, colIndex) =>
              `<button class="lights-cell ${cell ? "on" : ""}" data-row="${rowIndex}" data-col="${colIndex}"></button>`,
          )
          .join(""),
      )
      .join("");
    wrapper.querySelectorAll("[data-row]").forEach((button) => {
      button.addEventListener("click", () =>
        pressCell(Number(button.dataset.row), Number(button.dataset.col)),
      );
    });
    updateHud();
  }

  function buildStage(level, preserveScore = false) {
    const config = getConfig();
    board = makeBoard(config.size);
    presses = 0;
    if (!preserveScore) {
      setScore(0);
    }
    const scrambleMoves = config.scrambleBase + level * 2;
    for (let step = 0; step < scrambleMoves; step += 1) {
      toggleCross(
        Math.floor(Math.random() * board.length),
        Math.floor(Math.random() * board.length),
      );
    }
    if (board.flat().every((cell) => !cell)) {
      toggleCross(Math.floor(board.length / 2), Math.floor(board.length / 2));
    }
    renderBoard();
    setStatus(`Stage ${stageLevel}`);
  }

  function pressCell(row, col) {
    toggleCross(row, col);
    presses += 1;
    renderBoard();
    if (board.flat().every((cell) => !cell)) {
      setScore(appState.score + Math.max(30, 90 - presses * 4));
      stageLevel += 1;
      setStatus("Board solved");
      if (nextStageTimeout) clearTimeout(nextStageTimeout);
      nextStageTimeout = window.setTimeout(() => {
        buildStage(stageLevel, true);
        nextStageTimeout = null;
      }, 450);
      return;
    }
    setStatus("Clear every light");
  }

  function resetState() {
    if (nextStageTimeout) {
      clearTimeout(nextStageTimeout);
      nextStageTimeout = null;
    }
    stageLevel = 1;
    buildStage(stageLevel);
  }

  return {
    id: "lights",
    getLevelText: () => String(stageLevel),
    title: "Lights Out",
    tagline: "Tap-to-clear logic puzzle",
    subtitle: "Flip a tile, change its neighbors, and clear every light on the board.",
    description:
      "A Lights Out-style puzzle where each press flips a cross-shaped cluster. Solve a board to move to the next stage automatically.",
    controls: "Click a tile to toggle it and its direct neighbors.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="presses">Presses 0</span>
            </div>
          </div>
          <div class="lights-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus(`Stage ${stageLevel}`);
    },
    reset() {
      resetState();
    },
    destroy() {
      if (nextStageTimeout) clearTimeout(nextStageTimeout);
      nextStageTimeout = null;
    },
  };
}

function createCrateQuestGame() {
  let wrapper;
  let levelIndex = 0;
  let board = [];
  let player = { row: 0, col: 0 };
  let moves = 0;
  let nextStageTimeout = null;
  let history = [];
  const levelSets = {
    easy: [
      [
        "#######",
        "#.....#",
        "#..P..#",
        "#..B..#",
        "#..G..#",
        "#.....#",
        "#######",
      ],
      [
        "########",
        "#......#",
        "#..P...#",
        "#...B..#",
        "#...G..#",
        "#......#",
        "########",
      ],
      [
        "#########",
        "#.......#",
        "#..P....#",
        "#..BB...#",
        "#..GG...#",
        "#.......#",
        "#########",
      ],
      [
        "#########",
        "#.......#",
        "#..P.B..#",
        "#.......#",
        "#..B....#",
        "#..G.G..#",
        "#.......#",
        "#########",
      ],
      [
        "##########",
        "#........#",
        "#..P.....#",
        "#..B.B...#",
        "#........#",
        "#..G.G...#",
        "#........#",
        "##########",
      ],
      [
        "##########",
        "#........#",
        "#..P.....#",
        "#..BBB...#",
        "#........#",
        "#..GGG...#",
        "#........#",
        "##########",
      ],
    ],
    normal: [
      [
        "#########",
        "#.......#",
        "#..P.B..#",
        "#.......#",
        "#..B....#",
        "#..G.G..#",
        "#.......#",
        "#########",
      ],
      [
        "##########",
        "#........#",
        "#..P.....#",
        "#..B.B...#",
        "#........#",
        "#..G.G...#",
        "#........#",
        "##########",
      ],
      [
        "##########",
        "#........#",
        "#..P.....#",
        "#..BBB...#",
        "#........#",
        "#..GGG...#",
        "#........#",
        "##########",
      ],
      [
        "###########",
        "#.........#",
        "#..P......#",
        "#..B.B....#",
        "#.....B...#",
        "#..G.G....#",
        "#.....G...#",
        "#.........#",
        "###########",
      ],
      [
        "###########",
        "#.........#",
        "#....P....#",
        "#..BB.....#",
        "#.....BB..#",
        "#..GG.....#",
        "#.....GG..#",
        "#.........#",
        "###########",
      ],
      [
        "############",
        "#..........#",
        "#..P.......#",
        "#..B.B.B...#",
        "#..........#",
        "#..G.G.G...#",
        "#..........#",
        "############",
      ],
      [
        "############",
        "#..........#",
        "#....P.....#",
        "#..BB......#",
        "#......BB..#",
        "#..GG......#",
        "#......GG..#",
        "#..........#",
        "############",
      ],
      [
        "#############",
        "#...........#",
        "#....P......#",
        "#..B.B.B....#",
        "#......B....#",
        "#..G.G.G....#",
        "#......G....#",
        "#...........#",
        "#############",
      ],
    ],
    hard: [
      [
        "###########",
        "#.........#",
        "#....P....#",
        "#..BB.....#",
        "#.....BB..#",
        "#..GG.....#",
        "#.....GG..#",
        "#.........#",
        "###########",
      ],
      [
        "############",
        "#..........#",
        "#..P.......#",
        "#..B.B.B...#",
        "#..........#",
        "#..G.G.G...#",
        "#..........#",
        "############",
      ],
      [
        "############",
        "#..........#",
        "#....P.....#",
        "#..BB......#",
        "#......BB..#",
        "#..GG......#",
        "#......GG..#",
        "#..........#",
        "############",
      ],
      [
        "#############",
        "#...........#",
        "#....P......#",
        "#..B.B.B....#",
        "#......B....#",
        "#..G.G.G....#",
        "#......G....#",
        "#...........#",
        "#############",
      ],
      [
        "#############",
        "#...........#",
        "#.....P.....#",
        "#..BB..BB...#",
        "#...........#",
        "#..GG..GG...#",
        "#...........#",
        "#############",
      ],
      [
        "##############",
        "#............#",
        "#.....P......#",
        "#..B.B..B....#",
        "#......B.....#",
        "#..G.G..G....#",
        "#......G.....#",
        "#............#",
        "##############",
      ],
      [
        "##############",
        "#............#",
        "#......P.....#",
        "#..BB...BB...#",
        "#............#",
        "#..GG...GG...#",
        "#............#",
        "##############",
      ],
      [
        "###############",
        "#.............#",
        "#......P......#",
        "#..B.B.B.B....#",
        "#.............#",
        "#..G.G.G.G....#",
        "#.............#",
        "###############",
      ],
    ],
  };

  function getLevels() {
    if (appState.difficulty === "chill") return levelSets.easy;
    if (appState.difficulty === "easy") return [...levelSets.easy.slice(1), ...levelSets.normal.slice(0, 5)];
    if (appState.difficulty === "normal") return [...levelSets.normal, ...levelSets.hard.slice(0, 2)];
    if (appState.difficulty === "hard") return levelSets.hard;
    if (appState.difficulty === "chaos") return [...levelSets.hard, ...levelSets.hard.slice(2).reverse()];
    return levelSets.normal;
  }

  function cloneBoard(nextBoard) {
    return nextBoard.map((row) => [...row]);
  }

  function pushHistory() {
    history.push({
      board: cloneBoard(board),
      player: { ...player },
      moves,
    });
    if (history.length > 40) {
      history.shift();
    }
  }

  function undoMove() {
    if (!history.length) {
      setStatus("Nothing to undo");
      return;
    }
    const snapshot = history.pop();
    board = cloneBoard(snapshot.board);
    player = { ...snapshot.player };
    moves = snapshot.moves;
    renderBoard();
    setStatus("Undid last move");
  }

  function loadLevel(index, preserveScore = false) {
    const levels = getLevels();
    if (nextStageTimeout) {
      clearTimeout(nextStageTimeout);
      nextStageTimeout = null;
    }
    levelIndex = clamp(index, 0, levels.length - 1);
    board = levels[levelIndex].map((row) => row.split(""));
    moves = 0;
    history = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === "P") {
          player = { row: rowIndex, col: colIndex };
          board[rowIndex][colIndex] = ".";
        }
      });
    });
    if (!preserveScore) {
      setScore(0);
    }
    renderBoard();
    setStatus(`Stage ${levelIndex + 1}`);
  }

  function isGoal(row, col) {
    const levels = getLevels();
    return levels[levelIndex][row][col] === "G";
  }

  function getBoxesOnGoals() {
    let count = 0;
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === "B" && isGoal(rowIndex, colIndex)) count += 1;
      });
    });
    return count;
  }

  function getGoalCount() {
    const levels = getLevels();
    return levels[levelIndex].join("").split("").filter((cell) => cell === "G").length;
  }

  function updateHud() {
    const levels = getLevels();
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${levelIndex + 1}/${levels.length}`;
    wrapper.querySelector('[data-meta="moves"]').textContent = `Moves ${moves}`;
    wrapper.querySelector('[data-meta="goals"]').textContent = `Goals ${getBoxesOnGoals()}/${getGoalCount()}`;
    refreshLevel();
  }

  function renderBoard() {
    wrapper.querySelector(".crate-grid").style.gridTemplateColumns = `repeat(${board[0].length}, minmax(0, 1fr))`;
    wrapper.querySelector(".crate-grid").innerHTML = board
      .map((row, rowIndex) =>
        row
          .map((cell, colIndex) => {
            const classes = ["crate-cell"];
            let icon = "";
            if (cell === "#") {
              classes.push("crate-wall");
            } else {
              classes.push("crate-floor");
              if (isGoal(rowIndex, colIndex)) classes.push("crate-goal");
            }
            if (cell === "B") {
              classes.push(isGoal(rowIndex, colIndex) ? "crate-box-on-goal" : "crate-box");
              icon = "📦";
            }
            if (rowIndex === player.row && colIndex === player.col) {
              classes.push("crate-player");
              icon = "🙂";
            } else if (isGoal(rowIndex, colIndex) && cell !== "B") {
              icon = "🎯";
            }
            return `<div class="${classes.join(" ")}">${icon}</div>`;
          })
          .join(""),
      )
      .join("");
    updateHud();
  }

  function canEnter(row, col) {
    return board[row]?.[col] && board[row][col] !== "#";
  }

  function tryMove(deltaRow, deltaCol) {
    const levels = getLevels();
    const nextRow = player.row + deltaRow;
    const nextCol = player.col + deltaCol;
    if (!canEnter(nextRow, nextCol)) return;
    pushHistory();

    if (board[nextRow][nextCol] === "B") {
      const pushRow = nextRow + deltaRow;
      const pushCol = nextCol + deltaCol;
      if (!canEnter(pushRow, pushCol) || board[pushRow][pushCol] === "B") {
        history.pop();
        return;
      }
      board[pushRow][pushCol] = "B";
      board[nextRow][nextCol] = ".";
    }

    player = { row: nextRow, col: nextCol };
    moves += 1;
    renderBoard();

    if (getBoxesOnGoals() === getGoalCount()) {
      setScore(appState.score + Math.max(40, 140 - moves * 4));
      if (levelIndex < levels.length - 1) {
        setStatus("Stage cleared");
        nextStageTimeout = window.setTimeout(() => {
          loadLevel(levelIndex + 1, true);
          nextStageTimeout = null;
        }, 420);
      } else {
        setStatus("All stages cleared");
      }
      return;
    }

    setStatus("Push every crate onto a target");
  }

  return {
    id: "crates",
    getLevelText: () => String(levelIndex + 1),
    title: "Crate Quest",
    tagline: "Sokoban-style push puzzle",
    subtitle: "Push every crate onto a target and clear each stage one by one.",
    description:
      "A Sokoban-style puzzle run with different stage ladders for easier or harder difficulty settings. Move carefully, push crates onto goals, and avoid trapping yourself.",
    controls: "Use arrow keys or WASD to move and push crates. Use U to undo or R to retry the stage.",
    mount(stage) {
      const levels = getLevels();
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1/${levels.length}</span>
              <span class="info-chip" data-meta="moves">Moves 0</span>
              <span class="info-chip" data-meta="goals">Goals 0/0</span>
            </div>
          </div>
          <div class="action-button-grid">
            <button class="mini-button" data-action="undo">Undo</button>
            <button class="mini-button" data-action="retry">Retry stage</button>
          </div>
          <div class="crate-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector('[data-action="undo"]').addEventListener("click", undoMove);
      wrapper.querySelector('[data-action="retry"]').addEventListener("click", () => {
        loadLevel(levelIndex, true);
        setStatus(`Stage ${levelIndex + 1} reset`);
      });
      loadLevel(0);
    },
    start() {
      setStatus("Push every crate onto a target");
    },
    reset() {
      loadLevel(0);
    },
    onKeyDown(event) {
      if (["u", "U"].includes(event.key)) {
        undoMove();
        return;
      }
      if (["r", "R"].includes(event.key)) {
        loadLevel(levelIndex, true);
        setStatus(`Stage ${levelIndex + 1} reset`);
        return;
      }
      if (["ArrowUp", "w", "W"].includes(event.key)) tryMove(-1, 0);
      if (["ArrowDown", "s", "S"].includes(event.key)) tryMove(1, 0);
      if (["ArrowLeft", "a", "A"].includes(event.key)) tryMove(0, -1);
      if (["ArrowRight", "d", "D"].includes(event.key)) tryMove(0, 1);
    },
    destroy() {
      if (nextStageTimeout) clearTimeout(nextStageTimeout);
      nextStageTimeout = null;
    },
  };
}

function createCosmicClickerGame() {
  let wrapper;
  let energy = 0;
  let tapPower = 1;
  let autoBots = 0;
  let botTimer = null;
  let tapLevel = 0;
  let botLevel = 0;
  let reactorLevel = 0;
  let critLevel = 0;
  let overclockLevel = 0;
  let batteryLevel = 0;
  let swarmLevel = 0;
  let pulseLevel = 0;
  let comboLevel = 0;
  let luckLevel = 0;
  let comboCount = 0;
  let lastClickAt = 0;

  function getUpgradeCosts() {
    return {
      tap: 18 + tapLevel * 22 + tapLevel * tapLevel * 8,
      bots: 42 + botLevel * 38 + botLevel * botLevel * 12,
      reactor: 80 + reactorLevel * 60 + reactorLevel * reactorLevel * 18,
      crit: 60 + critLevel * 54 + critLevel * critLevel * 16,
      overclock: 95 + overclockLevel * 70 + overclockLevel * overclockLevel * 22,
      battery: 70 + batteryLevel * 48 + batteryLevel * batteryLevel * 16,
      swarm: 120 + swarmLevel * 82 + swarmLevel * swarmLevel * 24,
      pulse: 135 + pulseLevel * 88 + pulseLevel * pulseLevel * 26,
      combo: 90 + comboLevel * 64 + comboLevel * comboLevel * 20,
      luck: 110 + luckLevel * 76 + luckLevel * luckLevel * 22,
    };
  }

  function getGlobalMultiplier() {
    return 1 + overclockLevel * 0.22;
  }

  function getCritChance() {
    return Math.min(0.35, critLevel * 0.06);
  }

  function getCritMultiplier() {
    return 1.7 + critLevel * 0.25;
  }

  function getLuckyChance() {
    return Math.min(0.28, luckLevel * 0.035);
  }

  function getBatteryBonus() {
    return batteryLevel * 2;
  }

  function getPulseOutput() {
    return pulseLevel * (2 + reactorLevel);
  }

  function getSwarmMultiplier() {
    return 1 + swarmLevel * 0.38;
  }

  function getComboWindowMs() {
    return 850 + comboLevel * 170;
  }

  function getComboMultiplier() {
    const extraCombo = Math.max(0, comboCount - 1);
    return 1 + Math.min(1.4, extraCombo * (0.08 + comboLevel * 0.025));
  }

  function getAutoOutput() {
    const botOutput = autoBots * (1 + reactorLevel * 0.75);
    const totalOutput = (botOutput + getPulseOutput()) * getSwarmMultiplier() * getGlobalMultiplier();
    return Math.max(0, Math.round(totalOutput));
  }

  function getTapStrength() {
    return tapPower + overclockLevel + getBatteryBonus();
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="energy"]').textContent = `Energy ${energy}`;
    wrapper.querySelector('[data-meta="power"]').textContent = `Tap ${getTapStrength()}`;
    wrapper.querySelector('[data-meta="bots"]').textContent = `Bots ${autoBots}`;
    wrapper.querySelector('[data-meta="output"]').textContent = `Output ${getAutoOutput()}/s`;
    wrapper.querySelector('[data-meta="crit"]').textContent = `Crit ${Math.round(getCritChance() * 100)}%`;
    wrapper.querySelector('[data-meta="combo"]').textContent = `Combo x${Math.max(1, comboCount)}`;
    wrapper.querySelector('[data-meta="luck"]').textContent = `Luck ${Math.round(getLuckyChance() * 100)}%`;
    refreshLevel();
  }

  function renderUpgrades() {
    const costs = getUpgradeCosts();
    wrapper.querySelector(".clicker-upgrades").innerHTML = `
      <button class="mini-button" data-upgrade="tap">Tap Boost ${costs.tap}</button>
      <button class="mini-button" data-upgrade="bots">Auto Bot ${costs.bots}</button>
      <button class="mini-button" data-upgrade="reactor">Reactor Core ${costs.reactor}</button>
      <button class="mini-button" data-upgrade="crit">Crit Lens ${costs.crit}</button>
      <button class="mini-button" data-upgrade="overclock">Overclock ${costs.overclock}</button>
      <button class="mini-button" data-upgrade="battery">Battery Pack ${costs.battery}</button>
      <button class="mini-button" data-upgrade="swarm">Drone Swarm ${costs.swarm}</button>
      <button class="mini-button" data-upgrade="pulse">Pulse Core ${costs.pulse}</button>
      <button class="mini-button" data-upgrade="combo">Combo Drive ${costs.combo}</button>
      <button class="mini-button" data-upgrade="luck">Lucky Star ${costs.luck}</button>
    `;
    wrapper.querySelectorAll("[data-upgrade]").forEach((button) => {
      button.addEventListener("click", () => buyUpgrade(button.dataset.upgrade));
    });
  }

  function renderAll() {
    updateHud();
    renderUpgrades();
  }

  function syncScore() {
    setScore(energy);
    renderAll();
  }

  function resetState() {
    energy = 0;
    tapPower = 1;
    autoBots = 0;
    tapLevel = 0;
    botLevel = 0;
    reactorLevel = 0;
    critLevel = 0;
    overclockLevel = 0;
    batteryLevel = 0;
    swarmLevel = 0;
    pulseLevel = 0;
    comboLevel = 0;
    luckLevel = 0;
    comboCount = 0;
    lastClickAt = 0;
    if (botTimer) clearInterval(botTimer);
    botTimer = window.setInterval(() => {
      const autoGain = getAutoOutput();
      if (!autoGain) return;
      energy += autoGain;
      syncScore();
    }, 1000);
    syncScore();
    setStatus("Click the core");
  }

  function clickCore() {
    const now = Date.now();
    if (now - lastClickAt <= getComboWindowMs()) {
      comboCount += 1;
    } else {
      comboCount = 1;
    }
    lastClickAt = now;

    let gain = getTapStrength() * getGlobalMultiplier() * getComboMultiplier();
    const crit = Math.random() < getCritChance();
    const jackpot = Math.random() < getLuckyChance();
    if (crit) {
      gain *= getCritMultiplier();
    }
    if (jackpot) {
      gain += 12 + luckLevel * 9 + comboCount * 2;
    }
    energy += Math.max(1, Math.round(gain));
    syncScore();
    if (jackpot && crit) {
      setStatus("Lucky critical burst");
    } else if (jackpot) {
      setStatus("Lucky burst");
    } else if (crit) {
      setStatus("Critical charge");
    } else if (comboCount >= 4) {
      setStatus("Combo charging");
    } else {
      setStatus("Charging");
    }
  }

  function buyUpgrade(type) {
    const costs = getUpgradeCosts();
    if (type === "tap") {
      if (energy < costs.tap) {
        setStatus(`Need ${costs.tap} energy`);
        return;
      }
      energy -= costs.tap;
      tapLevel += 1;
      tapPower += 1;
      syncScore();
      setStatus("Tap boosted");
      return;
    }
    if (type === "bots") {
      if (energy < costs.bots) {
        setStatus(`Need ${costs.bots} energy`);
        return;
      }
      energy -= costs.bots;
      botLevel += 1;
      autoBots += 1;
      syncScore();
      setStatus("Auto bot built");
      return;
    }
    if (type === "reactor") {
      if (energy < costs.reactor) {
        setStatus(`Need ${costs.reactor} energy`);
        return;
      }
      energy -= costs.reactor;
      reactorLevel += 1;
      syncScore();
      setStatus("Reactor output up");
      return;
    }
    if (type === "crit") {
      if (energy < costs.crit) {
        setStatus(`Need ${costs.crit} energy`);
        return;
      }
      energy -= costs.crit;
      critLevel += 1;
      syncScore();
      setStatus("Crit chance raised");
      return;
    }
    if (type === "overclock") {
      if (energy < costs.overclock) {
        setStatus(`Need ${costs.overclock} energy`);
        return;
      }
      energy -= costs.overclock;
      overclockLevel += 1;
      syncScore();
      setStatus("Core overclocked");
      return;
    }
    if (type === "battery") {
      if (energy < costs.battery) {
        setStatus(`Need ${costs.battery} energy`);
        return;
      }
      energy -= costs.battery;
      batteryLevel += 1;
      syncScore();
      setStatus("Battery pack installed");
      return;
    }
    if (type === "swarm") {
      if (energy < costs.swarm) {
        setStatus(`Need ${costs.swarm} energy`);
        return;
      }
      energy -= costs.swarm;
      swarmLevel += 1;
      syncScore();
      setStatus("Drone swarm expanded");
      return;
    }
    if (type === "pulse") {
      if (energy < costs.pulse) {
        setStatus(`Need ${costs.pulse} energy`);
        return;
      }
      energy -= costs.pulse;
      pulseLevel += 1;
      syncScore();
      setStatus("Pulse core online");
      return;
    }
    if (type === "combo") {
      if (energy < costs.combo) {
        setStatus(`Need ${costs.combo} energy`);
        return;
      }
      energy -= costs.combo;
      comboLevel += 1;
      syncScore();
      setStatus("Combo drive tuned");
      return;
    }
    if (type === "luck") {
      if (energy < costs.luck) {
        setStatus(`Need ${costs.luck} energy`);
        return;
      }
      energy -= costs.luck;
      luckLevel += 1;
      syncScore();
      setStatus("Lucky star aligned");
    }
  }

  return {
    id: "clicker",
    levelStep: 180,
    title: "Cosmic Clicker",
    tagline: "Tiny idle tap builder",
    subtitle: "Click the glowing core, buy upgrades, and watch your energy climb.",
    description:
      "A longer clicker game with ten upgrades, crits, combo chains, lucky bursts, and stronger idle scaling so runs last much longer.",
    controls: "Click the core and use the upgrade buttons below it.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="clicker-card">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="energy">Energy 0</span>
              <span class="info-chip" data-meta="power">Tap 1</span>
              <span class="info-chip" data-meta="bots">Bots 0</span>
              <span class="info-chip" data-meta="output">Output 0/s</span>
              <span class="info-chip" data-meta="crit">Crit 0%</span>
              <span class="info-chip" data-meta="combo">Combo x1</span>
              <span class="info-chip" data-meta="luck">Luck 0%</span>
            </div>
          </div>
          <button class="clicker-button" type="button">Tap The Core</button>
          <div class="action-button-grid clicker-upgrades"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector(".clicker-button").addEventListener("click", clickCore);
      resetState();
    },
    start() {
      setStatus("Click the core");
    },
    reset() {
      resetState();
    },
    destroy() {
      if (botTimer) clearInterval(botTimer);
      botTimer = null;
    },
  };
}

function createRpsRushGame() {
  let wrapper;
  let rounds = 0;
  let wins = 0;
  let losses = 0;
  let streak = 0;
  let lastPlayerMove = null;
  let lastCpuMove = null;
  let selectedMove = null;
  let revealTimer = null;
  let revealActive = false;
  const picks = ["rock", "paper", "scissors"];
  const labels = {
    rock: "Rock",
    paper: "Paper",
    scissors: "Scissors",
  };
  const icons = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
  };

  function chooseCpuMove(playerMove) {
    const totalRounds = rounds + wins + losses;
    const pressure = Math.min(0.38, totalRounds * 0.02 + Math.max(0, streak - 1) * 0.04);
    const counterMove =
      playerMove === "rock" ? "paper" : playerMove === "paper" ? "scissors" : "rock";
    if (Math.random() < pressure) return counterMove;
    return picks[Math.floor(Math.random() * picks.length)];
  }

  function resultFor(player, cpu) {
    if (player === cpu) return "draw";
    if (
      (player === "rock" && cpu === "scissors") ||
      (player === "paper" && cpu === "rock") ||
      (player === "scissors" && cpu === "paper")
    ) {
      return "win";
    }
    return "loss";
  }

  function renderBoard(message = "Pick a move to start.") {
    wrapper.querySelector('[data-meta="record"]').textContent = `W ${wins} / L ${losses}`;
    wrapper.querySelector('[data-meta="rounds"]').textContent = `Rounds ${rounds}`;
    wrapper.querySelector(".rps-result").textContent = message;
    wrapper.querySelector(".rps-result").classList.toggle("reveal", revealActive);
    wrapper.querySelector('[data-side="player"]').innerHTML = `
      <span class="rps-throw-icon ${revealActive && lastPlayerMove ? "rps-icon-pop" : ""}">${lastPlayerMove ? icons[lastPlayerMove] : selectedMove ? icons[selectedMove] : "?"}</span>
      <span class="rps-throw-label">You: ${lastPlayerMove ? labels[lastPlayerMove] : selectedMove ? labels[selectedMove] : "Waiting"}</span>
    `;
    wrapper.querySelector('[data-side="cpu"]').innerHTML = `
      <span class="rps-throw-icon ${revealActive && lastCpuMove ? "rps-icon-pop" : ""}">${lastCpuMove ? icons[lastCpuMove] : revealActive ? "?" : "?"}</span>
      <span class="rps-throw-label">CPU: ${lastCpuMove ? labels[lastCpuMove] : revealActive ? "Thinking" : "Waiting"}</span>
    `;
    wrapper.querySelectorAll("[data-move]").forEach((button) => {
      button.classList.toggle("selected", button.dataset.move === selectedMove);
    });
    const lockButton = wrapper.querySelector('[data-action="lock"]');
    if (lockButton) {
      lockButton.disabled = !selectedMove || revealActive;
    }
    refreshLevel();
  }

  function chooseMove(move) {
    if (revealActive) return;
    selectedMove = move;
    lastPlayerMove = null;
    lastCpuMove = null;
    renderBoard(`Selected ${labels[move]}. Lock it in when ready.`);
    setStatus("Choice ready");
  }

  function playLockedMove() {
    if (!selectedMove || revealActive) return;
    const move = selectedMove;
    const cpu = chooseCpuMove(move);
    const outcome = resultFor(move, cpu);
    revealActive = true;
    lastPlayerMove = move;
    lastCpuMove = cpu;
    rounds += 1;

    if (outcome === "win") {
      wins += 1;
      streak += 1;
      setScore(appState.score + 10 + streak * 2);
      setStatus("You win");
    } else if (outcome === "loss") {
      losses += 1;
      streak = 0;
      setStatus("You lose");
    } else {
      setScore(appState.score + 3);
      setStatus("Draw");
    }

    renderBoard(`You chose ${labels[move]}, CPU chose ${labels[cpu]}.`);
    if (revealTimer) clearTimeout(revealTimer);
    revealTimer = window.setTimeout(() => {
      revealActive = false;
      selectedMove = null;
      renderBoard("Pick a move to start.");
      revealTimer = null;
    }, 900);
  }

  function resetState() {
    rounds = 0;
    wins = 0;
    losses = 0;
    streak = 0;
    lastPlayerMove = null;
    lastCpuMove = null;
    selectedMove = null;
    revealActive = false;
    if (revealTimer) clearTimeout(revealTimer);
    revealTimer = null;
    setScore(0);
    renderBoard();
    setStatus("Choose rock, paper, or scissors");
  }

  return {
    id: "rps",
    levelStep: 30,
    title: "RPS Rush",
    tagline: "Solo rock paper scissors",
    subtitle: "Throw signs against the CPU and build a win streak.",
    description:
      "A simple single-player rock paper scissors game with score and streak bonuses for repeated wins.",
    controls: "Click Rock, Paper, or Scissors.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="record">W 0 / L 0</span>
              <span class="info-chip" data-meta="rounds">Rounds 0</span>
            </div>
          </div>
          <div class="rps-showdown">
            <div class="rps-throw-card" data-side="player"></div>
            <div class="rps-versus">VS</div>
            <div class="rps-throw-card" data-side="cpu"></div>
          </div>
          <div class="rps-grid">
            <button class="rps-button" data-move="rock">Rock</button>
            <button class="rps-button" data-move="paper">Paper</button>
            <button class="rps-button" data-move="scissors">Scissors</button>
          </div>
          <button class="primary-button" data-action="lock">Lock It In</button>
          <div class="rps-result"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelectorAll("[data-move]").forEach((button) => {
        button.addEventListener("click", () => chooseMove(button.dataset.move));
      });
      wrapper.querySelector('[data-action="lock"]').addEventListener("click", playLockedMove);
      resetState();
    },
    start() {
      setStatus("Choose rock, paper, or scissors");
    },
    reset() {
      resetState();
    },
    destroy() {
      if (revealTimer) clearTimeout(revealTimer);
      revealTimer = null;
    },
  };
}

function createSnoutScoutGame() {
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let pig;
  let enemies = [];
  let projectiles = [];
  let actionSide = "";
  let actionType = "";
  let actionFrames = 0;
  let blockFrames = 0;
  let jumpFrames = 0;
  let spawnTimer = 0;
  let lives = 3;
  let defeated = 0;

  function getConfig() {
    if (appState.difficulty === "chill") {
      return { lives: 5, spawnRate: 84, minSpawnRate: 42, enemySpeed: 2.2, projectileSpeed: 4.3 };
    }
    if (appState.difficulty === "easy") {
      return { lives: 4, spawnRate: 74, minSpawnRate: 36, enemySpeed: 2.45, projectileSpeed: 4.8 };
    }
    if (appState.difficulty === "hard") {
      return { lives: 2, spawnRate: 50, minSpawnRate: 21, enemySpeed: 3.45, projectileSpeed: 6.1 };
    }
    if (appState.difficulty === "chaos") {
      return { lives: 2, spawnRate: 44, minSpawnRate: 18, enemySpeed: 3.9, projectileSpeed: 6.8 };
    }
    return { lives: 3, spawnRate: 61, minSpawnRate: 26, enemySpeed: 3.0, projectileSpeed: 5.4 };
  }

  function getActionLabel() {
    if (blockFrames > 0) return "Guard up";
    if (jumpFrames > 0 && actionType === "jumpkick" && actionSide) {
      return `${actionSide === "left" ? "Left" : "Right"} jump kick`;
    }
    if (!actionType || !actionSide) return "Ready";
    return `${actionSide === "left" ? "Left" : "Right"} ${actionType}`;
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.foes.textContent = `Defeated ${defeated}`;
    shell.hud.move.textContent = getActionLabel();
    refreshLevel();
  }

  function getEnemyStats(type, side, level) {
    const baseSpeed = getConfig().enemySpeed + level * 0.1;
    if (type === "runner") {
      return {
        type,
        side,
        x: side === "left" ? -30 : 790,
        y: 294 + (Math.random() * 18 - 9),
        vx: (side === "left" ? 1 : -1) * (baseSpeed + 1.35 + Math.random() * 0.45),
        width: 22,
        height: 22,
        hp: 1,
        reward: 14,
        color: "#46b1ff",
      };
    }
    if (type === "brute") {
      return {
        type,
        side,
        x: side === "left" ? -34 : 794,
        y: 300,
        vx: (side === "left" ? 1 : -1) * (baseSpeed - 0.45 + Math.random() * 0.2),
        width: 38,
        height: 38,
        hp: 2,
        reward: 20,
        color: "#8f66ff",
      };
    }
    if (type === "shield") {
      return {
        type,
        side,
        x: side === "left" ? -34 : 794,
        y: 298,
        vx: (side === "left" ? 1 : -1) * (baseSpeed + 0.12 + Math.random() * 0.2),
        width: 32,
        height: 32,
        hp: 1,
        reward: 18,
        color: "#12b981",
      };
    }
    if (type === "crawler") {
      return {
        type,
        side,
        x: side === "left" ? -34 : 794,
        y: 330,
        vx: (side === "left" ? 1 : -1) * (baseSpeed + 0.5 + Math.random() * 0.3),
        width: 34,
        height: 18,
        hp: 1,
        reward: 16,
        color: "#ffd166",
      };
    }
    if (type === "charger") {
      return {
        type,
        side,
        x: side === "left" ? -34 : 794,
        y: 296,
        vx: (side === "left" ? 1 : -1) * (baseSpeed + 0.85 + Math.random() * 0.35),
        width: 34,
        height: 34,
        hp: 1,
        reward: 22,
        color: "#ef4444",
      };
    }
    if (type === "jumper") {
      return {
        type,
        side,
        x: side === "left" ? -36 : 796,
        y: 300,
        baseY: 300,
        jumpPhase: Math.random() * Math.PI * 2,
        jumpSpeed: 0.18 + Math.random() * 0.05,
        jumpHeight: 72 + Math.random() * 10,
        vx: (side === "left" ? 1 : -1) * (baseSpeed + 0.55 + Math.random() * 0.25),
        width: 28,
        height: 28,
        hp: 1,
        reward: 19,
        color: "#f472b6",
      };
    }
    if (type === "thrower") {
      return {
        type,
        side,
        x: side === "left" ? -36 : 796,
        y: 296,
        holdX: side === "left" ? pig.x - 176 : pig.x + 176,
        throwCooldown: 82 - Math.min(34, level * 3),
        width: 30,
        height: 30,
        vx: (side === "left" ? 1 : -1) * (baseSpeed - 0.18 + Math.random() * 0.18),
        hp: 1,
        reward: 21,
        color: "#fb923c",
      };
    }
    if (type === "flyer") {
      return {
        type,
        side,
        x: side === "left" ? -40 : 800,
        y: 224,
        baseY: 224 + (Math.random() * 16 - 8),
        floatPhase: Math.random() * Math.PI * 2,
        vx: (side === "left" ? 1 : -1) * (baseSpeed + 0.8 + Math.random() * 0.35),
        width: 32,
        height: 22,
        hp: 1,
        reward: 24,
        color: "#38bdf8",
      };
    }
    return {
      type: "grunt",
      side,
      x: side === "left" ? -30 : 790,
      y: 300,
      vx: (side === "left" ? 1 : -1) * (baseSpeed + Math.random() * 0.25),
      width: 28,
      height: 28,
      hp: 1,
      reward: 12,
      color: side === "left" ? "#ff8a3d" : "#46b1ff",
    };
  }

  function resetState() {
    const config = getConfig();
    pig = { x: 380, y: 300 };
    enemies = [];
    projectiles = [];
    actionSide = "";
    actionType = "";
    actionFrames = 0;
    blockFrames = 0;
    jumpFrames = 0;
    spawnTimer = 0;
    lives = config.lives;
    defeated = 0;
    running = false;
    setScore(0);
    updateHud();
    draw();
  }

  function spawnEnemy() {
    const side = Math.random() < 0.5 ? "left" : "right";
    const level = 1 + Math.floor(appState.score / 60);
    const roll = Math.random();
    let type = "grunt";
    if (level >= 2 && roll > 0.84) type = "runner";
    else if (level >= 3 && roll > 0.72) type = "brute";
    else if (level >= 4 && roll > 0.61) type = "crawler";
    else if (level >= 5 && roll > 0.5) type = "shield";
    else if (level >= 6 && roll > 0.39) type = "charger";
    else if (level >= 7 && roll > 0.29) type = "jumper";
    else if (level >= 8 && roll > 0.19) type = "thrower";
    else if (level >= 9 && roll > 0.09) type = "flyer";
    enemies.push(getEnemyStats(type, side, level));
  }

  function canHitEnemy(enemy, moveType) {
    if (enemy.type === "crawler") return moveType === "kick" || moveType === "jumpkick";
    if (enemy.type === "shield") return moveType === "kick";
    if (enemy.type === "jumper") return moveType === "jumpkick";
    if (enemy.type === "flyer") return moveType === "jumpkick";
    return true;
  }

  function applyHit(enemy, moveType) {
    if (!canHitEnemy(enemy, moveType)) return { enemy, defeatedNow: false, status: "Wrong move" };
    if (enemy.type === "brute" && moveType === "punch" && enemy.hp > 1) {
      return {
        enemy: { ...enemy, hp: enemy.hp - 1 },
        defeatedNow: false,
        status: "Brute staggered",
      };
    }
    defeated += 1;
    setScore(appState.score + enemy.reward + (moveType === "kick" ? 3 : 0));
    return {
      enemy: null,
      defeatedNow: true,
      status:
        enemy.type === "flyer"
          ? "Flyer swatted"
          : enemy.type === "thrower"
            ? "Thrower stuffed"
            : enemy.type === "jumper"
              ? "Jumper clipped"
              : enemy.type === "charger"
          ? "Charger dropped"
          : enemy.type === "shield"
            ? "Shield cracked"
            : enemy.type === "crawler"
              ? "Low sweep landed"
              : moveType === "kick"
                ? "Kick landed"
                : "Punch landed",
    };
  }

  function attack(side, moveType) {
    if (!running) return;
    actionSide = side;
    actionType = moveType;
    actionFrames = moveType === "jumpkick" ? 16 : moveType === "kick" ? 14 : 10;
    blockFrames = 0;
    jumpFrames = moveType === "jumpkick" ? 16 : 0;
    const reachDistance = moveType === "jumpkick" ? 164 : moveType === "kick" ? 148 : 118;
    const reachMin = side === "left" ? pig.x - reachDistance : pig.x + 24;
    const reachMax = side === "left" ? pig.x - 22 : pig.x + reachDistance;
    const survivors = [];
    let resultStatus = "Swing and miss";
    enemies.forEach((enemy) => {
      const sameSide = enemy.side === side;
      const inReach = enemy.x >= reachMin && enemy.x <= reachMax;
      const airborneTarget = enemy.y < pig.y - 26;
      const heightMatch = moveType === "jumpkick" ? enemy.y <= pig.y + 8 : !airborneTarget;
      if (!sameSide || !inReach) {
        survivors.push(enemy);
        return;
      }
      if (!heightMatch) {
        survivors.push(enemy);
        return;
      }
      const result = applyHit(enemy, moveType);
      if (result.enemy) survivors.push(result.enemy);
      resultStatus = result.status;
    });
    enemies = survivors;
    setStatus(resultStatus);
    updateHud();
  }

  function guard() {
    if (!running) return;
    actionSide = "";
    actionType = "guard";
    actionFrames = 0;
    jumpFrames = 0;
    blockFrames = 14;
    setStatus("Guard up");
    updateHud();
  }

  function launchProjectile(enemy) {
    const config = getConfig();
    projectiles.push({
      x: enemy.x,
      y: enemy.y - 6,
      vx: (enemy.side === "left" ? 1 : -1) * (config.projectileSpeed + Math.random() * 0.8),
      radius: 6,
      color: "#f59e0b",
    });
  }

  function update() {
    const config = getConfig();
    const level = 1 + Math.floor(appState.score / 60);
    spawnTimer += 1;
    const dynamicSpawnRate = Math.max(config.minSpawnRate, config.spawnRate - level * 2);
    if (spawnTimer >= dynamicSpawnRate) {
      spawnTimer = 0;
      spawnEnemy();
    }

    enemies.forEach((enemy) => {
      if (enemy.type === "charger" && Math.abs(enemy.x - pig.x) < 180) {
        enemy.x += enemy.vx * 0.58;
      }
      if (enemy.type === "jumper") {
        enemy.jumpPhase += enemy.jumpSpeed;
        enemy.y = enemy.baseY - Math.abs(Math.sin(enemy.jumpPhase)) * enemy.jumpHeight;
        enemy.x += enemy.vx * (enemy.y < enemy.baseY - 20 ? 1.08 : 0.95);
        return;
      }
      if (enemy.type === "thrower") {
        const closeEnough =
          enemy.side === "left" ? enemy.x >= enemy.holdX : enemy.x <= enemy.holdX;
        if (!closeEnough) {
          enemy.x += enemy.vx;
        } else {
          enemy.throwCooldown -= 1;
          if (enemy.throwCooldown <= 0) {
            launchProjectile(enemy);
            enemy.throwCooldown = Math.max(34, 86 - level * 4);
          }
        }
        return;
      }
      if (enemy.type === "flyer") {
        enemy.floatPhase += 0.15;
        enemy.y = enemy.baseY + Math.sin(enemy.floatPhase) * 18;
        enemy.x += enemy.vx;
        return;
      }
      enemy.x += enemy.vx;
    });

    projectiles = projectiles.filter((projectile) => {
      projectile.x += projectile.vx;
      if (projectile.x < -40 || projectile.x > 800) return false;
      const hitPig =
        Math.abs(projectile.x - pig.x) < 20 &&
        Math.abs(projectile.y - (pig.y - (jumpFrames > 0 ? 32 : 0))) < 36;
      if (!hitPig) return true;
      if (blockFrames > 0) {
        defeated += 1;
        setScore(appState.score + 6);
        setStatus("Blocked shot");
        return false;
      }
      if (jumpFrames > 0) {
        return true;
      }
      lives -= 1;
      updateHud();
      if (lives <= 0) {
        running = false;
        setStatus(`Snout splat - ${defeated} defeated`);
        scheduleAutoReset();
      } else {
        setStatus("Bonked by a throw");
      }
      return false;
    });

    if (actionFrames > 0) {
      actionFrames -= 1;
      if (actionFrames === 0 && blockFrames <= 0) {
        actionSide = "";
        actionType = "";
      }
    }

    if (jumpFrames > 0) {
      jumpFrames -= 1;
    }

    if (blockFrames > 0) {
      blockFrames -= 1;
      if (blockFrames === 0 && actionFrames <= 0) {
        actionSide = "";
        actionType = "";
      }
    }

    const survivors = [];
    let tookHit = false;
    enemies.forEach((enemy) => {
      const pigY = pig.y - (jumpFrames > 0 ? 32 : 0);
      const hitPig = Math.abs(enemy.x - pig.x) < 24 && Math.abs(enemy.y - pigY) < 46;
      if (hitPig) {
        if (blockFrames > 0) {
          defeated += 1;
          setScore(appState.score + enemy.reward + 4);
          setStatus(enemy.type === "charger" ? "Perfect block" : "Blocked");
          return;
        }
        tookHit = true;
        return;
      }
      if (enemy.x > -80 && enemy.x < 840) {
        survivors.push(enemy);
      }
    });
    enemies = survivors;

    if (tookHit) {
      lives -= 1;
      updateHud();
      if (lives <= 0) {
        running = false;
        setStatus(`Snout splat - ${defeated} defeated`);
        scheduleAutoReset();
      } else {
        setStatus("Ouch");
      }
    }
  }

  function drawPig() {
    const pigY = pig.y - (jumpFrames > 0 ? 32 : 0);
    ctx.fillStyle = "#ffb4c8";
    ctx.beginPath();
    ctx.arc(pig.x, pigY, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff8ea8";
    ctx.beginPath();
    ctx.ellipse(pig.x, pigY + 10, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.beginPath();
    ctx.arc(pig.x - 10, pigY - 8, 4, 0, Math.PI * 2);
    ctx.arc(pig.x + 10, pigY - 8, 4, 0, Math.PI * 2);
    ctx.fill();
    if (actionType === "guard" || blockFrames > 0) {
      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(pig.x, pigY, 48, Math.PI * 0.25, Math.PI * 0.75);
      ctx.stroke();
    }
    if (actionSide && actionType === "punch") {
      ctx.strokeStyle = "#ffd166";
      ctx.lineWidth = 8;
      ctx.beginPath();
      if (actionSide === "left") {
        ctx.moveTo(pig.x - 18, pigY + 4);
        ctx.lineTo(pig.x - 86, pigY - 12);
      } else {
        ctx.moveTo(pig.x + 18, pigY + 4);
        ctx.lineTo(pig.x + 86, pigY - 12);
      }
      ctx.stroke();
    }
    if (actionSide && actionType === "kick") {
      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 9;
      ctx.beginPath();
      if (actionSide === "left") {
        ctx.moveTo(pig.x - 8, pigY + 24);
        ctx.lineTo(pig.x - 116, pigY + 18);
      } else {
        ctx.moveTo(pig.x + 8, pigY + 24);
        ctx.lineTo(pig.x + 116, pigY + 18);
      }
      ctx.stroke();
    }
    if (actionSide && actionType === "jumpkick") {
      ctx.strokeStyle = "#f9a8d4";
      ctx.lineWidth = 10;
      ctx.beginPath();
      if (actionSide === "left") {
        ctx.moveTo(pig.x - 4, pigY + 14);
        ctx.lineTo(pig.x - 132, pigY - 28);
      } else {
        ctx.moveTo(pig.x + 4, pigY + 14);
        ctx.lineTo(pig.x + 132, pigY - 28);
      }
      ctx.stroke();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    const bg = ctx.createLinearGradient(0, 0, 0, 440);
    bg.addColorStop(0, "#1a2238");
    bg.addColorStop(1, "#111827");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 760, 440);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, 340, 760, 100);

    enemies.forEach((enemy) => {
      ctx.fillStyle = enemy.color;
      if (enemy.type === "crawler") {
        ctx.fillRect(enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, enemy.width, enemy.height);
      } else if (enemy.type === "runner") {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 12, 0, Math.PI * 2);
        ctx.fill();
      } else if (enemy.type === "flyer") {
        ctx.beginPath();
        ctx.ellipse(enemy.x, enemy.y, 18, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(enemy.x - 12, enemy.y);
        ctx.lineTo(enemy.x - 22, enemy.y - 12);
        ctx.moveTo(enemy.x + 12, enemy.y);
        ctx.lineTo(enemy.x + 22, enemy.y - 12);
        ctx.stroke();
      } else {
        ctx.fillRect(enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, enemy.width, enemy.height);
      }
      if (enemy.type === "shield") {
        ctx.strokeStyle = "#bbf7d0";
        ctx.lineWidth = 5;
        ctx.beginPath();
        if (enemy.side === "left") {
          ctx.arc(enemy.x - 9, enemy.y, 11, Math.PI * 0.4, Math.PI * 1.6);
        } else {
          ctx.arc(enemy.x + 9, enemy.y, 11, Math.PI * 1.4, Math.PI * 0.6, true);
        }
        ctx.stroke();
      }
      if (enemy.type === "charger") {
        ctx.strokeStyle = "#fecaca";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(enemy.x - 8, enemy.y - 14);
        ctx.lineTo(enemy.x - 2, enemy.y - 24);
        ctx.lineTo(enemy.x + 2, enemy.y - 14);
        ctx.moveTo(enemy.x + 8, enemy.y - 14);
        ctx.lineTo(enemy.x + 2, enemy.y - 24);
        ctx.lineTo(enemy.x - 2, enemy.y - 14);
        ctx.stroke();
      }
      if (enemy.type === "brute") {
        ctx.fillStyle = "#f5d0fe";
        ctx.fillRect(enemy.x - 8, enemy.y + 10, 16, 6);
      }
      if (enemy.type === "thrower") {
        ctx.fillStyle = "#fde68a";
        ctx.beginPath();
        ctx.arc(enemy.x + (enemy.side === "left" ? 10 : -10), enemy.y - 10, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#101826";
      ctx.fillRect(enemy.x - 6, enemy.y - 4, 4, 4);
      ctx.fillRect(enemy.x + 2, enemy.y - 4, 4, 4);
    });

    projectiles.forEach((projectile) => {
      ctx.fillStyle = projectile.color;
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    drawPig();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Snout Scout", 380, 206);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Punch A/D, kick Q/E, jump kick Z/C, block S", 380, 246);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "snout",
    levelStep: 60,
    title: "Snout Scout",
    tagline: "Very cheap pig brawler",
    subtitle: "A worse, jankier pig slap-fighter inspired by Iron Snout-style chaos.",
    description:
      "A deliberately lightweight pig brawler with extra chaos. Punch, kick, jump kick, and block while runners, brutes, crawlers, shield foes, chargers, jumpers, throwers, and flyers rush in from both sides.",
    controls: "A and D punch. Q and E kick. Z and C jump kick. S blocks. Arrow left and right also punch.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "foes", label: "Defeated 0" },
          { id: "move", label: "Ready" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 760;
      shell.canvas.height = 440;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      running = true;
      setStatus("Brawling");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) attack("left", "punch");
      if (["ArrowRight", "d", "D"].includes(event.key)) attack("right", "punch");
      if (["q", "Q"].includes(event.key)) attack("left", "kick");
      if (["e", "E"].includes(event.key)) attack("right", "kick");
      if (["z", "Z"].includes(event.key)) attack("left", "jumpkick");
      if (["c", "C"].includes(event.key)) attack("right", "jumpkick");
      if (["s", "S", "ArrowDown"].includes(event.key)) guard();
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
  };
}

function createMazeEscapeGame() {
  let wrapper;
  let layout = [];
  let player = { row: 1, col: 1 };
  let playerStart = { row: 1, col: 1 };
  let ghostStarts = [];
  let ghosts = [];
  let pellets = new Set();
  let powerPellets = new Set();
  let cageCells = new Set();
  let doorCells = new Set();
  let totalPellets = 0;
  let collectedPellets = 0;
  let lives = 3;
  let stageLevel = 1;
  let complete = false;
  let running = false;
  let ghostTimer = null;
  let nextStageTimeout = null;
  let powerModeUntil = 0;
  const layouts = {
    easy: [
      [
        "#########",
        "#S......#",
        "#.###.#.#",
        "#...D...#",
        "#.#HHH#.#",
        "#...H...#",
        "#.#.###.#",
        "#.......#",
        "#########",
      ],
      [
        "#########",
        "#S..#...#",
        "#.#.#.#.#",
        "#...D...#",
        "#.#HHH#.#",
        "#...H...#",
        "#.#.#.#.#",
        "#.......#",
        "#########",
      ],
      [
        "#########",
        "#S......#",
        "###.#.#.#",
        "#...D...#",
        "#.#HHH#.#",
        "#...H...#",
        "#.#.#.###",
        "#.......#",
        "#########",
      ],
    ],
    normal: [
      [
        "###########",
        "#S....#...#",
        "#.###.#.#.#",
        "#...#...#.#",
        "#.#.D.#.#.#",
        "#..HHH....#",
        "#.#.H.#.#.#",
        "#.#...#.#.#",
        "#.###.#.#.#",
        "#.........#",
        "###########",
      ],
      [
        "###########",
        "#S..#.....#",
        "#.#.#.###.#",
        "#...#...#.#",
        "###.D.###.#",
        "#..HHH....#",
        "#.#.H.#.#.#",
        "#.#...#...#",
        "#.###.#.#.#",
        "#.........#",
        "###########",
      ],
      [
        "###########",
        "#S........#",
        "#.###.###.#",
        "#...#.#...#",
        "#.#.D.#.#.#",
        "#..HHH....#",
        "#.#.H.###.#",
        "#...#.....#",
        "#.###.#.#.#",
        "#.....#...#",
        "###########",
      ],
    ],
    hard: [
      [
        "#############",
        "#S....#.....#",
        "#.###.#.###.#",
        "#...#...#...#",
        "#.#.###.#.#.#",
        "#...#.D.#...#",
        "#.#.#HHH#.#.#",
        "#...#.H.#...#",
        "#.###...###.#",
        "#...#.#.#...#",
        "#.#.#.#.#.#.#",
        "#...........#",
        "#############",
      ],
      [
        "#############",
        "#S..#...#...#",
        "#.#.#.#.#.#.#",
        "#...#.#...#.#",
        "###.#.###.#.#",
        "#...#.D.#...#",
        "#.#.#HHH#.#.#",
        "#...#.H.#...#",
        "#.###...###.#",
        "#...#.#.....#",
        "#.#.#.#.###.#",
        "#...........#",
        "#############",
      ],
      [
        "#############",
        "#S..........#",
        "#.###.#####.#",
        "#...#...#...#",
        "#.#.###.#.#.#",
        "#...#.D.#...#",
        "#.#.#HHH#.#.#",
        "#...#.H.#...#",
        "#.###...#.###",
        "#.....#.#...#",
        "#.###.#.#.#.#",
        "#...........#",
        "#############",
      ],
    ],
  };

  function getKey(row, col) {
    return `${row}:${col}`;
  }

  function getLayoutKey() {
    if (appState.difficulty === "chill" || appState.difficulty === "easy") return "easy";
    if (appState.difficulty === "hard" || appState.difficulty === "chaos") return "hard";
    return "normal";
  }

  function getCurrentMap() {
    const pool = layouts[getLayoutKey()];
    return pool[(stageLevel - 1) % pool.length];
  }

  function resetState() {
    const chosen = getCurrentMap();
    layout = chosen.map((row) => row.split(""));
    pellets = new Set();
    powerPellets = new Set();
    cageCells = new Set();
    doorCells = new Set();
    ghostStarts = [];
    ghosts = [];
    totalPellets = 0;
    collectedPellets = 0;
    complete = false;
    running = false;
    powerModeUntil = 0;

    layout.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === "S") {
          player = { row: rowIndex, col: colIndex };
          playerStart = { row: rowIndex, col: colIndex };
          layout[rowIndex][colIndex] = ".";
        } else if (cell === "H") {
          ghostStarts.push({ row: rowIndex, col: colIndex });
          cageCells.add(getKey(rowIndex, colIndex));
          layout[rowIndex][colIndex] = ".";
        } else if (cell === "D") {
          doorCells.add(getKey(rowIndex, colIndex));
          layout[rowIndex][colIndex] = ".";
        }
      });
    });

    for (let row = 1; row < layout.length - 1; row += 1) {
      for (let col = 1; col < layout[row].length - 1; col += 1) {
        if (layout[row][col] !== ".") continue;
        if (cageCells.has(getKey(row, col)) || doorCells.has(getKey(row, col))) continue;
        pellets.add(getKey(row, col));
        totalPellets += 1;
      }
    }

    seedPowerPellets();
    spawnGhosts();
    clearPellet(player.row, player.col, true);
    renderBoard();
    setStatus("Eat every pellet");
  }

  function updateHud() {
    const powered = powerModeUntil > Date.now();
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="pellets"]').textContent = `Pellets ${collectedPellets}/${totalPellets}`;
    wrapper.querySelector('[data-meta="lives"]').textContent = `Lives ${lives}`;
    wrapper.querySelector('[data-meta="mode"]').textContent = powered ? "Mode Power" : "Mode Chase";
    refreshLevel();
  }

  function seedPowerPellets() {
    const corners = [
      [1, 1],
      [1, layout[0].length - 2],
      [layout.length - 2, 1],
      [layout.length - 2, layout[0].length - 2],
    ];
    corners.forEach(([row, col]) => {
      const key = getKey(row, col);
      if (pellets.has(key)) {
        powerPellets.add(key);
      }
    });
  }

  function findGhostSpawns() {
    const candidates = [];
    for (let row = 1; row < layout.length - 1; row += 1) {
      for (let col = 1; col < layout[row].length - 1; col += 1) {
        if (layout[row][col] !== ".") continue;
        const distance = Math.abs(row - playerStart.row) + Math.abs(col - playerStart.col);
        if (distance >= 6) {
          candidates.push({ row, col });
        }
      }
    }
    candidates.sort((left, right) => {
      const leftDistance = Math.abs(left.row - playerStart.row) + Math.abs(left.col - playerStart.col);
      const rightDistance = Math.abs(right.row - playerStart.row) + Math.abs(right.col - playerStart.col);
      return rightDistance - leftDistance;
    });
    return candidates;
  }

  function spawnGhosts() {
    const available = ghostStarts.length ? [...ghostStarts] : findGhostSpawns();
    const baseDesired =
      appState.difficulty === "chill"
        ? 2
        : appState.difficulty === "easy"
          ? 3
          : appState.difficulty === "hard"
            ? 4
            : appState.difficulty === "chaos"
              ? 4
              : 3;
    const desired = Math.min(available.length, Math.min(4, baseDesired + Math.floor((stageLevel - 1) / 3)));
    ghostStarts = available.slice(0, Math.max(2, desired));
    if (!ghostStarts.length) {
      ghostStarts = [{ row: layout.length - 2, col: layout[0].length - 2 }];
    }
    ghosts = ghostStarts.map((start, index) => ({
      row: start.row,
      col: start.col,
      homeRow: start.row,
      homeCol: start.col,
      icon: ["👻", "👾", "😈", "☠️"][index % 4],
      state: "caged",
      releaseAt: Date.now() + 900 + index * 850,
    }));
  }

  function getGhostStepMs() {
    const base =
      appState.difficulty === "chill"
        ? 520
        : appState.difficulty === "easy"
          ? 470
          : appState.difficulty === "hard"
            ? 310
            : appState.difficulty === "chaos"
              ? 270
              : 380;
    return Math.max(140, base - (stageLevel - 1) * 18);
  }

  function renderBoard() {
    const rows = layout.length;
    const cols = layout[0].length;
    wrapper.querySelector(".maze-grid").style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    wrapper.querySelector(".maze-grid").innerHTML = layout
      .map((row, rowIndex) =>
        row
          .map((cell, colIndex) => {
            const classes = ["maze-cell"];
            let icon = "";
            if (cell === "#") classes.push("maze-wall");
            if (cageCells.has(getKey(rowIndex, colIndex))) {
              classes.push("maze-cage");
            }
            if (doorCells.has(getKey(rowIndex, colIndex))) {
              classes.push("maze-door");
            }
            if (pellets.has(getKey(rowIndex, colIndex))) {
              classes.push("maze-coin");
              icon = powerPellets.has(getKey(rowIndex, colIndex)) ? "◉" : "•";
            }
            const ghost = ghosts.find((entry) => entry.row === rowIndex && entry.col === colIndex);
            if (ghost) {
              classes.push("maze-ghost");
              if (ghost.state === "caged") classes.push("maze-cage-ghost");
              if (powerModeUntil > Date.now() && ghost.state !== "caged") classes.push("maze-frightened");
              icon = powerModeUntil > Date.now() && ghost.state !== "caged" ? "🫥" : ghost.icon;
            }
            if (rowIndex === player.row && colIndex === player.col) {
              classes.push("maze-player");
              icon = "🟡";
            }
            return `<div class="${classes.join(" ")}">${icon}</div>`;
          })
          .join(""),
      )
      .join("");
    updateHud();
  }

  function clearGhostLoop() {
    if (ghostTimer) {
      clearInterval(ghostTimer);
      ghostTimer = null;
    }
  }

  function startGhostLoop() {
    clearGhostLoop();
    if (!running || complete) return;
    ghostTimer = window.setInterval(() => {
      moveGhosts();
    }, getGhostStepMs());
  }

  function isGhostCellOpen(row, col) {
    return Boolean(layout[row]) && layout[row][col] !== "#";
  }

  function canPlayerEnter(row, col) {
    return (
      Boolean(layout[row]) &&
      layout[row][col] !== "#" &&
      !cageCells.has(getKey(row, col)) &&
      !doorCells.has(getKey(row, col))
    );
  }

  function resetPositionsAfterHit() {
    player = { ...playerStart };
    ghosts = ghostStarts.map((start, index) => ({
      row: start.row,
      col: start.col,
      homeRow: start.row,
      homeCol: start.col,
      icon: ["👻", "👾", "😈", "☠️"][index % 4],
      state: "caged",
      releaseAt: Date.now() + 1100 + index * 800,
    }));
    powerModeUntil = 0;
  }

  function handleGhostCollision(ghostIndex) {
    if (powerModeUntil > Date.now() && ghosts[ghostIndex].state !== "caged") {
      const ghost = ghosts[ghostIndex];
      ghosts[ghostIndex] = {
        ...ghost,
        row: ghost.homeRow,
        col: ghost.homeCol,
        state: "caged",
        releaseAt: Date.now() + 2400 + ghostIndex * 650,
      };
      setScore(appState.score + 40);
      setStatus("Ghost sent to cage");
      return false;
    }

    lives -= 1;
    if (lives <= 0) {
      complete = true;
      running = false;
      clearGhostLoop();
      setStatus("Game over");
      scheduleAutoReset();
      renderBoard();
      return true;
    }

    resetPositionsAfterHit();
    setStatus("Chomped - keep going");
    renderBoard();
    return true;
  }

  function checkCollisions() {
    const ghostIndex = ghosts.findIndex(
      (ghost) => ghost.state !== "caged" && ghost.row === player.row && ghost.col === player.col,
    );
    if (ghostIndex >= 0) {
      return handleGhostCollision(ghostIndex);
    }
    return false;
  }

  function pickGhostStep(ghost, preferFarther = false) {
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ]
      .map((direction) => ({
        row: ghost.row + direction.row,
        col: ghost.col + direction.col,
      }))
      .filter((position) => isGhostCellOpen(position.row, position.col));

    if (!directions.length) return null;

    directions.sort((left, right) => {
      const leftDistance = Math.abs(left.row - player.row) + Math.abs(left.col - player.col);
      const rightDistance = Math.abs(right.row - player.row) + Math.abs(right.col - player.col);
      return preferFarther ? rightDistance - leftDistance : leftDistance - rightDistance;
    });

    const topChoices = directions.slice(0, Math.min(2, directions.length));
    return topChoices[Math.floor(Math.random() * topChoices.length)];
  }

  function getClosestDoor(ghost) {
    const doors = [...doorCells].map((value) => {
      const [row, col] = value.split(":").map(Number);
      return { row, col };
    });
    if (!doors.length) return null;
    doors.sort((left, right) => {
      const leftDistance = Math.abs(left.row - ghost.row) + Math.abs(left.col - ghost.col);
      const rightDistance = Math.abs(right.row - ghost.row) + Math.abs(right.col - ghost.col);
      return leftDistance - rightDistance;
    });
    return doors[0];
  }

  function moveCagedGhost(ghost) {
    if (Date.now() < ghost.releaseAt) return ghost;
    const door = getClosestDoor(ghost);
    if (!door) {
      return { ...ghost, state: "active" };
    }
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ]
      .map((direction) => ({
        row: ghost.row + direction.row,
        col: ghost.col + direction.col,
      }))
      .filter((position) => isGhostCellOpen(position.row, position.col));
    if (!directions.length) return ghost;
    directions.sort((left, right) => {
      const leftDistance = Math.abs(left.row - door.row) + Math.abs(left.col - door.col);
      const rightDistance = Math.abs(right.row - door.row) + Math.abs(right.col - door.col);
      return leftDistance - rightDistance;
    });
    const next = directions[0];
    const nextKey = getKey(next.row, next.col);
    return {
      ...ghost,
      row: next.row,
      col: next.col,
      state: cageCells.has(nextKey) || doorCells.has(nextKey) ? "caged" : "active",
    };
  }

  function moveGhosts() {
    if (!running || complete) return;
    ghosts = ghosts.map((ghost) => {
      if (ghost.state === "caged") {
        return moveCagedGhost(ghost);
      }
      const pick = pickGhostStep(ghost, powerModeUntil > Date.now());
      if (!pick) return ghost;
      return { ...ghost, row: pick.row, col: pick.col, state: "active" };
    });

    if (!checkCollisions()) {
      renderBoard();
    }
  }

  function clearPellet(row, col, silent = false) {
    const pelletKey = getKey(row, col);
    if (!pellets.has(pelletKey)) return;
    pellets.delete(pelletKey);
    collectedPellets += 1;
    if (powerPellets.has(pelletKey)) {
      powerPellets.delete(pelletKey);
      powerModeUntil = Date.now() + 5500;
      if (!silent) {
        setScore(appState.score + 20);
        setStatus("Power mode");
      }
    } else {
      if (!silent) {
        setScore(appState.score + 6);
      }
    }
  }

  function advanceStage() {
    complete = true;
    running = false;
    clearGhostLoop();
    setScore(appState.score + 120);
    setStatus("Board cleared");
    if (nextStageTimeout) clearTimeout(nextStageTimeout);
    nextStageTimeout = window.setTimeout(() => {
      stageLevel += 1;
      complete = false;
      resetState();
      running = true;
      startGhostLoop();
      nextStageTimeout = null;
    }, 700);
  }

  function move(deltaRow, deltaCol) {
    if (complete || !running) return;
    const nextRow = player.row + deltaRow;
    const nextCol = player.col + deltaCol;
    if (!canPlayerEnter(nextRow, nextCol)) return;
    player = { row: nextRow, col: nextCol };
    if (checkCollisions()) return;
    clearPellet(nextRow, nextCol);
    if (pellets.size === 0) {
      renderBoard();
      advanceStage();
      return;
    }
    setStatus(powerModeUntil > Date.now() ? "Power mode" : "Keep chomping");
    renderBoard();
  }

  return {
    id: "maze",
    getLevelText: () => String(stageLevel),
    title: "Maze Escape",
    tagline: "Arcade maze chomp run",
    subtitle: "Eat every pellet, dodge roaming ghosts, and clear the board like a mini maze arcade.",
    description:
      "A more arcade-style maze game with pellets, power pellets, ghost chasing, lives, and stage clears. It keeps the browser-game feel while leaning closer to Pac-Man energy.",
    controls: "Use arrow keys or WASD to move through the maze and eat every pellet.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="pellets">Pellets 0/0</span>
              <span class="info-chip" data-meta="lives">Lives 3</span>
              <span class="info-chip" data-meta="mode">Mode Chase</span>
            </div>
          </div>
          <div class="maze-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      if (running || complete) return;
      running = true;
      startGhostLoop();
      setStatus("Keep chomping");
    },
    reset() {
      clearGhostLoop();
      if (nextStageTimeout) {
        clearTimeout(nextStageTimeout);
        nextStageTimeout = null;
      }
      lives = 3;
      stageLevel = 1;
      resetState();
    },
    onKeyDown(event) {
      if (["ArrowUp", "w", "W"].includes(event.key)) move(-1, 0);
      if (["ArrowDown", "s", "S"].includes(event.key)) move(1, 0);
      if (["ArrowLeft", "a", "A"].includes(event.key)) move(0, -1);
      if (["ArrowRight", "d", "D"].includes(event.key)) move(0, 1);
    },
    destroy() {
      clearGhostLoop();
      if (nextStageTimeout) {
        clearTimeout(nextStageTimeout);
        nextStageTimeout = null;
      }
    },
  };
}

function createDodgeDriftGame() {
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let leftPressed = false;
  let rightPressed = false;
  let player;
  let hazards = [];
  let lives = 3;
  let spawnTimer = 0;
  let dodged = 0;

  function getConfig() {
    if (appState.difficulty === "chill") {
      return {
        lives: 5,
        moveSpeed: 6.5,
        hazardSpeed: 2.8,
        spawnRate: 62,
        minSpawnRate: 30,
        spawnRamp: 2,
        doubleSpawnChance: 0.1,
      };
    }
    if (appState.difficulty === "easy") {
      return {
        lives: 4,
        moveSpeed: 6.1,
        hazardSpeed: 3.1,
        spawnRate: 54,
        minSpawnRate: 24,
        spawnRamp: 2,
        doubleSpawnChance: 0.16,
      };
    }
    if (appState.difficulty === "hard") {
      return {
        lives: 2,
        moveSpeed: 5.1,
        hazardSpeed: 4.2,
        spawnRate: 36,
        minSpawnRate: 14,
        spawnRamp: 4,
        doubleSpawnChance: 0.38,
      };
    }
    if (appState.difficulty === "chaos") {
      return {
        lives: 2,
        moveSpeed: 4.8,
        hazardSpeed: 4.6,
        spawnRate: 31,
        minSpawnRate: 12,
        spawnRamp: 4,
        doubleSpawnChance: 0.46,
      };
    }
    return {
      lives: 3,
      moveSpeed: 5.6,
      hazardSpeed: 3.6,
      spawnRate: 44,
      minSpawnRate: 18,
      spawnRamp: 3,
      doubleSpawnChance: 0.26,
    };
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.dodged.textContent = `Dodged ${dodged}`;
    refreshLevel();
  }

  function resetState() {
    const config = getConfig();
    player = { x: 380, y: 390, width: 54, height: 22 };
    hazards = [];
    lives = config.lives;
    spawnTimer = 0;
    dodged = 0;
    running = false;
    setScore(0);
    updateHud();
    draw();
  }

  function createHazard(x, level) {
    return {
      x,
      y: -40,
      width: 32 + Math.random() * 38,
      height: 28 + Math.random() * 36,
      vy: getConfig().hazardSpeed + Math.random() * 1.1 + level * 0.22,
    };
  }

  function spawnHazard() {
    const level = 1 + Math.floor(appState.score / 40);
    const config = getConfig();
    const firstX = 58 + Math.random() * 644;
    hazards.push(createHazard(firstX, level));

    const shouldDoubleSpawn =
      level >= 2 && Math.random() < config.doubleSpawnChance + Math.min(0.18, level * 0.02);
    if (!shouldDoubleSpawn) return;

    const gap = 120 + Math.random() * 110;
    const secondX =
      firstX < 380
        ? Math.min(702, firstX + gap)
        : Math.max(58, firstX - gap);
    if (Math.abs(secondX - firstX) >= 110) {
      hazards.push(createHazard(secondX, level));
    }
  }

  function update() {
    const config = getConfig();
    if (leftPressed) player.x -= config.moveSpeed;
    if (rightPressed) player.x += config.moveSpeed;
    player.x = clamp(player.x, 40, 720);

    spawnTimer += 1;
    const level = 1 + Math.floor(appState.score / 40);
    const dynamicSpawnRate = Math.max(
      config.minSpawnRate,
      config.spawnRate - Math.floor(level - 1) * config.spawnRamp,
    );
    if (spawnTimer >= dynamicSpawnRate) {
      spawnTimer = 0;
      spawnHazard();
    }

    const survivors = [];
    let hitThisFrame = false;
    hazards.forEach((hazard) => {
      hazard.y += hazard.vy;
      const hit =
        hazard.y + hazard.height / 2 >= player.y - player.height / 2 &&
        hazard.y - hazard.height / 2 <= player.y + player.height / 2 &&
        hazard.x + hazard.width / 2 >= player.x - player.width / 2 &&
        hazard.x - hazard.width / 2 <= player.x + player.width / 2;

      if (hit) {
        hitThisFrame = true;
        return;
      }

      if (hazard.y - hazard.height / 2 > 470) {
        dodged += 1;
        setScore(appState.score + 8);
        return;
      }

      survivors.push(hazard);
    });
    hazards = survivors;

    if (hitThisFrame) {
      lives -= 1;
      updateHud();
      if (lives <= 0) {
        running = false;
        setStatus(`Drift failed - ${dodged} dodged`);
        scheduleAutoReset();
      } else {
        setStatus("Hit taken");
      }
    } else {
      updateHud();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    const bg = ctx.createLinearGradient(0, 0, 0, 440);
    bg.addColorStop(0, "#0b1629");
    bg.addColorStop(1, "#12273d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 760, 440);

    for (let lane = 0; lane < 6; lane += 1) {
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(100 + lane * 110, 0, 3, 440);
    }

    hazards.forEach((hazard) => {
      ctx.fillStyle = "#ff8a3d";
      ctx.fillRect(
        hazard.x - hazard.width / 2,
        hazard.y - hazard.height / 2,
        hazard.width,
        hazard.height,
      );
    });

    ctx.fillStyle = "#46b1ff";
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - 24);
    ctx.lineTo(player.x - 28, player.y + 18);
    ctx.lineTo(player.x + 28, player.y + 18);
    ctx.closePath();
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Dodge Drift", 380, 210);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Press Start and weave through the hazards", 380, 250);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "dodge",
    levelStep: 40,
    title: "Dodge Drift",
    tagline: "Weave-through survival run",
    subtitle: "Slide across the lane, avoid the falling blocks, and stay alive longer.",
    description:
      "A clean dodge-and-survive arcade game. Move left and right, avoid falling hazards, and build score by staying alive.",
    controls: "Use Left and Right arrows or A and D to move.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "dodged", label: "Dodged 0" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 760;
      shell.canvas.height = 440;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      running = true;
      setStatus("Drifting");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) leftPressed = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) rightPressed = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) leftPressed = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) rightPressed = false;
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      leftPressed = false;
      rightPressed = false;
    },
  };
}

function createBubblePopGame() {
  let wrapper;
  let arena;
  let targets = [];
  let animationId = null;
  let timerId = null;
  let nextStageTimeout = null;
  let running = false;
  let stageLevel = 1;
  let popped = 0;
  let goal = 0;
  let timeLeft = 0;

  function getStageConfig(level) {
    const mode = appState.difficulty;
    const baseGoal = mode === "chill" ? 5 : mode === "easy" ? 6 : mode === "hard" ? 8 : mode === "chaos" ? 9 : 7;
    const baseTime = mode === "chill" ? 20 : mode === "easy" ? 18 : mode === "hard" ? 14 : mode === "chaos" ? 12 : 16;
    const baseSpeed = mode === "chill" ? 1.05 : mode === "easy" ? 1.25 : mode === "hard" ? 2.1 : mode === "chaos" ? 2.45 : 1.6;
    return {
      goal: baseGoal + Math.floor((level - 1) * 1.5),
      time: Math.max(8, baseTime - Math.floor((level - 1) / 3)),
      speed: baseSpeed + (level - 1) * 0.12,
      count: Math.min(12, 8 + Math.floor((level - 1) / 2)),
      size: Math.max(38, 62 - Math.floor((level - 1) / 2) * 2),
    };
  }

  function clearTimers() {
    if (animationId) cancelAnimationFrame(animationId);
    if (timerId) clearInterval(timerId);
    if (nextStageTimeout) clearTimeout(nextStageTimeout);
    animationId = null;
    timerId = null;
    nextStageTimeout = null;
  }

  function removeTargets() {
    targets.forEach((target) => target.el.remove());
    targets = [];
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="goal"]').textContent = `Popped ${popped}/${goal}`;
    wrapper.querySelector('[data-meta="time"]').textContent = `Time ${timeLeft}s`;
    refreshLevel();
  }

  function createTarget(index) {
    const config = getStageConfig(stageLevel);
    const size = config.size + Math.random() * 10;
    const width = Math.max(160, (arena?.clientWidth || 720) - size - 16);
    const height = Math.max(120, (arena?.clientHeight || 420) - size - 16);
    const el = document.createElement("button");
    el.className = "bubble-target";
    el.type = "button";
    el.textContent = ["1", "2", "3", "4", "5"][index % 5];
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.background = ["#46b1ff", "#8f66ff", "#ff8a3d", "#1eb980", "#ffd166"][index % 5];
    const target = {
      x: 8 + Math.random() * width,
      y: 8 + Math.random() * height,
      vx: (Math.random() < 0.5 ? -1 : 1) * (config.speed + Math.random() * 0.4),
      vy: (Math.random() < 0.5 ? -1 : 1) * (config.speed + Math.random() * 0.4),
      size,
      el,
    };
    el.addEventListener("click", () => popTarget(target));
    arena.appendChild(el);
    targets.push(target);
  }

  function renderTargets() {
    targets.forEach((target) => {
      target.el.style.transform = `translate(${target.x}px, ${target.y}px)`;
    });
  }

  function popTarget(target) {
    if (!running) return;
    const index = targets.indexOf(target);
    if (index < 0) return;
    targets.splice(index, 1);
    target.el.remove();
    popped += 1;
    setScore(appState.score + 8 + stageLevel * 2);
    updateHud();
    if (popped >= goal) {
      running = false;
      clearTimers();
      setScore(appState.score + timeLeft * 6);
      setStatus(`Stage ${stageLevel} cleared`);
      nextStageTimeout = window.setTimeout(() => {
        stageLevel += 1;
        buildStage(true);
        startRound();
      }, 700);
    }
  }

  function tick() {
    if (!running) return;
    const width = arena.clientWidth || 720;
    const height = arena.clientHeight || 420;
    targets.forEach((target) => {
      target.x += target.vx;
      target.y += target.vy;
      if (target.x <= 0 || target.x + target.size >= width) target.vx *= -1;
      if (target.y <= 0 || target.y + target.size >= height) target.vy *= -1;
      target.x = clamp(target.x, 0, width - target.size);
      target.y = clamp(target.y, 0, height - target.size);
    });
    renderTargets();
    animationId = requestAnimationFrame(tick);
  }

  function startRound() {
    if (running) return;
    clearAutoReset();
    running = true;
    setStatus("Pop every bubble");
    timerId = window.setInterval(() => {
      timeLeft -= 1;
      updateHud();
      if (timeLeft <= 0) {
        running = false;
        clearTimers();
        setStatus(`Time up at stage ${stageLevel}`);
        scheduleAutoReset();
      }
    }, 1000);
    tick();
  }

  function buildStage(keepScore = false) {
    clearTimers();
    removeTargets();
    const config = getStageConfig(stageLevel);
    goal = config.goal;
    timeLeft = config.time;
    popped = 0;
    if (!keepScore) {
      setScore(0);
    } else {
      refreshLevel();
    }
    for (let index = 0; index < config.count; index += 1) {
      createTarget(index);
    }
    renderTargets();
    updateHud();
  }

  function resetState() {
    running = false;
    clearAutoReset();
    stageLevel = 1;
    buildStage();
    setStatus("Ready");
  }

  return {
    id: "bubble",
    getLevelText: () => String(stageLevel),
    title: "Bubble Pop",
    tagline: "Bounce-and-click target rush",
    subtitle: "Pop moving targets before the timer runs out and keep climbing stages.",
    description:
      "A fast arcade clicker where colorful targets bounce around the arena and every cleared stage speeds things up.",
    controls: "Click the moving bubbles before time runs out.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="goal">Popped 0/0</span>
              <span class="info-chip" data-meta="time">Time 0s</span>
            </div>
          </div>
          <div class="bubble-arena"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      arena = wrapper.querySelector(".bubble-arena");
      resetState();
    },
    start() {
      startRound();
    },
    reset() {
      resetState();
    },
    destroy() {
      running = false;
      clearTimers();
      removeTargets();
    },
  };
}

function createWordScrambleGame() {
  let wrapper;
  let stageLevel = 1;
  let triesLeft = 0;
  let answer = "";
  let hint = "";
  let scrambled = "";
  const wordBank = {
    easy: [
      { word: "score", hint: "What every arcade game tracks." },
      { word: "coins", hint: "Collect these in runners." },
      { word: "snake", hint: "Classic grid crawler." },
      { word: "paddle", hint: "Used in Pong and Breakout." },
      { word: "ghost", hint: "Pac style maze enemy." },
      { word: "timer", hint: "Counts down in challenge modes." },
    ],
    normal: [
      { word: "arcade", hint: "A whole portal of mini games." },
      { word: "meteor", hint: "Space Blaster falling hazard." },
      { word: "shield", hint: "Space Blaster defense stat." },
      { word: "runner", hint: "Subway style endless lane game." },
      { word: "bubble", hint: "Something you pop in the new game." },
      { word: "streak", hint: "What you build by winning in RPS Rush." },
    ],
    hard: [
      { word: "stabilizer", hint: "One of the Space Blaster upgrades." },
      { word: "difficulty", hint: "Chill through Chaos setting." },
      { word: "powerpellet", hint: "Maze Escape boosted pickup." },
      { word: "controller", hint: "What smooth games always need." },
      { word: "scoreboard", hint: "Where best runs get remembered." },
      { word: "animations", hint: "They make UI feel alive." },
    ],
  };

  function getPool() {
    return wordBank[getDifficultyPreset().typingPool] || wordBank.normal;
  }

  function scrambleWord(word) {
    let next = word;
    while (next === word) {
      next = word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    }
    return next.toUpperCase();
  }

  function getTriesBase() {
    const mode = appState.difficulty;
    if (mode === "chill") return 7;
    if (mode === "easy") return 6;
    if (mode === "hard") return 4;
    if (mode === "chaos") return 3;
    return 5;
  }

  function getStagePool() {
    if (stageLevel <= 3) return wordBank.easy;
    if (stageLevel <= 7) return wordBank.normal;
    return wordBank.hard;
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="stage"]').textContent = `Stage ${stageLevel}`;
    wrapper.querySelector('[data-meta="tries"]').textContent = `Tries ${triesLeft}`;
    refreshLevel();
  }

  function renderRound(feedback = "Unscramble the word.") {
    wrapper.querySelector(".scramble-word").textContent = scrambled;
    wrapper.querySelector(".scramble-hint").textContent = hint;
    wrapper.querySelector(".scramble-feedback").textContent = feedback;
    wrapper.querySelector("input").value = "";
    updateHud();
  }

  function loadStage(level, keepScore = false) {
    stageLevel = level;
    const pool = getStagePool();
    const entry = pool[(level - 1) % pool.length];
    answer = entry.word.toLowerCase();
    hint = entry.hint;
    scrambled = scrambleWord(answer);
    triesLeft = Math.max(2, getTriesBase() - Math.floor((stageLevel - 1) / 3));
    if (!keepScore) {
      setScore(0);
    } else {
      refreshLevel();
    }
    renderRound();
    setStatus(`Stage ${stageLevel}`);
  }

  function submitGuess() {
    const input = wrapper.querySelector("input");
    const guess = input.value.trim().toLowerCase();
    if (!guess) return;
    if (guess === answer) {
      setScore(appState.score + 20 + triesLeft * 6);
      setStatus("Correct");
      if (stageLevel >= 10) {
        renderRound(`Correct. The word was ${answer.toUpperCase()}.`);
        setStatus("All stages cleared");
        return;
      }
      renderRound(`Correct. The word was ${answer.toUpperCase()}.`);
      window.setTimeout(() => {
        loadStage(stageLevel + 1, true);
      }, 650);
      return;
    }
    triesLeft -= 1;
    if (triesLeft <= 0) {
      renderRound(`Out of tries. The word was ${answer.toUpperCase()}.`);
      setStatus("Locked out");
      scheduleAutoReset();
      return;
    }
    renderRound("Not quite. Try again.");
    setStatus("Keep guessing");
  }

  return {
    id: "scramble",
    getLevelText: () => String(stageLevel),
    title: "Word Scramble",
    tagline: "Unscramble arcade words",
    subtitle: "Untangle mixed-up words, use the hint, and climb through ten quick stages.",
    description:
      "A simple word puzzle with arcade-themed answers, stage progression, and a short hint for every round.",
    controls: "Type the answer, then check it or skip to a new scramble.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="scramble-card">
          <div class="game-meta">
            <div class="info-chip-row">
              <span class="info-chip" data-meta="stage">Stage 1</span>
              <span class="info-chip" data-meta="tries">Tries 0</span>
            </div>
          </div>
          <div class="scramble-word"></div>
          <div class="scramble-hint"></div>
          <div class="scramble-controls">
            <input class="field-control" type="text" placeholder="Type the answer" />
            <button class="primary-button" data-action="check">Check</button>
            <button class="secondary-button" data-action="skip">Skip</button>
          </div>
          <div class="scramble-feedback"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector('[data-action="check"]').addEventListener("click", submitGuess);
      wrapper.querySelector('[data-action="skip"]').addEventListener("click", () => {
        triesLeft = Math.max(1, triesLeft - 1);
        scrambled = scrambleWord(answer);
        renderRound("Skipped. Here is a new shuffle.");
        setStatus("New shuffle");
      });
      wrapper.querySelector("input").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          submitGuess();
        }
      });
      loadStage(1);
    },
    start() {
      setStatus(`Stage ${stageLevel}`);
    },
    reset() {
      loadStage(1);
    },
    destroy() {},
  };
}

function createLaneHopperGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let crossings = 0;
  let player = { col: 3, row: 8 };
  let lanes = [];
  const cols = 7;
  const rows = 9;
  const cellSize = 64;

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { speed: 1.05, density: 0.16, widthBias: 1.45, densityRamp: 0.02, speedRamp: 0.08, widthRamp: 0.028 };
    if (mode === "easy") return { speed: 1.35, density: 0.22, widthBias: 1.32, densityRamp: 0.028, speedRamp: 0.1, widthRamp: 0.034 };
    if (mode === "hard") return { speed: 2.25, density: 0.38, widthBias: 1.08, densityRamp: 0.044, speedRamp: 0.14, widthRamp: 0.045 };
    if (mode === "chaos") return { speed: 2.85, density: 0.5, widthBias: 0.95, densityRamp: 0.05, speedRamp: 0.17, widthRamp: 0.05 };
    return { speed: 1.75, density: 0.3, widthBias: 1.18, densityRamp: 0.035, speedRamp: 0.12, widthRamp: 0.04 };
  }

  function buildLanes() {
    const config = getConfig();
    const level = crossings + 1;
    lanes = Array.from({ length: rows - 2 }, (_, laneIndex) => {
      const row = laneIndex + 1;
      const direction = laneIndex % 2 === 0 ? 1 : -1;
      const laneDensity = config.density + Math.min(0.34, (level - 1) * config.densityRamp);
      const obstacleCount = clamp(
        1 + Math.round(laneDensity * 5) + (laneIndex % 2) + Math.floor((level - 1) / 3),
        1,
        5,
      );
      const width = Math.max(
        0.56,
        (laneIndex % 3 === 0 ? 1.15 : 0.92) * config.widthBias - (level - 1) * config.widthRamp,
      );
      return {
        row,
        direction,
        speed: config.speed + laneIndex * 0.08 + (level - 1) * config.speedRamp,
        obstacles: Array.from({ length: obstacleCount }, (_, index) => ({
          x: ((index * (2.4 + Math.max(0, 0.45 - (level - 1) * 0.02)) + laneIndex * 0.8) % (cols + 3.2)) - 2,
          width,
        })),
      };
    });
  }

  function updateHud() {
    shell.hud.crossings.textContent = `Crossings ${crossings}`;
    shell.hud.lane.textContent = `${getDifficultyPreset().label} mode`;
    shell.hud.resets.textContent = "No lives";
    refreshLevel();
  }

  function resetPlayer() {
    player = { col: Math.floor(cols / 2), row: rows - 1 };
  }

  function resetState() {
    crossings = 0;
    running = false;
    resetPlayer();
    buildLanes();
    setScore(0);
    updateHud();
    draw();
  }

  function collidePlayer() {
    resetPlayer();
    updateHud();
    setStatus("Bonk - back to start");
  }

  function handleGoal() {
    crossings += 1;
    setScore(appState.score + 20 + crossings * 3);
    resetPlayer();
    buildLanes();
    updateHud();
    setStatus(`Crossing ${crossings} cleared`);
  }

  function update() {
    if (!running) return;
    lanes.forEach((lane) => {
      lane.obstacles.forEach((obstacle) => {
        obstacle.x += (lane.speed * lane.direction) / 60;
        if (lane.direction > 0 && obstacle.x > cols + 1.5) {
          obstacle.x = -obstacle.width - Math.random() * 2;
        } else if (lane.direction < 0 && obstacle.x < -obstacle.width - 1.5) {
          obstacle.x = cols + Math.random() * 2;
        }
      });
      if (player.row === lane.row) {
        const hit = lane.obstacles.some((obstacle) => player.col + 0.72 > obstacle.x && player.col + 0.28 < obstacle.x + obstacle.width);
        if (hit) {
          collidePlayer();
        }
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);
    for (let row = 0; row < rows; row += 1) {
      ctx.fillStyle = row === 0 ? "#1eb980" : row === rows - 1 ? "#46b1ff" : row % 2 === 0 ? "#102236" : "#122a43";
      ctx.fillRect(0, row * cellSize, cols * cellSize, cellSize);
    }

    lanes.forEach((lane) => {
      lane.obstacles.forEach((obstacle) => {
        ctx.fillStyle = lane.direction > 0 ? "#ff8a3d" : "#8f66ff";
        ctx.fillRect(obstacle.x * cellSize + 6, lane.row * cellSize + 14, obstacle.width * cellSize - 12, cellSize - 28);
      });
    });

    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.arc(player.col * cellSize + cellSize / 2, player.row * cellSize + cellSize / 2, 18, 0, Math.PI * 2);
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.34)";
      ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 32px Trebuchet MS";
      ctx.fillText("Lane Hopper", (cols * cellSize) / 2, 240);
      ctx.font = "20px Trebuchet MS";
      ctx.fillText("Cross the road without a lives system", (cols * cellSize) / 2, 276);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  return {
    id: "hopper",
    title: "Lane Hopper",
    tagline: "Frogger-style lane dash",
    subtitle: "Cross the lanes, dodge traffic, and keep stacking successful crossings.",
    description:
      "A quick lane-crossing game where collisions send you back to the start instead of costing lives. Difficulty now changes the traffic speed, density, and lane width more clearly.",
    controls: "Use arrow keys or WASD to move one tile at a time. Reach the green strip at the top.",
    getLevelText: () => `${crossings + 1}`,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "crossings", label: "Crossings 0" },
          { id: "lane", label: "Normal mode" },
          { id: "resets", label: "No lives" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = cols * cellSize;
      shell.canvas.height = rows * cellSize;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Hop for it");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (!running) return;
      const key = event.key.toLowerCase();
      if (["arrowleft", "a"].includes(key)) player.col = Math.max(0, player.col - 1);
      if (["arrowright", "d"].includes(key)) player.col = Math.min(cols - 1, player.col + 1);
      if (["arrowup", "w"].includes(key)) player.row = Math.max(0, player.row - 1);
      if (["arrowdown", "s"].includes(key)) player.row = Math.min(rows - 1, player.row + 1);
      if (player.row === 0) {
        handleGoal();
      }
      draw();
    },
  };
}

function createLuckySlotsGame() {
  let wrapper;
  let credits = 30;
  let bet = 3;
  let lastWin = 0;
  let spins = 0;
  let round = 1;
  let spinning = false;
  let spinTimer = null;
  let reels = ["STAR", "STAR", "STAR"];
  const symbols = ["STAR", "7", "BAR", "ORB", "GEM", "ROCKET", "SKULL", "VOID"];

  function getActiveSymbols() {
    const size = clamp(4 + Math.floor((round - 1) / 2), 4, symbols.length);
    return symbols.slice(0, size);
  }

  function getSpinSpeed() {
    const mode = appState.difficulty;
    const base = mode === "chill" ? 10 : mode === "easy" ? 12 : mode === "hard" ? 18 : mode === "chaos" ? 21 : 15;
    return base + Math.floor((round - 1) / 2);
  }

  function getPayout(values) {
    if (values.includes("SKULL") && values.includes("VOID")) return 0;
    const counts = values.reduce((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {});
    const entries = Object.entries(counts).sort((left, right) => right[1] - left[1]);
    const [symbol, count] = entries[0];
    if (count === 3) {
      const bonus = symbol === "7" ? 12 : symbol === "STAR" ? 9 : 7;
      return Math.max(bet * 2, Math.round(bet * Math.max(3, bonus - Math.floor((round - 1) / 3))));
    }
    if (count === 2) {
      return Math.max(0, bet * 2 - Math.floor((round - 1) / 2));
    }
    return 0;
  }

  function updateHud() {
    wrapper.querySelector('[data-hud="credits"]').textContent = `Credits ${credits}`;
    wrapper.querySelector('[data-hud="bet"]').textContent = `Bet ${bet}`;
    wrapper.querySelector('[data-hud="last"]').textContent = `Last win ${lastWin}`;
    refreshLevel();
  }

  function renderReels() {
    wrapper.querySelector(".reel-row").innerHTML = reels
      .map((symbol) => `<div class="slot-reel">${symbol}</div>`)
      .join("");
    wrapper.querySelector('[data-action="down"]').disabled = spinning || bet <= 1;
    wrapper.querySelector('[data-action="up"]').disabled = spinning || bet >= Math.min(9, credits);
    wrapper.querySelector('[data-action="spin"]').disabled = spinning || credits < bet;
  }

  function resetState() {
    const mode = appState.difficulty;
    credits = mode === "chill" ? 44 : mode === "easy" ? 38 : mode === "hard" ? 24 : mode === "chaos" ? 20 : 30;
    bet = Math.min(3, credits);
    lastWin = 0;
    spins = 0;
    round = 1;
    spinning = false;
    reels = ["STAR", "BAR", "ORB"];
    if (spinTimer) clearInterval(spinTimer);
    spinTimer = null;
    renderReels();
    setScore(0);
    updateHud();
  }

  function finishSpin() {
    spinning = false;
    if (spinTimer) clearInterval(spinTimer);
    spinTimer = null;
    reels = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    lastWin = getPayout(reels);
    credits += lastWin;
    spins += 1;
    round = 1 + Math.floor(spins / 4);
    if (lastWin > 0) {
      setScore(appState.score + lastWin * 2);
      setStatus(`Jackpot vibes: +${lastWin}`);
    } else {
      setStatus("No luck that spin");
    }
    if (credits < 1) {
      setStatus("Out of credits - auto reset");
      scheduleAutoReset();
    }
    updateHud();
    renderReels();
  }

  function spin() {
    if (spinning || credits < bet) return;
    credits -= bet;
    lastWin = 0;
    spinning = true;
    let ticks = 0;
    const maxTicks = getSpinSpeed();
    renderReels();
    updateHud();
    setStatus("Spinning...");
    spinTimer = window.setInterval(() => {
      ticks += 1;
      const activeSymbols = getActiveSymbols();
      reels = reels.map(() => activeSymbols[Math.floor(Math.random() * activeSymbols.length)]);
      renderReels();
      if (ticks >= maxTicks) {
        finishSpin();
      }
    }, 90);
  }

  return {
    id: "slots",
    title: "Lucky Slots",
    tagline: "Three-reel casino chaos",
    subtitle: "Raise your bet, chase triples, and see how long you can keep your credits alive.",
    description:
      "A solo slot machine game with adjustable bets, spinning reels, combo payouts, and a little arcade tension every time your credits dip.",
    controls: "Use the bet buttons, then spin for matches. Triples pay the most.",
    getLevelText: () => `${round}`,
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="slots-card">
          <div class="info-chip-row">
            <span class="info-chip" data-hud="credits">Credits 30</span>
            <span class="info-chip" data-hud="bet">Bet 3</span>
            <span class="info-chip" data-hud="last">Last win 0</span>
          </div>
          <div class="reel-row"></div>
          <div class="action-button-grid">
            <button class="mini-button" data-action="down">Bet -</button>
            <button class="mini-button" data-action="up">Bet +</button>
            <button class="primary-button" data-action="spin">Spin</button>
          </div>
          <p class="compact-copy">Three of a kind pays big. Two of a kind gives a small refund to keep the run alive.</p>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector('[data-action="down"]').addEventListener("click", () => {
        bet = Math.max(1, bet - 1);
        updateHud();
        renderReels();
      });
      wrapper.querySelector('[data-action="up"]').addEventListener("click", () => {
        bet = Math.min(Math.max(1, credits), bet + 1);
        updateHud();
        renderReels();
      });
      wrapper.querySelector('[data-action="spin"]').addEventListener("click", spin);
      resetState();
    },
    start() {
      setStatus("Spin when ready");
    },
    reset() {
      resetState();
    },
    destroy() {
      if (spinTimer) clearInterval(spinTimer);
      spinTimer = null;
      spinning = false;
    },
  };
}

function createCodeBreakerGame() {
  let wrapper;
  let answer = [];
  let currentGuess = [];
  let guessesLeft = 8;
  let solvedRound = 1;
  const colors = ["Red", "Blue", "Green", "Gold", "Pink", "Cyan"];

  function getGuessLimit() {
    const mode = appState.difficulty;
    const base = mode === "chill" ? 11 : mode === "easy" ? 10 : mode === "hard" ? 7 : mode === "chaos" ? 6 : 8;
    return Math.max(4, base - Math.floor((solvedRound - 1) / 2));
  }

  function getActiveColors() {
    return colors.slice(0, clamp(4 + Math.floor((solvedRound - 1) / 2), 4, colors.length));
  }

  function buildAnswer() {
    const activeColors = getActiveColors();
    answer = Array.from({ length: 4 }, () => activeColors[Math.floor(Math.random() * activeColors.length)]);
  }

  function updateHud() {
    wrapper.querySelector('[data-hud="round"]').textContent = `Round ${solvedRound}`;
    wrapper.querySelector('[data-hud="guesses"]').textContent = `Guesses ${guessesLeft}`;
    wrapper.querySelector('[data-hud="pick"]').textContent = `Slots ${currentGuess.length}/4`;
    refreshLevel();
  }

  function renderGuess() {
    wrapper.querySelector(".code-current").innerHTML = Array.from({ length: 4 }, (_, index) => {
      const color = currentGuess[index];
      return `<div class="code-slot">${color ? `<span class="color-peg color-${color.toLowerCase()}">${color[0]}</span>` : "?"}</div>`;
    }).join("");
    wrapper.querySelector('[data-action="submit"]').disabled = currentGuess.length !== 4;
    wrapper.querySelector('[data-action="back"]').disabled = currentGuess.length === 0;
  }

  function renderPalette() {
    wrapper.querySelector(".code-palette").innerHTML = getActiveColors()
      .map(
        (color) =>
          `<button class="mini-button color-choice color-${color.toLowerCase()}" data-color="${color}">${color}</button>`,
      )
      .join("");
    wrapper.querySelectorAll("[data-color]").forEach((button) => {
      button.addEventListener("click", () => {
        if (currentGuess.length >= 4) return;
        currentGuess.push(button.dataset.color);
        renderGuess();
        updateHud();
      });
    });
  }

  function scoreGuess(guess) {
    const answerCopy = [...answer];
    const guessCopy = [...guess];
    let exact = 0;
    let partial = 0;

    for (let index = 0; index < guessCopy.length; index += 1) {
      if (guessCopy[index] === answerCopy[index]) {
        exact += 1;
        answerCopy[index] = null;
        guessCopy[index] = null;
      }
    }

    guessCopy.forEach((value) => {
      if (!value) return;
      const matchIndex = answerCopy.indexOf(value);
      if (matchIndex >= 0) {
        partial += 1;
        answerCopy[matchIndex] = null;
      }
    });

    return { exact, partial };
  }

  function resetRound() {
    currentGuess = [];
    guessesLeft = getGuessLimit();
    buildAnswer();
    wrapper.querySelector(".code-history").innerHTML = "";
    renderGuess();
    renderPalette();
    updateHud();
  }

  function submitGuess() {
    if (currentGuess.length !== 4) return;
    guessesLeft -= 1;
    const result = scoreGuess(currentGuess);
    const history = wrapper.querySelector(".code-history");
    history.insertAdjacentHTML(
      "afterbegin",
      `<div class="guess-row">
        <div class="guess-pegs">${currentGuess
          .map((color) => `<span class="color-peg color-${color.toLowerCase()}">${color[0]}</span>`)
          .join("")}</div>
        <div class="guess-feedback">Exact ${result.exact} • Near ${result.partial}</div>
      </div>`,
    );
    if (result.exact === 4) {
      setScore(appState.score + 30 + solvedRound * 6);
      solvedRound += 1;
      setStatus("Code cracked");
      resetRound();
      return;
    }
    if (guessesLeft <= 0) {
      wrapper.querySelector(".code-history").insertAdjacentHTML(
        "afterbegin",
        `<div class="guess-row"><div class="guess-feedback">Answer: ${answer.join(" / ")}</div></div>`,
      );
      setStatus("Vault locked you out - auto reset");
      scheduleAutoReset();
    } else {
      setStatus(`Exact ${result.exact}, near ${result.partial}`);
    }
    currentGuess = [];
    renderGuess();
    updateHud();
  }

  return {
    id: "code",
    title: "Code Cracker",
    tagline: "Mastermind-style color puzzle",
    subtitle: "Guess the hidden four-color code before you run out of tries.",
    description:
      "A deduction puzzle where you build a four-color guess, read the exact and near-match clues, and crack increasingly many codes.",
    controls: "Choose four colors, submit the guess, and use the feedback to narrow down the answer.",
    getLevelText: () => `${solvedRound}`,
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="code-card">
          <div class="info-chip-row">
            <span class="info-chip" data-hud="round">Round 1</span>
            <span class="info-chip" data-hud="guesses">Guesses 8</span>
            <span class="info-chip" data-hud="pick">Slots 0/4</span>
          </div>
          <div class="code-current"></div>
          <div class="code-palette"></div>
          <div class="action-button-grid">
            <button class="secondary-button" data-action="back">Backspace</button>
            <button class="primary-button" data-action="submit">Submit guess</button>
          </div>
          <div class="code-history"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      wrapper.querySelector('[data-action="back"]').addEventListener("click", () => {
        currentGuess.pop();
        renderGuess();
        updateHud();
      });
      wrapper.querySelector('[data-action="submit"]').addEventListener("click", submitGuess);
      resetRound();
    },
    start() {
      setStatus("Crack the pattern");
    },
    reset() {
      solvedRound = 1;
      resetRound();
    },
    destroy() {},
  };
}

function createTowerTacticsGame() {
  let wrapper;
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let towers = [];
  let enemies = [];
  let selectedTowerType = "pea";
  let selectedTowerId = null;
  let lives = 14;
  let cash = 26;
  let wave = 1;
  let waveTotal = 0;
  let spawnedThisWave = 0;
  let spawnTimer = 0;
  let preWaveCountdown = 0;
  let buildingPads = [];
  const canvasWidth = 960;
  const canvasHeight = 520;

  const path = [
    { x: 0, y: 118 },
    { x: 126, y: 118 },
    { x: 126, y: 390 },
    { x: 282, y: 390 },
    { x: 282, y: 86 },
    { x: 452, y: 86 },
    { x: 452, y: 304 },
    { x: 628, y: 304 },
    { x: 628, y: 154 },
    { x: 784, y: 154 },
    { x: 784, y: 420 },
    { x: 908, y: 420 },
    { x: 908, y: 240 },
    { x: 960, y: 240 },
  ];

  function getTowerCatalog() {
    return {
      pea: {
        label: "Pea Tower",
        cost: 7,
        range: 118,
        reload: 24,
        damage: 1,
        color: "#46b1ff",
        accent: "#b9e6ff",
      },
      frost: {
        label: "Frost Tower",
        cost: 11,
        range: 105,
        reload: 34,
        damage: 1,
        slow: 0.62,
        slowTicks: 60,
        color: "#8f66ff",
        accent: "#ddd0ff",
      },
      cannon: {
        label: "Cannon",
        cost: 15,
        range: 132,
        reload: 44,
        damage: 2,
        splash: 52,
        color: "#ff8a3d",
        accent: "#ffd8ba",
      },
      beam: {
        label: "Beam Tower",
        cost: 19,
        range: 150,
        reload: 16,
        damage: 1,
        pierce: 2,
        color: "#7ef0bb",
        accent: "#d6fff0",
      },
      volt: {
        label: "Volt Tower",
        cost: 24,
        range: 138,
        reload: 28,
        damage: 1,
        chain: 2,
        color: "#ffd166",
        accent: "#fff2b2",
      },
    };
  }

  function getWaveConfig(level) {
    const mode = appState.difficulty;
    const difficultyMap = {
      chill: { count: 8, spawnGap: 37, speed: 1.02, hp: 3, reward: 2 },
      easy: { count: 10, spawnGap: 33, speed: 1.12, hp: 3, reward: 2 },
      normal: { count: 12, spawnGap: 30, speed: 1.24, hp: 4, reward: 3 },
      hard: { count: 14, spawnGap: 27, speed: 1.38, hp: 4, reward: 3 },
      chaos: { count: 16, spawnGap: 24, speed: 1.56, hp: 5, reward: 4 },
    };
    const profile = difficultyMap[mode] || difficultyMap.normal;
    const bossWave = level % 5 === 0;
    return {
      count: profile.count + (level - 1) * 2 + (bossWave ? 2 : 0),
      spawnGap: Math.max(12, profile.spawnGap - Math.floor((level - 1) / 2)),
      speed: profile.speed + (level - 1) * 0.1,
      hp: profile.hp + Math.floor((level - 1) / 2) + (bossWave ? 3 : 0),
      reward: profile.reward + Math.floor((level - 1) / 3) + (bossWave ? 2 : 0),
    };
  }

  function buildPads() {
    buildingPads = [
      { x: 76, y: 52, towerId: null },
      { x: 208, y: 62, towerId: null },
      { x: 218, y: 218, towerId: null },
      { x: 84, y: 452, towerId: null },
      { x: 246, y: 472, towerId: null },
      { x: 358, y: 212, towerId: null },
      { x: 382, y: 36, towerId: null },
      { x: 516, y: 162, towerId: null },
      { x: 532, y: 378, towerId: null },
      { x: 658, y: 244, towerId: null },
      { x: 690, y: 78, towerId: null },
      { x: 742, y: 500 - 68, towerId: null },
      { x: 846, y: 324, towerId: null },
      { x: 858, y: 110, towerId: null },
      { x: 930, y: 470, towerId: null },
      { x: 930, y: 176, towerId: null },
      { x: 610, y: 454, towerId: null },
    ];
  }

  function updateHud() {
    const selectedTower = towers.find((tower) => tower.id === selectedTowerId);
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.cash.textContent = `Cash ${cash}`;
    shell.hud.wave.textContent = `Wave ${wave}`;
    shell.hud.towers.textContent = `Towers ${towers.length}/${buildingPads.length}`;
    shell.hud.selected.textContent = selectedTower
      ? `${getTowerCatalog()[selectedTower.type].label} Lv${selectedTower.level}`
      : `Build ${getTowerCatalog()[selectedTowerType].label}`;
    refreshLevel();
  }

  function getSelectedTower() {
    return towers.find((tower) => tower.id === selectedTowerId) || null;
  }

  function getUpgradeCosts(tower) {
    return {
      power: 5 + tower.level * 3,
      range: 4 + tower.rangeLevel * 3,
      speed: 5 + tower.speedLevel * 3,
      tech: 7 + tower.techLevel * 4,
      sell: Math.max(4, Math.floor(tower.spent * 0.65)),
    };
  }

  function renderControls() {
    if (!wrapper) return;
    const catalog = getTowerCatalog();
    const selectedTower = getSelectedTower();
    const costs = selectedTower ? getUpgradeCosts(selectedTower) : null;
    wrapper.querySelector(".action-button-grid").innerHTML = `
      <div class="tower-panel">
        <div class="info-chip-row">
          <span class="info-chip">Build: ${catalog[selectedTowerType].label}</span>
          <span class="info-chip">${selectedTower ? `Selected: ${catalog[selectedTower.type].label} Lv${selectedTower.level}` : "Selected: none"}</span>
          <span class="info-chip">${selectedTower ? `Damage ${selectedTower.damage}` : "Click a pad to build"}</span>
          <span class="info-chip">${selectedTower ? `Range ${selectedTower.range}` : "Click a tower to upgrade"}</span>
        </div>
        <div class="action-button-grid">
          <button class="mini-button ${selectedTowerType === "pea" ? "selected-build" : ""}" data-build="pea">${catalog.pea.label} ${catalog.pea.cost}</button>
          <button class="mini-button ${selectedTowerType === "frost" ? "selected-build" : ""}" data-build="frost">${catalog.frost.label} ${catalog.frost.cost}</button>
          <button class="mini-button ${selectedTowerType === "cannon" ? "selected-build" : ""}" data-build="cannon">${catalog.cannon.label} ${catalog.cannon.cost}</button>
          <button class="mini-button ${selectedTowerType === "beam" ? "selected-build" : ""}" data-build="beam">${catalog.beam.label} ${catalog.beam.cost}</button>
          <button class="mini-button ${selectedTowerType === "volt" ? "selected-build" : ""}" data-build="volt">${catalog.volt.label} ${catalog.volt.cost}</button>
        </div>
        <div class="action-button-grid">
          <button class="mini-button" data-upgrade="power" ${selectedTower ? "" : "disabled"}>Power ${costs ? costs.power : "--"}</button>
          <button class="mini-button" data-upgrade="range" ${selectedTower ? "" : "disabled"}>Range ${costs ? costs.range : "--"}</button>
          <button class="mini-button" data-upgrade="speed" ${selectedTower ? "" : "disabled"}>Reload ${costs ? costs.speed : "--"}</button>
          <button class="mini-button" data-upgrade="tech" ${selectedTower ? "" : "disabled"}>Tech ${costs ? costs.tech : "--"}</button>
          <button class="mini-button" data-upgrade="sell" ${selectedTower ? "" : "disabled"}>Sell ${costs ? costs.sell : "--"}</button>
          <button class="mini-button" data-clear-selection ${selectedTower ? "" : "disabled"}>Clear Focus</button>
        </div>
        <div class="tower-note">Pea is cheap, Frost slows, Cannon splashes, Beam pierces, and Volt jumps between clustered enemies. Tech upgrades boost each tower's unique trait.</div>
      </div>
    `;
    wrapper.querySelectorAll("[data-build]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedTowerType = button.dataset.build;
        selectedTowerId = null;
        renderControls();
        setStatus(`${getTowerCatalog()[selectedTowerType].label} selected`);
      });
    });
    wrapper.querySelectorAll("[data-upgrade]").forEach((button) => {
      button.addEventListener("click", () => {
        upgradeTower(button.dataset.upgrade);
      });
    });
    const clearButton = wrapper.querySelector("[data-clear-selection]");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        selectedTowerId = null;
        renderControls();
        updateHud();
        setStatus(`${getTowerCatalog()[selectedTowerType].label} selected`);
      });
    }
  }

  function setEnemyPosition(enemy) {
    const start = path[enemy.pathIndex];
    const end = path[enemy.pathIndex + 1];
    if (!end) {
      enemy.x = start.x;
      enemy.y = start.y;
      return;
    }
    enemy.x = start.x + (end.x - start.x) * enemy.segmentProgress;
    enemy.y = start.y + (end.y - start.y) * enemy.segmentProgress;
  }

  function spawnEnemy() {
    const config = getWaveConfig(wave);
    const bossWave = wave % 5 === 0;
    const spawnIndex = spawnedThisWave + 1;
    let variant = {
      kind: "grunt",
      speed: 0,
      hp: 0,
      reward: 0,
      size: 13,
      color: "#ff8a3d",
    };
    if (bossWave && spawnIndex === config.count) {
      variant = {
        kind: "boss",
        speed: -0.12,
        hp: 10 + wave,
        reward: 8 + Math.floor(wave / 2),
        size: 20,
        color: "#ffd166",
      };
    } else if (spawnIndex % 6 === 0) {
      variant = {
        kind: "tank",
        speed: -0.2,
        hp: 4 + Math.floor(wave / 3),
        reward: 3,
        size: 16,
        color: "#ff6b6b",
      };
    } else if (spawnIndex % 4 === 0) {
      variant = {
        kind: "runner",
        speed: 0.42,
        hp: -1,
        reward: 1,
        size: 10,
        color: "#7ef0bb",
      };
    } else if (spawnIndex % 7 === 0) {
      variant = {
        kind: "ghost",
        speed: 0.3,
        hp: 0,
        reward: 2,
        size: 12,
        color: "#c3a6ff",
      };
    }
    const enemy = {
      pathIndex: 0,
      segmentProgress: 0,
      x: path[0].x,
      y: path[0].y,
      kind: variant.kind,
      baseSpeed: Math.max(0.76, config.speed + variant.speed + Math.random() * 0.14),
      hp: Math.max(1, config.hp + variant.hp),
      maxHp: Math.max(1, config.hp + variant.hp),
      reward: Math.max(1, config.reward + variant.reward),
      size: variant.size,
      color: variant.color,
      slowFactor: 1,
      slowTicks: 0,
      shield: variant.kind === "tank" ? 1 : 0,
    };
    setEnemyPosition(enemy);
    enemies.push(enemy);
  }

  function resetState() {
    towers = [];
    enemies = [];
    lives = 14;
    cash = 26;
    wave = 1;
    waveTotal = getWaveConfig(1).count;
    spawnedThisWave = 0;
    spawnTimer = 0;
    preWaveCountdown = 75;
    selectedTowerType = "pea";
    selectedTowerId = null;
    running = false;
    buildPads();
    setScore(0);
    updateHud();
    renderControls();
    draw();
  }

  function placeTower(index) {
    const pad = buildingPads[index];
    if (!pad) return;
    if (pad.towerId != null) {
      selectedTowerId = pad.towerId;
      updateHud();
      renderControls();
      const tower = getSelectedTower();
      if (tower) {
        setStatus(`${getTowerCatalog()[tower.type].label} ready for upgrades`);
      }
      return;
    }
    const towerType = getTowerCatalog()[selectedTowerType];
    if (cash < towerType.cost) {
      setStatus(`Need ${towerType.cost} cash`);
      return;
    }
    cash -= towerType.cost;
    const tower = {
      id: `tower-${Date.now()}-${index}`,
      type: selectedTowerType,
      x: pad.x,
      y: pad.y,
      cooldown: 0,
      level: 1,
      damage: towerType.damage,
      range: towerType.range,
      reload: towerType.reload,
      splashRadius: towerType.splash || 0,
      pierce: towerType.pierce || 0,
      chain: towerType.chain || 0,
      slowFactor: towerType.slow || 1,
      slowTicks: towerType.slowTicks || 0,
      rangeLevel: 0,
      speedLevel: 0,
      techLevel: 0,
      spent: towerType.cost,
    };
    towers.push(tower);
    pad.towerId = tower.id;
    selectedTowerId = tower.id;
    updateHud();
    renderControls();
    setStatus(`${towerType.label} built`);
  }

  function upgradeTower(kind) {
    const tower = getSelectedTower();
    if (!tower) {
      setStatus("Select a tower first");
      return;
    }
    const costs = getUpgradeCosts(tower);
    if (kind === "sell") {
      cash += costs.sell;
      towers = towers.filter((item) => item.id !== tower.id);
      const pad = buildingPads.find((item) => item.towerId === tower.id);
      if (pad) pad.towerId = null;
      selectedTowerId = null;
      updateHud();
      renderControls();
      setStatus("Tower sold");
      return;
    }
    const cost = costs[kind];
    if (cash < cost) {
      setStatus(`Need ${cost} cash`);
      return;
    }
    cash -= cost;
    tower.level += 1;
    tower.spent += cost;
    if (kind === "power") {
      tower.damage += 1;
    } else if (kind === "range") {
      tower.range += 18;
      tower.rangeLevel += 1;
    } else if (kind === "speed") {
      tower.reload = Math.max(8, tower.reload - 4);
      tower.speedLevel += 1;
    } else if (kind === "tech") {
      tower.techLevel += 1;
      if (tower.type === "pea") {
        tower.pierce += 1;
      } else if (tower.type === "frost") {
        tower.slowTicks += 18;
        tower.slowFactor = Math.max(0.35, tower.slowFactor - 0.05);
      } else if (tower.type === "cannon") {
        tower.splashRadius += 16;
      } else if (tower.type === "beam") {
        tower.pierce += 1;
        tower.damage += 1;
      } else if (tower.type === "volt") {
        tower.chain += 1;
        tower.range += 10;
      }
    }
    updateHud();
    renderControls();
    setStatus(`${getTowerCatalog()[tower.type].label} upgraded`);
  }

  function moveEnemies() {
    const survivors = [];
    enemies.forEach((enemy) => {
      if (enemy.slowTicks > 0) {
        enemy.slowTicks -= 1;
      } else {
        enemy.slowFactor = 1;
      }
      const start = path[enemy.pathIndex];
      const end = path[enemy.pathIndex + 1];
      if (!end) {
        lives -= 1;
        return;
      }
      const distance = Math.hypot(end.x - start.x, end.y - start.y) || 1;
      enemy.segmentProgress += (enemy.baseSpeed * enemy.slowFactor) / distance;
      while (enemy.segmentProgress >= 1 && enemy.pathIndex < path.length - 1) {
        enemy.segmentProgress -= 1;
        enemy.pathIndex += 1;
      }
      if (enemy.pathIndex >= path.length - 1) {
        lives -= 1;
        return;
      }
      setEnemyPosition(enemy);
      survivors.push(enemy);
    });
    enemies = survivors;
    if (lives <= 0) {
      running = false;
      setStatus(`Base overrun - wave ${wave}`);
      scheduleAutoReset();
    }
  }

  function updateTowers() {
    const catalog = getTowerCatalog();
    towers.forEach((tower) => {
      tower.cooldown = Math.max(0, tower.cooldown - 1);
      if (tower.cooldown > 0) return;
      const stats = catalog[tower.type];
      const targets = enemies
        .filter((enemy) => Math.hypot(enemy.x - tower.x, enemy.y - tower.y) <= tower.range)
        .sort((left, right) => {
          const leftProgress = left.pathIndex + left.segmentProgress;
          const rightProgress = right.pathIndex + right.segmentProgress;
          return rightProgress - leftProgress;
        });
      const target = targets[0];
      if (!target) return;
      const affected = [target];
      const extraTargets = Math.max(tower.pierce || 0, tower.chain || 0);
      if (extraTargets) {
        affected.push(...targets.slice(1, 1 + extraTargets));
      }
      affected.forEach((enemy) => {
        const shieldedDamage = Math.max(1, tower.damage - (enemy.shield || 0));
        enemy.hp -= shieldedDamage;
        if (tower.slowFactor < 1) {
          enemy.slowFactor = tower.slowFactor;
          enemy.slowTicks = tower.slowTicks;
        }
        if (tower.splashRadius) {
          enemies.forEach((splashEnemy) => {
            if (splashEnemy === enemy) return;
            if (Math.hypot(splashEnemy.x - enemy.x, splashEnemy.y - enemy.y) <= tower.splashRadius) {
              splashEnemy.hp -= Math.max(1, tower.damage - 1);
            }
          });
        }
      });
      tower.cooldown = tower.reload;
      let kills = 0;
      enemies = enemies.filter((enemy) => {
        if (enemy.hp > 0) return true;
        cash += enemy.reward;
        kills += 1;
        return false;
      });
      if (kills > 0) {
        setScore(appState.score + kills * (9 + wave));
        updateHud();
        renderControls();
      }
    });
  }

  function updateWaveFlow() {
    if (preWaveCountdown > 0) {
      preWaveCountdown -= 1;
      if (preWaveCountdown === 0) {
        setStatus(`Wave ${wave} started`);
      }
      return;
    }
    const config = getWaveConfig(wave);
    waveTotal = config.count;
    if (spawnedThisWave < waveTotal) {
      spawnTimer += 1;
      if (spawnTimer >= config.spawnGap) {
        spawnTimer = 0;
        spawnedThisWave += 1;
        spawnEnemy();
      }
      return;
    }
    if (enemies.length === 0) {
      cash += 7 + Math.floor(wave * 0.75);
      wave += 1;
      spawnedThisWave = 0;
      spawnTimer = 0;
      preWaveCountdown = 60;
      updateHud();
      renderControls();
      setStatus(`Build up for wave ${wave}`);
    }
  }

  function update() {
    if (!running) return;
    updateWaveFlow();
    moveEnemies();
    updateTowers();
    updateHud();
  }

  function drawPath() {
    ctx.strokeStyle = "rgba(255, 209, 102, 0.9)";
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let index = 1; index < path.length; index += 1) {
      ctx.lineTo(path[index].x, path[index].y);
    }
    ctx.stroke();
  }

  function drawPads() {
    buildingPads.forEach((pad, index) => {
      const isSelected = pad.towerId && pad.towerId === selectedTowerId;
      ctx.fillStyle = pad.towerId ? "rgba(30, 185, 128, 0.22)" : "rgba(255,255,255,0.08)";
      ctx.strokeStyle = selectedTowerType && !pad.towerId ? "rgba(255, 138, 61, 0.5)" : "rgba(255,255,255,0.14)";
      ctx.lineWidth = isSelected ? 4 : 2;
      ctx.beginPath();
      ctx.arc(pad.x, pad.y, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (!pad.towerId) {
        ctx.fillStyle = "rgba(255,255,255,0.78)";
        ctx.font = "700 14px Trebuchet MS";
        ctx.textAlign = "center";
        ctx.fillText(String(index + 1), pad.x, pad.y + 5);
      }
    });
  }

  function drawTowers() {
    const catalog = getTowerCatalog();
    towers.forEach((tower) => {
      const stats = catalog[tower.type];
      if (tower.id === selectedTowerId) {
        ctx.strokeStyle = "rgba(255,255,255,0.65)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = stats.color;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = stats.accent;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#08111f";
      ctx.font = "700 11px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(String(tower.level), tower.x, tower.y + 4);
    });
  }

  function drawEnemies() {
    enemies.forEach((enemy) => {
      ctx.fillStyle = enemy.slowFactor < 1 ? "#8f66ff" : enemy.color;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(8,17,31,0.32)";
      ctx.fillRect(enemy.x - 16, enemy.y - enemy.size - 9, 32, 5);
      ctx.fillStyle = "#7ef0bb";
      ctx.fillRect(enemy.x - 16, enemy.y - enemy.size - 9, 32 * (enemy.hp / enemy.maxHp), 5);
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const bg = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bg.addColorStop(0, "#08111f");
    bg.addColorStop(1, "#13365b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    drawPath();
    drawPads();
    drawTowers();
    drawEnemies();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Tower Tactics", canvasWidth / 2, 230);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Build, upgrade, and survive the long rush", canvasWidth / 2, 268);
    } else if (preWaveCountdown > 0) {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 28px Trebuchet MS";
      ctx.fillText(`Wave ${wave} in ${Math.ceil(preWaveCountdown / 30)}`, canvasWidth / 2, canvasHeight / 2);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update();
    draw();
  }

  function handleCanvasClick(event) {
    if (!shell?.canvas) return;
    const rect = shell.canvas.getBoundingClientRect();
    const scaleX = shell.canvas.width / rect.width;
    const scaleY = shell.canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    const padIndex = buildingPads.findIndex((pad) => Math.hypot(pad.x - x, pad.y - y) <= 24);
    if (padIndex >= 0) {
      placeTower(padIndex);
    }
  }

  return {
    id: "tower",
    getLevelText: () => `Wave ${wave}`,
    title: "Tower Tactics",
    tagline: "Tower defense with upgrades and harder waves",
    subtitle: "Build across a longer map, focus towers for upgrades, and stop mixed enemy waves before the base falls.",
    description:
      "A fuller tower defense game with five tower types, a longer route, many more build pads, tower upgrades, mixed enemy types, and boss waves.",
    controls: "Choose a tower, click an empty pad to build, then click occupied pads to upgrade, sell, or tech it up.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="tower-card">
          <div class="canvas-wrap">
            <div class="canvas-hud">
              <div class="info-chip-row">
                <span class="info-chip" data-hud="lives">Lives 14</span>
                <span class="info-chip" data-hud="cash">Cash 26</span>
                <span class="info-chip" data-hud="wave">Wave 1</span>
                <span class="info-chip" data-hud="towers">Towers 0</span>
                <span class="info-chip" data-hud="selected">Build Pea Tower</span>
              </div>
            </div>
            <div class="canvas-card">
              <canvas></canvas>
            </div>
          </div>
          <div class="action-button-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      shell = {
        wrap: wrapper,
        canvas: wrapper.querySelector("canvas"),
        hud: {
          lives: wrapper.querySelector('[data-hud="lives"]'),
          cash: wrapper.querySelector('[data-hud="cash"]'),
          wave: wrapper.querySelector('[data-hud="wave"]'),
          towers: wrapper.querySelector('[data-hud="towers"]'),
          selected: wrapper.querySelector('[data-hud="selected"]'),
        },
      };
      shell.canvas.width = canvasWidth;
      shell.canvas.height = canvasHeight;
      ctx = shell.canvas.getContext("2d");
      shell.canvas.addEventListener("click", handleCanvasClick);
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus(`Build up for wave ${wave}`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
  };
}

function createTargetTapGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let target;
  let hits = 0;
  let misses = 0;
  let timeLeft = 0;
  let lastFrame = 0;

  function getConfig() {
    if (appState.difficulty === "chill") return { duration: 30, radius: 40, speed: 132, lives: 4 };
    if (appState.difficulty === "easy") return { duration: 28, radius: 36, speed: 154, lives: 3 };
    if (appState.difficulty === "hard") return { duration: 24, radius: 28, speed: 206, lives: 2 };
    if (appState.difficulty === "chaos") return { duration: 22, radius: 24, speed: 238, lives: 2 };
    return { duration: 26, radius: 32, speed: 178, lives: 3 };
  }

  function spawnTarget() {
    const config = getConfig();
    const level = 1 + Math.floor(hits / 6);
    const radius = Math.max(16, config.radius - Math.floor(level / 2) * 2);
    target = {
      x: 110 + Math.random() * 500,
      y: 90 + Math.random() * 220,
      r: radius,
      vx: (Math.random() < 0.5 ? -1 : 1) * (config.speed + level * 8),
      vy: (Math.random() < 0.5 ? -1 : 1) * (config.speed * 0.68 + level * 6),
    };
  }

  function updateHud() {
    shell.hud.hits.textContent = `Hits ${hits}`;
    shell.hud.misses.textContent = `Misses ${misses}/${getConfig().lives}`;
    shell.hud.time.textContent = `Time ${Math.max(0, timeLeft).toFixed(1)}s`;
    refreshLevel();
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function resetState() {
    running = false;
    hits = 0;
    misses = 0;
    timeLeft = getConfig().duration;
    lastFrame = 0;
    setScore(0);
    spawnTarget();
    updateHud();
    draw();
  }

  function handleClick(event) {
    if (!running) return;
    const rect = shell.canvas.getBoundingClientRect();
    const scaleX = shell.canvas.width / rect.width;
    const scaleY = shell.canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    const distance = Math.hypot(x - target.x, y - target.y);
    if (distance <= target.r) {
      hits += 1;
      setScore(appState.score + 10 + Math.floor(hits / 3) * 2);
      timeLeft = Math.min(getConfig().duration + 4, timeLeft + 0.7);
      setStatus("Bullseye");
      spawnTarget();
    } else {
      misses += 1;
      setStatus("Miss");
      if (misses >= getConfig().lives) {
        finish(`Out of misses - ${hits} hits`);
      }
    }
    updateHud();
  }

  function update(timestamp) {
    if (!running) return;
    if (!lastFrame) lastFrame = timestamp;
    const delta = Math.min(32, timestamp - lastFrame);
    lastFrame = timestamp;
    timeLeft -= delta / 1000;
    target.x += (target.vx * delta) / 1000;
    target.y += (target.vy * delta) / 1000;
    if (target.x < target.r || target.x > 640 - target.r) target.vx *= -1;
    if (target.y < target.r || target.y > 360 - target.r) target.vy *= -1;
    if (timeLeft <= 0) {
      finish(`Time up - ${hits} hits`);
      return;
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 640, 360);
    const bg = ctx.createLinearGradient(0, 0, 0, 360);
    bg.addColorStop(0, "#0b1220");
    bg.addColorStop(1, "#11263d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 640, 360);

    for (let ring = 5; ring >= 1; ring -= 1) {
      ctx.beginPath();
      ctx.arc(target.x, target.y, (target.r * ring) / 5, 0, Math.PI * 2);
      ctx.fillStyle = ["#ef4444", "#f97316", "#facc15", "#fde68a", "#ffffff"][5 - ring];
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(target.x - target.r - 16, target.y);
    ctx.lineTo(target.x + target.r + 16, target.y);
    ctx.moveTo(target.x, target.y - target.r - 16);
    ctx.lineTo(target.x, target.y + target.r + 16);
    ctx.stroke();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 30px Trebuchet MS";
      ctx.fillText("Target Tap", 320, 166);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Click the target before the clock runs out", 320, 198);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    update(timestamp);
    draw();
  }

  return {
    id: "target",
    title: "Target Tap",
    tagline: "Click the moving bullseye",
    subtitle: "A simple aim trainer that gets faster and tighter as the hits pile up.",
    description: "Click the moving target, chain hits for more points, and don't burn through your misses.",
    controls: "Use the mouse or trackpad to click the target.",
    levelStep: 60,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "hits", label: "Hits 0" },
          { id: "misses", label: "Misses 0/3" },
          { id: "time", label: "Time 0.0s" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 640;
      shell.canvas.height = 360;
      ctx = shell.canvas.getContext("2d");
      shell.canvas.addEventListener("click", handleClick);
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      lastFrame = 0;
      setStatus("Aim steady");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      shell?.canvas?.removeEventListener("click", handleClick);
    },
  };
}

function createCatchCrazeGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let basketX = 320;
  let items = [];
  let spawnTimer = 0;
  let lives = 3;
  let timeLeft = 0;
  const keys = { left: false, right: false };

  function getConfig() {
    if (appState.difficulty === "chill") return { basket: 124, speed: 220, spawn: 760, lives: 5, duration: 40 };
    if (appState.difficulty === "easy") return { basket: 112, speed: 250, spawn: 680, lives: 4, duration: 38 };
    if (appState.difficulty === "hard") return { basket: 92, speed: 330, spawn: 520, lives: 3, duration: 34 };
    if (appState.difficulty === "chaos") return { basket: 86, speed: 370, spawn: 450, lives: 2, duration: 32 };
    return { basket: 102, speed: 288, spawn: 600, lives: 3, duration: 36 };
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.caught.textContent = `Caught ${Math.floor(appState.score / 10)}`;
    shell.hud.time.textContent = `Time ${Math.max(0, timeLeft).toFixed(1)}s`;
    refreshLevel();
  }

  function spawnItem() {
    const good = Math.random() > (appState.difficulty === "hard" || appState.difficulty === "chaos" ? 0.74 : 0.82);
    items.push({
      x: 40 + Math.random() * 560,
      y: -20,
      vy: getConfig().speed + Math.random() * 80,
      type: good ? "bomb" : "fruit",
      size: good ? 18 : 16 + Math.random() * 6,
    });
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function resetState() {
    running = false;
    basketX = 320;
    items = [];
    spawnTimer = 0;
    lives = getConfig().lives;
    timeLeft = getConfig().duration;
    setScore(0);
    updateHud();
    draw();
  }

  function update(delta) {
    if (!running) return;
    timeLeft -= delta / 1000;
    if (timeLeft <= 0) {
      finish(`Round over - ${appState.score} points`);
      return;
    }

    const move = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    basketX = clamp(basketX + move * getConfig().speed * 0.9 * (delta / 1000), 50, 590);

    spawnTimer += delta;
    while (spawnTimer >= getConfig().spawn) {
      spawnTimer -= getConfig().spawn;
      spawnItem();
    }

    const basketWidth = getConfig().basket;
    const survivors = [];
    items.forEach((item) => {
      item.y += item.vy * (delta / 1000);
      const caught =
        item.y > 300 &&
        item.y < 350 &&
        Math.abs(item.x - basketX) < basketWidth / 2 + item.size / 2;
      if (caught) {
        if (item.type === "fruit") {
          setScore(appState.score + 10);
          setStatus("Nice catch");
        } else {
          lives -= 1;
          setStatus("Bomb!");
        }
        return;
      }
      if (item.y > 380) {
        if (item.type === "fruit") {
          lives -= 1;
          setStatus("Dropped one");
        }
        return;
      }
      survivors.push(item);
    });
    items = survivors;
    if (lives <= 0) {
      finish(`Out of lives - ${appState.score} points`);
      return;
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 640, 360);
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, 640, 360);
    ctx.fillStyle = "#172f46";
    ctx.fillRect(0, 0, 640, 360);
    ctx.fillStyle = "#203d22";
    ctx.fillRect(0, 320, 640, 40);

    items.forEach((item) => {
      if (item.type === "fruit") {
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(item.x - 2, item.y - item.size - 4, 4, 8);
      } else {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fca5a5";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(item.x - 8, item.y - item.size + 3);
        ctx.lineTo(item.x, item.y - item.size - 9);
        ctx.lineTo(item.x + 8, item.y - item.size + 3);
        ctx.stroke();
      }
    });

    const basketWidth = getConfig().basket;
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(basketX - basketWidth / 2, 312, basketWidth, 18);
    ctx.fillStyle = "#92400e";
    ctx.fillRect(basketX - basketWidth / 2 + 6, 318, basketWidth - 12, 12);

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 30px Trebuchet MS";
      ctx.fillText("Catch Craze", 320, 168);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Catch fruit, dodge bombs, survive the round", 320, 198);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    if (!frame.last) frame.last = timestamp;
    const delta = Math.min(32, timestamp - frame.last);
    frame.last = timestamp;
    animationId = requestAnimationFrame(frame);
    update(delta);
    draw();
  }

  return {
    id: "catch",
    title: "Catch Craze",
    tagline: "Fruit catcher with bombs",
    subtitle: "Slide the basket, scoop up the good stuff, and don't fumble the round.",
    description: "Catch falling fruit for points and avoid bombs that blow through your lives.",
    controls: "Move with Left and Right or A and D.",
    levelStep: 80,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "caught", label: "Caught 0" },
          { id: "time", label: "Time 0.0s" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 640;
      shell.canvas.height = 360;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      frame.last = 0;
      running = true;
      setStatus("Catch clean");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      frame.last = 0;
      keys.left = false;
      keys.right = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
    },
  };
}

function createBalanceBeamGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let position = 0.5;
  let velocity = 0;
  let drift = 0;
  let elapsed = 0;
  const keys = { left: false, right: false };

  function getConfig() {
    if (appState.difficulty === "chill") return { push: 0.00135, drift: 0.00032, tolerance: 0.04, maxVelocity: 0.018 };
    if (appState.difficulty === "easy") return { push: 0.0016, drift: 0.00045, tolerance: 0.035, maxVelocity: 0.02 };
    if (appState.difficulty === "hard") return { push: 0.00215, drift: 0.00082, tolerance: 0.028, maxVelocity: 0.024 };
    if (appState.difficulty === "chaos") return { push: 0.00245, drift: 0.00105, tolerance: 0.024, maxVelocity: 0.026 };
    return { push: 0.00185, drift: 0.0006, tolerance: 0.032, maxVelocity: 0.022 };
  }

  function updateHud() {
    shell.hud.time.textContent = `Time ${elapsed.toFixed(1)}s`;
    shell.hud.balance.textContent = `Balance ${Math.round(position * 100)}%`;
    shell.hud.zone.textContent = `Safe zone +/-${Math.round(getConfig().tolerance * 100)}%`;
    refreshLevel();
  }

  function resetState() {
    running = false;
    position = 0.5;
    velocity = 0;
    drift = 0;
    elapsed = 0;
    setScore(0);
    updateHud();
    draw();
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function update(delta) {
    if (!running) return;
    const config = getConfig();
    elapsed += delta / 1000;
    drift += (Math.random() * 2 - 1) * config.drift * delta;
    drift = clamp(drift, -0.08, 0.08);
    velocity += drift * 0.0015;
    velocity += ((keys.right ? 1 : 0) - (keys.left ? 1 : 0)) * config.push * delta;
    velocity *= 0.972;
    velocity = clamp(velocity, -config.maxVelocity, config.maxVelocity);
    position += velocity;
    setScore(Math.floor(elapsed * 12));
    if (position < 0 || position > 1) {
      finish(`Tipped off after ${elapsed.toFixed(1)}s`);
      return;
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 640, 240);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 640, 240);

    const barX = 70;
    const barY = 150;
    const barWidth = 500;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(barX, barY, barWidth, 18);
    const safe = getConfig().tolerance * barWidth;
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(barX + barWidth / 2 - safe, barY, safe * 2, 18);
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(barX + position * barWidth - 18, barY - 14, 36, 46);

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(barX + barWidth / 2, barY - 18);
    ctx.lineTo(barX + barWidth / 2, barY + 36);
    ctx.stroke();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, 640, 240);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 28px Trebuchet MS";
      ctx.fillText("Balance Beam", 320, 98);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Keep the slider centered as the drift fights you", 320, 126);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    if (!frame.last) frame.last = timestamp;
    const delta = Math.min(32, timestamp - frame.last);
    frame.last = timestamp;
    animationId = requestAnimationFrame(frame);
    update(delta);
    draw();
  }

  return {
    id: "balance",
    title: "Balance Beam",
    tagline: "Stay centered",
    subtitle: "A tiny stability game where the drift keeps trying to throw you off.",
    description: "Use left and right to keep the balance marker inside the safe zone for as long as you can.",
    controls: "Move with Left and Right or A and D.",
    levelStep: 40,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "time", label: "Time 0.0s" },
          { id: "balance", label: "Balance 50%" },
          { id: "zone", label: "Safe zone +/-4%" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 640;
      shell.canvas.height = 240;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      frame.last = 0;
      running = true;
      setStatus("Stay centered");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      frame.last = 0;
      keys.left = false;
      keys.right = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
    },
  };
}

function createSpinSafeGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let needleAngle = 0;
  let zoneAngle = 0;
  let speed = 0;
  let round = 1;
  let lives = 3;
  let waiting = false;
  let resumeTimeout = null;

  function getConfig() {
    if (appState.difficulty === "chill") return { zoneSize: 0.9, speed: 0.028, lives: 4 };
    if (appState.difficulty === "easy") return { zoneSize: 0.74, speed: 0.034, lives: 4 };
    if (appState.difficulty === "hard") return { zoneSize: 0.48, speed: 0.048, lives: 3 };
    if (appState.difficulty === "chaos") return { zoneSize: 0.38, speed: 0.057, lives: 2 };
    return { zoneSize: 0.6, speed: 0.041, lives: 3 };
  }

  function setupRound() {
    zoneAngle = Math.random() * Math.PI * 2;
    needleAngle = Math.random() * Math.PI * 2;
    speed = getConfig().speed + (round - 1) * 0.003;
    waiting = false;
    updateHud();
  }

  function updateHud() {
    shell.hud.round.textContent = `Round ${round}`;
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.speed.textContent = `Speed ${speed.toFixed(3)}`;
    refreshLevel();
  }

  function resetState() {
    running = false;
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = null;
    round = 1;
    lives = getConfig().lives;
    setScore(0);
    setupRound();
    draw();
  }

  function finish(status) {
    running = false;
    waiting = false;
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = null;
    setStatus(status);
    scheduleAutoReset();
  }

  function normalize(angle) {
    while (angle < 0) angle += Math.PI * 2;
    while (angle >= Math.PI * 2) angle -= Math.PI * 2;
    return angle;
  }

  function withinZone(angle) {
    const half = getConfig().zoneSize / 2;
    const diff = Math.atan2(Math.sin(angle - zoneAngle), Math.cos(angle - zoneAngle));
    return Math.abs(diff) <= half;
  }

  function stopNeedle() {
    if (!running || waiting) return;
    waiting = true;
    if (withinZone(needleAngle)) {
      round += 1;
      setScore(appState.score + 20);
      setStatus("Locked in");
      resumeTimeout = window.setTimeout(() => {
        setupRound();
      }, 450);
    } else {
      lives -= 1;
      if (lives <= 0) {
        finish(`Missed the zone on round ${round}`);
        return;
      }
      setStatus("Too early");
      resumeTimeout = window.setTimeout(() => {
        setupRound();
      }, 500);
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 420, 420);
    ctx.fillStyle = "#08111d";
    ctx.fillRect(0, 0, 420, 420);
    ctx.save();
    ctx.translate(210, 210);

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 132, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 132, zoneAngle - getConfig().zoneSize / 2, zoneAngle + getConfig().zoneSize / 2);
    ctx.stroke();

    ctx.rotate(needleAngle);
    ctx.strokeStyle = waiting ? "#fbbf24" : "#e2e8f0";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.lineTo(0, -120);
    ctx.stroke();
    ctx.restore();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, 420, 420);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 30px Trebuchet MS";
      ctx.fillText("Spin Safe", 210, 188);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Press Space when the needle enters the green zone", 210, 220);
    }
  }

  function frame() {
    if (!running) {
      draw();
      return;
    }
    animationId = requestAnimationFrame(frame);
    if (!waiting) {
      needleAngle = normalize(needleAngle + speed);
    }
    draw();
  }

  return {
    id: "spin",
    title: "Spin Safe",
    tagline: "Stop inside the zone",
    subtitle: "A quick timing game where the safe arc keeps getting meaner.",
    description: "Press at the right time to stop the spinning needle inside the green zone.",
    controls: "Press Space or Enter to stop the needle.",
    getLevelText: () => String(round),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        square: true,
        hudItems: [
          { id: "round", label: "Round 1" },
          { id: "lives", label: "Lives 3" },
          { id: "speed", label: "Speed 0.000" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 420;
      shell.canvas.height = 420;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Wait for the zone");
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = null;
    },
    onKeyDown(event) {
      if ([" ", "Enter"].includes(event.key)) stopNeedle();
    },
  };
}

function createStarSweepGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let player;
  let stars = [];
  let mines = [];
  let lives = 3;
  let timeLeft = 0;
  const keys = { left: false, right: false, up: false, down: false };

  function getConfig() {
    if (appState.difficulty === "chill") return { speed: 220, mines: 4, lives: 5, duration: 42 };
    if (appState.difficulty === "easy") return { speed: 240, mines: 5, lives: 4, duration: 40 };
    if (appState.difficulty === "hard") return { speed: 290, mines: 7, lives: 3, duration: 34 };
    if (appState.difficulty === "chaos") return { speed: 320, mines: 8, lives: 2, duration: 30 };
    return { speed: 265, mines: 6, lives: 3, duration: 36 };
  }

  function randomSpot(padding = 26) {
    return {
      x: padding + Math.random() * (700 - padding * 2),
      y: padding + Math.random() * (400 - padding * 2),
    };
  }

  function resetState() {
    running = false;
    player = { x: 350, y: 200 };
    stars = Array.from({ length: 5 }, () => randomSpot(30));
    mines = Array.from({ length: getConfig().mines }, () => {
      const spot = randomSpot(38);
      return {
        x: spot.x,
        y: spot.y,
        vx: (Math.random() * 2 - 1) * 55,
        vy: (Math.random() * 2 - 1) * 55,
      };
    });
    lives = getConfig().lives;
    timeLeft = getConfig().duration;
    setScore(0);
    updateHud();
    draw();
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.stars.textContent = `Stars ${appState.score}`;
    shell.hud.time.textContent = `Time ${Math.max(0, timeLeft).toFixed(1)}s`;
    refreshLevel();
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function update(delta) {
    if (!running) return;
    const config = getConfig();
    const moveX = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    const moveY = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    player.x = clamp(player.x + moveX * config.speed * (delta / 1000), 18, 702);
    player.y = clamp(player.y + moveY * config.speed * (delta / 1000), 18, 402);
    timeLeft -= delta / 1000;
    if (timeLeft <= 0) {
      finish(`Collected ${appState.score} stars`);
      return;
    }

    mines.forEach((mine) => {
      mine.x += mine.vx * (delta / 1000);
      mine.y += mine.vy * (delta / 1000);
      if (mine.x < 18 || mine.x > 702) mine.vx *= -1;
      if (mine.y < 18 || mine.y > 402) mine.vy *= -1;
      if (Math.hypot(player.x - mine.x, player.y - mine.y) < 26) {
        lives -= 1;
        player = { x: 350, y: 200 };
        setStatus("Mine hit");
      }
    });

    stars = stars.map((star) => {
      if (Math.hypot(player.x - star.x, player.y - star.y) < 22) {
        setScore(appState.score + 1);
        setStatus("Star grabbed");
        return randomSpot(30);
      }
      return star;
    });

    if (lives <= 0) {
      finish(`Ship cracked after ${appState.score} stars`);
      return;
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 720, 420);
    ctx.fillStyle = "#050b15";
    ctx.fillRect(0, 0, 720, 420);
    for (let star = 0; star < 90; star += 1) {
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect((star * 73) % 720, (star * 41) % 420, 2, 2);
    }

    stars.forEach((star) => {
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    mines.forEach((mine) => {
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(mine.x, mine.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fecaca";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mine.x - 16, mine.y);
      ctx.lineTo(mine.x + 16, mine.y);
      ctx.moveTo(mine.x, mine.y - 16);
      ctx.lineTo(mine.x, mine.y + 16);
      ctx.stroke();
    });

    ctx.fillStyle = "#7dd3fc";
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - 14);
    ctx.lineTo(player.x + 14, player.y + 14);
    ctx.lineTo(player.x - 14, player.y + 14);
    ctx.closePath();
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, 720, 420);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 30px Trebuchet MS";
      ctx.fillText("Star Sweep", 360, 190);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Collect stars and dodge drifting mines", 360, 220);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    if (!frame.last) frame.last = timestamp;
    const delta = Math.min(32, timestamp - frame.last);
    frame.last = timestamp;
    animationId = requestAnimationFrame(frame);
    update(delta);
    draw();
  }

  return {
    id: "sweep",
    title: "Star Sweep",
    tagline: "Collect and dodge",
    subtitle: "A top-down star scooper with wandering mines and quick movement.",
    description: "Grab as many stars as you can before the timer ends while weaving around moving mines.",
    controls: "Move with arrow keys or WASD.",
    levelStep: 4,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "stars", label: "Stars 0" },
          { id: "time", label: "Time 0.0s" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 720;
      shell.canvas.height = 420;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      frame.last = 0;
      running = true;
      setStatus("Sweep the stars");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      frame.last = 0;
      keys.left = false;
      keys.right = false;
      keys.up = false;
      keys.down = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = true;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = true;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = true;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = true;
    },
    onKeyUp(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) keys.left = false;
      if (["ArrowRight", "d", "D"].includes(event.key)) keys.right = false;
      if (["ArrowUp", "w", "W"].includes(event.key)) keys.up = false;
      if (["ArrowDown", "s", "S"].includes(event.key)) keys.down = false;
    },
  };
}

function createMathBlitzGame() {
  let wrapper;
  let questionEl;
  let metaEl;
  let optionWrap;
  let running = false;
  let timerId = null;
  let timeLeft = 0;
  let streak = 0;
  let correct = 0;
  let currentAnswer = null;

  function getConfig() {
    if (appState.difficulty === "chill") return { duration: 50, max: 10, ops: ["+", "-"] };
    if (appState.difficulty === "easy") return { duration: 45, max: 14, ops: ["+", "-"] };
    if (appState.difficulty === "hard") return { duration: 35, max: 22, ops: ["+", "-", "*"] };
    if (appState.difficulty === "chaos") return { duration: 30, max: 28, ops: ["+", "-", "*"] };
    return { duration: 40, max: 18, ops: ["+", "-", "*"] };
  }

  function shuffle(values) {
    return values
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((entry) => entry.value);
  }

  function updateHud() {
    metaEl.textContent = `Time ${timeLeft}s | Streak ${streak} | Correct ${correct}`;
    refreshLevel();
  }

  function renderChoices(choices) {
    optionWrap.innerHTML = "";
    choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "secondary-button";
      button.textContent = String(choice);
      button.style.minHeight = "58px";
      button.addEventListener("click", () => answer(choice));
      optionWrap.appendChild(button);
    });
  }

  function askQuestion() {
    const config = getConfig();
    const a = 1 + Math.floor(Math.random() * config.max);
    const b = 1 + Math.floor(Math.random() * config.max);
    const op = config.ops[Math.floor(Math.random() * config.ops.length)];
    let prompt = "";
    if (op === "+") {
      currentAnswer = a + b;
      prompt = `${a} + ${b}`;
    } else if (op === "-") {
      const hi = Math.max(a, b);
      const lo = Math.min(a, b);
      currentAnswer = hi - lo;
      prompt = `${hi} - ${lo}`;
    } else {
      const x = 1 + Math.floor(Math.random() * Math.max(4, Math.floor(config.max / 2)));
      const y = 2 + Math.floor(Math.random() * 7);
      currentAnswer = x * y;
      prompt = `${x} × ${y}`;
    }
    questionEl.textContent = prompt;
    const choices = new Set([currentAnswer]);
    while (choices.size < 4) {
      const drift = Math.floor(Math.random() * 8) + 1;
      choices.add(Math.max(0, currentAnswer + (Math.random() < 0.5 ? -drift : drift)));
    }
    renderChoices(shuffle([...choices]));
  }

  function finish(status) {
    running = false;
    if (timerId) clearInterval(timerId);
    timerId = null;
    setStatus(status);
    scheduleAutoReset();
  }

  function answer(value) {
    if (!running) return;
    if (value === currentAnswer) {
      correct += 1;
      streak += 1;
      setScore(appState.score + 10 + Math.min(20, streak * 2));
      setStatus("Correct");
    } else {
      streak = 0;
      timeLeft = Math.max(0, timeLeft - 3);
      setStatus("Wrong");
    }
    updateHud();
    askQuestion();
  }

  function resetState() {
    running = false;
    if (timerId) clearInterval(timerId);
    timerId = null;
    timeLeft = getConfig().duration;
    streak = 0;
    correct = 0;
    setScore(0);
    questionEl.textContent = "Press start";
    optionWrap.innerHTML = "";
    updateHud();
  }

  return {
    id: "math",
    title: "Math Blitz",
    tagline: "Fast answer rush",
    subtitle: "A timed quiz sprint where every right answer feeds the streak.",
    description: "Answer quick math questions before the clock runs out. Wrong answers cost time.",
    controls: "Click the correct answer button.",
    levelStep: 60,
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Math Blitz</strong>
            <span class="muted" data-meta>Time 0s | Streak 0 | Correct 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:22px; background:rgba(255,255,255,0.04); display:grid; gap:18px;">
            <div data-question style="font-size:clamp(2rem,4vw,3.4rem); font-weight:800; text-align:center;">Press start</div>
            <div data-options style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px;"></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      questionEl = wrapper.querySelector("[data-question]");
      metaEl = wrapper.querySelector("[data-meta]");
      optionWrap = wrapper.querySelector("[data-options]");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      setStatus("Solve fast");
      askQuestion();
      timerId = window.setInterval(() => {
        if (!running) return;
        timeLeft -= 1;
        updateHud();
        if (timeLeft <= 0) {
          finish(`Time up - ${correct} correct`);
        }
      }, 1000);
    },
    reset() {
      resetState();
      setStatus("Ready");
    },
    destroy() {
      if (timerId) clearInterval(timerId);
      timerId = null;
      running = false;
    },
  };
}

function createTreasureDigGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let stageLevel = 1;
  let boardSize = 5;
  let digsLeft = 0;
  let treasure = { row: 0, col: 0 };
  let revealed = new Set();
  let running = false;

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 4, digs: 7 };
    if (appState.difficulty === "easy") return { size: 5, digs: 8 };
    if (appState.difficulty === "hard") return { size: 6, digs: 8 };
    if (appState.difficulty === "chaos") return { size: 7, digs: 8 };
    return { size: 5, digs: 7 };
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Digs left ${digsLeft} | Found ${appState.score}`;
    refreshLevel();
  }

  function hint(row, col) {
    const distance = Math.abs(row - treasure.row) + Math.abs(col - treasure.col);
    if (distance === 0) return "X";
    if (distance === 1) return "Hot";
    if (distance <= 3) return "Warm";
    return "Cold";
  }

  function renderBoard() {
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${boardSize}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    for (let row = 0; row < boardSize; row += 1) {
      for (let col = 0; col < boardSize; col += 1) {
        const key = `${row},${col}`;
        const button = document.createElement("button");
        button.className = "secondary-button";
        button.style.minHeight = "64px";
        button.style.fontWeight = "700";
        button.textContent = revealed.has(key) ? hint(row, col) : "?";
        button.disabled = !running || revealed.has(key);
        button.addEventListener("click", () => dig(row, col));
        gridEl.appendChild(button);
      }
    }
  }

  function setupStage(level, preserveScore = false) {
    stageLevel = level;
    boardSize = getConfig().size + Math.min(2, Math.floor((level - 1) / 3));
    digsLeft = getConfig().digs + Math.max(0, Math.floor((level - 1) / 4));
    treasure = {
      row: Math.floor(Math.random() * boardSize),
      col: Math.floor(Math.random() * boardSize),
    };
    revealed = new Set();
    running = false;
    if (!preserveScore) setScore(0);
    updateHud();
    renderBoard();
  }

  function dig(row, col) {
    if (!running) return;
    const key = `${row},${col}`;
    if (revealed.has(key)) return;
    revealed.add(key);
    digsLeft -= 1;
    if (row === treasure.row && col === treasure.col) {
      setScore(appState.score + 1);
      setStatus("Treasure found");
      running = false;
      renderBoard();
      window.setTimeout(() => {
        setupStage(stageLevel + 1, true);
      }, 500);
      return;
    }
    if (digsLeft <= 0) {
      running = false;
      renderBoard();
      setStatus("No digs left");
      scheduleAutoReset();
      return;
    }
    setStatus(hint(row, col));
    updateHud();
    renderBoard();
  }

  return {
    id: "dig",
    title: "Treasure Dig",
    tagline: "Hot and cold grid hunt",
    subtitle: "Dig across the board, read the heat, and find the treasure before the shovel runs out.",
    description: "Click tiles to hunt for hidden treasure with hot-and-cold clues. Each find advances the stage.",
    controls: "Click a tile to dig there.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Treasure Dig</strong>
            <span class="muted" data-meta>Stage 1 | Digs left 0 | Found 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04); display:grid; gap:14px;">
            <div data-grid></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      renderBoard();
      setStatus("Start digging");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
    },
  };
}

function createRouteRecallGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let stageLevel = 1;
  let running = false;
  let showing = false;
  let sequence = [];
  let inputIndex = 0;
  let cells = [];
  let timeouts = [];

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 3, flash: 680 };
    if (appState.difficulty === "easy") return { size: 3, flash: 560 };
    if (appState.difficulty === "hard") return { size: 4, flash: 410 };
    if (appState.difficulty === "chaos") return { size: 4, flash: 320 };
    return { size: 3, flash: 470 };
  }

  function clearSequenceTimers() {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    timeouts = [];
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Sequence ${sequence.length} | Input ${inputIndex}/${sequence.length}`;
    refreshLevel();
  }

  function renderGrid() {
    const size = getConfig().size;
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    cells = [];
    for (let index = 0; index < size * size; index += 1) {
      const button = document.createElement("button");
      button.className = "secondary-button";
      button.style.aspectRatio = "1 / 1";
      button.style.minHeight = "72px";
      button.textContent = "";
      button.addEventListener("click", () => press(index));
      cells.push(button);
      gridEl.appendChild(button);
    }
  }

  function flash(index, active) {
    const button = cells[index];
    if (!button) return;
    button.style.background = active ? "rgba(125, 211, 252, 0.55)" : "";
    button.style.transform = active ? "scale(0.98)" : "";
  }

  function startStage() {
    clearSequenceTimers();
    running = true;
    showing = true;
    inputIndex = 0;
    sequence = Array.from({ length: 2 + stageLevel }, () => Math.floor(Math.random() * cells.length));
    updateHud();
    sequence.forEach((value, index) => {
      const showAt = index * getConfig().flash * 1.25;
      timeouts.push(window.setTimeout(() => flash(value, true), showAt));
      timeouts.push(window.setTimeout(() => flash(value, false), showAt + getConfig().flash));
    });
    timeouts.push(
      window.setTimeout(() => {
        showing = false;
        setStatus("Repeat the path");
        updateHud();
      }, sequence.length * getConfig().flash * 1.25 + 60),
    );
  }

  function press(index) {
    if (!running || showing) return;
    flash(index, true);
    window.setTimeout(() => flash(index, false), 120);
    if (sequence[inputIndex] !== index) {
      running = false;
      setStatus("Wrong square");
      scheduleAutoReset();
      return;
    }
    inputIndex += 1;
    setScore(appState.score + 5);
    updateHud();
    if (inputIndex >= sequence.length) {
      stageLevel += 1;
      running = false;
      setStatus("Sequence cleared");
      window.setTimeout(() => {
        startStage();
      }, 450);
    }
  }

  function resetState() {
    clearSequenceTimers();
    stageLevel = 1;
    running = false;
    showing = false;
    sequence = [];
    inputIndex = 0;
    setScore(0);
    renderGrid();
    updateHud();
  }

  return {
    id: "recall",
    title: "Route Recall",
    tagline: "Remember the flashing path",
    subtitle: "A grid-memory challenge that stretches the route longer every stage.",
    description: "Watch the squares flash, then click them back in the same order.",
    controls: "Click the squares in the same order they flashed.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Route Recall</strong>
            <span class="muted" data-meta>Stage 1 | Sequence 0 | Input 0/0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04); display:grid; gap:14px;">
            <div data-grid></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      resetState();
    },
    start() {
      if (running || showing) return;
      clearAutoReset();
      setStatus("Watch closely");
      startStage();
    },
    reset() {
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      showing = false;
      clearSequenceTimers();
    },
  };
}

function createRhythmRowsGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let notes = [];
  let spawnTimer = 0;
  let lives = 3;
  let combo = 0;
  let timeLeft = 0;
  const laneKeys = {
    a: 0,
    A: 0,
    s: 1,
    S: 1,
    d: 2,
    D: 2,
    f: 3,
    F: 3,
  };

  function getConfig() {
    if (appState.difficulty === "chill") return { spawn: 860, speed: 240, lives: 5, duration: 42, window: 24 };
    if (appState.difficulty === "easy") return { spawn: 760, speed: 280, lives: 4, duration: 40, window: 22 };
    if (appState.difficulty === "hard") return { spawn: 560, speed: 360, lives: 3, duration: 34, window: 18 };
    if (appState.difficulty === "chaos") return { spawn: 480, speed: 410, lives: 2, duration: 30, window: 15 };
    return { spawn: 650, speed: 320, lives: 3, duration: 36, window: 20 };
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.combo.textContent = `Combo ${combo}`;
    shell.hud.time.textContent = `Time ${Math.max(0, timeLeft).toFixed(1)}s`;
    refreshLevel();
  }

  function resetState() {
    running = false;
    notes = [];
    spawnTimer = 0;
    lives = getConfig().lives;
    combo = 0;
    timeLeft = getConfig().duration;
    setScore(0);
    updateHud();
    draw();
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function hitLane(lane) {
    if (!running) return;
    const hitLine = 340;
    const windowSize = getConfig().window;
    const targetIndex = notes.findIndex((note) => note.lane === lane && Math.abs(note.y - hitLine) <= windowSize);
    if (targetIndex >= 0) {
      notes.splice(targetIndex, 1);
      combo += 1;
      setScore(appState.score + 8 + Math.min(24, combo));
      setStatus("Hit");
    } else {
      combo = 0;
      lives -= 1;
      setStatus("Miss");
      if (lives <= 0) {
        finish(`Dropped the beat at ${appState.score} points`);
        return;
      }
    }
    updateHud();
  }

  function update(delta) {
    if (!running) return;
    timeLeft -= delta / 1000;
    if (timeLeft <= 0) {
      finish(`Track clear - ${appState.score} points`);
      return;
    }
    spawnTimer += delta;
    while (spawnTimer >= getConfig().spawn) {
      spawnTimer -= getConfig().spawn;
      notes.push({ lane: Math.floor(Math.random() * 4), y: -18 });
    }
    notes.forEach((note) => {
      note.y += getConfig().speed * (delta / 1000);
    });
    notes = notes.filter((note) => {
      if (note.y > 390) {
        combo = 0;
        lives -= 1;
        setStatus("Late miss");
        return false;
      }
      return true;
    });
    if (lives <= 0) {
      finish(`Dropped the beat at ${appState.score} points`);
      return;
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 520, 400);
    ctx.fillStyle = "#08111d";
    ctx.fillRect(0, 0, 520, 400);
    const laneWidth = 130;
    for (let lane = 0; lane < 4; lane += 1) {
      ctx.fillStyle = lane % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)";
      ctx.fillRect(lane * laneWidth + 2, 0, laneWidth - 4, 400);
    }
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(0, 336, 520, 6);
    notes.forEach((note) => {
      ctx.fillStyle = ["#f472b6", "#60a5fa", "#facc15", "#34d399"][note.lane];
      ctx.fillRect(note.lane * laneWidth + 18, note.y, laneWidth - 36, 18);
    });
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "700 18px Trebuchet MS";
    ["A", "S", "D", "F"].forEach((label, lane) => {
      ctx.fillText(label, lane * laneWidth + 58, 374);
    });

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, 520, 400);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 28px Trebuchet MS";
      ctx.fillText("Rhythm Rows", 260, 178);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Hit notes with A S D F as they reach the line", 260, 206);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    if (!frame.last) frame.last = timestamp;
    const delta = Math.min(32, timestamp - frame.last);
    frame.last = timestamp;
    animationId = requestAnimationFrame(frame);
    update(delta);
    draw();
  }

  return {
    id: "rhythm",
    title: "Rhythm Rows",
    tagline: "Tiny four-lane note game",
    subtitle: "Hit falling notes on time and keep the combo alive.",
    description: "A simple rhythm game with four lanes, escalating note speed, and combo scoring.",
    controls: "Hit lanes with A, S, D, and F.",
    levelStep: 90,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "combo", label: "Combo 0" },
          { id: "time", label: "Time 0.0s" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 520;
      shell.canvas.height = 400;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      frame.last = 0;
      running = true;
      setStatus("Find the rhythm");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      frame.last = 0;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (laneKeys[event.key] !== undefined) {
        hitLane(laneKeys[event.key]);
      }
    },
  };
}

function createTileTrailGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let stageLevel = 1;
  let running = false;
  let board = [];
  let size = 4;
  let player = { row: 0, col: 0 };
  let painted = new Set();
  let walkable = 0;
  let movesLeft = 0;

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 4, holes: 1, extraMoves: 5 };
    if (appState.difficulty === "easy") return { size: 4, holes: 2, extraMoves: 4 };
    if (appState.difficulty === "hard") return { size: 5, holes: 4, extraMoves: 3 };
    if (appState.difficulty === "chaos") return { size: 6, holes: 6, extraMoves: 2 };
    return { size: 5, holes: 3, extraMoves: 4 };
  }

  function keyFor(row, col) {
    return `${row},${col}`;
  }

  function connected(candidate) {
    const queue = [[0, 0]];
    const seen = new Set([keyFor(0, 0)]);
    while (queue.length) {
      const [row, col] = queue.shift();
      [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
      ].forEach(([nextRow, nextCol]) => {
        if (!candidate[nextRow]?.[nextCol] || candidate[nextRow][nextCol] === "#") return;
        const key = keyFor(nextRow, nextCol);
        if (seen.has(key)) return;
        seen.add(key);
        queue.push([nextRow, nextCol]);
      });
    }
    let total = 0;
    candidate.forEach((row) => row.forEach((cell) => {
      if (cell !== "#") total += 1;
    }));
    return seen.size === total;
  }

  function buildBoard(level) {
    const config = getConfig();
    size = config.size + Math.min(1, Math.floor((level - 1) / 4));
    let candidate;
    do {
      candidate = Array.from({ length: size }, () => Array.from({ length: size }, () => "."));
      const totalHoles = Math.min(size * size - 2, config.holes + Math.floor((level - 1) / 2));
      let placed = 0;
      while (placed < totalHoles) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if ((row === 0 && col === 0) || candidate[row][col] === "#") continue;
        candidate[row][col] = "#";
        placed += 1;
      }
    } while (!connected(candidate));
    board = candidate;
    player = { row: 0, col: 0 };
    painted = new Set([keyFor(0, 0)]);
    walkable = board.flat().filter((cell) => cell !== "#").length;
    movesLeft = walkable + getConfig().extraMoves;
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Painted ${painted.size}/${walkable} | Moves ${movesLeft}`;
    refreshLevel();
  }

  function renderBoard() {
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const tile = document.createElement("div");
        tile.style.aspectRatio = "1 / 1";
        tile.style.borderRadius = "16px";
        tile.style.display = "grid";
        tile.style.placeItems = "center";
        tile.style.fontWeight = "800";
        tile.style.border = "1px solid rgba(255,255,255,0.08)";
        if (cell === "#") {
          tile.style.background = "rgba(0,0,0,0.4)";
          tile.textContent = "";
        } else if (player.row === rowIndex && player.col === colIndex) {
          tile.style.background = "rgba(96, 165, 250, 0.45)";
          tile.textContent = "P";
        } else if (painted.has(keyFor(rowIndex, colIndex))) {
          tile.style.background = "rgba(250, 204, 21, 0.35)";
          tile.textContent = "";
        } else {
          tile.style.background = "rgba(255,255,255,0.05)";
          tile.textContent = "";
        }
        gridEl.appendChild(tile);
      });
    });
  }

  function setupStage(level, preserveScore = false) {
    stageLevel = level;
    buildBoard(level);
    running = false;
    if (!preserveScore) setScore(0);
    updateHud();
    renderBoard();
  }

  function move(dx, dy) {
    if (!running) return;
    const nextRow = player.row + dy;
    const nextCol = player.col + dx;
    if (!board[nextRow]?.[nextCol] || board[nextRow][nextCol] === "#") return;
    player = { row: nextRow, col: nextCol };
    painted.add(keyFor(nextRow, nextCol));
    movesLeft -= 1;
    if (painted.size >= walkable) {
      setScore(appState.score + 1);
      running = false;
      setStatus("Trail complete");
      renderBoard();
      window.setTimeout(() => {
        setupStage(stageLevel + 1, true);
      }, 450);
      return;
    }
    if (movesLeft <= 0) {
      running = false;
      setStatus("Out of moves");
      renderBoard();
      scheduleAutoReset();
      return;
    }
    setStatus("Keep painting");
    updateHud();
    renderBoard();
  }

  return {
    id: "trail",
    title: "Tile Trail",
    tagline: "Paint the board",
    subtitle: "Walk the grid, cover the tiles, and budget your pathing.",
    description: "Move across the board to paint every safe tile before you run out of moves.",
    controls: "Use arrow keys or WASD to move one tile at a time.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Tile Trail</strong>
            <span class="muted" data-meta>Stage 1 | Painted 0/0 | Moves 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04); display:grid; gap:14px;">
            <div data-grid></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      renderBoard();
      setStatus("Paint the board");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) move(-1, 0);
      if (["ArrowRight", "d", "D"].includes(event.key)) move(1, 0);
      if (["ArrowUp", "w", "W"].includes(event.key)) move(0, -1);
      if (["ArrowDown", "s", "S"].includes(event.key)) move(0, 1);
    },
  };
}

function createJetpackGapGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let player;
  let walls = [];
  let spawnTimer = 0;
  let stageLevel = 1;
  const keys = { thrust: false };

  function getConfig() {
    if (appState.difficulty === "chill") return { gap: 168, speed: 165, gravity: 540, thrust: -760 };
    if (appState.difficulty === "easy") return { gap: 154, speed: 182, gravity: 590, thrust: -800 };
    if (appState.difficulty === "hard") return { gap: 122, speed: 228, gravity: 680, thrust: -900 };
    if (appState.difficulty === "chaos") return { gap: 108, speed: 252, gravity: 730, thrust: -950 };
    return { gap: 138, speed: 202, gravity: 630, thrust: -850 };
  }

  function getRunConfig() {
    const base = getConfig();
    return {
      gap: Math.max(90, base.gap - (stageLevel - 1) * 4),
      speed: base.speed + (stageLevel - 1) * 12,
      gravity: base.gravity + (stageLevel - 1) * 18,
      thrust: base.thrust - (stageLevel - 1) * 8,
    };
  }

  function updateHud() {
    const config = getRunConfig();
    shell.hud.score.textContent = `Score ${appState.score}`;
    shell.hud.gap.textContent = `Gap ${Math.round(config.gap)}`;
    shell.hud.speed.textContent = `Level ${stageLevel} • ${Math.round(config.speed)}`;
    refreshLevel();
  }

  function resetState() {
    running = false;
    player = { x: 120, y: 190, vy: 0 };
    walls = [];
    spawnTimer = 0;
    stageLevel = 1;
    setScore(0);
    updateHud();
    draw();
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function update(delta) {
    if (!running) return;
    stageLevel = 1 + Math.floor(appState.score / 4);
    const config = getRunConfig();
    player.vy += config.gravity * (delta / 1000);
    if (keys.thrust) {
      player.vy += config.thrust * (delta / 1000);
    }
    player.y += player.vy * (delta / 1000);
    spawnTimer += delta;
    const spawnMs = Math.max(680, 1100 - (stageLevel - 1) * 35);
    while (spawnTimer >= spawnMs) {
      spawnTimer -= spawnMs;
      walls.push({
        x: 700,
        gapY: 90 + Math.random() * 180,
        passed: false,
      });
    }
    walls.forEach((wall) => {
      wall.x -= config.speed * (delta / 1000);
      if (!wall.passed && wall.x < player.x) {
        wall.passed = true;
        setScore(appState.score + 1);
      }
      const topHeight = wall.gapY - config.gap / 2;
      const bottomY = wall.gapY + config.gap / 2;
      const collides =
        player.x + 14 > wall.x &&
        player.x - 14 < wall.x + 52 &&
        (player.y - 14 < topHeight || player.y + 14 > bottomY);
      if (collides) {
        finish(`Clipped a wall at ${appState.score}`);
      }
    });
    walls = walls.filter((wall) => wall.x > -60);
    if (player.y < 12 || player.y > 348) {
      finish(`Lost the lane at ${appState.score}`);
      return;
    }
    updateHud();
  }

  function draw() {
    const config = getRunConfig();
    ctx.clearRect(0, 0, 720, 360);
    const bg = ctx.createLinearGradient(0, 0, 720, 360);
    bg.addColorStop(0, "#0f172a");
    bg.addColorStop(1, "#1d4ed8");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 720, 360);
    walls.forEach((wall) => {
      const topHeight = wall.gapY - config.gap / 2;
      const bottomY = wall.gapY + config.gap / 2;
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(wall.x, 0, 52, topHeight);
      ctx.fillRect(wall.x, bottomY, 52, 360 - bottomY);
    });
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(player.x, player.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fb923c";
    ctx.fillRect(player.x - 16, player.y - 6, 8, 12);
    if (keys.thrust && running) {
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.moveTo(player.x - 18, player.y + 8);
      ctx.lineTo(player.x - 34, player.y);
      ctx.lineTo(player.x - 18, player.y - 8);
      ctx.closePath();
      ctx.fill();
    }
    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, 720, 360);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 30px Trebuchet MS";
      ctx.fillText("Jetpack Gap", 360, 164);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Hold thrust to stay inside the moving gaps", 360, 194);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    if (!frame.last) frame.last = timestamp;
    const delta = Math.min(32, timestamp - frame.last);
    frame.last = timestamp;
    animationId = requestAnimationFrame(frame);
    update(delta);
    draw();
  }

  return {
    id: "jetpack",
    title: "Jetpack Gap",
    tagline: "Hold thrust, stay in the lane",
    subtitle: "A tiny side-scroller where you feather the lift and slip through wall gaps.",
    description: "Use thrust to float up and ease off to fall, threading the jetpack runner through each gap.",
    controls: "Hold Space, W, or Up to thrust upward.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "score", label: "Score 0" },
          { id: "gap", label: "Gap 0" },
          { id: "speed", label: "Speed 0" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 720;
      shell.canvas.height = 360;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      frame.last = 0;
      running = true;
      setStatus("Feather the thrust");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      frame.last = 0;
      keys.thrust = false;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowUp", "w", "W", " "].includes(event.key)) keys.thrust = true;
    },
    onKeyUp(event) {
      if (["ArrowUp", "w", "W", " "].includes(event.key)) keys.thrust = false;
    },
  };
}

function createRouteMemoryButton(label) {
  const button = document.createElement("button");
  button.className = "secondary-button";
  button.style.aspectRatio = "1 / 1";
  button.style.minHeight = "72px";
  button.textContent = label;
  return button;
}

function createTargetOrZoneColor(index) {
  return ["#f472b6", "#60a5fa", "#facc15", "#34d399"][index % 4];
}

function createColorGatesGame() {
  let shell;
  let ctx;
  let running = false;
  let animationId = null;
  let lane = 1;
  let colorIndex = 0;
  let gates = [];
  let spawnTimer = 0;
  let lives = 3;

  function getConfig() {
    if (appState.difficulty === "chill") return { speed: 160, spawn: 1250, lives: 4 };
    if (appState.difficulty === "easy") return { speed: 182, spawn: 1130, lives: 4 };
    if (appState.difficulty === "hard") return { speed: 232, spawn: 920, lives: 3 };
    if (appState.difficulty === "chaos") return { speed: 260, spawn: 820, lives: 2 };
    return { speed: 206, spawn: 1020, lives: 3 };
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.lane.textContent = `Lane ${lane + 1}`;
    shell.hud.color.textContent = `Color ${["Pink", "Blue", "Gold"][colorIndex]}`;
    refreshLevel();
  }

  function resetState() {
    running = false;
    lane = 1;
    colorIndex = 0;
    gates = [];
    spawnTimer = 0;
    lives = getConfig().lives;
    setScore(0);
    updateHud();
    draw();
  }

  function finish(status) {
    running = false;
    setStatus(status);
    scheduleAutoReset();
  }

  function update(delta) {
    if (!running) return;
    spawnTimer += delta;
    while (spawnTimer >= getConfig().spawn) {
      spawnTimer -= getConfig().spawn;
      gates.push({ y: -28, safeLane: Math.floor(Math.random() * 3), colorIndex: Math.floor(Math.random() * 3), passed: false });
    }
    gates.forEach((gate) => {
      gate.y += getConfig().speed * (delta / 1000);
      if (!gate.passed && gate.y > 290) {
        gate.passed = true;
        if (gate.safeLane === lane && gate.colorIndex === colorIndex) {
          setScore(appState.score + 1);
          setStatus("Matched");
        } else {
          lives -= 1;
          setStatus("Wrong gate");
        }
      }
    });
    gates = gates.filter((gate) => gate.y < 420);
    if (lives <= 0) {
      finish(`Gate jam at ${appState.score}`);
      return;
    }
    updateHud();
  }

  function draw() {
    ctx.clearRect(0, 0, 540, 420);
    ctx.fillStyle = "#08111d";
    ctx.fillRect(0, 0, 540, 420);
    const laneWidth = 180;
    for (let index = 0; index < 3; index += 1) {
      ctx.fillStyle = index % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)";
      ctx.fillRect(index * laneWidth, 0, laneWidth, 420);
    }

    gates.forEach((gate) => {
      const gateColor = ["#f472b6", "#60a5fa", "#facc15"][gate.colorIndex];
      for (let gateLane = 0; gateLane < 3; gateLane += 1) {
        if (gateLane === gate.safeLane) continue;
        ctx.fillStyle = gateColor;
        ctx.fillRect(gateLane * laneWidth + 10, gate.y, laneWidth - 20, 24);
      }
    });

    ctx.fillStyle = ["#f472b6", "#60a5fa", "#facc15"][colorIndex];
    ctx.beginPath();
    ctx.arc(laneWidth * lane + laneWidth / 2, 360, 26, 0, Math.PI * 2);
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, 540, 420);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 28px Trebuchet MS";
      ctx.fillText("Color Gates", 270, 190);
      ctx.font = "18px Trebuchet MS";
      ctx.fillText("Match both the safe lane and the gate color", 270, 220);
    }
  }

  function frame(timestamp) {
    if (!running) {
      draw();
      return;
    }
    if (!frame.last) frame.last = timestamp;
    const delta = Math.min(32, timestamp - frame.last);
    frame.last = timestamp;
    animationId = requestAnimationFrame(frame);
    update(delta);
    draw();
  }

  return {
    id: "gates",
    title: "Color Gates",
    tagline: "Lane and color match",
    subtitle: "A tiny reflex game where both your lane and color choice matter.",
    description: "Shift between three lanes and cycle your color so you pass through the right gate each time.",
    controls: "Left and Right change lane. Space cycles color.",
    levelStep: 5,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "lane", label: "Lane 2" },
          { id: "color", label: "Color Pink" },
        ],
      });
      stage.appendChild(shell.wrap);
      shell.canvas.width = 540;
      shell.canvas.height = 420;
      ctx = shell.canvas.getContext("2d");
      resetState();
    },
    start() {
      if (running) return;
      clearAutoReset();
      frame.last = 0;
      running = true;
      setStatus("Match the gate");
      frame(0);
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      frame.last = 0;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) lane = Math.max(0, lane - 1);
      if (["ArrowRight", "d", "D"].includes(event.key)) lane = Math.min(2, lane + 1);
      if (event.key === " ") colorIndex = (colorIndex + 1) % 3;
      updateHud();
    },
  };
}

function createSlideQuestGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let running = false;
  let stageLevel = 1;
  let size = 4;
  let board = [];
  let moves = 0;

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 3, shuffle: 18 };
    if (appState.difficulty === "easy") return { size: 4, shuffle: 28 };
    if (appState.difficulty === "hard") return { size: 5, shuffle: 46 };
    if (appState.difficulty === "chaos") return { size: 5, shuffle: 62 };
    return { size: 4, shuffle: 36 };
  }

  function blankIndex() {
    return board.indexOf(0);
  }

  function solved() {
    return board.every((value, index) => value === (index + 1) % (size * size));
  }

  function moveBlankBy(dx, dy) {
    const blank = blankIndex();
    const row = Math.floor(blank / size);
    const col = blank % size;
    const nextRow = row + dy;
    const nextCol = col + dx;
    if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) return false;
    const swapIndex = nextRow * size + nextCol;
    [board[blank], board[swapIndex]] = [board[swapIndex], board[blank]];
    return true;
  }

  function shuffleBoard() {
    const config = getConfig();
    size = config.size;
    board = Array.from({ length: size * size }, (_, index) => (index + 1) % (size * size));
    for (let step = 0; step < config.shuffle + stageLevel * 6; step += 1) {
      const moveset = shuffle([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
      moveset.some(([dx, dy]) => moveBlankBy(dx, dy));
    }
    if (solved()) moveBlankBy(-1, 0) || moveBlankBy(0, -1);
  }

  function shuffle(values) {
    return values
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((entry) => entry.value);
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Size ${size}x${size} | Moves ${moves}`;
    refreshLevel();
  }

  function renderBoard() {
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    board.forEach((value, index) => {
      const button = document.createElement("button");
      button.className = "secondary-button";
      button.style.aspectRatio = "1 / 1";
      button.style.minHeight = "62px";
      button.style.fontSize = "1.1rem";
      button.style.fontWeight = "800";
      button.textContent = value ? String(value) : "";
      button.disabled = !running || value === 0;
      button.style.opacity = value === 0 ? "0.25" : "1";
      button.addEventListener("click", () => clickTile(index));
      gridEl.appendChild(button);
    });
  }

  function clickTile(index) {
    if (!running) return;
    const blank = blankIndex();
    const row = Math.floor(index / size);
    const col = index % size;
    const blankRow = Math.floor(blank / size);
    const blankCol = blank % size;
    if (Math.abs(row - blankRow) + Math.abs(col - blankCol) !== 1) return;
    [board[index], board[blank]] = [board[blank], board[index]];
    moves += 1;
    setScore(Math.max(0, stageLevel * 120 - moves * 2));
    if (solved()) {
      running = false;
      setStatus("Puzzle solved");
      renderBoard();
      window.setTimeout(() => setupStage(stageLevel + 1, true), 450);
      return;
    }
    updateHud();
    renderBoard();
  }

  function setupStage(level, preserveScore = false) {
    stageLevel = level;
    moves = 0;
    shuffleBoard();
    running = false;
    if (!preserveScore) setScore(0);
    updateHud();
    renderBoard();
  }

  return {
    id: "slide",
    title: "Slide Quest",
    tagline: "Sliding number puzzle",
    subtitle: "Click tiles into the empty space and restore the board order.",
    description: "A sliding-tile puzzle that grows nastier as the stage count rises.",
    controls: "Click a tile next to the blank space, or use arrow keys to slide.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Slide Quest</strong>
            <span class="muted" data-meta>Stage 1 | Size 0x0 | Moves 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04); display:grid; gap:14px;">
            <div data-grid></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      renderBoard();
      setStatus("Slide the tiles");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
    },
    onKeyDown(event) {
      if (!running) return;
      let moved = false;
      if (event.key === "ArrowLeft") moved = moveBlankBy(1, 0);
      if (event.key === "ArrowRight") moved = moveBlankBy(-1, 0);
      if (event.key === "ArrowUp") moved = moveBlankBy(0, 1);
      if (event.key === "ArrowDown") moved = moveBlankBy(0, -1);
      if (!moved) return;
      if (solved()) {
        running = false;
        setStatus("Puzzle solved");
        renderBoard();
        window.setTimeout(() => setupStage(stageLevel + 1, true), 450);
        return;
      }
      moves += 1;
      setScore(Math.max(0, stageLevel * 120 - moves * 2));
      updateHud();
      renderBoard();
    },
  };
}

function createPipeTwistGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let running = false;
  let stageLevel = 1;
  let size = 5;
  let board = [];
  let source = { row: 0, col: 0 };
  let sink = { row: 0, col: 0 };

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 4 };
    if (appState.difficulty === "easy") return { size: 5 };
    if (appState.difficulty === "hard") return { size: 6 };
    if (appState.difficulty === "chaos") return { size: 7 };
    return { size: 5 };
  }

  function keyFor(row, col) {
    return `${row},${col}`;
  }

  function pathToPieces(path) {
    const map = new Map(path.map(([row, col]) => [keyFor(row, col), true]));
    return Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (!map.has(keyFor(row, col))) {
          return { type: Math.random() < 0.5 ? "straight" : "corner", rotation: Math.floor(Math.random() * 4), locked: false, required: false };
        }
        const index = path.findIndex(([pathRow, pathCol]) => pathRow === row && pathCol === col);
        const prev = path[index - 1];
        const next = path[index + 1];
        if (!prev) return { type: "end", rotation: 1, locked: true, required: true };
        if (!next) return { type: "end", rotation: 3, locked: true, required: true };
        const from = [row - prev[0], col - prev[1]];
        const to = [next[0] - row, next[1] - col];
        const dirs = `${from.join(",")}|${to.join(",")}`;
        if (dirs.includes("0,1") && dirs.includes("0,-1")) return { type: "straight", rotation: 1, locked: false, required: true };
        if (dirs.includes("1,0") && dirs.includes("-1,0")) return { type: "straight", rotation: 0, locked: false, required: true };
        if ((dirs.includes("0,1") && dirs.includes("1,0")) || (dirs.includes("0,-1") && dirs.includes("-1,0"))) return { type: "corner", rotation: 0, locked: false, required: true };
        if ((dirs.includes("0,1") && dirs.includes("-1,0")) || (dirs.includes("0,-1") && dirs.includes("1,0"))) return { type: "corner", rotation: 1, locked: false, required: true };
        if ((dirs.includes("0,-1") && dirs.includes("1,0")) || (dirs.includes("0,1") && dirs.includes("-1,0"))) return { type: "corner", rotation: 2, locked: false, required: true };
        return { type: "corner", rotation: 3, locked: false, required: true };
      }),
    );
  }

  function getDirs(cell) {
    const rotation = ((cell.rotation % 4) + 4) % 4;
    if (cell.type === "straight") return rotation % 2 === 0 ? ["up", "down"] : ["left", "right"];
    if (cell.type === "corner") return [["right", "down"], ["up", "right"], ["left", "up"], ["down", "left"]][rotation];
    if (cell.type === "end") return [["up"], ["right"], ["down"], ["left"]][rotation];
    return [];
  }

  function charFor(cell) {
    const rotation = ((cell.rotation % 4) + 4) % 4;
    if (cell.type === "straight") return rotation % 2 === 0 ? "│" : "─";
    if (cell.type === "corner") return ["┌", "└", "┘", "┐"][rotation];
    return cell.locked && cell === board[source.row][source.col] ? "S" : "E";
  }

  function randomPath() {
    source = { row: Math.floor(Math.random() * size), col: 0 };
    sink = { row: Math.floor(Math.random() * size), col: size - 1 };
    const path = [[source.row, source.col]];
    let row = source.row;
    for (let col = 1; col < size; col += 1) {
      if (Math.random() < 0.55) {
        const targetRow = clamp(row + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2)), 0, size - 1);
        const step = targetRow > row ? 1 : -1;
        while (row !== targetRow) {
          row += step;
          path.push([row, col - 1]);
        }
      }
      path.push([row, col]);
    }
    sink = { row, col: size - 1 };
    return path.filter((entry, index) => index === 0 || entry[0] !== path[index - 1][0] || entry[1] !== path[index - 1][1]);
  }

  function scrambleBoard() {
    size = getConfig().size + Math.min(1, Math.floor((stageLevel - 1) / 3));
    board = pathToPieces(randomPath());
    board[source.row][source.col].rotation = 1;
    board[sink.row][sink.col].rotation = 3;
    board.forEach((row) =>
      row.forEach((cell) => {
        if (!cell.locked) cell.rotation = (cell.rotation + 1 + Math.floor(Math.random() * 3)) % 4;
      }),
    );
  }

  function solved() {
    const queue = [[source.row, source.col]];
    const seen = new Set([keyFor(source.row, source.col)]);
    const opposite = { up: "down", down: "up", left: "right", right: "left" };
    const deltas = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
    while (queue.length) {
      const [row, col] = queue.shift();
      getDirs(board[row][col]).forEach((dir) => {
        const [dy, dx] = deltas[dir];
        const nextRow = row + dy;
        const nextCol = col + dx;
        const next = board[nextRow]?.[nextCol];
        if (!next) return;
        if (!getDirs(next).includes(opposite[dir])) return;
        const key = keyFor(nextRow, nextCol);
        if (seen.has(key)) return;
        seen.add(key);
        queue.push([nextRow, nextCol]);
      });
    }
    if (!seen.has(keyFor(sink.row, sink.col))) return false;
    for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
      for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex += 1) {
        if (board[rowIndex][colIndex].required && !seen.has(keyFor(rowIndex, colIndex))) {
          return false;
        }
      }
    }
    return true;
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Size ${size}x${size} | Score ${appState.score}`;
    refreshLevel();
  }

  function renderBoard() {
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const button = document.createElement("button");
        button.className = "secondary-button";
        button.style.aspectRatio = "1 / 1";
        button.style.minHeight = "58px";
        button.style.fontSize = "1.4rem";
        button.style.fontWeight = "800";
        button.textContent = rowIndex === source.row && colIndex === source.col ? "S" : rowIndex === sink.row && colIndex === sink.col ? "E" : charFor(cell);
        button.disabled = !running || cell.locked;
        button.addEventListener("click", () => rotateCell(rowIndex, colIndex));
        gridEl.appendChild(button);
      });
    });
  }

  function rotateCell(row, col) {
    if (!running || board[row][col].locked) return;
    board[row][col].rotation = (board[row][col].rotation + 1) % 4;
    renderBoard();
    if (solved()) {
      running = false;
      setScore(appState.score + 1);
      setStatus("Pipe connected");
      window.setTimeout(() => setupStage(stageLevel + 1, true), 450);
    }
  }

  function setupStage(level, preserveScore = false) {
    stageLevel = level;
    scrambleBoard();
    running = false;
    if (!preserveScore) setScore(0);
    updateHud();
    renderBoard();
  }

  return {
    id: "pipes",
    title: "Pipe Twist",
    tagline: "Rotate to connect",
    subtitle: "Turn the pipe pieces until the source flows into the sink.",
    description: "Rotate the loose pipe pieces to connect the source on the left to the sink on the right.",
    controls: "Click a pipe tile to rotate it.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Pipe Twist</strong>
            <span class="muted" data-meta>Stage 1 | Size 0x0 | Score 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04); display:grid; gap:14px;">
            <div data-grid></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      renderBoard();
      setStatus("Connect the pipe");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
    },
  };
}

function createGlowGridGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let running = false;
  let stageLevel = 1;
  let hits = 0;
  let misses = 0;
  let combo = 0;
  let cells = [];
  let spawnIntervalId = null;

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 4, target: 8, maxMisses: 5, spawnMs: 900, lifeMs: 1500, simultaneous: 1 };
    if (appState.difficulty === "easy") return { size: 4, target: 10, maxMisses: 4, spawnMs: 820, lifeMs: 1300, simultaneous: 1 };
    if (appState.difficulty === "hard") return { size: 5, target: 13, maxMisses: 3, spawnMs: 620, lifeMs: 1000, simultaneous: 2 };
    if (appState.difficulty === "chaos") return { size: 5, target: 15, maxMisses: 3, spawnMs: 520, lifeMs: 850, simultaneous: 2 };
    return { size: 4, target: 12, maxMisses: 4, spawnMs: 720, lifeMs: 1120, simultaneous: 2 };
  }

  function clearActivity() {
    if (spawnIntervalId) clearInterval(spawnIntervalId);
    spawnIntervalId = null;
    cells.forEach((cell) => {
      if (cell.timeoutId) clearTimeout(cell.timeoutId);
      cell.timeoutId = null;
      cell.active = false;
    });
  }

  function updateHud() {
    const config = getConfig();
    metaEl.textContent = `Stage ${stageLevel} | Hits ${hits}/${config.target + Math.floor((stageLevel - 1) * 2)} | Misses ${misses}/${config.maxMisses} | Combo ${combo}`;
    refreshLevel();
  }

  function renderGrid() {
    const config = getConfig();
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${config.size}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    cells.forEach((cell, index) => {
      const button = document.createElement("button");
      button.className = "secondary-button";
      button.style.minHeight = "62px";
      button.style.borderRadius = "18px";
      button.style.border = "1px solid rgba(255,255,255,0.08)";
      if (cell.active && cell.type === "burst") {
        button.style.background = "linear-gradient(135deg, rgba(255, 103, 80, 0.92), rgba(255, 196, 88, 0.92))";
        button.style.boxShadow = "0 0 24px rgba(255, 132, 90, 0.45)";
        button.textContent = "BURST";
      } else if (cell.active && cell.type === "save") {
        button.style.background = "linear-gradient(135deg, rgba(95, 214, 157, 0.92), rgba(91, 214, 224, 0.92))";
        button.style.boxShadow = "0 0 24px rgba(91, 214, 224, 0.35)";
        button.textContent = "SAVE";
      } else {
        button.style.background = cell.active ? "linear-gradient(135deg, rgba(242, 156, 74, 0.9), rgba(255, 219, 117, 0.9))" : "rgba(255,255,255,0.05)";
        button.style.boxShadow = cell.active ? "0 0 24px rgba(255, 197, 90, 0.45)" : "none";
        button.textContent = cell.active ? "POP" : "";
      }
      button.addEventListener("click", () => tapCell(index));
      gridEl.appendChild(button);
      cell.button = button;
    });
    updateHud();
  }

  function deactivateCell(index, expired = false) {
    const cell = cells[index];
    if (!cell || !cell.active) return;
    if (cell.timeoutId) clearTimeout(cell.timeoutId);
    cell.timeoutId = null;
    cell.active = false;
    cell.type = "normal";
    if (expired && running) {
      combo = 0;
      misses += 1;
      if (misses >= getConfig().maxMisses) {
        running = false;
        clearActivity();
        renderGrid();
        setStatus("Grid slipped away");
        scheduleAutoReset(900);
        return;
      }
    }
    renderGrid();
  }

  function activateCell(index) {
    const config = getConfig();
    const cell = cells[index];
    cell.active = true;
    const roll = Math.random();
    cell.type = roll < 0.16 ? "burst" : roll < 0.3 ? "save" : "normal";
    cell.timeoutId = window.setTimeout(() => deactivateCell(index, true), Math.max(480, config.lifeMs - stageLevel * 24));
  }

  function spawnGlow() {
    if (!running) return;
    const config = getConfig();
    const targetSimultaneous = Math.min(cells.length, config.simultaneous + Math.floor((stageLevel - 1) / 4));
    let activeCount = cells.filter((cell) => cell.active).length;
    while (activeCount < targetSimultaneous) {
      const available = cells.map((cell, index) => ({ cell, index })).filter(({ cell }) => !cell.active);
      if (!available.length) break;
      const choice = available[Math.floor(Math.random() * available.length)];
      activateCell(choice.index);
      activeCount += 1;
    }
    renderGrid();
  }

  function targetHits() {
    return getConfig().target + Math.floor((stageLevel - 1) * 2);
  }

  function getNeighbors(index) {
    const size = getConfig().size;
    const row = Math.floor(index / size);
    const col = index % size;
    return [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ]
      .filter(([nextRow, nextCol]) => nextRow >= 0 && nextCol >= 0 && nextRow < size && nextCol < size)
      .map(([nextRow, nextCol]) => nextRow * size + nextCol);
  }

  function tapCell(index) {
    if (!running) return;
    const cell = cells[index];
    if (!cell?.active) {
      setStatus("Hit the glowing cells");
      return;
    }
    const tappedType = cell.type;
    deactivateCell(index, false);
    combo += 1;
    hits += 1;
    let scoreGain = stageLevel * (8 + Math.min(5, combo));
    if (tappedType === "save") {
      misses = Math.max(0, misses - 1);
      scoreGain += stageLevel * 10;
      setStatus("Saved the grid");
    } else if (tappedType === "burst") {
      let burstHits = 0;
      getNeighbors(index).forEach((neighborIndex) => {
        if (cells[neighborIndex]?.active) {
          deactivateCell(neighborIndex, false);
          burstHits += 1;
        }
      });
      hits += burstHits;
      scoreGain += burstHits * stageLevel * 12;
      setStatus(`Burst chain x${burstHits + 1}`);
    }
    setScore(appState.score + scoreGain);
    if (hits >= targetHits()) {
      running = false;
      clearActivity();
      setStatus("Grid cleared");
      window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
      return;
    }
    spawnGlow();
  }

  function setupStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    hits = 0;
    misses = 0;
    combo = 0;
    clearActivity();
    cells = Array.from({ length: config.size * config.size }, () => ({ active: false, timeoutId: null, button: null, type: "normal" }));
    if (!preserveScore) setScore(0);
    running = false;
    renderGrid();
  }

  return {
    id: "glow",
    title: "Glow Grid",
    tagline: "Click before it fades",
    subtitle: "Pop the bright tiles before they blink out and the misses pile up.",
    description: "A fast reaction game where special burst and save tiles appear alongside normal pops. Chain hits together, trigger bursts, and stop misses from piling up.",
    controls: "Click glowing tiles. BURST clears nearby glows and SAVE reduces misses.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Glow Grid</strong>
            <span class="muted" data-meta>Stage 1 | Hits 0/0 | Misses 0/0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04);">
            <div data-grid></div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      spawnGlow();
      spawnIntervalId = window.setInterval(spawnGlow, Math.max(260, getConfig().spawnMs - stageLevel * 18));
      setStatus("Pop the bright cells");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
      clearActivity();
    },
  };
}

function createRingStopGame() {
  let wrapper;
  let metaEl;
  let targetEl;
  let markerEl;
  let railEl;
  let running = false;
  let stageLevel = 1;
  let hits = 0;
  let failures = 0;
  let position = 0.18;
  let direction = 1;
  let lastTime = 0;
  let frameId = null;
  let targetStart = 0.4;
  let targetWidth = 0.18;

  function getConfig() {
    if (appState.difficulty === "chill") return { speed: 0.32, width: 0.2, needed: 3 };
    if (appState.difficulty === "easy") return { speed: 0.38, width: 0.17, needed: 3 };
    if (appState.difficulty === "hard") return { speed: 0.58, width: 0.12, needed: 4 };
    if (appState.difficulty === "chaos") return { speed: 0.7, width: 0.095, needed: 5 };
    return { speed: 0.48, width: 0.145, needed: 4 };
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Hits ${hits}/${getConfig().needed} | Misses ${failures}`;
    refreshLevel();
  }

  function rollTarget() {
    const config = getConfig();
    targetWidth = Math.max(0.06, config.width - stageLevel * 0.006);
    targetStart = 0.08 + Math.random() * (0.84 - targetWidth);
  }

  function renderMeter() {
    railEl.style.position = "relative";
    railEl.style.height = "28px";
    railEl.style.borderRadius = "999px";
    railEl.style.background = "rgba(255,255,255,0.06)";
    railEl.style.border = "1px solid rgba(255,255,255,0.08)";
    targetEl.style.position = "absolute";
    targetEl.style.top = "3px";
    targetEl.style.bottom = "3px";
    targetEl.style.left = `${targetStart * 100}%`;
    targetEl.style.width = `${targetWidth * 100}%`;
    targetEl.style.borderRadius = "999px";
    targetEl.style.background = "linear-gradient(135deg, rgba(95, 214, 157, 0.95), rgba(56, 182, 255, 0.9))";
    markerEl.style.position = "absolute";
    markerEl.style.top = "-4px";
    markerEl.style.width = "18px";
    markerEl.style.height = "36px";
    markerEl.style.borderRadius = "999px";
    markerEl.style.background = "linear-gradient(135deg, rgba(250, 121, 86, 0.95), rgba(255, 207, 107, 0.95))";
    markerEl.style.left = `calc(${position * 100}% - 9px)`;
  }

  function loop(timestamp) {
    if (!running) return;
    const config = getConfig();
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min(32, timestamp - lastTime) / 1000;
    lastTime = timestamp;
    position += direction * (config.speed + stageLevel * 0.02) * dt;
    if (position >= 0.99) {
      position = 0.99;
      direction = -1;
    } else if (position <= 0.01) {
      position = 0.01;
      direction = 1;
    }
    renderMeter();
    frameId = window.requestAnimationFrame(loop);
  }

  function setupStage(level, preserveScore = false) {
    stageLevel = level;
    hits = 0;
    failures = 0;
    running = false;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = null;
    lastTime = 0;
    position = 0.18;
    direction = 1;
    rollTarget();
    if (!preserveScore) setScore(0);
    updateHud();
    renderMeter();
  }

  function attempt() {
    if (!running) return;
    const inZone = position >= targetStart && position <= targetStart + targetWidth;
    if (inZone) {
      hits += 1;
      setScore(appState.score + stageLevel * 25);
      if (hits >= getConfig().needed) {
        running = false;
        if (frameId) cancelAnimationFrame(frameId);
        frameId = null;
        setStatus("Perfect timing");
        window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
        return;
      }
      setStatus("Nice hit");
    } else {
      failures += 1;
      hits = Math.max(0, hits - 1);
      setStatus("Missed the zone");
    }
    rollTarget();
    updateHud();
    renderMeter();
  }

  return {
    id: "ring",
    title: "Ring Stop",
    tagline: "Stop in the zone",
    subtitle: "Freeze the moving marker inside the sweet spot and string enough clean hits together.",
    description: "A timing game where a marker sweeps across the rail. Stop it inside the target zone enough times to clear each stage.",
    controls: "Press Space or click Lock It to stop the marker.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Ring Stop</strong>
            <span class="muted" data-meta>Stage 1 | Hits 0/0 | Misses 0</span>
          </div>
          <div style="display:grid; gap:16px; border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:20px; background:rgba(255,255,255,0.04);">
            <div data-rail>
              <div data-target></div>
              <div data-marker></div>
            </div>
            <button class="primary-button" data-lock>Lock It</button>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      railEl = wrapper.querySelector("[data-rail]");
      targetEl = wrapper.querySelector("[data-target]");
      markerEl = wrapper.querySelector("[data-marker]");
      wrapper.querySelector("[data-lock]").addEventListener("click", attempt);
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      lastTime = 0;
      frameId = window.requestAnimationFrame(loop);
      setStatus("Stop inside the zone");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
    },
    onKeyDown(event) {
      if (event.key === " ") {
        attempt();
      }
    },
  };
}

function createLaserLockGame() {
  let wrapper;
  let metaEl;
  let boardWrapEl;
  let running = false;
  let stageLevel = 1;
  let moves = 0;
  let size = 4;
  let board = [];

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 4, scrambles: 4 };
    if (appState.difficulty === "easy") return { size: 4, scrambles: 5 };
    if (appState.difficulty === "hard") return { size: 5, scrambles: 7 };
    if (appState.difficulty === "chaos") return { size: 6, scrambles: 9 };
    return { size: 5, scrambles: 6 };
  }

  function toggleRow(row) {
    board[row] = board[row].map((cell) => !cell);
  }

  function toggleCol(col) {
    for (let row = 0; row < size; row += 1) {
      board[row][col] = !board[row][col];
    }
  }

  function solved() {
    return board.every((row) => row.every(Boolean));
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Size ${size}x${size} | Moves ${moves}`;
    refreshLevel();
  }

  function renderBoard() {
    boardWrapEl.innerHTML = "";
    const columnBar = document.createElement("div");
    columnBar.style.display = "grid";
    columnBar.style.gridTemplateColumns = `80px repeat(${size}, minmax(0, 1fr))`;
    columnBar.style.gap = "10px";
    columnBar.style.marginBottom = "10px";
    const spacer = document.createElement("div");
    spacer.textContent = "Cols";
    spacer.className = "muted";
    columnBar.appendChild(spacer);
    for (let col = 0; col < size; col += 1) {
      const button = document.createElement("button");
      button.className = "mini-button";
      button.textContent = `C${col + 1}`;
      button.disabled = !running;
      button.addEventListener("click", () => handleColumn(col));
      columnBar.appendChild(button);
    }
    boardWrapEl.appendChild(columnBar);

    board.forEach((row, rowIndex) => {
      const rowEl = document.createElement("div");
      rowEl.style.display = "grid";
      rowEl.style.gridTemplateColumns = `80px repeat(${size}, minmax(0, 1fr))`;
      rowEl.style.gap = "10px";
      rowEl.style.marginBottom = "10px";
      const toggle = document.createElement("button");
      toggle.className = "mini-button";
      toggle.textContent = `R${rowIndex + 1}`;
      toggle.disabled = !running;
      toggle.addEventListener("click", () => handleRow(rowIndex));
      rowEl.appendChild(toggle);
      row.forEach((cell) => {
        const tile = document.createElement("div");
        tile.style.minHeight = "52px";
        tile.style.borderRadius = "16px";
        tile.style.border = "1px solid rgba(255,255,255,0.08)";
        tile.style.background = cell ? "linear-gradient(135deg, rgba(99, 214, 146, 0.95), rgba(91, 214, 224, 0.95))" : "rgba(255,255,255,0.05)";
        rowEl.appendChild(tile);
      });
      boardWrapEl.appendChild(rowEl);
    });
    updateHud();
  }

  function handleRow(row) {
    if (!running) return;
    toggleRow(row);
    moves += 1;
    renderBoard();
    if (solved()) {
      running = false;
      setScore(appState.score + Math.max(20, stageLevel * 50 - moves * 2));
      setStatus("Laser grid aligned");
      window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
    }
  }

  function handleColumn(col) {
    if (!running) return;
    toggleCol(col);
    moves += 1;
    renderBoard();
    if (solved()) {
      running = false;
      setScore(appState.score + Math.max(20, stageLevel * 50 - moves * 2));
      setStatus("Laser grid aligned");
      window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
    }
  }

  function setupStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    size = Math.min(config.size + Math.floor((stageLevel - 1) / 4), 7);
    board = Array.from({ length: size }, () => Array.from({ length: size }, () => true));
    for (let turn = 0; turn < config.scrambles + stageLevel; turn += 1) {
      if (Math.random() < 0.5) toggleRow(Math.floor(Math.random() * size));
      else toggleCol(Math.floor(Math.random() * size));
    }
    moves = 0;
    running = false;
    if (solved()) toggleRow(0);
    if (!preserveScore) setScore(0);
    renderBoard();
  }

  return {
    id: "laser",
    title: "Laser Lock",
    tagline: "Toggle rows and columns",
    subtitle: "Line up the entire grid by flipping whole rows and columns back to bright.",
    description: "Every move flips an entire row or column. Turn the whole matrix bright to clear the stage.",
    controls: "Click the row or column buttons to toggle them.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Laser Lock</strong>
            <span class="muted" data-meta>Stage 1 | Size 0x0 | Moves 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04);" data-board></div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      boardWrapEl = wrapper.querySelector("[data-board]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      renderBoard();
      setStatus("Align every beam");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
    },
  };
}

function createSafeStepsGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let stageLevel = 1;
  let rows = 6;
  let cols = 3;
  let safePath = [];
  let progress = 0;
  let running = false;
  let previewing = false;
  let wrongTile = null;
  let previewTimeout = null;

  function getConfig() {
    if (appState.difficulty === "chill") return { rows: 5, cols: 3, previewMs: 2800 };
    if (appState.difficulty === "easy") return { rows: 6, cols: 3, previewMs: 2200 };
    if (appState.difficulty === "hard") return { rows: 7, cols: 4, previewMs: 1500 };
    if (appState.difficulty === "chaos") return { rows: 8, cols: 5, previewMs: 1100 };
    return { rows: 6, cols: 4, previewMs: 1800 };
  }

  function clearPreviewTimer() {
    if (previewTimeout) clearTimeout(previewTimeout);
    previewTimeout = null;
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Row ${Math.min(rows, progress + 1)}/${rows} | Width ${cols}`;
    refreshLevel();
  }

  function renderBoard() {
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const button = document.createElement("button");
        button.className = "secondary-button";
        button.style.minHeight = "58px";
        button.style.borderRadius = "16px";
        const currentRow = rows - 1 - progress;
        const showSafe = previewing || row > currentRow || (row === currentRow && !running);
        if (row > currentRow && col === safePath[row]) {
          button.style.background = "linear-gradient(135deg, rgba(95, 214, 157, 0.95), rgba(62, 193, 211, 0.9))";
          button.textContent = "SAFE";
        } else if (showSafe && col === safePath[row]) {
          button.style.background = "linear-gradient(135deg, rgba(95, 214, 157, 0.8), rgba(62, 193, 211, 0.8))";
          button.textContent = previewing ? "SAFE" : "";
        } else if (wrongTile && wrongTile.row === row && wrongTile.col === col) {
          button.style.background = "linear-gradient(135deg, rgba(245, 92, 92, 0.92), rgba(255, 170, 90, 0.92))";
          button.textContent = "X";
        } else {
          button.style.background = "rgba(255,255,255,0.05)";
          button.textContent = "";
        }
        button.disabled = !running || row !== currentRow;
        button.addEventListener("click", () => chooseTile(row, col));
        gridEl.appendChild(button);
      }
    }
    updateHud();
  }

  function setupStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    rows = config.rows + Math.min(2, Math.floor((stageLevel - 1) / 3));
    cols = config.cols;
    safePath = [];
    for (let row = 0; row < rows; row += 1) {
      if (row === 0) {
        safePath.push(Math.floor(Math.random() * cols));
        continue;
      }
      const drift = Math.floor(Math.random() * 3) - 1;
      safePath.push(clamp(safePath[row - 1] + drift, 0, cols - 1));
    }
    progress = 0;
    running = false;
    previewing = false;
    wrongTile = null;
    clearPreviewTimer();
    if (!preserveScore) setScore(0);
    renderBoard();
  }

  function startPreview() {
    const config = getConfig();
    previewing = true;
    running = false;
    wrongTile = null;
    renderBoard();
    setStatus("Memorize the safe path");
    clearPreviewTimer();
    previewTimeout = window.setTimeout(() => {
      previewing = false;
      running = true;
      renderBoard();
      setStatus("Climb the path");
    }, Math.max(500, config.previewMs - stageLevel * 40));
  }

  function chooseTile(row, col) {
    if (!running) return;
    const currentRow = rows - 1 - progress;
    if (row !== currentRow) return;
    if (col === safePath[row]) {
      progress += 1;
      wrongTile = null;
      setScore(appState.score + stageLevel * 18);
      if (progress >= rows) {
        running = false;
        setStatus("Path cleared");
        window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
        return;
      }
      setStatus("Safe step");
      renderBoard();
      return;
    }
    wrongTile = { row, col };
    running = false;
    renderBoard();
    setStatus("Wrong tile");
    previewTimeout = window.setTimeout(() => startPreview(), 700);
  }

  return {
    id: "steps",
    title: "Safe Steps",
    tagline: "Memorize the path",
    subtitle: "Study the safe route, then climb the board without stepping on the wrong tile.",
    description: "A memory path challenge. Watch the safe route, then click the correct tile in each row from the bottom to the top.",
    controls: "Click one tile per row after the preview disappears.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Safe Steps</strong>
            <span class="muted" data-meta>Stage 1 | Row 1/1 | Width 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04);" data-grid></div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running || previewing) return;
      clearAutoReset();
      startPreview();
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
      previewing = false;
      clearPreviewTimer();
    },
  };
}

function createStormRiderGame() {
  let shell;
  let ctx;
  let frameId = null;
  let running = false;
  let lastTime = 0;
  let stageLevel = 1;
  let player = { x: 210, y: 150, radius: 12 };
  let keys = new Set();
  let storms = [];
  let orb = { x: 200, y: 120, radius: 8 };
  let collected = 0;
  let goal = 5;
  let shields = 3;

  function getConfig() {
    if (appState.difficulty === "chill") return { speed: 150, stormCount: 2, stormSpeed: 72, shields: 4, goal: 4 };
    if (appState.difficulty === "easy") return { speed: 165, stormCount: 3, stormSpeed: 84, shields: 4, goal: 5 };
    if (appState.difficulty === "hard") return { speed: 190, stormCount: 4, stormSpeed: 110, shields: 3, goal: 7 };
    if (appState.difficulty === "chaos") return { speed: 210, stormCount: 5, stormSpeed: 126, shields: 2, goal: 8 };
    return { speed: 178, stormCount: 4, stormSpeed: 96, shields: 3, goal: 6 };
  }

  function randomPoint(radius = 12) {
    return {
      x: radius + Math.random() * (420 - radius * 2),
      y: radius + Math.random() * (300 - radius * 2),
    };
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function spawnStorm() {
    const point = randomPoint(14);
    const angle = Math.random() * Math.PI * 2;
    return {
      ...point,
      radius: 14,
      vx: Math.cos(angle) * (getConfig().stormSpeed + Math.random() * 30 + stageLevel * 3),
      vy: Math.sin(angle) * (getConfig().stormSpeed + Math.random() * 30 + stageLevel * 3),
    };
  }

  function placeOrb() {
    orb = { ...randomPoint(10), radius: 9 };
  }

  function updateHud() {
    shell.hud.stage.textContent = `Stage ${stageLevel}`;
    shell.hud.goal.textContent = `Goal ${collected}/${goal}`;
    shell.hud.shields.textContent = `Shields ${shields}`;
    refreshLevel();
  }

  function draw() {
    ctx.clearRect(0, 0, shell.canvas.width, shell.canvas.height);
    ctx.fillStyle = "rgba(13, 20, 35, 0.92)";
    ctx.fillRect(0, 0, shell.canvas.width, shell.canvas.height);

    ctx.fillStyle = "rgba(82, 220, 248, 0.92)";
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fill();

    storms.forEach((storm) => {
      ctx.fillStyle = "rgba(245, 97, 97, 0.92)";
      ctx.beginPath();
      ctx.arc(storm.x, storm.y, storm.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "rgba(255, 203, 88, 0.95)";
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.radius);
    ctx.lineTo(player.x + player.radius, player.y + player.radius);
    ctx.lineTo(player.x - player.radius, player.y + player.radius);
    ctx.closePath();
    ctx.fill();
  }

  function setupStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    player = { x: 210, y: 150, radius: 12 };
    collected = 0;
    goal = config.goal + Math.floor((stageLevel - 1) * 1.5);
    shields = config.shields;
    storms = Array.from({ length: config.stormCount + Math.min(2, Math.floor((stageLevel - 1) / 3)) }, spawnStorm);
    placeOrb();
    running = false;
    lastTime = 0;
    if (!preserveScore) setScore(0);
    updateHud();
    draw();
  }

  function tick(timestamp) {
    if (!running) return;
    const config = getConfig();
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min(32, timestamp - lastTime) / 1000;
    lastTime = timestamp;

    const dx = (keys.has("ArrowRight") || keys.has("d") ? 1 : 0) - (keys.has("ArrowLeft") || keys.has("a") ? 1 : 0);
    const dy = (keys.has("ArrowDown") || keys.has("s") ? 1 : 0) - (keys.has("ArrowUp") || keys.has("w") ? 1 : 0);
    player.x = clamp(player.x + dx * config.speed * dt, player.radius, shell.canvas.width - player.radius);
    player.y = clamp(player.y + dy * config.speed * dt, player.radius, shell.canvas.height - player.radius);

    storms.forEach((storm) => {
      storm.x += storm.vx * dt;
      storm.y += storm.vy * dt;
      if (storm.x <= storm.radius || storm.x >= shell.canvas.width - storm.radius) storm.vx *= -1;
      if (storm.y <= storm.radius || storm.y >= shell.canvas.height - storm.radius) storm.vy *= -1;
      storm.x = clamp(storm.x, storm.radius, shell.canvas.width - storm.radius);
      storm.y = clamp(storm.y, storm.radius, shell.canvas.height - storm.radius);
      if (distance(storm, player) < storm.radius + player.radius) {
        shields -= 1;
        Object.assign(storm, spawnStorm());
        if (shields <= 0) {
          running = false;
          setStatus("Storm wiped you out");
          window.setTimeout(() => setupStage(1), 800);
          return;
        }
      }
    });
    if (!running) {
      updateHud();
      draw();
      return;
    }

    if (distance(orb, player) < orb.radius + player.radius) {
      collected += 1;
      setScore(appState.score + stageLevel * 14);
      placeOrb();
      if (collected >= goal) {
        running = false;
        setStatus("Storm routed");
        updateHud();
        draw();
        window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
        return;
      }
    }

    updateHud();
    draw();
    frameId = window.requestAnimationFrame(tick);
  }

  return {
    id: "storm",
    title: "Storm Rider",
    tagline: "Collect through the storm",
    subtitle: "Sweep up energy orbs while red storm cores ricochet around the arena.",
    description: "A fast arena dodge game. Steer through the field, collect enough blue orbs, and avoid the red storm cores.",
    controls: "Use arrow keys or WASD to move.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      shell = createCanvasShell({
        hudItems: [
          { id: "stage", label: "Stage 1" },
          { id: "goal", label: "Goal 0/0" },
          { id: "shields", label: "Shields 0" },
        ],
      });
      stage.innerHTML = "";
      stage.appendChild(shell.wrap);
      shell.canvas.width = 420;
      shell.canvas.height = 300;
      ctx = shell.canvas.getContext("2d");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      lastTime = 0;
      setStatus("Collect the blue orbs");
      frameId = window.requestAnimationFrame(tick);
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
      keys.clear();
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
    },
    onKeyDown(event) {
      keys.add(event.key);
    },
    onKeyUp(event) {
      keys.delete(event.key);
    },
  };
}

function createPatternPanicGame() {
  let wrapper;
  let metaEl;
  let sequenceEl;
  let progressEl;
  let timerEl;
  let timerId = null;
  let running = false;
  let stageLevel = 1;
  let sequence = [];
  let index = 0;
  let timeLeft = 0;
  let rule = "forward";
  const symbols = ["←", "↑", "→", "↓"];
  const keyMap = {
    ArrowLeft: "←",
    ArrowUp: "↑",
    ArrowRight: "→",
    ArrowDown: "↓",
    a: "←",
    w: "↑",
    d: "→",
    s: "↓",
  };

  function getConfig() {
    if (appState.difficulty === "chill") return { length: 4, time: 6.4 };
    if (appState.difficulty === "easy") return { length: 5, time: 6 };
    if (appState.difficulty === "hard") return { length: 7, time: 5 };
    if (appState.difficulty === "chaos") return { length: 8, time: 4.4 };
    return { length: 6, time: 5.5 };
  }

  function clearTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Rule ${ruleLabel()} | Input ${index}/${sequence.length} | Time ${timeLeft.toFixed(1)}s`;
    if (progressEl) progressEl.textContent = sequence.map((symbol, symbolIndex) => (symbolIndex < index ? "✓" : symbol)).join(" ");
    if (timerEl) timerEl.textContent = `${timeLeft.toFixed(1)}s`;
    refreshLevel();
  }

  function ruleLabel() {
    if (rule === "reverse") return "Reverse";
    if (rule === "mirror") return "Mirror";
    return "Forward";
  }

  function mirrorSymbol(symbol) {
    if (symbol === "←") return "→";
    if (symbol === "→") return "←";
    if (symbol === "↑") return "↓";
    if (symbol === "↓") return "↑";
    return symbol;
  }

  function expectedSequence() {
    if (rule === "reverse") {
      return [...sequence].reverse();
    }
    if (rule === "mirror") {
      return sequence.map((symbol) => mirrorSymbol(symbol));
    }
    return sequence;
  }

  function renderSequence() {
    if (!sequenceEl) return;
    sequenceEl.textContent = sequence.join(" ");
    updateHud();
  }

  function setupStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    sequence = Array.from({ length: config.length + Math.floor((stageLevel - 1) / 2) }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    if (stageLevel >= 7) rule = "mirror";
    else if (stageLevel >= 4) rule = "reverse";
    else rule = "forward";
    index = 0;
    timeLeft = Math.max(2.5, config.time - stageLevel * 0.08 + sequence.length * 0.18);
    running = false;
    clearTimer();
    if (!preserveScore) setScore(0);
    renderSequence();
  }

  function fail(message) {
    running = false;
    clearTimer();
    setStatus(message);
    window.setTimeout(() => setupStage(Math.max(1, stageLevel)), 700);
  }

  function succeed() {
    running = false;
    clearTimer();
    setScore(appState.score + stageLevel * 28);
    setStatus("Pattern cleared");
    window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
  }

  function input(symbol) {
    if (!running) return;
    const expected = expectedSequence();
    if (expected[index] !== symbol) {
      fail("Wrong input");
      return;
    }
    index += 1;
    updateHud();
    if (index >= sequence.length) {
      succeed();
    }
  }

  function beginTimer() {
    clearTimer();
    timerId = window.setInterval(() => {
      timeLeft = Math.max(0, timeLeft - 0.1);
      updateHud();
      if (timeLeft <= 0) {
        fail("Out of time");
      }
    }, 100);
  }

  return {
    id: "panic",
    title: "Pattern Panic",
    tagline: "Hit the arrow chain",
    subtitle: "Burn through the arrow pattern, then survive the reverse and mirror rule shifts.",
    description: "A twitchy arrow-input game with rule changes as you climb. Early stages are straight, then the sequence flips backward and later mirrors into the opposite directions.",
    controls: "Use arrow keys or WASD, or click the arrow buttons.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Pattern Panic</strong>
            <span class="muted" data-meta>Stage 1 | Rule Forward | Input 0/0 | Time 0.0s</span>
          </div>
          <div style="display:grid; gap:14px; border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:20px; background:rgba(255,255,255,0.04);">
            <div class="info-chip-row">
              <span class="info-chip" data-progress></span>
              <span class="info-chip" data-timer>0.0s</span>
            </div>
            <div style="font-size:2rem; font-weight:800; letter-spacing:0.2rem; text-align:center;" data-sequence></div>
            <div class="action-button-grid">
              <button class="mini-button" data-arrow="←">←</button>
              <button class="mini-button" data-arrow="↑">↑</button>
              <button class="mini-button" data-arrow="→">→</button>
              <button class="mini-button" data-arrow="↓">↓</button>
            </div>
          </div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      sequenceEl = wrapper.querySelector("[data-sequence]");
      progressEl = wrapper.querySelector("[data-progress]");
      timerEl = wrapper.querySelector("[data-timer]");
      wrapper.querySelectorAll("[data-arrow]").forEach((button) => {
        button.addEventListener("click", () => input(button.dataset.arrow));
      });
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      beginTimer();
      updateHud();
      setStatus("Match the pattern");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
      clearTimer();
    },
    onKeyDown(event) {
      const symbol = keyMap[event.key];
      if (symbol) input(symbol);
    },
  };
}

function createSwapSortGame() {
  let wrapper;
  let metaEl;
  let gridEl;
  let running = false;
  let stageLevel = 1;
  let size = 3;
  let moves = 0;
  let selectedIndex = null;
  let tiles = [];

  function getConfig() {
    if (appState.difficulty === "chill") return { size: 3, scrambles: 4 };
    if (appState.difficulty === "easy") return { size: 3, scrambles: 6 };
    if (appState.difficulty === "hard") return { size: 4, scrambles: 10 };
    if (appState.difficulty === "chaos") return { size: 5, scrambles: 14 };
    return { size: 4, scrambles: 8 };
  }

  function solved() {
    return tiles.every((value, index) => value === index + 1);
  }

  function updateHud() {
    metaEl.textContent = `Stage ${stageLevel} | Size ${size}x${size} | Moves ${moves}`;
    refreshLevel();
  }

  function renderBoard() {
    gridEl.innerHTML = "";
    gridEl.style.display = "grid";
    gridEl.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridEl.style.gap = "10px";
    tiles.forEach((value, index) => {
      const button = document.createElement("button");
      button.className = selectedIndex === index ? "primary-button" : "secondary-button";
      button.style.minHeight = "58px";
      button.style.fontWeight = "800";
      button.textContent = String(value);
      button.disabled = !running;
      button.addEventListener("click", () => chooseTile(index));
      gridEl.appendChild(button);
    });
    updateHud();
  }

  function chooseTile(index) {
    if (!running) return;
    if (selectedIndex === null) {
      selectedIndex = index;
      renderBoard();
      return;
    }
    if (selectedIndex === index) {
      selectedIndex = null;
      renderBoard();
      return;
    }
    [tiles[selectedIndex], tiles[index]] = [tiles[index], tiles[selectedIndex]];
    selectedIndex = null;
    moves += 1;
    renderBoard();
    if (solved()) {
      running = false;
      setScore(appState.score + Math.max(30, stageLevel * 60 - moves * 2));
      setStatus("Board sorted");
      window.setTimeout(() => setupStage(stageLevel + 1, true), 420);
    }
  }

  function setupStage(level, preserveScore = false) {
    const config = getConfig();
    stageLevel = level;
    size = Math.min(config.size + Math.floor((stageLevel - 1) / 5), 5);
    tiles = Array.from({ length: size * size }, (_, index) => index + 1);
    for (let turn = 0; turn < config.scrambles + stageLevel * 2; turn += 1) {
      const a = Math.floor(Math.random() * tiles.length);
      let b = Math.floor(Math.random() * tiles.length);
      if (a === b) b = (b + 1) % tiles.length;
      [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
    }
    if (solved()) [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    moves = 0;
    selectedIndex = null;
    running = false;
    if (!preserveScore) setScore(0);
    renderBoard();
  }

  return {
    id: "swap",
    title: "Swap Sort",
    tagline: "Swap tiles into order",
    subtitle: "Trade any two tiles and rebuild the board from lowest to highest.",
    description: "A clean swap puzzle. Pick any two tiles to swap them and sort the whole board into ascending order.",
    controls: "Click one tile, then click another to swap them.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`
        <div class="stack-layout">
          <div class="game-meta">
            <strong>Swap Sort</strong>
            <span class="muted" data-meta>Stage 1 | Size 0x0 | Moves 0</span>
          </div>
          <div style="border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:18px; background:rgba(255,255,255,0.04);" data-grid></div>
        </div>
      `);
      stage.appendChild(wrapper);
      metaEl = wrapper.querySelector("[data-meta]");
      gridEl = wrapper.querySelector("[data-grid]");
      setupStage(1);
    },
    start() {
      if (running) return;
      clearAutoReset();
      running = true;
      renderBoard();
      setStatus("Sort the board");
    },
    reset() {
      setupStage(1);
      setStatus("Ready");
    },
    destroy() {
      running = false;
    },
  };
}

function createDashCubeGame() {
  let shell;
  let ctx;
  let animationId = null;
  let running = false;
  let distance = 0;
  let stageLevel = 1;
  let player;
  let pieces = [];
  let particles = [];
  let spawnTimer = 0;
  let floorY = 298;
  let jumpQueued = false;
  let flashTimer = 0;
  let portalCooldown = 0;
  let speedModifier = 1;
  let coinsCollected = 0;
  let selectedCourseId = "endless";
  let courseSpawnIndex = 0;
  let levelCompleted = false;
  let courseSelect;
  let courseNoteEl;
  let trackInput;
  let trackNoteEl;
  let trackResetButton;
  const courses = {
    endless: {
      id: "endless",
      label: "Endless",
      note: "Random endless run with all mechanics mixed together.",
      sequence: null,
    },
    stereo: {
      id: "stereo",
      label: "Stereo Start",
      note: "An intro course with cube jumps, pads, rings, and basic saw reads.",
      sequence: ["padDuo", "blockOrb", "roofWeave", "padDuo", "sawPad", "doublePair", "tripleRise", "roofWeave", "sawPad", "tripleRise"],
    },
    portal: {
      id: "portal",
      label: "Portal Pulse",
      note: "A fixed route focused on mini, speed, and ship portal transitions.",
      sequence: ["padDuo", "miniMix", "blockOrb", "shipSprintLite", "miniMix", "speedBridge", "shipSprintLite"],
    },
    gravity: {
      id: "gravity",
      label: "Gravity Panic",
      note: "Ceiling dodges, gravity flips, and active upside-down timing.",
      sequence: ["padDuo", "gravityDrop", "gravitySteps", "blockOrb", "gravityDrop", "gravitySteps", "doublePair", "tripleRise"],
    },
    gauntlet: {
      id: "gauntlet",
      label: "Neon Gauntlet",
      note: "The hardest fixed route with speed, gravity, ship, mini, and saw pressure.",
      sequence: ["padDuo", "sawPad", "miniMix", "gravityFlip", "shipSprint", "speedCube", "gravityFlip", "miniMix", "shipSprint", "tripleRise"],
    },
    relay: {
      id: "relay",
      label: "Ring Relay",
      note: "An orb-heavy route with chained pink and yellow ring timing.",
      sequence: ["padDuo", "ringLadder", "blockOrb", "ringLadder", "sawPad", "ringLadder", "tripleRise"],
    },
    skylab: {
      id: "skylab",
      label: "Ship Lab",
      note: "Longer ship control sections with tighter saw spacing and recovery portals.",
      sequence: ["padDuo", "shipTunnel", "doublePair", "shipSprint", "shipTunnel", "speedCube"],
    },
    flux: {
      id: "flux",
      label: "Gravity Flux",
      note: "Repeated gravity swaps with mixed floor and ceiling reads.",
      sequence: ["padDuo", "gravitySteps", "roofWeave", "gravityFlip", "gravitySteps", "doublePair", "tripleRise"],
    },
    resize: {
      id: "resize",
      label: "Size Shift",
      note: "Mini and maxi swaps chained with rings, saws, and block jumps.",
      sequence: ["padDuo", "miniMix", "sizeWeave", "blockOrb", "sizeWeave", "sawPad", "tripleRise"],
    },
    velocity: {
      id: "velocity",
      label: "Velocity Vortex",
      note: "Speed-change sections that keep shifting tempo mid-pattern.",
      sequence: ["padDuo", "speedBridge", "doublePair", "speedCube", "speedBridge", "shipSprint", "tripleRise"],
    },
  };
  const chillCourseReplacements = {
    shipSprint: "padDuo",
    shipTunnel: "blockOrb",
    gravityFlip: "roofWeave",
    gravitySteps: "roofWeave",
    gravityDrop: "gravityFlip",
    speedCube: "doublePair",
    speedBridge: "padDuo",
    sizeWeave: "miniMix",
    sawPad: "padDuo",
  };
  const easyCourseReplacements = {
    shipTunnel: "shipSprint",
    gravitySteps: "gravityFlip",
    gravityDrop: "gravityFlip",
    speedBridge: "doublePair",
  };
  const hardCourseTails = {
    default: ["sawPad"],
    stereo: ["speedCube"],
    portal: ["shipSprint"],
    gravity: ["gravitySteps"],
    gauntlet: ["gravitySteps", "shipSprint"],
    relay: ["speedBridge"],
    skylab: ["shipTunnel"],
    flux: ["gravityFlip", "doublePair"],
    resize: ["sizeWeave"],
    velocity: ["speedBridge", "speedCube"],
  };
  const chaosCourseTails = {
    default: ["speedCube", "gravityFlip"],
    stereo: ["speedBridge", "shipSprint"],
    portal: ["shipTunnel", "gravityFlip"],
    gravity: ["gravitySteps", "shipSprint"],
    gauntlet: ["speedBridge", "gravitySteps", "shipTunnel"],
    relay: ["ringLadder", "speedCube"],
    skylab: ["shipTunnel", "shipSprint"],
    flux: ["gravityFlip", "gravitySteps", "speedCube"],
    resize: ["sizeWeave", "speedBridge"],
    velocity: ["speedBridge", "shipTunnel", "gravityFlip"],
  };

  function getSelectedCourse() {
    return courses[selectedCourseId] || courses.endless;
  }

  function getCourseSequence(course = getSelectedCourse()) {
    if (!course.sequence) return null;
    const baseSequence = [...course.sequence];
    const mode = appState.difficulty;
    if (mode === "chill") {
      return baseSequence
        .map((pattern) => chillCourseReplacements[pattern] || pattern)
        .slice(0, Math.max(4, baseSequence.length - 1));
    }
    if (mode === "easy") {
      return baseSequence.map((pattern) => easyCourseReplacements[pattern] || pattern);
    }
    if (mode === "hard") {
      return [...baseSequence, ...(hardCourseTails[course.id] || hardCourseTails.default)];
    }
    if (mode === "chaos") {
      return [...baseSequence, ...(chaosCourseTails[course.id] || chaosCourseTails.default)];
    }
    return baseSequence;
  }

  function getDifficultySummary() {
    const mode = appState.difficulty;
    if (mode === "chill") return "Chill trims the harshest portal chains and widens the input windows.";
    if (mode === "easy") return "Easy keeps the route recognizable but softens some advanced transitions.";
    if (mode === "hard") return "Hard extends each route and tightens the physics.";
    if (mode === "chaos") return "Chaos adds extra route segments, faster tempo, and harsher timing.";
    return "Normal keeps the base route and standard timing.";
  }

  function updateTrackUi() {
    const track = getCustomTrack("dash");
    if (trackResetButton) trackResetButton.disabled = !track;
    if (trackNoteEl) {
      trackNoteEl.textContent = track
        ? `Custom track loaded: ${track.name}. It will play for Cube Rush in this browser session.`
        : "Built-in synth theme active. If you want the exact Stereo Madness song, load your own local audio file here.";
    }
  }

  function updateCourseUi() {
    const course = getSelectedCourse();
    if (courseSelect) courseSelect.value = selectedCourseId;
    if (courseNoteEl) {
      const sequence = getCourseSequence(course);
      courseNoteEl.textContent = `${course.note} ${getDifficultySummary()}${sequence ? ` Route length: ${sequence.length} segments.` : ""}`;
    }
    updateTrackUi();
  }

  function getConfig() {
    const mode = appState.difficulty;
    if (mode === "chill") return { speed: 4.8, gravity: 0.52, jump: 12.1, orbJump: 10.8, shipGravity: 0.31, shipLift: 5.3, spawn: 124, gap: 100, hitboxInset: 7, ringX: 52, ringY: 60, speedUpDelta: 0.18, speedDownDelta: 0.18, speedCap: 1.6 };
    if (mode === "easy") return { speed: 5.45, gravity: 0.58, jump: 12.45, orbJump: 11, shipGravity: 0.36, shipLift: 5.6, spawn: 112, gap: 88, hitboxInset: 6, ringX: 48, ringY: 56, speedUpDelta: 0.2, speedDownDelta: 0.18, speedCap: 1.68 };
    if (mode === "hard") return { speed: 7.45, gravity: 0.72, jump: 13.15, orbJump: 11.55, shipGravity: 0.5, shipLift: 6.2, spawn: 84, gap: 64, hitboxInset: 3, ringX: 40, ringY: 48, speedUpDelta: 0.25, speedDownDelta: 0.14, speedCap: 1.94 };
    if (mode === "chaos") return { speed: 8.35, gravity: 0.79, jump: 13.45, orbJump: 11.85, shipGravity: 0.56, shipLift: 6.45, spawn: 74, gap: 54, hitboxInset: 2, ringX: 36, ringY: 44, speedUpDelta: 0.28, speedDownDelta: 0.12, speedCap: 2.04 };
    return { speed: 6.3, gravity: 0.65, jump: 12.75, orbJump: 11.2, shipGravity: 0.43, shipLift: 5.9, spawn: 96, gap: 76, hitboxInset: 5, ringX: 44, ringY: 52, speedUpDelta: 0.22, speedDownDelta: 0.16, speedCap: 1.8 };
  }

  function resetPlayer() {
    player = {
      x: 116,
      y: floorY - 34,
      size: 34,
      baseSize: 34,
      scale: 1,
      vy: 0,
      grounded: true,
      angle: 0,
      trail: [],
      form: "cube",
      gravityDir: 1,
    };
  }

  function setPlayerScale(scale) {
    player.scale = scale;
    player.size = Math.round(player.baseSize * scale);
    player.y = clamp(player.y, 18, floorY - player.size);
  }

  function setPlayerForm(form) {
    player.form = form;
    if (form === "cube") {
      player.y =
        player.gravityDir === 1
          ? Math.min(player.y, floorY - player.size)
          : Math.max(player.y, 18);
    }
  }

  function setGravityDirection(direction) {
    player.gravityDir = direction;
    player.grounded = false;
  }

  function resetState() {
    running = false;
    distance = 0;
    stageLevel = 1;
    spawnTimer = 0;
    pieces = [];
    particles = [];
    jumpQueued = false;
    flashTimer = 0;
    portalCooldown = 0;
    speedModifier = 1;
    coinsCollected = 0;
    courseSpawnIndex = 0;
    levelCompleted = false;
    setScore(0);
    resetPlayer();
    updateCourseUi();
    draw();
  }

  function queueJump() {
    if (!running) return;
    jumpQueued = true;
  }

  function buildPattern(type, startX, speed) {
    if (type === "shipSprint") {
      return [
        { kind: "portalSpeedUp", x: startX - 18, width: 28, height: 92, speed },
        { kind: "portalShip", x: startX + 8, width: 30, height: 96, speed },
        { kind: "saw", x: startX + 98, y: floorY - 110, width: 40, height: 40, speed },
        { kind: "saw", x: startX + 170, y: floorY - 186, width: 44, height: 44, speed },
        { kind: "coin", x: startX + 216, y: floorY - 214, width: 22, height: 22, speed, taken: false },
        { kind: "saw", x: startX + 246, y: floorY - 132, width: 38, height: 38, speed },
        { kind: "portalCube", x: startX + 318, width: 30, height: 96, speed },
        { kind: "portalSpeedDown", x: startX + 356, width: 28, height: 92, speed },
        { kind: "double", x: startX + 382, width: 54, height: 34, speed },
      ];
    }
    if (type === "shipSprintLite") {
      return [
        { kind: "portalSpeedUp", x: startX - 12, width: 28, height: 92, speed },
        { kind: "portalShip", x: startX + 12, width: 30, height: 96, speed },
        { kind: "saw", x: startX + 112, y: floorY - 104, width: 36, height: 36, speed },
        { kind: "coin", x: startX + 166, y: floorY - 184, width: 22, height: 22, speed, taken: false },
        { kind: "roof", x: startX + 202, width: 38, height: 30, speed },
        { kind: "saw", x: startX + 262, y: floorY - 146, width: 36, height: 36, speed },
        { kind: "portalCube", x: startX + 328, width: 30, height: 96, speed },
        { kind: "portalSpeedDown", x: startX + 364, width: 28, height: 92, speed },
        { kind: "pad", x: startX + 404, width: 36, height: 12, speed, used: false },
        { kind: "spike", x: startX + 470, width: 34, height: 34, speed },
      ];
    }
    if (type === "gravityFlip") {
      return [
        { kind: "portalGravityUp", x: startX, width: 30, height: 96, speed },
        { kind: "roof", x: startX + 58, width: 38, height: 30, speed },
        { kind: "roof", x: startX + 112, width: 38, height: 30, speed },
        { kind: "orbPink", x: startX + 164, y: 106, width: 24, height: 24, speed, used: false },
        { kind: "coin", x: startX + 204, y: 92, width: 22, height: 22, speed, taken: false },
        { kind: "roof", x: startX + 250, width: 38, height: 30, speed },
        { kind: "portalGravityDown", x: startX + 310, width: 30, height: 96, speed },
        { kind: "double", x: startX + 374, width: 54, height: 34, speed },
      ];
    }
    if (type === "gravityDrop") {
      return [
        { kind: "portalGravityUp", x: startX, width: 30, height: 96, speed },
        { kind: "saw", x: startX + 96, y: 18, width: 34, height: 34, speed },
        { kind: "orbPink", x: startX + 116, y: 112, width: 24, height: 24, speed, used: false },
        { kind: "coin", x: startX + 152, y: 150, width: 22, height: 22, speed, taken: false },
        { kind: "saw", x: startX + 240, y: 24, width: 36, height: 36, speed },
        { kind: "orbPink", x: startX + 254, y: 126, width: 24, height: 24, speed, used: false },
        { kind: "portalGravityDown", x: startX + 314, width: 30, height: 96, speed },
        { kind: "double", x: startX + 378, width: 54, height: 34, speed },
      ];
    }
    if (type === "miniMix") {
      return [
        { kind: "portalMini", x: startX, width: 28, height: 92, speed },
        { kind: "double", x: startX + 70, width: 54, height: 34, speed },
        { kind: "orbPink", x: startX + 116, y: floorY - 84, width: 24, height: 24, speed, used: false },
        { kind: "orb", x: startX + 152, y: floorY - 118, width: 26, height: 26, speed, used: false },
        { kind: "saw", x: startX + 194, y: floorY - 86, width: 34, height: 34, speed },
        { kind: "coin", x: startX + 226, y: floorY - 160, width: 22, height: 22, speed, taken: false },
        { kind: "portalMaxi", x: startX + 252, width: 28, height: 92, speed },
        { kind: "triple", x: startX + 320, width: 80, height: 34, speed },
      ];
    }
    if (type === "sawPad") {
      return [
        { kind: "pad", x: startX, width: 36, height: 12, speed, used: false },
        { kind: "saw", x: startX + 70, y: floorY - 74, width: 30, height: 30, speed },
        { kind: "roof", x: startX + 120, width: 38, height: 30, speed },
        { kind: "orbPink", x: startX + 162, y: floorY - 96, width: 24, height: 24, speed, used: false },
        { kind: "orb", x: startX + 190, y: floorY - 132, width: 26, height: 26, speed, used: false },
        { kind: "spike", x: startX + 236, width: 34, height: 34, speed },
      ];
    }
    if (type === "ringLadder") {
      return [
        { kind: "block", x: startX, width: 54, height: 46, speed },
        { kind: "orb", x: startX + 78, y: floorY - 118, width: 26, height: 26, speed, used: false },
        { kind: "orbPink", x: startX + 116, y: floorY - 154, width: 24, height: 24, speed, used: false },
        { kind: "coin", x: startX + 154, y: floorY - 194, width: 22, height: 22, speed, taken: false },
        { kind: "saw", x: startX + 196, y: floorY - 104, width: 34, height: 34, speed },
        { kind: "double", x: startX + 244, width: 54, height: 34, speed },
      ];
    }
    if (type === "shipTunnel") {
      return [
        { kind: "portalShip", x: startX, width: 30, height: 96, speed },
        { kind: "roof", x: startX + 62, width: 38, height: 30, speed },
        { kind: "saw", x: startX + 108, y: floorY - 90, width: 34, height: 34, speed },
        { kind: "roof", x: startX + 164, width: 38, height: 30, speed },
        { kind: "coin", x: startX + 198, y: floorY - 202, width: 22, height: 22, speed, taken: false },
        { kind: "saw", x: startX + 238, y: floorY - 168, width: 38, height: 38, speed },
        { kind: "roof", x: startX + 294, width: 38, height: 30, speed },
        { kind: "portalCube", x: startX + 352, width: 30, height: 96, speed },
        { kind: "double", x: startX + 414, width: 54, height: 34, speed },
      ];
    }
    if (type === "gravitySteps") {
      return [
        { kind: "portalGravityUp", x: startX, width: 30, height: 96, speed },
        { kind: "roof", x: startX + 54, width: 38, height: 30, speed },
        { kind: "orbPink", x: startX + 104, y: 102, width: 24, height: 24, speed, used: false },
        { kind: "coin", x: startX + 144, y: 86, width: 22, height: 22, speed, taken: false },
        { kind: "roof", x: startX + 188, width: 38, height: 30, speed },
        { kind: "portalGravityDown", x: startX + 246, width: 30, height: 96, speed },
        { kind: "double", x: startX + 304, width: 54, height: 34, speed },
        { kind: "saw", x: startX + 376, y: floorY - 82, width: 32, height: 32, speed },
      ];
    }
    if (type === "sizeWeave") {
      return [
        { kind: "portalMini", x: startX, width: 28, height: 92, speed },
        { kind: "double", x: startX + 62, width: 54, height: 34, speed },
        { kind: "orbPink", x: startX + 110, y: floorY - 92, width: 24, height: 24, speed, used: false },
        { kind: "saw", x: startX + 152, y: floorY - 88, width: 34, height: 34, speed },
        { kind: "portalMaxi", x: startX + 208, width: 28, height: 92, speed },
        { kind: "block", x: startX + 262, width: 58, height: 52, speed },
        { kind: "coin", x: startX + 338, y: floorY - 168, width: 22, height: 22, speed, taken: false },
        { kind: "triple", x: startX + 372, width: 80, height: 34, speed },
      ];
    }
    if (type === "speedBridge") {
      return [
        { kind: "portalSpeedUp", x: startX, width: 28, height: 92, speed },
        { kind: "pad", x: startX + 42, width: 36, height: 12, speed, used: false },
        { kind: "double", x: startX + 102, width: 54, height: 34, speed },
        { kind: "orb", x: startX + 172, y: floorY - 124, width: 26, height: 26, speed, used: false },
        { kind: "saw", x: startX + 218, y: floorY - 90, width: 34, height: 34, speed },
        { kind: "coin", x: startX + 254, y: floorY - 176, width: 22, height: 22, speed, taken: false },
        { kind: "portalSpeedDown", x: startX + 296, width: 28, height: 92, speed },
        { kind: "block", x: startX + 352, width: 56, height: 46, speed },
      ];
    }
    if (type === "padDuo") {
      return [
        { kind: "pad", x: startX, width: 36, height: 12, speed, used: false },
        { kind: "spike", x: startX + 64, width: 34, height: 34, speed },
        { kind: "double", x: startX + 116, width: 54, height: 34, speed },
      ];
    }
    if (type === "blockOrb") {
      return [
        { kind: "block", x: startX, width: 62, height: 54, speed },
        { kind: "orb", x: startX + 86, y: floorY - 126, width: 26, height: 26, speed, used: false },
        { kind: "spike", x: startX + 142, width: 34, height: 34, speed },
      ];
    }
    if (type === "roofWeave") {
      return [
        { kind: "roof", x: startX + 24, width: 38, height: 30, speed },
        { kind: "spike", x: startX + 92, width: 34, height: 34, speed },
        { kind: "roof", x: startX + 162, width: 38, height: 30, speed },
      ];
    }
    if (type === "tripleRise") {
      return [
        { kind: "triple", x: startX, width: 80, height: 34, speed },
        { kind: "orb", x: startX + 118, y: floorY - 110, width: 26, height: 26, speed, used: false },
        { kind: "block", x: startX + 176, width: 54, height: 42, speed },
      ];
    }
    if (type === "speedCube") {
      return [
        { kind: "portalSpeedUp", x: startX + 8, width: 28, height: 92, speed },
        { kind: "double", x: startX + 64, width: 54, height: 34, speed },
        { kind: "orbPink", x: startX + 134, y: floorY - 96, width: 24, height: 24, speed, used: false },
        { kind: "saw", x: startX + 182, y: floorY - 84, width: 34, height: 34, speed },
        { kind: "portalSpeedDown", x: startX + 240, width: 28, height: 92, speed },
        { kind: "triple", x: startX + 300, width: 80, height: 34, speed },
      ];
    }
    if (type === "doublePair") {
      return [
        { kind: "double", x: startX, width: 54, height: 34, speed },
        { kind: "spike", x: startX + 84, width: 34, height: 34, speed },
      ];
    }
    return [{ kind: "spike", x: startX, width: 34, height: 34, speed }];
  }

  function makePattern() {
    const config = getConfig();
    const speed = config.speed + stageLevel * 0.18;
    const startX = 900;
    const roll = Math.random();
    if (roll < 0.14 && stageLevel >= 8) return buildPattern("shipSprint", startX, speed);
    if (roll < 0.26 && stageLevel >= 7) return buildPattern("gravityFlip", startX, speed);
    if (roll < 0.42 && stageLevel >= 6) return buildPattern("miniMix", startX, speed);
    if (roll < 0.56 && stageLevel >= 5) return buildPattern("sawPad", startX, speed);
    if (roll < 0.72 && stageLevel >= 2) return buildPattern("padDuo", startX, speed);
    if (roll < 0.82 && stageLevel >= 3) return buildPattern("blockOrb", startX, speed);
    if (roll < 0.92 && stageLevel >= 4) return buildPattern("roofWeave", startX, speed);
    if (roll < 0.98 && stageLevel >= 5) return buildPattern("tripleRise", startX, speed);
    if (roll < 0.995) return buildPattern("doublePair", startX, speed);
    return buildPattern("spike", startX, speed);
  }

  function patternRightEdge(piece) {
    return piece.x + piece.width;
  }

  function spawnPattern() {
    const config = getConfig();
    const last = pieces[pieces.length - 1];
    if (last && 900 - patternRightEdge(last) < Math.max(42, config.gap - stageLevel * 2) + Math.random() * 34) return;
    const speed = config.speed + stageLevel * 0.18;
    const course = getSelectedCourse();
    const sequence = getCourseSequence(course);
    if (sequence) {
      if (courseSpawnIndex >= sequence.length) return;
      pieces.push(...buildPattern(sequence[courseSpawnIndex], 900, speed));
      courseSpawnIndex += 1;
      return;
    }
    pieces.push(...makePattern());
  }

  function pieceBounds(piece) {
    if (piece.kind === "orb") {
      return { x: piece.x, y: piece.y, width: piece.width, height: piece.height };
    }
    if (piece.kind === "orbPink" || piece.kind === "coin") {
      return { x: piece.x, y: piece.y, width: piece.width, height: piece.height };
    }
    if (
      [
        "portalShip",
        "portalCube",
        "portalMini",
        "portalMaxi",
        "portalSpeedUp",
        "portalSpeedDown",
        "portalGravityUp",
        "portalGravityDown",
      ].includes(piece.kind)
    ) {
      return { x: piece.x, y: floorY - 102, width: piece.width, height: piece.height };
    }
    if (piece.kind === "saw") {
      return { x: piece.x, y: piece.y, width: piece.width, height: piece.height };
    }
    if (piece.kind === "roof") {
      return { x: piece.x, y: 52, width: piece.width, height: piece.height };
    }
    if (piece.kind === "pad") {
      return { x: piece.x, y: floorY - 12, width: piece.width, height: piece.height };
    }
    return { x: piece.x, y: floorY - piece.height, width: piece.width, height: piece.height };
  }

  function playerBounds() {
    const inset = getConfig().hitboxInset;
    return {
      x: player.x + inset,
      y: player.y + inset,
      width: player.size - inset * 2,
      height: player.size - inset * 2,
    };
  }

  function rectsOverlap(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }

  function spawnCrashParticles() {
    particles = Array.from({ length: 18 }, () => ({
      x: player.x + player.size / 2,
      y: player.y + player.size / 2,
      vx: Math.random() * 7 - 3.5,
      vy: Math.random() * -6.5,
      life: 30 + Math.random() * 20,
      color: Math.random() < 0.5 ? "#ffd166" : "#7af0c8",
    }));
  }

  function crash() {
    running = false;
    spawnCrashParticles();
    setStatus(`Crashed at ${Math.floor(distance)}m`);
    scheduleAutoReset(1100);
    draw();
  }

  function pulseFlash() {
    flashTimer = 10;
  }

  function getProgressRatio() {
    const course = getSelectedCourse();
    const sequence = getCourseSequence(course);
    if (!sequence) {
      return (distance % 160) / 160;
    }
    return clamp(distance / Math.max(1, sequence.length * 175), 0, 1);
  }

  function updateHud() {
    const course = getSelectedCourse();
    const progressPercent = Math.round(getProgressRatio() * 100);
    shell.hud.distance.textContent = `Distance ${Math.floor(distance)}m`;
    shell.hud.mode.textContent = `${getDifficultyPreset().label} • ${player.form === "ship" ? "Ship" : "Cube"}${player.scale < 1 ? " Mini" : ""} • ${player.gravityDir === -1 ? "Upside" : "Normal"} • x${speedModifier.toFixed(1)}`;
    shell.hud.level.textContent = `${course.sequence ? course.label : `Level ${stageLevel}`} • Coins ${coinsCollected}`;
    shell.hud.progress.textContent = `Progress ${progressPercent}%`;
    refreshLevel();
  }

  function updateParticles() {
    particles = particles
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.2,
        life: particle.life - 1,
      }))
      .filter((particle) => particle.life > 0);
  }

  function handleJumpInput(config) {
    if (!jumpQueued) return;
    if (player.form === "ship") {
      const nextVelocity = player.vy - config.shipLift * player.gravityDir;
      player.vy = clamp(nextVelocity, -config.shipLift * 1.25, config.shipLift * 1.25);
      pulseFlash();
      jumpQueued = false;
      return;
    }
    if (player.grounded) {
      player.vy = -config.jump * player.gravityDir;
      player.grounded = false;
      pulseFlash();
      jumpQueued = false;
      return;
    }
    const bounds = playerBounds();
    const ring = pieces.find(
      (piece) =>
        (piece.kind === "orb" || piece.kind === "orbPink") &&
        !piece.used &&
        Math.abs((piece.x + piece.width / 2) - (bounds.x + bounds.width / 2)) < config.ringX &&
        Math.abs((piece.y + piece.height / 2) - (bounds.y + bounds.height / 2)) < config.ringY,
    );
    if (ring) {
      player.vy =
        -(ring.kind === "orbPink" ? config.orbJump - 1.6 : config.orbJump) *
        player.gravityDir;
      ring.used = true;
      pulseFlash();
    }
    jumpQueued = false;
  }

  function checkPadBounce(config) {
    if (player.form !== "cube" || player.gravityDir !== 1) return;
    pieces.forEach((piece) => {
      if (piece.kind !== "pad" || piece.used) return;
      const bounds = pieceBounds(piece);
      const playerRect = playerBounds();
      if (player.grounded && rectsOverlap(playerRect, bounds)) {
        piece.used = true;
        player.vy = -(config.jump + 2.2);
        player.grounded = false;
        pulseFlash();
      }
    });
  }

  function update() {
    const config = getConfig();
    stageLevel = 1 + Math.floor(distance / 160);

    handleJumpInput(config);
    if (portalCooldown > 0) portalCooldown -= 1;

    if (player.form === "ship") {
      player.vy += config.shipGravity * player.gravityDir;
      player.y += player.vy;
      player.grounded = false;
      player.angle = clamp(player.vy * 0.045, -0.65, 0.65) * player.gravityDir;
      if (player.y <= 18 || player.y + player.size >= floorY) {
        crash();
        return;
      }
    } else {
      const previousTop = player.y;
      const previousBottom = player.y + player.size;
      player.vy += config.gravity * player.gravityDir;
      player.y += player.vy;
      if (player.gravityDir === 1) {
        let supportY = floorY - player.size;
        let foundPlatform = false;
        const playerMidX = player.x + player.size / 2;
        pieces.forEach((piece) => {
          if (piece.kind !== "block") return;
          const top = floorY - piece.height - player.size;
          if (playerMidX < piece.x + 6 || playerMidX > piece.x + piece.width - 6) return;
          if (previousBottom <= floorY - piece.height + 6 && player.y >= top) {
            supportY = Math.min(supportY, top);
            foundPlatform = true;
          }
        });
        if (player.y >= (foundPlatform ? supportY : floorY - player.size)) {
          player.y = foundPlatform ? supportY : floorY - player.size;
          player.vy = 0;
          player.grounded = true;
          player.angle = 0;
        } else {
          player.grounded = false;
          player.angle += 0.18;
        }
      } else if (player.y <= 18) {
        player.y = 18;
        player.vy = 0;
        player.grounded = true;
        player.angle = 0;
      } else {
        player.grounded = false;
        player.angle -= 0.18;
      }
    }

    spawnTimer += 1;
    if (spawnTimer >= Math.max(28, config.spawn - stageLevel * 2)) {
      spawnTimer = 0;
      spawnPattern();
    }

    pieces.forEach((piece) => {
      piece.x -= piece.speed * speedModifier;
    });
    pieces = pieces.filter((piece) => piece.x + piece.width > -50);

    checkPadBounce(config);

    const bounds = playerBounds();
    pieces.forEach((piece) => {
      if (piece.kind !== "coin" || piece.taken) return;
      if (rectsOverlap(bounds, pieceBounds(piece))) {
        piece.taken = true;
        coinsCollected += 1;
        setScore(appState.score + 25 + stageLevel * 2);
        pulseFlash();
      }
    });
    if (portalCooldown === 0) {
      const portal = pieces.find(
        (piece) =>
          [
            "portalShip",
            "portalCube",
            "portalMini",
            "portalMaxi",
            "portalSpeedUp",
            "portalSpeedDown",
            "portalGravityUp",
            "portalGravityDown",
          ].includes(piece.kind) &&
          rectsOverlap(bounds, pieceBounds(piece)),
      );
      if (portal) {
        if (portal.kind === "portalShip") {
          setPlayerForm("ship");
          player.vy = Math.min(player.vy, 2);
        } else if (portal.kind === "portalCube") {
          setPlayerForm("cube");
        } else if (portal.kind === "portalMini") {
          setPlayerScale(0.72);
        } else if (portal.kind === "portalMaxi") {
          setPlayerScale(1);
        } else if (portal.kind === "portalSpeedUp") {
          speedModifier = Math.min(config.speedCap, speedModifier + config.speedUpDelta);
        } else if (portal.kind === "portalSpeedDown") {
          speedModifier = Math.max(0.88, speedModifier - config.speedDownDelta);
        } else if (portal.kind === "portalGravityUp") {
          setGravityDirection(-1);
        } else if (portal.kind === "portalGravityDown") {
          setGravityDirection(1);
        }
        portalCooldown = 18;
        pulseFlash();
      }
    }
    const lethalHit = pieces.some((piece) => {
      if (
        piece.kind === "orb" ||
        piece.kind === "orbPink" ||
        piece.kind === "pad" ||
        piece.kind === "block" ||
        piece.kind === "coin" ||
        [
          "portalShip",
          "portalCube",
          "portalMini",
          "portalMaxi",
          "portalSpeedUp",
          "portalSpeedDown",
          "portalGravityUp",
          "portalGravityDown",
        ].includes(piece.kind)
      ) {
        return false;
      }
      return rectsOverlap(bounds, pieceBounds(piece));
    });
    if (lethalHit) {
      crash();
      return;
    }

    const course = getSelectedCourse();
    const sequence = getCourseSequence(course);
    if (sequence && courseSpawnIndex >= sequence.length && pieces.length === 0) {
      running = false;
      levelCompleted = true;
      setScore(appState.score + 400 + coinsCollected * 25);
      setStatus(`${course.label} cleared`);
      draw();
      return;
    }

    if (flashTimer > 0) flashTimer -= 1;
    distance += (config.speed + stageLevel * 0.18) * speedModifier * 0.16;
    player.trail.push({ x: player.x + player.size / 2, y: player.y + player.size / 2 });
    if (player.trail.length > 12) player.trail.shift();
    setScore(Math.floor(distance));
    updateHud();
  }

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, 360);
    gradient.addColorStop(0, "#142d56");
    gradient.addColorStop(1, "#08111f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 860, 360);

    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let x = -40; x < 920; x += 40) {
      const offsetX = (x - (distance * 1.2) % 40);
      ctx.beginPath();
      ctx.moveTo(offsetX, 0);
      ctx.lineTo(offsetX, 360);
      ctx.stroke();
    }
    for (let y = 28; y < 300; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(860, y);
      ctx.stroke();
    }

    const pulseAlpha = 0.08 + flashTimer * 0.02;
    ctx.fillStyle = `rgba(122, 240, 200, ${pulseAlpha})`;
    ctx.fillRect(0, 0, 860, 360);

    ctx.fillStyle = "#153253";
    ctx.fillRect(0, floorY, 860, 62);
    ctx.fillStyle = "#46b1ff";
    ctx.fillRect(0, floorY, 860, 8);
    ctx.fillStyle = player.gravityDir === -1 ? "#ff5fd2" : "#46b1ff";
    ctx.fillRect(0, 10, 860, 6);

    const course = getSelectedCourse();
    const stageProgress = getProgressRatio();
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(180, 18, 500, 10);
    ctx.fillStyle = "#7af0c8";
    ctx.fillRect(180, 18, 500 * stageProgress, 10);
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 2;
    ctx.strokeRect(180, 18, 500, 10);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.textAlign = "left";
    ctx.font = "700 12px Trebuchet MS";
    ctx.fillText("Progress", 180, 14);
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(stageProgress * 100)}%`, 680, 14);
  }

  function drawSpike(x, y, width, upsideDown = false) {
    ctx.beginPath();
    if (upsideDown) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + width / 2, y + 30);
      ctx.lineTo(x + width, y);
    } else {
      ctx.moveTo(x, floorY);
      ctx.lineTo(x + width / 2, y);
      ctx.lineTo(x + width, floorY);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawPiece(piece) {
    const bounds = pieceBounds(piece);
    if (piece.kind === "saw") {
      const cx = bounds.x + bounds.width / 2;
      const cy = bounds.y + bounds.height / 2;
      const outer = bounds.width / 2;
      const inner = outer * 0.56;
      ctx.fillStyle = "#ff5f7a";
      ctx.beginPath();
      for (let index = 0; index < 12; index += 1) {
        const angle = (Math.PI * 2 * index) / 12 + distance * 0.03;
        const radius = index % 2 === 0 ? outer : inner;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#08111f";
      ctx.beginPath();
      ctx.arc(cx, cy, outer * 0.3, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (
      [
        "portalShip",
        "portalCube",
        "portalMini",
        "portalMaxi",
        "portalSpeedUp",
        "portalSpeedDown",
        "portalGravityUp",
        "portalGravityDown",
      ].includes(piece.kind)
    ) {
      const color =
        piece.kind === "portalShip"
          ? "#46b1ff"
          : piece.kind === "portalCube"
            ? "#ffd166"
            : piece.kind === "portalSpeedUp"
              ? "#ff8a3d"
            : piece.kind === "portalSpeedDown"
                ? "#8f66ff"
            : piece.kind === "portalGravityUp"
              ? "#34d399"
              : piece.kind === "portalGravityDown"
                ? "#60a5fa"
            : piece.kind === "portalMini"
              ? "#ff5fd2"
              : "#7af0c8";
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.lineWidth = 2;
      ctx.strokeRect(bounds.x + 6, bounds.y + 6, bounds.width - 12, bounds.height - 12);
      ctx.fillStyle = color;
      ctx.fillRect(bounds.x + bounds.width / 2 - 6, bounds.y + 18, 12, bounds.height - 36);
      return;
    }
    if (piece.kind === "block") {
      ctx.fillStyle = "#ff8a3d";
      ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(bounds.x, bounds.y, bounds.width, 6);
      return;
    }
    if (piece.kind === "pad") {
      ctx.fillStyle = piece.used ? "rgba(122,240,200,0.45)" : "#7af0c8";
      ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
      ctx.fillStyle = "#08111f";
      ctx.fillRect(bounds.x + 6, bounds.y + 3, bounds.width - 12, bounds.height - 6);
      return;
    }
    if (piece.kind === "orb") {
      ctx.fillStyle = piece.used ? "rgba(255, 209, 102, 0.36)" : "#ffd166";
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, bounds.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, bounds.width / 2 + 6, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }
    if (piece.kind === "orbPink") {
      ctx.fillStyle = piece.used ? "rgba(255, 95, 210, 0.3)" : "#ff5fd2";
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, bounds.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, bounds.width / 2 + 5, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }
    if (piece.kind === "coin") {
      if (piece.taken) return;
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, bounds.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#08111f";
      ctx.fillRect(bounds.x + bounds.width / 2 - 3, bounds.y + 4, 6, bounds.height - 8);
      return;
    }
    ctx.fillStyle = piece.kind === "roof" ? "#8f66ff" : piece.kind === "triple" ? "#ffd166" : piece.kind === "double" ? "#ff9f5b" : "#ff5f7a";
    if (piece.kind === "roof") {
      drawSpike(bounds.x, bounds.y, bounds.width, true);
      return;
    }
    if (piece.kind === "double") {
      drawSpike(bounds.x, floorY - bounds.height, 24);
      drawSpike(bounds.x + 24, floorY - bounds.height, 24);
      return;
    }
    if (piece.kind === "triple") {
      drawSpike(bounds.x, floorY - bounds.height, 26);
      drawSpike(bounds.x + 26, floorY - bounds.height, 26);
      drawSpike(bounds.x + 52, floorY - bounds.height, 26);
      return;
    }
    drawSpike(bounds.x, floorY - bounds.height, bounds.width);
  }

  function drawPlayer() {
    player.trail.forEach((point, index) => {
      ctx.fillStyle = `rgba(122, 240, 200, ${(index + 1) / player.trail.length * 0.22})`;
      ctx.fillRect(point.x - 8, point.y - 8, 16, 16);
    });
    ctx.save();
    ctx.translate(player.x + player.size / 2, player.y + player.size / 2);
    if (player.gravityDir === -1) {
      ctx.scale(1, -1);
    }
    ctx.rotate(player.angle);
    if (player.form === "ship") {
      ctx.fillStyle = "#7af0c8";
      ctx.beginPath();
      ctx.moveTo(player.size / 2, 0);
      ctx.lineTo(-player.size / 2, -player.size / 2.2);
      ctx.lineTo(-player.size / 2.8, 0);
      ctx.lineTo(-player.size / 2, player.size / 2.2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#08111f";
      ctx.fillRect(-2, -4, 8, 8);
    } else {
      ctx.fillStyle = "#7af0c8";
      ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
      ctx.fillStyle = "#08111f";
      ctx.fillRect(-9 * player.scale, -6 * player.scale, 6 * player.scale, 6 * player.scale);
      ctx.fillRect(3 * player.scale, -6 * player.scale, 6 * player.scale, 6 * player.scale);
      ctx.fillRect(-7 * player.scale, 6 * player.scale, 14 * player.scale, 4 * player.scale);
    }
    ctx.restore();
  }

  function drawParticles() {
    particles.forEach((particle) => {
      ctx.fillStyle = particle.color || `rgba(255, 209, 102, ${Math.max(0.1, particle.life / 50)})`;
      ctx.fillRect(particle.x, particle.y, 6, 6);
    });
  }

  function draw() {
    ctx.clearRect(0, 0, 860, 360);
    drawBackground();
    pieces.forEach(drawPiece);
    drawPlayer();
    drawParticles();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.32)";
      ctx.fillRect(0, 0, 860, 360);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText(levelCompleted ? `${getSelectedCourse().label} Cleared` : "Cube Rush", 430, 142);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText(getSelectedCourse().label, 430, 180);
      ctx.fillText(
        levelCompleted
          ? "Press Start to replay this course or switch to another level"
          : "Press Start, Space, Up, or click to jump, hit rings, or steer the ship",
        430,
        214,
      );
    }
  }

  function frame() {
    if (!running) {
      updateParticles();
      draw();
      if (particles.length) animationId = window.requestAnimationFrame(frame);
      return;
    }
    animationId = window.requestAnimationFrame(frame);
    update();
    updateParticles();
    draw();
  }

  return {
    id: "dash",
    title: "Cube Rush",
    tagline: "Geometry Dash-style cube runner",
    subtitle: "Auto-run, flip gravity, chain rings, hit speed portals, and swap through portal sections.",
    description:
      "A Geometry Dash-style runner with jump pads, pink and yellow rings, saw blades, collectible coins, gravity portals, mini portals, speed portals, and ship portals so the run shifts gravity, form, and pace instead of staying on one obstacle loop.",
    controls: "Press Space, Up, W, or click. Tap to jump as the cube, trigger pink and yellow rings in midair, flip through gravity portals, and tap repeatedly in ship sections to stay airborne.",
    getLevelText: () => String(stageLevel),
    mount(stage) {
      shell = createCanvasShell({
        hudItems: [
          { id: "distance", label: "Distance 0m" },
          { id: "mode", label: "Normal mode" },
          { id: "level", label: "Level 1" },
          { id: "progress", label: "Progress 0%" },
        ],
      });
      stage.innerHTML = "";
      stage.appendChild(shell.wrap);
      const controls = document.createElement("div");
      controls.className = "dash-level-controls";
      controls.innerHTML = `
        <label class="field-group">
          <span class="field-label">Course</span>
          <select class="field-control" data-dash-course>
            ${Object.values(courses)
              .map((course) => `<option value="${course.id}">${escapeHtml(course.label)}</option>`)
              .join("")}
          </select>
        </label>
        <label class="field-group">
          <span class="field-label">Custom track</span>
          <input class="field-control" type="file" accept="audio/*" data-dash-track />
        </label>
        <button class="secondary-button dash-track-button" type="button" data-dash-track-clear>Use synth track</button>
        <p class="muted compact-copy dash-level-note" data-dash-note></p>
        <p class="muted compact-copy dash-track-note" data-dash-track-note></p>
      `;
      shell.wrap.insertBefore(controls, shell.wrap.querySelector(".canvas-card"));
      shell.canvas.width = 860;
      shell.canvas.height = 360;
      ctx = shell.canvas.getContext("2d");
      courseSelect = shell.wrap.querySelector("[data-dash-course]");
      courseNoteEl = shell.wrap.querySelector("[data-dash-note]");
      trackInput = shell.wrap.querySelector("[data-dash-track]");
      trackNoteEl = shell.wrap.querySelector("[data-dash-track-note]");
      trackResetButton = shell.wrap.querySelector("[data-dash-track-clear]");
      courseSelect.addEventListener("change", () => {
        selectedCourseId = courses[courseSelect.value] ? courseSelect.value : "endless";
        resetState();
        setStatus(`${getSelectedCourse().label} ready`);
      });
      trackInput.addEventListener("change", () => {
        const file = trackInput.files?.[0];
        if (!file) return;
        unlockAudio();
        setCustomTrack("dash", file);
        updateTrackUi();
        if (!appState.audioMuted && appState.selectedGameId === "dash") {
          syncGameTheme(true);
        }
        setStatus(`Loaded ${file.name}`);
      });
      trackResetButton.addEventListener("click", () => {
        if (!getCustomTrack("dash")) return;
        if (trackInput) trackInput.value = "";
        clearCustomTrack("dash");
        updateTrackUi();
        setStatus("Cube Rush synth theme active");
      });
      shell.canvas.addEventListener("pointerdown", queueJump);
      resetState();
    },
    start() {
      if (running) return;
      if (levelCompleted) {
        resetState();
      }
      clearAutoReset();
      running = true;
      setStatus(`${getSelectedCourse().label} live`);
      frame();
    },
    reset() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
      resetState();
      setStatus("Ready");
    },
    destroy() {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;
    },
    onKeyDown(event) {
      if ([" ", "ArrowUp", "w", "W"].includes(event.key)) {
        queueJump();
      }
    },
  };
}

function simulateConnectWin(testBoard, player) {
  const rows = testBoard.length;
  const cols = testBoard[0].length;
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (testBoard[row][col] !== player) continue;
      for (const [dx, dy] of directions) {
        let count = 1;
        while (testBoard[row + count * dy]?.[col + count * dx] === player) {
          count += 1;
        }
        if (count >= 4) return true;
      }
    }
  }
  return false;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
