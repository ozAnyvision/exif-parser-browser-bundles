!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require){var api=require("./index");global.ExifParser=api},{"./index":2}],2:[function(require,module){function getGlobal(){return this}var Parser=require("./lib/parser");module.exports={create:function(buffer,global){if(global=global||getGlobal(),buffer instanceof global.ArrayBuffer){var DOMBufferStream=require("./lib/dom-bufferstream");return new Parser(new DOMBufferStream(buffer,0,buffer.byteLength,!0,global))}var NodeBufferStream=require("./lib/bufferstream");return new Parser(new NodeBufferStream(buffer,0,buffer.length,!0))}}},{"./lib/bufferstream":3,"./lib/dom-bufferstream":4,"./lib/parser":8}],3:[function(require,module){function BufferStream(buffer,offset,length,bigEndian){this.buffer=buffer,this.offset=offset||0,length="number"==typeof length?length:buffer.length,this.endPosition=this.offset+length,this.setBigEndian(bigEndian)}BufferStream.prototype={setBigEndian:function(bigEndian){this.bigEndian=!!bigEndian},nextUInt8:function(){var value=this.buffer.readUInt8(this.offset);return this.offset+=1,value},nextInt8:function(){var value=this.buffer.readInt8(this.offset);return this.offset+=1,value},nextUInt16:function(){var value=this.bigEndian?this.buffer.readUInt16BE(this.offset):this.buffer.readUInt16LE(this.offset);return this.offset+=2,value},nextUInt32:function(){var value=this.bigEndian?this.buffer.readUInt32BE(this.offset):this.buffer.readUInt32LE(this.offset);return this.offset+=4,value},nextInt16:function(){var value=this.bigEndian?this.buffer.readInt16BE(this.offset):this.buffer.readInt16LE(this.offset);return this.offset+=2,value},nextInt32:function(){var value=this.bigEndian?this.buffer.readInt32BE(this.offset):this.buffer.readInt32LE(this.offset);return this.offset+=4,value},nextFloat:function(){var value=this.bigEndian?this.buffer.readFloatBE(this.offset):this.buffer.readFloatLE(this.offset);return this.offset+=4,value},nextDouble:function(){var value=this.bigEndian?this.buffer.readDoubleBE(this.offset):this.buffer.readDoubleLE(this.offset);return this.offset+=8,value},nextBuffer:function(length){var value=this.buffer.slice(this.offset,this.offset+length);return this.offset+=length,value},remainingLength:function(){return this.endPosition-this.offset},nextString:function(length){var value=this.buffer.toString("ascii",this.offset,this.offset+length);return this.offset+=length,value},mark:function(){var self=this;return{openWithOffset:function(offset){return offset=(offset||0)+this.offset,new BufferStream(self.buffer,offset,self.endPosition-offset,self.bigEndian)},offset:this.offset}},offsetFrom:function(marker){return this.offset-marker.offset},skip:function(amount){this.offset+=amount},branch:function(offset,length){return length="number"==typeof length?length:this.endPosition-(this.offset+offset),new BufferStream(this.buffer,this.offset+offset,length,this.bigEndian)}},module.exports=BufferStream},{}],4:[function(require,module){function DOMBufferStream(arrayBuffer,offset,length,bigEndian,global,parentOffset){this.global=global,offset=offset||0,length=length||arrayBuffer.byteLength-offset,this.arrayBuffer=arrayBuffer.slice(offset,offset+length),this.view=new global.DataView(this.arrayBuffer,0,this.arrayBuffer.byteLength),this.setBigEndian(bigEndian),this.offset=0,this.parentOffset=(parentOffset||0)+offset}DOMBufferStream.prototype={setBigEndian:function(bigEndian){this.littleEndian=!bigEndian},nextUInt8:function(){var value=this.view.getUint8(this.offset);return this.offset+=1,value},nextInt8:function(){var value=this.view.getInt8(this.offset);return this.offset+=1,value},nextUInt16:function(){var value=this.view.getUint16(this.offset,this.littleEndian);return this.offset+=2,value},nextUInt32:function(){var value=this.view.getUint32(this.offset,this.littleEndian);return this.offset+=4,value},nextInt16:function(){var value=this.view.getInt16(this.offset,this.littleEndian);return this.offset+=2,value},nextInt32:function(){var value=this.view.getInt32(this.offset,this.littleEndian);return this.offset+=4,value},nextFloat:function(){var value=this.view.getFloat32(this.offset,this.littleEndian);return this.offset+=4,value},nextDouble:function(){var value=this.view.getFloat64(this.offset,this.littleEndian);return this.offset+=8,value},nextBuffer:function(length){var value=this.arrayBuffer.slice(this.offset,this.offset+length);return this.offset+=length,value},remainingLength:function(){return this.arrayBuffer.byteLength-this.offset},nextString:function(length){var value=this.arrayBuffer.slice(this.offset,this.offset+length);return value=String.fromCharCode.apply(null,new this.global.Uint8Array(value)),this.offset+=length,value},mark:function(){var self=this;return{openWithOffset:function(offset){return offset=(offset||0)+this.offset,new DOMBufferStream(self.arrayBuffer,offset,self.arrayBuffer.byteLength-offset,!self.littleEndian,self.global,self.parentOffset)},offset:this.offset,getParentOffset:function(){return self.parentOffset}}},offsetFrom:function(marker){return this.parentOffset+this.offset-(marker.offset+marker.getParentOffset())},skip:function(amount){this.offset+=amount},branch:function(offset,length){return length="number"==typeof length?length:this.arrayBuffer.byteLength-(this.offset+offset),new DOMBufferStream(this.arrayBuffer,this.offset+offset,length,!this.littleEndian,this.global,this.parentOffset)}},module.exports=DOMBufferStream},{}],5:[function(require,module){module.exports={exif:{1:"InteropIndex",2:"InteropVersion",11:"ProcessingSoftware",254:"SubfileType",255:"OldSubfileType",256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",263:"Thresholding",264:"CellWidth",265:"CellLength",266:"FillOrder",269:"DocumentName",270:"ImageDescription",271:"Make",272:"Model",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",280:"MinSampleValue",281:"MaxSampleValue",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",285:"PageName",286:"XPosition",287:"YPosition",288:"FreeOffsets",289:"FreeByteCounts",290:"GrayResponseUnit",291:"GrayResponseCurve",292:"T4Options",293:"T6Options",296:"ResolutionUnit",297:"PageNumber",300:"ColorResponseUnit",301:"TransferFunction",305:"Software",306:"ModifyDate",315:"Artist",316:"HostComputer",317:"Predictor",318:"WhitePoint",319:"PrimaryChromaticities",320:"ColorMap",321:"HalftoneHints",322:"TileWidth",323:"TileLength",324:"TileOffsets",325:"TileByteCounts",326:"BadFaxLines",327:"CleanFaxData",328:"ConsecutiveBadFaxLines",330:"SubIFD",332:"InkSet",333:"InkNames",334:"NumberofInks",336:"DotRange",337:"TargetPrinter",338:"ExtraSamples",339:"SampleFormat",340:"SMinSampleValue",341:"SMaxSampleValue",342:"TransferRange",343:"ClipPath",344:"XClipPathUnits",345:"YClipPathUnits",346:"Indexed",347:"JPEGTables",351:"OPIProxy",400:"GlobalParametersIFD",401:"ProfileType",402:"FaxProfile",403:"CodingMethods",404:"VersionYear",405:"ModeNumber",433:"Decode",434:"DefaultImageColor",435:"T82Options",437:"JPEGTables",512:"JPEGProc",513:"ThumbnailOffset",514:"ThumbnailLength",515:"JPEGRestartInterval",517:"JPEGLosslessPredictors",518:"JPEGPointTransforms",519:"JPEGQTables",520:"JPEGDCTables",521:"JPEGACTables",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite",559:"StripRowCounts",700:"ApplicationNotes",999:"USPTOMiscellaneous",4096:"RelatedImageFileFormat",4097:"RelatedImageWidth",4098:"RelatedImageHeight",18246:"Rating",18247:"XP_DIP_XML",18248:"StitchInfo",18249:"RatingPercent",32781:"ImageID",32931:"WangTag1",32932:"WangAnnotation",32933:"WangTag3",32934:"WangTag4",32995:"Matteing",32996:"DataType",32997:"ImageDepth",32998:"TileDepth",33405:"Model2",33421:"CFARepeatPatternDim",33422:"CFAPattern2",33423:"BatteryLevel",33424:"KodakIFD",33432:"Copyright",33434:"ExposureTime",33437:"FNumber",33445:"MDFileTag",33446:"MDScalePixel",33447:"MDColorTable",33448:"MDLabName",33449:"MDSampleInfo",33450:"MDPrepDate",33451:"MDPrepTime",33452:"MDFileUnits",33550:"PixelScale",33589:"AdventScale",33590:"AdventRevision",33628:"UIC1Tag",33629:"UIC2Tag",33630:"UIC3Tag",33631:"UIC4Tag",33723:"IPTC-NAA",33918:"IntergraphPacketData",33919:"IntergraphFlagRegisters",33920:"IntergraphMatrix",33921:"INGRReserved",33922:"ModelTiePoint",34016:"Site",34017:"ColorSequence",34018:"IT8Header",34019:"RasterPadding",34020:"BitsPerRunLength",34021:"BitsPerExtendedRunLength",34022:"ColorTable",34023:"ImageColorIndicator",34024:"BackgroundColorIndicator",34025:"ImageColorValue",34026:"BackgroundColorValue",34027:"PixelIntensityRange",34028:"TransparencyIndicator",34029:"ColorCharacterization",34030:"HCUsage",34031:"TrapIndicator",34032:"CMYKEquivalent",34118:"SEMInfo",34152:"AFCP_IPTC",34232:"PixelMagicJBIGOptions",34264:"ModelTransform",34306:"WB_GRGBLevels",34310:"LeafData",34377:"PhotoshopSettings",34665:"ExifOffset",34675:"ICC_Profile",34687:"TIFF_FXExtensions",34688:"MultiProfiles",34689:"SharedData",34690:"T88Options",34732:"ImageLayer",34735:"GeoTiffDirectory",34736:"GeoTiffDoubleParams",34737:"GeoTiffAsciiParams",34850:"ExposureProgram",34852:"SpectralSensitivity",34853:"GPSInfo",34855:"ISO",34856:"Opto-ElectricConvFactor",34857:"Interlace",34858:"TimeZoneOffset",34859:"SelfTimerMode",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",34908:"FaxRecvParams",34909:"FaxSubAddress",34910:"FaxRecvTime",34954:"LeafSubIFD",36864:"ExifVersion",36867:"DateTimeOriginal",36868:"CreateDate",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureCompensation",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37386:"FocalLength",37387:"FlashEnergy",37388:"SpatialFrequencyResponse",37389:"Noise",37390:"FocalPlaneXResolution",37391:"FocalPlaneYResolution",37392:"FocalPlaneResolutionUnit",37393:"ImageNumber",37394:"SecurityClassification",37395:"ImageHistory",37396:"SubjectArea",37397:"ExposureIndex",37398:"TIFF-EPStandardID",37399:"SensingMethod",37434:"CIP3DataFile",37435:"CIP3Sheet",37436:"CIP3Side",37439:"StoNits",37500:"MakerNote",37510:"UserComment",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",37679:"MSDocumentText",37680:"MSPropertySetStorage",37681:"MSDocumentTextPosition",37724:"ImageSourceData",40091:"XPTitle",40092:"XPComment",40093:"XPAuthor",40094:"XPKeywords",40095:"XPSubject",40960:"FlashpixVersion",40961:"ColorSpace",40962:"ExifImageWidth",40963:"ExifImageHeight",40964:"RelatedSoundFile",40965:"InteropOffset",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41485:"Noise",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41489:"ImageNumber",41490:"SecurityClassification",41491:"ImageHistory",41492:"SubjectLocation",41493:"ExposureIndex",41494:"TIFF-EPStandardID",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFormat",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"OwnerName",42033:"SerialNumber",42034:"LensInfo",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",42112:"GDALMetadata",42113:"GDALNoData",42240:"Gamma",44992:"ExpandSoftware",44993:"ExpandLens",44994:"ExpandFilm",44995:"ExpandFilterLens",44996:"ExpandScanner",44997:"ExpandFlashLamp",48129:"PixelFormat",48130:"Transformation",48131:"Uncompressed",48132:"ImageType",48256:"ImageWidth",48257:"ImageHeight",48258:"WidthResolution",48259:"HeightResolution",48320:"ImageOffset",48321:"ImageByteCount",48322:"AlphaOffset",48323:"AlphaByteCount",48324:"ImageDataDiscard",48325:"AlphaDataDiscard",50215:"OceScanjobDesc",50216:"OceApplicationSelector",50217:"OceIDNumber",50218:"OceImageLogic",50255:"Annotations",50341:"PrintIM",50560:"USPTOOriginalContentType",50706:"DNGVersion",50707:"DNGBackwardVersion",50708:"UniqueCameraModel",50709:"LocalizedCameraModel",50710:"CFAPlaneColor",50711:"CFALayout",50712:"LinearizationTable",50713:"BlackLevelRepeatDim",50714:"BlackLevel",50715:"BlackLevelDeltaH",50716:"BlackLevelDeltaV",50717:"WhiteLevel",50718:"DefaultScale",50719:"DefaultCropOrigin",50720:"DefaultCropSize",50721:"ColorMatrix1",50722:"ColorMatrix2",50723:"CameraCalibration1",50724:"CameraCalibration2",50725:"ReductionMatrix1",50726:"ReductionMatrix2",50727:"AnalogBalance",50728:"AsShotNeutral",50729:"AsShotWhiteXY",50730:"BaselineExposure",50731:"BaselineNoise",50732:"BaselineSharpness",50733:"BayerGreenSplit",50734:"LinearResponseLimit",50735:"CameraSerialNumber",50736:"DNGLensInfo",50737:"ChromaBlurRadius",50738:"AntiAliasStrength",50739:"ShadowScale",50740:"DNGPrivateData",50741:"MakerNoteSafety",50752:"RawImageSegmentation",50778:"CalibrationIlluminant1",50779:"CalibrationIlluminant2",50780:"BestQualityScale",50781:"RawDataUniqueID",50784:"AliasLayerMetadata",50827:"OriginalRawFileName",50828:"OriginalRawFileData",50829:"ActiveArea",50830:"MaskedAreas",50831:"AsShotICCProfile",50832:"AsShotPreProfileMatrix",50833:"CurrentICCProfile",50834:"CurrentPreProfileMatrix",50879:"ColorimetricReference",50898:"PanasonicTitle",50899:"PanasonicTitle2",50931:"CameraCalibrationSig",50932:"ProfileCalibrationSig",50933:"ProfileIFD",50934:"AsShotProfileName",50935:"NoiseReductionApplied",50936:"ProfileName",50937:"ProfileHueSatMapDims",50938:"ProfileHueSatMapData1",50939:"ProfileHueSatMapData2",50940:"ProfileToneCurve",50941:"ProfileEmbedPolicy",50942:"ProfileCopyright",50964:"ForwardMatrix1",50965:"ForwardMatrix2",50966:"PreviewApplicationName",50967:"PreviewApplicationVersion",50968:"PreviewSettingsName",50969:"PreviewSettingsDigest",50970:"PreviewColorSpace",50971:"PreviewDateTime",50972:"RawImageDigest",50973:"OriginalRawFileDigest",50974:"SubTileBlockSize",50975:"RowInterleaveFactor",50981:"ProfileLookTableDims",50982:"ProfileLookTableData",51008:"OpcodeList1",51009:"OpcodeList2",51022:"OpcodeList3",51041:"NoiseProfile",51043:"TimeCodes",51044:"FrameRate",51058:"TStop",51081:"ReelName",51089:"OriginalDefaultFinalSize",51090:"OriginalBestQualitySize",51091:"OriginalDefaultCropSize",51105:"CameraLabel",51107:"ProfileHueSatMapEncoding",51108:"ProfileLookTableEncoding",51109:"BaselineExposureOffset",51110:"DefaultBlackRender",51111:"NewRawImageDigest",51112:"RawToPreviewGain",51125:"DefaultUserCrop",59932:"Padding",59933:"OffsetSchema",65e3:"OwnerName",65001:"SerialNumber",65002:"Lens",65024:"KDC_IFD",65100:"RawFile",65101:"Converter",65102:"WhiteBalance",65105:"Exposure",65106:"Shadows",65107:"Brightness",65108:"Contrast",65109:"Saturation",65110:"Sharpness",65111:"Smoothness",65112:"MoireFilter"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"}}},{}],6:[function(require,module){function readExifValue(format,stream){switch(format){case 1:return stream.nextUInt8();case 3:return stream.nextUInt16();case 4:return stream.nextUInt32();case 5:return[stream.nextUInt32(),stream.nextUInt32()];case 6:return stream.nextInt8();case 8:return stream.nextUInt16();case 9:return stream.nextUInt32();case 10:return[stream.nextInt32(),stream.nextInt32()];case 11:return stream.nextFloat();case 12:return stream.nextDouble();default:throw new Error("Invalid format while decoding: "+format)}}function getBytesPerComponent(format){switch(format){case 1:case 2:case 6:case 7:return 1;case 3:case 8:return 2;case 4:case 9:case 11:return 4;case 5:case 10:case 12:return 8;default:throw new Error("Invalid format: "+format)}}function readExifTag(tiffMarker,stream){var values,c,tagType=stream.nextUInt16(),format=stream.nextUInt16(),bytesPerComponent=getBytesPerComponent(format),components=stream.nextUInt32(),valueBytes=bytesPerComponent*components;if(valueBytes>4&&(stream=tiffMarker.openWithOffset(stream.nextUInt32())),2===format){values=stream.nextString(components);var lastNull=values.indexOf("\x00");-1!==lastNull&&(values=values.substr(0,lastNull))}else if(7===format)values=stream.nextBuffer(components);else for(values=[],c=0;components>c;++c)values.push(readExifValue(format,stream));return 4>valueBytes&&stream.skip(4-valueBytes),[tagType,values,format]}function readIFDSection(tiffMarker,stream,iterator){var tag,i,numberOfEntries=stream.nextUInt16();for(i=0;numberOfEntries>i;++i)tag=readExifTag(tiffMarker,stream),iterator(tag[0],tag[1],tag[2])}function readHeader(stream){var exifHeader=stream.nextString(6);if("Exif\x00\x00"!==exifHeader)throw new Error("Invalid EXIF header");var tiffMarker=stream.mark(),tiffHeader=stream.nextUInt16();if(18761===tiffHeader)stream.setBigEndian(!1);else{if(19789!==tiffHeader)throw new Error("Invalid TIFF header");stream.setBigEndian(!0)}if(42!==stream.nextUInt16())throw new Error("Invalid TIFF data");return tiffMarker}module.exports={IFD0:1,IFD1:2,GPSIFD:3,SubIFD:4,InteropIFD:5,parseTags:function(stream,iterator){var tiffMarker;try{tiffMarker=readHeader(stream)}catch(e){return!1}var subIfdOffset,gpsOffset,interopOffset,ifd0Stream=tiffMarker.openWithOffset(stream.nextUInt32()),IFD0=this.IFD0;readIFDSection(tiffMarker,ifd0Stream,function(tagType,value,format){switch(tagType){case 34853:gpsOffset=value[0];break;case 34665:subIfdOffset=value[0];break;default:iterator(IFD0,tagType,value,format)}});var ifd1Offset=ifd0Stream.nextUInt32();if(0!==ifd1Offset){var ifd1Stream=tiffMarker.openWithOffset(ifd1Offset);readIFDSection(tiffMarker,ifd1Stream,iterator.bind(null,this.IFD1))}if(gpsOffset){var gpsStream=tiffMarker.openWithOffset(gpsOffset);readIFDSection(tiffMarker,gpsStream,iterator.bind(null,this.GPSIFD))}if(subIfdOffset){var subIfdStream=tiffMarker.openWithOffset(subIfdOffset),InteropIFD=this.InteropIFD;readIFDSection(tiffMarker,subIfdStream,function(tagType,value,format){40965===tagType?interopOffset=value[0]:iterator(InteropIFD,tagType,value,format)})}if(interopOffset){var interopStream=tiffMarker.openWithOffset(interopOffset);readIFDSection(tiffMarker,interopStream,iterator.bind(null,this.InteropIFD))}return!0}}},{}],7:[function(require,module){module.exports={parseSections:function(stream,iterator){var len,markerType;for(stream.setBigEndian(!0);stream.remainingLength()>0&&218!==markerType;){if(255!==stream.nextUInt8())throw new Error("Invalid JPEG section offset");markerType=stream.nextUInt8(),len=markerType>=208&&217>=markerType||218===markerType?0:stream.nextUInt16()-2,iterator(markerType,stream.branch(0,len)),stream.skip(len)}},getSizeFromSOFSection:function(stream){return stream.skip(1),{height:stream.nextUInt16(),width:stream.nextUInt16()}},getSectionName:function(markerType){var name,index;switch(markerType){case 216:name="SOI";break;case 196:name="DHT";break;case 219:name="DQT";break;case 221:name="DRI";break;case 218:name="SOS";break;case 254:name="COM";break;case 217:name="EOI";break;default:markerType>=224&&239>=markerType?(name="APP",index=markerType-224):markerType>=192&&207>=markerType&&196!==markerType&&200!==markerType&&204!==markerType?(name="SOF",index=markerType-192):markerType>=208&&215>=markerType&&(name="RST",index=markerType-208)}var nameStruct={name:name};return"number"==typeof index&&(nameStruct.index=index),nameStruct}}},{}],8:[function(require,module){function ExifResult(startMarker,tags,imageSize,thumbnailOffset,thumbnailLength,thumbnailType,app1Offset){this.startMarker=startMarker,this.tags=tags,this.imageSize=imageSize,this.thumbnailOffset=thumbnailOffset,this.thumbnailLength=thumbnailLength,this.thumbnailType=thumbnailType,this.app1Offset=app1Offset}function Parser(stream){this.stream=stream,this.flags={readBinaryTags:!1,resolveTagNames:!0,simplifyValues:!0,imageSize:!0,hidePointers:!0,returnTags:!0}}var jpeg=(require("assert"),require("./jpeg")),exif=require("./exif"),simplify=require("./simplify");ExifResult.prototype={hasThumbnail:function(mime){return this.thumbnailOffset&&this.thumbnailLength?"string"!=typeof mime?!0:"image/jpeg"===mime.toLowerCase().trim()?6===this.thumbnailType:"image/tiff"===mime.toLowerCase().trim()?1===this.thumbnailType:!1:!1},getThumbnailOffset:function(){return this.app1Offset+6+this.thumbnailOffset},getThumbnailLength:function(){return this.thumbnailLength},getThumbnailBuffer:function(){return this._getThumbnailStream().nextBuffer(this.thumbnailLength)},_getThumbnailStream:function(){return this.startMarker.openWithOffset(this.getThumbnailOffset())},getImageSize:function(){return this.imageSize},getThumbnailSize:function(){var size,stream=this._getThumbnailStream();return jpeg.parseSections(stream,function(sectionType,sectionStream){"SOF"===jpeg.getSectionName(sectionType).name&&(size=jpeg.getSizeFromSOFSection(sectionStream))}),size}},Parser.prototype={enableBinaryFields:function(enable){return this.flags.readBinaryTags=!!enable,this},enablePointers:function(enable){return this.flags.hidePointers=!enable,this},enableTagNames:function(enable){return this.flags.resolveTagNames=!!enable,this},enableImageSize:function(enable){return this.flags.imageSize=!!enable,this},enableReturnTags:function(enable){return this.flags.returnTags=!!enable,this},enableSimpleValues:function(enable){return this.flags.simplifyValues=!!enable,this},parse:function(){var tags,imageSize,thumbnailOffset,thumbnailLength,thumbnailType,app1Offset,tagNames,getTagValue,setTagValue,start=this.stream.mark(),stream=start.openWithOffset(0),flags=this.flags;return flags.resolveTagNames&&(tagNames=require("./exif-tags")),flags.resolveTagNames?(tags={},getTagValue=function(t){return tags[t.name]},setTagValue=function(t,value){tags[t.name]=value}):(tags=[],getTagValue=function(t){var i;for(i=0;i<tags.length;++i)if(tags[i].type===t.type&&tags[i].section===t.section)return tags.value},setTagValue=function(t,value){var i;for(i=0;i<tags.length;++i)if(tags[i].type===t.type&&tags[i].section===t.section)return void(tags.value=value)}),jpeg.parseSections(stream,function(sectionType,sectionStream){var validExifHeaders,sectionOffset=sectionStream.offsetFrom(start);225===sectionType?(validExifHeaders=exif.parseTags(sectionStream,function(ifdSection,tagType,value,format){if(flags.readBinaryTags||7!==format){if(513===tagType){if(thumbnailOffset=value[0],flags.hidePointers)return}else if(514===tagType){if(thumbnailLength=value[0],flags.hidePointers)return}else if(259===tagType&&(thumbnailType=value[0],flags.hidePointers))return;if(flags.returnTags)if(flags.simplifyValues&&(value=simplify.simplifyValue(value,format)),flags.resolveTagNames){var sectionTagNames=ifdSection===exif.GPSIFD?tagNames.gps:tagNames.exif,name=sectionTagNames[tagType];name||(name=tagNames.exif[tagType]),tags[name]=value}else tags.push({section:ifdSection,type:tagType,value:value})}}),validExifHeaders&&(app1Offset=sectionOffset)):flags.imageSize&&"SOF"===jpeg.getSectionName(sectionType).name&&(imageSize=jpeg.getSizeFromSOFSection(sectionStream))}),flags.simplifyValues&&(simplify.castDegreeValues(getTagValue,setTagValue),simplify.castDateValues(getTagValue,setTagValue)),new ExifResult(start,tags,imageSize,thumbnailOffset,thumbnailLength,thumbnailType,app1Offset)}},module.exports=Parser},{"./exif":6,"./exif-tags":5,"./jpeg":7,"./simplify":9,assert:void 0}],9:[function(require,module){var exif=require("./exif"),degreeTags=[{section:exif.GPSIFD,type:2,name:"GPSLatitude",refType:1,refName:"GPSLatitudeRef",posVal:"N"},{section:exif.GPSIFD,type:4,name:"GPSLongitude",refType:3,refName:"GPSLongitudeRef",posVal:"E"}],dateTags=[{section:exif.SubIFD,type:36867,name:"DateTimeOriginal"},{section:exif.SubIFD,type:36868,name:"CreateDate"}];module.exports={castDegreeValues:function(getTagValue,setTagValue){degreeTags.forEach(function(t){var degreeVal=getTagValue(t);if(degreeVal){var degreeRef=getTagValue({section:t.section,type:t.refType,name:t.refName}),degreeNumRef=degreeRef===t.posVal?1:-1,degree=(degreeVal[0]+degreeVal[1]/60+degreeVal[2]/3600)*degreeNumRef;setTagValue(t,degree)}})},castDateValues:function(getTagValue,setTagValue){dateTags.forEach(function(t){var dateStrVal=getTagValue(t);if(dateStrVal){var parts=dateStrVal.split(" "),dateParts=parts[0].split(":"),timeParts=parts[1].split(":"),date=new Date;date.setUTCFullYear(dateParts[0]),date.setUTCMonth(dateParts[1]-1),date.setUTCDate(dateParts[2]),date.setUTCHours(timeParts[0]),date.setUTCMinutes(timeParts[1]),date.setUTCSeconds(timeParts[2]),date.setUTCMilliseconds(0);var timestamp=date.getTime()/1e3;setTagValue(t,timestamp)}})},simplifyValue:function(values,format){return Array.isArray(values)&&(values=values.map(function(value){return 10===format||5===format?value[0]/value[1]:value}),1===values.length&&(values=values[0])),values}}},{"./exif":6}]},{},[1]);