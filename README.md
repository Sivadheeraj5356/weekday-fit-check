# Weekday Fit Check

A small, dependency-free readiness checker for reviewing Weekday software internship listings before submitting an application.

Weekday acts as a hiring marketplace, so similar listings can differ on pay, duration, work model, start date, and the proof of work expected from a candidate. This tool turns those checks into a repeatable report instead of relying on memory.

## What it checks

- The role is genuinely internship or entry-level.
- The work model fits India or remote constraints.
- Compensation is stated and not unpaid.
- Candidate availability covers the requested start date.
- The application has a public project and portfolio as proof of work.

## Run

```bash
npm test
npm run check
```

The example input is based on public listing fields and uses a fictional candidate profile. Replace `examples/candidate-profile.json` before checking a real application.

## Output

The CLI prints one `PASS` or `REVIEW` line per rule. A `REVIEW` line includes the next check to make; it does not invent an answer for the application form.
