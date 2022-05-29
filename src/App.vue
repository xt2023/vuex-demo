<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputChange"/>
    <a-button type="primary" @click="addItemList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="cbChange($event,item.id)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDone}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="btnChangeList('all')">全部</a-button>
          <a-button :type="viewKey==='undone'?'primary':'default'" @click="btnChangeList('undone')">未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'" @click="btnChangeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  methods:{
    //监听输入框改变事件
    inputChange (e){
      // console.log(e.target.value)
      this.$store.commit('setInputValue',e.target.value)
    },
    //点击添加项
    addItemList(){
      if (this.inputValue.trim().length===0){return this.$message.warning('不能为空')}
      this.$store.commit('addItem')
    },
    //点击移除item
    removeById (id){
      // console.log(id)
      this.$store.commit('removeItem',id)
    },
    //复选框状态的改变
    cbChange (e,id){
      // console.log(e.target.checked)
      // console.log(id)
      const param={
        id:id,
        status:e.target.checked
      }
      this.$store.commit('changeStatus',param)
    },
    //清除已完成
    clearDone (){
      this.$store.commit('clearItem')
    },
    //改变数据列表
    btnChangeList (key){
      // console.log(key)
      this.$store.commit('changeViewKey',key)
    }
  },

  created() {
    this.$store.dispatch('getList')

  },
  computed:{
    ...mapState([,'inputValue','viewKey']),
    ...mapGetters(['unDone','infoList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
