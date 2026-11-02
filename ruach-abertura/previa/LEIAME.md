# Prévia gerada em código (sem narração)

Código que gerou `RUACH_abertura_previa_*.mp4`: uma prévia de 2:00 feita só com código (cenas procedurais, partículas, tipografia viva e som sintetizado). Serve para testar tempo, ritmo, silêncios e a tela final no telão. **Não substitui o filme cinematográfico** descrito no dossiê.

- `render.py` monta a linha do tempo (cenas 01–10, transições, textos) e gera o vídeo.
- `scenes.py` tem os desenhos de cada cena; `typo.py`, a tipografia e a tela final; `audio.py`, a trilha.
- `logo_mask.png` é o logo recortado do moodboard (substitua pelo arquivo original para melhor nitidez).
- Os caminhos das fontes (Anton, Bebas Neue, Noto Serif Hebrew via `@fontsource`) estão fixos em `typo.py`.
