import { ILocalizer } from './localizer.interface';

export enum Culture {
  ENGLISH_US = 'en-US',
  SPANISH_ES = 'es-ES'
}

export class Localizer implements ILocalizer {
  private readonly _translations: Record<Culture, Record<string, string>>;

  constructor(translations: Record<Culture, Record<string, string>>) {
    this._translations = translations;
  }

  public localize(
    culture: Culture,
    key: string,
    args: Record<string, unknown>
  ): string {
    const translation = this._translations[culture];

    const localized = translation[key];
    for (const key in args) {
      const template = `{${key}}`;
      if (!localized.includes(template)) {
        console.warn(
          `Key ${key} not found in localized string : ${localized} for language ${culture}`
        );
        continue;
      }

      localized.replace(template, JSON.stringify(args[key]));
    }

    return localized;
  }
}
