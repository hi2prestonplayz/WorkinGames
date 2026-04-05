const STORAGE_KEY = "browser-arcade-high-scores-v1";
const SETTINGS_KEY = "browser-arcade-settings-v1";
const START_COUNTDOWN_SECONDS = 3;
const SPACE_UPGRADE_BREAK_COOLDOWN_MS = 25000;
const BUILD_VERSION = "20260405a";
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
  { label: "Action", ids: ["runner", "space", "tower", "hopper", "dodge", "snout", "maze", "pong", "flappy"] },
  { label: "Arcade", ids: ["snake", "breakout", "stacker", "whack", "reaction", "typing", "clicker", "rps", "bubble", "slots"] },
  { label: "Puzzle", ids: ["memory", "merge", "vault", "flood", "lights", "crates", "mines", "hangman", "scramble", "code"] },
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
  stageTitle: document.querySelector("#stageTitle"),
  statusPill: document.querySelector("#statusPill"),
  gameStage: document.querySelector("#gameStage"),
  difficultySelect: document.querySelector("#difficultySelect"),
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
  countdownTimerId: null,
  countdownTargetGameId: null,
  countdownRemaining: 0,
  autoResetTimerId: null,
};

const games = {
  snake: createSnakeGame(),
  flappy: createFlappyGame(),
  runner: createRunnerGame(),
  breakout: createBreakoutGame(),
  pong: createPongGame(),
  hopper: createLaneHopperGame(),
  dodge: createDodgeDriftGame(),
  space: createSpaceBlasterGame(),
  tower: createTowerTacticsGame(),
  stacker: createStackerGame(),
  vault: createNumberVaultGame(),
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
    beginStartCountdown();
  });

  els.resetButton.addEventListener("click", () => {
    clearAutoReset();
    cancelStartCountdown();
    appState.activeGame?.reset();
  });

  els.difficultySelect?.addEventListener("change", () => {
    changeDifficulty(els.difficultySelect.value);
  });

  els.quickDifficultySelect?.addEventListener("change", () => {
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
}

function renderGameList() {
  const categorizedMarkup = GAME_CATEGORIES.map((group) => {
    const buttons = group.ids
      .map((id) => games[id])
      .filter(Boolean)
      .map(
        (game) => `
          <button class="game-select ${game.id === appState.selectedGameId ? "active" : ""}" data-game-id="${game.id}">
            <strong>${escapeHtml(game.title)}</strong>
            <span class="muted">${escapeHtml(game.tagline)}</span>
          </button>
        `,
      )
      .join("");

    return `
      <section class="game-category">
        <p class="game-category-label">${escapeHtml(group.label)}</p>
        ${buttons}
      </section>
    `;
  }).join("");

  const uncategorizedMarkup = Object.values(games)
    .filter((game) => !GAME_CATEGORIES.some((group) => group.ids.includes(game.id)))
    .map(
      (game) => `
        <button class="game-select ${game.id === appState.selectedGameId ? "active" : ""}" data-game-id="${game.id}">
          <strong>${escapeHtml(game.title)}</strong>
          <span class="muted">${escapeHtml(game.tagline)}</span>
        </button>
      `,
    )
    .join("");

  els.gameList.innerHTML =
    categorizedMarkup +
    (uncategorizedMarkup
      ? `<section class="game-category"><p class="game-category-label">More</p>${uncategorizedMarkup}</section>`
      : "");

  els.gameList.querySelectorAll("[data-game-id]").forEach((button) => {
    button.addEventListener("click", () => selectGame(button.dataset.gameId));
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
}

function setScore(value) {
  appState.score = value;
  els.scoreValue.textContent = String(value);
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
  appState.countdownTargetGameId = appState.selectedGameId;
  appState.countdownRemaining = START_COUNTDOWN_SECONDS;
  setStatus(`Starting in ${appState.countdownRemaining}`);
  updateStartButtonLabel();

  appState.countdownTimerId = window.setInterval(() => {
    appState.countdownRemaining -= 1;

    if (appState.countdownRemaining <= 0) {
      const targetGameId = appState.countdownTargetGameId;
      cancelStartCountdown();
      if (targetGameId === appState.selectedGameId) {
        appState.activeGame?.start();
      }
      return;
    }

    setStatus(`Starting in ${appState.countdownRemaining}`);
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

function changeDifficulty(value) {
  clearAutoReset();
  cancelStartCountdown();
  appState.difficulty = normalizeDifficulty(value);
  persistSettings();
  updateSettingsUi();
  appState.activeGame?.reset?.();
  setStatus(`${getDifficultyPreset().label} mode ready`);
}

function getDifficultyPreset() {
  return DIFFICULTY_PRESETS[appState.difficulty] || DIFFICULTY_PRESETS.normal;
}

function getDifficultyMode() {
  if (appState.difficulty === "chill") return "easy";
  if (appState.difficulty === "chaos") return "hard";
  return appState.difficulty;
}

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return { difficulty: normalizeDifficulty(parsed.difficulty) };
  } catch (error) {
    return { difficulty: "normal" };
  }
}

function persistSettings() {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      difficulty: appState.difficulty,
    }),
  );
}

function updateSettingsUi() {
  const preset = getDifficultyPreset();
  if (els.difficultySelect) {
    els.difficultySelect.value = appState.difficulty;
  }
  if (els.quickDifficultySelect) {
    els.quickDifficultySelect.value = appState.difficulty;
  }
  if (els.difficultyHint) {
    els.difficultyHint.textContent = `${preset.label}: ${preset.blurb}`;
  }
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
  let running = false;
  let leftPressed = false;
  let rightPressed = false;
  let paddle;
  let ball;
  let bricks;
  let lives;

  function resetState() {
    const preset = getDifficultyPreset();
    paddle = { x: 330, y: 400, width: preset.breakoutPaddleWidth, height: 14 };
    ball = {
      x: 380,
      y: 260,
      vx: preset.breakoutBallSpeed,
      vy: -preset.breakoutBallSpeed,
      r: 9,
    };
    lives = preset.breakoutLives;
    bricks = [];
    for (let row = 0; row < 5; row += 1) {
      for (let col = 0; col < 9; col += 1) {
        bricks.push({
          x: 40 + col * 78,
          y: 40 + row * 30,
          width: 66,
          height: 18,
          alive: true,
        });
      }
    }
    setScore(0);
    updateHud();
    draw();
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.bricks.textContent = `Bricks ${bricks.filter((brick) => brick.alive).length}`;
  }

  function loop() {
    if (!running) return;
    animationId = requestAnimationFrame(loop);
    update();
    draw();
  }

  function update() {
    if (leftPressed) paddle.x -= 7;
    if (rightPressed) paddle.x += 7;
    paddle.x = clamp(paddle.x, 0, 760 - paddle.width);

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
      ball.vx = hit * 6;
      ball.vy = -Math.abs(ball.vy);
    }

    for (const brick of bricks) {
      if (!brick.alive) continue;
      if (
        ball.x + ball.r >= brick.x &&
        ball.x - ball.r <= brick.x + brick.width &&
        ball.y + ball.r >= brick.y &&
        ball.y - ball.r <= brick.y + brick.height
      ) {
        brick.alive = false;
        ball.vy *= -1;
        setScore(appState.score + 10);
        updateHud();
        break;
      }
    }

    if (!bricks.some((brick) => brick.alive)) {
      running = false;
      setStatus(`You win - ${appState.score}`);
    }

    if (ball.y - ball.r > 440) {
      lives -= 1;
      updateHud();
      if (lives <= 0) {
        running = false;
        setStatus(`Out of lives - ${appState.score}`);
        scheduleAutoReset();
      } else {
        const preset = getDifficultyPreset();
        ball = {
          x: 380,
          y: 260,
          vx: preset.breakoutBallSpeed,
          vy: -preset.breakoutBallSpeed,
          r: 9,
        };
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 760, 440);
    ctx.fillStyle = "#08111f";
    ctx.fillRect(0, 0, 760, 440);

    bricks.forEach((brick, index) => {
      if (!brick.alive) return;
      const colors = ["#46b1ff", "#6ed8ff", "#8f66ff", "#ff8a3d", "#ffd166"];
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    });

    ctx.fillStyle = "#f4f6fa";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.fillStyle = "#ff8a3d";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();

    if (!running) {
      ctx.fillStyle = "rgba(0,0,0,0.36)";
      ctx.fillRect(0, 0, 760, 440);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "700 34px Trebuchet MS";
      ctx.fillText("Brick Burst", 380, 210);
      ctx.font = "22px Trebuchet MS";
      ctx.fillText("Press Start to launch", 380, 250);
    }
  }

  return {
    id: "breakout",
    levelStep: 60,
    title: "Brick Burst",
    tagline: "Breakout-inspired brick smashing",
    subtitle: "Bounce the ball, clear the wall, and hang onto your last life.",
    description:
      "A bright breakout-style arcade game with a controllable paddle, layered brick rows, and a score chase.",
    controls: "Left and right arrows or A and D.",
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "bricks", label: "Bricks 45" },
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
      leftPressed = false;
      rightPressed = false;
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
    ball = {
      x: 380,
      y: 220,
      vx: 5 * direction,
      vy: (Math.random() * 4) - 2,
      r: 9,
    };
    aiTargetY = 220 + (Math.random() * 90 - 45);
  }

  function update() {
    player.y += upPressed ? -6 : 0;
    player.y += downPressed ? 6 : 0;
    player.y = clamp(player.y, 0, 440 - player.height);

    if (ball.vx > 0) {
      if (Math.random() < 0.03) {
        aiTargetY = ball.y + (Math.random() * 130 - 65);
      }
    } else if (Math.random() < 0.02) {
      aiTargetY = 220 + (Math.random() * 120 - 60);
    }
    const aiSpeed = ball.x > 520 ? 2.35 : 1.45;
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
  let cards = [];
  let firstPick = null;
  let secondPick = null;
  let moves = 0;
  let matchedPairs = 0;
  let lock = false;
  let startedAt = 0;
  let timerId = null;

  const symbols = ["🍒", "🎮", "⭐", "🚀", "🔥", "🧠", "⚡", "👾"];

  function buildCards() {
    const shuffled = [...symbols, ...symbols]
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
      if (matchedPairs === symbols.length) {
        const bonus = Math.max(0, 200 - Math.floor((Date.now() - startedAt) / 1000) * 3);
        setScore(appState.score + bonus);
        setStatus("Cleared");
        clearInterval(timerId);
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
    }, 700);
  }

  function resetState() {
    firstPick = null;
    secondPick = null;
    moves = 0;
    matchedPairs = 0;
    lock = false;
    startedAt = 0;
    if (timerId) clearInterval(timerId);
    timerId = null;
    buildCards();
    setScore(0);
    renderBoard();
  }

  return {
    id: "memory",
    getLevelText: () => String(1 + matchedPairs),
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
            <span class="info-chip" data-meta="moves">Moves 0</span>
            <span class="info-chip" data-meta="time">Time 0s</span>
          </div>
        </div>
        <div class="memory-grid"></div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus("Flip cards");
    },
    reset() {
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
  let slideClassTimer = null;

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
    setScore(0);
    renderBoard();
  }

  function renderBoard() {
    const grid = wrapper.querySelector(".merge-grid");
    grid.innerHTML = board
      .flat()
      .map(
        (value) => `<div class="merge-tile merge-${value}">${value === 0 ? "" : value}</div>`,
      )
      .join("");
    refreshLevel();
  }

  function animateSlide(direction) {
    const grid = wrapper?.querySelector(".merge-grid");
    if (!grid) return;
    if (slideClassTimer) clearTimeout(slideClassTimer);
    grid.classList.remove("slide-left", "slide-right", "slide-up", "slide-down");
    grid.classList.add(`slide-${direction}`);
    slideClassTimer = window.setTimeout(() => {
      grid.classList.remove("slide-left", "slide-right", "slide-up", "slide-down");
      slideClassTimer = null;
    }, 140);
  }

  function slideRowLeft(row) {
    const compact = row.filter((value) => value !== 0);
    const next = [];
    let gained = 0;
    for (let index = 0; index < compact.length; index += 1) {
      if (compact[index] === compact[index + 1]) {
        next.push(compact[index] * 2);
        gained += compact[index] * 2;
        index += 1;
      } else {
        next.push(compact[index]);
      }
    }
    while (next.length < 4) next.push(0);
    return { row: next, gained };
  }

  function reverseRows(matrix) {
    return matrix.map((row) => [...row].reverse());
  }

  function transpose(matrix) {
    return matrix[0].map((_, columnIndex) => matrix.map((row) => row[columnIndex]));
  }

  function performMove(direction) {
    if (!running) return;
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
    working = working.map((row) => {
      const result = slideRowLeft(row);
      const next = result.row;
      if (next.some((value, index) => value !== row[index])) moved = true;
      gained += result.gained;
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
    board = working;
    addRandomTile();
    setScore(appState.score + gained);
    renderBoard();
    animateSlide(direction);
    if (isGameOver()) {
      running = false;
      setStatus(`Game over - ${appState.score}`);
      scheduleAutoReset();
    } else {
      setStatus("Sliding");
    }
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
      if (slideClassTimer) clearTimeout(slideClassTimer);
      slideClassTimer = null;
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

  function resetState() {
    bird = { x: 160, y: 220, vy: 0, r: 16 };
    pipes = [];
    pipeCooldown = 0;
    running = false;
    setScore(0);
    updateHud();
    draw();
  }

  function updateHud() {
    shell.hud.pipes.textContent = `Cleared ${appState.score}`;
    shell.hud.tip.textContent = `${getDifficultyPreset().label} mode`;
  }

  function spawnPipe() {
    const preset = getDifficultyPreset();
    const gapHalf = preset.flappyGap / 2;
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
    const preset = getDifficultyPreset();
    pipeCooldown -= 1;
    if (pipeCooldown <= 0) {
      spawnPipe();
      pipeCooldown = preset.flappySpawnFrames;
    }

    bird.vy += preset.flappyGravity;
    bird.y += bird.vy;

    pipes.forEach((pipe) => {
      pipe.x -= preset.flappyPipeSpeed;
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
    levelStep: 4,
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
      bird.vy = -getDifficultyPreset().flappyLift;
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

  function renderBoard() {
    wrapper.querySelector(".whack-grid").innerHTML = Array.from({ length: 9 }, (_, index) => {
      const active = index === activeHole ? "active" : "";
      return `<button class="whack-hole ${active}" data-hole="${index}">${index === activeHole ? "🐹" : "🕳️"}</button>`;
    }).join("");
    wrapper.querySelectorAll("[data-hole]").forEach((button) => {
      button.addEventListener("click", () => hitHole(Number(button.dataset.hole)));
    });
    wrapper.querySelector('[data-meta="timer"]').textContent = `Time ${timeLeft}s`;
    refreshLevel();
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
      renderBoard();
    }
  }

  function stopGame(status) {
    running = false;
    if (holeTimer) clearInterval(holeTimer);
    if (countdown) clearInterval(countdown);
    holeTimer = null;
    countdown = null;
    activeHole = -1;
    renderBoard();
    setStatus(status);
  }

  function resetState() {
    timeLeft = 20;
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
      setScore(0);
      nextHole();
      holeTimer = window.setInterval(nextHole, 700);
      countdown = window.setInterval(() => {
        timeLeft -= 1;
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

  function resetState() {
    word = words[Math.floor(Math.random() * words.length)];
    guessed = new Set();
    lives = 6;
    setScore(0);
    renderBoard();
    setStatus("Guess the word");
  }

  function renderBoard() {
    wrapper.querySelector(".word-display").innerHTML = [...word]
      .map(
        (letter) =>
          `<div class="letter-box">${guessed.has(letter) ? letter.toUpperCase() : "_"}</div>`,
      )
      .join("");
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
      setScore(lives * 10 + 10);
      renderBoard();
      setStatus(`Solved: ${word.toUpperCase()}`);
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
    getLevelText: () =>
      String(
        1 + new Set([...word].filter((letter) => guessed.has(letter))).size,
      ),
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
            <span class="info-chip" data-meta="lives">Lives 6</span>
          </div>
        </div>
        <div class="stack-layout">
          <div class="word-display"></div>
          <div class="keyboard-grid"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus("Guess the word");
    },
    reset() {
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
  let board = [];
  let gameOver = false;
  const size = 8;
  const mineCount = 10;

  function resetState() {
    gameOver = false;
    board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        mine: false,
        revealed: false,
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

    setScore(0);
    renderBoard();
    setStatus("Clear the safe tiles");
  }

  function reveal(row, col) {
    const cell = board[row]?.[col];
    if (!cell || cell.revealed || gameOver) return;
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
      setStatus("Cleared");
    }
  }

  function renderBoard() {
    wrapper.querySelector(".mine-grid").innerHTML = board
      .flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const classes = ["mine-cell"];
          if (cell.revealed) classes.push("revealed");
          if (cell.revealed && cell.mine) classes.push("bomb");
          const content = cell.revealed ? (cell.mine ? "💣" : cell.count || "") : "";
          return `<button class="${classes.join(" ")}" data-row="${rowIndex}" data-col="${colIndex}">${content}</button>`;
        }),
      )
      .join("");
    wrapper.querySelectorAll("[data-row]").forEach((button) => {
      button.addEventListener("click", () =>
        reveal(Number(button.dataset.row), Number(button.dataset.col)),
      );
    });
  }

  return {
    id: "mines",
    levelStep: 8,
    title: "Mine Grid",
    tagline: "Minesweeper-style puzzle board",
    subtitle: "Reveal safe tiles, read the numbers, and avoid every bomb.",
    description:
      "A compact minesweeper-inspired puzzle with auto-flood reveal for empty patches and a local best score.",
    controls: "Click tiles to reveal them.",
    mount(stage) {
      stage.innerHTML = "";
      wrapper = createDomShell(`<div class="mine-grid"></div>`);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus(gameOver ? "Reset for a new board" : "Clear the safe tiles");
    },
    reset() {
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
    const preset = getDifficultyPreset();
    const base =
      getDifficultyMode() === "easy" ? 430 : getDifficultyMode() === "hard" ? 320 : 370;
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
  let prompt = "";
  let typed = "";
  let startedAt = 0;
  let finished = false;
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

  function resetState() {
    const pool = prompts[getDifficultyPreset().typingPool] || prompts.normal;
    prompt = pool[Math.floor(Math.random() * pool.length)];
    typed = "";
    startedAt = 0;
    finished = false;
    setScore(0);
    renderPrompt();
    setStatus("Type the line");
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
    wrapper.querySelector('[data-meta="progress"]').textContent = `${typed.length}/${prompt.length}`;
  }

  function handleType(event) {
    if (finished) return;
    if (!startedAt && event.key.length === 1) {
      startedAt = Date.now();
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
      const seconds = Math.max(1, (Date.now() - startedAt) / 1000);
      const words = prompt.trim().split(/\s+/).length;
      const wpm = Math.round((words / seconds) * 60);
      const accuracy =
        [...prompt].filter((char, index) => typed[index] === char).length / prompt.length;
      const score = Math.max(0, Math.round(wpm * accuracy * 10));
      setScore(score);
      setStatus(`Finished - ${wpm} WPM`);
    }
  }

  return {
    id: "typing",
    noLevels: true,
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
              <span class="info-chip" data-meta="progress">0/0</span>
            </div>
          </div>
          <div class="typing-prompt"></div>
        </div>
      `);
      stage.appendChild(wrapper);
      resetState();
    },
    start() {
      setStatus(finished ? "Reset for a new phrase" : "Type the line");
    },
    reset() {
      resetState();
    },
    onKeyDown(event) {
      handleType(event);
    },
    destroy() {},
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
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") {
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
    if (getDifficultyMode() === "hard") {
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
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") return { startWidth: 240, speed: 3.6 };
    if (getDifficultyMode() === "hard") return { startWidth: 180, speed: 5.4 };
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
  let target = 0;
  let maxNumber = 100;
  let attemptsLeft = 8;
  let lowBound = 1;
  let highBound = 100;
  let solved = false;
  let guessesUsed = 0;

  function getConfig() {
    if (getDifficultyMode() === "easy") return { maxNumber: 40, attempts: 12 };
    if (getDifficultyMode() === "hard") return { maxNumber: 120, attempts: 8 };
    return { maxNumber: 80, attempts: 10 };
  }

  function updateHud() {
    wrapper.querySelector('[data-meta="range"]').textContent = `Window ${lowBound}-${highBound}`;
    wrapper.querySelector('[data-meta="attempts"]').textContent = `Attempts ${attemptsLeft}`;
    wrapper.querySelector('[data-meta="best"]').textContent = `Target 1-${maxNumber}`;
    refreshLevel();
  }

  function resetState() {
    const config = getConfig();
    maxNumber = config.maxNumber;
    attemptsLeft = config.attempts;
    lowBound = 1;
    highBound = maxNumber;
    target = 1 + Math.floor(Math.random() * maxNumber);
    solved = false;
    guessesUsed = 0;
    setScore(0);
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
      setScore(attemptsLeft * 15 + 25);
      wrapper.querySelector(".guess-log").textContent = `Vault opened. ${guess} was correct.`;
      setStatus("Solved");
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
    getLevelText: () => String(1 + guessesUsed),
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
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") return { size: 8, moves: 18 };
    if (getDifficultyMode() === "hard") return { size: 10, moves: 13 };
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
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") return { size: 4, scrambleBase: 7 };
    if (getDifficultyMode() === "hard") return { size: 6, scrambleBase: 15 };
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
  const levels = [
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
      "#..B...#",
      "#..G...#",
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
      "#..P....#",
      "#..B#...#",
      "#..G#B..#",
      "#....G..#",
      "#.......#",
      "#########",
    ],
    [
      "##########",
      "#........#",
      "#..P.....#",
      "#..BB....#",
      "#..##....#",
      "#..GG....#",
      "#........#",
      "##########",
    ],
    [
      "##########",
      "#........#",
      "#..P..B..#",
      "#..##....#",
      "#..B..G..#",
      "#.....G..#",
      "#........#",
      "##########",
    ],
  ];

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
    return levels[levelIndex].join("").split("").filter((cell) => cell === "G").length;
  }

  function updateHud() {
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
      "A small Sokoban-style puzzle run with multiple stages. Move carefully, push crates onto goals, and avoid trapping yourself.",
    controls: "Use arrow keys or WASD to move and push crates.",
    mount(stage) {
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
    const cpu = picks[Math.floor(Math.random() * picks.length)];
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
  let actionSide = "";
  let actionType = "";
  let actionFrames = 0;
  let blockFrames = 0;
  let spawnTimer = 0;
  let lives = 3;
  let defeated = 0;

  function getConfig() {
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") {
      return { lives: 4, spawnRate: 74, minSpawnRate: 34, enemySpeed: 2.45 };
    }
    if (getDifficultyMode() === "hard") {
      return { lives: 2, spawnRate: 50, minSpawnRate: 21, enemySpeed: 3.45 };
    }
    return { lives: 3, spawnRate: 61, minSpawnRate: 26, enemySpeed: 3.0 };
  }

  function getActionLabel() {
    if (blockFrames > 0) return "Guard up";
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
    actionSide = "";
    actionType = "";
    actionFrames = 0;
    blockFrames = 0;
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
    if (level >= 2 && roll > 0.82) type = "runner";
    if (level >= 3 && roll > 0.68 && roll <= 0.82) type = "brute";
    if (level >= 4 && roll > 0.54 && roll <= 0.68) type = "crawler";
    if (level >= 5 && roll > 0.4 && roll <= 0.54) type = "shield";
    if (level >= 6 && roll > 0.28 && roll <= 0.4) type = "charger";
    enemies.push(getEnemyStats(type, side, level));
  }

  function canHitEnemy(enemy, moveType) {
    if (enemy.type === "crawler") return moveType === "kick";
    if (enemy.type === "shield") return moveType === "kick";
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
        enemy.type === "charger"
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
    actionFrames = moveType === "kick" ? 14 : 10;
    blockFrames = 0;
    const reachMin = side === "left" ? pig.x - (moveType === "kick" ? 148 : 118) : pig.x + 24;
    const reachMax = side === "left" ? pig.x - 22 : pig.x + (moveType === "kick" ? 148 : 118);
    const survivors = [];
    let resultStatus = "Swing and miss";
    enemies.forEach((enemy) => {
      const sameSide = enemy.side === side;
      const inReach = enemy.x >= reachMin && enemy.x <= reachMax;
      if (!sameSide || !inReach) {
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
    blockFrames = 14;
    setStatus("Guard up");
    updateHud();
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
      enemy.x += enemy.vx;
    });

    if (actionFrames > 0) {
      actionFrames -= 1;
      if (actionFrames === 0 && blockFrames <= 0) {
        actionSide = "";
        actionType = "";
      }
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
      const hitPig = Math.abs(enemy.x - pig.x) < 24 && Math.abs(enemy.y - pig.y) < 46;
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
    ctx.fillStyle = "#ffb4c8";
    ctx.beginPath();
    ctx.arc(pig.x, pig.y, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff8ea8";
    ctx.beginPath();
    ctx.ellipse(pig.x, pig.y + 10, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.beginPath();
    ctx.arc(pig.x - 10, pig.y - 8, 4, 0, Math.PI * 2);
    ctx.arc(pig.x + 10, pig.y - 8, 4, 0, Math.PI * 2);
    ctx.fill();
    if (actionType === "guard" || blockFrames > 0) {
      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(pig.x, pig.y, 48, Math.PI * 0.25, Math.PI * 0.75);
      ctx.stroke();
    }
    if (actionSide && actionType === "punch") {
      ctx.strokeStyle = "#ffd166";
      ctx.lineWidth = 8;
      ctx.beginPath();
      if (actionSide === "left") {
        ctx.moveTo(pig.x - 18, pig.y + 4);
        ctx.lineTo(pig.x - 86, pig.y - 12);
      } else {
        ctx.moveTo(pig.x + 18, pig.y + 4);
        ctx.lineTo(pig.x + 86, pig.y - 12);
      }
      ctx.stroke();
    }
    if (actionSide && actionType === "kick") {
      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 9;
      ctx.beginPath();
      if (actionSide === "left") {
        ctx.moveTo(pig.x - 8, pig.y + 24);
        ctx.lineTo(pig.x - 116, pig.y + 18);
      } else {
        ctx.moveTo(pig.x + 8, pig.y + 24);
        ctx.lineTo(pig.x + 116, pig.y + 18);
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
      ctx.fillStyle = "#101826";
      ctx.fillRect(enemy.x - 6, enemy.y - 4, 4, 4);
      ctx.fillRect(enemy.x + 2, enemy.y - 4, 4, 4);
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
      ctx.fillText("Punch with A/D, kick with Q/E, block with S", 380, 246);
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
      "A deliberately lightweight pig brawler with more enemy types and more moves. Punch, kick, and block while runners, brutes, crawlers, shield foes, and chargers rush from both sides.",
    controls: "A and D punch. Q and E kick. S blocks. Arrow left and right also punch.",
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
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") return "easy";
    if (getDifficultyMode() === "hard") return "hard";
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
    const baseDesired = getLayoutKey() === "easy" ? 2 : getLayoutKey() === "hard" ? 4 : 3;
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
    const preset = getDifficultyPreset();
    const base = getDifficultyMode() === "easy" ? 470 : getDifficultyMode() === "hard" ? 310 : 380;
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
    const preset = getDifficultyPreset();
    if (getDifficultyMode() === "easy") {
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
    if (getDifficultyMode() === "hard") {
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
    const mode = getDifficultyMode();
    const baseGoal = mode === "easy" ? 6 : mode === "hard" ? 8 : 7;
    const baseTime = mode === "easy" ? 18 : mode === "hard" ? 14 : 16;
    const baseSpeed = mode === "easy" ? 1.25 : mode === "hard" ? 2.1 : 1.6;
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
    const mode = getDifficultyMode();
    if (mode === "easy") return 6;
    if (mode === "hard") return 4;
    return 5;
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
    const pool = getPool();
    const entry = pool[(level - 1) % pool.length];
    answer = entry.word.toLowerCase();
    hint = entry.hint;
    scrambled = scrambleWord(answer);
    triesLeft = getTriesBase();
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
  let lives = 3;
  let crossings = 0;
  let player = { col: 3, row: 8 };
  let lanes = [];
  const cols = 7;
  const rows = 9;
  const cellSize = 64;

  function getConfig() {
    const mode = getDifficultyMode();
    if (mode === "easy") return { lives: 4, speed: 1.7, density: 0.28 };
    if (mode === "hard") return { lives: 2, speed: 2.5, density: 0.42 };
    return { lives: 3, speed: 2.1, density: 0.35 };
  }

  function buildLanes() {
    const config = getConfig();
    lanes = Array.from({ length: rows - 2 }, (_, laneIndex) => {
      const row = laneIndex + 1;
      const direction = laneIndex % 2 === 0 ? 1 : -1;
      const obstacleCount = 2 + (laneIndex % 2) + (config.density > 0.38 ? 1 : 0);
      const width = laneIndex % 3 === 0 ? 1.35 : 1;
      return {
        row,
        direction,
        speed: config.speed + laneIndex * 0.12 + crossings * 0.03,
        obstacles: Array.from({ length: obstacleCount }, (_, index) => ({
          x: ((index * 2.9 + laneIndex * 0.8) % (cols + 3)) - 2,
          width,
        })),
      };
    });
  }

  function updateHud() {
    shell.hud.lives.textContent = `Lives ${lives}`;
    shell.hud.crossings.textContent = `Crossings ${crossings}`;
    shell.hud.lane.textContent = `Rows ${rows - 2}`;
    refreshLevel();
  }

  function resetPlayer() {
    player = { col: Math.floor(cols / 2), row: rows - 1 };
  }

  function resetState() {
    const config = getConfig();
    lives = config.lives;
    crossings = 0;
    running = false;
    resetPlayer();
    buildLanes();
    setScore(0);
    updateHud();
    draw();
  }

  function collidePlayer() {
    lives -= 1;
    if (lives <= 0) {
      running = false;
      setStatus("Traffic win - auto reset");
      scheduleAutoReset();
      updateHud();
      draw();
      return;
    }
    resetPlayer();
    updateHud();
    setStatus("Bonk - try again");
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
      ctx.fillText("Cross the road and keep your lives", (cols * cellSize) / 2, 276);
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
      "A quick lane-crossing game where you hop upward through moving traffic. Each successful crossing makes the next set of lanes a little meaner.",
    controls: "Use arrow keys or WASD to move one tile at a time. Reach the green strip at the top.",
    getLevelText: () => `${crossings + 1}`,
    mount(stage) {
      stage.innerHTML = "";
      shell = createCanvasShell({
        hudItems: [
          { id: "lives", label: "Lives 3" },
          { id: "crossings", label: "Crossings 0" },
          { id: "lane", label: "Rows 7" },
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
  const symbols = ["STAR", "7", "BAR", "ORB", "GEM", "ROCKET"];

  function getSpinSpeed() {
    const mode = getDifficultyMode();
    if (mode === "easy") return 12;
    if (mode === "hard") return 18;
    return 15;
  }

  function getPayout(values) {
    const counts = values.reduce((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {});
    const entries = Object.entries(counts).sort((left, right) => right[1] - left[1]);
    const [symbol, count] = entries[0];
    if (count === 3) {
      const bonus = symbol === "7" ? 12 : symbol === "STAR" ? 9 : 7;
      return bet * bonus;
    }
    if (count === 2) {
      return bet * 2;
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
    const mode = getDifficultyMode();
    credits = mode === "easy" ? 38 : mode === "hard" ? 24 : 30;
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
      reels = reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
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
    const mode = getDifficultyMode();
    if (mode === "easy") return 10;
    if (mode === "hard") return 7;
    return 8;
  }

  function buildAnswer() {
    answer = Array.from({ length: 4 }, () => colors[Math.floor(Math.random() * colors.length)]);
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
    wrapper.querySelector(".code-palette").innerHTML = colors
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
    const mode = getDifficultyMode();
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
