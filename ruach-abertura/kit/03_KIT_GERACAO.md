# RUACH CONFERENCE 2026 — KIT DE GERAÇÃO (colar e gerar)

> Gerado a partir de `01_STORYBOARD_TAKES_E_PROMPTS.md`. Cada take já vem com o **prompt completo** (STYLE-BASE embutido) e o **negativo completo** (NEG-BASE embutido). É só copiar o bloco e colar no gerador.

## Como usar

1. **Configuração fixa em todos os takes:** proporção **16:9**, maior resolução disponível, **movimento de câmera baixo/lento**, sem música ou áudio gerado (o som é feito na edição).
2. **Primeiro a imagem-chave:** cole o prompt num gerador de imagem, gere de 4 a 8 opções e escolha uma. Confira na checklist abaixo antes de animar.
3. **Depois o vídeo:** use a imagem escolhida como **primeiro quadro** (image-to-video) com o **mesmo prompt**. Gere a duração indicada em "Gerar" e peça 2 ou 3 variações.
4. **Campo de negativo:** se o gerador tiver campo de prompt negativo, cole o bloco **Negativo**. Se não tiver, use o bloco **Tudo-em-um**, que já inclui uma frase pedindo cena vazia.
5. **Nomeie os arquivos** como `T01.1_v1.mp4`, `T01.1_v2.mp4`… e marque o status em `takes_controle.csv`.
6. **T10.4 e T10.5** (glifo רוּחַ e tela final RUACH) são feitos na edição/motion. Os prompts deles geram só um **fundo opcional**.

## Checklist rápida antes de aprovar cada take

- [ ] Nenhuma pessoa, rosto, mão, silhueta, sombra ou reflexo humano (olhe a 200% de zoom, inclusive na névoa e em portas com contraluz)
- [ ] O vento move tudo da esquerda para a direita
- [ ] Ossos sem crânio, sem esqueleto montado
- [ ] Tecido é pano, nunca roupa
- [ ] Sem cruz, pomba, fogo, vitral com figura, texto ou letras
- [ ] Sem dedos, objetos ou formas derretendo (artefatos de IA) e sem tremedeira
- [ ] Se parecer artificial, gere de novo ou use o Plano B (arquivo 02, seção 14.3)

## Índice

| Take | Nome | Usa no filme | Gerar | Tipo |
|---|---|---|---|---|
| [T01.1](#t011) | A água escura | 0:00:00 → 0:05:12 (5,5 s) | 8 s | Gerado |
| [T01.2](#t012) | A ondulação que vira mar | 0:05:12 → 0:09:00 (3,5 s) | 6 s | Gerado |
| [T02.1](#t021) | Drone sobre o oceano | 0:09:00 → 0:14:12 (5,5 s) | 8 s | Gerado |
| [T02.2](#t022) | A luz que paira | 0:14:12 → 0:20:00 (5,5 s) | 8 s | Gerado |
| [T03.1](#t031) | Vela · VENTO | 0:20:00 → 0:22:00 (2 s) | 5 s | Gerado |
| [T03.2](#t032) | Areia · SOPRO | 0:22:00 → 0:24:00 (2 s) | 5 s | Gerado |
| [T03.3](#t033) | Linho · ESPÍRITO | 0:24:00 → 0:26:00 (2 s) | 5 s | Gerado |
| [T03.4](#t034) | Poeira e folhas · רוּחַ | 0:26:00 → 0:28:00 (2 s) | 5 s | Gerado |
| [T04.1](#t041) | Aéreo do vale | 0:28:00 → 0:33:12 (5,5 s) | 8 s | Gerado |
| [T04.2](#t042) | Rente ao chão: o osso | 0:33:12 → 0:38:00 (4,5 s) | 7 s | Gerado |
| [T05.1](#t051) | Macro do osso | 0:38:00 → 0:42:12 (4,5 s) | 7 s | Gerado |
| [T05.2](#t052) | Os grãos que tremem | 0:42:12 → 0:47:00 (4,5 s) | 7 s | Gerado |
| [T05.3](#t053) | A fita de poeira | 0:47:00 → 0:51:00 (4 s) | 6 s | Gerado |
| [T06.1](#t061) | A frente de poeira | 0:51:00 → 0:54:12 (3,5 s) | 6 s | Gerado |
| [T06.2](#t062) | O linho que se levanta | 0:54:12 → 0:58:00 (3,5 s) | 6 s | Gerado |
| [T06.3](#t063) | Ossos que deslizam | 0:58:00 → 1:04:00 (6 s) | 8 s | Gerado |
| [T07.1](#t071) | A ordem emerge | 1:04:00 → 1:07:00 (3 s) | 6 s | Gerado |
| [T07.2](#t072) | A água nas rachaduras | 1:07:00 → 1:10:00 (3 s) | 6 s | Gerado |
| [T07.3](#t073) | O broto e a luz | 1:10:00 → 1:13:00 (3 s) | 6 s | Gerado |
| [T08.1](#t081) | A nave vazia | 1:13:00 → 1:16:12 (3,5 s) | 6 s | Gerado |
| [T08.2](#t082) | A Bíblia | 1:16:12 → 1:19:00 (2,5 s) | 5 s | Gerado |
| [T08.3](#t083) | Palco e cortinas | 1:19:00 → 1:21:00 (2 s) | 5 s | Gerado |
| [T08.4](#t084) | As portas entreabertas | 1:21:00 → 1:23:00 (2 s) | 5 s | Gerado |
| [T09.1](#t091) | As portas se abrem | 1:23:00 → 1:26:00 (3 s) | 6 s | Gerado |
| [T09.2](#t092) | O céu | 1:26:00 → 1:29:00 (3 s) | 6 s | Gerado |
| [T09.3](#t093) | Cortinas e linhos | 1:29:00 → 1:32:00 (3 s) | 6 s | Gerado |
| [T09.4](#t094) | A nave cheia | 1:32:00 → 1:35:00 (3 s) | 6 s | Gerado |
| [T10.1](#t101) | A nave escurece | 1:35:00 → 1:39:00 (4 s) | 6 s | Gerado |
| [T10.2](#t102) | Campo de partículas A | 1:39:00 → 1:45:00 (6 s) | 8 s | Gerado |
| [T10.3](#t103) | Campo de partículas B (congelamento) | 1:45:00 → 1:50:12 (5,5 s) | 8 s | Gerado |
| [T10.4](#t104) | O glifo רוּחַ | 1:50:12 → 1:56:00 (5,5 s) | — | Pós (fundo opcional) |
| [T10.5](#t105) | Tela final: RUACH | 1:56:00 → 2:00:00 (4 s) | — | Pós (fundo opcional) |

---

## T01.1

**A água escura** · usa no filme 0:00:00 → 0:05:12 (5,5 s) · **gerar 8 s** · lente 100 mm macro · câmera: push-in quase imperceptível (≈ 2% do quadro em 5 s), travada

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro close-up of the surface of pitch-black water in near total darkness, a single faint warm amber highlight reflected on the surface, the water perfectly still at first, then an invisible breath of air touches the surface and fine concentric micro-ripples slowly spread from left to right, thin wisps of mist rise and drift across the water, 100mm macro lens, ultra-shallow depth of field with oval anamorphic bokeh, extremely slow push-in, no horizon visible, deep midnight blue and black, whisper-low-key lighting, realistic fluid physics, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, bubbles, fish, splashes, rain, foam, bright light, sparkles, glitter, big waves
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro close-up of the surface of pitch-black water in near total darkness, a single faint warm amber highlight reflected on the surface, the water perfectly still at first, then an invisible breath of air touches the surface and fine concentric micro-ripples slowly spread from left to right, thin wisps of mist rise and drift across the water, 100mm macro lens, ultra-shallow depth of field with oval anamorphic bokeh, extremely slow push-in, no horizon visible, deep midnight blue and black, whisper-low-key lighting, realistic fluid physics, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T01.2

**A ondulação que vira mar** · usa no filme 0:05:12 → 0:09:00 (3,5 s) · **gerar 6 s** · lente 50 mm · câmera: push-in lento + leve *crane up* de 15 cm para revelar mais superfície; no último segundo o horizonte entra pelo topo

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Dark water surface seen from very close, a long thin line of ripples travels across the frame from left to right as an invisible gust brushes the water, a thin rim of pale gold light catches each ripple crest, 50mm lens, slow push-in combined with a very slow rise of the camera revealing a blurred far horizon at the top of the frame so that the scale becomes ambiguous between a puddle and an immense ocean, low drifting mist, deep blue-black water, restrained gold highlights, realistic wave physics, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, boat, ship, shoreline, rocks, sun disc, sparkles, foam, bright sky
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Dark water surface seen from very close, a long thin line of ripples travels across the frame from left to right as an invisible gust brushes the water, a thin rim of pale gold light catches each ripple crest, 50mm lens, slow push-in combined with a very slow rise of the camera revealing a blurred far horizon at the top of the frame so that the scale becomes ambiguous between a puddle and an immense ocean, low drifting mist, deep blue-black water, restrained gold highlights, realistic wave physics, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T02.1

**Drone sobre o oceano** · usa no filme 0:09:00 → 0:14:12 (5,5 s) · **gerar 8 s** · lente 24 mm anamórfica · câmera: drone, deslize frontal lento e constante (≈ 2 m/s)

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Aerial drone shot gliding slowly forward just five meters above an immense dark ocean at blue hour before dawn, dense layered clouds filling most of the sky, a band of mist lying along the horizon with a thin line of warm amber light cutting through it, gusts of wind draw darker patches and long streaks across the water surface that travel from left to right, long realistic ocean swells, 24mm anamorphic lens, steady slow forward motion, monumental scale, deep blue and black with restrained amber, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, boat, ship, island, coast, rocks, sun disc, rainbow, sparkling water, whitecaps, storm lightning, seagull
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Aerial drone shot gliding slowly forward just five meters above an immense dark ocean at blue hour before dawn, dense layered clouds filling most of the sky, a band of mist lying along the horizon with a thin line of warm amber light cutting through it, gusts of wind draw darker patches and long streaks across the water surface that travel from left to right, long realistic ocean swells, 24mm anamorphic lens, steady slow forward motion, monumental scale, deep blue and black with restrained amber, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T02.2

**A luz que paira** · usa no filme 0:14:12 → 0:20:00 (5,5 s) · **gerar 8 s** · lente 24 mm anamórfica · câmera: push-in lentíssimo (≈ 3% em 5 s)

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Monumental wide low-angle shot at the surface level of a dark ocean looking out toward the horizon, a colossal sky of heavy dark clouds with a single opening through which a wide column of golden volumetric light descends and rests on one patch of the water, the pool of light slowly drifts across the surface while low mist crawls from left to right, 24mm anamorphic lens, very slow push-in, deep blue and black with warm gold, awe-inspiring scale, realistic volumetric light, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, visible sun disc, rainbow, birds, boats, lightning, bright blue sky, silhouettes in the mist, face-like shapes in clouds
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Monumental wide low-angle shot at the surface level of a dark ocean looking out toward the horizon, a colossal sky of heavy dark clouds with a single opening through which a wide column of golden volumetric light descends and rests on one patch of the water, the pool of light slowly drifts across the surface while low mist crawls from left to right, 24mm anamorphic lens, very slow push-in, deep blue and black with warm gold, awe-inspiring scale, realistic volumetric light, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T03.1

**Vela · VENTO** · usa no filme 0:20:00 → 0:22:00 (2 s) · **gerar 5 s** · lente 85 mm · câmera: travada, push-in mínimo

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Close-up of a single tall plain beeswax candle standing on a dark stone surface in a dark empty space, its small flame leans sideways and trembles under an invisible steady breeze but does not go out, thin ribbons of smoke stream horizontally from left to right, pure black background, warm amber rim light, 85mm lens, shallow depth of field, locked-off camera with an almost imperceptible push-in, realistic flame and smoke physics, no hands, no person.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, candelabra, church altar, cross, multiple candles, big fire, sparks flying, wax dripping excessively, hand holding the candle
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Close-up of a single tall plain beeswax candle standing on a dark stone surface in a dark empty space, its small flame leans sideways and trembles under an invisible steady breeze but does not go out, thin ribbons of smoke stream horizontally from left to right, pure black background, warm amber rim light, 85mm lens, shallow depth of field, locked-off camera with an almost imperceptible push-in, realistic flame and smoke physics, no hands, no person. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T03.2

**Areia · SOPRO** · usa no filme 0:22:00 → 0:24:00 (2 s) · **gerar 5 s** · lente 100 mm macro · câmera: travelling lateral lento →, acompanhando a crista

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme close-up macro of a sand dune crest in low golden backlight, an invisible wind lifts fine sand grains off the crest which flow from left to right in glittering translucent veils, crisp ripple texture in the foreground, creamy out-of-focus dunes behind, 100mm macro lens, camera tracking slowly left to right along the crest, warm amber and deep brown shadows, realistic granular physics, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, footprints, tire tracks, plants, rocks, camel, bright blue sky, harsh midday sun
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme close-up macro of a sand dune crest in low golden backlight, an invisible wind lifts fine sand grains off the crest which flow from left to right in glittering translucent veils, crisp ripple texture in the foreground, creamy out-of-focus dunes behind, 100mm macro lens, camera tracking slowly left to right along the crest, warm amber and deep brown shadows, realistic granular physics, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T03.3

**Linho · ESPÍRITO** · usa no filme 0:24:00 → 0:26:00 (2 s) · **gerar 5 s** · lente 50 mm · câmera: dolly lateral lenta →

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. A large piece of raw off-white linen cloth hangs from a dark wooden frame in a dark empty hall, softly backlit by warm light, the fabric slowly inflates and ripples as an invisible wind passes through it, thin translucent folds glowing amber, drifting mist in the distance, 50mm lens, slow lateral dolly left to right, shallow depth of field, realistic cloth simulation, nothing and nobody behind the cloth.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, garment, clothes, dress, robe, shirt, shadow behind the fabric, shape behind the cloth, mannequin, curtain rings, stripes
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. A large piece of raw off-white linen cloth hangs from a dark wooden frame in a dark empty hall, softly backlit by warm light, the fabric slowly inflates and ripples as an invisible wind passes through it, thin translucent folds glowing amber, drifting mist in the distance, 50mm lens, slow lateral dolly left to right, shallow depth of field, realistic cloth simulation, nothing and nobody behind the cloth. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T03.4

**Poeira e folhas · רוּחַ** · usa no filme 0:26:00 → 0:28:00 (2 s) · **gerar 5 s** · lente 85 mm · câmera: push-in lento

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. A shaft of low warm golden light cuts diagonally through darkness, thousands of dust particles and a few dry olive leaves carried by an invisible wind cross the beam from left to right, glowing bokeh circles, drifting mist in the background, 85mm lens, shallow depth of field, slow push-in, deep blue-black background, realistic particle and leaf motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, insects, fireflies, sparks, snow, rain, glitter, smoke shaped like a figure
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. A shaft of low warm golden light cuts diagonally through darkness, thousands of dust particles and a few dry olive leaves carried by an invisible wind cross the beam from left to right, glowing bokeh circles, drifting mist in the background, 85mm lens, shallow depth of field, slow push-in, deep blue-black background, realistic particle and leaf motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T04.1

**Aéreo do vale** · usa no filme 0:28:00 → 0:33:12 (5,5 s) · **gerar 8 s** · lente 24 mm · câmera: drone, deslize frontal **muito lento e constante**

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. High aerial drone shot slowly gliding forward over a vast arid valley of cracked pale clay at dusk, sparse small sun-bleached long bones scattered across the ground at ambiguous scale, absolutely still air, no dust moving, no vegetation, long raking shadows from the left, sky of desaturated pale gold fading to cold blue at the top, haze on the far ridges, 24mm lens, slow constant forward motion, monumental scale, silent and lifeless, photoreal dried-clay geology with polygonal cracks.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, skull, rib cage, complete skeleton, animal carcass, vultures, plants, grass, trees, water, wind, moving dust, blowing sand, bright blue sky, rainbow
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. High aerial drone shot slowly gliding forward over a vast arid valley of cracked pale clay at dusk, sparse small sun-bleached long bones scattered across the ground at ambiguous scale, absolutely still air, no dust moving, no vegetation, long raking shadows from the left, sky of desaturated pale gold fading to cold blue at the top, haze on the far ridges, 24mm lens, slow constant forward motion, monumental scale, silent and lifeless, photoreal dried-clay geology with polygonal cracks. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T04.2

**Rente ao chão: o osso** · usa no filme 0:33:12 → 0:38:00 (4,5 s) · **gerar 7 s** · lente 35 mm · câmera: dolly frontal lento; **para** perto de um osso grande no último segundo (frame final = frame inicial de T05.1)

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Low tracking shot gliding forward twenty centimeters above cracked dry clay earth, a large weathered sun-bleached long bone half-buried in the foreground passes in parallax, polygonal cracks, far ridges in haze, low sun raking from the left, 35mm lens, slow dolly forward that gently settles close to the bone at the end of the shot, dead still air with no dust at all, absolutely nothing moves except the camera.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, skull, vertebrae, jaw, animal body, plants, insects, lizard, moving dust, wind, water
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Low tracking shot gliding forward twenty centimeters above cracked dry clay earth, a large weathered sun-bleached long bone half-buried in the foreground passes in parallax, polygonal cracks, far ridges in haze, low sun raking from the left, 35mm lens, slow dolly forward that gently settles close to the bone at the end of the shot, dead still air with no dust at all, absolutely nothing moves except the camera. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T05.1

**Macro do osso** · usa no filme 0:38:00 → 0:42:12 (4,5 s) · **gerar 7 s** · lente 100 mm macro · câmera: push-in ao longo da superfície (travelling micro)

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro of the weathered surface of a sun-bleached bone fragment, fine porous texture, hairline cracks, a few grains of sand resting on it, absolute stillness, warm low side light from the left raking the texture, deep brown shadows, 100mm macro lens, ultra-shallow depth of field, very slow push-in along the surface, tiny dust motes frozen in the air, photoreal.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, teeth, marrow, insects, moss, text-like markings, bright light
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro of the weathered surface of a sun-bleached bone fragment, fine porous texture, hairline cracks, a few grains of sand resting on it, absolute stillness, warm low side light from the left raking the texture, deep brown shadows, 100mm macro lens, ultra-shallow depth of field, very slow push-in along the surface, tiny dust motes frozen in the air, photoreal. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T05.2

**Os grãos que tremem** · usa no filme 0:42:12 → 0:47:00 (4,5 s) · **gerar 7 s** · lente 100 mm macro · câmera: travelling lateral →, bem lento

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro of cracked dry clay soil with fine sand grains lying at the edge of a crack, a first almost imperceptible air current makes a few grains tremble, then slide slowly from left to right and fall into the crack, a thin thread of dust lifts and drifts, backlit amber rim light on the grains, 100mm macro lens, ultra-shallow depth of field, slow lateral slide, warm sand and brown palette, realistic granular physics.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, insects, ants, water, plants, footprints, big dust cloud, sand storm
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro of cracked dry clay soil with fine sand grains lying at the edge of a crack, a first almost imperceptible air current makes a few grains tremble, then slide slowly from left to right and fall into the crack, a thin thread of dust lifts and drifts, backlit amber rim light on the grains, 100mm macro lens, ultra-shallow depth of field, slow lateral slide, warm sand and brown palette, realistic granular physics. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T05.3

**A fita de poeira** · usa no filme 0:47:00 → 0:51:00 (4 s) · **gerar 6 s** · lente 35 mm · câmera: push-in lento

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Low-angle medium-wide shot at ground level in an arid valley at dusk, a thin ribbon of fine dust lifts from the cracked earth and drifts slowly from left to right across the frame in the warm backlight, scattered bleached bones in the mid-ground, the sky above begins to show very slight cloud movement, 35mm lens, slow push-in, atmosphere shifting from dead stillness to a first breath, photoreal.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, tornado, sandstorm, dust devil, plants, vultures, rain, strong wind
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Low-angle medium-wide shot at ground level in an arid valley at dusk, a thin ribbon of fine dust lifts from the cracked earth and drifts slowly from left to right across the frame in the warm backlight, scattered bleached bones in the mid-ground, the sky above begins to show very slight cloud movement, 35mm lens, slow push-in, atmosphere shifting from dead stillness to a first breath, photoreal. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T06.1

**A frente de poeira** · usa no filme 0:51:00 → 0:54:12 (3,5 s) · **gerar 6 s** · lente 24 mm anamórfica · câmera: push-in lento; areia passa na lente em 1º plano

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide shot of an arid valley as a wall of golden dust advances across the cracked earth from left to right, gentle and cinematic rather than apocalyptic, clouds racing across a dramatic sky in time-lapse-like motion, fine sand streaming past the lens in the foreground, bleached bones scattered across the ground, warm amber backlight, 24mm anamorphic lens, slow push-in, volumetric dust, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, tornado, apocalypse, lightning, rain, buildings, vehicles, trees, vultures
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide shot of an arid valley as a wall of golden dust advances across the cracked earth from left to right, gentle and cinematic rather than apocalyptic, clouds racing across a dramatic sky in time-lapse-like motion, fine sand streaming past the lens in the foreground, bleached bones scattered across the ground, warm amber backlight, 24mm anamorphic lens, slow push-in, volumetric dust, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T06.2

**O linho que se levanta** · usa no filme 0:54:12 → 0:58:00 (3,5 s) · **gerar 6 s** · lente 50 mm · câmera: dolly lento; foco raso

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Close-up of a piece of raw off-white linen cloth caught on a dry thorn branch in an arid valley, lifted and snapping in a strong wind blowing from left to right, frayed edges fluttering, backlit golden dust streaming behind it, 50mm lens, shallow depth of field, slow steady dolly, realistic cloth physics, the cloth is a plain flat piece of fabric and not a garment.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, garment, robe, clothing, flag, banner with symbols, rope tied by a person, shape inside the fabric
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Close-up of a piece of raw off-white linen cloth caught on a dry thorn branch in an arid valley, lifted and snapping in a strong wind blowing from left to right, frayed edges fluttering, backlit golden dust streaming behind it, 50mm lens, shallow depth of field, slow steady dolly, realistic cloth physics, the cloth is a plain flat piece of fabric and not a garment. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T06.3

**Ossos que deslizam** · usa no filme 0:58:00 → 1:04:00 (6 s) · **gerar 8 s** · lente 35 mm · câmera: push-in lento, firme

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Medium shot at ground level, weathered sun-bleached long bone fragments resting on sand slide and roll gently in a powerful stream of golden dust, sand rushing past the camera in the foreground, cracked earth, a dark stormy sky behind with rifts of warm light, 35mm lens, slow steady push-in, the bones move only by the force of the wind and never assemble into a body or a skeleton, photoreal, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, assembled skeleton, human shape, skull, ribs, hand shape, moving like a creature, tornado, fire, lightning
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Medium shot at ground level, weathered sun-bleached long bone fragments resting on sand slide and roll gently in a powerful stream of golden dust, sand rushing past the camera in the foreground, cracked earth, a dark stormy sky behind with rifts of warm light, 35mm lens, slow steady push-in, the bones move only by the force of the wind and never assemble into a body or a skeleton, photoreal, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T07.1

**A ordem emerge** · usa no filme 1:04:00 → 1:07:00 (3 s) · **gerar 6 s** · lente 35 mm · câmera: push-in lento

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide-medium low-angle shot of an arid valley floor where weathered sun-bleached bone fragments, moved by the wind, have slowly aligned into orderly parallel arcs following the wind direction like ripples in sand, the earth gently vibrating so that dust hops off the ground, golden dust haze, warm rim light, 35mm lens, slow push-in, symbolic order emerging from chaos, no skeleton, no body shape, no skull.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, assembled skeleton, human shape, skull, ribs, plants, water, lightning, tornado
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide-medium low-angle shot of an arid valley floor where weathered sun-bleached bone fragments, moved by the wind, have slowly aligned into orderly parallel arcs following the wind direction like ripples in sand, the earth gently vibrating so that dust hops off the ground, golden dust haze, warm rim light, 35mm lens, slow push-in, symbolic order emerging from chaos, no skeleton, no body shape, no skull. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T07.2

**A água nas rachaduras** · usa no filme 1:07:00 → 1:10:00 (3 s) · **gerar 6 s** · lente 100 mm macro · câmera: push-in lento

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro of dry cracked earth as clear water wells up from inside the cracks, thin bright threads of water seep and spread across the soil, the ground darkens as it drinks, a few tiny sand grains float on the surface, golden backlight glints on the water, 100mm macro lens, ultra-shallow depth of field, slow push-in, realistic fluid physics, natural slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, flood, mud splashes, rain storm, fish, plants already grown, footprints
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Extreme macro of dry cracked earth as clear water wells up from inside the cracks, thin bright threads of water seep and spread across the soil, the ground darkens as it drinks, a few tiny sand grains float on the surface, golden backlight glints on the water, 100mm macro lens, ultra-shallow depth of field, slow push-in, realistic fluid physics, natural slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T07.3

**O broto e a luz** · usa no filme 1:10:00 → 1:13:00 (3 s) · **gerar 6 s** · lente 85 mm · câmera: push-in lento + rack focus do broto para o vale

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Macro of a tiny vivid green seedling breaking through cracked earth and slowly unfurling its first two leaves, a dew drop catching golden light, then a slow rack focus from the seedling to the vast valley behind where shafts of warm sunlight break through parted storm clouds and light the land, 85mm lens, shallow depth of field, slow push-in, warm light flooding in, green kept restrained and natural, photoreal.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, flowers, tree, big plants, insects, butterfly, bright saturated green, rainbow, lens flare
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Macro of a tiny vivid green seedling breaking through cracked earth and slowly unfurling its first two leaves, a dew drop catching golden light, then a slow rack focus from the seedling to the vast valley behind where shafts of warm sunlight break through parted storm clouds and light the land, 85mm lens, shallow depth of field, slow push-in, warm light flooding in, green kept restrained and natural, photoreal. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T08.1

**A nave vazia** · usa no filme 1:13:00 → 1:16:12 (3,5 s) · **gerar 6 s** · lente 24 mm anamórfica · câmera: push-in lento pelo corredor central

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide symmetrical shot of the interior of a completely empty modern chapel with a long nave, rows of simple dark wooden benches, tall narrow windows on the left casting long shafts of warm light full of floating dust, high ceiling, dark reflective floor, no cross, no stained glass figures, no people, no figures, dust drifting gently from left to right, 24mm anamorphic lens, slow push-in down the central aisle, volumetric light, deep blue shadows and amber highlights.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, people sitting on the benches, figure in the aisle, altar cross, saints, candles, flowers, banners, screens, microphones
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide symmetrical shot of the interior of a completely empty modern chapel with a long nave, rows of simple dark wooden benches, tall narrow windows on the left casting long shafts of warm light full of floating dust, high ceiling, dark reflective floor, no cross, no stained glass figures, no people, no figures, dust drifting gently from left to right, 24mm anamorphic lens, slow push-in down the central aisle, volumetric light, deep blue shadows and amber highlights. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T08.2

**A Bíblia** · usa no filme 1:16:12 → 1:19:00 (2,5 s) · **gerar 5 s** · lente 85 mm · câmera: push-in lento

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Close-up of a large open leather-bound Bible resting on a dark wooden lectern in an empty dark chapel, thin onion-skin pages lift and turn slowly in an invisible breeze, a shaft of warm light full of floating dust crossing the pages, the text on the pages is abstract and out of focus and illegible, 85mm lens, shallow depth of field, slow push-in, realistic paper physics, no hands.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, readable text, legible words, gibberish letters, hands holding the book, bookmark with cross, golden cross on cover, candles, flowers
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Close-up of a large open leather-bound Bible resting on a dark wooden lectern in an empty dark chapel, thin onion-skin pages lift and turn slowly in an invisible breeze, a shaft of warm light full of floating dust crossing the pages, the text on the pages is abstract and out of focus and illegible, 85mm lens, shallow depth of field, slow push-in, realistic paper physics, no hands. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T08.3

**Palco e cortinas** · usa no filme 1:19:00 → 1:21:00 (2 s) · **gerar 5 s** · lente 35 mm · câmera: travelling lateral lento →

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Tracking shot along the dark bare stage of an empty modern chapel, heavy dark velvet curtains at the sides gently lifting and billowing as an invisible wind moves through, slits of warm light at the edges, floating dust, 35mm lens, slow lateral tracking from left to right, the stage is completely bare with no instruments and no people.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, microphone stand, instruments, speakers, screens, lights rigging visible, musicians, backdrop with logo
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Tracking shot along the dark bare stage of an empty modern chapel, heavy dark velvet curtains at the sides gently lifting and billowing as an invisible wind moves through, slits of warm light at the edges, floating dust, 35mm lens, slow lateral tracking from left to right, the stage is completely bare with no instruments and no people. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T08.4

**As portas entreabertas** · usa no filme 1:21:00 → 1:23:00 (2 s) · **gerar 5 s** · lente 35 mm · câmera: push-in lento pelo corredor

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Long dark corridor leading to tall double wooden doors at its end, thin bright lines of golden light leaking through the cracks around the doors, the doors shift slightly and open a hair's breadth under the pressure of the wind outside, dust pulled toward the gap, 35mm lens, slow push-in down the corridor, symmetrical composition, completely empty, no silhouette in the light.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, silhouette in the doorway, figure standing in the light, door handles with crosses, windows with figures, sign, text on door
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Long dark corridor leading to tall double wooden doors at its end, thin bright lines of golden light leaking through the cracks around the doors, the doors shift slightly and open a hair's breadth under the pressure of the wind outside, dust pulled toward the gap, 35mm lens, slow push-in down the corridor, symmetrical composition, completely empty, no silhouette in the light. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T09.1

**As portas se abrem** · usa no filme 1:23:00 → 1:26:00 (3 s) · **gerar 6 s** · lente 24 mm anamórfica · câmera: push-in lento; slow motion natural

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide low-angle shot from inside an empty dark chapel toward its far end, tall double wooden doors burst fully open by a powerful wind, brilliant golden light floods in with a violent blast of dust and particles streaming into the nave, curtains snapping, empty benches, only blinding backlight and swirling dust in the doorway, 24mm anamorphic lens, slow push-in, volumetric god rays, high contrast, high-speed slow motion.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, silhouette in the doorway, figure standing in the light, person entering, shadow of a person, cross in the light, fire
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide low-angle shot from inside an empty dark chapel toward its far end, tall double wooden doors burst fully open by a powerful wind, brilliant golden light floods in with a violent blast of dust and particles streaming into the nave, curtains snapping, empty benches, only blinding backlight and swirling dust in the doorway, 24mm anamorphic lens, slow push-in, volumetric god rays, high contrast, high-speed slow motion. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T09.2

**O céu** · usa no filme 1:26:00 → 1:29:00 (3 s) · **gerar 6 s** · lente 24 mm · câmera: travada, ligeira inclinação para cima (tilt up)

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Low-angle wide shot looking up at an enormous stormy sky of dark clouds racing at high speed in time-lapse, a tear in the clouds revealing warm golden light rays, no visible sun disc, only a thin dark ridge line at the very bottom edge of the frame, 24mm lens, locked-off camera with a slow tilt up, monumental and awe-inspiring, photoreal.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, birds, plane, rainbow, lightning, sun disc, buildings, cross-shaped clouds, face-like clouds
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Low-angle wide shot looking up at an enormous stormy sky of dark clouds racing at high speed in time-lapse, a tear in the clouds revealing warm golden light rays, no visible sun disc, only a thin dark ridge line at the very bottom edge of the frame, 24mm lens, locked-off camera with a slow tilt up, monumental and awe-inspiring, photoreal. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T09.3

**Cortinas e linhos** · usa no filme 1:29:00 → 1:32:00 (3 s) · **gerar 6 s** · lente 35 mm · câmera: push-in contínuo; slow motion natural

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Interior of an empty chapel in violent but controlled wind, heavy dark curtains whipping horizontally, loose pieces of raw off-white linen cloth flying through the air along the nave, dust and golden particles streaming from left to right through shafts of light, empty benches unmoved, 35mm lens, camera moving steadily forward, high-speed slow motion, no people.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, garment flying, person's clothes, flags, banners with symbols, birds, fire
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Interior of an empty chapel in violent but controlled wind, heavy dark curtains whipping horizontally, loose pieces of raw off-white linen cloth flying through the air along the nave, dust and golden particles streaming from left to right through shafts of light, empty benches unmoved, 35mm lens, camera moving steadily forward, high-speed slow motion, no people. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T09.4

**A nave cheia** · usa no filme 1:32:00 → 1:35:00 (3 s) · **gerar 6 s** · lente 24 mm anamórfica · câmera: push-in em direção às portas abertas; **últimos 12 frames: queda de exposição de −4 stops**

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide symmetrical view of an empty chapel nave completely filled with wind-driven golden particles and dust, shafts of intense warm light from the tall windows and the open doors at the far end, pages of an open Bible on a distant lectern riffling, pieces of linen cloth floating in mid-air, everything vibrating with energy, 24mm anamorphic lens, slow push-in toward the open doors, volumetric lighting, cinematic climax, subtle horizontal anamorphic streak on the strongest light.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, silhouette in the doorway, figure, birds, fire, cross, lens flare covering the frame, text on pages
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Wide symmetrical view of an empty chapel nave completely filled with wind-driven golden particles and dust, shafts of intense warm light from the tall windows and the open doors at the far end, pages of an open Bible on a distant lectern riffling, pieces of linen cloth floating in mid-air, everything vibrating with energy, 24mm anamorphic lens, slow push-in toward the open doors, volumetric lighting, cinematic climax, subtle horizontal anamorphic streak on the strongest light. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T10.1

**A nave escurece** · usa no filme 1:35:00 → 1:39:00 (4 s) · **gerar 6 s** · lente 24 mm · câmera: pull-back mínimo

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. The same empty chapel nave after the wind has died, almost entirely dark, only a faint last beam of warm light, a few dust particles drifting slowly downward, curtains settling into stillness, deep blue-black shadows, wide static shot, 24mm lens, very slow pull-back, absolute stillness, low-key lighting.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, figure in the aisle, light switch, lamp, screens, cross, bright light, fire
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. The same empty chapel nave after the wind has died, almost entirely dark, only a faint last beam of warm light, a few dust particles drifting slowly downward, curtains settling into stillness, deep blue-black shadows, wide static shot, 24mm lens, very slow pull-back, absolute stillness, low-key lighting. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T10.2

**Campo de partículas A** · usa no filme 1:39:00 → 1:45:00 (6 s) · **gerar 8 s** · lente 100 mm macro · câmera: deriva frontal lentíssima

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Pure black background with sparse golden dust particles floating very slowly through a single soft warm shaft of light, large soft bokeh circles with oval anamorphic shape, extremely shallow depth of field, slow forward drift of the camera, tiny amber sparks of light, 100mm macro lens, premium cinematic particulate atmosphere, deep black.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, snow, stars, galaxy, fireflies, smoke figure, lens flare, text, bright background
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Pure black background with sparse golden dust particles floating very slowly through a single soft warm shaft of light, large soft bokeh circles with oval anamorphic shape, extremely shallow depth of field, slow forward drift of the camera, tiny amber sparks of light, 100mm macro lens, premium cinematic particulate atmosphere, deep black. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T10.3

**Campo de partículas B (congelamento)** · usa no filme 1:45:00 → 1:50:12 (5,5 s) · **gerar 8 s** · lente 100 mm macro · câmera: deriva ainda mais lenta; **freeze** (time-remap a 0% em 1:48:19)

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Dense field of golden dust particles hanging in a soft warm light against pure black, particles drifting slower and slower until they appear suspended in the air, large soft bokeh with oval anamorphic shape, extremely shallow depth of field, almost no camera movement, 100mm macro lens, deep black, serene and tense atmosphere, premium cinematic particulate atmosphere.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, snow, stars, galaxy, fireflies, smoke figure, lens flare, text, bright background
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Dense field of golden dust particles hanging in a soft warm light against pure black, particles drifting slower and slower until they appear suspended in the air, large soft bokeh with oval anamorphic shape, extremely shallow depth of field, almost no camera movement, 100mm macro lens, deep black, serene and tense atmosphere, premium cinematic particulate atmosphere. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T10.4

**O glifo רוּחַ** · usa no filme 1:50:12 → 1:56:00 (5,5 s) · **gerar —** · lente — · câmera: —

> Este take é montado na edição/motion. O prompt abaixo gera apenas o fundo plate de fundo opcional.

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Very dark volumetric mist drifting slowly from left to right over pure black, a faint warm amber glow along the very bottom edge of the frame, extremely subtle, 50mm lens, shallow depth of field, locked-off camera, minimal and elegant, deep blue-black.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, bright light, fire, smoke figure, face-like shape in mist
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Very dark volumetric mist drifting slowly from left to right over pure black, a faint warm amber glow along the very bottom edge of the frame, extremely subtle, 50mm lens, shallow depth of field, locked-off camera, minimal and elegant, deep blue-black. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```

---

## T10.5

**Tela final: RUACH** · usa no filme 1:56:00 → 2:00:00 (4 s) · **gerar —** · lente — · câmera: —

> Este take é montado na edição/motion. O prompt abaixo gera apenas o fundo plate de fundo do gradiente — opcional.

**Prompt**
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Smooth atmospheric gradient background from deep midnight blue at the top to warm dark brown and amber at the bottom, a faint glow of warm light rising from the lower edge, extremely subtle thin wavy lines of mist across the sky, elegant and minimal, 50mm lens, locked-off, premium editorial look, no objects.
```
**Negativo**
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts, sun, horizon objects, clouds with shapes, stars, mountains, bright light
```
**Tudo-em-um** (para geradores sem campo de negativo)
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text. Smooth atmospheric gradient background from deep midnight blue at the top to warm dark brown and amber at the bottom, a faint glow of warm light rising from the lower edge, extremely subtle thin wavy lines of mist across the sky, elegant and minimal, 50mm lens, locked-off, premium editorial look, no objects. The scene is completely empty and uninhabited, a clean frame without any writing, symbols or living beings.
```
