import request from "@/utils/request";
// spu管理模块接口  /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: {
      category3Id,
    },
  });
// spu信息接口  /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get",
  });

// 获取品牌的信息 /admin/product/baseTrademark/getTrademarkList
export const reqTrademarklist = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });
// 获取psu图片接口 GET /admin/product/spuImageList/{spuId}
export const reqImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
// 获取平台中全部的销售属性  /admin/product/baseSaleAttrList
export const reqBaseSaleList = () =>
  request({
    url: "/admin/product/baseSaleAttrList",
    method: "get",
  });
// 修改spu与添加spu，唯一区别在于是否携带id /admin/product/saveSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    return request({
      url: "/admin/product/saveSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};
// 删除spu /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: "delete",
  });
// 获取图片接口  /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
// 获取销售属性 /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
// 获取平台属性的数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
//   添加skuInfo数据 /admin/product/saveSkuInfo post
export const reqSaveSkuInfo = (skuInfo) =>
  request({
    url: "/admin/product/saveSkuInfo",
    method: "post",
    data: skuInfo,
  });
// 获取sku列表数据的接口 /admin/product/findBySpuId/{spuId}
export const reqSkuAttrList = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });
