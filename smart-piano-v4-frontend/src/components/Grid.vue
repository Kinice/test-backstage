<template>
    <div class="g-table">
        <el-table
            v-loading.fullscreen.lock="loading"
            :data="paginationData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                v-if="hasSelection"
                type="selection"
                width="55"
            >   
            </el-table-column>
            <el-table-column
                v-for="column in columns"
                v-if="!column.isImg"
                :prop="column.key"
                :label="column.label"
                align="center"
                :width="column.width"
                :sortable="column.sortable"
            >
            </el-table-column>
            <el-table-column
                v-for="img in generateImgData"
                :label="img.label"
                :width="img.width"
                align="center"
            >
                <template scope="scope">
                    <img :src="scope.row[img.key]" @click="imgPrev(scope.row[img.key])">
                </template>
            </el-table-column>
            <el-table-column
                v-if="buttonInfos"
                :label="buttonLabel"
                align="center"
                :width="buttonConWidth"
                >
                <template scope="scope">
                    <el-button v-for="button in buttonInfos.buttons"
                        size="small"
                        :type="button.type"
                        :disabled="button.disabled"
                        @click="handleButtonClick(scope,button.name)"
                    >{{button.label}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, sizes"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                :total="data.length">
            </el-pagination>
        </div>
        <el-dialog
            title="图片预览"
            :visible.sync="showImgPrev"
            size="tiny"
            class="img-prev-dialog">
            <img :src="imgPrevSrc">
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showImgPrev = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { BUTTON_CLICK,ROW_SELECT } from '../store/gridActions'

    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: this.pageSizeProp || 10,
                buttonLabel: this.buttonInfos ? this.buttonInfos.label : '操作',
                buttonConWidth: this.buttonInfos ? this.buttonInfos.width : '',
                buttonActions: {},
                rowSelections: [],
                imgPrevSrc: '',
                showImgPrev: false,
                hasImg: false,
            }
        },
        props: {
            loading: {
                type: Boolean,
                required: false
            },
            data: {
                type: Array,
                required: true
            },
            columns: {
                type: Array,
                required: true
            },
            pageSizeProp: {
                type: Number,
                required: false
            },
            buttonInfos: {
                type: Object,
                required: false
            },
            hasSelection: {
                type: Boolean,
                required: false,
                default: false
            },
            allowImgPrev: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        methods: {
            ...mapActions([BUTTON_CLICK,ROW_SELECT]),
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
            },
            handleButtonClick(scope,name) {
                this.buttonActions.scope = scope
                this.buttonActions.name = name
                this.BUTTON_CLICK(this.buttonActions) //save button info (include scope.row and its type) in an Object into vuex.state called `buttonAction`
                this.$emit('buttonClick')
            },
            handleSelectionChange(val) {
                this.rowSelections = val
                this.ROW_SELECT(val) //save row info in an Array into vuex.state called `rowAction`
                this.$emit('selected')
            },
            imgPrev(src) {
                if(this.allowImgPrev){
                    this.imgPrevSrc = src
                    this.showImgPrev = true
                }
            }
        },
        computed: {
            paginationData: function() { //handle pagination actions, return pagitated data
                let pageTotal = this.data.length,
                    pageFirstCount = this.pageSize*(this.currentPage-1),
                    tempData = [],
                    maxCount = pageTotal-pageFirstCount<this.pageSize?pageTotal:(pageFirstCount+this.pageSize)

                for(let i = pageFirstCount; i < maxCount; i++){
                    tempData.push(this.data[i])
                }

                return tempData
            },
            generateImgData: function(data) {
                let imgColumns = []
                this.columns.forEach(function(data){
                    let imgCol = {}
                    if(data.isImg){
                        imgCol.label = data.label
                        imgCol.key = data.key
                        imgCol.width = data.width
                        imgColumns.push(imgCol)
                    }
                })
                return imgColumns
            }
        }
    }
</script>
<style lang="less">
    .pagination{
        width: 100%;
        margin-top: 20px;
        text-align: right;
    }
    .itemAction{
        .cell{
            text-align: justify;
        }
    }
    .img-prev-dialog{
        text-align: center;
    }
</style>