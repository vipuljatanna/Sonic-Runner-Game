import { makeSonic } from "../entities/sonic";
import k from "../kaplayContext";

export default function mainMenu() {
  if (!k.getData("best-score")) k.setData("best-score", 0);

  k.onButtonPress("jump", () => k.go("game"));

  const bgPieceWidth = 1920;
  const bgPieces = [
    // First background piece at position (0, 0) with scale 2 and opacity 0.8
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    // Second background piece at position (bgPieceWidth * 2, 0) with scale 2 and opacity 0.8
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth * 2, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platformsWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(platformsWidth * 4, 450), k.scale(4)]),
  ];

  k.add([
    k.text("SONIC RING RUN", {font: "mania", size: 96}),
    k.pos(k.center().x, 200),
    k.anchor("center"),
  ])
  k.add([
    k.text("Press Space/Click/Touch to Play", {font: "mania", size: 50}),
    k.pos(k.center().x, k.center().y - 200),
    k.anchor("center"),
  ])

  makeSonic(k.vec2(200, 745))
  const gameSpeed = 4000;
  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
