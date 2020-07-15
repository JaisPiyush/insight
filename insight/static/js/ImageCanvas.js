import Cropper from '@/node_modules/cropperjs/dist/cropper'
import '@/node_modules/cropperjs/dist/cropper.css'

export default function CropImage(elem){
    this.elem = elem;
    
    this.$init = function(){
        let maxAllowedHeightImage = (60 * window.innerHeight)/100;
        let marginTop = maxAllowedHeightImage - this.elem.clientHeight;
        this.cropper = new Cropper(this.elem,{
            aspectRatio : 16/9,
            height:this.elem.clientHeight,
            top:marginTop,
            left:0,
            crop(event){}
        });
    }

    this.rotate = function(){
        this.cropper.rotate(90);
    }

    this.cropImage = function(){
        let width = window.screen.width;
        let height = window.innerHeight * 30/100;
        let data = this.cropper.getCropBoxData({
            width:width,
            height:height,
        });
        let imageData = this.cropper.getCroppedCanvas({
            height:height,
            width: width,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "medium"
        });
        console.log(imageData);
        let base =  imageData.toDataURL('image/png');
        base = base.replace('data:image/png;base64,',"")
        return window.URL.createObjectURL(this.toBlob(base,'image/png'));
    }

    this.destroy = function(){
        this.cropper.destroy();
    }

    this.toBlob = function(base64Data, contentType=''){
        contentType = contentType || '';
        let sliceSize = 1024;
        let byteCharacters = atob(base64Data);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(slicesCount);

        for (let  sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            let begin = sliceIndex * sliceSize;
            let end = Math.min(begin + sliceSize, bytesLength);

            let bytes = new Array(end - begin);
            for(let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }
}