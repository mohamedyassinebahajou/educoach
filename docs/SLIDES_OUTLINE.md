# EduCoach slides (LaTeX Beamer)

Full source: [`educoach_soutenance.tex`](educoach_soutenance.tex)

## Compile

```bash
cd /home/ycode/Projet-FR-IA/docs
pdflatex educoach_soutenance.tex
# open educoach_soutenance.pdf
```

If `pdflatex` is missing:

```bash
sudo apt-get install -y texlive-latex-base texlive-latex-recommended texlive-fonts-recommended texlive-latex-extra
```

Or paste the `.tex` into [Overleaf](https://www.overleaf.com/) (compiler: pdfLaTeX).

## Customize
- Replace `Votre Nom` with your name
- Add screenshots on the Démonstration slide (`\includegraphics`)
