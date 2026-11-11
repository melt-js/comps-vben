import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vben-stage-'));

try {
  // pnpm pack 会把 workspace:* 重写成当前包版本，避免 npm 拒绝 workspace 协议
  execSync(`pnpm pack --pack-destination "${tmp}"`, { stdio: 'inherit' });

  const tgz = fs.readdirSync(tmp).find((file) => file.endsWith('.tgz'));
  if (!tgz) throw new Error('pnpm pack did not produce a tarball');
  const tarball = path.join(tmp, tgz);
  console.log(`[publish:stage] packed ${tgz}`);

  execSync(
    `npx -y npm@11 stage publish "${tarball}" --registry=https://registry.npmjs.org --access public`,
    { stdio: 'inherit' },
  );
  console.log(`[publish:stage] ${pkg.name}@${pkg.version} staged`);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
