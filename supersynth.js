var waveform = new Nexus.Slider('#wave',{
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 2,
    'step': 1,
    'value': 0 })

var dialAttack = new Nexus.Dial('#dattack',{"min":0.01, "max" : 2});
var dialDecay = new Nexus.Dial('#ddecay',{"min":0.01, "max" : 2});
var dialSustain = new Nexus.Dial('#dsustain',{"min":0.01, "max" : 2});
var dialRelease = new Nexus.Dial('#drelease',{"min":0.01, "max" : 5});

dialAttack.on('change',function(v) {
  console.log(v);
  synth.envelope.attack = dialAttack.value;
})
dialDecay.on('change',function(v) {
  console.log(v);
  synth.envelope.decay = dialDecay.value;
})
dialSustain.on('change',function(v) {
  console.log(v);
  synth.envelope.sustain = dialSustain.value;
})
dialRelease.on('change',function(v) {
  console.log(v);
  synth.envelope.release = dialRelease.value;
})

var filterFreq = new Nexus.Slider('#filterfreq', {
  "min" : 20,
  "max" : 20000,
  "step" : 20,
  "value" : 1000,
  })



var toggleDist = new Nexus.Toggle('#dist');
var toggleTremolo = new Nexus.Toggle('#tremolo');
var togglePingpong = new Nexus.Toggle('#pingpong');
var toggleFreeverb = new Nexus.Toggle('#freeverb');

var attack = dialAttack.value;
var decay = dialDecay.value;
var sustain = dialSustain.value;
var release = dialRelease.value;

var filter = new Tone.Filter({
"type"  : "lowpass" ,
"frequency"  : 1000 ,
"rolloff"  : -12 ,
"Q"  : 1 ,
"gain"  : 0
}
);

filterFreq.on('change',function(v) {
    filter.frequency.value = filterFreq.value;
    console.log(filter.frequency.value);
  })

var tremolo = new Tone.Tremolo({"wet" : 0}).start();
var pingpong = new Tone.PingPongDelay({
  "delayTime" : "8n", "feedback" : 0.05, "wet" : 0 });
var freeverb = new Tone.Freeverb({"wet" : 0});
var dist = new Tone.Distortion({"distortion" : 0.8, "wet" : 0});

var synth = new Tone.Synth(
  {
    "oscillator" : {
      "type" : "square"
    },
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.2,
      "sustain" : 0.2,
      "release" : 0.2,
    }
  });
synth.chain(filter, dist, tremolo, pingpong, freeverb, Tone.Master)

var noteValue = "8n";

waveform.on('change',function(v) {
  if (waveform.value == 0){
    synth.oscillator.type = "square";
  }
  if (waveform.value == 1){
    synth.oscillator.type = "sine";
  }
  if (waveform.value == 2){
    synth.oscillator.type = "triangle";
  }
})

toggleDist.on('change',function(v) {
  if (toggleDist.state == true) {
    dist.wet.value = 0.8;
  }
  else {
    dist.wet.value = 0;
  }
})
toggleTremolo.on('change',function(v) {
  if (toggleTremolo.state == true) {
    tremolo.wet.value = 1;
  }
  else {
    tremolo.wet.value = 0;
  }
})
togglePingpong.on('change',function(v) {
  if (togglePingpong.state == true) {
    pingpong.wet.value = 0.5;
  }
  else {
    pingpong.wet.value = 0;
  }
})
toggleFreeverb.on('change',function(v) {
  if (toggleFreeverb.state == true) {
    freeverb.wet.value = 0.4;
  }
  else {
    freeverb.wet.value = 0;
  }
})



window.addEventListener("keydown", function(event) {

    if (event.keyCode == "65") {
      synth.triggerAttackRelease("A2", noteValue);
    }
    if (event.keyCode == "83") {
      synth.triggerAttackRelease("B2", noteValue)
    }
    if (event.keyCode == "68") {
      synth.triggerAttackRelease("D3", noteValue)
    }
    if (event.keyCode == "70") {
      synth.triggerAttackRelease("E3", noteValue)
    }
    if (event.keyCode == "71") {
      synth.triggerAttackRelease("G3", noteValue)
    }
    if (event.keyCode == "72") {
      synth.triggerAttackRelease("A3", noteValue)
    }
    if (event.keyCode == "74") {
      synth.triggerAttackRelease("B3", noteValue)
    }
    if (event.keyCode == "75") {
      synth.triggerAttackRelease("D4", noteValue)
    }
    if (event.keyCode == "76") {
      synth.triggerAttackRelease("E4", noteValue)
    }
    if (event.keyCode == "192") {
      synth.triggerAttackRelease("G4", noteValue)
    }
    if (event.keyCode == "222") {
      synth.triggerAttackRelease("A4", noteValue)
    }
  })
