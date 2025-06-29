FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y build-essential git wget ffmpeg curl libopenblas-dev

WORKDIR /app

RUN git clone https://github.com/ggerganov/whisper.cpp.git && \
    cd whisper.cpp && make

RUN cd whisper.cpp/models && \
    curl -LO https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin

COPY transcribe.sh /app/transcribe.sh
RUN chmod +x /app/transcribe.sh

ENTRYPOINT ["/app/transcribe.sh"]
