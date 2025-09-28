// 代码生成时间: 2025-09-29 00:02:43
import express from 'express';
import { readFileSync } from 'fs';
import { TesseractOCR } from 'tesseract.js';

// 创建一个 Express 应用
const app = express();
const port = 3000;

// 用于解析 application/json 类型的数据
app.use(express.json());

// 定义一个 POST 路由，用于上传图像文件并进行 OCR 文字识别
app.post('/ocr', async (req, res) => {
  // 检查请求中是否包含文件
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      error: 'No files were uploaded.'
    });
  }

  // 获取上传的文件
  const file = req.files.file;
  if (!file) {
    return res.status(400).json({
      error: 'No file was provided.'
    });
  }

  try {
    // 读取文件内容
    const fileContent = readFileSync(file.tempFilePath);

    // 使用 Tesseract.js 进行文字识别
    const result = await TesseractOCR.recognize(
      fileContent,
      'eng', // 使用英文识别
      {}
    );

    // 返回识别的结果
    res.status(200).json({
      text: result.data.text,
      psm: result.data.psm,
      confidence: result.data.confidence
    });
  } catch (error) {
    // 错误处理
    console.error(error);
    return res.status(500).json({
      error: 'Failed to perform OCR.'
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`OCR Service is running on http://localhost:${port}`);
});

// 中间件处理文件上传
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    return res.status(500).json({
      error: 'Multer error: ' + err.message
    });
  } else if (err) {
    // An unknown error occurred.
    return res.status(500).json({
      error: 'Unknown error: ' + err.message
    });
  }
  next();
});

// 导出 app 对象，以便测试或其他模块使用
export { app };