var noteValue = "16n";

//filter for oscillator
var filter = new Tone.Filter({
  "type"  : "lowpass" ,
  "frequency"  : 1000 ,
  "rolloff"  : -12 ,
  "Q"  : 1 ,
  "gain"  : 0
}
);

//controls for filter
var filterFreq = new Nexus.Slider('#filterfreq', {
  "min" : 20,
  "max" : 20000,
  "step" : 20,
  "value" : 1000,
})
var filterQ = new Nexus.Slider('#filterq', {
  "min" : 0,
  "max" : 30,
  "step" : 1,
  "value" : 1,
})
var filterType = new Nexus.Slider('#filtertype', {
  "min" : 0,
  "max" : 2,
  "step" : 1,
  "value" : 0,
})

filterFreq.on('change',function(v) {
  filter.frequency.value = filterFreq.value;
  console.log(filter.frequency.value);
})
filterQ.on('change',function(v) {
  filter.Q.value = filterQ.value;
  console.log(filter.Q.value);
})
filterType.on('change',function(v) {
  if (filterType.value == 0) {
    filter.type = "lowpass"}
    else if (filterType.value == 1) {
      filter.type = "bandpass"}
      else {filter.type = "highpass"};
    });

//create the effects
var tremolo = new Tone.Tremolo({"wet" : 0}).start();
var pingpong = new Tone.PingPongDelay({
  "delayTime" : "8n", "feedback" : 0.05, "wet" : 0 });
var freeverb = new Tone.Freeverb({"wet" : 0});
var dist = new Tone.Distortion({"distortion" : 0.8, "wet" : 0});

//effects on/off
var toggleDist = new Nexus.Toggle('#dist');
var toggleTremolo = new Nexus.Toggle('#tremolo');
var togglePingpong = new Nexus.Toggle('#pingpong');
var toggleFreeverb = new Nexus.Toggle('#freeverb');

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

//Create the oscillator, envelope and connect the effects
var synth = new Tone.Synth(
  {
    "oscillator" : {
      "type" : "square"
    },
    "envelope" : {
      "attack" : 0.01,
      "decay" : 0.1,
      "sustain" : 0.2,
      "release" : 0.2,
    }
  });synth.chain(filter, dist, tremolo, pingpong, freeverb, Tone.Master);

//waveform chooser
var waveform = new Nexus.Slider('#wave',{
  'size': [120,20],
  'mode': 'relative',  // 'relative' or 'absolute'
  'min': 0,
  'max': 2,
  'step': 1,
  'value': 0 })

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
});

// Amplitude envelope
var dialAttack = new Nexus.Dial('#dattack',{"min":0.01, "max" : 2});
var dialDecay = new Nexus.Dial('#ddecay',{"min":0.01, "max" : 2});
var dialSustain = new Nexus.Dial('#dsustain',{"min":0.01, "max" : 2});
var dialRelease = new Nexus.Dial('#drelease',{"min":0.01, "max" : 5});

var attack = dialAttack.value;
var decay = dialDecay.value;
var sustain = dialSustain.value;
var release = dialRelease.value;

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
/*
//listen to keydown for selected notes (sample-like mode)
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
})*/

//========TRANSPORT===========================
var transport = Tone.Transport;
var bpm = 100
var swing = 0;
transport.bpm.value = bpm;
transport.swing.value = swing;

var playButton = new Nexus.TextButton('#play',{
  'size': [90,30],
  'mode': 'toggle',
  'state': false,
  'text': 'Play',
  'alternatetext': 'Pause'
})

playButton.on('change',function(v) {
  if (this.state == true) {transport.start();}
  else {transport.stop();}
})

//==================Sequencer====================
//initialize notes in the sequencer
var noteNames = ["A2","A2","A2","A2","A2","A2","A2","A2","A2"];
//create the beat selector
var selectB = new Nexus.RadioButton('#selectB',{
  'size': [240,25],
  'numberOfButtons': 8,
  'active': -1
})

//loop the notes
var loop1 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[0], noteValue)
}, "2n").start("0:0:1");
var loop2 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[1], noteValue)
}, "2n").start("0:0:2");
var loop3 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[2], noteValue)
}, "2n").start("0:0:3");
var loop4 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[3], noteValue)
}, "2n").start("0:0:4");
var loop5 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[4], noteValue)
}, "2n").start("0:1:1");
var loop6 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[5], noteValue)
}, "2n").start("0:1:2");
var loop7 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[6], noteValue)
}, "2n").start("0:1:3");
var loop8 = new Tone.Loop(function(time){
  synth.triggerAttackRelease(noteNames[7], noteValue)
}, "2n").start("0:1:4");

//create the keyboard
var keyboard = new QwertyHancock({
  id: 'keyboard',
  width: 650,
  height: 90,
  octaves: 3,
  startNote: 'C2',
  whiteNotesColour: 'white',
  blackNotesColour: 'black',
  hoverColour: '#f06d06',
  activeColour: '#f06d06',
  borderColour: 'black'
});

//listen for keyboard input
keyboard.keyDown = function (note, frequency) {
  console.log(note);
  if (selectB.active == 0) {
    noteNames[0] = note;}
  if (selectB.active == 1) {
    noteNames[1] = note;}
  if (selectB.active == 2) {
    noteNames[2] = note;}
  if (selectB.active == 3) {
    noteNames[3] = note;}
  if (selectB.active == 4) {
    noteNames[4] = note;}
  if (selectB.active == 5) {
    noteNames[5] = note;}
  if (selectB.active == 6) {
    noteNames[6] = note;}
  if (selectB.active == 7) {
    noteNames[7] = note;}
  };
//play the keyboard with mouse
keyboard.keyDown = function (note) {
    synth.triggerAttack(note);
  };
keyboard.keyUp = function () {
    synth.triggerRelease();
};

//listen for note off
var noneButton = new Nexus.Button('#none',{
  'size': [30,30],
  'mode': 'button',
  'state': false
  })

noneButton.on('change',function(v) {
  if (selectB.active == 0) {
      noteNames[0] = undefined;}
  if (selectB.active == 1) {
      noteNames[1] = undefined;}
  if (selectB.active == 2) {
      noteNames[2] = undefined;}
  if (selectB.active == 3) {
      noteNames[3] = undefined;}
  if (selectB.active == 4) {
      noteNames[4] = undefined;}
  if (selectB.active == 5) {
      noteNames[5] = undefined;}
  if (selectB.active == 6) {
      noteNames[6] = undefined;}
  if (selectB.active == 7) {
      noteNames[7] = undefined;}
  });
