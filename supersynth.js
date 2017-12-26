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

var noteValue = "16n";

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

//========TRANSPORT===========================
var transport = Tone.Transport;
var bpm = 100
var swing = 0;
transport.bpm.value = bpm;
transport.swing.value = swing;

var playButton = new Nexus.Button('#play',{
    'size': [50,50],
    'mode': 'toggle',
    'state': false
  })

playButton.on('change',function(v) {
    if (this.state == true) {

      transport.start();
      console.log( matrix.pattern[0][0]);
    }
    else {
      transport.stop();
    }
  })
function pattern() {
  matrix.toggle.cell(0,0);
  matrix.toggle.cell(1,1);
  matrix.toggle.cell(2,2);
  matrix.toggle.cell(3,3);
  matrix.toggle.cell(4,4);
  matrix.toggle.cell(5,5);
};

//==================Sequencer====================
var matrix = new Nexus.Matrix(6,8);
var noteNames = ["A2","A2","A2","A2","A2","A2","A2","A2","A2"];

var select1 = new Nexus.Select('#select1',{
  'size': [70,30],
  'options': ['A2','B2','D3','E3','G3','A3']
})
var select2 = new Nexus.Select('#select2',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})
var select3 = new Nexus.Select('#select3',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})
var select4 = new Nexus.Select('#select4',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})
var select5 = new Nexus.Select('#select5',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})
var select6 = new Nexus.Select('#select6',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})
var select7 = new Nexus.Select('#select7',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})
var select8 = new Nexus.Select('#select8',{
  'size': [70,30],
  'options': ['A2','B3','D3','E3','G3','A3']
})

select1.on('change',function(v) {
  noteNames[0] = select1.value;
})
select2.on('change',function(v) {
  noteNames[1] = select2.value;
})
select3.on('change',function(v) {
  noteNames[2] = select3.value;
})
select4.on('change',function(v) {
  noteNames[3] = select4.value;
})
select5.on('change',function(v) {
  noteNames[4] = select5.value;
})
select6.on('change',function(v) {
  noteNames[5] = select6.value;
})
select7.on('change',function(v) {
  noteNames[6] = select7.value;
})
select8.on('change',function(v) {
  noteNames[7] = select8.value;
})

var loop1 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[0], noteValue)
}, "2n").start("0:0:1");
var loop2 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[1], noteValue)
}, "2n").start("0:0:2");
var loop3 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[2], noteValue)
}, "2n").start("0:0:3");
var loop4 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[3], noteValue)
}, "2n").start("0:0:4");
var loop5 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[4], noteValue)
}, "2n").start("0:1:1");
var loop6 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[5], noteValue)
}, "2n").start("0:1:2");
var loop7 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[6], noteValue)
}, "2n").start("0:1:3");
var loop8 = new Tone.Loop(function(time){
	console.log(time);
  synth.triggerAttackRelease(noteNames[7], noteValue)
}, "2n").start("0:1:4");
