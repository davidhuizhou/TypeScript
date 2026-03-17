# Deno + TypeScript + VSCode Setup Guide

## Installing Deno

### macOS

Via Homebrew:

```bash
brew install deno
brew upgrade deno
```

Or via install script:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

### Verify installation

```bash
deno --version
```

## VSCode Setup

### 1. Install the Deno extension

- Open VSCode Extensions (`Cmd+Shift+X`)
- Search for "Deno" by denoland
- Install it

### 2. Enable Deno for your workspace

Create `.vscode/settings.json` in your project root:

```json
{
  "deno.enable": true
}
```

To disable Deno for specific subfolders (e.g. a pure Node.js project):

```json
{
  "deno.enable": true,
  "deno.disablePaths": ["./Handbook", "./NodeJs"]
}
```

Restart the language server - Sometimes the LSP gets out of sync:

- Cmd+Shift+P → "Deno: Restart Language Server" or
- Cmd+Shift+P → "Developer: Reload Window"

> **Note:** `deno.disablePaths` disables Deno LSP entirely for those paths.
> Do NOT add folders where you want Deno notebooks to work.

### 3. Initialize a Deno project

Each folder that uses Deno **must** have a `deno.json` file for the LSP to work properly with notebooks:

```bash
deno init
```

Or create a minimal `deno.json`:

```json
{
  "tasks": {}
}
```

Without `deno.json`, the Deno LSP will not recognize the folder as a Deno project and notebook cells will fail with "Could not find source file" errors.

## Using Deno with Jupyter Notebooks

### Install the Deno Jupyter kernel

```bash
deno jupyter --install
```

### Select the kernel in VSCode

1. Open a `.ipynb` file
2. Click the kernel selector (top-right)
3. Choose "Deno"

### Important: Deno uses ES modules, not CommonJS

Deno does not support `require()`. Use `import` syntax instead:

```typescript
// ❌ Node.js style (will not work in Deno)
const { createServer } = require('node:http');

// ✅ Deno style (ES modules)
import { createServer } from "node:http";
```

Deno supports Node built-in modules via the `node:` prefix, but you must use `import`.

### Known Issue: LSP errors in notebook Output panel

The Deno LSP may show errors like:

```batch
Unable to get semantic tokens from TypeScript: tsc error:
Could not find source file: '...ipynb#W2sZmlsZQ%253D%253D.ts'
```

This is a known Deno bug with notebook cell virtual document URIs. These errors:

- Appear in the Output panel (View → Output → "Deno Language Server")
- Do NOT affect notebook cell execution
- Affect LSP features like refactoring and semantic highlighting only

## Alternative: Node.js Kernel (tslab)

If you need Node.js (e.g. `require()`, Node-specific APIs) in Jupyter notebooks:

### Prerequisites

```bash
pip install jupyter
```

### Install tslab

```bash
npm install -g tslab
tslab install
```

Then select "JavaScript (Node.js)" or "TypeScript (Node.js)" as your kernel in VSCode.

## Running TypeScript Files

```bash
deno run script.ts              # Run a file
deno run --allow-net script.ts  # Run with network permission
deno run -A script.ts           # Run with all permissions
```

## Quick Reference

| Task | Command |
|------|---------|
| Run TypeScript | `deno run file.ts` |
| Install Deno Jupyter kernel | `deno jupyter --install` |
| Install Node.js Jupyter kernel | `npm install -g tslab && tslab install` |
| Check version | `deno --version` |
| REPL | `deno` |
| Format code | `deno fmt` |
| Lint code | `deno lint` |
| Initialize project | `deno init` |

## References

- https://docs.deno.com/runtime/getting_started/installation/
- https://docs.deno.com/runtime/getting_started/setup_your_environment/
- https://docs.deno.com/runtime/reference/cli/jupyter/
- https://docs.deno.com/runtime/getting_started/command_line_interface/
