# Gemini Agent Prompt Engineering Guide

This document outlines best practices for creating high-performance prompts for Gemini agents.

## Core Principles
1. **Be Specific:** Define the persona, context, task, and constraints clearly.
2. **Step-by-Step Logic:** Encourage the agent to break down complex tasks into smaller sub-tasks.
3. **Provide Examples:** Use few-shot prompting to demonstrate the desired output format and reasoning style.
4. **Constrain Output:** Explicitly state the required output format (e.g., JSON, markdown table, code block).

## Standard Prompt Structure
*   **Persona:** Who is the agent? (e.g., "Senior Software Engineer")
*   **Context:** What is the background? (e.g., "We are migrating to a new API")
*   **Task:** What exactly needs to be done?
*   **Constraints:** What should the agent avoid? (e.g., "Do not use external libraries")
*   **Validation:** How should the agent confirm success?

## UI Enhancement Principles
When asking for UI/UX prototypes, include these directives to ensure a polished look:
- **Consistency:** Use a unified color palette and consistent spacing/padding across components.
- **Modernity:** Prioritize clean typography, subtle shadows, and soft rounded corners.
- **Feedback:** Incorporate interactive states (hover, active, disabled) to make the interface feel responsive.
- **Completeness:** Ensure the layout is fully functional and uses high-quality placeholders if real data isn't available.
- **Simplicity:** Favor minimalist layouts with clear visual hierarchy over cluttered designs.

## Example Prompt Template
```markdown
[Persona] Act as an expert [Role].
[Context] We are currently [Task Environment].
[Task] Your goal is to [Task Description].
[Guidelines]
- Use [Style/Convention].
- Follow [Standard].
[Constraints]
- [Constraint 1]
- [Constraint 2]
[Verification]
- Confirm success by [Testing Step].
```
