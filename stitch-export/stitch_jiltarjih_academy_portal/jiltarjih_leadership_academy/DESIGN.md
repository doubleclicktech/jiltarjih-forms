---
name: Jiltarjih Leadership Academy
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#594236'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8d7164'
  outline-variant: '#e1c0b1'
  surface-tint: '#9e4300'
  primary: '#9e4300'
  on-primary: '#ffffff'
  primary-container: '#f26a00'
  on-primary-container: '#4e1d00'
  inverse-primary: '#ffb691'
  secondary: '#9c4500'
  on-secondary: '#ffffff'
  secondary-container: '#ff7a1b'
  on-secondary-container: '#5e2700'
  tertiary: '#a53c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#fb620e'
  on-tertiary-container: '#521a00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb691'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783100'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#773300'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb598'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7e2c00'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  h1:
    fontFamily: Cairo
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Cairo
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  h3:
    fontFamily: Cairo
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Tajawal
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Tajawal
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Tajawal
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin: 32px
  container-max: 1280px
---

## Brand & Style
The design system for the academy is built on the pillars of **Academic Excellence**, **Modern Leadership**, and **Trust**. It targets emerging leaders and scholars, requiring an interface that feels both prestigious and accessible. 

The visual style is **Corporate / Modern** with a focus on structured professionalism. It utilizes a clean, RTL-first layout that prioritizes legibility and information hierarchy. The emotional response should be one of stability and inspiration—balancing the energy of "Academy Orange" with the grounding influence of warm whites and structured geometric patterns.

## Colors
The palette is dominated by a high-energy primary orange, symbolizing growth and leadership. 

- **Primary & Gradients:** Academy Orange (#F26A00) serves as the main brand anchor. The secondary gradient (#FF7A1A to #F05A00) is reserved for hero sections, progress indicators, and primary call-to-action hover states to add depth.
- **Neutrals:** Text is grounded in near-black (#111111) for maximum readability, while muted text (#5F5F5F) is used for metadata and secondary descriptions.
- **Backgrounds:** The primary canvas is a warm light gray (#FAFAF8), providing a softer experience than pure white. The pale orange accent (#FFF2E8) should be used for section highlights and decorative backgrounds to maintain brand warmth.

## Typography
This design system utilizes a dual-font strategy optimized for Arabic script. 

- **Headlines:** Use **Cairo**. Its geometric construction conveys authority and modernism. All headings must be bold to emphasize leadership and structure.
- **Body & UI:** Use **Tajawal**. Its slightly softer curves ensure high legibility over long academic texts. 
- **Alignment:** All text must be Right-to-Left (RTL) aligned. Paragraphs should use generous line-heights (1.6x) to accommodate Arabic diacritics and ensure a comfortable reading experience for educational content.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy to maintain an organized, institutional appearance. 

- **Grid:** A 12-column grid system with 24px gutters.
- **Whitespace:** Use "Generous Whitespace" (Level 4 spacing) between major sections to prevent cognitive overload. 
- **RTL Structure:** Navigation flows from right to left, with the logo positioned in the top right. Sidebars and iconography should be mirrored appropriately to respect the natural scanning pattern of the Arabic language.

## Elevation & Depth
To convey a sense of trustworthy substance, the design uses **Ambient Shadows** and **Tonal Layers**.

- **Cards:** Elevated surfaces use a subtle 1px border (#EAEAE8) and a soft, diffused shadow (Blur: 12px, Y: 4px, Color: #000000 @ 4% opacity).
- **Depth:** Higher elevation (z-index) is reserved for active leadership dashboards or modal overlays. 
- **Patterns:** Subtle geometric patterns (isogrid or Islamic-inspired modern minimalism) should be applied to backgrounds at 3-5% opacity to add academic texture without distracting from the content.

## Shapes
The shape language is **Rounded (Moderate)**. This choice balances the friendliness of a modern educational platform with the formal structure of a leadership academy. 

Standard components (buttons, inputs) utilize a 0.5rem radius. Larger containers, such as course cards or hero banners, utilize 1rem (rounded-lg) to create a soft, approachable frame for imagery and text.

## Components
- **Buttons:** Primary buttons are solid Academy Orange (#F26A00) with white text, utilizing a bold Cairo font. Secondary buttons use an outline of the primary color or a subtle gray background.
- **Cards:** White backgrounds, subtle borders, and soft shadows. Used for course modules, student profiles, and resource links.
- **Input Fields:** Light gray fills (#F4F4F2) with a 1px border that shifts to Academy Orange on focus. 
- **Chips/Badges:** Used for leadership tiers or course categories. These use the Pale Orange background (#FFF2E8) with Academy Orange text.
- **Progress Bars:** Utilize the Secondary Gradient to show course completion, signifying energy and advancement.
- **Navigation:** Top-tier navigation with clear active states signaled by a bottom border in Academy Orange.