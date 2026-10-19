# JobList

Open roles from Paylocity rendered as job rows, with loading, empty and error states.

## Use
- `div.ii-jobs[data-ii-jobs][data-src="feed.json"]`: the bundle fetches the Paylocity Recruiting job feed (or a same-origin proxy of it) and renders each posting's Title, JobLocation, HiringDepartment, PublishedDate and ApplyUrl. `IntegrityDS.jobs.render(el, data)` renders data you already have.
- Rows are stretched links that open the application on Paylocity in a new tab (announced to screen readers).
- Empty: a Notice inviting people to tell us about themselves, linking to Contact with the Careers topic; no claims about when roles open. Error: a Notice linking straight to the Paylocity careers page, announced "(opens in a new tab)".
- If the Paylocity plugin only offers an iframe, place it in `div.ii-embed` and keep the error Notice as the fallback link.

## Consumer provides
The feed URL (or plugin output) and the Paylocity careers page URL. Sample roles in previews are labeled "(sample)".

## WordPress
Style the plugin's markup with these classes, or render the feed in the theme; retire the CareerPlug link.

## Avoid
Spinners instead of skeleton rows, and dead links when the feed fails.
