let tempo = 0
let distancia = 0
basic.forever(function () {
	
})
basic.forever(function () {
    // 1. Pulso de ativação do sensor (Trig no P0)
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P0, 0)
    // 2. Leitura do eco (Echo no P1)
    tempo = pins.pulseIn(DigitalPin.P1, PulseValue.High)
    distancia = Math.idiv(tempo, 58)
    // 3. Lógica Proporcional (Leds e Som)
    if (distancia > 0 && distancia < 25) {
        if (distancia < 5) {
            // Muito perto: Som agudo e tela cheia
            // Nota Si (B5) - Vibrante
            music.ringTone(988)
            basic.showLeds(`
                . # # . .
                . . . # .
                . . # . .
                . . . # .
                . # # . .
                `)
        } else if (distancia < 10) {
            // Nota Si (B4)
            music.ringTone(494)
            basic.showLeds(`
                . # # . .
                . . . # .
                . . # . .
                . # . . .
                . # # # .
                `)
        } else if (distancia < 15) {
            // Nota Mi (E4)
            music.ringTone(330)
            basic.showLeds(`
                . . # . .
                . # # . .
                . . # . .
                . . # . .
                . . # . .
                `)
        } else {
            // Entre 15 e 25cm: Som grave e apenas um ponto
            // Nota Dó (C3)
            music.ringTone(131)
            // Opcional: acende algo no P2
            pins.digitalWritePin(DigitalPin.P2, 1)
            basic.showLeds(`
                # . . . #
                . . . . .
                . . # . .
                . . . . .
                # . . . #
                `)
        }
    } else {
        // Longe ou sem detecção: Desliga tudo
        music.stopAllSounds()
        basic.clearScreen()
    }
    basic.pause(50)
})
