export const i18n = {
    defaultLocale: 'sv',
    locales: ['en', 'sv', 'da']
  } as const
  
  export type Locale = (typeof i18n)['locales'][number]