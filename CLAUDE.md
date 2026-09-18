# OnlyOfficeAgent Repository Guide

## Scope

This repository owns the Ploinky `onlyOffice` agent: the authenticated control and storage bridge around the workspace OnlyOffice Document Server, with its scripts, documentation, and tests. Explorer (`AssistOSExplorer`) owns the editor host, preview surface, and the `DS007-onlyoffice.md` integration spec. The two repositories interact only through the Router-authenticated HTTP routes, the shared `ONLYOFFICE_JWT_SECRET`, and the absolute delegation target `agent:AchillesIDE/dpuAgent`.

## Layout

- `onlyOffice/` — the agent (`manifest.json`, `src/`, `scripts/`, `docs/`, `tests/`).
- Repository root files (README, LICENSE, .gitignore, .nojekyll) support the repository, not the runtime.

## Mandatory reading order

1. `onlyOffice/CLAUDE.md` for agent-local rules.
2. `onlyOffice/docs/specs/matrix.md` and `onlyOffice/docs/specs/DS001-coding-style.md`.
3. Explorer's `DS007-onlyoffice.md` and `DS002-ploinky-runtime.md` by GitHub URL in `onlyOffice/CLAUDE.md` before changing Explorer-facing behavior.

## Testing

```bash
cd onlyOffice
PLOINKY_AGENTLIB_DIR=<path-to-achillesAgentLib> npm test
```

The checkout must sit next to a `ploinky/` checkout because `onlyOffice/tests/control-route.test.mjs` imports `../../../ploinky/Agent/lib/*`.

## Repository rules

- Keep the agent name `onlyOffice` and the `onlyOffice/` directory: Ploinky resolves agents as `<repository>/<agent>/manifest.json`, and the route key, `.data/onlyOffice/*` volumes, container names, and `ploinky restart onlyOffice` calls depend on it.
- Never weaken the absolute delegation target `agent:AchillesIDE/dpuAgent` to the relative `agent:./dpuAgent` form; the relative form cannot resolve across repositories, and Confidential Office files depend on the delegation.
- Agent code reaches the Router only through the mounted `AgentMcpClient`; never consume direct `PLOINKY_ROUTER_*` variables or generated Router keys. `onlyOffice/tests/source-contract.test.mjs` enforces this.
- Never log JWT secrets, document tokens, callback tokens, or file contents.
- Update the HTML documentation and DS specifications in the same change as behavior, interface, or workflow changes.
- Keep `AGENTS.md` files as pointer stubs; substantive instructions belong in `CLAUDE.md`.

## Conventions

- Node.js 20+, ES modules, `.mjs` where established, `async`/`await`.
- 4-space JS indent, 2-space JSON/YAML, trailing commas for multi-line.
- camelCase filenames, files beside related logic.
- Prefer native Node features; the agent has no npm dependencies.

## Commit rules

- Present-tense imperative commit messages ("Add drain timeout guard").
- No AI/tool attribution, no `Co-Authored-By` trailers, and no agent names in commit metadata.
