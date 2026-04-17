Advanced Todo Card — Stage 1a
📌 Overview

This project extends the Stage 0 Todo Card into a more interactive, stateful, and accessible component.
The focus of Stage 1a is improving user interaction, visual feedback, accessibility, and time-based logic—while still maintaining a single Todo Card (not a full app).

🚀 What Changed from Stage 0

1. Editable Todo Content
* Added an Edit Mode that allows updating:
* Title
* Description
* Priority
* Due date
* Edit mode includes:
* Save & Cancel actions
* Previous values restored on cancel
* Focus returned to the Edit button after closing

  
2. Status Management
Todo status is now interactive, not just static.
Supported statuses:
Pending
In Progress
Done
Status stays synchronized across:
Checkbox
Status display
Status control dropdown


3. Priority Indicator Enhancements
Added a visual priority indicator that changes based on:
Low
Medium
High
Priority is represented visually using:
Color accents (border / indicator)
High priority tasks stand out clearly for quick scanning.


4. Expand / Collapse Description
Long descriptions are collapsed by default.
Added an expand/collapse toggle:
Click or keyboard accessible
Uses aria-expanded and aria-controls
Prevents layout overflow for very long content.


5. Improved Time Handling
Due time now updates dynamically every 30–60 seconds.
Time display is more granular:
“Due in 2 days”
“Due in 3 hours”
“Due in 45 minutes”
Overdue tasks:
Show a clear Overdue indicator
Use red visual accents
When status becomes Done:
Time updates stop
Display changes to Completed


🎨 Visual State Improvements

Different states now have clear visual distinctions:

Done
Strikethrough title
Muted colors
In Progress
Distinct visual styling
High Priority
Strong accent indicator
Overdue
Red highlight and badge

These changes help users quickly understand task urgency and status.



♿ Accessibility Improvements

Accessibility was considered throughout the component:

All edit inputs have associated <label> elements
Status control has an accessible name
Expand/collapse uses:
aria-expanded
aria-controls
Collapsible section has a matching id
Live time updates use:
aria-live="polite"
Keyboard navigation flow remains logical:
Checkbox → Status → Expand → Edit → Delete
Save / Cancel (in edit mode)


📱 Responsiveness

The layout adapts across screen sizes:

Mobile (320px)
Edit form fields stack vertically
Tablet (768px)
Improved spacing and readability
Desktop (1024px+)
Priority and status align horizontally

The UI remains stable with:

Very long titles
Wrapped tags
Extremely long descriptions


⚠️ Known Limitations
This is a single Todo Card, not a full todo list application
Data is not persisted after page reload
Focus trapping inside edit mode is partial (optional bonus)


✅ Summary

Stage 1a focuses on:

Better interactivity
Clear state synchronization
Stronger visual feedback
Improved accessibility
Cleaner time-based logic
