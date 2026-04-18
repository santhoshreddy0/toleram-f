# Discussions Premium Theme Design

## Objective

Restyle the discussions/comment section so it matches the premium Tolaram visual language already used in the app shell, tabs, match cards, and CTA surfaces. The change is intentionally presentation-focused: preserve the existing data flow, optimistic posting behavior, pagination, and room lookup while upgrading the visual system and readability.

## Scope

In scope:

- Update the discussions screen container and comment section presentation.
- Bring the composer, list items, loading state, empty state, and load-more CTA into the gold-on-navy design system.
- Improve comment readability and hierarchy by removing truncation and rebalancing spacing.
- Keep the existing API usage and component contract unchanged.

Out of scope:

- New discussion features such as reactions, replies, moderation, editing, or sorting.
- Backend/API changes.
- Route changes or broader navigation redesign.

## Current Problem

The current `CommentsSection` uses generic gray utility styling (`bg-gray-900`, plain textarea, minimal list treatment) that no longer matches the rest of the application. The result is a visual break in the experience:

- The surface looks older than the surrounding layout.
- The composer lacks structure and premium hierarchy.
- Comment rows read as bare text instead of an intentional discussion thread.
- Loading/empty states fall back to generic placeholder styling.
- Comments are line-clamped, which hurts readability in a conversation context.

## Chosen Direction

Use a "premium lounge thread" treatment.

This direction keeps the comment experience calm, readable, and brand-aligned by using:

- deep navy gradient containers
- restrained gold borders and highlight text
- small cyan atmospheric glows for depth
- rounded framed surfaces instead of flat blocks
- editorial spacing and typography for thread items

This is preferred over a more aggressive "live broadcast" aesthetic because discussion content should remain readable and secondary to the core app flow.

## UX / Visual Design

### 1. Outer Container

The comment section becomes a centered premium shell rather than a full-screen flat gray panel.

Characteristics:

- rounded 2xl/3xl container
- navy multi-stop gradient background
- subtle gold border
- soft black drop shadow
- small gold/cyan blurred accent glows in opposing corners
- generous inner padding with responsive reduction on mobile

The section should feel visually consistent with existing surfaces such as match cards and tab switchers.

### 2. Header Block

The title and description should move into a dedicated introduction band at the top of the shell.

Characteristics:

- optional small uppercase eyebrow like `Fan Room`
- title using brighter warm text
- description in muted off-white/blue-gray
- thin gradient divider or top accent line for polish

This provides clearer hierarchy before the composer starts.

### 3. Composer

The sticky composer becomes a distinct framed panel, visually separated from the thread.

Characteristics:

- sticky top positioning retained
- rounded-xl panel with deep inset background
- avatar remains, but sits inside a more deliberate layout
- textarea gets a bordered input well with subtle focus ring
- helper copy can cue the room tone, e.g. "Share your take with the room"
- CTA becomes a gold gradient pill/button consistent with other premium CTAs
- disabled/loading states remain obvious but styled within the same system

Behavior remains unchanged:

- submit on button click or form submit
- optimistic pending comment still appears immediately

### 4. Comment Rows

Each comment becomes a full-width thread card rather than loose text on the page.

Characteristics:

- row wrapped in a rounded panel with translucent navy fill
- soft border that strengthens slightly on hover
- avatar preserved
- author name uses warmer emphasis color
- timestamp remains smaller and lower-contrast
- comment body uses full text display with `whitespace-pre-wrap` and `break-words`
- pending comments get a visually quieter appearance without changing structure

The key change is removing the current `line-clamp-2`; discussion content should be readable in place.

### 5. Empty / Loading / Pagination States

All secondary states should look like part of the same surface:

- loading state uses centered muted copy inside a framed panel
- empty state uses a premium empty well with encouraging copy
- load-more becomes a secondary ghost-style themed button rather than green/plain text

## Layout / Responsiveness

- Keep the component within a `max-w` discussion column rather than stretching edge to edge.
- Preserve mobile usability by keeping controls stacked naturally and avoiding over-tight spacing.
- Ensure the sticky composer does not visually blend into the page background; it needs its own backdrop and border treatment.
- Avoid fixed heights that cause clipping issues; prefer viewport-aware min height with scroll area preserved.

## Technical Plan

Primary implementation target:

- `src/Components/comments/CommentsSection.jsx`

Likely changes:

- replace generic gray utility classes with the existing gold/navy token family already used across the repo
- restructure markup slightly to support a dedicated header band and framed list rows
- remove text clamping from comment bodies
- preserve all existing hooks, state, mutations, and pagination logic

No API contract changes are expected.

## Error Handling / Edge Cases

- Missing `roomName` or unresolved room should continue to disable posting safely.
- Optimistic comments must still render correctly while pending.
- Comments with long words or long sentences must wrap cleanly.
- Empty comment submissions remain blocked.
- Anonymous fallback naming behavior remains unchanged.

## Testing Strategy

Manual verification is sufficient for this styling-focused change:

- open `/discussions` on desktop and mobile widths
- verify sticky composer remains usable while scrolling
- verify posting still adds an optimistic comment and transitions out of pending state
- verify long comments render fully and wrap correctly
- verify loading/empty/load-more states match the new theme

If tests exist around this component later, visual/behavioral assertions can be added, but no new automated harness is required for this change alone.

## Risks / Tradeoffs

- A richer visual shell increases class complexity inside a single component.
- If the component keeps `h-screen` semantics blindly, sticky/scroll interactions may still feel awkward; implementation should be careful here.
- Reworking markup too aggressively could collide with the user’s existing edits in the discussions route, so the component change should stay localized.

## Acceptance Criteria

- The discussions page no longer uses generic gray chat styling.
- The section visually matches the app’s premium gold-on-navy theme.
- The composer, comments, and secondary states all look cohesive.
- Comment text is fully readable without two-line truncation.
- Existing discussion behavior continues to work without API changes.
