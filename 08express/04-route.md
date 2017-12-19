# `Router([options])`
```node
var router = express.Router([options]);
```
+ options
+ caseSensitive,大小写敏感,默认不敏感
+ mergeParams,保留父路由器的必需参数值,如果父项和子项具有冲突的参数名称,则该子项的值将优先
+ strict,激活严格路由,默认禁用,禁用之后`/uu`正常访问,但是`/uu/`不可以访问

