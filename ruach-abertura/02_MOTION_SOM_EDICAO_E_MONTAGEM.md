# RUACH CONFERENCE 2026 — FILME DE ABERTURA
### Dossiê de produção · Parte 3 de 3 — Motion, som, trilha, edição, cor, mix, narração, tela final e montagem

> Todos os timecodes seguem o Master 2:00:00 (`m:ss:ff` a 24 fps). Seções numeradas conforme a lista de entrega (5–14 aqui; 1–4 nos arquivos anteriores).

---

## 5. MOTION DESIGN (item 11)

### 5.1 · Princípio
> **A tipografia não "aparece". Ela é feita de matéria, e a matéria é movida pelo vento.**
> Nunca fade simples. Toda palavra nasce de um elemento *da cena em que está* (névoa, fumaça, areia, tecido, poeira) e **morre arrastada na direção do vento (esquerda → direita)**.

### 5.2 · Especificações globais

| Item | Valor |
|---|---|
| Fontes | Anton (títulos), Archivo Black (datas), Bebas Neue (apoio), Noto Serif Hebrew Bold (רוּחַ) — ver seção 0.A |
| Cor de texto | Marfim `#F5EEDF` (núcleo) com halo Ouro `#D6AA5A`/`#F5C562` (glow 8–14%) |
| Partículas | 80–200 mil por palavra; tamanho 1–3 px (em 4K); variação de tamanho 1:6; motion blur 180°; DOF ligado |
| Física | Turbulência com direção dominante → (X+); *wind* constante + *curl noise* para não parecer "efeito" |
| Tempo de formação | 0,5–0,8 s (palavras curtas) · 2,0–2,5 s (glifo, frase) |
| Hold | 0,5 s (palavras da Cena 03) · 1,5–2,0 s (frases/glifo) |
| Dissolução | sempre → direita, ~0,6–0,8 s, partículas saindo do quadro, **nunca fade** |
| Respiração | micro-vibração turbulenta (amplitude ≤ 1 px) durante o hold: o texto está "vivo" |
| Sombra/ocupação | texto **integrado à profundidade**: leve DOF, paralaxe com o fundo (≤ 2%), reage à luz da cena |
| Segurança | texto central dentro de 90% da área do quadro |

### 5.3 · Ferramentas (escolher uma trilha)
- **After Effects + Trapcode Particular/Form** (mais rápido): partículas a partir de camada de texto + campo de turbulência + *Fractal Noise* para névoa.
- **Blender** (Geometry Nodes + *Mantaflow* ou campos de ruído): gratuito, mais controle de profundidade.
- **Houdini (Pyro/POP)**: máximo realismo, mais curva de aprendizado.
- **Truque universal — "dissolve e reverte":** simule o texto **se desfazendo** (dispersão) e **inverta o tempo** → vira **formação**. É mais controlável que simular a formação.

### 5.4 · Receitas por título

#### M1 · "ANTES DA FORMA" (T01.1) — *vapor*
- **TC:** 0:02:12 → 0:05:00 (2,5 s) · Bebas Neue, tracking +300, Marfim 35% de opacidade, tamanho ≈ 3,2% da altura do quadro, posição: terço médio, ligeiramente à esquerda
- **Técnica:** camada *Fractal Noise* (escala grande, evolução lenta) multiplicada pela máscara do texto → "vapor"; *Turbulent Displace* (amount 30, size 90) animado de 40 → 0 na formação e de 0 → 60 na dissolução; blur 0 → 6 px.
- **Timing:** surge em 0.9 s junto com as micro-ondas da água; permanece 0.8 s; **desfaz-se → direita** como se o sopro o levasse.
- **Contexto:** o vapor do texto deve **ser o mesmo vapor da água** — espelhar leve reflexo na superfície (opacidade 8%).

#### M2 · "VENTO" (T03.1) — *fumaça*
- **TC:** 0:20:12 → 0:21:18
- **Técnica:** 3 emissores de fumaça fina (linhas de partículas) que se movem → e **passam por uma máscara de texto**; por ~0.5 s o fluxo "adere" à forma das letras (partículas atraídas ao contorno com *Spherical Field/Attract to Mask*), depois solta.
- **Cor:** fumaça cinza-marfim (#E8DFC9) com luz de borda âmbar vinda da chama.
- **Integração:** a chama da vela **ilumina** as letras (luz pontual de 3D no AE, falloff).

#### M3 · "SOPRO" (T03.2) — *areia*
- **TC:** 0:22:10 → 0:23:18
- **Técnica:** grãos (partículas 1–2 px, dourados) pousam numa máscara de texto → formam "SOPRO" por acúmulo; a erosão começa **pela borda esquerda** (barlavento) e leva os grãos em saltação → (partículas com gravidade baixa, vento X+).
- **Detalhe:** pequenos montes de areia sob as letras (depth map) para ancorar no chão da duna.

#### M4 · "ESPÍRITO" (T03.3) — *relevo luminoso no linho*
- **TC:** 0:24:10 → 0:25:18
- **Técnica:** texto Anton Marfim convertido em **mapa de altura/normal**; aplicado ao pano com *Displacement Map* e *CC Glass*; luz de contraluz ganha brilho onde o tecido "estufa". Efeito: a palavra é *impressa pelo sopro* na trama e sobe como relevo luminoso.
- **Saída:** o pano infla; o relevo é "esticado" e some na própria dobra.

#### M5 · "רוּחַ" (T03.4) — *partículas ouro (versão curta, 0.5 s)*
- **TC:** 0:26:18 → 0:27:20
- **Técnica:** idêntica à M9 (versão longa), mas com **~60% do tempo**. Mesma fonte, mesmo tamanho (ocupa ~14% da largura do quadro).
- **Cuidado:** esta é a *primeira* aparição do glifo; a **segunda** (M9, no final) é a **definitiva**: maior, mais lenta, com hold.

#### M6 · "VEM DOS QUATRO VENTOS" (T06.2 → T06.3) — *as quatro bordas*
- **TC:** 0:56:07 (início da formação) → 1:01:19 (rajada) · Anton, Marfim, 2 linhas ("VEM DOS" / "QUATRO VENTOS"), largura ≈ 38% do quadro, centro-superior
- **Técnica:**
  1. **4 emissores**, um por borda (N, S, E, O), partículas atraídas ao centro com *Attract to Mask* do texto → letras se formam **no ritmo da fala** (palavra por palavra: VEM 0:56.3, DOS 0:56.8, QUATRO 0:57.3, VENTOS 0:57.9);
  2. hold 1,5 s com turbulência (amplitude 1 px) e glow que "respira" com a percussão;
  3. **rajada** (vento global X+ aumenta de 0 → 1 em 8 frames) varre as letras → em **1:01:19**, sincronizada ao "para que vivam" (1:01.3), de modo que as letras sejam levadas pelo vento no fim da frase.
- **Atravessar o corte:** as partículas continuam contínuas entre T06.2 e T06.3 (o corte não as interrompe).

#### M7 · (reservado)
Nenhum texto adicional entre 1:01:19 e 1:55:23, exceto o glifo final. **O silêncio tipográfico ao longo das Cenas 07–09 é proposital:** o público só lê de novo quando aparece o glifo.

#### M8 · Partículas estruturais (T10.2 → T10.3)
- **TC:** 1:39:00 → 1:50:12 · não é texto; é o "elenco" do glifo.
- **Técnica:** campo de partículas 3D (150–200 mil) com DOF muito raso, deriva lenta; no **1:48:19** o tempo é remapeado a **0%** (*freeze* — partículas suspensas). A rajada em 1:50:12 inverte o fluxo e as conduz ao glifo.

#### M9 · "רוּחַ" (T10.4) — *versão definitiva*
- **TC:** 1:50:19 (início da formação) → 1:55:23 (dissolução completa)
  - 1:50:19 → 1:53:07 formação (2,5 s)
  - 1:53:07 → 1:55:07 **hold (2,0 s)**, vibração micro, glow pulsando 1x com o sub-pulso de 38 Hz em 1:53:00
  - 1:55:07 → 1:55:23 dissolução → direita (0,7 s), partículas somem em preto
- **Aparência:** núcleo Marfim `#F5EEDF`, halo Ouro `#D6AA5A` → `#F5C562` nas bordas; ocupa ~28% da largura do quadro; centro um pouco acima do meio (y = 46%).
- **Vetor:** trabalhar a partir de **SVG vetorizado do glifo** (ver 0.A) para garantir niqqud correto.
- **Câmera virtual:** push-in 3% durante os 5,5 s.

#### M10 · Final RUACH — ver seção 13.

### 5.5 · Checklist de motion (cada título)
- [ ] Nasce de matéria da cena (não de "efeito")?
- [ ] Dissolve → direita (nunca fade)?
- [ ] Legível em 0.5 s (palavras curtas) / 2 s (frases)?
- [ ] Tem DOF e paralaxe?
- [ ] O glow não estoura o preto (≤ 85% de luminância)?
- [ ] O hebraico está com vogais (niqqud) corretas?

---

## 6. SOUND DESIGN (item 12)

### 6.1 · Princípio
**Um único vento atravessa o filme inteiro.** É o mesmo sopro, com timbres diferentes ao tocar cada matéria. O público não deve perceber cortes de som — só *mudança de material*.

### 6.2 · O mapa do vento

| TC | Material | Timbre do vento | Nível relativo | Notas |
|---|---|---|---|---|
| 0:00–0:09 | **Água** | Ar baixo, quase nenhum; brisa de 200–600 Hz sobre a água; *lapping* ultra-suave | −46 → −34 dB | Começa quase no limiar da audição |
| 0:09–0:20 | **Oceano** | Vento largo, grave (80–300 Hz), com "estrada" de ondas | −34 → −26 | Primeiro sub-bass discreto (35–45 Hz) |
| 0:20–0:28 | **Tecido / vela / areia / folhas** | Sopro com *textura* (sibilar, ruído de grão, tecido) | −28 | Cada matéria tem seu *whoosh* curtinho |
| 0:28–0:38 | **Vale (morto)** | **Nenhum vento.** Ar parado, calor estalando, *dead air* | −∞ a −45 | O **corte de áudio** em 0:28:00 é o evento sonoro |
| 0:38–0:51 | **Grão / osso** | 1º respiro: grãos de areia em movimento, fio de ar | −45 → −30 | Nasce em 0:44 |
| 0:51–1:04 | **Vale (vivo)** | Vento largo e crescente + areia + tecido estalando | −30 → −12 | Entram 4 camadas de "vento" (ver 6.4) |
| 1:04–1:13 | **Vida** | Vento cai um degrau; **terra vibra** (sub), água brota | −20 → −26 | Respiro de alívio |
| 1:13–1:23 | **Casa** | Vento *interno*: frestas, assobio, papel, tecido pesado, madeira | −32 → −16 | Reverb de ambiente grande |
| 1:23–1:35 | **Ápice** | Vento **enorme** + portas + cortinas + sub | −10 (pico) | Tudo na frente |
| 1:35–1:48 | **Decay** | Vento caindo, cauda de reverb, partículas silenciosas | −24 → −44 | Intimidade |
| 1:48.8–1:50.5 | **SILÊNCIO** | Corte total (ruído de sala −70 dB só) | −∞ | O maior evento da peça |
| 1:50.5–1:50.8 | **Rajada única** | Pico curto de vento largo + sub; lembra a de T02, mas mais densa | −6 | Atravessa de L a R (pan) |
| 1:55.9 | **Impacto RUACH** | Impacto grave curto (38–55 Hz) + "ar" fechando | −3 | Ver 6.5 |
| 1:56–2:00 | **Cauda** | Vento fino (cauda da rajada) sob a voz | −38 | **Corte seco** em 2:00:00 |

### 6.3 · Elementos sonoros por tipo

| Tipo | Fonte recomendada | Observações |
|---|---|---|
| **Vento real** | Gravações de campo (vento em campo aberto, em cânion, por frestas de portas, por tecido). Biblioteca profissional ou gravação própria com microfone + windscreen (*dead cat*) em dias ventosos. | Evitar "whoosh" de biblioteca genérico. Misturar 3–4 gravações por cena. |
| **Água** | *Lapping* em cuba pequena, mar largo, gota única. | Cada gota é um **"batimento"** discreto (usada em T03.1 e T07.2). |
| **Areia / poeira** | Areia em tambor/peneira, grãos em papel, camurça. | Foley (gravar próprio): fácil e eficaz. |
| **Tecidos** | Linho estalando em ventilador; veludo pesado. | Ventilador a 3 m, mic em X/Y. |
| **Folhas** | Folhas secas amassadas e soltas em ventilador (foley) | O foley pode ser feito por pessoas; a regra de zero pessoas vale só para a **imagem**. |
| **Madeira / portas** | Dobradiças grandes, madeira gemendo sob pressão. | Pitch-down –3 a –6 semitons para peso. |
| **Papel (Bíblia)** | Papel bíblia fino folheado perto do mic. | Recorte; vento filtrado 4–10 kHz. |
| **Subgraves** | Sintetizado: seno 38 Hz com *attack* lento; **sub-pulso** em eventos-chave. | HPF no master em 28 Hz (para não saturar PA). |
| **Respiração atmosférica** | Sopro sobre garrafa, ar em tubo, tom de sala amplificado. | Usar com muita moderação: 2–3 momentos (1:09, 1:50, 1:56). |
| **Impactos** | *Taiko* muito grave tratado; **Pitched-down** de pandeiro grande; ***boom*** de madeira. | Sem "braam" de trailer. |
| **Rumble** | Gravação de caminhão distante filtrada (< 80 Hz) ou sintetizado. | Para Cena 09. |

### 6.4 · Camadas do vento por cena (para montagem em A3/A4)

| Cena | Camada 1 (base) | Camada 2 (corpo) | Camada 3 (textura) | Camada 4 (detalhe) |
|---|---|---|---|---|
| 01 | tom de sala | brisa baixa | lapping micro | — |
| 02 | oceano largo | vento 80–300 Hz | névoa (hiss –) | gota única |
| 03 | vento médio | tecido/folha/areia (curtos) | partículas | chama (vela) |
| 04 | *dead air* | — | estalo de calor | — |
| 05 | fio de ar | areia (grão) | — | osso (leve "tic") |
| 06 | vento largo | areia contínua | tecido estalando | rumble |
| 07 | vento (baixo) | sub 38 Hz | água/gotas | broto (*creak* leve) |
| 08 | tom da sala | frestas | papel/tecido/madeira | dobradiça |
| 09 | vento enorme | rumble | tecido/madeira/portas | sub |
| 10 | decay | — | partículas | rajada única |

### 6.5 · Eventos-chave de som (cue list de SFX)

| TC | Evento | Descrição |
|---|---|---|
| 0:09:00 | Hit sub #1 | *Sub-hit* discreto (−30 dB) no match cut de escala; coincide com "Ruach." |
| 0:28:00 | **Corte para silêncio** | Todo o vento morre em 1 frame; *dead air* fica |
| 0:44:00 | Nasce o vento | Fio de ar (−45 dB) |
| 0:51:00 | Início do riser | Riser orgânico (cordas + ar) |
| 0:56:07 | "Vem dos quatro ventos" | Percussão grave 1/seg + vento em 4 camadas |
| 1:01:19 | Rajada | Pico de vento (varre o texto) |
| 1:04:14 | "E o sopro entrou." | **Sub vibra (38 Hz)** — a terra "soa" |
| 1:09:00 → 1:10:12 | Silêncio parcial | Tudo baixa para dar espaço ao "viveu." |
| 1:10:12 | "viveu." | Nota única aberta + sopro quente |
| 1:21:00 | Portas gemem | Madeira sob pressão |
| 1:24:19 | **Portas abrem** | **Impacto** (sub + rajada + madeira) |
| 1:34:14 | **Queda de tudo** | Música corta; vento morre; resta cauda de reverb |
| 1:48:19 | **Silêncio total** | Tudo para; −∞ (só tom de sala −70 dB) |
| 1:50:12 | **Rajada única** | 0.6 s, pan L→R |
| 1:53:00 | Sub-pulso | 38 Hz, 1 pulso (coração do glifo) |
| 1:56:00 | **IMPACTO RUACH** | Grave curto, seco, + fechamento de ar |
| 2:00:00 | **Corte seco** | Tudo para no mesmo frame |

---

## 7. TRILHA SONORA (item 13)

### 7.1 · Conceito
> **Música como o próprio sopro: orgânica, sem tema heroico, sem melodia de herói.** Cordas graves, texturas, sub e percussão profunda discreta. Ela só existe quando o vento existe.

- **Tonalidade:** Ré (D). Modo **Ré menor/Dórico** (tensão) → **Ré maior aberto (add9, sem 3ª em alguns momentos)** em "viveu."
- **Tempo de referência:** 60 BPM (pulso de 1 s), compasso 4/4 — usado só como metrônomo da percussão grave.
- **Instrumentação:** contrabaixos e violoncelos (sul ponticello, tremolo, harmônicos), drone de órgão de tubo **ou** pad sintético escuro, sub-sine 38 Hz, **frame drums/taikos** muito graves (sem "marcha"), metais **não** (evitar heroico), piano **não**, coro **não**.
- **Evitar:** trilha de trailer ("braams"), melodia sentimental, loops de biblioteca, bateria.

### 7.2 · Cue sheet

| TC | Cue | Descrição | Nível (vs. VO) |
|---|---|---|---|
| 0:00–0:20 | **Sem música** | Só água, vento, ambiente. | — |
| 0:20 | Drone (entrada) | Pad grave em D1 + sub 38 Hz, *fade-in* de 2 s | −32 dB |
| 0:26–0:28 | Swell curto | *Swell* discreto até o corte | −26 dB |
| **0:28** | **CORTE** | **Música corta junto com o vento.** | −∞ |
| 0:28–0:44 | Silêncio | "Silêncio e tensão" | — |
| 0:44 | Cordas (nota única) | Harmônico agudo de violoncelo, muito baixo | −38 dB |
| 0:51 | **Riser orgânico** | Tremolo de cordas + ar + metal bowed | sobe de −34 a −18 dB |
| 0:55 | Percussão grave (pulsação) | Frame drum/taiko, 1 batida a cada 1 s | −24 dB |
| **0:56:07** | **"Vem dos quatro ventos" — GRANDE CRESCIMENTO** | Cordas ascendentes em ostinato lento (D–A–D), percussão cresce | −18 → −8 |
| 1:04:14 | "entrou." | **Acorde aberto** (D–A–E, sem 3ª) + sub | −14 |
| 1:07 | Respiro | Cordas sustentadas, percussão some | −24 |
| 1:10:12 | "viveu." | **Nota única** aberta (violino/violoncelo) e silêncio de 0.4 s antes | −20 |
| 1:13 | Pad + harmônicos | Casa vazia; um pad quente de órgão | −28 |
| 1:21 | Tensão (portas) | Tremolo de cordas + sub crescente | −22 → −16 |
| **1:24:19** | **ÁPICE** | Cordas em movimento amplo + subgrave + percussão profunda + atmosfera enorme | −6 (máx.) |
| 1:30 | Pico de sustentação | Cordas agudas em sustain + rumble | −6 |
| **1:34:14** | **CORTE TOTAL** | Música corta (reverb tail 2 s) | −∞ |
| 1:34:14 → 1:56:00 | **Sem música** | **Só vento** (decay) e depois silêncio | — |
| **1:56:00** | **IMPACTO** | Impacto grave curto (taiko pitched-down + sub) | −3 |
| 1:56:00 → 2:00:00 | Sem música | Só cauda do vento sob a voz | — |

### 7.3 · Briefing para compositor / geração de música
```
Cinematic biblical score, no melody, no hero theme, no choir, no brass, no drums kit.
Key of D. Tempo 60 BPM. Low strings (celli, basses) in tremolo and sul ponticello, bowed metal,
dark pad (pipe organ or analog), sub-sine at 38 Hz, deep frame drums used as a slow pulse.
Structure for 2:00:
0:00-0:20 silence / ambient only; 0:20 drone fade-in; 0:28 hard cut to silence;
0:44 single cello harmonic; 0:51 organic riser; 0:56 big growth (ostinato D-A-D, deep pulse);
1:04 open chord D-A-E (no 3rd); 1:10 single sustained note then silence;
1:13 warm pad; 1:21 tension tremolo; 1:24 climax (wide strings + sub + deep percussion);
1:34 hard cut to silence. No music afterwards.
Deliver stems: strings, pad/drone, percussion, sub, risers/FX.
```

---

## 8. TRANSIÇÕES (item 14)

> **Nenhuma transição genérica.** Todas são **de matéria**, **de som** ou **de escala**, e quase todas ocorrem na direção do vento (→).

| # | De → Para | Tipo | Duração | Como |
|---|---|---|---|---|
| 1 | T01.1 → T01.2 | Contínuo | 0 | Mesma ondulação |
| 2 | T01.2 → T02.1 | **Match cut de ESCALA** | 1 frame | Ondulação → mar (impacto sub + "Ruach.") |
| 3 | T02.1 → T02.2 | Contínuo | 0 | Mesma travessia |
| 4 | T02.2 → T03.1 | **Wipe de névoa** | 14 frames | Névoa cruza o quadro → e revela a vela |
| 5 | T03.1 → T03.2 | **Wipe de matéria** | 8 frames | Nuvem de poeira passa em 1º plano |
| 6 | T03.2 → T03.3 | **Wipe de areia** | 8 frames | A última linha de areia sai e entra o linho |
| 7 | T03.3 → T03.4 | **Wipe de tecido** | 8 frames | O pano infla até preencher o quadro |
| 8 | T03.4 → T04.1 | **CORTE SECO + SILÊNCIO** | 1 frame | O **silêncio é a transição** (áudio morre) |
| 9 | T04.1 → T04.2 | Contínuo | 0 | Mesma travessia |
| 10 | T04.2 → T05.1 | **Match cut de osso** | 1 frame | Osso grande → macro do mesmo osso |
| 11 | T05.1 → T05.2 | Corte seco | 1 frame | Corte na pausa de 2,2 s |
| 12 | T05.2 → T05.3 | Contínuo (fio de poeira) | 6 frames | Fio de poeira atravessa o corte |
| 13 | T05.3 → T06.1 | **Wipe de poeira** | 12 frames | A fita engrossa e vira frente de poeira |
| 14 | T06.1 → T06.2 | **Wipe de areia (1º plano)** | 6 frames | Areia passa na lente |
| 15 | T06.2 → T06.3 | **Partículas atravessam** | 0 | As partículas do texto M6 continuam |
| 16 | T06.3 → T07.1 | **Dust flash** | 6 frames | Flash de poeira cor-de-osso em "entrou." |
| 17 | T07.1 → T07.2 | Corte seco | 1 frame | Mesma energia |
| 18 | T07.2 → T07.3 | Corte + subida de luz | 1 frame (+0.5 EV) | |
| 19 | T07.3 → T08.1 | **Match cut de LUZ** | 8 frames | Raio de luz do vale → feixe da janela |
| 20 | T08.1 → T08.2 | Corte seco | 1 frame | |
| 21 | T08.2 → T08.3 | **Wipe de página** | 8 frames | A página que vira cobre o quadro |
| 22 | T08.3 → T08.4 | Corte seco | 1 frame | |
| 23 | T08.4 → T09.1 | **CORTE SECO NA TENSÃO** | 1 frame | A porta é o gatilho |
| 24 | T09.1 → T09.2 | Corte duro | 1 frame | Impacto em T09.1 |
| 25 | T09.2 → T09.3 | Corte duro | 1 frame | |
| 26 | T09.3 → T09.4 | Corte duro | 1 frame | |
| 27 | T09.4 → T10.1 | **Dip de exposição + queda de som** | 12 frames | −4 stops; áudio cai (1:34:14) |
| 28 | T10.1 → T10.2 | Dissolve lento | 24 frames | Único dissolve do filme (é "respirar") |
| 29 | T10.2 → T10.3 | Dissolve | 12 frames | |
| 30 | T10.3 → T10.4 | **Rajada varre** | 7 frames | Partículas varridas → formam o glifo |
| 31 | T10.4 → T10.5 | **Impacto** | 1 frame | Corte seco no IMPACTO de RUACH |
| 32 | T10.5 → FIM | **Corte seco** | 1 frame | 2:00:00 (imagem e som juntos) |

---

## 9. ORIENTAÇÃO DE EDIÇÃO (item 15)

### 9.1 · Ritmo (duração média de plano por cena)

| Cena | Planos | Dur. média | Sensação |
|---|---|---|---|
| 01 | 2 | 4,5 s | Contemplação |
| 02 | 2 | 5,5 s | Escala |
| 03 | 4 | 2,0 s | Gotas, "batimento" |
| 04 | 2 | 5,0 s | Peso, imobilidade |
| 05 | 3 | 4,3 s | Suspense |
| 06 | 3 | 4,3 s | Cresce (cortes mais curtos na percussão) |
| 07 | 3 | 3,0 s | Desacelera, o olhar descansa |
| 08 | 4 | 2,5 s | Tensão crescente |
| 09 | 4 | 3,0 s | Impacto controlado |
| 10 | 5 | 5,0 s | Silêncio → impacto |

### 9.2 · Regras de edição
1. **Corte na ação do vento**, não em ponto "neutro". O corte acompanha a rajada que passa.
2. **L-cuts e J-cuts** em todas as transições de cena. A voz entra *antes* da imagem (ex.: "Ruach." começa antes do match cut).
3. **Pausa é plano:** nas pausas ★, a imagem não pode "preencher". Deixe o movimento mais lento (câmera mais lenta, partículas mais lentas) ou ficar sem movimento.
4. **Nunca cortar em movimento rápido de câmera:** a câmera é lenta por regra; a energia vem das partículas.
5. **Direção constante:** manter vento → direita em todo corte (checar cada transição; se um take sair espelhado, **espelhar horizontalmente** — exceto Hebraico, que **não** pode ser espelhado: o glifo é composto separado).
6. **Speed ramps:** só 2 permitidos no filme inteiro — T09.1 (portas, 1:24:19, 100% → 40% → 100% em 12 frames) e T10.3 (freeze). O resto é velocidade natural.
7. **Estabilização:** apenas *warp stabilizer* leve (≤ 3%). Se um take precisar mais, **rejeitar**.
8. **Reframe:** máximo 5% de reenquadramento em 4K (para não perder nitidez).
9. **Ponte de partículas:** uma camada contínua de poeira dourada (overlay) cruza **todos** os cortes de matéria, na mesma direção, com opacidade ajustada por cena (20–60%). É o "fio" do mesmo sopro.
10. **Handles:** cada take tem 2–3 s além do uso — preservar nos *project files*.
11. **Marcadores no timeline:** 🔵 voz · 🟡 pausa ★ · 🔴 impacto · 🟢 transição de matéria · ⚪ texto/motion.

### 9.3 · Estrutura de faixas no timeline (resumo)

| Faixa | Conteúdo |
|---|---|
| V1 | Plates gerados (takes) |
| V2 | Ponte de partículas / overlays atmosféricos |
| V3 | Motion graphics (M1–M10) |
| V4 | Ajustes de cor / grão / halação (adjustment layers) |
| V5 | Máscaras de transição (wipes de matéria) |
| A1 | Narração (dry) |
| A2 | Narração (reverb/duplicação) |
| A3 | Vento base |
| A4 | Foley (água, areia, tecido, papel, madeira) |
| A5 | Impactos/hits |
| A6 | Música (cordas/pad) |
| A7 | Música (percussão) |
| A8 | Subgraves/rumble |

---

## 10. ORIENTAÇÃO DE COLOR GRADING (item 16)

### 10.1 · Fluxo
1. Entrada: conformar os takes para um espaço de trabalho único (DaVinci Wide Gamut/Intermediate).
2. **Normalizar** a exposição de cada take (mesma "câmera").
3. Aplicar **LUT base RUACH** (criar): sombras azul-noite, médios neutros, altas luzes âmbar.
4. Grading por cena (tabela 10.2).
5. **Halação** leve em altas luzes (3–5%).
6. **Grão de 35 mm 500T** (40–60%) — depois de tudo.
7. Dither (ordenado) para evitar *banding* no gradiente de céu/telão LED.

### 10.2 · Grade por cena

| Cena | Look | Sombras | Médios | Altas luzes | Saturação | Contraste |
|---|---|---|---|---|---|---|
| 01 | Noite absoluta | `#0A1220` | azul muito escuro | 1 ponto âmbar | 25% | Altíssimo (low-key) |
| 02 | Azul profundo, fio âmbar | `#0A1220` | azul-aço | âmbar (horizonte/luz) | 40% | Alto |
| 03 | Quente × frio | azul-preto | neutro | âmbar/ouro | 55% | Alto |
| 04 | **Morto** | marrom frio | **areia dessaturada** | dourado pálido | **15–20%** | **Baixo, plano** (sem vida) |
| 05 | Marrom quente | marrom-profundo | ocre | âmbar | 30% | Médio |
| 06 | Sobe contraste/cor | azul-marrom | dourado | ouro quente | 50% → 65% | Médio → alto |
| 07 | **Vida:** reentra cor | azul fresco | dourado | **luz branca-quente** | 65% (verde natural) | Médio-alto |
| 08 | Interior: tungstênio × janela fria | `#1C2230` | cinza azulado | âmbar | 40% | Alto |
| 09 | **Máximo** | `#0A1220` | quente | ouro `#F5C562` | 70% | **Máximo** |
| 10 | Preto → dourado | preto puro | — | ouro/marfim | partículas 80% | Altíssimo |

### 10.3 · Regras
- **Pretos verdadeiros** em T10.x (nada de cinza "lavado": o telão LED perde o efeito).
- **Branco máx. ≈ 85%** (evitar "queimar" no telão e cansar a plateia).
- **Verde (T07.3)** é a única cor "nova" do filme: restrita, natural, ligeiramente puxada para o dourado.
- Pele: **não existe** (zero pessoas), então não há "trava" de tom de pele — use isso para ousar no contraste.
- **Flare:** só em T09.1/T09.4, ≤ 10%.
- Conferir **no equipamento real** (LED wall) em teste antes do evento.

### 10.4 · Look final (parâmetros de partida no DaVinci)
- *Lift:* −0.03 azul · *Gamma:* neutro · *Gain:* +0.03 vermelho/amarelo
- *Contrast:* 1.15 · *Pivot:* 0.435 · *Saturation:* por cena (acima)
- *Halation:* 4% · *Grain:* 35 mm 500T, tamanho 1.0, rugosidade 0.55, 50% de intensidade

---

## 11. ORIENTAÇÃO DE MIXAGEM (item 17)

### 11.1 · Stems de entrega
1. **VO** (narração), 2. **WIND/FOLEY** (vento e foley), 3. **MUSIC** (todas as camadas), 4. **SUB/IMPACTS** (subgraves e impactos), + **MIX** estéreo 48 kHz/24-bit e **5.1** opcional.

### 11.2 · Níveis-alvo (para telão/PA de igreja)
| Parâmetro | Valor |
|---|---|
| Loudness integrado | **−16 LUFS** (ajustar após teste no local) |
| LRA (variação) | **≥ 14 LU** (peça tem grandes silêncios e um grande pico) |
| True Peak | **−1 dBTP** |
| Pico de VO | −6 dBFS (nos momentos mais fortes) |
| HPF master | 28 Hz (proteção de PA) |

### 11.3 · Hierarquia de frequências

| Faixa | Elemento |
|---|---|
| 28–60 Hz | Sub (38 Hz) / impactos |
| 60–160 Hz | Corpo do vento / cordas graves / percussão |
| 160–400 Hz | Calor da voz / vento médio |
| 400 Hz – 3 kHz | **Inteligibilidade da voz** (reservar espaço: cortar –2 a –3 dB em música/vento nessa banda) |
| 3–8 kHz | Presença de voz / tecido / papel |
| 8–16 kHz | "Ar" (vento fino, partículas) |

### 11.4 · Regras de mixagem
1. **A voz manda.** Música e vento abrem espaço (*sidechain* leve, 2–3 dB), **mas** nas pausas ★ o ambiente **respira** de volta.
2. **O silêncio é um evento.** Os dois silêncios (0:28 e 1:48.8) são **reais** (−70 dB). Nada de "room tone" que denuncie corte.
3. **Dinâmica:** não comprimir o filme todo. O impacto de 1:24:19 e o de 1:56:00 devem *surpreender*.
4. **Reverb:** *plate* 2,2 s (voz) nas Cenas 01–07; sobe para *hall* 3,5 s nas Cenas 08–09; **seco** (quase) na Cena 10.
5. **Pan:** vento atravessa L→R (automação de pan acompanhando a direção visual). A rajada única de 1:50:12 atravessa de L a R em 0.6 s.
6. **Sub:** só em momentos-chave (0:09, 1:04:14, 1:24:19, 1:53, 1:56). Fora deles, ≤ −40 dB.
7. **Corte final:** **tudo** (VO, vento, reverb, música) para no **mesmo frame**, 2:00:00. Sem fade.

### 11.5 · Níveis por cena (referência, em dB relativos ao pico da VO = 0)

| Cena | VO | Vento | Música | Sub/Impact |
|---|---|---|---|---|
| 01 | 0 | −26 | — | −30 (fim) |
| 02 | 0 | −22 | −32 | −34 |
| 03 | 0 | −20 | −26 | — |
| 04 | 0 | −∞ | −∞ | — |
| 05 | 0 | −28 → −20 | −38 | −36 |
| 06 | 0 | −20 → −10 | −18 → −8 | −28 |
| 07 | 0 | −24 | −24 | **−12** (1:04:14) |
| 08 | 0 | −22 | −28 | −30 |
| 09 | 0 | **−6** | **−6** | **−6** (1:24:19) |
| 10 | 0 | −26 → −∞ | — | −6 (1:50, 1:56) |

### 11.6 · Checklist de teste no local
- [ ] Ouvir no PA da igreja **antes** do evento, com o sub ligado.
- [ ] Verificar se o sub de 38 Hz não "boia" a sala (ajustar ±3 dB).
- [ ] Conferir a legibilidade da voz com a sala **cheia** (público absorve; elevar +1 dB de presença).
- [ ] Testar o **silêncio** de 1:48.8: ruídos do local (ar-condicionado) podem estragar; avisar a equipe técnica para minimizar.
- [ ] Testar o **corte seco** em 2:00:00 (o player deve parar no frame final, sem fade).

---

## 12. TRATAMENTO DA NARRAÇÃO (item 18)

### 12.1 · Casting da voz
- **Português do Brasil**, sotaque natural. **Masculina, 35–50 anos.**
- **Grave, profunda, calma, segura, reverente, emocional sem exagero.**
- **Sem** voz de locutor publicitário, **sem** caricatura de pregador, **sem** "trailer americano dublado".
- **Intimidade → intensidade:** começa quase sussurrada, perto do microfone; ganha intensidade e corpo; **nunca grita**. O impacto vem das **pausas**.
- Se a voz for sintética (TTS): escolher modelo com *prosody* natural; **gerar linha por linha**, não o texto inteiro (para controlar pausas); sempre **comparar com uma leitura humana de referência**.

### 12.2 · Pronúncia de RUACH
- **/ˈʁu.ax/ → "RÚ-ARR"** com final **levemente gutural** (como o *ch* de "Bach", suave, ≈ 40% de intensidade).
- **Evitar:** "ruáki", "ruáche", "ruatch", "ruaque".
- Se um TTS erra, usar grafia fonética de apoio: `Rú-arr` ou `Rúarr` (testar), e **corrigir manualmente**.

### 12.3 · Script de gravação (com timecode, intenção e pausas)

> ★ = pausa sagrada · **[ ]** = intenção/volume.

| TC | Texto | Intenção | Volume |
|---|---|---|---|
| 0:01.8 | "Antes da forma…" | quase sussurro, íntimo | 20% |
| 0:04.2 | "antes da vida…" | mesma intimidade, mais lenta | 20% |
| 0:06.6 | "Ele já se movia." | mistério, olhar para dentro | 25% |
| 0:08.6 | "**Ruach.**" ★ | sussurro grave, **palavra-semente** | 30% |
| 0:10.2 | "O Espírito de Deus pairava sobre as águas." | solenidade serena | 35% |
| 0:15.0 | "Antes que a criação tomasse forma, o Espírito já estava presente." | amplitude, assombro | 40% |
| 0:20.5 | "Vento." ★ | **cada palavra é uma gota** | 35% |
| 0:22.5 | "Sopro." ★ | idem | 35% |
| 0:24.5 | "Espírito." ★ | idem, mais cheio | 40% |
| 0:26.8 | "Ruach." | agora com corpo | 45% |
| 0:28.8 | "Então Deus levou o profeta a um vale." | seco, narrativo, sem ornamento | 30% |
| 0:32.2 | "E o vale estava cheio de ossos." | peso, sem dramatizar | 30% |
| 0:36.0 | "**Secos.**" ★★ | queda de tom; **silêncio de 1.3 s depois** | 25% |
| 0:38.5 | "E Deus perguntou:" ★ | cuidado, quase reverente | 30% |
| 0:40.4 | "'Poderão estes ossos viver?'" ★★ | a pergunta **pairando** (leve subida de tom no final) | 35% |
| 0:44.6 | "Porque onde os nossos olhos enxergam o fim," | respiração, começa a esperança | 35% |
| 0:48.0 | "Deus ainda pode ordenar vida." | firmeza serena | 45% |
| 0:51.5 | "Então veio a ordem:" | autoridade | 45% |
| 0:53.6 | "'Profetiza ao Espírito.'" ★ | firme, direto | 50% |
| 0:56.3 | "'Vem dos quatro ventos, ó Espírito," | cresce | 55% |
| 0:59.3 | "e sopra sobre estes mortos," | poder contido | 60% |
| 1:01.3 | "para que vivam.'" | ápice parcial, sem gritar | 65% |
| 1:04.6 | "E o sopro entrou." | **sussurro**, deixa o sub falar | 40% |
| 1:07.0 | "E aquilo que estava morto…" ★★ | suspensão (1.5 s) | 35% |
| 1:10.5 | "**viveu.**" ★★ | **quase um suspiro** (silêncio 1.8 s depois) | 30% |
| 1:13.6 | "O vento sopra onde quer." | leve, universal | 40% |
| 1:16.2 | "Você não vê de onde vem," | contemplativo | 40% |
| 1:18.4 | "mas percebe tudo aquilo que ele toca." | sorriso na voz; sem sorrir | 50% |
| 1:23.6 | "E, de repente," | **tensão** | 55% |
| 1:25.4 | "veio do céu um som como de um vento impetuoso." | **plenitude** (sem gritar) | 70% |
| 1:30.0 | "E encheu toda a casa." | **máxima** da peça (ainda controlada) | 75% |
| 1:36.5 | "E a nossa oração continua sendo a mesma:" | **volta à intimidade** (queda brusca) | 30% |
| 1:40.0 | "Sopra outra vez." ★ | súplica contida | 30% |
| 1:42.2 | "Sopra sobre a tua Igreja." ★ | | 35% |
| 1:44.9 | "Sopra sobre esta geração." ★ | | 40% |
| 1:47.6 | "Sopra sobre nós." ★★ | mais íntimo; **seguido por 1.7 s de silêncio total** | 40% |
| 1:56.3 | "**Ruach.**" | ancorado no impacto; grave, cheio, quase seco | 60% |
| 1:58.2 | "**Vem dos quatro ventos.**" | ponto final; **sem cauda de fala**; corte seco | 65% |

> **Nota de leitura:** gravar **cada linha em 4–6 tomadas** e eleger a mais natural. Gravar *versões alternativas* das linhas com ★★ (mais lentas/mais rápidas) para ajuste fino.
> Se, na edição, a narração total ultrapassar o tempo, aplicar **time-stretch máximo de 4%** (sem alterar o tom) em trechos **sem ★**; **nunca** comprimir pausas ★.

### 12.4 · Gravação
- **Sala tratada** (ou cabine); microfone condensador de diafragma grande, **a 8–12 cm**, filtro *pop* duplo; interface 48 kHz/24-bit.
- **Posição:** a voz deve *sentir* a distância variável: mais perto (intimidade) nas Cenas 01, 07, 10; um pouco mais longe nas Cenas 08–09 (amplitude).
- **Sem processamento na captação.** Gravar limpo.

### 12.5 · Cadeia de processamento (pós)
1. **Limpeza:** remoção de cliques, respirações exageradas (manter algumas, são humanas); *de-noise* leve.
2. **HPF 70 Hz** · **EQ:** −2 dB em 250–350 Hz (lama), +2 dB em 120 Hz (calor), +1.5 dB em 3 kHz (presença), +1 dB em 10 kHz (ar).
3. **De-esser** (6–8 kHz).
4. **Compressão leve** 2:1–3:1, ataque lento, ~3 dB de redução (preserva dinâmica).
5. **Reverb plate** 2,2 s (pre-delay 60 ms, **wet −24 dB**). Aumentar o *send* progressivamente até a Cena 09 (hall 3,5 s). Cena 10: quase seco.
6. **Camada oitava abaixo** (−12 semitons, −22 dB) **só em** "Vem dos quatro ventos" (0:56.3, 1:58.2) e "E encheu toda a casa." (1:30.0) — dá peso sem "voz de Deus" caricata.
7. **Limitador** leve (−1 dB) só para pico.

---

## 13. TELA FINAL (item 19)

### 13.1 · Princípio
O último quadro é a **arte-chave aprovada, viva.** Cada elemento entra por vento/poeira (nunca fade). Todos os elementos devem estar no lugar **em 1:57:14**, e o quadro **permanece ~2.5 s** antes do corte seco.

### 13.2 · Layout (proporções extraídas da arte-chave; calibrar sobre o arquivo original em 3840×2160)

| Elemento | Fonte | Cor | Posição (centro) | Tamanho aprox. |
|---|---|---|---|---|
| **Logo OBPC Limeira** | arte original | Marfim | x 50%, y ≈ 10% | largura ≈ 9,7% do quadro |
| **CONFERENCE** | Anton | Marfim `#F5EEDF` | x 50%, y ≈ 20% | cap height ≈ 7,8% da altura; largura ≈ 24% |
| **RUACH** | Anton | Marfim `#F5EEDF` + glow Ouro | x 50%, y ≈ 47% | cap height ≈ 43% da altura; largura ≈ 64% |
| **Citação** "Vem dos quatro ventos, ó espírito, e assopra sobre estes mortos, para que vivam." | Bebas Neue itálico | Marfim | x 50%, y ≈ 75% | altura ≈ 3% |
| **EZEQUIEL 37:9** | Bebas Neue, tracking +200 | Destaque `#F5C562` | x 50%, y ≈ 78,5% | altura ≈ 1,6% |
| **14 & 15** | Archivo Black | Marfim | x 44%, y ≈ 87% | cap height ≈ 4,9% |
| **NOVEMBRO** | Archivo Black | Destaque `#F5C562` | à direita de "14 & 15" | idem |
| **19 ANOS OBPC LIMEIRA** | Bebas Neue, tracking +100 | Ouro `#D6AA5A` | x 50%, y ≈ 94% | altura ≈ 1,7% |

- **Fundo:** gradiente vertical **Azul Noite `#0A1220` (topo) → Brasa `#6A4020` (base)**, com **linhas de névoa** finas e ondulantes (como na arte-chave) e um **halo quente** subindo do horizonte inferior.
- **Atmosfera:** poeira dourada residual atravessando (opacidade 15–25%, mesma direção →).

### 13.3 · Sequência de entrada (frame-a-frame)

| TC | Evento | Detalhe |
|---|---|---|
| **1:56:00** | **IMPACTO — RUACH** | **Quadro inteiro:** preto → gradiente azul/brasa sobe em 6 frames. **RUACH** aparece de uma vez (escala 108% → 100% em 6 frames, *overshoot* sutil), com **anel de poeira radial** (onda de choque, 8 frames) e glow Ouro "respirando". Som: impacto grave. |
| 1:56:07 | "Ruach." (voz) | |
| 1:56:12 | **CONFERENCE** | Revelado por **rajada** → (vento passa pela palavra e "descobre" as letras), 10 frames |
| 1:56:20 | **Logo OBPC Limeira** | Emerge de névoa (8 frames) |
| 1:57:00 | **Citação** + **EZEQUIEL 37:9** | A citação surge palavra a palavra por poeira (8 frames); EZEQUIEL em Destaque logo abaixo |
| 1:57:06 | **14 & 15 → NOVEMBRO** | "14 & 15" em Marfim, depois "NOVEMBRO" em Destaque (stagger de 6 frames), por *reveal de luz* (varredura de feixe de esquerda a direita) |
| 1:57:14 | **19 ANOS OBPC LIMEIRA** | Surge por poeira (8 frames) |
| 1:57:14 → 1:58:05 | **Quadro completo** | Glow "respira" ±3%; névoa deriva; ~1 s de contemplação (silêncio com vento fino) |
| 1:58:05 | "Vem dos quatro ventos." (voz) | Última frase; imagem **estável** |
| **2:00:00** | **CORTE SECO** | Imagem e áudio terminam no **mesmo frame** (sem fade) |

### 13.4 · Entregas da tela final
1. **Still 4K PNG** do quadro completo (para projeção estática).
2. **Hold loop** de 10–20 s: o mesmo quadro com poeira/névoa em movimento sutil e *loop seamless*, para manter o telão vivo até a entrada da equipe de palco (sem som próprio).
3. **Versão sem texto** (plate limpa) para eventuais variações.

---

## 14. MONTAGEM FINAL (item 20)

### 14.1 · Sequência completa de montagem (master timeline)

> **Legenda:** V = voz · S = som (vento/foley/impacto) · M = música.

| # | TC in | Take | Visual | V (voz) | S/M (som e música) |
|---|---|---|---|---|---|
| 1 | 0:00:00 | T01.1 | Preto → água escura; ponto âmbar; micro-ondas; vapor "ANTES DA FORMA" (0:02:12) | 0:01.8 "Antes da forma…" · 0:04.2 "antes da vida…" | Água micro; tom de sala; **sem música** |
| 2 | 0:05:12 | T01.2 | Ondulação → mar; horizonte no topo | 0:06.6 "Ele já se movia." | Entra vento grave (200 Hz) |
| 3 | **0:09:00** | T02.1 | **Match cut de escala** → oceano visto de drone | 0:08.6 "**Ruach.**" (L-cut) · 0:10.2 "O Espírito de Deus pairava sobre as águas." | **Sub-hit −30 dB** (0:09:00) |
| 4 | 0:14:12 | T02.2 | Coluna de luz que *paira* sobre o mar | 0:15.0 "Antes que a criação tomasse forma, o Espírito já estava presente." | Drone grave entra (0:20 → fade) |
| 5 | 0:20:00 | T03.1 | Vela inclinada; "VENTO" (fumaça) | 0:20.5 "Vento." | Vela tremulando; **música: drone** |
| 6 | 0:22:00 | T03.2 | Areia; "SOPRO" | 0:22.5 "Sopro." | Areia sibilando |
| 7 | 0:24:00 | T03.3 | Linho; "ESPÍRITO" | 0:24.5 "Espírito." | Tecido ondulando |
| 8 | 0:26:00 | T03.4 | Poeira/folhas; glifo curto | 0:26.8 "Ruach." | Folhas; swell → corte |
| 9 | **0:28:00** | T04.1 | **CORTE SECO + SILÊNCIO.** Vale imóvel (aéreo) | 0:28.8 "Então Deus levou o profeta a um vale." · 0:32.2 "E o vale estava cheio de ossos." | **Vento e música morrem (1 frame).** *Dead air* −42 dB |
| 10 | 0:33:12 | T04.2 | Rente ao chão → osso | 0:36.0 "**Secos.**" ★★ | Silêncio total após "Secos." (até 0:38) |
| 11 | **0:38:00** | T05.1 | **Match cut de osso** → macro | 0:38.5 "E Deus perguntou:" · 0:40.4 "'Poderão estes ossos viver?'" ★★ | Silêncio |
| 12 | 0:42:12 | T05.2 | Grãos tremem → caem na fenda | (pausa 2.2 s até 0:44.6) | **0:44 nasce o vento** (−45 dB) + harmônico de cello |
| 13 | 0:47:00 | T05.3 | Fita de poeira | 0:44.6 "Porque onde os nossos olhos enxergam o fim," · 0:48.0 "Deus ainda pode ordenar vida." | Vento sobe |
| 14 | 0:51:00 | T06.1 | Frente de poeira + nuvens aceleradas | 0:51.5 "Então veio a ordem:" | **Riser** começa |
| 15 | 0:54:12 | T06.2 | Linho no espinheiro; M6 inicia | 0:53.6 "'Profetiza ao Espírito.'" ★ | Percussão pulsando (0:55) |
| 16 | 0:58:00 | T06.3 | Ossos deslizam; texto M6 completo; rajada 1:01:19 | 0:56.3 "'Vem dos quatro ventos, ó Espírito," · 0:59.3 "e sopra sobre estes mortos," · 1:01.3 "para que vivam.'" | **GRANDE CRESCIMENTO** (0:56:07) |
| 17 | **1:04:00** | T07.1 | **Dust flash** → ossos alinhados, terra vibra | 1:04.6 "E o sopro entrou." | **Sub 38 Hz (1:04:14)**; acorde aberto |
| 18 | 1:07:00 | T07.2 | Água brota das rachaduras | 1:07.0 "E aquilo que estava morto…" ★★ | Cordas sustentadas; gotas |
| 19 | 1:10:00 | T07.3 | Broto desdobra; luz inunda | 1:10.5 "**viveu.**" ★★ | Nota única; **silêncio 0.4 s**; respiro |
| 20 | **1:13:00** | T08.1 | **Match cut de luz** → nave vazia | 1:13.6 "O vento sopra onde quer." | *Room tone*; pad quente |
| 21 | 1:16:12 | T08.2 | Bíblia: páginas viram | 1:16.2 "Você não vê de onde vem," | Papel, vento por frestas |
| 22 | 1:19:00 | T08.3 | Cortinas inflam | 1:18.4 "mas percebe tudo aquilo que ele toca." | Tecido pesado |
| 23 | 1:21:00 | T08.4 | Portas entreabertas, fio de luz | — | Madeira gemendo; **tremolo + sub** crescem |
| 24 | **1:23:00** | T09.1 | **Portas se escancaram (1:24:19)** | 1:23.6 "E, de repente," | **IMPACTO (1:24:19)**; ápice |
| 25 | 1:26:00 | T09.2 | Céu em time-lapse | 1:25.4 "veio do céu um som como de um vento impetuoso." | Vento enorme, cordas |
| 26 | 1:29:00 | T09.3 | Cortinas/linhos voando | 1:30.0 "E encheu toda a casa." | Pico de percussão |
| 27 | 1:32:00 | T09.4 | Nave cheia de luz; dip de exposição (1:34:12) | — | **Queda total em 1:34:14** |
| 28 | **1:35:00** | T10.1 | Nave escura | 1:36.5 "E a nossa oração continua sendo a mesma:" | Só cauda + vento caindo |
| 29 | 1:39:00 | T10.2 | Partículas lentas | 1:40.0 "Sopra outra vez." · 1:42.2 "Sopra sobre a tua Igreja." | Vento mínimo |
| 30 | 1:45:00 | T10.3 | Partículas; **freeze 1:48:19** | 1:44.9 "Sopra sobre esta geração." · 1:47.6 "Sopra sobre nós." | **1:48.8 SILÊNCIO TOTAL** |
| 31 | 1:50:12 | T10.4 | **Rajada**; glifo רוּחַ (forma, hold, dissolve) | — | **Rajada única (1:50:12)** · sub-pulso 1:53 |
| 32 | **1:56:00** | T10.5 | **IMPACTO · RUACH** → CONFERENCE → logo → citação → data → 19 anos | 1:56.3 "**Ruach.**" · 1:58.2 "**Vem dos quatro ventos.**" | **Impacto grave** · vento fino |
| — | **2:00:00** | — | **CORTE SECO** | — | **Tudo para.** |

### 14.2 · Checklist de QC por take (obrigatória)

Marque cada item **por take**, em tela cheia, **a 200% de zoom**, em *todos* os frames-chave:

- [ ] **Zero pessoas** (rosto, silhueta, mão, pé, olho, corpo, multidão, sombra humana, reflexo humano, figura ao longe)
- [ ] **Contraluz sem silhueta** (portas, janelas, névoa: formas humanoides acidentais)
- [ ] **Física do vento correta** (tudo → direita; poeira/areia/tecido coerentes)
- [ ] **Água realista** (sem "plástico", sem *looping* visível)
- [ ] **Partículas realistas** (tamanho/profundidade coerentes)
- [ ] **Luz coerente** (direção, temperatura, sombras)
- [ ] **Textura natural** (sem "pele de IA", sem repetição)
- [ ] **Ossos coerentes** (sem crânio, sem esqueleto montado, sem anatomia humana)
- [ ] **Tecido = pano**, nunca roupa
- [ ] **Sem artefatos de IA** (dedos extras, geometria derretida, texto-lixo, *warping*)
- [ ] **Sem elementos religiosos clichês** (pomba, cruz, chama gospel, vitral figurativo)
- [ ] **Sem *flicker*/jitter**
- [ ] **Consistência de cenário** (VALE, CASA, OSSO, LINHO idênticos entre takes)

**Regra de ouro: se parecer artificial, substitui.**

### 14.3 · Plano B (se um take falhar)

| Take | Alternativa prática (mais confiável) |
|---|---|
| T01.1 / T01.2 | Filmar **cuba pequena** com água escura + luz âmbar + ventilador pequeno, macro 100 mm |
| T03.1 (vela) | Filmar vela real em sala escura com ventilador; é fácil e **muito mais realista** |
| T03.2 (areia) | Filmar areia em bandeja com ventilador, backlight, macro (slow motion 120 fps) |
| T03.3 (linho) | Pano real sobre estrutura de madeira com ventilador e contraluz |
| T04.x / T05.x (vale) | **Banco de imagens/drone licenciado** de terra rachada + ossos adicionados por composição |
| T05.1 (osso macro) | Foto macro de osso real (ou fragmento de madeira/pedra) + animação de partículas 2.5D |
| T07.3 (broto) | Time-lapse real de germinação (banco de imagens) |
| T08.x (interior) | Fotografar uma **igreja vazia real** (de preferência não a OBPC) e animar com partículas, ou usar *plates* 3D |
| T09.x | Combinar plate estático + partículas + simulação de tecido (Blender) |
| Qualquer tecido | Simulação de tecido em Blender/Houdini com *wind force* |

### 14.4 · Cronograma sugerido (hoje: 02/11 · conferência: 14/11, sábado)

| Data | Etapa |
|---|---|
| **Seg 02/11** | Aprovar este dossiê; escolher voz; iniciar **keyframes** (stills) das Cenas 01–04 |
| **Ter 03/11** | Gravar **narração** (tomadas); keyframes das Cenas 05–10; testar o glifo hebraico |
| **Qua 04/11** | Animar (image-to-video) Cenas 01–05; seleção; começar upscale |
| **Qui 05/11** | Animar Cenas 06–10; Plano B onde necessário |
| **Sex 06/11** | Motion (M1–M9) e tela final; **primeira montagem (rough cut)** |
| **Sáb 07/11** | Sound design + trilha (cue sheet) |
| **Dom 08/11** | Montagem completa + fine cut; revisão da liderança |
| **Seg 09/11** | Color grading + grão + exportação do **master** |
| **Ter 10/11** | Mixagem final + exportação de stems |
| **Qua 11/11** | **Teste no telão e no PA** (silêncios, sub, legibilidade, branco máx.) |
| **Qui 12/11** | Ajustes finos (se necessários); versões de segurança |
| **Sex 13/11** | **Ensaio técnico com o vídeo travado**; *backup* em 2 mídias |
| **Sáb 14/11** | Abertura da RUACH CONFERENCE |

> Os dias 12–13 são **buffer**. Se algum take atrasar, aplique o Plano B (14.3) e **corte cenas** em vez de aceitar takes medianos (preferir menos cenas excelentes).

### 14.5 · Entregáveis finais

| Arquivo | Especificação |
|---|---|
| `RUACH_ABERTURA_MASTER_4K.mov` | ProRes 4444 XQ, 3840×2160, 24 fps, 2:00:00, estéreo 48 kHz/24-bit |
| `RUACH_ABERTURA_MASTER_4K.mp4` | H.265, ~80 Mbps (cópia de ensaio e *backup*) |
| `RUACH_ABERTURA_1080p.mp4` | H.264, 1920×1080, 24 fps, ~25 Mbps (reserva) |
| `RUACH_ABERTURA_STEMS/` | VO · WIND_FOLEY · MUSIC · SUB_IMPACTS (WAV 48/24) |
| `RUACH_TELA_FINAL_4K.png` | Still da tela final |
| `RUACH_TELA_FINAL_HOLD_LOOP.mov` | Loop seamless 10–20 s (sem som) |
| `RUACH_ABERTURA_SEM_TEXTO.mov` | Versão limpa (plates + som, sem motion/texto) |
| `RUACH_ABERTURA_5.1.wav` (opcional) | Mix 5.1 para PA |

---

## RESUMO EXECUTIVO (uma página)

- **Filme:** *O QUE NÃO SE VÊ* — 2:00:00, 16:9, 4K, 24 fps, **zero pessoas**.
- **Protagonista:** o vento (invisível). Mostramos só **o que ele toca**.
- **Arco:** água → oceano → matéria → vale morto → pergunta → quatro ventos → vida → casa → ápice → oração → **RUACH**.
- **Decisão-chave:** o Master de 2:00 enxuga 21 s das cenas 1–9 do briefing para abrigar a Cena 10 (~25 s) sem ultrapassar o limite.
- **32 takes** (30 gerados + glifo + tela final), cada um com **prompt, negativo, lente, câmera, luz, som**.
- **Dois silêncios reais** (0:28 e 1:48.8) e **dois impactos** (1:24:19 e 1:56:00) estruturam a peça.
- **Último quadro = arte-chave aprovada**, viva, com corte seco em **2:00:00**.
