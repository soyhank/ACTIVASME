/// <reference path="../.astro/types.d.ts" />

// Los paquetes de @fontsource no incluyen tipos para los imports de efecto
// secundario (solo cargan CSS). Declaramos los módulos para TypeScript.
declare module '@fontsource-variable/*';
declare module '@fontsource/*';
