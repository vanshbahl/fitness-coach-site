---
trigger: always_on
---

# Version Control Boundaries

Git operations are **user-controlled**.

The AI must never perform or suggest performing destructive or remote Git operations without explicit instruction.

## Never Perform

Unless explicitly instructed by the user, never:

- Commit changes
- Push to GitHub
- Create Pull Requests
- Merge branches
- Rebase branches
- Force push
- Delete branches
- Modify GitHub repository settings
- Create releases or tags
- Change Git history

## Allowed

The AI may:

- Create or modify project files
- Generate code
- Refactor code
- Update documentation
- Suggest commit messages
- Explain Git commands
- Prepare changes for review

The user is solely responsible for:

- Reviewing code
- Committing changes
- Pushing to GitHub
- Managing branches
- Creating Pull Requests
- Deploying production code

When a feature is complete, stop after updating the project files and documentation, summarize the changes, and wait for the next instruction. Never perform any Git operation automatically.