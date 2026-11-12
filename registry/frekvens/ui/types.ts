/* Frekvens — tipos de todas las props. MIT © Cris Olmedo */
import type * as React from 'react';

export type Tone = 'paper' | 'surface' | 'well' | 'ink' | 'klein' | 'klein-soft' | 'sol' | 'rams' | 'tabaco' | 'verde' | 'rec' | 'salvia' | 'lavanda' | 'malva';
export type IconName = 'play' | 'pause' | 'stop' | 'rec' | 'plus' | 'minus' | 'arrow-right' | 'arrow-left' | 'arrow-up-right' | 'chevron-down' | 'chevron-right' | 'chevron-left' | 'arrow-down' | 'arrow-down-left' | 'menu' | 'search' | 'heart' | 'bookmark' | 'calendar' | 'folder' | 'card' | 'user' | 'sliders' | 'share' | 'chart' | 'bolt' | 'grid' | 'close' | 'check' | 'timer' | 'power' | 'lock' | 'dots' | 'home' | 'drop' | 'sun' | 'flag' | 'refresh' | 'mic' | 'arrow-up' | 'copy' | 'volume' | 'volume-off' | 'expand';

export interface KeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone; size?: 's' | 'm' | 'l' | 'xl'; shape?: 'square' | 'pill' | 'round';
  label?: string; icon?: IconName; active?: boolean; toggle?: boolean; block?: boolean; children?: React.ReactNode;
}

export interface KeypadKey { label?: string; icon?: IconName; tone?: Tone; active?: boolean; ariaLabel?: string; onClick?: () => void }
export interface KeypadProps { keys: KeypadKey[]; columns?: number; height?: number | string; label?: string; className?: string }

export interface IconProps { name: IconName; size?: number; title?: string; strokeWidth?: number; className?: string }

export interface DialProps { value?: number; defaultValue?: number; onChange?: (v: number) => void; min?: number; max?: number; size?: number; tone?: 'ink' | 'klein' | 'tabaco'; label?: string; className?: string }

export interface GaugeProps { value: number; width?: number; thickness?: number; unit?: string; readout?: boolean; caption?: React.ReactNode; label?: string; className?: string }

export interface SliderProps { value?: number; defaultValue?: number; onChange?: (v: number) => void; min?: number; max?: number; step?: number; label?: string; stops?: string[]; format?: (v: number) => string; className?: string }

export interface SwitchProps { showLabel?: boolean; checked?: boolean; defaultChecked?: boolean; onChange?: (on: boolean) => void; label?: string; onText?: string; offText?: string; disabled?: boolean; className?: string }

export interface SegmentedOption { value: string; label?: string; icon?: IconName; ariaLabel?: string }
export interface SegmentedProps { options: (string | SegmentedOption)[]; value?: string | null; defaultValue?: string; onChange?: (v: string) => void; label?: string; className?: string }

export interface DotMatrixProps { shape?: 'sun' | 'cloud' | 'drop' | 'ring' | 'disc' | 'heart'; grid?: number; reactive?: boolean; text?: string | number; rows?: string[]; dot?: number; pitch?: number; showOff?: boolean; tone?: 'ink' | 'klein' | 'rams' | 'tabaco' | 'paper'; label?: string; className?: string }

export interface DotGridProps { total?: number; filled?: number; columns?: number; size?: number; gap?: number; tone?: 'rams' | 'ink' | 'klein' | 'sol' | 'verde'; select?: 'one' | 'many'; value?: number | number[] | null; defaultValue?: number | number[] | null; onChange?: (v: number | number[] | null) => void; disabled?: number[]; labels?: (string | number)[]; showLabels?: boolean; max?: number; deselect?: boolean; caption?: string | false; label?: string; className?: string }

export interface StateMarkProps { state: 'empty' | 'partial' | 'full'; size?: number; label?: string; title?: string; children?: React.ReactNode; className?: string }

export interface LevelBarsProps { value: number; count?: number; height?: number; label?: string; className?: string }

export interface BarMeterDatum { label: string; value: number; hatched?: boolean }
export interface BarMeterProps { data: BarMeterDatum[]; active?: number; height?: number; barWidth?: number; label?: string; className?: string }

export interface ReadoutProps { value: React.ReactNode; unit?: string; label?: string; meta?: React.ReactNode; size?: 'hero' | 'display' | 'label'; live?: boolean; className?: string }

export interface TileProps { title?: React.ReactNode; subtitle?: React.ReactNode; meta?: React.ReactNode; value?: React.ReactNode; caption?: React.ReactNode; icon?: IconName; anchor?: 'top' | 'bottom'; tone?: Tone; height?: number; onClick?: () => void; children?: React.ReactNode; className?: string }

export interface StripProps { title?: React.ReactNode; value: React.ReactNode; unit?: string; icon?: IconName; tone?: Tone; children?: React.ReactNode; className?: string }

export interface ListRowProps { index?: React.ReactNode; icon?: IconName; title: React.ReactNode; detail?: React.ReactNode; value?: React.ReactNode; onClick?: () => void; className?: string }

export interface ChipProps { tone?: Tone; dot?: boolean; square?: boolean; children?: React.ReactNode; className?: string }

export interface SelectOption { value: string; label: string; meta?: string; disabled?: boolean }
export interface SelectProps { options: (string | SelectOption)[]; value?: string; defaultValue?: string; onChange?: (v: string) => void; label?: string; placeholder?: string; hint?: string; disabled?: boolean; block?: boolean; defaultOpen?: boolean; className?: string }

export type MenuItem = { label: string; icon?: IconName; onSelect?: () => void; shortcut?: string; danger?: boolean; disabled?: boolean } | { separator: true };
export interface MenuProps { items: MenuItem[]; label?: string; icon?: IconName; align?: 'start' | 'end'; tone?: Tone; defaultOpen?: boolean; className?: string }

export interface SheetProps { open: boolean; onClose?: () => void; title?: string; label?: string; tone?: Tone; inline?: boolean; children?: React.ReactNode }

export interface ToastProps { open: boolean; onClose?: () => void; duration?: number; tone?: Tone; icon?: IconName; action?: { label: string; onClick: () => void }; fixed?: boolean; children?: React.ReactNode }

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> { label?: string; hint?: string; error?: string; onSubmit?: (value: string) => void; submitLabel?: string; mono?: boolean }

export interface StepperProps { value?: number; defaultValue?: number; onChange?: (v: number) => void; min?: number; max?: number; step?: number; unit?: string; label?: string; className?: string }

export interface ProgressRingProps { value: number; size?: number; thickness?: number; tone?: 'rams' | 'klein' | 'ink' | 'verde'; label?: string; children?: React.ReactNode; className?: string }

export interface SlideToStartProps { onComplete?: () => void; children?: React.ReactNode; doneLabel?: string; icon?: IconName; tone?: Tone; label?: string; resetAfter?: boolean; className?: string }

export interface CardStackItem { badge?: React.ReactNode; icon?: IconName; title: React.ReactNode; subtitle?: React.ReactNode; value?: React.ReactNode; tone?: Tone }
export interface CardStackProps { items: CardStackItem[]; value?: number; defaultValue?: number; onChange?: (i: number) => void; className?: string }

export interface LEDProps { tone?: 'rec' | 'verde' | 'sol' | 'klein'; on?: boolean; blink?: boolean; children?: React.ReactNode; className?: string }

export interface GrilleProps { variant?: 'slots' | 'dots'; shape?: 'disc' | 'dome'; size?: number; pitch?: number; tone?: 'verde' | 'ink' | 'sol' | 'rams' | 'tabaco' | 'surface'; label?: string; className?: string }

export interface StopwatchProps { autoStart?: boolean; onLap?: (ms: number) => void; label?: string; size?: 'display' | 'hero'; className?: string }

export interface TimerProps { duration: number; autoStart?: boolean; onComplete?: () => void; label?: string; doneText?: string; size?: number; dots?: number; className?: string }

export interface HourglassProps { duration: number; autoStart?: boolean; onComplete?: () => void; pitch?: number; label?: string; className?: string }

export interface PendulumProps { bpm?: number; defaultBpm?: number; onBpmChange?: (bpm: number) => void; beats?: number; step?: number; running?: boolean; className?: string }

export interface CabinetDrawer { label: React.ReactNode; index?: React.ReactNode; meta?: React.ReactNode; tone?: Tone; content?: React.ReactNode }
export interface CabinetProps { drawers: CabinetDrawer[]; value?: number; defaultValue?: number; onChange?: (i: number) => void; className?: string }

export interface TabItem { id: string; label: React.ReactNode; icon?: IconName; count?: number; tone?: Tone; content?: React.ReactNode }
export interface TabsProps { tabs: TabItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; variant?: 'pill' | 'folder'; label?: string; className?: string }

export interface PagerProps { children: React.ReactNode; itemWidth?: string; gap?: number; label?: string; className?: string }

export interface WheelProps { items?: (string | { value: string; label: React.ReactNode })[]; value?: string; defaultValue?: string; onChange?: (v: string) => void; label?: string; unit?: string; visible?: number; rowHeight?: number; width?: number; className?: string }

export interface VolumeWheelProps { value?: number; defaultValue?: number; onChange?: (v: number) => void; step?: number; segments?: number; height?: number; tone?: 'rams' | 'klein' | 'ink'; label?: string; unitLabel?: string; className?: string }

export interface HoldButtonProps { onComplete?: () => void; duration?: number; size?: number; tone?: Tone; icon?: IconName; children?: React.ReactNode; doneLabel?: string; label?: string; disabled?: boolean; className?: string }

export interface RockerItem { label: string; icon?: IconName; on?: boolean; checked?: boolean; tone?: 'rec' | 'verde' | 'sol' | 'klein'; onChange?: (on: boolean) => void }
export interface RockerProps { items: RockerItem[]; label?: string; className?: string }

export interface RevealProps { variant?: 'rise' | 'scale' | 'wipe' | 'focus'; stagger?: number; delay?: number; once?: boolean; threshold?: number; as?: string; style?: React.CSSProperties; children?: React.ReactNode; className?: string }

export interface StackProps { direction?: 'column' | 'row'; gap?: number; align?: string; justify?: string; wrap?: boolean; padding?: number; style?: React.CSSProperties; children?: React.ReactNode; className?: string }

export interface GridProps { columns?: number; gap?: number; style?: React.CSSProperties; children?: React.ReactNode; className?: string }

export interface TextProps { variant?: 'display-xl' | 'title' | 'headline' | 'lead' | 'numeral-xl' | 'dot-hero' | 'dot-display' | 'body' | 'body-strong' | 'caption' | 'label' | 'readout'; sub?: React.ReactNode; muted?: boolean; as?: string; style?: React.CSSProperties; children?: React.ReactNode; className?: string }

export interface DotLoaderProps { variant?: 'row' | 'grid'; label?: string; className?: string }

export interface VoiceOrbProps { state?: 'idle' | 'listening' | 'thinking' | 'speaking'; level?: number; size?: number; grid?: number; tone?: 'ink' | 'klein' | 'rams' | 'paper'; caption?: string | false; label?: string; className?: string }

export interface MessageProps { role?: 'user' | 'assistant' | 'system'; children?: React.ReactNode; streaming?: boolean; thinking?: boolean; ui?: RenderSpec; actions?: Record<string, (x?: unknown) => void>; name?: string; meta?: React.ReactNode; onCopy?: () => void; onRetry?: () => void; className?: string }

export interface SuggestionsProps { items: (string | { label: string; value?: string; icon?: IconName })[]; onPick?: (value: string) => void; label?: string; className?: string }

export interface ComposerProps { value?: string; onChange?: (v: string) => void; onSend?: (text: string) => void; placeholder?: string; suggestions?: SuggestionsProps['items']; voice?: boolean; listening?: boolean; onListen?: (on: boolean) => void; level?: number; listeningText?: string; busy?: boolean; label?: string; className?: string }

/** A generative UI node: any Frekvens component by name. Props whose value is "action:<name>" call actions[name]. */
export interface RenderNode { type: string; props?: Record<string, unknown>; children?: RenderSpec }
export type RenderSpec = RenderNode | string | number | RenderSpec[];
export interface RenderProps { spec?: RenderSpec | string; lang?: string; actions?: Record<string, (x?: unknown) => void>; className?: string }

export interface MediaPlayerProps { src?: string; poster?: string; title?: string; badge?: string; chapters?: number[]; captions?: string; captionsLang?: string; captionsOn?: boolean; ratio?: string; autoPlay?: boolean; loop?: boolean; muted?: boolean; duration?: number; children?: React.ReactNode; className?: string }

export interface AudioTrackProps { src?: string; title?: string; peaks?: number[]; bars?: number; seed?: number; tone?: Tone; rate?: string; speed?: boolean; duration?: number; autoPlay?: boolean; loop?: boolean; className?: string }

export interface TickerItem { label: string; value?: string; delta?: string }
export interface TickerProps { items: (string | TickerItem)[]; speed?: number; tone?: Tone; label?: string; className?: string }

export interface SplitFlapProps { value?: string; length?: number; size?: 's' | 'm' | 'l'; tone?: 'sol' | 'rams' | 'verde' | 'rec'; cycle?: string[]; interval?: number; speed?: number; className?: string }

export interface DeckProps { children: React.ReactNode; height?: number; onChange?: (i: number) => void; label?: string; className?: string }

export interface AgentWidgetProps { name?: string; state?: 'idle' | 'listening' | 'thinking' | 'speaking'; defaultState?: 'idle' | 'listening' | 'thinking' | 'speaking'; demo?: boolean; mode?: 'voice' | 'chat'; messages?: (MessageProps & { text?: string })[]; transcript?: string; level?: number; suggestions?: string[]; tone?: 'ink' | 'klein' | 'rams' | 'paper'; onStart?: () => void; onEnd?: () => void; onSend?: (text: string) => void; defaultOpen?: boolean; inline?: boolean; className?: string }

export interface CheckboxProps { label?: React.ReactNode; ariaLabel?: string; hint?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (on: boolean) => void; indeterminate?: boolean; disabled?: boolean; children?: React.ReactNode; className?: string }

export interface RadioOption { value: string; label: React.ReactNode; hint?: React.ReactNode; disabled?: boolean }
export interface RadioGroupProps { options: (string | RadioOption)[]; value?: string; defaultValue?: string; onChange?: (v: string) => void; label?: string; direction?: 'column' | 'row'; className?: string }

export interface CalendarProps { value?: string; defaultValue?: string; onChange?: (iso: string) => void; view?: 'week' | 'month'; switchable?: boolean; marks?: string[]; today?: string; className?: string }

export interface BannerProps { tone?: 'info' | 'ok' | 'warn' | 'error'; title?: React.ReactNode; children?: React.ReactNode; icon?: IconName; action?: { label: string; onClick?: () => void }; dismissible?: boolean; onDismiss?: () => void; className?: string }

export interface SkeletonProps { shape?: 'text' | 'tile' | 'circle'; lines?: number; width?: number | string; height?: number | string; label?: string; className?: string }

export interface EmptyStateProps { title: React.ReactNode; text?: React.ReactNode; action?: { label: string; onClick?: () => void }; shape?: 'ring' | 'disc' | 'sun' | 'cloud' | 'drop' | 'heart'; compact?: boolean; className?: string }

export interface BadgeProps { count?: number; max?: number; dot?: boolean; tone?: Tone; label?: string; children?: React.ReactNode; className?: string }

export interface TabBarItem { id: string; label: string; icon?: IconName; badge?: number; dot?: boolean }
export interface TabBarProps { items: TabBarItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string; className?: string }

export interface TopBarProps { title: React.ReactNode; subtitle?: React.ReactNode; onBack?: () => void; backLabel?: string; actions?: React.ReactNode; large?: boolean; as?: string; className?: string }

export interface StepsProps { steps: string[]; current?: number; label?: string; className?: string }

export interface TooltipProps { content: React.ReactNode; side?: 'top' | 'bottom'; delay?: number; children: React.ReactElement }

export interface AvatarProps { name: string; src?: string; size?: number; tone?: Tone; status?: 'online' | 'live' | 'away' | 'busy' | 'offline'; className?: string }

export interface LineChartProps { data: number[]; labels?: string[]; now?: number; unit?: string; tone?: 'ink' | 'rams' | 'klein'; width?: number; height?: number; caption?: string; label?: string; className?: string }

export interface HeatmapProps { data: number[]; rows?: number; cell?: number; tone?: 'ink' | 'rams' | 'klein' | 'verde'; unit?: string; caption?: string; label?: string; className?: string }
export interface SplitSegment { label: string; value: number; tone?: Tone }
export interface SplitBarProps { segments: SplitSegment[]; variant?: 'bar' | 'columns'; height?: number; format?: (v: number) => string; className?: string }
export interface SparklineProps { data: number[]; width?: number; height?: number; tone?: 'ink' | 'rams' | 'klein'; label?: string; className?: string }
export interface ClickWheelProps { onStep?: (d: 1 | -1) => void; onSelect?: () => void; onMenu?: () => void; onPlay?: () => void; playing?: boolean; detent?: number; size?: number; tone?: Tone; labels?: { top?: string }; centerLabel?: string; label?: string; valueText?: string; className?: string }
export interface DiscItem { title: string; subtitle?: string; tone?: Tone; src?: string; badge?: string }
export interface DiscCarouselProps { items: DiscItem[]; value?: number; defaultValue?: number; onChange?: (i: number) => void; playing?: boolean; onPlay?: (i: number) => void; size?: number; label?: string; className?: string }
export interface SidebarItem { id: string; label: string; icon?: IconName; count?: number; alert?: boolean }
export interface SidebarProps { sections: { label?: string; items: SidebarItem[] }[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; collapsed?: boolean; defaultCollapsed?: boolean; onCollapse?: (c: boolean) => void; header?: React.ReactNode; footer?: React.ReactNode; tone?: Tone; label?: string; className?: string }
export interface DataColumn { key: string; label: string; sortable?: boolean; align?: 'start' | 'end'; mono?: boolean; type?: 'text' | 'status' | 'spark' | 'bar' | 'avatar'; tones?: Record<string, Tone> }
export interface DataTableProps { columns: DataColumn[]; rows: Record<string, unknown>[]; selectable?: boolean; dense?: boolean; defaultSort?: { key: string; dir: 'asc' | 'desc' }; pageSize?: number; groupBy?: string; onRowClick?: (row: Record<string, unknown>) => void; caption?: string; label?: string; emptyTitle?: string; emptyText?: string; className?: string }
export interface Command { id: string; label: string; group?: string; icon?: IconName; shortcut?: string; keywords?: string; onRun?: () => void }
export interface CommandBarProps { commands: Command[]; open?: boolean; defaultOpen?: boolean; onClose?: () => void; onRun?: (id: string) => void; hotkey?: boolean; placeholder?: string; label?: string; inline?: boolean }
export interface NotchProps { state?: 'idle' | 'listening' | 'thinking' | 'speaking' | 'done'; name?: string; peek?: string; text?: React.ReactNode; progress?: number; actions?: { label: string; icon?: IconName; onClick?: () => void }[]; expanded?: boolean; defaultExpanded?: boolean; tone?: 'rams' | 'klein' | 'paper'; inline?: boolean; className?: string }
export interface Viewport3DProps { shape?: 'cube' | 'stack'; tone?: Tone; size?: number; pitch?: number; yaw?: number; height?: number; label?: string; className?: string }
export interface NumPadProps { value?: string; defaultValue?: string; onChange?: (v: string) => void; currency?: string; maxLength?: number; hint?: string; onSubmit?: (n: number) => void; submitLabel?: string; keyboard?: boolean; label?: string; className?: string }
export interface HourStripProps { prices: number[]; now?: number; unit?: string; label?: string; className?: string }
export interface PaymentCardProps { tone?: Tone; brand?: string; last4?: string; name?: string; expiry?: string; frozen?: boolean; className?: string }
export interface RecorderTake { title: string; duration: number; src?: string; at?: string }
export interface RecorderProps { real?: boolean; takes?: RecorderTake[]; onSave?: (t: RecorderTake) => void; onMark?: (ms: number) => void; className?: string }
export interface CaptureKeyProps { onCapture?: (c: { kind: 'photo' | 'voice'; ms?: number }) => void; onVoiceStart?: () => void; hint?: string; label?: string; className?: string }
export interface ViewfinderProps { live?: boolean; mode?: string; defaultMode?: 'foto' | 'vídeo' | 'escanear'; onModeChange?: (m: string) => void; onShoot?: (m: string) => void; shots?: number; ratio?: string; children?: React.ReactNode; className?: string }
export interface NoteBlock { type: 'p' | 'h' | 'todo' | 'quote' | 'voice'; text?: string; done?: boolean; duration?: number }
export interface NoteEditorProps { defaultBlocks?: NoteBlock[]; onChange?: (b: NoteBlock[]) => void; title?: string; meta?: React.ReactNode; placeholder?: string; className?: string }
export interface DialogProps { open: boolean; onClose?: () => void; title: React.ReactNode; text?: React.ReactNode; children?: React.ReactNode; tone?: 'default' | 'danger'; icon?: IconName; primary?: string; onPrimary?: () => void; primaryDisabled?: boolean; secondary?: string | false; onSecondary?: () => void; steps?: string[]; step?: number; size?: 'l'; dismissible?: boolean; inline?: boolean }
export interface UploadFile { name: string; size?: number; progress: number; error?: string }
export interface FileDropProps { files?: UploadFile[]; onFiles?: (f: FileList) => void; accept?: string; multiple?: boolean; title?: string; hint?: string; simulate?: boolean; className?: string }
export interface ChoiceOption { value: string; label: string; price?: string; period?: string; hint?: string; features?: string[]; badge?: string; tone?: Tone }
export interface ChoiceCardsProps { options: ChoiceOption[]; value?: string; defaultValue?: string; onChange?: (v: string) => void; columns?: number; label?: string; className?: string }
export interface StatProps { label: string; value: React.ReactNode; unit?: string; delta?: string; inverse?: boolean; trend?: number[]; previous?: string; status?: 'ok' | 'warn' | 'risk'; statusLabel?: string; link?: { label: string; onClick?: () => void }; tone?: Tone; className?: string }
export interface UsageMeterProps { label: string; used: number; limit: number; unit?: string; format?: (n: number) => string; segments?: SplitSegment[]; action?: { label: string; onClick?: () => void }; className?: string }
export interface TimelineItem { title: React.ReactNode; text?: React.ReactNode; time?: string; state?: 'done' | 'running' | 'upcoming' | 'error'; avatar?: string }
export interface TimelineProps { items: TimelineItem[]; label?: string; className?: string }
export interface ChecklistItem { title: string; text?: string; action?: string; done?: boolean; onAction?: () => void }
export interface ChecklistProps { title?: string; items: ChecklistItem[]; defaultOpen?: number; className?: string }
export interface PromptBoxProps { title?: string; placeholder?: string; models?: string[]; model?: string; onModel?: (m: string) => void; efforts?: string[]; effort?: string; attachments?: string[]; suggestions?: string[]; note?: string; onSend?: (x: { text: string; model?: string; attachments: string[] }) => void; onVoice?: () => void; voice?: boolean; busy?: boolean; value?: string; onChange?: (v: string) => void; label?: string; className?: string }
/** Parse Frekvens Lang (line-based, streaming) into a RenderSpec. */
/* ---- Frekvens 7: relojes, hi-fi, teclas, pads, cinta, arrastrar, plano, gráficas, voz ---- */
export interface ClockProps { time?: string; variant?: 'disc' | 'ticks' | 'dot'; size?: number; seconds?: boolean; tone?: string; caption?: React.ReactNode; className?: string }
export interface VUMeterProps { value?: number; level?: number; live?: boolean; size?: number; scale?: string[]; caption?: string; label?: string; className?: string }
export interface RotarySelectorProps { options: (string | { value: string; label?: string })[]; value?: string; defaultValue?: string; onChange?: (v: string) => void; size?: number; span?: number; label?: string; className?: string }
export interface FaderProps { value?: number; defaultValue?: number; onChange?: (v: number) => void; min?: number; max?: number; step?: number; height?: number; tone?: Tone; format?: (v: number) => string; label?: string; className?: string }
export interface KeycapProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { tone?: 'paper' | 'ink' | 'rams' | 'sol' | 'klein'; w?: number; h?: number; sub?: React.ReactNode; children?: React.ReactNode }
export interface CalculatorProps { variant?: 'keys' | 'round'; keyboard?: boolean; className?: string }
export interface PadGridProps { columns?: number; rows?: number; labels?: string[]; tone?: 'sol' | 'rams' | 'klein'; sound?: boolean; keyboard?: boolean; onPad?: (i: number) => void; label?: string; className?: string }
export interface TapeDeckProps { title?: string; duration?: number; playing?: boolean; className?: string }
export interface BoardItem { id: string; title: string; meta?: string; tag?: string; tagTone?: Tone; avatar?: string; tone?: Tone }
export interface BoardColumn { id: string; title: string; state?: 'empty' | 'running' | 'done' | 'error'; items: BoardItem[] }
export interface BoardProps { columns: BoardColumn[]; onChange?: (columns: BoardColumn[]) => void; variant?: 'board' | 'list'; className?: string }
export interface SortableProps { items: BoardItem[]; onChange?: (items: BoardItem[]) => void; label?: string; className?: string }
export interface BlueprintNode { id: string; x: number; y: number; w: number; h: number; title: string; text?: string; tone?: Tone; kind?: 'circle' }
export interface BlueprintProps { nodes?: BlueprintNode[]; edges?: { from: string; to: string; label?: string }[]; grid?: number; majorEvery?: number; snap?: boolean; unit?: string; unitPerGrid?: number; height?: number; wheelZoom?: boolean; onChange?: (nodes: BlueprintNode[]) => void; label?: string; className?: string }
export type ChartTone = 'ink' | 'rams' | 'klein' | 'sol' | 'verde' | 'tabaco';
export interface AreaChartProps { series: { label: string; data: number[]; tone?: ChartTone }[]; labels?: string[]; width?: number; height?: number; zero?: boolean; legend?: boolean; label?: string; className?: string }
export interface ScatterProps { points: { x: number; y: number; size?: number; tone?: ChartTone; label?: string }[]; xLabel?: string; yLabel?: string; width?: number; height?: number; label?: string; className?: string }
export interface RadarChartProps { axes: string[]; series: { label: string; data: number[]; tone?: ChartTone }[]; size?: number; label?: string; className?: string }
export interface DonutChartProps { segments: { label: string; value: number; tone?: ChartTone }[]; value?: React.ReactNode; caption?: string; size?: number; thickness?: number; gap?: number; label?: string; className?: string }
export interface ScopeProps { frequency?: number; amplitude?: number; noise?: number; live?: boolean; width?: number; height?: number; caption?: string; label?: string; className?: string }
export interface VoicePositionProps { pan?: number | null; side?: 'left' | 'ahead' | 'right' | null; distance?: 'near' | 'far'; state?: 'idle' | 'listening' | 'speaking' | 'processing'; level?: number; probabilities?: [number, number, number]; demo?: boolean; animate?: boolean; size?: number; rings?: number; tone?: 'klein' | 'rams' | 'sol' | 'verde'; caption?: string; className?: string }

export interface BeamProps { active?: boolean; tone?: 'klein' | 'rams' | 'sol' | 'ink'; radius?: number; label?: string; style?: React.CSSProperties; children?: React.ReactNode; className?: string }

export interface AuraProps { status?: 'online' | 'available' | 'live' | 'away' | 'busy' | 'ai' | 'offline'; tone?: 'verde' | 'rec' | 'sol' | 'rams' | 'klein'; active?: boolean; shape?: 'round' | 'rect'; label?: string; style?: React.CSSProperties; children?: React.ReactNode; className?: string }
export interface FlapBoardProps { rows: { id?: string | number; time?: string; text?: string; status?: string; tone?: 'sol' | 'rams' | 'verde' | 'rec'; [k: string]: unknown }[]; columns?: { key: string; label: string; length: number }[]; title?: string; meta?: string; size?: 's' | 'm' | 'l'; label?: string; className?: string }

export type ShapeName = 'disc' | 'ring' | 'half' | 'quarter' | 'arch' | 'pill' | 'arrow' | 'cross' | 'steps' | 'slash' | 'cloud';
export interface ShapeProps { name: ShapeName; size?: number; tone?: 'ink' | 'paper' | 'klein' | 'rams' | 'sol' | 'verde' | 'tabaco' | 'rec'; soft?: boolean; rotate?: number; label?: string; className?: string }
export interface RulerProps { value?: number; defaultValue?: number; onChange?: (v: number) => void; min?: number; max?: number; step?: number; major?: number; pitch?: number; format?: (v: number) => string; unit?: string; tone?: 'rams' | 'klein' | 'ink'; label?: string; className?: string }
export interface OnboardingSlide { title: React.ReactNode; text?: React.ReactNode; eyebrow?: React.ReactNode; tone?: Tone; artTone?: Tone; art?: React.ReactNode }
export interface OnboardingProps { slides: OnboardingSlide[]; value?: number; defaultValue?: number; onChange?: (i: number) => void; onDone?: () => void; onSkip?: () => void; nextLabel?: string; backLabel?: string; skipLabel?: string; doneLabel?: string; label?: string; className?: string }
export interface ArticleProps { title: React.ReactNode; date?: React.ReactNode; category?: React.ReactNode; href?: string; onClick?: () => void; tone?: Tone; children?: React.ReactNode; className?: string }
export interface CapsuleProps { title: React.ReactNode; text?: React.ReactNode; eyebrow?: React.ReactNode; actions?: React.ReactNode; tone?: Tone; level?: 1 | 2; as?: string; children?: React.ReactNode; className?: string }

