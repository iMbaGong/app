import {createStore} from "vuex"

export default createStore({
  state:{
    user_id:0,
    token:'',
    userInfo:{
      username:'',
      userRole:'user'
    }
  },
  getters:{
    bearerToken:state => {
      return 'Bearer '+ state.token
    }
  },
  //同步修改
  mutations:{
    pushRecord(state,record){
      state.tableData.push(record)
    },
    setToken(state,token){
      state.token = token
    },
    setUserName(state,userName){
      state.userInfo.username = userName
    },
    setUserRole(state,userRole){
      state.userInfo.userRole = userRole
    },
    setUserId(state,userId){
      state.user_id = userId
    }
  },
  //异步提交mutations
  actions:{},
  modules:{}
})
