"use client"
import { useState } from "react"
import { Segmented } from "@/registry/frekvens/ui/segmented"
import { Switch } from "@/registry/frekvens/ui/switch"
import { DotGrid } from "@/registry/frekvens/ui/dot-grid"
import { KeyButton } from "@/registry/frekvens/ui/key-button"
import { Readout } from "@/registry/frekvens/ui/readout"
import { SplitFlap } from "@/registry/frekvens/ui/split-flap"
import { Avatar } from "@/registry/frekvens/ui/avatar"
import { Beam } from "@/registry/frekvens/ui/beam"
import { Composer } from "@/registry/frekvens/ui/composer"
import { VoicePosition } from "@/registry/frekvens/ui/voice-position"

export function Hero() {
  const [seats, setSeats] = useState<number[]>([5])
  const [busy, setBusy] = useState(false)
  return (
    <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
      <div className="card">
        <SplitFlap cycle={["QUEDAN 4 PLAZAS", "TABATA · 18:00"]} size="s" />
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}><Avatar name="Marta Ruiz" status="online" tone="rams" /><b>Marta Ruiz</b></div>
        <DotGrid select="many" max={2} total={16} columns={4} value={seats} onChange={(v) => setSeats(v as number[])} disabled={[0, 1, 6, 7, 12]} showLabels label="Plazas" labels={Array.from({ length: 16 }, (_, i) => "ABCD"[Math.floor(i / 4)] + ((i % 4) + 1))} />
        <KeyButton tone="klein" shape="pill" block disabled={!seats.length}>Reservar {seats.length || ""}</KeyButton>
      </div>
      <div className="card">
        <Segmented label="Vista" options={["Hoy", "Semana", "Mes"]} />
        <Switch label="Avisar al empezar" showLabel defaultChecked />
        <Readout value="18:00" label="Próxima clase" size="display" />
        <Beam active={busy} label="Generando" radius={28}>
          <Composer placeholder="Pide un plan" busy={busy} onSend={() => { setBusy(true); setTimeout(() => setBusy(false), 2400) }} />
        </Beam>
      </div>
      <div className="card"><VoicePosition demo /></div>
    </section>
  )
}
