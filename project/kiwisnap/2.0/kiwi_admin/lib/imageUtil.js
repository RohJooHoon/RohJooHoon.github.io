const Jimp = require("jimp");
const sharp = require('sharp');
const fs = require('fs');
//var request = require('request');
var request = require('sync-request');
const hexRgb = require('hex-rgb');
var axios  = require('axios');
var FormData = require('form-data')
//var FormData = request.FormData;
const qs = require('qs');
var https = require('https')

module.exports = {

    /**
     * removal 를 연동하여 누끼 작업을 한다.
     * @param image_url
     * @returns {Promise<void>}
     */
    async removal(image_url, save_path, file_name) {
        console.log('removal :: ', save_path);
        console.log('removal :: ', file_name);

        var data = JSON.stringify({"high_resolution":0,
            "demo": 0, // get demo image or not
            "file": image_url, // your image, this field accepts both Base64 and image URL
            "get_base64": 0}); // get base64 result or not, if not, an URL of the result will be returned.

        var config = {
            method: 'post',
            url: 'https://api.removal.ai/2.0/remove/',
            headers: {
                'Rm-Token': '5fe3bddf537d03.02698986',
                'Content-Type': 'application/json',
            },
            data : data
        };


        var res = await axios(config);
        console.log('res', res);

        if(res.status == 200){
            console.log(res);
            console.log('res', res.data.url);

        }else{
            console.log(`removal status error`, res);
            console.log(`removal status error`, res.data);
        }

        if(res.status == 200){
            try{
                await fs.promises.access(save_path);
            }catch (e) {
                await fs.promises.mkdir(save_path, { recursive: true });
            }

            const response = await axios.get(res.data.url,  { responseType: 'arraybuffer' })
            //const response = await axios.get(' https://www.slazzer.com/downloads/f5bf8b1d-0097-11eb-b5b6-0200a434c31d/A00099_3.png',  { responseType: 'arraybuffer' })
            const image_buffer = Buffer.from(response.data, "utf-8")
            fs.writeFileSync(save_path + file_name, image_buffer);
        }

    },

    /**
     * slazzer 를 연동하여 누끼 작업을 한다.
     * @param image_url
     * @returns {Promise<void>}
     */
    async slazzer(image_url, save_path, file_name) {
        console.log('slazzer :: ', save_path);
        console.log('slazzer :: ', file_name);

        var options = {
            'API-KEY': '90ed0e5541df4bb49d3c97472fb97611'
        };

        var form = new FormData();
        form.append("source_image_url", image_url, options);
        form.append("format", 'jpg');
        form.append("crop", 'true');

        var header = form.getHeaders();
        header['API-KEY'] = '90ed0e5541df4bb49d3c97472fb97611';

        var headers = {headers : header};
        console.log('headers', headers);


        var res = await axios.post('https://slazzer.com/api/v1/remove_image_background', form, headers);
        console.log('res', res);

        if(res.status == 200){
            console.log(res);
            console.log('res', res.data.output_image_url);

        }else{
            console.log(`slazzer status error`, res);
            console.log(`slazzer status error`, res.data);
        }

        if(res.status == 200){
            try{
                await fs.promises.access(save_path);
            }catch (e) {
                await fs.promises.mkdir(save_path, { recursive: true });
            }

            const response = await axios.get(res.data.output_image_url,  { responseType: 'arraybuffer' })
            //const response = await axios.get(' https://www.slazzer.com/downloads/f5bf8b1d-0097-11eb-b5b6-0200a434c31d/A00099_3.png',  { responseType: 'arraybuffer' })
            const image_buffer = Buffer.from(response.data, "utf-8")
            fs.writeFileSync(save_path + file_name, image_buffer);
        }

    },



    /**
     * remove bg 를 연동하여 누끼 작업을 한다.
     * @param image_url
     * @returns {Promise<void>}
     */
    async removeBg(image_url, save_path, file_name) {
        console.log('removeBackground :: ', save_path);
        console.log('removeBackground :: ', file_name);

        var res = request(
            'POST',
            'https://api.remove.bg/v1.0/removebg',
            {
                json: {
                    image_url: image_url,
                    size: 'preview',    //auto , preview
                    format: 'jpg',
                    crop: true,
                    bg_color: '4183c4'
                },
                headers: {
                    'X-Api-Key': 'JFze28Ym5FGEK29qjkCkGtRm',
                    'Content-type': 'application/json'
                }
            }
        );


        if(res.statusCode == 200){
            image_buffer = res.body;

            console.log('trim2 util :: ', hexRgb('4183c4'));
            var rgb_array = hexRgb('4183c4', {format: 'array'});
            var rgb = new Object();
            rgb.r = rgb_array[0];
            rgb.g = rgb_array[1];
            rgb.b = rgb_array[2];
            rgb.alpha = rgb_array[3];

            let metadata = await sharp(image_buffer).metadata();
            if(metadata.height > metadata.width){
                const marginTopBottom = Math.round(metadata.height * 0.05);
                image_buffer = await sharp(image_buffer)
                    .extend({top:marginTopBottom, bottom:marginTopBottom, left:0, right:0,background:rgb})
                    .flatten({ background: rgb })
                    .toFormat("jpeg").jpeg({quality: 100, force:true})
                    .toBuffer();

                //height resize
                image_buffer = await sharp(image_buffer).resize({height:metadata.height}).toBuffer();

                metadata = await sharp(image_buffer).metadata();
                const half = Math.round((metadata.height - metadata.width) / 2);
                image_buffer = await sharp(image_buffer)
                    .extend({top:0, bottom:0, left:half, right:half, background:rgb})
                    .flatten({ background: rgb })
                    .toBuffer();
            }else if(metadata.height < metadata.width){
                const marginLeftRight = Math.round(metadata.width * 0.1);
                image_buffer = await sharp(image_buffer)
                    .extend({top:0, bottom:0, left:marginLeftRight, right: marginLeftRight,background:rgb})
                    .flatten({ background: rgb })
                    .toFormat("jpeg").jpeg({quality: 100, force:true})
                    .toBuffer();

                //width resize
                image_buffer = await sharp(image_buffer).resize({width:metadata.width}).toBuffer();

                metadata = await sharp(image_buffer).metadata();
                const half = Math.round((metadata.width - metadata.height) / 2);
                image_buffer = await sharp(image_buffer)
                    .extend({top:half, bottom:half, left:0, right:0, background:rgb})
                    .flatten({ background: rgb })
                    .toBuffer();
            }

            const metadata2 = await sharp(image_buffer).metadata();
            if(metadata2.width > 3000){
                image_buffer = await sharp(image_buffer).resize({whidht:3000, height:3000}).toBuffer();
            }

        }else{
            console.log(`removebg status error`, res.statusCode);

        }

        if(res.statusCode == 200){
            try{
                await fs.promises.access(save_path);
            }catch (e) {
                await fs.promises.mkdir(save_path, { recursive: true });
            }

            fs.writeFileSync(save_path + file_name, image_buffer);
        }
    },


    /**
     * 이미지 트림 하여 저장한다.
     * @param input : imageBuffer
     * @param save_path : 저장경로
     * @param save_path : 파일명
     * @returns {Promise<void>}
     */
    async trim(input, save_path, file_name){
        console.log("trim util :: " , save_path);

        //이미지의 외곽을 확장한다.
        const metadata = await sharp(input).metadata();
        const marginTopBottom = Math.round(metadata.height * 0.05);

        console.log("trim util1 :: " , save_path);
        await sharp(input)
            .extend({top:marginTopBottom, bottom:marginTopBottom, left:0, right:0,background:{r:255,g:255,b:255,alpha: 1 }})
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .toFormat("jpeg").jpeg({quality: 100, force:true})
            .toBuffer()
            .then(async data=>{
                console.log("trim util2 :: " , save_path);
                await sharp(data).resize({height:3000}).toBuffer().then(
                    async finalData=>{
                        console.log("trim util3 :: " , save_path);
                        await sharp(finalData).metadata().then(
                            async (meta)=>{
                                console.log("trim util4 :: " , save_path);
                                const half = Math.round((3000 - meta.width) / 2);
                                console.log("half:"+half);
                                await sharp(finalData)
                                    .extend({top:0, bottom:0, left:half, right:half, background:{r:255,g:255,b:255,alpha: 1 }})
                                    .flatten({ background: { r: 255, g: 255, b: 255 } })
                                    //.toFormat("jpeg").jpeg({quality: 90, force:true})
                                    .toBuffer().then(
                                        async finalData2 => {
                                            console.log('finalData2 :: ', finalData2);
                                            //fs.writeFileSync(save_path + file_name, finalData2)

                                            // await fs.access(save_path, function(err) {
                                            //     if (err && err.code === 'ENOENT') {
                                            //         //fs.mkdirSync(save_path); //Create dir in case not found
                                            //         fs.promises.mkdir(save_path, { recursive: true });
                                            //     }
                                            // })
                                            //fs.promises.mkdir(save_path, { recursive: true });

                                            try{
                                                await fs.promises.access(save_path);
                                            }catch (e) {
                                                await fs.promises.mkdir(save_path, { recursive: true });
                                            }

                                            fs.writeFileSync(save_path + file_name, finalData2);


                                    }
                                )
                            }
                        );
                    }
                )
            }
        );
    },


    /**
     * 이미지 트림 하여 저장한다.
     * @param input : imageBuffer
     * @param save_path : 저장경로
     * @param save_path : 파일명
     * @returns {Promise<void>}
     */
    async trim2(input, save_path, file_name){
        console.log("trim2 util :: " , save_path);



        //센터 잡고 height 3000 resize
        const metadata2 = await sharp(input).metadata();
        const half = Math.round((461 - metadata2.height) / 2);
        const image_buffer = await sharp(input)
            .extend({top:half, bottom:half, left:0, right:0, background:{r:255,g:255,b:255,alpha: 1 }})
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .toBuffer();

        try{
            await fs.promises.access(save_path);
        }catch (e) {
            await fs.promises.mkdir(save_path, { recursive: true });
        }

        fs.writeFileSync(save_path + file_name, image_buffer);

    },


    /**
     *
     * @param image_buffer
     * @param logo_image
     * @returns {Promise<void>}
     */
    // async watermark(image_buffer, logo_image, save_path, file_name){
    //     console.log('watermark :: ');
    //     const [logo] = await Promise.all([
    //         Jimp.read(logo_image)
    //     ]);
    //     console.log('watermark :: 222');
    //     const X = 3000/2 - logo.bitmap.width/2;
    //     const Y = 3000 - logo.bitmap.height-10;
    //
    //     await Jimp.read(image_buffer).then(async imaged=>{
    //         console.log('watermark :: 333');
    //         await imaged.composite(logo, X, Y, [
    //             {
    //                 mode: Jimp.BLEND_SCREEN,
    //                 opacitySource: 1,
    //                 opacityDest: 1
    //             }
    //         ]).writeAsync(save_path + file_name);
    //     });
    //
    // }
    async watermark(image_buffer, logo_image, save_path, file_name){
        console.log('watermark util:: ');

        var logo_metadata = await sharp(logo_image)
            .metadata()
            .then(await function(metadata){
                    console.log('watermark :: ', metadata.width);
                    return metadata;
                }
            );

        const left = parseInt(3000/2 - logo_metadata.width / 2);
        const top = parseInt(3000 - logo_metadata.height - 10);

        await sharp(image_buffer)
            .composite([{ input: logo_image, left: left, top: top}])
            .jpeg()
            .toBuffer()
            .then(async function(outputBuffer){
                try{
                    await fs.promises.access(save_path);
                }catch (e) {
                        await fs.promises.mkdir(save_path, { recursive: true });
                }

                fs.writeFileSync(save_path + file_name, outputBuffer)
            }
        );
    },




}


