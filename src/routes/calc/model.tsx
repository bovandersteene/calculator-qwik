

export interface Result {
  val1: number;
  val2: number;
  func: '+'|'X'|':'|'-'
  result: number;
  expected: number;
  right: boolean;
}
