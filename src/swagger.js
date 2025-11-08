import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determinar raíz del proyecto (una carpeta arriba de /src)
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

if (!fs.existsSync(srcDir)) {
  console.error('No se encontró la carpeta src en:', srcDir);
}

function collectJsFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...collectJsFiles(full));
    } else if (e.isFile() && full.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

const allJsFiles = collectJsFiles(srcDir);
console.log('Total .js files under src:', allJsFiles.length);

// Detectar archivos que contienen @openapi (debug)
const filesWithOpenApi = allJsFiles.filter(f => {
  try {
    const content = fs.readFileSync(f, 'utf8');
    return content.includes('@openapi');
  } catch {
    return false;
  }
});
console.log('Files containing @openapi:', filesWithOpenApi.length);
filesWithOpenApi.slice(0, 50).forEach(f => console.log(' -', path.relative(projectRoot, f)));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TP Final - API',
      version: '1.0.0',
    },
  },
  apis: allJsFiles,
};

const specs = swaggerJSDoc(options);

export default specs;