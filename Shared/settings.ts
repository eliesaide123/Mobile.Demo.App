import _shared from '../screens/common';

export function SetLangauge(language: string) {
  _shared.language = language;
}

export function GetLangauge() {
   return _shared.language
}
