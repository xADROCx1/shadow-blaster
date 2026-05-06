const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gameShell = document.querySelector(".game-shell");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const waveEl = document.getElementById("wave");
const creditsEl = document.getElementById("credits");
const gameActions = document.getElementById("gameActions");
const pauseButton = document.getElementById("pauseButton");
const menuButton = document.getElementById("menuButton");
const shipPreview = document.getElementById("shipPreview");
const shipPreviewCtx = shipPreview.getContext("2d");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("startButton");
const warpButton = document.getElementById("warpButton");
const dailyButton = document.getElementById("dailyButton");
const garageButton = document.getElementById("garageButton");
const codexButton = document.getElementById("codexButton");
const fameButton = document.getElementById("fameButton");
const missionsButton = document.getElementById("missionsButton");
const settingsButton = document.getElementById("settingsButton");
const garage = document.getElementById("garage");
const hall = document.getElementById("hall");
const fameList = document.getElementById("fameList");
const missionsPanel = document.getElementById("missions");
const missionList = document.getElementById("missionList");
const missionCredits = document.getElementById("missionCredits");
const summary = document.getElementById("summary");
const summaryScore = document.getElementById("summaryScore");
const summaryStats = document.getElementById("summaryStats");
const settingsPanel = document.getElementById("settings");
const codexPanel = document.getElementById("codex");
const codexList = document.getElementById("codexList");
const codexMeta = document.getElementById("codexMeta");
const dailyPanel = document.getElementById("daily");
const dailyMeta = document.getElementById("dailyMeta");
const dailyInfo = document.getElementById("dailyInfo");
const warpPanel = document.getElementById("warp");
const warpMeta = document.getElementById("warpMeta");
const warpList = document.getElementById("warpList");
const warpSelectedName = document.getElementById("warpSelectedName");
const warpSelectedInfo = document.getElementById("warpSelectedInfo");
const warpStartButton = document.getElementById("warpStartButton");
const musicToggle = document.getElementById("musicToggle");
const sfxToggle = document.getElementById("sfxToggle");
const shakeToggle = document.getElementById("shakeToggle");
const particlesToggle = document.getElementById("particlesToggle");
const autoFireToggle = document.getElementById("autoFireToggle");
const touchSensitivity = document.getElementById("touchSensitivity");
const garageCreditsEl = document.getElementById("garageCredits");
const boosterMeta = document.getElementById("boosterMeta");
const laserMeta = document.getElementById("laserMeta");
const shieldMeta = document.getElementById("shieldMeta");
const boosterBuy = document.getElementById("boosterBuy");
const laserBuy = document.getElementById("laserBuy");
const shieldBuy = document.getElementById("shieldBuy");
const boosterStrip = document.getElementById("boosterStrip");
const laserStrip = document.getElementById("laserStrip");
const modGrid = document.getElementById("modGrid");
const modMeta = document.getElementById("modMeta");
const skinGrid = document.getElementById("skinGrid");
const skinMeta = document.getElementById("skinMeta");

const DPR_MAX = 2;
const BACKGROUND_SOURCES = [
  "assets/backgrounds/cosmos-0.png",
  "assets/backgrounds/cosmos-1.png",
  "assets/backgrounds/cosmos-2.png"
];
const CRIMSON_FORGE_BACKGROUNDS = [
  "assets/backgrounds/crimson-forge-1.png",
  "assets/backgrounds/crimson-forge-2.png",
  "assets/backgrounds/crimson-forge-3.png",
  "assets/backgrounds/crimson-forge-4.png",
  "assets/backgrounds/crimson-forge-5.png",
  "assets/backgrounds/crimson-forge-6.png"
];
const AURORA_EXPANSE_BACKGROUNDS = [
  "assets/backgrounds/aurora-expanse-1.png",
  "assets/backgrounds/aurora-expanse-2.png",
  "assets/backgrounds/aurora-expanse-3.png",
  "assets/backgrounds/aurora-expanse-4.png"
];
const FROST_SINGULARITY_BACKGROUNDS = [
  "assets/backgrounds/frost-singularity-1.png",
  "assets/backgrounds/frost-singularity-2.png",
  "assets/backgrounds/frost-singularity-3.png",
  "assets/backgrounds/frost-singularity-4.png",
  "assets/backgrounds/frost-singularity-5.png"
];
const SOLAR_GRAVEYARD_BACKGROUNDS = [
  "assets/backgrounds/solar-graveyard-1.png",
  "assets/backgrounds/solar-graveyard-2.png",
  "assets/backgrounds/solar-graveyard-3.png",
  "assets/backgrounds/solar-graveyard-4.png"
];
const LASER_TIERS = [
  { name: "Cyan Beam", color: "#23d8ff", cooldown: 0.14, spread: 0 },
  { name: "Gold Split", color: "#ffe066", cooldown: 0.125, spread: 9 },
  { name: "Red Lance", color: "#ff365f", cooldown: 0.11, spread: 13 },
  { name: "Violet Storm", color: "#8f5cff", cooldown: 0.095, spread: 17 },
  { name: "Green Nova", color: "#48ff9b", cooldown: 0.078, spread: 21 }
];
const BOOSTER_TIERS = [
  { name: "Stock Drift", speed: 430, response: 12 },
  { name: "Side Jets", speed: 485, response: 14 },
  { name: "Twin Thrusters", speed: 545, response: 16 },
  { name: "Ion Rails", speed: 610, response: 18 },
  { name: "Warp Vanes", speed: 690, response: 21 }
];
const SHIELD_TIERS = [
  { name: "No Plate", hp: 3 },
  { name: "Blue Plate", hp: 4 },
  { name: "Pulse Shell", hp: 5 },
  { name: "Aegis Grid", hp: 6 },
  { name: "Star Bulwark", hp: 7 }
];
const UPGRADE_COSTS = [0, 900, 2600, 6200, 14000];
const CREDIT_DIVISOR = 5;
const WAVE_DURATION = 54;
const WAVE_BREAK_DURATION = 5;
const DEFAULT_SETTINGS = {
  music: true,
  sfx: true,
  shake: true,
  particles: true,
  autoFire: false,
  touchSensitivity: 12
};
const MISSION_DEFS = [
  { id: "kills", label: "Destroy 80 enemies", target: 80, reward: 260 },
  { id: "bosses", label: "Defeat 2 bosses", target: 2, reward: 520 },
  { id: "pickups", label: "Collect 10 powerups", target: 10, reward: 320 }
];
const PALETTE = {
  space: "#050713",
  ink: "#f5f7ff",
  shadow: "#02030b",
  steel: "#8da0c8",
  steelLight: "#d8e6ff",
  steelDark: "#34415f",
  hot: "#ff365f",
  hotLight: "#ff8aa1",
  hotDark: "#9f1736",
  cool: "#23d8ff",
  coolLight: "#a8f4ff",
  coolDark: "#166a8e",
  gold: "#ffe066",
  goldLight: "#fff3a8",
  goldDark: "#a07318",
  green: "#48ff9b",
  greenDark: "#15945d",
  violet: "#8f5cff",
  violetDark: "#4b2c9f",
  orange: "#ff9d3c",
  pink: "#ff7adf",
  blueWhite: "#d9fbff"
};

const NEBULA_ZONES = [
  {
    id: "shadow-rift",
    name: "Shadow Rift",
    difficulty: "I",
    detail: "Purple void lanes, classic boss rotation.",
    map: { x: 50, y: 50 },
    music: "shadow",
    colors: { primary: "#8f5cff", secondary: "#23d8ff", accent: "#ff7adf", dark: "#050713", star: "#d9fbff" },
    backgroundImages: BACKGROUND_SOURCES,
    bosses: [
      { name: "Void Skull", modelId: "void-skull", color: "#ff365f", accent: "#ffe066", pattern: "spread", hp: 34, hpWave: 7, w: 92, h: 58 },
      { name: "Ion Crown", modelId: "ion-crown", color: "#23d8ff", accent: "#f5f7ff", pattern: "sweep", hp: 28, hpWave: 8, w: 104, h: 48 },
      { name: "Star Maw", modelId: "star-maw", color: "#ffe066", accent: "#ff365f", pattern: "burst", hp: 42, hpWave: 6, w: 82, h: 70 }
    ],
    mega: { name: "Eclipse Dreadnought", modelId: "eclipse-dreadnought", color: "#8f5cff", accent: "#48ff9b" }
  },
  {
    id: "crimson-forge",
    name: "Crimson Forge",
    difficulty: "II",
    detail: "Hot plasma clouds, aggressive armor bosses.",
    map: { x: 24, y: 28 },
    music: "crimson",
    colors: { primary: "#ff365f", secondary: "#ff9d3c", accent: "#ffe066", dark: "#12050a", star: "#fff3a8" },
    backgroundImages: CRIMSON_FORGE_BACKGROUNDS,
    bosses: [
      { name: "Cinder Tyrant", modelId: "cinder-tyrant", color: "#ff365f", accent: "#ff9d3c", pattern: "spread", hp: 46, hpWave: 8, w: 104, h: 64 },
      { name: "Molten Seraph", modelId: "molten-seraph", color: "#ff9d3c", accent: "#ffe066", pattern: "burst", hp: 52, hpWave: 7, w: 92, h: 76 }
    ],
    mega: { name: "Forge Colossus", modelId: "forge-colossus", color: "#ff365f", accent: "#ffe066" }
  },
  {
    id: "aurora-expanse",
    name: "Aurora Expanse",
    difficulty: "II",
    detail: "Green ion curtains, shield-heavy guardians.",
    map: { x: 75, y: 24 },
    music: "aurora",
    colors: { primary: "#48ff9b", secondary: "#23d8ff", accent: "#d9fbff", dark: "#02130f", star: "#a8f4ff" },
    backgroundImages: AURORA_EXPANSE_BACKGROUNDS,
    bosses: [
      { name: "Aegis Bloom", modelId: "aegis-bloom", color: "#48ff9b", accent: "#d9fbff", pattern: "sweep", hp: 50, hpWave: 8, w: 110, h: 58 },
      { name: "Lumen Hydra", modelId: "lumen-hydra", color: "#23d8ff", accent: "#48ff9b", pattern: "spread", hp: 44, hpWave: 8, w: 96, h: 72 }
    ],
    mega: { name: "Aurora Leviathan", modelId: "aurora-leviathan", color: "#48ff9b", accent: "#d9fbff" }
  },
  {
    id: "frost-singularity",
    name: "Frost Singularity",
    difficulty: "III",
    detail: "Blue-white gravity ice and precision bullet lanes.",
    map: { x: 28, y: 76 },
    music: "frost",
    colors: { primary: "#23d8ff", secondary: "#d9fbff", accent: "#8f5cff", dark: "#020817", star: "#f5f7ff" },
    backgroundImages: FROST_SINGULARITY_BACKGROUNDS,
    bosses: [
      { name: "Cryo Lens", modelId: "cryo-lens", color: "#23d8ff", accent: "#d9fbff", pattern: "sweep", hp: 48, hpWave: 9, w: 118, h: 48 },
      { name: "Null Glacier", modelId: "null-glacier", color: "#d9fbff", accent: "#8f5cff", pattern: "burst", hp: 58, hpWave: 8, w: 96, h: 78 }
    ],
    mega: { name: "Singularity Monarch", modelId: "singularity-monarch", color: "#23d8ff", accent: "#8f5cff" }
  },
  {
    id: "solar-graveyard",
    name: "Solar Graveyard",
    difficulty: "IV",
    detail: "Golden dead-star ruins, slow brutal fortress bosses.",
    map: { x: 76, y: 73 },
    music: "solar",
    colors: { primary: "#ffe066", secondary: "#ff9d3c", accent: "#ff365f", dark: "#110b04", star: "#fff3a8" },
    backgroundImages: SOLAR_GRAVEYARD_BACKGROUNDS,
    bosses: [
      { name: "Ashen Regent", modelId: "ashen-regent", color: "#ffe066", accent: "#ff365f", pattern: "spread", hp: 62, hpWave: 9, w: 112, h: 68 },
      { name: "Grave Sun", modelId: "grave-sun", color: "#ff9d3c", accent: "#d9fbff", pattern: "burst", hp: 68, hpWave: 8, w: 102, h: 82 }
    ],
    mega: { name: "Helios Reaper", modelId: "helios-reaper", color: "#ffe066", accent: "#ff365f" }
  }
];

const MUSIC_THEMES = {
  shadow: {
    label: "Void Drift",
    interval: 2400,
    wave: "sine",
    shimmer: "triangle",
    padDuration: 3.2,
    chords: [
      [82.41, 123.47, 164.81],
      [98.00, 146.83, 196.00],
      [73.42, 110.00, 146.83],
      [92.50, 138.59, 185.00]
    ],
    sparkle: 4.0,
    volume: 0.012
  },
  crimson: {
    label: "Ember Pulse",
    interval: 2100,
    wave: "triangle",
    shimmer: "sawtooth",
    padDuration: 2.8,
    chords: [
      [87.31, 130.81, 174.61],
      [103.83, 155.56, 207.65],
      [77.78, 116.54, 155.56],
      [98.00, 146.83, 196.00]
    ],
    sparkle: 3.0,
    volume: 0.011
  },
  aurora: {
    label: "Aurora Glass",
    interval: 2700,
    wave: "sine",
    shimmer: "sine",
    padDuration: 3.7,
    chords: [
      [73.42, 110.00, 164.81],
      [82.41, 123.47, 185.00],
      [98.00, 146.83, 220.00],
      [92.50, 138.59, 207.65]
    ],
    sparkle: 5.0,
    volume: 0.010
  },
  frost: {
    label: "Frozen Signal",
    interval: 2550,
    wave: "sine",
    shimmer: "triangle",
    padDuration: 3.4,
    chords: [
      [69.30, 103.83, 155.56],
      [82.41, 123.47, 185.00],
      [61.74, 92.50, 138.59],
      [77.78, 116.54, 174.61]
    ],
    sparkle: 6.0,
    volume: 0.0105
  },
  solar: {
    label: "Grave Sun Hymn",
    interval: 3000,
    wave: "triangle",
    shimmer: "sine",
    padDuration: 4.1,
    chords: [
      [65.41, 98.00, 146.83],
      [82.41, 123.47, 196.00],
      [73.42, 110.00, 164.81],
      [87.31, 130.81, 174.61]
    ],
    sparkle: 2.5,
    volume: 0.0125
  }
};

const WEAPON_MODS = [
  { id: "split", name: "Prism Splitter", cost: 1800, text: "Adds angled side bolts to every laser burst.", color: PALETTE.violet },
  { id: "pierce", name: "Phase Needle", cost: 4200, text: "Main shots punch through one extra target.", color: PALETTE.cool },
  { id: "burst", name: "Echo Chamber", cost: 7600, text: "Fires a delayed center echo bolt.", color: PALETTE.green },
  { id: "magnet", name: "Salvage Magnet", cost: 5200, text: "Pulls glowing powerups toward the ship.", color: PALETTE.gold }
];
const SHIP_SKINS = [
  { id: "default", name: "Shadow Stock", cost: 0, primary: PALETTE.steel, trim: PALETTE.hot, glow: PALETTE.cool },
  { id: "eclipse", name: "Eclipse Violet", cost: 1500, primary: "#8f5cff", trim: "#ff7adf", glow: "#d9fbff" },
  { id: "solar", name: "Solar Warden", cost: 3200, primary: "#ffe066", trim: "#ff365f", glow: "#ff9d3c" },
  { id: "aurora", name: "Aurora Ghost", cost: 6800, primary: "#48ff9b", trim: "#23d8ff", glow: "#f5f7ff" },
  { id: "obsidian", name: "Obsidian Ace", cost: 11000, primary: "#34415f", trim: "#8f5cff", glow: "#ff365f" }
];
const ENEMY_MODELS = [
  { id: "shard", name: "Shard Imp", note: "Fast glass-wing striker.", hp: 0, score: 18, color: PALETTE.gold, accent: PALETTE.cool },
  { id: "wraith", name: "Violet Wraith", note: "Slips sideways before firing.", hp: 1, score: 26, color: PALETTE.violet, accent: PALETTE.pink },
  { id: "fang", name: "Crimson Fang", note: "Armored hunter with a tighter hitbox.", hp: 2, score: 34, color: PALETTE.hot, accent: PALETTE.gold },
  { id: "drone", name: "Ion Drone", note: "Compact shooter with bright cyan rails.", hp: 1, score: 24, color: PALETTE.cool, accent: PALETTE.blueWhite },
  { id: "elite", name: "Royal Elite", note: "Flashing elite escort with heavier fire.", hp: 3, score: 42, color: PALETTE.hot, accent: PALETTE.violet },
  { id: "void-skull", name: "Void Skull", note: "Boss: wide spread volleys.", hp: 34, score: 420, color: PALETTE.hot, accent: PALETTE.gold },
  { id: "ion-crown", name: "Ion Crown", note: "Boss: lateral sweep cannon.", hp: 28, score: 420, color: PALETTE.cool, accent: PALETTE.blueWhite },
  { id: "star-maw", name: "Star Maw", note: "Boss: burst-ring projectile storm.", hp: 42, score: 420, color: PALETTE.gold, accent: PALETTE.hot },
  { id: "eclipse-dreadnought", name: "Eclipse Dreadnought", note: "Mega boss: arrives every 25 waves with fortress armor.", hp: 240, score: 2200, color: PALETTE.violet, accent: PALETTE.green },
  { id: "cinder-tyrant", name: "Cinder Tyrant", note: "Crimson Forge boss: armored plasma broadside.", hp: 46, score: 520, color: PALETTE.hot, accent: PALETTE.orange },
  { id: "molten-seraph", name: "Molten Seraph", note: "Crimson Forge boss: molten burst wings.", hp: 52, score: 520, color: PALETTE.orange, accent: PALETTE.gold },
  { id: "forge-colossus", name: "Forge Colossus", note: "Crimson Forge mega boss: living foundry fortress.", hp: 260, score: 2400, color: PALETTE.hot, accent: PALETTE.gold },
  { id: "aegis-bloom", name: "Aegis Bloom", note: "Aurora Expanse boss: shield petals and sweep fire.", hp: 50, score: 520, color: PALETTE.green, accent: PALETTE.blueWhite },
  { id: "lumen-hydra", name: "Lumen Hydra", note: "Aurora Expanse boss: twin ion heads.", hp: 44, score: 520, color: PALETTE.cool, accent: PALETTE.green },
  { id: "aurora-leviathan", name: "Aurora Leviathan", note: "Aurora Expanse mega boss: drifting shield whale.", hp: 260, score: 2400, color: PALETTE.green, accent: PALETTE.blueWhite },
  { id: "cryo-lens", name: "Cryo Lens", note: "Frost Singularity boss: precision sweep prism.", hp: 48, score: 560, color: PALETTE.cool, accent: PALETTE.blueWhite },
  { id: "null-glacier", name: "Null Glacier", note: "Frost Singularity boss: heavy burst glacier core.", hp: 58, score: 560, color: PALETTE.blueWhite, accent: PALETTE.violet },
  { id: "singularity-monarch", name: "Singularity Monarch", note: "Frost Singularity mega boss: gravity crown fortress.", hp: 280, score: 2600, color: PALETTE.cool, accent: PALETTE.violet },
  { id: "ashen-regent", name: "Ashen Regent", note: "Solar Graveyard boss: dead-star artillery.", hp: 62, score: 600, color: PALETTE.gold, accent: PALETTE.hot },
  { id: "grave-sun", name: "Grave Sun", note: "Solar Graveyard boss: collapsed solar burst core.", hp: 68, score: 600, color: PALETTE.orange, accent: PALETTE.blueWhite },
  { id: "helios-reaper", name: "Helios Reaper", note: "Solar Graveyard mega boss: executioner of ruined stars.", hp: 300, score: 2800, color: PALETTE.gold, accent: PALETTE.hot }
];

const SPRITE_COLORS = {
  W: PALETTE.ink,
  S: PALETTE.steel,
  s: PALETTE.steelLight,
  D: PALETTE.steelDark,
  C: PALETTE.cool,
  L: PALETTE.coolLight,
  c: PALETTE.coolDark,
  R: PALETTE.hot,
  H: PALETTE.hotLight,
  r: PALETTE.hotDark,
  Y: PALETTE.gold,
  Z: PALETTE.goldLight,
  y: PALETTE.goldDark,
  G: PALETTE.green,
  g: PALETTE.greenDark,
  V: PALETTE.violet,
  v: PALETTE.violetDark,
  O: PALETTE.orange,
  P: PALETTE.pink,
  B: PALETTE.blueWhite,
  X: PALETTE.shadow
};

const SPRITES = {
  player: [
    "......LL......",
    ".....CWWC.....",
    "....CSSsSC....",
    "...cSSWWSSc...",
    "..RHWSSsSWHR..",
    ".rRWSSCCSSWRr.",
    "YZWWSSCCSSWWZY",
    "..DDSWWWWSDD..",
    "...DSSRrSSD...",
    "....DRHRRD...."
  ],
  grunt: [
    "..Z...Z..",
    ".YyZ.YyZ.",
    "ZYXXXYY",
    "YXXGXXy",
    ".yYXYy.",
    "..Y.y.."
  ],
  elite: [
    "..P.H.V..",
    ".VRrHrvV.",
    "VRXXGXXRv",
    "HRXGgXRr",
    ".vRXXXRV.",
    "..V.r.P.."
  ],
  bossCore: [
    "..PPVVVVPP..",
    ".VsSSssSSv.",
    "VRHXXXXXXHrV",
    "VRXGGXXGgXRv",
    "vRXXRHHrXXRV",
    ".vRXXXXXXRv.",
    "..VRZYYZRV..",
    "...vDDDDV..."
  ],
  megaBoss: [
    "......VVVVVV......",
    "....VPPSSSSPPV....",
    "..VVPRHHZZHHRPVV..",
    ".VPRHXXXXXXXXHRPV.",
    "VPRXXGGXXXXGGXXRPV",
    "VRXXGggRHHggGXXRV",
    "VRXXXXRRHHRRXXXXRV",
    "vRXXYYXXXXXXYYXXRv",
    ".vRXXYDDDDDDYXXRv.",
    "..vRXXDDHHDDXXRv..",
    "...VVXXRRRRXXVV...",
    ".....vDDDDDDv....."
  ]
};

const keys = new Set();
const backgroundLayers = [];
const stars = [];
const scenery = [];
const nebulas = [];
const nebulaRibbons = [];
const galaxies = [];
const starClusters = [];
const comets = [];
const bullets = [];
const enemyBullets = [];
const enemies = [];
const particles = [];
const shockwaves = [];
const powerups = [];
const pointers = new Map();
const warpPreviewImages = new Map();

let width = 0;
let height = 0;
let dpr = 1;
let lastTime = 0;
let running = false;
let gameOver = false;
let paused = false;
let score = 0;
let best = Number(localStorage.getItem("pixelVoidBest") || 0);
let credits = Number(localStorage.getItem("pixelVoidCredits") || 0);
let hallOfFame = JSON.parse(localStorage.getItem("pixelVoidHallOfFame") || "[]");
let missionState = JSON.parse(localStorage.getItem("pixelVoidMissions") || "{}");
let settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem("pixelVoidSettings") || "{}") };
if (localStorage.getItem("shadowBlasterMusicDefaultOn") !== "1") {
  settings.music = true;
  localStorage.setItem("shadowBlasterMusicDefaultOn", "1");
}
let codexState = JSON.parse(localStorage.getItem("shadowBlasterCodex") || "{}");
let ownedMods = JSON.parse(localStorage.getItem("shadowBlasterMods") || "[]");
let equippedMod = localStorage.getItem("shadowBlasterEquippedMod") || "";
let ownedSkins = JSON.parse(localStorage.getItem("shadowBlasterSkins") || "[\"default\"]");
let equippedSkin = localStorage.getItem("shadowBlasterEquippedSkin") || "default";
let dailyBest = JSON.parse(localStorage.getItem("shadowBlasterDailyBest") || "{}");
let dailyChallenge = false;
let currentNebulaId = localStorage.getItem("shadowBlasterNebula") || "shadow-rift";
let bankedThisRun = false;
let ammoTimer = 0;
let wave = 1;
let waveTimer = 0;
let waveBreakTimer = 0;
let spawnTimer = 0;
let shootTimer = 0;
let mutationTimer = 10;
let mutation = "steady";
let mutationFlash = 0;
let nextBossWave = 3;
let nextMegaBossWave = 25;
let bossBanner = "";
let bossBannerTimer = 0;
let bossWarningTimer = 0;
let bossPending = false;
let bossPendingMega = false;
let shake = 0;
let bgTime = 0;
let debugHitboxes = false;
let audioCtx = null;
let musicTimer = null;
let musicStep = 0;

let runStats = {};

const player = {
  x: 0,
  y: 0,
  w: 30,
  h: 38,
  hitW: 16,
  hitH: 22,
  hitOffsetY: 0,
  speed: 430,
  hp: 3,
  invincible: 0,
  power: 1,
  powerTimer: 0,
  targetX: 0,
  targetY: 0,
  steerPointer: null,
  shootingPointers: new Set()
};

const upgrades = JSON.parse(localStorage.getItem("pixelVoidUpgrades") || "{\"booster\":1,\"laser\":1,\"shield\":1}");
upgrades.booster = clamp(Number(upgrades.booster) || 1, 1, 5);
upgrades.laser = clamp(Number(upgrades.laser) || 1, 1, 5);
upgrades.shield = clamp(Number(upgrades.shield) || 1, 1, 5);
const equipped = JSON.parse(localStorage.getItem("pixelVoidEquipped") || JSON.stringify(upgrades));
equipped.booster = clamp(Number(equipped.booster) || 1, 1, upgrades.booster);
equipped.laser = clamp(Number(equipped.laser) || 1, 1, upgrades.laser);
equipped.shield = clamp(Number(equipped.shield) || 1, 1, upgrades.shield);
if (!ownedSkins.includes("default")) ownedSkins.unshift("default");
if (!SHIP_SKINS.some((skin) => skin.id === equippedSkin) || !ownedSkins.includes(equippedSkin)) equippedSkin = "default";
if (!WEAPON_MODS.some((mod) => mod.id === equippedMod) || !ownedMods.includes(equippedMod)) equippedMod = "";
if (!NEBULA_ZONES.some((zone) => zone.id === currentNebulaId)) currentNebulaId = "shadow-rift";

bestEl.textContent = best;
creditsEl.textContent = credits;
pauseButton.textContent = "⏸";
menuButton.textContent = "↩";

function getCurrentNebula() {
  return NEBULA_ZONES.find((zone) => zone.id === currentNebulaId) || NEBULA_ZONES[0];
}

function zoneColor(key, fallback) {
  return getCurrentNebula().colors[key] || fallback;
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
  width = Math.floor(window.innerWidth);
  height = Math.floor(window.innerHeight);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (!stars.length) {
    for (let i = 0; i < 190; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        s: 0.8 + Math.random() * 2.8,
        v: 25 + Math.random() * 135
      });
    }
    for (let i = 0; i < 5; i++) {
      scenery.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(14, 42),
        v: rand(5, 18),
        kind: Math.random() < 0.58 ? "planet" : "ring",
        color: [PALETTE.coolDark, PALETTE.violet, PALETTE.goldDark, PALETTE.hotDark][Math.floor(Math.random() * 4)]
      });
    }
    for (let i = 0; i < 4; i++) {
      nebulas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        w: rand(160, 340),
        h: rand(90, 210),
        v: rand(3, 10),
        colorA: [PALETTE.pink, PALETTE.violet, PALETTE.cool, PALETTE.hotLight][Math.floor(Math.random() * 4)],
        colorB: [PALETTE.violetDark, PALETTE.coolDark, PALETTE.hotDark, PALETTE.pink][Math.floor(Math.random() * 4)],
        phase: rand(0, Math.PI * 2)
      });
    }
    for (let i = 0; i < 7; i++) {
      nebulaRibbons.push({
        x: rand(-60, width + 60),
        y: rand(-height * 0.2, height),
        length: rand(260, 560),
        amp: rand(32, 92),
        v: rand(4, 16),
        phase: rand(0, Math.PI * 2),
        thickness: rand(16, 42),
        color: [PALETTE.pink, PALETTE.violet, PALETTE.cool][i % 3],
        accent: [PALETTE.blueWhite, PALETTE.pink, PALETTE.coolLight][i % 3]
      });
    }
    for (let i = 0; i < 3; i++) {
      galaxies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(36, 78),
        v: rand(4, 13),
        spin: rand(-1, 1),
        color: [PALETTE.coolLight, PALETTE.goldLight, PALETTE.pink][Math.floor(Math.random() * 3)]
      });
    }
    for (let i = 0; i < 7; i++) {
      starClusters.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(20, 58),
        v: rand(6, 18),
        color: [PALETTE.blueWhite, PALETTE.coolLight, PALETTE.goldLight][Math.floor(Math.random() * 3)],
        seed: rand(0, 999)
      });
    }
    for (let i = 0; i < 4; i++) {
      comets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-18, 18),
        v: rand(18, 42),
        len: rand(36, 88),
        color: [PALETTE.coolLight, PALETTE.pink, PALETTE.green][Math.floor(Math.random() * 3)]
      });
    }
  }
}

function loadBackgroundAssets() {
  backgroundLayers.length = 0;
  const sources = getCurrentNebula().backgroundImages || [];
  for (let i = 0; i < sources.length; i++) {
    const image = new Image();
    image.src = sources[i];
    backgroundLayers.push({
      image,
      loaded: false,
      offset: i / Math.max(1, sources.length),
      speed: 0.006 + i * 0.003,
      drift: i % 2 ? -0.025 : 0.025,
      alpha: i === 0 ? 0.74 : 0.2,
      scale: 1.06 + i * 0.08
    });
    image.onload = () => {
      backgroundLayers[i].loaded = true;
    };
  }
}

function loadWarpPreviewAssets() {
  for (const zone of NEBULA_ZONES) {
    const source = zone.backgroundImages?.[0];
    if (!source || warpPreviewImages.has(zone.id)) continue;
    const image = new Image();
    image.src = source;
    warpPreviewImages.set(zone.id, { image, loaded: false });
    image.onload = () => {
      const preview = warpPreviewImages.get(zone.id);
      if (preview) preview.loaded = true;
      renderWarp();
    };
  }
}

function applyNebulaVisuals() {
  const zone = getCurrentNebula();
  document.documentElement.style.setProperty("--hot", zone.colors.primary);
  document.documentElement.style.setProperty("--cool", zone.colors.secondary);
  document.documentElement.style.setProperty("--gold", zone.colors.accent);
  document.documentElement.style.setProperty("--violet", zone.colors.primary);
  document.documentElement.style.setProperty("--green", zone.colors.secondary);
  for (const cloud of nebulas) {
    cloud.colorA = Math.random() < 0.5 ? zone.colors.primary : zone.colors.secondary;
    cloud.colorB = Math.random() < 0.5 ? zone.colors.accent : zone.colors.dark;
  }
  for (const ribbon of nebulaRibbons) {
    ribbon.color = zone.colors.primary;
    ribbon.accent = Math.random() < 0.5 ? zone.colors.secondary : zone.colors.accent;
  }
  for (const galaxy of galaxies) galaxy.color = Math.random() < 0.5 ? zone.colors.accent : zone.colors.secondary;
  for (const cluster of starClusters) cluster.color = zone.colors.star;
  for (const comet of comets) comet.color = zone.colors.secondary;
  for (const item of scenery) item.color = Math.random() < 0.5 ? zone.colors.primary : zone.colors.secondary;
}

function resetGame() {
  bullets.length = 0;
  enemyBullets.length = 0;
  enemies.length = 0;
  particles.length = 0;
  shockwaves.length = 0;
  powerups.length = 0;
  pointers.clear();
  player.shootingPointers.clear();
  player.x = width / 2;
  player.y = height - 110;
  player.targetX = player.x;
  player.targetY = player.y;
  player.hp = getMaxHp();
  player.invincible = 1.2;
  player.power = equipped.laser;
  player.powerTimer = 0;
  player.droneFire = 0;
  ammoTimer = 0;
  player.steerPointer = null;
  score = 0;
  runStats = {
    kills: 0,
    bosses: 0,
    pickups: 0,
    shots: 0,
    hits: 0,
    damage: 0,
    start: performance.now()
  };
  wave = 1;
  waveTimer = 0;
  waveBreakTimer = 0;
  spawnTimer = 0.4;
  shootTimer = 0;
  mutationTimer = 10;
  mutation = "steady";
  mutationFlash = 0;
  nextBossWave = 3;
  nextMegaBossWave = 25;
  bossBanner = "";
  bossBannerTimer = 0;
  bossWarningTimer = 0;
  bossPending = false;
  bossPendingMega = false;
  shake = 0;
  bankedThisRun = false;
  gameOver = false;
  paused = false;
  running = true;
  gameShell.classList.remove("menu-open");
  overlay.classList.remove("game-over");
  overlay.classList.add("hidden");
  gameActions.classList.add("visible");
  pauseButton.textContent = "⏸";
  updateHud();
}

function updateHud() {
  scoreEl.textContent = Math.floor(score);
  bestEl.textContent = best;
  waveEl.textContent = wave;
  creditsEl.textContent = credits;
  renderGarage();
}

function updateMenuCopy() {
  if (running && !gameOver && !paused) return;
  const zone = getCurrentNebula();
  overlay.querySelector("p").textContent = `Warp target: ${zone.name}. Right thumb steers. Left side shoots.`;
}

function getWaveDuration() {
  return WAVE_DURATION + Math.min(18, Math.floor((wave - 1) / 4) * 3);
}

function startWaveBreak() {
  waveBreakTimer = WAVE_BREAK_DURATION;
  waveTimer = 0;
  bossBanner = "Wave Clear";
  bossBannerTimer = WAVE_BREAK_DURATION;
  enemyBullets.length = 0;
  enemies.length = 0;
  addShockwave(width / 2, height * 0.34, zoneColor("accent", PALETTE.gold), 32);
}

function finishWaveBreak() {
  wave += 1;
  waveBreakTimer = 0;
  spawnTimer = 0.6;
  mutationTimer = Math.max(6, mutationTimer);
  bossBanner = `Wave ${wave}`;
  bossBannerTimer = 1.7;
  player.invincible = Math.max(player.invincible, 0.85);
}

function getMaxHp() {
  return SHIELD_TIERS[equipped.shield - 1].hp;
}

function getLaserTier() {
  return LASER_TIERS[equipped.laser - 1];
}

function getBoosterTier() {
  return BOOSTER_TIERS[equipped.booster - 1];
}

function saveProgress() {
  localStorage.setItem("pixelVoidCredits", String(credits));
  localStorage.setItem("pixelVoidUpgrades", JSON.stringify(upgrades));
  localStorage.setItem("pixelVoidEquipped", JSON.stringify(equipped));
  localStorage.setItem("pixelVoidHallOfFame", JSON.stringify(hallOfFame));
  localStorage.setItem("pixelVoidMissions", JSON.stringify(missionState));
  localStorage.setItem("pixelVoidSettings", JSON.stringify(settings));
  localStorage.setItem("shadowBlasterCodex", JSON.stringify(codexState));
  localStorage.setItem("shadowBlasterMods", JSON.stringify(ownedMods));
  localStorage.setItem("shadowBlasterEquippedMod", equippedMod);
  localStorage.setItem("shadowBlasterSkins", JSON.stringify(ownedSkins));
  localStorage.setItem("shadowBlasterEquippedSkin", equippedSkin);
  localStorage.setItem("shadowBlasterDailyBest", JSON.stringify(dailyBest));
  localStorage.setItem("shadowBlasterNebula", currentNebulaId);
}

function nextCost(tier) {
  return tier >= 5 ? null : UPGRADE_COSTS[tier];
}

function renderGarage() {
  if (!garageCreditsEl) return;
  garageCreditsEl.textContent = `${credits} cr`;
  renderUpgrade("booster", boosterMeta, boosterBuy, BOOSTER_TIERS);
  renderUpgrade("laser", laserMeta, laserBuy, LASER_TIERS);
  renderUpgrade("shield", shieldMeta, shieldBuy, SHIELD_TIERS);
  renderPartStrip(boosterStrip, "booster");
  renderPartStrip(laserStrip, "laser");
  renderMods();
  renderSkins();
  renderShipPreview();
  renderHallOfFame();
}

function renderMods() {
  if (!modGrid) return;
  const renderKey = `${credits}-${equippedMod}-${ownedMods.join("|")}`;
  if (modGrid.dataset.rendered === renderKey) return;
  modGrid.dataset.rendered = renderKey;
  modMeta.textContent = equippedMod ? "1 equipped" : "None";
  modGrid.innerHTML = "";
  for (const mod of WEAPON_MODS) {
    const owned = ownedMods.includes(mod.id);
    const equipped = equippedMod === mod.id;
    const card = document.createElement("div");
    card.className = `mod-card${owned ? " owned" : ""}${equipped ? " equipped" : ""}`;
    const icon = document.createElement("canvas");
    icon.width = 54;
    icon.height = 44;
    drawModIcon(icon.getContext("2d"), mod);
    const text = document.createElement("div");
    text.innerHTML = `<strong>${mod.name}</strong><span>${mod.text}</span>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = owned ? (equipped ? "On" : "Equip") : `${mod.cost} cr`;
    button.disabled = !owned && credits < mod.cost;
    button.addEventListener("click", () => {
      if (!owned) buyMod(mod.id);
      else equipMod(equipped ? "" : mod.id);
    });
    card.append(icon, text, button);
    modGrid.append(card);
  }
}

function buyMod(id) {
  const mod = WEAPON_MODS.find((item) => item.id === id);
  if (!mod || ownedMods.includes(id) || credits < mod.cost) return;
  credits -= mod.cost;
  ownedMods.push(id);
  equippedMod = id;
  saveProgress();
  updateHud();
}

function equipMod(id) {
  if (id && !ownedMods.includes(id)) return;
  equippedMod = id;
  saveProgress();
  updateHud();
}

function renderSkins() {
  if (!skinGrid) return;
  const renderKey = `${credits}-${equippedSkin}-${ownedSkins.join("|")}`;
  if (skinGrid.dataset.rendered === renderKey) return;
  skinGrid.dataset.rendered = renderKey;
  const skin = getEquippedSkin();
  skinMeta.textContent = skin.name;
  skinGrid.innerHTML = "";
  for (const item of SHIP_SKINS) {
    const owned = ownedSkins.includes(item.id);
    const equipped = equippedSkin === item.id;
    const card = document.createElement("div");
    card.className = `skin-card${owned ? " owned" : ""}${equipped ? " equipped" : ""}`;
    const icon = document.createElement("canvas");
    icon.width = 54;
    icon.height = 44;
    drawSkinIcon(icon.getContext("2d"), item);
    const text = document.createElement("div");
    text.innerHTML = `<strong>${item.name}</strong><span>${owned ? "Unlocked paint kit" : "Cosmetic hull repaint"}</span>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = owned ? (equipped ? "On" : "Equip") : `${item.cost} cr`;
    button.disabled = !owned && credits < item.cost;
    button.addEventListener("click", () => {
      if (!owned) buySkin(item.id);
      else equipSkin(item.id);
    });
    card.append(icon, text, button);
    skinGrid.append(card);
  }
}

function buySkin(id) {
  const skin = SHIP_SKINS.find((item) => item.id === id);
  if (!skin || ownedSkins.includes(id) || credits < skin.cost) return;
  credits -= skin.cost;
  ownedSkins.push(id);
  equippedSkin = id;
  saveProgress();
  updateHud();
}

function equipSkin(id) {
  if (!ownedSkins.includes(id)) return;
  equippedSkin = id;
  saveProgress();
  updateHud();
}

function getEquippedSkin() {
  return SHIP_SKINS.find((skin) => skin.id === equippedSkin) || SHIP_SKINS[0];
}

function renderUpgrade(key, meta, button, tiers) {
  const unlockedTier = upgrades[key];
  const equippedTier = equipped[key];
  const config = tiers[equippedTier - 1];
  const cost = nextCost(unlockedTier);
  const detail = key === "booster"
    ? `${config.name} - speed ${config.speed}`
    : key === "laser"
      ? `${config.name} - ${config.color}`
      : `${config.name} - ${config.hp} HP`;
  meta.textContent = `Equipped T${equippedTier} / unlocked T${unlockedTier} - ${detail}`;
  if (cost === null) {
    button.textContent = "Max";
    button.disabled = true;
  } else {
    button.textContent = `${cost} cr`;
    button.disabled = credits < cost;
  }
}

function buyUpgrade(key) {
  const cost = nextCost(upgrades[key]);
  if (cost === null || credits < cost) return;
  credits -= cost;
  upgrades[key] += 1;
  equipped[key] = upgrades[key];
  if (key === "shield" && running && !gameOver) player.hp = Math.min(getMaxHp(), player.hp + 1);
  saveProgress();
  updateHud();
}

function equipTier(key, tier) {
  if (tier > upgrades[key] || tier < 1) return;
  equipped[key] = tier;
  if (key === "shield" && running && !gameOver) player.hp = Math.min(player.hp, getMaxHp());
  if (key === "laser" && running && !gameOver) player.power = Math.max(equipped.laser, Math.min(player.power, 5));
  saveProgress();
  updateHud();
}

function compositeShipTier() {
  return Math.max(equipped.booster, equipped.laser, equipped.shield);
}

function renderShipPreview() {
  if (!shipPreviewCtx) return;
  shipPreviewCtx.clearRect(0, 0, shipPreview.width, shipPreview.height);
  shipPreviewCtx.fillStyle = "rgba(2, 3, 11, 0.9)";
  shipPreviewCtx.fillRect(0, 0, shipPreview.width, shipPreview.height);
  shipPreviewCtx.fillStyle = "rgba(35, 216, 255, 0.16)";
  for (let x = 0; x < shipPreview.width; x += 18) shipPreviewCtx.fillRect(x, 0, 1, shipPreview.height);
  for (let y = 0; y < shipPreview.height; y += 18) shipPreviewCtx.fillRect(0, y, shipPreview.width, 1);
  drawShip32(shipPreviewCtx, 90, 48, 2.6, equipped, 2);
  shipPreviewCtx.fillStyle = PALETTE.gold;
  shipPreviewCtx.font = "700 12px 'Share Tech Mono', monospace";
  shipPreviewCtx.textAlign = "center";
  shipPreviewCtx.fillText(`MK-${compositeShipTier()} HULL`, 90, 123);
}

function addHallScore(finalScore, finalWave) {
  hallOfFame.push({
    score: finalScore,
    wave: finalWave,
    ship: `B${equipped.booster} L${equipped.laser} S${equipped.shield}`,
    date: new Date().toLocaleDateString()
  });
  hallOfFame = hallOfFame
    .filter((entry) => Number.isFinite(entry.score))
    .sort((a, b) => b.score - a.score)
    .slice(0, 25);
}

function renderHallOfFame() {
  if (!fameList) return;
  fameList.innerHTML = "";
  if (!hallOfFame.length) {
    const empty = document.createElement("li");
    empty.className = "fame-empty";
    empty.textContent = "No runs recorded yet.";
    fameList.appendChild(empty);
    return;
  }
  hallOfFame.forEach((entry) => {
    const item = document.createElement("li");
    const row = document.createElement("div");
    row.className = "fame-score";
    const left = document.createElement("span");
    left.textContent = `Wave ${entry.wave} - ${entry.ship || "B1 L1 S1"}`;
    const right = document.createElement("strong");
    right.textContent = entry.score;
    row.append(left, right);
    const date = document.createElement("span");
    date.textContent = entry.date || "";
    item.append(row, date);
    fameList.appendChild(item);
  });
}

function renderMissions() {
  if (!missionList) return;
  missionCredits.textContent = `${credits} cr`;
  missionList.innerHTML = "";
  for (const mission of MISSION_DEFS) {
    const current = missionState[mission.id]?.value || 0;
    const complete = missionState[mission.id]?.complete || current >= mission.target;
    const row = document.createElement("div");
    row.className = `mission-card${complete ? " complete" : ""}`;
    const text = document.createElement("span");
    text.textContent = mission.label;
    const value = document.createElement("strong");
    value.textContent = complete ? `+${mission.reward} cr` : `${Math.min(current, mission.target)} / ${mission.target}`;
    row.append(text, value);
    missionList.appendChild(row);
  }
}

function markCodex(id) {
  if (!id) return;
  codexState[id] = (codexState[id] || 0) + 1;
  localStorage.setItem("shadowBlasterCodex", JSON.stringify(codexState));
}

function renderCodex() {
  if (!codexList) return;
  const seen = ENEMY_MODELS.filter((entry) => codexState[entry.id]).length;
  codexMeta.textContent = `${seen}/${ENEMY_MODELS.length} seen`;
  codexList.innerHTML = "";
  for (const entry of ENEMY_MODELS) {
    const found = Boolean(codexState[entry.id]);
    const card = document.createElement("div");
    card.className = `codex-card${found ? " seen" : " locked"}`;
    const icon = document.createElement("canvas");
    icon.width = 54;
    icon.height = 44;
    drawCodexIcon(icon.getContext("2d"), entry, found);
    const text = document.createElement("div");
    text.innerHTML = `<strong>${found ? entry.name : "Unknown Signal"}</strong><span>${found ? entry.note : "Defeat this enemy to identify it."}</span>`;
    const stat = document.createElement("strong");
    stat.textContent = found ? `x${codexState[entry.id]}` : "???";
    card.append(icon, text, stat);
    codexList.append(card);
  }
}

function dailyKey() {
  return new Date().toISOString().slice(0, 10);
}

function renderDaily() {
  if (!dailyInfo) return;
  const key = dailyKey();
  const bestToday = dailyBest[key] || 0;
  dailyMeta.textContent = key;
  dailyInfo.innerHTML = "";
  const rows = [
    ["Seed", key.replaceAll("-", "")],
    ["Rule", "Bosses arrive one wave sooner. Credits score +20%."],
    ["Best Today", bestToday]
  ];
  for (const [label, value] of rows) {
    const row = document.createElement("div");
    row.className = "daily-card";
    row.innerHTML = `<canvas width="54" height="44"></canvas><div><strong>${label}</strong><span>${value}</span></div>`;
    dailyInfo.appendChild(row);
  }
  const action = document.createElement("div");
  action.className = "daily-card";
  action.innerHTML = `<canvas width="54" height="44"></canvas><div><strong>Daily Run</strong><span>One tuned challenge for today's leaderboard chase.</span></div>`;
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Start";
  button.addEventListener("click", startDailyRun);
  action.appendChild(button);
  dailyInfo.appendChild(action);
}

function renderWarp() {
  if (!warpList) return;
  const selected = getCurrentNebula();
  const theme = MUSIC_THEMES[selected.music] || MUSIC_THEMES.shadow;
  warpMeta.textContent = selected.name;
  warpSelectedName.textContent = selected.name;
  warpSelectedInfo.textContent = `Difficulty ${selected.difficulty} - ${selected.detail} Music: ${theme.label}.`;
  warpList.innerHTML = "";
  for (const zone of NEBULA_ZONES) {
    const node = document.createElement("button");
    node.type = "button";
    node.className = `warp-node${zone.id === currentNebulaId ? " selected" : ""}`;
    node.setAttribute("aria-label", zone.name);
    node.style.left = `${zone.map.x}%`;
    node.style.top = `${zone.map.y}%`;
    const preview = document.createElement("canvas");
    preview.width = 66;
    preview.height = 66;
    drawWarpPreview(preview.getContext("2d"), zone);
    node.append(preview);
    node.addEventListener("click", () => selectNebula(zone.id));
    warpList.appendChild(node);
  }
}

function selectNebula(id) {
  if (!NEBULA_ZONES.some((zone) => zone.id === id)) return;
  currentNebulaId = id;
  loadBackgroundAssets();
  applyNebulaVisuals();
  if (settings.music && musicTimer) restartMusicLoop(false);
  saveProgress();
  renderWarp();
  renderDaily();
  updateMenuCopy();
  updateHud();
  playSound("click");
}

function drawWarpPreview(previewCtx, zone) {
  const { primary, secondary, accent, dark, star } = zone.colors;
  const w = previewCtx.canvas.width;
  const h = previewCtx.canvas.height;
  const preview = warpPreviewImages.get(zone.id);
  if (preview?.loaded) {
    const img = preview.image;
    const cover = Math.max(w / img.width, h / img.height);
    const drawW = img.width * cover;
    const drawH = img.height * cover;
    previewCtx.drawImage(img, (w - drawW) / 2, (h - drawH) / 2, drawW, drawH);
  } else {
    const bg = previewCtx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, dark);
    bg.addColorStop(0.5, withAlpha(primary, 0.95));
    bg.addColorStop(1, withAlpha(secondary, 0.7));
    previewCtx.fillStyle = bg;
    previewCtx.fillRect(0, 0, w, h);
  }
  previewCtx.globalCompositeOperation = "lighter";
  previewCtx.strokeStyle = withAlpha(accent, 0.62);
  previewCtx.lineWidth = 4;
  previewCtx.beginPath();
  previewCtx.moveTo(w * 0.07, h * 0.75);
  previewCtx.bezierCurveTo(w * 0.25, h * 0.14, w * 0.55, h * 0.98, w * 0.93, h * 0.25);
  previewCtx.stroke();
  previewCtx.strokeStyle = withAlpha(secondary, 0.52);
  previewCtx.lineWidth = 2;
  previewCtx.beginPath();
  previewCtx.moveTo(0, h * 0.35);
  previewCtx.bezierCurveTo(w * 0.3, h * 0.04, w * 0.53, h * 0.77, w, h * 0.48);
  previewCtx.stroke();
  previewCtx.fillStyle = star;
  for (let i = 0; i < 18; i++) {
    const x = (i * 17 + zone.id.length * 11) % w;
    const y = (i * 23 + zone.name.length * 5) % h;
    previewCtx.fillRect(x, y, i % 4 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
  }
  previewCtx.globalCompositeOperation = "source-over";
  previewCtx.fillStyle = withAlpha("#000000", 0.35);
  previewCtx.fillRect(0, 0, w, h);
  previewCtx.fillStyle = accent;
  previewCtx.fillRect(w / 2 - 5, h / 2 - 5, 10, 10);
  previewCtx.fillRect(w / 2 - 8, h / 2 - 2, 16, 4);
  previewCtx.fillStyle = star;
  previewCtx.fillRect(w / 2 - 2, h / 2 - 11, 4, 16);
}

function drawCodexIcon(iconCtx, entry, found) {
  iconCtx.clearRect(0, 0, 54, 44);
  iconCtx.fillStyle = "rgba(2, 3, 11, 0.92)";
  iconCtx.fillRect(0, 0, 54, 44);
  iconCtx.fillStyle = found ? withAlpha(entry.color, 0.18) : "rgba(245, 247, 255, 0.08)";
  iconCtx.fillRect(0, 0, 54, 44);
  const main = found ? entry.color : PALETTE.steelDark;
  const accent = found ? entry.accent : PALETTE.shadow;
  iconCtx.fillStyle = main;
  iconCtx.fillRect(20, 12, 14, 16);
  iconCtx.fillRect(13, 18, 9, 7);
  iconCtx.fillRect(32, 18, 9, 7);
  iconCtx.fillStyle = accent;
  iconCtx.fillRect(25, 7, 4, 8);
  iconCtx.fillRect(24, 21, 6, 4);
  iconCtx.fillStyle = PALETTE.blueWhite;
  iconCtx.fillRect(25, 15, 2, 2);
  iconCtx.fillRect(29, 15, 2, 2);
}

function renderSettings() {
  musicToggle.checked = settings.music;
  sfxToggle.checked = settings.sfx;
  shakeToggle.checked = settings.shake;
  particlesToggle.checked = settings.particles;
  autoFireToggle.checked = settings.autoFire;
  touchSensitivity.value = settings.touchSensitivity;
}

function renderSummary(finalScore, earnedCredits, finalWave) {
  summaryScore.textContent = finalScore;
  summaryStats.innerHTML = "";
  const seconds = Math.max(1, Math.floor((performance.now() - runStats.start) / 1000));
  const rows = [
    ["Wave reached", finalWave],
    ["Credits earned", earnedCredits],
    ["Enemies destroyed", runStats.kills],
    ["Bosses defeated", runStats.bosses],
    ["Powerups collected", runStats.pickups],
    ["Damage taken", runStats.damage],
    ["Survival time", `${seconds}s`]
  ];
  for (const [label, value] of rows) {
    const row = document.createElement("div");
    row.className = "summary-card";
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    summaryStats.appendChild(row);
  }
}

function hideMenuPanels(except = null) {
  for (const panel of [garage, hall, missionsPanel, settingsPanel, summary, codexPanel, dailyPanel, warpPanel]) {
    if (panel !== except) panel.classList.add("hidden");
  }
}

function updateMissionProgress() {
  const deltas = {
    kills: runStats.kills,
    bosses: runStats.bosses,
    pickups: runStats.pickups
  };
  for (const mission of MISSION_DEFS) {
    const state = missionState[mission.id] || { value: 0, complete: false };
    if (state.complete) {
      missionState[mission.id] = state;
      continue;
    }
    state.value += deltas[mission.id] || 0;
    if (state.value >= mission.target) {
      state.complete = true;
      credits += mission.reward;
      playSound("pickup");
    }
    missionState[mission.id] = state;
  }
}

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

function playSound(kind) {
  if (!settings.sfx) return;
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  const table = {
    shoot: [520, 0.035, "square", 0.025],
    hit: [160, 0.08, "sawtooth", 0.04],
    pickup: [880, 0.12, "triangle", 0.05],
    boss: [92, 0.35, "sawtooth", 0.06],
    click: [420, 0.04, "square", 0.02]
  };
  const [freq, duration, type, volume] = table[kind] || table.click;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.55), now + duration);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

function setMusic(active) {
  settings.music = active;
  if (!active) {
    clearInterval(musicTimer);
    musicTimer = null;
    saveProgress();
    return;
  }
  restartMusicLoop(true);
  saveProgress();
}

function getMusicTheme() {
  return MUSIC_THEMES[getCurrentNebula().music] || MUSIC_THEMES.shadow;
}

function restartMusicLoop(playNow = true) {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
  if (!settings.music) return;
  ensureAudio();
  musicStep = 0;
  if (playNow) {
    playAmbientPad(musicStep);
    musicStep += 1;
  }
  musicTimer = setInterval(() => {
    if (!settings.music || !running || paused) return;
    playAmbientPad(musicStep);
    musicStep += 1;
  }, getMusicTheme().interval);
}

function playAmbientPad(step) {
  if (!settings.music) return;
  const theme = getMusicTheme();
  const chord = theme.chords[step % theme.chords.length];
  chord.forEach((freq, index) => {
    playTone(freq, theme.padDuration, theme.wave, theme.volume - index * 0.002, 0.72, 1.4);
    playTone(freq * 2.01, theme.padDuration * 0.84, theme.shimmer, 0.0035, 0.9, 1.1);
  });
  if (step % 2 === 0) {
    playTone(chord[1] * theme.sparkle, 2.1, "sine", 0.0025, 1.1, 0.7);
  }
}

function playTone(freq, duration, type, volume, attack = 0.01, release = 0.08) {
  if (!settings.music) return;
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.setValueAtTime(volume * 0.78, Math.max(now + attack, now + duration - release));
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

function renderPartStrip(container, type) {
  if (!container || container.dataset.rendered === `${type}-${upgrades[type]}-${equipped[type]}`) return;
  container.dataset.rendered = `${type}-${upgrades[type]}-${equipped[type]}`;
  container.innerHTML = "";
  for (let tier = 1; tier <= 5; tier++) {
    const card = document.createElement("div");
    card.className = "part-card";
    if (tier <= upgrades[type]) card.classList.add("owned");
    if (tier <= upgrades[type]) card.classList.add("selectable");
    if (tier === equipped[type]) card.classList.add("equipped");
    if (tier === upgrades[type] + 1) card.classList.add("next");

    const art = document.createElement("canvas");
    art.width = 72;
    art.height = 58;
    const label = document.createElement("span");
    label.textContent = `T${tier}`;
    card.append(art, label);
    if (tier <= upgrades[type]) {
      card.title = `Equip ${type} tier ${tier}`;
      card.addEventListener("click", () => equipTier(type, tier));
    }
    container.appendChild(card);

    const partCtx = art.getContext("2d");
    drawPartIcon(partCtx, type, tier, tier <= upgrades[type]);
  }
}

function drawPartIcon(partCtx, type, tier, owned) {
  partCtx.clearRect(0, 0, 72, 58);
  partCtx.fillStyle = "rgba(2, 3, 11, 0.9)";
  partCtx.fillRect(0, 0, 72, 58);
  partCtx.fillStyle = owned ? "rgba(72, 255, 155, 0.18)" : "rgba(35, 216, 255, 0.1)";
  partCtx.fillRect(0, 0, 72, 58);
  const color = type === "booster"
    ? [PALETTE.steel, PALETTE.gold, PALETTE.violet, PALETTE.hot, PALETTE.green][tier - 1]
    : LASER_TIERS[tier - 1].color;
  if (type === "booster") {
    drawBoosterIcon(partCtx, tier, color);
  } else {
    drawLaserIcon(partCtx, tier, color);
  }
  if (!owned) {
    partCtx.fillStyle = "rgba(2, 3, 11, 0.48)";
    partCtx.fillRect(0, 0, 72, 58);
  }
}

function drawBoosterIcon(partCtx, tier, color) {
  const q = (x, y, w, h, c) => {
    partCtx.fillStyle = c;
    partCtx.fillRect(x, y, w, h);
  };
  const spread = tier >= 4 ? 13 : tier >= 2 ? 9 : 6;
  for (const side of [-1, 1]) {
    const x = 36 + side * spread;
    q(x - 6, 12, 12, 22, PALETTE.steelDark);
    q(x - 4, 9, 8, 8, color);
    q(x - 3, 10, 3, 5, PALETTE.steelLight);
    q(x + 1, 11, 2, 4, PALETTE.shadow);
    q(x - 5, 25, 10, 10, PALETTE.ink);
    q(x - 3, 27, 3, 5, PALETTE.blueWhite);
    q(x - 3, 35, 6, 9 + tier * 2, tier >= 4 ? PALETTE.violet : PALETTE.gold);
    q(x - 1, 37, 2, 11 + tier * 2, PALETTE.hot);
    q(x, 39, 1, 8 + tier, PALETTE.hotLight);
  }
  if (tier >= 3) {
    q(31, 15, 10, 17, color);
    q(32, 17, 3, 10, PALETTE.goldLight);
    q(38, 18, 2, 11, PALETTE.shadow);
  }
  if (tier >= 5) {
    q(18, 18, 8, 18, PALETTE.green);
    q(46, 18, 8, 18, PALETTE.green);
  }
}

function drawLaserIcon(partCtx, tier, color) {
  const q = (x, y, w, h, c) => {
    partCtx.fillStyle = c;
    partCtx.fillRect(x, y, w, h);
  };
  q(32, 9, 8, 34, PALETTE.steelDark);
  q(30, 16, 12, 22, PALETTE.ink);
  q(31, 17, 4, 18, PALETTE.steelLight);
  q(39, 18, 2, 16, PALETTE.shadow);
  q(33, 5, 6, 12, color);
  q(34, 0, 4, 8, PALETTE.blueWhite);
  if (tier >= 2) {
    q(21, 17, 7, 23, color);
    q(44, 17, 7, 23, color);
    q(22, 18, 2, 15, PALETTE.blueWhite);
    q(48, 19, 2, 14, PALETTE.shadow);
  }
  if (tier >= 3) {
    q(17, 10, 5, 20, PALETTE.hot);
    q(50, 10, 5, 20, PALETTE.hot);
    q(18, 11, 2, 10, PALETTE.hotLight);
    q(53, 12, 1, 11, PALETTE.hotDark);
  }
  if (tier >= 4) {
    q(10, 22, 7, 18, PALETTE.pink);
    q(55, 22, 7, 18, PALETTE.pink);
    q(11, 23, 2, 10, PALETTE.blueWhite);
    q(60, 24, 1, 10, PALETTE.violetDark);
  }
  if (tier >= 5) {
    q(27, 0, 18, 4, PALETTE.green);
    q(35, 0, 2, 50, PALETTE.green);
  }
}

function drawModIcon(iconCtx, mod) {
  iconCtx.clearRect(0, 0, 54, 44);
  iconCtx.fillStyle = "rgba(2, 3, 11, 0.92)";
  iconCtx.fillRect(0, 0, 54, 44);
  iconCtx.fillStyle = withAlpha(mod.color, 0.18);
  iconCtx.fillRect(0, 0, 54, 44);
  iconCtx.fillStyle = PALETTE.steelDark;
  iconCtx.fillRect(23, 10, 8, 24);
  iconCtx.fillStyle = mod.color;
  iconCtx.fillRect(25, 4, 4, 12);
  iconCtx.fillRect(18, 18, 18, 7);
  iconCtx.fillStyle = PALETTE.blueWhite;
  iconCtx.fillRect(26, 2, 2, 9);
  if (mod.id === "split") {
    iconCtx.fillStyle = PALETTE.pink;
    iconCtx.fillRect(10, 9, 5, 20);
    iconCtx.fillRect(39, 9, 5, 20);
  } else if (mod.id === "pierce") {
    iconCtx.fillStyle = PALETTE.cool;
    iconCtx.fillRect(14, 21, 26, 3);
  } else if (mod.id === "burst") {
    iconCtx.fillStyle = PALETTE.green;
    iconCtx.fillRect(24, 30, 6, 6);
    iconCtx.fillRect(25, 36, 4, 4);
  } else {
    iconCtx.strokeStyle = PALETTE.gold;
    iconCtx.lineWidth = 2;
    iconCtx.beginPath();
    iconCtx.arc(27, 22, 14, 0, Math.PI * 2);
    iconCtx.stroke();
  }
}

function drawSkinIcon(iconCtx, skin) {
  iconCtx.clearRect(0, 0, 54, 44);
  iconCtx.fillStyle = "rgba(2, 3, 11, 0.92)";
  iconCtx.fillRect(0, 0, 54, 44);
  iconCtx.fillStyle = withAlpha(skin.glow, 0.18);
  iconCtx.fillRect(0, 0, 54, 44);
  iconCtx.fillStyle = skin.glow;
  iconCtx.fillRect(25, 4, 4, 7);
  iconCtx.fillStyle = skin.primary;
  iconCtx.fillRect(21, 11, 12, 18);
  iconCtx.fillRect(13, 19, 9, 8);
  iconCtx.fillRect(32, 19, 9, 8);
  iconCtx.fillStyle = skin.trim;
  iconCtx.fillRect(23, 29, 8, 7);
  iconCtx.fillRect(10, 25, 6, 7);
  iconCtx.fillRect(38, 25, 6, 7);
  iconCtx.fillStyle = PALETTE.blueWhite;
  iconCtx.fillRect(25, 13, 3, 6);
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rectsHit(a, b) {
  const ab = hitBox(a);
  const bb = hitBox(b);
  return Math.abs(ab.x - bb.x) < (ab.w + bb.w) / 2 && Math.abs(ab.y - bb.y) < (ab.h + bb.h) / 2;
}

function hitBox(entity) {
  return {
    x: entity.x + (entity.hitOffsetX || 0),
    y: entity.y + (entity.hitOffsetY || 0),
    w: entity.hitW || entity.w,
    h: entity.hitH || entity.h
  };
}

function px(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function centerPx(x, y, w, h, color) {
  px(x - w / 2, y - h / 2, w, h, color);
}

function glowRect(x, y, w, h, color, alpha = 0.28) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const radius = Math.max(w, h) * 0.9;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, withAlpha(color, alpha));
  gradient.addColorStop(0.45, withAlpha(color, alpha * 0.32));
  gradient.addColorStop(1, "rgba(5, 7, 19, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function glowCircle(x, y, radius, color, alpha = 0.22) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, withAlpha(color, alpha));
  gradient.addColorStop(0.48, withAlpha(color, alpha * 0.36));
  gradient.addColorStop(1, "rgba(5, 7, 19, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function addShockwave(x, y, color, radius = 22) {
  shockwaves.push({ x, y, color, radius, life: 0.55, maxLife: 0.55 });
}

function drawSprite(sprite, x, y, scale = 3, overrides = {}) {
  const rows = sprite;
  const cols = Math.max(...rows.map((row) => row.length));
  const left = x - (cols * scale) / 2;
  const top = y - (rows.length * scale) / 2;
  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      const key = rows[row][col];
      if (key === ".") continue;
      const color = overrides[key] || SPRITE_COLORS[key];
      if (!color) continue;
      px(left + col * scale, top + row * scale, scale, scale, color);
    }
  }
}

function drawShip32(targetCtx, x, y, scale, parts, flicker = 0) {
  const booster = parts.booster;
  const laser = parts.laser;
  const shield = parts.shield;
  const skin = getEquippedSkin();
  const laserColor = LASER_TIERS[laser - 1].color;
  const shieldColor = [PALETTE.coolDark, PALETTE.cool, PALETTE.violet, PALETTE.green, PALETTE.blueWhite][shield - 1];
  const hull = skin.primary;
  const trim = skin.trim;
  const glow = skin.glow;
  const flame = 5 + booster * 1.8 + flicker * 0.45;
  const q = (dx, dy, w, h, color) => {
    targetCtx.fillStyle = color;
    targetCtx.fillRect(Math.round(x + dx * scale), Math.round(y + dy * scale), Math.round(w * scale), Math.round(h * scale));
  };

  targetCtx.save();
  targetCtx.globalAlpha = 0.2 + shield * 0.035;
  q(-11 - shield, -9 - shield, 22 + shield * 2, 25 + shield * 2, shieldColor);
  targetCtx.restore();

  drawEngineTrail(targetCtx, x, y, scale, booster, flame);
  if (booster >= 2) {
    drawEngineTrail(targetCtx, x - 8 * scale, y - 1 * scale, scale * 0.62, booster - 1, flame * 0.72);
    drawEngineTrail(targetCtx, x + 8 * scale, y - 1 * scale, scale * 0.62, booster - 1, flame * 0.72);
  }
  if (booster >= 4) {
    drawEngineTrail(targetCtx, x - 16 * scale, y - 3 * scale, scale * 0.5, booster, flame * 0.55);
    drawEngineTrail(targetCtx, x + 16 * scale, y - 3 * scale, scale * 0.5, booster, flame * 0.55);
  }

  q(-2, -25, 4, 7, laserColor);
  q(-5, -20, 10, 5, PALETTE.blueWhite);
  q(-7, -16, 14, 6, glow);
  q(-10, -11, 20, 7, PALETTE.ink);
  q(-13, -5, 26, 9, hull);
  q(-9, -7, 18, 17, PALETTE.steelDark);
  q(-6, -12, 12, 10, laserColor);
  q(-3, -11, 5, 5, PALETTE.coolLight);
  q(-1, -9, 2, 2, PALETTE.blueWhite);
  q(-7, 5, 14, 8, PALETTE.ink);
  q(-4, 10, 8, 8, trim);
  q(-1, 10, 2, 8, glow);
  q(-12, -2, 24, 1, PALETTE.blueWhite);
  q(-10, 2, 20, 1, PALETTE.shadow);
  q(-6, 6, 12, 1, PALETTE.steelLight);

  q(-20, -4, 8, 20, trim);
  q(-18, -2, 3, 13, glow);
  q(12, -4, 8, 20, trim);
  q(15, -2, 3, 13, glow);
  q(-27, 1, 12, 9, booster >= 3 ? PALETTE.violet : PALETTE.gold);
  q(15, 1, 12, 9, booster >= 3 ? PALETTE.violet : PALETTE.gold);
  q(-30, 5, 10, 6, booster >= 4 ? PALETTE.green : PALETTE.goldDark);
  q(20, 5, 10, 6, booster >= 4 ? PALETTE.green : PALETTE.goldDark);
  q(-25, 2, 3, 6, PALETTE.goldLight);
  q(22, 2, 3, 6, PALETTE.goldLight);
  if (booster >= 5) {
    q(-35, -2, 7, 15, PALETTE.green);
    q(28, -2, 7, 15, PALETTE.green);
    q(-33, 0, 2, 10, PALETTE.blueWhite);
    q(31, 0, 2, 10, PALETTE.blueWhite);
  }

  if (laser >= 2) {
    q(-13, -14, 4, 14, laserColor);
    q(9, -14, 4, 14, laserColor);
    q(-12, -13, 1, 10, PALETTE.blueWhite);
    q(10, -13, 1, 10, PALETTE.blueWhite);
  }
  if (laser >= 4) {
    q(-24, -12, 5, 15, PALETTE.pink);
    q(19, -12, 5, 15, PALETTE.pink);
  }
  if (laser >= 5) {
    q(-2, -23, 4, 9, PALETTE.green);
  }

  if (shield >= 2) {
    q(-12, -8, 4, 17, shieldColor);
    q(8, -8, 4, 17, shieldColor);
    q(-11, -7, 1, 12, PALETTE.blueWhite);
    q(10, -7, 1, 12, PALETTE.blueWhite);
  }
  if (shield >= 4) {
    q(-7, -14, 14, 3, shieldColor);
    q(-9, 12, 18, 3, shieldColor);
  }
}

function drawEngineTrail(targetCtx, x, y, scale, booster, flame) {
  const q = (dx, dy, w, h, color, alpha = 1) => {
    targetCtx.save();
    targetCtx.globalAlpha = alpha;
    targetCtx.fillStyle = color;
    targetCtx.fillRect(Math.round(x + dx * scale), Math.round(y + dy * scale), Math.round(w * scale), Math.round(h * scale));
    targetCtx.restore();
  };
  const tail = flame + booster * 1.7;
  q(-3, 13, 6, tail * 0.45, PALETTE.blueWhite, 0.75);
  q(-4, 15, 8, tail * 0.58, PALETTE.gold, 0.82);
  q(-3, 18, 6, tail * 0.7, PALETTE.orange, 0.7);
  q(-2, 22, 4, tail * 0.85, booster >= 4 ? PALETTE.violet : PALETTE.hot, 0.55);
  q(-1, 27, 2, tail, booster >= 5 ? PALETTE.green : PALETTE.hotLight, 0.38);
  for (let i = 0; i < 4; i++) {
    const side = i % 2 ? 1 : -1;
    q(side * (2 + i), 20 + i * 5, 1 + (i % 2), 2, i % 2 ? PALETTE.goldLight : PALETTE.coolLight, 0.45 - i * 0.07);
  }
}

function startRun() {
  if (paused) {
    paused = false;
    pauseButton.textContent = "⏸";
    overlay.classList.add("hidden");
    lastTime = performance.now();
    return;
  }
  dailyChallenge = false;
  ensureAudio();
  if (settings.music) setMusic(true);
  resetGame();
  lastTime = performance.now();
}

function startDailyRun() {
  dailyChallenge = true;
  ensureAudio();
  if (settings.music) setMusic(true);
  resetGame();
  nextBossWave = 2;
  bossBanner = "Daily Challenge";
  bossBannerTimer = 2.2;
  lastTime = performance.now();
}

function togglePause() {
  if (!running || gameOver) return;
  paused = !paused;
  pauseButton.textContent = paused ? "▶️" : "⏸";
  overlay.querySelector("h1").textContent = "Paused";
  overlay.querySelector("p").textContent = "Resume the run or return to the main menu.";
  startButton.textContent = "Resume";
  overlay.classList.remove("game-over");
  overlay.classList.toggle("hidden", !paused);
  hideMenuPanels();
}

function returnToMenu() {
  running = false;
  gameOver = false;
  paused = false;
  bullets.length = 0;
  enemyBullets.length = 0;
  enemies.length = 0;
  particles.length = 0;
  shockwaves.length = 0;
  powerups.length = 0;
  player.shootingPointers.clear();
  gameActions.classList.remove("visible");
  pauseButton.textContent = "⏸";
  overlay.classList.remove("game-over");
  overlay.querySelector("h1").textContent = "Shadow Blaster";
  startButton.textContent = "Start Run";
  gameShell.classList.add("menu-open");
  overlay.classList.remove("hidden");
  hideMenuPanels();
  updateMenuCopy();
  updateHud();
}

function shoot() {
  runStats.shots += 1;
  playSound("shoot");
  const tier = Math.max(equipped.laser, Math.floor(player.power), ammoTimer > 0 ? 5 : 1);
  const laser = LASER_TIERS[tier - 1];
  const color = ammoTimer > 0 && Math.floor(performance.now() / 80) % 2 ? PALETTE.green : laser.color;
  const pierce = equippedMod === "pierce" ? 1 : 0;
  bullets.push({ x: player.x, y: player.y - 18, w: 5 + tier, h: 14 + tier, hitW: 4 + tier * 0.45, hitH: 12 + tier, vx: 0, v: -640 - tier * 24, color, pierce });
  if (tier >= 2) {
    bullets.push({ x: player.x - laser.spread, y: player.y - 12, w: 5, h: 13, hitW: 4, hitH: 11, vx: -34, v: -610 - tier * 20, color });
    bullets.push({ x: player.x + laser.spread, y: player.y - 12, w: 5, h: 13, hitW: 4, hitH: 11, vx: 34, v: -610 - tier * 20, color });
  }
  if (tier >= 3) {
    bullets.push({ x: player.x - 22, y: player.y - 4, w: 4, h: 12, hitW: 3, hitH: 10, vx: -18, v: -585 - tier * 18, color: tier >= 4 ? PALETTE.violet : PALETTE.hot });
    bullets.push({ x: player.x + 22, y: player.y - 4, w: 4, h: 12, hitW: 3, hitH: 10, vx: 18, v: -585 - tier * 18, color: tier >= 4 ? PALETTE.violet : PALETTE.hot });
  }
  if (tier >= 5) {
    bullets.push({ x: player.x - 32, y: player.y + 4, w: 4, h: 10, hitW: 3, hitH: 8, vx: -42, v: -560, color: PALETTE.green });
    bullets.push({ x: player.x + 32, y: player.y + 4, w: 4, h: 10, hitW: 3, hitH: 8, vx: 42, v: -560, color: PALETTE.green });
  }
  if (equippedMod === "split") {
    bullets.push({ x: player.x - 9, y: player.y - 8, w: 4, h: 11, hitW: 3, hitH: 9, vx: -125, v: -520, color: PALETTE.pink });
    bullets.push({ x: player.x + 9, y: player.y - 8, w: 4, h: 11, hitW: 3, hitH: 9, vx: 125, v: -520, color: PALETTE.pink });
  }
  if (equippedMod === "burst") {
    bullets.push({ x: player.x, y: player.y + 4, w: 4 + tier, h: 10 + tier, hitW: 4, hitH: 10, vx: 0, v: -470 - tier * 16, color: PALETTE.green });
  }
}

function spawnEnemy() {
  if (width < 80) return;
  const elite = Math.random() < Math.min(0.12 + wave * 0.015, 0.32);
  const pool = elite
    ? ["elite"]
    : wave >= 5
      ? ["shard", "wraith", "fang", "drone"]
      : wave >= 3
        ? ["shard", "wraith", "drone"]
        : ["shard", "drone"];
  const modelId = pool[Math.floor(Math.random() * pool.length)];
  const model = ENEMY_MODELS.find((entry) => entry.id === modelId) || ENEMY_MODELS[0];
  enemies.push({
    type: "grunt",
    modelId,
    x: rand(26, width - 26),
    y: -30,
    w: elite ? 32 : modelId === "fang" ? 30 : modelId === "drone" ? 22 : 24,
    h: elite ? 26 : modelId === "fang" ? 25 : modelId === "drone" ? 20 : 22,
    hitW: elite ? 24 : modelId === "fang" ? 22 : modelId === "drone" ? 16 : 18,
    hitH: elite ? 20 : modelId === "fang" ? 18 : modelId === "drone" ? 15 : 16,
    hp: elite ? 3 + Math.floor(wave / 3) : 1 + model.hp + Math.floor(wave / 6),
    maxHp: elite ? 3 + Math.floor(wave / 3) : 1 + model.hp + Math.floor(wave / 6),
    v: rand(80, 130) + wave * 12 + (modelId === "shard" ? 22 : modelId === "fang" ? -8 : 0),
    drift: rand(-50, 50),
    fire: elite ? rand(1.0, 2.0) : rand(2.4, 4.2),
    phase: rand(0, Math.PI * 2),
    hitFlash: 0,
    color: model.color,
    accent: model.accent,
    elite
  });
}

function hasBoss() {
  return enemies.some((enemy) => enemy.type === "boss");
}

function spawnBoss(mega = false) {
  const zone = getCurrentNebula();
  if (mega) {
    const boss = zone.mega || NEBULA_ZONES[0].mega;
    const hp = 190 + wave * 18;
    enemies.push({
      type: "boss",
      mega: true,
      modelId: boss.modelId,
      x: width / 2,
      y: -110,
      baseX: width / 2,
      targetX: width / 2,
      targetY: 132,
      moveTimer: 0.42,
      w: Math.min(178, width - 34),
      h: 110,
      hitW: Math.min(126, width - 70),
      hitH: 72,
      hp,
      maxHp: hp,
      v: 54,
      drift: 0.82,
      fire: 0.9,
      phase: 0,
      phaseLevel: 0,
      hitFlash: 0,
      pattern: "mega",
      name: boss.name,
      color: boss.color,
      accent: boss.accent,
      elite: true
    });
    bossBanner = boss.name;
    bossBannerTimer = 3;
    mutationFlash = 1.6;
    shake = 18;
    addShockwave(width / 2, 132, boss.color, 58);
    return;
  }
  const bossTypes = zone.bosses || NEBULA_ZONES[0].bosses;
  const pick = bossTypes[Math.floor(Math.random() * bossTypes.length)];
  enemies.push({
    type: "boss",
    x: width / 2,
    y: -70,
    baseX: width / 2,
    targetX: width / 2,
    targetY: 116,
    moveTimer: 0.7,
    w: pick.w,
    h: pick.h,
    hitW: pick.w * 0.72,
    hitH: pick.h * 0.68,
    hp: pick.hp + wave * (pick.hpWave || 7),
    maxHp: pick.hp + wave * (pick.hpWave || 7),
    v: 72,
    drift: rand(0.8, 1.3),
    fire: 1.25,
    phase: 0,
    hitFlash: 0,
    pattern: pick.pattern,
    modelId: pick.modelId,
    name: pick.name,
    color: pick.color,
    accent: pick.accent,
    elite: true
  });
  bossBanner = pick.name;
  bossBannerTimer = 2.4;
  mutationFlash = 1.2;
  shake = 10;
}

function spawnPowerup(x, y) {
  if (Math.random() > 0.22) return;
  const roll = Math.random();
  const kind = roll < 0.45 ? "power" : roll < 0.74 ? "ammo" : "shield";
  powerups.push({ x, y, w: 18, h: 18, hitW: 30, hitH: 30, v: 150, kind });
}

function burst(x, y, color, amount = 14) {
  if (!settings.particles) return;
  for (let i = 0; i < amount; i++) {
    particles.push({
      x,
      y,
      vx: rand(-170, 170),
      vy: rand(-170, 170),
      life: rand(0.25, 0.65),
      maxLife: 0.65,
      color,
      size: rand(2, 5)
    });
  }
}

function nextMutation() {
  const options = ["steady", "meteor", "close call", "crossfire", "speed"];
  mutation = options[Math.floor(Math.random() * options.length)];
  mutationTimer = 10;
  mutationFlash = 1.5;
  if (mutation === "meteor") {
    for (let i = 0; i < 4 + wave; i++) spawnEnemy();
  }
}

function updatePlayer(dt) {
  const left = keys.has("ArrowLeft") || keys.has("a");
  const right = keys.has("ArrowRight") || keys.has("d");
  const up = keys.has("ArrowUp") || keys.has("w");
  const down = keys.has("ArrowDown") || keys.has("s");

  const booster = getBoosterTier();
  const response = Math.max(booster.response, Number(settings.touchSensitivity) || booster.response);
  if (player.steerPointer !== null) {
    player.x += (player.targetX - player.x) * Math.min(1, dt * response);
    player.y += (player.targetY - player.y) * Math.min(1, dt * response);
  } else {
    player.x += ((right ? 1 : 0) - (left ? 1 : 0)) * booster.speed * dt;
    player.y += ((down ? 1 : 0) - (up ? 1 : 0)) * booster.speed * dt;
  }

  player.x = clamp(player.x, 18, width - 18);
  player.y = clamp(player.y, 88, height - 34);
  player.invincible = Math.max(0, player.invincible - dt);
  player.powerTimer = Math.max(0, player.powerTimer - dt);
  ammoTimer = Math.max(0, ammoTimer - dt);
  if (player.powerTimer === 0) player.power = Math.max(equipped.laser, player.power - dt * 0.3);

  const shooting = settings.autoFire || player.shootingPointers.size > 0 || keys.has(" ") || keys.has("Enter");
  shootTimer -= dt;
  if (shooting && shootTimer <= 0) {
    shoot();
    shootTimer = ammoTimer > 0 ? 0.055 : getLaserTier().cooldown;
  }

  if (settings.particles && running && Math.random() < 0.8) {
    const booster = equipped.booster;
    particles.push({
      x: player.x + rand(-5 - booster, 5 + booster),
      y: player.y + 22,
      vx: rand(-14, 14),
      vy: rand(95, 155) + booster * 10,
      life: rand(0.18, 0.36),
      maxLife: 0.36,
      color: booster >= 5 ? PALETTE.green : booster >= 4 ? PALETTE.violet : Math.random() < 0.45 ? PALETTE.gold : PALETTE.hot,
      size: rand(1.2, 3.2)
    });
  }
}

function updateGame(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;
  bgTime += dt;

  updateStars(dt);
  updateDeepSpace(dt);
  updateScenery(dt);
  if (running && !gameOver && !paused) {
    score += dt * 9;
    if (waveBreakTimer > 0) {
      waveBreakTimer = Math.max(0, waveBreakTimer - dt);
      bossBanner = `Next Wave ${Math.ceil(waveBreakTimer)}`;
      bossBannerTimer = 0.2;
      if (waveBreakTimer <= 0) finishWaveBreak();
    } else if (!hasBoss() && !bossPending) {
      waveTimer += dt;
      if (waveTimer >= getWaveDuration()) startWaveBreak();
    }
    mutationTimer -= dt;
    mutationFlash = Math.max(0, mutationFlash - dt);
    bossBannerTimer = Math.max(0, bossBannerTimer - dt);
    bossWarningTimer = Math.max(0, bossWarningTimer - dt);
    shake = Math.max(0, shake - dt * 22);
    if (waveBreakTimer <= 0 && mutationTimer <= 0) nextMutation();
    if (waveBreakTimer <= 0 && wave >= nextMegaBossWave && !hasBoss() && !bossPending) {
      bossPending = true;
      bossPendingMega = true;
      bossWarningTimer = 3;
      bossBanner = "Mega Boss Incoming";
      bossBannerTimer = 3;
      playSound("boss");
    } else if (waveBreakTimer <= 0 && wave >= nextBossWave && wave + 1 < nextMegaBossWave && !hasBoss() && !bossPending) {
      bossPending = true;
      bossPendingMega = false;
      bossWarningTimer = 2.2;
      bossBanner = "Boss Incoming";
      bossBannerTimer = 2.2;
      playSound("boss");
    }
    if (bossPending && bossWarningTimer <= 0 && !hasBoss()) {
      bossPending = false;
      spawnBoss(bossPendingMega);
      bossPendingMega = false;
    }

    updatePlayer(dt);
    updateDrones(dt);
    updateBullets(dt);
    if (waveBreakTimer <= 0) updateEnemies(dt);
    updatePowerups(dt);
    updateParticles(dt);
    updateShockwaves(dt);
    updateHud();
  } else if (!paused) {
    updateParticles(dt);
    updateShockwaves(dt);
  }

  draw();
  requestAnimationFrame(updateGame);
}

function updateStars(dt) {
  const boost = mutation === "speed" ? 1.8 : 1;
  for (const star of stars) {
    star.y += star.v * boost * dt;
    if (star.y > height) {
      star.x = Math.random() * width;
      star.y = -4;
    }
  }
}

function updateScenery(dt) {
  for (const item of scenery) {
    item.y += item.v * dt;
    if (item.y - item.r > height + 80) {
      item.x = Math.random() * width;
      item.y = -item.r - rand(30, 220);
      item.r = rand(14, 42);
      item.kind = Math.random() < 0.58 ? "planet" : "ring";
    }
  }
}

function updateDeepSpace(dt) {
  for (const cloud of nebulas) {
    cloud.y += cloud.v * dt;
    cloud.phase += dt * 0.12;
    if (cloud.y - cloud.h > height + 120) {
      cloud.x = Math.random() * width;
      cloud.y = -cloud.h - rand(80, 260);
      cloud.w = rand(160, 340);
      cloud.h = rand(90, 210);
    }
  }

  for (const ribbon of nebulaRibbons) {
    ribbon.y += ribbon.v * dt;
    ribbon.phase += dt * 0.18;
    if (ribbon.y - ribbon.amp > height + 140) {
      ribbon.x = rand(-60, width + 60);
      ribbon.y = -rand(120, 360);
      ribbon.length = rand(260, 560);
      ribbon.amp = rand(32, 92);
      ribbon.thickness = rand(16, 42);
    }
  }

  for (const galaxy of galaxies) {
    galaxy.y += galaxy.v * dt;
    galaxy.spin += dt * 0.06;
    if (galaxy.y - galaxy.r > height + 100) {
      galaxy.x = Math.random() * width;
      galaxy.y = -galaxy.r - rand(90, 300);
      galaxy.r = rand(36, 78);
    }
  }

  for (const cluster of starClusters) {
    cluster.y += cluster.v * dt;
    if (cluster.y - cluster.r > height + 70) {
      cluster.x = Math.random() * width;
      cluster.y = -cluster.r - rand(80, 220);
      cluster.r = rand(20, 58);
    }
  }

  for (const comet of comets) {
    comet.x += comet.vx * dt;
    comet.y += comet.v * dt;
    if (comet.y - comet.len > height + 90 || comet.x < -90 || comet.x > width + 90) {
      comet.x = rand(20, width - 20);
      comet.y = -rand(80, 360);
      comet.vx = rand(-18, 18);
      comet.v = rand(18, 42);
      comet.len = rand(36, 88);
    }
  }
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += (b.vx || 0) * dt;
    b.y += b.v * dt;
    if (settings.particles && Math.random() < 0.75) {
      particles.push({
        x: b.x + rand(-2, 2),
        y: b.y + b.h * 0.35,
        vx: rand(-10, 10),
        vy: 80,
        life: 0.16,
        maxLife: 0.16,
        color: b.color,
        size: rand(1, 3)
      });
    }
    if (b.y < -24 || b.x < -32 || b.x > width + 32) bullets.splice(i, 1);
  }

  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const b = enemyBullets[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (settings.particles && Math.random() < 0.48) {
      particles.push({
        x: b.x + rand(-1, 1),
        y: b.y - b.h * 0.25,
        vx: rand(-8, 8),
        vy: -42,
        life: 0.13,
        maxLife: 0.13,
        color: b.color,
        size: rand(1, 2.6)
      });
    }
    if (b.y > height + 24 || b.x < -24 || b.x > width + 24) {
      enemyBullets.splice(i, 1);
    } else if (player.invincible <= 0 && rectsHit(player, b)) {
      enemyBullets.splice(i, 1);
      hurtPlayer();
    }
  }
}

function updateEnemies(dt) {
  spawnTimer -= dt;
  const spawnRate = Math.max(0.28, 1.05 - wave * 0.055);
  if (spawnTimer <= 0 && !hasBoss()) {
    spawnEnemy();
    spawnTimer = mutation === "speed" ? spawnRate * 0.7 : spawnRate;
  } else if (spawnTimer <= 0) {
    spawnTimer = 0.75;
    if (Math.random() < 0.45) spawnEnemy();
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.type === "boss") {
      updateBoss(e, dt);
    } else {
      updateGrunt(e, dt);
    }
    e.hitFlash = Math.max(0, e.hitFlash - dt);

    for (let j = bullets.length - 1; j >= 0; j--) {
      const shot = bullets[j];
      if (!rectsHit(e, shot)) continue;
      if (shot.pierce > 0) {
        shot.pierce -= 1;
        shot.y -= 8;
      } else {
        bullets.splice(j, 1);
      }
      e.hp -= 1;
      e.hitFlash = 0.12;
      runStats.hits += 1;
      playSound("hit");
      if (e.type === "boss" || Math.random() < 0.25) addShockwave(e.x, e.y, e.type === "boss" ? e.accent : PALETTE.cool, e.type === "boss" ? 18 : 9);
      burst(e.x, e.y, e.type === "boss" ? e.accent : "#23d8ff", e.type === "boss" ? 8 : 4);
      if (e.hp <= 0) {
        defeatEnemy(e);
        enemies.splice(i, 1);
        break;
      }
    }

    if (!enemies[i]) continue;
    if (player.invincible <= 0 && rectsHit(player, e)) {
      if (e.type === "boss") {
        player.invincible = 1.5;
        hurtPlayer();
      } else {
        enemies.splice(i, 1);
        burst(e.x, e.y, "#ff365f", 18);
        hurtPlayer();
      }
    } else if (e.type !== "boss" && e.y > height + 40) {
      enemies.splice(i, 1);
    }
  }
}

function updateGrunt(e, dt) {
    e.phase += dt * (e.elite ? 5.2 : e.modelId === "wraith" ? 6.4 : 4.1);
    const driftBoost = e.modelId === "wraith" ? 1.45 : e.modelId === "drone" ? 0.45 : 1;
    const driftWave = Math.sin(performance.now() / 440 + e.y * 0.02) * e.drift * driftBoost;
    e.y += e.v * (mutation === "speed" ? 1.25 : 1) * dt;
    e.x += driftWave * dt;
    e.x = clamp(e.x, 16, width - 16);
    e.fire -= dt;

    if (e.fire <= 0 && e.y > 20) {
      enemyBullets.push({
        x: e.x,
        y: e.y + 12,
        w: 7,
        h: 7,
        hitW: 5,
        hitH: 5,
        vx: mutation === "crossfire" ? rand(-90, 90) : 0,
        vy: 230 + wave * 18,
        color: e.accent || (e.elite ? "#ff365f" : "#ffe066")
      });
      e.fire = e.elite ? rand(0.9, 1.8) : e.modelId === "drone" ? rand(1.7, 3) : rand(2.2, 4);
    }
}

function updateBoss(e, dt) {
  e.phase += dt;
  const hpRatio = e.hp / e.maxHp;
  const phaseLevel = hpRatio <= 0.15 ? 3 : hpRatio <= 0.4 ? 2 : hpRatio <= 0.7 ? 1 : 0;
  if (phaseLevel > (e.phaseLevel || 0)) {
    e.phaseLevel = phaseLevel;
    e.hitFlash = 0.35;
    bossBanner = e.mega ? `Dreadnought Phase ${phaseLevel + 1}` : `Phase ${phaseLevel + 1}`;
    bossBannerTimer = 1.2;
    shake = 8 + phaseLevel * 4;
    addShockwave(e.x, e.y, e.accent, 24 + phaseLevel * 10);
  }
  e.moveTimer -= dt;
  if (e.moveTimer <= 0) {
    const laneLimit = e.mega ? Math.min(96 + phaseLevel * 10, width * 0.24) : Math.min(138 + phaseLevel * 18, width * 0.34);
    const lane = Math.sin(e.phase * (e.drift + phaseLevel * 0.3)) * laneLimit;
    e.targetX = clamp(width / 2 + lane + rand(-34, 34), e.w / 2 + 8, width - e.w / 2 - 8);
    e.targetY = (e.mega ? 128 : 102) + Math.sin(e.phase * (1.7 + phaseLevel * 0.25)) * (e.mega ? 12 + phaseLevel * 4 : 24 + phaseLevel * 8) + rand(-8, 8);
    e.moveTimer = rand(e.mega ? 0.38 : 0.55, e.mega ? 0.72 : 0.95) * (1 - phaseLevel * 0.12);
  }
  e.x += (e.targetX - e.x) * Math.min(1, dt * ((e.mega ? 2.0 : 2.8) + phaseLevel * 0.7));
  e.y += (e.targetY - e.y) * Math.min(1, dt * ((e.mega ? 1.8 : 2.4) + phaseLevel * 0.5));
  e.x = clamp(e.x, e.w / 2 + 8, width - e.w / 2 - 8);
  e.fire -= dt;
  if (e.fire > 0 || e.y < 70) return;

  if (e.pattern === "mega") {
    bossMegaVolley(e);
    e.fire = 1.05 - phaseLevel * 0.12;
  } else if (e.pattern === "spread") {
    bossSpread(e);
    e.fire = 1.25 - phaseLevel * 0.16;
  } else if (e.pattern === "sweep") {
    bossSweep(e);
    e.fire = 0.55 - phaseLevel * 0.05;
  } else {
    bossBurst(e);
    e.fire = 1.65 - phaseLevel * 0.18;
  }
  if (phaseLevel >= 2 && Math.random() < 0.45) bossSpread(e);
}

function bossSpread(e) {
  for (let i = -2; i <= 2; i++) {
    enemyBullets.push({
      x: e.x + i * 13,
      y: e.y + e.h / 2,
      w: 9,
      h: 9,
      hitW: 6,
      hitH: 6,
      vx: i * 54,
      vy: 220 + Math.abs(i) * 20 + wave * 8,
      color: e.accent
    });
  }
}

function bossSweep(e) {
  const side = Math.sin(e.phase * 3) > 0 ? 1 : -1;
  enemyBullets.push({
    x: e.x + side * e.w * 0.32,
    y: e.y + e.h / 2,
    w: 8,
    h: 18,
    hitW: 5,
    hitH: 13,
    vx: side * 95,
    vy: 285 + wave * 9,
    color: e.color
  });
}

function bossBurst(e) {
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI * 0.14 + i * (Math.PI * 0.72 / 9);
    enemyBullets.push({
      x: e.x,
      y: e.y + e.h / 3,
      w: 8,
      h: 8,
      hitW: 5,
      hitH: 5,
      vx: Math.cos(angle) * 155,
      vy: Math.sin(angle) * 155 + 155,
      color: i % 2 ? e.color : e.accent
    });
  }
}

function bossMegaVolley(e) {
  const phaseLevel = e.phaseLevel || 0;
  bossSweep(e);
  for (let i = -3; i <= 3; i++) {
    enemyBullets.push({
      x: e.x + i * 18,
      y: e.y + e.h * 0.35,
      w: 10,
      h: 10,
      hitW: 6,
      hitH: 6,
      vx: i * (32 + phaseLevel * 10),
      vy: 215 + Math.abs(i) * 16 + wave * 5,
      color: i % 2 ? e.color : e.accent
    });
  }
  if (phaseLevel >= 1) {
    for (const side of [-1, 1]) {
      enemyBullets.push({
        x: e.x + side * e.w * 0.38,
        y: e.y + e.h * 0.15,
        w: 9,
        h: 22,
        hitW: 6,
        hitH: 15,
        vx: side * -105,
        vy: 300 + phaseLevel * 35,
        color: PALETTE.green
      });
    }
  }
  if (phaseLevel >= 2) bossBurst(e);
}

function defeatEnemy(e) {
  markCodex(e.modelId);
  if (e.type === "boss") {
    score += e.mega ? 2200 + wave * 120 : 420 + wave * 45;
    runStats.bosses += 1;
    const bossGap = dailyChallenge ? 2 : 3;
    if (e.mega) {
      nextMegaBossWave += 25;
      nextBossWave = Math.max(nextBossWave, wave + bossGap);
    } else {
      nextBossWave = Math.max(nextBossWave + bossGap, wave + bossGap);
    }
    bossBanner = e.mega ? "Dreadnought Down" : "Boss Down";
    bossBannerTimer = e.mega ? 2.6 : 1.8;
    shake = e.mega ? 28 : 18;
    addShockwave(e.x, e.y, e.color, e.mega ? 78 : 42);
    addShockwave(e.x, e.y, e.accent, e.mega ? 48 : 25);
    burst(e.x, e.y, e.color, e.mega ? 80 : 44);
    burst(e.x, e.y, e.accent, e.mega ? 62 : 34);
    spawnPowerup(e.x - 34, e.y);
    spawnPowerup(e.x, e.y);
    spawnPowerup(e.x + 34, e.y);
    return;
  }
  const model = ENEMY_MODELS.find((entry) => entry.id === e.modelId);
  score += e.elite ? 42 : model?.score || 18;
  runStats.kills += 1;
  burst(e.x, e.y, e.elite ? "#ff365f" : "#ffe066", e.elite ? 24 : 14);
  spawnPowerup(e.x, e.y);
}

function updatePowerups(dt) {
  for (let i = powerups.length - 1; i >= 0; i--) {
    const p = powerups[i];
    if (equippedMod === "magnet") {
      const dx = player.x - p.x;
      const dy = player.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 145 && dist > 1) {
        p.x += (dx / dist) * 170 * dt;
        p.y += (dy / dist) * 170 * dt;
      }
    }
    p.y += p.v * dt;
    if (rectsHit(player, p)) {
      if (p.kind === "shield") {
        player.invincible = 3;
        player.hp = Math.min(getMaxHp(), player.hp + 1);
      } else if (p.kind === "ammo") {
        ammoTimer = 7;
        player.power = 5;
      } else {
        player.power = Math.min(5, Math.max(equipped.laser, Math.floor(player.power) + 1));
        player.powerTimer = 8;
      }
      runStats.pickups += 1;
      playSound("pickup");
      addShockwave(p.x, p.y, p.kind === "ammo" ? PALETTE.green : p.kind === "shield" ? PALETTE.cool : PALETTE.gold, 20);
      burst(p.x, p.y, p.kind === "ammo" ? PALETTE.green : p.kind === "shield" ? "#23d8ff" : "#ffe066", 20);
      powerups.splice(i, 1);
    } else if (p.y > height + 24) {
      powerups.splice(i, 1);
    }
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function updateShockwaves(dt) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const s = shockwaves[i];
    s.life -= dt;
    s.radius += dt * 120;
    if (s.life <= 0) shockwaves.splice(i, 1);
  }
}

function droneCount() {
  if (equipped.laser >= 4) return 2;
  if (equipped.laser >= 2) return 1;
  return 0;
}

function updateDrones(dt) {
  const count = droneCount();
  if (!count) return;
  player.droneFire = (player.droneFire || 0) - dt;
  if (player.droneFire > 0) return;
  for (let i = 0; i < count; i++) {
    const side = count === 1 ? 0 : i === 0 ? -1 : 1;
    const x = player.x + side * 30;
    bullets.push({
      x,
      y: player.y - 10,
      w: 4,
      h: 11,
      hitW: 3,
      hitH: 9,
      v: -540,
      color: equipped.laser >= 4 ? PALETTE.violet : PALETTE.cool
    });
  }
  player.droneFire = equipped.laser >= 4 ? 0.46 : 0.62;
}

function hurtPlayer() {
  player.hp -= 1;
  runStats.damage += 1;
  player.invincible = 1.2;
  addShockwave(player.x, player.y, PALETTE.hot, 24);
  burst(player.x, player.y, "#ff365f", 26);
  if (player.hp <= 0) endGame();
}

function endGame() {
  running = false;
  gameOver = true;
  const finalScore = Math.floor(score);
  const finalWave = wave;
  best = Math.max(best, finalScore);
  const earnedCredits = Math.max(1, Math.floor((finalScore / CREDIT_DIVISOR) * (dailyChallenge ? 1.2 : 1)));
  if (!bankedThisRun) {
    credits += earnedCredits;
    addHallScore(finalScore, finalWave);
    if (dailyChallenge) dailyBest[dailyKey()] = Math.max(dailyBest[dailyKey()] || 0, finalScore);
    updateMissionProgress();
    bankedThisRun = true;
  }
  localStorage.setItem("pixelVoidBest", String(best));
  saveProgress();
  overlay.querySelector("h1").textContent = "Game Over";
  overlay.querySelector("p").textContent = `Score ${finalScore}. Banked ${earnedCredits} credits for ship parts${dailyChallenge ? " with the daily bonus" : ""}.`;
  renderSummary(finalScore, earnedCredits, finalWave);
  startButton.textContent = "Run It Back";
  overlay.classList.add("game-over");
  gameShell.classList.add("menu-open");
  overlay.classList.remove("hidden");
  hideMenuPanels(summary);
  summary.classList.remove("hidden");
  gameActions.classList.remove("visible");
  updateHud();
}

function draw() {
  const offsetX = settings.shake && shake > 0 ? rand(-shake, shake) : 0;
  const offsetY = settings.shake && shake > 0 ? rand(-shake, shake) : 0;
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.fillStyle = zoneColor("dark", "#050713");
  ctx.fillRect(0, 0, width, height);
  drawImageBackgrounds();
  drawDeepSpace();
  drawScenery();
  drawStars();
  drawCombatAtmosphere();
  drawMutation();

  for (const p of powerups) drawPowerup(p);
  for (const b of bullets) drawBullet(b);
  for (const b of enemyBullets) drawEnemyBullet(b);
  for (const e of enemies) drawEnemy(e);
  drawDrones();
  drawPlayer();
  if (debugHitboxes) drawHitboxes();
  drawShockwaves();
  drawParticles();
  ctx.restore();
  drawBossBanner();
}

function drawStars() {
  const zone = getCurrentNebula();
  for (const star of stars) {
    const bright = star.s > 2.4;
    ctx.fillStyle = bright ? (star.v > 115 ? zone.colors.secondary : zone.colors.star) : "#65708c";
    ctx.fillRect(Math.floor(star.x), Math.floor(star.y), Math.ceil(star.s), Math.ceil(star.s));
    if (bright) ctx.fillRect(Math.floor(star.x) - 1, Math.floor(star.y), 1, 1);
    if (running && (mutation === "speed" || star.v > 125)) {
      ctx.save();
      ctx.globalAlpha = mutation === "speed" ? 0.42 : 0.2;
      ctx.strokeStyle = bright ? zone.colors.star : "#65708c";
      ctx.lineWidth = Math.max(1, star.s * 0.45);
      ctx.beginPath();
      ctx.moveTo(star.x, star.y - star.v * 0.035);
      ctx.lineTo(star.x, star.y + star.v * 0.018);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawCombatAtmosphere() {
  if (!running || paused || gameOver) return;
  const zone = getCurrentNebula();
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const speed = mutation === "speed" ? 1.8 : 1;
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = zone.colors.secondary;
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(bgTime + x) * 10, 72);
    ctx.lineTo(x - 26, height);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 18; i++) {
    const x = (i * 53 + bgTime * 90 * speed) % (width + 100) - 50;
    const y = 120 + ((i * 97 + bgTime * 140 * speed) % Math.max(1, height - 160));
    ctx.strokeStyle = i % 3 === 0 ? zone.colors.accent : zone.colors.secondary;
    ctx.lineWidth = i % 4 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 18, y + 36 * speed);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const focus = ctx.createRadialGradient(player.x, player.y, 12, player.x, player.y, 120);
  focus.addColorStop(0, withAlpha(getLaserTier().color, 0.13));
  focus.addColorStop(1, "rgba(5, 7, 19, 0)");
  ctx.fillStyle = focus;
  ctx.fillRect(player.x - 130, player.y - 130, 260, 260);
  ctx.restore();
}

function drawImageBackgrounds() {
  if (!backgroundLayers.some((layer) => layer.loaded)) return;
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  for (const layer of backgroundLayers) {
    if (!layer.loaded) continue;
    const img = layer.image;
    const cover = Math.max(width / img.width, height / img.height) * layer.scale;
    const drawW = img.width * cover;
    const drawH = img.height * cover;
    const panX = Math.sin(bgTime * layer.drift + layer.offset * Math.PI * 2) * Math.max(20, drawW - width) * 0.18;
    const loop = ((bgTime * layer.speed + layer.offset) % 1);
    const y = -drawH * loop;
    const x = (width - drawW) / 2 + panX;
    const pulse = 0.92 + Math.sin(bgTime * 0.18 + layer.offset * 6) * 0.08;
    ctx.globalAlpha = layer.alpha * pulse;
    ctx.drawImage(img, x, y, drawW, drawH);
    ctx.drawImage(img, x, y + drawH, drawW, drawH);
    if (y > 0) ctx.drawImage(img, x, y - drawH, drawW, drawH);
  }
  const vignette = ctx.createRadialGradient(width / 2, height * 0.45, height * 0.1, width / 2, height / 2, height * 0.78);
  vignette.addColorStop(0, "rgba(5, 7, 19, 0)");
  vignette.addColorStop(1, "rgba(2, 3, 11, 0.58)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawDeepSpace() {
  ctx.save();
  for (const cloud of nebulas) {
    const wobble = Math.sin(cloud.phase) * 18;
    const gradient = ctx.createRadialGradient(
      cloud.x + wobble,
      cloud.y,
      8,
      cloud.x + wobble,
      cloud.y,
      Math.max(cloud.w, cloud.h) * 0.62
    );
    gradient.addColorStop(0, withAlpha(cloud.colorA, 0.18));
    gradient.addColorStop(0.45, withAlpha(cloud.colorB, 0.09));
    gradient.addColorStop(1, "rgba(5, 7, 19, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(cloud.x - cloud.w / 2, cloud.y - cloud.h / 2, cloud.w, cloud.h);

    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 8; i++) {
      const pxX = cloud.x - cloud.w * 0.4 + i * cloud.w * 0.11 + Math.sin(cloud.phase + i) * 8;
      const pxY = cloud.y + Math.cos(cloud.phase * 1.3 + i) * cloud.h * 0.24;
      px(pxX, pxY, 18 + i * 2, 3, cloud.colorA);
    }
    ctx.globalAlpha = 0.16;
    for (let i = 0; i < 12; i++) {
      const dustX = cloud.x - cloud.w * 0.48 + ((i * 37) % cloud.w);
      const dustY = cloud.y - cloud.h * 0.36 + Math.sin(cloud.phase + i * 0.7) * cloud.h * 0.32;
      px(dustX, dustY, 2 + (i % 3), 1 + (i % 2), i % 2 ? PALETTE.blueWhite : cloud.colorB);
    }
    ctx.globalAlpha = 1;
  }

  for (const ribbon of nebulaRibbons) {
    drawNebulaRibbon(ribbon);
  }

  for (const galaxy of galaxies) {
    drawGalaxy(galaxy);
  }
  for (const cluster of starClusters) {
    drawStarCluster(cluster);
  }
  for (const comet of comets) {
    drawComet(comet);
  }
  ctx.restore();
}

function drawNebulaRibbon(ribbon) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const steps = 7;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = ribbon.y + t * ribbon.length;
    const x = ribbon.x + Math.sin(ribbon.phase + t * Math.PI * 2.2) * ribbon.amp + Math.cos(ribbon.phase * 0.7 + t * 4) * ribbon.amp * 0.35;
    points.push({ x, y });
  }

  for (let pass = 0; pass < 3; pass++) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }
    const color = pass === 0 ? ribbon.color : pass === 1 ? ribbon.accent : PALETTE.blueWhite;
    ctx.strokeStyle = withAlpha(color, pass === 0 ? 0.08 : pass === 1 ? 0.045 : 0.025);
    ctx.lineWidth = ribbon.thickness * (1 - pass * 0.32);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  ctx.globalAlpha = 0.14;
  for (let i = 0; i < points.length; i++) {
    glowCircle(points[i].x, points[i].y, ribbon.thickness * 1.1, i % 2 ? ribbon.color : ribbon.accent, 0.035);
    px(points[i].x + Math.sin(ribbon.phase + i) * 5, points[i].y + Math.cos(ribbon.phase + i) * 5, 2, 2, PALETTE.blueWhite);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function withAlpha(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawGalaxy(galaxy) {
  ctx.save();
  ctx.translate(galaxy.x, galaxy.y);
  ctx.rotate(galaxy.spin);
  ctx.globalAlpha = 0.42;
  const core = ctx.createRadialGradient(0, 0, 1, 0, 0, galaxy.r);
  core.addColorStop(0, withAlpha(PALETTE.blueWhite, 0.55));
  core.addColorStop(0.22, withAlpha(galaxy.color, 0.25));
  core.addColorStop(1, "rgba(5, 7, 19, 0)");
  ctx.fillStyle = core;
  ctx.fillRect(-galaxy.r, -galaxy.r, galaxy.r * 2, galaxy.r * 2);

  for (let arm = 0; arm < 2; arm++) {
    ctx.rotate(Math.PI);
    for (let i = 0; i < 18; i++) {
      const t = i / 18;
      const angle = t * Math.PI * 1.35;
      const r = galaxy.r * (0.18 + t * 0.82);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r * 0.38;
      const size = Math.max(1, 4 - t * 3);
      px(x, y, size * 2, size, i % 3 === 0 ? PALETTE.blueWhite : galaxy.color);
      if (i % 5 === 0) px(x + 3, y - 2, 2, 2, PALETTE.goldLight);
    }
  }
  ctx.restore();
}

function drawStarCluster(cluster) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.52;
  glowCircle(cluster.x, cluster.y, cluster.r * 0.8, cluster.color, 0.08);
  for (let i = 0; i < 18; i++) {
    const angle = cluster.seed + i * 2.399;
    const dist = cluster.r * ((i % 7) / 7 + 0.18);
    const x = cluster.x + Math.cos(angle) * dist;
    const y = cluster.y + Math.sin(angle * 1.7) * dist * 0.65;
    const size = i % 5 === 0 ? 3 : 1 + (i % 2);
    px(x, y, size, size, i % 4 === 0 ? PALETTE.goldLight : cluster.color);
    if (i % 6 === 0) {
      px(x - 3, y, 7, 1, cluster.color);
      px(x, y - 3, 1, 7, cluster.color);
    }
  }
  ctx.restore();
}

function drawComet(comet) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const tail = ctx.createLinearGradient(comet.x, comet.y - comet.len, comet.x, comet.y);
  tail.addColorStop(0, "rgba(5, 7, 19, 0)");
  tail.addColorStop(0.65, withAlpha(comet.color, 0.16));
  tail.addColorStop(1, withAlpha(PALETTE.blueWhite, 0.62));
  ctx.strokeStyle = tail;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(comet.x - comet.vx * 0.8, comet.y - comet.len);
  ctx.lineTo(comet.x, comet.y);
  ctx.stroke();
  glowCircle(comet.x, comet.y, 9, comet.color, 0.18);
  px(comet.x - 1, comet.y - 1, 3, 3, PALETTE.blueWhite);
  ctx.restore();
}

function drawScenery() {
  ctx.save();
  ctx.globalAlpha = 0.38;
  for (const item of scenery) {
    if (item.kind === "planet") {
      drawPlanet(item);
    } else {
      drawRingedPlanet(item);
    }
  }
  ctx.restore();
}

function drawPlanet(item) {
  const grad = ctx.createRadialGradient(item.x - item.r * 0.35, item.y - item.r * 0.35, 2, item.x, item.y, item.r);
  grad.addColorStop(0, withAlpha(PALETTE.steelLight, 0.5));
  grad.addColorStop(0.35, withAlpha(item.color, 0.5));
  grad.addColorStop(1, withAlpha(PALETTE.shadow, 0.72));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
  ctx.fill();
  px(item.x - item.r * 0.52, item.y - item.r * 0.18, item.r * 0.9, 3, PALETTE.steelLight);
  px(item.x - item.r * 0.3, item.y + item.r * 0.16, item.r * 0.8, 4, PALETTE.shadow);
  px(item.x - item.r * 0.1, item.y - item.r * 0.42, item.r * 0.35, 3, PALETTE.coolLight);
}

function drawRingedPlanet(item) {
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.rotate(-0.22);
  ctx.strokeStyle = withAlpha(PALETTE.goldLight, 0.46);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, item.r * 1.65, item.r * 0.42, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = withAlpha(PALETTE.coolLight, 0.22);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(0, 0, item.r * 1.92, item.r * 0.52, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  drawPlanet(item);
}

function drawMutation() {
  if (!running || mutation === "steady" || mutationFlash <= 0) return;
  ctx.save();
  ctx.globalAlpha = Math.min(0.8, mutationFlash);
  ctx.fillStyle = mutation === "crossfire" ? "#ff365f" : mutation === "speed" ? "#23d8ff" : "#ffe066";
  ctx.font = "700 18px 'Courier New'";
  ctx.textAlign = "center";
  ctx.fillText(mutation.toUpperCase(), width / 2, 82);
  ctx.restore();
}

function drawBossBanner() {
  if (!running || bossBannerTimer <= 0) return;
  ctx.save();
  ctx.globalAlpha = Math.min(1, bossBannerTimer);
  ctx.fillStyle = bossBanner === "Boss Down" ? "#23d8ff" : "#ff365f";
  ctx.font = "700 22px 'Courier New'";
  ctx.textAlign = "center";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 0;
  ctx.fillText(bossBanner.toUpperCase(), width / 2, 118);
  ctx.restore();
}

function drawHitboxes() {
  ctx.save();
  ctx.lineWidth = 1;
  const drawBox = (entity, color) => {
    const box = hitBox(entity);
    ctx.strokeStyle = color;
    ctx.strokeRect(box.x - box.w / 2, box.y - box.h / 2, box.w, box.h);
  };
  drawBox(player, PALETTE.green);
  for (const b of bullets) drawBox(b, PALETTE.coolLight);
  for (const b of enemyBullets) drawBox(b, PALETTE.hotLight);
  for (const e of enemies) drawBox(e, e.type === "boss" ? PALETTE.gold : PALETTE.violet);
  for (const p of powerups) drawBox(p, PALETTE.green);
  ctx.restore();
}

function drawPlayer() {
  if (!running && !gameOver) return;
  if (player.invincible > 0 && Math.floor(performance.now() / 90) % 2 === 0) return;
  const x = player.x;
  const y = player.y;
  const flame = 7 + Math.floor(performance.now() / 80) % 5;
  const laser = getLaserTier();
  glowRect(x, y, 30 + compositeShipTier() * 4, 38 + compositeShipTier() * 3, laser.color, 0.07);
  drawShip32(ctx, x, y, 1.55, equipped, flame);

  for (let i = 0; i < player.hp; i++) {
    px(14 + i * 18, height - 27, 13, 13, PALETTE.hotDark);
    px(16 + i * 18, height - 29, 9, 9, PALETTE.hot);
    px(18 + i * 18, height - 27, 5, 5, PALETTE.gold);
  }
}

function drawDrones() {
  if (!running || paused || gameOver) return;
  const count = droneCount();
  if (!count) return;
  for (let i = 0; i < count; i++) {
    const side = count === 1 ? 0 : i === 0 ? -1 : 1;
    const bob = Math.sin(bgTime * 5 + i) * 4;
    const x = player.x + side * 30;
    const y = player.y + 8 + bob;
    glowCircle(x, y, 18, equipped.laser >= 4 ? PALETTE.violet : PALETTE.cool, 0.08);
    px(x - 6, y - 5, 12, 10, PALETTE.steelDark);
    px(x - 4, y - 7, 8, 6, equipped.laser >= 4 ? PALETTE.violet : PALETTE.cool);
    px(x - 2, y - 10, 4, 6, PALETTE.blueWhite);
    px(x - 5, y + 4, 10, 3, PALETTE.hot);
  }
}

function drawEnemy(e) {
  if (e.type === "boss") {
    drawBoss(e);
    return;
  }
  const main = e.color || (e.elite ? PALETTE.hot : PALETTE.gold);
  const accent = e.accent || (e.elite ? PALETTE.violet : PALETTE.cool);
  const dark = e.elite || e.modelId === "fang" ? PALETTE.hotDark : e.modelId === "wraith" ? PALETTE.violetDark : PALETTE.goldDark;
  const x = e.x;
  const y = e.y;
  const spin = Math.floor(e.phase * 8) % 4;
  const flash = e.hitFlash > 0 || (e.elite && Math.floor(performance.now() / 110) % 6 === 0);
  const wing = 5 + spin * 2;
  glowRect(x, y, e.w + spin * 3, e.h + spin * 3, flash ? PALETTE.ink : main, flash ? 0.22 : 0.08);
  if (spin === 0) {
    centerPx(x, y, e.w + 8, 6, accent);
    centerPx(x, y, 6, e.h + 8, accent);
  } else if (spin === 1) {
    centerPx(x - wing, y - wing, 7, 7, accent);
    centerPx(x + wing, y + wing, 7, 7, accent);
    centerPx(x + wing, y - wing, 5, 5, main);
    centerPx(x - wing, y + wing, 5, 5, main);
  } else if (spin === 2) {
    centerPx(x, y, e.w + 2, 8, main);
    centerPx(x, y, 8, e.h + 2, main);
  } else {
    centerPx(x - wing, y + wing, 7, 7, accent);
    centerPx(x + wing, y - wing, 7, 7, accent);
    centerPx(x - wing, y - wing, 5, 5, main);
    centerPx(x + wing, y + wing, 5, 5, main);
  }
  const overrides = flash ? {
    R: PALETTE.ink,
    r: PALETTE.steel,
    H: PALETTE.blueWhite,
    Y: PALETTE.ink,
    Z: PALETTE.blueWhite,
    y: PALETTE.steel,
    G: PALETTE.hot
  } : {
    Y: main,
    Z: accent,
    y: dark,
    R: main,
    H: accent,
    V: accent,
    P: PALETTE.pink
  };
  drawSprite(e.elite ? SPRITES.elite : SPRITES.grunt, x, y, e.elite ? 4 : 3, overrides);
  if (e.modelId === "fang") {
    px(x - 14, y - 3, 6, 18, PALETTE.hotLight);
    px(x + 8, y - 3, 6, 18, PALETTE.hotLight);
  } else if (e.modelId === "drone") {
    glowCircle(x, y, 18, PALETTE.cool, 0.12);
    px(x - 12, y + 9, 24, 3, PALETTE.coolLight);
  } else if (e.modelId === "wraith") {
    px(x - 16, y + 10, 32, 3, PALETTE.pink);
  }
  px(x - e.w / 2 + 6, y - e.h / 2 + 3, e.w * 0.35, 3, flash ? PALETTE.blueWhite : (e.elite ? PALETTE.hotLight : PALETTE.goldLight));
  px(x + e.w / 2 - 9, y - e.h / 2 + 7, 4, e.h * 0.42, e.elite ? PALETTE.hotDark : PALETTE.goldDark);
  px(x - 2, y + e.h / 2, 4, 6 + spin, flash ? PALETTE.hot : PALETTE.gold);
  if (e.maxHp > 1) {
    px(e.x - e.w / 2, e.y - e.h / 2 - 7, e.w, 3, PALETTE.shadow);
    px(e.x - e.w / 2, e.y - e.h / 2 - 7, e.w * (e.hp / e.maxHp), 3, PALETTE.cool);
  }
}

function drawBoss(e) {
  if (e.mega) {
    drawMegaBoss(e);
    return;
  }
  const x = e.x;
  const y = e.y;
  const tick = performance.now() / 1000;
  const flash = e.hitFlash > 0;
  const pulse = Math.floor(tick * 8) % 2;
  const phaseLevel = e.phaseLevel || 0;
  const eyeColor = flash ? PALETTE.ink : (pulse ? PALETTE.green : e.accent);
  glowRect(x, y, e.w + pulse * 8 + phaseLevel * 10, e.h + pulse * 8 + phaseLevel * 10, flash ? PALETTE.ink : e.color, flash ? 0.22 : 0.11 + phaseLevel * 0.03);
  px(x - e.w / 2 - 20, y - 15 + pulse * 3, 10, 32, e.accent);
  px(x + e.w / 2 + 10, y - 15 + pulse * 3, 10, 32, e.accent);
  px(x - e.w / 2 - 25, y - 4 - pulse * 3, 8, 15, PALETTE.violet);
  px(x + e.w / 2 + 17, y - 4 - pulse * 3, 8, 15, PALETTE.violet);
  drawSprite(SPRITES.bossCore, x, y, 7, {
    R: flash ? PALETTE.ink : e.color,
    H: PALETTE.hotLight,
    r: PALETTE.hotDark,
    V: e.accent,
    P: PALETTE.pink,
    v: PALETTE.violetDark,
    G: eyeColor,
    g: PALETTE.greenDark,
    Y: e.accent,
    Z: PALETTE.goldLight,
    s: PALETTE.steelLight
  });
  drawBossZoneDetails(e, pulse, flash);
  px(x - e.w / 2 + 10, y - e.h / 2 + 16, e.w * 0.38, 4, PALETTE.blueWhite);
  px(x + e.w / 2 - 22, y - e.h / 2 + 18, 7, e.h * 0.5, PALETTE.shadow);
  px(x - e.w / 2 + 5, y - e.h / 2 + 9, 12, 5, PALETTE.steelLight);
  px(x + e.w / 2 - 17, y - e.h / 2 + 9, 12, 5, PALETTE.shadow);
  px(x - e.w / 2 + 12, y - e.h / 2 + 4, e.w - 24, 8, e.accent);
  px(x - e.w / 2 + 20, y - e.h / 2 + 7, e.w - 40, 2, PALETTE.goldLight);
  px(x - 18, y + 2, 36, 10, PALETTE.shadow);
  px(x - 12, y + 5, 24, 4, PALETTE.hot);
  px(x - 8, y + 1, 16, 2, PALETTE.hotLight);
  px(x - e.w / 2 - 13, y - 5, 13, 34, e.accent);
  px(x + e.w / 2, y - 5, 13, 34, e.accent);
  px(x - e.w / 2 - 10, y - 1, 5, 23, PALETTE.blueWhite);
  px(x + e.w / 2 + 5, y - 1, 5, 23, PALETTE.shadow);
  px(x - e.w / 2 - 18, y + 6 + pulse * 4, 8, 17, PALETTE.steel);
  px(x + e.w / 2 + 10, y + 6 + pulse * 4, 8, 17, PALETTE.steel);
  px(x - 30, y + e.h / 2 - 10, 60, 10, e.accent);
  px(x - 18, y + e.h / 2 - 2, 36, 8, PALETTE.steelDark);
  px(x - 28, y + e.h / 2 - 8, 14, 3, PALETTE.steelLight);
  px(x + 14, y + e.h / 2 - 8, 14, 3, PALETTE.shadow);
  for (let i = -1; i <= 1; i++) {
    px(x + i * 18 - 4, y + e.h / 2 + 6, 8, 8 + pulse * 5, pulse ? PALETTE.hot : PALETTE.gold);
  }
  if (phaseLevel >= 1) {
    px(x - e.w / 2 - 30, y - 22, 10, 18 + phaseLevel * 7, e.color);
    px(x + e.w / 2 + 20, y - 22, 10, 18 + phaseLevel * 7, e.color);
  }
  if (phaseLevel >= 2) {
    glowCircle(x, y, e.w * 0.72, e.accent, 0.08);
    px(x - 4, y - e.h / 2 - 15, 8, 13, e.accent);
  }

  const barW = Math.min(width - 42, 290);
  const barX = (width - barW) / 2;
  px(barX - 2, 66, barW + 4, 14, PALETTE.shadow);
  px(barX, 68, barW, 10, PALETTE.steelDark);
  px(barX, 68, barW * Math.max(0, e.hp / e.maxHp), 10, e.color);
  px(barX, 68, Math.min(18, barW * Math.max(0, e.hp / e.maxHp)), 10, e.accent);
  ctx.fillStyle = "#f5f7ff";
  ctx.font = "700 11px 'Courier New'";
  ctx.textAlign = "center";
  ctx.fillText(e.name.toUpperCase(), width / 2, 62);
}

function drawBossZoneDetails(e, pulse, flash) {
  const x = e.x;
  const y = e.y;
  if (e.modelId.includes("cinder") || e.modelId.includes("molten")) {
    px(x - e.w / 2 - 10, y - 30, 10, 18, PALETTE.orange);
    px(x + e.w / 2, y - 30, 10, 18, PALETTE.orange);
    px(x - 44, y + e.h / 2 + 4, 22, 12 + pulse * 6, PALETTE.hot);
    px(x + 22, y + e.h / 2 + 4, 22, 12 + pulse * 6, PALETTE.hot);
  } else if (e.modelId.includes("aegis") || e.modelId.includes("lumen")) {
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 + performance.now() / 900;
      centerPx(x + Math.cos(a) * (e.w * 0.55), y + Math.sin(a) * (e.h * 0.48), 12, 5, flash ? PALETTE.ink : e.accent);
    }
    glowCircle(x, y, e.w * 0.72, e.accent, 0.07);
  } else if (e.modelId.includes("cryo") || e.modelId.includes("glacier")) {
    px(x - e.w / 2 - 16, y - 5, e.w + 32, 4, PALETTE.blueWhite);
    px(x - 5, y - e.h / 2 - 18, 10, e.h + 36, e.accent);
    px(x - e.w / 2 + 8, y + e.h / 2 + 2, e.w - 16, 6, PALETTE.cool);
  } else if (e.modelId.includes("ashen") || e.modelId.includes("grave")) {
    ctx.save();
    ctx.strokeStyle = withAlpha(e.accent, 0.58);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(x, y, e.w * 0.68, e.h * 0.42, Math.sin(performance.now() / 900) * 0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    px(x - 12, y - e.h / 2 - 14, 24, 8, PALETTE.gold);
  }
}

function drawMegaBoss(e) {
  const x = e.x;
  const y = e.y;
  const tick = performance.now() / 1000;
  const flash = e.hitFlash > 0;
  const pulse = Math.floor(tick * 7) % 2;
  const phaseLevel = e.phaseLevel || 0;
  const core = flash ? PALETTE.ink : (pulse ? e.accent : e.color);
  glowCircle(x, y, e.w * 0.86 + phaseLevel * 16, flash ? PALETTE.ink : e.color, flash ? 0.24 : 0.14);
  glowCircle(x, y + 6, e.w * 0.5, e.accent, 0.08 + phaseLevel * 0.02);

  px(x - e.w / 2, y - 18, e.w, 42, PALETTE.violetDark);
  px(x - e.w / 2 + 12, y - 27, e.w - 24, 30, PALETTE.steelDark);
  px(x - e.w / 2 + 26, y - 36, e.w - 52, 22, e.color);
  px(x - e.w / 2 + 34, y - 33, e.w - 68, 5, PALETTE.blueWhite);
  px(x - 38, y - 44, 76, 18, PALETTE.shadow);
  px(x - 25, y - 40, 50, 9, PALETTE.hotDark);
  px(x - 12, y - 38, 24, 5, PALETTE.hotLight);

  for (const side of [-1, 1]) {
    px(x + side * (e.w / 2 - 16) - 12, y - 36, 24, 78, PALETTE.steelDark);
    px(x + side * (e.w / 2 - 11) - 7, y - 28, 14, 52, e.color);
    px(x + side * (e.w / 2 - 5) - 5, y + 4, 10, 42 + pulse * 8, e.accent);
    px(x + side * (e.w / 2 + 10) - 8, y - 8, 16, 36, PALETTE.hotDark);
    px(x + side * (e.w / 2 + 14) - 4, y + 1, 8, 23, PALETTE.hotLight);
    px(x + side * (e.w / 2 + 26) - 7, y + 14, 14, 28, PALETTE.goldDark);
    px(x + side * (e.w / 2 + 28) - 4, y + 20, 8, 18, PALETTE.gold);
  }

  drawSprite(SPRITES.megaBoss, x, y - 6, 6, {
    R: flash ? PALETTE.ink : PALETTE.hot,
    H: PALETTE.hotLight,
    r: PALETTE.hotDark,
    V: flash ? PALETTE.ink : e.color,
    P: PALETTE.pink,
    v: PALETTE.violetDark,
    G: core,
    g: PALETTE.greenDark,
    Y: PALETTE.gold,
    Z: PALETTE.goldLight,
    D: PALETTE.steelDark,
    S: PALETTE.steel,
    s: PALETTE.steelLight
  });

  px(x - 52, y + 35, 104, 12, PALETTE.shadow);
  px(x - 42, y + 38, 84, 6, core);
  px(x - 18, y - 6, 36, 18, PALETTE.shadow);
  px(x - 10, y - 2, 20, 10, core);
  px(x - 5, y, 10, 5, PALETTE.blueWhite);

  if (phaseLevel >= 1) {
    px(x - e.w / 2 - 18, y - 18, 16, 54, PALETTE.greenDark);
    px(x + e.w / 2 + 2, y - 18, 16, 54, PALETTE.greenDark);
    px(x - e.w / 2 - 13, y - 10, 6, 36, e.accent);
    px(x + e.w / 2 + 7, y - 10, 6, 36, e.accent);
  }
  if (phaseLevel >= 2) {
    glowCircle(x, y, e.w * 0.72, e.color, 0.08);
    px(x - 8, y - 62, 16, 18, e.color);
    px(x - 4, y - 68, 8, 10, PALETTE.hotLight);
  }

  const barW = Math.min(width - 30, 340);
  const barX = (width - barW) / 2;
  px(barX - 3, 58, barW + 6, 18, PALETTE.shadow);
  px(barX, 61, barW, 12, PALETTE.steelDark);
  px(barX, 61, barW * Math.max(0, e.hp / e.maxHp), 12, e.color);
  px(barX, 61, Math.min(34, barW * Math.max(0, e.hp / e.maxHp)), 12, e.accent);
  ctx.fillStyle = "#f5f7ff";
  ctx.font = "700 12px 'Courier New'";
  ctx.textAlign = "center";
  ctx.fillText(`MEGA BOSS - ${e.name.toUpperCase()}`, width / 2, 54);
}

function drawBullet(b) {
  glowCircle(b.x, b.y, b.h * 1.35, b.color, 0.18);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = withAlpha(b.color, 0.55);
  ctx.lineWidth = Math.max(2, b.w * 0.6);
  ctx.beginPath();
  ctx.moveTo(b.x, b.y + b.h * 1.25);
  ctx.lineTo(b.x, b.y - b.h * 0.8);
  ctx.stroke();
  ctx.restore();
  glowRect(b.x, b.y, b.w + 3, b.h + 3, b.color, 0.2);
  px(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, b.color);
  px(b.x - Math.max(1, b.w / 4), b.y - b.h / 2 - 2, Math.max(2, b.w / 2), 2, PALETTE.ink);
}

function drawEnemyBullet(b) {
  glowCircle(b.x, b.y, b.h * 1.45, b.color, 0.14);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = withAlpha(b.color, 0.38);
  ctx.lineWidth = Math.max(2, b.w * 0.5);
  ctx.beginPath();
  ctx.moveTo(b.x - b.vx * 0.025, b.y - b.vy * 0.025);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.restore();
  px(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, b.color);
  px(b.x - 1, b.y - 1, 2, 2, PALETTE.ink);
}

function drawPowerup(p) {
  const pulse = 1 + Math.sin(performance.now() / 110 + p.y) * 0.25;
  const color = p.kind === "ammo" ? PALETTE.green : p.kind === "shield" ? PALETTE.cool : PALETTE.gold;
  glowRect(p.x, p.y, 24 * pulse, 24 * pulse, color, p.kind === "ammo" ? 0.28 : 0.16);
  if (p.kind === "ammo") {
    px(p.x - 11, p.y - 4, 22, 8, color);
    px(p.x - 7, p.y - 9, 14, 18, color);
    px(p.x - 3, p.y - 13, 6, 26, PALETTE.ink);
    px(p.x - 1, p.y - 11, 2, 22, color);
    px(p.x - 9, p.y - 7, 8, 3, PALETTE.greenDark);
    px(p.x + 4, p.y + 4, 6, 3, PALETTE.coolLight);
  } else {
    px(p.x - 9, p.y - 5, 18, 10, color);
    px(p.x - 5, p.y - 9, 10, 18, color);
    px(p.x - 4, p.y - 4, 8, 8, PALETTE.shadow);
    px(p.x - 2, p.y - 2, 4, 4, PALETTE.ink);
    px(p.x - 7, p.y - 7, 5, 3, p.kind === "shield" ? PALETTE.coolLight : PALETTE.goldLight);
    px(p.x + 3, p.y + 5, 5, 3, p.kind === "shield" ? PALETTE.coolDark : PALETTE.goldDark);
  }
}

function drawParticles() {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
    px(p.x, p.y, p.size + 1, p.size + 1, p.color);
    if (p.size > 3) px(p.x + 1, p.y + 1, p.size - 1, p.size - 1, PALETTE.gold);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawShockwaves() {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const s of shockwaves) {
    const alpha = Math.max(0, s.life / s.maxLife);
    ctx.strokeStyle = withAlpha(s.color, alpha * 0.65);
    ctx.lineWidth = 2 + alpha * 5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.stroke();
    glowCircle(s.x, s.y, s.radius * 0.9, s.color, alpha * 0.08);
  }
  ctx.restore();
}

function onPointerDown(event) {
  const data = { x: event.clientX, y: event.clientY };
  pointers.set(event.pointerId, data);

  if (event.clientX < width * 0.42) {
    player.shootingPointers.add(event.pointerId);
    if (!running && !gameOver) startRun();
  } else {
    player.steerPointer = event.pointerId;
    player.targetX = event.clientX;
    player.targetY = event.clientY;
  }
}

function onPointerMove(event) {
  if (!pointers.has(event.pointerId)) return;
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (player.steerPointer === event.pointerId) {
    player.targetX = event.clientX;
    player.targetY = event.clientY;
  }
}

function onPointerUp(event) {
  pointers.delete(event.pointerId);
  player.shootingPointers.delete(event.pointerId);
  if (player.steerPointer === event.pointerId) player.steerPointer = null;
}

startButton.addEventListener("click", startRun);
warpButton.addEventListener("click", () => {
  warpPanel.classList.toggle("hidden");
  hideMenuPanels(warpPanel);
  renderWarp();
  playSound("click");
});
warpStartButton.addEventListener("click", startRun);
dailyButton.addEventListener("click", () => {
  dailyPanel.classList.toggle("hidden");
  hideMenuPanels(dailyPanel);
  renderDaily();
  playSound("click");
});
pauseButton.addEventListener("click", togglePause);
menuButton.addEventListener("click", returnToMenu);
garageButton.addEventListener("click", () => {
  garage.classList.toggle("hidden");
  hideMenuPanels(garage);
  renderGarage();
  playSound("click");
});
codexButton.addEventListener("click", () => {
  codexPanel.classList.toggle("hidden");
  hideMenuPanels(codexPanel);
  renderCodex();
  playSound("click");
});
fameButton.addEventListener("click", () => {
  hall.classList.toggle("hidden");
  hideMenuPanels(hall);
  renderHallOfFame();
  playSound("click");
});
missionsButton.addEventListener("click", () => {
  missionsPanel.classList.toggle("hidden");
  hideMenuPanels(missionsPanel);
  renderMissions();
  playSound("click");
});
settingsButton.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
  hideMenuPanels(settingsPanel);
  renderSettings();
  playSound("click");
});
boosterBuy.addEventListener("click", () => buyUpgrade("booster"));
laserBuy.addEventListener("click", () => buyUpgrade("laser"));
shieldBuy.addEventListener("click", () => buyUpgrade("shield"));
musicToggle.addEventListener("change", () => {
  setMusic(musicToggle.checked);
  renderSettings();
});
sfxToggle.addEventListener("change", () => {
  settings.sfx = sfxToggle.checked;
  saveProgress();
});
shakeToggle.addEventListener("change", () => {
  settings.shake = shakeToggle.checked;
  saveProgress();
});
particlesToggle.addEventListener("change", () => {
  settings.particles = particlesToggle.checked;
  saveProgress();
});
autoFireToggle.addEventListener("change", () => {
  settings.autoFire = autoFireToggle.checked;
  saveProgress();
});
touchSensitivity.addEventListener("input", () => {
  settings.touchSensitivity = Number(touchSensitivity.value);
  saveProgress();
});
window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  keys.add(event.key);
  if (event.key.toLowerCase() === "h") debugHitboxes = !debugHitboxes;
  if ((event.key === " " || event.key === "Enter") && (!running || gameOver)) startRun();
});
window.addEventListener("keyup", (event) => keys.delete(event.key));
canvas.addEventListener("pointerdown", onPointerDown);
canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerup", onPointerUp);
canvas.addEventListener("pointercancel", onPointerUp);
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

resize();
loadWarpPreviewAssets();
loadBackgroundAssets();
renderGarage();
renderSettings();
renderMissions();
renderCodex();
renderDaily();
renderWarp();
applyNebulaVisuals();
updateMenuCopy();
if (location.hash === "#garage") garage.classList.remove("hidden");
if (location.hash === "#fame") hall.classList.remove("hidden");
if (location.hash === "#missions") missionsPanel.classList.remove("hidden");
if (location.hash === "#settings") settingsPanel.classList.remove("hidden");
if (location.hash === "#codex") codexPanel.classList.remove("hidden");
if (location.hash === "#daily") dailyPanel.classList.remove("hidden");
if (location.hash === "#warp") warpPanel.classList.remove("hidden");
renderHallOfFame();
requestAnimationFrame(updateGame);
