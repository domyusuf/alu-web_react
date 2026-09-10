export interface MajorCredits {
  credits: number;
  _majorCreditBrand: void;
}

export interface MinorCredits {
  credits: number;
  _minorCreditBrand: void;
}

export function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
  return { credits: subject1.credits + subject2.credits } as MajorCredits;
}

export function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
  return { credits: subject1.credits + subject2.credits } as MinorCredits;
}

const mathCredits = { credits: 3 } as MajorCredits;
const historyCredits = { credits: 4 } as MajorCredits;
const artCredits = { credits: 1 } as MinorCredits;
const musicCredits = { credits: 2 } as MinorCredits;

console.log(sumMajorCredits(mathCredits, historyCredits));
console.log(sumMinorCredits(artCredits, musicCredits));
