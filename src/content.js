/* Koko content: every word Koko says and every label, in Hebrew, Russian and English.
   No DOM here, so tools/export_lines.js can load this file in Node to build the voice-pack line lists. */

const LANGS = {
  he: { dir: 'rtl', name: 'עברית', tts: 'he-IL', re: /^(he|iw)([-_]|$)/i },
  ru: { dir: 'ltr', name: 'Русский', tts: 'ru-RU', re: /^ru([-_]|$)/i },
  en: { dir: 'ltr', name: 'English', tts: 'en-US', re: /^en([-_]|$)/i }
};
const LANG_ORDER = ['he', 'ru', 'en'];

/* ---------- picture vocabulary ---------- */
const SYM = {
  dog: 's-dog', cow: 's-cow', cat: 's-cat', duck: 's-duck', sheep: 's-sheep', frog: 's-frog', rooster: 's-rooster',
  rabbit: 's-rabbit', monkey: 's-monkey', mouse: 's-mouse',
  car: 's-car', train: 's-train', boat: 's-boat', bike: 's-bike',
  foot: 's-foot', head: 's-head', hand: 's-hand', eyes: 's-eyes',
  sock: 's-sock', hat: 's-hat', shoe: 's-shoe', mitten: 's-mitten', glasses: 's-glasses',
  toothbrush: 's-toothbrush', hairbrush: 's-hairbrush', cup: 's-cup', spoon: 's-spoon', fork: 's-fork',
  bed: 's-bed', bath: 's-bath', soap: 's-soap', banana: 's-banana', bowl: 's-bowl',
  strawberry: 's-strawberry', leaf: 's-leaf', carrot: 's-carrot', milk: 's-milk',
  bone: 's-bone', cheese: 's-cheese', fish: 's-fish',
  balloon: 's-balloon', icecream: 's-icecream', splat: 's-splat',
  happy: 's-face-happy', sad: 's-face-sad', sleepy: 's-face-sleepy'
};
/* Koko's own body parts (the touch round) */
const PART_SYM = { feet: 's-claw', eyes: 's-koko-eyes', tail: 's-tail', wings: 's-wing', head: 's-face-happy' };
const PARTS = ['feet', 'eyes', 'tail', 'wings', 'head'];

/* ---------- categories and items (language-independent) ----------
   kind: sound = who makes this sound, wear = where does it go, use = what do we use, color = what colour,
         feed = what does it eat, feel = how does Koko feel, touch = tap the part on Koko himself */
const CATS = [
  { id: 'animals', kind: 'sound', icon: 's-cow', world: 'farm', tint: '#FFE6B3', items: [
    { id: 'a1', show: 'dog', target: 'cow', alt: 'duck' },
    { id: 'a2', show: 'cat', target: 'duck', alt: 'sheep' },
    { id: 'a3', show: 'sheep', target: 'cat', alt: 'frog' },
    { id: 'a4', show: 'frog', target: 'dog', alt: 'cow' },
    { id: 'a5', show: 'rooster', target: 'sheep', alt: 'dog' },
    { id: 'a6', show: 'duck', target: 'frog', alt: 'cat' },
    { id: 'a7', show: 'cow', target: 'rooster', alt: 'duck' }
  ]},
  { id: 'clothes', kind: 'wear', icon: 's-sock', world: 'bedroom', tint: '#FFDDE6', items: [
    { id: 'c1', thing: 'sock', wrong: 'head', right: 'foot', alt: 'hand' },
    { id: 'c2', thing: 'hat', wrong: 'foot', right: 'head', alt: 'hand' },
    { id: 'c3', thing: 'shoe', wrong: 'hand', right: 'foot', alt: 'head' },
    { id: 'c4', thing: 'mitten', wrong: 'foot', right: 'hand', alt: 'head' },
    { id: 'c5', thing: 'glasses', wrong: 'foot', right: 'eyes', alt: 'hand' }
  ]},
  { id: 'home', kind: 'use', icon: 's-cup', world: 'kitchen', tint: '#D9F1E6', items: [
    { id: 'h1', wrong: 'hairbrush', right: 'toothbrush', alt: 'spoon', at: 'mouth' },
    { id: 'h2', wrong: 'shoe', right: 'cup', alt: 'soap', at: 'mouth' },
    { id: 'h3', wrong: 'fork', right: 'spoon', alt: 'toothbrush', at: 'wing', prop: 'bowl' },
    { id: 'h4', wrong: 'bath', right: 'bed', alt: 'cup', at: 'feet' },
    { id: 'h5', wrong: 'banana', right: 'soap', alt: 'fork', at: 'wing' }
  ]},
  { id: 'colors', kind: 'color', icon: 's-banana', world: 'garden', tint: '#E6F6DA', items: [
    { id: 'k1', thing: 'banana', wrong: 'blue', right: 'yellow', alt: 'red' },
    { id: 'k2', thing: 'strawberry', wrong: 'purple', right: 'red', alt: 'yellow' },
    { id: 'k3', thing: 'leaf', wrong: 'pink', right: 'green', alt: 'blue' },
    { id: 'k4', thing: 'carrot', wrong: 'blue', right: 'orange', alt: 'green' },
    { id: 'k5', thing: 'milk', wrong: 'green', right: 'white', alt: 'pink' }
  ]},
  { id: 'food', kind: 'feed', icon: 's-bone', world: 'park', tint: '#FFF0C9', items: [
    { id: 'f1', animal: 'dog', wrong: 'carrot', right: 'bone', alt: 'cheese' },
    { id: 'f2', animal: 'rabbit', wrong: 'bone', right: 'carrot', alt: 'fish' },
    { id: 'f3', animal: 'monkey', wrong: 'fish', right: 'banana', alt: 'bone' },
    { id: 'f4', animal: 'mouse', wrong: 'banana', right: 'cheese', alt: 'carrot' },
    { id: 'f5', animal: 'cat', wrong: 'cheese', right: 'fish', alt: 'banana' }
  ]},
  { id: 'vehicles', kind: 'sound', icon: 's-car', world: 'town', tint: '#DCEBFF', items: [
    { id: 'v1', show: 'train', target: 'car', alt: 'boat' },
    { id: 'v2', show: 'car', target: 'train', alt: 'bike' },
    { id: 'v3', show: 'boat', target: 'bike', alt: 'car' },
    { id: 'v4', show: 'bike', target: 'boat', alt: 'train' }
  ]},
  { id: 'feelings', kind: 'feel', icon: 's-face-happy', world: 'playground', tint: '#FFE3D6', items: [
    { id: 'e1', right: 'happy', wrong: 'sleepy', alt: 'sad', prop: 'balloon' },
    { id: 'e2', right: 'sad', wrong: 'happy', alt: 'sleepy', prop: 'balloon', event: 'away' },
    { id: 'e3', right: 'happy', wrong: 'sad', alt: 'sleepy', prop: 'icecream' },
    { id: 'e4', right: 'sad', wrong: 'happy', alt: 'sleepy', prop: 'icecream', event: 'fall' },
    { id: 'e5', right: 'sleepy', wrong: 'happy', alt: 'sad' }
  ]},
  /* Koko says one part's name while wiggling another; the child taps the right part on Koko.
     Head and eyes overlap on screen, so they are never both in play. */
  { id: 'body', kind: 'touch', icon: 's-tail', world: 'treetop', tint: '#DDF3F7', items: [
    { id: 'b1', right: 'feet', wrong: 'eyes', alt: 'tail' },
    { id: 'b2', right: 'eyes', wrong: 'tail', alt: 'wings' },
    { id: 'b3', right: 'tail', wrong: 'head', alt: 'feet' },
    { id: 'b4', right: 'wings', wrong: 'feet', alt: 'head' },
    { id: 'b5', right: 'head', wrong: 'wings', alt: 'tail' }
  ]}
];
const MOVES = ['flap', 'jump', 'spin', 'stomp', 'tall', 'small'];

/* ---------- words ---------- */
/* Things that make a sound: [with article, card label, sound, verb if not the default] */
const SOUND = {
  he: { dog: ['הכלב', 'כלב', 'הַב הַב'], cow: ['הפרה', 'פרה', 'מוּ'], cat: ['החתול', 'חתול', 'מְיָאוּ'], duck: ['הברווז', 'ברווז', 'גַּע גַּע'],
        sheep: ['הכבשה', 'כבשה', 'מֶה'], frog: ['הצפרדע', 'צפרדע', 'קְוַוה קְוַוה'], rooster: ['התרנגול', 'תרנגול', 'קוּקוּרִיקוּ'],
        car: ['המכונית', 'מכונית', 'בִּיפּ בִּיפּ'], train: ['הרכבת', 'רכבת', 'צ׳וּ צ׳וּ'], boat: ['הסירה', 'סירה', 'טוּ טוּ'], bike: ['האופניים', 'אופניים', 'דִּינְג דִּינְג', 'עושים'] },
  ru: { dog: ['собачка', 'Собачка', 'гав-гав'], cow: ['коровка', 'Коровка', 'му-у'], cat: ['котик', 'Котик', 'мяу'], duck: ['уточка', 'Уточка', 'кря-кря'],
        sheep: ['овечка', 'Овечка', 'бе-е'], frog: ['лягушка', 'Лягушка', 'ква-ква'], rooster: ['петушок', 'Петушок', 'кукареку'],
        car: ['машинка', 'Машинка', 'би-би'], train: ['паровозик', 'Паровозик', 'чух-чух'], boat: ['кораблик', 'Кораблик', 'ту-ту'], bike: ['велосипед', 'Велосипед', 'дзинь-дзинь'] },
  en: { dog: ['the dog', 'Dog', 'woof woof'], cow: ['the cow', 'Cow', 'moo'], cat: ['the cat', 'Cat', 'meow'], duck: ['the duck', 'Duck', 'quack quack'],
        sheep: ['the sheep', 'Sheep', 'baa'], frog: ['the frog', 'Frog', 'ribbit'], rooster: ['the rooster', 'Rooster', 'cock-a-doodle-doo'],
        car: ['the car', 'Car', 'beep beep', 'goes'], train: ['the train', 'Train', 'choo choo', 'goes'], boat: ['the boat', 'Boat', 'toot toot', 'goes'], bike: ['the bike', 'Bike', 'ding ding', 'goes'] }
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const SOUND_LINES = {
  he: {
    say: (w, t) => `${w[0]} ${w[3] || 'עושה'}... ${t[2]}!`,
    ask: (t) => `מי עושה ${t[2]}?`,
    yes: (t, w) => `נכון! ${t[0]} ${t[3] || 'עושה'} ${t[2]}! ו${w[0]} ${w[3] || 'עושה'} ${w[2]}!`
  },
  ru: {
    say: (w, t) => `${cap(w[0])} ${w[3] || 'говорит'}... «${t[2]}»!`,
    ask: (t) => `Кто говорит «${t[2]}»?`,
    yes: (t, w) => `Правильно! ${cap(t[0])} ${t[3] || 'говорит'} «${t[2]}»! А ${w[0]} — «${w[2]}»!`
  },
  en: {
    say: (w, t) => `${cap(w[0])} ${w[3] || 'says'}... ${t[2]}!`,
    ask: (t) => (t[3] ? `What ${t[3]} ${t[2]}?` : `Who says ${t[2]}?`),
    yes: (t, w) => `Yes! ${cap(t[0])} ${t[3] || 'says'} ${t[2]}! And ${w[0]} ${w[3] || 'says'} ${w[2]}!`
  }
};

const LABEL = {
  he: { foot: 'רגל', head: 'ראש', hand: 'יד', eyes: 'עיניים', sock: 'גרב', hat: 'כובע', shoe: 'נעל', mitten: 'כפפה', glasses: 'משקפיים',
        toothbrush: 'מברשת שיניים', hairbrush: 'מברשת שיער', cup: 'כוס', spoon: 'כף', fork: 'מזלג', bed: 'מיטה', bath: 'אמבטיה', soap: 'סבון', banana: 'בננה',
        strawberry: 'תות', leaf: 'עלה', carrot: 'גזר', milk: 'חלב', bone: 'עצם', cheese: 'גבינה', fish: 'דג',
        yellow: 'צהוב', blue: 'כחול', red: 'אדום', purple: 'סגול', green: 'ירוק', pink: 'ורוד', orange: 'כתום', white: 'לבן',
        happy: 'שמח', sad: 'עצוב', sleepy: 'עייף' },
  ru: { foot: 'Ножка', head: 'Голова', hand: 'Ручка', eyes: 'Глазки', sock: 'Носочек', hat: 'Шапка', shoe: 'Ботинок', mitten: 'Варежка', glasses: 'Очки',
        toothbrush: 'Зубная щётка', hairbrush: 'Расчёска', cup: 'Чашка', spoon: 'Ложка', fork: 'Вилка', bed: 'Кроватка', bath: 'Ванна', soap: 'Мыло', banana: 'Банан',
        strawberry: 'Клубничка', leaf: 'Листик', carrot: 'Морковка', milk: 'Молоко', bone: 'Косточка', cheese: 'Сыр', fish: 'Рыбка',
        yellow: 'Жёлтый', blue: 'Синий', red: 'Красный', purple: 'Фиолетовый', green: 'Зелёный', pink: 'Розовый', orange: 'Оранжевый', white: 'Белый',
        happy: 'Весёлый', sad: 'Грустный', sleepy: 'Сонный' },
  en: { foot: 'Foot', head: 'Head', hand: 'Hand', eyes: 'Eyes', sock: 'Sock', hat: 'Hat', shoe: 'Shoe', mitten: 'Mitten', glasses: 'Glasses',
        toothbrush: 'Toothbrush', hairbrush: 'Hairbrush', cup: 'Cup', spoon: 'Spoon', fork: 'Fork', bed: 'Bed', bath: 'Bathtub', soap: 'Soap', banana: 'Banana',
        strawberry: 'Strawberry', leaf: 'Leaf', carrot: 'Carrot', milk: 'Milk', bone: 'Bone', cheese: 'Cheese', fish: 'Fish',
        yellow: 'Yellow', blue: 'Blue', red: 'Red', purple: 'Purple', green: 'Green', pink: 'Pink', orange: 'Orange', white: 'White',
        happy: 'Happy', sad: 'Sad', sleepy: 'Sleepy' }
};
/* Koko's body parts are named the way you would for a bird (Russian: лапки, not ножки). */
const PART = {
  he: { feet: 'רגליים', eyes: 'עיניים', tail: 'זנב', wings: 'כנפיים', head: 'ראש' },
  ru: { feet: 'Лапки', eyes: 'Глазки', tail: 'Хвостик', wings: 'Крылышки', head: 'Головка' },
  en: { feet: 'Feet', eyes: 'Eyes', tail: 'Tail', wings: 'Wings', head: 'Head' }
};

/* Lines for items: [Koko's mix-up, the question, the answer]. Body items have only [question, answer];
   their mix-up is Koko's part line (part_feet...), said while the wrong part moves. */
const ITEM_LINES = {
  he: {
    c1: ['אני שם גרב... על הראש!', 'איפה שמים גרב?', 'נכון! גרב שמים על הרגל!'],
    c2: ['אני שם כובע... על הרגל!', 'איפה שמים כובע?', 'נכון! כובע שמים על הראש!'],
    c3: ['אני שם נעל... על היד!', 'איפה שמים נעל?', 'נכון! נעל שמים על הרגל!'],
    c4: ['אני שם כפפה... על הרגל!', 'איפה שמים כפפה?', 'נכון! כפפה שמים על היד!'],
    c5: ['אני שם משקפיים... על הרגל!', 'איפה שמים משקפיים?', 'נכון! משקפיים שמים על העיניים!'],
    h1: ['אני מצחצח שיניים... עם מברשת לשיער!', 'עם מה מצחצחים שיניים?', 'נכון! עם מברשת שיניים! צחצוח, צחצוח!'],
    h2: ['אני שותה מים... מתוך נעל!', 'ממה שותים מים?', 'נכון! שותים מכוס! גלוג גלוג!'],
    h3: ['אני אוכל מרק... עם מזלג!', 'עם מה אוכלים מרק?', 'נכון! אוכלים מרק עם כף! יאמי!'],
    h4: ['אני הולך לישון... באמבטיה!', 'איפה ישנים?', 'נכון! ישנים במיטה!'],
    h5: ['אני רוחץ ידיים... עם בננה!', 'עם מה רוחצים ידיים?', 'נכון! עם סבון! בועות, בועות!'],
    k1: ['תראו, בננה כחולה!', 'באיזה צבע הבננה?', 'נכון! הבננה צהובה! צהוב!'],
    k2: ['תראו, תות סגול!', 'באיזה צבע התות?', 'נכון! התות אדום! אדום!'],
    k3: ['תראו, עלה ורוד!', 'באיזה צבע העלה?', 'נכון! העלה ירוק! ירוק!'],
    k4: ['תראו, גזר כחול!', 'באיזה צבע הגזר?', 'נכון! הגזר כתום! כתום!'],
    k5: ['תראו, חלב ירוק!', 'באיזה צבע החלב?', 'נכון! החלב לבן! לבן!'],
    f1: ['הכלב רעב... אני נותן לו גזר!', 'מה הכלב אוכל?', 'נכון! הכלב אוכל עצם! יאמי!'],
    f2: ['הארנב רעב... אני נותן לו עצם!', 'מה הארנב אוכל?', 'נכון! הארנב אוכל גזר! כמה טעים!'],
    f3: ['הקוף רעב... אני נותן לו דג!', 'מה הקוף אוכל?', 'נכון! הקוף אוכל בננה! יאמי!'],
    f4: ['העכבר רעב... אני נותן לו בננה!', 'מה העכבר אוכל?', 'נכון! העכבר אוכל גבינה! יאמי יאמי!'],
    f5: ['החתול רעב... אני נותן לו גבינה!', 'מה החתול אוכל?', 'נכון! החתול אוכל דג! מממ, טעים!'],
    e1: ['יש לי בלון! אני מרגיש... עייף!', 'איך קוקו מרגיש?', 'נכון! קוקו שמח! שמח!'],
    e2: ['הבלון שלי עף... אני מרגיש... שמח!', 'איך קוקו מרגיש?', 'נכון! קוקו עצוב. חיבוק יעזור לו!'],
    e3: ['יש לי גלידה! אני מרגיש... עצוב!', 'איך קוקו מרגיש?', 'נכון! קוקו שמח! גלידה זה כיף!'],
    e4: ['הגלידה שלי נפלה... אני מרגיש... שמח!', 'איך קוקו מרגיש?', 'נכון! קוקו עצוב. בואו נחבק את קוקו!'],
    e5: ['אני מפהק... אני מרגיש... שמח!', 'איך קוקו מרגיש?', 'נכון! קוקו עייף. מפהקים יחד!'],
    b1: ['איפה הרגליים של קוקו?', 'נכון! הנה הרגליים! רוקעים, רוקעים!'],
    b2: ['איפה העיניים של קוקו?', 'נכון! הנה העיניים! מצמוץ, מצמוץ!'],
    b3: ['איפה הזנב של קוקו?', 'נכון! הנה הזנב! מכשכשים!'],
    b4: ['איפה הכנפיים של קוקו?', 'נכון! הנה הכנפיים! מנופפים!'],
    b5: ['איפה הראש של קוקו?', 'נכון! הנה הראש! מהנהנים: כן, כן!']
  },
  ru: {
    c1: ['Я надеваю носочек... на голову!', 'Куда надевают носочек?', 'Правильно! Носочек — на ножку!'],
    c2: ['Я надеваю шапку... на ножку!', 'Куда надевают шапку?', 'Правильно! Шапку — на голову!'],
    c3: ['Я надеваю ботинок... на ручку!', 'Куда надевают ботинок?', 'Правильно! Ботинок — на ножку!'],
    c4: ['Я надеваю варежку... на ножку!', 'Куда надевают варежку?', 'Правильно! Варежку — на ручку!'],
    c5: ['Я надеваю очки... на ножку!', 'Куда надевают очки?', 'Правильно! Очки — на глазки!'],
    h1: ['Я чищу зубки... расчёской!', 'Чем чистят зубки?', 'Правильно! Зубной щёткой! Чистим-чистим!'],
    h2: ['Я пью водичку... из ботинка!', 'Из чего пьют водичку?', 'Правильно! Из чашки! Буль-буль!'],
    h3: ['Я ем супчик... вилкой!', 'Чем едят супчик?', 'Правильно! Ложкой! Ням-ням!'],
    h4: ['Я ложусь спать... в ванну!', 'Где спят?', 'Правильно! Спят в кроватке!'],
    h5: ['Я мою ручки... бананом!', 'Чем моют ручки?', 'Правильно! Мылом! Сколько пузырей!'],
    k1: ['Смотрите, синий банан!', 'Какого цвета банан?', 'Правильно! Банан жёлтый!'],
    k2: ['Смотрите, фиолетовая клубничка!', 'Какого цвета клубничка?', 'Правильно! Клубничка красная!'],
    k3: ['Смотрите, розовый листик!', 'Какого цвета листик?', 'Правильно! Листик зелёный!'],
    k4: ['Смотрите, синяя морковка!', 'Какого цвета морковка?', 'Правильно! Морковка оранжевая!'],
    k5: ['Смотрите, зелёное молоко!', 'Какого цвета молоко?', 'Правильно! Молоко белое!'],
    f1: ['Собачка голодная... Дам ей морковку!', 'Что ест собачка?', 'Правильно! Собачка ест косточку! Ням-ням!'],
    f2: ['Зайчик голодный... Дам ему косточку!', 'Что ест зайчик?', 'Правильно! Зайчик ест морковку! Хрум-хрум!'],
    f3: ['Обезьянка голодная... Дам ей рыбку!', 'Что ест обезьянка?', 'Правильно! Обезьянка ест банан! Ням-ням!'],
    f4: ['Мышка голодная... Дам ей банан!', 'Что ест мышка?', 'Правильно! Мышка ест сыр! Ням-ням!'],
    f5: ['Котик голодный... Дам ему сыр!', 'Что ест котик?', 'Правильно! Котик ест рыбку! Вкусно!'],
    e1: ['У меня шарик! Я... сонный!', 'Какой сейчас Коко?', 'Правильно! Коко весёлый! Весёлый!'],
    e2: ['Мой шарик улетел... Я... весёлый!', 'Какой сейчас Коко?', 'Правильно! Коко грустный. Его надо обнять!'],
    e3: ['У меня мороженое! Я... грустный!', 'Какой сейчас Коко?', 'Правильно! Коко весёлый! Мороженое — это здорово!'],
    e4: ['Моё мороженое упало... Я... весёлый!', 'Какой сейчас Коко?', 'Правильно! Коко грустный. Давайте обнимем Коко!'],
    e5: ['Я зеваю... Я... весёлый!', 'Какой сейчас Коко?', 'Правильно! Коко сонный. Зеваем вместе!'],
    b1: ['Где у Коко лапки?', 'Правильно! Вот лапки! Топ-топ!'],
    b2: ['Где у Коко глазки?', 'Правильно! Вот глазки! Морг-морг!'],
    b3: ['Где у Коко хвостик?', 'Правильно! Вот хвостик! Виль-виль!'],
    b4: ['Где у Коко крылышки?', 'Правильно! Вот крылышки! Мах-мах!'],
    b5: ['Где у Коко головка?', 'Правильно! Вот головка! Кивает: да-да!']
  },
  en: {
    c1: ['I put my sock... on my head!', 'Where does a sock go?', 'Yes! A sock goes on your foot!'],
    c2: ['I put my hat... on my foot!', 'Where does a hat go?', 'Yes! A hat goes on your head!'],
    c3: ['I put my shoe... on my hand!', 'Where does a shoe go?', 'Yes! A shoe goes on your foot!'],
    c4: ['I put my mitten... on my foot!', 'Where does a mitten go?', 'Yes! A mitten goes on your hand!'],
    c5: ['I put my glasses... on my foot!', 'Where do glasses go?', 'Yes! Glasses go on your eyes!'],
    h1: ['I brush my teeth... with a hairbrush!', 'What do we brush teeth with?', 'Yes! With a toothbrush! Brush, brush!'],
    h2: ['I drink water... from a shoe!', 'What do we drink from?', 'Yes! From a cup! Glug, glug!'],
    h3: ['I eat my soup... with a fork!', 'What do we eat soup with?', 'Yes! With a spoon! Yum!'],
    h4: ['I go to sleep... in the bathtub!', 'Where do we sleep?', 'Yes! We sleep in a bed!'],
    h5: ['I wash my hands... with a banana!', 'What do we wash hands with?', 'Yes! With soap! Bubbles!'],
    k1: ['Look, a blue banana!', 'What color is a banana?', 'Yes! A banana is yellow!'],
    k2: ['Look, a purple strawberry!', 'What color is a strawberry?', 'Yes! A strawberry is red!'],
    k3: ['Look, a pink leaf!', 'What color is a leaf?', 'Yes! A leaf is green!'],
    k4: ['Look, a blue carrot!', 'What color is a carrot?', 'Yes! A carrot is orange!'],
    k5: ['Look, green milk!', 'What color is milk?', 'Yes! Milk is white!'],
    f1: ["The dog is hungry... I'll give him a carrot!", 'What does the dog eat?', 'Yes! The dog eats a bone! Yum!'],
    f2: ["The rabbit is hungry... I'll give him a bone!", 'What does the rabbit eat?', 'Yes! The rabbit eats a carrot! Crunch, crunch!'],
    f3: ["The monkey is hungry... I'll give him a fish!", 'What does the monkey eat?', 'Yes! The monkey eats a banana! Yum!'],
    f4: ["The mouse is hungry... I'll give him a banana!", 'What does the mouse eat?', 'Yes! The mouse eats cheese! Nibble, nibble!'],
    f5: ["The cat is hungry... I'll give him cheese!", 'What does the cat eat?', 'Yes! The cat eats a fish! Yum!'],
    e1: ['I got a balloon! I feel... sleepy!', 'How does Koko feel?', 'Yes! Koko feels happy! Happy!'],
    e2: ['My balloon flew away... I feel... happy!', 'How does Koko feel?', 'Yes! Koko feels sad. A hug will help!'],
    e3: ['I got ice cream! I feel... sad!', 'How does Koko feel?', 'Yes! Koko feels happy! Ice cream is fun!'],
    e4: ['My ice cream fell... I feel... happy!', 'How does Koko feel?', "Yes! Koko feels sad. Let's give Koko a hug!"],
    e5: ["I'm yawning... I feel... happy!", 'How does Koko feel?', "Yes! Koko feels sleepy. Let's yawn together!"],
    b1: ["Where are Koko's feet?", 'Yes! Here are the feet! Stomp, stomp!'],
    b2: ["Where are Koko's eyes?", 'Yes! Here are the eyes! Blink, blink!'],
    b3: ["Where is Koko's tail?", 'Yes! Here is the tail! Wiggle, wiggle!'],
    b4: ["Where are Koko's wings?", 'Yes! Here are the wings! Flap, flap!'],
    b5: ["Where is Koko's head?", 'Yes! Here is the head! Nod, nod!']
  }
};

/* Everything else Koko says. */
const SAY = {
  he: {
    greet: 'שלום! אני קוקו התוכי. אני קצת מתבלבל... תעזרו לי?',
    greetName: n => `שלום ${n}! אני קוקו התוכי. אני קצת מתבלבל... תעזרו לי?`,
    oops: 'הממ... לא נראה לי.',
    bye: 'תודה שעזרתם לי! עכשיו תורכם לשחק ביחד.',
    end: 'אני עייף... לילה טוב!',
    recall: 'ועכשיו... אתם זוכרים?',
    recall_yes: 'נכון! אתם זוכרים!',
    r_animals: 'בואו נשחק בחיות!', r_clothes: 'עכשיו אני מתלבש!', r_home: 'ועכשיו... דברים בבית!', r_colors: 'בואו נשחק בצבעים!',
    r_food: 'החיות רעבות! בואו נאכיל אותן!', r_vehicles: 'בואו נשחק בכלי רכב!', r_feelings: 'ועכשיו... איך קוקו מרגיש?', r_body: 'משחק חדש: נוגעים בקוקו!',
    talk_animals: 'עכשיו תורכם! איזו חיה אתם אוהבים? ומה היא עושה?',
    talk_clothes: 'עכשיו תורכם! מה אתם לובשים עכשיו?',
    talk_home: 'עכשיו תורכם! ממה אתם שותים?',
    talk_colors: 'עכשיו תורכם! מה יש בחדר בצבע צהוב?',
    talk_food: 'עכשיו תורכם! מה אתם אוהבים לאכול?',
    talk_vehicles: 'עכשיו תורכם! איך עושה מכונית? ואיך עושה רכבת?',
    talk_feelings: 'עכשיו תורכם! תראו לי פרצוף שמח... ועכשיו פרצוף עצוב!',
    talk_body: 'עכשיו תורכם! איפה הרגליים שלכם? ואיפה העיניים?',
    part_feet: 'הנה הרגליים שלי!', part_eyes: 'הנה העיניים שלי!', part_tail: 'הנה הזנב שלי!', part_wings: 'הנה הכנפיים שלי!', part_head: 'הנה הראש שלי!',
    mv_flap: 'זמן לזוז! נופפו בכנפיים כמו קוקו!', mv_jump: 'זמן לזוז! קופצים כמו צפרדע!', mv_spin: 'זמן לזוז! מסתובבים סביב סביב!',
    mv_stomp: 'זמן לזוז! רוקעים ברגליים כמו פיל!', mv_tall: 'זמן לזוז! נמתחים גבוה, גבוה!', mv_small: 'זמן לזוז! מתכווצים קטן, קטן!',
    mv_count: 'אחת, שתיים, שלוש, ארבע, חמש!',
    mv_done: 'יופי של תנועה! ממשיכים.'
  },
  ru: {
    greet: 'Привет! Я попугай Коко. Я всё путаю... Поможете мне?',
    greetName: n => `Привет, ${n}! Я попугай Коко. Я всё путаю... Поможешь мне?`,
    oops: 'Хм... кажется, нет.',
    bye: 'Спасибо, что помогли! А теперь поиграйте вместе.',
    end: 'Я устал... Спокойной ночи!',
    recall: 'А теперь... вы помните?',
    recall_yes: 'Правильно! Вы помните!',
    r_animals: 'Давайте играть в зверюшек!', r_clothes: 'А теперь я одеваюсь!', r_home: 'А теперь... вещи дома!', r_colors: 'Давайте играть в цвета!',
    r_food: 'Зверюшки проголодались! Покормим их?', r_vehicles: 'Поехали! Играем в транспорт!', r_feelings: 'А теперь... какое у Коко настроение?', r_body: 'Новая игра: дотронься до Коко!',
    talk_animals: 'Теперь ваша очередь! Какую зверюшку ты любишь? Как она говорит?',
    talk_clothes: 'Теперь ваша очередь! Что на тебе сейчас надето?',
    talk_home: 'Теперь ваша очередь! Из чего ты пьёшь?',
    talk_colors: 'Теперь ваша очередь! Что в комнате жёлтое?',
    talk_food: 'Теперь ваша очередь! Что ты любишь кушать?',
    talk_vehicles: 'Теперь ваша очередь! Как говорит машинка? А паровозик?',
    talk_feelings: 'Теперь ваша очередь! Покажи весёлое лицо... А теперь грустное!',
    talk_body: 'Теперь ваша очередь! Где твои ножки? А где глазки?',
    part_feet: 'Вот мои лапки!', part_eyes: 'Вот мои глазки!', part_tail: 'Вот мой хвостик!', part_wings: 'Вот мои крылышки!', part_head: 'Вот моя головка!',
    mv_flap: 'Время двигаться! Машем крылышками, как Коко!', mv_jump: 'Время двигаться! Прыгаем, как лягушка!', mv_spin: 'Время двигаться! Кружимся-кружимся!',
    mv_stomp: 'Время двигаться! Топаем, как слон!', mv_tall: 'Время двигаться! Тянемся высоко-высоко!', mv_small: 'Время двигаться! Становимся маленькими-маленькими!',
    mv_count: 'Раз, два, три, четыре, пять!',
    mv_done: 'Молодцы! Играем дальше.'
  },
  en: {
    greet: "Hi! I'm Koko the parrot. I mix things up... Will you help me?",
    greetName: n => `Hi ${n}! I'm Koko the parrot. I mix things up... Will you help me?`,
    oops: "Hmm... I don't think so.",
    bye: 'Thank you for helping me! Now go play together.',
    end: "I'm sleepy... Good night!",
    recall: 'Now... do you remember?',
    recall_yes: 'Yes! You remembered!',
    r_animals: "Let's play with animals!", r_clothes: "Now I'm getting dressed!", r_home: 'Now... things at home!', r_colors: "Let's play with colors!",
    r_food: "The animals are hungry! Let's feed them!", r_vehicles: "Let's play with things that go!", r_feelings: 'Now... how does Koko feel?', r_body: 'New game: touch Koko!',
    talk_animals: 'Your turn! Which animal do you like? What does it say?',
    talk_clothes: 'Your turn! What are you wearing right now?',
    talk_home: 'Your turn! What do you drink from?',
    talk_colors: "Your turn! What's yellow in the room?",
    talk_food: 'Your turn! What do you like to eat?',
    talk_vehicles: 'Your turn! What does a car say? And a train?',
    talk_feelings: 'Your turn! Show me a happy face... Now a sad face!',
    talk_body: 'Your turn! Where are your feet? Where are your eyes?',
    part_feet: 'Here are my feet!', part_eyes: 'Here are my eyes!', part_tail: 'Here is my tail!', part_wings: 'Here are my wings!', part_head: 'Here is my head!',
    mv_flap: 'Time to move! Flap your wings like Koko!', mv_jump: 'Time to move! Jump like a frog!', mv_spin: 'Time to move! Spin around and around!',
    mv_stomp: 'Time to move! Stomp like an elephant!', mv_tall: 'Time to move! Stretch up tall, tall, tall!', mv_small: 'Time to move! Make yourself small, small, small!',
    mv_count: 'One, two, three, four, five!',
    mv_done: "Great moving! Let's keep playing."
  }
};

/* Some written forms read badly in device voices; these are what the voice should say instead. */
const SPOKEN = {
  he: { oops: 'אֶמ... לא נראה לי.', 'k1_yes': 'נכון! הבננה צהובה! צָהוֹב!', h2_yes: 'נכון! שותים מכוס! גְּלוּג, גְּלוּג!', h3_yes: 'נכון! אוכלים מרק עם כַּף! יַאמִי!',
        f1_yes: 'נכון! הכלב אוכל עֶצֶם! יַאמִי!', f3_yes: 'נכון! הקוף אוכל בננה! יַאמִי!', f4_yes: 'נכון! העכבר אוכל גבינה! יַאמִי יַאמִי!', f5_yes: 'נכון! החתול אוכל דָּג! מְמְמ, טָעִים!',
        f2_say: 'הארנב רעב... אני נותן לו עֶצֶם!', e4_yes: 'נכון! קוקו עצוב. בואו נְחַבֵּק את קוקו!' },
  ru: {},
  en: {}
};

/* ---------- interface text ---------- */
const UI = {
  he: {
    docTitle: 'קוקו התוכי', t1: 'קוקו', t2: 'התוכי', tag: 'קוקו מתבלבל. אתם מתקנים.',
    meta: ['להורה וילד יחד', 'גילאי \u20662–3\u2069', 'כ־6 דקות', 'בלי פרסומות'], metaShort: 'כ־4 דקות',
    play: 'מתחילים לשחק', parentAria: 'אזור הורים. החזיקו לחוץ כדי לפתוח', homeAria: 'חזרה למסך הפתיחה. החזיקו לחוץ', holding: 'ממשיכים להחזיק…',
    langAria: 'השפה של קוקו',
    noVoice: 'אין במכשיר קול בשפה הזאת, אז קוקו יכתוב בבועה. באזור ההורים אפשר להקליט את הקול שלכם.',
    progress: (d, n) => `התקדמות: ${d} מתוך ${n}`,
    cat: { animals: 'חיות', clothes: 'בגדים', home: 'בבית', colors: 'צבעים', food: 'אוכל', vehicles: 'כלי רכב', feelings: 'רגשות', body: 'הגוף של קוקו' },
    talkTitle: 'רגע של שיחה', talkTip: {
      animals: 'הקשיבו לתשובה והוסיפו מילה: "כן! כלב גדול! הוא עושה הב הב!"',
      clothes: 'הצביעו יחד על הבגדים וקראו להם בשם: "הנה הגרב! על הרגל!"',
      home: 'הראו בתנועה: "ככה שותים מכוס!" ותנו לילד לחקות.',
      colors: 'חפשו יחד משהו צהוב. כשהילד מצביע, הוסיפו מילים: "כן, כדור צהוב!"',
      food: 'הקשיבו למה שהילד אוהב לאכול והוסיפו מילה: "כן! בננה צהובה!"',
      vehicles: 'עשו יחד את הקולות: "בִּיפּ בִּיפּ!" ואחר כך חפשו כלי רכב בחלון.',
      feelings: 'עשו יחד פרצוף שמח ופרצוף עצוב, ותנו לרגש שם: "אתה עצוב? בוא נתחבק."',
      body: 'הצביעו על הגוף שלכם ושל הילד: "איפה העיניים? הנה הן!"' },
    cont: 'ממשיכים', moveTitle: 'זמן לזוז', moveTip: 'קומו וזוזו יחד עם הילד', recallTitle: 'זוכרים?',
    endTitle: 'קוקו הלך לישון', missionLabel: 'המשימה שלכם עכשיו, בלי מסך',
    missionWhy: 'ילדים בגיל הזה לומדים ממסך פחות מאשר מהעולם האמיתי. המשימה מעבירה את מה שתרגלתם אל הבית.',
    words: 'מילים שתרגלנו היום', played: m => (m <= 1 ? 'שיחקתם בערך דקה.' : `שיחקתם בערך ${m} דקות.`),
    again: 'משחק נוסף: החזיקו לחוץ', againAria: 'משחק נוסף. החזיקו לחוץ',
    restTitle: 'קוקו נח עכשיו', restText: (g, m) => `היום שיחקתם ${g === 1 ? 'משחק אחד' : g + ' משחקים'}, בערך ${m} דקות. זה זמן טוב לשחק בלי מסך.`,
    restHold: 'הורים: החזיקו כדי לשחק בכל זאת',
    missions: {
      animals: ['עכשיו אתם קוקו', 'תגידו לילד "הכלב עושה מיאו!" ותנו לו לתקן אתכם. אחר כך מתחלפים: הוא קוקו, ואתם מתקנים.'],
      clothes: ['מתלבשים הפוך', 'הביאו גרב, כובע ונעל. שימו אותם במקום הלא נכון, ותנו לילד לסדר אותם.'],
      home: ['צחצוח אמיתי', 'לכו לצחצח שיניים עם המברשת הנכונה. בדרך שאלו: "במה קוקו התבלבל?"'],
      colors: ['ציד צבעים', 'מצאו בבית שלושה דברים צהובים. כל פעם שמוצאים, אומרים יחד: "צהוב!"'],
      food: ['ארוחה לבובות', 'הושיבו בובות ליד שולחן ותנו לילד להאכיל אותן. אתם קוקו: הציעו לדובי נעל, והילד יתקן.'],
      vehicles: ['טיול של קולות', 'צאו להליכה קצרה וחפשו כלי רכב. כל פעם שרואים אחד, עושים יחד את הקול שלו.'],
      feelings: ['פרצופים במראה', 'עמדו יחד מול מראה: פרצוף שמח, עצוב ועייף. כל פעם אומרים את שם הרגש.'],
      body: ['ראש, כתפיים', 'שירו יחד "ראש, כתפיים, ברכיים ורגליים" ונגעו בכל חלק. אחר כך התבלבלו בכוונה, והילד יתקן.'] },
    sheet: 'אזור הורים', close: 'סגירה', tabs: { together: 'ביחד', progress: 'התקדמות', voice: 'קול', settings: 'הגדרות' },
    howTitle: 'איך משחקים ביחד', how: ['שבו ליד הילד ותנו לו לגעת בתשובה בעצמו.', 'צחקו יחד מהטעויות של קוקו. ברגעי השיחה, הקשיבו והוסיפו מילה אחת.', 'קומו לזוז כשקוקו מבקש, ובסוף עשו את המשימה שעל המסך, בלי מסך.'],
    whyTitle: 'למה זה בנוי ככה', why: [
      ['הילד מתקן, לא נבחן', 'פעוטות מגיל שנה וחצי מבחינים בין בדיחה לטעות, ומתקנים טעויות. קוקו טועה, הילד הוא המומחה.'],
      ['חוזרים על מילים, במרווחים', 'פעוטות בני שנתיים זכרו מילים טוב יותר כשהן חזרו במרווחים ולא ברצף. קוקו מחזיר מילים שהיה קשה איתן, ובסוף כל משחק שואל "זוכרים?".'],
      ['שפה אחת בכל משחק', 'מחקרים על פעוטות דו־לשוניים מצאו שערבוב שפות באותו משפט מקשה ללמוד מילה חדשה. אז קוקו מדבר שפה אחת בכל משחק, ואת שאר השפות מוצאים בדף ההתקדמות.'],
      ['ציורים קרובים למציאות', 'פעוטות מעבירים מילה מתמונה לחפץ אמיתי טוב יותר כשהתמונה מציאותית. לכן החיות והחפצים מצוירים בצבעים ובפרופורציות אמיתיים, ורק קוקו הוא דמות מצוירת.'],
      ['קוקו מסתכל על מה שהוא אומר', 'פעוטות מבינים לאיזה דבר מתכוונת מילה חדשה לפי המבט של מי שאומר אותה. קוקו מסתכל ומצביע על הדבר שהוא מדבר עליו.'],
      ['חבר אחד קבוע', 'פעוטות למדו יותר מדמות שהכירו מאשר מדמות חדשה. לכן יש במשחק דמות אחת, קוקו, בכל הסבבים.'],
      ['לאט, בכוונה', 'ילדים בני 4 שצפו בסרט מצויר מהיר התקשו להתרכז מיד אחריו. במשחק אין מעברים מהירים, וקוקו מחכה לילד.'],
      ['מסך רגוע', 'בכיתה מקושטת מאוד ילדי גן הוסחו יותר ולמדו פחות. הרקעים רכים וחיוורים, ורק מה שלומדים צבעוני ומודגש.'],
      ['מילים לרגשות', 'ילדים שמדברים איתם בבית על רגשות מבינים רגשות טוב יותר בהמשך. סבב הרגשות נותן לרגש שם, ורגע השיחה מזמין לדבר עליו.'],
      ['שקט ברקע', 'רעש ודיבור ברקע פוגעים בלמידת מילים בגיל שנתיים. אין מוזיקת רקע, והצלילים רק ממחישים פעולה: נשיכה, צפירה, פעמון.'],
      ['האנימציה מראה את התשובה', 'אנימציות שממחישות את התוכן עוזרות, ו"הפתעות" לחיצות שלא קשורות לתוכן מסיחות. לכן הגרב עוברת לרגל, ואין כוכבים וקונפטי.'],
      ['שיחה, תנועה וסוף ברור', 'הורים מדברים פחות עם הילד מול מסך, אז קוקו עוצר לשיחה. ארגון הבריאות העולמי ממליץ על הרבה תנועה, אז יש הפסקת תנועה. והמשחק נגמר לבד, בלי פרסים שמושכים לעוד.']],
    privacyTitle: 'פרטיות ובטיחות', privacy: 'המשחק לא שולח מידע לשום מקום, אין בו פרסומות ואין בו קישורים החוצה. השם, ההתקדמות וההקלטות נשמרים רק במכשיר הזה.',
    lockTip: 'כדי שהילד לא ייצא בטעות: באייפון הפעילו "גישה מודרכת" (Guided Access), ובאנדרואיד "הצמדת מסך".',
    installTitle: 'התקנה על הטלפון', installIos: 'אייפון, בספארי: כפתור השיתוף ← "הוספה למסך הבית".', installAndroid: 'אנדרואיד, בכרום: תפריט ⋮ ← "הוספה למסך הבית".', installOffline: 'אחרי ההתקנה המשחק עובד גם בלי אינטרנט.',
    today: 'היום', week: '7 הימים האחרונים', gamesN: n => (n === 1 ? 'משחק אחד' : `${n} משחקים`), minN: n => `${n} דק׳`,
    guideline: 'ההמלצה לגילאי \u20662–5\u2069: עד שעה מסך ביום בסך הכול, פחות עדיף.',
    wordsTitle: 'מילים', status: { new: 'עוד לא', practicing: 'מתרגלים', knows: 'יודע' },
    reset: 'איפוס ההתקדמות', resetConfirm: 'לחצו שוב כדי לאפס', resetDone: 'ההתקדמות אופסה.',
    vPack: 'קוקו מדבר בקול מוקלט באיכות גבוהה. קול המכשיר משמש רק כגיבוי.', vNoTTS: 'בדפדפן הזה אין הקראה. קוקו יכתוב בבועה.',
    vDevice: n => `קוקו מדבר בקול המכשיר: ${n}`, vNone: 'לא נמצא במכשיר קול בשפה הזאת. קוקו יכתוב בבועה, ואפשר להקליט את הקול שלכם.', vTrying: 'קוקו ינסה לדבר בקול המכשיר.',
    voiceLabel: 'קול המכשיר', recommended: '(מומלץ)', rateLabel: 'קצב הדיבור של קול המכשיר', test: 'השמיעו דוגמה',
    tipsIntro: 'הקול הבסיסי של המכשיר נשמע רובוטי. קול משופר נשמע הרבה יותר טבעי, וההורדה חינמית:',
    tipIos: 'אייפון: Settings › Accessibility › Spoken Content › Voices, בחרו את השפה והורידו קול Enhanced או Premium. אחרי ההורדה בחרו אותו כאן.',
    tipAndroid: 'אנדרואיד: הגדרות › הקראת טקסט (Text-to-speech) › מנוע: Speech Services by Google, והתקינו את הקול.',
    tipRecord: 'והכי טוב: הקליטו את המשפטים בקול שלכם, למטה.',
    recTitle: 'הקול שלכם', recIntro: 'אפשר להקליט כל משפט של קוקו בקול שלכם. משפט שלא הוקלט יושמע בקול הרגיל. כל הקלטה עד 8 שניות, והשקט בהתחלה ובסוף נחתך לבד.',
    rec: 'הקלטה', stop: 'עצירה', playRec: 'השמעה', del: 'מחיקה', delAria: 'מחיקת ההקלטה', recorded: 'הוקלט', saved: 'נשמר.', deleted: 'ההקלטה נמחקה.',
    noMic: 'אין גישה למיקרופון. אשרו גישה למיקרופון בהגדרות הדפדפן ונסו שוב.', noRecDevice: 'המכשיר הזה לא תומך בהקלטה.', notSaved: 'ההקלטה תעבוד עד שתסגרו את המשחק, אבל לא נשמרה במכשיר.',
    recEmbed: 'הקלטת קול זמינה בגרסה שמותקנת על הטלפון. בתצוגה הזאת קוקו מדבר בקול המכשיר.', recUnsupported: 'הדפדפן הזה לא תומך בהקלטת קול.',
    groups: { start: 'פתיחה', move: 'תנועה', end: 'סיום ותגובות' },
    nameLabel: 'שם הילד (קוקו יגיד לו שלום)', namePh: 'למשל: נועה', langLabel: 'השפה של קוקו',
    lengthLabel: 'אורך משחק', lengthShort: 'קצר (כ־4 דקות)', lengthLong: 'רגיל (כ־6 דקות)',
    levelLabel: 'רמת קושי', levelAuto: 'אוטומטית: מוסיפה תשובה שלישית כשמילה כבר ידועה', levelEasy: 'תמיד שתי תשובות', levelHard: 'תמיד שלוש תשובות',
    limitLabel: 'כמה משחקים ביום', limitOff: 'בלי הגבלה', limitN: n => (n === 1 ? 'משחק אחד' : `${n} משחקים`),
    sfxLabel: 'צלילי פעולה (נשיכה, צפירה, פעמון)', sfxOn: 'פועלים', sfxOff: 'כבויים',
    footer: 'קוקו התוכי · נבנה בקהילת אבא AI · גרסה 3.0'
  },
  ru: {
    docTitle: 'Попугай Коко', t1: 'Коко', t2: 'попугай', tag: 'Коко путает. Вы поправляете.',
    meta: ['Для мамы, папы и малыша', '2–3 года', '~6 минут', 'Без рекламы'], metaShort: '~4 минуты',
    play: 'Начать игру', parentAria: 'Для родителей. Удерживайте, чтобы открыть', homeAria: 'На главный экран. Удерживайте', holding: 'Держите дальше…',
    langAria: 'Язык Коко',
    noVoice: 'На устройстве нет голоса для этого языка, поэтому Коко будет писать в облачке. В разделе для родителей можно записать свой голос.',
    progress: (d, n) => `Пройдено ${d} из ${n}`,
    cat: { animals: 'Зверюшки', clothes: 'Одежда', home: 'Дома', colors: 'Цвета', food: 'Еда', vehicles: 'Транспорт', feelings: 'Чувства', body: 'Тело Коко' },
    talkTitle: 'Поговорим', talkTip: {
      animals: 'Выслушайте ответ и добавьте слово: «Да! Большая собачка! Она говорит гав-гав!»',
      clothes: 'Покажите вместе на одежду и назовите её: «Вот носочек! На ножке!»',
      home: 'Покажите жестом: «Вот так пьём из чашки!» — и пусть малыш повторит.',
      colors: 'Найдите вместе что-то жёлтое. Когда малыш покажет, добавьте слова: «Да, жёлтый мячик!»',
      food: 'Выслушайте, что малыш любит кушать, и добавьте слово: «Да! Жёлтый банан!»',
      vehicles: 'Изобразите звуки вместе: «Би-би!» — а потом поищите транспорт за окном.',
      feelings: 'Покажите вместе весёлое и грустное лицо и назовите чувство: «Тебе грустно? Давай обнимемся».',
      body: 'Показывайте на себе и на малыше: «Где глазки? Вот они!»' },
    cont: 'Дальше', moveTitle: 'Подвигаемся', moveTip: 'Встаньте и двигайтесь вместе с малышом', recallTitle: 'Помните?',
    endTitle: 'Коко уснул', missionLabel: 'Ваше задание — уже без экрана',
    missionWhy: 'Малыши этого возраста учатся с экрана хуже, чем в реальном мире. Задание переносит то, что вы повторили, в жизнь.',
    words: 'Слова, которые мы повторили', played: m => (m <= 1 ? 'Вы играли примерно минуту.' : `Вы играли примерно ${m} мин.`),
    again: 'Ещё раз: удерживайте', againAria: 'Ещё одна игра. Удерживайте',
    restTitle: 'Коко отдыхает', restText: (g, m) => `Сегодня игр: ${g}, примерно ${m} мин. Самое время поиграть без экрана.`,
    restHold: 'Родители: удерживайте, чтобы всё же играть',
    missions: {
      animals: ['Теперь вы — Коко', 'Скажите малышу: «Собачка говорит мяу!» — и пусть он вас поправит. Потом поменяйтесь: он Коко, а вы поправляете.'],
      clothes: ['Одеваемся наоборот', 'Возьмите носок, шапку и ботинок. Наденьте их не туда — пусть малыш всё исправит.'],
      home: ['Настоящая чистка зубов', 'Почистите зубки правильной щёткой. По дороге спросите: «Что перепутал Коко?»'],
      colors: ['Охота на цвета', 'Найдите дома три жёлтые вещи. Каждый раз говорите вместе: «Жёлтый!»'],
      food: ['Обед для игрушек', 'Посадите игрушки за стол, пусть малыш их кормит. Вы — Коко: предложите мишке ботинок, а малыш поправит.'],
      vehicles: ['Прогулка звуков', 'Выйдите на короткую прогулку и ищите транспорт. Увидели — изобразите его звук вместе.'],
      feelings: ['Рожицы у зеркала', 'Встаньте вместе перед зеркалом: весёлое лицо, грустное, сонное. Каждый раз называйте чувство.'],
      body: ['Голова, плечи', 'Спойте вместе «Голова, плечи, колени и пальцы», трогая каждую часть. Потом нарочно перепутайте — пусть малыш поправит.'] },
    sheet: 'Для родителей', close: 'Закрыть', tabs: { together: 'Вместе', progress: 'Успехи', voice: 'Голос', settings: 'Настройки' },
    howTitle: 'Как играть вместе', how: ['Сядьте рядом и дайте малышу самому нажать на ответ.', 'Смейтесь вместе над ошибками Коко. Когда Коко просит поговорить — выслушайте и добавьте одно слово.', 'Вставайте подвигаться, когда Коко зовёт, а в конце сделайте задание — уже без экрана.'],
    whyTitle: 'Почему игра устроена так', why: [
      ['Малыш поправляет, а не сдаёт экзамен', 'Уже с полутора лет дети отличают шутку от ошибки и поправляют ошибки. Коко ошибается — малыш знает лучше.'],
      ['Слова повторяются с паузами', 'Двухлетки лучше запоминали слова, когда повторы были разнесены во времени, а не подряд. Коко возвращает трудные слова и в конце спрашивает: «Помните?»'],
      ['Один язык за игру', 'Исследования двуязычных малышей показали: смешивание языков в одной фразе мешает выучить новое слово. Поэтому Коко говорит на одном языке за игру, а переводы есть на странице «Успехи».'],
      ['Рисунки близки к жизни', 'Малыши лучше переносят слово с картинки на настоящую вещь, когда картинка реалистичная. Поэтому зверюшки и вещи нарисованы в настоящих цветах и пропорциях, и только Коко — мультяшный.'],
      ['Коко смотрит на то, о чём говорит', 'Малыши понимают, к чему относится новое слово, по взгляду того, кто его говорит. Коко смотрит и показывает крылом на то, о чём говорит.'],
      ['Один знакомый друг', 'Малыши лучше учились у знакомого персонажа, чем у нового. Поэтому в игре один герой — Коко — во всех раундах.'],
      ['Медленно, нарочно', 'Четырёхлетним детям после быстрого мультфильма было труднее сосредоточиться. В игре нет быстрых смен кадра, и Коко ждёт малыша.'],
      ['Спокойный экран', 'В сильно украшенном классе дошкольники больше отвлекались и меньше запоминали. Фоны мягкие и бледные, а яркое и чёткое — только то, что учим.'],
      ['Слова для чувств', 'Дети, с которыми дома говорят о чувствах, потом лучше понимают чувства. Раунд «Чувства» даёт чувству название, а пауза для разговора помогает о нём поговорить.'],
      ['Тишина на фоне', 'Фоновый шум и речь мешают двухлеткам учить слова. Фоновой музыки нет, а звуки только показывают действие: хруст, гудок, звонок.'],
      ['Анимация показывает ответ', 'Анимация, которая иллюстрирует содержание, помогает, а «сюрпризы» не по теме отвлекают. Поэтому носочек переезжает на ножку, а звёздочек и конфетти нет.'],
      ['Разговор, движение и понятный конец', 'С экраном родители разговаривают с ребёнком меньше, поэтому Коко делает паузу для разговора. ВОЗ советует много двигаться — есть пауза для движения. А игра заканчивается сама, без наград, которые тянут играть ещё.']],
    privacyTitle: 'Приватность и безопасность', privacy: 'Игра никуда не отправляет данные, в ней нет рекламы и ссылок наружу. Имя, успехи и записи хранятся только на этом устройстве.',
    lockTip: 'Чтобы малыш случайно не вышел: на iPhone включите «Гид-доступ» (Guided Access), на Android — «Закрепление экрана».',
    installTitle: 'Установка на телефон', installIos: 'iPhone, в Safari: «Поделиться» → «На экран „Домой“».', installAndroid: 'Android, в Chrome: меню ⋮ → «Добавить на главный экран».', installOffline: 'После установки игра работает и без интернета.',
    today: 'Сегодня', week: 'Последние 7 дней', gamesN: n => `игр: ${n}`, minN: n => `${n} мин`,
    guideline: 'Рекомендация для 2–5 лет: не больше часа экрана в день в сумме, лучше меньше.',
    wordsTitle: 'Слова', status: { new: 'ещё нет', practicing: 'учим', knows: 'знает' },
    reset: 'Сбросить успехи', resetConfirm: 'Нажмите ещё раз, чтобы сбросить', resetDone: 'Успехи сброшены.',
    vPack: 'Коко говорит записанным голосом высокого качества. Голос устройства — только запасной.', vNoTTS: 'В этом браузере нет озвучки. Коко будет писать в облачке.',
    vDevice: n => `Коко говорит голосом устройства: ${n}`, vNone: 'На устройстве нет голоса для этого языка. Коко будет писать в облачке, а вы можете записать свой голос.', vTrying: 'Коко попробует говорить голосом устройства.',
    voiceLabel: 'Голос устройства', recommended: '(рекомендуем)', rateLabel: 'Скорость речи голоса устройства', test: 'Прослушать пример',
    tipsIntro: 'Базовый голос устройства звучит как робот. Улучшенный голос звучит намного естественнее, и он бесплатный:',
    tipIos: 'iPhone: Настройки › Универсальный доступ › Устный контент › Голоса — выберите язык и скачайте голос «Улучшенный» или Premium. Потом выберите его здесь.',
    tipAndroid: 'Android: Настройки › Синтез речи (Text-to-speech) › движок Speech Services by Google — установите голос.',
    tipRecord: 'А лучше всего — запишите фразы своим голосом, ниже.',
    recTitle: 'Ваш голос', recIntro: 'Можно записать любую фразу Коко своим голосом. Фразы без записи звучат обычным голосом. Запись — до 8 секунд, тишина в начале и в конце обрезается сама.',
    rec: 'Запись', stop: 'Стоп', playRec: 'Слушать', del: 'Удалить', delAria: 'Удалить запись', recorded: 'записано', saved: 'Сохранено.', deleted: 'Запись удалена.',
    noMic: 'Нет доступа к микрофону. Разрешите доступ в настройках браузера и попробуйте снова.', noRecDevice: 'Это устройство не поддерживает запись.', notSaved: 'Запись будет работать до закрытия игры, но не сохранилась на устройстве.',
    recEmbed: 'Запись голоса доступна в версии, установленной на телефон. Здесь Коко говорит голосом устройства.', recUnsupported: 'Этот браузер не поддерживает запись голоса.',
    groups: { start: 'Начало', move: 'Движение', end: 'Конец и ответы' },
    nameLabel: 'Имя малыша (Коко с ним поздоровается)', namePh: 'например: Миша', langLabel: 'Язык Коко',
    lengthLabel: 'Длина игры', lengthShort: 'Короткая (~4 минуты)', lengthLong: 'Обычная (~6 минут)',
    levelLabel: 'Сложность', levelAuto: 'Авто: третий ответ, когда слово уже знакомо', levelEasy: 'Всегда два ответа', levelHard: 'Всегда три ответа',
    limitLabel: 'Игр в день', limitOff: 'Без ограничения', limitN: n => (n === 1 ? '1 игра' : `${n} игры`),
    sfxLabel: 'Звуки действий (хруст, гудок, звонок)', sfxOn: 'Включены', sfxOff: 'Выключены',
    footer: 'Попугай Коко · сделано в сообществе «Папа AI» · версия 3.0'
  },
  en: {
    docTitle: 'Koko the Parrot', t1: 'Koko', t2: 'the Parrot', tag: 'Koko mixes things up. You fix them.',
    meta: ['Grown-up and child together', 'Ages 2–3', 'About 6 minutes', 'No ads'], metaShort: 'About 4 minutes',
    play: 'Start playing', parentAria: 'Grown-ups. Press and hold to open', homeAria: 'Back to the start. Press and hold', holding: 'Keep holding…',
    langAria: "Koko's language",
    noVoice: "This device has no voice for this language, so Koko will write in the bubble. You can record your own voice in the grown-ups area.",
    progress: (d, n) => `Progress: ${d} of ${n}`,
    cat: { animals: 'Animals', clothes: 'Clothes', home: 'At home', colors: 'Colors', food: 'Food', vehicles: 'Things that go', feelings: 'Feelings', body: "Koko's body" },
    talkTitle: 'Talk time', talkTip: {
      animals: 'Listen to the answer, then add a word: "Yes! A big dog! It says woof woof!"',
      clothes: 'Point to clothes together and name them: "Here\'s your sock! On your foot!"',
      home: 'Act it out: "This is how we drink from a cup!" and let your child copy you.',
      colors: 'Look for something yellow together. When your child points, add words: "Yes, a yellow ball!"',
      food: 'Listen to what your child likes to eat, then add a word: "Yes! A yellow banana!"',
      vehicles: 'Make the sounds together: "Beep beep!" Then look for things that go out of the window.',
      feelings: 'Make a happy face and a sad face together, and name the feeling: "Are you sad? Let\'s hug."',
      body: 'Point to your body and your child\'s: "Where are your eyes? Here they are!"' },
    cont: 'Continue', moveTitle: 'Time to move', moveTip: 'Stand up and move together', recallTitle: 'Remember?',
    endTitle: 'Koko fell asleep', missionLabel: 'Your next step, off screen',
    missionWhy: 'Children this age learn less from a screen than from the real world. This step carries what you practiced into your home.',
    words: 'Words we practiced', played: m => (m <= 1 ? 'You played for about a minute.' : `You played for about ${m} minutes.`),
    again: 'Play again: press and hold', againAria: 'Play again. Press and hold',
    restTitle: 'Koko is resting', restText: (g, m) => `Today you played ${g === 1 ? 'one game' : g + ' games'}, about ${m} minutes. A good time to play without a screen.`,
    restHold: 'Grown-ups: hold to play anyway',
    missions: {
      animals: ['Now you are Koko', 'Tell your child "The dog says meow!" and let them correct you. Then swap: they are Koko, and you fix it.'],
      clothes: ['Dress up backwards', 'Grab a sock, a hat and a shoe. Put them in the wrong place and let your child fix it.'],
      home: ['Real tooth brushing', 'Go brush teeth with the right brush. On the way, ask: "What did Koko mix up?"'],
      colors: ['Color hunt', 'Find three yellow things at home. Each time you find one, say it together: "Yellow!"'],
      food: ["Teddy's lunch", 'Sit some toys at a table and let your child feed them. You are Koko: offer teddy a shoe, and your child fixes it.'],
      vehicles: ['Sound walk', 'Take a short walk and look for things that go. Each time you see one, make its sound together.'],
      feelings: ['Mirror faces', 'Stand at a mirror together: a happy face, a sad face, a sleepy face. Name each feeling.'],
      body: ['Head, shoulders', 'Sing "Head, Shoulders, Knees and Toes" together, touching each part. Then mix them up on purpose and let your child fix you.'] },
    sheet: 'Grown-ups', close: 'Close', tabs: { together: 'Together', progress: 'Progress', voice: 'Voice', settings: 'Settings' },
    howTitle: 'How to play together', how: ['Sit next to your child and let them tap the answer themselves.', "Laugh together at Koko's mix-ups. At talk time, listen and add one word.", 'Get up and move when Koko asks, and at the end do the off-screen step together.'],
    whyTitle: 'Why it is built this way', why: [
      ['Your child fixes, not tested', 'From about 18 months, toddlers tell a joke from a mistake, and they correct mistakes. Koko gets it wrong, so your child is the expert.'],
      ['Words come back, spaced out', 'Two-year-olds remembered words better when repetitions were spaced out rather than back to back. Koko brings back tricky words and ends each game with "Do you remember?".'],
      ['One language per game', 'Studies of bilingual toddlers found that switching languages inside a sentence makes new words harder to learn. So Koko speaks one language per game, and translations live on the Progress page.'],
      ['Pictures close to real life', 'Toddlers carry a word from a picture to the real thing better when the picture is realistic. So animals and objects are drawn in their real colors and proportions; only Koko is a cartoon.'],
      ['Koko looks at what he names', "Toddlers work out what a new word means by following the speaker's gaze. Koko looks and points at what he is talking about."],
      ['One familiar friend', 'Toddlers learned more from a character they knew than from a new one. So there is one character, Koko, in every round.'],
      ['Slow on purpose', 'Four-year-olds found it harder to focus right after a fast-paced cartoon. There are no quick cuts here, and Koko waits for your child.'],
      ['A calm screen', 'In a heavily decorated classroom, kindergartners were more distracted and learned less. The backgrounds are soft and pale; only what is being learned is bright and outlined.'],
      ['Words for feelings', 'Children whose families talk about feelings understand feelings better later on. The feelings round names the feeling, and talk time invites you to talk about it.'],
      ['Quiet in the background', 'Background noise and speech hurt word learning at age two. There is no background music, and sounds only illustrate an action: a crunch, a horn, a bell.'],
      ['Animation shows the answer', 'Animation that illustrates the content helps; tap "surprises" that are off-topic distract. So the sock moves to the foot, and there are no stars or confetti.'],
      ['Talk, movement and a clear ending', 'Parents talk less with their child around screens, so Koko pauses for talk. WHO advises lots of movement, so there is a movement break. And the game ends on its own, with no rewards that pull for more.']],
    privacyTitle: 'Privacy and safety', privacy: 'The game sends nothing anywhere, has no ads and no links out. The name, progress and recordings stay on this device only.',
    lockTip: 'To keep your child from leaving by accident: on iPhone turn on Guided Access, on Android use Screen pinning.',
    installTitle: 'Install on your phone', installIos: 'iPhone, in Safari: Share → "Add to Home Screen".', installAndroid: 'Android, in Chrome: menu ⋮ → "Add to Home screen".', installOffline: 'Once installed, the game works without internet.',
    today: 'Today', week: 'Last 7 days', gamesN: n => (n === 1 ? '1 game' : `${n} games`), minN: n => `${n} min`,
    guideline: 'Guidance for ages 2–5: no more than one hour of screen time a day in total; less is better.',
    wordsTitle: 'Words', status: { new: 'not yet', practicing: 'practicing', knows: 'knows' },
    reset: 'Reset progress', resetConfirm: 'Tap again to reset', resetDone: 'Progress was reset.',
    vPack: 'Koko speaks with a high-quality recorded voice. The device voice is only a backup.', vNoTTS: 'This browser cannot speak. Koko will write in the bubble.',
    vDevice: n => `Koko uses the device voice: ${n}`, vNone: 'No voice for this language on this device. Koko will write in the bubble, and you can record your own voice.', vTrying: 'Koko will try to use the device voice.',
    voiceLabel: 'Device voice', recommended: '(recommended)', rateLabel: 'Device voice speed', test: 'Play a sample',
    tipsIntro: 'The basic device voice sounds robotic. An enhanced voice sounds much more natural, and it is free:',
    tipIos: 'iPhone: Settings › Accessibility › Spoken Content › Voices, choose the language and download an Enhanced or Premium voice. Then pick it here.',
    tipAndroid: 'Android: Settings › Text-to-speech › engine: Speech Services by Google, and install the voice.',
    tipRecord: 'Best of all: record the lines in your own voice, below.',
    recTitle: 'Your voice', recIntro: "Record any of Koko's lines in your own voice. Lines you don't record use the regular voice. Each recording is up to 8 seconds, and silence at both ends is trimmed for you.",
    rec: 'Record', stop: 'Stop', playRec: 'Play', del: 'Delete', delAria: 'Delete the recording', recorded: 'recorded', saved: 'Saved.', deleted: 'Recording deleted.',
    noMic: 'No microphone access. Allow the microphone in your browser settings and try again.', noRecDevice: 'This device cannot record.', notSaved: 'The recording works until you close the game, but it was not saved on the device.',
    recEmbed: 'Voice recording works in the version installed on your phone. Here Koko uses the device voice.', recUnsupported: 'This browser cannot record voice.',
    groups: { start: 'Start', move: 'Movement', end: 'Endings and replies' },
    nameLabel: "Child's name (Koko will say hello)", namePh: 'e.g. Maya', langLabel: "Koko's language",
    lengthLabel: 'Game length', lengthShort: 'Short (about 4 minutes)', lengthLong: 'Regular (about 6 minutes)',
    levelLabel: 'Difficulty', levelAuto: 'Automatic: a third answer once a word is known', levelEasy: 'Always two answers', levelHard: 'Always three answers',
    limitLabel: 'Games per day', limitOff: 'No limit', limitN: n => (n === 1 ? '1 game' : `${n} games`),
    sfxLabel: 'Action sounds (crunch, horn, bell)', sfxOn: 'On', sfxOff: 'Off',
    footer: 'Koko the Parrot · made in the Aba AI community · version 3.0'
  }
};

/* ---------- derived helpers ---------- */
function catById(id) { return CATS.find(c => c.id === id); }
function withCat(c, it) { return Object.assign({ cat: c.id, kind: c.kind }, it); }
function itemById(id) { for (const c of CATS) { const it = c.items.find(i => i.id === id); if (it) return withCat(c, it); } return null; }

/* The three lines for one item: [mix-up, question, answer] */
function itemLines(lang, item) {
  if (item.kind === 'sound') {
    const L = SOUND_LINES[lang], A = SOUND[lang];
    return [L.say(A[item.show], A[item.target]), L.ask(A[item.target]), L.yes(A[item.target], A[item.show])];
  }
  const l = ITEM_LINES[lang][item.id];
  if (item.kind === 'touch') return [SAY[lang]['part_' + item.right], l[0], l[1]];
  return l;
}
/* The id of the mix-up line (body items share Koko's part lines). */
function sayId(item) { return item.kind === 'touch' ? 'part_' + item.right : item.id + '_say'; }

/* The answers for an item: [{key, sym, label, correct}] - correct first, caller shuffles. */
function itemOptions(lang, item, n) {
  if (item.kind === 'sound') return [item.target, item.show, item.alt].slice(0, n).map((a, i) => ({ key: a, sym: SYM[a], label: SOUND[lang][a][1], correct: i === 0 }));
  const keys = [item.right, item.wrong, item.alt].slice(0, n);
  if (item.kind === 'color') return keys.map((c, i) => ({ key: c, sym: `s-${item.thing}--${c}`, label: LABEL[lang][c], correct: i === 0 }));
  if (item.kind === 'touch') return keys.map((k, i) => ({ key: k, sym: PART_SYM[k], label: PART[lang][k], correct: i === 0 }));
  return keys.map((k, i) => ({ key: k, sym: SYM[k], label: LABEL[lang][k], correct: i === 0 }));
}

/* The word an item teaches, for the progress list and the end screen. */
function itemWord(lang, item) {
  switch (item.kind) {
    case 'sound': return { sym: SYM[item.target], label: SOUND[lang][item.target][1] };
    case 'wear': return { sym: SYM[item.thing], label: LABEL[lang][item.thing] };
    case 'color': return { sym: `s-${item.thing}--${item.right}`, label: LABEL[lang][item.right] };
    case 'touch': return { sym: PART_SYM[item.right], label: PART[lang][item.right] };
    default: return { sym: SYM[item.right], label: LABEL[lang][item.right] };
  }
}

/* Every line Koko can say in a language: [{id, text, spoken, group}] */
function lineList(lang) {
  const S = SAY[lang], U = UI[lang], sp = SPOKEN[lang];
  const out = [{ id: 'greet', text: S.greet, group: U.groups.start }];
  CATS.forEach(c => {
    const g = U.cat[c.id];
    out.push({ id: 'r_' + c.id, text: S['r_' + c.id], group: g });
    if (c.kind === 'touch') PARTS.forEach(p => out.push({ id: 'part_' + p, text: S['part_' + p], group: g }));
    c.items.forEach(it0 => {
      const it = withCat(c, it0), L = itemLines(lang, it);
      if (c.kind !== 'touch') out.push({ id: it.id + '_say', text: L[0], group: g });
      out.push({ id: it.id + '_ask', text: L[1], group: g }, { id: it.id + '_yes', text: L[2], group: g });
    });
    out.push({ id: 'talk_' + c.id, text: S['talk_' + c.id], group: g });
  });
  MOVES.forEach(m => out.push({ id: 'mv_' + m, text: S['mv_' + m], group: U.groups.move }));
  out.push({ id: 'mv_count', text: S.mv_count, group: U.groups.move }, { id: 'mv_done', text: S.mv_done, group: U.groups.move });
  ['recall', 'recall_yes', 'oops', 'bye', 'end'].forEach(id => out.push({ id, text: S[id], group: U.groups.end }));
  out.forEach(l => { l.spoken = sp[l.id] || l.text; });
  return out;
}
function lineText(lang, id) {
  const S = SAY[lang];
  if (S[id] && typeof S[id] === 'string') return S[id];
  const m = /^([a-z]\d)_(say|ask|yes)$/.exec(id);
  if (m) { const it = itemById(m[1]); return itemLines(lang, it)[{ say: 0, ask: 1, yes: 2 }[m[2]]]; }
  return '';
}
function spokenText(lang, id, text) { return SPOKEN[lang][id] || text; }

if (typeof module !== 'undefined') module.exports = { LANGS, LANG_ORDER, CATS, MOVES, PARTS, UI, SAY, lineList, itemLines, itemOptions, itemWord, itemById, sayId };
