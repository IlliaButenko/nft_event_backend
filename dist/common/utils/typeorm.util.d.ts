export declare class ColumnNumericTransformer {
    to(data: number): number;
    from(data: string): number;
}
export declare class NumericRangeTransformer {
    to(data: number[]): string;
    from(data: string): number[];
}
