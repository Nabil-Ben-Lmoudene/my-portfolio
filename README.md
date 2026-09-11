# Nabil Ben Lmoudene — Portfolio

Plain HTML/CSS/JS, no build step. Open `index.html` in a browser, or upload the whole
`portfolio` folder anywhere (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Pages
- `index.html` — Home (hero, tools marquee, "My Toolkit")
- `projects.html` — "All My Works" grid with UI/UX vs Front-End filter
- `about.html` — Profile card + "Certificates & Credentials"

## Using your own images (the `assets/` folder)

Everything reads images from `assets/`. Right now `assets/profile.jpg` is your
uploaded photo — swap it out any time. For every other slot, just save a file
with the exact name below into `assets/` and it appears automatically (until
then you'll see a light grey placeholder, so nothing looks broken):

| File to add                        | Used on          | Shows in place of         |
|-------------------------------------|-------------------|----------------------------|
| `assets/profile.jpg`                | Home              | Hero circular photo        |
| `assets/about-photo.jpg`            | About             | "MY PIC" square            |
| `assets/work-fintech-app.jpg`       | Projects          | Card 1 (UI/UX)              |
| `assets/work-agency-site.jpg`       | Projects          | Card 2 (Front-End)          |
| `assets/work-dashboard.jpg`         | Projects          | Card 3 (UI/UX)              |
| `assets/work-ecommerce-site.jpg`    | Projects          | Card 4 (Front-End)          |
| `assets/work-booking-app.jpg`       | Projects          | Card 5 (UI/UX)              |
| `assets/work-portfolio-site.jpg`    | Projects          | Card 6 (Front-End)          |
| `assets/certificate-1.jpg` ... `-4.jpg` | About         | Certificate grid (4 slots)  |

Clicking any project card, the About photo, or a certificate opens it full-size
in a lightbox — that's the "click to see the full picture" behavior from the
Figma design.

## Editing text
- Bio, project names/descriptions and tool tags are plain text in the HTML files — search and replace directly.
- Colors, fonts and spacing all live in `css/style.css` under `:root` at the top (`--olive`, `--lime`, etc.) if you want to tweak the palette.

## Adding more projects/certificates
Copy one `<article class="project-card" ...>` block (in `projects.html`) or one
`<div class="cert-card" ...>` block (in `about.html`), give it a new image filename,
and it slots right into the grid.
