<template>
    <div class="m-item">
        <div class="item-title">
            <h2 class="title">曲目版本编辑</h2>
        </div>
        <div class="item-content">
            <div class="g-retrieval-container">
                <div class="retrieval-title" @click="showSearchFields = !showSearchFields">
                    <h3 class="title">条件检索</h3>
                    <i class="iconfont icon-right" :class="{ 'icon-right-rotate':showSearchFields }"></i>
                </div>
                <el-collapse-transition>
                    <div class="retrieval-content" v-show="showSearchFields">
                        <el-form :inline="true" :model="searchFields" label-position="top">
                            <el-row type="flex" justify="space-between">
                                <el-col :span="4">
                                    <el-form-item label="类型">
                                        <el-select size="small" v-model="searchFields.type" placeholder="类型">
                                            <el-option label="曲谱" value="score"></el-option>
                                            <el-option label="卡拉" value="kala"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="艺术家">
                                        <el-select size="small" v-model="searchFields.artist" placeholder="艺术家">
                                            <el-option label="莫扎特" value="shanghai"></el-option>
                                            <el-option label="贝多芬" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="难度">
                                        <el-select size="small" v-model="searchFields.artist" placeholder="新手">
                                            <el-option label="莫扎特" value="shanghai"></el-option>
                                            <el-option label="贝多芬" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="风格">
                                        <el-select size="small" v-model="searchFields.artist" placeholder="古典">
                                            <el-option label="莫扎特" value="shanghai"></el-option>
                                            <el-option label="贝多芬" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="上下线状态">
                                        <el-select size="small" v-model="searchFields.artist" placeholder="大陆上线">
                                            <el-option label="莫扎特" value="shanghai"></el-option>
                                            <el-option label="贝多芬" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div class="search-button-container">
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="g-grid-buttons">
                <el-button>批量上传</el-button>
                <el-button @click="batchEdit">批量编辑</el-button>
                <el-button @click="batchDelete">批量删除</el-button>
            </div>
            <Grid
                :data="gridOption.data" 
                :columns="gridOption.columns" 
                :pageSizeProp="gridOption.pageSize" 
                :buttonInfos="buttonInfos"
                v-on:buttonClick="buttonClick"
                v-on:selected="selectRow"
                hasSelection></Grid>
        </div>
        <edit-one
            :showEditOne="showEditOne"
            v-on:closeEditOne="closeEditOneHandler"
            v-on:confirmEditOne="confirmEditOneHandler"></edit-one>
    </div>
</template>

<script>
  export default {
    data(){
        return{
            //grid datas
            gridOption:{
                data:[],
                columns:[{
                    key: 'id',
                    label: '序号',
                    width: 87,
                    sortable: true
                },{
                    key: 'name',
                    label: '曲目版本名称'
                },{
                    key: 'songname',
                    label: '曲目名称'
                },{
                    key: 'img',
                    label: '曲集封面',
                    //width: 200,
                    isImg: true
                },{
                    key: 'artist',
                    label: '艺术家'
                },{
                    key: 'type',
                    label: '类型',
                    width: 87
                },{
                    key: 'difficult',
                    label: '难度',
                    width: 87
                },{
                    key: 'style',
                    label: '风格',
                    width: 87
                },{
                    key: 'status',
                    label: '上线状态'
                },{
                    key: 'tm',
                    label: '国内版权'
                },{
                    key: 'weight',
                    label: '权重',
                    width: 87
                }],
                pageSize: 10,
                currentPage: 1
            },
            loading: {},
            buttonInfos: {
                label: '管理',
                width: 135,
                buttons: [{
                    name: 'edit',
                    label: '编辑',
                    type: ''
                },{
                    name: 'delete',
                    label: '删除',
                    type: 'danger'
                }]
            },
            selectedRow: [],
            //search infos
            searchFields: {
                user: '',
                region: ''
            },
            showSearchFields: false,
            showEditOne: false
        }
    },
    methods: {
        //test
        setTableData() {
            let finalArr = []
            for(let i = 0; i < 7; i++){
                let temp = {
                    id: i+1,
                    name: '天空之城-初级版',
                    songname: '天空之城',
                    img: `/static/images/buy${i+1}.png`,
                    artist: '久石让',
                    type: '卡拉',
                    difficult: '初级',
                    style: '古典',
                    status: '大陆上线',
                    tm: '太合版权',
                    weight: i+1
                }
                finalArr.push(temp)
            }
            this.gridOption.data = finalArr
        },
        onSubmit() {
            console.log(this)
        },
        buttonClick() { //handle grid button events,it is distinguish types by `buttonInfos.buttons[i].name`
            let buttonType = this.$store.state.Grid.buttonAction.name,
                row = this.$store.state.Grid.buttonAction.scope.row

            if(buttonType == 'edit'){
                this.$confirm(`你点击的是序号为‘${ row.id }’的编辑按钮`,'编辑',{
                    confirmButtonText: '编辑',
                    cancelButtonText: '取消编辑'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '编辑了！'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消编辑'
                    })
                })
            }else if(buttonType == 'delete'){
                this.$confirm(`你确定要删除序号为‘${ row.id }’这一条吗？`,'删除',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消删除',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除了！（其实并没有）'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    })
                })
            }
        },
        selectRow() {
            this.selectedRow = this.$store.state.Grid.rowAction
        },
        batchDelete() {
            if(this.selectedRow.length>0){
                this.$confirm(`你确定要删除这${ this.selectedRow.length }条吗？`,'批量删除',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消删除',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除了！（其实并没有）'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    })
                })
            }else{
                this.$message({
                    type: 'info',
                    message: '你啥都没选呢！'
                })
            }
        },
        batchEdit() {
            this.showEditOne = true
        },
        confirmEditOneHandler() {
            let oneData = this.$store.state.TrackVersion.oneForm
            this.loading = this.$loading()
            console.log(oneData)
            setTimeout(function(){
                this.$message({
                    type: 'success',
                    message: '编辑成功'
                })
                this.showEditOne = false
                this.loading.close()
            }.bind(this),1000) 
        },
        closeEditOneHandler() {
            this.$message({
                type: 'info',
                message: '取消编辑'
            })
            this.showEditOne = false
        }
    },
    mounted() {
        this.setTableData()
    },
    components: {
        Grid: require('../../components/Grid.vue'),
        editOne: require('./editOne')
    },
  }
</script>

<style lang="less" scoped>
</style>
