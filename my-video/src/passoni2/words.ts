// Passoni Clinic (video 2) — caption words (SOURCE seconds) and hand-made caption pages.
// Parakeet-TDT v3 transcript (analysis/passoni2/words.parakeet.json); onsets after pauses snapped to the audio energy; hand fix: "Passoni".
export type PWord = { t: string; s: number; hl?: boolean };
export const WORDS: PWord[] = [
  { t: "Vocês", s: 0.36 }, // 0
  { t: "sabem", s: 0.56 }, // 1
  { t: "quando", s: 1.04 }, // 2
  { t: "começa", s: 1.28 }, // 3
  { t: "a", s: 1.60 }, // 4
  { t: "abrir", s: 1.76 }, // 5
  { t: "um", s: 2.16 }, // 6
  { t: "pouquinho", s: 2.24 }, // 7
  { t: "aqui", s: 2.56 }, // 8
  { t: "a", s: 2.80 }, // 9
  { t: "coroa", s: 2.88 }, // 10
  { t: "e", s: 3.44 }, // 11
  { t: "vocês", s: 3.60 }, // 12
  { t: "logo", s: 3.92 }, // 13
  { t: "já", s: 4.24 }, // 14
  { t: "pensam", s: 4.40 }, // 15
  { t: "em", s: 4.80 }, // 16
  { t: "cirurgia", s: 4.96 }, // 17
  { t: "e", s: 5.68 }, // 18
  { t: "transplante", s: 5.84 }, // 19
  { t: "de", s: 6.56 }, // 20
  { t: "cabelo?", s: 6.64 }, // 21
  { t: "Eu", s: 7.68 }, // 22
  { t: "sempre", s: 7.70 }, // 23
  { t: "venho", s: 8.56 }, // 24
  { t: "falando", s: 9.20 }, // 25
  { t: "aqui", s: 9.68 }, // 26
  { t: "para", s: 10.00 }, // 27
  { t: "vocês", s: 10.24 }, // 28
  { t: "que", s: 10.72 }, // 29
  { t: "onde", s: 11.58 }, // 30
  { t: "existe", s: 11.92 }, // 31
  { t: "folículo", s: 12.32, hl: true }, // 32
  { t: "vivo", s: 13.04, hl: true }, // 33
  { t: "existe", s: 13.60 }, // 34
  { t: "retorno", s: 14.24, hl: true }, // 35
  { t: "do", s: 14.88 }, // 36
  { t: "cabelo.", s: 15.04 }, // 37
  { t: "Esse", s: 15.70 }, // 38
  { t: "é", s: 16.00 }, // 39
  { t: "mais", s: 16.16 }, // 40
  { t: "um", s: 16.40 }, // 41
  { t: "caso", s: 16.56 }, // 42
  { t: "clínico", s: 16.88 }, // 43
  { t: "muito", s: 17.44 }, // 44
  { t: "bonito", s: 17.60 }, // 45
  { t: "aqui", s: 17.92 }, // 46
  { t: "da", s: 18.16 }, // 47
  { t: "Passoni", s: 18.24 }, // 48
  { t: "Clinic,", s: 18.96 }, // 49
  { t: "em", s: 19.62 }, // 50
  { t: "que", s: 19.76 }, // 51
  { t: "a", s: 19.92 }, // 52
  { t: "gente", s: 20.00 }, // 53
  { t: "trouxe", s: 20.16 }, // 54
  { t: "de", s: 20.56 }, // 55
  { t: "volta", s: 20.80 }, // 56
  { t: "só", s: 21.28 }, // 57
  { t: "o", s: 21.52 }, // 58
  { t: "que", s: 21.68 }, // 59
  { t: "estava", s: 21.84 }, // 60
  { t: "doente", s: 22.08 }, // 61
  { t: "e", s: 22.64 }, // 62
  { t: "o", s: 22.80 }, // 63
  { t: "fio", s: 22.96 }, // 64
  { t: "que", s: 23.44 }, // 65
  { t: "estava", s: 23.68 }, // 66
  { t: "afinando.", s: 24.00 }, // 67
  { t: "Sem", s: 24.93 }, // 68
  { t: "nenhuma", s: 25.17 }, // 69
  { t: "necessidade", s: 25.65 }, // 70
  { t: "cirúrgica,", s: 26.21 }, // 71
  { t: "sem", s: 27.10 }, // 72
  { t: "dor", s: 27.49 }, // 73
  { t: "e", s: 28.11 }, // 74
  { t: "em", s: 28.21 }, // 75
  { t: "pouquíssimo", s: 28.45 }, // 76
  { t: "tempo,", s: 29.09 }, // 77
  { t: "em", s: 29.49 }, // 78
  { t: "menos", s: 29.65 }, // 79
  { t: "de", s: 29.89 }, // 80
  { t: "seis", s: 30.05, hl: true }, // 81
  { t: "meses,", s: 30.37, hl: true }, // 82
  { t: "toda", s: 31.15 }, // 83
  { t: "a", s: 31.41 }, // 84
  { t: "coroa", s: 31.57 }, // 85
  { t: "de", s: 32.05 }, // 86
  { t: "volta,", s: 32.13 }, // 87
  { t: "todo", s: 32.45 }, // 88
  { t: "o", s: 32.69 }, // 89
  { t: "cabelo", s: 32.77 }, // 90
  { t: "de", s: 33.17 }, // 91
  { t: "volta", s: 33.33 }, // 92
  { t: "e", s: 33.81 }, // 93
  { t: "nada", s: 33.97 }, // 94
  { t: "de", s: 34.29 }, // 95
  { t: "fugir", s: 34.45 }, // 96
  { t: "mais", s: 34.93 }, // 97
  { t: "de", s: 35.17 }, // 98
  { t: "elevador,", s: 35.33 }, // 99
  { t: "de", s: 36.12 }, // 100
  { t: "piscina", s: 36.37 }, // 101
  { t: "ou", s: 37.01 }, // 102
  { t: "em", s: 37.25 }, // 103
  { t: "ambientes", s: 37.41 }, // 104
  { t: "com", s: 37.89 }, // 105
  { t: "muita", s: 38.05 }, // 106
  { t: "luz.", s: 38.29 }, // 107
  { t: "Se", s: 38.80 }, // 108
  { t: "você", s: 38.93 }, // 109
  { t: "tiver", s: 39.17 }, // 110
  { t: "qualquer", s: 39.49 }, // 111
  { t: "problema", s: 39.89 }, // 112
  { t: "de", s: 40.21 }, // 113
  { t: "afinamento", s: 40.37 }, // 114
  { t: "e", s: 41.01 }, // 115
  { t: "de", s: 41.17 }, // 116
  { t: "perda", s: 41.25 }, // 117
  { t: "capilar,", s: 41.65 }, // 118
  { t: "procure", s: 42.48 }, // 119
  { t: "a", s: 42.77 }, // 120
  { t: "gente", s: 42.85 }, // 121
  { t: "aqui", s: 43.09 }, // 122
  { t: "na", s: 43.25 }, // 123
  { t: "Passoni.", s: 43.33, hl: true }, // 124
];
/** Inclusive [first, last] word indices of each caption page. */
export const PAGES: [number, number][] = [[0, 2], [3, 5], [6, 8], [9, 10], [11, 14], [15, 17], [18, 21], [22, 25], [26, 29], [30, 31], [32, 33], [34, 37], [38, 41], [42, 45], [46, 49], [50, 53], [54, 56], [57, 61], [62, 64], [65, 67], [68, 69], [70, 71], [72, 73], [74, 77], [78, 82], [83, 87], [88, 92], [93, 97], [98, 101], [102, 104], [105, 107], [108, 110], [111, 112], [113, 114], [115, 118], [119, 122], [123, 124]];
