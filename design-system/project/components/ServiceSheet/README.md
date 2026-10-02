# ServiceSheet

A service's detail as a native dialog: a bento tile morphs into this sheet through a same-document view transition, the way an app opens a card (Lit Fiber).

## Use
- Markup: `dialog.ii-sheet#<id>` holding `.ii-sheet__panel.ii-shell` with a close button (`data-ii-sheet-close`), `data-ii-sheet-media`, `-index`, `-title`, `-desc`, `-scope` and `-link` slots, the quote button and an "Our services" link. The partial `sections/service-sheet.html` has it all.
- Wrap the ServiceIndex in `[data-ii-sheet-host="<id>"]`. `IntegrityDS.sheet()` fills the slots from the clicked tile (name, description, scope list, photo or a large service icon, "01 / 05"), names the tile and then the panel `ii-sheet`, and calls `document.startViewTransition` around `showModal()`. Closing runs the transition backwards and returns focus to the tile's link.
- The dialog gives focus containment, Esc and an inert page; the backdrop blur lives on `::backdrop` (top layer). Page scroll is locked while it is open.
- Without view transitions, under reduced motion, or without JavaScript: the dialog opens plainly, or the tile's link goes to the Services page anchor.

## Consumer provides
The dialog id and the quote link; content comes from the tiles, so the sheet never drifts from the ServiceIndex.

## Oxygen
A code block with the dialog markup after the ServiceIndex, and the host attribute on the ServiceIndex wrapper. The bundle does the rest.

## Avoid
Content in the sheet that is not on the Services page, a second sheet per page, and forms inside the sheet (send people to Contact).
