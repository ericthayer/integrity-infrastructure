# SafetyRecord

The safety metrics bid partners ask for first (EMR, TRIR, DART, OSHA training, certifications) in a SpecPlate, with a path to request the safety packet.

## Use
- `div.ii-safety` wrapping a SpecPlate; columns via `--safety-cols` (3 by default, 1 on mobile).
- Every metric stays `ii-pending` until the client supplies it with its year. The last cell links to Contact with the topic "Safety documents".

## Consumer provides
Current rates with the year they cover, certifications, and whether to publish or share on request.

## Oxygen
Bind to option fields so the numbers update yearly without layout changes.

## Avoid
Placeholder numbers of any kind, and burying the section below the fold on Safety.
