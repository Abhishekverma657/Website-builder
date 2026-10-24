import JSZip from 'jszip';
import { BuilderElement, ElementStyles } from '../types/builder';

export const elementStylesToCss = (styles?: ElementStyles): string => {
  if (!styles) return '';
  const rules: string[] = [];

  if (styles.display) rules.push(`display: ${styles.display};`);
  if (styles.flexDirection) rules.push(`flex-direction: ${styles.flexDirection};`);
  if (styles.alignItems) rules.push(`align-items: ${styles.alignItems};`);
  if (styles.justifyContent) rules.push(`justify-content: ${styles.justifyContent};`);
  if (styles.flexWrap) rules.push(`flex-wrap: ${styles.flexWrap};`);
  if (styles.gap) rules.push(`gap: ${styles.gap};`);
  if (styles.gridTemplateColumns) rules.push(`grid-template-columns: ${styles.gridTemplateColumns};`);

  // Spacing
  if (styles.margin) {
    rules.push(`margin: ${styles.margin.top} ${styles.margin.right} ${styles.margin.bottom} ${styles.margin.left};`);
  }
  if (styles.padding) {
    rules.push(`padding: ${styles.padding.top} ${styles.padding.right} ${styles.padding.bottom} ${styles.padding.left};`);
  }

  // Size
  if (styles.width) rules.push(`width: ${styles.width};`);
  if (styles.height) rules.push(`height: ${styles.height};`);
  if (styles.maxWidth) rules.push(`max-width: ${styles.maxWidth};`);
  if (styles.minWidth) rules.push(`min-width: ${styles.minWidth};`);
  if (styles.maxHeight) rules.push(`max-height: ${styles.maxHeight};`);
  if (styles.minHeight) rules.push(`min-height: ${styles.minHeight};`);
  if (styles.overflow) rules.push(`overflow: ${styles.overflow};`);

  // Position
  if (styles.position) rules.push(`position: ${styles.position};`);
  if (styles.top) rules.push(`top: ${styles.top};`);
  if (styles.right) rules.push(`right: ${styles.right};`);
  if (styles.bottom) rules.push(`bottom: ${styles.bottom};`);
  if (styles.left) rules.push(`left: ${styles.left};`);
  if (styles.zIndex) rules.push(`z-index: ${styles.zIndex};`);

  // Typography
  if (styles.fontFamily) rules.push(`font-family: '${styles.fontFamily}', sans-serif;`);
  if (styles.fontSize) rules.push(`font-size: ${styles.fontSize};`);
  if (styles.fontWeight) rules.push(`font-weight: ${styles.fontWeight};`);
  if (styles.lineHeight) rules.push(`line-height: ${styles.lineHeight};`);
  if (styles.color) rules.push(`color: ${styles.color};`);
  if (styles.textAlign) rules.push(`text-align: ${styles.textAlign};`);
  if (styles.textTransform) rules.push(`text-transform: ${styles.textTransform};`);
  if (styles.textDecoration) rules.push(`text-decoration: ${styles.textDecoration};`);
  if (styles.letterSpacing) rules.push(`letter-spacing: ${styles.letterSpacing};`);

  // Background
  if (styles.backgroundColor) rules.push(`background-color: ${styles.backgroundColor};`);
  if (styles.backgroundImage) rules.push(`background-image: ${styles.backgroundImage};`);
  if (styles.backgroundSize) rules.push(`background-size: ${styles.backgroundSize};`);

  // Border
  if (styles.border) {
    if (styles.border.style && styles.border.style !== 'none') {
      rules.push(`border: ${styles.border.width || '1px'} ${styles.border.style} ${styles.border.color || '#e2e8f0'};`);
    }
    if (styles.border.radius) {
      rules.push(`border-radius: ${styles.border.radius};`);
    }
  }

  // Effects & 3D Animations
  if (styles.opacity) rules.push(`opacity: ${styles.opacity};`);
  if (styles.boxShadow) rules.push(`box-shadow: ${styles.boxShadow};`);
  if (styles.cursor) rules.push(`cursor: ${styles.cursor};`);
  if (styles.transition) rules.push(`transition: ${styles.transition};`);
  if (styles.transform) rules.push(`transform: ${styles.transform};`);
  if (styles.transformStyle) rules.push(`transform-style: ${styles.transformStyle};`);
  if (styles.perspective) rules.push(`perspective: ${styles.perspective};`);
  if (styles.backdropFilter) rules.push(`backdrop-filter: ${styles.backdropFilter}; -webkit-backdrop-filter: ${styles.backdropFilter};`);
  if (styles.animation) rules.push(`animation: ${styles.animation};`);

  return rules.join('\n  ');
};

export const generateProjectCss = (elements: BuilderElement[]): { desktopCss: string; tabletCss: string; mobileCss: string } => {
  let desktop = '';
  let tablet = '';
  let mobile = '';

  const processElement = (el: BuilderElement) => {
    const className = `.${el.id}`;
    
    // Desktop
    const dCss = elementStylesToCss(el.styles.desktop);
    if (dCss) {
      desktop += `${className} {\n  ${dCss}\n}\n\n`;
    }

    // Tablet
    if (el.styles.tablet && Object.keys(el.styles.tablet).length > 0) {
      const tCss = elementStylesToCss(el.styles.tablet as ElementStyles);
      if (tCss) {
        tablet += `  ${className} {\n    ${tCss.split('\n').join('\n    ')}\n  }\n\n`;
      }
    }

    // Mobile
    if (el.styles.mobile && Object.keys(el.styles.mobile).length > 0) {
      const mCss = elementStylesToCss(el.styles.mobile as ElementStyles);
      if (mCss) {
        mobile += `  ${className} {\n    ${mCss.split('\n').join('\n    ')}\n  }\n\n`;
      }
    }

    if (el.children) {
      el.children.forEach(processElement);
    }
  };

  elements.forEach(processElement);

  return { desktopCss: desktop, tabletCss: tablet, mobileCss: mobile };
};

export const generateElementHtml = (el: BuilderElement, indentLevel = 2): string => {
  const indent = ' '.repeat(indentLevel);
  const tag = el.tag || 'div';
  const attrList: string[] = [`class="${el.id}"`];

  if (el.attributes) {
    Object.entries(el.attributes).forEach(([k, v]) => {
      attrList.push(`${k}="${v}"`);
    });
  }

  const attrs = attrList.join(' ');

  if (['img', 'input', 'hr', 'br'].includes(tag)) {
    return `${indent}<${tag} ${attrs} />`;
  }

  if ((!el.children || el.children.length === 0) && el.content) {
    return `${indent}<${tag} ${attrs}>${el.content}</${tag}>`;
  }

  const childHtml = (el.children || [])
    .map((child) => generateElementHtml(child, indentLevel + 2))
    .join('\n');

  if (childHtml) {
    return `${indent}<${tag} ${attrs}>\n${childHtml}\n${indent}</${tag}>`;
  }

  return `${indent}<${tag} ${attrs}>${el.content || ''}</${tag}>`;
};

export const generateCompleteHtml = (elements: BuilderElement[], title = 'My Webflow Export'): { html: string; css: string } => {
  const { desktopCss, tabletCss, mobileCss } = generateProjectCss(elements);
  const bodyContent = elements.map((el) => generateElementHtml(el, 4)).join('\n');

  const css = `/* Reset & Base Standards */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #111827;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Micro-animations & 3D Keyframes */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 35px rgba(20, 184, 166, 0.85); }
}

@keyframes spin3D {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  100% { transform: rotateY(360deg) rotateX(15deg); }
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Generated Element Styles */
${desktopCss}

/* Tablet Responsive Breakpoint (max-width: 991px) */
@media (max-width: 991px) {
${tabletCss}
}

/* Mobile Responsive Breakpoint (max-width: 767px) */
@media (max-width: 767px) {
${mobileCss}
}
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="Exported modern static website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${bodyContent}

<script>
  // Mobile Hamburger Toggle Support
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    if (nav) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-menu-toggle';
      toggleBtn.innerHTML = '☰';
      toggleBtn.style.cssText = 'display:none;background:none;border:none;font-size:24px;cursor:pointer;padding:8px;';
      
      const mediaQuery = window.matchMedia('(max-width: 767px)');
      const checkMobile = (e) => {
        toggleBtn.style.display = e.matches ? 'block' : 'none';
      };
      mediaQuery.addListener(checkMobile);
      checkMobile(mediaQuery);
    }
  });
</script>
</body>
</html>`;

  return { html, css };
};

// Generates modular clean React Component JSX for an element
export const generateReactNode = (el: BuilderElement, indentLevel = 4): string => {
  const indent = ' '.repeat(indentLevel);
  const tag = el.tag || 'div';
  const className = el.id;
  const attrList: string[] = [`className="${className}"`];

  if (el.attributes) {
    Object.entries(el.attributes).forEach(([k, v]) => {
      if (k === 'class') return;
      if (k === 'for') {
        attrList.push(`htmlFor="${v}"`);
      } else {
        attrList.push(`${k}="${v}"`);
      }
    });
  }

  const attrs = attrList.join(' ');

  if (['img', 'input', 'hr', 'br'].includes(tag)) {
    return `${indent}<${tag} ${attrs} />`;
  }

  if ((!el.children || el.children.length === 0) && el.content) {
    return `${indent}<${tag} ${attrs}>${el.content}</${tag}>`;
  }

  const childrenCode = (el.children || [])
    .map((c) => generateReactNode(c, indentLevel + 2))
    .join('\n');

  if (childrenCode) {
    return `${indent}<${tag} ${attrs}>\n${childrenCode}\n${indent}</${tag}>`;
  }

  return `${indent}<${tag} ${attrs}>${el.content || ''}</${tag}>`;
};

// Complete React Project Structure generator
export const generateReactProjectFiles = (elements: BuilderElement[], projectName = 'my-react-website') => {
  const { html, css } = generateCompleteHtml(elements, projectName);

  // Divide into modular components
  const sections = elements.map((el, i) => {
    const compName = el.name.replace(/[^a-zA-Z0-9]/g, '') || `Section${i + 1}`;
    const jsx = `import React from 'react';

export const ${compName} = () => {
  return (
${generateReactNode(el, 4)}
  );
};
`;
    return { id: el.id, name: compName, code: jsx };
  });

  const appJsx = `import React, { useState } from 'react';
import './App.css';
${sections.map((s) => `import { ${s.name} } from './components/${s.name}';`).join('\n')}

export default function App() {
  return (
    <div className="website-root">
${sections.map((s) => `      <${s.name} />`).join('\n')}
    </div>
  );
}
`;

  const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  const packageJson = `{
  "name": "${projectName.toLowerCase().replace(/\\s+/g, '-')}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.4"
  }
}
`;

  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

  const readmeMd = `# ${projectName}

> 100% Static React.js Website exported from Visual Studio. Zero backend required!

## 🚀 Quick Start Instructions

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Local Dev Server**:
   \`\`\`bash
   npm run dev
   \`\`\`
   Open http://localhost:5173 to view your live site.

3. **Build for 100% Free Static Hosting (Vercel, Netlify, GitHub Pages)**:
   \`\`\`bash
   npm run build
   \`\`\`
   This generates a production-optimized \`dist\` folder that you can drag & drop onto Netlify or deploy to Vercel/Cloudflare Pages for free!

## 📂 Project Structure
\`\`\`text
${projectName}/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── components/
${sections.map((s) => `│       ├── ${s.name}.jsx`).join('\n')}
\`\`\`
`;

  return {
    packageJson,
    viteConfig,
    indexHtml,
    readmeMd,
    mainJsx,
    appJsx,
    appCss: css,
    sections,
    htmlFile: html,
  };
};

export const generateReactCode = (elements: BuilderElement[]): string => {
  const projectFiles = generateReactProjectFiles(elements, 'ExportedProject');
  return projectFiles.appJsx;
};

export const downloadZipArchive = async (elements: BuilderElement[], projectName = 'flowcraft-project') => {
  const files = generateReactProjectFiles(elements, projectName);
  const zip = new JSZip();

  // Root configuration files
  zip.file('package.json', files.packageJson);
  zip.file('vite.config.js', files.viteConfig);
  zip.file('index.html', files.indexHtml);
  zip.file('README.md', files.readmeMd);

  // Standalone pure HTML5 version in /static folder for instant browser double-click
  const staticFolder = zip.folder('static-html-version');
  if (staticFolder) {
    staticFolder.file('index.html', files.htmlFile);
    staticFolder.file('styles.css', files.appCss);
  }

  // Source Folder: src/
  const src = zip.folder('src');
  if (src) {
    src.file('main.jsx', files.mainJsx);
    src.file('App.jsx', files.appJsx);
    src.file('App.css', files.appCss);

    // Modular Components: src/components/
    const comps = src.folder('components');
    if (comps) {
      files.sections.forEach((sec) => {
        comps.file(`${sec.name}.jsx`, sec.code);
      });
    }
  }

  // Schema backup
  zip.file('project-schema.json', JSON.stringify(elements, null, 2));

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}-react-app.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
