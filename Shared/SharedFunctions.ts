import JSON_FILE from '../contents/content.json';

interface LocalizedText {
  en: string;
  ar: string;
}

interface ScreenContent {
  [key: string]: LocalizedText | LocalizedText[];
}

interface Contents {
  [screenName: string]: ScreenContent;
}

interface JSONFile {
  Contents: Contents;
}

const typedJSON: JSONFile = JSON_FILE as unknown as JSONFile;

let currentLanguage: "en" | "ar" = "en"; // Can be switched between "en" and "ar"

// Function to change the language
export function setLanguage(language: "en" | "ar") {
  currentLanguage = language;
}

export function getLocalizedEntry(screenName: string, key: string): string | string[] | null {
  const screenContent = typedJSON.Contents[screenName];

  if (screenContent && screenContent[key]) {
    const entry = screenContent[key];

    // If the entry is an array, return the text for the current language in each item
    if (Array.isArray(entry)) {
      return entry.map((item) => item[currentLanguage] || item["en"]); // Fallback to English if Arabic is missing
    }

    // Return the text in the current language, fallback to English if not available
    return entry[currentLanguage] || entry["en"];
  } else {
    console.warn(`Entry for ${screenName}.${key} not found.`);
    return null;
  }
}
