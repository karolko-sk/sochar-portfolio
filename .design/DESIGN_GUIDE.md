# Sculptor Portfolio (`sculptor-portfolio`) — Project Design Guide

## 1. Aesthetic Direction: Quiet Monumentality (White Cube Gallery)
- **Canvas & Surfaces:** Natural warm alabaster paper (`#FAF9F6`) with deep charcoal black ink (`#121214`) for maximum contrast and typographic dignity.
- **Architectural Hairlines:** Delicate `1px` dividing lines (`#E5E2DA`) instead of heavy shadows or nested card boxes.
- **Typography:** Classical editorial serif (Fraunces) for sculpture titles and exhibition headings paired with clean grotesque sans (Inter) for dimensions (HxWxD), weight, provenance, and technical metadata.
- **Tailwind v4 Cascade:** NEVER write unlayered `* { margin: 0; padding: 0; }` outside `@layer base`.

## 2. Zero-Smog Gallery Invariants
- **Artwork as Undisputed Hero:** High-resolution sculpture photographs stand cleanly on the calm gallery canvas without competing badges, star ratings, or SaaS widget clutter.
- **NO_BOX_IN_BOX:** Strictly avoid nested bordered cards and heavy drop shadows.
- **Slide-Over Folio Inspection:** Sculpture details, archival provenance, and acquisition actions open smoothly in `ArtworkFolioDrawer` without disruptive full-page transitions.
- **Scale Comparator Silhouette:** Every sculpture card and folio drawer includes a human scale reference (`180 cm`) so collectors and architects can gauge physical presence immediately.
- **Single Dominant CTA & Dual-Track Inquiry:** Exactly one primary action per surface (*„Mám zájem o toto dílo“* on available works, *„Poptat autorskou tvorbu na zakázku“* on sold archive), paired with studio visit booking — strictly zero e-commerce shopping cart, checkout, or runtime database bloat.
