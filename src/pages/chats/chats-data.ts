export const chats = [
    {
        id: 0,
        name: 'Илья',
        messages: [ 
            {text: 'Привет!', time: '19:00', fromMe: false}, 
            {text: 'Как жизнь?', time: '19:01', fromMe: false},
            {text: 'У меня тоже)', time: '19:07', fromMe: false},
            {text: 'Слушай, помнишь обсуждали дизайн ВК?', time: '19:08', fromMe: false},
            {text: 'Оказывается, этот редизайн был давно запланирован, демо-версия была готова уже в начале октября, и работала в режиме вкл/выкл.', time: '19:11', fromMe: false},
            {text: 'Привет! Илья. У меня отлично. Как у тебя?', time: '19:05', fromMe: true}
         ],
        messageCount: 3,
        lastTime: '',
        lastMessage: ''
    },
    {
        id: 2,
        name: 'Алина',
        messages: [ 
            {text: 'Алина, привет!', time: '16:26', fromMe: true }, 
            {text: 'Привет! Я недавно решила занятся фотографией. Вот фотоаппрат выбираю. Как тебе Nikon?', time: '16:27', fromMe: false },
            {text: 'Говорят отличный фотоаппарат для начинающих. Компактный и легкий. Удобное меню и информативный сенсорный дисплей. Куча всевозможных эффектов и режимов съемки) Снимки получаются четкими.', time: '16:28', fromMe: false },
            {text: 'Изображение', time: '16:29', fromMe: false, picture: '../pictures/picture-1.jpg' }, 
            {text: 'Круто!', time: '16:30', fromMe: true }
        ],
        messageCount: 0,
        lastTime: '',
        lastMessage: ''
    },
    {
        id: 5,
        name: 'Дима',
        messages: [ 
            {text: 'Привет)', time: '16:09', fromMe: false},
            {text: 'Как твои дела?)', time: '16:10', fromMe: false }
        ],
        messageCount: 2,
        lastTime: '',
        lastMessage: ''
    },
    {
        id: 6,
        name: 'Аня',
        messages: [ 
           {text: 'Стикер', time: '16:05', fromMe: true}
        ],
        messageCount: 0,
        lastTime: '',
        lastMessage: ''
    },
    {
        id: 4,
        name: 'Оля',
        messages: [ 
           {text: 'Стикер', time: '16:00', fromMe: false}
        ],
        messageCount: 1,
        lastTime: '',
        lastMessage: ''
    },
    {
        id: 1,
        name: 'Вадим',
        messages: [ 
           {text: 'Привет, я прилетел, можем завтра встретиться ?', time: '12:05', fromMe: false}
        ],
        messageCount: 0,
        lastTime: '',
        lastMessage: ''
    },
    {
        id: 3,
        name: 'Миша',
        messages: [ 
            {text: 'Привет! Я по дороге с работы домой Технопарк сфотографировал) смотри!', time: '11:14', fromMe: true },
            {text: 'Изображение', time: '11:15', fromMe: true, picture: '../pictures/picture-2.jpg'}
        ],
        messageCount: 0,
        lastTime: '',
        lastMessage: ''
    }
];