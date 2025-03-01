export interface Hasher {
    hash(text: string):string;
    compare(hashed: string, str: string):boolean;
}