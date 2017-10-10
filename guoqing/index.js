var exp=require('express');
var bodyParser=require('body-parser');
var multer=require('multer');
var cooki=require('cookie-parser');
var fs=require('fs')
var app=exp();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cooki());
app.use(exp.static('wwwroot'));

//主页 index
app.post('/zhuye',(req,res)=>{
	var filename=`user/${req.body.name}`
	fs.exists(filename,(exists)=>{
		if(!exists){
			fs.mkdir(filename,(error)=>{
				if(error){
					res.status(200).json({
						code:0,
						msg:'创建失败'
					})
				}else{
					res.status(200).json({
						code:1,
						msg:'创建成功'
					})
//					
				}
			})
		}else{
//			
			res.status(200).json({
				code:3,
				msg:'该条已存在'
			})
		}
	})
})
app.get('/user',(req,res)=>{
	fs.readdir('user',function(err,files){
		if(files.length){
			res.status(200).json({
				code:1,
				msg:files
			})
		}
	})
})

app.post('/content',(req,res)=>{
	var filename=`${req.cookies.name}`
	console.log(filename)
	function write(){
		var data=Date.now();
		var name=`${req.cookies.name}/${data}.txt`;
		fs.writeFile(name,JSON.stringify(req.body.content),(error)=>{
			if(error){
				res.status(200).json({
					code:2,
					msg:'读取失败'
				})
			}else{
				res.status(200).json({
					code:1,
					msg:'读取成功'
				})
			}
		})
	}
	fs.exists(filename,(exists)=>{
		if(exists){
			weite()
		}
	})
})

app.listen(3000,()=>{
	console.log('running..........')
})