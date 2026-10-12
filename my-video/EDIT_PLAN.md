# Plano de edição — vídeo "tetse.mov"

**Original (preservado intacto em `source/original.mov`, sha256 `6388f78c…`)**: 1080×1920 (9:16), 30 fps, HEVC, 82,3 s, áudio AAC estéreo 44,1 kHz. Resolução, proporção e FPS mantidos na saída.

## Análise
- Fala em português, Dr. falando para a câmera, tema: como explicar calvície (alopecia androgenética) ao paciente. Fala já fluida: maiores pausas 0,3–0,47 s; nenhuma hesitação grave detectada.
- Transcrição com timestamps: Parakeet‑TDT v3 (`analysis/*.parakeet.json`), termos técnicos conferidos com Whisper‑small.
- Pausas por energia do áudio: `analysis/pauses.json`.

## Cortes (12 pausas encurtadas, ~2 s removidos; respirações curtas preservadas)
Fim de frase mantém ~0,20 s; vírgulas/respirações ~0,12–0,18 s. Todos os cortes caem em silêncio, com micro‑fade de áudio de 2 frames. Cada corte alterna o zoom (100→103 %, 103,5→106 %…) para disfarçar o jump cut.

## Legendas
Poppins Bold, branco, 2–3 palavras por página, entrada com fade + subida de 16 px + spring suave, base com degradê azul‑escuro para legibilidade. Destaque (chip branco / texto azul `#0D2B45`) só em: *importância, androgenética, afinando, fininhos, palpável, Capflix*.

## Motions (só onde ajudam)
| Tempo (orig.) | Fala | Motion |
|---|---|---|
| 0,3–3,1 s | abertura | título "Como explicar a calvície ao paciente" |
| 14,5–17,6 s | "80 a 90 %" | contador 80–90 % + barra |
| 36,1–38,9 s | "os fios vão afinando" | 3 fios cada vez mais finos |
| 45,2–58,2 s | grosso → inflamando → fininhos | stepper vertical lateral (não cobre o modelo/mãos) |
| 82,1 s+ | fim | logo (`LOGO_PLACEHOLDER`) |

## Sons (sintetizados, `tools/make_sfx.py`)
whoosh (título e logo), pop (80–90 %), clicks (fios e 3 etapas), impacto suave (logo). Volumes 0,28–0,38.

## Estrutura
`src/config/{theme,edit}.ts` (cores, fontes, safe areas, intensidade, cortes, motions, sfx) · `src/components/{VideoComposition,SpeechVideo,Captions,AnimatedCaption,MotionGraphic,SoundEffect,LogoOutro}.tsx` · `src/data/captionWords.ts` (texto editável).

## Como usar
```
npm run dev                         # Studio
npx remotion render src/index.ts Edit out/edited.mp4   # H.264, CRF 14, 30 fps
```
- Azul: `COLORS.navy` em `src/config/theme.ts`.
- Logo: substitua `public/logo/LOGO_PLACEHOLDER.svg` (mesmo nome) ou altere `LOGO.file`.
- Revisar: grafia de *Minoxidil* e *Dutasterida* (74–76 s) e *alopecia androgenética* em `captionWords.ts`.
