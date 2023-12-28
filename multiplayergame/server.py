from flask import Flask, render_template
import socketio
import random
import time
import threading
sio = socketio.Server(cors_allowed_origins='*')
app = Flask(__name__,static_folder='static',template_folder='templates')
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

players = {}
positions = {}
usernames = {}
ready = {}

jumped = []
heighted = []

eliminated = []


def wait_game1(t):
    global tagged
    time.sleep(t)
    g = [usernames[tagged]+" lost",0]

    sio.emit('annc', {"data":usernames[tagged]+" lost","game":0}, room='room1')

def wait_game2(t):
    global jumped
    time.sleep(t)
    users = []
    for i in jumped:
        users.append(usernames[i])
    
    lost = []
    for i in list(usernames.values()):
        if not i in users:
            lost.append(i)
    g = [",".join(lost) +" lost",0]
    sio.emit('annc', {"data":",".join(lost) +" lost","game":0}, room='room1')

def wait_game3(t):
    global heighted
    time.sleep(t)
    sio.emit('gamedata', {"data":{'type':'confirm'},"game":3}, room='room1')
    sio.emit('annc', {"data":"Checking..","game":0}, room='room1')
    time.sleep(2)
    users = []
    for i in heighted:
        users.append(usernames[i])
    
    lost = []
    for i in list(usernames.values()):
        if not i in users:
            lost.append(i)
    g = [",".join(lost) +" lost",0]
    sio.emit('annc', {"data":",".join(lost) +" lost","game":0}, room='room1')

def wait_game4(t):
    global eliminated
    time.sleep(t)
    #print("eliminated",eliminated)
    sio.emit('gamedata', {"data":{'type':'ended'},"game":4}, room='room1')
    users = []
    for i in eliminated:
        try:
            users.append(usernames[i])
        except:
            pass
    
    lost = []
    for i in list(usernames.values()):
        if not i in users:
            lost.append(i)
    g = [",".join(lost) +" lost",0]
    sio.emit('annc', {"data":",".join(lost) +" won","game":0}, room='room1')

@sio.event
def connect(sid, environ):
    #print('Connected:', sid)
    sio.emit('new_conn', sid)
    players[sid] = 0
    sio.enter_room(sid, 'room1')
    ready[sid] = False
    sio.emit('annc', {"data":g[0],"game":g[1]}, room='room1')
    if g[1] == 1:
        sio.emit('gamedata', {"data":{'type':'tagged','tagged':tagged},"game":g[1]}, room='room1')
    if g[1] == 2:
        sio.emit('gamedata', {"data":{},"game":2}, room='room1')
    if g[1] == 3:
        sio.emit('gamedata', {"data":{'type':'started'},"game":3}, room='room1')
    if g[1] == 4:
        sio.emit('gamedata', {"data":{'type':'started'},"game":4}, room='room1')

@sio.event
def disconnect(sid):
    #print('Disconnected:', sid)
    sio.emit('close_conn', sid)
    del players[sid]
    del ready[sid]
    del usernames[sid]
    sio.leave_room(sid, 'room1')

g = ['',0]
@sio.event
def message(sid, data):
    #print('Received:', data)
    #if data['timestamp'] > players[sid]:
    usernames[sid] = data['username']
    sio.emit('message', {'data': data, 'sid': sid}, room='room1', skip_sid=sid)

@sio.event
def gamedata(sid, data):
    print('Received:', data)
    #if data['timestamp'] > players[sid]:
    global tagged
    if g[1] == 1:
        tagged = data['data']['tagged']
        sio.emit('gamedata', {'data': data['data'],'game':g[1]}, room='room1')
        #print(tagged)
    if g[1] == 2:
        jumped.append(sid)
    
    if g[1] == 3:
        heighted.append(sid)

    if g[1] == 4:
        if not data['data']['id'] in eliminated:
            eliminated.append(data['data']['id'])
            sio.emit('gamedata', {'data': data['data'],'game':g[1]}, room='room1')


@sio.event
def bullets(sid, data):
    print('bullet :', data)
    sio.emit('bullets', {'data': data['data'],'game':g[1]}, room='room1',skip_sid=sid)

@sio.event
def msg(sid, data):
    print('msg:', data)
    sio.emit('msg', {'data': data, 'sid': sid}, room='room1')

tagged = None
prev_tagged = None
@sio.event
def is_ready(sid, data):
    print('ready! -', data)
    ready[sid] = True
    allready = True
    for i in ready.keys():
        if ready[i] == False:
            allready = False
    
    game = [['Cheese says dont get tagged',1]]
    #['Cheese says jump 10 times',2],
    #['Cheese says attain height',3]]
    #['Cheese says be the last one standing',4]]

    global g
    global tagged
    global heighted
    global jumped
    global eliminated
    if allready:
        g = random.choice(game)
        sio.emit('annc', {"data":g[0],"game":g[1]}, room='room1')

        if g[1] == 1:
            tagged = random.choice(list(players.keys()))
            sio.emit('gamedata', {"data":{'type':'tagged','tagged':tagged},"game":g[1]}, room='room1')
            
            for i in ready.keys():
                ready[i] = False
            t1 = threading.Thread(target=wait_game1,args=(60,))
            t1.start()

        if g[1] == 2:
            jumped = []
            sio.emit('gamedata', {"data":{},"game":2}, room='room1')
            for i in ready.keys():
                ready[i] = False
            t1 = threading.Thread(target=wait_game2,args=(15,))
            t1.start()

        if g[1] == 3:
            heighted = []
            sio.emit('gamedata', {"data":{'type':'started'},"game":3}, room='room1')
            for i in ready.keys():
                ready[i] = False
            t1 = threading.Thread(target=wait_game3,args=(15,))
            t1.start()
        
        if g[1] == 4:
            eliminated = []
            sio.emit('gamedata', {"data":{'type':'started'},"game":4}, room='room1')
            for i in ready.keys():
                ready[i] = False
            t1 = threading.Thread(target=wait_game4,args=(30,))
            t1.start()

@sio.event
def startbaby(sid, data):
    print('ready! -', data)
    
    game = [['Cheese says dont get tagged',1],
    ['Cheese says jump 10 times',2],
    ['Cheese says attain height',3],
    ['Cheese says be the last one standing',4]]

    global g
    global tagged
    global heighted
    global jumped
    global eliminated

    g = random.choice(game)
    sio.emit('annc', {"data":g[0],"game":g[1]}, room='room1')

    if g[1] == 1:
        tagged = random.choice(list(players.keys()))
        sio.emit('gamedata', {"data":{'type':'tagged','tagged':tagged},"game":g[1]}, room='room1')
        
        for i in ready.keys():
            ready[i] = False
        t1 = threading.Thread(target=wait_game1,args=(60,))
        t1.start()

    if g[1] == 2:
        jumped = []
        sio.emit('gamedata', {"data":{},"game":2}, room='room1')
        for i in ready.keys():
            ready[i] = False
        t1 = threading.Thread(target=wait_game2,args=(15,))
        t1.start()

    if g[1] == 3:
        heighted = []
        sio.emit('gamedata', {"data":{'type':'started'},"game":3}, room='room1')
        for i in ready.keys():
            ready[i] = False
        t1 = threading.Thread(target=wait_game3,args=(15,))
        t1.start()
    
    if g[1] == 4:
        eliminated = []
        sio.emit('gamedata', {"data":{'type':'started'},"game":4}, room='room1')
        for i in ready.keys():
            ready[i] = False
        t1 = threading.Thread(target=wait_game4,args=(30,))
        t1.start()
        
@app.route('/')
def index():
    return render_template('main.html')

if __name__ == '__main__':
    app.run()
