# OnlyOfficeAgent

Ploinky OnlyOffice Document Server agent for AssistOS Explorer.

The agent lives in the `onlyOffice/` subdirectory because Ploinky discovers agents as `<repository>/<agent>/manifest.json`. Keeping that layout preserves the agent name `onlyOffice`, the route prefix `/base-agent-additional-server/onlyOffice/*`, and the workspace data path `.data/onlyOffice/{log,data,lib}`.

## Prerequisites

- Node.js 20 or later.
- The `ploinky` command-line tool.
- A container runtime supported by Ploinky, such as Podman or Docker.

## Install

With Ploinky:

```bash
ploinky add repo https://github.com/AssistOS-AI/OnlyOfficeAgent.git OnlyOfficeAgent
ploinky enable agent OnlyOfficeAgent/onlyOffice global
```

Or install it through Explorer, whose manifest declares this repository in its `repos` map. OnlyOffice is not enabled by default; enable it in `global` mode when needed. Ploinky provisions the shared `ONLYOFFICE_JWT_SECRET` per workspace.

The Document Server image stays in `container-image-builds` (`assistos/onlyoffice-agent`), pinned by digest in `onlyOffice/manifest.json`.

## Development and verification

The checkout must sit next to a `ploinky/` checkout, because `onlyOffice/tests/control-route.test.mjs` imports `../../../ploinky/Agent/lib/*`, and `PLOINKY_AGENTLIB_DIR` must point at an AchillesAgentLib checkout:

```bash
cd onlyOffice
PLOINKY_AGENTLIB_DIR=<path-to-achillesAgentLib> npm test
```

Security e2e tests under `onlyOffice/tests/e2e/` are skipped unless a live runtime is supplied with `ONLYOFFICE_E2E=1`, `ONLYOFFICE_E2E_ROUTER_BASE_URL`, and `ONLYOFFICE_E2E_AUTH_COOKIE`.

## Documentation

- [Agent documentation entry point](onlyOffice/docs/index.html), published at [assistos-ai.github.io/OnlyOfficeAgent/onlyOffice/docs](https://assistos-ai.github.io/OnlyOfficeAgent/onlyOffice/docs/)
- Explorer's [DS007-onlyoffice.md](https://github.com/AssistOS-AI/AssistOSExplorer/blob/main/docs/specs/DS007-onlyoffice.md) and [DS002-ploinky-runtime.md](https://github.com/AssistOS-AI/AssistOSExplorer/blob/main/docs/specs/DS002-ploinky-runtime.md) define the cross-repository contracts.

## License

MIT, see [LICENSE](LICENSE).
