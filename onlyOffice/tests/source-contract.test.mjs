import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const agentRoot = path.resolve(__dirname, '..');

const ROUTER_SIGNALS = Object.freeze({
  'direct-router-env': /\bPLOINKY_ROUTER_(?:URL|HOST|PORT|AUTHORITY|REQUEST_AUTHORITY)\b/,
  'generated-router-key': /\bPLOINKY_AGENT_API_KEY\b|\bPLOINKY_ENV_SOURCE_[A-Z0-9_]+\b/,
  'verified-router-client': /\bAgentMcpClient\.mjs\b/,
});

test('edge topology never consumes the direct Router environment', () => {
  const source = fs.readFileSync(path.join(agentRoot, 'src', 'edge-topology.mjs'), 'utf8');
  assert.doesNotMatch(source, /PLOINKY_ROUTER_URL/);
});

test('runtime reaches the Router only through the mounted AgentMcpClient', () => {
  const source = fs.readFileSync(path.join(agentRoot, 'src', 'index.mjs'), 'utf8');
  const signals = Object.entries(ROUTER_SIGNALS)
    .filter(([, pattern]) => pattern.test(source))
    .map(([name]) => name)
    .sort();
  assert.deepEqual(
    signals,
    ['verified-router-client'],
    'src/index.mjs must load the mounted Ploinky AgentMcpClient and own no Router socket or generated Router key',
  );
});
