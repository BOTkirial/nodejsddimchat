var width, height;
var nbBulles = 50;

var tabBulles = [];

var jeu = document.createElement("div");
jeu.setAttribute("class", "jeuBulles");
document.body.appendChild(jeu);

function onWindowResize() {
    width = $(this).width();
    height = $(this).height();
    jeu.style.width = width + "px";
    jeu.style.height = height + "px";
}

$(window).resize(onWindowResize);
onWindowResize();

class Bulle {
    
    constructor(_id, _speed, _size, _posX, _posY) {
        
        this.id = _id;
        this.speed =_speed;
        this.size = _size * 15 + 15;
        this.posX = _posX * width;
        this.posY = _posY * height;
        this.create();
    }

    create() {
        this.div = document.createElement("div");
        this.div.setAttribute("class", "bulle");
        this.div.setAttribute("id", this.id);
        this.div.style.width = this.size + "px";
        this.div.style.height = this.size + "px";
        this.div.style.left = this.posX + "px";
        this.div.style.top = this.posY + "px";
        this.div.bulle = this;
        this.div.onclick = this.destroy;
        document.querySelector(".jeuBulles").appendChild(this.div);
    }

    destroy() {
        socket.emit('clickBulle', this.id);
    }

}

socket.on('createBulle', createBulle);
function createBulle(data) {
    tabBulles[data.bulle.id] = new Bulle(data.bulle.id, data.bulle.speed, data.bulle.size, data.bulle.posX, data.bulle.posY);
}

socket.on('moveBulle', moveBulle);
function moveBulle(data) {
    for(let cpt = 0; cpt < data.tabBulles.length; cpt++) {
        if(tabBulles[data.tabBulles[cpt].id] != undefined) {
            tabBulles[data.tabBulles[cpt].id].div.style.top = data.tabBulles[cpt].posY * height + "px";
        } 
        // console.log(Object.keys(tabBulles).length);
    }
}

socket.on('destroyBulle', destroyBulle);
function destroyBulle(idBulle) {
    if(isset(tabBulles[idBulle])) {
        document.querySelector(".jeuBulles").removeChild(tabBulles[idBulle].div);
        delete tabBulles[idBulle];
    }
}

// parametre type de destruction











