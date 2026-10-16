# RUACH CONFERENCE — Abertura cinematográfica (v1)

Vídeo gerado 100% por código (Python + numpy + OpenCV + ffmpeg): imagens, narração e trilha.

## Arquivos
- `RUACH_CONFERENCE_abertura_v1.mp4` — vídeo final (1920×1080, letterbox 2.39:1, 24 fps, áudio estéreo)
- `script.py` — roteiro: textos falados, pausas e nível de intensidade de cada fala
- `timeline.py` — linha do tempo real (calculada a partir da duração das falas) e curvas de intensidade/vento
- `tts.py`, `process_lines.py` — narração (voz pt-BR Piper "faber", rebaixada e desacelerada)
- `audio.py` — trilha sintetizada: respiração, vento, drone, cordas, percussão, impactos, reverb
- `gfx.py`, `shots1.py`, `shots2.py`, `shots3.py` — cenas visuais
- `render.py`, `build.sh` — render paralelo + mux (`RW=1920 ./build.sh saida.mp4`)

## Como refazer
```
pip install numpy opencv-python-headless pillow sherpa-onnx
python3 tts.py && python3 process_lines.py && python3 timeline.py
python3 audio.py
RW=1920 ./build.sh saida.mp4
```

## Ajustes fáceis
- Trocar texto/pausas: `script.py` (depois refazer tts → audio → render)
- Datas / textos do título: `shots3.py` → `mk_final_layers()`
- Tempo de cada cena: `t0`/`dur` em `script.py`
