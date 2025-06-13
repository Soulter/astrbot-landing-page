document.addEventListener('DOMContentLoaded', function () {
    // 汉堡菜单交互
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // 防止菜单打开时页面滚动
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 添加菜单项点击事件，点击后自动关闭菜单
        const menuItems = document.querySelectorAll('.nav-links a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 处理窗口大小变化，在大屏幕时重置菜单状态
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 处理hero图像的3D动画效果
    const heroImage = document.querySelector('.hero-image');
    const heroSection = document.querySelector('.hero');

    if (heroImage && heroSection) {
        // 初始化变换状态
        updateHeroImageTransform();

        // 监听滚动事件
        window.addEventListener('scroll', updateHeroImageTransform);

        function updateHeroImageTransform() {
            const scrollPosition = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            // 计算滚动百分比（限制在0-100%之间）
            const scrollPercentage = Math.min(scrollPosition / (heroHeight * 0.1), 1);

            // 根据滚动百分比计算旋转角度
            const rotateX = 10 * (1 - scrollPercentage);

            // 应用变换
            heroImage.style.transform = `rotateX(${rotateX}deg)`;

            // 当完全滚动到位时添加一个类
            if (scrollPercentage >= 1) {
                heroImage.classList.add('scrolled');
            } else {
                heroImage.classList.remove('scrolled');
            }
        }
    }

    // 数据缓存
    const dataCache = {
        githubData: null,
        pluginsData: null,
        contributorsCount: null
    };

    // 从本地JSON文件加载数据
    async function fetchData() {
        try {
            // 获取缓存的数据
            const response = await fetch('/data/checkpoint.json');
            if (!response.ok) {
                throw new Error('数据文件加载失败');
            }
            const data = await response.json();
            
            // 更新数据缓存
            dataCache.githubData = {
                stargazers_count: data.github.stars,
                forks_count: data.github.forks
            };
            dataCache.pluginsData = data.plugins;
            dataCache.contributorsCount = data.github.contributors;
            
            console.log('数据已加载:', data);
            
            // 数据获取完成后，更新UI
            updateUI();
        } catch (error) {
            console.error('获取数据失败:', error);
            // 出错时仍尝试更新UI，使用默认值
            updateUI();
        }
    }

    // 更新所有依赖数据的UI元素
    function updateUI() {
        updateNavbarGithubStars();
        loadPluginsGrid();
        updateStatsSection();
    }

    // 更新导航栏中的GitHub星标数
    function updateNavbarGithubStars() {
        const starsElement = document.querySelector('.stars-count');
        if (!starsElement) return;

        if (dataCache.githubData) {
            const stars = dataCache.githubData.stargazers_count;
            starsElement.textContent = stars >= 1000 
                ? (stars / 1000).toFixed(1) + 'k' 
                : stars.toString();
        } else {
            starsElement.textContent = '⭐';
        }
    }

    // 加载插件网格
    function loadPluginsGrid() {
        const pluginsGrid = document.getElementById('plugins-grid');
        if (!pluginsGrid) return;

        if (dataCache.pluginsData) {
            const pluginsList = Object.entries(dataCache.pluginsData).slice(0, 50);
            let pluginsHTML = '';

            for (let i = 0; i < pluginsList.length; i++) {
                const [name, data] = pluginsList[i % pluginsList.length];
                if (!data.tags) {
                    data.tags = [];
                }
                const displayName = name.replace('astrbot_plugin_', '');

                pluginsHTML += `
            <div class="plugin-item">
                <div>
                    <div class="plugin-header">
                        <div class="plugin-name">${displayName}</div>
                    </div>
                    <div class="plugin-author">作者: ${data.author}</div>
                    <div class="plugin-desc">${data.desc}</div>
                </div>
                <div>
                    <div class="plugin-tags">
                        ${data.tags.map(tag => `<span class="plugin-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="plugin-stars">
                        <i class="fas fa-star"></i> ${data.stars}
                    </div>
                </div>
            </div>
            `;
            }

            pluginsGrid.innerHTML = pluginsHTML;
        } else {
            pluginsGrid.innerHTML = '<p>加载插件数据失败，请稍后再试。</p>';
        }
    }

    // 更新统计数据部分
    function updateStatsSection() {
        // GitHub 统计
        const starsElement = document.getElementById('github-stars');
        const forksElement = document.getElementById('github-forks');
        const contributorsElement = document.getElementById('github-contributors');
        
        if (dataCache.githubData) {
            if (starsElement) {
                const stars = dataCache.githubData.stargazers_count;
                starsElement.textContent = formatNumber(stars);
            }
            
            if (forksElement) {
                const forks = dataCache.githubData.forks_count;
                forksElement.textContent = formatNumber(forks);
            }
            
            // 使用缓存的贡献者数量
            if (contributorsElement && dataCache.contributorsCount) {
                contributorsElement.textContent = formatNumber(dataCache.contributorsCount);
            } else if (contributorsElement) {
                contributorsElement.textContent = '- -';
            }
        } else {
            if (starsElement) starsElement.textContent = '- -';
            if (forksElement) forksElement.textContent = '- -';
            if (contributorsElement) contributorsElement.textContent = '- -';
        }
        
        // 插件统计
        const pluginCountElement = document.getElementById('plugin-count');
        if (pluginCountElement) {
            if (dataCache.pluginsData) {
                const pluginCount = Object.keys(dataCache.pluginsData).length;
                pluginCountElement.textContent = formatNumber(pluginCount);
            } else {
                pluginCountElement.textContent = '-- ';
            }
        }
    }
    
    // 格式化数字
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k+';
        }
        return num;
    }
    
    // 调用统一数据获取函数
    fetchData();

    // 平滑滚动
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 关闭移动菜单（如果打开）
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 页面滚动时导航栏效果
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 动画效果
    const animateElements = document.querySelectorAll('.feature-card, .workflow-item, .use-case-card');

    // 简单的滚动动画
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // 初始化样式
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // 检查初始状态
    checkScroll();

    // 监听滚动事件
    window.addEventListener('scroll', checkScroll);

    // 平台Tab切换功能
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.querySelector('.tab-indicator');

    // 初始化指示器位置
    if (tabButtons.length > 0 && tabIndicator) {
        const activeTab = document.querySelector('.tab-button.active');
        updateTabIndicator(activeTab);
    }

    // 为所有tab按钮添加点击事件
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const platform = this.getAttribute('data-platform');
            const targetPane = document.getElementById(`tab-${platform}`);

            // 更新活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');
            targetPane.classList.add('active');

            // 更新指示器位置
            updateTabIndicator(this);
        });
    });

    // 更新tab指示器位置和尺寸
    function updateTabIndicator(activeTab) {
        if (!tabIndicator || !activeTab) return;

        tabIndicator.style.left = `${activeTab.offsetLeft}px`;
        tabIndicator.style.width = `${activeTab.offsetWidth}px`;
    }

    // 窗口调整大小时更新指示器
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.tab-button.active');
        updateTabIndicator(activeTab);
    });
});
