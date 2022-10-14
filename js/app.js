//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

//variable que almacena todos los tw
let tweets = []


//EVENT LISTENERS
eventListeners()

function eventListeners(){

    //cuando el usuario agrega un nuevo TW
    formulario.addEventListener('submit', agregarTweet)

    //cuando el documento se carga
    document.addEventListener('DOMContentLoaded', ()=>{

        tweets = JSON.parse( localStorage.getItem('tweets')) || []

        crearHTML()
    })

}



//FUNCIONES
function agregarTweet(e){

    e.preventDefault()

    //extraer tweet que escribe el usuario
    const tweet = document.querySelector('#tweet').value;

    //validacioness
    if(!tweet) {

        mostrarError("No se pueden enviar TWs vacios")
        return;

    }
    
    const tweetObjs={
        id: Date.now(),
        //tweet: tweet
        tweet
    }
    //añadir arreglo TW
    tweets = [ ...tweets, tweetObjs]
    
    //creamos el HTML con el tweet
    crearHTML()

    //reiniciamos el formulario
    formulario.reset()
}

function mostrarError(err){

    //creamos el tag HTML
    const msjError = document.createElement("P");
    msjError.textContent = err;
    msjError.classList.add('error')

    //inyectamos el HTML
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(msjError)


    //eliminacion de la alerta
    setTimeout(() =>{
        msjError.remove()
    }, 1000)
}

//muestra el listo de los TW

function crearHTML(){   
    limpiarHTML()

    if(tweets.length > 0){

        tweets.forEach( tweet =>{

            //agregamos boton eliminar 
           const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-tweet';
               botonBorrar.innerText = 'x';

            //añadir funcion de eliminar
            botonBorrar.onclick = () =>{
                borrarTweet(tweet.id)
            }
         

            //creamor el html para cada twt
            const li = document.createElement('li');

            //añadimos el texto 
            li.innerText = tweet.tweet

            //asignamos el boton
            li.appendChild(botonBorrar)

            //inyectamos el HTML
            listaTweets.appendChild(li);
            
        })}

    //sincronizamos el LOCALSTORAGE
    sincronizarStorage();
    
}

//me sinconriza los tw con local storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))

}

//limpiamos el HTML
function limpiarHTML(){

    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//elimina un tw
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id)
    crearHTML()
}