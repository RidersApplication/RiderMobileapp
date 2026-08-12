const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('react/') || moduleName.startsWith('expo-router/')) {
    const parts = moduleName.split('/');
    const pkg = parts[0];
    const subpath = parts.slice(1).join('/');
    
    const exts = platform === 'web' ? ['.web.js', '.web.tsx', '.web.ts', '.js', '.tsx', '.ts'] : ['.js', '.tsx', '.ts'];
    for (const ext of exts) {
      const candidate = path.resolve(__dirname, 'node_modules', pkg, subpath + ext);
      if (fs.existsSync(candidate)) {
        return { filePath: candidate, type: 'sourceFile' };
      }
    }
    const indexCandidate = path.resolve(__dirname, 'node_modules', pkg, subpath, 'index.js');
    if (fs.existsSync(indexCandidate)) {
      return { filePath: indexCandidate, type: 'sourceFile' };
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
