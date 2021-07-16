import request from './network'

export function register(data){
  return request({
    url:'/users/register',
    method:'post',
    data
  })
}

export function verified(data){
  return request({
    url:'/users/realname',
    method:'post',
    data
  })
}

export function updateInfo(data){
  return request({
    url:'/users/update',
    method:'post',
    data
  })
}

export function applyLandlord(data,user_name){
  return request({
    url:'/users/new/landlord'+'/'+user_name,
    method:'get',
    data
  })
}

export function login(data){
  return request({
    url:'/users/login',
    method:'post',
    data
  })
}

export function getUserInfo(data,user_name){
  return request({
    url:'/users'+'/'+user_name,
    method:'get',
    data
  })
}

export function addHomestays(data){
  return request({
    url:'/homestays/add',
    method:'post',
    data
  })
}

export function getAllHomestays(){
  return request({
    url:'/homestays/all',
    method:'get'
  })
}

export function getHomestayById(id){
  return request({
    url:'/homestays/'+id,
    method:'get'
  })
}

export function filterHomestays(data){
  return request({
    url:'/homestays/filter',
    method:'post',
    data
  })
}

export function getHomestays(user_name){
  return request({
    url:'/homestays/bylandlord'+'/'+user_name,
    method:'get'
  })
}

export function changeHomestayInfo(data){
  return request({
    url:'/homestays/update',
    method:'post',
    data
  })
}

export function changeHomestayStatus(data,homestay_id,status){
  return request({
    url:'/homestays/changestatus'+'/'+homestay_id+'/'+status,
    method:'post',
    data
  })
}

export function addFavor(user_name,homestay_id){
  return request({
    url:'/homestays/addfavor/'+user_name+'/'+homestay_id,
    method:'get',

  })
}

export function delFavor(user_name,homestay_id){
  return request({
    url:'/homestays/delfavor/'+user_name+'/'+homestay_id,
    method:'get',

  })
}

export function getUserFavor(user_name){
  return request({
    url:'/homestays/favor/'+user_name,
    method:'get',
  })
}

export function sendSessions(data){
  return request({
    url:'/sessions/send',
    method:'post',
    data
  })
}

export function getRecvSessions(user_name){
  return request({
    url:'/sessions/recv/'+user_name,
    method:'get'
  })
}

export function getSendSessions(user_name){
  return request({
    url:'/sessions/send/'+user_name,
    method:'get'
  })
}

export function setSessionread(session_id){
  return request({
    url:'/sessions/readed/'+session_id,
    method:'get'
  })
}

export function addOrder(data){
  return request({
    url:'/orders/add',
    method:'post',
    data
  })
}

export function payOrder(data,order_id){
  return request({
    url:'/orders/pay'+'/'+order_id,
    method:'post',
    data
  })
}

export function getOrderById(order_id){
  return request({
    url:'/orders'+'/'+order_id,
    method:'get'

  })
}

export function delOrderById(data,order_id){
  return request({
    url:'/orders'+'/'+order_id,
    method:'del',
    data
  })
}

export function getUserOrders(user_name){
  return request({
    url:'/orders/user'+'/'+user_name,
    method:'get',
  })
}

export function addCommments(data){
  return request({
    url:'/comments/add',
    method:'post',
    data
  })
}

export function getAllCommments(){
  return request({
    url:'/comments/all',
    method:'get'
  })
}

export function changeCommentStatus(data,order){
  return request({
    url:'/comments/changestatus'+'/'+order_id,
    method:'post',
    data
  })
}

export function changeUserCredit(user_name,credit){
  return request({
    url:'/users/credit/'+user_name+'/'+credit,
    method:'get'
  })
}

export function changeLandloadInfo(data){
  return request({
    url:'/users/update/landlord',
    method:'post',
    data
  })
}

export function getAllUser(){
  return request({
    url:'users/all',
    method: 'get',
  })
}

export function getAllAdmin(){
  return request({
    url:'/users/all/admin',
    method: 'get',
  })
}

export function verifyTokensw(){
  return request({
    url:'/users/verify/token',
    method: 'get'
  })
}
