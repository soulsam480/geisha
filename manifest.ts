import type { ManifestV3Export } from '@crxjs/vite-plugin'

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'Geisha',
  version: '1.0.0',
  description: 'YTM comp',
  action: {
    default_icon: {
      16: 'icon-512.png',
      48: 'icon-512.png',
      128: 'icon-512.png',
    },
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  icons: {
    16: 'icon-512.png',
    48: 'icon-512.png',
    128: 'icon-512.png',
  },
  permissions: ['tabs', 'storage', 'activeTab'],
  host_permissions: ['*://*/*'],
  content_scripts: [
    {
      matches: ['https://music.youtube.com/*'],
      js: ['src/content/main.ts'],
      run_at: 'document_start',
    },
  ],
  web_accessible_resources: [
    {
      resources: ['*', 'src/scripts/fetch-mock.ts'],
      matches: ['<all_urls>'],
    },
  ],
}
