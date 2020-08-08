export default function AssetBuilder(editor){
    this.editor = editor;
    this.images = [];
    this.audio = undefined;
    this.video = undefined;
    this.text = {};
    this.caption = undefined;
    this.keywords =[];
    this.hastags = [];
    this.atags = [];

    this.insertText = function(data, color, font, bgColor){
        this.text = {
            data: data,
            color: color || 'black',
            font: font || 'Muli',
            bgColor: bgColor || 'white'
        };
        this.analyseText(data);
    }

    this.$get = function(){
        return {assets: {
            images: this.images,
            video: this.video,
            audio: this.audio,
            text: this.text
        }, editor: this.editor, keywords: this.keywords, hastag: this.hastags, atags: this.atags, caption: this.caption};
    }

    this.insertImage = function(image){
        this.images.push(image);
    }

    this.addaudio = (audio) => {
        this.audio = audio;
    }

    this.addVideo = (video) =>{
        this.video = video;
    }

    this.addCaption = (caption) =>{
        this.caption = caption;
        this.analyseText(caption);
    }
    
    this.analyseText = (data) =>{
        this.keywords = this.keywords.concat(data.split(" "));
        this.hastags = this.hastags.concat(data.match(/#[a-z0-9_]+/gi) || []);
        this.atags = this.atags.concat(data.match(/@[a-z0-9_]+/gi) || []);
    }

}