# Prompt Engineering Notes

*Compiled: 2026-02-05*

## What Is Prompt Engineering?

The practice of crafting inputs (prompts) to get the best possible results from a language model. It's the difference between a vague request and a sharp, goal-oriented instruction.

---

## Core Principles

### 1. Be Specific, Clear, and Direct
- Ambiguity = poor output
- Include desired format, scope, tone, and length
- The more specific, the more consistent the results

**❌ Vague:** "Write something about cybersecurity"
**✅ Better:** "Write a 100-word summary of the top 3 cybersecurity threats facing financial services in 2025. Use clear language for a non-technical audience."

### 2. Put Instructions First
- Place instructions at the beginning
- Use delimiters (###, """, ---) to separate instruction from context

**❌ Less effective:**
```
Summarize the text below as a bullet point list of the most important points.
{text}
```

**✅ Better:**
```
Summarize the text below as a bullet point list of the most important points.

Text: """
{text}
"""
```

### 3. Show, Don't Just Tell (Use Examples)
- Models respond better when shown specific format requirements
- Makes it easier to parse outputs reliably

### 4. Say What TO Do, Not What NOT to Do
- Avoid focusing on what not to do
- Focus on the desired behavior

**❌ Bad:** "DO NOT ask for username or password"
**✅ Better:** "Refer users to the help article instead of asking for personal information"

---

## Prompt Types

| Type | Description | When to Use |
|------|-------------|-------------|
| **Zero-shot** | Direct instruction, no examples | Simple, general tasks |
| **One-shot** | One example to set format/tone | When format matters but examples limited |
| **Few-shot** | Multiple examples to teach pattern | Teaching tone, classification, format |
| **Chain-of-thought** | Step-by-step reasoning | Math, logic, decisions, troubleshooting |
| **Role-based** | Assigns persona/context | Tasks requiring tone control or expertise |
| **Context-rich** | Includes background documents | Summarization, document analysis |

---

## Prompt Components

1. **System message** — Sets behavior, tone, role
2. **Instruction** — What to do (clear, specific)
3. **Context** — Background information needed
4. **Examples** — Demonstrations of desired output
5. **Output constraints** — Format, length, structure limits
6. **Delimiters** — Separate sections clearly

---

## Chain-of-Thought (CoT) Prompting

Guide the model to reason step by step rather than jumping to an answer.

**❌ Without CoT:** "Why is this login system insecure?"
**✅ With CoT:** "Let's solve this step by step. First, identify potential weaknesses in the login process. Then, explain how an attacker might exploit them..."

Use phrases like:
- "Let's think through this step by step"
- "First... then... therefore..."
- Add `<thinking>` and `<answer>` tags for separation

---

## Advanced Techniques

### Prompt Compression
Make prompts more efficient while maintaining effectiveness.

### Output Anchoring
Provide partial outputs to steer completion.

### Few-shot with Variety
Mix input variety with consistent output formatting.

### Combining Types
Advanced prompts often mix types:
```
"You are a cybersecurity analyst. [ROLE]
Below are two examples of incident reports. [FEW-SHOT]
Think step by step before proposing a resolution. [COT]
Then handle the new report below."
```

---

## Code Generation Tips

Use "leading words" to nudge toward patterns:

**❌ Less effective:**
```
# Write a simple python function that converts miles to kilometers
```

**✅ Better:**
```
# Write a simple python function that converts miles to kilometers
import
```

The `import` hints that it should write Python. Similarly, `SELECT` hints at SQL.

---

## Common Mistakes to Avoid

1. Being too vague or general
2. Leaving out key context
3. Skipping audience/role guidance
4. Not defining output length, tone, or structure
5. Focusing on what NOT to do instead of what TO do
6. Using inconsistent examples in few-shot
7. Giving context without clear structure

---

## Key Takeaways

1. **Start simple, iterate** — Prompting is an iterative process
2. **Be specific** — Details matter more than clever phrasing
3. **Use examples** — Show the model what you want
4. **Structure matters** — Clear delimiters and organization help
5. **Test and refine** — What works varies by task and model

---

## Sources

- OpenAI Best Practices: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
- Prompt Engineering Guide: https://www.promptingguide.ai
- Lakera Ultimate Guide 2026: https://www.lakera.ai/blog/prompt-engineering-guide
- Anthropic/Claude Docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
