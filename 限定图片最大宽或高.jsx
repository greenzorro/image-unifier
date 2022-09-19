#target photoshop;
app.bringToFront();
var targetSize = parseInt(prompt("请输入最大宽或高"));
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
	if (Math.max(currentWidth,currentHeight) > targetSize) {
		if (currentWidth > currentHeight) {
			currentDoc.resizeImage(targetSize, undefined);
		}
		else {
			currentDoc.resizeImage(undefined, targetSize);
		}
	}
	currentDoc.saveAs(new File(exportFolder + "/" + currentDoc.name.match(/(.*)\.[^\.]+$/)[1] + ".jpg"), jpgSaveOptions, true, Extension.LOWERCASE);
	currentDoc.close(SaveOptions.DONOTSAVECHANGES);
}
