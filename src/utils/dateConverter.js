module.exports = class DateConverter {
    static monthConverter(month) {
        switch(month) {
            case 'janeiro': return "01"; break;
            case 'fevereiro': return "02"; break;
            case 'marco': return "03"; break;
            case 'abril': return "04"; break;
            case 'maio': return "05"; break;
            case 'junho': return "06"; break;
            case 'julho': return "07"; break;
            case 'agosto': return "08"; break;
            case 'setembro': return "09"; break;
            case 'outubro': return "10"; break;
            case 'novembro': return "11"; break;
            case 'dezembro': return "12"; break;
        }
    }

    static dateConverter(dayArray) {
        const day = dayArray[0].padStart(2, "0")
        const month = this.monthConverter(dayArray[1])
        const year = dayArray[3].replace('\n', '')
        const hour = dayArray[4].replace('\n', '').split('h')[0].padStart(2, "0")
        const minutes = dayArray[4].replace('\n', '').split('h')[1].padStart(2, "0")
        return new Date(`${year}-${month}-${day}T${hour}:${minutes}:00.000-03:00`)
    }

    static dateEstadaoConverter(dateString) {
        const dateSplitted = dateString.split(' | ')
        const day = dateSplitted[0].split('/')[0];
        const month = dateSplitted[0].split('/')[1];
        const year = dateSplitted[0].split('/')[2];
        const hour = dateSplitted[1].split('h')[0].padStart(2, "0")
        const minutes = dateSplitted[1].split('h')[1].padStart(2, "0")
        return new Date(`${year}-${month}-${day}T${hour}:${minutes}:00.000-03:00`)
    }
}