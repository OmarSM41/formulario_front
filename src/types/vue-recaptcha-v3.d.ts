declare module 'vue-recaptcha-v3' {
  import { Plugin } from 'vue';
  
  interface LoaderOptions {
    useRecaptchaNet?: boolean;
    autoHideBadge?: boolean;
  }
  
  interface VueReCaptchaOptions {
    siteKey: string;
    loaderOptions?: LoaderOptions;
  }
  
  export const VueReCaptcha: Plugin<VueReCaptchaOptions>;
  export function useReCaptcha(): {
    executeRecaptcha: (action: string) => Promise<string>;
    recaptchaLoaded: () => Promise<boolean>;
  };
}