export class IdGenerator {

    public static generate(length: number = 6): string {
        return this.getRandomId(length);
    }

    private static getRandomId(length: number): string {
        return (Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)).substring(0, length);
    }
}