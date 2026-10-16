// Passoni Clinic — caption words (SOURCE seconds of the original file) and hand-made caption pages.
// Parakeet-TDT v3 transcript (analysis/passoni/words.parakeet.json); onsets after pauses snapped to the audio energy; hand fixes: "alopecia" x3, "Passoni".
export type PWord = { t: string; s: number; hl?: boolean };
export const WORDS: PWord[] = [
  { t: "Esse", s: 1.38 }, // 0
  { t: "é", s: 1.60 }, // 1
  { t: "um", s: 1.76 }, // 2
  { t: "caso", s: 1.84 }, // 3
  { t: "clínico", s: 2.16 }, // 4
  { t: "em", s: 2.64 }, // 5
  { t: "que", s: 2.80 }, // 6
  { t: "uma", s: 2.96 }, // 7
  { t: "paciente", s: 3.12 }, // 8
  { t: "feminina", s: 3.52 }, // 9
  { t: "super", s: 4.16 }, // 10
  { t: "jovem", s: 4.48 }, // 11
  { t: "perdeu", s: 5.19 }, // 12
  { t: "todos", s: 5.68 }, // 13
  { t: "os", s: 5.92 }, // 14
  { t: "cabelos", s: 6.08 }, // 15
  { t: "dessa", s: 6.48 }, // 16
  { t: "área", s: 6.88 }, // 17
  { t: "aqui", s: 7.28 }, // 18
  { t: "de", s: 7.52 }, // 19
  { t: "trás.", s: 7.68 }, // 20
  { t: "Vocês", s: 8.32 }, // 21
  { t: "imaginem", s: 8.72 }, // 22
  { t: "o", s: 9.36 }, // 23
  { t: "que", s: 9.52 }, // 24
  { t: "é", s: 9.68 }, // 25
  { t: "sair", s: 9.84 }, // 26
  { t: "de", s: 10.16 }, // 27
  { t: "casa", s: 10.40 }, // 28
  { t: "sem", s: 11.04 }, // 29
  { t: "30,", s: 11.72 }, // 30
  { t: "40%", s: 12.08, hl: true }, // 31
  { t: "dos", s: 12.80 }, // 32
  { t: "cabelos", s: 12.96 }, // 33
  { t: "numa", s: 13.36 }, // 34
  { t: "área", s: 13.60 }, // 35
  { t: "onde", s: 13.84 }, // 36
  { t: "é", s: 14.08 }, // 37
  { t: "extremamente", s: 14.32 }, // 38
  { t: "exposta.", s: 14.88 }, // 39
  { t: "E", s: 15.84 }, // 40
  { t: "quando", s: 16.50 }, // 41
  { t: "existe", s: 16.72 }, // 42
  { t: "o", s: 17.20 }, // 43
  { t: "bom", s: 17.28 }, // 44
  { t: "diagnóstico,", s: 17.52, hl: true }, // 45
  { t: "existe", s: 18.40 }, // 46
  { t: "a", s: 19.09 }, // 47
  { t: "volta", s: 19.20, hl: true }, // 48
  { t: "dos", s: 19.68 }, // 49
  { t: "cabelos,", s: 19.84 }, // 50
  { t: "quando", s: 20.64 }, // 51
  { t: "a", s: 21.36 }, // 52
  { t: "alopecia", s: 21.46 }, // 53
  { t: "nos", s: 22.16 }, // 54
  { t: "permite.", s: 22.32 }, // 55
  { t: "E", s: 22.80 }, // 56
  { t: "aqui", s: 22.96 }, // 57
  { t: "foi", s: 23.20 }, // 58
  { t: "mais", s: 23.44 }, // 59
  { t: "um", s: 23.68 }, // 60
  { t: "caso.", s: 23.84 }, // 61
  { t: "De", s: 24.48 }, // 62
  { t: "uma", s: 24.56 }, // 63
  { t: "alopecia", s: 24.72 }, // 64
  { t: "diagnosticada", s: 25.20 }, // 65
  { t: "areata,", s: 26.08, hl: true }, // 66
  { t: "uma", s: 26.88 }, // 67
  { t: "alopecia", s: 27.04 }, // 68
  { t: "inflamatória,", s: 27.68 }, // 69
  { t: "em", s: 28.77 }, // 70
  { t: "que", s: 28.88 }, // 71
  { t: "em", s: 29.12 }, // 72
  { t: "pouquíssimo", s: 29.28 }, // 73
  { t: "tempo", s: 29.84 }, // 74
  { t: "recuperamos", s: 30.30, hl: true }, // 75
  { t: "todo", s: 30.96 }, // 76
  { t: "o", s: 31.20 }, // 77
  { t: "cabelo", s: 31.28 }, // 78
  { t: "dessa", s: 31.68 }, // 79
  { t: "jovem,", s: 32.08 }, // 80
  { t: "que", s: 32.72 }, // 81
  { t: "hoje", s: 32.96 }, // 82
  { t: "mantém", s: 33.44 }, // 83
  { t: "os", s: 34.00 }, // 84
  { t: "fios", s: 34.16 }, // 85
  { t: "super", s: 34.64 }, // 86
  { t: "saudáveis", s: 34.88, hl: true }, // 87
  { t: "e", s: 35.77 }, // 88
  { t: "leva", s: 35.84 }, // 89
  { t: "uma", s: 36.24 }, // 90
  { t: "vida", s: 36.48 }, // 91
  { t: "completamente", s: 36.80 }, // 92
  { t: "normal", s: 37.44 }, // 93
  { t: "em", s: 38.08 }, // 94
  { t: "acompanhamento", s: 38.32 }, // 95
  { t: "aqui", s: 38.96 }, // 96
  { t: "com", s: 39.12 }, // 97
  { t: "a", s: 39.20 }, // 98
  { t: "gente", s: 39.36 }, // 99
  { t: "na", s: 39.52 }, // 100
  { t: "Passoni.", s: 39.68, hl: true }, // 101
  { t: "Se", s: 40.40 }, // 102
  { t: "você", s: 40.56 }, // 103
  { t: "tiver", s: 40.80 }, // 104
  { t: "qualquer", s: 41.04 }, // 105
  { t: "problema", s: 41.52 }, // 106
  { t: "de", s: 41.84 }, // 107
  { t: "cabelo,", s: 42.00 }, // 108
  { t: "procure", s: 42.56 }, // 109
  { t: "a", s: 43.12 }, // 110
  { t: "gente", s: 43.20 }, // 111
  { t: "aqui", s: 43.52 }, // 112
  { t: "que", s: 43.76 }, // 113
  { t: "a", s: 43.92 }, // 114
  { t: "gente", s: 44.00 }, // 115
  { t: "resolve.", s: 44.24 }, // 116
];
/** Inclusive [first, last] word indices of each caption page — grouped by meaning and breath. */
export const PAGES: [number, number][] = [[0, 4], [5, 8], [9, 11], [12, 15], [16, 20], [21, 22], [23, 28], [29, 31], [32, 33], [34, 37], [38, 39], [40, 42], [43, 45], [46, 48], [49, 50], [51, 53], [54, 55], [56, 61], [62, 64], [65, 66], [67, 68], [69, 69], [70, 71], [72, 74], [75, 78], [79, 80], [81, 83], [84, 87], [88, 91], [92, 93], [94, 95], [96, 99], [100, 101], [102, 104], [105, 106], [107, 108], [109, 112], [113, 116]];
