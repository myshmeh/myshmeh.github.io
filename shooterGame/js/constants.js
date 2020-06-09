const REPLAY_PARAM_NAME = 'replay';

const FONTS = {
    MONOTON: 'Monoton',
    CREEPSTER: 'Creepster',
    ORBITRON: 'Orbitron',
    HANDLEE: 'Handlee',
};

const TITLE_TEXT = 'SKILL WITH DIGNITY';
const TITLE_PHRASES = [
    "I HAVE A REAL SKIL\nWITH 10 YEAR EXPERIENCE",
    "I NEVER GOT HIT\nBY THEIR DUMB BULLETS,\nNO NEED FOR ANY FANCY EQUIPS\n",
    "JUST [W][A][S][D] TO MOVE\nAND [L] TO SHOOT",
    "THAT'S ALL I NEED",
    "NOW, LET'S SHOOT'EM ALL",
];
const GAME_OVER_TITLE_TEXT = 'DEAD WITH NO DIGNITY';
const GAME_OVER_RETRY_TEXT = '[R]ETRY';
const GAME_OVER_QUIT_TEXT = '[Q]UIT';
const GAME_OVER_RETRY_KEY = 'R';
const GAME_OVER_QUIT_KEY = 'Q';
const GAME_CLEAR_TITLE_TEXT = 'WIN WITH DIGNITY';
const GAME_CLEAR_SUBTITLE_TEXT = 'THANK YOU FOR PLAYING!';

const WIDTH = 640;
const HEIGHT = 480;
const Z_INDEX_DEEP = 99999;

const PLAYER_ACC = 300;
const PLAYER_SPEED_MAX = 150;
const PLAYER_FRICTION_RATE = 0.9;
const PLAYER_CONSTRAIN_HMIN = 0;
const PLAYER_CONSTRAIN_HMAX = WIDTH;
const PLAYER_CONSTRAIN_VMIN = HEIGHT * 0.5;
const PLAYER_CONSTRAIN_VMAX = HEIGHT;
const PLAYER_BULLET_WAITTIME = 100;
const PLAYER_HEALTH_MAX = 1;
const PLAYER_COLLISION_W = 10;
const PLAYER_COLLISION_H = 10;
const PLAYER_Z_INDEX = 10;

const BULLET_SPEED_VECTOR = {x: 0, y: -500};

const ENEMY_HEALTH_MAX = 1;
const ENEMY_BODY_POWER = 1;
const ENEMY_SPEED_NORMAL = 100;
const ENEMY_SPEED_FAST = 200;
const OPTION_LAUNCH_INTERVAL = 100;
const OPTION_RADIAN_STEP = Math.PI * 0.23;
const OPTION_BULLET_SPEED = 40;
const BOSS_HEALTH_MAX = 200;
const OPTION_HEALTH_MAX = 10;
const ENEMY_Z_INDEX = 10;
const BOSS_COLLISION_W = 60;
const BOSS_COLLISION_H = 36;
const PAWN_HEALTH_MAX = 1;
const KNIGHT_HEALTH_MAX = 7;
const BISHOP_HEALTH_MAX = 3;
const QUEEN_HEALTH_MAX = 10;

const STAR_SPEED = 100;
const STAR_NUM = 20;

const ENEMY_BEHAVIOUR_FORTH_BACK = [
    {time: 0, action: 'move', args: {x: 0, y: ENEMY_SPEED_NORMAL}},
    {time: 1000, action: 'move', args: {x: 0, y: 0}},
    {time: 1500, action: 'launch', args: null},
    {time: 2500, action: 'move', args: {x: 0, y: -ENEMY_SPEED_NORMAL}},
];
const ENEMY_BEHAVIOUR_STRAIGHT_DOWN = [
    {time: 0, action: 'move', args: {x: 0, y: ENEMY_SPEED_NORMAL}},
    {time: 200, action: 'launch', args: null},
    {time: 1300, action: 'launch', args: null},
    {time: 2400, action: 'launch', args: null},
    {time: 3500, action: 'launch', args: null},
    {time: 4600, action: 'launch', args: null},
];
const ENEMY_BEHAVIOUR_RIGHT_DOWN = [
    {time: 0, action: 'move', args: {x: ENEMY_SPEED_NORMAL/Math.sqrt(2), y: ENEMY_SPEED_NORMAL/Math.sqrt(2)}},
    {time: 1500, action: 'move', args: {x: 2*ENEMY_SPEED_NORMAL/Math.sqrt(5), y: ENEMY_SPEED_NORMAL/Math.sqrt(5)}},
    {time: 3000, action: 'move', args: {x: 4*ENEMY_SPEED_NORMAL/Math.sqrt(17), y: ENEMY_SPEED_NORMAL/Math.sqrt(17)}},
    {time: 3500, action: 'launch', args: null},
];
const ENEMY_BEHAVIOUR_LEFT_DOWN = [
    {time: 0, action: 'move', args: {x: -ENEMY_SPEED_NORMAL/Math.sqrt(2), y: ENEMY_SPEED_NORMAL/Math.sqrt(2)}},
    {time: 1500, action: 'move', args: {x: -2*ENEMY_SPEED_NORMAL/Math.sqrt(5), y: ENEMY_SPEED_NORMAL/Math.sqrt(5)}},
    {time: 3000, action: 'move', args: {x: -4*ENEMY_SPEED_NORMAL/Math.sqrt(17), y: ENEMY_SPEED_NORMAL/Math.sqrt(17)}},
    {time: 3500, action: 'launch', args: null},
];
const ENEMY_BEHAVIOUR_LEFT_TO_RIGHT = [
    {time: 0, action: 'move', args: {x: ENEMY_SPEED_NORMAL, y: 0}},
    {time: 500, action: 'launch', args: null},
    {time: 1000, action: 'launch', args: null},
    {time: 1500, action: 'launch', args: null},
    {time: 2000, action: 'launch', args: null},
    {time: 2500, action: 'launch', args: null},
    {time: 3000, action: 'launch', args: null},
    {time: 3500, action: 'launch', args: null},
    {time: 4000, action: 'launch', args: null},
    {time: 4500, action: 'launch', args: null},
    {time: 5000, action: 'launch', args: null},
    {time: 5500, action: 'launch', args: null},
    {time: 6000, action: 'launch', args: null},
    {time: 6500, action: 'launch', args: null},
];
const ENEMY_BEHAVIOUR_RIGHT_TO_LEFT = [
    {time: 0, action: 'move', args: {x: -ENEMY_SPEED_NORMAL, y: 0}},
    {time: 500, action: 'launch', args: null},
    {time: 1000, action: 'launch', args: null},
    {time: 1500, action: 'launch', args: null},
    {time: 2000, action: 'launch', args: null},
    {time: 2500, action: 'launch', args: null},
    {time: 3000, action: 'launch', args: null},
    {time: 3500, action: 'launch', args: null},
    {time: 4000, action: 'launch', args: null},
    {time: 4500, action: 'launch', args: null},
    {time: 5000, action: 'launch', args: null},
    {time: 5500, action: 'launch', args: null},
    {time: 6000, action: 'launch', args: null},
    {time: 6500, action: 'launch', args: null},
];
const ENEMY_BEHAVIOUR_BOSS = [
    {time: 1000, action: 'move', args: {x: 0, y: 0}},
    {time: 1500, action: 'launchAiming', args: null},
    {time: 2000, action: 'launchAiming', args: null},
    {time: 2500, action: 'launchAiming', args: null},
    {time: 3000, action: 'launchAiming', args: null},
    {time: 3500, action: 'launchAiming', args: null},
    {time: 4000, action: 'launchAiming', args: null},
    {time: 4500, action: 'launchAiming', args: null},
    {time: 5000, action: 'launchAiming', args: null},
    {time: 5500, action: 'launchAiming', args: null},
    {time: 6000, action: 'launchAiming', args: null},
    {time: 6500, action: 'launchAiming', args: null},
    {time: 7000, action: 'launchAiming', args: null},
    {time: 7500, action: 'launchAiming', args: null},
    {time: 8000, action: 'launchAiming', args: null},
    {time: 8500, action: 'launchAiming', args: null},
    {time: 9000, action: 'launchAiming', args: null},
    {time: 9500, action: 'launchAiming', args: null},
    {time: 10000, action: 'launchAiming', args: null},
    {time: 10500, action: 'launchAiming', args: null},
    {time: 11000, action: 'launchAiming', args: null},
    {time: 11500, action: 'launchAiming', args: null},
    {time: 12000, action: 'launchAiming', args: null},
    {time: 12500, action: 'launchAiming', args: null},
    {time: 16000, action: 'option', args: null},
];
const ENEMY_BEHAVIOUR_OPTION1 = [
    {time: 0, action: 'move', args: null},
    {time: 1000, action: 'move', args: {x: 0, y: 0}},
    {time: 2000, action: 'launch', args: null},
];
const ENEMY_BEHAVIOUR_OPTION2 = [
    {time: 0, action: 'move', args: null},
    {time: 1000, action: 'move', args: {x: 0, y: 0}},
    {time: 2000, action: 'launch', args: null},
];
const ENEMY_SPAWN_SCHEDULE2 = [
    {
        time: 500,
        type: 'boss',
        args: {
            x: WIDTH * 0.5,
            y: HEIGHT * 0.15,
            behaviours: ENEMY_BEHAVIOUR_BOSS,
            option1Behaviour: ENEMY_BEHAVIOUR_OPTION1,
            option2Behaviour: ENEMY_BEHAVIOUR_OPTION2
        },
    },
];

const OFFSET = 0;
const ENEMY_SPAWN_SCHEDULE = [
    {
        time: 500,
        type: 'pawn',
        args: {
            x: WIDTH * 0.5,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_FORTH_BACK,
        },
    },
    {
        time: 750,
        type: 'pawn',
        args: {
            x: WIDTH * 0.25,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_FORTH_BACK,
        }
    },
    {
        time: 750,
        type: 'pawn',
        args: {
            x: WIDTH * 0.75,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_FORTH_BACK,
        }
    },
    {
        time: 5000,
        type: 'knight',
        args: {
            x: WIDTH * 0.25,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 5000,
        type: 'knight',
        args: {
            x: WIDTH * 0.75,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 10000,
        type: 'pawn',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 11000,
        type: 'pawn',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 12000,
        type: 'pawn',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 13000,
        type: 'pawn',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 14000,
        type: 'pawn',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 12000,
        type: 'pawn',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 13000,
        type: 'pawn',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 14000,
        type: 'pawn',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 15000,
        type: 'pawn',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 16000,
        type: 'pawn',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 20000,
        type: 'bishop',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 21000,
        type: 'bishop',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 22000,
        type: 'bishop',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 23000,
        type: 'bishop',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 24000,
        type: 'bishop',
        args: {
            x: 0,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_DOWN,
        }
    },
    {
        time: 22000,
        type: 'bishop',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 23000,
        type: 'bishop',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 24000,
        type: 'bishop',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 25000,
        type: 'bishop',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 26000,
        type: 'bishop',
        args: {
            x: WIDTH,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_LEFT_DOWN,
        }
    },
    {
        time: 29000,
        type: 'knight',
        args: {
            x: WIDTH * 0.25,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 29000,
        type: 'knight',
        args: {
            x: WIDTH * 0.75,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 31000,
        type: 'knight',
        args: {
            x: WIDTH * 0.5,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 31000,
        type: 'knight',
        args: {
            x: WIDTH * 0.2,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 31000,
        type: 'knight',
        args: {
            x: WIDTH * 0.8,
            y: 0,
            behaviours: ENEMY_BEHAVIOUR_STRAIGHT_DOWN,
        }
    },
    {
        time: 38000,
        type: 'pawn',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 38500,
        type: 'pawn',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 39000,
        type: 'pawn',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 39500,
        type: 'pawn',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 40000,
        type: 'pawn',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 40500,
        type: 'pawn',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 41500,
        type: 'knight',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 42000,
        type: 'knight',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 42500,
        type: 'knight',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 43000,
        type: 'knight',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 43500,
        type: 'knight',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 44000,
        type: 'knight',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 44500,
        type: 'knight',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 45000,
        type: 'knight',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 45500,
        type: 'knight',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 46000,
        type: 'knight',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 47000,
        type: 'bishop',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 48000,
        type: 'bishop',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 49000,
        type: 'bishop',
        args: {
            x: 0,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_LEFT_TO_RIGHT,
        }
    },
    {
        time: 50000,
        type: 'bishop',
        args: {
            x: WIDTH+OFFSET,
            y: HEIGHT * 0.3,
            behaviours: ENEMY_BEHAVIOUR_RIGHT_TO_LEFT,
        }
    },
    {
        time: 60000,
        type: 'boss',
        args: {
            x: WIDTH * 0.5,
            y: HEIGHT * 0.15,
            behaviours: ENEMY_BEHAVIOUR_BOSS,
            option1Behaviour: ENEMY_BEHAVIOUR_OPTION1,
            option2Behaviour: ENEMY_BEHAVIOUR_OPTION2
        },
    },
];
Object.freeze(ENEMY_SPAWN_SCHEDULE);