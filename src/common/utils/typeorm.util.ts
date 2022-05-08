export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

export class NumericRangeTransformer {
  to(data: number[]): string {
    return JSON.stringify(data);
  }

  from(data: string): number[] {
    if (!data) {
      return [0, 0];
    }
    return JSON.parse(`${data.substr(0, data.length - 1)}]`);
  }
}
