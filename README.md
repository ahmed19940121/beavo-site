# Beavo website

Static HTML, CSS and JavaScript. Publish the repository root with the existing
static host; no compilation or package installation is required.

## Design

The home page uses Beavo's existing green/orange identity, serif editorial
headlines, a self-hosted Baloo wordmark, app screenshots and original supplied
artwork. No external JavaScript, font request, analytics or third-party embed is
needed for the home page.

- `site.css` and `site.js` serve the home page.
- `interior.css` adds the shared visual treatment to support and legal pages.
  Existing legal text and standalone inline styling are preserved.
- `assets/baloo-2.woff2` is extracted from the website's previous embedded font.
  Its license is in `assets/OFL-Baloo2.txt`.

The tool preview has keyboard-operable tabs. The week explorer uses a native
range input. FAQs use native details/summary. Motion is finite, can be disabled
in the footer and follows the system Reduce Motion preference. Only that website
motion preference is saved to localStorage; the pregnancy week is not saved.
The essential content and navigation remain available without JavaScript.

Pricing links to the App Store for current plans instead of displaying an
unverified promotional comparison. CarPlay is not advertised as a released
capability by this website.

## Review

Checked in a live browser harness at 320, 390, 768, 1024 and 1440 CSS-pixel
viewport widths across all six pages: horizontal overflow, clipped controls,
image loading, local assets and anchors, unique IDs, and heading structure.
The harness also exercises tool tabs and keyboard focus, the week explorer,
mobile navigation, FAQ disclosure and motion preference persistence.
This is targeted browser QA, not a complete WCAG certification or Lighthouse run.

For a release review, open each page at desktop and phone widths. Try each tool
tab with the arrow keys, change weeks at both ends of the range, open and close
the mobile menu with Escape, and check the download and support destinations.

The appointment text links to the NHS antenatal appointments page. External
support routes point to Sands, Miscarriage UK and Samaritans.
