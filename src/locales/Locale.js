export default class Locale {
    constructor(lang){
        switch(lang){
            case 'en':
                this.themeDark = '☾ Dark mode';
                this.themeLight = '☼ Light mode';
                this.reset = 'Regenerate response';
                this.addChat = 'New Chat';
                this.info = 'This is a demo version of our ChatGPT by DSS';
                this.inf = 'Made DSS';
                this.title = 'ChatGPT by DSS';
            case 'ru':
                this.themeDark = '☾ Темный режим';
                this.themeLight = '☼ Светлый режим';
                this.reset = 'Переформировать ответ';
                this.addChat = 'Новый чат';
                this.info = 'Это демо-версия нашего ChatGPT от DSS';
                this.inf = 'Сделано DSS';
                this.title = 'ChatGPT от DSS';
                break
            default:
                this.name = null;
        }
    }
}