#!/bin/bash
INPUT="$1"
OUTPUT="$2"

/app/whisper.cpp/main \
  -m /app/whisper.cpp/models/ggml-small.bin \
  -f "$INPUT" -otxt -of /tmp/output -l pt

cp /tmp/output.txt "$OUTPUT"
