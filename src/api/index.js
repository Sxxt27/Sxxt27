// 将四个模块统一起来对外暴露
import * as tradeMark from "./product/tradeMark";
import * as Attr from "./product/Attr";
import * as Sku from "./product/Sku";
import * as Spu from "./product/Spu";
// 对外暴露
export default {
  tradeMark,
  Attr,
  Sku,
  Spu,
};
