const colors = {
    redLighten5: '#ffebee',
    redLighten4: '#ffcdd2',
    redLighten3: '#ef9a9a',
    redLighten2: '#e57373',
    redLighten1: '#ef5350',
    red: '#f44336',
    redDarken1: '#e53935',
    redDarken2: '#d32f2f',
    redDarken3: '#c62828',
    redDarken4: '#b71c1c',
    redAccent1: '#ff8a80',
    redAccent2: '#ff5252',
    redAccent3: '#ff1744',
    redAccent4: '#d50000',
    pinkLighten5: '#fce4ec',
    pinkLighten4: '#f8bbd0',
    pinkLighten3: '#f48fb1',
    pinkLighten2: '#f06292',
    pinkLighten1: '#ec407a',
    pink: '#e91e63',
    pinkDarken1: '#d81b60',
    pinkDarken2: '#c2185b',
    pinkDarken3: '#ad1457',
    pinkDarken4: '#880e4f',
    pinkAccent1: '#ff80ab',
    pinkAccent2: '#ff4081',
    pinkAccent3: '#f50057',
    pinkAccent4: '#c51162',
    purpleLighten5: '#f3e5f5',
    purpleLighten4: '#e1bee7',
    purpleLighten3: '#ce93d8',
    purpleLighten2: '#ba68c8',
    purpleLighten1: '#ab47bc',
    purple: '#9c27b0',
    purpleDarken1: '#8e24aa',
    purpleDarken2: '#7b1fa2',
    purpleDarken3: '#6a1b9a',
    purpleDarken4: '#4a148c',
    purpleAcent1: '#ea80fc',
    purpleAccent2: '#e040fb',
    purpleAccent3: '#d500f9',
    purpleAccent4: '#aa00ff',
    deepPurpleLighten5: '#ede7f6',
    deepPurpleLighten4: '#d1c4e9',
    deepPurpleLighten3: '#b39ddb',
    deepPurpleLighten2: '#9575cd',
    deepPurpleLighten1: '#7e57c2',
    deepPurple: '#673ab7',
    deepPurpleDarken1: '#5e35b1',
    deepPurpleDarken2: '#512da8',
    deepPurpleDarken3: '#4527a0',
    deepPurpleDarken4: '#311b92',
    deepPurpleAccent1: '#b388ff',
    deepPurpleAccent2: '#7c4dff',
    deepPurpleAccent3: '#651fff',
    deepPurpleAccent4: '#6200ea',
    indigoLighten5: '#e8eaf6',
    indigoLighten4: '#c5cae9',
    indigoLighten3: '#9fa8da',
    indigoLighten2: '#7986cb',
    indigoLighten1: '#5c6bc0',
    indigo: '#3f51b5',
    indigoDarken1: '#3949ab',
    indigoDarken2: '#303f9f',
    indigoDarken3: '#283593',
    indigoDarken4: '#1a237e',
    indigoAccent1: '#8c9eff',
    indigoAccent2: '#536dfe',
    indigoAccent3: '#3d5afe',
    indigoAccent4: '#304ffe',
    blueLighten5: '#e3f2fd',
    blueLighten4: '#bbdefb',
    blueLighten3: '#90caf9',
    blueLighten2: '#64b5f6',
    blueLighten1: '#42a5f5',
    blue: '#2196f3',
    blueDarken1: '#1e88e5',
    blueDarken2: '#1976d2',
    blueDarken3: '#1565c0',
    blueDarken4: '#0d47a1',
    blueAccent1: '#82b1ff',
    blueAccent2: '#448aff',
    blueAccent3: '#2979ff',
    blueAccent4: '#2962ff',
    lightBlueLighten5: '#e1f5fe',
    lightBlueLighten4: '#b3e5fc',
    lightBlueLighten3: '#81d4fa',
    lightBlueLighten2: '#4fc3f7',
    lightBlueLighten1: '#29b6f6',
    lightBlue: '#03a9f4',
    lightBlueDarken1: '#039be5',
    lightBlueDarken2: '#0288d1',
    lightBlueDarken3: '#0277bd',
    lightBlueDarken4: '#01579b',
    lightBlueAccent1: '#80d8ff',
    lightBlueAccent2: '#40c4ff',
    lightBlueAccent3: '#00b0ff',
    lightBlueAccent4: '#0091ea',
    cyanLighten5: '#e0f7fa',
    cyanLighten4: '#b2ebf2',
    cyanLighten3: '#80deea',
    cyanLighten2: '#4dd0e1',
    cyanLighten1: '#26c6da',
    cyan: '#00bcd4',
    cyanDarken1: '#00acc1',
    cyanDarken2: '#0097a7',
    cyanDarken3: '#00838f',
    cyanDarken4: '#006064',
    cyanAccent1: '#84ffff',
    cyanAccent2: '#18ffff',
    cyanAccent3: '#00e5ff',
    cyanAccent4: '#00b8d4',
    tealLighten5: '#e0f2f1',
    tealLighten4: '#b2dfdb',
    tealLighten3: '#80cbc4',
    tealLighten2: '#4db6ac',
    tealLighten1: '#26a69a',
    teal: '#009688',
    tealDarken1: '#00897b',
    tealDarken2: '#00796b',
    tealDarken3: '#00695c',
    tealDarken4: '#004d40',
    tealAccent1: '#a7ffeb',
    tealAccent2: '#64ffda',
    tealAccent3: '#1de9b6',
    tealAccent4: '#00bfa5',
    greenLighten5: '#e8f5e9',
    greenLighten4: '#c8e6c9',
    greenLighten3: '#a5d6a7',
    greenLighten2: '#81c784',
    greenLighten1: '#66bb6a',
    green: '#4caf50',
    greenDarken1: '#43a047',
    greenDarken2: '#388e3c',
    greenDarken3: '#2e7d32',
    greenDarken4: '#1b5e20',
    greenAccent1: '#b9f6ca',
    greenAccent2: '#69f0ae',
    greenAccent3: '#00e676',
    greenAccent4: '#00c853',
    lightGreenLighten5: '#f1f8e9',
    lightGreenLighten4: '#dcedc8',
    lightGreenLighten3: '#c5e1a5',
    lightGreenLighten2: '#aed581',
    lightGreenLighten1: '#9ccc65',
    lightGreen: '#8bc34a',
    lightGreenDarken1: '#7cb342',
    lightGreenDarken2: '#689f38',
    lightGreenDarken3: '#558b2f',
    lightGreenDarken4: '#33691e',
    lightGreenAccent1: '#ccff90',
    lightGreenAccent2: '#b2ff59',
    lightGreenAccent3: '#76ff03',
    lightGreenAccent4: '#64dd17',
    limeLighten5: '#f9fbe7',
    limeLighten4: '#f0f4c3',
    limeLighten3: '#e6ee9c',
    limeLighten2: '#dce775',
    limeLighten1: '#d4e157',
    lime: '#cddc39',
    limeDarken1: '#c0ca33',
    limeDarken2: '#afb42b',
    limeDarken3: '#9e9d24',
    limeDarken4: '#827717',
    limeAccent1: '#f4ff81',
    limeAccent2: '#eeff41',
    limeAccent3: '#c6ff00',
    limeAccent4: '#aeea00',
    yellowLighten5: '#fffde7',
    yellowLighten4: '#fff9c4',
    yellowLighten3: '#fff59d',
    yellowLighten2: '#fff176',
    yellowLighten1: '#ffee58',
    yellow: '#ffeb3b',
    yellowDarken1: '#fdd835',
    yellowDarken2: '#fbc02d',
    yellowDarken3: '#f9a825',
    yellowDarken4: '#f57f17',
    yellowAccent1: '#ffff8d',
    yellowAccent2: '#ffff00',
    yellowAccent3: '#ffea00',
    yellowAccent4: '#ffd600',
    amberLighten5: '#fff8e1',
    amberLighten4: '#ffecb3',
    amberLighten3: '#ffe082',
    amberLighten2: '#ffd54f',
    amberLighten1: '#ffca28',
    amber: '#ffc107',
    amberDarken1: '#ffb300',
    amberDarken2: '#ffa000',
    amberDarken3: '#ff8f00',
    amberDarken4: '#ff6f00',
    amberAccent1: '#ffe57f',
    amberAccent2: '#ffd740',
    amberAccent3: '#ffc400',
    amberAccent4: '#ffab00',
    orangeLighten5: '#fff3e0',
    orangeLighten4: '#ffe0b2',
    orangeLighten3: '#ffcc80',
    orangeLighten2: '#ffb74d',
    orangeLighten1: '#ffa726',
    orange: '#ff9800',
    orangeDarken1: '#fb8c00',
    orangeDarken2: '#f57c00',
    orangeDarken3: '#ef6c00',
    orangeDarken4: '#e65100',
    orangeAccent1: '#ffd180',
    orangeAccent2: '#ffab40',
    orangeAccent3: '#ff9100',
    orangeAccent4: '#ff6d00',
    deepOrangeLighten5: '#fbe9e7',
    deepOrangeLighten4: '#ffccbc',
    deepOrangeLighten3: '#ffab91',
    deepOrangeLighten2: '#ff8a65',
    deepOrangeLighten1: '#ff7043',
    deepOrange: '#ff5722',
    deepOrangeDarken1: '#f4511e',
    deepOrangeDarken2: '#e64a19',
    deepOrangeDarken3: '#d84315',
    deepOrangeDarken4: '#bf360c',
    deepOrangeAccent1: '#ff9e80',
    deepOrangeAccent2: '#ff6e40',
    deepOrangeAccent3: '#ff3d00',
    deepOrangeAccent4: '#dd2c00',
    brownLighten5: '#efebe9',
    brownLighten4: '#d7ccc8',
    brownLighten3: '#bcaaa4',
    brownLighten2: '#a1887f',
    brownLighten1: '#8d6e63',
    brown: '#795548',
    brownDarken1: '#6d4c41',
    brownDarken2: '#5d4037',
    brownDarken3: '#4e342e',
    brownDarken4: '#3e2723',
    greyLighten1: '#bdbdbd',
    greyLighten2: '#e0e0e0',
    greyLighten3: '#eeeeee',
    greyLighten4: '#f5f5f5',
    greyLighten5: '#fafafa',
    grey: '#9e9e9e',
    greyDarken1: '#757575',
    greyDarken2: '#616161',
    greyDarken3: '#424242',
    greyDarken4: '#212121',
    blueGreyLighten5: '#eceff1',
    blueGreyLighten4: '#cfd8dc',
    blueGreyLighten3: '#b0bec5',
    blueGreyLighten2: '#90a4ae',
    blueGreyLighten1: '#78909c',
    blueGrey: '#607d8b',
    blueGreyDarken1: '#546e7a',
    blueGreyDarken2: '#455a64',
    blueGreyDarken3: '#37474f',
    blueGreyDarken4: '#263238',
    black: '#000000',
    white: '#ffffff',
    transparent: 'transparent',
    facebookColor: '#4568b2',
    googleColor: '#dc4e41',
    main: '#800000',
    mainHover: '#b30000',
    primary: '#800000',
    primaryHover: '#b30000',
    secondary: '#282C35',
    secondaryHover: '#4d5466',
    lightGrey: '#e6e6e6',
    gold: '#ffd700'
};


export default colors;