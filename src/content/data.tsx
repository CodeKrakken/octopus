import snareFile  from './sounds/snare.wav';
import kickFile   from './sounds/kick.wav';

const title = "OCTOPUS"

const addLabel = "Add Voice"

const allFrequencies = [
  [   16.35,    17.32,    18.35,    19.45,    20.60,    21.83,    23.12,    24.50,    25.96,    27.50,    29.14,    30.87,    32.70],
  [   32.70,    34.65,    36.71,    38.89,    41.20,    43.65,    46.25,    49.00,    51.91,    55.00,    58.27,    61.74,    65.41],
  [   65.41,    69.30,    73.42,    77.78,    82.41,    87.31,    92.50,    98.00,   103.83,   110.00,   116.54,   123.47,   130.81],
  [  130.81,   138.59,   146.83,   155.56,   164.81,    74.61,   185.00,   196.00,   207.65,   220.00,   233.08,   246.94,   261.63],
  [  261.63,   277.18,   293.66,   311.13,   329.63,   349.23,   369.99,   392.00,   415.30,   440.00,   466.16,   493.88,   523.25],
  [  523.25,   554.37,   587.33,   622.25,   659.25,   698.46,   739.99,   783.99,   830.61,   880.00,   932.33,   987.77,  1046.50],
  [ 1046.50,  1108.73,  1174.66,  1244.51,  1318.51,  1396.91,  1479.98,  1567.98,  1661.22,  1760.00,  1864.66,  1975.53,  2093.00],
  [ 2093.00,  2217.46,  2349.32,  2489.02,  2637.02,  2793.83,  2959.96,  3135.96,  3322.44,  3520.00,  3729.31,  3951.07,  4186.01],
  [ 4186.01,  4434.92,  4698.63,  4978.03,  5274.04,  5587.65,  5919.91,  6271.93,  6644.88,  7040.00,  7458.62,  7902.13,  8372.02],
  [ 8372.02,  8869.84,  9397.26,  9956.06, 10548.08, 11175.30, 11839.82, 12543.86, 13289.76, 14080.00, 14917.24, 15804.26, 16744.04],
  [16744.04, 17739.68, 18794.52, 19912.12, 21096.16, 22350.60, 23679.64, 25087.72, 26579.52, 28160.00, 29834.48, 31608.52, 33488.08]
]

const waveforms = [
  'sine',
  'triangle',
  'sawtooth',
  'square',
]

const samples = {
  kick: kickFile,
  snare: snareFile
}

const ranges = [
  'Level',
  'Length',
  'Offset',
  'Detune',
  'Attack',
  'Decay',
] as const

const buttonGroups = [
  {
    label: 'Octaves',
    boxes: ['0','1','2','3','4','5','6','7','8','9','10'],
    row: 2,
    className: "octaves"
  },
  {
    label: 'Sounds', 
    boxes: [
      ...waveforms,
      ...Object.keys(samples)
    ],
    row: 3,
    className: "sounds"
  },
  {
    label: 'Intervals',
    boxes: ['4', '2', '1','0.5','0.25','0.125'],
    row: 3,
    className: "intervals"
  }
]

const singleSliders = [
  { // used
    label: 'BPM',
    value: 'bpm',
    key: 'bpm', 
    inputType: 'singleSlider', // used
    min: 1, // used
    max: 480 // used
  },
  {
    label: 'Rest', 
    value: 'restChance',
    key: 'restChance',
    inputType: 'singleSlider',
    min: 0,
    max: 100
  }
]

const doubleSliders = [
  {
    label: 'Level',
    value: 'Level',  
    key: 'level',
    inputType: 'doubleSlider',
    min: 0,
    max: 100,
    row: 1
  },
  {
    label: 'Length',
    value: 'Length',  
    key: 'length',  
    inputType: 'doubleSlider',
    min: 0,
    max: 100,
    row: 2
  },
  {
    label: 'Offset',
    value: 'Offset',    
    key: 'offset',
    inputType: 'doubleSlider',
    min: 0,
    max: 100,
    row: 2
  },
  {
    label: 'Detune',
    value: 'Detune',    
    key: 'detune',
    inputType: 'doubleSlider',
    min: -100,
    max: 100,
    row: 2
  },
  {
    label: 'Attack',
    value: 'Attack',   
    key: 'attack', 
    inputType: 'doubleSlider',
    min: 0,
    max: 100,
    row: 1
  },
  {
    label: 'Decay',
    value: 'Decay',    
    key: 'decay',
    inputType: 'doubleSlider',
    min: 0,
    max: 100,
    row: 1
  }
]

const attributes = [
  singleSliders,
  doubleSliders
].flat()

const extrema = ['min', 'max']

const oneMinute = 60

export {
  title,
  addLabel,
  allFrequencies,
  waveforms,
  ranges,
  buttonGroups,
  singleSliders,
  doubleSliders,
  attributes,
  extrema,
  oneMinute,
  samples
}