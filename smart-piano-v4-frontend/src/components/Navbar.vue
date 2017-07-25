<template>
  <header class="g-hd">
    <div class="m-logo">
      <span>The ONE曲库管理后台</span>
    </div>
    <div class="m-user">
      <span class="m-wel">
        
      </span>
      <span class="m-exit" @click="signout">
        退出
      </span>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      signout() {
        this.$message.success('成功退出登录')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  @headerHeight: 60px;
  .g-hd{
    height: @headerHeight;
    background: #324057;
    min-width: 875px;
    .m-logo{
      line-height: @headerHeight;
      margin-left: @headerHeight; 
      //替换
      span{
        color: #fff;
        font-size: 1.8em;
      }
    }
    .m-user{
      line-height: @headerHeight;
      margin-right: @headerHeight;
      position: absolute;
      right: 0;
      top: 0;
      .m-wel{
        color: #fff;
        font-size: 1.2em;
      }
      .m-exit{
        color: #fff;
        font-size: 1.2em;
        display: inline-block;
        cursor: pointer;
      }
      .m-exit:hover{
        color: #20a0ff;
      }
    }
  }
</style>
