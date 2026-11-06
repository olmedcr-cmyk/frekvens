# PromptBox

Caja de prompt para empezar una conversación con IA: textarea amplio, adjuntos (también arrastrando), selector de modelo y de esfuerzo, dictado y enviar. Debajo, sugerencias y una nota ("La IA puede equivocarse").

- **Props**: `title`, `placeholder`, `models`, `model`, `onModel(m)`, `efforts`, `effort`, `attachments`, `suggestions`, `note`, `onSend({text, model, attachments})`, `onVoice()`, `voice`, `busy`, `value`/`onChange`, `label`.
- Para la pantalla vacía de un asistente. Dentro de una conversación ya empezada, `Composer`.
