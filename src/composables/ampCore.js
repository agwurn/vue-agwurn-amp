function getGuitarInput() {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSupression: false,
      latency: 0,
    },
  });
}

function makeOverdriveCurve(amount) {
  let k = typeof amount === "number" ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function makeAmpDriveCurve(amount) {
  let k = typeof amount === "number" ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

class AgwurnAmp {
  constructor(ampState) {
    this.audioCtx = new AudioContext();
    this.ampState = ampState.parameters;
    this.lastReverbType = this.ampState.reverb.type;
  }

  setupSourcePanNode() {
    this.sourcePanNodeInput = new GainNode(this.audioCtx, { gain: 1 });
    this.splitterNode = this.audioCtx.createChannelSplitter(2);
    this.sourceNodeL = new GainNode(this.audioCtx, { gain: 1 });
    this.sourceNodeR = new GainNode(this.audioCtx, { gain: 1 });
    this.sourcePanNodeOutput = this.audioCtx.createChannelMerger(2);

    this.sourcePanNodeInput
      .connect(this.splitterNode, 0)
      .connect(this.sourcePanNodeOutput, 0, 1);
    // this.sourcePanNodeInput.connect(this.sourceNodeR, 1).connect(this.sourcePanNodeOutput, 1)
  }

  setupCompNode() {
    this.compNodeIn = new GainNode(this.audioCtx, { gain: 1 });
    this.compNodeOut = new GainNode(this.audioCtx, { gain: 1 });
    this.compNodeWet = new GainNode(this.audioCtx, {
      gain: this.ampState.comp.toggle,
    });
    this.compNodeDry = new GainNode(this.audioCtx, {
      gain: 1 - this.ampState.comp.toggle,
    });

    this.compNode = this.audioCtx.createDynamicsCompressor();

    this.compNodeIn
      .connect(this.compNodeWet)
      .connect(this.compNode)
      .connect(this.compNodeOut);
    this.compNodeIn.connect(this.compNodeDry).connect(this.compNodeOut);
  }

  setupOverdriveNode() {
    this.overdriveNodeInput = new GainNode(this.audioCtx, { gain: 1 });
    this.overdriveNodeWet = new GainNode(this.audioCtx, {
      gain: this.ampState.overdrive.toggle,
    });
    this.overdriveNodeDry = new GainNode(this.audioCtx, {
      gain: 1 - this.ampState.overdrive.toggle,
    });
    this.overdriveNodeGain = new GainNode(this.audioCtx, {
      gain: this.ampState.overdrive.gain,
    });
    this.overdriveNodeAlgorithm = this.audioCtx.createWaveShaper();
    this.overdriveNodeAlgorithm.oversample = "4x";
    this.overdriveNodeAlgorithm.curve = makeOverdriveCurve(20);
    this.overdriveNodeTone = new BiquadFilterNode(this.audioCtx, {
      type: "highshelf",
      Q: Math.SQRT1_2,
      frequency: this.ampState.overdrive.tone,
      gain: -20,
    });
    this.overdriveNodeOutput = new GainNode(this.audioCtx, {
      gain: this.ampState.overdrive.level,
    });

    this.overdriveNodeInput
      .connect(this.overdriveNodeGain)
      .connect(this.overdriveNodeWet)
      .connect(this.overdriveNodeAlgorithm)
      .connect(this.overdriveNodeTone)
      .connect(this.overdriveNodeOutput);
    this.overdriveNodeInput
      .connect(this.overdriveNodeDry)
      .connect(this.overdriveNodeOutput);
  }

  setupAmpDriveNode() {
    this.ampDriveNodeInput = new GainNode(this.audioCtx, { gain: 1 });
    this.ampDriveNodeWet = new GainNode(this.audioCtx, {
      gain: this.ampState.ampDrive.toggle,
    });
    this.ampDriveNodeDry = new GainNode(this.audioCtx, {
      gain: 1 - this.ampState.ampDrive.toggle,
    });
    this.ampDriveNodeGain = new GainNode(this.audioCtx, {
      gain: this.ampState.ampDrive.gain,
    });
    this.ampDriveAlgorithmNode = this.audioCtx.createWaveShaper();
    this.ampDriveAlgorithmNode.oversample = "4x";
    this.ampDriveAlgorithmNode.curve = makeAmpDriveCurve(100);
    this.ampDriveNodeOutput = new GainNode(this.audioCtx, { gain: 1 });

    this.ampDriveNodeInput
      .connect(this.ampDriveNodeGain)
      .connect(this.ampDriveNodeWet)
      .connect(this.ampDriveAlgorithmNode)
      .connect(this.ampDriveNodeOutput);
    this.ampDriveNodeGain
      .connect(this.ampDriveNodeDry)
      .connect(this.ampDriveNodeOutput);
  }

  setupEqNode() {
    this.eqNodeInput = new GainNode(this.audioCtx, { gain: 1 });
    this.eqBassNode = new BiquadFilterNode(this.audioCtx, {
      type: "lowshelf",
      frequency: 500,
      gain: this.ampState.eq.bassGain,
    });
    this.eqMidNode = new BiquadFilterNode(this.audioCtx, {
      type: "peaking",
      Q: Math.SQRT1_2,
      frequency: 1500,
      gain: this.ampState.eq.midGain,
    });
    this.eqTrebleNode = new BiquadFilterNode(this.audioCtx, {
      type: "highshelf",
      frequency: 3000,
      gain: this.ampState.eq.trebleGain,
    });
    this.eqNodeOutput = new GainNode(this.audioCtx, { gain: 1 });

    this.eqNodeInput
      .connect(this.eqBassNode)
      .connect(this.eqMidNode)
      .connect(this.eqTrebleNode)
      .connect(this.eqNodeOutput);
  }

  async loadIRFile(irFilePath) {
    let response = await fetch(irFilePath);
    let arraybuffer = await response.arrayBuffer();
    return await this.audioCtx.decodeAudioData(arraybuffer);
  }

  async setupAmpSimNode() {
    this.ampSimNodeAlgorithm = this.audioCtx.createConvolver();
    this.ampSimNodeAlgorithm.buffer = await this.loadIRFile(
      "/ampsimIRFile/ir_test.wav"
    );
  }

  async setupReverbNode() {
    this.reverbNodeAlgorithm = this.audioCtx.createConvolver();

    this.reverbNodeIn = new GainNode(this.audioCtx, { gain: 1 });
    this.reverbNodeOut = new GainNode(this.audioCtx, { gain: 1 });
    this.reverbNodeWet = new GainNode(this.audioCtx, { gain: 1 });
    this.reverbNodeDry = new GainNode(this.audioCtx, { gain: 0 });
    this.setReverbType(this.ampState.reverb.type);

    this.reverbNodeIn
      .connect(this.reverbNodeWet)
      .connect(this.reverbNodeAlgorithm)
      .connect(this.reverbNodeOut);
    this.reverbNodeIn.connect(this.reverbNodeDry).connect(this.reverbNodeOut);
  }

  async setReverbType(reverbType) {
    if (reverbType == "room") {
      this.reverbNodeAlgorithm.buffer = await this.loadIRFile(
        "/reverbIRFile/Nice Drum Room.wav"
      );
    } else if (reverbType == "spring") {
      this.reverbNodeAlgorithm.buffer = await this.loadIRFile(
        "/reverbIRFile/Conic Long Echo Hall.wav"
      );
    } else if (reverbType == "hall") {
      this.reverbNodeAlgorithm.buffer = await this.loadIRFile(
        "/reverbIRFile/Nice Drum Room.wav"
      );
    }
  }

  setupMasterVolumeNode() {
    this.masterVolumeNode = new GainNode(this.audioCtx, {
      gain: this.ampState.masterVolume,
    });
  }

  async setupNodeRoutes() {
    this.guitarInput = await getGuitarInput();
    if (this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }
    const source = this.audioCtx.createMediaStreamSource(this.guitarInput);

    // TODO: Main audio thread ------------------------------
    source.connect(this.sourcePanNodeInput);
    this.sourcePanNodeOutput.connect(this.compNodeIn);
    // this.compNodeOut.connect(this.ampDriveNodeInput)
    this.compNodeOut.connect(this.overdriveNodeInput);
    this.overdriveNodeOutput.connect(this.ampDriveNodeInput);
    this.ampDriveNodeOutput.connect(this.eqNodeInput);
    this.eqNodeOutput.connect(this.ampSimNodeAlgorithm);
    this.ampSimNodeAlgorithm.connect(this.masterVolumeNode);
    this.masterVolumeNode.connect(this.reverbNodeIn);
    this.reverbNodeOut.connect(this.audioCtx.destination);
  }

  initAmp() {
    this.setupSourcePanNode();
    this.setupCompNode();
    this.setupOverdriveNode();
    this.setupAmpDriveNode();
    this.setupEqNode();
    this.setupAmpSimNode();
    this.setupMasterVolumeNode();
    this.setupReverbNode();

    this.setupNodeRoutes();
    this.updateAmp();
  }
  updateAmp() {
    // console.log(this.ampState)
    this.compNodeWet.gain.setTargetAtTime(
      this.ampState.comp.toggle,
      this.audioCtx.currentTime,
      0.01
    );
    this.compNodeDry.gain.setTargetAtTime(
      1 - this.ampState.comp.toggle,
      this.audioCtx.currentTime,
      0.01
    );
    this.compNode.threshold.setValueAtTime(
      this.ampState.comp.threshold,
      this.audioCtx.currentTime,
      0.01
    );
    this.compNode.ratio.setValueAtTime(
      this.ampState.comp.ratio,
      this.audioCtx.currentTime,
      0.01
    );
    this.compNode.attack.setValueAtTime(
      this.ampState.comp.attack,
      this.audioCtx.currentTime,
      0.01
    );
    this.compNode.release.setValueAtTime(
      this.ampState.comp.release,
      this.audioCtx.currentTime,
      0.01
    );

    this.overdriveNodeGain.gain.setTargetAtTime(
      this.ampState.overdrive.gain,
      this.audioCtx.currentTime,
      0.01
    );
    this.overdriveNodeTone.frequency.setTargetAtTime(
      this.ampState.overdrive.tone,
      this.audioCtx.currentTime,
      0.01
    );
    this.overdriveNodeWet.gain.setTargetAtTime(
      this.ampState.overdrive.toggle,
      this.audioCtx.currentTime,
      0.01
    );
    this.overdriveNodeDry.gain.setTargetAtTime(
      1 - this.ampState.overdrive.toggle,
      this.audioCtx.currentTime,
      0.01
    );
    this.overdriveNodeOutput.gain.setTargetAtTime(
      this.ampState.overdrive.level,
      this.audioCtx.currentTime,
      0.01
    );

    this.ampDriveNodeGain.gain.setTargetAtTime(
      this.ampState.ampDrive.gain,
      this.audioCtx.currentTime,
      0.01
    );
    this.ampDriveNodeWet.gain.setTargetAtTime(
      this.ampState.ampDrive.toggle,
      this.audioCtx.currentTime,
      0.01
    );
    this.ampDriveNodeDry.gain.setTargetAtTime(
      1 - this.ampState.ampDrive.toggle,
      this.audioCtx.currentTime,
      0.01
    );
    this.eqBassNode.gain.setTargetAtTime(
      this.ampState.eq.bassGain,
      this.audioCtx.currentTime,
      0.01
    );
    this.eqMidNode.gain.setTargetAtTime(
      this.ampState.eq.midGain,
      this.audioCtx.currentTime,
      0.01
    );
    this.eqTrebleNode.gain.setTargetAtTime(
      this.ampState.eq.trebleGain,
      this.audioCtx.currentTime,
      0.01
    );
    this.masterVolumeNode.gain.setTargetAtTime(
      this.ampState.masterVolume,
      this.audioCtx.currentTime,
      0.01
    );

    let reverbWetGain;
    if (this.ampState.reverb.toggle === 0) {
      reverbWetGain = 0;
    } else {
      reverbWetGain = this.ampState.reverb.wetDry;
    }
    this.reverbNodeWet.gain.setTargetAtTime(
      reverbWetGain,
      this.audioCtx.currentTime,
      0.01
    );
    this.reverbNodeDry.gain.setTargetAtTime(
      1 - reverbWetGain,
      this.audioCtx.currentTime,
      0.01
    );
    if (this.lastReverbType != this.ampState.reverb.type) {
      this.setReverbType(this.ampState.reverb.type);
      this.lastReverbType = this.ampState.reverb.type;
    }
  }
}

export default AgwurnAmp;
