export const LANGUAGES = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
} as const;

export type Language = keyof typeof LANGUAGES;

export interface HelloWorldProps {
  language: Language;
}

export const TEST_IDS = {
  root: "hello-world-root",
};

export const HelloWorld: React.FC<HelloWorldProps> = ({ language }) => {
  return <div data-testid={TEST_IDS.root}>{LANGUAGES[language]}, World!</div>;
};
