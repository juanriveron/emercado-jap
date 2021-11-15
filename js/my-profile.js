//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//guardar cambios (button)//
function saveProfile(){
    let datos={};
    datos.nombre=document.getElementById("userName").value;
    datos.edad=document.getElementById("userAge").value;
    datos.telefono=document.getElementById("userPhone").value;
    datos.email=document.getElementById("email").value;
    datos.foto=document.getElementById("profileImg").src;

    localStorage.setItem('perfil',JSON.stringify(datos));
    alert('Cambios guardados')
}
    
//para recuperar datos//
document.addEventListener("DOMContentLoaded", function (e) {
 let datos=JSON.parse(localStorage.getItem('perfil'));
 if (datos !== null){
    document.getElementById("userName").value=datos.nombre;
    document.getElementById("userAge").value=datos.edad;
    document.getElementById("userPhone").value=datos.telefono;
    document.getElementById("email").value=datos.email;
    document.getElementById("profileImg").src=datos.foto;
 }
});

//mostrar imagen (onchange)//
function showPreview(){
    let preview=document.getElementById("profileImg");
    let file=document.querySelector("input[type=file]").files[0];
    let reader = new FileReader();

    reader.onloadend=function(){
        preview.src= reader.result;
        document.getElementById("profileImg").innerHTML= reader.result;      
    };
    if (file) {
        reader.readAsDataURL(file);
    }else{
        preview.src="img/avatar.png";
    }
}
