import "regenerator-runtime/runtime"

import alertas from '@/assets/repositoriosjs/alertas.js';
import Service from "@/services/SessionStorage";
import router from '@/router/index'

const alerts = alertas();
//Valida carga de videosRedes
const verifyresponseVideos = (result) => {
  return result.data.code == 200 ? successVideosRedes(result.data,1) :
      result.data.code == 403 ? denegado2() :
      result.data.code == 401 ? credentialinvalid2() :
      result.data.code == 500 ? denegado2()
  : error500();
}
//Valida respuesta al eliminar videosRedes
const verifyresponseDeleteVideos = (result) => {
  return result.data.code == 200 ? successVideosRedes(result.data,2) :
  result.data.code == 403 ? denegado2() :
  result.data.code == 401 ? credentialinvalid2() :
  result.data.code == 500 ? denegado2()
  : error500();
}
//Valida respuesta al editar VideosRedes
const verifyresponseUpdateVideos = (result) =>{
  return result.data.code == 200 ? successVideosRedes(result.data,3) :
  result.data.code == 403 ? denegado2() :
  result.data.code == 401 ? credentialinvalid2() :
  result.data.code == 500 ? denegado2()
: error500();
}
//Valida respuesta al crear red social
const verifyresponseRedSocial = (result) => {
    return result.data.code == 200 ? successRedSocial(result.data,1) :
      result.data.code == 403 ? denegado2() :
      result.data.code == 401 ? credentialinvalid2() :
      result.data.code == 500 ? denegado2()
  : error500();
}
//Valida respuesta al eliminar red social
const verifyresponseDeleteRedSocial = (result) => {

      return result.data.code == 200 ? successRedSocial(result.data,2) :
      result.data.code == 403 ? denegado2() :
      result.data.code == 401 ? credentialinvalid2() :
      result.data.code == 500 ? denegado2()
  : error500();
}
//Valida respuesta al eliminar red social
const verifyresponseUpdateRedSocial = (result) => {
  return result.data.code == 200 ? successRedSocial(result.data,3) :
  result.data.code == 403 ? denegado2() :
  result.data.code == 401 ? credentialinvalid2() :
  result.data.code == 500 ? denegado2()
  : error500();
}
//Mensaje cuando se acepta la politica de privacidad
const verifyresponsePolitica = (result) => {
  return result.data.code == 200 ? successPoliticaPrivacidad(result.data,1) :
  result.data.code == 403 ? denegado2() :
  result.data.code == 401 ? credentialinvalid2() :
  result.data.code == 500 ? denegado2()
  : error500();
}
const verifyresponseCancelaPolitica = (result) =>{
  return result.data.code == 200 ? successCancelaPolitica(result.data,1) :
  result.data.code == 403 ? denegado2() :
  result.data.code == 401 ? credentialinvalid2() :
  result.data.code == 500 ? denegado2()
  : error500();
}

const verifyRegister = (result) => {
  return result.data.code == 200 ? successRegister(result.data,1):
  result.data.status == 422 ? successRegister(result.data,2):
  result.data.code == 403 ? successRegister(result.data,2)() :
  result.data.code == 401 ? credentialinvalid2() :
  result.data.code == 500 ? successRegister(result.data,2)()
  : successRegister(result.data,2);
}

function successRegister(result,msj) {
  if(msj === 1){
    alerts.usuarioRegistrado();
  }
  if(msj === 2){
    alerts.usuarioExistente();
  }
  return result;
}

function successRedSocial(result, msj) {
  if(msj===1){
    alerts.RedSocialCreada();
  }else if(msj===2){
    alerts.RedSocialEliminada();
  }else if(msj===3){
    alerts.RedSocialActualizada();
  }
  return result;
}
//Funcion para verificar las respuestas de carga, eliminar y editar videos
function successVideosRedes(result, msj)
{
  if(msj === 1){
    alerts.VideoCargado();
  }else if(msj === 2){
    alerts.VideoEliminado()
  }else if (msj === 3){
    alerts.VideoActualizado();
  }
}
// Funcion para verificar la repuesta de la politica de privacidad
function successPoliticaPrivacidad(result, msj)
{
  if(msj === 1){
    alerts.Politica()
  }
}
function successCancelaPolitica(result,msj)
{
  if(msj === 1){
    alerts.CancelaPolitica()
  }
}


const responsenocontent = (result, msj) => {
    return result.code == 200 ? nocontentonly(msj) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        error500();
}
const filtraerror = (error) => {
    let respuesta = JSON.parse(JSON.stringify(error))
    let datos = { code: 401 };
    respuesta.data = datos;
    if (respuesta.message == 'Request failed with status code 401') {

        return verifyresponse(respuesta);
    }
    if (respuesta.message == 'Request failed with status code 500') {

        respuesta.data.code = 500;

        return verifyresponse(respuesta);
    }
}
const validaadduser = (error) => {
    let respuesta = JSON.parse(JSON.stringify(error))
    let datos = { code: 401 };
    respuesta.data = datos;
    if (respuesta.message == 'Request failed with status code 401') {

        return verifyresponse(respuesta);
    }
    if (respuesta.message == 'Request failed with status code 500') {

        respuesta.data.code = 500;

        return verifyresponse(respuesta);
    }

    if (respuesta.message == "Request failed with status code 422") {
        alerts.listaamigos();
        return false;

    }

}
const verifyadduser = (result) => {

    return result.code == 200 ? success(result.data) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        error500();
}
const successgeneric = (result) => {

    return result.code == 200 ? success(result) :
        result.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        error500();
}
const verifyrequesttables = (result) => {

    return result.status == 200 ? success(result.data) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        error500();
}

const nocontent = (result) => {

    return result.code == 204 ? success(result.data) :
        error500();
}
const verifyrequest = (result) => {

    return result.code == 200 ? success(result.data) :
        error500();
}
const verifyresponseadmin = (result) => {

    return result.code == 200 ? successprofilelock(result.data) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const verifyresponserole = (result) => {

    return result.code == 200 ? successrol(result.data) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const verifyresponse = (result) => {

    return result.code == 200 ? successprofile(result.data) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const verifyresponseempresa = (result) => {

    return result.code == 201 ? successempresa(result) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const verifyresponsecuenta = (result) => {

    return result.code == 200 ? successcuenta(result) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const verificayresponde = (result, msj) => {

    return result.code == 200 ? responde(result, msj) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}


const empresaedit = (result) => {

    return result.code == 201 ? successempresaedit(result) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}

const cuentaedit = (result) => {

    return result.code == 200 ? successcuentaedit(result) :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const empresadelete = (result) => {

    return result.code == 200 ? successdelete('Empresa Eliminada') :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}
const cuentadelete = (result) => {

    return result.code == 201 ? successdelete('Cuenta Suspendida') :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid2() :
        result.data.code == 500 ? denegado2()

    : error500();
}

const successprofilelock = (result) => {
    alerts.bloqueado();
    return result;
}
const valida = (result) => {

    return result.code == 200 ? success(result.data) :
        result.data.code == 403 ? denegado() :
        result.data.code == 401 ? credentialinvalid() :
        error500();
}
const validafriends = (result) => {


    return result.code == 200 ? success(result) :
        result.data.code == 403 ? denegado() :
        result.data.code == 401 ? credentialinvalid() :
        error500();
}
const validafriendslock = (result) => {


    return result.data.code == 200 ? success(result) :
        result.data.code == 403 ? denegado() :
        result.data.code == 401 ? credentialinvalid() :
        error500();
}
const validarol = (result) => {
    return result.code == 200 ? result.code :
        result.code == 401 ? sinroles() :
        result.data.code == 403 ? denegado2() :
        result.data.code == 401 ? credentialinvalid() :
        error500();
}

function pendiente() {
    alerts.pending();
}

function success(result) {
    return result;
}

function responde(result, msj) {
    alerts.response(msj);
    return result;
}

function successrol(result) {
    alerts.roleactualizado();

    return result;
}

function solicitudyaenviada() {
    alerts.solicitudenviada();
    return false;
}

function yourusers() {
    alerts.listaamigos();
    return false;
}

function solicitudyarecibida() {

    alerts.solicitudrecibida();
    return false;
}

function nocontentonly(msj) {
    alerts.response(msj);
}

function userbloqueadoporti() {
    alerts.yourlock();
    return false;

}

function listanegra2() {
    alerts.listanegra();
    return false;

}

function successrequest(result) {
    alerts.solicitudenviadaok();
    return result;
}


function successdelete(result) {
    alerts.deletemsj(result);
    return result;
}

function successempresaedit(result) {
    alerts.empresaactualizada();
    return result;
}

function successcuentaedit(result) {
    alerts.cuentaactualizada();
    return result;
}

function successprofile(result) {
    alerts.perfilactualizado();
    return result;
}

function successempresa(result) {
    alerts.empresaagregada();
    return result;
}

function successcuenta(result) {
    alerts.cuentaagregada();
    return result;
}

function successempresadelete(result) {
    alerts.deletemsj(result);
    return result;
}

function denegado2() {
    router.push({ path: '/login' })
    alerts.denegado();
}

function denegado() {
    alerts.denegado();
}

function sinroles() {
    alerts.sinroles();
    router.push({ path: '/login' })
}

function credentialinvalid() {
    alerts.invalid();
    router.push({ path: '/login' })

}

function credentialinvalid2() {
    alerts.invalid();
    router.push({ path: '/login' })

}

function sucessfotoperfil() {
    alerts.imagenupload();
}

function error500() {
    alerts.errorservidor();

}
export default () => ({
    verificayresponde,
    responsenocontent,
    successgeneric,
    cuentadelete,
    cuentaedit,
    verifyresponsecuenta,
    empresadelete,
    empresaedit,
    verifyresponseempresa,
    verifyresponserole,
    verifyresponseadmin,
    verifyrequesttables,
    verifyrequest,
    valida,
    validarol,
    filtraerror,
    verifyresponse,
    sucessfotoperfil,
    validafriends,
    validafriendslock,
    nocontent,
    verifyadduser,
    validaadduser,
    verifyresponseRedSocial,
    verifyresponseDeleteRedSocial,
    verifyresponseUpdateRedSocial,
    verifyresponseVideos,
    verifyresponseDeleteVideos,
    verifyresponseUpdateVideos,
    verifyresponsePolitica,
    verifyresponseCancelaPolitica,
    verifyRegister
});
