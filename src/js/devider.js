const chips = [
  "Animated", "the adventures", "Justin Roiland", "superpower",
  "creative", "amazing", "Sitcom", "comics",
  "follows", "characters", "whoa", "Rick and Morty"
];

const divider = document.getElementById("divider");

chips.forEach((text, i) => {
  const span = document.createElement("span");
  span.textContent = text;
  span.className = `chip ${i % 2 === 0 ? "light" : "dark"}`;

  // випадковий нахил (деякі догори дриґом)
  const flipped = Math.random() > 0.6; // ~40% перевернуті
  const angle = (flipped ? 180 : 0) + (Math.random() * 30 - 15);
  span.style.setProperty("--angle", `${angle}deg`);

  // різна затримка для більш природного руху
  span.style.animationDelay = `${Math.random() * 2}s`;

  divider.appendChild(span);
});