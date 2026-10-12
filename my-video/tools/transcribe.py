import sherpa_onnx, wave, numpy as np, json
M="sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8"
r=sherpa_onnx.OfflineRecognizer.from_transducer(encoder=f"{M}/encoder.int8.onnx",decoder=f"{M}/decoder.int8.onnx",joiner=f"{M}/joiner.int8.onnx",tokens=f"{M}/tokens.txt",num_threads=4,model_type="nemo_transducer")
w=wave.open("audio16k.wav");x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
# chunk in ~25s windows with 1s overlap-free splits (at low energy points ideally)
sr=16000;out=[];step=25*sr;i=0
while i<len(x):
    j=min(len(x),i+step)
    if j<len(x):  # move split to lowest-energy 100ms in last 3s
        seg=x[j-3*sr:j+sr//2]; e=[np.abs(seg[k:k+1600]).mean() for k in range(0,len(seg)-1600,800)]
        j=j-3*sr+int(np.argmin(e))*800+800
    s=r.create_stream();s.accept_waveform(sr,x[i:j]);r.decode_stream(s)
    res=s.result
    out.append({"offset":i/sr,"text":res.text,"tokens":res.tokens,"timestamps":list(res.timestamps)})
    i=j
json.dump(out,open("asr.json","w"),ensure_ascii=False,indent=1)
for o in out: print(round(o["offset"],1),o["text"])
