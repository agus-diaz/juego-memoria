const btnSwitch= document.querySelector('#switch')

btnSwitch.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
 });
 
window.onload = () => {
    h = 0;
    m = 0;
    s = 0;
    mls = 0;
    timeStarted = 0;
    time = document.getElementById("time");
    btnStart = document.getElementById("btn-start");
    btnStart.addEventListener("click", start);
 };

let cantidadTarjetas = 24

let imagenes = []
let selecciones = []
generarTablero()

function write() {
    let ht, mt, st, mlst;
    mls++;
 
    if (mls > 99) {
       s++;
       mls = 0;
    }
    if (s > 59) {
       m++;
       s = 0;
    }
    if (m > 59) {
       h++;
       m = 0;
    }
    if (h > 24) h = 0;
 
    mlst = ('0' + mls).slice(-2);
    st = ('0' + s).slice(-2);
    mt = ('0' + m).slice(-2);
    ht = ('0' + h).slice(-2);
    time.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
   
 }
 function reset() {
    clearInterval(timeStarted);
    time.innerHTML = "00:00:00.00"
    h = 0;
    m = 0;
    s = 0;
    mls = 0;
    btnStart.addEventListener("click", start);
 }
 function start() {
    write();
    timeStarted = setInterval(write, 10);
    btnStart.removeEventListener("click", start);
    }

function cargarIconos() {
    imagenes = [
        '<img src="imagenes/hertha.jpg">',
        '<img src="imagenes/inter.jpg">',
        '<img src="imagenes/psg.jpg">',
        '<img src="imagenes/portsmouth.jpg">',
        '<img src="imagenes/chelsea.jpg">',
        '<img src="imagenes/graafschap.png">',
        '<img src="imagenes/napoli.jpg">',
        '<img src="imagenes/zenit.png">',
        '<img src="imagenes/dynamo.png">',
        '<img src="imagenes/genk.jpg">',
        '<img src="imagenes/schalke.jpg">',
        '<img src="imagenes/everton.png">',
    ]
}

function generarTablero() {
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${imagenes[0]}
                </div>
                <div class="cara superior">
                      <img src="imagenes/signo_preg_azul.jpg">
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            imagenes.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        } else {
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
        }
        if (verificarFin()) {
            clearInterval(timeStarted);     
            btnStart.addEventListener("click", start);
            Swal.fire({
                title: 'Has completado el juego!',
                text: 'Tu tiempo fue '+time.innerHTML,
                imageUrl: 'imagenes/emoji_ok.jpg',
                imageWidth: 400,
                imageHeight: 200,
                confirmButtonText: 'Aceptar'
            })
            reset()
        }
    }, 1000);
}

function verificarFin() {
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "plum") {
            return false
        }
    }
    return true
}