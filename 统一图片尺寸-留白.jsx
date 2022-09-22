#target photoshop;
app.bringToFront();
var importFolder = Folder.selectDialog("请选择图片所在文件夹");
var importFiles = importFolder.getFiles();
// remove folders in the Array
while(importFiles[0].name.indexOf(".")<0){
	importFiles.shift();
}
var amount = importFiles.length;
var targetWidth = parseInt(prompt("请输入目标宽度"));
var targetHeight = parseInt(prompt("请输入目标高度"));
var ratio = targetWidth/targetHeight;
var exportFolder = Folder.selectDialog("请选择导出位置")
var currentDoc;

// exporting options
var jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = 12;

for(i=0;i<amount;i++){
	app.open(new File(importFiles[i]));
	currentDoc = app.activeDocument;
	currentDoc.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);
	var currentWidth = currentDoc.width;
	var currentHeight = currentDoc.height;
	if (currentWidth/currentHeight > ratio) {
		currentDoc.resizeImage(targetWidth, undefined);
	}
	else {
		currentDoc.resizeImage(undefined, targetHeight);
	}
	currentDoc.resizeCanvas(targetWidth, targetHeight);
	currentDoc.saveAs(new File(exportFolder + "/" + currentDoc.name.match(/(.*)\.[^\.]+$/)[1] + ".jpg"), jpgSaveOptions, true, Extension.LOWERCASE);
	currentDoc.close(SaveOptions.DONOTSAVECHANGES);
}
