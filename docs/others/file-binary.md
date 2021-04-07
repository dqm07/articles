# Blob
> 文件和二进制数据的操作

Blob用来直接操作`二进制数据`

## Blob对象
blob对象代表着一段二进制数据，对象的生成有两种方式：
- 构造函数
- 现有的对象进行slice（分片上传等）

```
let myBlob = new Blob(content, type)

let newBlob = oldBlob.slice(start, end)
```

## FileList对象
> 针对表单的file控件来操作

```
document.getElementById('input).files[0]

<input type="file multiple onchange="console.log(this.files.length)">

e.dataTransfer.files
```

## File
> fileList里的单个成员，包含了文件的一些元信息

```
name: 
size: 
type: 
lastModified: 时间戳格式
lastModifiedDate: Date对象实例
```

## FileReader
> 将文件读取到内存里，入参是File对象或者Blob对象

- readAsBinaryString(Blob|File)
- readAsText(Blob|File, opt_encoding): 默认是utf-8的格式
- readAsDataURL(Blob|File): 返回Base64编码的data-uri对象
- readAsArrayBuffer(Blob|File): 返回一个ArrayBuffer对象

```
// readAsArrayBuffer为例
let reader = new FileReader()
reader.onload = function(e) {
  let arrayBuffer = reader.result
}

reader.readAsArrayBuffer(file)

reader.abort() //中止
reader.onerror()
reader.onprogress()
```

## URL对象
> 用来生成指向File对象或者Blob对象的URL

```
// 生成一个url，且同一个二进制数据每次执行后的结果都不一样
let _url = window.URL.createObjectURL(blob)

// 生成的url的失效时间跟随网页的刷新或者卸载，或者可以手动使得url失效
window.URL.revokeObjectURL(_url)
```