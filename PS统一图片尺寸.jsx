#target photoshop;
app.bringToFront();
var targetWidth = parseInt(prompt("请输入目标宽度"));
var targetHeight = parseInt(prompt("请输入目标高度"));
var ratio = targetWidth/targetHeight;
var exportFolder = Folder.selectDialog("请选择导出位置")

var jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = 12;

while (documents.length > 0) {
	var currentDoc = app.activeDocument;
	currentDoc.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);
	var currentWidth = currentDoc.width;
	var currentHeight = currentDoc.height;
	if (currentWidth/currentHeight > ratio) {
		currentDoc.resizeImage(undefined, targetHeight);
	}
	else {
		currentDoc.resizeImage(targetWidth, undefined);
	}
	currentDoc.resizeCanvas(targetWidth, targetHeight);
	currentDoc.saveAs(new File(exportFolder + "/" + currentDoc.name.match(/(.*)\.[^\.]+$/)[1] + ".jpg"), jpgSaveOptions, true, Extension.LOWERCASE);
	currentDoc.close(SaveOptions.DONOTSAVECHANGES);
}
