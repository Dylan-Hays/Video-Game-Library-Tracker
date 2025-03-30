// cards.js

// Main Card Renderer
export function createGameCard(game) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");
  const image = document.createElement("img");
  image.src = game.background_image;
  image.alt = game.name;
  thumbnail.appendChild(image);

  const info = document.createElement("div");
  info.classList.add("info");

  const details = document.createElement("div");
  details.classList.add("card-details");

  const title = document.createElement("h4");
  title.textContent = game.name;

  const platforms = document.createElement("div");
  platforms.classList.add("platforms");
  platforms.innerHTML = renderPlatforms(game.platforms);

  const metadata = document.createElement("ul");

  const rating = document.createElement("li");
  rating.innerHTML = `<i class="fa-solid fa-star"></i> ${game.rating || "N/A"}`;

  const released = document.createElement("li");
  released.innerHTML = `<i class="fa-solid fa-calendar"></i> ${
    game.released || "Unknown"
  }`;

  metadata.appendChild(rating);
  metadata.appendChild(released);

  details.appendChild(title);
  details.appendChild(platforms);
  details.appendChild(metadata);

  info.appendChild(details);

  card.appendChild(thumbnail);
  card.appendChild(info);

  return card;
}

// Utility: Platform Icon Map
const PLATFORM_ICON_MAP = {
  pc: "fa-solid fa-desktop",
  playstation: "fa-brands fa-playstation",
  xbox: "fa-brands fa-xbox",
  nintendo: "fa-solid fa-gamepad",
  ios: "fa-brands fa-apple",
  mac: "fa-brands fa-apple",
  android: "fa-brands fa-android",
  linux: "fa-brands fa-linux",
  web: "fa-solid fa-globe",
};

const DEFAULT_PLATFORM_ICON = "fa-solid fa-gamepad";

function normalizePlatform(name) {
  const lower = name.toLowerCase();
  if (lower.includes("playstation")) return "playstation";
  if (lower.includes("xbox")) return "xbox";
  if (lower.includes("nintendo")) return "nintendo";
  if (lower.includes("pc")) return "pc";
  if (lower.includes("mac")) return "mac";
  if (lower.includes("ios")) return "ios";
  if (lower.includes("android")) return "android";
  if (lower.includes("linux")) return "linux";
  if (lower.includes("web")) return "web";
  return name.toLowerCase();
}

function renderPlatformIcon(normalized, nameList) {
  const iconClass = PLATFORM_ICON_MAP[normalized] || DEFAULT_PLATFORM_ICON;
  const title = nameList.join(", ");
  return `<i class="${iconClass} platform-icon" title="${title}"></i>`;
}

function renderPlatforms(platformArray) {
  const grouped = {};

  platformArray.forEach((p) => {
    const norm = normalizePlatform(p.platform.name);
    if (!grouped[norm]) grouped[norm] = [];
    grouped[norm].push(p.platform.name);
  });

  return Object.entries(grouped)
    .map(([norm, names]) => renderPlatformIcon(norm, names))
    .join("");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
