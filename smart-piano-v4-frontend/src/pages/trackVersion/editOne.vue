<template>
    <el-dialog
        title="编辑"
        :visible.sync="showEditOne"
        size="small"
        :before-close="cancelEdit">
        <div class="dialog-form">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="曲目版本名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-col :span="12">
                    <el-form-item label="曲目名称">
                        <el-col :span="11">
                            <el-input v-model="form.name" placeholder="中文"></el-input>
                        </el-col>
                        <el-col class="midholder" :span="2">&nbsp;</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.name" placeholder="英文"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="类型">
                        <el-select v-model="form.region" placeholder="类型">
                            <el-option label="曲谱" value="shanghai"></el-option>
                            <el-option label="卡拉" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="艺术家">
                        <el-col :span="11">
                            <el-input v-model="form.name" placeholder="中文"></el-input>
                        </el-col>
                        <el-col class="midholder" :span="2">&nbsp;</el-col>
                        <el-col :span="11">
                            <el-input v-model="form.name" placeholder="英文"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="难度">
                        <el-select v-model="form.region" placeholder="难度">
                            <el-option label="新手" value="shanghai"></el-option>
                            <el-option label="初级" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="风格">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="古典" value="shanghai"></el-option>
                            <el-option label="流行" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="大陆版权">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="太合版权" value="shanghai"></el-option>
                            <el-option label="索尼版权" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="海外版权">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="太合版权" value="shanghai"></el-option>
                            <el-option label="索尼版权" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="人群">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="成人" value="shanghai"></el-option>
                            <el-option label="老年" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="场景">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="演唱会" value="shanghai"></el-option>
                            <el-option label="歌剧院" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="教材">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="初中" value="shanghai"></el-option>
                            <el-option label="高中" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上下线状态">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="大陆上线" name="type"></el-checkbox>
                            <el-checkbox label="海外上线" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="权重">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="曲集">
                         <el-transfer
                            v-model="value1"
                            :data="data"
                            :titles="['备选项', '已选项']"></el-transfer>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <p class="word-red">仅限视频及曲谱</p>
                    <el-form-item label="价格">
                        <el-input v-model="form.name" placeholder="单位美元"></el-input>
                    </el-form-item>
                    <el-form-item label="购买ID">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="warning" @click="cancelEdit">取消编辑</el-button>
            <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { EDIT_ONE } from '../../store/trackVersionForms'

export default {
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            form:{
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: '',
                type: [],
                resource: '',
                desc: '',
            },
            data: generateData(),
            value1: []
        }
    },
    props: {
        showEditOne: {
            type: Boolean,
            default: false,
            require: true
        }
    },
    methods: {
        ...mapActions([EDIT_ONE]),
        cancelEdit() {
            this.$emit('closeEditOne')
        },
        confirmEdit() {
            this.EDIT_ONE(this.form)
            this.$emit('confirmEditOne')
        }
    }
}
</script>

<style lang="less" scoped>
    .word-red{
        color: red;
        margin-bottom: 20px;
        padding-left: 20px;
    }
</style>
