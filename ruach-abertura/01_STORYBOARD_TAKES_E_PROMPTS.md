# RUACH CONFERENCE 2026 — FILME DE ABERTURA
### Dossiê de produção · Parte 2 de 3 — Storyboard, takes e prompts

> Master **2:00:00** · 32 takes (30 gerados + 2 de composição/motion) · 24 fps · 4K.
> Os **prompts estão em inglês** de propósito: os geradores de vídeo/imagem respondem melhor. Todo o resto do dossiê é em português.

---

## COMO USAR OS PROMPTS

### Pipeline recomendado por take (imagem → vídeo)
1. **Keyframe:** gerar 4–8 stills 4K com o prompt (modo imagem), escolher 1 e aprovar na checklist de QC.
2. **Animar (image-to-video):** usar o still aprovado como frame inicial. Gerar **5–8 s** em câmera lenta. Pedir 2–3 variações.
3. **Upscale e limpeza:** upscale para 4K, remover flicker, estabilizar micro-jitter.
4. **Grão e cor:** só no final (arquivo 02, seção 10). Nunca aplicar grão antes do upscale.
5. Cada take tem **handles de 2–3 s** além do tempo usado no Master (para L/J-cuts e ajuste fino).

### `STYLE-BASE` — colar no INÍCIO de todo prompt
```
Cinematic plate for a premium biblical epic film, photorealistic, shot on a large-format digital cinema camera with discreet anamorphic lenses, 24fps, natural slow motion, physically accurate wind, fluid and particle dynamics, volumetric lighting, fine 35mm film grain, deep midnight-blue shadows (#0A1220) with warm amber and gold highlights, restrained palette of midnight blue, sand, amber, brown and gold, wind always moving left to right across the frame, slow deliberate camera movement, no people anywhere in the frame, no text.
```

### `NEG-BASE` — colar no INÍCIO de todo prompt negativo (e depois acrescentar o negativo do take)
```
any person, human figure, face, silhouette of a person, shadow of a person, reflection of a person, hands, fingers, feet, eyes, body, crowd, worshippers, actor, prophet, Jesus, angel, statue of a person, dove, bird, cross, crucifix, religious icons, stained glass figures, skull, skeleton, rib cage, teeth, flesh, blood, gore, horror, zombie, bonfire, digital flames, explosion, stock footage look, CGI look, plastic textures, oversaturated colors, HDR halo, excessive lens flare, glitch, chromatic aberration, text, letters, numbers, watermark, logo, subtitles, warped geometry, melting objects, flicker, jitter, shaky camera, handheld, fast camera motion, fisheye distortion, cartoon, illustration, painting, 3D render look, visible AI artifacts
```

> Se o gerador não aceitar prompt negativo separado, converter o `NEG-BASE` + negativo do take em frases afirmativas ao final do prompt ("empty, uninhabited, no people, no text…").

### Regras de aceitação (todo take, sem exceção)
Ver checklist completa de QC no arquivo 02, seção 14. **Resumo:** zoom 200% em cada frame-chave procurando silhueta/rosto/mão; física do vento coerente (sempre esquerda→direita); sem artefatos de IA; ossos sem crânio; sem cruz/pomba/fogo. **Se parecer artificial, substitui. Prefiro 20 takes excelentes a 32 medianos** (ver "Plano B" no arquivo 02).

---

## 2. STORYBOARD COMPLETO

> Cada painel descreve **quadro inicial → quadro final** e a composição. Esboços ASCII mostram a geometria dominante de cada cena (horizonte, massa, direção do sopro `→`).

### CENA 01 · SUPERFÍCIE (0:00–0:09)
```
┌───────────────────────────┐   ┌───────────────────────────┐
│                           │   │                           │
│                           │   │   ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈→    │
│            ·              │   │  ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈→   │
│       (ponto âmbar)       │   │ ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈→  ▔ │
│                           │   │  (ondas viram ondas-mar)  │
└───────────────────────────┘   └───────────────────────────┘
        T01.1                            T01.2
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T01.1 | Preto total → água negra quase imóvel com **um ponto âmbar** refletido → micro-ondas concêntricas nascem e viajam →; névoa fina sobe e forma "ANTES DA FORMA" | Centro vazio; ponto de luz no terço esquerdo-inferior; sem horizonte |
| T01.2 | Ondulações em linha cruzam o quadro → crista com filete de luz dourada → a escala "abre": o que parecia poça revela-se **mar** (horizonte difuso no topo) | Diagonal ascendente; horizonte entra pelo terço superior no último segundo (match cut) |

### CENA 02 · ÁGUAS (0:09–0:20)
```
┌───────────────────────────┐   ┌───────────────────────────┐
│  ▒▒▒▒ nuvens densas ▒▒▒▒  │   │  ▒▒▒▒▒▒▒╲  ╱▒▒▒▒▒▒▒▒▒▒    │
│ ░░░░░ névoa ░░░░░░░░░░░░  │   │ ▒▒▒▒▒▒▒▒▒║║║▒▒▒▒▒▒▒▒▒▒▒    │
│▔▔▔▔▔ fio de luz ▔▔▔▔▔▔▔▔  │   │        ═╩═╩═ (poça de luz)│
│ ≈≈≈≈≈ mar com estrias→≈≈  │   │ ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈  │
└───────────────────────────┘   └───────────────────────────┘
        T02.1                            T02.2
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T02.1 | Mar escuro visto de poucos metros, horizonte com **fio âmbar** → deslizamos para frente; rajadas desenham manchas escuras que correm → | Horizonte no terço superior; céu = 55% do quadro; ponto de fuga centralizado |
| T02.2 | Nível da água, céu monumental fechado → uma **abertura nas nuvens** solta uma coluna de luz dourada que **pousa** num trecho do mar e *paira*, deslizando lentamente → | Coluna de luz levemente à direita do centro; ocupa ~⅓ do quadro; baixo ângulo |

### CENA 03 · MATÉRIA DO VENTO (0:20–0:28)
```
 T03.1 vela      T03.2 areia      T03.3 linho       T03.4 poeira/folhas
┌─────────┐    ┌─────────┐      ┌─────────┐       ┌─────────┐
│    ˃    │    │░░░░░░░░░│      │  ╭─────╮│       │ · ✦  ·  │
│   ( )→  │    │▒▒▒▒→▒▒▒▒│      │  │~~~~~││       │ ═══════→│  (feixe)
│   ▐▌    │    │▓▓▓▓▓▓▓▓▓│      │  ╰─────╯│       │ ✦  ·  ✦ │
└─────────┘    └─────────┘      └─────────┘       └─────────┘
 VENTO          SOPRO            ESPÍRITO          רוּחַ
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T03.1 | Vela única no escuro, chama reta → **inclina** e treme sem apagar; fitas de fumaça cruzam → formam "VENTO" e se desfazem | Vela no terço direito, espaço negativo à esquerda (de onde vem o vento) |
| T03.2 | Crista de duna backlit → grãos levantam em véus dourados → "SOPRO" nasce do fluxo de areia e é erodido | Diagonal da crista; foreground nítido, fundo em bokeh |
| T03.3 | Pano de linho pendurado, imóvel, contraluz → **infla** suavemente; dobras translúcidas âmbar → "ESPÍRITO" aparece como relevo luminoso no tecido | Pano ocupa 60% do quadro, centrado; névoa atrás |
| T03.4 | Feixe de luz no escuro; poeira e folhas secas atravessam → partículas **convergem** e desenham רוּחַ em ouro → permanece 0.5 s | Feixe diagonal →; glifo no centro, ligeiramente acima |

### CENA 04 · O VALE (0:28–0:38)
```
┌───────────────────────────┐   ┌───────────────────────────┐
│       céu pálido          │   │  (nada se move)           │
│ ▁▂▃ cumes em névoa ▃▂▁    │   │ ──────────── haze ─────── │
│ ╱╲╱╲ argila rachada ╱╲╱╲  │   │ ╲╱╲╱╲╱  osso ▬▬▬ (1º plano)│
│ ╲╱╲╱  ossos ▬ ▬  ▬ ╲╱╲╱   │   │ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲  │
└───────────────────────────┘   └───────────────────────────┘
        T04.1                            T04.2
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T04.1 | Vale imenso visto do alto, **imóvel**, ossos minúsculos espalhados → deslizamos lentamente sobre ele; nada tremula | Horizonte no terço superior; sombras longas rasantes da esquerda; sensação de escala pequena do homem *ausente* |
| T04.2 | Rente ao chão, osso semi-enterrado em 1º plano → paralaxe → câmera **para** perto de um osso grande (frame final = quadro de partida de T05.1) | Osso no terço inferior direito; horizonte baixo; céu pálido |

### CENA 05 · A PERGUNTA (0:38–0:51)
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T05.1 | Macro da superfície porosa do osso, grãos de areia **parados** → push-in minúsculo | Textura diagonal; foco raso; luz rasante da esquerda |
| T05.2 | Macro de borda de rachadura com grãos → **3 grãos tremem**, deslizam → e caem na fenda; um fio de poeira sobe | Rachadura em diagonal; grãos em contraluz âmbar |
| T05.3 | Rente ao chão, ossos ao fundo, ar parado → uma **fita de poeira** fina levanta do solo e cruza → o céu acima ganha leve movimento | Fita no terço médio; ossos no 2º plano; céu 40% |

### CENA 06 · OS QUATRO VENTOS (0:51–1:04)
```
┌───────────────────────────┐   ┌───────────────────────────┐
│ nuvens correndo →→→→→→→   │   │      ↘  VEM DOS  ↙        │
│ ▒▒▒ parede de poeira ▒→   │   │     →  QUATRO   ←         │
│ ░░░░░░░░░░░░░░░░░░░░░░→   │   │      ↗  VENTOS  ↖         │
│ ╱╲╱╲ ossos  areia ──────→ │   │  (partículas das 4 bordas)│
└───────────────────────────┘   └───────────────────────────┘
        T06.1                           T06.3 (+ motion)
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T06.1 | Vale ainda, horizonte → uma **frente dourada de poeira** entra pela esquerda e cruza o quadro; nuvens aceleram; areia passa na lente | Poeira ocupa o terço médio; nuvens aceleradas no terço superior |
| T06.2 | Pano de linho preso num espinheiro, imóvel → **levanta e estala** ao vento; poeira dourada ao fundo | Pano no centro-esquerda; contraluz; espaço à direita para o vento fluir |
| T06.3 | Ossos no chão → **deslizam e rolam** no fluxo de areia; céu tempestuoso com fendas de luz quente → texto "VEM DOS QUATRO VENTOS" (partículas das 4 bordas) é soprado → | Chão 50% / céu 50%; foreground com areia passando |

### CENA 07 · VIDA (1:04–1:13)
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T07.1 | Ossos soltos → **alinham-se** em arcos paralelos seguindo a direção do vento; poeira "pula" do chão (terra vibra) | Arcos formam leading lines para o ponto de fuga; ângulo baixo |
| T07.2 | Macro de terra seca → **água brota** das rachaduras em fios claros; solo escurece e "bebe" | Rachaduras como rio de linhas; reflexo dourado nos fios |
| T07.3 | Broto verde minúsculo rompe o solo e **desdobra** 2 folhas; foco puxa (rack) do broto para o vale ao fundo, onde nuvens se abrem e a luz cai | Broto no terço inferior; vale iluminado ao fundo |

### CENA 08 · A CASA (1:13–1:23)
```
 T08.1 nave        T08.2 Bíblia       T08.3 cortinas     T08.4 portas
┌──────────┐     ┌──────────┐       ┌──────────┐       ┌──────────┐
│ ╲  ║  ╱   │     │ ═══╗     │       │▓▓╲    ╱▓▓│       │ ▏║▕ ║▏▕  │
│ ╲  ║  ╱   │     │ ═══╣→ pág│       │▓▓ palco ▓│       │  ║║ ║║    │
│ ║ ║║║ ║   │     │ ═══╝     │       │▓▓╱    ╲▓▓│       │  ║║ ║║ ▕ │
└──────────┘     └──────────┘       └──────────┘       └──────────┘
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T08.1 | Nave simétrica, feixes de luz da esquerda, poeira → push-in lento pelo corredor central | Simetria; ponto de fuga central; bancos como leading lines |
| T08.2 | Bíblia aberta num atril escuro, páginas imóveis → **levantam e viram** ao ar; poeira cruza o feixe | Livro no terço inferior; texto desfocado/ilegível |
| T08.3 | Palco nu, cortinas pesadas imóveis → **inflam** suavemente; frestas de luz ao lado | Cortinas emolduram o quadro; vazio no centro |
| T08.4 | Corredor escuro, portas altas ao fundo com **fio de luz dourada** → portas **cedem** milímetros; poeira é puxada para a fresta | Simetria total; porta no centro; sem figura na luz |

### CENA 09 · ÁPICE (1:23–1:35)
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T09.1 | Portas fechadas com fio de luz → **abrem de uma vez**; luz inunda, bloco de poeira entra | Ângulo baixo, simétrico; contraluz **sem silhueta** |
| T09.2 | Céu monumental, nuvens em time-lapse, rasgo de luz dourada | Céu 90%; só um fio de cume escuro embaixo |
| T09.3 | Cortinas açoitando na horizontal; linhos voam pela nave; partículas → | Travelling frontal; bancos imóveis, tudo mais voa |
| T09.4 | Nave cheia de partículas e feixes de luz; páginas voando ao fundo → push-in para as portas abertas; **queda de exposição** nos últimos 12 frames | Simetria, profundidade longa |

### CENA 10 · SOPRA OUTRA VEZ → RUACH (1:35–2:00)
```
 T10.1 nave escura    T10.2/3 partículas      T10.4 glifo         T10.5 tela final
┌──────────────┐   ┌──────────────┐      ┌──────────────┐    ┌──────────────┐
│   ·          │   │  ○     ·   ○ │      │              │    │  [OBPC LIM]  │
│   ║ ║ ║      │   │ ·    ○  ·    │      │    רוּחַ     │    │  CONFERENCE  │
│  (quase nada)│   │   ·  ○    ·  │      │  (em ouro)   │    │ ██ RUACH ██  │
└──────────────┘   └──────────────┘      └──────────────┘    │14 & 15 NOV.  │
                                                              └──────────────┘
```
| Take | Quadro inicial → final | Composição |
|---|---|---|
| T10.1 | Nave no último feixe → luz morre; cortinas assentam | Plano aberto estático; quase preto |
| T10.2 | Preto com poeira dourada flutuando devagar num feixe suave | Bokeh grande; espaço negativo |
| T10.3 | Mesma atmosfera, mais densa → **congela em suspensão** (1:48.8) | Partículas em profundidade; foco raso |
| T10.4 | Partículas suspensas → **rajada** os varre e agrupa em **רוּחַ** dourado → hold → dissolve em poeira | Glifo centrado, ligeiramente acima do meio |
| T10.5 | Preto/azul → **RUACH** estoura (impacto) → CONFERENCE, logo, data, 19 anos, Ezequiel | Layout idêntico à arte-chave aprovada |

---

## 4. TAKES — FICHAS COMPLETAS

> Legenda: **TC** = `m:ss:ff` (24 fps) · **Gerar** = duração a gerar com handles · **Lente** em equivalente full-frame.
> Em todos: **Cor** = ver seção 10 do arquivo 02. **Mix** = ver seção 11.

---

### ■ CENA 01 — SUPERFÍCIE

#### T01.1 — A água escura
- **TC:** 0:00:00 → 0:05:12 (5,5 s) · **Gerar:** 8 s
- **Plano:** extremo close (macro) · **Lente:** 100 mm macro
- **Câmera:** push-in quase imperceptível (≈ 2% do quadro em 5 s), travada
- **Luz:** um único ponto âmbar (#D6AA5A) refletido, mais nada; sombras #0A1220
- **Atmosfera:** noite absoluta; vapor finíssimo subindo da água
- **Ação:** preto → água imóvel; 1,5 s depois uma brisa invisível toca a esquerda; micro-ondas concêntricas nascem e viajam →
- **Motion:** "ANTES DA FORMA" em Bebas Neue, tracking +300, Marfim 35% — **vapor** (0:02:12 → 0:05:00). Ver arquivo 02, seção 5.
- **Som:** água em respiração (ripple micro) + ar de sala quase imperceptível; sem música.
- **Saída:** corte contínuo para T01.2 (mesma ondulação).

**Prompt**
```
[STYLE-BASE] Extreme macro close-up of the surface of pitch-black water in near total darkness, a single faint warm amber highlight reflected on the surface, the water perfectly still at first, then an invisible breath of air touches the surface and fine concentric micro-ripples slowly spread from left to right, thin wisps of mist rise and drift across the water, 100mm macro lens, ultra-shallow depth of field with oval anamorphic bokeh, extremely slow push-in, no horizon visible, deep midnight blue and black, whisper-low-key lighting, realistic fluid physics, natural slow motion.
```
**Negativo:** `[NEG-BASE], bubbles, fish, splashes, rain, foam, bright light, sparkles, glitter, big waves`

#### T01.2 — A ondulação que vira mar
- **TC:** 0:05:12 → 0:09:00 (3,5 s) · **Gerar:** 6 s
- **Plano:** do macro ao médio-macro (ilusão de escala) · **Lente:** 50 mm
- **Câmera:** push-in lento + leve *crane up* de 15 cm para revelar mais superfície; no último segundo o horizonte entra pelo topo
- **Luz:** filete de ouro pálido nas cristas; ainda muito escuro
- **Atmosfera:** neblina baixa
- **Ação:** uma linha fina de ondas atravessa o quadro →; ao subir a câmera, a "poça" revela-se oceano
- **Som:** água cresce, entra o primeiro sopro de vento grave (80–200 Hz).
- **Saída:** **MATCH CUT DE ESCALA** → T02.1 em 0:09:00, exatamente na palavra "Ruach." (0:08.6), com impacto sub discreto (−30 dB).

**Prompt**
```
[STYLE-BASE] Dark water surface seen from very close, a long thin line of ripples travels across the frame from left to right as an invisible gust brushes the water, a thin rim of pale gold light catches each ripple crest, 50mm lens, slow push-in combined with a very slow rise of the camera revealing a blurred far horizon at the top of the frame so that the scale becomes ambiguous between a puddle and an immense ocean, low drifting mist, deep blue-black water, restrained gold highlights, realistic wave physics, natural slow motion.
```
**Negativo:** `[NEG-BASE], boat, ship, shoreline, rocks, sun disc, sparkles, foam, bright sky`

---

### ■ CENA 02 — ÁGUAS

#### T02.1 — Drone sobre o oceano
- **TC:** 0:09:00 → 0:14:12 (5,5 s) · **Gerar:** 8 s
- **Plano:** aéreo extremamente aberto, 5 m acima da água · **Lente:** 24 mm anamórfica
- **Câmera:** drone, deslize frontal lento e constante (≈ 2 m/s)
- **Luz:** hora azul pré-alvorecer; **fio âmbar no horizonte**; sem disco solar
- **Atmosfera:** nuvens densas em camadas; faixa de névoa no horizonte
- **Ação:** rajadas desenham manchas escuras e estrias que correm →; ondulação longa de escala real
- **Som:** vento de oceano baixo contínuo + água grande; drone grave entra em 0:12 (−32 dB).
- **Saída:** corte invisível (mesma travessia) para T02.2.

**Prompt**
```
[STYLE-BASE] Aerial drone shot gliding slowly forward just five meters above an immense dark ocean at blue hour before dawn, dense layered clouds filling most of the sky, a band of mist lying along the horizon with a thin line of warm amber light cutting through it, gusts of wind draw darker patches and long streaks across the water surface that travel from left to right, long realistic ocean swells, 24mm anamorphic lens, steady slow forward motion, monumental scale, deep blue and black with restrained amber, natural slow motion.
```
**Negativo:** `[NEG-BASE], boat, ship, island, coast, rocks, sun disc, rainbow, sparkling water, whitecaps, storm lightning, seagull`

#### T02.2 — A luz que paira
- **TC:** 0:14:12 → 0:20:00 (5,5 s) · **Gerar:** 8 s
- **Plano:** baixo ângulo rente à água, grande angular · **Lente:** 24 mm anamórfica
- **Câmera:** push-in lentíssimo (≈ 3% em 5 s)
- **Luz:** coluna volumétrica dourada descendo por uma **abertura nas nuvens** e *pousando* num trecho do mar (a "poça de luz" que paira) — **não é o sol**
- **Atmosfera:** céu fechado e pesado; névoa rasteira correndo →
- **Ação:** a poça de luz desliza lentamente pela água; o resto do mar segue azul-preto
- **Som:** vento ganha corpo; drone de cordas graves em fade-in; subgrave discreto.
- **Saída:** a névoa que cruza o quadro à direita é a "cortina" que revela T03.1 (wipe de névoa).

**Prompt**
```
[STYLE-BASE] Monumental wide low-angle shot at the surface level of a dark ocean looking out toward the horizon, a colossal sky of heavy dark clouds with a single opening through which a wide column of golden volumetric light descends and rests on one patch of the water, the pool of light slowly drifts across the surface while low mist crawls from left to right, 24mm anamorphic lens, very slow push-in, deep blue and black with warm gold, awe-inspiring scale, realistic volumetric light, natural slow motion.
```
**Negativo:** `[NEG-BASE], visible sun disc, rainbow, birds, boats, lightning, bright blue sky, silhouettes in the mist, face-like shapes in clouds`

---

### ■ CENA 03 — MATÉRIA DO VENTO

#### T03.1 — Vela · VENTO
- **TC:** 0:20:00 → 0:22:00 (2 s) · **Gerar:** 5 s
- **Plano:** close · **Lente:** 85 mm
- **Câmera:** travada, push-in mínimo
- **Luz:** a própria chama + luz de borda âmbar; fundo preto
- **Atmosfera:** espaço escuro e vazio; fitas de fumaça fina
- **Ação:** chama reta → **inclina** e treme sem apagar; fumaça corre →
- **Motion:** **"VENTO"** — fitas de fumaça cruzam o quadro, por ~0.5 s convergem e desenham as letras (Anton, Marfim) e se desfazem (0:20:12 → 0:21:18).
- **Som:** chama tremulando; sopro curto; 1 gota de água ao fundo.
- **Saída:** passagem de uma nuvem de poeira em primeiro plano (wipe de matéria).

**Prompt**
```
[STYLE-BASE] Close-up of a single tall plain beeswax candle standing on a dark stone surface in a dark empty space, its small flame leans sideways and trembles under an invisible steady breeze but does not go out, thin ribbons of smoke stream horizontally from left to right, pure black background, warm amber rim light, 85mm lens, shallow depth of field, locked-off camera with an almost imperceptible push-in, realistic flame and smoke physics, no hands, no person.
```
**Negativo:** `[NEG-BASE], candelabra, church altar, cross, multiple candles, big fire, sparks flying, wax dripping excessively, hand holding the candle`

#### T03.2 — Areia · SOPRO
- **TC:** 0:22:00 → 0:24:00 (2 s) · **Gerar:** 5 s
- **Plano:** macro/close · **Lente:** 100 mm macro
- **Câmera:** travelling lateral lento →, acompanhando a crista
- **Luz:** contraluz dourado baixo, grãos translúcidos
- **Atmosfera:** deserto silencioso, quente
- **Ação:** véus de areia levantados da crista fluem →
- **Motion:** **"SOPRO"** — grãos pousam numa máscara de texto e são **erodidos** da esquerda para a direita, como o vento leva a areia.
- **Som:** areia sibilando (hiss fino), grãos em saltação.
- **Saída:** corte no instante em que a última linha de areia sai de quadro.

**Prompt**
```
[STYLE-BASE] Extreme close-up macro of a sand dune crest in low golden backlight, an invisible wind lifts fine sand grains off the crest which flow from left to right in glittering translucent veils, crisp ripple texture in the foreground, creamy out-of-focus dunes behind, 100mm macro lens, camera tracking slowly left to right along the crest, warm amber and deep brown shadows, realistic granular physics, natural slow motion.
```
**Negativo:** `[NEG-BASE], footprints, tire tracks, plants, rocks, camel, bright blue sky, harsh midday sun`

#### T03.3 — Linho · ESPÍRITO
- **TC:** 0:24:00 → 0:26:00 (2 s) · **Gerar:** 5 s
- **Plano:** médio-close · **Lente:** 50 mm
- **Câmera:** dolly lateral lenta →
- **Luz:** contraluz suave quente atrás do pano; âmbar nas dobras translúcidas
- **Atmosfera:** salão escuro vazio; névoa ao fundo
- **Ação:** pano de linho cru suspenso numa estrutura de madeira escura **infla** e ondula pela passagem do vento
- **Motion:** **"ESPÍRITO"** — revelado como **relevo luminoso** no tecido (o vento "imprime" a palavra na trama), displacement mapeado no pano.
- **Som:** tecido ondulando/estalando suave; respiração atmosférica.
- **Saída:** o pano infla até preencher o quadro (wipe de tecido).

**Prompt**
```
[STYLE-BASE] A large piece of raw off-white linen cloth hangs from a dark wooden frame in a dark empty hall, softly backlit by warm light, the fabric slowly inflates and ripples as an invisible wind passes through it, thin translucent folds glowing amber, drifting mist in the distance, 50mm lens, slow lateral dolly left to right, shallow depth of field, realistic cloth simulation, nothing and nobody behind the cloth.
```
**Negativo:** `[NEG-BASE], garment, clothes, dress, robe, shirt, shadow behind the fabric, shape behind the cloth, mannequin, curtain rings, stripes`

#### T03.4 — Poeira e folhas · רוּחַ
- **TC:** 0:26:00 → 0:28:00 (2 s) · **Gerar:** 5 s
- **Plano:** close · **Lente:** 85 mm
- **Câmera:** push-in lento
- **Luz:** feixe baixo e quente cortando a escuridão, diagonal
- **Atmosfera:** poeira, folhas secas de oliveira, névoa ao fundo
- **Ação:** milhares de partículas e algumas folhas atravessam o feixe →
- **Motion:** **רוּחַ** — partículas ouro **convergem** e formam o glifo no centro; permanece ~0.5 s e se desfaz (0:26:18 → 0:27:20).
- **Som:** folhas, vento subindo → **CORTE SECO PARA O SILÊNCIO** em 0:28:00.
- **Saída:** corte duro para T04.1 (o silêncio é o corte).

**Prompt**
```
[STYLE-BASE] A shaft of low warm golden light cuts diagonally through darkness, thousands of dust particles and a few dry olive leaves carried by an invisible wind cross the beam from left to right, glowing bokeh circles, drifting mist in the background, 85mm lens, shallow depth of field, slow push-in, deep blue-black background, realistic particle and leaf motion.
```
**Negativo:** `[NEG-BASE], insects, fireflies, sparks, snow, rain, glitter, smoke shaped like a figure`

---

### ■ CENA 04 — O VALE

#### T04.1 — Aéreo do vale
- **TC:** 0:28:00 → 0:33:12 (5,5 s) · **Gerar:** 8 s
- **Plano:** aéreo alto, extremamente aberto · **Lente:** 24 mm
- **Câmera:** drone, deslize frontal **muito lento e constante**
- **Luz:** sol baixo rasante da esquerda; sombras longas; céu dourado-pálido → azul frio no alto
- **Atmosfera:** **ar completamente parado**; névoa fina nos cumes; **nenhuma poeira se move**
- **Ação:** nenhuma — só a câmera se move
- **Som:** **silêncio quase total.** Só um "ar morto" (drone de 38 Hz a −42 dB + estalo mínimo de calor).
- **Saída:** corte contínuo para T04.2.

**Prompt**
```
[STYLE-BASE] High aerial drone shot slowly gliding forward over a vast arid valley of cracked pale clay at dusk, sparse small sun-bleached long bones scattered across the ground at ambiguous scale, absolutely still air, no dust moving, no vegetation, long raking shadows from the left, sky of desaturated pale gold fading to cold blue at the top, haze on the far ridges, 24mm lens, slow constant forward motion, monumental scale, silent and lifeless, photoreal dried-clay geology with polygonal cracks.
```
**Negativo:** `[NEG-BASE], skull, rib cage, complete skeleton, animal carcass, vultures, plants, grass, trees, water, wind, moving dust, blowing sand, bright blue sky, rainbow`

#### T04.2 — Rente ao chão: o osso
- **TC:** 0:33:12 → 0:38:00 (4,5 s) · **Gerar:** 7 s
- **Plano:** travelling baixo (a ~20 cm do solo) · **Lente:** 35 mm
- **Câmera:** dolly frontal lento; **para** perto de um osso grande no último segundo (frame final = frame inicial de T05.1)
- **Luz:** rasante da esquerda
- **Atmosfera:** ar parado; haze nos cumes
- **Ação:** rachaduras passam em paralaxe; osso semi-enterrado em 1º plano. Nada se move.
- **Som:** silêncio; em "Secos." (0:36:00) o drone cai a zero; 1,3 s de silêncio total.
- **Saída:** **match cut** para o macro do osso (T05.1).

**Prompt**
```
[STYLE-BASE] Low tracking shot gliding forward twenty centimeters above cracked dry clay earth, a large weathered sun-bleached long bone half-buried in the foreground passes in parallax, polygonal cracks, far ridges in haze, low sun raking from the left, 35mm lens, slow dolly forward that gently settles close to the bone at the end of the shot, dead still air with no dust at all, absolutely nothing moves except the camera.
```
**Negativo:** `[NEG-BASE], skull, vertebrae, jaw, animal body, plants, insects, lizard, moving dust, wind, water`

---

### ■ CENA 05 — A PERGUNTA

#### T05.1 — Macro do osso
- **TC:** 0:38:00 → 0:42:12 (4,5 s) · **Gerar:** 7 s
- **Plano:** extremo close, macro · **Lente:** 100 mm macro
- **Câmera:** push-in ao longo da superfície (travelling micro)
- **Luz:** rasante quente da esquerda, sombras marrom-profundo
- **Atmosfera:** partículas de poeira **congeladas** no ar
- **Ação:** nenhuma. Grãos de areia em repouso sobre a superfície
- **Som:** silêncio; só "ar parado". "Poderão estes ossos viver?" cai aqui (0:40.4).
- **Saída:** corte para T05.2.

**Prompt**
```
[STYLE-BASE] Extreme macro of the weathered surface of a sun-bleached bone fragment, fine porous texture, hairline cracks, a few grains of sand resting on it, absolute stillness, warm low side light from the left raking the texture, deep brown shadows, 100mm macro lens, ultra-shallow depth of field, very slow push-in along the surface, tiny dust motes frozen in the air, photoreal.
```
**Negativo:** `[NEG-BASE], teeth, marrow, insects, moss, text-like markings, bright light`

#### T05.2 — Os grãos que tremem
- **TC:** 0:42:12 → 0:47:00 (4,5 s) · **Gerar:** 7 s
- **Plano:** macro · **Lente:** 100 mm macro
- **Câmera:** travelling lateral →, bem lento
- **Luz:** contraluz âmbar nos grãos
- **Ação:** 3 grãos **tremem**, depois deslizam e caem na rachadura; um **fio de poeira** sobe
- **Som:** grãos micro (hiss −40 dB); **o vento nasce em 0:44** (quase imperceptível).
- **Saída:** corte para T05.3 (um fio de poeira continua entre os planos).

**Prompt**
```
[STYLE-BASE] Extreme macro of cracked dry clay soil with fine sand grains lying at the edge of a crack, a first almost imperceptible air current makes a few grains tremble, then slide slowly from left to right and fall into the crack, a thin thread of dust lifts and drifts, backlit amber rim light on the grains, 100mm macro lens, ultra-shallow depth of field, slow lateral slide, warm sand and brown palette, realistic granular physics.
```
**Negativo:** `[NEG-BASE], insects, ants, water, plants, footprints, big dust cloud, sand storm`

#### T05.3 — A fita de poeira
- **TC:** 0:47:00 → 0:51:00 (4 s) · **Gerar:** 6 s
- **Plano:** baixo ângulo, médio-aberto · **Lente:** 35 mm
- **Câmera:** push-in lento
- **Luz:** contraluz dourado rasante
- **Atmosfera:** do estático ao *primeiro respiro*
- **Ação:** uma **fita fina de poeira** levanta do solo e cruza o quadro →; ossos no 2º plano; o céu ganha leve movimento
- **Som:** vento em crescimento lento (subida de 0 → −30 dB); cordas graves sustentadas (nota única).
- **Saída:** a fita engrossa e **vira a frente de poeira** de T06.1 (wipe de poeira).

**Prompt**
```
[STYLE-BASE] Low-angle medium-wide shot at ground level in an arid valley at dusk, a thin ribbon of fine dust lifts from the cracked earth and drifts slowly from left to right across the frame in the warm backlight, scattered bleached bones in the mid-ground, the sky above begins to show very slight cloud movement, 35mm lens, slow push-in, atmosphere shifting from dead stillness to a first breath, photoreal.
```
**Negativo:** `[NEG-BASE], tornado, sandstorm, dust devil, plants, vultures, rain, strong wind`

---

### ■ CENA 06 — OS QUATRO VENTOS

#### T06.1 — A frente de poeira
- **TC:** 0:51:00 → 0:54:12 (3,5 s) · **Gerar:** 6 s
- **Plano:** aberto · **Lente:** 24 mm anamórfica
- **Câmera:** push-in lento; areia passa na lente em 1º plano
- **Luz:** contraluz âmbar, volumétrico
- **Atmosfera:** nuvens **correndo** (time-lapse), poeira dourada
- **Ação:** parede de poeira dourada atravessa o vale →, **épica mas gentil** (não apocalíptica)
- **Som:** riser orgânico começa; vento crescendo; cordas em tremolo.
- **Saída:** o primeiro plano de areia vira corte para T06.2.

**Prompt**
```
[STYLE-BASE] Wide shot of an arid valley as a wall of golden dust advances across the cracked earth from left to right, gentle and cinematic rather than apocalyptic, clouds racing across a dramatic sky in time-lapse-like motion, fine sand streaming past the lens in the foreground, bleached bones scattered across the ground, warm amber backlight, 24mm anamorphic lens, slow push-in, volumetric dust, natural slow motion.
```
**Negativo:** `[NEG-BASE], tornado, apocalypse, lightning, rain, buildings, vehicles, trees, vultures`

#### T06.2 — O linho que se levanta
- **TC:** 0:54:12 → 0:58:00 (3,5 s) · **Gerar:** 6 s
- **Plano:** close · **Lente:** 50 mm
- **Câmera:** dolly lento; foco raso
- **Luz:** contraluz dourado; poeira brilhante ao fundo
- **Ação:** pano de linho cru **preso num espinheiro seco** levanta e **estala** ao vento forte →; bordas desfiadas
- **Motion:** início do texto "VEM DOS QUATRO VENTOS" (0:56:07) — as partículas entram pelas 4 bordas e se aproximam.
- **Som:** estalo de tecido; vento intenso; percussão grave **começa a pulsar** (taiko discreto / frame drum).
- **Saída:** as partículas do texto atravessam o corte para T06.3.

**Prompt**
```
[STYLE-BASE] Close-up of a piece of raw off-white linen cloth caught on a dry thorn branch in an arid valley, lifted and snapping in a strong wind blowing from left to right, frayed edges fluttering, backlit golden dust streaming behind it, 50mm lens, shallow depth of field, slow steady dolly, realistic cloth physics, the cloth is a plain flat piece of fabric and not a garment.
```
**Negativo:** `[NEG-BASE], garment, robe, clothing, flag, banner with symbols, rope tied by a person, shape inside the fabric`

#### T06.3 — Ossos que deslizam
- **TC:** 0:58:00 → 1:04:00 (6 s) · **Gerar:** 8 s
- **Plano:** médio, ao nível do chão · **Lente:** 35 mm
- **Câmera:** push-in lento, firme
- **Luz:** contraluz dourado; céu tempestuoso com **fendas de luz quente**
- **Atmosfera:** areia correndo na lente; poeira densa
- **Ação:** ossos longos **deslizam e rolam** só pela força do vento; **nunca se montam em corpo ou esqueleto**
- **Motion:** "VEM DOS QUATRO VENTOS" — formação completa em ~2 s; hold 1.5 s com vibração turbulenta; **rajada** varre as letras → em 1:01:19.
- **Som:** crescimento (riser) até 1:03; vento forte; percussão em pulsação, cordas ascendentes.
- **Saída:** **dust flash** (flash de poeira cor-de-osso, 6 frames) → T07.1, no instante de "entrou." (1:04.6).

**Prompt**
```
[STYLE-BASE] Medium shot at ground level, weathered sun-bleached long bone fragments resting on sand slide and roll gently in a powerful stream of golden dust, sand rushing past the camera in the foreground, cracked earth, a dark stormy sky behind with rifts of warm light, 35mm lens, slow steady push-in, the bones move only by the force of the wind and never assemble into a body or a skeleton, photoreal, natural slow motion.
```
**Negativo:** `[NEG-BASE], assembled skeleton, human shape, skull, ribs, hand shape, moving like a creature, tornado, fire, lightning`

---

### ■ CENA 07 — VIDA

#### T07.1 — A ordem emerge
- **TC:** 1:04:00 → 1:07:00 (3 s) · **Gerar:** 6 s
- **Plano:** médio-aberto, baixo ângulo · **Lente:** 35 mm
- **Câmera:** push-in lento
- **Luz:** rim light quente; poeira dourada em suspensão
- **Ação:** ossos soltos **se alinham** em arcos paralelos, como ondulações de areia, seguindo a direção do vento; a **terra vibra** (poeira "pula" do chão)
- **Som:** "E o sopro entrou." — **subgrave vibra** (38 Hz); a terra *soa* como tambor distante; cordas abrem um acorde (modo maior/aberto).
- **Saída:** corte duro, mesma energia → T07.2.

**Prompt**
```
[STYLE-BASE] Wide-medium low-angle shot of an arid valley floor where weathered sun-bleached bone fragments, moved by the wind, have slowly aligned into orderly parallel arcs following the wind direction like ripples in sand, the earth gently vibrating so that dust hops off the ground, golden dust haze, warm rim light, 35mm lens, slow push-in, symbolic order emerging from chaos, no skeleton, no body shape, no skull.
```
**Negativo:** `[NEG-BASE], assembled skeleton, human shape, skull, ribs, plants, water, lightning, tornado`

#### T07.2 — A água nas rachaduras
- **TC:** 1:07:00 → 1:10:00 (3 s) · **Gerar:** 6 s
- **Plano:** macro · **Lente:** 100 mm macro
- **Câmera:** push-in lento
- **Luz:** contraluz dourado; reflexos nos fios de água
- **Ação:** **água brota de dentro** das rachaduras em fios claros, espalha-se; o solo escurece e "bebe"
- **Som:** uma gota → fios d'água; textura de solo bebendo; vento diminui um degrau; cordas respiram.
- **Saída:** corte para T07.3 com a luz subindo (+0.5 EV).

**Prompt**
```
[STYLE-BASE] Extreme macro of dry cracked earth as clear water wells up from inside the cracks, thin bright threads of water seep and spread across the soil, the ground darkens as it drinks, a few tiny sand grains float on the surface, golden backlight glints on the water, 100mm macro lens, ultra-shallow depth of field, slow push-in, realistic fluid physics, natural slow motion.
```
**Negativo:** `[NEG-BASE], flood, mud splashes, rain storm, fish, plants already grown, footprints`

#### T07.3 — O broto e a luz
- **TC:** 1:10:00 → 1:13:00 (3 s) · **Gerar:** 6 s
- **Plano:** macro → aberto (**rack focus**) · **Lente:** 85 mm
- **Câmera:** push-in lento + rack focus do broto para o vale
- **Luz:** **luz quente inundando** — nuvens se abrem, raios dourados no vale
- **Ação:** broto verde minúsculo rompe o solo e **desdobra duas folhas** (em "viveu.", 1:10:12); gota de orvalho capta luz
- **Som:** "viveu." — **nenhum som por 0.4 s**, depois uma única nota de cordas aberta + sopro quente; respiro 1,8 s.
- **Saída:** **match cut de luz** (raio de luz do vale → feixe da janela da nave, T08.1), em 1:13:00.

**Prompt**
```
[STYLE-BASE] Macro of a tiny vivid green seedling breaking through cracked earth and slowly unfurling its first two leaves, a dew drop catching golden light, then a slow rack focus from the seedling to the vast valley behind where shafts of warm sunlight break through parted storm clouds and light the land, 85mm lens, shallow depth of field, slow push-in, warm light flooding in, green kept restrained and natural, photoreal.
```
**Negativo:** `[NEG-BASE], flowers, tree, big plants, insects, butterfly, bright saturated green, rainbow, lens flare`

---

### ■ CENA 08 — A CASA

#### T08.1 — A nave vazia
- **TC:** 1:13:00 → 1:16:12 (3,5 s) · **Gerar:** 6 s
- **Plano:** aberto, simétrico · **Lente:** 24 mm anamórfica
- **Câmera:** push-in lento pelo corredor central
- **Luz:** janelas altas à esquerda, feixes quentes cheios de poeira; sombras azul-profundo
- **Atmosfera:** ar parado; poeira derivando → muito lentamente
- **Ação:** nenhuma pessoa; poeira começa a se mover mais rápido ao fim do take (o vento chega à casa)
- **Som:** *room tone* de espaço vazio, reverb longo (3.5 s), vento distante vazando por frestas.
- **Saída:** corte para T08.2.

**Prompt**
```
[STYLE-BASE] Wide symmetrical shot of the interior of a completely empty modern chapel with a long nave, rows of simple dark wooden benches, tall narrow windows on the left casting long shafts of warm light full of floating dust, high ceiling, dark reflective floor, no cross, no stained glass figures, no people, no figures, dust drifting gently from left to right, 24mm anamorphic lens, slow push-in down the central aisle, volumetric light, deep blue shadows and amber highlights.
```
**Negativo:** `[NEG-BASE], people sitting on the benches, figure in the aisle, altar cross, saints, candles, flowers, banners, screens, microphones`

#### T08.2 — A Bíblia
- **TC:** 1:16:12 → 1:19:00 (2,5 s) · **Gerar:** 5 s
- **Plano:** close · **Lente:** 85 mm
- **Câmera:** push-in lento
- **Luz:** feixe quente atravessando as páginas; poeira
- **Ação:** Bíblia grande, capa de couro, aberta num atril escuro; páginas finas **levantam e viram** ao ar. **Texto das páginas desfocado/ilegível.**
- **Som:** papel fino; vento entrando; sussurro de páginas.
- **Saída:** a página vira e vira-se em corte para T08.3 (wipe de página).

**Prompt**
```
[STYLE-BASE] Close-up of a large open leather-bound Bible resting on a dark wooden lectern in an empty dark chapel, thin onion-skin pages lift and turn slowly in an invisible breeze, a shaft of warm light full of floating dust crossing the pages, the text on the pages is abstract and out of focus and illegible, 85mm lens, shallow depth of field, slow push-in, realistic paper physics, no hands.
```
**Negativo:** `[NEG-BASE], readable text, legible words, gibberish letters, hands holding the book, bookmark with cross, golden cross on cover, candles, flowers`

#### T08.3 — Palco e cortinas
- **TC:** 1:19:00 → 1:21:00 (2 s) · **Gerar:** 5 s
- **Plano:** travelling · **Lente:** 35 mm
- **Câmera:** travelling lateral lento →
- **Luz:** frestas de luz nas laterais; palco quase escuro
- **Ação:** palco nu, **cortinas pesadas de veludo escuro inflam** suavemente; poeira
- **Som:** tecido pesado ondulando, grave; reverb longo.
- **Saída:** corte para T08.4.

**Prompt**
```
[STYLE-BASE] Tracking shot along the dark bare stage of an empty modern chapel, heavy dark velvet curtains at the sides gently lifting and billowing as an invisible wind moves through, slits of warm light at the edges, floating dust, 35mm lens, slow lateral tracking from left to right, the stage is completely bare with no instruments and no people.
```
**Negativo:** `[NEG-BASE], microphone stand, instruments, speakers, screens, lights rigging visible, musicians, backdrop with logo`

#### T08.4 — As portas entreabertas
- **TC:** 1:21:00 → 1:23:00 (2 s) · **Gerar:** 5 s
- **Plano:** simétrico, corredor · **Lente:** 35 mm
- **Câmera:** push-in lento pelo corredor
- **Luz:** **fio de luz dourada** vazando pelas frestas das portas altas ao fundo
- **Ação:** as portas **cedem milímetros** sob a pressão do vento; poeira é puxada para a fresta
- **Som:** madeira gemendo; vento forte do outro lado; subgrave em tremor.
- **Saída:** **corte seco** na tensão → T09.1 (a porta é o gatilho).

**Prompt**
```
[STYLE-BASE] Long dark corridor leading to tall double wooden doors at its end, thin bright lines of golden light leaking through the cracks around the doors, the doors shift slightly and open a hair's breadth under the pressure of the wind outside, dust pulled toward the gap, 35mm lens, slow push-in down the corridor, symmetrical composition, completely empty, no silhouette in the light.
```
**Negativo:** `[NEG-BASE], silhouette in the doorway, figure standing in the light, door handles with crosses, windows with figures, sign, text on door`

---

### ■ CENA 09 — ÁPICE

#### T09.1 — As portas se abrem
- **TC:** 1:23:00 → 1:26:00 (3 s) · **Gerar:** 6 s (alta velocidade, conformar)
- **Plano:** aberto, baixo ângulo, de dentro da nave · **Lente:** 24 mm anamórfica
- **Câmera:** push-in lento; slow motion natural
- **Luz:** **contraluz dourado ofuscante**; god rays; flare anamórfico horizontal ≤ 10%
- **Ação:** portas **se escancaram** (1:24:19); luz inunda; bloco de poeira entra; cortinas estalam. **Sem silhueta na porta.**
- **Som:** **IMPACTO**: subgrave profundo + rajada massiva + madeira batendo; reverb enorme.
- **Saída:** corte duro → T09.2 (matched na energia).

**Prompt**
```
[STYLE-BASE] Wide low-angle shot from inside an empty dark chapel toward its far end, tall double wooden doors burst fully open by a powerful wind, brilliant golden light floods in with a violent blast of dust and particles streaming into the nave, curtains snapping, empty benches, only blinding backlight and swirling dust in the doorway, 24mm anamorphic lens, slow push-in, volumetric god rays, high contrast, high-speed slow motion.
```
**Negativo:** `[NEG-BASE], silhouette in the doorway, figure standing in the light, person entering, shadow of a person, cross in the light, fire`

#### T09.2 — O céu
- **TC:** 1:26:00 → 1:29:00 (3 s) · **Gerar:** 6 s
- **Plano:** muito aberto, contra-plongée · **Lente:** 24 mm
- **Câmera:** travada, ligeira inclinação para cima (tilt up)
- **Luz:** rasgo de luz dourada entre nuvens negras; sem disco solar
- **Ação:** nuvens correm em **time-lapse**; rasgo se alarga
- **Som:** o "som como de um vento impetuoso" — subgrave + vento enorme + cordas ascendentes. "veio do céu um som…" cai aqui.
- **Saída:** corte para T09.3.

**Prompt**
```
[STYLE-BASE] Low-angle wide shot looking up at an enormous stormy sky of dark clouds racing at high speed in time-lapse, a tear in the clouds revealing warm golden light rays, no visible sun disc, only a thin dark ridge line at the very bottom edge of the frame, 24mm lens, locked-off camera with a slow tilt up, monumental and awe-inspiring, photoreal.
```
**Negativo:** `[NEG-BASE], birds, plane, rainbow, lightning, sun disc, buildings, cross-shaped clouds, face-like clouds`

#### T09.3 — Cortinas e linhos
- **TC:** 1:29:00 → 1:32:00 (3 s) · **Gerar:** 6 s
- **Plano:** travelling frontal · **Lente:** 35 mm
- **Câmera:** push-in contínuo; slow motion natural
- **Luz:** feixes violentos cruzando poeira
- **Ação:** cortinas pesadas **açoitam na horizontal**; peças de linho cru **voam** pela nave; partículas → ; bancos imóveis
- **Som:** tecidos estalando; vento rugindo; percussão profunda; cordas no máximo.
- **Saída:** corte duro → T09.4.

**Prompt**
```
[STYLE-BASE] Interior of an empty chapel in violent but controlled wind, heavy dark curtains whipping horizontally, loose pieces of raw off-white linen cloth flying through the air along the nave, dust and golden particles streaming from left to right through shafts of light, empty benches unmoved, 35mm lens, camera moving steadily forward, high-speed slow motion, no people.
```
**Negativo:** `[NEG-BASE], garment flying, person's clothes, flags, banners with symbols, birds, fire`

#### T09.4 — A nave cheia
- **TC:** 1:32:00 → 1:35:00 (3 s) · **Gerar:** 6 s
- **Plano:** aberto, simétrico · **Lente:** 24 mm anamórfica
- **Câmera:** push-in em direção às portas abertas; **últimos 12 frames: queda de exposição de −4 stops**
- **Luz:** feixes das janelas + luz de fundo das portas, intensidade máxima
- **Atmosfera:** nave *cheia* de partículas; páginas da Bíblia batendo ao fundo; linhos pairando
- **Som:** clímax: tudo ao máximo; **em 1:34:14 tudo cai de uma vez** (música corta, vento morre; fica só uma cauda de reverb).
- **Saída:** **dip de exposição → T10.1**.

**Prompt**
```
[STYLE-BASE] Wide symmetrical view of an empty chapel nave completely filled with wind-driven golden particles and dust, shafts of intense warm light from the tall windows and the open doors at the far end, pages of an open Bible on a distant lectern riffling, pieces of linen cloth floating in mid-air, everything vibrating with energy, 24mm anamorphic lens, slow push-in toward the open doors, volumetric lighting, cinematic climax, subtle horizontal anamorphic streak on the strongest light.
```
**Negativo:** `[NEG-BASE], silhouette in the doorway, figure, birds, fire, cross, lens flare covering the frame, text on pages`

---

### ■ CENA 10 — SOPRA OUTRA VEZ → RUACH

#### T10.1 — A nave escurece
- **TC:** 1:35:00 → 1:39:00 (4 s) · **Gerar:** 6 s
- **Plano:** aberto estático · **Lente:** 24 mm
- **Câmera:** pull-back mínimo
- **Luz:** quase preto; **um último feixe** que morre
- **Atmosfera:** cortinas assentam; partículas caem lentamente
- **Som:** cauda de reverb + vento que some; "E a nossa oração continua sendo a mesma:" começa em 1:36.5, voz **íntima**.
- **Saída:** dissolve lento (1 s) para T10.2.

**Prompt**
```
[STYLE-BASE] The same empty chapel nave after the wind has died, almost entirely dark, only a faint last beam of warm light, a few dust particles drifting slowly downward, curtains settling into stillness, deep blue-black shadows, wide static shot, 24mm lens, very slow pull-back, absolute stillness, low-key lighting.
```
**Negativo:** `[NEG-BASE], figure in the aisle, light switch, lamp, screens, cross, bright light, fire`

#### T10.2 — Campo de partículas A
- **TC:** 1:39:00 → 1:45:00 (6 s) · **Gerar:** 8 s
- **Plano:** macro/abstrato · **Lente:** 100 mm macro
- **Câmera:** deriva frontal lentíssima
- **Luz:** um feixe suave quente num preto profundo
- **Ação:** poeira dourada flutua lentamente; bokeh anamórfico oval
- **Som:** só o vento muito baixo; voz: "Sopra outra vez." (1:40.0), "Sopra sobre a tua Igreja." (1:42.2)
- **Saída:** dissolve (12 frames) para T10.3.

**Prompt**
```
[STYLE-BASE] Pure black background with sparse golden dust particles floating very slowly through a single soft warm shaft of light, large soft bokeh circles with oval anamorphic shape, extremely shallow depth of field, slow forward drift of the camera, tiny amber sparks of light, 100mm macro lens, premium cinematic particulate atmosphere, deep black.
```
**Negativo:** `[NEG-BASE], snow, stars, galaxy, fireflies, smoke figure, lens flare, text, bright background`

#### T10.3 — Campo de partículas B (congelamento)
- **TC:** 1:45:00 → 1:50:12 (5,5 s) · **Gerar:** 8 s
- **Plano:** macro/abstrato, mais denso · **Lente:** 100 mm macro
- **Câmera:** deriva ainda mais lenta; **freeze** (time-remap a 0% em 1:48:19)
- **Ação:** as partículas desaceleram até ficarem **suspensas no ar** (silêncio total)
- **Som:** "Sopra sobre esta geração." (1:44.9) · "Sopra sobre nós." (1:47.6) · **1:48.8 silêncio TOTAL** · **1:50.5 rajada única**
- **Saída:** a rajada **varre** as partículas → T10.4.

**Prompt**
```
[STYLE-BASE] Dense field of golden dust particles hanging in a soft warm light against pure black, particles drifting slower and slower until they appear suspended in the air, large soft bokeh with oval anamorphic shape, extremely shallow depth of field, almost no camera movement, 100mm macro lens, deep black, serene and tense atmosphere, premium cinematic particulate atmosphere.
```
**Negativo:** `[NEG-BASE], snow, stars, galaxy, fireflies, smoke figure, lens flare, text, bright background`

#### T10.4 — O glifo רוּחַ
- **TC:** 1:50:12 → 1:56:00 (5,5 s) · **Composição (AE/Particular/Houdini), sem geração de vídeo**
- **Fundo:** plate de T10.3 + camada de névoa (prompt abaixo, opcional)
- **Câmera virtual:** push-in 3% em 5 s
- **Ação:** 1:50:12 rajada → 1:50:19 partículas varridas → **formação** do glifo (2.5 s) → **hold** 2.0 s → **dissolução** em poeira → direita (0.7 s)
- **Som:** rajada única; vento cai; todo o resto = silêncio; sub-pulso sutil de 38 Hz em 1:53 (coração da palavra).
- **Saída:** a poeira da dissolução some em preto em 1:55:23; **corte para o IMPACTO** em 1:56:00.
- **Receita completa:** arquivo 02, seção 5.

**Prompt (plate de fundo opcional)**
```
[STYLE-BASE] Very dark volumetric mist drifting slowly from left to right over pure black, a faint warm amber glow along the very bottom edge of the frame, extremely subtle, 50mm lens, shallow depth of field, locked-off camera, minimal and elegant, deep blue-black.
```
**Negativo:** `[NEG-BASE], bright light, fire, smoke figure, face-like shape in mist`

#### T10.5 — Tela final: RUACH
- **TC:** 1:56:00 → 2:00:00 (4 s) · **Motion graphic**
- **Resumo:** impacto de RUACH em 1:56:00 → CONFERENCE → logo → data → 19 anos → Ezequiel. **Corte seco 2:00:00.**
- **Receita completa e posições:** arquivo 02, seção 13.

**Prompt (plate de fundo do gradiente — opcional)**
```
[STYLE-BASE] Smooth atmospheric gradient background from deep midnight blue at the top to warm dark brown and amber at the bottom, a faint glow of warm light rising from the lower edge, extremely subtle thin wavy lines of mist across the sky, elegant and minimal, 50mm lens, locked-off, premium editorial look, no objects.
```
**Negativo:** `[NEG-BASE], sun, horizon objects, clouds with shapes, stars, mountains, bright light`

---

## QUADRO-RESUMO DOS 32 TAKES

| # | Take | TC in | TC out | Dur. | Lente | Tipo | Motion |
|---|---|---|---|---|---|---|---|
| 1 | T01.1 | 0:00:00 | 0:05:12 | 5,5 s | 100 | Gerado | ANTES DA FORMA |
| 2 | T01.2 | 0:05:12 | 0:09:00 | 3,5 s | 50 | Gerado | — |
| 3 | T02.1 | 0:09:00 | 0:14:12 | 5,5 s | 24 | Gerado | — |
| 4 | T02.2 | 0:14:12 | 0:20:00 | 5,5 s | 24 | Gerado | — |
| 5 | T03.1 | 0:20:00 | 0:22:00 | 2 s | 85 | Gerado | VENTO |
| 6 | T03.2 | 0:22:00 | 0:24:00 | 2 s | 100 | Gerado | SOPRO |
| 7 | T03.3 | 0:24:00 | 0:26:00 | 2 s | 50 | Gerado | ESPÍRITO |
| 8 | T03.4 | 0:26:00 | 0:28:00 | 2 s | 85 | Gerado | רוּחַ |
| 9 | T04.1 | 0:28:00 | 0:33:12 | 5,5 s | 24 | Gerado | — |
| 10 | T04.2 | 0:33:12 | 0:38:00 | 4,5 s | 35 | Gerado | — |
| 11 | T05.1 | 0:38:00 | 0:42:12 | 4,5 s | 100 | Gerado | — |
| 12 | T05.2 | 0:42:12 | 0:47:00 | 4,5 s | 100 | Gerado | — |
| 13 | T05.3 | 0:47:00 | 0:51:00 | 4 s | 35 | Gerado | — |
| 14 | T06.1 | 0:51:00 | 0:54:12 | 3,5 s | 24 | Gerado | — |
| 15 | T06.2 | 0:54:12 | 0:58:00 | 3,5 s | 50 | Gerado | VEM DOS QUATRO VENTOS (início) |
| 16 | T06.3 | 0:58:00 | 1:04:00 | 6 s | 35 | Gerado | VEM DOS QUATRO VENTOS |
| 17 | T07.1 | 1:04:00 | 1:07:00 | 3 s | 35 | Gerado | — |
| 18 | T07.2 | 1:07:00 | 1:10:00 | 3 s | 100 | Gerado | — |
| 19 | T07.3 | 1:10:00 | 1:13:00 | 3 s | 85 | Gerado | — |
| 20 | T08.1 | 1:13:00 | 1:16:12 | 3,5 s | 24 | Gerado | — |
| 21 | T08.2 | 1:16:12 | 1:19:00 | 2,5 s | 85 | Gerado | — |
| 22 | T08.3 | 1:19:00 | 1:21:00 | 2 s | 35 | Gerado | — |
| 23 | T08.4 | 1:21:00 | 1:23:00 | 2 s | 35 | Gerado | — |
| 24 | T09.1 | 1:23:00 | 1:26:00 | 3 s | 24 | Gerado | — |
| 25 | T09.2 | 1:26:00 | 1:29:00 | 3 s | 24 | Gerado | — |
| 26 | T09.3 | 1:29:00 | 1:32:00 | 3 s | 35 | Gerado | — |
| 27 | T09.4 | 1:32:00 | 1:35:00 | 3 s | 24 | Gerado | — |
| 28 | T10.1 | 1:35:00 | 1:39:00 | 4 s | 24 | Gerado | — |
| 29 | T10.2 | 1:39:00 | 1:45:00 | 6 s | 100 | Gerado | — |
| 30 | T10.3 | 1:45:00 | 1:50:12 | 5,5 s | 100 | Gerado | — |
| 31 | T10.4 | 1:50:12 | 1:56:00 | 5,5 s | — | Composição | רוּחַ |
| 32 | T10.5 | 1:56:00 | 2:00:00 | 4 s | — | Motion | RUACH · tela final |

**Soma:** 120,0 s = 2:00:00 ✓ (sem lacunas entre os takes).

> Observação: T01.1 e T01.2 começam em preto (T01.1: 0:00:00–0:01:00 preto absoluto, fade-in 1 s).
