// 代码生成时间: 2025-10-12 02:16:24
import express from 'express';
import fs from 'fs';
import path from 'path';

// 创建一个依赖关系分析器类
class DependencyAnalyzer {
  private packageJsonPath: string;

  constructor(private rootPath: string) {
    this.packageJsonPath = path.join(rootPath, 'package.json');
  }

  // 读取package.json文件
  private readPackageJson(): any {
    try {
      return JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
    } catch (error) {
      throw new Error('Failed to read package.json: ' + error.message);
    }
  }

  // 分析依赖关系
  public analyzeDependencies(): Map<string, string[]> {
    const packageJson = this.readPackageJson();
    const dependencies = new Map<string, string[]>();

    if (packageJson.dependencies) {
      for (const [name, version] of Object.entries(packageJson.dependencies)) {
        dependencies.set(name, [version]);
      }
    }

    if (packageJson.devDependencies) {
      for (const [name, version] of Object.entries(packageJson.devDependencies)) {
        if (!dependencies.has(name)) {
          dependencies.set(name, []);
        }
        dependencies.get(name)?.push(version);
      }
    }

    return dependencies;
  }
}

// 创建Express应用
const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static('public'));

// 设置JSON解析中间件
app.use(express.json());

// 获取依赖关系分析结果
app.get('/analyze', async (req, res) => {
  try {
    const analyzer = new DependencyAnalyzer(process.cwd());
    const dependencies = analyzer.analyzeDependencies();
    res.json({ dependencies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Dependency Analyzer server listening at http://localhost:${port}`);
});