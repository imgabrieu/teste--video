"""Roteiro: cenas, falas e pausas (segundos). Tempos nominais do briefing; o layout real segue a narração."""

# (id, texto falado, pausa ANTES da fala em segundos, nível 0..1 de intensidade vocal)
SCENES = [
    dict(id="s1", name="ANTES", t0=0, dur=10, lead=3.0, lines=[
        ("s1a", "Antes da forma... antes da vida... antes de qualquer coisa se mover...", 0.0, 0.10),
        ("s1b", "Ele já estava lá.", 0.9, 0.12),
        ("s1c", "Rúarr.", 1.0, 0.15)]),
    dict(id="s2", name="SOBRE AS ÁGUAS", t0=10, dur=13, lead=0.8, lines=[
        ("s2a", "O Espírito de Deus pairava sobre as águas.", 0.0, 0.2),
        ("s2b", "Antes que a criação ouvisse: Haja luz... o Espírito já se movia.", 1.4, 0.25)]),
    dict(id="s3", name="O SOPRO", t0=23, dur=11, lead=0.4, lines=[
        ("s3a", "A mesma palavra pode significar... vento.", 0.0, 0.3),
        ("s3b", "Sopro.", 0.7, 0.33),
        ("s3c", "Espírito.", 0.7, 0.36),
        ("s3d", "Rúarr.", 1.0, 0.4)]),
    dict(id="s4", name="O VALE", t0=34, dur=16, lead=0.6, lines=[
        ("s4a", "Então Deus levou o profeta a um vale.", 0.0, 0.35),
        ("s4b", "E o vale estava cheio de ossos.", 1.2, 0.38),
        ("s4c", "Secos.", 0.9, 0.4),
        ("s4d", "Muito secos.", 0.8, 0.42)]),
    dict(id="s5", name="PODE ISTO VIVER?", t0=50, dur=12, lead=0.4, lines=[
        ("s5a", "E Deus perguntou: Filho do homem... poderão estes ossos tornar a viver?", 0.0, 0.45),
        ("s5b", "Porque onde o homem enxerga o fim... Deus ainda pode ordenar vida.", 2.2, 0.5)]),
    dict(id="s6", name="VEM DOS QUATRO VENTOS", t0=62, dur=16, lead=0.4, lines=[
        ("s6a", "Então veio a ordem: Profetize ao sopro.", 0.0, 0.62),
        ("s6b", "Vem dos quatro ventos, ó Espírito... e sopra sobre estes mortos... para que vivam.", 1.6, 0.75)]),
    dict(id="s7", name="VIDA", t0=78, dur=12, lead=0.3, lines=[
        ("s7a", "E o sopro entrou neles.", 0.0, 0.8),
        ("s7b", "Eles viveram.", 0.8, 0.82),
        ("s7c", "Eles se levantaram.", 0.6, 0.85),
        ("s7d", "Um grande exército.", 0.6, 0.9)]),
    dict(id="s8", name="O VENTO SOPRA", t0=90, dur=10, lead=0.4, lines=[
        ("s8a", "Jesus disse: O vento sopra onde quer.", 0.0, 0.7),
        ("s8b", "Você ouve a sua voz... mas não sabe de onde vem... nem para onde vai.", 0.9, 0.7)]),
    dict(id="s9", name="SOM COMO DE UM VENTO", t0=100, dur=9, lead=0.3, lines=[
        ("s9a", "E houve um dia... em que um som veio do céu... como de um vento impetuoso.", 0.0, 0.85),
        ("s9b", "E encheu toda a casa.", 0.7, 0.92)]),
    dict(id="s10", name="HOJE", t0=109, dur=10, lead=0.3, lines=[
        ("s10a", "E hoje... a nossa oração continua sendo a mesma.", 0.0, 0.85),
        ("s10b", "Sopra outra vez.", 1.1, 0.95),
        ("s10c", "Sopra sobre a tua Igreja.", 0.5, 1.0),
        ("s10d", "Sopra sobre esta geração.", 0.5, 1.0),
        ("s10e", "Sopra sobre nós.", 0.5, 1.0)]),
]
FINAL = dict(id="fim", name="RUACH", lines=[
    ("fa", "Rúarr.", 0.0, 0.5),
    ("fb", "Vento.", 0.8, 0.55),
    ("fc", "Sopro.", 0.8, 0.6),
    ("fd", "Espírito.", 0.8, 0.65),
    ("fe", "Vem dos quatro ventos.", 1.2, 1.0)])
