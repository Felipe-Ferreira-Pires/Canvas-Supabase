

const firebaseConfig = {
  apiKey: "AIzaSyAYXGUAOJgKZVP_yyR8bgfWgAxZ7teplyA",
  authDomain: "art-canvas-87464.firebaseapp.com",
  projectId: "art-canvas-87464",
  storageBucket: "art-canvas-87464.firebasestorage.app",
  messagingSenderId: "290036103766",
  appId: "1:290036103766:web:042ee7ebbc6577539219f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const canvas = document.getElementById ("meuCanvas")
const ctx = canvas.getContext("2d")

//const cor = document.getElementById ("corAtual")
const espessura = document.getElementById ("espessura")
const limpar = document.getElementById ("limpar").onclick = () => modo = "limpar"
const desfazer = document.getElementById ("desfazer")
const salvar = document.getElementById ("salvar")

const lápis = document.getElementById ("livre").onclick = () => modo = "livre"
const x = document.getElementById ("x").onclick = () => modo = "x"
const linha = document.getElementById ("linha").onclick = () => modo = "linha"
const circulo = document.getElementById ("circulo").onclick = () => modo = "circulo"
const borracha = document.getElementById ("borracha").onclick = () => modo = "borracha"
const quadrado = document.getElementById ("quadrado").onclick = () => modo = "quadrado"

let desenhando = false

let xFim,yFim

let modo = "livre"

let xInicio = 0, yInicio =0

let historico = []


function salvarEstado() {
    const estado = ctx.getImageData(0,0,canvas.width,canvas.height)
    historico.push (estado)

    if (historico.length > 20 ) {
    historico.shift();
    }
}

canvas.addEventListener("mousedown", (e) =>{
    desenhando = true;
    xInicio = e.offsetX;
    yInicio = e.offsetY;

    salvarEstado()
    
    const xFim = e.offsetX;
    const yFim = e.offsetY;
    
    const largura = xFim - xInicio
    const altura = yFim - yInicio
    
    ctx.beginPath();
    ctx.moveTo(xInicio, yInicio);
    
    if (modo == "livre" || modo == "borracha") {
        ctx.beginPath();
        ctx.moveTo(xInicio, yInicio);
        
    }

    console.log (modo)

     if (modo == "circulo") {
      const raio = Math.hypot(largura,altura)
      ctx.beginPath();
      ctx.arc(xInicio,yInicio,raio, 0, 2*Math.PI);
      ctx.moveTo(xInicio, yInicio);
      ctx.stroke()
    }

    if (modo == "limpar") { 
     ctx.clearRect(0,0, canvas.width,canvas.height)
  }
})


canvas.addEventListener("mousemove", (e) => {
    if (!desenhando)return
        
     const xAtual = e.offsetX 
     const yAtual = e.offsetY
     
     
    const largura = xFim - xInicio
    const altura = yFim - yInicio

    if (modo === "livre") {
        ctx.strokeStyle = corAtual;
        ctx.lineWidth = espessura.value;
        ctx.lineTo(xAtual,yAtual)
        ctx.stroke()
    }

    if (modo === "borracha") {
        ctx.strokeStyle = "white"
        ctx.lineWidth = espessura.value;
        ctx.lineTo(xAtual,yAtual)
        ctx.stroke()
    }

    
    if (modo == "circulo") {
      const raio = Math.hypot(largura,altura)
      ctx.beginPath();
      ctx.arc(xInicio,yInicio,raio, 0, 2*Math.PI);
      ctx.moveTo(xInicio, yInicio);
      console.log (largura,altura)
      ctx.stroke()
    }

    if (modo == "limpar") { 
     ctx.clearRect(0,0, canvas.width,canvas.height)
  }
})




canvas.addEventListener("mouseup", (e) => {
    desenhando=false

    const xFim = e.offsetX;
    const yFim = e.offsetY;

    const largura = xFim - xInicio
    const altura = yFim - yInicio

    ctx.strokeStyle = corAtual;
    ctx.fillStyle = corAtual;
    ctx.lineWidth = espessura.value;

    console.log (modo)

    
    if (modo == "circulo") {
      const raio = Math.hypot(largura,altura)
      ctx.beginPath();
      ctx.arc(xInicio,yInicio,raio, 0, 2*Math.PI);
      ctx.moveTo(xInicio, yInicio);
      console.log (largura,altura)
      preencher.checked ? ctx.fill () : ctx.stroke()
    }

    if (modo == "quadrado") {
             if (preencher.checked) {
                ctx.fillRect(xInicio,yInicio,largura,altura)
            } else {
                ctx.strokeRect(xInicio,yInicio,largura,altura)
            }
                
          }
    if (modo == "linha") {
            ctx.beginPath()
            ctx.moveTo(xInicio,yInicio)
            ctx.lineTo(xFim,yFim)
            ctx.stroke()
    } 

    if (modo == "x") {
            ctx.beginPath();
            ctx.moveTo(xInicio, yInicio);
            ctx.lineTo(xFim, yFim);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(xInicio, yFim);
            ctx.lineTo(xFim, yInicio);
            ctx.stroke();
  }
  
})
  


desfazer.addEventListener("click", ()=>{
    const ultimo = historico.pop();
    if(ultimo) {
        ctx.putImageData(ultimo,0,0)
    }
})


salvar.addEventListener("click", ()=> {
    const link = document.createElement("a")
    link.download = "Meu Desenho.Png"
    link.href = canvas.toDataURL()
    link.click()
})



function ajustarCanvas () {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height
}

ajustarCanvas()
window.addEventListener("resize",ajustarCanvas)


// COLOR PICKER //

let corAtual = '#000000';

const pickr = Pickr.create({
  el: '#corPicker',
  theme: 'classic', // grande e confortável
  default: '#000000',

  components: {
    preview: true,
    opacity: true,
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      input: true,
      save: true
    }
  }
});

pickr.on('change', (color) => {
  corAtual = color.toHEXA().toString();
});


