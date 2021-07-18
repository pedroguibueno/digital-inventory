export default class DateUtils {
    
    static removeTime(date:Date): Date {
        const stripedDateString = date.toDateString();
        return new Date(stripedDateString);
    }

    static newDateWithoutTime(): Date {
        const date = new Date();
        return this.removeTime(date);
    }

    static isBeforeToday(date: Date): boolean {
        return this.removeTime(date) < this.newDateWithoutTime();
    }

    static isDateAfter(baseDate: Date, comparingDate: Date): boolean {
        return this.removeTime(baseDate) > this.removeTime(comparingDate);
    }

    static displayDateString(date: Date): string {
        return new Date(date).toLocaleDateString();
    }
}