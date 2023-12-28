username = String(prompt("Set username : "));
loaded = 0;
const socket = io();
id = socket.id

// some basic socket emissions i wanted

function ready(){
    socket.emit('is_ready','yes');
    socket.emit('msg',{'username':username,'data':'is ready!'});
}

function submit(){
    socket.emit('msg',{'username':username, 'data':document.getElementById('inp').value});
    document.getElementById('inp').value = '';
}
function send(data) {
    socket.emit('message', data);
}


function startbaby(){
    socket.emit('startbaby', {});
}

function adder(){
    loaded+=1;
}
const block = new Image; // Using optional size for image
block.onload = adder(); // Draw when image has loaded
block.src = "static/block.png";

const rightidle = new Image; // Using optional size for image
rightidle.onload = adder(); // Draw when image has loaded
rightidle.src = "static/rightidle.png";

const leftidle = new Image; // Using optional size for image
leftidle.onload = adder(); // Draw when image has loaded
leftidle.src = "static/leftidle.png";


const rightwalk = new Image; // Using optional size for image
rightwalk.onload = adder(); // Draw when image has loaded
rightwalk.src = "static/walkright.png";

const leftwalk = new Image; // Using optional size for image
leftwalk.onload = adder(); // Draw when image has loaded
leftwalk.src = "static/walkleft.png";

const jump = new Image; // Using optional size for image
jump.onload = adder(); // Draw when image has loaded
jump.src = "static/jump.png";


c = setInterval(function(){
    if (loaded == 6){
        m()
        clearInterval(c)
    }
},10);


function m(){

usernames = {}


// socketio is dogshit

// positions
socket.on('message', function (data) {
    other_players[data['sid']] = data['data']
    timestamps[data['sid']] = data['data']['timestamp']
    usernames[data['sid']] = data['data']['username'];
});

// spawning bullets since 1999
socket.on('bullets', function (data) {
    bullets.push(data['data']);

});

// chat
socket.on('msg', function (data) {
    document.getElementById('chat').innerText += data['data']['username'] + " : " + data['data']['data']+'\n';
});


// announcements
socket.on('annc', function (data) {
    console.log('annc: ', data['data'],', game :',data['game']);
    document.getElementById('annc').innerText = data['data'];
    game = data['game'];
});

game = 0;

// didnt end up using this i think idk im sleep deprived let me die
socket.on('game', function (data) {
    console.log('game: ', data['data'],', game :',data['game']);
    game = data['game']
});


tagged = 0;

// hugely important dont touch
socket.on('gamedata', function (data) {
    console.log('gamedata: ', data['data']);
    game = data['game'];
    if (game == 1){
        if (data['data']['type'] == 'tagged'){
            tagged = data['data']['tagged'];
            tick = 1;
            setInterval(function(){tick=0;},2000);
        }
    }
    if (game == 2){
        jumps = 0;
    }
    if (game == 3){
        if (data['data']['type'] == 'confirm'){
            if (parseFloat(y.toFixed(2)) >= 149.99){
                console.log('yes');
                socket.emit('gamedata',{"data":{'type':'done','game':3}});
            }
        }
    }
    if (game == 4){
        if (data['data']['type'] == 'kill'){
            if (data['data']['id'] == socket.id){
                console.log('me gusta');
                dead = true;
            } else {
                deads.push(data['data']['id']);
            }
        }
        if (data['data']['type'] == 'ended'){
            deads = [];
            dead = false;
            update();
        }
    }
});

// yes
socket.on('new_conn', function (data) {
    console.log('new connection from sid:', data);
    other_players[data] = [100,100];
    timestamps[data] = 0;
    walkingticks[data] = 0;
    update();
});

// haw dosti todi, katti 
socket.on('close_conn', function (data) {
    console.log('closed connection from sid:', data);
    delete other_players[data]
    delete timestamps[data]
    delete walkingticks[n]
    update();
});




canvas = document.getElementsByTagName('canvas')[0];

canvas.width = innerWidth;
canvas.height = innerHeight;    

ctx = canvas.getContext('2d');


// variables be like yes.
x = 100;
y = 100;

xvel = 0;
yvel = 0;

friction = 0.98;

gravity = 0.05;
height = 25;
width = 25;

jumps = 0;

pressed = {};
mousex = 0;
mousey = 0;
clicked = false;














// listeners

window.addEventListener('mousemove',function (e){
    mousex = e.clientX;
    mousey = e.clientY;
})

window.addEventListener('mousedown',function (e){
    
    clicked = true;
})
window.addEventListener('mouseup',function (e){
    clicked = false;
})

window.addEventListener('keydown',function(e){
    if (pressed[e.key] != true){
        pressed[e.key] = true;
        
    }

})
window.addEventListener('keyup',function(e){
    if (pressed[e.key] != false){
        pressed[e.key] = false;
    }
})


blocks = [
    [
        "type",
        [
            0,
            550
        ]
    ],
    [
        "type",
        [
            25,
            550
        ]
    ],
    [
        "type",
        [
            50,
            550
        ]
    ],
    [
        "type",
        [
            75,
            550
        ]
    ],
    [
        "type",
        [
            100,
            550
        ]
    ],
    [
        "type",
        [
            125,
            550
        ]
    ],
    [
        "type",
        [
            150,
            550
        ]
    ],
    [
        "type",
        [
            175,
            550
        ]
    ],
    [
        "type",
        [
            200,
            550
        ]
    ],
    [
        "type",
        [
            225,
            550
        ]
    ],
    [
        "type",
        [
            250,
            550
        ]
    ],
    [
        "type",
        [
            275,
            550
        ]
    ],
    [
        "type",
        [
            300,
            550
        ]
    ],
    [
        "type",
        [
            325,
            550
        ]
    ],
    [
        "type",
        [
            350,
            550
        ]
    ],
    [
        "type",
        [
            375,
            550
        ]
    ],
    [
        "type",
        [
            400,
            550
        ]
    ],
    [
        "type",
        [
            425,
            550
        ]
    ],
    [
        "type",
        [
            450,
            550
        ]
    ],
    [
        "type",
        [
            475,
            550
        ]
    ],
    [
        "type",
        [
            500,
            550
        ]
    ],
    [
        "type",
        [
            525,
            550
        ]
    ],
    [
        "type",
        [
            550,
            550
        ]
    ],
    [
        "type",
        [
            575,
            550
        ]
    ],
    [
        "type",
        [
            600,
            550
        ]
    ],
    [
        "type",
        [
            625,
            550
        ]
    ],
    [
        "type",
        [
            650,
            550
        ]
    ],
    [
        "type",
        [
            675,
            550
        ]
    ],
    [
        "type",
        [
            700,
            550
        ]
    ],
    [
        "type",
        [
            725,
            550
        ]
    ],
    [
        "type",
        [
            750,
            550
        ]
    ],
    [
        "type",
        [
            775,
            550
        ]
    ],
    [
        "type",
        [
            800,
            550
        ]
    ],
    [
        "type",
        [
            825,
            550
        ]
    ],
    [
        "type",
        [
            850,
            550
        ]
    ],
    [
        "type",
        [
            875,
            550
        ]
    ],
    [
        "type",
        [
            900,
            550
        ]
    ],
    [
        "type",
        [
            925,
            550
        ]
    ],
    [
        "type",
        [
            975,
            550
        ]
    ],
    [
        "type",
        [
            950,
            550
        ]
    ],
    [
        "type",
        [
            1000,
            550
        ]
    ],
    [
        "type",
        [
            1025,
            550
        ]
    ],
    [
        "type",
        [
            1050,
            550
        ]
    ],
    [
        "type",
        [
            1075,
            550
        ]
    ],
    [
        "type",
        [
            1100,
            550
        ]
    ],
    [
        "type",
        [
            1125,
            550
        ]
    ],
    [
        "type",
        [
            1150,
            550
        ]
    ],
    [
        "type",
        [
            1175,
            550
        ]
    ],
    [
        "type",
        [
            1200,
            550
        ]
    ],
    [
        "type",
        [
            1225,
            550
        ]
    ],
    [
        "type",
        [
            425,
            450
        ]
    ],
    [
        "type",
        [
            450,
            450
        ]
    ],
    [
        "type",
        [
            475,
            450
        ]
    ],
    [
        "type",
        [
            550,
            400
        ]
    ],
    [
        "type",
        [
            575,
            400
        ]
    ],
    [
        "type",
        [
            600,
            400
        ]
    ],
    [
        "type",
        [
            675,
            350
        ]
    ],
    [
        "type",
        [
            700,
            350
        ]
    ],
    [
        "type",
        [
            725,
            350
        ]
    ],
    [
        "type",
        [
            850,
            300
        ]
    ],
    [
        "type",
        [
            875,
            300
        ]
    ],
    [
        "type",
        [
            900,
            300
        ]
    ],
    [
        "type",
        [
            0,
            525
        ]
    ],
    [
        "type",
        [
            0,
            475
        ]
    ],
    [
        "type",
        [
            0,
            500
        ]
    ],
    [
        "type",
        [
            0,
            450
        ]
    ],
    [
        "type",
        [
            0,
            425
        ]
    ],
    [
        "type",
        [
            0,
            400
        ]
    ],
    [
        "type",
        [
            0,
            375
        ]
    ],
    [
        "type",
        [
            0,
            350
        ]
    ],
    [
        "type",
        [
            0,
            325
        ]
    ],
    [
        "type",
        [
            0,
            300
        ]
    ],
    [
        "type",
        [
            0,
            275
        ]
    ],
    [
        "type",
        [
            0,
            250
        ]
    ],
    [
        "type",
        [
            0,
            225
        ]
    ],
    [
        "type",
        [
            0,
            200
        ]
    ],
    [
        "type",
        [
            1225,
            525
        ]
    ],
    [
        "type",
        [
            1225,
            500
        ]
    ],
    [
        "type",
        [
            1225,
            475
        ]
    ],
    [
        "type",
        [
            1225,
            450
        ]
    ],
    [
        "type",
        [
            1225,
            425
        ]
    ],
    [
        "type",
        [
            1225,
            400
        ]
    ],
    [
        "type",
        [
            1225,
            375
        ]
    ],
    [
        "type",
        [
            1225,
            350
        ]
    ],
    [
        "type",
        [
            1225,
            325
        ]
    ],
    [
        "type",
        [
            1225,
            300
        ]
    ],
    [
        "type",
        [
            1225,
            275
        ]
    ],
    [
        "type",
        [
            1225,
            250
        ]
    ],
    [
        "type",
        [
            1225,
            225
        ]
    ],
    [
        "type",
        [
            1225,
            200
        ]
    ],
    [
        "type",
        [
            1225,
            175
        ]
    ],
    [
        "type",
        [
            1050,
            425
        ]
    ],
    [
        "type",
        [
            1075,
            425
        ]
    ],
    [
        "type",
        [
            1100,
            425
        ]
    ],
    [
        "type",
        [
            1125,
            425
        ]
    ],
    [
        "type",
        [
            100,
            300
        ]
    ],
    [
        "type",
        [
            125,
            300
        ]
    ],
    [
        "type",
        [
            150,
            300
        ]
    ],
    [
        "type",
        [
            250,
            400
        ]
    ],
    [
        "type",
        [
            275,
            400
        ]
    ],
    [
        "type",
        [
            300,
            400
        ]
    ],
    [
        "type",
        [
            425,
            275
        ]
    ],
    [
        "type",
        [
            450,
            275
        ]
    ],
    [
        "type",
        [
            475,
            275
        ]
    ],
    [
        "type",
        [
            250,
            175
        ]
    ],
    [
        "type",
        [
            275,
            175
        ]
    ],
    [
        "type",
        [
            300,
            175
        ]
    ],
    [
        "type",
        [
            800,
            500
        ]
    ],
    [
        "type",
        [
            825,
            500
        ]
    ],
    [
        "type",
        [
            850,
            500
        ]
    ],
    [
        "type",
        [
            875,
            500
        ]
    ],
    [
        "type",
        [
            0,
            100
        ]
    ],
    [
        "type",
        [
            0,
            75
        ]
    ],
    [
        "type",
        [
            0,
            25
        ]
    ],
    [
        "type",
        [
            1225,
            150
        ]
    ],
    [
        "type",
        [
            1225,
            125
        ]
    ],
    [
        "type",
        [
            1225,
            75
        ]
    ],
    [
        "type",
        [
            1225,
            100
        ]
    ],
    [
        "type",
        [
            1225,
            50
        ]
    ],
    [
        "type",
        [
            1225,
            25
        ]
    ],
    [
        "type",
        [
            1225,
            0
        ]
    ],
    [
        "type",
        [
            625,
            175
        ]
    ],
    [
        "type",
        [
            650,
            175
        ]
    ],
    [
        "type",
        [
            700,
            175
        ]
    ],
    [
        "type",
        [
            675,
            175
        ]
    ],
    [
        "type",
        [
            725,
            175
        ]
    ],
    [
        "type",
        [
            750,
            175
        ]
    ],
    [
        "type",
        [
            775,
            175
        ]
    ],
    [
        "type",
        [
            800,
            175
        ]
    ],
    [
        "type",
        [
            825,
            175
        ]
    ],
    [
        "type",
        [
            850,
            175
        ]
    ],
    [
        "type",
        [
            875,
            175
        ]
    ],
    [
        "type",
        [
            900,
            175
        ]
    ],
    [
        "type",
        [
            925,
            300
        ]
    ],
    [
        "type",
        [
            950,
            300
        ]
    ],
    [
        "type",
        [
            975,
            300
        ]
    ],
    [
        "type",
        [
            1000,
            300
        ]
    ],
    [
        "type",
        [
            1025,
            300
        ]
    ],
    [
        "type",
        [
            1050,
            300
        ]
    ],
    [
        "type",
        [
            1075,
            300
        ]
    ],
    [
        "type",
        [
            1100,
            300
        ]
    ],
    [
        "jump",
        [
            1175,
            525
        ]
    ],
    [
        "jump",
        [
            1200,
            525
        ]
    ],
    [
        "jump",
        [
            25,
            525
        ]
    ],
    [
        "jump",
        [
            50,
            525
        ]
    ],
    [
        "type",
        [
            0,
            175
        ]
    ],
    [
        "type",
        [
            0,
            150
        ]
    ],
    [
        "type",
        [
            0,
            125
        ]
    ],
    [
        "type",
        [
            0,
            50
        ]
    ],
    [
        "type",
        [
            0,
            0
        ]
    ]
]








function update(){
    socket.emit('message',{'username':username,'x':parseFloat(x.toFixed(2)),'y':parseFloat(y.toFixed(2)),'xvel':parseFloat(xvel.toFixed(2)),'yvel':parseFloat(yvel.toFixed(2)),'grounded':grounded,'timestamp':d.getTime()})
}






// type, (posx,posy)




function draw_self(x,y){
    ctx.font = "12px monospace";
    ctx.textAlign = "center"
    ctx.fillStyle = "black";
    ctx.fillText(username, x+width/2,y-10);
    if (socket.id == tagged && game == 1){
        ctx.fillStyle = 'blue';
        ctx.fillRect(x-2,y-2,width+4,height+4)
        //console.log('yes')
    } 
    if (walkingtick%2 == 0 && direction == 'right'){
        ctx.fillStyle = 'red';

        ctx.drawImage(rightidle,x,y,width,height);
    }
    if (walkingtick%2 == 1 && direction == 'right'){
        ctx.fillStyle = 'red';

        ctx.drawImage(rightwalk,x,y,width,height);
    }
    if (walkingtick%2 == 0 && direction == 'left'){
        ctx.fillStyle = 'red';

        ctx.drawImage(leftidle,x,y,width,height);
    }
    if (walkingtick%2 == 1 && direction == 'left'){
        ctx.fillStyle = 'red';

        ctx.drawImage(leftwalk,x,y,width,height);
    }
    //ctx.fillRect(x,y,width,height);

}


// because minecraft
function render_blocks(){
    for (i=0;i<blocks.length;i++){

        if (blocks[i][0] == "type"){
            ctx.drawImage(block, blocks[i][1][0],blocks[i][1][1],cellwidth,cellheight);
        }
        if (blocks[i][0] == "jump"){
            ctx.drawImage(jump, blocks[i][1][0],blocks[i][1][1],cellwidth,cellheight);
        }
    }
}


// epic sexy collision system because who uses game making libraries lmao (i want to commit sudoku send help)
function collision_system(x,y,xvel,yvel,grounded){
    for (i=0;i<blocks.length;i++){
        cellx = blocks[i][1][0];
        celly = blocks[i][1][1];
        
        bruhx = x;
        bruhy = y;
        bruhxvel = xvel;
        bruhx+=xvel;

        points = [[bruhx+width,bruhy],[bruhx,bruhy],[bruhx,bruhy+height],[bruhx+width,bruhy+height]];

        for (j=0;j<points.length;j++){


            if (points[j][0] >= cellx && points[j][0] <= cellx+cellwidth && points[j][1] >= celly && points[j][1] <= celly+cellheight){
                if (xvel < 0){

                    x = cellx+cellwidth+0.01; 
                    
                }
                if (xvel > 0){
                    x = cellx-width-0.01; 
                }
                
                xvel = 0;
            }
        }
        bruhx-=bruhxvel
        
        bruhy+=yvel
        points = [[bruhx+width,bruhy],[bruhx,bruhy],[bruhx,bruhy+height],[bruhx+width,bruhy+height]];
        for (j=0;j<points.length;j++){
            if (points[j][0] >= cellx && points[j][0] <= cellx+cellwidth && points[j][1] >= celly && points[j][1] <= celly+cellheight){
                if (yvel < 0){
                    y = celly+cellheight+0.01;
                    yvel = 0;
                    
                }
                if (yvel > 0){
                    
                    y = celly-height-0.01;
                    grounded = true;
                    yvel = 0;
                }
                if (blocks[i][0] == "jump"){
                    yvel = -6;
                    grounded = false;
                }
                

            }
        }
    }

    return [x,y,xvel,yvel,grounded];
}

// simulate other players and their dreams and their desires
function sim_players(){
    for (g=0;g<Object.keys(other_players).length;g++){
        
        n = Object.keys(other_players)[g];

        isded = false;

        for (k=0;k<deads.length;k++){
            if (deads[k] == n){
                isded = true; // im embarassed dont look here pls
            }
        }


        if (n != socket.id && isded == false){
            
            ctx.font = "12px monospace";
            ctx.textAlign = "center"
            ctx.fillStyle = "black";
            ctx.fillText(usernames[n], other_players[n].x+width/2,other_players[n].y-10);

            if (n == tagged && game == 1){
                ctx.fillStyle = 'blue';
                ctx.fillRect(other_players[n].x-2,other_players[n].y-2,width+4,height+4)
                //console.log(n,socket.id)
            } 

            //ctx.fillRect(other_players[n].x,other_players[n].y,width,height);
            if (tick2%50 == 0 && Math.abs(other_players[n].xvel) > 1){
                console.log(walkingticks[n])
                walkingticks[n] +=1
            } 
            if (Math.abs(other_players[n].xvel) < 1) {
                walkingticks[n] = 0;
            }

            if (other_players[n].xvel == 0){
                ctx.drawImage(rightidle,other_players[n].x,other_players[n].y,width,height);
            } 
            if (other_players[n].xvel > 0 && walkingticks[n]%2==0){
                ctx.drawImage(rightidle,other_players[n].x,other_players[n].y,width,height);
            } 
            if (other_players[n].xvel > 0 && walkingticks[n]%2==1){
                ctx.drawImage(rightwalk,other_players[n].x,other_players[n].y,width,height);
            } 
            if (other_players[n].xvel < 0 && walkingticks[n]%2==0){
                ctx.drawImage(leftidle,other_players[n].x,other_players[n].y,width,height);
            } 
            if (other_players[n].xvel < 0 && walkingticks[n]%2==1){
                ctx.drawImage(leftwalk,other_players[n].x,other_players[n].y,width,height);
            } 
            other_players[n].xvel *= friction;
            other_players[n].yvel += gravity;

            coll = collision_system(other_players[n].x,other_players[n].y,other_players[n].xvel,other_players[n].yvel,other_players[n].grounded);


            // i was half sleep deprived dont mind my assignment
            other_players[n].x = coll[0]
            other_players[n].y = coll[1]
            other_players[n].xvel = coll[2]
            other_players[n].yvel = coll[3]
            other_players[n].grounded = coll[4]
            other_players[n].x+=other_players[n].xvel;
            other_players[n].y+=other_players[n].yvel;

        }
    }
}

prev_tagged = null;
function touching_whom(){
    for (g=0;g<Object.keys(other_players).length;g++){
        
        n = Object.keys(other_players)[g];
        
        // im going to jail for this hacky piece of touch detection
        if (n != id){
            points = [[x+width,y],[x,y],[x,y+height],[x+width,y+height]];
            for (j=0;j<points.length;j++){
                if (points[j][0] >= other_players[n].x && points[j][0] <= other_players[n].x+width && points[j][1] >= other_players[n].y && points[j][1] <= other_players[n].y+height){
                    if (game == 1 && tagged == socket.id && prev_tagged != n && tick == 0){
                        prev_tagged = tagged;
                        tagged = n;
                        socket.emit('gamedata',{"data":{'type':'tagged','tagged':tagged}});
                    }
                }
            }
        }
    }
}

function sim_bullets(){

    for (i=0;i<bullets.length;i++){
        try{
        bullets[i][0] += bullets[i][2];
        bullets[i][1] += bullets[i][3];

        ctx.fillStyle = "rgb(189,183,107)";
        ctx.fillRect(bullets[i][0],bullets[i][1],5,5);


        // collision detection first
        if (bullets[i][0] > innerWidth || bullets[i][0] < 0 || bullets[i][1] > innerHeight || bullets[i][1] < 0){
            bullets.splice(i,1)
        }
        for (j=0;j<blocks.length;j++){
            cellx = blocks[j][1][0];
            celly = blocks[j][1][1];
            if (bullets[i][0] >= cellx && bullets[i][0] <= cellx+cellwidth && bullets[i][1] >= celly && bullets[i][1] <= celly+cellheight){
                bullets.splice(i,1)
                break;
            }
        }

        // kill system later
        for (g=0;g<Object.keys(other_players).length;g++){
        
            n = Object.keys(other_players)[g];

            if (n != socket.id && n != bullets[i][4]){ // blud this is it
                
                if (bullets[i][0] >= other_players[n].x && bullets[i][0] <= other_players[n].x+width && bullets[i][1] >= other_players[n].y && bullets[i][1] <= other_players[n].y+height){
                    console.log(n,socket.id);
                    socket.emit('gamedata',{"data":{'type':'kill','id':n}});
                }
            }
        }
        
    }
    catch(e){
        // i dont care
    }
    }
}


// main variables haha fun

grounded = false;
cellheight = 25;
cellwidth = 25;
alrclicked = false;
xtouched = false; // i still dont know what this is
other_players = {};
tick = 0;
timestamps = {}; // thought if i just sorted the timestamps of movement emissions i'd get less lag. i was wrong.
bullets = [];
dead = false;
deads = [];
levelmaking = false; // experimental
walkingtick = 0;
walkingticks = {}
tick2 = 0;
direction = 'right';

function main(){
    ctx.fillStyle = "rgb(153,217,234)";
    ctx.fillRect(0,0,innerWidth,innerHeight);
    
    xvel *= friction;
    yvel += gravity;

    coll = collision_system(x,y,xvel,yvel,grounded);
    x = coll[0];
    y = coll[1];
    xvel = coll[2];
    yvel = coll[3];
    grounded = coll[4];

    x+=xvel;
    y+=yvel;

    if (xvel > 0){
        direction = 'right';
    }

    if (xvel < 0){
        direction = 'left';
    }

    if (y+height>=innerHeight){
        y = innerHeight-height;
        yvel = 0;
        grounded = true;
    }

    if (pressed[' '] && grounded == true && dead == false){
        yvel = -4;
        grounded = false;
        update();
        if (game == 2){
            jumps+=1;
        }
        if (jumps == 10){
            socket.emit('gamedata',{"data":{'type':'done','game':2}});
        }
    }
    if (pressed['a'] && dead == false){
        xvel -= 0.05;
        update();
    }
    
    if (pressed['d'] && dead == false){
        xvel += 0.05;
        update();
    }


    // sexy af level maker because who the fuck uses unreal engine like a noob

    
    if (pressed['l']){

        cellx = Math.floor(mousex/cellwidth)*cellwidth;
        celly = Math.floor(mousey/cellheight)*cellheight;

        ctx.fillStyle = "blue";
        ctx.fillRect(cellx,celly,cellwidth,cellheight);

        if (clicked == true && alrclicked == false){
            blocks.push(['type',[cellx,celly]]);
            alrclicked = true;
            console.log(blocks)
        }
    }
    

    if (clicked == true && alrclicked == false && dead == false && game == 4){
        ang = Math.atan2(mousex - (x+width/2), mousey - (y+height/2));

        ang = -ang + ((90 * Math.PI) / 180);

        bullets.push([x+width/2,y+height/2,2 * Math.cos(ang),2 * Math.sin(ang),socket.id]) // x, y, xvel, yvel

        socket.emit('bullets',{'data':[x+width/2,y+height/2,2 * Math.cos(ang),2 * Math.sin(ang),socket.id]});

        alrclicked = true;
    }

    // yes i cant handle click events
    if (clicked == false){
        alrclicked = false;
    }



    sim_players()
    sim_bullets()
    render_blocks();
    if (dead){
        x = 100;
        y = 100;
    } else {
    draw_self(x,y);
    }
    touching_whom();
    d = new Date();
    tick2 += 1;
}
setInterval(function(){if (pressed['a'] || pressed['d']){walkingtick+=1;} else {walkingtick=0; }},100)
setInterval(main,1);

}