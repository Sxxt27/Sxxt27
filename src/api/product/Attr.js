import request from "@/utils/request";
// 获取一级分类菜单 /admin/product/getCategory1
export const reqCartgorylist1 = () =>
  request({
    url: "/admin/product/getCategory1",
    method: "get",
  });
// 二级分类 /admin/product/getCategory2/{category1Id}
export const reqCartgorylist2 = (category1Id) =>
  request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
//   三级分类 GET /admin/product/getCategory3/{category2Id}
export const reqCartgorylist3 = (category2Id) =>
  request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
// 获取平台属性数据   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
// 添加属性与属性值的接口 /admin/product/saveAttrInfo
export const reqAddAttr = (data) =>
  request({
    url: "/admin/product/saveAttrInfo",
    method: "post",
    data: data,
  });
