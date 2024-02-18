export function formatCurrency(input: string): string {
    return  `${parseInt(input).toLocaleString("en-US")}.00`
  }