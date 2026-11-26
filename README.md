# Versant Passage Reconstruction Simulator

A classic, professional, static web application designed for practicing **Pearson Versant English Writing & Passage Reconstruction** tasks.

---

## Features

- **50 Versant-Style Passages**: Preloaded in `Paragraph.txt` separated by `___________________________`.
- **Top-Right Dynamic Timer**:
  - **Reading Phase**: 30-second countdown with an interactive circular progress indicator and audio cues. Includes an *"I'm Ready to Write"* button for early advancement.
  - **Typing Phase**: 90-second countdown with live word and character counters, plus `Ctrl + Enter` fast-submit shortcut.
- **Side-by-Side ("Next by Next") Comparison**:
  - Displays the original passage and your typed reconstruction side-by-side with keyword retention highlighting.
  - Tracks Words per Minute (WPM) and completion duration.
- **Versant 4-Skills Evaluation Engine (Score out of 100)**:
  - **Grammar & Syntax (25 pts)**: Sentence boundary detection, capitalization, punctuation accuracy, fragment and run-on checks.
  - **Vocabulary & Lexical Resource (25 pts)**: Type-Token Ratio (TTR diversity), average word length, professional vocabulary detection.
  - **Organization & Coherence (25 pts)**: Structural proportions, cohesive linking words (e.g., *however*, *furthermore*, *therefore*).
  - **Content Retention & Meaning (25 pts)**: Key proposition and semantic keyword retention ratio.
  - Total score out of 100 with CEFR scale equivalent (A1 to C2) and Pearson Versant scale estimate (20–80).
- **Copilot Prompt Formatter & One-Click Copy**:
  - Copies the prompt formatted specifically for sharing with Microsoft Copilot / AI:
    ```
    original : "original content" ,  typed content : " typed content"
    ```
  - Also includes a "Copy with Versant Examiner Instructions" button for deep feedback from LLMs.
- **Round-Robin Navigation**:
  - Loops continuously through all 50 passages (Passage 1 $\to$ 2 $\to$ ... $\to$ 50 $\to$ 1).
  - Quick-jump selector to practice any passage immediately.
- **100% Static & GitHub Pages Ready**:
  - Pure HTML5, CSS3, and modern vanilla JavaScript.
  - Zero external npm/build dependencies.
  - Offline-ready with embedded fallback so double-clicking `index.html` from Windows Explorer works immediately without CORS issues.

---

## How to Host on GitHub Pages

1. Initialize git in the `Versant` folder or push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Add Versant Passage Reconstruction Simulator"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Source**, select `Deploy from a branch`.
   - Choose `main` branch and `/` (root) folder, or choose `/Versant` depending on your repo layout.
   - Click **Save**.
3. Your simulator will be live at:
   `https://<your-username>.github.io/<repo-name>/Versant/`

---

## Local Usage

Simply double-click `index.html` in Windows Explorer to open it in any web browser (Chrome, Edge, Firefox, Brave, Safari).
