const fs = require("fs")
const {cosPass} = require("../password.js")
var COS = require("cos-nodejs-sdk-v5");

var cos = new COS(cosPass);

/**
 * @param {string} fileName 文件名称
 * @param {string} dataURL 上传的二进制流
 * @param {string} type 上传类型
 * @returns {prosmise<string|boolean>}
 */
const cosUpload = async (fileName,dataURL,type) => {
    return new Promise((resolve) => {
        cos.putObject(
            {
                Bucket: "image-1257456360",
                Region: "ap-chengdu",
                Key: fileName,
                Body: fs.createReadStream(dataURL),
                ContentType: type,
                onProgress: function (progressData) {
                   console.log("cloud-cos", "0", `腾讯云文件上传进度：`, progressData);
                },
            },
            function (err, data) {
                if (err) {
                    console.log("cloud-cos", "0501", `腾讯云文件上传失败`, err);
                    resolve(false);
                }
                console.log("cloud-cos", "0", `腾讯云文件上传完成: ${(data||{}).Location}`);
                resolve("https://" + (data||{}).Location);
            },
        );
    });
};



class uploadPic{
    /**
     * @function 处理文件上传，并传存至腾讯云
     * @description 未来业务需要限制上传容量，防止被恶意攻击
     */
    static async dealPic(ctx) {
        const file = ctx.request.files.file;
        const { type, name,path,size } = file;
        const cosName = new Date().getTime() + "-" + name;
 
        const back = await cosUpload(cosName, path, type);
        if (back) {
            // 返回正确的url
            ctx.body = {status:200,text:'上传成功',url:back,sizeFinal:size/1024}
        } else {
            ctx.body = {status:404,text:'上传云服务器失败',url:back}
        }
    }
}
module.exports= uploadPic