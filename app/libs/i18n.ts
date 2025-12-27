import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../../public/locales/en/translation.json';
import es from '../../public/locales/es/translation.json';
import ro from '../../public/locales/ro/translation.json';
import de from '../../public/locales/de/translation.json';
import fr from '../../public/locales/fr/translation.json';
import jp from '../../public/locales/jp/translation.json';
import kr from '../../public/locales/kr/translation.json';
import th from '../../public/locales/th/translation.json';
import mn from '../../public/locales/mn/translation.json';
import ae from '../../public/locales/ae/translation.json';
import sa from '../../public/locales/sa/translation.json';
import tw from '../../public/locales/tw/translation.json';
import tr from '../../public/locales/tr/translation.json';
import nl from '../../public/locales/nl/translation.json';
import gr from '../../public/locales/gr/translation.json';
import il from '../../public/locales/il/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
            ro: { translation: ro },
            de: { translation: de },
            fr: { translation: fr },
            jp: { translation: jp },
            kr: { translation: kr },
            th: { translation: th },
            mn: { translation: mn },
            ae: { translation: ae },
            sa: { translation: sa },
            tw: { translation: tw },
            tr: { translation: tr },
            nl: { translation: nl },
            gr: { translation: gr },
            il: { translation: il },
        },
        fallbackLng: 'en',
        supportedLngs: ['en'],
        // supportedLngs: ['en', 'es', 'ro', 'de', 'fr', 'jp', 'kr', 'th', 'mn', 'ae', 'sa', 'tw', 'tr', 'nl', 'gr', 'il'],
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
