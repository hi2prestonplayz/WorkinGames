# Browser Arcade

A local arcade with sixty-one browser games:

- Snake Sprint
- Flappy Drift
- Cube Rush
- Brick Burst
- Target Tap
- Catch Craze
- Storm Rider
- Balance Beam
- Spin Safe
- Star Sweep
- Glow Grid
- Ring Stop
- Math Blitz
- Treasure Dig
- Route Recall
- Rhythm Rows
- Pattern Panic
- Tile Trail
- Jetpack Gap
- Color Gates
- Slide Quest
- Pipe Twist
- Laser Lock
- Safe Steps
- Swap Sort
- Block Drop
- Cannon Launch
- Knife Flip
- Rocket Lander
- Hoop Shot
- Treasure Cups
- Plinko Drop
- Orb Dodge
- Tunnel Glide
- Marble Tilt
- Pixel Pong
- Lane Hopper
- Dodge Drift
- Space Blaster
- Tower Tactics
- Stack Tower
- Number Vault
- Color Flood
- Lights Out
- Crate Quest
- Snout Scout
- Maze Escape
- Match Flip
- Tile Merge
- Whack Blitz
- Cosmic Clicker
- RPS Rush
- Bubble Pop
- Lucky Slots
- Color Echo
- Word Rescue
- Word Scramble
- Code Cracker
- Mine Grid
- Reaction Pad
- Typing Rush

## Open it

You can open `index.html` directly in a browser, or serve it locally:

```bash
cd /Users/lucasbai/Documents/browser-arcade
python3 -m http.server 8091
```

Then visit [http://localhost:8091](http://localhost:8091).

## Publish it publicly

If you want friends on a different network to open the arcade, the easiest long-term option is to publish it as a static site.

### GitHub Pages

This project now includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository on GitHub, open `Settings` -> `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` again, or run the `Deploy Browser Arcade` workflow manually.
5. GitHub will publish the arcade to a public `https://...github.io/...` URL that people can open from any network.

### Other static hosts

Because this arcade is plain HTML, CSS, and JavaScript, it can also be deployed to static hosts like Cloudflare Pages or Netlify without a build step.

## Notes

- Best scores are stored in your browser with `localStorage`.
- Everything runs locally.
- The sidebar now includes a global `Chill` / `Easy` / `Normal` / `Hard` / `Chaos` difficulty switch.
- The app can copy its current link for sharing. If you want friends on the same Wi-Fi to open it, serve it from your computer's network address instead of `localhost`, for example:

```bash
cd /Users/lucasbai/Documents/browser-arcade
python3 -m http.server 8091 --bind 0.0.0.0
```
