export const i18n = {
    defaultLocale: 'sv',
    locales: ['en', 'sv']
  } as const
  
  export type Locale = (typeof i18n)['locales'][number] 