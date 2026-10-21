# BRUM – edição com locução (composição `BrumLocucao`)

- Áudio principal: `public/audio/locucao_brum.wav` (locução original, normalizada a −16 LUFS, pico −1,5 dBTP). O bruto não tem áudio.
- Cenas escolhidas do bruto (194 s, 720×1280) por nitidez/estabilidade e reordenadas para seguir a fala — ver `src/brum2/data.ts` (cada cena tem a frase correspondente).
- Azul da marca `#163753` (logo). Motions: tag "Presidente Prudente", linha "Um dia inteiro", fechamento "Brum sempre presente"; logo final em fundo azul.
- SFX ≤ −28 dB de pico (voz: média −20 dB, pico −4,5 dB). Sem trilha musical.
- Render: `npx remotion render src/index.ts BrumLocucao out/brum_locucao_final.mp4`
