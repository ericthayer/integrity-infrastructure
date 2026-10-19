// Website entry (the seven site pages). Same runtime and component library as main.ts
// (the concept entry), plus the website layer: its own CSS files and behaviors. It
// imports the shared modules rather than main.ts, so every page ships one entry script.
import './generated/tokens.css';
import './css/base.css';
import './css/concepts.css';
import './css/components.css';
import './css/site/site.css';
import './css/site/page-header.css';
import './css/site/proof.css';
import './css/site/coverage.css';
import './css/site/route.css';
import './css/site/pages/home.css';
import './css/site/pages/about.css';
import './css/site/pages/services.css';
import './css/site/pages/safety.css';
import './css/site/pages/careers.css';
import './css/site/pages/subcontractors.css';
import './css/site/pages/contact.css';
import { IntegrityDS } from './behaviors/site';
import { loadEnhancements } from './behaviors/enhancements';
import { netlifyForms } from './behaviors/netlify-forms';
import { prefill } from './behaviors/prefill';
import { revealSeen } from './behaviors/reveal-seen';
import { sceneToggle } from './behaviors/scene-toggle';
import { topicFields } from './behaviors/topic-fields';

function boot(): void {
  revealSeen();
  prefill();
  topicFields();
  netlifyForms();
  sceneToggle();
  void loadEnhancements(document, window, IntegrityDS);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
