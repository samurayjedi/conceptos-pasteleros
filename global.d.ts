import type { PiwiTheme } from './Piwi/root/theme';

declare module '@emotion/react' {
  export interface Theme extends PiwiTheme {}
}

declare global {
  interface InertiaPage {
    component: string;
    props: {
      errors: Record<string, string>;
    };
    url: string;
  }

  interface InertiaError {
    message: string;
    errors: InertiaPage['props']['errors'];
  }
}
