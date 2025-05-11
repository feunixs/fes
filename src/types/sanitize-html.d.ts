/**
 * Type declarations for sanitize-html library
 */

declare module 'sanitize-html' {
  interface SanitizeOptions {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedStyles?: Record<string, Record<string, RegExp[]>>;
    selfClosing?: string[];
    allowedSchemes?: string[];
    allowedSchemesByTag?: Record<string, string[]>;
    allowedSchemesAppliedToAttributes?: string[];
    allowProtocolRelative?: boolean;
    parser?: object;
    transformTags?: Record<string, string | ((tagName: string, attribs: Record<string, string>) => {
      tagName: string;
      attribs: Record<string, string>;
    })>;
  }
  
  function sanitize(dirty: string, options?: SanitizeOptions): string;
  export = sanitize;
}
