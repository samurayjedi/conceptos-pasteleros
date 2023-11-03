import type { PiwiTheme } from "./Piwi/root/theme";

declare module '@emotion/react' {
  export interface Theme extends PiwiTheme {}
}
