import request from "@/utils/request";

// 获取品牌列表接口 /admin/product/baseTrademark/{page}/{limit}
export const reqTrademarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
// 新增品牌数据  /admin/product/baseTrademark/save

// 修改数据 /admin/product/baseTrademark/update
export const reqAddUpdateTradeMark = (tradeMark) => {
  // 带id是修改
  if (tradeMark.id) {
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    return request({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
};
// 删除品牌的接口  /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
