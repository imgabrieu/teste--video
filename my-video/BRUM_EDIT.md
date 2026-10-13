# Edição BRUM (composição `Brum`)

- **Azul da marca**: `#163753` (RGB 22,55,83), amostrado dos pixels da logo enviada. Constante em `src/brum/theme.ts` (`BRAND.blue`).
- **Vídeo**: 1080×1920, 30 fps, sem cortes/zoom (footage e áudio originais). Fala termina em ~18,3 s; fechamento com logo a partir de 19,4 s (total 21,6 s).
- **Legendas**: Poppins Bold, caixa alta, branco; chip branco com texto azul só em *BRUM, PROFISSIONAIS, SOLUÇÕES, TRANSFORMA*. Transcrição Parakeet‑TDT v3 com onsets ajustados pela energia do áudio (`src/brum/data.ts`).
- **Motions**: "ELETRICISTA" em faixa azul *atrás da pessoa* (matte RVM, `tools/matte_person.py` → `public/video/person3.webm`), cartão "Escola E3", 3 pilares (Mercado/Novidades/Soluções) na cadência da fala, bloco "Mercado elétrico".
- **SFX**: whoosh/click/pop discretos (0,20–0,26), bem abaixo da voz.
- **Render**: `npx remotion render src/index.ts Brum out/brum_final.mp4` (H.264 CRF 14). Saída pronta: `download/brum_final.mp4`.
