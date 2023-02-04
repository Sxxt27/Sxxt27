<template>
  <!-- 添加spu，修改spu -->
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片：action图片上传的地址  list-type: 文件列表的类型 on-preview:图片预览的时候会出发  on-remove:当删除图片的时候会出发 
         file-list：照片墙需要展示的数据【数组：数组里面的元素务必要有name、url属性】
         on-preview：图片预览功能
         on-remove:删除图片的时候会触发
        -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="unSelect in unSelectSaleAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          icon="el-icon-plus"
          type="primary"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
      </el-form-item>
      <el-form-item>
        <!-- 展示当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            prop="date"
            label="序号"
            width="80"
            align="center"
            type="index"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        ><el-button type="primary" @click="AddOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 存储spu信息
      spu: {
        category3Id: 0,
        description: "",
        tmId: "",
        spuName: "",
        // 图片
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarkList: [], //存储品牌信息
      spuImageList: [],
      attrIdAndAttrName: "", //收集未选择的销售属性id
      spuBaseSaleList: [], //平台销售属性
    };
  },
  methods: {
    //照片墙删除某个图片触发
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      //对于已有的图片【照片钱中显示的图片：有name、url字段的】，因为照片墙显示数据务必要有这两个属性
      //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = file;
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // 对话框的显示
      this.dialogVisible = true;
    },
    // 照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    // 初始化spuForm数据
    async initSpuData(spu) {
      // console.log("发请求", spu);
      // 获取spu信息
      let result = await this.$API.Spu.reqSpu(spu.id);
      // console.log(result);
      if (result.code == 200) {
        this.spu = result.data;
      }
      //获取品牌的信息
      let tradeMarkResult = await this.$API.Spu.reqTrademarklist();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取spu图片的数据
      let spuImageResult = await this.$API.Spu.reqImageList(spu.id);
      // console.log(spuImageResult);
      if (spuImageResult.code == 200) {
        let ListArr = spuImageResult.data;
        ListArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 赋值进行替换
        this.spuImageList = ListArr;
      }
      // 获取平台销售属性
      let SaleList = await this.$API.Spu.reqBaseSaleList();
      // console.log(SaleList);
      if (SaleList.code == 200) {
        this.spuBaseSaleList = SaleList.data;
      }
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 把收集到的销售属性进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //  向spuSaleAttrList里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //清空数据
      this.attrIdAndAttrName = "";
    },
    // 添加按钮的回调
    addSaleAttrValue(row) {
      //挂载在销售属性身上的响应式数据inputVisible，控制button与input切换
      this.$set(row, "inputVisible", true);
      //通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      // 解构出销售属性当中收集数据、
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      // 属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      // console.log(result); //重复是false
      if (!result) return;
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    // 保存或者添加spu
    async AddOrUpdateSpu() {
      // 整理照片墙数据
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      // 发请求
      let result = await this.$API.Spu.reqAddOrUpdateSpu(this.spu);
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: "seccess", message: "保存成功!" });
        // 回到场景0、
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
      //清除数据
      // Object.assign是ES6新增的方法，可以合并对象
      Object.assign(this._data, this.$options.data());
    },
    // 点击添加spu时发的请求
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      //获取品牌的信息
      let tradeMarkResult = await this.$API.Spu.reqTrademarklist();
      // console.log(tradeMarkResult);
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取平台销售属性
      let SaleList = await this.$API.Spu.reqBaseSaleList();
      // console.log(SaleList);
      if (SaleList.code == 200) {
        this.spuBaseSaleList = SaleList.data;
      }
    },
    // 取消按钮
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      //清除数据
      // Object.assign是ES6新增的方法，可以合并对象
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    //整个平台的销售属性一共三个：尺寸、颜色、版本 ----spuBaseSaleList
    //当前SPU拥有的属于自己的销售属性SPU.spuSaleAttrList  ----颜色
    //数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并未返回一个新的数据
    unSelectSaleAttr() {
      let result = this.spuBaseSaleList.filter((item) => {
        // console.log(item);
        // every返回的是一个布尔值
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
