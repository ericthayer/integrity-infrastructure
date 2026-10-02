// Integrity Infrastructure design system: types as documentation.
// Components are vanilla HTML + ii- classes (Oxygen global classes). Vite loads typed
// behaviors via src/main.ts; build:ds exports window.IntegrityDS in integrity.js and
// design-system/project/components/bundle.js under exports/. Each <Comp>Props interface documents the
// markup contract a consumer fills in: modifier classes, attributes and content slots.

export type Theme = 'work-light' | 'as-built' | 'crew' | 'lit-fiber';

export type IconName =
  | 'arrow-right' | 'arrow-up-right' | 'arrow-down' | 'chevron-down' | 'chevron-right' | 'menu-2' | 'x' | 'plus' | 'minus'
  | 'check' | 'circle-check' | 'alert-circle' | 'alert-triangle' | 'info-circle' | 'upload' | 'file-upload' | 'file-text'
  | 'external-link' | 'loader-2' | 'search' | 'phone' | 'phone-call' | 'mail' | 'map-pin' | 'map-2' | 'clock' | 'calendar'
  | 'brand-linkedin' | 'brand-instagram' | 'brand-facebook'
  | 'plug-connected' | 'backhoe' | 'crane' | 'building-broadcast-tower' | 'road' | 'route' | 'home-signal' | 'network'
  | 'shield-check' | 'first-aid-kit' | 'certificate' | 'cone' | 'clipboard-check' | 'eye-check' | 'users-group' | 'user-check'
  | 'briefcase' | 'school' | 'trending-up' | 'heart-handshake' | 'steering-wheel' | 'truck' | 'tools' | 'license' | 'award' | 'camera';

/** Inline icon: `<svg class="ii-icon" data-ii-icon="phone"></svg>`, expanded in DS exports at build time or by IntegrityDS.hydrateIcons() in app pages. */
export interface IconProps { name: IconName; /** Only for meaningful icons; decorative icons get aria-hidden. */ label?: string; size?: 'md' | 'lg' | 'xl' }

/** `<a|button class="ii-btn ii-btn--primary">` */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'on-photo';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  /** Verb first, one line, one label per intent: "Request a quote", "View open roles", "Start an inquiry". */
  label: string;
  href?: string;
  /** Trailing icon uses class ii-icon--trail and nudges on hover. */
  trailingIcon?: IconName;
  /** ii-btn--orb: the trailing icon sits in its own disc, flush with the right padding (Lit Fiber pills). */
  orb?: boolean;
  /** data-ii-magnetic: leans toward the pointer on hover devices when GSAP is loaded (IntegrityDS.motion). */
  magnetic?: boolean;
  /** aria-busy="true" with a loader-2 icon (class ii-icon--spin). */
  busy?: boolean;
  /** aria-disabled="true" on links, disabled on buttons. */
  disabled?: boolean;
}

/** `<a class="ii-call" href="tel:+15035025339">` */
export interface CallLinkProps { label?: string; number: string; tel: string }

/** `<span class="ii-tag">`; `ii-tag--accent` for the one highlighted tag. */
export interface TagProps { label: string; accent?: boolean; icon?: IconName }

export interface NavItem { label: 'Services' | 'Safety' | 'About' | 'Careers' | 'Subcontractors' | 'Contact'; href: string; current?: boolean }

/** `<header class="ii-header" data-ii-header>` + sibling `<div class="ii-drawer" data-ii-drawer>` (DS preview source: src/partials/header.html; app HTML is edited manually). */
export interface SiteHeaderProps {
  /** ii-header--overlay: transparent over a full-bleed hero until the page scrolls (data-ii-header-offset="80"). */
  overlay?: boolean;
  /** ii-header--island: a fixed, centered glass pill (Lit Fiber); pair with drawer class ii-drawer--veil, the full-screen menu. */
  island?: boolean;
  items: NavItem[];
  phone: CallLinkProps;
  cta: ButtonProps;
}

/** `<footer class="ii-footer">` (DS preview source: src/partials/footer.html; app HTML is edited manually). */
export interface SiteFooterProps {
  offices: { state: 'Oregon' | 'Colorado'; lines: string[] }[];
  phone: string;
  email: string;
  social: { network: 'LinkedIn' | 'Instagram' | 'Facebook'; href: string }[];
}

/** `<header class="ii-page-header">` with `nav.ii-breadcrumb`. */
export interface PageHeaderProps { title: string; lead?: string; breadcrumb: { label: string; href?: string }[] }

/** `<section class="ii-hero ii-hero--cinematic|split|editorial">` */
export interface HeroProps {
  /** scene (Lit Fiber): full viewport, `div.ii-hero__scene[data-ii-scene]` behind the copy, headline with data-ii-words. */
  variant: 'cinematic' | 'split' | 'editorial' | 'scene';
  /** Two lines max on desktop. */
  title: string;
  /** 20 words max. */
  lead: string;
  primary: ButtonProps;
  secondary?: ButtonProps | CallLinkProps;
  /** cinematic: one full-bleed photo; split: one framed photo + SpecPlate; editorial: two photos. */
  media: { src: string; alt: string; focus?: string }[];
  facts?: SpecPlateProps;
}

export interface Service {
  id: 'fiber-splicing' | 'boring' | 'aerial-installation' | 'isp-installation' | 'restoration';
  name: string;
  icon: IconName;
  description: string;
  scope: string[];
  href: string;
  media?: { src: string; alt: string };
}
/** `<ol class="ii-services ii-services--index|plates|cards|bento">`: one markup, four layouts. Bento sits in a `[data-ii-glow]` host. */
export interface ServiceIndexProps { variant: 'index' | 'plates' | 'cards' | 'bento'; services: Service[] }

/** `<div class="ii-split">` with `.ii-split__media` and `.ii-split__content`; `ii-split--reverse` flips on desktop. */
export interface FeatureSplitProps { title: string; body: string; media: { src: string; alt: string } | PhotoSlotProps; reverse?: boolean; link?: ButtonProps }

/** `<dl class="ii-plate">` of `.ii-plate__cell` (dt.ii-plate__label + dd.ii-plate__value). */
export interface SpecPlateProps {
  /** --plate-cols, default 2. */
  columns?: 1 | 2 | 3 | 4;
  cells: { label: string; value?: string; href?: string; /** Renders .ii-pending "Client to provide". */ pending?: boolean; wide?: boolean }[];
}

/** Ways of BEING. `ii-values--marquee` (Work Light), `--grid` (As-Built), `--field` inside `.ii-on-accent` (Crew), `--rail` with data-ii-rail (Lit Fiber). */
export interface ValuesBandProps {
  variant: 'marquee' | 'grid' | 'field' | 'rail';
  values: ['Generous', 'Accountable', 'Coachable', 'Safe', 'Caring', 'Better'];
  mantra: "Doing what's right when nobody is looking.";
}

/** `<figure class="ii-quote">`: three lines of quote max, name and source. */
export interface TestimonialProps { quote: string; name: string; source: string }

/** `<div class="ii-faq">` of native `<details class="ii-faq__item" name="faq">`. */
export interface FAQProps { items: { question: string; answer: string }[] }

/** `<section class="ii-cta-band">`. */
export interface CTABandProps { title: string; body?: string; primary: ButtonProps; call?: CallLinkProps }

/** `<ul class="ii-paths">`: the first path is `.ii-path--feature` with a photo. */
export interface AudiencePathsProps { paths: { title: string; body: string; link: ButtonProps; media?: { src: string; alt: string } }[] }

/** `<ol class="ii-timeline">` */
export interface TimelineProps { items: { year?: string; title: string; body?: string; pending?: boolean }[] }

/** `<li class="ii-leader">` in `<ul class="ii-leaders">`. */
export interface LeaderCardProps { name?: string; role?: string; photo?: { src: string; alt: string }; pending?: boolean }

/** `<div class="ii-safety">`: a SpecPlate of metrics plus a checklist of programs. */
export interface SafetyRecordProps { metrics: SpecPlateProps; programs: string[] }

/** `<figure class="ii-media">` for photos, `<div class="ii-slot">` for shots still needed. */
export interface PhotoSlotProps { ratio?: '4 / 3' | '4 / 5' | '3 / 4' | '16 / 9' | '1 / 1'; label: 'Photo needed'; brief: string }

/** `<div class="ii-field">`: label above, hint, control, error below (added by IntegrityDS.forms). */
export interface FieldProps {
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'file' | 'checkbox-group' | 'radio-group';
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  /** Overrides the generated message. */
  error?: string;
  options?: string[];
}

/** `.ii-notice--danger[data-ii-error-summary]` inside the form; `.ii-notice--success[data-ii-success]` beside it. */
export interface FormFeedbackProps { variant: 'error-summary' | 'success'; title: string; body?: string }

/** `<form class="ii-form" data-ii-form>`; data-ii-demo shows the success panel without sending. */
export interface QuoteFormProps { action: string; demo?: boolean; services: Service['name'][] }
export interface SubcontractorFormProps { action: string; demo?: boolean; trades: string[] }

/** One posting from the Paylocity Recruiting job feed. */
export interface PaylocityJob {
  JobId: string;
  Title: string;
  ApplyUrl: string;
  DisplayUrl?: string;
  PublishedDate?: string;
  HiringDepartment?: string;
  JobLocation?: { Name?: string; City?: string; State?: string };
}
/** `<div class="ii-jobs" data-ii-jobs data-src="feed.json">` with loading, empty and error slots. */
export interface JobListProps { src?: string; jobs?: PaylocityJob[]; fallbackUrl: string; embed?: { src: string; title: string } }

/** `<ul class="ii-benefits">` of `.ii-benefit` (icon + title + text). */
export interface BenefitListProps { items: { icon: IconName; title: string; body?: string; pending?: boolean }[] }

/** `<div class="ii-notice ii-notice--info|danger|success">`. */
export interface NoticeProps { tone: 'info' | 'danger' | 'success'; title: string; body?: string }

/** `<ul class="ii-reasons ii-reasons--stack" data-ii-stack>` of `li.ii-reason.ii-shell`: sticky cards that pile up; GSAP scales each one down as the next arrives. */
export interface CardStackProps { cards: { icon: IconName; title: string; body: string }[] }

/** `<dialog class="ii-sheet">` with `.ii-sheet__panel` and `data-ii-sheet-*` slots (title, desc, scope, media, index, link).
 *  A host `[data-ii-sheet-host="<dialog id>"]` around a ServiceIndex opens it from any tile; the tile morphs into the panel
 *  through a same-document view transition named `ii-sheet`. */
export interface ServiceSheetProps { id: string; quoteHref: string }

/** `<div class="ii-hero__scene" data-ii-scene>`: the three.js strand scene mounted by IntegrityDS.scene.mountAll(THREE). */
export interface FiberSceneOptions { /** Default 16, 10 under 768px. */ strands?: number; /** Default strands x 3. */ pulses?: number }
export interface FiberSceneHandle { start(): void; stop(): void; dispose(): void }

/** Lit Fiber choreography hooks read by IntegrityDS.motion (GSAP 3 + ScrollTrigger, optional). */
export interface MotionHooks {
  /** data-ii-words on a plain-text headline: words rise out of masks on load. */
  words: 'data-ii-words';
  /** data-ii-magnetic on a button: leans toward the pointer (hover devices only). */
  magnetic: 'data-ii-magnetic';
  /** data-ii-stack on a list of .ii-shell cards: scale and dim as the next card arrives. */
  stack: 'data-ii-stack';
  /** data-ii-rail on a section with a [data-ii-rail-track]: pinned horizontal scroll at 1024px and up. */
  rail: 'data-ii-rail';
  /** data-ii-glow on a host of .ii-shell cards: a pointer-following glow (no GSAP needed). */
  glow: 'data-ii-glow';
}

export interface IntegrityDSApi {
  version: string;
  icons: Record<IconName, string>;
  /** SVG markup for an icon; pass label for meaningful icons. */
  icon(name: IconName, opts?: { label?: string; className?: string }): string;
  /** Runs everything below on a root (default document). Safe to call twice. */
  init(root?: ParentNode): void;
  hydrateIcons(root?: ParentNode): void;
  header(root?: ParentNode): void;
  nav(root?: ParentNode): void;
  marquee(root?: ParentNode): void;
  forms(root?: ParentNode): void;
  /** Pointer glow on [data-ii-glow] hosts. */
  glow(root?: ParentNode): void;
  /** Tile-to-sheet dialogs on [data-ii-sheet-host] hosts. */
  sheet(root?: ParentNode): void;
  /** GSAP choreography; a no-op without window.gsap or under reduced motion. */
  motion(root?: ParentNode): void;
  scene: {
    /** Mounts the strand scene into one host; THREE is the page's ES module import. */
    mount(el: HTMLElement, THREE: unknown, opts?: FiberSceneOptions): FiberSceneHandle | null;
    /** Mounts every [data-ii-scene]. */
    mountAll(THREE: unknown, root?: ParentNode): (FiberSceneHandle | null)[];
  };
  jobs: {
    load(root?: ParentNode): void;
    render(el: HTMLElement, data: PaylocityJob[] | { jobs: PaylocityJob[] }): void;
    renderError(el: HTMLElement): void;
  };
}

declare global { interface Window { IntegrityDS: IntegrityDSApi } }
