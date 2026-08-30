# Beamer presenter notes — how to use

Speaker notes are **inside** [`educoach_soutenance.tex`](educoach_soutenance.tex) as `\note{...}` on every slide.

They contain the **full oral pitch** from [`PRESENTATION_SPEAKER_NOTES.md`](PRESENTATION_SPEAKER_NOTES.md) (French spoken pitch; technical terms in English). Markdown and PDF notes stay in sync.

Note panel uses **`\footnotesize`** prose paragraphs (not bullet lists) on a white background for smoother oral delivery while presenting.

## What the jury sees vs what you see

| Mode | Switch in `.tex` | PDF result |
|------|------------------|------------|
| **Presenter** | `\shownotestrue` (default now) | Each page = **slide \| notes** (notes on the right) |
| **Audience handout** | `\shownotesfalse` | Slides only — no notes |

Flip this line near the top of `educoach_soutenance.tex`:

```latex
\shownotestrue          % presenter (dual view)
% \shownotesfalse       % clean slides for sharing
```

## Compile

```bash
cd docs
pdflatex educoach_soutenance.tex
pdflatex educoach_soutenance.tex   # twice if needed
```

Or Overleaf → pdfLaTeX (may need package `pgf` / `pgfpages` — usually included).

## Present (notes only on your screen)

Dual-page PDFs work best with a **presenter viewer**:

1. **[pdfpc](https://pdfpc.github.io/)** (Linux) — `pdfpc educoach_soutenance.pdf`
2. **[Pympress](https://github.com/Cimbali/pympress)** — presenter screen + audience screen  
3. Some PDF readers: dual monitor / “presenter view”

Connect the projector to the **audience** display; keep the **notes column** on your laptop.

## Notes content

Embedded notes are a condensed version of [`PRESENTATION_SPEAKER_NOTES.md`](PRESENTATION_SPEAKER_NOTES.md).  
Edit `\note{...}` under each frame to change what you see while speaking.

## Tip

Before the jury: compile once with `\shownotestrue` for yourself, and optionally a second PDF with `\shownotesfalse` to send/share.
