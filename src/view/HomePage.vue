<template>
    <div class="common-layout">
        <el-container>
            <el-header id="header" class="topic">
                <el-icon><WalletFilled /></el-icon>区块链交易模拟系统
            </el-header>
            <el-container id="container">
                <el-main width="50%">
                    <h3 class="topic">模拟交易</h3>
                    <el-form
                        :model="transaction"
                        label-width="20%"
                    >
                        <el-form-item label="交易昵称" prop="sender">
                            <el-input class="formBlank" v-model="transaction.sender"/>
                        </el-form-item>
                        <el-form-item label="交易金额" prop="value">
                            <el-input-number class="formBlank" v-model="transaction.value"/>
                        </el-form-item>
                        <el-form-item label="交易对象">
                            <el-select class="formBlank" v-model="transaction.reciever" placeholder="请选择模拟交易对象">
                                <el-option label="Tony" value="Tony" />
                                <el-option label="Cindy" value="Cindy" />
                                <el-option label="Mike" value="Mike" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="75%">
                            <el-button type="primary" @click="sendTransaction">交易</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
                <el-divider id="dividerBetweenMain" direction="vertical"/>
                <el-main>
                    <h3 class="topic">搜索交易</h3>
                    <div id="search-bar">
                        <el-input
                        v-model="this.input"
                        class="w-50 m-2"
                        placeholder="Please Input a Transaction Hash"
                        :suffix-icon=Search
                        />
                        <el-button type="primary" @click = "findTransaction">搜索</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
export default{
    name:"HomePage",
    data:function(){
        return {
            transaction:{
                sender:"",
                reciever:"",
                value:""
            },
            input:""
        }
    },
    methods:{
        sendTransaction:function(){
            if(this.transaction.sender==""
            ||this.transaction.reciever==""
            ||this.transaction.value==""){
                ElMessageBox.alert(
                    '<strong>请输入完整的信息！</strong>',
                    '提示',
                    {
                        dangerouslyUseHTMLString: true
                    }
                )
            }
            else{
                axios
                .post('/add',this.transaction)
                .then(
                    res=>{
                        if (res.status==200){
                            ElMessageBox.alert(
                                '<strong>交易已发送！</strong>',
                                '成功',
                                {
                                    dangerouslyUseHTMLString:true
                                }
                            )
                        }
                        else{
                            ElMessageBox.alert(
                                '<strong>交易出问题，请重试！</strong>',
                                '失败',
                                {
                                    dangerouslyUseHTMLString:true
                                }
                            )
                        }
                    }
                )
                
            }
        },
        findTransaction:function(){
            if(this.input==""){
                ElMessageBox.alert(
                    '<strong>请输入交易的哈希值！</strong>',
                    '提示',
                    {
                        dangerouslyUseHTMLString: true
                    }
                )
            }
            else{
                axios
                .get('/find?'+this.input)
                .then(
                    res=>{
                        if(res.status==200){
                            ElMessageBox.alert(
                                '<strong>查询成功</strong>',
                                '成功',
                                {
                                    dangerouslyUseHTMLString: true
                                }
                            )
                        }
                        else{
                            ElMessageBox.alert(
                                '<strong>查询失败！请重试！</strong>',
                                '提示',
                                {
                                    dangerouslyUseHTMLString: true
                                }
                            )
                        }
                    }
                )
            }
        }
    }
}
</script>

<style scoped>
#header{
    padding-top: 2%;
}
.common-layout{
    height: 100%;
}
.el-container{
    height: 90%;
}
#dividerBetweenMain{
    height: auto;
}
#search-bar{
    display:flex;
    flex-direction: row;
} 
.formBlank{
    width: 70%;
}
</style>