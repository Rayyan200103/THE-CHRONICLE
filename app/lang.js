/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — languages
   Shared by every page, alongside app.js. Self-contained.

   WHAT IT DOES
   A small globe sits at the right of every page's header. It opens a panel
   listing every language Google Translate can read — the five machine-
   translatable languages of Pakistan first, then South Asia, the Middle East
   and Central Asia, Europe, East Asia, Southeast Asia and the Pacific,
   Africa, the Americas, and the classical languages — each under its own
   name, in its own script, searchable in any of them.

   Choosing a language opens the page through Google Translate's full-page
   view (translate.goog). From then on every page, entry, panel and link the
   reader opens stays in that language for the session, because Google
   rewrites the site's own links as it goes. Choosing English returns to the
   original. The choice is remembered on the device, and a returning reader
   is offered their language with one tap.

   WHAT IT KEEPS OUT OF THE MACHINE
   The English original is the authoritative text. While a page is shown in
   translation, this file marks as "do not translate":
     · scripture in its original languages — every passage in Arabic, Hebrew,
       Syriac or Greek script, and the Devanagari originals — so that the
       Arabic of the Qur'an is never re-worded by a machine;
     · the published English renderings of scripture quoted in Before Adam and
       Comparative Religion (the verse and evidence blocks), which a machine
       would otherwise re-translate at second hand;
     · the bibliographies and the SOURCES of every entry, so that titles of
       books and articles stay exactly as published and can still be found;
     · the names of the project, its authors and its partner institute.
   It also sets the text right to left for Urdu, Arabic, Persian, Pashto,
   Sindhi, Balochi, Hebrew and the other right-to-left languages, and loads
   Nastaliq type for Urdu, Punjabi (Shahmukhi) and Balochi, and Naskh for
   Arabic, Persian, Pashto and Sindhi, without disturbing the timeline's
   layout.

   WHY GOOGLE'S FULL-PAGE VIEW
   Google retired its embeddable website-translator widget on 1 October 2026.
   Its full-page translation remains part of Google Translate itself, needs no
   key, account or payment, and covers every language listed here. Nothing is
   sent to Google unless a reader chooses a language. The kept passages are
   also marked translate="no" in the pages' own HTML, so they are protected
   even before this file has run.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.ChroniclesLang) return;

  /* ── 1 · THE LANGUAGES ─────────────────────────────────────────────────
     [Google Translate code, English name, the language's own name, group, flags]
     flags: r = written right to left · n = Nastaliq script · k = Naskh (Arabic) script
     Codes are those Google Translate itself uses (checked October 2026). Where a
     language's own name could not be given with certainty, the English name stands. */
  var GROUPS = ['pk', 'sa', 'me', 'eu', 'ea', 'sea', 'af', 'am', 'cl'];
  var LANGS = [
    // Pakistan
    ['ur', 'Urdu', 'اردو', 'pk', 'rn'],
    ['pa-Arab', 'Punjabi (Shahmukhi)', 'پنجابی', 'pk', 'rn'],
    ['sd', 'Sindhi', 'سنڌي', 'pk', 'rk'],
    ['ps', 'Pashto', 'پښتو', 'pk', 'rk'],
    ['bal', 'Balochi', 'بلوچی', 'pk', 'rn'],
    // South Asia
    ['hi', 'Hindi', 'हिन्दी', 'sa'], ['bn', 'Bengali', 'বাংলা', 'sa'], ['pa', 'Punjabi (Gurmukhi)', 'ਪੰਜਾਬੀ', 'sa'],
    ['gu', 'Gujarati', 'ગુજરાતી', 'sa'], ['mr', 'Marathi', 'मराठी', 'sa'], ['ta', 'Tamil', 'தமிழ்', 'sa'],
    ['te', 'Telugu', 'తెలుగు', 'sa'], ['kn', 'Kannada', 'ಕನ್ನಡ', 'sa'], ['ml', 'Malayalam', 'മലയാളം', 'sa'],
    ['or', 'Odia', 'ଓଡ଼ିଆ', 'sa'], ['as', 'Assamese', 'অসমীয়া', 'sa'], ['ne', 'Nepali', 'नेपाली', 'sa'],
    ['si', 'Sinhala', 'සිංහල', 'sa'], ['dv', 'Dhivehi', 'ދިވެހި', 'sa', 'r'], ['dz', 'Dzongkha', 'རྫོང་ཁ', 'sa'],
    ['mai', 'Maithili', 'मैथिली', 'sa'], ['bho', 'Bhojpuri', 'भोजपुरी', 'sa'], ['awa', 'Awadhi', 'अवधी', 'sa'],
    ['doi', 'Dogri', 'डोगरी', 'sa'], ['mwr', 'Marwadi', 'मारवाड़ी', 'sa'], ['gom', 'Konkani', 'कोंकणी', 'sa'],
    ['new', 'Nepal Bhasa (Newari)', 'नेपाल भाषा', 'sa'], ['mni-Mtei', 'Meitei (Manipuri)', 'ꯃꯤꯇꯩꯂꯣꯟ', 'sa'],
    ['sat', 'Santali (Ol Chiki)', 'ᱥᱟᱱᱛᱟᱲᱤ', 'sa'], ['sat-Latn', 'Santali (Latin)', '', 'sa'], ['tcy', 'Tulu', 'ತುಳು', 'sa'],
    ['lus', 'Mizo', 'Mizo ṭawng', 'sa'], ['kha', 'Khasi', '', 'sa'], ['trp', 'Kokborok', '', 'sa'],
    // Middle East & Central Asia
    ['ar', 'Arabic', 'العربية', 'me', 'rk'], ['fa', 'Persian', 'فارسی', 'me', 'rk'], ['fa-AF', 'Dari', 'دری', 'me', 'rk'],
    ['iw', 'Hebrew', 'עברית', 'me', 'r'], ['tr', 'Turkish', 'Türkçe', 'me'], ['ku', 'Kurdish (Kurmanji)', 'Kurdî', 'me'],
    ['ckb', 'Kurdish (Sorani)', 'کوردی', 'me', 'rk'], ['az', 'Azerbaijani', 'Azərbaycan dili', 'me'],
    ['hy', 'Armenian', 'Հայերեն', 'me'], ['ka', 'Georgian', 'ქართული', 'me'], ['kk', 'Kazakh', 'Қазақ тілі', 'me'],
    ['uz', 'Uzbek', 'Oʻzbekcha', 'me'], ['ky', 'Kyrgyz', 'Кыргызча', 'me'], ['tg', 'Tajik', 'Тоҷикӣ', 'me'],
    ['tk', 'Turkmen', 'Türkmençe', 'me'], ['ug', 'Uyghur', 'ئۇيغۇرچە', 'me', 'rk'],
    // Europe & Russia
    ['fr', 'French', 'Français', 'eu'], ['de', 'German', 'Deutsch', 'eu'], ['es', 'Spanish', 'Español', 'eu'],
    ['it', 'Italian', 'Italiano', 'eu'], ['pt-PT', 'Portuguese (Portugal)', 'Português (Portugal)', 'eu'],
    ['nl', 'Dutch', 'Nederlands', 'eu'], ['ru', 'Russian', 'Русский', 'eu'], ['pl', 'Polish', 'Polski', 'eu'],
    ['uk', 'Ukrainian', 'Українська', 'eu'], ['el', 'Greek', 'Ελληνικά', 'eu'], ['sv', 'Swedish', 'Svenska', 'eu'],
    ['no', 'Norwegian', 'Norsk', 'eu'], ['da', 'Danish', 'Dansk', 'eu'], ['fi', 'Finnish', 'Suomi', 'eu'],
    ['is', 'Icelandic', 'Íslenska', 'eu'], ['fo', 'Faroese', 'Føroyskt', 'eu'], ['ga', 'Irish', 'Gaeilge', 'eu'],
    ['gd', 'Scots Gaelic', 'Gàidhlig', 'eu'], ['cy', 'Welsh', 'Cymraeg', 'eu'], ['br', 'Breton', 'Brezhoneg', 'eu'],
    ['gv', 'Manx', 'Gaelg', 'eu'], ['ca', 'Catalan', 'Català', 'eu'], ['eu', 'Basque', 'Euskara', 'eu'],
    ['gl', 'Galician', 'Galego', 'eu'], ['oc', 'Occitan', 'Occitan', 'eu'], ['co', 'Corsican', 'Corsu', 'eu'],
    ['scn', 'Sicilian', 'Sicilianu', 'eu'], ['lij', 'Ligurian', 'Ligure', 'eu'], ['lmo', 'Lombard', 'Lombard', 'eu'],
    ['vec', 'Venetian', 'Vèneto', 'eu'], ['fur', 'Friulian', 'Furlan', 'eu'], ['lb', 'Luxembourgish', 'Lëtzebuergesch', 'eu'],
    ['fy', 'Frisian', 'Frysk', 'eu'], ['li', 'Limburgish', 'Limburgs', 'eu'], ['mt', 'Maltese', 'Malti', 'eu'],
    ['cs', 'Czech', 'Čeština', 'eu'], ['sk', 'Slovak', 'Slovenčina', 'eu'], ['szl', 'Silesian', '', 'eu'],
    ['hu', 'Hungarian', 'Magyar', 'eu'], ['ro', 'Romanian', 'Română', 'eu'], ['bg', 'Bulgarian', 'Български', 'eu'],
    ['mk', 'Macedonian', 'Македонски', 'eu'], ['sr', 'Serbian', 'Српски', 'eu'], ['hr', 'Croatian', 'Hrvatski', 'eu'],
    ['bs', 'Bosnian', 'Bosanski', 'eu'], ['sl', 'Slovenian', 'Slovenščina', 'eu'], ['sq', 'Albanian', 'Shqip', 'eu'],
    ['et', 'Estonian', 'Eesti', 'eu'], ['lv', 'Latvian', 'Latviešu', 'eu'], ['ltg', 'Latgalian', '', 'eu'],
    ['lt', 'Lithuanian', 'Lietuvių', 'eu'], ['be', 'Belarusian', 'Беларуская', 'eu'], ['se', 'Northern Sami', 'Davvisámegiella', 'eu'],
    ['rom', 'Romani', 'Romani ćhib', 'eu'], ['yi', 'Yiddish', 'ייִדיש', 'eu', 'r'], ['tt', 'Tatar', 'Татарча', 'eu'],
    ['ba', 'Bashkir', 'Башҡортса', 'eu'], ['cv', 'Chuvash', 'Чӑвашла', 'eu'], ['chm', 'Meadow Mari', '', 'eu'],
    ['udm', 'Udmurt', '', 'eu'], ['kv', 'Komi', '', 'eu'], ['os', 'Ossetian', 'Ирон', 'eu'], ['ce', 'Chechen', 'Нохчийн', 'eu'],
    ['av', 'Avar', '', 'eu'], ['ab', 'Abkhaz', 'Аԥсуа', 'eu'], ['crh-Latn', 'Crimean Tatar (Latin)', 'Qırımtatarca', 'eu'],
    ['crh', 'Crimean Tatar (Cyrillic)', 'Къырымтатарджа', 'eu'], ['sah', 'Yakut (Sakha)', 'Саха тыла', 'eu'],
    ['tyv', 'Tuvan', '', 'eu'], ['bua', 'Buryat', '', 'eu'],
    // East Asia
    ['zh-CN', 'Chinese (Simplified)', '简体中文', 'ea'], ['zh-TW', 'Chinese (Traditional)', '繁體中文', 'ea'],
    ['yue', 'Cantonese', '粵語', 'ea'], ['ja', 'Japanese', '日本語', 'ea'], ['ko', 'Korean', '한국어', 'ea'],
    ['mn', 'Mongolian', 'Монгол', 'ea'], ['bo', 'Tibetan', 'བོད་སྐད', 'ea'],
    // Southeast Asia & Pacific
    ['ms', 'Malay', 'Bahasa Melayu', 'sea'], ['ms-Arab', 'Malay (Jawi)', 'بهاس ملايو', 'sea', 'rk'],
    ['id', 'Indonesian', 'Bahasa Indonesia', 'sea'], ['jw', 'Javanese', 'Basa Jawa', 'sea'], ['su', 'Sundanese', 'Basa Sunda', 'sea'],
    ['th', 'Thai', 'ไทย', 'sea'], ['vi', 'Vietnamese', 'Tiếng Việt', 'sea'], ['km', 'Khmer', 'ខ្មែរ', 'sea'],
    ['lo', 'Lao', 'ລາວ', 'sea'], ['my', 'Burmese', 'မြန်မာ', 'sea'], ['tl', 'Filipino (Tagalog)', 'Filipino', 'sea'],
    ['ceb', 'Cebuano', 'Binisaya', 'sea'], ['ilo', 'Ilocano', 'Ilokano', 'sea'], ['hil', 'Hiligaynon', '', 'sea'],
    ['war', 'Waray', 'Winaray', 'sea'], ['bik', 'Bikol', '', 'sea'], ['pam', 'Kapampangan', '', 'sea'],
    ['pag', 'Pangasinan', '', 'sea'], ['tet', 'Tetum', 'Tetun', 'sea'], ['ace', 'Acehnese', '', 'sea'],
    ['ban', 'Balinese', 'Basa Bali', 'sea'], ['bew', 'Betawi', '', 'sea'], ['btx', 'Batak Karo', '', 'sea'],
    ['bts', 'Batak Simalungun', '', 'sea'], ['bbc', 'Batak Toba', '', 'sea'], ['mad', 'Madurese', '', 'sea'],
    ['mak', 'Makassar', '', 'sea'], ['min', 'Minangkabau', 'Baso Minang', 'sea'], ['iba', 'Iban', '', 'sea'],
    ['shn', 'Shan', '', 'sea'], ['kac', 'Jingpo', 'Jinghpaw', 'sea'], ['cnh', 'Hakha Chin', '', 'sea'],
    ['hmn', 'Hmong', 'Hmoob', 'sea'], ['mi', 'Māori', 'Te Reo Māori', 'sea'], ['sm', 'Samoan', 'Gagana Sāmoa', 'sea'],
    ['to', 'Tongan', 'Lea fakatonga', 'sea'], ['ty', 'Tahitian', 'Reo Tahiti', 'sea'], ['fj', 'Fijian', 'Vosa Vakaviti', 'sea'],
    ['haw', 'Hawaiian', 'ʻŌlelo Hawaiʻi', 'sea'], ['tpi', 'Tok Pisin', 'Tok Pisin', 'sea'], ['mh', 'Marshallese', '', 'sea'],
    ['ch', 'Chamorro', 'Chamoru', 'sea'], ['chk', 'Chuukese', '', 'sea'],
    // Africa
    ['sw', 'Swahili', 'Kiswahili', 'af'], ['am', 'Amharic', 'አማርኛ', 'af'], ['ti', 'Tigrinya', 'ትግርኛ', 'af'],
    ['om', 'Oromo', 'Afaan Oromoo', 'af'], ['so', 'Somali', 'Soomaali', 'af'], ['aa', 'Afar', 'Qafaraf', 'af'],
    ['ha', 'Hausa', 'Hausa', 'af'], ['yo', 'Yoruba', 'Yorùbá', 'af'], ['ig', 'Igbo', 'Asụsụ Igbo', 'af'],
    ['ff', 'Fulani', 'Fulfulde', 'af'], ['wo', 'Wolof', 'Wolof', 'af'], ['bm', 'Bambara', 'Bamanankan', 'af'],
    ['bm-Nkoo', 'N’Ko', 'ߒߞߏ', 'af', 'r'], ['dyu', 'Dyula', 'Julakan', 'af'], ['ee', 'Ewe', 'Eʋegbe', 'af'],
    ['ak', 'Twi (Akan)', 'Twi', 'af'], ['gaa', 'Ga', 'Gã', 'af'], ['fon', 'Fon', 'Fɔngbè', 'af'], ['kri', 'Krio', 'Krio', 'af'],
    ['sus', 'Susu', '', 'af'], ['tiv', 'Tiv', 'Tiv', 'af'], ['kr', 'Kanuri', 'Kanuri', 'af'], ['bci', 'Baoulé', '', 'af'],
    ['ln', 'Lingala', 'Lingála', 'af'], ['kg', 'Kikongo', 'Kikongo', 'af'], ['ktu', 'Kituba', 'Kituba', 'af'],
    ['lua', 'Tshiluba', 'Tshiluba', 'af'], ['sg', 'Sango', 'Sängö', 'af'], ['rw', 'Kinyarwanda', 'Ikinyarwanda', 'af'],
    ['rn', 'Kirundi', 'Ikirundi', 'af'], ['lg', 'Luganda', 'Luganda', 'af'], ['cgg', 'Kiga', 'Rukiga', 'af'],
    ['ach', 'Acholi', 'Acoli', 'af'], ['alz', 'Alur', 'Alur', 'af'], ['luo', 'Luo', 'Dholuo', 'af'],
    ['din', 'Dinka', 'Thuɔŋjäŋ', 'af'], ['nus', 'Nuer', 'Thok Naath', 'af'], ['zu', 'Zulu', 'isiZulu', 'af'],
    ['xh', 'Xhosa', 'isiXhosa', 'af'], ['af', 'Afrikaans', 'Afrikaans', 'af'], ['st', 'Sesotho', 'Sesotho', 'af'],
    ['nso', 'Sepedi', 'Sesotho sa Leboa', 'af'], ['tn', 'Tswana', 'Setswana', 'af'], ['ts', 'Tsonga', 'Xitsonga', 'af'],
    ['ss', 'Swati', 'SiSwati', 'af'], ['ve', 'Venda', 'Tshivenḓa', 'af'], ['nr', 'South Ndebele', 'isiNdebele', 'af'],
    ['sn', 'Shona', 'chiShona', 'af'], ['ny', 'Chichewa', 'Chichewa', 'af'], ['bem', 'Bemba', 'Ichibemba', 'af'],
    ['tum', 'Tumbuka', 'Chitumbuka', 'af'], ['dov', 'Dombe', '', 'af'], ['ndc-ZW', 'Ndau', 'ChiNdau', 'af'],
    ['mg', 'Malagasy', 'Malagasy', 'af'], ['crs', 'Seychellois Creole', 'Kreol Seselwa', 'af'],
    ['mfe', 'Mauritian Creole', 'Kreol Morisien', 'af'], ['ber-Latn', 'Tamazight (Latin)', 'Tamaziɣt', 'af'],
    ['ber', 'Tamazight (Tifinagh)', 'ⵜⴰⵎⴰⵣⵉⵖⵜ', 'af'],
    // The Americas
    ['pt', 'Portuguese (Brazil)', 'Português (Brasil)', 'am'], ['fr-CA', 'French (Canada)', 'Français (Canada)', 'am'],
    ['ht', 'Haitian Creole', 'Kreyòl ayisyen', 'am'], ['qu', 'Quechua', 'Runa Simi', 'am'], ['ay', 'Aymara', 'Aymar aru', 'am'],
    ['gn', 'Guarani', 'Avañeʼẽ', 'am'], ['yua', 'Yucatec Maya', 'Maaya tʼaan', 'am'], ['nhe', 'Nahuatl (Eastern Huasteca)', 'Nāhuatl', 'am'],
    ['zap', 'Zapotec', '', 'am'], ['kek', 'Qʼeqchiʼ', 'Qʼeqchiʼ', 'am'], ['mam', 'Mam', '', 'am'],
    ['pap', 'Papiamento', 'Papiamentu', 'am'], ['jam', 'Jamaican Patois', 'Patwa', 'am'], ['hrx', 'Hunsrik', '', 'am'],
    ['kl', 'Kalaallisut', 'Kalaallisut', 'am'], ['iu', 'Inuktut (Syllabics)', 'ᐃᓄᒃᑎᑐᑦ', 'am'], ['iu-Latn', 'Inuktut (Latin)', 'Inuktut', 'am'],
    // Classical & constructed
    ['la', 'Latin', 'Latina', 'cl'], ['sa', 'Sanskrit', 'संस्कृतम्', 'cl'], ['eo', 'Esperanto', 'Esperanto', 'cl']
  ];

  // Languages of Pakistan that no machine-translation engine yet supports.
  // Their names are given as they are written in Pakistan.
  var SOON = [
    ['skr', 'Saraiki', 'سرائیکی'], ['ks', 'Kashmiri', 'کٲشُر'], ['hno', 'Hindko', 'ہندکو'],
    ['brh', 'Brahui', 'براہوئی'], ['scl', 'Shina', 'شینا'], ['bft', 'Balti', 'بلتی'],
    ['bsk', 'Burushaski', 'بروشسکی'], ['wbl', 'Wakhi', 'وخی'], ['khw', 'Khowar', 'کھوار']
  ];

  // Other names people search for.
  var ALIAS = {
    'ur': 'urdu pakistan', 'pa-Arab': 'punjabi shahmukhi lahnda western punjabi pakistan',
    'sd': 'sindhi sindh pakistan', 'ps': 'pashto pukhto pakhto pushto afghan pakistan', 'bal': 'balochi baluchi balochistan pakistan',
    'ms': 'malaysian malaysia bahasa melayu', 'ms-Arab': 'jawi malaysian', 'id': 'indonesia bahasa',
    'zh-CN': 'chinese mandarin simplified china putonghua', 'zh-TW': 'chinese mandarin traditional taiwan hong kong',
    'yue': 'cantonese hong kong', 'fa': 'farsi iran persian', 'fa-AF': 'dari afghanistan persian', 'iw': 'hebrew israel ivrit',
    'tl': 'tagalog filipino philippines pilipino', 'my': 'burmese myanmar', 'el': 'greek hellenic', 'ckb': 'sorani kurdish',
    'ku': 'kurmanji kurdish', 'ug': 'uighur uyghur', 'pt': 'portuguese brazil brasil', 'pt-PT': 'portuguese portugal',
    'es': 'spanish castilian castellano latin america mexico', 'fr': 'french francais', 'de': 'german deutsch',
    'jw': 'javanese java', 'no': 'norwegian bokmal', 'sr': 'serbian srpski', 'ar': 'arabic arabia egypt saudi gulf maghreb',
    'hi': 'hindi india', 'bn': 'bengali bangla bangladesh', 'pa': 'punjabi gurmukhi india', 'ne': 'nepali nepal',
    'si': 'sinhala sinhalese sri lanka', 'dv': 'dhivehi maldivian maldives', 'ta': 'tamil sri lanka india',
    'am': 'amharic ethiopia', 'ti': 'tigrinya eritrea', 'sw': 'swahili kiswahili kenya tanzania', 'ha': 'hausa nigeria niger',
    'yo': 'yoruba nigeria', 'ig': 'igbo nigeria', 'zu': 'zulu south africa', 'xh': 'xhosa south africa',
    'af': 'afrikaans south africa namibia', 'ber-Latn': 'berber amazigh tamazight morocco algeria',
    'ber': 'berber amazigh tifinagh morocco', 'ff': 'fula fulah pular peul', 'ak': 'akan twi ghana',
    'ny': 'nyanja chewa malawi', 'rw': 'rwanda kinyarwanda', 'rn': 'rundi burundi', 'lg': 'ganda uganda',
    'mg': 'malagasy madagascar', 'so': 'somali somalia', 'om': 'oromo ethiopia', 'ht': 'haitian creole haiti',
    'qu': 'quechua peru andes', 'gn': 'guarani paraguay', 'mi': 'maori new zealand aotearoa', 'sm': 'samoan samoa',
    'haw': 'hawaiian hawaii', 'tpi': 'tok pisin papua new guinea', 'ja': 'japanese nihongo', 'ko': 'korean hangul',
    'ru': 'russian russia', 'uk': 'ukrainian ukraine', 'kk': 'kazakh kazakhstan', 'uz': 'uzbek uzbekistan',
    'tg': 'tajik tajikistan', 'tk': 'turkmen turkmenistan', 'ky': 'kyrgyz kyrgyzstan', 'az': 'azeri azerbaijan',
    'tr': 'turkish turkiye turkey', 'hy': 'armenian armenia', 'ka': 'georgian georgia kartuli', 'mn': 'mongolian mongolia',
    'bo': 'tibetan tibet', 'dz': 'dzongkha bhutan', 'la': 'latin', 'sa': 'sanskrit', 'eo': 'esperanto',
    'skr': 'saraiki seraiki siraiki multan pakistan', 'ks': 'kashmiri koshur kashmir pakistan',
    'hno': 'hindko hazara peshawar pakistan', 'brh': 'brahui balochistan pakistan', 'scl': 'shina gilgit baltistan pakistan',
    'bft': 'balti baltistan pakistan', 'bsk': 'burushaski hunza pakistan', 'wbl': 'wakhi wakhan pakistan',
    'khw': 'khowar chitrali chitral pakistan'
  };
  /* ── 2 · THE PANEL'S OWN WORDS, HAND-TRANSLATED ─────────────────────────
     The language panel speaks to each reader in their own language, so that
     someone who reads no English can still find theirs. Any key missing in a
     language falls back to English. {x} is replaced by a language's own name. */
  var UI = {
    en: {
      lang: 'Language', title: 'Choose your language',
      sub: 'Every page, entry and link of The Chronicles will be shown in the language you choose.',
      search: 'Search languages…', now: 'Now reading in', orig: 'English · original text', sugg: 'Suggested',
      g_pk: 'Languages of Pakistan', g_pksoon: 'Also spoken in Pakistan — not yet in Google Translate',
      g_sa: 'South Asia', g_me: 'Middle East & Central Asia', g_eu: 'Europe & Russia', g_ea: 'East Asia',
      g_sea: 'Southeast Asia & the Pacific', g_af: 'Africa', g_am: 'The Americas', g_cl: 'Classical & constructed languages',
      soon: 'Not yet available',
      soonMsg: '{x} is not yet supported by Google Translate. Meanwhile, you can read The Chronicles in:',
      note: 'Translation is by Google Translate and needs an internet connection. The English original remains the authoritative text.',
      app: 'In the installed app, translated pages open in Google’s translated view.',
      offline: 'You are offline — translation needs an internet connection.',
      none: 'No language matches your search.',
      cont: 'Continue reading in {x}', go: 'Translate', close: 'Close',
      keep: 'Scripture — in its original languages and in its published English renderings — sources, bibliographies and authors’ names are kept exactly as written.'
    },
    ur: {
      lang: 'زبان', title: 'اپنی زبان منتخب کریں',
      sub: 'The Chronicles کا ہر صفحہ، ہر اندراج اور ہر ربط آپ کی منتخب کردہ زبان میں دکھایا جائے گا۔',
      search: 'زبان تلاش کریں…', now: 'موجودہ زبان:', orig: 'انگریزی · اصل متن', sugg: 'تجویز کردہ',
      g_pk: 'پاکستان کی زبانیں', g_pksoon: 'پاکستان میں بولی جانے والی دیگر زبانیں — ابھی گوگل ٹرانسلیٹ میں دستیاب نہیں',
      g_sa: 'جنوبی ایشیا', g_me: 'مشرقِ وسطیٰ اور وسطی ایشیا', g_eu: 'یورپ اور روس', g_ea: 'مشرقی ایشیا',
      g_sea: 'جنوب مشرقی ایشیا اور بحرالکاہل', g_af: 'افریقہ', g_am: 'شمالی و جنوبی امریکہ', g_cl: 'کلاسیکی اور مصنوعی زبانیں',
      soon: 'ابھی دستیاب نہیں',
      soonMsg: '{x} ابھی گوگل ٹرانسلیٹ میں دستیاب نہیں۔ اس دوران آپ The Chronicles ان زبانوں میں پڑھ سکتے ہیں:',
      note: 'ترجمہ گوگل ٹرانسلیٹ کے ذریعے ہوتا ہے اور اس کے لیے انٹرنیٹ درکار ہے۔ مستند متن انگریزی اصل ہی ہے۔',
      app: 'انسٹال شدہ ایپ میں ترجمہ شدہ صفحات گوگل کے ترجمہ شدہ منظر میں کھلتے ہیں۔',
      offline: 'آپ آف لائن ہیں — ترجمے کے لیے انٹرنیٹ کنکشن ضروری ہے۔',
      none: 'آپ کی تلاش سے کوئی زبان نہیں ملی۔',
      cont: '{x} میں پڑھنا جاری رکھیں', go: 'ترجمہ کریں', close: 'بند کریں',
      keep: 'مقدس متون — اپنی اصل زبانوں میں بھی اور ان کے شائع شدہ انگریزی تراجم میں بھی — نیز حوالہ جات، کتابیات اور مصنفین کے نام بالکل ویسے ہی رکھے جاتے ہیں جیسے لکھے گئے ہیں۔'
    },
    'pa-Arab': {
      lang: 'بولی', title: 'اپنی بولی چُݨو',
      sub: 'The Chronicles دا ہر صفحہ، ہر اندراج تے ہر لنک تہاڈی چُݨی ہوئی بولی وچ وکھایا جاوے گا۔',
      search: 'بولی لبھو…', now: 'ہُݨ دی بولی:', orig: 'انگریزی · اصل لکھت', sugg: 'تجویز کیتیاں',
      g_pk: 'پاکستان دیاں بولیاں', g_pksoon: 'پاکستان دیاں ہور بولیاں — حالے گوگل ٹرانسلیٹ وچ نئیں',
      g_sa: 'دکھݨی ایشیا', g_me: 'مشرقِ وسطیٰ تے وچکارلا ایشیا', g_eu: 'یورپ تے روس', g_ea: 'چڑھدا ایشیا',
      g_sea: 'دکھݨ چڑھدا ایشیا تے پیسیفک', g_af: 'افریقہ', g_am: 'امریکہ', g_cl: 'کلاسیکی تے بݨائیاں ہوئیاں بولیاں',
      soon: 'حالے نئیں',
      soonMsg: '{x} حالے گوگل ترجمے وچ نئیں۔ اوس ویلے تک تُسیں The Chronicles اینہاں بولیاں وچ پڑھ سکدے او:',
      note: 'ترجمہ گوگل ٹرانسلیٹ راہیں ہوندا اے تے ایہدے لئی انٹرنیٹ چاہیدا اے۔ انگریزی اصل لکھت ای معتبر اے۔',
      app: 'انسٹال کیتی ایپ وچ ترجمہ کیتے صفحے گوگل دے ترجمے والے منظر وچ کھلدے نیں۔',
      offline: 'تُسیں آف لائن او — ترجمے لئی انٹرنیٹ ضروری اے۔',
      none: 'تہاڈی تلاش نال کوئی بولی نئیں لبھی۔',
      cont: 'پنجابی وچ پڑھنا جاری رکھو', go: 'ترجمہ کرو', close: 'بند کرو',
      keep: 'مقدس لکھتاں — اپنیاں اصل بولیاں وچ وی تے اوہناں دے چھپے ہوئے انگریزی ترجمیاں وچ وی — نالے حوالے، کتابیات تے لکھاریاں دے ناں اونج ای رکھے جاندے نیں جیویں لکھے گئے نیں۔'
    },
    sd: {
      lang: 'ٻولي', title: 'پنهنجي ٻولي چونڊيو',
      sub: 'The Chronicles جو هر صفحو، هر مضمون ۽ هر لنڪ اوهان جي چونڊيل ٻوليءَ ۾ ڏيکاريو ويندو.',
      search: 'ٻولي ڳوليو…', now: 'موجوده ٻولي:', orig: 'انگريزي · اصل متن', sugg: 'تجويز ڪيل',
      g_pk: 'پاڪستان جون ٻوليون', g_pksoon: 'پاڪستان جون ٻيون ٻوليون — اڃا گوگل ترجمي ۾ موجود ناهن',
      g_sa: 'ڏکڻ ايشيا', g_me: 'وچ اوڀر ۽ وچ ايشيا', g_eu: 'يورپ ۽ روس', g_ea: 'اوڀر ايشيا',
      g_sea: 'ڏکڻ اوڀر ايشيا ۽ پئسفڪ', g_af: 'آفريڪا', g_am: 'آمريڪا', g_cl: 'ڪلاسيڪي ۽ ٺاهيل ٻوليون',
      soon: 'اڃا موجود ناهي',
      soonMsg: '{x} اڃا گوگل ترجمي ۾ موجود ناهي. تيستائين اوهان The Chronicles هنن ٻولين ۾ پڙهي سگهو ٿا:',
      note: 'ترجمو گوگل ترجمي ذريعي ٿئي ٿو ۽ ان لاءِ انٽرنيٽ گهرجي. انگريزي اصل متن ئي مستند آهي.',
      app: 'انسٽال ٿيل ايپ ۾ ترجمو ٿيل صفحا گوگل جي ترجمي واري ڏيک ۾ کلن ٿا.',
      offline: 'اوهان آف لائن آهيو — ترجمي لاءِ انٽرنيٽ ڪنيڪشن ضروري آهي.',
      none: 'اوهان جي ڳولا سان ڪا ٻولي نه ملي.',
      cont: 'سنڌيءَ ۾ پڙهڻ جاري رکو', go: 'ترجمو ڪريو', close: 'بند ڪريو',
      keep: 'مقدس متن — پنهنجين اصل ٻولين ۾ به ۽ انهن جي ڇپيل انگريزي ترجمن ۾ به — ۽ حوالا، ڪتابيات ۽ ليکڪن جا نالا جيئن لکيل آهن تيئن ئي رکيا وڃن ٿا.'
    },
    ps: {
      lang: 'ژبه', title: 'خپله ژبه وټاکئ',
      sub: 'د The Chronicles هره پاڼه، هره لیکنه او هر لینک به په هغه ژبه وښودل شي چې تاسو یې ټاکئ.',
      search: 'ژبه ولټوئ…', now: 'اوسنۍ ژبه:', orig: 'انګلیسي · اصلي متن', sugg: 'وړاندیز شوې',
      g_pk: 'د پاکستان ژبې', g_pksoon: 'د پاکستان نورې ژبې — لا تر اوسه په ګوګل ژباړه کې نشته',
      g_sa: 'سویلي آسیا', g_me: 'منځنی ختیځ او منځنۍ آسیا', g_eu: 'اروپا او روسیه', g_ea: 'ختیځه آسیا',
      g_sea: 'سویل ختیځه آسیا او ارام سمندر', g_af: 'افریقا', g_am: 'امریکا', g_cl: 'کلاسیکې او جوړې شوې ژبې',
      soon: 'لا نشته',
      soonMsg: '{x} لا تر اوسه په ګوګل ژباړه کې نشته. تر هغه پورې تاسو کولی شئ The Chronicles په دې ژبو ولولئ:',
      note: 'ژباړه د ګوګل ژباړې له لارې کېږي او انټرنېټ ته اړتیا لري. انګلیسي اصلي متن معتبر متن پاتې کېږي.',
      app: 'په نصب شوي اپ کې ژباړل شوې پاڼې د ګوګل په ژباړل شوي لید کې پرانیستل کېږي.',
      offline: 'تاسو آفلاین یاست — ژباړې ته د انټرنېټ اړیکه اړینه ده.',
      none: 'ستاسو له لټون سره هېڅ ژبه سمون نه خوري.',
      cont: 'په پښتو لوستل جاري وساتئ', go: 'وژباړئ', close: 'بند یې کړئ',
      keep: 'سپېڅلي متنونه — په خپلو اصلي ژبو کې هم او په خپرو شويو انګلیسي ژباړو کې هم — او سرچینې، کتابنامې او د لیکوالو نومونه هماغسې ساتل کېږي لکه څنګه چې لیکل شوي دي.'
    },
    ar: {
      lang: 'اللغة', title: 'اختر لغتك',
      sub: 'ستُعرض كل صفحة ومدخل ورابط في The Chronicles باللغة التي تختارها.',
      search: 'ابحث عن لغة…', now: 'لغة القراءة الآن:', orig: 'الإنجليزية · النص الأصلي', sugg: 'مقترحة',
      g_pk: 'لغات باكستان', g_pksoon: 'لغات أخرى في باكستان — غير متاحة بعد في ترجمة Google',
      g_sa: 'جنوب آسيا', g_me: 'الشرق الأوسط وآسيا الوسطى', g_eu: 'أوروبا وروسيا', g_ea: 'شرق آسيا',
      g_sea: 'جنوب شرق آسيا والمحيط الهادئ', g_af: 'أفريقيا', g_am: 'الأمريكتان', g_cl: 'لغات كلاسيكية ومصطنعة',
      soon: 'غير متاحة بعد',
      soonMsg: 'لا تدعم ترجمة Google لغة {x} بعد. ويمكنك في هذه الأثناء قراءة The Chronicles بإحدى هذه اللغات:',
      note: 'تتم الترجمة عبر ترجمة Google وتتطلب اتصالاً بالإنترنت. ويبقى النص الإنجليزي الأصلي هو المرجع المعتمد.',
      app: 'في التطبيق المثبّت تُفتح الصفحات المترجمة في عرض Google المترجَم.',
      offline: 'أنت غير متصل — تحتاج الترجمة إلى اتصال بالإنترنت.',
      none: 'لا توجد لغة مطابقة لبحثك.',
      cont: 'تابع القراءة بالعربية', go: 'ترجم', close: 'إغلاق',
      keep: 'تبقى النصوص المقدسة — بلغاتها الأصلية وبترجماتها الإنجليزية المنشورة — والمصادر وقوائم المراجع وأسماء المؤلفين كما كُتبت تماماً.'
    },
    fa: {
      lang: 'زبان', title: 'زبان خود را انتخاب کنید',
      sub: 'همهٔ صفحه‌ها، مدخل‌ها و پیوندهای The Chronicles به زبانی که انتخاب می‌کنید نمایش داده می‌شود.',
      search: 'جست‌وجوی زبان…', now: 'زبان کنونی:', orig: 'انگلیسی · متن اصلی', sugg: 'پیشنهادی',
      g_pk: 'زبان‌های پاکستان', g_pksoon: 'دیگر زبان‌های پاکستان — هنوز در ترجمهٔ گوگل در دسترس نیستند',
      g_sa: 'جنوب آسیا', g_me: 'خاورمیانه و آسیای مرکزی', g_eu: 'اروپا و روسیه', g_ea: 'شرق آسیا',
      g_sea: 'جنوب شرق آسیا و اقیانوس آرام', g_af: 'آفریقا', g_am: 'قارهٔ آمریکا', g_cl: 'زبان‌های کلاسیک و ساختگی',
      soon: 'هنوز موجود نیست',
      soonMsg: '{x} هنوز در ترجمهٔ گوگل پشتیبانی نمی‌شود. در این میان می‌توانید The Chronicles را به این زبان‌ها بخوانید:',
      note: 'ترجمه با «ترجمهٔ گوگل» انجام می‌شود و به اینترنت نیاز دارد. متن اصلی انگلیسی همچنان مرجع معتبر است.',
      app: 'در برنامهٔ نصب‌شده، صفحه‌های ترجمه‌شده در نمای ترجمهٔ گوگل باز می‌شوند.',
      offline: 'شما آفلاین هستید — ترجمه به اتصال اینترنت نیاز دارد.',
      none: 'هیچ زبانی با جست‌وجوی شما مطابقت ندارد.',
      cont: 'ادامهٔ خواندن به {x}', go: 'ترجمه کنید', close: 'بستن',
      keep: 'متون مقدس — به زبان‌های اصلی و در ترجمه‌های انگلیسیِ منتشرشده‌شان — و نیز منابع، کتاب‌نامه‌ها و نام نویسندگان دقیقاً همان‌گونه که نوشته شده‌اند حفظ می‌شوند.'
    },
    hi: {
      lang: 'भाषा', title: 'अपनी भाषा चुनें',
      sub: 'The Chronicles का हर पृष्ठ, हर प्रविष्टि और हर लिंक आपकी चुनी हुई भाषा में दिखाया जाएगा।',
      search: 'भाषा खोजें…', now: 'वर्तमान भाषा:', orig: 'अंग्रेज़ी · मूल पाठ', sugg: 'सुझाई गई',
      g_pk: 'पाकिस्तान की भाषाएँ', g_pksoon: 'पाकिस्तान की अन्य भाषाएँ — अभी Google अनुवाद में उपलब्ध नहीं',
      g_sa: 'दक्षिण एशिया', g_me: 'मध्य पूर्व और मध्य एशिया', g_eu: 'यूरोप और रूस', g_ea: 'पूर्वी एशिया',
      g_sea: 'दक्षिण-पूर्व एशिया और प्रशांत', g_af: 'अफ़्रीका', g_am: 'अमेरिका महाद्वीप', g_cl: 'शास्त्रीय और कृत्रिम भाषाएँ',
      soon: 'अभी उपलब्ध नहीं',
      soonMsg: '{x} अभी Google अनुवाद में उपलब्ध नहीं है। तब तक आप The Chronicles इन भाषाओं में पढ़ सकते हैं:',
      note: 'अनुवाद Google अनुवाद द्वारा होता है और इसके लिए इंटरनेट चाहिए। प्रामाणिक पाठ अंग्रेज़ी मूल ही है।',
      app: 'इंस्टॉल किए गए ऐप में अनूदित पृष्ठ Google के अनुवाद दृश्य में खुलते हैं।',
      offline: 'आप ऑफ़लाइन हैं — अनुवाद के लिए इंटरनेट कनेक्शन आवश्यक है।',
      none: 'आपकी खोज से कोई भाषा नहीं मिली।',
      cont: 'हिन्दी में पढ़ना जारी रखें', go: 'अनुवाद करें', close: 'बंद करें',
      keep: 'धर्मग्रंथ — अपनी मूल भाषाओं में और अपने प्रकाशित अंग्रेज़ी अनुवादों में — तथा स्रोत, ग्रंथसूचियाँ और लेखकों के नाम ठीक वैसे ही रखे जाते हैं जैसे लिखे गए हैं।'
    },
    bn: {
      lang: 'ভাষা', title: 'আপনার ভাষা বেছে নিন',
      sub: 'The Chronicles-এর প্রতিটি পাতা, প্রতিটি ভুক্তি ও প্রতিটি লিংক আপনার বেছে নেওয়া ভাষায় দেখানো হবে।',
      search: 'ভাষা খুঁজুন…', now: 'বর্তমান ভাষা:', orig: 'ইংরেজি · মূল পাঠ', sugg: 'প্রস্তাবিত',
      g_pk: 'পাকিস্তানের ভাষা', g_pksoon: 'পাকিস্তানের অন্যান্য ভাষা — এখনও Google অনুবাদে নেই',
      g_sa: 'দক্ষিণ এশিয়া', g_me: 'মধ্যপ্রাচ্য ও মধ্য এশিয়া', g_eu: 'ইউরোপ ও রাশিয়া', g_ea: 'পূর্ব এশিয়া',
      g_sea: 'দক্ষিণ-পূর্ব এশিয়া ও প্রশান্ত মহাসাগর', g_af: 'আফ্রিকা', g_am: 'আমেরিকা মহাদেশ', g_cl: 'ধ্রুপদী ও কৃত্রিম ভাষা',
      soon: 'এখনও নেই',
      soonMsg: '{x} এখনও Google অনুবাদে নেই। ততদিন আপনি The Chronicles এই ভাষাগুলোতে পড়তে পারেন:',
      note: 'অনুবাদ করে Google অনুবাদ, এবং এর জন্য ইন্টারনেট লাগে। প্রামাণ্য পাঠ ইংরেজি মূলটিই।',
      app: 'ইনস্টল করা অ্যাপে অনূদিত পাতাগুলো Google-এর অনুবাদ-দৃশ্যে খোলে।',
      offline: 'আপনি অফলাইনে আছেন — অনুবাদের জন্য ইন্টারনেট সংযোগ দরকার।',
      none: 'আপনার খোঁজের সঙ্গে কোনো ভাষা মেলেনি।',
      cont: 'বাংলায় পড়া চালিয়ে যান', go: 'অনুবাদ করুন', close: 'বন্ধ করুন',
      keep: 'ধর্মগ্রন্থের পাঠ — মূল ভাষায় এবং প্রকাশিত ইংরেজি অনুবাদে — এবং তথ্যসূত্র, গ্রন্থপঞ্জি ও লেখকদের নাম যেমন লেখা আছে ঠিক তেমনই রাখা হয়।'
    },
    tr: {
      lang: 'Dil', title: 'Dilinizi seçin',
      sub: 'The Chronicles’ın her sayfası, her maddesi ve her bağlantısı seçtiğiniz dilde gösterilecek.',
      search: 'Dil arayın…', now: 'Şu anki dil:', orig: 'İngilizce · özgün metin', sugg: 'Önerilenler',
      g_pk: 'Pakistan’ın dilleri', g_pksoon: 'Pakistan’da konuşulan diğer diller — henüz Google Çeviri’de yok',
      g_sa: 'Güney Asya', g_me: 'Orta Doğu ve Orta Asya', g_eu: 'Avrupa ve Rusya', g_ea: 'Doğu Asya',
      g_sea: 'Güneydoğu Asya ve Pasifik', g_af: 'Afrika', g_am: 'Amerika kıtası', g_cl: 'Klasik ve yapay diller',
      soon: 'Henüz yok',
      soonMsg: '{x} henüz Google Çeviri’de desteklenmiyor. Bu arada The Chronicles’ı şu dillerde okuyabilirsiniz:',
      note: 'Çeviri Google Çeviri ile yapılır ve internet bağlantısı gerektirir. Esas metin İngilizce özgün metindir.',
      app: 'Yüklü uygulamada çevrilmiş sayfalar Google’ın çeviri görünümünde açılır.',
      offline: 'Çevrimdışısınız — çeviri için internet bağlantısı gerekir.',
      none: 'Aramanızla eşleşen dil yok.',
      cont: 'Türkçe okumaya devam edin', go: 'Çevir', close: 'Kapat',
      keep: 'Kutsal metinler — özgün dillerinde ve yayımlanmış İngilizce çevirilerinde — ile kaynaklar, kaynakçalar ve yazar adları yazıldığı gibi korunur.'
    },
    fr: {
      lang: 'Langue', title: 'Choisissez votre langue',
      sub: 'Chaque page, chaque notice et chaque lien de The Chronicles s’affichera dans la langue choisie.',
      search: 'Rechercher une langue…', now: 'Langue actuelle :', orig: 'Anglais · texte original', sugg: 'Suggestions',
      g_pk: 'Langues du Pakistan', g_pksoon: 'Autres langues du Pakistan — pas encore dans Google Traduction',
      g_sa: 'Asie du Sud', g_me: 'Moyen-Orient et Asie centrale', g_eu: 'Europe et Russie', g_ea: 'Asie de l’Est',
      g_sea: 'Asie du Sud-Est et Pacifique', g_af: 'Afrique', g_am: 'Amériques', g_cl: 'Langues classiques et construites',
      soon: 'Pas encore disponible',
      soonMsg: '{x} : pas encore pris en charge par Google Traduction. En attendant, vous pouvez lire The Chronicles en :',
      note: 'La traduction est assurée par Google Traduction et nécessite une connexion Internet. Le texte original anglais reste la référence.',
      app: 'Dans l’application installée, les pages traduites s’ouvrent dans la vue traduite de Google.',
      offline: 'Vous êtes hors ligne — la traduction nécessite une connexion Internet.',
      none: 'Aucune langue ne correspond à votre recherche.',
      cont: 'Continuer la lecture en français', go: 'Traduire', close: 'Fermer',
      keep: 'Les textes sacrés — dans leurs langues d’origine et dans leurs traductions anglaises publiées —, les sources, les bibliographies et les noms des auteurs restent tels qu’ils ont été écrits.'
    },
    de: {
      lang: 'Sprache', title: 'Wählen Sie Ihre Sprache',
      sub: 'Jede Seite, jeder Eintrag und jeder Link von The Chronicles wird in der gewählten Sprache angezeigt.',
      search: 'Sprache suchen…', now: 'Aktuelle Sprache:', orig: 'Englisch · Originaltext', sugg: 'Vorschläge',
      g_pk: 'Sprachen Pakistans', g_pksoon: 'Weitere Sprachen Pakistans — noch nicht in Google Übersetzer',
      g_sa: 'Südasien', g_me: 'Naher Osten und Zentralasien', g_eu: 'Europa und Russland', g_ea: 'Ostasien',
      g_sea: 'Südostasien und Pazifik', g_af: 'Afrika', g_am: 'Amerika', g_cl: 'Klassische Sprachen und Plansprachen',
      soon: 'Noch nicht verfügbar',
      soonMsg: '{x} wird von Google Übersetzer noch nicht unterstützt. Bis dahin können Sie The Chronicles in diesen Sprachen lesen:',
      note: 'Die Übersetzung erfolgt durch Google Übersetzer und erfordert eine Internetverbindung. Maßgeblich bleibt der englische Originaltext.',
      app: 'In der installierten App öffnen sich übersetzte Seiten in der Übersetzungsansicht von Google.',
      offline: 'Sie sind offline — für die Übersetzung ist eine Internetverbindung nötig.',
      none: 'Keine Sprache passt zu Ihrer Suche.',
      cont: 'Auf Deutsch weiterlesen', go: 'Übersetzen', close: 'Schließen',
      keep: 'Heilige Schriften – in ihren Originalsprachen und in ihren veröffentlichten englischen Übersetzungen –, Quellen, Bibliografien und Autorennamen bleiben unverändert.'
    },
    es: {
      lang: 'Idioma', title: 'Elija su idioma',
      sub: 'Cada página, entrada y enlace de The Chronicles se mostrará en el idioma que elija.',
      search: 'Buscar idioma…', now: 'Idioma actual:', orig: 'Inglés · texto original', sugg: 'Sugeridos',
      g_pk: 'Lenguas de Pakistán', g_pksoon: 'Otras lenguas de Pakistán — aún no están en Google Traductor',
      g_sa: 'Asia meridional', g_me: 'Oriente Medio y Asia central', g_eu: 'Europa y Rusia', g_ea: 'Asia oriental',
      g_sea: 'Sudeste asiático y Pacífico', g_af: 'África', g_am: 'América', g_cl: 'Lenguas clásicas y construidas',
      soon: 'Aún no disponible',
      soonMsg: 'Google Traductor todavía no admite el {x}. Mientras tanto, puede leer The Chronicles en:',
      note: 'La traducción la realiza Google Traductor y requiere conexión a internet. El texto original en inglés sigue siendo el de referencia.',
      app: 'En la aplicación instalada, las páginas traducidas se abren en la vista traducida de Google.',
      offline: 'Está sin conexión: la traducción necesita internet.',
      none: 'Ningún idioma coincide con su búsqueda.',
      cont: 'Seguir leyendo en español', go: 'Traducir', close: 'Cerrar',
      keep: 'Las escrituras —en sus lenguas originales y en sus traducciones inglesas publicadas—, las fuentes, las bibliografías y los nombres de los autores se mantienen tal como fueron escritos.'
    },
    pt: {
      lang: 'Idioma', title: 'Escolha o seu idioma',
      sub: 'Cada página, verbete e link de The Chronicles será exibido no idioma escolhido.',
      search: 'Pesquisar idioma…', now: 'Idioma atual:', orig: 'Inglês · texto original', sugg: 'Sugeridos',
      g_pk: 'Línguas do Paquistão', g_pksoon: 'Outras línguas do Paquistão — ainda não estão no Google Tradutor',
      g_sa: 'Sul da Ásia', g_me: 'Oriente Médio e Ásia Central', g_eu: 'Europa e Rússia', g_ea: 'Leste Asiático',
      g_sea: 'Sudeste Asiático e Pacífico', g_af: 'África', g_am: 'Américas', g_cl: 'Línguas clássicas e construídas',
      soon: 'Ainda não disponível',
      soonMsg: 'O Google Tradutor ainda não oferece {x}. Enquanto isso, você pode ler The Chronicles em:',
      note: 'A tradução é feita pelo Google Tradutor e requer conexão com a internet. O texto original em inglês continua sendo a referência.',
      app: 'No app instalado, as páginas traduzidas abrem na visualização traduzida do Google.',
      offline: 'Você está off-line — a tradução precisa de internet.',
      none: 'Nenhum idioma corresponde à sua pesquisa.',
      cont: 'Continuar lendo em português', go: 'Traduzir', close: 'Fechar',
      keep: 'As escrituras — nas línguas originais e nas traduções inglesas publicadas —, as fontes, as bibliografias e os nomes dos autores permanecem exatamente como foram escritos.'
    },
    it: {
      lang: 'Lingua', title: 'Scegli la tua lingua',
      sub: 'Ogni pagina, voce e link di The Chronicles sarà mostrato nella lingua che scegli.',
      search: 'Cerca una lingua…', now: 'Lingua attuale:', orig: 'Inglese · testo originale', sugg: 'Suggerite',
      g_pk: 'Lingue del Pakistan', g_pksoon: 'Altre lingue del Pakistan — non ancora in Google Traduttore',
      g_sa: 'Asia meridionale', g_me: 'Medio Oriente e Asia centrale', g_eu: 'Europa e Russia', g_ea: 'Asia orientale',
      g_sea: 'Sud-est asiatico e Pacifico', g_af: 'Africa', g_am: 'Americhe', g_cl: 'Lingue classiche e artificiali',
      soon: 'Non ancora disponibile',
      soonMsg: 'Google Traduttore non supporta ancora {x}. Nel frattempo puoi leggere The Chronicles in:',
      note: 'La traduzione è fornita da Google Traduttore e richiede una connessione a Internet. Il testo originale inglese resta quello di riferimento.',
      app: 'Nell’app installata, le pagine tradotte si aprono nella vista tradotta di Google.',
      offline: 'Sei offline: la traduzione richiede una connessione a Internet.',
      none: 'Nessuna lingua corrisponde alla ricerca.',
      cont: 'Continua a leggere in italiano', go: 'Traduci', close: 'Chiudi',
      keep: 'Le scritture — nelle lingue originali e nelle traduzioni inglesi pubblicate —, le fonti, le bibliografie e i nomi degli autori restano esattamente come sono stati scritti.'
    },
    ru: {
      lang: 'Язык', title: 'Выберите язык',
      sub: 'Каждая страница, статья и ссылка The Chronicles будет показана на выбранном вами языке.',
      search: 'Поиск языка…', now: 'Язык чтения:', orig: 'Английский · оригинал', sugg: 'Рекомендуемые',
      g_pk: 'Языки Пакистана', g_pksoon: 'Другие языки Пакистана — пока нет в Google Переводчике',
      g_sa: 'Южная Азия', g_me: 'Ближний Восток и Центральная Азия', g_eu: 'Европа и Россия', g_ea: 'Восточная Азия',
      g_sea: 'Юго-Восточная Азия и Океания', g_af: 'Африка', g_am: 'Америка', g_cl: 'Классические и искусственные языки',
      soon: 'Пока недоступен',
      soonMsg: 'Google Переводчик пока не поддерживает язык «{x}». Тем временем вы можете читать The Chronicles на этих языках:',
      note: 'Перевод выполняет Google Переводчик; нужно подключение к интернету. Авторитетным остаётся английский оригинал.',
      app: 'В установленном приложении переведённые страницы открываются в режиме перевода Google.',
      offline: 'Нет подключения — для перевода нужен интернет.',
      none: 'Языков по вашему запросу не найдено.',
      cont: 'Продолжить чтение на русском', go: 'Перевести', close: 'Закрыть',
      keep: 'Священные тексты — на языках оригинала и в опубликованных английских переводах, — источники, библиографии и имена авторов остаются без изменений.'
    },
    'zh-CN': {
      lang: '语言', title: '选择您的语言',
      sub: 'The Chronicles 的每一页、每个条目和每个链接都将以您选择的语言显示。',
      search: '搜索语言…', now: '当前语言：', orig: '英语 · 原文', sugg: '推荐',
      g_pk: '巴基斯坦的语言', g_pksoon: '巴基斯坦的其他语言——Google 翻译暂不支持',
      g_sa: '南亚', g_me: '中东与中亚', g_eu: '欧洲与俄罗斯', g_ea: '东亚',
      g_sea: '东南亚与太平洋', g_af: '非洲', g_am: '美洲', g_cl: '古典语言与人造语言',
      soon: '暂不可用',
      soonMsg: 'Google 翻译暂不支持{x}。在此期间，您可以用以下语言阅读 The Chronicles：',
      note: '翻译由 Google 翻译提供，需要联网。英文原文仍为权威文本。',
      app: '在已安装的应用中，译文页面会在 Google 翻译视图中打开。',
      offline: '您处于离线状态——翻译需要网络连接。',
      none: '没有与您的搜索匹配的语言。',
      cont: '继续以中文阅读', go: '翻译', close: '关闭',
      keep: '经文（原文及已出版的英文译本）、出处、参考书目和作者姓名均保持原样。'
    },
    'zh-TW': {
      lang: '語言', title: '選擇您的語言',
      sub: 'The Chronicles 的每一頁、每個條目和每個連結都會以您選擇的語言顯示。',
      search: '搜尋語言…', now: '目前語言：', orig: '英文 · 原文', sugg: '建議',
      g_pk: '巴基斯坦的語言', g_pksoon: '巴基斯坦的其他語言——Google 翻譯尚未支援',
      g_sa: '南亞', g_me: '中東與中亞', g_eu: '歐洲與俄羅斯', g_ea: '東亞',
      g_sea: '東南亞與太平洋', g_af: '非洲', g_am: '美洲', g_cl: '古典語言與人造語言',
      soon: '尚未提供',
      soonMsg: 'Google 翻譯尚未支援{x}。在此期間，您可以用以下語言閱讀 The Chronicles：',
      note: '翻譯由 Google 翻譯提供，需要網路連線。英文原文仍為權威文本。',
      app: '在已安裝的應用程式中，翻譯頁面會在 Google 翻譯檢視中開啟。',
      offline: '您目前離線——翻譯需要網路連線。',
      none: '沒有符合搜尋的語言。',
      cont: '繼續以中文閱讀', go: '翻譯', close: '關閉',
      keep: '經文（原文及已出版的英文譯本）、出處、參考書目和作者姓名均保持原樣。'
    },
    ja: {
      lang: '言語', title: '言語を選択',
      sub: 'The Chronicles のすべてのページ、項目、リンクが選択した言語で表示されます。',
      search: '言語を検索…', now: '現在の言語：', orig: '英語・原文', sugg: 'おすすめ',
      g_pk: 'パキスタンの言語', g_pksoon: 'パキスタンのその他の言語 — Google 翻訳には未対応',
      g_sa: '南アジア', g_me: '中東・中央アジア', g_eu: 'ヨーロッパ・ロシア', g_ea: '東アジア',
      g_sea: '東南アジア・太平洋', g_af: 'アフリカ', g_am: '南北アメリカ', g_cl: '古典語・人工言語',
      soon: '未対応',
      soonMsg: '{x}はまだ Google 翻訳に対応していません。それまでは次の言語で The Chronicles をお読みいただけます：',
      note: '翻訳は Google 翻訳によるもので、インターネット接続が必要です。英語の原文が正式な本文です。',
      app: 'インストールしたアプリでは、翻訳ページは Google の翻訳表示で開きます。',
      offline: 'オフラインです — 翻訳にはインターネット接続が必要です。',
      none: '該当する言語がありません。',
      cont: '日本語で読み続ける', go: '翻訳する', close: '閉じる',
      keep: '聖典の本文（原語および刊行済みの英訳）、出典、参考文献、著者名は原文のまま表示されます。'
    },
    ko: {
      lang: '언어', title: '언어를 선택하세요',
      sub: 'The Chronicles의 모든 페이지, 항목, 링크가 선택한 언어로 표시됩니다.',
      search: '언어 검색…', now: '현재 언어:', orig: '영어 · 원문', sugg: '추천',
      g_pk: '파키스탄의 언어', g_pksoon: '파키스탄의 기타 언어 — 아직 Google 번역 미지원',
      g_sa: '남아시아', g_me: '중동 및 중앙아시아', g_eu: '유럽 및 러시아', g_ea: '동아시아',
      g_sea: '동남아시아 및 태평양', g_af: '아프리카', g_am: '아메리카', g_cl: '고전어 및 인공어',
      soon: '아직 미지원',
      soonMsg: '{x}: 아직 Google 번역에서 지원되지 않습니다. 그동안 다음 언어로 The Chronicles를 읽을 수 있습니다.',
      note: '번역은 Google 번역이 제공하며 인터넷 연결이 필요합니다. 영어 원문이 기준 텍스트입니다.',
      app: '설치된 앱에서는 번역된 페이지가 Google 번역 보기로 열립니다.',
      offline: '오프라인 상태입니다 — 번역하려면 인터넷 연결이 필요합니다.',
      none: '검색과 일치하는 언어가 없습니다.',
      cont: '한국어로 계속 읽기', go: '번역', close: '닫기',
      keep: '경전 본문(원어 및 출간된 영어 번역), 출처, 참고문헌, 저자 이름은 원문 그대로 유지됩니다.'
    },
    ms: {
      lang: 'Bahasa', title: 'Pilih bahasa anda',
      sub: 'Setiap halaman, entri dan pautan The Chronicles akan dipaparkan dalam bahasa pilihan anda.',
      search: 'Cari bahasa…', now: 'Bahasa semasa:', orig: 'Bahasa Inggeris · teks asal', sugg: 'Dicadangkan',
      g_pk: 'Bahasa-bahasa Pakistan', g_pksoon: 'Bahasa lain di Pakistan — belum ada dalam Terjemahan Google',
      g_sa: 'Asia Selatan', g_me: 'Timur Tengah dan Asia Tengah', g_eu: 'Eropah dan Rusia', g_ea: 'Asia Timur',
      g_sea: 'Asia Tenggara dan Pasifik', g_af: 'Afrika', g_am: 'Benua Amerika', g_cl: 'Bahasa klasik dan bahasa buatan',
      soon: 'Belum tersedia',
      soonMsg: '{x} belum disokong oleh Terjemahan Google. Sementara itu, anda boleh membaca The Chronicles dalam:',
      note: 'Terjemahan dibuat oleh Terjemahan Google dan memerlukan sambungan internet. Teks asal bahasa Inggeris kekal sebagai rujukan.',
      app: 'Dalam aplikasi yang dipasang, halaman terjemahan dibuka dalam paparan terjemahan Google.',
      offline: 'Anda di luar talian — terjemahan memerlukan sambungan internet.',
      none: 'Tiada bahasa yang sepadan dengan carian anda.',
      cont: 'Teruskan membaca dalam bahasa Melayu', go: 'Terjemah', close: 'Tutup',
      keep: 'Teks kitab suci — dalam bahasa asal dan dalam terjemahan Inggeris yang diterbitkan — serta sumber, bibliografi dan nama pengarang dikekalkan seperti yang ditulis.'
    },
    id: {
      lang: 'Bahasa', title: 'Pilih bahasa Anda',
      sub: 'Setiap halaman, entri, dan tautan The Chronicles akan ditampilkan dalam bahasa pilihan Anda.',
      search: 'Cari bahasa…', now: 'Bahasa saat ini:', orig: 'Bahasa Inggris · teks asli', sugg: 'Disarankan',
      g_pk: 'Bahasa-bahasa Pakistan', g_pksoon: 'Bahasa lain di Pakistan — belum ada di Google Terjemahan',
      g_sa: 'Asia Selatan', g_me: 'Timur Tengah dan Asia Tengah', g_eu: 'Eropa dan Rusia', g_ea: 'Asia Timur',
      g_sea: 'Asia Tenggara dan Pasifik', g_af: 'Afrika', g_am: 'Benua Amerika', g_cl: 'Bahasa klasik dan bahasa buatan',
      soon: 'Belum tersedia',
      soonMsg: '{x} belum didukung Google Terjemahan. Sementara itu, Anda dapat membaca The Chronicles dalam:',
      note: 'Terjemahan dibuat oleh Google Terjemahan dan memerlukan koneksi internet. Teks asli bahasa Inggris tetap menjadi acuan.',
      app: 'Di aplikasi yang terpasang, halaman terjemahan terbuka di tampilan terjemahan Google.',
      offline: 'Anda sedang luring — terjemahan memerlukan koneksi internet.',
      none: 'Tidak ada bahasa yang cocok dengan pencarian Anda.',
      cont: 'Lanjutkan membaca dalam bahasa Indonesia', go: 'Terjemahkan', close: 'Tutup',
      keep: 'Teks kitab suci — dalam bahasa aslinya dan dalam terjemahan bahasa Inggris yang diterbitkan — serta sumber, daftar pustaka, dan nama penulis dibiarkan sebagaimana tertulis.'
    },
    sw: {
      lang: 'Lugha', title: 'Chagua lugha yako',
      sub: 'Kila ukurasa, kila makala na kila kiungo cha The Chronicles kitaonyeshwa kwa lugha utakayochagua.',
      search: 'Tafuta lugha…', now: 'Lugha ya sasa:', orig: 'Kiingereza · maandishi asilia', sugg: 'Zinazopendekezwa',
      g_pk: 'Lugha za Pakistan', g_pksoon: 'Lugha nyingine za Pakistan — bado hazipo kwenye Google Tafsiri',
      g_sa: 'Asia Kusini', g_me: 'Mashariki ya Kati na Asia ya Kati', g_eu: 'Ulaya na Urusi', g_ea: 'Asia Mashariki',
      g_sea: 'Asia ya Kusini-Mashariki na Pasifiki', g_af: 'Afrika', g_am: 'Amerika', g_cl: 'Lugha za kale na za kubuni',
      soon: 'Bado haipatikani',
      soonMsg: '{x} bado haiungwi mkono na Google Tafsiri. Kwa sasa unaweza kusoma The Chronicles kwa:',
      note: 'Tafsiri hufanywa na Google Tafsiri na huhitaji intaneti. Maandishi asilia ya Kiingereza ndiyo yenye mamlaka.',
      app: 'Katika programu iliyosakinishwa, kurasa zilizotafsiriwa hufunguka katika mwonekano wa tafsiri wa Google.',
      offline: 'Uko nje ya mtandao — tafsiri inahitaji intaneti.',
      none: 'Hakuna lugha inayolingana na utafutaji wako.',
      cont: 'Endelea kusoma kwa Kiswahili', go: 'Tafsiri', close: 'Funga',
      keep: 'Maandiko matakatifu — katika lugha zake asilia na katika tafsiri zake za Kiingereza zilizochapishwa — pamoja na vyanzo, bibliografia na majina ya waandishi, yanabaki kama yalivyoandikwa.'
    }
  };
  // Close relatives share a panel language.
  var UI_ALIAS = { 'fa-AF': 'fa', 'pt-PT': 'pt', 'fr-CA': 'fr', 'ms-Arab': 'ms', 'yue': 'zh-TW' };

  /* ── 3 · WHERE WE ARE ────────────────────────────────────────────────── */
  var D = document, HTML = D.documentElement;
  var KEY = 'chronicles-lang', BAR_KEY = 'chronicles-lang-bar';
  var host = location.hostname;
  var PROXY = /\.translate\.goog$/i.test(host);                 // inside Google's translated view
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(host);    // a test copy on this computer
  var QS = new URLSearchParams(location.search);
  var PAGE = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  if (!PAGE || PAGE === 'index') PAGE = 'index.html';
  else if (!/\.html?$/i.test(PAGE)) PAGE = PAGE + '.html';       // hosts that serve pages without ".html"

  var BY = {};
  LANGS.forEach(function (l) { BY[l[0]] = l; });
  var SOON_BY = {};
  SOON.forEach(function (l) { SOON_BY[l[0]] = l; });
  // Other spellings of the same codes, as browsers and Google sometimes write them.
  var CANON = { he: 'iw', zh: 'zh-CN', 'zh-Hans': 'zh-CN', 'zh-Hant': 'zh-TW', 'zh-HK': 'zh-TW', 'zh-SG': 'zh-CN',
    jv: 'jw', fil: 'tl', nb: 'no', nn: 'no', pnb: 'pa-Arab', 'pa-PK': 'pa-Arab', prs: 'fa-AF', 'pt-BR': 'pt',
    mni: 'mni-Mtei', tzm: 'ber-Latn', zgh: 'ber', 'ur-PK': 'ur', 'ur-IN': 'ur', 'sd-PK': 'sd' };
  function canon(c) {
    if (!c) return '';
    if (BY[c]) return c;
    if (CANON[c]) return CANON[c];
    var lc = String(c).toLowerCase();
    if (/^en\b/.test(lc)) return '';
    if (/^zh-(hant|tw|hk|mo)\b/.test(lc)) return 'zh-TW';
    if (/^zh\b/.test(lc)) return 'zh-CN';
    if (/^pa-(arab|pk)\b/.test(lc)) return 'pa-Arab';
    if (/^ms-arab\b/.test(lc)) return 'ms-Arab';
    for (var k in BY) if (k.toLowerCase() === lc) return k;
    var b = lc.split('-')[0];
    return BY[b] ? b : (CANON[b] || '');
  }

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function sstore(k, v) {
    try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; }
  }

  // The language the page is being shown in now ('' = the English original).
  var TR_RAW = (PROXY || LOCAL) ? (QS.get('_x_tr_tl') || '') : '';
  var TR = TR_RAW ? (canon(TR_RAW) || TR_RAW) : '';
  if (TR === 'en') TR = '';

  // Returning from a translated view with "English" records the choice.
  if (!PROXY && QS.get('chl') === 'en') {
    store(KEY, 'en');
    try {
      QS.delete('chl');
      var qs = QS.toString();
      history.replaceState(history.state, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    } catch (e) {}
  }
  var PREF = canon(store(KEY)) || (store(KEY) === 'en' ? 'en' : '');


  /* ── 4 · WORDS ──────────────────────────────────────────────────────── */
  function uiCode(c) {
    if (/^en\b/i.test(c || '')) return 'en';
    c = canon(c) || c;
    if (UI[c]) return c;
    if (UI_ALIAS[c]) return UI_ALIAS[c];
    return '';
  }
  function pickUI() {
    var c = uiCode(TR) || (PREF && PREF !== 'en' ? uiCode(PREF) : '');
    if (c) return c;
    var nl = [];
    try { nl = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]) || []; } catch (e) {}
    for (var i = 0; i < nl.length; i++) {
      var u = uiCode(nl[i]);
      if (u) return u;
    }
    return 'en';
  }
  var UIL = pickUI();
  function T(k, x, lang) {
    var t = (UI[lang || UIL] && UI[lang || UIL][k]) || UI.en[k] || '';
    return x == null ? t : t.replace('{x}', x);
  }
  function own(c) {
    if (c === 'en') return 'English';
    var l = BY[c] || SOON_BY[c];
    return l ? (l[2] || l[1]) : c;
  }
  function eng(c) { var l = BY[c] || SOON_BY[c]; return l ? l[1] : c; }
  function flags(c) { var l = BY[c]; return (l && l[4]) || ''; }
  function isRtl(c) { return flags(canon(c) || c).indexOf('r') >= 0 || /^(ur|ar|fa|ps|sd|ug|ckb|dv|iw|he|yi|bal)\b/.test(c); }
  function htmlLang(c) { return ({ iw: 'he', jw: 'jv' })[c] || c; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function norm(s) {
    s = String(s || '').toLowerCase();
    try { s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) {}
    return s;
  }

  /* ── 5 · ADDRESSES ──────────────────────────────────────────────────── */
  // Google's full-page view lives at <host with "-" doubled and "." as "-">.translate.goog
  function proxHost(h) { return h.replace(/-/g, '--').replace(/\./g, '-') + '.translate.goog'; }
  function origHost(h) {
    return h.replace(/\.translate\.goog$/i, '').replace(/--/g, '\u0001').replace(/-/g, '.').replace(/\u0001/g, '-');
  }
  function query(extra) {
    var p = new URLSearchParams(location.search);
    ['_x_tr_sl', '_x_tr_tl', '_x_tr_hl', '_x_tr_pto', '_x_tr_hist', 'chl'].forEach(function (k) { p.delete(k); });
    if (extra) for (var k in extra) p.set(k, extra[k]);
    var s = p.toString();
    return s ? '?' + s : '';
  }
  function urlFor(code) {
    if (code === 'en') {
      if (PROXY) return 'https://' + origHost(host) + location.pathname + query({ chl: 'en' }) + location.hash;
      return location.pathname + query() + location.hash;
    }
    var p = { _x_tr_sl: 'en', _x_tr_tl: code, _x_tr_hl: code, _x_tr_pto: 'wapp' };
    if (LOCAL) return location.pathname + query(p) + location.hash;    // a local copy shows the layout only
    return 'https://' + (PROXY ? host : proxHost(host)) + location.pathname + query(p) + location.hash;
  }

  function go(code) {
    code = code === 'en' ? 'en' : (canon(code) || code);
    if (code !== 'en' && navigator.onLine === false) { message('offline'); return; }
    if (!PROXY) store(KEY, code);
    if ((code === 'en' && !TR) || code === TR) { close(); return; }
    location.href = urlFor(code);
  }

  /* ── 6 · STYLE ──────────────────────────────────────────────────────── */
  var GLOBE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
    '<circle cx="12" cy="12" r="9.2"/><ellipse cx="12" cy="12" rx="4.1" ry="9.2"/><path d="M2.9 12h18.2M4.4 7h15.2M4.4 17h15.2"/></g></svg>';

  var CSS = [
    ':root{--chl-gold:#C9A84C;--chl-gold-l:#E6C265;--chl-ink:#EAD9B5;--chl-mut:#A8946E;--chl-lat:"EB Garamond"}',
    'html[data-chl-page="AboutMe.html"]{--chl-lat:"Cormorant Garamond"}',
    /* the globe */
    '.chl-globe{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:28px;min-width:28px;padding:0 10px 0 8px;' +
      'border:1px solid rgba(201,168,76,.46);border-radius:999px;background:rgba(201,168,76,.07);color:var(--chl-gold-l);cursor:pointer;' +
      'font:600 9.5px/1 "JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;white-space:nowrap;' +
      'transition:border-color .2s,background .2s,color .2s,box-shadow .2s;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}',
    '.chl-globe svg{width:15px;height:15px;flex:none;display:block}',
    '.chl-globe{position:relative}.chl-globe::before{content:"";position:absolute;inset:-8px -4px}',
    '.chl-globe:hover{border-color:var(--chl-gold-l);background:rgba(201,168,76,.15);color:#FFE7A3}',
    '.chl-globe:focus-visible{outline:none;border-color:var(--chl-gold-l);box-shadow:0 0 0 3px rgba(201,168,76,.28)}',
    '.chl-globe .chl-code{display:inline-block;padding-top:1px}',
    /* where it sits on each page */
    '.desk-view .hdr-main>.chl-at-desk{position:absolute;right:0;bottom:5px;z-index:6}',
    '.chl-srow{display:flex;align-items:center;gap:8px;margin-top:5px}',
    '.chl-srow>.mob-search{flex:1 1 auto;min-width:0;width:auto!important;margin-top:0!important}',
    '.chl-srow>.chl-at-mob{height:34px;padding:0 11px 0 9px;flex:none}',
    '#intro>.chl-at-intro{position:absolute;top:calc(env(safe-area-inset-top,0px) + 20px);right:calc(env(safe-area-inset-right,0px) + 20px);z-index:40;background:rgba(14,5,3,.55);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}',
    'header>.chl-at-hdr{align-self:flex-end;flex:none;margin-bottom:-2px}',
    '.h-act>.chl-at-kb{height:27px}',
    'nav>.chl-at-me{flex:none;margin-left:18px}',
    '@media (max-width:1080px),(orientation:landscape) and (max-height:620px){nav>.chl-at-me{position:absolute;top:7px;right:var(--pad-x,20px);margin:0;height:26px}nav.sc>.chl-at-me{top:4px}}',
    '.chl-at-float{position:fixed;top:12px;right:12px;z-index:2147482000;background:rgba(14,5,3,.8)}',
    '@media (max-width:720px){.chl-globe{height:26px;padding:0 8px 0 7px;font-size:9px;gap:5px}.chl-globe svg{width:14px;height:14px}header>.chl-at-hdr{padding:0 7px}header>.chl-at-hdr .chl-code{display:none}}',
    /* the panel */
    '.chl-ov{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom));' +
      'background:rgba(6,2,3,.74);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .22s ease}',
    '.chl-ov.on{opacity:1}',
    'html.chl-open body{overflow:hidden}',
    '.chl-ov[hidden],.chl-ov [hidden]{display:none!important}',
    '.chl-pn{box-sizing:border-box;position:relative;width:min(940px,100%);max-height:min(860px,100%);display:flex;flex-direction:column;overflow:hidden;' +
      'background:linear-gradient(180deg,#1C070C 0%,#13050A 100%);border:1px solid rgba(201,168,76,.38);border-radius:18px;' +
      'box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(0,0,0,.4);color:var(--chl-ink);font-family:"EB Garamond",Georgia,"Noto Serif","Times New Roman",serif;' +
      'transform:translateY(10px) scale(.985);transition:transform .25s cubic-bezier(.2,.8,.2,1)}',
    '.chl-ov.on .chl-pn{transform:none}',
    '.chl-pn *{box-sizing:border-box}',
    '.chl-hd{display:flex;align-items:flex-start;gap:14px;padding:20px 22px 12px;border-bottom:1px solid rgba(201,168,76,.16)}',
    '.chl-hico{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:var(--chl-gold-l);border:1px solid rgba(201,168,76,.4);background:rgba(201,168,76,.08)}',
    '.chl-hico svg{width:22px;height:22px}',
    '.chl-ht{flex:1;min-width:0}',
    '.chl-ht h2{margin:0;font:600 21px/1.25 Cinzel,"EB Garamond",Georgia,serif;letter-spacing:.06em;color:var(--chl-gold-l)}',
    '.chl-pn[dir=rtl] .chl-ht h2,.chl-pn:not([lang=en]) .chl-ht h2{font-family:inherit;letter-spacing:0;font-size:22px}',
    '.chl-ht p{margin:5px 0 0;font-size:15px;line-height:1.5;color:var(--chl-mut);font-style:italic}',
    '.chl-x{all:unset;flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:var(--chl-mut);border:1px solid rgba(201,168,76,.22);font:400 20px/1 system-ui,sans-serif}',
    '.chl-x:hover,.chl-x:focus-visible{color:var(--chl-gold-l);border-color:var(--chl-gold-l);outline:none}',
    '.chl-tools{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:12px 22px}',
    '.chl-now{font:500 10px/1.4 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--chl-mut)}',
    '.chl-pn[dir=rtl] .chl-now,.chl-pn:not([lang=en]) .chl-now{font-family:inherit;text-transform:none;letter-spacing:0;font-size:13.5px}',
    '.chl-now b{color:var(--chl-gold-l);font-weight:600;letter-spacing:normal;text-transform:none;font-family:system-ui,"Noto Sans",sans-serif;font-size:13px;margin-inline-start:6px}',
    '.chl-q{flex:1 1 240px;min-width:0;position:relative}',
    '.chl-q input{all:unset;box-sizing:border-box;width:100%;height:40px;padding:0 14px 0 38px;border-radius:999px;border:1px solid rgba(201,168,76,.3);background:rgba(255,255,255,.04);' +
      'color:var(--chl-ink);font:16px/1.2 system-ui,"Noto Sans",sans-serif}',
    '.chl-pn[dir=rtl] .chl-q input{padding:0 38px 0 14px}',
    '.chl-q input::placeholder{color:rgba(168,148,110,.8)}',
    '.chl-q input:focus{border-color:var(--chl-gold-l);box-shadow:0 0 0 3px rgba(201,168,76,.18)}',
    '.chl-q svg{position:absolute;top:50%;inset-inline-start:13px;width:16px;height:16px;transform:translateY(-50%);color:var(--chl-mut);pointer-events:none}',
    '.chl-msg{margin:0 22px 10px;padding:12px 14px;border-radius:12px;border:1px solid rgba(201,168,76,.32);background:rgba(201,168,76,.08);font-size:15px;line-height:1.55;color:var(--chl-ink)}',
    '.chl-msg .chl-alt{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px}',
    '.chl-msg .chl-alt button{all:unset;cursor:pointer;padding:6px 12px;border-radius:999px;border:1px solid rgba(201,168,76,.5);color:var(--chl-gold-l);font:15px/1.2 system-ui,"Noto Sans",sans-serif}',
    '.chl-msg .chl-alt button:hover,.chl-msg .chl-alt button:focus-visible{background:rgba(201,168,76,.16);outline:none}',
    '.chl-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:2px 22px 10px;scrollbar-width:thin;scrollbar-color:rgba(201,168,76,.4) transparent}',
    '.chl-g{margin:0 0 16px}',
    '.chl-g h3{margin:10px 0 8px;font:600 10px/1.4 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--chl-gold);display:flex;align-items:center;gap:10px}',
    '.chl-pn[dir=rtl] .chl-g h3,.chl-pn:not([lang=en]) .chl-g h3{font-family:inherit;letter-spacing:0;text-transform:none;font-size:14px}',
    '.chl-g h3::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,.35),transparent)}',
    '.chl-pn[dir=rtl] .chl-g h3::after{background:linear-gradient(270deg,rgba(201,168,76,.35),transparent)}',
    '.chl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:7px}',
    '.chl-l{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;justify-content:center;gap:2px;min-height:52px;padding:7px 12px;border-radius:11px;' +
      'border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025);transition:border-color .15s,background .15s;text-align:start;overflow:hidden}',
    '.chl-l:hover{border-color:rgba(201,168,76,.5);background:rgba(201,168,76,.08)}',
    '.chl-l:focus-visible{outline:none;border-color:var(--chl-gold-l);box-shadow:0 0 0 3px rgba(201,168,76,.24)}',
    '.chl-l b{display:block;font:500 16px/1.3 system-ui,-apple-system,"Segoe UI","Noto Sans","Noto Sans Arabic","Noto Nastaliq Urdu","Noto Sans Devanagari",sans-serif;color:var(--chl-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.chl-l b[dir=rtl]{text-align:right}',
    '.chl-l i{display:block;font:italic 13px/1.3 "EB Garamond",Georgia,serif;color:var(--chl-mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.chl-l.on{border-color:var(--chl-gold-l);background:rgba(201,168,76,.15)}',
    '.chl-l.on b{color:#FFE7A3}',
    '.chl-l.chl-en{max-width:320px}',
    '.chl-l.chl-soon{border-style:dashed;opacity:.86}',
    '.chl-l em{display:block;margin-top:2px;font:600 8.5px/1.3 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#C98A4C;font-style:normal;white-space:normal}',
    '.chl-pn:not([lang=en]) .chl-l em{font-family:inherit;text-transform:none;letter-spacing:0;font-size:11.5px}',
    '.chl-none{margin:18px 0;text-align:center;color:var(--chl-mut);font-style:italic;font-size:16px}',
    '.chl-ft{padding:12px 22px 16px;border-top:1px solid rgba(201,168,76,.16);font-size:13.5px;line-height:1.55;color:var(--chl-mut)}',
    '.chl-ft p{margin:0}.chl-ft p+p{margin-top:4px}',
    '.chl-ft .chl-ft-app{display:none}html.is-app .chl-ft .chl-ft-app{display:block}',
    '@media (max-width:640px){.chl-ov{padding:0;align-items:stretch}.chl-pn{width:100%;max-height:none;height:100%;border-radius:0;border:0}' +
      '.chl-hd{padding:calc(env(safe-area-inset-top,0px) + 14px) 16px 10px}.chl-tools{padding:10px 16px}.chl-body{padding:2px 16px 10px}.chl-msg{margin:0 16px 10px}' +
      '.chl-ft{padding:10px 16px calc(env(safe-area-inset-bottom,0px) + 12px)}.chl-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}.chl-ht h2{font-size:18px}.chl-ht p{font-size:14px}}',
    /* index.html lays a phone held sideways out at 1280px and scales it down: enlarge the panel to match */
    'html.phone-land .chl-pn{zoom:1.32;width:min(940px,calc(100% / 1.32));max-height:calc((100vh - 24px) / 1.32)}',
    'html.phone-land .chl-ov{padding:12px}',
    'html.phone-land .chl-hd{padding:10px 16px 6px}html.phone-land .chl-ht p{display:none}html.phone-land .chl-tools{padding:6px 16px}',
    'html.phone-land .chl-ft{padding:6px 16px 8px}html.phone-land .chl-ft p:first-child{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '@media (max-height:500px) and (orientation:landscape){.chl-ov{padding:8px}.chl-pn{max-height:100%}.chl-hd{padding:10px 16px 6px}.chl-ht p{display:none}.chl-tools{padding:6px 16px}.chl-ft{padding:6px 16px 8px;font-size:12px}' +
      '.chl-ft p:first-child{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}}',
    /* the return bar */
    '.chl-bar{position:fixed;top:calc(env(safe-area-inset-top,0px) + 10px);left:50%;transform:translate(-50%,-140%);z-index:2147482500;display:flex;align-items:center;gap:10px;' +
      'max-width:calc(100vw - 20px);padding:8px 8px 8px 14px;border-radius:999px;background:rgba(22,6,10,.96);border:1px solid rgba(201,168,76,.5);box-shadow:0 12px 34px rgba(0,0,0,.5);' +
      'color:var(--chl-ink);font:15px/1.3 system-ui,"Noto Sans",sans-serif;transition:transform .35s cubic-bezier(.2,.8,.2,1)}',
    '.chl-bar.on{transform:translate(-50%,0)}',
    '@media (max-width:520px){.chl-bar{width:calc(100vw - 20px);border-radius:18px;font-size:14px}.chl-bar span{white-space:normal;line-height:1.35;flex:1}}',
    '.chl-bar[dir=rtl]{padding:8px 14px 8px 8px}',
    '.chl-bar svg{width:18px;height:18px;flex:none;color:var(--chl-gold-l)}',
    '.chl-bar span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.chl-bar button{all:unset;cursor:pointer;flex:none;padding:7px 14px;border-radius:999px;font:600 14px/1.1 system-ui,"Noto Sans",sans-serif}',
    '.chl-bar .chl-go{background:var(--chl-gold);color:#1A0609}',
    '.chl-bar .chl-go:hover,.chl-bar .chl-go:focus-visible{background:var(--chl-gold-l);outline:none}',
    '.chl-bar .chl-bx{padding:7px 10px;color:var(--chl-mut);font-size:18px;font-weight:400}',
    '.chl-bar .chl-bx:hover,.chl-bar .chl-bx:focus-visible{color:var(--chl-gold-l);outline:none}',
    /* a page shown in translation */
    'html[data-chl-dir=rtl] :is(p,li,blockquote,dd,figcaption,.m-body,.m-title,.m-rich,.chapter-title,.lede):not([translate=no]){direction:rtl}',
    'html[data-chl-dir] .chl-ov :is(p,li),html[data-chl-font] .chl-ov :is(p,li){direction:inherit;font-family:inherit;line-height:1.55}',
    '.chl-src{unicode-bidi:plaintext}',
    'html[data-chl-font=nastaliq] :is(p,li,blockquote,dd,figcaption,.m-body,.m-title,.lede):not([translate=no]){font-family:var(--chl-lat),"Noto Nastaliq Urdu","Noto Naskh Arabic",serif}',
    'html[data-chl-font=nastaliq] :is(p,li,blockquote,dd,figcaption,.m-body,.lede):not([translate=no]){line-height:2.15}',
    'html[data-chl-font=naskh] :is(p,li,blockquote,dd,figcaption,.m-body,.m-title,.lede):not([translate=no]){font-family:var(--chl-lat),"Noto Naskh Arabic",serif}',
    'html[data-chl-font=naskh] :is(p,li,blockquote,dd,figcaption,.m-body,.lede):not([translate=no]){line-height:1.95}',
    'html[data-chl-font] .chl-keep[lang=ar]{font-family:Amiri,"Noto Naskh Arabic",serif}',
    '.chl-keep{unicode-bidi:isolate}'
  ].join('\n');

  function addStyle() {
    if (D.getElementById('chl-css')) return;
    var s = D.createElement('style');
    s.id = 'chl-css';
    s.textContent = CSS;
    (D.head || HTML).appendChild(s);
  }

  /* ── 7 · THE GLOBE ──────────────────────────────────────────────────── */
  var globes = [];
  function makeGlobe(cls) {
    var b = D.createElement('button');
    b.type = 'button';
    b.className = 'chl-globe notranslate ' + (cls || '');
    b.setAttribute('translate', 'no');
    b.setAttribute('aria-haspopup', 'dialog');
    b.innerHTML = GLOBE + '<span class="chl-code"></span>';
    var c = TR || 'en';
    var code = (canon(c) || c).split('-')[0].toUpperCase();
    b.querySelector('.chl-code').textContent = code;
    var lbl = T('lang') + (T('lang') !== 'Language' ? ' · Language' : '') + ' — ' + (TR ? own(TR) : 'English');
    b.setAttribute('aria-label', lbl);
    b.title = lbl;
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(b); });
    globes.push(b);
    return b;
  }
  function put(sel, cls) {
    var el = D.querySelector(sel);
    if (!el) return false;
    el.appendChild(makeGlobe(cls));
    return true;
  }
  function place() {
    var n = 0;
    if (PAGE === 'index.html') {
      if (put('.desk-view .hdr-main', 'chl-at-desk')) n++;
      var s = D.getElementById('mobSrch');
      if (s && s.parentNode) {
        var row = D.createElement('div');
        row.className = 'chl-srow';
        s.parentNode.insertBefore(row, s);
        row.appendChild(s);
        row.appendChild(makeGlobe('chl-at-mob'));
        n++;
      }
      if (put('#intro', 'chl-at-intro')) n++;
    } else if (PAGE === 'before_adam.html' || PAGE === 'comparative_religion.html') {
      if (put('body > header', 'chl-at-hdr')) n++;
    } else if (PAGE === 'karbala.html') {
      if (put('header .h-act', 'chl-at-kb')) n++;
    } else if (/^aboutme\.html$/i.test(PAGE)) {
      if (put('#nav', 'chl-at-me')) n++;
    }
    if (!n) D.body.appendChild(makeGlobe('chl-at-float'));
  }

  /* ── 8 · THE PANEL ──────────────────────────────────────────────────── */
  var ov, pn, inp, msgEl, bodyEl, noneEl, opener;

  function item(c, extraCls) {
    var l = BY[c];
    var o = l[2], e = l[1], r = isRtl(c);
    var on = (TR ? TR === c : false);
    var hay = norm([e, o, c, ALIAS[c] || ''].join(' '));
    return '<button type="button" class="chl-l' + (on ? ' on' : '') + (extraCls ? ' ' + extraCls : '') + '" data-c="' + esc(c) + '" data-s="' + esc(hay) + '"' +
      ' aria-pressed="' + on + '" lang="' + esc(htmlLang(c)) + '">' +
      '<b' + (r ? ' dir="rtl"' : '') + '>' + esc(o || e) + '</b>' + (o && o !== e ? '<i lang="en" dir="ltr">' + esc(e) + '</i>' : '<i lang="en" dir="ltr">&nbsp;</i>') + '</button>';
  }
  function soonItem(l) {
    var hay = norm([l[1], l[2], l[0], ALIAS[l[0]] || ''].join(' '));
    return '<button type="button" class="chl-l chl-soon" data-soon="' + esc(l[0]) + '" data-s="' + esc(hay) + '">' +
      '<b dir="rtl" lang="ur">' + esc(l[2]) + '</b><i lang="en" dir="ltr">' + esc(l[1]) + '</i><em>' + esc(T('soon')) + '</em></button>';
  }
  function suggested() {
    var out = [], seen = { en: 1 };
    var nl = [];
    try { nl = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]) || []; } catch (e) {}
    if (PREF && PREF !== 'en') nl = [PREF].concat(nl);
    nl.concat(['ur', 'ar', 'fr', 'de', 'zh-CN', 'ms', 'es', 'tr']).forEach(function (x) {
      var c = canon(x);
      if (c && !seen[c] && out.length < 8) { seen[c] = 1; out.push(c); }
    });
    return out;
  }

  function build() {
    var rtl = isRtl(UIL);
    var h = '<div class="chl-pn" role="dialog" aria-modal="true" aria-labelledby="chlT" lang="' + esc(UIL) + '" dir="' + (rtl ? 'rtl' : 'ltr') + '">' +
      '<div class="chl-hd"><span class="chl-hico">' + GLOBE + '</span><div class="chl-ht"><h2 id="chlT">' + esc(T('title')) + '</h2>' +
      '<p>' + esc(T('sub')) + '</p></div><button type="button" class="chl-x" aria-label="' + esc(T('close')) + '">&#x2715;</button></div>' +
      '<div class="chl-tools"><div class="chl-now">' + esc(T('now')) + '<b>' + esc(TR ? own(TR) + ' · ' + eng(TR) : 'English') + '</b></div>' +
      '<label class="chl-q"><svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></g></svg>' +
      '<input type="search" autocomplete="off" spellcheck="false" placeholder="' + esc(T('search')) + '" aria-label="' + esc(T('search')) + '"></label></div>' +
      '<div class="chl-msg" role="status" aria-live="polite" hidden></div>' +
      '<div class="chl-body">';
    // English, the original
    h += '<div class="chl-g" data-g="orig"><div class="chl-grid">' +
      '<button type="button" class="chl-l chl-en' + (!TR ? ' on' : '') + '" data-c="en" data-s="english original en angrezi" aria-pressed="' + (!TR) + '" lang="en">' +
      '<b>English</b><i>' + esc(T('orig')) + '</i></button></div></div>';
    // Suggested
    var sg = suggested();
    if (sg.length) {
      h += '<section class="chl-g" data-g="sugg" aria-labelledby="chl-h-sugg"><h3 id="chl-h-sugg">' + esc(T('sugg')) + '</h3><div class="chl-grid">';
      sg.forEach(function (c) { h += item(c, 'chl-dup'); });
      h += '</div></section>';
    }
    GROUPS.forEach(function (g) {
      h += '<section class="chl-g" data-g="' + g + '" aria-labelledby="chl-h-' + g + '"><h3 id="chl-h-' + g + '">' + esc(T('g_' + g)) + '</h3><div class="chl-grid">';
      LANGS.forEach(function (l) { if (l[3] === g) h += item(l[0]); });
      h += '</div></section>';
      if (g === 'pk') {
        h += '<section class="chl-g" data-g="pksoon" aria-labelledby="chl-h-pksoon"><h3 id="chl-h-pksoon">' + esc(T('g_pksoon')) + '</h3><div class="chl-grid">';
        SOON.forEach(function (l) { h += soonItem(l); });
        h += '</div></section>';
      }
    });
    h += '<p class="chl-none" hidden>' + esc(T('none')) + '</p></div>' +
      '<div class="chl-ft"><p>' + esc(T('note')) + ' ' + esc(T('keep')) + '</p><p class="chl-ft-app">' + esc(T('app')) + '</p></div></div>';

    ov = D.createElement('div');
    ov.className = 'chl-ov notranslate';
    ov.setAttribute('translate', 'no');
    ov.hidden = true;
    ov.innerHTML = h;
    D.body.appendChild(ov);
    pn = ov.querySelector('.chl-pn');
    inp = ov.querySelector('.chl-q input');
    msgEl = ov.querySelector('.chl-msg');
    bodyEl = ov.querySelector('.chl-body');
    noneEl = ov.querySelector('.chl-none');

    ov.addEventListener('click', function (e) {
      if (e.target === ov) { close(); return; }
      var x = e.target.closest ? e.target.closest('.chl-x') : null;
      if (x) { close(); return; }
      var b = e.target.closest ? e.target.closest('button[data-c],button[data-soon]') : null;
      if (!b) return;
      if (b.hasAttribute('data-soon')) { soon(b.getAttribute('data-soon')); return; }
      go(b.getAttribute('data-c'));
    });
    inp.addEventListener('input', filter);
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = bodyEl.querySelector('.chl-g:not([hidden]) .chl-l:not([hidden])');
        if (first) { e.preventDefault(); first.click(); }
      }
    });
    // Keys, wheel and touch inside the panel belong to the panel alone — the
    // page behind (the overture's keys, Comparative Religion's shortcuts)
    // must not react to them.
    ['keydown', 'keyup', 'keypress', 'click', 'wheel', 'touchstart', 'touchmove', 'touchend', 'pointerdown'].forEach(function (t) {
      ov.addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true });
    });
  }
  // While the panel is open, Escape and Tab are handled wherever focus is.
  function onDocKey(e) {
    if (!ov || ov.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.filter.call(ov.querySelectorAll('button,input'), function (el) { return !el.closest('[hidden]') && el.offsetParent !== null; });
    if (!f.length) return;
    var a = f[0], z = f[f.length - 1], inside = ov.contains(D.activeElement);
    if (!inside) { e.preventDefault(); e.stopPropagation(); (e.shiftKey ? z : a).focus(); }
    else if (e.shiftKey && D.activeElement === a) { e.preventDefault(); e.stopPropagation(); z.focus(); }
    else if (!e.shiftKey && D.activeElement === z) { e.preventDefault(); e.stopPropagation(); a.focus(); }
  }
  var inerted = [], hideTimer = 0;
  function setInert(on) {
    if (on) {
      inerted = [];
      Array.prototype.forEach.call(D.body.children, function (el) {
        if (el === ov || el.hasAttribute('inert') || el.tagName === 'SCRIPT') return;
        el.setAttribute('inert', '');
        inerted.push(el);
      });
    } else {
      inerted.forEach(function (el) { el.removeAttribute('inert'); });
      inerted = [];
    }
  }

  function filter() {
    var q = norm(inp.value).trim();
    var any = false;
    var groups = bodyEl.querySelectorAll('.chl-g');
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i], vis = 0, items = g.querySelectorAll('.chl-l');
      var hideAll = q && (g.getAttribute('data-g') === 'sugg');   // no duplicates while searching
      for (var j = 0; j < items.length; j++) {
        var hit = !hideAll && (!q || items[j].getAttribute('data-s').indexOf(q) >= 0);
        items[j].hidden = !hit;
        if (hit) vis++;
      }
      g.hidden = !vis;
      if (vis && g.getAttribute('data-g') !== 'orig') any = true;
      if (vis && q) any = true;
    }
    noneEl.hidden = !q || any;
  }

  function message(kind, code) {
    if (!ov) build();
    if (ov.hidden) open();
    var h;
    if (kind === 'offline') h = esc(T('offline'));
    else {
      h = esc(T('soonMsg', own(code) + ' (' + eng(code) + ')')) + '<div class="chl-alt">' +
        ['ur', 'pa-Arab', 'en'].map(function (c) {
          return '<button type="button" data-c="' + c + '" lang="' + c + '"' + (isRtl(c) ? ' dir="rtl"' : '') + '>' + esc(own(c)) + '</button>';
        }).join('') + '</div>';
    }
    msgEl.innerHTML = h;
    msgEl.hidden = false;
    var b = msgEl.querySelector('button');
    if (b) b.focus();
  }
  function soon(code) { message('soon', code); }

  function open(from) {
    if (!ov) build();
    clearTimeout(hideTimer);
    if (!ov.hidden && ov.classList.contains('on')) return;
    opener = from || D.activeElement;
    msgEl.hidden = true;
    inp.value = '';
    filter();
    ov.hidden = false;
    HTML.classList.add('chl-open');
    setInert(true);
    D.addEventListener('keydown', onDocKey, true);
    requestAnimationFrame(function () { ov.classList.add('on'); });
    var cur = bodyEl.querySelector('.chl-g:not([data-g=sugg]) .chl-l.on');
    var fine = false;
    try { fine = matchMedia('(pointer:fine)').matches; } catch (e) {}
    if (fine) inp.focus({ preventScroll: true });
    else (cur || ov.querySelector('.chl-x')).focus({ preventScroll: true });
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'center' });
    else bodyEl.scrollTop = 0;
  }
  function close() {
    if (!ov || ov.hidden) return;
    ov.classList.remove('on');
    HTML.classList.remove('chl-open');
    setInert(false);
    D.removeEventListener('keydown', onDocKey, true);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { ov.hidden = true; }, 200);
    if (opener && opener.focus) { try { opener.focus({ preventScroll: true }); } catch (e) {} }
  }

  /* ── 9 · A RETURNING READER ─────────────────────────────────────────── */
  function bar() {
    if (PROXY || TR || !PREF || PREF === 'en' || !BY[PREF] || sstore(BAR_KEY)) return;
    if (/[?&]tracker-check\b/.test(location.search)) return;
    var L = uiCode(PREF) || 'en', r = isRtl(L);
    var b = D.createElement('div');
    b.className = 'chl-bar notranslate';
    b.setAttribute('translate', 'no');
    b.setAttribute('role', 'status');
    b.setAttribute('aria-live', 'polite');
    b.setAttribute('aria-label', T('lang', null, L));
    b.setAttribute('lang', L);
    b.dir = r ? 'rtl' : 'ltr';
    b.innerHTML = GLOBE + '<span>' + esc(T('cont', own(PREF), L)) + '</span>' +
      '<button type="button" class="chl-go">' + esc(T('go', null, L)) + '</button>' +
      '<button type="button" class="chl-bx" aria-label="' + esc(T('close', null, L)) + '">&#x2715;</button>';
    D.body.appendChild(b);
    b.querySelector('.chl-go').addEventListener('click', function () { sstore(BAR_KEY, '1'); go(PREF); });
    b.querySelector('.chl-bx').addEventListener('click', function () {
      sstore(BAR_KEY, '1');
      b.classList.remove('on');
      setTimeout(function () { b.remove(); }, 400);
    });
    setTimeout(function () { b.classList.add('on'); }, 1400);
    setTimeout(function () {
      if (!b.isConnected || b.contains(D.activeElement)) return;
      sstore(BAR_KEY, '1');
      b.classList.remove('on');
      setTimeout(function () { b.remove(); }, 400);
    }, 20000);
  }

  /* ── 10 · A PAGE SHOWN IN TRANSLATION ───────────────────────────────── */
  // Scripture and original-language text: Arabic, Hebrew, Syriac and Greek scripts.
  var SC = '\\u0590-\\u05FF\\u0600-\\u06FF\\u0700-\\u074F\\u0750-\\u077F\\u08A0-\\u08FF\\uFB1D-\\uFDFF\\uFE70-\\uFEFF\\u0370-\\u03FF\\u1F00-\\u1FFF';
  var RUN = new RegExp('[' + SC + '](?:[' + SC + '\\s\\u200c\\u200d\\u060c\\u061b\\u061f\\u06d4\\u06dd\\ufd3e\\ufd3f.,:;!?\'"\\u00ab\\u00bb()\\[\\]\\-\\u2013\\u2014\\u0660-\\u0669\\u06f0-\\u06f90-9]*[' + SC + '])?', 'g');
  var HAS = new RegExp('[' + SC + ']');
  var SRC = /(^|\n)([ \t]*(?:KEY SOURCES|SOURCES|SOURCE|Sources|Source)[ \t]*[:·—][ \t]*)/g;
  var KEEP_SEL = '.brand-t,.mob-brand,.in-title,.by-name,.in-by span,.hdr-brand-sub .nm,.hdr-brand-sub b,.hdr-brand-collab b,' +
    '#nav .brand,.sources .src,#sources .src,#biblio .src,.m-sources-body,.ev-text,.ev-ref,.ev-ar,.ev-gr,.ev-dv,.ev-he,.ayah-t,.chapter-arabic,' +
    '[lang=ar],[lang=he],[lang=hbo],[lang=el],[lang=grc],[lang=syc],[lang=arc]';
  // <font> is how Google wraps text it has already translated: never touch it.
  var SKIP = 'script,style,noscript,textarea,input,select,option,code,pre,svg,canvas,font,[translate=no],.notranslate,.chl-ov,.chl-bar';

  function keepEl(el) { el.setAttribute('translate', 'no'); el.classList.add('notranslate'); }
  function keepSpan(text) {
    var s = D.createElement('span');
    s.className = 'chl-keep notranslate';
    s.setAttribute('translate', 'no');
    var lang = /[֐-׿יִ-ﭏ]/.test(text) ? 'he' : /[Ͱ-Ͽἀ-῿]/.test(text) ? 'el' : /[܀-ݏ]/.test(text) ? 'syc' : 'ar';
    s.setAttribute('lang', lang);
    s.textContent = text;
    return s;
  }
  function protect(root, sources) {
    if (!root || !root.querySelectorAll) return;
    var k = root.querySelectorAll(KEEP_SEL);
    for (var i = 0; i < k.length; i++) keepEl(k[i]);
    var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var v = n.nodeValue;
        if (!(HAS.test(v) || (sources && /SOURCE|Source/.test(v)))) return NodeFilter.FILTER_SKIP;
        var p = n.parentNode;
        if (!p || p.nodeType !== 1 || (p.closest && p.closest(SKIP))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) { split(t, sources); });
  }
  function split(t, sources) {
    var v = t.nodeValue, p = t.parentNode, ranges = [];
    // Whole node is original-language text: mark its element, change nothing else.
    if (!sources && p !== D.body && v.trim() && v.replace(RUN, '').replace(/[\s\d.,:;!?'"()\[\]\-–—«»]/g, '') === '' && p.childNodes.length === 1) {
      keepEl(p);
      p.setAttribute('lang', p.getAttribute('lang') || (/[֐-׿]/.test(v) ? 'he' : /[Ͱ-Ͽἀ-῿]/.test(v) ? 'el' : 'ar'));
      return;
    }
    var m;
    if (sources) {
      SRC.lastIndex = 0;
      while ((m = SRC.exec(v))) {
        var from = m.index + m[0].length, end = v.indexOf('\n\n', from);
        if (end < 0) end = v.length;
        if (end > from) ranges.push([from, end, 'src']);
      }
    }
    RUN.lastIndex = 0;
    while ((m = RUN.exec(v))) {
      var a = m.index, b = a + m[0].length, inside = false;
      for (var i = 0; i < ranges.length; i++) if (a >= ranges[i][0] && b <= ranges[i][1]) { inside = true; break; }
      if (!inside) ranges.push([a, b, 'run']);
    }
    if (!ranges.length) return;
    ranges.sort(function (x, y) { return x[0] - y[0]; });
    var frag = D.createDocumentFragment(), at = 0;
    ranges.forEach(function (r) {
      if (r[0] < at) return;
      if (r[0] > at) frag.appendChild(D.createTextNode(v.slice(at, r[0])));
      var piece = v.slice(r[0], r[1]);
      if (r[2] === 'src') {
        var s = D.createElement('span');
        s.className = 'chl-src notranslate';
        s.setAttribute('translate', 'no');
        s.textContent = piece;
        frag.appendChild(s);
      } else frag.appendChild(keepSpan(piece));
      at = r[1];
    });
    if (at < v.length) frag.appendChild(D.createTextNode(v.slice(at)));
    p.replaceChild(frag, t);
  }

  function addFonts(kind) {
    if (D.getElementById('chl-fonts')) return;
    var l = D.createElement('link');
    l.id = 'chl-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600&' +
      (kind === 'nastaliq' ? 'family=Noto+Nastaliq+Urdu:wght@400;600&' : '') + 'family=Amiri:wght@400;700&display=swap';
    (D.head || HTML).appendChild(l);
  }

  function translated() {
    if (!TR) return;
    // The translated copy is for reading; the app installs from the real site.
    if (PROXY) Array.prototype.forEach.call(D.querySelectorAll('link[rel=manifest]'), function (l) { l.remove(); });
    var f = flags(TR);
    HTML.setAttribute('data-chl', TR);
    if (isRtl(TR)) HTML.setAttribute('data-chl-dir', 'rtl');
    var font = f.indexOf('n') >= 0 ? 'nastaliq' : f.indexOf('k') >= 0 ? 'naskh' : '';
    if (font) { HTML.setAttribute('data-chl-font', font); addFonts(font); }
    protect(D.body, false);
    var mb = D.getElementById('mBody');
    // Entries on the timeline open into the reading panel; they are guarded as they open.
    if (typeof window.showModal === 'function' && mb) {
      var orig = window.showModal;
      window.showModal = function () {
        var r = orig.apply(this, arguments);
        try {
          var t = D.getElementById('mTitle');
          if (t && t.getAttribute('data-chl-kept')) { t.removeAttribute('translate'); t.classList.remove('notranslate'); t.removeAttribute('lang'); t.removeAttribute('data-chl-kept'); }
          protect(t, false);
          if (t && t.getAttribute('translate') === 'no') t.setAttribute('data-chl-kept', '1');
          protect(D.getElementById('mBody'), true);
        } catch (e) {}
        return r;
      };
    }
  }

  /* ── 11 · START ─────────────────────────────────────────────────────── */
  function start() {
    HTML.setAttribute('data-chl-page', PAGE);
    addStyle();
    try { translated(); } catch (e) {}
    place();
    bar();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start);
  else start();

  window.ChroniclesLang = {
    open: function () { open(); },
    close: close,
    go: go,
    current: function () { return TR || 'en'; },
    languages: function () { return LANGS.map(function (l) { return { code: l[0], name: l[1], own: l[2] || l[1] }; }); }
  };
})();
