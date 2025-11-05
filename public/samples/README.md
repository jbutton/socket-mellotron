# Mellotron Sound Samples

This directory contains audio samples for the different Mellotron sound banks.

## Directory Structure

```
samples/
├── strings/    - String ensemble samples (violins, cellos)
├── choir/      - Choir/vocal samples
├── flutes/     - Flute ensemble samples
└── brass/      - Brass section samples
```

## Sample Requirements

- **Format**: WAV or OGG (WAV preferred for quality)
- **Sample Rate**: 44.1kHz or 48kHz
- **Bit Depth**: 16-bit or 24-bit
- **Naming Convention**: `[Note][Octave].wav` (e.g., `C4.wav`, `D#5.wav`)
- **Coverage**: Minimum 2 octaves, recommended 3 octaves (C3-C6)

## Sample Sources

You can source Mellotron samples from:

1. **Free Resources**:
   - Freesound.org (Creative Commons samples)
   - VCSL (Virtual Sound Canvas Library)
   - Free Mellotron sample packs

2. **Commercial Libraries**:
   - GForce Mellotron
   - Arturia Mellotron V
   - Sample libraries (convert to individual notes)

3. **DIY Recording**:
   - Record your own instruments
   - Use a MIDI keyboard + sampler
   - Convert existing multi-samples

## Preparing Samples

1. Ensure all samples are the same length (2-3 seconds typical for Mellotron)
2. Normalize volume levels across all samples
3. Trim silence from the beginning
4. Add slight fade-out at the end
5. Match the naming convention exactly

## Notes

- Actual sample files are ignored by git (see .gitignore)
- Only .gitkeep files are tracked
- Total sample size can be large (100MB+ per bank is common)
