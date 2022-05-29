import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    inputValue:'aaa',
    id:5,
    viewKey:'all'
  },
  getters: {
    unDone (state){
      return state.list.filter(x=>x.done==false).length
    },
    infoList(state){
      if (state.viewKey==='all')return state.list
      if (state.viewKey==='done') return state.list.filter(x=>x.done)
      if (state.viewKey==='undone') return state.list.filter(x=>!x.done)
      return state.list
    }
  },
  mutations: {
    initLIst(state,list){
      state.list=list
    },
    setInputValue (state,value){
      state.inputValue=value
    },
    //添加软件
    addItem(state){
      const obj={
        id:state.id,
        info:state.inputValue,
        done:false
      }
      state.list.push(obj)
      state.id++
      state.inputValue=''
    },
    //碘酒移除item
    removeItem(state,id){
      const i=state.list.find(x=>{
        x.id===id
      })
      if (i!==-1){
        state.list.splice(id,1)
      }
    },
    //复选框的改变
    changeStatus (state,param){
      const i=state.list.findIndex(x=>
        x.id===param.id
      )
      if (i!==-1){
        state.list[i].done=param.status
      }
    },
    //清除已完成
    clearItem (state){
      state.list=state.list.filter(x=>x.done===false)
    },
    //修改视图关键字
    changeViewKey (state,key){
      state.viewKey=key
    }
  },
  actions: {
    getList(context){
      axios.get('/list').then(({data})=>{
        // console.log(data)
        context.commit('initLIst',data)
      })

    },

  },
  modules: {
  }
})
