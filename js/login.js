//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("iniciar_sesion").addEventListener("click",guardado)

});

function guardado(){
  
  let Usuarioemail=document.getElementById("email").value
  let Usuariopassword=document.getElementById("password").value

  if ((Usuarioemail !=="") && (Usuariopassword !=="")){
    sessionStorage.setItem("ingrese_email", Usuarioemail);
    sessionStorage.setItem("ingrese_password",Usuariopassword);
    //window.location.href="home.html"//
  }
}

