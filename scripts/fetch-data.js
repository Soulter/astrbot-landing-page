const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function fetchData() {
  try {
    console.log('开始获取数据...');
    
    // 获取GitHub数据
    const githubResponse = await axios.get('https://api.github.com/repos/AstrBotDevs/AstrBot', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AstrBot-Data-Collector'
      }
    });
    
    // 获取插件数据
    const pluginsResponse = await axios.get('https://api.soulter.top/astrbot/plugins');
    
    // 获取贡献者数量
    const contributorsResponse = await axios.get('https://api.github.com/repos/AstrBotDevs/AstrBot/contributors?per_page=1&anon=true');
    
    let contributorsCount = 0;
    
    // 从Link头解析贡献者总数
    const linkHeader = contributorsResponse.headers.link;
    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (match) {
        contributorsCount = parseInt(match[1]);
      }
    } else {
      // 如果没有Link头，则计算获取的数组长度
      contributorsCount = contributorsResponse.data.length || 1;
    }
    
    // 构建数据对象
    const data = {
      timestamp: new Date().toISOString(),
      github: {
        stars: githubResponse.data.stargazers_count,
        forks: githubResponse.data.forks_count,
        contributors: contributorsCount
      },
      plugins: pluginsResponse.data
    };
    
    // 写入JSON文件
    const filePath = path.join(__dirname, '../data/checkpoint.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    console.log('数据已成功保存到:', filePath);
    console.log('统计数据:', {
      stars: data.github.stars,
      forks: data.github.forks,
      contributors: data.github.contributors,
      pluginsCount: Object.keys(data.plugins).length
    });
    
  } catch (error) {
    console.error('获取或保存数据时出错:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    process.exit(1);
  }
}

// 执行函数
fetchData();
