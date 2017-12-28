## 流的基本概念
**fs模块中集中文件读写方法的区别**
<table>
    <tr>
        <th>用途</th>
        <th>使用异步方式</th>
        <th>使用同步方式</th>
    </tr>
    <tr>
        <td>将文件完整读入缓存区</td>
        <td>readFile</td>
        <td>readFileSync</td>
    </tr>
    <tr>
        <td>将文件部分读入缓存区</td>
        <td>read</td>
        <td>readSync</td>
    </tr>
    <tr>
        <td>将数据完整写入文件</td>
        <td>writeFile</td>
        <td>writeFileSync</td>
    </tr>
    <tr>
        <td>将缓存区中的部分内容写入文件</td>
        <td>write</td>
        <td>writeSync</td>
    </tr>
</table>


